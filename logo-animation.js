// =====================================================
// Animasi lampu trafik + mobil kecil di navbar
// Versi 3 — force animate (abaikan reduce motion)
// =====================================================

const wait = (ms) => new Promise(r => setTimeout(r, ms));

export function startLogoAnimation() {
  const track = document.getElementById('carTrack');
  const car   = document.getElementById('cuteCar');
  const logo  = document.getElementById('logoTraffic');

  if (!track || !car || !logo) return;

  // Lewati hanya kalau layar kecil (agar tidak mengganggu di HP)
  if (window.matchMedia('(max-width: 640px)').matches) return;

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

    const stopX  = (logoRect.right - trackRect.left) + 10;
    const startX = trackRect.width + 40;
    const exitX  = -80;

    // Reset posisi
    car.style.transition = 'none';
    car.style.transform  = `translateX(${startX}px)`;
    car.style.opacity    = '1';
    void car.offsetWidth;

    await wait(50);

    // FASE 1: jalan
    const driveTime = 2.4;
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

    // FASE 6: lanjut
    car.style.transition = 'transform 1.4s cubic-bezier(0.4, 0, 0.7, 1)';
    car.style.transform  = `translateX(${exitX}px)`;

    await wait(1500);
    car.style.opacity = '0';

    await wait(1800);
    loop();
  }

  setTimeout(loop, 600);
}