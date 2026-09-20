// =====================================================
// Narrator v3 — Punctuation-Aware Chunking
// Teknik adaptasi dari Android README:
//   1. Intelligent Text Splitting per tanda baca
//   2. Cumulative Offset Mapping (startIndex per chunk)
//   3. Dynamic pause setelah tanda baca (user-controllable)
//   4. Per-chunk fallback timer (kalau onboundary gagal)
// =====================================================

const MAX_CHUNK_LEN = 180;
const MIN_CHUNK_LEN = 20;
const WATCHDOG_MS = 900;
const FALLBACK_WPM = 175;

// Delay dasar setelah tanda baca (ms, sebelum dikali multiplier)
const BASE_PAUSE = {
  newline: 400,
  sentence: 350,  // . ! ?
  clause: 180     // , ; :
};

/**
 * Chunking berbasis tanda baca + cumulative offset mapping.
 * Setiap chunk: { text, startIndex, endIndex, pauseAfterMs, pauseType }
 */
function chunkText(text, maxLen = MAX_CHUNK_LEN) {
  const chunks = [];
  let pos = 0;

  while (pos < text.length) {
    // Skip leading whitespace
    while (pos < text.length && /\s/.test(text[pos])) pos++;
    if (pos >= text.length) break;

    // Kalau sisa muat satu chunk, ambil semua
    if (text.length - pos <= maxLen) {
      chunks.push({
        text: text.substring(pos),
        startIndex: pos,
        endIndex: text.length,
        pauseAfterMs: 0,
        pauseType: 'end'
      });
      break;
    }

    const maxEnd = pos + maxLen;
    let splitAt = -1;
    let pauseMs = 0;
    let pauseType = 'none';

    // Scan untuk split point terbaik
    for (let i = pos + MIN_CHUNK_LEN; i < maxEnd; i++) {
      const c = text[i];
      const after = text[i + 1];
      const afterOK = !after || /\s/.test(after);

      if (c === '\n') {
        splitAt = i + 1;
        pauseMs = BASE_PAUSE.newline;
        pauseType = 'newline';
        break; // prioritas tertinggi
      } else if ((c === '.' || c === '!' || c === '?') && afterOK) {
        splitAt = i + 1;
        pauseMs = BASE_PAUSE.sentence;
        pauseType = 'sentence';
        break; // prioritas tinggi
      } else if ((c === ',' || c === ';' || c === ':') && afterOK) {
        // Simpan sebagai kandidat, tapi lanjut scan (mungkin ada titik setelahnya)
        if (splitAt === -1) {
          splitAt = i + 1;
          pauseMs = BASE_PAUSE.clause;
          pauseType = 'clause';
        }
      }
    }

    let end;
    if (splitAt > 0) {
      end = splitAt;
    } else {
      // Tidak ada tanda baca → potong di batas kata terdekat
      end = maxEnd;
      while (end < text.length && !/\s/.test(text[end])) end++;
      pauseMs = 0;
      pauseType = 'word';
    }

    chunks.push({
      text: text.substring(pos, end),
      startIndex: pos,
      endIndex: end,
      pauseAfterMs: pauseMs,
      pauseType: pauseType
    });
    pos = end;
  }

  return chunks;
}

export class Narrator {
  constructor() {
    this.synth = window.speechSynthesis;
    this.utterance = null;
    this.wordSpans = [];
    this.activeSpan = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = true;

    // Audio
    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.pauseMultiplier = 1; // 0 = tanpa jeda tambahan
    this.lang = 'id-ID';
    this.voice = null;

    // Chunking
    this._originalText = '';
    this.chunks = [];
    this.activeChunkIndex = -1;

    // Fallback per-chunk
    this._boundaryFired = false;
    this._watchdogTimer = null;
    this._fallbackTimer = null;
    this._usingFallback = false;

    // Callbacks
    this.onStateChange = null;
    this.onWordChange = null;
    this.onEnd = null;
    this.onProgress = null;
    this.onChunkChange = null;

    // Auto-pause on hidden
    this.autoPauseOnHidden = true;
    this._onVisibilityChange = () => {
      if (!this.autoPauseOnHidden) return;
      if (document.hidden && this.isPlaying) this.pause();
    };
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  static isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  // ============ Render kata ============
  renderWords(text, container) {
    container.innerHTML = '';
    this.wordSpans = [];
    this.activeSpan = null;

    const regex = /\S+/g;
    let m, last = 0;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) {
        container.appendChild(document.createTextNode(text.substring(last, m.index)));
      }
      const span = document.createElement('span');
      span.className = 'karaoke-word';
      span.textContent = m[0];
      span.dataset.start = String(m.index);
      span.dataset.end = String(m.index + m[0].length);
      container.appendChild(span);
      this.wordSpans.push(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) {
      container.appendChild(document.createTextNode(text.substring(last)));
    }
  }

