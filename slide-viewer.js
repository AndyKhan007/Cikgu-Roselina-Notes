// =====================================================
// Slide Viewer — slideshow publik dengan narator + karaoke
// =====================================================

import { el, toast } from './ui.js';
import { t } from './lang.js';
import { Narrator, waitForVoices, SPEECH_LANG, TRANSLATE_LANGS } from './narrator.js';

function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function parseCache(json) {
  try { return JSON.parse(json || '{}') || {}; } catch (e) { return {}; }
}

export function mountSlideViewer(params, view) {
  const groupId = params.groupId;
  const narrator = new Narrator();
  let group = null;
  let currentIndex = 0;
  let selectedLang = localStorage.getItem('crn_slide_lang') || 'id';
  let rate = parseFloat(localStorage.getItem('crn_narrator_rate') || '1') || 1;
  if (rate < 0.5 || rate > 2) rate = 1;
  let autoPlay = localStorage.getItem('crn_slide_autoplay') === '1';
  let wasPlayingBeforeChange = false;

  view.appendChild(el(`
    <div class="max-w-4xl mx-auto">
      <div id="slide-loading" class="text-center py-20 text-road/50">
        <div class="inline-block w-8 h-8 border-4 border-road/10 border-t-cyanGlow rounded-full animate-spin mb-3"></div>
        <p class="text-sm">${t('Memuat slide...')}</p>
      </div>
      <div id="slide-viewer" class="hidden"></div>
    </div>
  `));

  const loadingEl = view.querySelector('#slide-loading');
  const viewerEl  = view.querySelector('#slide-viewer');

  // ============ Keyboard ============
  function onKey(e) {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'ArrowLeft')       { e.preventDefault(); prevSlide(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
    else if (e.key === ' ')          { e.preventDefault(); togglePlay(); }
  }
  document.addEventListener('keydown', onKey);

  // ============ Load ============
  (async () => {
    try {
      const { API } = await import('./api.js');
      group = await API.getGroup(groupId);
      if (!group.items || group.items.length === 0) {
        throw new Error(t('Belum ada catatan untuk dipilih'));
      }
      loadingEl.classList.add('hidden');
      viewerEl.classList.remove('hidden');
      renderViewer();
      renderSlide();
    } catch (err) {
      loadingEl.innerHTML = `
        <div class="bg-stopRed/10 border border-stopRed/30 rounded-2xl p-6 text-center">
          <p class="text-stopRed font-medium mb-3">⚠️ ${escapeHtml(err.message)}</p>
          <a href="#/slide" class="btn btn-ghost inline-flex">← ${t('Kembali ke Slide')}</a>
        </div>
      `;
    }
  })();

  // ============ Render Viewer ============
  function renderViewer() {
    viewerEl.innerHTML = `
      <div class="flex items-center gap-3 mb-4 flex-wrap">
        <a href="#/slide" class="text-sm text-road/60 hover:text-road inline-flex items-center gap-1">
          <span>←</span><span>${t('Kembali ke Slide')}</span>
        </a>
        <div class="ml-auto text-sm text-road/50">
          <span id="slide-counter">1 / ${group.items.length}</span>
        </div>
      </div>

      <div class="mb-4">
        <h1 class="text-xl font-bold">${escapeHtml(group.title || t('Tanpa judul'))}</h1>
        ${group.description ? `<p class="text-sm text-road/60 mt-1">${escapeHtml(group.description)}</p>` : ''}
      </div>

      <div id="slide-area" class="bg-white border border-road/10 rounded-2xl p-6 mb-4 min-h-[260px] transition-all">
        <h2 id="slide-title" class="text-2xl font-bold leading-snug mb-4"></h2>
        <div id="slide-karaoke" class="text-[17px] leading-loose whitespace-pre-wrap break-words"></div>
      </div>

      <div class="w-full bg-road/5 rounded-full h-1.5 mb-4 overflow-hidden">
        <div id="slide-progress" class="bg-cyanGlow h-full transition-all duration-300" style="width: 0%"></div>
      </div>

      <div class="flex flex-wrap gap-2 justify-center mb-4">
        <button id="slide-prev" class="btn btn-ghost">
          <span>◀</span><span>${t('Sebelumnya')}</span>
        </button>
        <button id="slide-play" class="btn btn-primary">
          <span>▶</span><span>${t('Putar')}</span>
        </button>
        <button id="slide-pause" class="btn btn-cyan hidden">
          <span>⏸</span><span>${t('Jeda')}</span>
        </button>
        <button id="slide-stop" class="btn btn-ghost hidden">
          <span>⏹</span><span>${t('Stop')}</span>
        </button>
        <button id="slide-next" class="btn btn-ghost">
          <span>${t('Berikutnya')}</span><span>▶</span>
        </button>
      </div>

      <div class="bg-milk border border-road/10 rounded-xl p-3 mb-3 flex flex-wrap gap-3 items-center justify-center text-sm">
        <div class="flex items-center gap-2">
          <span class="text-road/60 text-xs">${t('Bahasa')}:</span>
          <select id="slide-lang" class="text-xs px-2 py-1 rounded-lg border border-road/15 bg-white focus:outline-none focus:border-cyanGlow">
            <option value="id">🇮🇩 ${t('Bahasa Indonesia (asli)')}</option>
            ${TRANSLATE_LANGS.map(L => `<option value="${L.code}">${L.flag} ${L.native}</option>`).join('')}
          </select>
          <button id="slide-translate-btn" class="btn btn-cyan text-xs px-3 py-1" title="${t('Terjemahkan')}">
            <span>✨</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-road/60 text-xs">${t('Kecepatan')}:</span>
          <input id="slide-rate" type="range" min="0.5" max="2" step="0.1" value="${rate}" class="w-20 accent-cyanGlow" />
          <span id="slide-rate-value" class="text-xs font-mono w-9">${rate.toFixed(1)}x</span>
        </div>

        <label class="flex items-center gap-1.5 cursor-pointer text-xs text-road/70">
          <input id="slide-autoplay" type="checkbox" class="w-4 h-4 accent-cyanGlow" ${autoPlay ? 'checked' : ''} />
          <span>${t('Auto')}</span>
        </label>

        <button id="slide-fullscreen" class="text-xs text-road/60 hover:text-road px-2 py-1 rounded hover:bg-road/5">
          ⛶ ${t('Layar penuh')}
        </button>
      </div>

      <p class="text-center text-[11px] text-road/40">
        ← → ${t('navigasi')} · Space ${t('Putar')} / ${t('Jeda')}
      </p>
    `;

    bindControls();
  }

  // ============ Bind Controls ============
  function bindControls() {
    viewerEl.querySelector('#slide-prev').addEventListener('click', prevSlide);
    viewerEl.querySelector('#slide-next').addEventListener('click', nextSlide);
    viewerEl.querySelector('#slide-play').addEventListener('click', startPlay);
    viewerEl.querySelector('#slide-pause').addEventListener('click', () => narrator.pause());
    viewerEl.querySelector('#slide-stop').addEventListener('click', () => narrator.stop());

    const langSel = viewerEl.querySelector('#slide-lang');
    langSel.value = selectedLang;
    langSel.addEventListener('change', () => {
      selectedLang = langSel.value;
      localStorage.setItem('crn_slide_lang', selectedLang);
      if (narrator.isPlaying || narrator.isPaused) narrator.stop();
      renderSlide();
    });

    viewerEl.querySelector('#slide-translate-btn').addEventListener('click', doTranslate);

    viewerEl.querySelector('#slide-rate').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 1;
      rate = v;
      localStorage.setItem('crn_narrator_rate', String(v));
      viewerEl.querySelector('#slide-rate-value').textContent = v.toFixed(1) + 'x';
      narrator.setRate(v);
    });

    viewerEl.querySelector('#slide-autoplay').addEventListener('change', (e) => {
      autoPlay = e.target.checked;
      localStorage.setItem('crn_slide_autoplay', autoPlay ? '1' : '0');
    });

    viewerEl.querySelector('#slide-fullscreen').addEventListener('click', toggleFullscreen);

    narrator.onStateChange = updateNarratorUI;
    narrator.onEnd = () => {
      if (autoPlay && currentIndex < group.items.length - 1) {
        setTimeout(() => { if (autoPlay) advanceSlide(true); }, 1200);
      }
    };

    updateNarratorUI('idle');
  }

  // ============ Helpers ============
  function getItem() { return group.items[currentIndex]; }

  function getText(item) {
    const note = item.note;
    if (selectedLang === 'id') return note.original_text || '';
    const cache = parseCache(note.translated_json);
    return cache[selectedLang] || note.original_text || '';
  }

  function isTranslated(item) {
    if (selectedLang === 'id') return true;
    const cache = parseCache(item.note.translated_json);
    return !!cache[selectedLang];
  }

  // ============ Render Slide ============
  function renderSlide() {
    const item = getItem();
    const note = item.note;
    const text = getText(item);

    narrator.stop();

    viewerEl.querySelector('#slide-counter').textContent = `${currentIndex + 1} / ${group.items.length}`;
    viewerEl.querySelector('#slide-title').textContent = note.title || t('Tanpa judul');

    const karaokeEl = viewerEl.querySelector('#slide-karaoke');
    narrator.renderWords(text, karaokeEl);

    const pct = ((currentIndex + 1) / group.items.length) * 100;
    viewerEl.querySelector('#slide-progress').style.width = pct + '%';

    viewerEl.querySelector('#slide-prev').disabled = currentIndex === 0;
    viewerEl.querySelector('#slide-next').disabled = currentIndex === group.items.length - 1;

    const transBtn = viewerEl.querySelector('#slide-translate-btn');
    if (selectedLang === 'id') {
      transBtn.classList.add('hidden');
    } else {
      transBtn.classList.remove('hidden');
      if (isTranslated(item)) {
        transBtn.innerHTML = '<span>✓</span>';
        transBtn.classList.remove('btn-cyan');
        transBtn.classList.add('btn-ghost');
      } else {
        transBtn.innerHTML = '<span>✨</span>';
        transBtn.classList.add('btn-cyan');
        transBtn.classList.remove('btn-ghost');
      }
    }

    if (wasPlayingBeforeChange) {
      wasPlayingBeforeChange = false;
      setTimeout(() => startPlay(), 150);
    }
  }

  // ============ Narration ============
  async function startPlay() {
    if (!Narrator.isSupported()) { toast(t('Narator tidak didukung di browser ini')); return; }
    const item = getItem();
    const text = getText(item);
    if (!text.trim()) return;

    await waitForVoices(1500);
    const speechLang = SPEECH_LANG[selectedLang] || 'id-ID';
    const voice = narrator.pickBestVoice(speechLang);
    narrator.speak(text, { lang: speechLang, rate, voice });
  }

  function togglePlay() {
    if (narrator.isPlaying) narrator.pause();
    else if (narrator.isPaused) narrator.resume();
    else startPlay();
  }

  function updateNarratorUI(state) {
    const playBtn = viewerEl.querySelector('#slide-play');
    const pauseBtn = viewerEl.querySelector('#slide-pause');
    const stopBtn = viewerEl.querySelector('#slide-stop');
    if (!playBtn) return;

    const show = (el, yes) => el.classList.toggle('hidden', !yes);
    if (state === 'playing') {
      show(playBtn, false); show(pauseBtn, true); show(stopBtn, true);
    } else if (state === 'paused') {
      show(playBtn, false); show(pauseBtn, false); show(stopBtn, true);
      // Ubah tombol pause jadi resume? Simpel: biarkan user klik play di keyboard
    } else {
      show(playBtn, true); show(pauseBtn, false); show(stopBtn, false);
    }
  }

  // ============ Navigation ============
  function prevSlide() {
    if (currentIndex === 0) return;
    wasPlayingBeforeChange = narrator.isPlaying || narrator.isPaused;
    currentIndex--;
    renderSlide();
  }

  function nextSlide() {
    if (currentIndex >= group.items.length - 1) return;
    wasPlayingBeforeChange = narrator.isPlaying || narrator.isPaused;
    currentIndex++;
    renderSlide();
  }

  function advanceSlide(autoStart) {
    if (currentIndex >= group.items.length - 1) return;
    wasPlayingBeforeChange = !!autoStart;
    currentIndex++;
    renderSlide();
  }

  // ============ Translate ============
  async function doTranslate() {
    if (selectedLang === 'id') return;
    const item = getItem();
    const note = item.note;

    if (isTranslated(item)) { renderSlide(); return; }

    const btn = viewerEl.querySelector('#slide-translate-btn');
    btn.disabled = true;
    btn.innerHTML = '⏳';

    try {
      const { API } = await import('./api.js');
      const langInfo = TRANSLATE_LANGS.find(L => L.code === selectedLang);
      const promptName = langInfo?.promptName || selectedLang;
      const result = await API.translate(note.original_text || '', promptName);

      try { await API.updateTranslation(note.id, selectedLang, result.text); }
      catch (e) { console.warn('Cache save failed:', e); }

      const cache = parseCache(note.translated_json);
      cache[selectedLang] = result.text;
      note.translated_json = JSON.stringify(cache);

      renderSlide();
      toast(t('Terjemahan selesai'));
    } catch (err) {
      toast(t('Terjemahan gagal') + ': ' + err.message);
      btn.disabled = false;
      btn.innerHTML = '<span>✨</span>';
    }
  }

  // ============ Fullscreen ============
  function toggleFullscreen() {
    const target = viewerEl.querySelector('#slide-area');
    if (!document.fullscreenElement) {
      target.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  // ============ Cleanup ============
  return () => {
    document.removeEventListener('keydown', onKey);
    try { narrator.stop(); } catch (e) {}
  };
}