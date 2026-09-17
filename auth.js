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
  area.innerHTML = `
    <div class="flex items-center gap-2">
      <img src="${currentUser.picture}" alt="" class="w-8 h-8 rounded-full border border-road/10" />
      <div class="hidden sm:block leading-tight text-right">
        <p class="text-xs font-medium">${currentUser.name}</p>
        <button id="btn-logout" class="text-[10px] text-road/50 hover:text-stopRed">Keluar</button>
      </div>
    </div>
  `;
  area.querySelector('#btn-logout').onclick = logout;
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

  // 3. Matikan Google Auto Select agar tidak otomatis login lagi
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