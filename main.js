(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /**
   * Subtle tilt + liquid highlight driver.
   * Sets CSS vars: --rx, --ry, --mx, --my
   */
  function attachTilt(el, options = {}) {
    const maxTilt = Number(options.maxTilt ?? 7);

    const setVars = (rx, ry, mxPct, myPct) => {
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--mx', `${mxPct}%`);
      el.style.setProperty('--my', `${myPct}%`);
    };

    const reset = () => setVars(0, 0, 50, 50);

    const onMove = (clientX, clientY) => {
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;

      const px = (x / r.width) - 0.5;
      const py = (y / r.height) - 0.5;

      // Keep it classy: small tilt range
      const rx = (-py * maxTilt);
      const ry = (px * maxTilt);

      const mx = (x / r.width) * 100;
      const my = (y / r.height) * 100;

      setVars(rx, ry, mx, my);
    };

    // Pointer events (mouse, pen). Touch will still work but won't feel "busy".
    el.addEventListener('pointermove', (e) => {
      // Avoid expensive updates for non-hover pointers.
      if (e.pointerType === 'touch') return;
      onMove(e.clientX, e.clientY);
    });
    el.addEventListener('pointerleave', reset);
    el.addEventListener('blur', reset);

    reset();
  }

  // Directory cards: tilt is applied to the inner .card__glass surface
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    const surface = card.querySelector('.card__glass');
    if (surface) attachTilt(surface, { maxTilt: 8 });
  });

  // Login panel + dashboard panels
  const loginCard = document.querySelector('.auth__card');
  if (loginCard) attachTilt(loginCard, { maxTilt: 5 });

  document.querySelectorAll('.panel').forEach((p) => attachTilt(p, { maxTilt: 4 }));
})();
