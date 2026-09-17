// =====================================================
// Koleksi SVG kendaraan untuk animasi navbar
// Setiap kendaraan: { name, air, svg }
//   air: true kalau kendaraan terbang (posisi lebih tinggi)
// =====================================================

export const VEHICLES = [
  // ============ MOBIL (merah) ============
  {
    name: 'mobil',
    air: false,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="32" ry="2" fill="rgba(43,43,43,0.15)"/>
        <rect x="4" y="20" width="72" height="14" rx="4" fill="#D7263D"/>
        <path d="M20 20 L27 10 Q29 8 33 8 L50 8 Q54 8 56 10 L63 20 Z" fill="#D7263D"/>
        <path d="M25 19 L30 11 Q31 10 33 10 L40 10 L40 19 Z" fill="#7FD6E6" opacity="0.95"/>
        <path d="M42 19 L42 10 L48 10 Q50 10 51 11 L56 19 Z" fill="#7FD6E6" opacity="0.95"/>
        <line x1="41" y1="20" x2="41" y2="33" stroke="#A01830" stroke-width="0.6"/>
        <circle cx="7" cy="27" r="2.4" fill="#FFF8DC"/>
        <circle cx="73" cy="27" r="1.6" fill="#FFB3B3"/>
        <circle cx="20" cy="34" r="5.5" fill="#1a1a1a"/>
        <circle cx="20" cy="34" r="2.2" fill="#9CA3AF"/>
        <circle cx="60" cy="34" r="5.5" fill="#1a1a1a"/>
        <circle cx="60" cy="34" r="2.2" fill="#9CA3AF"/>
      </svg>
    `
  },

  // ============ BUS (kuning sekolah) ============
  {
    name: 'bus',
    air: false,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="34" ry="2" fill="rgba(43,43,43,0.15)"/>
        <rect x="2" y="10" width="76" height="24" rx="3" fill="#F4A259"/>
        <rect x="2" y="10" width="76" height="3" fill="#E08B3F"/>
        <rect x="6" y="15" width="9" height="8" fill="#7FD6E6"/>
        <rect x="18" y="15" width="9" height="8" fill="#7FD6E6"/>
        <rect x="30" y="15" width="9" height="8" fill="#7FD6E6"/>
        <rect x="42" y="15" width="9" height="8" fill="#7FD6E6"/>
        <rect x="54" y="15" width="9" height="8" fill="#7FD6E6"/>
        <rect x="66" y="15" width="9" height="8" fill="#7FD6E6"/>
        <rect x="30" y="26" width="14" height="6" rx="1" fill="#2B2B2B"/>
        <circle cx="5" cy="30" r="2" fill="#FFF8DC"/>
        <circle cx="20" cy="35" r="5" fill="#1a1a1a"/>
        <circle cx="20" cy="35" r="2" fill="#9CA3AF"/>
        <circle cx="60" cy="35" r="5" fill="#1a1a1a"/>
        <circle cx="60" cy="35" r="2" fill="#9CA3AF"/>
      </svg>
    `
  },

  // ============ AMBULANCE ============
  {
    name: 'ambulance',
    air: false,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="32" ry="2" fill="rgba(43,43,43,0.15)"/>
        <rect x="4" y="14" width="72" height="20" rx="3" fill="#FFFFFF" stroke="#D0D0D0" stroke-width="0.5"/>
        <rect x="4" y="14" width="72" height="4" fill="#D7263D"/>
        <path d="M18 16 L26 8 L42 8 L42 16 Z" fill="#FFFFFF" stroke="#D0D0D0" stroke-width="0.5"/>
        <rect x="21" y="10" width="7" height="6" fill="#7FD6E6"/>
        <circle cx="52" cy="24" r="5" fill="#D7263D"/>
        <rect x="50.5" y="21" width="3" height="6" fill="#fff"/>
        <rect x="49" y="22.5" width="6" height="3" fill="#fff"/>
        <rect x="34" y="10" width="6" height="3" rx="1" fill="#FF3B30"/>
        <circle cx="7" cy="22" r="2" fill="#FFF8DC"/>
        <circle cx="73" cy="22" r="1.6" fill="#FF3B30"/>
        <circle cx="20" cy="34" r="5" fill="#1a1a1a"/>
        <circle cx="20" cy="34" r="2" fill="#9CA3AF"/>
        <circle cx="60" cy="34" r="5" fill="#1a1a1a"/>
        <circle cx="60" cy="34" r="2" fill="#9CA3AF"/>
      </svg>
    `
  },

  // ============ TAXI ============
  {
    name: 'taxi',
    air: false,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="32" ry="2" fill="rgba(43,43,43,0.15)"/>
        <rect x="4" y="20" width="72" height="14" rx="4" fill="#F7D046"/>
        <path d="M20 20 L27 10 Q29 8 33 8 L50 8 Q54 8 56 10 L63 20 Z" fill="#F7D046"/>
        <path d="M25 19 L30 11 Q31 10 33 10 L40 10 L40 19 Z" fill="#7FD6E6" opacity="0.95"/>
        <path d="M42 19 L42 10 L48 10 Q50 10 51 11 L56 19 Z" fill="#7FD6E6" opacity="0.95"/>
        <rect x="4" y="25" width="72" height="3" fill="#2B2B2B"/>
        <rect x="10" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="18" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="26" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="34" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="42" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="50" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="58" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="66" y="25" width="3" height="3" fill="#F7D046"/>
        <rect x="33" y="4" width="14" height="5" rx="1.5" fill="#2B2B2B"/>
        <text x="40" y="8.3" text-anchor="middle" font-size="3.5" fill="#F7D046" font-weight="700" font-family="Roboto, sans-serif">TAXI</text>
        <circle cx="7" cy="27" r="2.2" fill="#FFF8DC"/>
        <circle cx="20" cy="34" r="5.5" fill="#1a1a1a"/>
        <circle cx="20" cy="34" r="2.2" fill="#9CA3AF"/>
        <circle cx="60" cy="34" r="5.5" fill="#1a1a1a"/>
        <circle cx="60" cy="34" r="2.2" fill="#9CA3AF"/>
      </svg>
    `
  },

  // ============ MOTOR ============
  {
    name: 'motor',
    air: false,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="26" ry="2" fill="rgba(43,43,43,0.15)"/>
        <circle cx="46" cy="10" r="4" fill="#F5C7A0"/>
        <path d="M46 6 Q52 6 52 11 L52 14 L42 14 L42 11 Q42 6 46 6 Z" fill="#2B2B2B"/>
        <path d="M38 16 L52 16 L50 28 L40 28 Z" fill="#2B2B2B"/>
        <line x1="52" y1="20" x2="62" y2="24" stroke="#1a1a1a" stroke-width="1.5"/>
        <rect x="28" y="22" width="30" height="6" rx="3" fill="#D7263D"/>
        <line x1="30" y1="18" x2="34" y2="22" stroke="#1a1a1a" stroke-width="1.5"/>
        <circle cx="22" cy="30" r="6.5" fill="#1a1a1a"/>
        <circle cx="22" cy="30" r="2.8" fill="#9CA3AF"/>
        <circle cx="60" cy="30" r="6.5" fill="#1a1a1a"/>
        <circle cx="60" cy="30" r="2.8" fill="#9CA3AF"/>
        <circle cx="4" cy="24" r="1.6" fill="#FFF8DC"/>
      </svg>
    `
  },

  // ============ HELIKOPTER (air) ============
  {
    name: 'helikopter',
    air: true,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <g class="rotor-spin" style="transform-origin: 40px 6px;">
          <rect x="8" y="5" width="64" height="2" rx="1" fill="#9CA3AF"/>
          <circle cx="40" cy="6" r="1.5" fill="#4B5563"/>
        </g>
        <line x1="40" y1="6" x2="40" y2="14" stroke="#1a1a1a" stroke-width="1.5"/>
        <ellipse cx="40" cy="22" rx="24" ry="7" fill="#1B998B"/>
        <ellipse cx="40" cy="20" rx="22" ry="5" fill="#2B7A78" opacity="0.4"/>
        <path d="M24 20 Q30 14 40 14 Q50 14 56 20 Z" fill="#7FD6E6" opacity="0.9"/>
        <rect x="60" y="19" width="18" height="3" fill="#1B998B"/>
        <rect x="70" y="14" width="8" height="10" fill="#1B998B"/>
        <circle cx="74" cy="19" r="1.8" fill="#1a1a1a"/>
        <path d="M20 26 L20 30 L60 30 L60 26" fill="none" stroke="#1a1a1a" stroke-width="1"/>
        <line x1="24" y1="30" x2="24" y2="34" stroke="#1a1a1a" stroke-width="1.5"/>
        <line x1="56" y1="30" x2="56" y2="34" stroke="#1a1a1a" stroke-width="1.5"/>
        <circle cx="32" cy="22" r="2.2" fill="#FFCC00" opacity="0.9"/>
      </svg>
    `
  },

  // ============ PESAWAT (air) ============
  {
    name: 'pesawat',
    air: true,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="30" ry="2" fill="rgba(43,43,43,0.12)"/>
        <ellipse cx="38" cy="20" rx="30" ry="5" fill="#ECECEC" stroke="#B0B0B0" stroke-width="0.5"/>
        <path d="M32 20 L20 8 L36 8 L46 20 Z" fill="#B0B0B0" opacity="0.7"/>
        <path d="M42 20 L38 6 L50 6 L52 20 Z" fill="#8A8A8A"/>
        <path d="M60 20 L64 8 L74 8 L68 20 Z" fill="#B0B0B0"/>
        <circle cx="12" cy="20" r="2" fill="#2B2B2B"/>
        <circle cx="20" cy="19" r="0.9" fill="#7FD6E6"/>
        <circle cx="26" cy="19" r="0.9" fill="#7FD6E6"/>
        <circle cx="32" cy="19" r="0.9" fill="#7FD6E6"/>
        <circle cx="38" cy="19" r="0.9" fill="#7FD6E6"/>
        <circle cx="44" cy="19" r="0.9" fill="#7FD6E6"/>
        <circle cx="50" cy="19" r="0.9" fill="#7FD6E6"/>
        <ellipse cx="34" cy="26" rx="5" ry="2" fill="#8A8A8A"/>
      </svg>
    `
  },

  // ============ ROKET (air) ============
  {
    name: 'roket',
    air: true,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="26" ry="2" fill="rgba(43,43,43,0.12)"/>
        <path d="M14 20 Q4 12 2 20 Q4 28 14 20 Z" fill="#FFB300" opacity="0.9"/>
        <path d="M14 20 Q8 16 6 20 Q8 24 14 20 Z" fill="#FF6B00"/>
        <ellipse cx="40" cy="20" rx="28" ry="8" fill="#D7263D"/>
        <path d="M14 20 Q24 8 38 11 L38 29 Q24 32 14 20 Z" fill="#FFFFFF"/>
        <circle cx="32" cy="20" r="4.5" fill="#7FD6E6" stroke="#2B2B2B" stroke-width="0.6"/>
        <circle cx="32" cy="20" r="1.8" fill="#B0E5F0"/>
        <rect x="46" y="14" width="5" height="12" fill="#FFFFFF"/>
        <rect x="56" y="14" width="5" height="12" fill="#FFFFFF"/>
        <path d="M64 14 L74 8 L70 20 L74 32 L64 26 Z" fill="#B01D2E"/>
      </svg>
    `
  },

  // ============ UFO (air) ============
  {
    name: 'ufo',
    air: true,
    svg: `
      <svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="40" cy="37" rx="26" ry="2" fill="rgba(43,43,43,0.12)"/>
        <path d="M30 22 L28 36 L52 36 L50 22 Z" fill="#00E5FF" opacity="0.25"/>
        <path d="M30 20 Q30 10 40 10 Q50 10 50 20 Z" fill="#7FD6E6" opacity="0.9"/>
        <ellipse cx="40" cy="22" rx="30" ry="6" fill="#9CA3AF"/>
        <ellipse cx="40" cy="21" rx="30" ry="5" fill="#C0C0C0"/>
        <circle cx="18" cy="22" r="1.5" fill="#FF3B30"/>
        <circle cx="28" cy="24" r="1.5" fill="#FFCC00"/>
        <circle cx="40" cy="25" r="1.5" fill="#34D058"/>
        <circle cx="52" cy="24" r="1.5" fill="#00E5FF"/>
        <circle cx="62" cy="22" r="1.5" fill="#FF3B30"/>
      </svg>
    `
  }
];

/**
 * Ambil satu kendaraan acak
 */
export function randomVehicle() {
  return VEHICLES[Math.floor(Math.random() * VEHICLES.length)];
}