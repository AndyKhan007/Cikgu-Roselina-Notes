// =====================================================
// Animasi lampu trafik + kendaraan random di navbar
// Versi 5 — kendaraan acak + air vehicle support
// =====================================================

import { randomVehicle } from './vehicles.js';

const wait = (ms) => new Promise(r => setTimeout(r, ms));

export function startLogoAnimation() {
  const track = document.getElementById('carTrack');
  const car   = document.getElementById('cuteCar');
  const logo  = document.getElementById('logoTraffic');

  if (!track || !car || !logo) return;

  const lights = {
    red:    logo.querySelector('.tl-red'),
    yellow: logo.querySelector('.tl-yellow'),
    green:  logo.querySelector('.tl-green')
  };

  if (!lights.red || !lights.yellow || !lights.green) return;

  function setLight(color) {
    Object.entries(lights).forEach(([k, el]) => {
      el.classList.toggle('active', k === color);
    });
  }

  function setVehicle(v) {
    // Ganti isi SVG kendaraan
    car.innerHTML = v.svg;
    // Set class 'air' kalau kendaraan terbang
    car.classList.toggle('air', !!v.air);
  }

  async function loop() {
    // Pilih kendaraan acak untuk siklus ini
    const vehicle = randomVehicle();
    setVehicle(vehicle);

    setLight('green');
    await wait(80);

    const trackRect = track.getBoundingClientRect();
    const logoRect  = logo.getBoundingClientRect();

    if (trackRect.width === 0 || logoRect.width === 0) {
      await wait(500);
      return loop();
    }

    const carWidth = car.offsetWidth || 44;

    // Mobil berhenti 8px di kanan logo
    const stopX  = (logoRect.right - trackRect.left) + 8;
    // Mulai dari luar kanan
    const startX = trackRect.width + carWidth + 20;
    // Keluar ke kiri
    const exitX  = -(carWidth + 20);

    // Reset posisi
    car.style.transition = 'none';
    car.style.transform  = `translateX(${startX}px)`;
    car.style.opacity    = '1';
    void car.offsetWidth;

    await wait(50);

    const isMobile  = window.matchMedia('(max-width: 640px)').matches;
    const driveTime = isMobile ? 1.8 : 2.4;

    // FASE 1: jalan dari kanan ke titik berhenti
    car.style.transition = `transform ${driveTime}s cubic-bezier(0.25, 0.1, 0.4, 1)`;
    car.style.transform  = `translateX(${stopX}px)`;

    // FASE 2: kuning saat hampir sampai
    await wait(driveTime * 1000 * 0.70);
    setLight('yellow');

    // FASE 3: merah + glow
    await wait(450);
    setLight('red');

    // FASE 4: tunggu mobil benar-benar berhenti
    await wait(driveTime * 1000 * 0.40);
    // Diam di lampu merah
    await wait(1500);

    // FASE 5: hijau lagi
    setLight('green');
    await wait(280);

    // FASE 6: jalan maju ke kiri & menghilang
    car.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.7, 1)';
    car.style.transform  = `translateX(${exitX}px)`;

    await wait(1300);
    car.style.opacity = '0';

    await wait(1800);
    loop();
  }

  setTimeout(loop, 600);
}