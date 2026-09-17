// =====================================================
// MediaRecorder wrapper untuk rekam suara
// Audio HANYA di memori browser, tidak disimpan permanen
// =====================================================

export class VoiceRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.chunks = [];
    this.stream = null;
    this.startTime = 0;
    this.mimeType = '';
    this._timer = null;
  }

  /**
   * Cek apakah browser mendukung MediaRecorder
   */
  static isSupported() {
    return !!(navigator.mediaDevices && window.MediaRecorder);
  }

  /**
   * Minta izin mikrofon & mulai rekam
   * @param {Function} onTick - callback(timerMs) dipanggil tiap 100ms
   */
  async start(onTick) {
    if (!VoiceRecorder.isSupported()) {
      throw new Error('Browser tidak mendukung rekaman suara');
    }

    // Minta izin mikrofon
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    // Pilih MIME type yang didukung
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4'
    ];
    this.mimeType = candidates.find(t => MediaRecorder.isTypeSupported(t)) || '';

    const options = this.mimeType ? { mimeType: this.mimeType } : {};
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    this.chunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) this.chunks.push(e.data);
    };

    this.mediaRecorder.start(250); // chunk tiap 250ms
    this.startTime = Date.now();

    // Timer
    this._timer = setInterval(() => {
      if (onTick) onTick(Date.now() - this.startTime);
    }, 100);
  }

  /**
   * Stop rekam, kembalikan { blob, mimeType, durationMs }
   */
  stop() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) return reject(new Error('Belum ada rekaman'));

      this.mediaRecorder.onstop = () => {
        clearInterval(this._timer);
        const durationMs = Date.now() - this.startTime;
        const blob = new Blob(this.chunks, { type: this.mimeType || 'audio/webm' });
        this._cleanup();
        resolve({ blob, mimeType: blob.type, durationMs });
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Batalkan rekaman tanpa kembalikan data
   */
  cancel() {
    try { this.mediaRecorder?.stop(); } catch (e) {}
    clearInterval(this._timer);
    this._cleanup();
  }

  _cleanup() {
    try { this.stream?.getTracks().forEach(t => t.stop()); } catch (e) {}
    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];
  }
}

/**
 * Konversi Blob ke Base64 string (tanpa prefix data:)
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result || '';
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.substring(comma + 1) : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Format ms → mm:ss
 */
export function fmtDuration(ms) {
  const total = Math.floor(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
}