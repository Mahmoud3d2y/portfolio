/* =========================================================
   Mahmoud Saadaoui — Portfolio scripts
   No dependencies. English is written in index.html;
   French lives in the FR object below.
   ========================================================= */

(function () {
  'use strict';

  const root = document.documentElement;
  const NNBSP = ' '; // narrow no-break space for French punctuation

  /* ---------- Safe storage ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) root.classList.add('motion-ok');

  /* ---------- French translations ---------- */
  const FR = {
    'skip': 'Aller au contenu',
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.work': 'Projets',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.book': 'Prendre contact',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer',

    'hero.side': 'Web designer freelance',
    'hero.f1t': 'Solo',
    'hero.f1': 'Ni agence, ni intermédiaire',
    'hero.f2t': 'Partout',
    'hero.f2': 'À distance ou sur place',
    'hero.sr': 'Bonjour, je suis Mahmoud Saadaoui, web designer et développeur freelance.',
    'hero.sub': 'Je suis Mahmoud, web designer &amp; développeur freelance.',
    'hero.switchLabel': 'Dire bonjour en',
    'hero.scroll': 'Défiler',
    'hero.place': 'Brazzaville',

    'about.title': 'À propos',
    'about.text': 'Je suis web designer et développeur front-end indépendant. Je ne travaille pour aucune agence ni aucune société' + NNBSP + ': chaque projet est conçu, rédigé et codé par moi, du premier échange jusqu’à la mise en ligne.',
    'about.card': 'Une seule personne, du début à la fin. Vous parlez toujours à celui qui construit votre site.',
    'about.p1': 'Basé à <strong>Brazzaville, au Congo</strong> pour le moment, et ouvert à travailler avec des clients partout, à distance ou sur place.',
    'about.p2': 'Chaque site que je livre est rapide, accessible, bilingue si besoin, et assez simple pour que vous puissiez le mettre à jour vous-même.',

    'work.eyebrow': 'Portfolio',
    'work.title': 'Projets choisis',
    'tinda.kind': 'Site corporate · 34 pages · FR / EN',
    'mick.kind': 'Portfolio personnel · Aviation · EN / FR',
    'newTab': '(s’ouvre dans un nouvel onglet)',

    'services.eyebrow': 'Services',
    'services.title': 'Ce que je peux faire pour vous',
    'services.lede': 'Des sites codés à la main, sans constructeur de pages ni abonnement. Le code vous appartient.',
    's1.title': 'Sites corporate',
    's1.text': 'Des sites multipages qui expliquent ce que fait votre entreprise et comment travailler avec vous.',
    's2.title': 'Portfolios &amp; marques personnelles',
    's2.text': 'Des sites d’une page pour les indépendants qui doivent inspirer confiance rapidement.',
    's3.title': 'Sites bilingues',
    's3.text': 'Le français et l’anglais intégrés dès le départ, avec une vraie typographie française.',
    's4.title': 'Refontes &amp; audits',
    's4.text': 'Un audit de votre site (vitesse, accessibilité, référencement), puis une liste de corrections ou une refonte.',
    'tag.design': 'Design',
    'tag.code': 'Code',
    'tag.audit': 'Audit',

    'contact.eyebrow': 'Disponible pour de nouveaux projets',
    'contact.title': 'Une idée' + NNBSP + '? Donnons-lui vie.',
    'contact.text': 'Dites-moi ce que vous faites et ce que votre site doit accomplir. Où que vous soyez, nous pouvons travailler ensemble.',
    'contact.cta': 'M’écrire',
    'contact.copy': 'Copier l’e-mail',
    'contact.copied': 'Adresse copiée',
    'footer.place': 'Brazzaville, Congo — disponible partout'
  };

  const EN_EXTRA = {
    'nav.close': 'Close',
    'contact.copied': 'Email copied'
  };

  /* ---------- Language ---------- */
  const i18nEls = document.querySelectorAll('[data-i18n]');
  const ariaEls = document.querySelectorAll('[data-i18n-aria]');
  const EN = Object.assign({}, EN_EXTRA);
  i18nEls.forEach(el => { EN[el.dataset.i18n] = el.innerHTML; });
  ariaEls.forEach(el => { EN[el.dataset.i18nAria] = el.getAttribute('aria-label'); });

  let lang = store.get('ms-lang') ||
    ((navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en');

  const t = key => (lang === 'fr' ? FR : EN)[key] || EN[key] || '';
  const langBtn = document.getElementById('lang-toggle');

  function applyLang() {
    root.lang = lang;
    const dict = lang === 'fr' ? FR : EN;
    i18nEls.forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v != null && el.innerHTML !== v) el.innerHTML = v;
    });
    ariaEls.forEach(el => {
      const v = dict[el.dataset.i18nAria];
      if (v) el.setAttribute('aria-label', v);
    });
    const other = lang === 'fr' ? 'en' : 'fr';
    langBtn.textContent = other.toUpperCase();
    langBtn.lang = other;
    langBtn.setAttribute('aria-label', other === 'fr' ? 'Passer en français' : 'Switch to English');
    menuBtn.querySelector('.menu-label').textContent = t(nav.classList.contains('is-open') ? 'nav.close' : 'nav.menu');
    if (!greetingPicked) setGreeting(homeWord(), false);
  }

  langBtn.addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    store.set('ms-lang', lang);
    applyLang();
  });

  /* ---------- Greeting: Mbote (Lingala) · Bonjour · Hello ---------- */
  const greeting = document.getElementById('greeting');
  const switchBtns = [...document.querySelectorAll('.hello-switch button')];
  const homeWord = () => (lang === 'fr' ? 'Bonjour' : 'Hello');
  let greetingPicked = false;
  let introTimers = [];
  let swapTimer;

  function setGreeting(word, animate) {
    switchBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.word === word)));
    const lng = switchBtns.find(b => b.dataset.word === word)?.lang || 'en';
    if (greeting.textContent === word) return;
    clearTimeout(swapTimer);
    if (!animate || reduceMotion) {
      greeting.textContent = word;
      greeting.lang = lng;
      greeting.classList.remove('is-out');
      return;
    }
    greeting.classList.add('is-out');
    swapTimer = setTimeout(() => {
      greeting.textContent = word;
      greeting.lang = lng;
      greeting.classList.remove('is-out');
    }, 240);
  }

  switchBtns.forEach(btn => btn.addEventListener('click', () => {
    greetingPicked = true;
    introTimers.forEach(clearTimeout);
    setGreeting(btn.dataset.word, true);
  }));

  // One short pass on load (under 5 seconds), ending on the page language
  function playIntro() {
    if (reduceMotion) return;
    const end = homeWord();
    const seq = ['Mbote'].concat(end === 'Hello' ? ['Bonjour', 'Hello'] : ['Hello', 'Bonjour']);
    setGreeting(seq[0], false);
    seq.slice(1).forEach((w, i) => {
      introTimers.push(setTimeout(() => { if (!greetingPicked) setGreeting(w, true); }, 1300 * (i + 1)));
    });
  }

  /* ---------- Brazzaville clock ---------- */
  const clock = document.getElementById('clock');
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Brazzaville', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  } catch (e) { fmt = null; }
  function tick() {
    if (!fmt) { clock.parentElement.hidden = true; return; }
    const now = new Date();
    clock.textContent = fmt.format(now) + ' GMT+1';
    clock.dateTime = now.toISOString();
  }
  tick();
  setInterval(tick, 15000);

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  const header = document.querySelector('.site-header');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('.menu-label').textContent = t(open ? 'nav.close' : 'nav.menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* ---------- Header: scrolled state + light/dark text over sections ---------- */
  const darkEls = [...document.querySelectorAll('[data-dark]')];
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const probe = header.offsetHeight / 2;
    header.classList.toggle('is-scrolled', y > 8);
    header.classList.toggle('on-dark', darkEls.some(el => {
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    }));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && y >= max - 4) {
      navLinks.forEach((a, i) => i === navLinks.length - 1 ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean).forEach(s => spy.observe(s));

    /* Scroll reveal, staggered within each parent */
    const groups = new Map();
    document.querySelectorAll('.reveal').forEach(el => {
      const n = groups.get(el.parentElement) || 0;
      el.style.setProperty('--stagger', n);
      groups.set(el.parentElement, n + 1);
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Copy email ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }
  const copyBtn = document.getElementById('copy-email');
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) { /* ignore */ }
      ta.remove();
    }
    showToast(t('contact.copied') + ' — ' + email);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  applyLang();
  playIntro();
})();
