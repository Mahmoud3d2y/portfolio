# Mahmoud Saadaoui — Portfolio

Personal portfolio for Mahmoud Saadaoui, web designer and front-end developer. Plain HTML, CSS and vanilla JavaScript: no frameworks, no dependencies, no build step.

- **Bilingual**: English is written in `index.html`; French lives in `js/main.js` (`FR` object). The FR/EN button remembers the visitor's choice, and French browsers get French by default.
- **Light and dark themes**: follows the system setting, with a toggle in the header.
- **Accessible**: skip link, visible focus, keyboard-operable mobile menu (Escape closes it), reduced-motion support, AA contrast in both themes.

## Structure

```
index.html            The whole page
css/style.css         All styles; colors, fonts and spacing are variables at the top
js/main.js            Language, theme, menu, scroll effects, copy-email button
assets/work/          Project screenshots (960px and 1440px JPEG)
assets/icons/         Favicon
scripts/serve.mjs     Local preview server
```

## Editing content

Everything you need to change is marked with an `EDIT:` comment in `index.html`.

| What | Where |
| --- | --- |
| Email address | `index.html` → Contact section (the link **and** the `data-email` on the copy button) — currently mahmoudsaadaoui029@gmail.com |
| About text | `index.html` → About section, plus the French version in `js/main.js` (`about.p1`, `about.p2`) |
| Availability status | `index.html` → hero (`hero.status`) |
| Site address | `index.html` → `<link rel="canonical">` |
| A new project | Copy one `<article class="case">` block, add its screenshots to `assets/work/`, and add French text keys in `js/main.js` |

Any text with a `data-i18n="key"` attribute has its French version under the same key in `js/main.js`.

## Running locally

```bash
node scripts/serve.mjs 8790
```

Then open http://localhost:8790.

## Deploying

Upload the folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, cPanel). `scripts/` and `README.md` are not needed online.
