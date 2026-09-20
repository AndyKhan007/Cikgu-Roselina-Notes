// =====================================================
// Slide Viewer — v3 dengan Voice Picker + Volume + Pitch + Pause
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

const wait = (ms) => new Promise(r => setTimeout(r, ms));
const RATE_LIMIT_MS = 5000;

function isRateLimitError(err) {
  const msg = String(err?.message || err || '').toLowerCase();
  return msg.includes('429') || msg.includes('rate') || msg.includes('quota') ||
         msg.includes('resource_exhausted') || msg.includes('too many');
}

async function translateWithRetry(API, text, promptName, onRetry) {
  const MAX_RETRIES = 3;
  const BACKOFF = [15000, 30000, 60000];
  let attempt = 0;
  while (true) {
    try { return await API.translate(text, promptName); }
    catch (err) {
      if (!isRateLimitError(err) || attempt >= MAX_RETRIES) throw err;
      const waitMs = BACKOFF[attempt];
      attempt++;
      onRetry?.(attempt, MAX_RETRIES, waitMs);
      await wait(waitMs);
    }
  }
}

function loadPrefs() {
  return {
    rate: parseFloat(localStorage.getItem('crn_narrator_rate') || '1') || 1,
    pitch: parseFloat(localStorage.getItem('crn_narrator_pitch') || '1') || 1,
    volume: parseFloat(localStorage.getItem('crn_narrator_volume') || '1'),
    pause: parseFloat(localStorage.getItem('crn_narrator_pause') || '1'),
    voiceURI: localStorage.getItem('crn_narrator_voice') || ''
  };
}
function savePref(key, val) {
  try { localStorage.setItem(key, String(val)); } catch (e) {}
}

