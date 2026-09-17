import { CONFIG } from './config.js';
import { initAuth, getUser, isLoggedIn } from './auth.js';
import { registerRoute, startRouter, navigate } from './router.js';
import { el, toast, playLoadingAnimation, fmtDate } from './ui.js';
import { startLogoAnimation } from './logo-animation.js';
import { VoiceRecorder, blobToBase64, fmtDuration } from './recorder.js';

// ===================== HELPER UMUM =====================
function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function truncate(s = '', n = 160) {
  s = String(s);
  return s.length > n ? s.substring(0, n).trim() + '…' : s;
}

function loadingBlock(text = 'Memuat...') {
  return `
    <div class="text-center py-20 text-road/50">
      <div class="inline-block w-8 h-8 border-4 border-road/10 border-t-cyanGlow rounded-full animate-spin mb-3"></div>
      <p class="text-sm">${text}</p>
    </div>
  `;
}

function errorBlock(msg, retryHash = null) {
  return `
    <div class="bg-stopRed/10 border border-stopRed/30 rounded-2xl p-6 text-center">
      <p class="text-stopRed font-medium mb-3">⚠️ ${escapeHtml(msg)}</p>
      ${retryHash ? `<a href="${retryHash}" class="btn btn-ghost inline-flex">🔄 Coba Lagi</a>` : ''}
    </div>
  `;
}

/**
 * Route guard: kalau belum login, redirect ke beranda.
 * Return true kalau boleh lanjut.
 */
function guardRoute() {
  if (!isLoggedIn()) {
    toast('Silakan login terlebih dahulu');
    location.hash = '#/';
    return false;
  }
  return true;
}

// ===================== ROUTES =====================