  // ============ Speak ============
  speak(text, { lang = 'id-ID', rate = 1, pitch = 1, volume = 1, voice = null, pauseMultiplier = 1 } = {}) {
    if (!Narrator.isSupported()) return;
    this.stop();

    this._originalText = text;
    this.lang = lang;
    this.rate = rate;
    this.pitch = pitch;
    this.volume = volume;
    this.pauseMultiplier = Math.max(0, Math.min(2, Number(pauseMultiplier) || 0));
    this.voice = voice;
    this.isStopped = false;

    this.chunks = chunkText(text);
    if (!this.chunks.length) return;

    this.activeChunkIndex = 0;
    console.info(`[Narrator] ${this.chunks.length} chunk (punctuation-aware).`);

    setTimeout(() => this._speakChunk(0), 80);
  }

  _speakChunk(index) {
    if (this.isStopped) return;
    if (index >= this.chunks.length) {
      this._endSpeak();
      return;
    }

    const prevIdx = this.activeChunkIndex;
    this.activeChunkIndex = index;
    const chunk = this.chunks[index];

    if (prevIdx !== index) this.onChunkChange?.(index, this.chunks.length);

    // Reset status boundary per chunk
    this._boundaryFired = false;

    const utt = new SpeechSynthesisUtterance(chunk.text);
    utt.lang = this.lang;
    utt.rate = this.rate;
    utt.pitch = this.pitch;
    utt.volume = this.volume;
    if (this.voice) utt.voice = this.voice;

    utt.onstart = () => {
      if (index === 0 && !this.isPlaying) {
        this.isPlaying = true;
        this.isPaused = false;
        this.onStateChange?.('playing');
      }
      this._startWatchdog();
    };

    utt.onboundary = (e) => {
      if (e.name && e.name !== 'word') return;
      this._boundaryFired = true;
      this._stopWatchdog();
      this._stopFallback();

      // Cumulative offset mapping
      const absoluteIndex = chunk.startIndex + (e.charIndex || 0);
      this._highlightWordAt(absoluteIndex);
    };

    utt.onend = () => {
      this._stopWatchdog();
      this._stopFallback();
      if (this.isStopped) return;

      const nextIndex = index + 1;
      if (nextIndex >= this.chunks.length) {
        this._endSpeak();
        return;
      }

      // Dynamic pause setelah tanda baca
      const extraPause = Math.round(chunk.pauseAfterMs * this.pauseMultiplier);
      if (extraPause > 0) {
        setTimeout(() => this._speakChunk(nextIndex), extraPause);
      } else {
        this._speakChunk(nextIndex);
      }
    };

    utt.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.error('[Narrator] Speech error:', e);
      this._stopWatchdog();
      this._stopFallback();
      this.isPlaying = false;
      this.isPaused = false;
      this._clearHighlight();
      this.onStateChange?.('error');
    };

