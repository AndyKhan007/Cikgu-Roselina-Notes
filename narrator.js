// =====================================================
// Narrator — Web Speech API wrapper dengan karaoke highlight
// + Fallback timer (untuk browser tanpa onboundary)
// + Auto-scroll kata aktif
// =====================================================

export class Narrator {
  constructor() {
    this.synth = window.speechSynthesis;
    this.utterance = null;
    this.wordSpans = [];
    this.activeSpan = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.rate = 1;
    this.lang = 'id-ID';
    this.voice = null;
    this.onStateChange = null;
    this.onWordChange = null;
    this.onEnd = null;
    this.onProgress = null; // (currentIndex, totalWords)
    this._fullText = '';
    this._lastAbsoluteIndex = 0;

    // Fallback timing
    this._boundaryFired = false;
    this._watchdogTimer = null;
    this._fallbackTimer = null;
    this._usingFallback = false;
    this._currentFallbackIndex = 0;
    this._startedAt = 0;
  }

  static isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Render teks menjadi span per kata
   */
  renderWords(text, container) {
    container.innerHTML = '';
    this.wordSpans = [];
    this.activeSpan = null;
    this._currentFallbackIndex = 0;

    const regex = /\S+/g;
    let m;
    let last = 0;
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

  /**
   * Mulai membaca teks
   */
  speak(text, { lang = 'id-ID', rate = 1, voice = null } = {}) {
    if (!Narrator.isSupported()) return;
    this.stop();

    this._fullText = text;
    this.lang = lang;
    this.rate = rate;
    this.voice = voice;
    this._lastAbsoluteIndex = 0;
    this._currentFallbackIndex = 0;
    this._usingFallback = false;
    this._boundaryFired = false;
    this._startedAt = Date.now();

    this._speakRange(0);
  }

  _speakRange(startIndex) {
    const remaining = this._fullText.substring(startIndex);
    if (!remaining.trim()) {
      this._endSpeak();
      return;
    }

    const utt = new SpeechSynthesisUtterance(remaining);
    utt.lang = this.lang;
    utt.rate = this.rate;
    if (this.voice) utt.voice = this.voice;

    const offset = startIndex;

    utt.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this._startedAt = Date.now();
      this.onStateChange?.('playing');
      this._startWatchdog();
    };

    utt.onboundary = (e) => {
      if (e.name && e.name !== 'word') return;
      // Tandai bahwa onboundary bekerja
      this._boundaryFired = true;
      this._stopWatchdog();
      this._stopFallback();

      const absoluteIndex = offset + (e.charIndex || 0);
      this._lastAbsoluteIndex = absoluteIndex;
      this._highlightWordAt(absoluteIndex);
    };

    utt.onend = () => {
      this._stopWatchdog();
      this._stopFallback();
      this._endSpeak();
    };

    utt.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.error('Speech error:', e);
      this._stopWatchdog();
      this._stopFallback();
      this.isPlaying = false;
      this.isPaused = false;
      this._clearHighlight();
      this.onStateChange?.('error');
    };

