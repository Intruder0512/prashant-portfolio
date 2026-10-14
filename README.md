# PRASHANT — THE ARCHITECT

A cinematic, streaming-inspired portfolio for **Prashant Yadav**, Senior Solutions Architect.
Every career stage is a season, every project is an Original, and the architecture diagrams from the previous site are now interactive "Blueprints".

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11, Lenis. Fonts are self-hosted (no Google Fonts calls).

## Deploy on Hostinger (Node.js Web App)

1. hPanel → **Websites** → **Add / Create Website** → **Web App** (Node.js).
2. Choose **Upload your website files** and upload `prashant-portfolio-source.zip` (or connect a GitHub repo containing this folder).
3. Build settings (Hostinger usually detects them from `package.json`):
   - Framework: **Vite** (or React)
   - Build command / script: `build`
   - Output directory: `dist`
   - Entry file: *leave empty* (it's a static site)
   - Node.js: 20 or 22
4. **Deploy**. Attach the site to `prashantyadav.tech`.

**Plain hosting alternative:** if you'd rather use normal shared hosting, upload the *contents* of `prashant-portfolio-dist.zip` straight into `public_html` — no Node needed.

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the build
```

## Updating the content

**Almost everything lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**

| To change… | Edit |
| --- | --- |
| Name, intro, quote, email, LinkedIn, GitHub | `profile` |
| Jobs (newest first) | `experience` |
| A project, or a new one | `projects` — `featured: true` puts it in the big Originals row; others go to "More Productions". `blueprint: 'lms'` links it to a diagram. |
| Awards / speaking | `achievements`, `leadership` |
| In the News cards | `news` |
| Skills and their "where it's used" notes | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top 10 row | `topPicks` |
| ▶ Play Intro highlight reel | `introSlides` |
| Profile section order (Prashant / Recruiter / Engineer / Explorer) | `viewerProfiles` |

Years of experience are calculated from February 2009, so "17+" updates itself.

**Blueprints (architecture diagrams)** are the SVGs in `src/data/blueprints/`. Each clickable component carries its commentary in a `data-tip="…"` attribute. Labels, badges and legends are in `src/data/legacy.json`, which also holds the Field Guide Q&A and the two "how it works" flows.

**Interview libraries** (downloadable): `public/library/*.md`.

**Resume:** "Save as PDF" prints the on-page resume. To offer your own PDF instead, put it in `public/assets/` and set `profile.resumePdf` (e.g. `'/assets/Prashant_Yadav_Resume.pdf'`).

**Photo:** replace `portrait-cutout.png` (a background-removed PNG) and/or `ew01.jpg`, `ew02.jpg`, then run:

```bash
npm run images
```

This rebuilds the responsive WebP portraits, the event photos and the social share image in `public/assets/`.

## Keyboard shortcuts

- **Opening:** Enter or Esc skips it.
- **Play Intro:** Space pauses, ← and → change slides, Esc closes.
- **Project and resume overlays:** Esc closes.
- **Blueprints:** Tab to a component, Enter to show its commentary.

`prefers-reduced-motion` is respected throughout.
