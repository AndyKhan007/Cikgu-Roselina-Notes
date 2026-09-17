// =====================================================
// Slide List — daftar semua group publik
// =====================================================

import { el, fmtDate } from './ui.js';
import { t } from './lang.js';

function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function mountSlideList(view) {
  const wrap = el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t('Slide Publik')}</h1>
        <p class="text-sm text-road/60 mt-1">${t('Slide publik dari group yang dibagikan.')}</p>
      </div>
      <div id="slide-list-content">
        <div class="text-center py-20 text-road/50">
          <div class="inline-block w-8 h-8 border-4 border-road/10 border-t-cyanGlow rounded-full animate-spin mb-3"></div>
          <p class="text-sm">${t('Memuat slide...')}</p>
        </div>
      </div>
    </div>
  `);
  view.appendChild(wrap);

  const contentEl = wrap.querySelector('#slide-list-content');

  (async () => {
    try {
      const { API } = await import('./api.js');
      const groups = await API.listPublicGroups();
      renderGroups(groups);
    } catch (err) {
      contentEl.innerHTML = `
        <div class="bg-stopRed/10 border border-stopRed/30 rounded-2xl p-6 text-center">
          <p class="text-stopRed font-medium mb-3">⚠️ ${escapeHtml(err.message)}</p>
          <a href="#/slide" class="btn btn-ghost inline-flex">🔄 ${t('Coba Lagi')}</a>
        </div>
      `;
    }
  })();

  function renderGroups(groups) {
    if (!groups || groups.length === 0) {
      contentEl.innerHTML = `
        <div class="bg-milk border border-road/10 rounded-2xl p-10 text-center">
          <div class="text-5xl mb-3">🎬</div>
          <p class="font-medium mb-1">${t('Belum ada slide publik')}</p>
          <p class="text-sm text-road/60 max-w-md mx-auto">${t('Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.')}</p>
        </div>
      `;
      return;
    }

    contentEl.innerHTML = `
      <p class="text-xs text-road/50 mb-3">${groups.length} ${t('Slide')}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${groups.map(g => `
          <a href="#/slide/${encodeURIComponent(g.id)}" class="menu-card group">
            <div class="flex items-start gap-3">
              <div class="text-3xl flex-shrink-0">🎬</div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold leading-snug line-clamp-2">${escapeHtml(g.title || t('Tanpa judul'))}</h3>
                ${g.description ? `<p class="text-xs text-road/60 line-clamp-2 mt-1">${escapeHtml(g.description)}</p>` : ''}
                <div class="text-[11px] text-road/40 mt-2">
                  📅 ${escapeHtml(fmtDate(g.created_at))}
                </div>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }
}