export function mountSlideViewer(params, view) {
  const groupId = params.groupId;
  const narrator = new Narrator();
  const prefs = loadPrefs();
  let rate = prefs.rate;
  let pitch = prefs.pitch;
  let volume = isNaN(prefs.volume) ? 1 : prefs.volume;
  let pauseMultiplier = isNaN(prefs.pause) ? 1 : prefs.pause;
  let voiceURI = prefs.voiceURI;

  let group = null;
  let currentIndex = 0;
  let selectedLang = localStorage.getItem('crn_slide_lang') || 'id';
  let autoPlay = localStorage.getItem('crn_slide_autoplay') === '1';
  let wasPlayingBeforeChange = false;
  let translating = false;
  let cancelTranslate = false;
  let voicesReady = false;
  let advancedOpen = false;

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

  function onKey(e) {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'ArrowLeft')       { e.preventDefault(); prevSlide(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
    else if (e.key === ' ')          { e.preventDefault(); togglePlay(); }
  }
  document.addEventListener('keydown', onKey);

  (async () => {
    try {
      const { API } = await import('./api.js');
      group = await API.getGroup(groupId);
      if (!group.items || group.items.length === 0) throw new Error(t('Belum ada catatan untuk dipilih'));
      await waitForVoices(1500);
      voicesReady = true;
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
        <h2 id="slide-title" class="text-2xl font-bold leading-snug mb-1"></h2>
        <p id="slide-trans-status" class="text-xs mb-3"></p>
        <div id="slide-karaoke" class="text-[17px] leading-loose whitespace-pre-wrap break-words"></div>
      </div>

      <div class="w-full bg-road/5 rounded-full h-1.5 mb-4 overflow-hidden">
        <div id="slide-progress" class="bg-cyanGlow h-full transition-all duration-300" style="width: 0%"></div>
      </div>

      <div class="flex flex-wrap gap-2 justify-center mb-4">
        <button id="slide-prev" class="btn btn-ghost"><span>◀</span><span>${t('Sebelumnya')}</span></button>
        <button id="slide-play" class="btn btn-primary"><span>▶</span><span>${t('Putar')}</span></button>
        <button id="slide-pause" class="btn btn-cyan hidden"><span>⏸</span><span>${t('Jeda')}</span></button>
        <button id="slide-stop" class="btn btn-ghost hidden"><span>⏹</span><span>${t('Stop')}</span></button>
        <button id="slide-next" class="btn btn-ghost"><span>${t('Berikutnya')}</span><span>▶</span></button>
      </div>

      <div class="bg-milk border border-road/10 rounded-xl p-3 mb-3 space-y-3">
        <div class="flex flex-wrap gap-2 items-center justify-center text-sm">
          <span class="text-road/60 text-xs">${t('Bahasa')}:</span>
          <select id="slide-lang" class="text-xs px-2 py-1 rounded-lg border border-road/15 bg-white focus:outline-none focus:border-cyanGlow">
            <option value="id">🇮🇩 ${t('Bahasa Indonesia (asli)')}</option>
            ${TRANSLATE_LANGS.map(L => `<option value="${L.code}">${L.flag} ${L.native}</option>`).join('')}
          </select>
          <button id="slide-translate-all" class="btn btn-cyan text-xs px-3 py-1">
            <span>✨</span><span id="slide-translate-label">${t('Terjemahkan Semua')}</span>
          </button>
        </div>

        <div id="slide-translate-progress" class="hidden">
          <div class="flex items-center gap-2 text-xs text-road/70 mb-1">
            <span id="translate-progress-label" class="truncate">${t('Menerjemahkan...')}</span>
            <button id="translate-cancel" class="ml-auto text-road/50 hover:text-stopRed flex-shrink-0">✖</button>
          </div>
          <div class="w-full bg-road/5 rounded-full h-1 overflow-hidden">
            <div id="translate-progress-bar" class="bg-cyanGlow h-full transition-all" style="width: 0%"></div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 items-center justify-center text-sm pt-2 border-t border-road/5">
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
          <button id="slide-advanced-toggle" class="text-xs text-road/60 hover:text-road px-2 py-1 rounded hover:bg-road/5">
            ⚙️ ${t('Pengaturan Suara')}
          </button>
        </div>

        <div id="slide-advanced" class="hidden pt-3 border-t border-road/10 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">${t('Suara')}:</span>
            <select id="slide-voice" class="flex-1 text-xs px-2 py-1 rounded-lg border border-road/15 bg-white focus:outline-none focus:border-cyanGlow">
              <option value="">${t('Suara default sistem')}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">🔊 ${t('Volume')}:</span>
            <input id="slide-volume" type="range" min="0" max="1" step="0.05" value="${volume}" class="flex-1 accent-cyanGlow" />
            <span id="slide-volume-value" class="text-xs font-mono w-10 text-right">${Math.round(volume*100)}%</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">🎵 ${t('Nada')}:</span>
            <input id="slide-pitch" type="range" min="0.5" max="2" step="0.1" value="${pitch}" class="flex-1 accent-cyanGlow" />
            <span id="slide-pitch-value" class="text-xs font-mono w-10 text-right">${pitch.toFixed(1)}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-road/60 w-16 flex-shrink-0">⏸ ${t('Jeda Tanda Baca')}:</span>
            <input id="slide-pause" type="range" min="0" max="2" step="0.1" value="${pauseMultiplier}" class="flex-1 accent-cyanGlow" />
            <span id="slide-pause-value" class="text-xs font-mono w-10 text-right">${pauseMultiplier.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      <p class="text-center text-[11px] text-road/40">
        ← → ${t('navigasi')} · Space ${t('Putar')} / ${t('Jeda')}
      </p>
    `;

    bindControls();
  }

  function populateVoiceDropdown() {
    if (!voicesReady) return;
    const sel = viewerEl.querySelector('#slide-voice');
    if (!sel) return;

    const speechLang = SPEECH_LANG[selectedLang] || 'id-ID';
    const voices = narrator.getVoicesForLang(speechLang);

    sel.innerHTML = `<option value="">${t('Suara default sistem')}</option>`;

    if (!voices.length) {
      const opt = document.createElement('option');
      opt.disabled = true;
      opt.textContent = t('Tidak ada suara untuk bahasa ini');
      sel.appendChild(opt);
      return;
    }

    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      const name = v.name || 'Voice';
      const tag = v.lang || '';
      opt.textContent = `${name} · ${tag}`;
      if (v.voiceURI === voiceURI) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function getSelectedVoice() {
    if (!voiceURI) return null;
    return narrator.getVoices().find(v => v.voiceURI === voiceURI) || null;
  }

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
      savePref('crn_slide_lang', selectedLang);
      if (narrator.isPlaying || narrator.isPaused) narrator.stop();
      populateVoiceDropdown();
      renderSlide();
    });

    viewerEl.querySelector('#slide-translate-all').addEventListener('click', translateAll);
    viewerEl.querySelector('#translate-cancel').addEventListener('click', () => {
      cancelTranslate = true;
      toast(t('Membatalkan...'));
    });

    viewerEl.querySelector('#slide-rate').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 1;
      rate = v;
      savePref('crn_narrator_rate', v);
      viewerEl.querySelector('#slide-rate-value').textContent = v.toFixed(1) + 'x';
      narrator.setRate(v);
    });

    const advEl = viewerEl.querySelector('#slide-advanced');
    viewerEl.querySelector('#slide-advanced-toggle').addEventListener('click', () => {
      advancedOpen = !advancedOpen;
      advEl.classList.toggle('hidden', !advancedOpen);
      if (advancedOpen) populateVoiceDropdown();
    });
    if (advancedOpen) {
      advEl.classList.remove('hidden');
      populateVoiceDropdown();
    }

    viewerEl.querySelector('#slide-voice').addEventListener('change', (e) => {
      voiceURI = e.target.value;
      savePref('crn_narrator_voice', voiceURI);
      narrator.setVoice(getSelectedVoice());
    });

    viewerEl.querySelector('#slide-volume').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      volume = v;
      savePref('crn_narrator_volume', v);
      viewerEl.querySelector('#slide-volume-value').textContent = Math.round(v*100) + '%';
      narrator.setVolume(v);
    });

    viewerEl.querySelector('#slide-pitch').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 1;
      pitch = v;
      savePref('crn_narrator_pitch', v);
      viewerEl.querySelector('#slide-pitch-value').textContent = v.toFixed(1);
      narrator.setPitch(v);
    });

    viewerEl.querySelector('#slide-pause').addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) || 0;
      pauseMultiplier = v;
      savePref('crn_narrator_pause', v);
      viewerEl.querySelector('#slide-pause-value').textContent = v.toFixed(1) + 'x';
      narrator.setPauseMultiplier(v);
    });

    viewerEl.querySelector('#slide-autoplay').addEventListener('change', (e) => {
      autoPlay = e.target.checked;
      savePref('crn_slide_autoplay', autoPlay ? '1' : '0');
    });

    viewerEl.querySelector('#slide-fullscreen').addEventListener('click', toggleFullscreen);

    narrator.onStateChange = updateNarratorUI;
    narrator.onEnd = () => {
      if (autoPlay && currentIndex < group.items.length - 1) {
        setTimeout(() => { if (autoPlay) advanceSlide(true); }, 1200);
      }
    };

    updateNarratorUI('idle');
    updateTranslateButton();
  }

  function getItem() { return group.items[currentIndex]; }
  function getText(item) {
    const note = item.note;
    if (selectedLang === 'id') return note.original_text || '';
    const cache = parseCache(note.translated_json);
    return cache[selectedLang] || note.original_text || '';
  }
  function isTranslated(item) {
    if (selectedLang === 'id') return true;
    return !!parseCache(item.note.translated_json)[selectedLang];
  }
  function countTranslated() { return group.items.filter(isTranslated).length; }

  function updateTranslateButton() {
    if (translating) return;
    const btn = viewerEl.querySelector('#slide-translate-all');
    const label = viewerEl.querySelector('#slide-translate-label');
    if (!btn || !label) return;

    if (selectedLang === 'id') {
      btn.disabled = true;
      btn.classList.remove('btn-cyan'); btn.classList.add('btn-ghost');
      label.textContent = t('Pilih bahasa dulu');
      return;
    }
    const total = group.items.length;
    const done = countTranslated();
    if (done === total) {
      btn.disabled = true;
      btn.classList.remove('btn-cyan'); btn.classList.add('btn-ghost');
      label.textContent = `✓ ${t('Semua terjemahan siap')}`;
    } else {
      btn.disabled = false;
      btn.classList.add('btn-cyan'); btn.classList.remove('btn-ghost');
      label.textContent = `${t('Terjemahkan Semua')} (${done}/${total})`;
    }
  }

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

    const statusEl = viewerEl.querySelector('#slide-trans-status');
    if (statusEl) {
      if (selectedLang === 'id') {
        statusEl.textContent = ''; statusEl.className = 'text-xs mb-3';
      } else if (isTranslated(item)) {
        statusEl.textContent = `✓ ${t('Sudah diterjemahkan')}`;
        statusEl.className = 'text-xs mb-3 text-goGreen';
      } else {
        statusEl.textContent = `⚠ ${t('Belum diterjemahkan')}`;
        statusEl.className = 'text-xs mb-3 text-warnYellow';
      }
    }

    if (wasPlayingBeforeChange) {
      wasPlayingBeforeChange = false;
      setTimeout(() => startPlay(), 150);
    }
    updateTranslateButton();
  }

  async function startPlay() {
    if (!Narrator.isSupported()) { toast(t('Narator tidak didukung di browser ini')); return; }
    const item = getItem();
    const text = getText(item);
    if (!text.trim()) return;

    await waitForVoices(1000);
    voicesReady = true;
    const speechLang = SPEECH_LANG[selectedLang] || 'id-ID';
    const voice = getSelectedVoice() || narrator.pickBestVoice(speechLang);
    narrator.speak(text, {
      lang: speechLang, rate, pitch, volume, voice,
      pauseMultiplier
    });
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
    if (state === 'playing') { show(playBtn, false); show(pauseBtn, true); show(stopBtn, true); }
    else if (state === 'paused') { show(playBtn, false); show(pauseBtn, false); show(stopBtn, true); }
    else { show(playBtn, true); show(pauseBtn, false); show(stopBtn, false); }
  }

  function prevSlide() {
    if (currentIndex === 0) return;
    wasPlayingBeforeChange = narrator.isPlaying || narrator.isPaused;
    currentIndex--; renderSlide();
  }
  function nextSlide() {
    if (currentIndex >= group.items.length - 1) return;
    wasPlayingBeforeChange = narrator.isPlaying || narrator.isPaused;
    currentIndex++; renderSlide();
  }
  function advanceSlide(autoStart) {
    if (currentIndex >= group.items.length - 1) return;
    wasPlayingBeforeChange = !!autoStart;
    currentIndex++; renderSlide();
  }

  async function translateAll() {
    if (selectedLang === 'id') { toast(t('Pilih bahasa dulu')); return; }
    if (translating) return;
    const untranslated = group.items.filter(it => !isTranslated(it));
    if (untranslated.length === 0) { toast(t('Semua terjemahan siap')); return; }

    const langInfo = TRANSLATE_LANGS.find(L => L.code === selectedLang);
    const langName = langInfo?.native || selectedLang;
    const ok = await showConfirm(
      t('Terjemahkan semua?'),
      `${untranslated.length} ${t('catatan')} → ${langName}`
    );
    if (!ok) return;

    translating = true;
    cancelTranslate = false;
    const progEl = viewerEl.querySelector('#slide-translate-progress');
    const progLabel = viewerEl.querySelector('#translate-progress-label');
    const progBar = viewerEl.querySelector('#translate-progress-bar');
    progEl.classList.remove('hidden');
    progBar.style.width = '0%';

    const btnAll = viewerEl.querySelector('#slide-translate-all');
    const langSel = viewerEl.querySelector('#slide-lang');
    btnAll.disabled = true; langSel.disabled = true;

    const { API } = await import('./api.js');
    const promptName = langInfo?.promptName || selectedLang;

    let success = 0, failed = 0, i = 0, lastRequestAt = 0;

    for (const item of untranslated) {
      if (cancelTranslate) break;
      const title = item.note.title || t('Tanpa judul');

      if (lastRequestAt > 0) {
        const elapsed = Date.now() - lastRequestAt;
        const waitFor = Math.max(0, RATE_LIMIT_MS - elapsed);
        if (waitFor > 0) {
          progLabel.textContent = `${i + 1}/${untranslated.length} · ${title} · ${Math.ceil(waitFor/1000)}s`;
          const step = 100;
          for (let w = 0; w < waitFor; w += step) {
            if (cancelTranslate) break;
            await wait(Math.min(step, waitFor - w));
          }
          if (cancelTranslate) break;
        }
      }

      progLabel.textContent = `${i + 1}/${untranslated.length} · ${title}`;
      progBar.style.width = `${(i / untranslated.length) * 100}%`;

      try {
        const result = await translateWithRetry(
          API, item.note.original_text || '', promptName,
          (attempt, max, waitMs) => {
            progLabel.textContent =
              `${i + 1}/${untranslated.length} · ${title} · ` +
              `${t('Rate limit, mencoba lagi')} ${attempt}/${max} (${Math.round(waitMs/1000)}s)`;
          }
        );
        lastRequestAt = Date.now();

        try { await API.updateTranslation(item.note.id, selectedLang, result.text); } catch (e) { console.warn(e); }

        const cache = parseCache(item.note.translated_json);
        cache[selectedLang] = result.text;
        item.note.translated_json = JSON.stringify(cache);
        success++;

        if (item === getItem()) {
          const wasPlaying = narrator.isPlaying || narrator.isPaused;
          if (wasPlaying) narrator.stop();
          renderSlide();
        }
      } catch (err) {
        console.error('Translate failed:', item.note.title, err);
        failed++;
      }

      i++;
      progBar.style.width = `${(i / untranslated.length) * 100}%`;
    }

    progEl.classList.add('hidden');
    translating = false;
    btnAll.disabled = false; langSel.disabled = false;

    if (narrator.isPlaying || narrator.isPaused) narrator.stop();
    renderSlide();

    if (cancelTranslate) toast(`${success} ${t('catatan berhasil diterjemahkan')} · ${t('dibatalkan')}`);
    else if (failed === 0) toast(`${success} ${t('catatan berhasil diterjemahkan')}`);
    else toast(`${success} ${t('berhasil')} · ${failed} ${t('gagal')}`);
  }

  function showConfirm(title, message) {
    return new Promise((resolve) => {
      const overlay = el(`
        <div class="fixed inset-0 z-[70] bg-road/60 flex items-center justify-center p-4">
          <div class="bg-milk rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-road/10 text-center">
            <div class="text-4xl mb-3">🌐</div>
            <h3 class="font-bold text-lg mb-2">${escapeHtml(title)}</h3>
            <p class="text-sm text-road/70 mb-2">${escapeHtml(message)}</p>
            <p class="text-xs text-road/50 mb-5">${t('Proses ini akan memakan waktu beberapa saat.')}</p>
            <div class="flex gap-2 justify-center">
              <button id="cf-no" class="btn btn-ghost"><span>✖️</span><span>${t('Batal')}</span></button>
              <button id="cf-yes" class="btn btn-cyan"><span>✨</span><span>${t('Ya, Terjemahkan')}</span></button>
            </div>
          </div>
        </div>
      `);
      document.body.appendChild(overlay);
      const close = (val) => { overlay.remove(); resolve(val); };
      overlay.querySelector('#cf-no').addEventListener('click', () => close(false));
      overlay.querySelector('#cf-yes').addEventListener('click', () => close(true));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });
    });
  }

  function toggleFullscreen() {
    const target = viewerEl.querySelector('#slide-area');
    if (!document.fullscreenElement) target.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  return () => {
    cancelTranslate = true;
    document.removeEventListener('keydown', onKey);
    try { narrator.destroy(); } catch (e) {}
  };
}