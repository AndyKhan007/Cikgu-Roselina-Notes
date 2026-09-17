// =====================================================
// Narrator — Web Speech API wrapper dengan karaoke highlight
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
    this._fullText = '';
    this._lastAbsoluteIndex = 0;
  }

  static isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Render teks menjadi span per kata di dalam container.
   * Teks di antara kata (spasi, newline) tetap dipertahankan.
   */
  renderWords(text, container) {
    container.innerHTML = '';
    this.wordSpans = [];
    this.activeSpan = null;

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
   * Mulai membaca teks dari awal
   */
  speak(text, { lang = 'id-ID', rate = 1, voice = null } = {}) {
    if (!Narrator.isSupported()) return;

    this.synth.cancel();
    this._fullText = text;
    this.lang = lang;
    this.rate = rate;
    this.voice = voice;
    this._lastAbsoluteIndex = 0;
    this._speakRange(0);
  }

  _speakRange(startIndex) {
    const remaining = this._fullText.substring(startIndex);
    if (!remaining.trim()) {
      this.isPlaying = false;
      this.isPaused = false;
      this._clearHighlight();
      this.onStateChange?.('ended');
      this.onEnd?.();
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
      this.onStateChange?.('playing');
    };

    utt.onboundary = (e) => {
      if (e.name && e.name !== 'word') return;
      const absoluteIndex = offset + (e.charIndex || 0);
      this._lastAbsoluteIndex = absoluteIndex;
      this._highlightWordAt(absoluteIndex);
    };

    utt.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this._clearHighlight();
      this.onStateChange?.('ended');
      this.onEnd?.();
    };

    utt.onerror = (e) => {
      // 'interrupted' & 'canceled' bukan error sebenarnya (biasanya dari cancel manual)
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      console.error('Speech error:', e);
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
    if (target && target !== this.activeSpan) {
      this.activeSpan?.classList.remove('active');
      target.classList.add('active');
      this.activeSpan = target;
      try { target.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
      this.onWordChange?.(target.textContent, charIndex);
    }
  }

  _clearHighlight() {
    if (this.activeSpan) {
      this.activeSpan.classList.remove('active');
      this.activeSpan = null;
    }
  }

  pause() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.onStateChange?.('paused');
    }
  }

  resume() {
    if (this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.onStateChange?.('playing');
    }
  }

  stop() {
    try { this.synth.cancel(); } catch (e) {}
    this.isPlaying = false;
    this.isPaused = false;
    this._clearHighlight();
    this.onStateChange?.('stopped');
  }

  /**
   * Ubah kecepatan. Kalau sedang bicara, restart dari kata terakhir.
   */
  setRate(newRate) {
    const clamped = Math.max(0.5, Math.min(2, Number(newRate) || 1));
    const prev = this.rate;
    this.rate = clamped;

    if (!this.isPlaying && !this.isPaused) return;
    if (clamped === prev) return;

    // Restart dari awal kata terakhir
    const restartFrom = this.activeSpan
      ? Number(this.activeSpan.dataset.start)
      : this._lastAbsoluteIndex;

    this._clearHighlight();
    this.synth.cancel();
    setTimeout(() => this._speakRange(restartFrom), 80);
  }

  /**
   * Pilih voice terbaik untuk bahasa tertentu
   */
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
 * Tunggu voices siap (Chrome kadang loading async)
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
 * Map kode bahasa ke tag BCP-47 untuk speechSynthesis
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