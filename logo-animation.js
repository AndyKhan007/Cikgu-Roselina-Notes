// =====================================================
// Animasi lampu trafik + mobil kecil di navbar
// =====================================================

const wait = (ms) => new Promise(r => setTimeout(r, ms));

export function startLogoAnimation() {
  const track = document.getElementById('carTrack');
  const car   = document.getElementById('cuteCar');
  const logo  = document.getElementById('logoTraffic');

  if (!track || !car || !logo) return;
  if (window.matchMedia('(max-width: 640px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    logo.querySelector('.tl-green')?.classList.add('active');
    return;
  }

  const lights = {
    red:    logo.querySelector('.tl-red'),
    yellow: logo.querySelector('.tl-yellow'),
    green:  logo.querySelector('.tl-green')
  };

  function setLight(color) {
    Object.entries(lights).forEach(([k, el]) => {
      el.classList.toggle('active', k === color);
    });
  }

  async function loop() {
    // Mulai dari hijau
    setLight('green');

    // Ukur posisi
    const trackRect = track.getBoundingClientRect();
    const logoRect  = logo.getBoundingClientRect();

    // Mobil berhenti dengan sisi kiri tepat di kanan logo (beri jarak 10px)
    const stopX  = (logoRect.right - trackRect.left) + 10;
    // Titik mulai: di luar kanan track
    const startX = trackRect.width + 40;
    // Titik keluar: di luar kiri
    const exitX  = -80;

    // Reset mobil ke luar kanan tanpa transisi
    car.style.transition = 'none';
    car.style.transform  = `translateX(${startX}px)`;
    car.style.opacity    = '1';
    void car.offsetWidth;   // paksa reflow

    // ============ FASE 1: jalan dari kanan ke titik berhenti ============
    const driveTime = 2.4; // detik
    car.style.transition = `transform ${driveTime}s cubic-bezier(0.25, 0.1, 0.4, 1)`;
    car.style.transform  = `translateX(${stopX}px)`;

    // ============ FASE 2: saat hampir sampai, kuning ============
    await wait(driveTime * 1000 * 0.70);
    setLight('yellow');

    // ============ FASE 3: merah + glow ============
    await wait(450);
    setLight('red');

    // Tunggu mobil benar-benar berhenti
    await wait(driveTime * 1000 * 0.40);

    // ============ FASE 4: berhenti di lampu merah ============
    await wait(1500);

    // ============ FASE 5: hijau lagi ============
    setLight('green');
    await wait(280);

    // ============ FASE 6: mobil jalan maju ke kiri & menghilang ============
    car.style.transition = 'transform 1.4s cubic-bezier(0.4, 0, 0.7, 1)';
    car.style.transform  = `translateX(${exitX}px)`;

    await wait(1500);
    car.style.opacity = '0';

    // Jeda sebelum ulang
    await wait(1800);

    // Rekursi
    loop();
  }

  // Mulai animasi setelah 600ms agar halaman stabil dulu
  setTimeout(loop, 600);
}