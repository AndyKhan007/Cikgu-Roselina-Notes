import { CONFIG } from './config.js';
import { initAuth, getUser, isLoggedIn, refreshAuthUI } from './auth.js';
import { registerRoute, startRouter, navigate } from './router.js';
import { el, toast, playLoadingAnimation, fmtDate } from './ui.js';
import { startLogoAnimation } from './logo-animation.js';
import { VoiceRecorder, blobToBase64, fmtDuration } from './recorder.js';
import { t, applyI18n } from './lang.js';
import { openLangSwitcher } from './lang-switcher.js';
import { Narrator, waitForVoices, SPEECH_LANG, TRANSLATE_LANGS } from './narrator.js';
import { mountSlideList } from './slide-list.js';
import { mountSlideViewer } from './slide-viewer.js';

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

function loadingBlock(text = null) {
  return `
    <div class="text-center py-20 text-road/50">
      <div class="inline-block w-8 h-8 border-4 border-road/10 border-t-cyanGlow rounded-full animate-spin mb-3"></div>
      <p class="text-sm">${text || t('Memuat catatan...')}</p>
    </div>
  `;
}

function errorBlock(msg, retryHash = null) {
  return `
    <div class="bg-stopRed/10 border border-stopRed/30 rounded-2xl p-6 text-center">
      <p class="text-stopRed font-medium mb-3">⚠️ ${escapeHtml(msg)}</p>
      ${retryHash ? `<a href="${retryHash}" class="btn btn-ghost inline-flex">🔄 ${t('Coba Lagi')}</a>` : ''}
    </div>
  `;
}

function guardRoute() {
  if (!isLoggedIn()) {
    toast(t('Silakan login terlebih dahulu'));
    location.hash = '#/';
    return false;
  }
  return true;
}

// ===================== ROUTES =====================