// --- Menu utama (publik) ---
registerRoute('#/', (_, view) => {
  const logged = isLoggedIn();

  view.appendChild(el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Selamat datang${logged ? ', ' + getUser().name.split(' ')[0] : ''} 👋</h1>
        <p class="text-road/60 text-sm mt-1">
          ${logged
            ? 'Pilih menu untuk mulai membuat catatan mengemudi.'
            : 'Silakan login untuk mengakses menu bertanda 🔒.'}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="menu-grid">
        <a href="#/notes/new" class="menu-card ${logged ? '' : 'menu-card-locked'}" data-requires-login="true">
          <span class="text-2xl">🎙️</span>
          <span class="font-semibold">Buat Catatan</span>
          <span class="text-xs text-road/60">Rekam suara, otomatis jadi teks. Perlu login.</span>
        </a>
        <a href="#/groups/new" class="menu-card ${logged ? '' : 'menu-card-locked'}" data-requires-login="true">
          <span class="text-2xl">🗂️</span>
          <span class="font-semibold">Buat Group Catatan</span>
          <span class="text-xs text-road/60">Gabung beberapa catatan. Perlu login.</span>
        </a>
        <a href="#/slide" class="menu-card">
          <span class="text-2xl">🎬</span>
          <span class="font-semibold">Lihat Slide Note</span>
          <span class="text-xs text-road/60">Tampilkan slide catatan. Bisa diakses siapa saja.</span>
        </a>
        <a href="#/notes" class="menu-card ${logged ? '' : 'menu-card-locked'}" data-requires-login="true">
          <span class="text-2xl">📒</span>
          <span class="font-semibold">Catatan Saya</span>
          <span class="text-xs text-road/60">Daftar catatan yang Anda buat. Perlu login.</span>
        </a>
      </div>
    </div>
  `));

  // Intercept klik pada menu terkunci
  view.querySelectorAll('[data-requires-login]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!isLoggedIn()) {
        e.preventDefault();
        toast('Silakan login terlebih dahulu untuk mengakses menu ini');
      }
    });
  });
});

// =====================================================
// --- DAFTAR CATATAN (#/notes) ---
// =====================================================
registerRoute('#/notes', (_, view) => {
  if (!guardRoute()) return;

  const wrap = el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Catatan Saya</h1>
        <p class="text-sm text-road/60 mt-1">Semua catatan yang Anda buat.</p>
      </div>
      <div id="notes-list">${loadingBlock('Memuat catatan...')}</div>
    </div>
  `);
  view.appendChild(wrap);

  const listEl = wrap.querySelector('#notes-list');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const notes = await API.listNotes();
      renderList(notes);
    } catch (err) {
      listEl.innerHTML = errorBlock('Gagal memuat: ' + err.message, '#/notes');
    }
  })();

  function renderList(notes) {
    if (!notes || notes.length === 0) {
      listEl.innerHTML = `
        <div class="bg-milk border border-road/10 rounded-2xl p-10 text-center">
          <div class="text-5xl mb-3">📭</div>
          <p class="font-medium mb-1">Belum ada catatan</p>
          <p class="text-sm text-road/60 mb-5">Mulai dengan merekam catatan pertama Anda.</p>
          <a href="#/notes/new" class="btn btn-primary inline-flex">
            <span>🎙️</span><span>Buat Catatan Pertama</span>
          </a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = `
      <p class="text-xs text-road/50 mb-3">${notes.length} catatan</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${notes.map(noteCard).join('')}
      </div>
    `;

    listEl.querySelectorAll('[data-delete-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-delete-id');
        const title = btn.getAttribute('data-title') || 'Catatan ini';
        openDeleteConfirm(title, async () => {
          try {
            const { API } = await import('./api.js');
            await API.deleteNote(id);
            toast('Catatan dihapus');
            const notes = await API.listNotes();
            renderList(notes);
          } catch (err) {
            toast('Gagal menghapus: ' + err.message);
          }
        });
      });
    });
  }

  function noteCard(n) {
    const preview = truncate(n.original_text || '', 140);
    const dur = n.duration_ms ? fmtDuration(Number(n.duration_ms)) : '-';
    return `
      <div class="menu-card group">
        <a href="#/notes/${encodeURIComponent(n.id)}" class="flex-1 flex flex-col gap-1">
          <h3 class="font-semibold leading-snug line-clamp-2">${escapeHtml(n.title || 'Tanpa judul')}</h3>
          <p class="text-xs text-road/60 leading-relaxed line-clamp-3">${escapeHtml(preview)}</p>
          <div class="flex items-center gap-3 text-[11px] text-road/40 mt-2">
            <span>📅 ${escapeHtml(fmtDate(n.created_at))}</span>
            <span>⏱ ${dur}</span>
          </div>
        </a>
        <div class="flex gap-1 pt-2 border-t border-road/5 mt-2">
          <a href="#/notes/${encodeURIComponent(n.id)}" class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-road/5 text-road/70">👁 Lihat</a>
          <a href="#/notes/${encodeURIComponent(n.id)}/edit" class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-road/5 text-road/70">✏️ Edit</a>
          <button type="button" data-delete-id="${escapeHtml(n.id)}" data-title="${escapeHtml(n.title)}"
            class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-stopRed/10 text-stopRed/80">🗑 Hapus</button>
        </div>
      </div>
    `;
  }
});

// =====================================================
// --- BUAT CATATAN BARU (#/notes/new) ---
// =====================================================
registerRoute('#/notes/new', (_, view) => {
  if (!guardRoute()) return;

  view.appendChild(el(`
    <div class="max-w-2xl mx-auto">

      <div class="mb-6">
        <h1 class="text-2xl font-bold">Buat Catatan Baru</h1>
        <p class="text-sm text-road/60 mt-1">Rekam suara Anda, lalu transkripsi otomatis ke teks.</p>
      </div>

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

  const btnRecord     = view.querySelector('#btn-record');
  const btnStop       = view.querySelector('#btn-stop');
  const btnCancelRec  = view.querySelector('#btn-cancel-rec');
  const btnTranscribe = view.querySelector('#btn-transcribe');
  const timerEl       = view.querySelector('#rec-timer');
  const visualEl      = view.querySelector('#rec-visual');
  const hintEl        = view.querySelector('#rec-hint');
  const editorArea    = view.querySelector('#editor-area');
  const btnSave       = view.querySelector('#btn-save');
  const btnAppend     = view.querySelector('#btn-append');
  const btnReset      = view.querySelector('#btn-reset');
  const titleInput    = view.querySelector('#note-title');
  const textInput     = view.querySelector('#note-text');
  const errorBox      = view.querySelector('#rec-error');

  const modal         = view.querySelector('#append-modal');
  const appBtnRecord  = view.querySelector('#app-btn-record');
  const appBtnStop    = view.querySelector('#app-btn-stop');
  const appBtnTrans   = view.querySelector('#app-btn-transcribe');
  const appBtnClose   = view.querySelector('#app-btn-close');
  const appTimerEl    = view.querySelector('#app-rec-timer');
  const appVisualEl   = view.querySelector('#app-rec-visual');
  const appHintEl     = view.querySelector('#app-rec-hint');
  const appErrorBox   = view.querySelector('#app-rec-error');

  let recorder = null;
  let currentBlob = null;
  let currentMime = '';
  let currentDuration = 0;

  let appRecorder = null;
  let appBlob = null;
  let appMime = '';
  let appCursorPos = 0;

  function showError(msg) { errorBox.textContent = msg; errorBox.classList.remove('hidden'); }
  function clearError() { errorBox.classList.add('hidden'); errorBox.textContent = ''; }
  function showAppError(msg) { appErrorBox.textContent = msg; appErrorBox.classList.remove('hidden'); }
  function clearAppError() { appErrorBox.classList.add('hidden'); appErrorBox.textContent = ''; }

  btnRecord.addEventListener('click', async () => {
    clearError();
    if (!VoiceRecorder.isSupported()) { showError('Browser Anda tidak mendukung rekaman suara.'); return; }
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
        showError('Rekaman terlalu besar. Maksimal 19 MB.');
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
      await API.saveNote({ title, original_text: text, language: 'id-ID', duration_ms: currentDuration });
      toast('Catatan berhasil disimpan!');
      location.hash = '#/notes';
    } catch (err) {
      showError('Gagal menyimpan: ' + err.message);
      btnSave.disabled = false;
      btnSave.innerHTML = '<span>💾</span><span>Simpan Catatan</span>';
    }
  });

  btnReset.addEventListener('click', () => {
    if (recorder) recorder.cancel();
    if (appRecorder) appRecorder.cancel();
    recorder = null; appRecorder = null;
    currentBlob = null; currentMime = ''; currentDuration = 0;
    appBlob = null; appMime = '';
    titleInput.value = ''; textInput.value = '';
    editorArea.classList.add('hidden');
    resetMainButtons();
    clearError();
    closeAppendModal();
  });

  btnAppend.addEventListener('click', () => {
    appCursorPos = textInput.selectionStart || textInput.value.length;
    appBlob = null; appMime = '';
    resetAppendModal();
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

  modal.addEventListener('click', (e) => { if (e.target === modal) closeAppendModal(); });
  appBtnClose.addEventListener('click', closeAppendModal);

  appBtnRecord.addEventListener('click', async () => {
    clearAppError();
    if (!VoiceRecorder.isSupported()) { showAppError('Browser tidak mendukung rekaman.'); return; }
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
        showAppError('Rekaman terlalu besar.');
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

  function insertTextAtCursor(text) {
    if (!text) return;
    const value = textInput.value;
    const pos = Math.min(appCursorPos, value.length);
    const before = value.substring(0, pos);
    const after  = value.substring(pos);
    let prefix = '', suffix = '';
    if (before && !/[\s\n]$/.test(before)) prefix = ' ';
    if (after && !/^[\s\n]/.test(after))   suffix = ' ';
    const inserted = prefix + text + suffix;
    textInput.value = before + inserted + after;
    const newPos = pos + inserted.length;
    textInput.focus();
    textInput.setSelectionRange(newPos, newPos);
    appCursorPos = newPos;
  }

  return () => {
    if (recorder) recorder.cancel();
    if (appRecorder) appRecorder.cancel();
  };
});

// =====================================================
// --- DETAIL CATATAN (#/notes/:id) ---
// =====================================================
registerRoute('#/notes/:id', (params, view) => {
  if (!guardRoute()) return;

  const id = params.id;

  const wrap = el(`
    <div class="max-w-3xl mx-auto">
      <a href="#/notes" class="inline-flex items-center gap-1 text-sm text-road/60 hover:text-road mb-4">
        <span>←</span><span>Kembali ke Daftar</span>
      </a>
      <div id="detail-body">${loadingBlock('Memuat catatan...')}</div>
    </div>
  `);
  view.appendChild(wrap);

  const bodyEl = wrap.querySelector('#detail-body');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const note = await API.getNote(id);
      renderDetail(note);
    } catch (err) {
      bodyEl.innerHTML = errorBlock('Gagal memuat: ' + err.message, '#/notes');
    }
  })();

  function renderDetail(n) {
    const dur = n.duration_ms ? fmtDuration(Number(n.duration_ms)) : '-';
    bodyEl.innerHTML = `
      <div class="bg-white border border-road/10 rounded-2xl p-6 mb-4">
        <h1 class="text-2xl font-bold leading-snug mb-3">${escapeHtml(n.title || 'Tanpa judul')}</h1>
        <div class="flex flex-wrap items-center gap-3 text-xs text-road/50 mb-5">
          <span>📅 ${escapeHtml(fmtDate(n.created_at))}</span>
          <span>⏱ ${dur}</span>
          <span class="px-2 py-0.5 rounded-full bg-road/5">ID: ${escapeHtml(n.id)}</span>
        </div>
        <div class="prose max-w-none text-[15px] leading-relaxed whitespace-pre-wrap break-words">${escapeHtml(n.original_text || '')}</div>
      </div>

      <div class="flex flex-wrap gap-2">
        <a href="#/notes/${encodeURIComponent(n.id)}/edit" class="btn btn-primary">
          <span>✏️</span><span>Edit</span>
        </a>
        <button id="btn-delete-detail" class="btn btn-ghost text-stopRed border-stopRed/30">
          <span>🗑</span><span>Hapus</span>
        </button>
      </div>
    `;

    bodyEl.querySelector('#btn-delete-detail').addEventListener('click', () => {
      openDeleteConfirm(n.title || 'Catatan ini', async () => {
        try {
          const { API } = await import('./api.js');
          await API.deleteNote(n.id);
          toast('Catatan dihapus');
          location.hash = '#/notes';
        } catch (err) {
          toast('Gagal menghapus: ' + err.message);
        }
      });
    });
  }
});

