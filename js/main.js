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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches) root.classList.add('motion-ok');

  /* ---------- French translations ---------- */
  const FR = {
    'skip': 'Aller au contenu',
    'nav.work': 'Projets',
    'nav.services': 'Services',
    'nav.process': 'Méthode',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer',
    'theme.toDark': 'Passer au thème sombre',
    'theme.toLight': 'Passer au thème clair',

    'hero.index': 'Portfolio — Édition 2026',
    'hero.role': 'Design web &amp; développement front-end',
    'hero.status': 'Disponible pour de nouveaux projets',
    'hero.lede': 'Je conçois et code à la main des sites qui donnent <em>aux entreprises sérieuses l’image qu’elles méritent</em> — rapides, accessibles et prêts en deux langues.',
    'hero.cta': 'Lancer un projet',
    'hero.cta2': 'Voir les projets',
    'hero.tagsLabel': 'Spécialités',
    'tag.1': 'Sites corporate',
    'tag.2': 'Portfolios',
    'tag.3': 'FR / EN',
    'tag.4': 'WCAG 2.2',

    'work.eyebrow': 'Projets choisis',
    'work.title': 'De vrais clients. Du vrai contenu. En ligne.',
    'tinda.kind': 'Site corporate · Ingénierie · 2026',
    'tinda.text': 'Un site corporate bilingue pour une entreprise d’ingénierie de Brazzaville active dans l’énergie, les réseaux, le génie civil et la maintenance industrielle. Le concept, <em>«' + NNBSP + 'Le Relevé' + NNBSP + '»</em>, emprunte aux plans de géomètre' + NNBSP + ': codes de section, photos de terrain légendées et carte de couverture nationale.',
    'tinda.stack': 'HTML · Tokens CSS · JS natif · Build Node · AVIF · JSON-LD',
    'tinda.caption': 'Fig. 01 — Page d’accueil, version française',
    'fact.pages': 'Pages',
    'fact.langs': 'Langues',
    'fact.deps': 'Dépendances',
    'fact.a11y': 'Accessibilité',
    'fact.themes': 'Thèmes',
    'fact.lightdark': 'Clair · Sombre',
    'fact.build': 'Étape de build',
    'fact.none': 'Aucune',
    'fact.edit': 'Modification',
    'fact.editVal': 'Repérée dans le code',
    'mick.kind': 'Portfolio personnel · Aviation · 2026',
    'mick.text': 'Un portfolio pour un spécialiste du nettoyage d’avions, pensé pour décrocher des contrats auprès des compagnies et des sociétés d’assistance au sol. Un curseur avant/après prouve la qualité, une galerie filtrable montre l’étendue du travail, et le bouton CV s’active tout seul dès que le fichier est ajouté.',
    'mick.live': 'Voir le site en ligne',
    'mick.caption': 'Fig. 02 — Page d’accueil, version anglaise',
    'newTab': '(s’ouvre dans un nouvel onglet)',
    'next.title': 'Votre projet pourrait être le prochain.',
    'next.cta': 'Parlez-m’en',

    'services.eyebrow': 'Services',
    'services.title': 'Ce que je peux construire pour vous.',
    's1.title': 'Sites corporate',
    's1.text': 'Des sites multipages qui expliquent ce que fait votre entreprise, pour qui, et comment travailler avec vous. Pages services, secteurs, équipe, parcours de contact pour clients et appels d’offres.',
    's2.title': 'Portfolios &amp; marques personnelles',
    's2.text': 'Des sites d’une page pour les indépendants qui doivent inspirer confiance vite' + NNBSP + ': une offre claire, des preuves, un CV et un seul moyen évident de vous contacter.',
    's3.title': 'Sites bilingues',
    's3.text': 'Le français et l’anglais intégrés dès le départ, avec les bonnes balises de langue, des métadonnées traduites et la typographie française — pas un widget de traduction ajouté après coup.',
    's4.title': 'Refontes &amp; audits',
    's4.text': 'Un audit de votre site actuel (vitesse, accessibilité, bases du référencement), suivi d’une liste de corrections priorisées ou d’une refonte complète.',

    'principles.eyebrow': 'Ma méthode',
    'principles.title': 'Quatre règles pour chaque site.',
    'p1.title': 'Du vrai contenu, rien d’autre',
    'p1.text': 'Les textes et les photos viennent de vous, pas de banques d’images. Ce qui n’est pas encore réalisé est indiqué comme prévu. Les visiteurs font confiance à ce qu’ils peuvent vérifier.',
    'p2.title': 'Aucune dépendance',
    'p2.text': 'Du HTML, du CSS et du JavaScript. Pas de constructeur de pages, pas d’abonnement, pas de framework à mettre à jour. Le site tourne sur n’importe quel hébergeur, aujourd’hui comme dans dix ans.',
    'p3.title': 'Accessible par défaut',
    'p3.text': 'Navigation au clavier, focus visible, contrastes lisibles, respect des préférences de mouvement et libellés corrects, vérifiés selon le WCAG 2.2 avant la mise en ligne.',
    'p4.title': 'Pensé pour être transmis',
    'p4.text': 'Chaque zone modifiable est repérée dans le code et expliquée dans un guide simple. Vous changez un numéro de téléphone sans avoir à m’appeler.',

    'process.eyebrow': 'Méthode',
    'process.title': 'Du premier appel à la mise en ligne.',
    'st1.title': 'Écouter',
    'st1.text': 'Nous parlons de votre activité, de vos clients et de ce que le site doit accomplir. Je rassemble vos brochures, photos et documents existants.',
    'st2.title': 'Concevoir',
    'st2.text': 'Un concept visuel construit autour de votre travail, avec la structure des pages et les textes, validé ensemble avant la moindre ligne de code.',
    'st3.title': 'Développer',
    'st3.text': 'Codé à la main, testé sur mobile et ordinateur, dans les deux langues, avec des contrôles d’accessibilité et de vitesse tout au long du projet.',
    'st4.title': 'Lancer &amp; transmettre',
    'st4.text': 'Je mets le site en ligne, configure les bases du référencement et vous remets un guide de modification. Le code vous appartient.',

    'about.eyebrow': 'À propos',
    'about.title': 'Un designer qui code. Un développeur attentif au rendu.',
    'about.p1': 'Je suis Mahmoud Saadaoui, designer web et développeur front-end. Je travaille directement avec des dirigeants et des indépendants, d’une entreprise d’ingénierie au Congo à un spécialiste de l’aviation, et je prends en charge tout le projet' + NNBSP + ': concept, structure des contenus, design et code.',
    'about.p2': 'Je soigne les détails que l’on oublie souvent' + NNBSP + ': la lecture d’un site en français, son comportement au clavier, sa vitesse sur une connexion mobile, et la capacité du client à le mettre à jour un an plus tard.',
    'about.k1': 'Design',
    'about.v1': 'Direction artistique, mise en page, typographie, design tokens',
    'about.k2': 'Code',
    'about.v2': 'HTML sémantique, CSS moderne, JavaScript natif, scripts de build Node',
    'about.k3': 'Qualité',
    'about.v3': 'WCAG 2.2, Core Web Vitals, métadonnées SEO, données structurées',
    'about.k4': 'Langues',
    'about.v4': 'Français, anglais',

    'contact.eyebrow': 'Contact',
    'contact.l1': 'Un projet' + NNBSP + '?',
    'contact.l2': 'Parlons-en.',
    'contact.text': 'Dites-moi ce que fait votre entreprise et ce que le site doit accomplir. Je réponds sous deux jours ouvrés avec mes questions, un calendrier indicatif et une fourchette de prix.',
    'contact.copy': 'Copier l’e-mail',
    'contact.copied': 'Adresse copiée',
    'footer.made': 'Conçu et codé à la main. Sans framework.',
    'footer.top': 'Retour en haut ↑'
  };

  const EN_EXTRA = {
    'nav.close': 'Close',
    'theme.toDark': 'Switch to dark theme',
    'theme.toLight': 'Switch to light theme',
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
    document.querySelectorAll('.step-num').forEach((el, i) => {
      el.textContent = (lang === 'fr' ? 'Étape ' : 'Step ') + (i + 1);
    });
    const other = lang === 'fr' ? 'en' : 'fr';
    langBtn.textContent = other.toUpperCase();
    langBtn.lang = other;
    langBtn.setAttribute('aria-label', other === 'fr' ? 'Passer en français' : 'Switch to English');
    updateThemeLabel();
  }

  langBtn.addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    store.set('ms-lang', lang);
    applyLang();
  });

  /* ---------- Theme ---------- */
  const themeBtn = document.getElementById('theme-toggle');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => {
    const set = root.getAttribute('data-theme');
    return set ? set === 'dark' : darkQuery.matches;
  };
  function updateThemeLabel() {
    themeBtn.setAttribute('aria-label', t(isDark() ? 'theme.toLight' : 'theme.toDark'));
  }
  themeBtn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('ms-theme', next);
    updateThemeLabel();
  });
  darkQuery.addEventListener('change', updateThemeLabel);

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('.menu-label').textContent = t(open ? 'nav.close' : 'nav.menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* ---------- Hero letters ---------- */
  document.querySelectorAll('[data-split]').forEach((el, lineIndex) => {
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.style.setProperty('--i', i + lineIndex * 6);
      s.textContent = ch;
      el.appendChild(s);
    });
  });

  /* ---------- Header state, progress, active link ---------- */
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.progress span');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 8);
    // The last section can be too short to reach the spy band: mark it at the page end
    if (max > 0 && y >= max - 4) {
      navLinks.forEach((a, i) => i === navLinks.length - 1 ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    }
    bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
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
    sections.forEach(s => spy.observe(s));

    /* Scroll reveal */
    const groups = new Map();
    document.querySelectorAll('.reveal').forEach(el => {
      const parent = el.parentElement;
      const n = groups.get(parent) || 0;
      el.style.setProperty('--stagger', n);
      groups.set(parent, n + 1);
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
})();
