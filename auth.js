import { CONFIG } from './config.js';
import { toast } from './ui.js';

let currentUser = null; // { email, name, picture, idToken }

export function getUser() { return currentUser; }
export function isLoggedIn() { return !!currentUser; }

export function initAuth(onChange) {
  const area = document.getElementById('auth-area');
  const saved = sessionStorage.getItem('crn_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      renderUserChip(area, onChange);
      onChange?.(currentUser);
    } catch { /* ignore */ }
  }

  // Tunggu GIS siap
  const tryInit = () => {
    if (!window.google?.accounts?.id) return setTimeout(tryInit, 200);
    window.google.accounts.id.initialize({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      callback: handleCredential,
      auto_select: false,
      cancel_on_tap_outside: true
    });
    renderLoginButton(area, onChange);
  };
  tryInit();
}

function handleCredential(resp) {
  // Decode payload JWT (bagian tengah)
  const payload = JSON.parse(atob(resp.credential.split('.')[1]));
  currentUser = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    idToken: resp.credential
  };
  sessionStorage.setItem('crn_user', JSON.stringify(currentUser));
  document.getElementById('auth-area').innerHTML = '';
  renderUserChip(document.getElementById('auth-area'));
  document.dispatchEvent(new CustomEvent('auth:change', { detail: currentUser }));
}

function renderLoginButton(area, onChange) {
  area.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.id = 'g_id_onload_wrap';
  area.appendChild(wrap);
  window.google.accounts.id.renderButton(wrap, {
    theme: 'outline',
    size: 'medium',
    shape: 'pill',
    text: 'signin_with',
    locale: 'id'
  });
}

function renderUserChip(area, onChange) {
  if (!currentUser) return renderLoginButton(area, onChange);
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
  currentUser = null;
  sessionStorage.removeItem('crn_user');
  window.google?.accounts?.id?.disableAutoSelect?.();
  document.getElementById('auth-area').innerHTML = '';
  renderLoginButton(document.getElementById('auth-area'));
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