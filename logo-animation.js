// =====================================================
// Animasi lampu trafik + mobil kecil di navbar
// Versi 4 — mobile-friendly, tanpa reduce-motion blocker
// =====================================================

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

  async function loop() {
    setLight('green');
    await wait(80);

    const trackRect = track.getBoundingClientRect();
    const logoRect  = logo.getBoundingClientRect();

    if (trackRect.width === 0 || logoRect.width === 0) {
      await wait(500);
      return loop();
    }

    // Lebar mobil mengikuti CSS (.cute-car)
    const carWidth = car.offsetWidth || 44;

    // Mobil berhenti tepat 8px di kanan logo
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

    // Durasi jalan: sedikit lebih cepat di mobile
    const isMobile  = window.matchMedia('(max-width: 640px)').matches;
    const driveTime = isMobile ? 1.8 : 2.4;

    // FASE 1: jalan
    car.style.transition = `transform ${driveTime}s cubic-bezier(0.25, 0.1, 0.4, 1)`;
    car.style.transform  = `translateX(${stopX}px)`;

    // FASE 2: kuning
    await wait(driveTime * 1000 * 0.70);
    setLight('yellow');

    // FASE 3: merah
    await wait(450);
    setLight('red');

    // FASE 4: berhenti
    await wait(driveTime * 1000 * 0.40);
    await wait(1500);

    // FASE 5: hijau lagi
    setLight('green');
    await wait(280);

    // FASE 6: lanjut ke kiri
    car.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.7, 1)';
    car.style.transform  = `translateX(${exitX}px)`;

    await wait(1300);
    car.style.opacity = '0';

    await wait(1800);
    loop();
  }

  setTimeout(loop, 600);
}