// =====================================================
// --- EDIT CATATAN (#/notes/:id/edit) ---
// =====================================================
registerRoute('#/notes/:id/edit', (params, view) => {
  if (!guardRoute()) return;

  const id = params.id;

  const wrap = el(`
    <div class="max-w-2xl mx-auto">
      <a href="#/notes/${encodeURIComponent(id)}" class="inline-flex items-center gap-1 text-sm text-road/60 hover:text-road mb-4">
        <span>←</span><span>Kembali ke Detail</span>
      </a>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Edit Catatan</h1>
        <p class="text-sm text-road/60 mt-1">Ubah judul atau isi catatan Anda.</p>
      </div>
      <div id="edit-body">${loadingBlock('Memuat catatan...')}</div>
    </div>
  `);
  view.appendChild(wrap);

  const bodyEl = wrap.querySelector('#edit-body');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const note = await API.getNote(id);
      renderEdit(note);
    } catch (err) {
      bodyEl.innerHTML = errorBlock('Gagal memuat: ' + err.message, '#/notes');
    }
  })();

  function renderEdit(n) {
    bodyEl.innerHTML = `
      <label class="block text-sm font-medium mb-1">Judul catatan</label>
      <input id="edit-title" type="text" value="${escapeHtml(n.title || '')}"
        class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow" />

      <label class="block text-sm font-medium mb-1">Isi catatan</label>
      <textarea id="edit-text" rows="14"
        class="w-full px-4 py-3 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow font-roboto text-sm leading-relaxed">${escapeHtml(n.original_text || '')}</textarea>

      <div class="flex flex-wrap gap-2">
        <button id="edit-save" class="btn btn-primary">
          <span>💾</span><span>Simpan Perubahan</span>
        </button>
        <a href="#/notes/${encodeURIComponent(n.id)}" class="btn btn-ghost">
          <span>✖️</span><span>Batal</span>
        </a>
        <button id="edit-delete" class="btn btn-ghost text-stopRed border-stopRed/30 ml-auto">
          <span>🗑</span><span>Hapus</span>
        </button>
      </div>

      <div id="edit-error" class="hidden mt-4 p-4 rounded-xl bg-stopRed/10 border border-stopRed/30 text-sm text-stopRed"></div>
    `;

    const titleIn = bodyEl.querySelector('#edit-title');
    const textIn  = bodyEl.querySelector('#edit-text');
    const btnSave = bodyEl.querySelector('#edit-save');
    const btnDel  = bodyEl.querySelector('#edit-delete');
    const errBox  = bodyEl.querySelector('#edit-error');

    function showErr(msg) { errBox.textContent = msg; errBox.classList.remove('hidden'); }
    function clearErr() { errBox.classList.add('hidden'); errBox.textContent = ''; }

    btnSave.addEventListener('click', async () => {
      clearErr();
      const title = titleIn.value.trim();
      const text  = textIn.value.trim();
      if (!title) { showErr('Judul tidak boleh kosong.'); return; }
      if (!text)  { showErr('Isi tidak boleh kosong.'); return; }

      btnSave.disabled = true;
      btnSave.innerHTML = '<span>⏳</span><span>Menyimpan...</span>';

      try {
        const { API } = await import('./api.js');
        await API.saveNote({
          id: n.id,
          title,
          original_text: text,
          language: n.language || 'id-ID',
          duration_ms: n.duration_ms || 0,
          created_at: n.created_at
        });
        toast('Perubahan disimpan');
        location.hash = '#/notes/' + encodeURIComponent(n.id);
      } catch (err) {
        showErr('Gagal menyimpan: ' + err.message);
        btnSave.disabled = false;
        btnSave.innerHTML = '<span>💾</span><span>Simpan Perubahan</span>';
      }
    });

    btnDel.addEventListener('click', () => {
      openDeleteConfirm(n.title || 'Catatan ini', async () => {
        try {
          const { API } = await import('./api.js');
          await API.deleteNote(n.id);
          toast('Catatan dihapus');
          location.hash = '#/notes';
        } catch (err) {
          toast('Gagal menghapus: ' + err.message);
        }
      });
    });
  }
});

