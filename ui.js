// ====== Helper UI ======
export function toast(msg, ms = 2200) {
  const el = document.getElementById('toast');
  el.querySelector('div').textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), ms);
}

export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

export function fmtDate(iso) {
  if (!iso) return '-';
  try {
    return new Date(iso).toLocaleString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch { return iso; }
}

// ====== Animasi loading rambu lalu lintas ======
const SIGNS = [
  // Stop
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
       fill="#D7263D" stroke="#fff" stroke-width="4"/>
     <text x="50" y="60" text-anchor="middle" font-size="22" fill="#fff" font-weight="700">STOP</text>
   </svg>`,
  // Yield
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <polygon points="50,85 5,15 95,15" fill="#fff" stroke="#D7263D" stroke-width="8"/>
     <polygon points="50,70 20,25 80,25" fill="#fff"/>
   </svg>`,
  // Traffic light
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <rect x="35" y="10" width="30" height="80" rx="8" fill="#2B2B2B"/>
     <circle cx="50" cy="28" r="8" fill="#D7263D"/>
     <circle cx="50" cy="50" r="8" fill="#F4A259"/>
     <circle cx="50" cy="72" r="8" fill="#1B998B"/>
   </svg>`,
  // No entry
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <circle cx="50" cy="50" r="42" fill="#D7263D" stroke="#fff" stroke-width="4"/>
     <rect x="22" y="44" width="56" height="12" fill="#fff" rx="2"/>
   </svg>`,
  // Speed limit 60
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <circle cx="50" cy="50" r="42" fill="#fff" stroke="#D7263D" stroke-width="8"/>
     <text x="50" y="62" text-anchor="middle" font-size="34" fill="#2B2B2B" font-weight="700">60</text>
   </svg>`,
  // Pedestrian
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <rect x="8" y="8" width="84" height="84" rx="10" fill="#F4A259" stroke="#2B2B2B" stroke-width="4"/>
     <circle cx="50" cy="30" r="8" fill="#2B2B2B"/>
     <path d="M50 40 L50 65 M50 48 L38 58 M50 48 L62 58 M50 65 L42 80 M50 65 L58 80"
       stroke="#2B2B2B" stroke-width="5" stroke-linecap="round" fill="none"/>
   </svg>`,
  // Traffic cone
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <polygon points="50,15 72,85 28,85" fill="#F4A259" stroke="#2B2B2B" stroke-width="3"/>
     <rect x="22" y="82" width="56" height="8" rx="2" fill="#2B2B2B"/>
     <rect x="38" y="45" width="24" height="10" fill="#fff"/>
     <rect x="34" y="62" width="32" height="10" fill="#fff"/>
   </svg>`,
  // Zebra cross
  `<svg viewBox="0 0 100 100" class="w-full h-full">
     <rect x="10" y="30" width="80" height="40" fill="#2B2B2B"/>
     <rect x="14" y="34" width="10" height="32" fill="#fff"/>
     <rect x="30" y="34" width="10" height="32" fill="#fff"/>
     <rect x="46" y="34" width="10" height="32" fill="#fff"/>
     <rect x="62" y="34" width="10" height="32" fill="#fff"/>
     <rect x="78" y="34" width="8"  height="32" fill="#fff"/>
   </svg>`
];

export function randomSignSvg() {
  return SIGNS[Math.floor(Math.random() * SIGNS.length)];
}

export async function playLoadingAnimation(containerSelector = '#loading-sign') {
  const box = document.querySelector(containerSelector);
  const start = Date.now();
  const minMs = 1800;
  const perSign = 420;

  while (Date.now() - start < minMs) {
    box.innerHTML = randomSignSvg();
    box.classList.remove('sign-fade-out');
    box.classList.add('sign-fade-in');
    await new Promise(r => setTimeout(r, perSign));
    box.classList.remove('sign-fade-in');
    box.classList.add('sign-fade-out');
    await new Promise(r => setTimeout(r, 140));
  }
}