registerRoute('#/', (_, view) => {
  const logged = isLoggedIn();
  view.appendChild(el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t('Selamat datang')}${logged ? ', ' + getUser().name.split(' ')[0] : ''} 👋</h1>
        <p class="text-road/60 text-sm mt-1">
          ${logged ? t('Pilih menu untuk mulai membuat catatan mengemudi.') : t('Silakan login untuk mengakses menu bertanda 🔒.')}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="menu-grid">
        <a href="#/notes/new" class="menu-card ${logged ? '' : 'menu-card-locked'}" data-requires-login="true">
          <span class="text-2xl">🎙️</span>
          <span class="font-semibold">${t('Buat Catatan')}</span>
          <span class="text-xs text-road/60">${t('Rekam suara, otomatis jadi teks. Perlu login.')}</span>
        </a>
        <a href="#/groups/new" class="menu-card ${logged ? '' : 'menu-card-locked'}" data-requires-login="true">
          <span class="text-2xl">🗂️</span>
          <span class="font-semibold">${t('Buat Group Catatan')}</span>
          <span class="text-xs text-road/60">${t('Gabung beberapa catatan. Perlu login.')}</span>
        </a>
        <a href="#/slide" class="menu-card">
          <span class="text-2xl">🎬</span>
          <span class="font-semibold">${t('Lihat Slide Note')}</span>
          <span class="text-xs text-road/60">${t('Tampilkan slide catatan. Bisa diakses siapa saja.')}</span>
        </a>
        <a href="#/notes" class="menu-card ${logged ? '' : 'menu-card-locked'}" data-requires-login="true">
          <span class="text-2xl">📒</span>
          <span class="font-semibold">${t('Catatan Saya')}</span>
          <span class="text-xs text-road/60">${t('Daftar catatan yang Anda buat. Perlu login.')}</span>
        </a>
      </div>
    </div>
  `));
  view.querySelectorAll('[data-requires-login]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!isLoggedIn()) { e.preventDefault(); toast(t('Silakan login terlebih dahulu untuk mengakses menu ini')); }
    });
  });
});

// =====================================================
// DAFTAR CATATAN
// =====================================================
registerRoute('#/notes', (_, view) => {
  if (!guardRoute()) return;
  const wrap = el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t('Catatan Saya')}</h1>
        <p class="text-sm text-road/60 mt-1">${t('Semua catatan yang Anda buat.')}</p>
      </div>
      <div id="notes-list">${loadingBlock()}</div>
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
      listEl.innerHTML = errorBlock(t('Gagal memuat') + ': ' + err.message, '#/notes');
    }
  })();

  function renderList(notes) {
    if (!notes || notes.length === 0) {
      listEl.innerHTML = `
        <div class="bg-milk border border-road/10 rounded-2xl p-10 text-center">
          <div class="text-5xl mb-3">📭</div>
          <p class="font-medium mb-1">${t('Belum ada catatan')}</p>
          <p class="text-sm text-road/60 mb-5">${t('Mulai dengan merekam catatan pertama Anda.')}</p>
          <a href="#/notes/new" class="btn btn-primary inline-flex"><span>🎙️</span><span>${t('Buat Catatan Pertama')}</span></a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = `
      <p class="text-xs text-road/50 mb-3">${notes.length} ${t('catatan')}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${notes.map(noteCard).join('')}
      </div>
    `;

    listEl.querySelectorAll('[data-delete-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const id = btn.getAttribute('data-delete-id');
        const title = btn.getAttribute('data-title') || t('Hapus');
        openDeleteConfirm(title, async () => {
          try {
            const { API } = await import('./api.js');
            await API.deleteNote(id);
            toast(t('Catatan dihapus'));
            navigate();
          } catch (err) { toast(t('Gagal menghapus') + ': ' + err.message); }
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
          <h3 class="font-semibold leading-snug line-clamp-2">${escapeHtml(n.title || t('Judul catatan'))}</h3>
          <p class="text-xs text-road/60 leading-relaxed line-clamp-3">${escapeHtml(preview)}</p>
          <div class="flex items-center gap-3 text-[11px] text-road/40 mt-2">
            <span>📅 ${escapeHtml(fmtDate(n.created_at))}</span>
            <span>⏱ ${dur}</span>
          </div>
        </a>
        <div class="flex gap-1 pt-2 border-t border-road/5 mt-2">
          <a href="#/notes/${encodeURIComponent(n.id)}" class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-road/5 text-road/70">👁 ${t('Lihat')}</a>
          <a href="#/notes/${encodeURIComponent(n.id)}/edit" class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-road/5 text-road/70">✏️ ${t('Edit')}</a>
          <button type="button" data-delete-id="${escapeHtml(n.id)}" data-title="${escapeHtml(n.title)}"
            class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-stopRed/10 text-stopRed/80">🗑 ${t('Hapus')}</button>
        </div>
      </div>
    `;
  }
});

// =====================================================
// BUAT CATATAN BARU
// =====================================================
registerRoute('#/notes/new', (_, view) => {
  if (!guardRoute()) return;
  view.appendChild(el(`
    <div class="max-w-2xl mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t('Buat Catatan Baru')}</h1>
        <p class="text-sm text-road/60 mt-1">${t('Rekam suara Anda, lalu transkripsi otomatis ke teks.')}</p>
      </div>
      <div id="rec-status" class="bg-milk border border-road/10 rounded-2xl p-6 text-center mb-4">
        <div id="rec-visual" class="text-5xl mb-3">🎙️</div>
        <div id="rec-timer" class="text-2xl font-bold tabular-nums text-road/40">00:00</div>
        <div id="rec-hint" class="text-xs text-road/50 mt-1">${t('Tekan tombol untuk mulai merekam')}</div>
      </div>
      <div class="flex flex-wrap gap-2 justify-center mb-6">
        <button id="btn-record" class="btn btn-primary"><span>🎙️</span><span>${t('Mulai Rekam')}</span></button>
        <button id="btn-stop" class="btn btn-ghost hidden"><span>⏹️</span><span>${t('Stop')}</span></button>
        <button id="btn-cancel-rec" class="btn btn-ghost hidden"><span>✖️</span><span>${t('Batalkan Rekaman')}</span></button>
        <button id="btn-transcribe" class="btn btn-cyan hidden"><span>✨</span><span>${t('Proses Transkripsi')}</span></button>
      </div>
      <div id="editor-area" class="hidden">
        <label class="block text-sm font-medium mb-1">${t('Judul catatan')}</label>
        <input id="note-title" type="text" placeholder="${t('Contoh: Teknik parkir paralel')}"
          class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow" />
        <label class="block text-sm font-medium mb-1">
          ${t('Isi catatan')}
          <span class="text-xs text-road/40 font-normal">(${t('Hasil akan disisipkan pada posisi kursor')})</span>
        </label>
        <textarea id="note-text" rows="10" placeholder="${t('Hasil transkripsi akan muncul di sini, bisa diedit...')}"
          class="w-full px-4 py-3 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow font-roboto text-sm leading-relaxed"></textarea>
        <div class="flex flex-wrap gap-2">
          <button id="btn-save" class="btn btn-primary"><span>💾</span><span>${t('Simpan Catatan')}</span></button>
          <button id="btn-append" class="btn btn-cyan"><span>🎙️</span><span>${t('Tambah Rekam')}</span></button>
          <button id="btn-reset" class="btn btn-ghost"><span>✖️</span><span>${t('Batal')}</span></button>
        </div>
      </div>
      <div id="rec-error" class="hidden mt-4 p-4 rounded-xl bg-stopRed/10 border border-stopRed/30 text-sm text-stopRed"></div>
      <div id="append-modal" class="hidden fixed inset-0 z-50 bg-road/50 flex items-center justify-center p-4">
        <div class="bg-milk rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-road/10">
          <h3 class="font-bold text-lg mb-1">${t('Tambah Rekam')}</h3>
          <p class="text-xs text-road/60 mb-4">${t('Hasil akan disisipkan pada posisi kursor')}</p>
          <div class="bg-white border border-road/10 rounded-xl p-4 mb-4">
            <div id="app-rec-visual" class="text-4xl mb-2">🎙️</div>
            <div id="app-rec-timer" class="text-xl font-bold tabular-nums text-road/40">00:00</div>
            <div id="app-rec-hint" class="text-xs text-road/50 mt-1">${t('Siap merekam')}</div>
          </div>
          <div class="flex flex-wrap gap-2 justify-center">
            <button id="app-btn-record" class="btn btn-primary"><span>🎙️</span><span>${t('Mulai')}</span></button>
            <button id="app-btn-stop" class="btn btn-ghost hidden"><span>⏹️</span><span>${t('Stop')}</span></button>
            <button id="app-btn-transcribe" class="btn btn-cyan hidden"><span>✨</span><span>${t('Sisipkan')}</span></button>
            <button id="app-btn-close" class="btn btn-ghost"><span>✖️</span><span>${t('Tutup')}</span></button>
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

  let recorder = null, currentBlob = null, currentMime = '', currentDuration = 0;
  let appRecorder = null, appBlob = null, appMime = '', appCursorPos = 0;

  function showError(msg) { errorBox.textContent = msg; errorBox.classList.remove('hidden'); }
  function clearError() { errorBox.classList.add('hidden'); errorBox.textContent = ''; }
  function showAppError(msg) { appErrorBox.textContent = msg; appErrorBox.classList.remove('hidden'); }
  function clearAppError() { appErrorBox.classList.add('hidden'); appErrorBox.textContent = ''; }

  btnRecord.addEventListener('click', async () => {
    clearError();
    if (!VoiceRecorder.isSupported()) { showError(t('Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.')); return; }
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
      hintEl.textContent = t('Sedang merekam... bicara dengan jelas');
    } catch (err) { showError(t('Gagal mengakses mikrofon') + ': ' + err.message); }
  });

  btnStop.addEventListener('click', async () => {
    if (!recorder) return;
    try {
      const result = await recorder.stop();
      currentBlob = result.blob;
      currentMime = result.mimeType;
      currentDuration = result.durationMs;
      if (currentBlob.size > 19 * 1024 * 1024) { showError(t('Rekaman terlalu besar. Maksimal 19 MB.')); resetMainButtons(); return; }
      visualEl.textContent = '✅';
      hintEl.textContent = t('Rekaman siap diproses') + ' (' + fmtDuration(currentDuration) + ')';
      timerEl.classList.add('text-road/40');
      timerEl.classList.remove('text-stopRed');
      btnStop.classList.add('hidden');
      btnCancelRec.classList.add('hidden');
      btnTranscribe.classList.remove('hidden');
      btnRecord.classList.add('hidden');
    } catch (err) { showError(t('Gagal menghentikan rekaman') + ': ' + err.message); resetMainButtons(); }
  });

  btnCancelRec.addEventListener('click', () => {
    if (recorder) recorder.cancel();
    recorder = null; resetMainButtons(); clearError();
  });

  btnTranscribe.addEventListener('click', async () => {
    clearError();
    if (!currentBlob) return;
    btnTranscribe.disabled = true;
    btnTranscribe.innerHTML = `<span>⏳</span><span>${t('Memproses...')}</span>`;
    hintEl.textContent = t('Mengirim audio ke Gemini...');
    try {
      const base64 = await blobToBase64(currentBlob);
      const { API } = await import('./api.js');
      const result = await API.transcribe(base64, currentMime);
      textInput.value = result.text || '';
      editorArea.classList.remove('hidden');
      hintEl.textContent = t('Transkripsi selesai. Edit teks jika perlu.');
      setTimeout(() => editorArea.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) { showError(t('Transkripsi gagal') + ': ' + err.message); }
    finally {
      btnTranscribe.disabled = false;
      btnTranscribe.innerHTML = `<span>✨</span><span>${t('Proses Transkripsi')}</span>`;
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
    hintEl.textContent = t('Tekan tombol untuk mulai merekam');
  }

  btnSave.addEventListener('click', async () => {
    clearError();
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    if (!title) { showError(t('Judul catatan tidak boleh kosong.')); return; }
    if (!text)  { showError(t('Isi tidak boleh kosong.')); return; }
    btnSave.disabled = true;
    btnSave.innerHTML = `<span>⏳</span><span>${t('Menyimpan...')}</span>`;
    try {
      const { API } = await import('./api.js');
      await API.saveNote({ title, original_text: text, language: 'id-ID', duration_ms: currentDuration });
      toast(t('Catatan berhasil disimpan!'));
      location.hash = '#/notes';
    } catch (err) {
      showError(t('Gagal menyimpan') + ': ' + err.message);
      btnSave.disabled = false;
      btnSave.innerHTML = `<span>💾</span><span>${t('Simpan Catatan')}</span>`;
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
    resetMainButtons(); clearError(); closeAppendModal();
  });

  btnAppend.addEventListener('click', () => {
    appCursorPos = textInput.selectionStart || textInput.value.length;
    appBlob = null; appMime = '';
    resetAppendModal(); modal.classList.remove('hidden');
  });

  function resetAppendModal() {
    appTimerEl.textContent = '00:00';
    appTimerEl.classList.add('text-road/40');
    appTimerEl.classList.remove('text-stopRed');
    appVisualEl.textContent = '🎙️';
    appHintEl.textContent = t('Siap merekam');
    appBtnRecord.classList.remove('hidden');
    appBtnStop.classList.add('hidden');
    appBtnTrans.classList.add('hidden');
    clearAppError();
  }

  function closeAppendModal() {
    if (appRecorder) { appRecorder.cancel(); appRecorder = null; }
    modal.classList.add('hidden'); resetAppendModal();
  }

  modal.addEventListener('click', (e) => { if (e.target === modal) closeAppendModal(); });
  appBtnClose.addEventListener('click', closeAppendModal);

  appBtnRecord.addEventListener('click', async () => {
    clearAppError();
    if (!VoiceRecorder.isSupported()) { showAppError(t('Browser tidak mendukung rekaman.')); return; }
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
      appHintEl.textContent = t('Sedang merekam... bicara dengan jelas');
    } catch (err) { showAppError(t('Gagal mengakses mikrofon') + ': ' + err.message); }
  });

  appBtnStop.addEventListener('click', async () => {
    if (!appRecorder) return;
    try {
      const result = await appRecorder.stop();
      appBlob = result.blob; appMime = result.mimeType;
      if (appBlob.size > 19 * 1024 * 1024) { showAppError(t('Rekaman terlalu besar.')); resetAppendModal(); return; }
      appVisualEl.textContent = '✅';
      appHintEl.textContent = t('Siap disisipkan ke catatan');
      appTimerEl.classList.add('text-road/40');
      appTimerEl.classList.remove('text-stopRed');
      appBtnStop.classList.add('hidden');
      appBtnTrans.classList.remove('hidden');
      appBtnRecord.classList.add('hidden');
    } catch (err) { showAppError(t('Gagal menghentikan rekaman') + ': ' + err.message); resetAppendModal(); }
  });

  appBtnTrans.addEventListener('click', async () => {
    clearAppError();
    if (!appBlob) return;
    appBtnTrans.disabled = true;
    appBtnTrans.innerHTML = `<span>⏳</span><span>${t('Memproses...')}</span>`;
    appHintEl.textContent = t('Mengirim audio ke Gemini...');
    try {
      const base64 = await blobToBase64(appBlob);
      const { API } = await import('./api.js');
      const result = await API.transcribe(base64, appMime);
      insertTextAtCursor(result.text || '');
      toast(t('Teks tambahan disisipkan'));
      closeAppendModal();
    } catch (err) {
      showAppError(t('Transkripsi gagal') + ': ' + err.message);
      appBtnTrans.disabled = false;
      appBtnTrans.innerHTML = `<span>✨</span><span>${t('Sisipkan')}</span>`;
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

  return () => { if (recorder) recorder.cancel(); if (appRecorder) appRecorder.cancel(); };
});

// =====================================================
// DETAIL CATATAN (NARATOR + KARAOKE + TRANSLATE)
// =====================================================
registerRoute('#/notes/:id', (params, view) => {
  if (!guardRoute()) return;
  const id = params.id;
  const wrap = el(`
    <div class="max-w-3xl mx-auto">
      <a href="#/notes" class="inline-flex items-center gap-1 text-sm text-road/60 hover:text-road mb-4">
        <span>←</span><span>${t('Kembali ke Daftar')}</span>
      </a>
      <div id="detail-body">${loadingBlock()}</div>
    </div>
  `);
  view.appendChild(wrap);
  const bodyEl = wrap.querySelector('#detail-body');

  const narrator = new Narrator();
  let noteData = null;
  let translations = {};
  let currentLang = 'id';
  let currentDisplayText = '';
  let rate = parseFloat(localStorage.getItem('crn_narrator_rate') || '1') || 1;
  if (rate < 0.5 || rate > 2) rate = 1;

  (async () => {
    try {
      const { API } = await import('./api.js');
      noteData = await API.getNote(id);
      try { translations = JSON.parse(noteData.translated_json || '{}') || {}; } catch (e) { translations = {}; }
      currentDisplayText = noteData.original_text || '';
      renderPage();
    } catch (err) { bodyEl.innerHTML = errorBlock(t('Gagal memuat') + ': ' + err.message, '#/notes'); }
  })();

  function renderPage() {
    const dur = noteData.duration_ms ? fmtDuration(Number(noteData.duration_ms)) : '-';
    const speechSupported = Narrator.isSupported();

    bodyEl.innerHTML = `
      <div class="bg-white border border-road/10 rounded-2xl p-6 mb-4">
        <h1 class="text-2xl font-bold leading-snug mb-3">${escapeHtml(noteData.title || t('Judul catatan'))}</h1>
        <div class="flex flex-wrap items-center gap-3 text-xs text-road/50">
          <span>📅 ${escapeHtml(fmtDate(noteData.created_at))}</span>
          <span>⏱ ${dur}</span>
          <span class="px-2 py-0.5 rounded-full bg-road/5">${t('ID')}: ${escapeHtml(noteData.id)}</span>
        </div>
      </div>

      <div class="bg-milk border border-road/10 rounded-2xl p-4 mb-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">🎙️</span>
          <span class="font-semibold text-sm">${t('Narator')}</span>
          <span id="narr-status" class="text-xs text-road/40 ml-auto"></span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button id="btn-play" class="btn btn-primary" ${speechSupported ? '' : 'disabled'}>
            <span>▶️</span><span>${t('Putar')}</span>
          </button>
          <button id="btn-pause" class="btn btn-ghost hidden"><span>⏸</span><span>${t('Jeda')}</span></button>
          <button id="btn-resume" class="btn btn-cyan hidden"><span>▶️</span><span>${t('Lanjut')}</span></button>
          <button id="btn-stop" class="btn btn-ghost hidden"><span>⏹</span><span>${t('Stop')}</span></button>
          <div class="ml-auto flex items-center gap-2">
            <span class="text-xs text-road/60">${t('Kecepatan')}</span>
            <input id="rate-slider" type="range" min="0.5" max="2" step="0.1" value="${rate}" class="w-24 accent-cyanGlow" />
            <span id="rate-value" class="text-xs font-mono w-10 text-right">${rate.toFixed(1)}x</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 pt-3 border-t border-road/10">
          <span class="text-xs text-road/60">${t('Bahasa')}:</span>
          <select id="lang-select" class="text-xs px-3 py-1.5 rounded-lg border border-road/15 bg-white focus:outline-none focus:border-cyanGlow">
            <option value="id">🇮🇩 ${t('Bahasa Indonesia (asli)')}</option>
            ${TRANSLATE_LANGS.map(L => {
              const cached = !!translations[L.code];
              return `<option value="${L.code}">${L.flag} ${L.native}${cached ? ' ✓' : ''}</option>`;
            }).join('')}
          </select>
          <button id="btn-translate" class="btn btn-cyan text-xs"><span>✨</span><span>${t('Terjemahkan')}</span></button>
          <button id="adv-toggle" class="text-xs text-road/60 hover:text-road ml-auto px-2 py-1 rounded hover:bg-road/5">
            ⚙️ ${t('Pengaturan Suara')}
          </button>
        </div>

        <div id="adv-panel" class="hidden pt-3 border-t border-road/10 space-y-2 mt-2">
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">${t('Suara')}:</span>
            <select id="voice-select" class="flex-1 text-xs px-2 py-1 rounded-lg border border-road/15 bg-white focus:outline-none focus:border-cyanGlow">
              <option value="">${t('Suara default sistem')}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">🔊 ${t('Volume')}:</span>
            <input id="volume-slider" type="range" min="0" max="1" step="0.05" value="1" class="flex-1 accent-cyanGlow" />
            <span id="volume-value" class="text-xs font-mono w-10 text-right">100%</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">🎵 ${t('Nada')}:</span>
            <input id="pitch-slider" type="range" min="0.5" max="2" step="0.1" value="1" class="flex-1 accent-cyanGlow" />
            <span id="pitch-value" class="text-xs font-mono w-10 text-right">1.0</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">⏸ ${t('Jeda Tanda Baca')}:</span>
            <input id="pause-slider" type="range" min="0" max="2" step="0.1" value="1" class="flex-1 accent-cyanGlow" />
            <span id="pause-value" class="text-xs font-mono w-10 text-right">1.0x</span>
          </div>
        </div>

        ${!speechSupported ? `<p class="text-xs text-stopRed mt-3">⚠️ ${t('Narator tidak didukung di browser ini')}</p>` : ''}
      </div>

      <div id="karaoke-content" class="bg-white border border-road/10 rounded-2xl p-6 mb-4 text-[15px] leading-loose whitespace-pre-wrap break-words"></div>

      <div class="flex flex-wrap gap-2">
        <a href="#/notes/${encodeURIComponent(noteData.id)}/edit" class="btn btn-primary"><span>✏️</span><span>${t('Edit')}</span></a>
        <button id="btn-delete-detail" class="btn btn-ghost text-stopRed border-stopRed/30"><span>🗑</span><span>${t('Hapus')}</span></button>
      </div>
    `;
    setupNarratorControls();
    setupTranslateControls();
    updateKaraokeContent();
  }

  function updateKaraokeContent() {
    const karaokeEl = bodyEl.querySelector('#karaoke-content');
    if (!karaokeEl) return;
    narrator.renderWords(currentDisplayText, karaokeEl, currentLang);
  }

  function setupNarratorControls() {
    const btnPlay   = bodyEl.querySelector('#btn-play');
    const btnPause  = bodyEl.querySelector('#btn-pause');
    const btnResume = bodyEl.querySelector('#btn-resume');
    const btnStop   = bodyEl.querySelector('#btn-stop');
    const statusEl  = bodyEl.querySelector('#narr-status');
    const slider    = bodyEl.querySelector('#rate-slider');
    const rateVal   = bodyEl.querySelector('#rate-value');
    const advToggle = bodyEl.querySelector('#adv-toggle');
    const advPanel  = bodyEl.querySelector('#adv-panel');
    const voiceSel  = bodyEl.querySelector('#voice-select');
    const volSlider = bodyEl.querySelector('#volume-slider');
    const volVal    = bodyEl.querySelector('#volume-value');
    const pitchSlider = bodyEl.querySelector('#pitch-slider');
    const pitchVal  = bodyEl.querySelector('#pitch-value');
    const pauseSlider = bodyEl.querySelector('#pause-slider');
    const pauseVal  = bodyEl.querySelector('#pause-value');

    let pitch = parseFloat(localStorage.getItem('crn_narrator_pitch') || '1') || 1;
    let volume = parseFloat(localStorage.getItem('crn_narrator_volume') || '1');
    if (isNaN(volume)) volume = 1;
    let pauseMultiplier = parseFloat(localStorage.getItem('crn_narrator_pause') || '1');
    if (isNaN(pauseMultiplier)) pauseMultiplier = 1;
    let voiceURI = localStorage.getItem('crn_narrator_voice') || '';
    let advOpen = false;

    function setUIState(state) {
      const show = (el, yes) => el.classList.toggle('hidden', !yes);
      if (state === 'playing') {
        show(btnPlay, false); show(btnPause, true); show(btnResume, false); show(btnStop, true);
        statusEl.textContent = t('Sedang membaca...');
      } else if (state === 'paused') {
        show(btnPlay, false); show(btnPause, false); show(btnResume, true); show(btnStop, true);
        statusEl.textContent = '⏸ ' + t('Jeda');
      } else {
        show(btnPlay, true); show(btnPause, false); show(btnResume, false); show(btnStop, false);
        statusEl.textContent = state === 'error' ? '⚠️ Error' : (state === 'ended' ? '✓' : '');
      }
    }
    narrator.onStateChange = setUIState;

    function populateVoices() {
      const speechLang = SPEECH_LANG[currentLang] || 'id-ID';
      const voices = narrator.getVoicesForLang(speechLang);
      voiceSel.innerHTML = `<option value="">${t('Suara default sistem')}</option>`;
      if (!voices.length) {
        const opt = document.createElement('option');
        opt.disabled = true;
        opt.textContent = t('Tidak ada suara untuk bahasa ini');
        voiceSel.appendChild(opt);
        return;
      }
      voices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.voiceURI;
        opt.textContent = `${v.name} · ${v.lang}`;
        if (v.voiceURI === voiceURI) opt.selected = true;
        voiceSel.appendChild(opt);
      });
    }

    function getSelectedVoice() {
      if (!voiceURI) return null;
      return narrator.getVoices().find(v => v.voiceURI === voiceURI) || null;
    }

    btnPlay.addEventListener('click', async () => {
      if (!Narrator.isSupported()) { toast(t('Narator tidak didukung di browser ini')); return; }
      if (!currentDisplayText.trim()) { toast(t('Isi tidak boleh kosong.')); return; }
      await waitForVoices(1500);
      populateVoices();
      const speechLang = SPEECH_LANG[currentLang] || 'id-ID';
      const voice = getSelectedVoice() || narrator.pickBestVoice(speechLang);
      const rate = parseFloat(localStorage.getItem('crn_narrator_rate') || '1') || 1;
      narrator.speak(currentDisplayText, {
        lang: speechLang, rate, pitch, volume, voice,
        pauseMultiplier
      });
    });

    btnPause.addEventListener('click', () => narrator.pause());
    btnResume.addEventListener('click', () => narrator.resume());
    btnStop.addEventListener('click', () => narrator.stop());

    slider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 1;
      rateVal.textContent = v.toFixed(1) + 'x';
      localStorage.setItem('crn_narrator_rate', String(v));
      narrator.setRate(v);
    });

    advToggle.addEventListener('click', () => {
      advOpen = !advOpen;
      advPanel.classList.toggle('hidden', !advOpen);
      if (advOpen) populateVoices();
    });

    voiceSel.addEventListener('change', (e) => {
      voiceURI = e.target.value;
      localStorage.setItem('crn_narrator_voice', voiceURI);
      narrator.setVoice(getSelectedVoice());
    });

    volSlider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      volume = v;
      localStorage.setItem('crn_narrator_volume', String(v));
      volVal.textContent = Math.round(v * 100) + '%';
      narrator.setVolume(v);
    });

    pitchSlider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 1;
      pitch = v;
      localStorage.setItem('crn_narrator_pitch', String(v));
      pitchVal.textContent = v.toFixed(1);
      narrator.setPitch(v);
    });

    pauseSlider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 0;
      pauseMultiplier = v;
      localStorage.setItem('crn_narrator_pause', String(v));
      pauseVal.textContent = v.toFixed(1) + 'x';
      narrator.setPauseMultiplier(v);
    });

    // Init nilai slider dari localStorage
    slider.value = parseFloat(localStorage.getItem('crn_narrator_rate') || '1') || 1;
    volSlider.value = volume;
    volVal.textContent = Math.round(volume * 100) + '%';
    pitchSlider.value = pitch;
    pitchVal.textContent = pitch.toFixed(1);
    pauseSlider.value = pauseMultiplier;
    pauseVal.textContent = pauseMultiplier.toFixed(1) + 'x';

    setUIState('idle');
  }

  function setupTranslateControls() {
    const langSelect = bodyEl.querySelector('#lang-select');
    const btnTrans   = bodyEl.querySelector('#btn-translate');

    langSelect.addEventListener('change', () => {
      const code = langSelect.value;
      if (code === 'id') {
        currentLang = 'id';
        currentDisplayText = noteData.original_text || '';
        updateKaraokeContent();
        if (narrator.isPlaying || narrator.isPaused) narrator.stop();
        return;
      }
      if (translations[code]) {
        currentLang = code;
        currentDisplayText = translations[code];
        updateKaraokeContent();
        if (narrator.isPlaying || narrator.isPaused) narrator.stop();
        toast(t('Terjemahan dimuat dari cache'));
      } else {
        toast(t('Terjemahkan') + ' → ' + (TRANSLATE_LANGS.find(L => L.code === code)?.native || code));
      }
    });

    btnTrans.addEventListener('click', async () => {
      const code = langSelect.value;
      if (code === 'id') { toast(t('Kembali ke teks asli')); return; }
      if (translations[code]) {
        currentLang = code;
        currentDisplayText = translations[code];
        updateKaraokeContent();
        if (narrator.isPlaying || narrator.isPaused) narrator.stop();
        toast(t('Terjemahan dimuat dari cache'));
        return;
      }
      btnTrans.disabled = true;
      btnTrans.innerHTML = `<span>⏳</span><span>${t('Menerjemahkan...')}</span>`;
      try {
        const { API } = await import('./api.js');
        const langInfo = TRANSLATE_LANGS.find(L => L.code === code);
        const promptName = langInfo?.promptName || code;
        const result = await API.translate(noteData.original_text || '', promptName);
        translations[code] = result.text;
        currentLang = code;
        currentDisplayText = result.text;
        updateKaraokeContent();
        try { await API.updateTranslation(noteData.id, code, result.text); } catch (e) { console.warn(e); }
        const opt = langSelect.querySelector(`option[value="${code}"]`);
        if (opt && !opt.textContent.includes('✓')) opt.textContent += ' ✓';
        if (narrator.isPlaying || narrator.isPaused) narrator.stop();
        toast(t('Terjemahan selesai'));
      } catch (err) { toast(t('Terjemahan gagal') + ': ' + err.message); }
      finally {
        btnTrans.disabled = false;
        btnTrans.innerHTML = `<span>✨</span><span>${t('Terjemahkan')}</span>`;
      }
    });
  }

  bodyEl.addEventListener('click', (e) => {
    if (e.target.closest('#btn-delete-detail')) {
      openDeleteConfirm(noteData.title || t('Hapus'), async () => {
        try {
          const { API } = await import('./api.js');
          await API.deleteNote(noteData.id);
          toast(t('Catatan dihapus'));
          location.hash = '#/notes';
          setTimeout(() => navigate(), 50);
        } catch (err) { toast(t('Gagal menghapus') + ': ' + err.message); }
      });
    }
  });

  return () => { try { narrator.destroy(); } catch (e) {} };
});

