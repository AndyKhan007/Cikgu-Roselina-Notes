import { el } from './ui.js';
import { t } from './lang.js';

const routes = [];
let currentCleanup = null;

export function registerRoute(hash, handler) {
  routes.push({ hash, handler });
}

export async function navigate() {
  const view = document.getElementById('view');
  const hash = location.hash || '#/';

  if (typeof currentCleanup === 'function') {
    try { currentCleanup(); } catch (e) {}
    currentCleanup = null;
  }
  view.innerHTML = '';

  for (const r of routes) {
    const m = matchRoute(r.hash, hash);
    if (m) {
      const result = await r.handler(m.params, view);
      if (typeof result === 'function') currentCleanup = result;
      updateActiveNav(hash);
      return;
    }
  }

  view.appendChild(el(`<div class="text-center py-20 text-road/60">${t('Halaman tidak ditemukan')}</div>`));
}

function matchRoute(pattern, hash) {
  const p = pattern.split('/');
  const h = hash.split('/');
  if (p.length !== h.length) return null;
  const params = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(h[i]);
    else if (p[i] !== h[i]) return null;
  }
  return { params };
}

function updateActiveNav(hash) {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === hash ||
      (hash.startsWith('#/') && a.getAttribute('href') === '#/' + hash.split('/')[1]));
  });
}

export function startRouter() {
  window.addEventListener('hashchange', navigate);
  navigate();
}