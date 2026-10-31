# Mahmoud Saadaoui — Portfolio

Personal portfolio for Mahmoud Saadaoui, independent freelance web designer and front-end developer based in Brazzaville, Congo. Plain HTML, CSS and vanilla JavaScript: no frameworks, no dependencies, no build step.

- **Bilingual**: English is written in `index.html`; French lives in `js/main.js` (`FR` object). The FR/EN button remembers the visitor's choice, and French browsers get French by default.
- **Greeting**: the hero says Mbote (Lingala), Bonjour and Hello once on load, then settles on the page language; visitors can switch it with the buttons below.
- **Live clock**: shows the current time in Brazzaville.
- **Contact chooser**: WhatsApp Business or Gmail, plus a mail-app picker (Gmail, Outlook, Yahoo Mail, Apple Mail, default app). On Android it opens the app or the Play Store; on iPhone it opens the app and shows an App Store link if nothing opened; on computers it opens the web version. Settings are in `MAIL_APPS` and `CONTACT` in `js/main.js`.
- **Accessible**: skip link, visible focus, keyboard-operable mobile menu (Escape closes it), reduced-motion support, AA text contrast.

## Structure

```
index.html            The whole page
css/style.css         All styles; colors, fonts and spacing are variables at the top
js/main.js            Language, greeting, Brazzaville clock, menu, scroll effects, copy-email button
assets/img/           Portrait (mahmoud.jpg)
assets/work/          Project screenshots (960px and 1440px JPEG)
assets/icons/         Favicon
scripts/serve.mjs     Local preview server
```

## Editing content

Everything you need to change is marked with an `EDIT:` comment in `index.html`.

| What | Where |
| --- | --- |
| Email address | `index.html` → Contact section (the link **and** the `data-email` on the copy button) — currently mahmoudsaadaoui029@gmail.com |
| About text | `index.html` → About section, plus the French version in `js/main.js` (`about.text`, `about.p1`, `about.p2`) |
| Portrait | Replace `assets/img/mahmoud.jpg` (portrait format, dark background works best) |
| Site address | `index.html` → `<link rel="canonical">` |
| A new project | Copy one `<article class="project">` block in the Work section, add its screenshots to `assets/work/` (name-960.jpg and name-1440.jpg), and add its French `name.kind` text in `js/main.js`. Add `<span class="project-tag">` for labels like "In progress". |

Any text with a `data-i18n="key"` attribute has its French version under the same key in `js/main.js`.

## Running locally

```bash
node scripts/serve.mjs 8790
```

Then open http://localhost:8790.

## Deploying

Upload the folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, cPanel). `scripts/` and `README.md` are not needed online.
