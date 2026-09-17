import { CONFIG } from './config.js';
import { initAuth, getUser, isLoggedIn } from './auth.js';
import { registerRoute, startRouter, navigate } from './router.js';
import { el, toast, playLoadingAnimation } from './ui.js';
import { startLogoAnimation } from './logo-animation.js';
import { VoiceRecorder, blobToBase64, fmtDuration } from './recorder.js';

// ===================== ROUTES =====================

// --- Menu utama ---
registerRoute('#/', (_, view) => {
  view.appendChild(el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Selamat datang${isLoggedIn() ? ', ' + getUser().name.split(' ')[0] : ''} 👋</h1>
        <p class="text-road/60 text-sm mt-1">Pilih menu untuk mulai membuat catatan mengemudi.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="#/notes/new" class="menu-card">
          <span class="text-2xl">🎙️</span>
          <span class="font-semibold">Buat Catatan</span>
          <span class="text-xs text-road/60">Rekam suara, otomatis jadi teks. Perlu login.</span>
        </a>
        <a href="#/groups/new" class="menu-card">
          <span class="text-2xl">🗂️</span>
          <span class="font-semibold">Buat Group Catatan</span>
          <span class="text-xs text-road/60">Gabung beberapa catatan. Perlu login.</span>
        </a>
        <a href="#/slide" class="menu-card">
          <span class="text-2xl">🎬</span>
          <span class="font-semibold">Lihat Slide Note</span>
          <span class="text-xs text-road/60">Tampilkan slide catatan. Bisa diakses siapa saja.</span>
        </a>
        <a href="#/notes" class="menu-card">
          <span class="text-2xl">📒</span>
          <span class="font-semibold">Catatan Saya</span>
          <span class="text-xs text-road/60">Daftar catatan yang Anda buat. Perlu login.</span>
        </a>
      </div>
    </div>
  `));
});

// --- Catatan saya (placeholder Phase 2C) ---
registerRoute('#/notes', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Catatan Saya</h1>
      <p class="text-sm text-road/60">Fitur daftar catatan akan dibangun pada Phase 2C.</p>
    </div>
  `));
});

