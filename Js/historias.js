/* ===== Historias Slider ===== */
(function () {
  const section = document.getElementById('HistoriasSlider');
  if (!section) return;

  const slidesWrap = section.querySelector('.slides');
  const slides = Array.from(section.querySelectorAll('.slide'));
  const prevBtn = section.querySelector('.slider-arrow.left');
  const nextBtn = section.querySelector('.slider-arrow.right');

  const autoplay = slidesWrap?.dataset.autoplay === 'true';
  const intervalMs = Number(slidesWrap?.dataset.interval || 7000);

  // Pintar fondos y preparar audios
  slides.forEach(slide => {
    const bg = slide.getAttribute('data-bg');
    const audioSrc = slide.getAttribute('data-audio');
    if (bg) slide.style.backgroundImage = `url("${bg}")`;
    const audio = slide.querySelector('audio');
    if (audio && audioSrc) audio.src = audioSrc;
  });

 // Crear un solo grupo de dots global
const dotsBox = section.querySelector('.slider-dots');
const dots = [];
if (dotsBox) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.role = 'tab';
    dot.ariaLabel = `Ir a la diapositiva ${i + 1}`;
    dot.addEventListener('click', () => goTo(i));
    dotsBox.appendChild(dot);
    dots.push(dot);
  });
}


  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0;
  update();

  function goTo(i) {
    if (i === index) return;
    // Pausar audio del slide saliente
    const currentAudio = slides[index].querySelector('audio');
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    const currentAudioBtn = slides[index].querySelector('.btn-audio');
    if (currentAudioBtn) currentAudioBtn.setAttribute('aria-pressed', 'false');

    index = (i + slides.length) % slides.length;
    update(true);
    restartAutoplay();
  }

  function update() {
  slides.forEach((s, i) => {
    s.classList.toggle('is-active', i === index);
  });
  dots.forEach((d, i) => d.setAttribute('aria-selected', i === index ? 'true' : 'false'));
}


  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // Botón audio por slide
  slides.forEach(s => {
    const btn = s.querySelector('.btn-audio');
    const audio = s.querySelector('audio');

    // Manejo seguro de eventos de audio (solo si existe)
    if (audio) {
      audio.addEventListener('play', () => {
        stopAutoplay();
        if (btn) btn.setAttribute('aria-pressed', 'true');
      });
      audio.addEventListener('pause', () => {
        startAutoplay();
        if (btn) btn.setAttribute('aria-pressed', 'false');
      });
      audio.addEventListener('ended', () => {
        startAutoplay();
        if (btn) btn.setAttribute('aria-pressed', 'false');
      });
    }

    if (!(btn && audio)) return;

    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      if (pressed) {
        // Pausar este audio y reanudar autoplay
        if (audio) { audio.pause(); audio.currentTime = 0; }
        btn.setAttribute('aria-pressed', 'false');
        startAutoplay();
      } else {
        // detener otros audios
        slides.forEach(ss => {
          const a = ss.querySelector('audio');
          const b = ss.querySelector('.btn-audio');
          if (a && b && a !== audio) { a.pause(); a.currentTime = 0; b.setAttribute('aria-pressed', 'false'); }
        });
        // reproducir este audio
        audio.play().catch(() => { startAutoplay(); });
        btn.setAttribute('aria-pressed', 'true');
      }

    });
  });

  // Teclado
  section.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
  });
  section.tabIndex = 0; // focusable para teclado

  // Autoplay
  let timer = null;
  function startAutoplay() {
    if (!autoplay) return;
    stopAutoplay();
    timer = setInterval(() => goTo(index + 1), intervalMs);
  }
  function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  // Pausar al hover o cuando la pestaña pierde foco
  section.addEventListener('mouseenter', stopAutoplay);
  section.addEventListener('mouseleave', startAutoplay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay(); else startAutoplay();
  });

  // --- Add improved touch / swipe support for mobile ---
  (function addSwipe() {
    let startX = 0, startY = 0, tracking = false, pointerId = null;
    const THRESHOLD = 40;      // px to consider a swipe
    const MAX_VERTICAL_RATIO = 0.5; // require horizontal movement to be stronger than this*vertical

    // If the start target is interactive, don't begin a swipe (so audio controls, links, buttons keep working)
    function isInteractive(el) {
      if (!el) return false;
      return !!el.closest('a, button, input, textarea, select, audio, video, .btn-audio, .content-top__cta-img');
    }

    function onStart(e) {
      const p = e.touches ? e.touches[0] : e;
      if (isInteractive(e.target)) return;
      startX = p.clientX;
      startY = p.clientY;
      tracking = true;
      if (e.pointerId) pointerId = e.pointerId;
      // debug
      try { console.debug('Historias: swipe start', {x: startX, y: startY, target: e.target && e.target.tagName}); } catch (err) {}
      if (slidesWrap) slidesWrap.style.outline = '2px solid rgba(255,0,0,0.25)';
    }

    function onMove(e) {
      if (!tracking) return;
      // if pointer events, ensure it's the same pointer
      if (e.pointerId && pointerId && e.pointerId !== pointerId) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - startX;
      const dy = p.clientY - startY;
      // If horizontal movement predominates, prevent vertical scroll so swipe is recognised
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        try { e.preventDefault(); } catch (er) { /* passive may block */ }
      }
      try { console.debug('Historias: swipe move', {dx, dy}); } catch (err) {}
    }

    function onEnd(e) {
      if (!tracking) return;
      // pointer events: ensure same pointer
      if (e.pointerId && pointerId && e.pointerId !== pointerId) return;
      tracking = false;
      pointerId = null;
      try { console.debug('Historias: swipe end', {dx, dy}); } catch (err) {}
      if (slidesWrap) slidesWrap.style.outline = '';
      const p = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : e;
      const dx = p.clientX - startX;
      const dy = p.clientY - startY;
      if (Math.abs(dx) < THRESHOLD) return;
      if (Math.abs(dx) < Math.abs(dy) * MAX_VERTICAL_RATIO) return; // mostly vertical
      if (dx < 0) goTo(index + 1); else goTo(index - 1);
      restartAutoplay();
    }

    // touch listeners (use passive:false for touchstart/move to allow preventDefault)
    if (slidesWrap) {
      slidesWrap.addEventListener('touchstart', onStart, { passive: false });
      slidesWrap.addEventListener('touchmove', onMove, { passive: false });
      slidesWrap.addEventListener('touchend', onEnd);
      slidesWrap.addEventListener('touchcancel', () => { tracking = false; pointerId = null; });

      // Pointer events: handle touch & mouse uniformly, allow pointer capture for robust tracking
      slidesWrap.addEventListener('pointerdown', (e) => {
        // ignore right-clicks and non-primary buttons
        if (e.button && e.button !== 0) return;
        if (isInteractive(e.target)) return;
        try { slidesWrap.setPointerCapture && slidesWrap.setPointerCapture(e.pointerId); } catch (err) {}
        onStart(e);
      });

      slidesWrap.addEventListener('pointermove', (e) => { onMove(e); }, { passive: false });

      slidesWrap.addEventListener('pointerup', (e) => {
        try { slidesWrap.releasePointerCapture && slidesWrap.releasePointerCapture(e.pointerId); } catch (err) {}
        onEnd(e);
      });

      slidesWrap.addEventListener('pointercancel', () => { tracking = false; pointerId = null; });
    }
    else {
      // Fallback: attach to section if slidesWrap is not found or not receiving events
      console.debug && console.debug('Historias: slidesWrap not available, attaching fallback listeners to section');
      section.addEventListener('touchstart', onStart, { passive: false });
      section.addEventListener('touchmove', onMove, { passive: false });
      section.addEventListener('touchend', onEnd);
      section.addEventListener('pointerdown', onStart);
      section.addEventListener('pointermove', onMove);
      section.addEventListener('pointerup', onEnd);
    }
  })();
  // --- end swipe support ---
  startAutoplay();
})();
