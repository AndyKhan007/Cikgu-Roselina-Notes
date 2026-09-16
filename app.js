import { CONFIG } from './config.js';
import { initAuth, getUser, isLoggedIn } from './auth.js';
import { registerRoute, startRouter, navigate } from './router.js';
import { el, toast, playLoadingAnimation } from './ui.js';

// ===================== ROUTES =====================

// --- Menu utama ---
registerRoute('#/', (_, view) => {
  view.appendChild(el(`
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Selamat datang${isLoggedIn() ? ', ' + getUser().name.split(' ')[0] : ''} 👋</h1>
        <p class="text-road/60 text-sm mt-1">Pilih menu untuk mulai membuat catatan mengemudi.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="#/notes/new" class="menu-card">
          <span class="text-2xl">🎙️</span>
          <span class="font-semibold">Buat Catatan</span>
          <span class="text-xs text-road/60">Rekam suara, otomatis jadi teks. Perlu login.</span>
        </a>
        <a href="#/groups/new" class="menu-card">
          <span class="text-2xl">🗂️</span>
          <span class="font-semibold">Buat Group Catatan</span>
          <span class="text-xs text-road/60">Gabung beberapa catatan. Perlu login.</span>
        </a>
        <a href="#/slide" class="menu-card">
          <span class="text-2xl">🎬</span>
          <span class="font-semibold">Lihat Slide Note</span>
          <span class="text-xs text-road/60">Tampilkan slide catatan. Bisa diakses siapa saja.</span>
        </a>
        <a href="#/notes" class="menu-card">
          <span class="text-2xl">📒</span>
          <span class="font-semibold">Catatan Saya</span>
          <span class="text-xs text-road/60">Daftar catatan yang Anda buat. Perlu login.</span>
        </a>
      </div>
    </div>
  `));
});

// --- Catatan saya (placeholder Phase 2) ---
registerRoute('#/notes', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Catatan Saya</h1>
      <p class="text-sm text-road/60">Fitur daftar catatan akan dibangun pada Phase 2.</p>
    </div>
  `));
});

registerRoute('#/notes/new', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Buat Catatan</h1>
      <p class="text-sm text-road/60">Fitur rekam & transkripsi akan dibangun pada Phase 2.</p>
    </div>
  `));
});

// --- Group (placeholder Phase 4) ---
registerRoute('#/groups', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Group Catatan</h1>
      <p class="text-sm text-road/60">Fitur grouping akan dibangun pada Phase 4.</p>
    </div>
  `));
});

registerRoute('#/groups/new', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Buat Group</h1>
      <p class="text-sm text-road/60">Akan dibangun pada Phase 4.</p>
    </div>
  `));
});

// --- Slide publik (placeholder Phase 4) ---
registerRoute('#/slide', (_, view) => {
  view.appendChild(el(`
    <div>
      <h1 class="text-xl font-bold mb-2">Slide Note</h1>
      <p class="text-sm text-road/60">Daftar slide publik akan dibangun pada Phase 4.</p>
    </div>
  `));
});

// ===================== BOOT =====================

async function boot() {
  document.getElementById('year').textContent = new Date().getFullYear();

  // 1. Animasi loading
  await playLoadingAnimation('#loading-sign');

  // 2. Sembunyikan loading, tampilkan app
  const loading = document.getElementById('loading-screen');
  loading.classList.add('sign-fade-out');
  setTimeout(() => {
    loading.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 400);

  // 3. Init auth
  initAuth(() => {
    // re-render rute saat login/logout
    navigate();
  });

  // 4. Start router
  startRouter();

  // 5. Ping server (opsional, untuk cek koneksi)
  // import('./api.js').then(({ API }) => API.ping().catch(() => {}));
}

boot();