// --- Buat catatan baru ---
registerRoute('#/notes/new', (_, view) => {
  view.appendChild(el(`
    <div class="max-w-2xl mx-auto">

      <div class="mb-6">
        <h1 class="text-2xl font-bold">Buat Catatan Baru</h1>
        <p class="text-sm text-road/60 mt-1">Rekam suara Anda, lalu transkripsi otomatis ke teks.</p>
      </div>

      <!-- ============ PANEL REKAMAN UTAMA ============ -->
      <div id="rec-status" class="bg-milk border border-road/10 rounded-2xl p-6 text-center mb-4">
        <div id="rec-visual" class="text-5xl mb-3">🎙️</div>
        <div id="rec-timer" class="text-2xl font-bold tabular-nums text-road/40">00:00</div>
        <div id="rec-hint" class="text-xs text-road/50 mt-1">Tekan tombol untuk mulai merekam</div>
      </div>

      <div class="flex flex-wrap gap-2 justify-center mb-6">
        <button id="btn-record" class="btn btn-primary">
          <span>🎙️</span><span>Mulai Rekam</span>
        </button>
        <button id="btn-stop" class="btn btn-ghost hidden">
          <span>⏹️</span><span>Stop</span>
        </button>
        <button id="btn-cancel-rec" class="btn btn-ghost hidden">
          <span>✖️</span><span>Batalkan Rekaman</span>
        </button>
        <button id="btn-transcribe" class="btn btn-cyan hidden">
          <span>✨</span><span>Proses Transkripsi</span>
        </button>
      </div>

      <!-- ============ EDITOR ============ -->
      <div id="editor-area" class="hidden">
        <label class="block text-sm font-medium mb-1">Judul catatan</label>
        <input id="note-title" type="text" placeholder="Contoh: Teknik parkir paralel"
          class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow" />

        <label class="block text-sm font-medium mb-1">
          Isi catatan
          <span class="text-xs text-road/40 font-normal">(letakkan kursor di posisi yang diinginkan, lalu klik "Tambah Rekam")</span>
        </label>
        <textarea id="note-text" rows="10" placeholder="Hasil transkripsi akan muncul di sini, bisa diedit..."
          class="w-full px-4 py-3 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow font-roboto text-sm leading-relaxed"></textarea>

        <div class="flex flex-wrap gap-2">
          <button id="btn-save" class="btn btn-primary">
            <span>💾</span><span>Simpan Catatan</span>
          </button>
          <button id="btn-append" class="btn btn-cyan">
            <span>🎙️</span><span>Tambah Rekam</span>
          </button>
          <button id="btn-reset" class="btn btn-ghost">
            <span>✖️</span><span>Batal</span>
          </button>
        </div>
      </div>

      <div id="rec-error" class="hidden mt-4 p-4 rounded-xl bg-stopRed/10 border border-stopRed/30 text-sm text-stopRed"></div>

      <!-- ============ MODAL TAMBAH REKAM ============ -->
      <div id="append-modal" class="hidden fixed inset-0 z-50 bg-road/50 flex items-center justify-center p-4">
        <div class="bg-milk rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-road/10">

          <h3 class="font-bold text-lg mb-1">Tambah Rekam</h3>
          <p class="text-xs text-road/60 mb-4">Hasil akan disisipkan pada posisi kursor</p>

          <div class="bg-white border border-road/10 rounded-xl p-4 mb-4">
            <div id="app-rec-visual" class="text-4xl mb-2">🎙️</div>
            <div id="app-rec-timer" class="text-xl font-bold tabular-nums text-road/40">00:00</div>
            <div id="app-rec-hint" class="text-xs text-road/50 mt-1">Siap merekam</div>
          </div>

          <div class="flex flex-wrap gap-2 justify-center">
            <button id="app-btn-record" class="btn btn-primary">
              <span>🎙️</span><span>Mulai</span>
            </button>
            <button id="app-btn-stop" class="btn btn-ghost hidden">
              <span>⏹️</span><span>Stop</span>
            </button>
            <button id="app-btn-transcribe" class="btn btn-cyan hidden">
              <span>✨</span><span>Sisipkan</span>
            </button>
            <button id="app-btn-close" class="btn btn-ghost">
              <span>✖️</span><span>Tutup</span>
            </button>
          </div>

          <div id="app-rec-error" class="hidden mt-3 text-xs text-stopRed"></div>
        </div>
      </div>

    </div>
  `));

  // =====================================================
  // ELEMEN
  // =====================================================
  // Panel rekaman utama
  const btnRecord     = view.querySelector('#btn-record');
  const btnStop       = view.querySelector('#btn-stop');
  const btnCancelRec  = view.querySelector('#btn-cancel-rec');
  const btnTranscribe = view.querySelector('#btn-transcribe');
  const timerEl       = view.querySelector('#rec-timer');
  const visualEl      = view.querySelector('#rec-visual');
  const hintEl        = view.querySelector('#rec-hint');

  // Editor
  const editorArea    = view.querySelector('#editor-area');
  const btnSave       = view.querySelector('#btn-save');
  const btnAppend     = view.querySelector('#btn-append');
  const btnReset      = view.querySelector('#btn-reset');
  const titleInput    = view.querySelector('#note-title');
  const textInput     = view.querySelector('#note-text');

  // Error box
  const errorBox      = view.querySelector('#rec-error');

  // Modal tambah rekam
  const modal         = view.querySelector('#append-modal');
  const appBtnRecord  = view.querySelector('#app-btn-record');
  const appBtnStop    = view.querySelector('#app-btn-stop');
  const appBtnTrans   = view.querySelector('#app-btn-transcribe');
  const appBtnClose   = view.querySelector('#app-btn-close');
  const appTimerEl    = view.querySelector('#app-rec-timer');
  const appVisualEl   = view.querySelector('#app-rec-visual');
  const appHintEl     = view.querySelector('#app-rec-hint');
  const appErrorBox   = view.querySelector('#app-rec-error');

  // =====================================================
  // STATE
  // =====================================================
  let recorder = null;
  let currentBlob = null;
  let currentMime = '';
  let currentDuration = 0;

  let appRecorder = null;
  let appBlob = null;
  let appMime = '';
  let appCursorPos = 0;

  // =====================================================
  // HELPER
  // =====================================================
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
  }
  function clearError() {
    errorBox.classList.add('hidden');
    errorBox.textContent = '';
  }
  function showAppError(msg) {
    appErrorBox.textContent = msg;
    appErrorBox.classList.remove('hidden');
  }
  function clearAppError() {
    appErrorBox.classList.add('hidden');
    appErrorBox.textContent = '';
  }

  // =====================================================
  // REKAMAN UTAMA
  // =====================================================
  btnRecord.addEventListener('click', async () => {
    clearError();

    if (!VoiceRecorder.isSupported()) {
      showError('Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.');
      return;
    }

    try {
      recorder = new VoiceRecorder();
      await recorder.start((ms) => {
        timerEl.textContent = fmtDuration(ms);
        timerEl.classList.remove('text-road/40');
        timerEl.classList.add('text-stopRed');
        visualEl.textContent = (Math.floor(ms / 500) % 2) ? '🔴' : '🎙️';
      });

      btnRecord.classList.add('hidden');
      btnStop.classList.remove('hidden');
      btnCancelRec.classList.remove('hidden');
      btnTranscribe.classList.add('hidden');
      editorArea.classList.add('hidden');
      hintEl.textContent = 'Sedang merekam... bicara dengan jelas';

    } catch (err) {
      showError('Gagal mengakses mikrofon: ' + err.message);
    }
  });

  btnStop.addEventListener('click', async () => {
    if (!recorder) return;
    try {
      const result = await recorder.stop();
      currentBlob = result.blob;
      currentMime = result.mimeType;
      currentDuration = result.durationMs;

      if (currentBlob.size > 19 * 1024 * 1024) {
        showError('Rekaman terlalu besar (' + (currentBlob.size / 1024 / 1024).toFixed(1) + ' MB). Maksimal 19 MB, coba rekam lebih pendek.');
        resetMainButtons();
        return;
      }

      visualEl.textContent = '✅';
      hintEl.textContent = 'Rekaman siap diproses (' + fmtDuration(currentDuration) + ')';
      timerEl.classList.add('text-road/40');
      timerEl.classList.remove('text-stopRed');

      btnStop.classList.add('hidden');
      btnCancelRec.classList.add('hidden');
      btnTranscribe.classList.remove('hidden');
      btnRecord.classList.add('hidden');

    } catch (err) {
      showError('Gagal menghentikan rekaman: ' + err.message);
      resetMainButtons();
    }
  });

  btnCancelRec.addEventListener('click', () => {
    if (recorder) recorder.cancel();
    recorder = null;
    resetMainButtons();
    clearError();
  });

  btnTranscribe.addEventListener('click', async () => {
    clearError();
    if (!currentBlob) return;

    btnTranscribe.disabled = true;
    btnTranscribe.innerHTML = '<span>⏳</span><span>Memproses...</span>';
    hintEl.textContent = 'Mengirim audio ke Gemini...';

    try {
      const base64 = await blobToBase64(currentBlob);
      const { API } = await import('./api.js');
      const result = await API.transcribe(base64, currentMime);

      textInput.value = result.text || '';
      editorArea.classList.remove('hidden');
      hintEl.textContent = 'Transkripsi selesai. Edit teks jika perlu.';

      setTimeout(() => editorArea.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    } catch (err) {
      showError('Transkripsi gagal: ' + err.message);
    } finally {
      btnTranscribe.disabled = false;
      btnTranscribe.innerHTML = '<span>✨</span><span>Proses Transkripsi</span>';
    }
  });

  function resetMainButtons() {
    btnRecord.classList.remove('hidden');
    btnStop.classList.add('hidden');
    btnCancelRec.classList.add('hidden');
    btnTranscribe.classList.add('hidden');
    timerEl.textContent = '00:00';
    timerEl.classList.add('text-road/40');
    timerEl.classList.remove('text-stopRed');
    visualEl.textContent = '🎙️';
    hintEl.textContent = 'Tekan tombol untuk mulai merekam';
  }

  // =====================================================
  // SIMPAN
  // =====================================================
  btnSave.addEventListener('click', async () => {
    clearError();
    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title) { showError('Judul catatan tidak boleh kosong.'); return; }
    if (!text)  { showError('Isi catatan tidak boleh kosong.'); return; }

    btnSave.disabled = true;
    btnSave.innerHTML = '<span>⏳</span><span>Menyimpan...</span>';

    try {
      const { API } = await import('./api.js');
      await API.saveNote({
        title,
        original_text: text,
        language: 'id-ID',
        duration_ms: currentDuration
      });
      toast('Catatan berhasil disimpan!');
      location.hash = '#/notes';
    } catch (err) {
      showError('Gagal menyimpan: ' + err.message);
      btnSave.disabled = false;
      btnSave.innerHTML = '<span>💾</span><span>Simpan Catatan</span>';
    }
  });

  // =====================================================
  // BATAL (reset semua)
  // =====================================================
  btnReset.addEventListener('click', () => {
    if (recorder) recorder.cancel();
    if (appRecorder) appRecorder.cancel();
    recorder = null;
    appRecorder = null;
    currentBlob = null;
    currentMime = '';
    currentDuration = 0;
    appBlob = null;
    appMime = '';
    titleInput.value = '';
    textInput.value = '';
    editorArea.classList.add('hidden');
    resetMainButtons();
    clearError();
    closeAppendModal();
  });

  // =====================================================
  // TAMBAH REKAM (Modal)
  // =====================================================
  btnAppend.addEventListener('click', () => {
    // Simpan posisi kursor saat ini
    appCursorPos = textInput.selectionStart || textInput.value.length;

    // Reset modal state
    appBlob = null;
    appMime = '';
    resetAppendModal();

    // Tampilkan modal
    modal.classList.remove('hidden');
  });

  function resetAppendModal() {
    appTimerEl.textContent = '00:00';
    appTimerEl.classList.add('text-road/40');
    appTimerEl.classList.remove('text-stopRed');
    appVisualEl.textContent = '🎙️';
    appHintEl.textContent = 'Siap merekam';
    appBtnRecord.classList.remove('hidden');
    appBtnStop.classList.add('hidden');
    appBtnTrans.classList.add('hidden');
    clearAppError();
  }

  function closeAppendModal() {
    if (appRecorder) { appRecorder.cancel(); appRecorder = null; }
    modal.classList.add('hidden');
    resetAppendModal();
  }

  // Klik di luar modal untuk menutup
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAppendModal();
  });

  appBtnClose.addEventListener('click', closeAppendModal);

  appBtnRecord.addEventListener('click', async () => {
    clearAppError();

    if (!VoiceRecorder.isSupported()) {
      showAppError('Browser tidak mendukung rekaman.');
      return;
    }

    try {
      appRecorder = new VoiceRecorder();
      await appRecorder.start((ms) => {
        appTimerEl.textContent = fmtDuration(ms);
        appTimerEl.classList.remove('text-road/40');
        appTimerEl.classList.add('text-stopRed');
        appVisualEl.textContent = (Math.floor(ms / 500) % 2) ? '🔴' : '🎙️';
      });

      appBtnRecord.classList.add('hidden');
      appBtnStop.classList.remove('hidden');
      appBtnTrans.classList.add('hidden');
      appHintEl.textContent = 'Sedang merekam... bicara dengan jelas';

    } catch (err) {
      showAppError('Gagal mengakses mikrofon: ' + err.message);
    }
  });

  appBtnStop.addEventListener('click', async () => {
    if (!appRecorder) return;
    try {
      const result = await appRecorder.stop();
      appBlob = result.blob;
      appMime = result.mimeType;

      if (appBlob.size > 19 * 1024 * 1024) {
        showAppError('Rekaman terlalu besar. Coba lebih pendek.');
        resetAppendModal();
        return;
      }

      appVisualEl.textContent = '✅';
      appHintEl.textContent = 'Siap disisipkan ke catatan';
      appTimerEl.classList.add('text-road/40');
      appTimerEl.classList.remove('text-stopRed');

      appBtnStop.classList.add('hidden');
      appBtnTrans.classList.remove('hidden');
      appBtnRecord.classList.add('hidden');

    } catch (err) {
      showAppError('Gagal menghentikan rekaman: ' + err.message);
      resetAppendModal();
    }
  });

  appBtnTrans.addEventListener('click', async () => {
    clearAppError();
    if (!appBlob) return;

    appBtnTrans.disabled = true;
    appBtnTrans.innerHTML = '<span>⏳</span><span>Memproses...</span>';
    appHintEl.textContent = 'Mengirim audio ke Gemini...';

    try {
      const base64 = await blobToBase64(appBlob);
      const { API } = await import('./api.js');
      const result = await API.transcribe(base64, appMime);

      insertTextAtCursor(result.text || '');
      toast('Teks tambahan disisipkan');
      closeAppendModal();

    } catch (err) {
      showAppError('Transkripsi gagal: ' + err.message);
      appBtnTrans.disabled = false;
      appBtnTrans.innerHTML = '<span>✨</span><span>Sisipkan</span>';
    }
  });

  /**
   * Sisipkan teks di posisi kursor yang tersimpan
   * Tambahkan spasi/tanda pemisah agar rapi
   */
  function insertTextAtCursor(text) {
    if (!text) return;

    const value = textInput.value;
    const pos = Math.min(appCursorPos, value.length);

    const before = value.substring(0, pos);
    const after  = value.substring(pos);

    // Tambah spasi/tanda baca jika perlu
    let prefix = '';
    let suffix = '';
    if (before && !/[\s\n]$/.test(before)) prefix = ' ';
    if (after && !/^[\s\n]/.test(after))   suffix = ' ';

    const inserted = prefix + text + suffix;
    textInput.value = before + inserted + after;

    // Pindahkan kursor ke akhir teks yang baru disisipkan
    const newPos = pos + inserted.length;
    textInput.focus();
    textInput.setSelectionRange(newPos, newPos);
    appCursorPos = newPos;
  }

  // =====================================================
  // CLEANUP
  // =====================================================
  return () => {
    if (recorder) recorder.cancel();
    if (appRecorder) appRecorder.cancel();
  };
});

// --- Group (placeholder Phase 4) ---
registerRoute('#/groups', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Group Catatan</h1>
      <p class="text-sm text-road/60">Fitur grouping akan dibangun pada Phase 4.</p>
    </div>
  `));
});

registerRoute('#/groups/new', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Buat Group</h1>
      <p class="text-sm text-road/60">Akan dibangun pada Phase 4.</p>
    </div>
  `));
});

// --- Slide publik (placeholder Phase 4) ---
registerRoute('#/slide', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Slide Note</h1>
      <p class="text-sm text-road/60">Daftar slide publik akan dibangun pada Phase 4.</p>
    </div>
  `));
});

// ===================== BOOT =====================

async function boot() {
  document.getElementById('year').textContent = new Date().getFullYear();

  await playLoadingAnimation('#loading-sign');

  const loading = document.getElementById('loading-screen');
  loading.classList.add('sign-fade-out');
  setTimeout(() => {
    loading.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 400);

  initAuth(() => {
    navigate();
  });

  startRouter();

  startLogoAnimation();
}

boot();