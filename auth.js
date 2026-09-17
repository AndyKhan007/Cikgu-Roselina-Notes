import { CONFIG } from './config.js';
import { toast } from './ui.js';

let currentUser = null;

export function getUser() { return currentUser; }
export function isLoggedIn() { return !!currentUser; }

export function initAuth() {
  const area = document.getElementById('auth-area');

  // Restore session
  const saved = sessionStorage.getItem('crn_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      renderUserChip(area);
    } catch (e) {
      sessionStorage.removeItem('crn_user');
    }
  }

  const tryInit = () => {
    if (!window.google?.accounts?.id) return setTimeout(tryInit, 200);
    window.google.accounts.id.initialize({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      callback: handleCredential,
      auto_select: false,
      cancel_on_tap_outside: true
    });
    if (!currentUser) renderLoginButton(area);
  };
  tryInit();

  // Global close handler untuk dropdown profil
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    if (!dropdown || dropdown.classList.contains('hidden')) return;
    const chip = document.getElementById('user-chip');
    if (chip && !chip.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

function handleCredential(resp) {
  const payload = JSON.parse(atob(resp.credential.split('.')[1]));
  currentUser = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    idToken: resp.credential,
    loginAt: Date.now()
  };
  sessionStorage.setItem('crn_user', JSON.stringify(currentUser));
  document.getElementById('auth-area').innerHTML = '';
  renderUserChip(document.getElementById('auth-area'));
  document.dispatchEvent(new CustomEvent('auth:change', { detail: currentUser }));
}

function renderLoginButton(area) {
  if (!area) return;
  area.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.id = 'g_id_onload_wrap';
  area.appendChild(wrap);
  if (window.google?.accounts?.id) {
    window.google.accounts.id.renderButton(wrap, {
      theme: 'outline',
      size: 'medium',
      shape: 'pill',
      text: 'signin_with',
      locale: 'id'
    });
  }
}

function renderUserChip(area) {
  if (!currentUser) return renderLoginButton(area);
  const firstName = currentUser.name.split(' ')[0];

  area.innerHTML = `
    <div class="relative" id="user-chip">
      <button id="user-chip-btn" type="button"
        class="flex items-center gap-1.5 rounded-full hover:bg-road/5 p-0.5 pr-1.5 transition cursor-pointer">
        <img src="${currentUser.picture}" alt="" class="w-8 h-8 rounded-full border border-road/10" />
        <span class="hidden sm:inline text-[11px] font-medium max-w-[80px] truncate">${firstName}</span>
        <span class="hidden sm:inline text-[9px] text-road/50">▼</span>
      </button>

      <!-- Dropdown menu -->
      <div id="user-dropdown"
        class="hidden absolute right-0 top-full mt-1 bg-white border border-road/10 rounded-xl shadow-xl py-1 min-w-[200px] z-[100]">
        <div class="px-3 py-2 border-b border-road/5">
          <p class="text-xs font-semibold truncate">${currentUser.name}</p>
          <p class="text-[10px] text-road/50 truncate">${currentUser.email}</p>
        </div>
        <button id="btn-logout" type="button"
          class="w-full text-left px-3 py-2 text-sm hover:bg-stopRed/10 text-stopRed flex items-center gap-2 transition">
          <span>🚪</span><span>Keluar</span>
        </button>
      </div>
    </div>
  `;

  const btn = area.querySelector('#user-chip-btn');
  const dropdown = area.querySelector('#user-dropdown');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  area.querySelector('#btn-logout').addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.add('hidden');
    logout();
  });
}

export function logout() {
  // 1. Bersihkan state internal
  currentUser = null;

  // 2. Bersihkan semua storage yang mungkin berisi data login
  try { sessionStorage.removeItem('crn_user'); } catch (e) {}
  try { sessionStorage.clear(); } catch (e) {}
  try { localStorage.removeItem('crn_user'); } catch (e) {}
  try { localStorage.removeItem('crn_notes_cache'); } catch (e) {}
  try { localStorage.removeItem('crn_groups_cache'); } catch (e) {}
  try { localStorage.removeItem('crn_settings'); } catch (e) {}

  // 3. Matikan Google Auto Select
  try { window.google?.accounts?.id?.disableAutoSelect?.(); } catch (e) {}

  // 4. Reset tampilan area auth
  const area = document.getElementById('auth-area');
  if (area) {
    area.innerHTML = '';
    renderLoginButton(area);
  }

  // 5. Beritahu aplikasi
  document.dispatchEvent(new CustomEvent('auth:change', { detail: null }));
  toast('Anda telah keluar');
}

export function requireLogin() {
  if (!isLoggedIn()) {
    toast('Silakan login terlebih dahulu');
    location.hash = '#/';
    return false;
  }
  return true;
}