// =====================================================
// EDIT CATATAN
// =====================================================
registerRoute('#/notes/:id/edit', (params, view) => {
  if (!guardRoute()) return;
  const id = params.id;
  const wrap = el(`
    <div class="max-w-2xl mx-auto">
      <a href="#/notes/${encodeURIComponent(id)}" class="inline-flex items-center gap-1 text-sm text-road/60 hover:text-road mb-4">
        <span>←</span><span>${t('Kembali ke Detail')}</span>
      </a>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t('Edit Catatan')}</h1>
        <p class="text-sm text-road/60 mt-1">${t('Ubah judul atau isi catatan Anda.')}</p>
      </div>
      <div id="edit-body">${loadingBlock()}</div>
    </div>
  `);
  view.appendChild(wrap);
  const bodyEl = wrap.querySelector('#edit-body');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const note = await API.getNote(id);
      renderEdit(note);
    } catch (err) { bodyEl.innerHTML = errorBlock(t('Gagal memuat') + ': ' + err.message, '#/notes'); }
  })();

  function renderEdit(n) {
    bodyEl.innerHTML = `
      <label class="block text-sm font-medium mb-1">${t('Judul catatan')}</label>
      <input id="edit-title" type="text" value="${escapeHtml(n.title || '')}"
        class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow" />
      <label class="block text-sm font-medium mb-1">${t('Isi catatan')}</label>
      <textarea id="edit-text" rows="14"
        class="w-full px-4 py-3 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow font-roboto text-sm leading-relaxed">${escapeHtml(n.original_text || '')}</textarea>
      <div class="flex flex-wrap gap-2">
        <button id="edit-save" class="btn btn-primary"><span>💾</span><span>${t('Simpan Perubahan')}</span></button>
        <a href="#/notes/${encodeURIComponent(n.id)}" class="btn btn-ghost"><span>✖️</span><span>${t('Batal')}</span></a>
        <button id="edit-delete" class="btn btn-ghost text-stopRed border-stopRed/30 ml-auto"><span>🗑</span><span>${t('Hapus')}</span></button>
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
      if (!title) { showErr(t('Judul tidak boleh kosong.')); return; }
      if (!text)  { showErr(t('Isi tidak boleh kosong.')); return; }
      btnSave.disabled = true;
      btnSave.innerHTML = `<span>⏳</span><span>${t('Menyimpan...')}</span>`;
      try {
        const { API } = await import('./api.js');
        await API.saveNote({
          id: n.id, title, original_text: text,
          language: n.language || 'id-ID',
          duration_ms: n.duration_ms || 0,
          created_at: n.created_at,
          translated_json: ''
        });
        toast(t('Perubahan disimpan'));
        location.hash = '#/notes/' + encodeURIComponent(n.id);
      } catch (err) {
        showErr(t('Gagal menyimpan') + ': ' + err.message);
        btnSave.disabled = false;
        btnSave.innerHTML = `<span>💾</span><span>${t('Simpan Perubahan')}</span>`;
      }
    });

    btnDel.addEventListener('click', () => {
      openDeleteConfirm(n.title || t('Hapus'), async () => {
        try {
          const { API } = await import('./api.js');
          await API.deleteNote(n.id);
          toast(t('Catatan dihapus'));
          location.hash = '#/notes';
          setTimeout(() => navigate(), 50);
        } catch (err) { toast(t('Gagal menghapus') + ': ' + err.message); }
      });
    });
  }
});

// =====================================================
// GROUP CATATAN — LIST (#/groups)
// =====================================================
registerRoute('#/groups', (_, view) => {
  if (!guardRoute()) return;

  view.appendChild(el(`
    <div>
      <div class="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-2xl font-bold">${t('Group Catatan Saya')}</h1>
          <p class="text-sm text-road/60 mt-1">${t('Kumpulan catatan Anda.')}</p>
        </div>
        <a href="#/groups/new" class="btn btn-primary">
          <span>➕</span><span>${t('Buat Group')}</span>
        </a>
      </div>
      <div id="groups-list">${loadingBlock(t('Memuat group...'))}</div>
    </div>
  `));

  const listEl = view.querySelector('#groups-list');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const groups = await API.listGroups();
      renderGroups(groups);
    } catch (err) {
      listEl.innerHTML = errorBlock(t('Gagal memuat') + ': ' + err.message, '#/groups');
    }
  })();

  function renderGroups(groups) {
    if (!groups || groups.length === 0) {
      listEl.innerHTML = `
        <div class="bg-milk border border-road/10 rounded-2xl p-10 text-center">
          <div class="text-5xl mb-3">🗂️</div>
          <p class="font-medium mb-1">${t('Belum ada group')}</p>
          <p class="text-sm text-road/60 mb-5">${t('Gabungkan beberapa catatan menjadi satu group.')}</p>
          <a href="#/groups/new" class="btn btn-primary inline-flex">
            <span>➕</span><span>${t('Buat Group Pertama')}</span>
          </a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = `
      <p class="text-xs text-road/50 mb-3">${groups.length} group</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${groups.map(g => `
          <div class="menu-card group">
            <a href="#/groups/${encodeURIComponent(g.id)}" class="flex-1 flex flex-col gap-1">
              <h3 class="font-semibold leading-snug line-clamp-2">${escapeHtml(g.title || t('Tanpa judul'))}</h3>
              ${g.description ? `<p class="text-xs text-road/60 line-clamp-2">${escapeHtml(g.description)}</p>` : ''}
              <div class="flex items-center gap-3 text-[11px] text-road/40 mt-2">
                <span>📅 ${escapeHtml(fmtDate(g.created_at))}</span>
                ${g.is_public
                  ? '<span class="text-goGreen">🌐 ' + t('Publik') + '</span>'
                  : '<span>🔒 ' + t('Privat') + '</span>'}
              </div>
            </a>
            <div class="flex gap-1 pt-2 border-t border-road/5 mt-2">
              <a href="#/groups/${encodeURIComponent(g.id)}" class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-road/5 text-road/70">👁 ${t('Lihat')}</a>
              <button type="button" data-delete-group="${escapeHtml(g.id)}" data-title="${escapeHtml(g.title)}"
                class="flex-1 text-center text-xs py-1.5 rounded-lg hover:bg-stopRed/10 text-stopRed/80">🗑 ${t('Hapus')}</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    listEl.querySelectorAll('[data-delete-group]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const id = btn.getAttribute('data-delete-group');
        const title = btn.getAttribute('data-title') || t('Hapus Group');
        openDeleteConfirm(title, async () => {
          try {
            const { API } = await import('./api.js');
            await API.deleteGroup(id);
            toast(t('Group berhasil dihapus'));
            navigate();
          } catch (err) { toast(t('Gagal menghapus') + ': ' + err.message); }
        }, t('Hapus Group?'));
      });
    });
  }
});

