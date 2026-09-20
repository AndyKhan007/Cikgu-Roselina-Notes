// =====================================================
// Narrator v4 — onboundary First, Fallback Last
// Perbaikan:
//   - Watchdog 2000ms (beri onboundary waktu fire)
//   - Sekali onboundary fire → kunci mode onboundary untuk sesi
//   - Fallback verifikasi chunk index sebelum highlight
//   - Log jelas ke Console untuk diagnosa
// =====================================================

const MAX_CHUNK_LEN = 180;
const MIN_CHUNK_LEN = 20;
const WATCHDOG_MS = 2000;      // dinaikkan dari 900ms
const FALLBACK_WPM = 175;

const BASE_PAUSE = {
  newline: 400,
  sentence: 350,
  clause: 180
};

function chunkText(text, maxLen = MAX_CHUNK_LEN) {
  const chunks = [];
  let pos = 0;

  while (pos < text.length) {
    while (pos < text.length && /\s/.test(text[pos])) pos++;
    if (pos >= text.length) break;

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

    for (let i = pos + MIN_CHUNK_LEN; i < maxEnd; i++) {
      const c = text[i];
      const after = text[i + 1];
      const afterOK = !after || /\s/.test(after);

      if (c === '\n') {
        splitAt = i + 1;
        pauseMs = BASE_PAUSE.newline;
        pauseType = 'newline';
        break;
      } else if ((c === '.' || c === '!' || c === '?') && afterOK) {
        splitAt = i + 1;
        pauseMs = BASE_PAUSE.sentence;
        pauseType = 'sentence';
        break;
      } else if ((c === ',' || c === ';' || c === ':') && afterOK) {
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

    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.pauseMultiplier = 1;
    this.lang = 'id-ID';
    this.voice = null;

    this._originalText = '';
    this.chunks = [];
    this.activeChunkIndex = -1;

    // Mode tracking
    this._boundaryWorks = null;   // null = belum tahu, true = onboundary OK, false = tidak support
    this._boundaryFired = false;  // untuk chunk saat ini
    this._watchdogTimer = null;
    this._fallbackTimer = null;
    this._fallbackChunkIndex = -1;  // chunk yang fallback sedang aktif
    this._usingFallback = false;

    this.onStateChange = null;
    this.onWordChange = null;
    this.onEnd = null;
    this.onProgress = null;
    this.onChunkChange = null;

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

    // Reset mode — akan dideteksi ulang per sesi
    this._boundaryWorks = null;

    this.chunks = chunkText(text);
    if (!this.chunks.length) return;

    this.activeChunkIndex = 0;
    console.info(`[Narrator] Mulai: ${this.chunks.length} chunk. Menunggu onboundary...`);

    setTimeout(() => this._speakChunk(0), 80);
  }

  _speakChunk(index) {
    if (this.isStopped) return;
    if (index >= this.chunks.length) {
      this._endSpeak();
      return;
    }

    // Bersihkan fallback dari chunk sebelumnya
    this._stopFallback();

    const prevIdx = this.activeChunkIndex;
    this.activeChunkIndex = index;
    const chunk = this.chunks[index];

    if (prevIdx !== index) this.onChunkChange?.(index, this.chunks.length);

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

      // --- KUNCI: sekali onboundary fire, kita tahu browser support ---
      if (this._boundaryWorks !== true) {
        this._boundaryWorks = true;
        console.info('[Narrator] onboundary AKTIF — pakai mode sinkron murni.');
      }

      this._boundaryFired = true;
      this._stopWatchdog();
      this._stopFallback();  // matikan fallback segera

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

  // ============ Watchdog ============
  _startWatchdog() {
    this._stopWatchdog();

    // Kalau kita sudah tahu browser TIDAK support onboundary → langsung fallback
    if (this._boundaryWorks === false) {
      this._startFallbackForChunk(this.activeChunkIndex);
      return;
    }

    // Kalau kita sudah tahu browser support onboundary → jangan fallback
    if (this._boundaryWorks === true) {
      return;
    }

    // Belum tahu — beri waktu 2000ms
    this._watchdogTimer = setTimeout(() => {
      if (this._boundaryFired) return;      // sudah fire, aman
      if (!this.isPlaying) return;          // sudah berhenti
      if (this._boundaryWorks === true) return;

      // Timeout — tandai browser tidak support
      this._boundaryWorks = false;
      console.warn('[Narrator] onboundary TIDAK terdeteksi dalam 2s — fallback aktif (highlight estimasi).');
      this._startFallbackForChunk(this.activeChunkIndex);
    }, WATCHDOG_MS);
  }

  _stopWatchdog() {
    if (this._watchdogTimer) {
      clearTimeout(this._watchdogTimer);
      this._watchdogTimer = null;
    }
  }

  _startFallbackForChunk(chunkIndex) {
    if (this._boundaryWorks === true) return; // jangan fallback kalau onboundary jalan

    this._usingFallback = true;
    this._fallbackChunkIndex = chunkIndex;

    const chunk = this.chunks[chunkIndex];
    if (!chunk) return;

    const chunkWords = this.wordSpans.filter(span => {
      const s = Number(span.dataset.start);
      return s >= chunk.startIndex && s < chunk.endIndex;
    });
    if (!chunkWords.length) return;

    const msPerWord = Math.max(140, Math.round((60000 / FALLBACK_WPM) / this.rate));

    let startIdx = 0;
    if (this.activeSpan) {
      const aStart = Number(this.activeSpan.dataset.start);
      const idx = chunkWords.findIndex(w => Number(w.dataset.start) === aStart);
      if (idx >= 0) startIdx = idx + 1;
    }

    let i = startIdx;
    const advance = () => {
      // Verifikasi: masih chunk yang sama? masih playing? masih fallback mode?
      if (this.isStopped || !this.isPlaying) return;
      if (this._boundaryWorks === true) return;               // onboundary menyala → stop
      if (this._fallbackChunkIndex !== chunkIndex) return;    // chunk sudah ganti
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
    this._fallbackChunkIndex = -1;
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
    this.volume = c;
  }

  setPauseMultiplier(v) {
    this.pauseMultiplier = Math.max(0, Math.min(2, Number(v) || 0));
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