    this.utterance = utt;
    try { this.synth.speak(utt); }
    catch (err) { console.error('[Narrator] speak error:', err); }
  }

  _endSpeak() {
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = true;
    this._clearHighlight();
    this.onStateChange?.('ended');
    this.onEnd?.();
  }

  // ============ Watchdog → Fallback per-chunk ============
  _startWatchdog() {
    this._stopWatchdog();
    this._watchdogTimer = setTimeout(() => {
      if (!this._boundaryFired && this.isPlaying) {
        this._startFallbackForChunk(this.activeChunkIndex);
      }
    }, WATCHDOG_MS);
  }

  _stopWatchdog() {
    if (this._watchdogTimer) {
      clearTimeout(this._watchdogTimer);
      this._watchdogTimer = null;
    }
  }

  _startFallbackForChunk(chunkIndex) {
    this._usingFallback = true;

    const chunk = this.chunks[chunkIndex];
    if (!chunk) return;

    // Filter spans dalam chunk ini (cumulative offset)
    const chunkWords = this.wordSpans.filter(span => {
      const s = Number(span.dataset.start);
      return s >= chunk.startIndex && s < chunk.endIndex;
    });
    if (!chunkWords.length) return;

    // Estimasi ms per kata: 175 WPM di rate=1
    const msPerWord = Math.max(140, Math.round((60000 / FALLBACK_WPM) / this.rate));

    // Mulai dari kata pertama dalam chunk yang belum dibaca
    let startIdx = 0;
    if (this.activeSpan) {
      const aStart = Number(this.activeSpan.dataset.start);
      const idx = chunkWords.findIndex(w => Number(w.dataset.start) === aStart);
      if (idx >= 0) startIdx = idx + 1;
    }

    let i = startIdx;
    const advance = () => {
      if (this.isStopped || !this.isPlaying) return;
      if (i >= chunkWords.length) return;
      this._setActiveSpan(chunkWords[i]);
      i++;
      this._fallbackTimer = setTimeout(advance, msPerWord);
    };
    advance();
  }

  _stopFallback() {
    if (this._fallbackTimer) {
      clearTimeout(this._fallbackTimer);
      this._fallbackTimer = null;
    }
    this._usingFallback = false;
  }

  // ============ Highlight ============
  _highlightWordAt(charIndex) {
    let target = null;
    for (const span of this.wordSpans) {
      const start = Number(span.dataset.start);
      const end = Number(span.dataset.end);
      if (charIndex >= start && charIndex < end) { target = span; break; }
    }
    if (!target) {
      for (const span of this.wordSpans) {
        if (Number(span.dataset.start) >= charIndex) { target = span; break; }
      }
    }
    if (target) this._setActiveSpan(target);
  }

  _setActiveSpan(span) {
    if (!span || span === this.activeSpan) return;
    this.activeSpan?.classList.remove('active');
    this.activeSpan?.classList.add('read');
    span.classList.add('active');
    this.activeSpan = span;

    this._scrollIntoView(span);

    const idx = this.wordSpans.indexOf(span);
    this.onProgress?.(idx + 1, this.wordSpans.length);
    this.onWordChange?.(span.textContent, idx);
  }

  _scrollIntoView(span) {
    let parent = span.parentElement;
    let scrollParent = null;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const oy = style.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && parent.scrollHeight > parent.clientHeight) {
        scrollParent = parent;
        break;
      }
      parent = parent.parentElement;
    }
    if (!scrollParent) return;

    try {
      const spanRect = span.getBoundingClientRect();
      const parentRect = scrollParent.getBoundingClientRect();
      if (spanRect.top >= parentRect.top && spanRect.bottom <= parentRect.bottom) return;
      const targetScroll =
        scrollParent.scrollTop +
        (spanRect.top - parentRect.top) -
        (parentRect.height / 2 - spanRect.height / 2);
      scrollParent.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    } catch (e) { /* ignore */ }
  }

  _clearHighlight() {
    if (this.activeSpan) {
      this.activeSpan.classList.remove('active');
      this.activeSpan = null;
    }
    this.wordSpans.forEach(s => s.classList.remove('read'));
  }

  // ============ Kontrol ============
  pause() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this._stopFallback();
      this.onStateChange?.('paused');
    }
  }

  resume() {
    if (this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.onStateChange?.('playing');
      // Fallback akan restart otomatis via watchdog kalau perlu
      this._boundaryFired = false;
      this._startWatchdog();
    }
  }

  stop() {
    this.isStopped = true;
    try { this.synth.cancel(); } catch (e) {}
    this._stopWatchdog();
    this._stopFallback();
    this.isPlaying = false;
    this.isPaused = false;
    this._clearHighlight();
    this.onStateChange?.('stopped');
  }

  setRate(v) {
    const c = Math.max(0.5, Math.min(2, Number(v) || 1));
    if (c === this.rate) return;
    this.rate = c;
    this._restartFromLastWord();
  }

  setPitch(v) {
    const c = Math.max(0.5, Math.min(2, Number(v) || 1));
    if (c === this.pitch) return;
    this.pitch = c;
    this._restartFromLastWord();
  }

  setVolume(v) {
    const c = Math.max(0, Math.min(1, Number(v) || 0));
    this.volume = c; // berlaku untuk chunk berikutnya, tidak perlu restart
  }

  setPauseMultiplier(v) {
    this.pauseMultiplier = Math.max(0, Math.min(2, Number(v) || 0));
    // Berlaku untuk jeda antar-chunk berikutnya
  }

  setVoice(voice) {
    if (voice === this.voice) return;
    this.voice = voice;
    this._restartFromLastWord();
  }

  _restartFromLastWord() {
    if (!this.isPlaying && !this.isPaused) return;
    const lastSpan = this.activeSpan;
    if (!lastSpan) return;

    const restartFrom = Number(lastSpan.dataset.start);
    this.isStopped = true;
    try { this.synth.cancel(); } catch (e) {}
    this._stopWatchdog();
    this._stopFallback();

    setTimeout(() => {
      this.isStopped = false;
      this.isPlaying = false;
      this.chunks = chunkText(this._originalText);
      // Cari chunk yang mencakup restartFrom
      let idx = 0;
      for (let i = 0; i < this.chunks.length; i++) {
        const c = this.chunks[i];
        if (restartFrom >= c.startIndex && restartFrom < c.endIndex) {
          idx = i; break;
        }
      }
      this.activeChunkIndex = idx;
      this._speakChunk(idx);
    }, 120);
  }

  // ============ Voice ============
  getVoices() { return this.synth.getVoices() || []; }

  getVoicesForLang(langCode) {
    const all = this.getVoices();
    const prefix = String(langCode || 'id').split('-')[0].toLowerCase();
    return all.filter(v => String(v.lang || '').toLowerCase().startsWith(prefix));
  }

  pickBestVoice(langCode) {
    const m = this.getVoicesForLang(langCode);
    if (!m.length) return null;
    return m.find(v => v.default) || m[0];
  }

  destroy() {
    this.stop();
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
  }
}