// =====================================================
// --- Group (placeholder Phase 4) ---
// =====================================================
registerRoute('#/groups', (_, view) => {
  if (!guardRoute()) return;
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Group Catatan</h1>
      <p class="text-sm text-road/60">Fitur grouping akan dibangun pada Phase 4.</p>
    </div>
  `));
});

registerRoute('#/groups/new', (_, view) => {
  if (!guardRoute()) return;
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Buat Group</h1>
      <p class="text-sm text-road/60">Akan dibangun pada Phase 4.</p>
    </div>
  `));
});

// =====================================================
// --- Slide publik (placeholder Phase 4) ---
// =====================================================
registerRoute('#/slide', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Slide Note</h1>
      <p class="text-sm text-road/60">Daftar slide publik akan dibangun pada Phase 4.</p>
    </div>
  `));
});

// =====================================================
// MODAL KONFIRMASI HAPUS (global)
// =====================================================
function openDeleteConfirm(title, onConfirm) {
  const existing = document.getElementById('global-confirm');
  if (existing) existing.remove();

  const modal = el(`
    <div id="global-confirm" class="fixed inset-0 z-[60] bg-road/60 flex items-center justify-center p-4">
      <div class="bg-milk rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-road/10 text-center">
        <div class="text-4xl mb-3">🗑</div>
        <h3 class="font-bold text-lg mb-2">Hapus Catatan?</h3>
        <p class="text-sm text-road/70 mb-5">
          Catatan <strong>"${escapeHtml(title)}"</strong> akan dihapus permanen dan tidak bisa dikembalikan.
        </p>
        <div class="flex gap-2 justify-center">
          <button id="gc-cancel" class="btn btn-ghost">
            <span>✖️</span><span>Batal</span>
          </button>
          <button id="gc-yes" class="btn" style="background:#D7263D;color:#fff">
            <span>🗑</span><span>Ya, Hapus</span>
          </button>
        </div>
      </div>
    </div>
  `);
  document.body.appendChild(modal);

  const close = () => modal.remove();

  modal.querySelector('#gc-cancel').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  modal.querySelector('#gc-yes').addEventListener('click', async () => {
    close();
    await onConfirm();
  });
}

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

  // Init auth (tanpa callback)
  initAuth();

  // Dengarkan perubahan status login → refresh halaman
  document.addEventListener('auth:change', () => {
    navigate();
  });

  startRouter();

  startLogoAnimation();
}

boot();