// =====================================================
// BUAT GROUP BARU (#/groups/new)
// =====================================================
registerRoute('#/groups/new', (_, view) => {
  if (!guardRoute()) return;

  view.appendChild(el(`
    <div class="max-w-2xl mx-auto">
      <a href="#/groups" class="inline-flex items-center gap-1 text-sm text-road/60 hover:text-road mb-4">
        <span>←</span><span>${t('Kembali ke Group')}</span>
      </a>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t('Buat Group Baru')}</h1>
        <p class="text-sm text-road/60 mt-1">${t('Pilih beberapa catatan untuk digabung.')}</p>
      </div>
      <div id="group-form">${loadingBlock(t('Memuat catatan...'))}</div>
    </div>
  `));

  const formEl = view.querySelector('#group-form');
  let allNotes = [];
  let selected = new Set();

  (async () => {
    try {
      const { API } = await import('./api.js');
      allNotes = await API.listNotes();
      renderForm();
    } catch (err) {
      formEl.innerHTML = errorBlock(t('Gagal memuat catatan') + ': ' + err.message, '#/groups');
    }
  })();

  function renderForm() {
    if (!allNotes || allNotes.length === 0) {
      formEl.innerHTML = `
        <div class="bg-milk border border-road/10 rounded-2xl p-8 text-center">
          <p class="font-medium mb-2">${t('Belum ada catatan untuk dipilih')}</p>
          <p class="text-sm text-road/60 mb-5">${t('Buat catatan dulu sebelum membuat group.')}</p>
          <a href="#/notes/new" class="btn btn-primary inline-flex">
            <span>🎙️</span><span>${t('Buat Catatan')}</span>
          </a>
        </div>
      `;
      return;
    }

    formEl.innerHTML = `
      <label class="block text-sm font-medium mb-1">${t('Judul group')}</label>
      <input id="group-title" type="text" placeholder="${t('Contoh: Dasar-dasar mengemudi')}"
        class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow" />

      <label class="block text-sm font-medium mb-1">${t('Deskripsi (opsional)')}</label>
      <textarea id="group-desc" rows="3" placeholder="${t('Deskripsi singkat group ini...')}"
        class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white mb-4 focus:outline-none focus:border-cyanGlow text-sm"></textarea>

      <div class="mb-4 p-3 bg-milk rounded-xl border border-road/10">
        <label class="flex items-center gap-2 cursor-pointer">
          <input id="group-public" type="checkbox" class="w-4 h-4 accent-cyanGlow" />
          <div>
            <p class="text-sm font-medium">🌐 ${t('Jadikan publik')}</p>
            <p class="text-xs text-road/60">${t('Bisa dilihat siapa saja tanpa login')}</p>
          </div>
        </label>
      </div>

      <label class="block text-sm font-medium mb-2">
        ${t('Pilih catatan')} <span class="text-road/50 font-normal">(${t('minimal 1')})</span>
      </label>
      <p class="text-xs text-road/50 mb-2" id="selected-info">0 ${t('catatan')} ${t('dipilih')}</p>
      <div id="notes-picker" class="bg-white border border-road/15 rounded-xl max-h-96 overflow-y-auto mb-4">
        ${allNotes.map(n => `
          <label class="flex items-start gap-3 p-3 border-b border-road/5 last:border-b-0 hover:bg-road/5 cursor-pointer">
            <input type="checkbox" class="mt-1 w-4 h-4 accent-cyanGlow" data-note-id="${escapeHtml(n.id)}" />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm line-clamp-1">${escapeHtml(n.title || t('Tanpa judul'))}</p>
              <p class="text-xs text-road/60 line-clamp-2 mt-0.5">${escapeHtml(truncate(n.original_text || '', 100))}</p>
            </div>
          </label>
        `).join('')}
      </div>

      <div class="flex flex-wrap gap-2">
        <button id="group-save" class="btn btn-primary">
          <span>💾</span><span>${t('Simpan Group')}</span>
        </button>
        <a href="#/groups" class="btn btn-ghost">
          <span>✖️</span><span>${t('Batal')}</span>
        </a>
      </div>

      <div id="group-error" class="hidden mt-4 p-4 rounded-xl bg-stopRed/10 border border-stopRed/30 text-sm text-stopRed"></div>
    `;

    const titleIn = formEl.querySelector('#group-title');
    const descIn = formEl.querySelector('#group-desc');
    const publicIn = formEl.querySelector('#group-public');
    const picker = formEl.querySelector('#notes-picker');
    const infoEl = formEl.querySelector('#selected-info');
    const btnSave = formEl.querySelector('#group-save');
    const errBox = formEl.querySelector('#group-error');

    function showErr(msg) { errBox.textContent = msg; errBox.classList.remove('hidden'); }
    function clearErr() { errBox.classList.add('hidden'); errBox.textContent = ''; }

    picker.addEventListener('change', (e) => {
      const cb = e.target.closest('input[type="checkbox"]');
      if (!cb) return;
      const nid = cb.getAttribute('data-note-id');
      if (cb.checked) selected.add(nid);
      else selected.delete(nid);
      infoEl.textContent = `${selected.size} ${t('catatan')} ${t('dipilih')}`;
    });

    btnSave.addEventListener('click', async () => {
      clearErr();
      const title = titleIn.value.trim();
      if (!title) { showErr(t('Judul group tidak boleh kosong')); return; }
      if (selected.size === 0) { showErr(t('Pilih minimal 1 catatan')); return; }

      btnSave.disabled = true;
      btnSave.innerHTML = `<span>⏳</span><span>${t('Menyimpan...')}</span>`;

      try {
        const { API } = await import('./api.js');
        const items = Array.from(selected).map((nid, idx) => ({ note_id: nid, order: idx }));
        await API.saveGroup({
          title: title,
          description: descIn.value.trim(),
          is_public: publicIn.checked,
          items: items
        });
        toast(t('Group berhasil disimpan!'));
        location.hash = '#/groups';
      } catch (err) {
        showErr(t('Gagal menyimpan') + ': ' + err.message);
        btnSave.disabled = false;
        btnSave.innerHTML = `<span>💾</span><span>${t('Simpan Group')}</span>`;
      }
    });
  }
});