// =====================================================
export function waitForVoices(timeoutMs = 3000) {
  return new Promise(resolve => {
    if (!Narrator.isSupported()) return resolve([]);
    const existing = speechSynthesis.getVoices();
    if (existing && existing.length) return resolve(existing);

    let done = false;
    const handler = () => {
      if (done) return;
      const v = speechSynthesis.getVoices();
      if (v && v.length) {
        done = true;
        speechSynthesis.removeEventListener('voiceschanged', handler);
        resolve(v);
      }
    };
    speechSynthesis.addEventListener('voiceschanged', handler);
    setTimeout(() => {
      if (done) return;
      done = true;
      try { speechSynthesis.removeEventListener('voiceschanged', handler); } catch (e) {}
      resolve(speechSynthesis.getVoices() || []);
    }, timeoutMs);
  });
}

export const SPEECH_LANG = {
  id: 'id-ID', en: 'en-US', ms: 'ms-MY', zh: 'zh-CN', ja: 'ja-JP',
  ko: 'ko-KR', hi: 'hi-IN', th: 'th-TH', tl: 'fil-PH', my: 'my-MM',
  vi: 'vi-VN', ru: 'ru-RU', ar: 'ar-SA', es: 'es-ES', fr: 'fr-FR',
  de: 'de-DE', pt: 'pt-PT', it: 'it-IT', nl: 'nl-NL', tr: 'tr-TR'
};

export const TRANSLATE_LANGS = [
  { code: 'en', flag: '🇬🇧', native: 'English',        promptName: 'English' },
  { code: 'ms', flag: '🇲🇾', native: 'Bahasa Melayu',  promptName: 'Malay' },
  { code: 'zh', flag: '🇨🇳', native: '中文',            promptName: 'Chinese (Simplified)' },
  { code: 'ja', flag: '🇯🇵', native: '日本語',          promptName: 'Japanese' },
  { code: 'ko', flag: '🇰🇷', native: '한국어',          promptName: 'Korean' },
  { code: 'hi', flag: '🇮🇳', native: 'हिन्दी',            promptName: 'Hindi' },
  { code: 'th', flag: '🇹🇭', native: 'ไทย',             promptName: 'Thai' },
  { code: 'tl', flag: '🇵🇭', native: 'Filipino',       promptName: 'Filipino' },
  { code: 'my', flag: '🇲🇲', native: 'မြန်မာ',            promptName: 'Burmese' },
  { code: 'vi', flag: '🇻🇳', native: 'Tiếng Việt',      promptName: 'Vietnamese' },
  { code: 'ru', flag: '🇷🇺', native: 'Русский',        promptName: 'Russian' },
  { code: 'ar', flag: '🇸🇦', native: 'العربية',         promptName: 'Arabic' },
  { code: 'es', flag: '🇪🇸', native: 'Español',        promptName: 'Spanish' },
  { code: 'fr', flag: '🇫🇷', native: 'Français',       promptName: 'French' },
  { code: 'de', flag: '🇩🇪', native: 'Deutsch',        promptName: 'German' },
  { code: 'pt', flag: '🇵🇹', native: 'Português',      promptName: 'Portuguese' },
  { code: 'it', flag: '🇮🇹', native: 'Italiano',       promptName: 'Italian' },
  { code: 'tr', flag: '🇹🇷', native: 'Türkçe',          promptName: 'Turkish' }
];