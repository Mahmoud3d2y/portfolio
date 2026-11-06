/* =========================================================
   Motion effects, ported to plain JavaScript from unlumen UI
   (https://github.com/leovvx/unlumen-ui-docs):
   Magnetic Button, Tilt, Text Reveal, Shimmering Text, Scramble Text.

   MIT License — Copyright (c) 2026 Léo Wicki
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions: the above copyright
   notice and this permission notice shall be included in all copies or
   substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS",
   WITHOUT WARRANTY OF ANY KIND.

   Every effect is skipped when the visitor asks for reduced motion;
   pointer effects are also skipped on touch screens.
   ========================================================= */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduceMotion) return;

  /* ---------- Spring: a tiny version of motion's useSpring ---------- */
  // Each spring eases `value` toward `target`; one shared rAF loop runs while any spring moves.
  const springs = new Set();
  let loop = 0;
  // A frame is split into small steps: one big step makes stiff springs blow up
  const STEPS = 12;
  const DT = 1 / 60 / STEPS;
  function tick() {
    let moving = false;
    springs.forEach(s => {
      // Damped spring (Hooke's law + friction)
      for (let i = 0; i < STEPS; i++) {
        const accel = (s.stiffness * (s.target - s.value) - s.damping * s.velocity) / s.mass;
        s.velocity += accel * DT;
        s.value += s.velocity * DT;
      }
      if (Math.abs(s.target - s.value) > 0.01 || Math.abs(s.velocity) > 0.01) moving = true;
      else { s.value = s.target; s.velocity = 0; }
      s.onChange(s.value);
    });
    loop = moving ? requestAnimationFrame(tick) : 0;
  }
  function spring(onChange, { stiffness = 150, damping = 15, mass = 0.1 } = {}) {
    const s = { value: 0, target: 0, velocity: 0, stiffness, damping, mass, onChange };
    springs.add(s);
    return {
      set(v) { s.target = v; if (!loop) loop = requestAnimationFrame(tick); }
    };
  }

  /* ---------- Magnetic Button: drawn toward the cursor inside a radius ---------- */
  // Uses the `translate` property so it stacks with each element's own hover transforms.
  if (finePointer) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      const strength = parseFloat(el.dataset.magnetic) || 0.35;
      let x = 0, y = 0;
      const apply = () => { el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`; };
      const sx = spring(v => { x = v; apply(); });
      const sy = spring(v => { y = v; apply(); });
      window.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const radius = Math.max(100, r.width * 0.9);
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const pull = (1 - dist / radius) * strength;
          sx.set(dx * pull);
          sy.set(dy * pull);
        } else {
          sx.set(0);
          sy.set(0);
        }
      }, { passive: true });
    });
  }

  /* ---------- Tilt: 3D tilt toward the cursor, with a soft light that follows it ---------- */
  if (finePointer) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      const max = parseFloat(el.dataset.tilt) || 6;
      let rx = 0, ry = 0;
      const apply = () => { el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`; };
      const opts = { stiffness: 120, damping: 14, mass: 0.6 };
      const sx = spring(v => { ry = v; apply(); }, opts);
      const sy = spring(v => { rx = v; apply(); }, opts);
      const shine = document.createElement('span');
      shine.className = 'tilt-shine';
      shine.setAttribute('aria-hidden', 'true');
      el.appendChild(shine);
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        sx.set(-px * 2 * max);
        sy.set(py * 2 * max);
        shine.style.setProperty('--x', `${(px + 0.5) * 100}%`);
        shine.style.setProperty('--y', `${(py + 0.5) * 100}%`);
      });
      el.addEventListener('pointerleave', () => { sx.set(0); sy.set(0); });
    });
  }

  /* ---------- Text Reveal: words go from blurred to sharp when they scroll into view ---------- */
  const revealEls = [...document.querySelectorAll('[data-text-reveal]')];
  function splitWords(el) {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(' ').forEach((word, i, all) => {
      const span = document.createElement('span');
      span.className = 'tr-word';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--i', i);
      span.textContent = i < all.length - 1 ? word + ' ' : word;
      el.appendChild(span);
    });
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('tr-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(el => { splitWords(el); io.observe(el); });
    // The language switch rewrites these titles: split them again, already revealed
    document.addEventListener('langchange', () => {
      revealEls.forEach(el => { el.removeAttribute('aria-label'); splitWords(el); el.classList.add('tr-in'); });
    });
  }

  /* ---------- Scramble Text: letters scramble, then settle, on hover ---------- */
  if (finePointer) {
    const CHARS = 'abcdefghijklmnopqrstuvwxyz!@#$%&*';
    document.querySelectorAll('[data-scramble]').forEach(el => {
      let timer = 0;
      el.addEventListener('mouseenter', () => {
        // Read the label each time: the language switch may have changed it
        const target = el.querySelector('[data-scramble-text]') || el;
        if (timer) return;
        const text = target.dataset.original || target.textContent;
        target.dataset.original = text;
        el.setAttribute('aria-label', text);
        let shown = 0;
        timer = setInterval(() => {
          shown++;
          const scrambled = Array.from({ length: Math.min(2, text.length - shown) },
            () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
          target.textContent = text.slice(0, shown) + scrambled;
          if (shown >= text.length) {
            clearInterval(timer);
            timer = 0;
            target.textContent = text;
            delete target.dataset.original;
            el.removeAttribute('aria-label');
          }
        }, 35);
      });
    });
  }
})();