    this.utterance = utt;
    setTimeout(() => {
      try { this.synth.speak(utt); } catch (err) { console.error(err); }
    }, 50);
  }

  _endSpeak() {
    this.isPlaying = false;
    this.isPaused = false;
    this._clearHighlight();
    this.onStateChange?.('ended');
    this.onEnd?.();
  }

  // ============ Fallback timing ============
  _startWatchdog() {
    this._stopWatchdog();
    this._watchdogTimer = setTimeout(() => {
      // Kalau onboundary tidak fire dalam 900ms, aktifkan fallback
      if (!this._boundaryFired && this.isPlaying) {
        this._startFallback();
      }
    }, 900);
  }

  _stopWatchdog() {
    if (this._watchdogTimer) {
      clearTimeout(this._watchdogTimer);
      this._watchdogTimer = null;
    }
  }

  _startFallback() {
    this._usingFallback = true;
    console.info('[Narrator] onboundary tidak didukung — memakai fallback timer.');

    const total = this.wordSpans.length;
    if (total === 0) return;

    // Estimasi WPM untuk speech synthesis default ≈ 175 WPM di rate=1
    // 175 kata/menit → 343ms per kata di rate=1
    // Disesuaikan dengan rate: lebih cepat → lebih pendek jeda
    const msPerWord = Math.max(150, Math.round(343 / this.rate));

    const advance = () => {
      if (!this.isPlaying) return;
      if (this._currentFallbackIndex >= total) return;

      const span = this.wordSpans[this._currentFallbackIndex];
      this._setActiveSpan(span, true);
      this._currentFallbackIndex++;

      this._fallbackTimer = setTimeout(advance, msPerWord);
    };

    // Mulai dari awal (atau dari posisi terakhir)
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
    if (target) {
      this._currentFallbackIndex = this.wordSpans.indexOf(target) + 1;
      this._setActiveSpan(target);
    }
  }

  _setActiveSpan(span) {
    if (!span || span === this.activeSpan) return;
    this.activeSpan?.classList.remove('active');
    this.activeSpan?.classList.add('read');
    span.classList.add('active');
    this.activeSpan = span;

    // Auto-scroll ke tengah container
    this._scrollIntoView(span);

    // Notify progress
    const idx = this.wordSpans.indexOf(span);
    this.onProgress?.(idx + 1, this.wordSpans.length);
    this.onWordChange?.(span.textContent, idx);
  }

  _scrollIntoView(span) {
    // Cari parent yang scrollable
    let parent = span.parentElement;
    let scrollParent = null;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight) {
        scrollParent = parent;
        break;
      }
      parent = parent.parentElement;
    }
    if (!scrollParent) return;

    try {
      const spanRect = span.getBoundingClientRect();
      const parentRect = scrollParent.getBoundingClientRect();
      const targetScroll =
        scrollParent.scrollTop +
        (spanRect.top - parentRect.top) -
        (parentRect.height / 2 - spanRect.height / 2);

      scrollParent.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    } catch (e) { /* ignore */ }
  }

  _clearHighlight() {
    if (this.activeSpan) {
      this.activeSpan.classList.remove('active');
      this.activeSpan = null;
    }
    // Bersihkan status "read"
    this.wordSpans.forEach(s => s.classList.remove('read'));
    this._currentFallbackIndex = 0;
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

      // Restart fallback kalau sebelumnya pakai fallback
      if (this._usingFallback) {
        // Lanjut dari kata terakhir
        const total = this.wordSpans.length;
        const msPerWord = Math.max(150, Math.round(343 / this.rate));
        const advance = () => {
          if (!this.isPlaying) return;
          if (this._currentFallbackIndex >= total) return;
          const span = this.wordSpans[this._currentFallbackIndex];
          this._setActiveSpan(span);
          this._currentFallbackIndex++;
          this._fallbackTimer = setTimeout(advance, msPerWord);
        };
        advance();
      } else {
        // Kalau browser dukung onboundary, biarkan lanjut sendiri
      }
    }
  }

  stop() {
    try { this.synth.cancel(); } catch (e) {}
    this._stopWatchdog();
    this._stopFallback();
    this.isPlaying = false;
    this.isPaused = false;
    this._clearHighlight();
    this.onStateChange?.('stopped');
  }

  setRate(newRate) {
    const clamped = Math.max(0.5, Math.min(2, Number(newRate) || 1));
    const prev = this.rate;
    this.rate = clamped;

    if (!this.isPlaying && !this.isPaused) return;
    if (clamped === prev) return;

    // Restart dari kata terakhir
    const restartFrom = this.activeSpan
      ? Number(this.activeSpan.dataset.start)
      : this._lastAbsoluteIndex;

    this._clearHighlight();
    this.synth.cancel();
    setTimeout(() => {
      this._boundaryFired = false;
      this._currentFallbackIndex = 0;
      this._speakRange(restartFrom);
    }, 80);
  }

  pickBestVoice(langCode) {
    const voices = this.synth.getVoices();
    if (!voices || !voices.length) return null;
    const prefix = String(langCode || 'id').split('-')[0].toLowerCase();
    const matches = voices.filter(v => String(v.lang || '').toLowerCase().startsWith(prefix));
    if (!matches.length) return null;
    return matches.find(v => v.default) || matches[0];
  }

  getVoices() {
    return this.synth.getVoices() || [];
  }
}

/**
 * Tunggu voices siap
 */
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

/**
 * Map kode bahasa ke tag BCP-47
 */
export const SPEECH_LANG = {
  id: 'id-ID',
  en: 'en-US',
  ms: 'ms-MY',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  hi: 'hi-IN',
  th: 'th-TH',
  tl: 'fil-PH',
  my: 'my-MM',
  vi: 'vi-VN',
  ru: 'ru-RU',
  ar: 'ar-SA',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  pt: 'pt-PT',
  it: 'it-IT',
  nl: 'nl-NL',
  tr: 'tr-TR'
};

/**
 * Daftar bahasa untuk dropdown translate
 */
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