// =====================================================
// DETAIL GROUP (#/groups/:id)
// =====================================================
registerRoute('#/groups/:id', (params, view) => {
  if (!guardRoute()) return;
  const id = params.id;

  view.appendChild(el(`
    <div class="max-w-3xl mx-auto">
      <a href="#/groups" class="inline-flex items-center gap-1 text-sm text-road/60 hover:text-road mb-4">
        <span>←</span><span>${t('Kembali ke Group')}</span>
      </a>
      <div id="group-detail">${loadingBlock()}</div>
    </div>
  `));
  const bodyEl = view.querySelector('#group-detail');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const group = await API.getGroup(id);
      renderDetail(group);
    } catch (err) { bodyEl.innerHTML = errorBlock('Gagal memuat: ' + err.message, '#/groups'); }
  })();

  function renderDetail(g) {
    bodyEl.innerHTML = `
      <div class="bg-white border border-road/10 rounded-2xl p-6 mb-4">
        <div class="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <h1 class="text-2xl font-bold leading-snug">${escapeHtml(g.title || t('Tanpa judul'))}</h1>
          ${g.is_public
            ? '<span class="text-xs px-2 py-1 rounded-full bg-goGreen/10 text-goGreen whitespace-nowrap">🌐 ' + t('Publik') + '</span>'
            : '<span class="text-xs px-2 py-1 rounded-full bg-road/5 text-road/60 whitespace-nowrap">🔒 ' + t('Privat') + '</span>'}
        </div>
        ${g.description ? `<p class="text-sm text-road/70 mb-3">${escapeHtml(g.description)}</p>` : ''}
        <div class="flex flex-wrap items-center gap-3 text-xs text-road/50">
          <span>📅 ${escapeHtml(fmtDate(g.created_at))}</span>
          <span>📒 ${g.items.length} ${t('catatan')}</span>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-sm font-semibold mb-2 text-road/70">${t('Daftar Catatan')}</h2>
        <div class="space-y-2">
          ${g.items.map((it, idx) => `
            <div class="flex items-start gap-3 bg-white border border-road/10 rounded-xl p-3">
              <div class="w-7 h-7 rounded-full bg-road/5 flex items-center justify-center text-xs font-semibold flex-shrink-0">${idx + 1}</div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm">${escapeHtml(it.note.title || t('Tanpa judul'))}</p>
                <p class="text-xs text-road/60 line-clamp-2 mt-0.5">${escapeHtml(truncate(it.note.original_text || '', 120))}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        ${g.is_public ? `
          <a href="#/slide/${encodeURIComponent(g.id)}" class="btn btn-primary">
            <span>🎬</span><span>${t('Mulai Slide')}</span>
          </a>
        ` : ''}
        <button id="btn-delete-group" class="btn btn-ghost text-stopRed border-stopRed/30 ml-auto">
          <span>🗑</span><span>${t('Hapus Group')}</span>
        </button>
      </div>
    `;

    bodyEl.querySelector('#btn-delete-group').addEventListener('click', () => {
      openDeleteConfirm(g.title || t('Hapus Group'), async () => {
        try {
          const { API } = await import('./api.js');
          await API.deleteGroup(g.id);
          toast(t('Group berhasil dihapus'));
          location.hash = '#/groups';
        } catch (err) { toast(t('Gagal menghapus') + ': ' + err.message); }
      }, t('Hapus Group?'));
    });
  }
});

// =====================================================
// SLIDE PUBLIK — List + Viewer
// =====================================================
registerRoute('#/slide', (_, view) => {
  mountSlideList(view);
});

registerRoute('#/slide/:groupId', (params, view) => {
  return mountSlideViewer(params, view);
});

// =====================================================
// MODAL KONFIRMASI HAPUS (global)
// =====================================================
function openDeleteConfirm(title, onConfirm, customHeading) {
  const existing = document.getElementById('global-confirm');
  if (existing) existing.remove();

  const modal = el(`
    <div id="global-confirm" class="fixed inset-0 z-[60] bg-road/60 flex items-center justify-center p-4">
      <div class="bg-milk rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-road/10 text-center">
        <div class="text-4xl mb-3">🗑</div>
        <h3 class="font-bold text-lg mb-2">${escapeHtml(customHeading || t('Hapus Catatan?'))}</h3>
        <p class="text-sm text-road/70 mb-5">
          "${escapeHtml(title)}" ${t('akan dihapus permanen dan tidak bisa dikembalikan.')}
        </p>
        <div class="flex gap-2 justify-center">
          <button id="gc-cancel" class="btn btn-ghost"><span>✖️</span><span>${t('Batal')}</span></button>
          <button id="gc-yes" class="btn" style="background:#D7263D;color:#fff"><span>🗑</span><span>${t('Ya, Hapus')}</span></button>
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
  applyI18n();

  await playLoadingAnimation('#loading-sign');

  const loading = document.getElementById('loading-screen');
  loading.classList.add('sign-fade-out');
  setTimeout(() => {
    loading.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 400);

  const btnLang = document.getElementById('btn-lang');
  if (btnLang) btnLang.addEventListener('click', openLangSwitcher);

  initAuth();
  document.addEventListener('auth:change', () => { refreshAuthUI(); navigate(); });
  document.addEventListener('lang:change', () => { applyI18n(); refreshAuthUI(); navigate(); });

  startRouter();
  startLogoAnimation();
}

boot();