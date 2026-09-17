// =====================================================
// Modal pemilih bahasa dengan pencarian
// =====================================================

import { LANGS, getLang, setLang, t } from './lang.js';
import { toast } from './ui.js';

export function openLangSwitcher() {
  const existing = document.getElementById('lang-switcher-modal');
  if (existing) existing.remove();

  const current = getLang();

  const modal = document.createElement('div');
  modal.id = 'lang-switcher-modal';
  modal.className = 'fixed inset-0 z-[70] bg-road/60 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-milk rounded-2xl w-full max-w-md shadow-2xl border border-road/10 overflow-hidden flex flex-col max-h-[85vh]">
      <div class="p-4 border-b border-road/10">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-lg">🌐 ${t('Pilih Bahasa')}</h3>
          <button id="ls-close" class="text-road/50 hover:text-road text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-road/5">×</button>
        </div>
        <input id="ls-search" type="text" placeholder="${t('Cari bahasa...')}"
          class="w-full px-4 py-2 rounded-xl border border-road/15 bg-white focus:outline-none focus:border-cyanGlow text-sm" />
      </div>

      <div id="ls-list" class="overflow-y-auto p-2 flex-1"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const listEl = modal.querySelector('#ls-list');
  const searchEl = modal.querySelector('#ls-search');

  function renderList(query = '') {
    const q = query.trim().toLowerCase();
    const filtered = LANGS.filter(l => {
      if (!q) return true;
      return (
        l.code.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q) ||
        l.english.toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<p class="text-center text-sm text-road/50 py-8">${t('Bahasa tidak ditemukan')}</p>`;
      return;
    }

    listEl.innerHTML = filtered.map(l => `
      <button type="button" data-code="${l.code}"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-road/5 text-left transition ${l.code === current ? 'bg-cyanGlow/10 border border-cyanGlow/40' : ''}">
        <span class="text-2xl">${l.flag}</span>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm truncate">${l.native}</p>
          <p class="text-[11px] text-road/50 truncate">${l.english}</p>
        </div>
        ${l.code === current ? '<span class="text-cyanGlow text-lg">✓</span>' : ''}
      </button>
    `).join('');

    listEl.querySelectorAll('[data-code]').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (code === getLang()) { close(); return; }
        setLang(code);
        toast(t('Bahasa berhasil diubah'));
        close();
      });
    });
  }

  function close() { modal.remove(); }

  searchEl.addEventListener('input', (e) => renderList(e.target.value));
  modal.querySelector('#ls-close').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  renderList();
  setTimeout(() => searchEl.focus(), 100);
}