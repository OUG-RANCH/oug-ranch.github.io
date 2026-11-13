# Phase 1: Foundation — Scaffold, Design System & Navigation - Pattern Map

**Mapped:** 2026-11-13
**Files analyzed:** 14
**Analogs found:** 0 / 14 (codebase) — 14/14 have verified *pattern sources* in project docs

## ⚠ Greenfield Note (read first)

This repository contains **zero source code** — only `.planning/` docs, `branding.md`, and two reference screenshots (confirmed by directory scan). There are no existing code files to excerpt. Therefore every "analog" below is a **pattern source**: a verified code excerpt already contained in `01-RESEARCH.md`, `01-UI-SPEC.md`, or `.planning/research/{STACK,ARCHITECTURE,PITFALLS}.md`. The planner should treat these excerpts as copy-paste starting points, exactly as if they came from an existing codebase. Phase 1 *establishes* the patterns that Phases 2–4 will inherit (CONVENTIONS.md is currently empty).

**Naming conflict the planner MUST resolve (flagged):**
- `01-RESEARCH.md` scaffold tree (lines 156–176) uses `img/` (repo root) — `img/logo.png`, `img/hero-*.jpg` — and creates `collections/` in Phase 2.
- `.planning/research/ARCHITECTURE.md` (lines 47–71) uses `images/` — `images/collections/<slug>/…` — for the multi-phase structure.
- Recommendation: adopt `images/` project-wide (aligns with ARCHITECTURE.md's data-flow convention `slug` = folder name and avoids renaming later); adjust the 01-RESEARCH excerpts' paths accordingly (`./images/logo.png`). Either choice works — pick **one** and document it in the README.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog (pattern source) | Match Quality |
|-------------------|------|-----------|--------------------------------|---------------|
| `index.html` | page (home shell) | static markup + classic scripts | `01-RESEARCH.md` Patterns 2–4 + UI-SPEC Interaction Contracts | exact (spec-verbatim) |
| `404.html` | page (self-contained fallback) | static markup (inline styles, inline script) | `01-RESEARCH.md` 404 skeleton (lines 441–474) | exact (verbatim skeleton provided) |
| `css/styles.css` | stylesheet (token layer + all styles) | transform (tokens → all surfaces) | `01-RESEARCH.md` Pattern 1 + UI-SPEC Design System/Spacing/Typography/Color | exact |
| `js/main.js` | script (vanilla, ~40 lines) | event-driven (drawer open/close) | `01-RESEARCH.md` Pattern 2 JS block (lines 231–255) | exact |
| `.nojekyll` | config (empty file) | none | `STACK.md` §Core Technologies + `PITFALLS.md` Pitfall 10 | convention |
| `README.md` | doc (owner guide, pt-BR) | none | `01-RESEARCH.md` §Owner Guide content contract (lines 479–488) + `PITFALLS.md` Pitfalls 1/3/8 | exact (section-by-section spec) |
| `fonts/yeseva-one-latin.woff2` | asset (download once) | none (fetched at build-time by agent) | `01-RESEARCH.md` Pattern 5 (URLs + byte sizes verified) | exact |
| `fonts/inter-variable-latin.woff2` | asset (download once) | none | `01-RESEARCH.md` Pattern 5 | exact |
| `img/logo.png` (or `images/logo.png`) | asset (copy) | none | `01-RESEARCH.md` §Supporting: extracted logo `C:/Users/dougl/AppData/Local/Temp/opencode/branding-image1.png`, 610×123 transparent PNG [VERIFIED] | exact |
| `img/hero-mobile.jpg` | asset (generated placeholder) | none | `01-RESEARCH.md` Pattern 3 + Pitfall 6: exactly 900×1125 (4:5), ≤200 KB JPEG q~80 | exact |
| `img/hero-desktop.jpg` | asset (generated placeholder) | none | `01-RESEARCH.md` Pattern 3 + Pitfall 6: exactly 1600×1067 (3:2), ≤200 KB | exact |
| `favicon.svg` | asset (generated) | none | `01-RESEARCH.md` Pattern 6 mark design: cream `#F4F4EF` tile, café `#2B2623` serif monogram | spec'd |
| `favicon-32.png` | asset (generated) | none | `01-RESEARCH.md` Pattern 6 | spec'd |
| `apple-touch-icon.png` | asset (generated 180×180) | none | `01-RESEARCH.md` Pattern 6 | spec'd |

## Pattern Assignments

### `css/styles.css` (stylesheet, token layer)

**Pattern source:** `01-RESEARCH.md` Pattern 1 (lines 186–200) + `01-UI-SPEC.md` Spacing/Color/Typography sections.

**Token block — copy verbatim, place at very top of file** (this block IS the owner's theme file; later phases never hardcode a hex):

```css
/* ===== TOKENS — edite aqui para mudar o visual do site todo ===== */
:root {
  --color-bg: #F4F4EF;        /* creme — fundo */
  --color-ink: #2B2623;       /* preto café — textos */
  --color-accent: #BB6F47;    /* caramelo — acentos (hover/foco apenas) */
  --rule: rgba(43,38,35,.2);
  --scrim: rgba(43,38,35,.55);
  --space-xs: 4px;  --space-sm: 8px;  --space-md: 16px;
  --space-lg: 24px; --space-xl: 32px; --space-2xl: 48px; --space-3xl: 64px;
  --touch-min: 44px; --header-h: 64px; --gutter: 16px;
}
@media (min-width: 768px) { :root { --gutter: 32px; } }
/* NÃO use verde #7A9B5F nem azul #2C4A6F no v1 (decisão D-02) */
```
[Source: 01-RESEARCH.md:186–200]

**@font-face blocks — copy verbatim** (exact Google-Fonts API-emitted declaration, verified probe; `@font-face` for Inter declares variable range `100 900`):

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;          /* variable font: one file, all weights */
  font-display: swap;
  src: url(../fonts/inter-variable-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Yeseva One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/yeseva-one-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, … /* same latin range as above */ ;
}
```
[Source: 01-RESEARCH.md:332–349 — full `unicode-range` lists are in the research file; quote them completely in the CSS]

**Global rules from UI-SPEC (apply inside this same file):**

```css
:focus-visible { outline: 2px solid #BB6F47; outline-offset: 2px; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .drawer[open] { animation: none; }
}
```
[Source: 01-UI-SPEC.md:115 §Global rules + 01-RESEARCH.md:313–316]

**Accent reservation rule (hard constraint):** accent `#BB6F47` is used ONLY for ① CTA hover/focus fill, ② link hover/focus underline, ③ `:focus-visible` ring — never body text, headings, logo, backgrounds, decorative blocks. [01-UI-SPEC.md:78]

**Typography roles (exactly 4 sizes / 2 weights):** Body 16px Inter 400 / lh 1.5; Label 14px Inter 600 uppercase ls 0.05em; Heading 28px Yeseva One 400; Display `clamp(2.75rem, 11vw, 9rem)` Yeseva One 400 / lh 0.95 (hero wordmark only). Yeseva One ships only weight 400 — never synthesize bold. [01-UI-SPEC.md:57–63]

---

### `index.html` (page — home shell)

**Pattern source:** `01-RESEARCH.md` Patterns 2–3 (lines 208–297) + `01-UI-SPEC.md` §Interaction Contracts.

**Head pattern** — relative paths, `lang="pt-BR"`, single Yeseva One preload **with mandatory `crossorigin`** (Inter NOT preloaded per D-07), explicit favicon declarations:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="./fonts/yeseva-one-latin.woff2">
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
<link rel="icon" href="./favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="./apple-touch-icon.png">   <!-- 180×180 -->
<link rel="stylesheet" href="./css/styles.css">
```
[Source: 01-RESEARCH.md:352–355 + 365–369]

**Header + drawer markup pattern** (UI-SPEC Interaction Contracts: header static in flow, NOT sticky; height 64px; bottom hairline `1px solid var(--rule)`; logo `img/logo.png` height 28px, `alt="OUG RANCH"`, links home; fallback if logo unusable = wordmark text Yeseva One 28px):

```html
<header>
  <a href="./index.html"><img src="./img/logo.png" alt="OUG RANCH"
       width="610" height="123" style="height:28px;width:auto"></a>
  <nav class="nav-desktop" aria-label="principal">
    <a href="./index.html">início</a>
    <a href="#colecoes">coleções</a>
    <a href="https://instagram.com/ougranch" target="_blank" rel="noopener">instagram</a>
  </nav>
  <button class="hamburger" aria-expanded="false" aria-controls="menu"
          aria-label="abrir menu"><span></span><span></span></button>
</header>

<dialog id="menu" class="drawer" aria-label="menu">
  <button class="drawer-close" autofocus aria-label="fechar menu">✕</button>
  <nav aria-label="menu">
    <a href="./index.html">início</a>
    <a href="#colecoes">coleções</a>
    <a href="https://instagram.com/ougranch" target="_blank" rel="noopener">instagram</a>
  </nav>
</dialog>
```
[Source: 01-RESEARCH.md:209–228]

**Hero markup pattern** (`<picture>` art direction; LCP image eager + `fetchpriority="high"`, explicit width/height, NO `loading` attribute; object-fit goes on child `<img>`):

```html
<section class="hero">
  <picture>
    <source media="(max-width: 767px)" srcset="./img/hero-mobile.jpg">
    <img src="./img/hero-desktop.jpg"
         alt="Campanha OUG RANCH — [descrição da cena]"
         width="1600" height="1067"
         fetchpriority="high">
  </picture>
  <div class="hero-scrim"></div>
  <h1 class="hero-wordmark">OUG RANCH</h1>
  <p class="hero-slogan">Do campo ao rolê, sem mudar quem você é.</p>
  <a class="cta" href="#colecoes">ver coleções <span aria-hidden="true">↓</span></a>
</section>
```
[Source: 01-RESEARCH.md:285–297]

**Hero CSS pattern** (CLS protection = container `aspect-ratio` per breakpoint, NOT `width/height` on `<source>`; `svh` fallback order matters):

```css
.hero { position: relative; min-height: 100vh; min-height: 100svh; }
.hero picture, .hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 767px) { .hero { aspect-ratio: 4 / 5; } }
@media (min-width: 768px) { .hero { aspect-ratio: 3 / 2; } }
```
[Source: 01-RESEARCH.md:300–305]

**Hero scrim (UI-SPEC locked values, guarantees ≥4.5:1 for cream text over any photo):**
```css
.hero-scrim { background: linear-gradient(to bottom, rgba(43,38,35,.55) 0%, rgba(43,38,35,.25) 45%, rgba(43,38,35,.45) 100%); }
```
[Source: 01-UI-SPEC.md:107]

**Collections placeholder section** (empty-state copy locked; no cards in Phase 1):
```html
<section id="colecoes">
  <p class="tag">coleções</p>
  <h2>chega mais — as coleções tão chegando.</h2>
  <p>Enquanto isso, cola no nosso Instagram pra ver o que já tá saindo do galpão:
     <a href="https://instagram.com/ougranch" target="_blank" rel="noopener">@ougranch</a>.</p>
</section>
```
[Source: 01-UI-SPEC.md:89–90 Copywriting Contract + 109]

**Footer pattern** (NAV-04): `--color-bg` background, top hairline `var(--rule)`, `padding: 48px 0`, mobile stacked / desktop logo left + Instagram right, logo height 24px, link copy `@ougranch ↗` (arrow `aria-hidden`), `rel="noopener"`. [01-UI-SPEC.md:94, 111]

**Nav link copy (identical set in header + drawer):** `início` · `coleções` (`#colecoes`) · `instagram` (external, `target="_blank" rel="noopener"`). [01-UI-SPEC.md:87]

**Script load pattern** (classic scripts only — PLAT-01; order matters, data files first — Phase 2+ convention established here):
```html
<script src="./js/main.js" defer></script>
```
[Source: `.planning/research/ARCHITECTURE.md` Pattern 1 (lines 122–125): "order matters: data first, then logic"; Phase 1 has no data file yet]

---

### `js/main.js` (script, event-driven — drawer only)

**Pattern source:** `01-RESEARCH.md` Pattern 2 JS block (lines 231–255). **Copy verbatim** (~40 lines — the entire JS budget of Phase 1):

```js
// js/main.js — drawer only (Phase 1)
const drawer = document.getElementById('menu');
const burger = document.querySelector('.hamburger');

function openMenu() {
  drawer.showModal();                       // free: Esc, focus trap, inert background
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open'); // scroll lock — showModal does NOT do this (Pitfall 2)
}
function closeMenu() {
  drawer.close();
  burger.setAttribute('aria-expanded', 'false');
  burger.focus();                           // explicit focus return
}
burger.addEventListener('click', openMenu);
drawer.querySelector('.drawer-close').addEventListener('click', closeMenu);

// link taps: same-page anchor must close first; cross-page links navigate anyway
drawer.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', () => closeMenu()));

// spec: auto-close if viewport grows to desktop
const mq = matchMedia('(min-width: 768px)');
mq.addEventListener('change', e => { if (e.matches) closeMenu(); });
```
[Source: 01-RESEARCH.md:231–255]

**Drawer CSS pattern** (keyframes, NOT `@starting-style` transitions — older Safari support; `100dvh` for iOS viewport):

```css
.drawer {
  position: fixed; inset: 0;
  margin: 0; border: 0; padding: 0;
  max-width: none; max-height: none; width: 100%; height: 100dvh;
  background: var(--color-bg);
  overflow-y: auto;
  transform: none;
}
.drawer[open] { animation: drawer-in 250ms ease-out; }
@keyframes drawer-in {
  from { transform: translateX(100%); display: block; }
  to   { transform: translateX(0);    display: block; }
}
.drawer::backdrop { background: transparent; }
body.menu-open { overflow: hidden; }
.drawer a { min-height: var(--touch-min); }
```
[Source: 01-RESEARCH.md:258–275]

---

### `404.html` (page — self-contained)

**Pattern source:** `01-RESEARCH.md` Code Examples 404 skeleton (lines 441–474). **The full file content is already written — copy verbatim**, with this contract: inline `<style>` (tokens duplicated locally as plain values), system-UI/Georgia fallback fonts (does NOT fetch brand fonts), text wordmark instead of `<img>`, and one tiny inline script that fixes the home link for nested missing URLs:

```html
<script>
  // fix the home link when the 404 was served for a nested missing URL
  document.getElementById('home').href =
    location.pathname.replace(/\/[^/]*$/, '/') + 'index.html';
</script>
```
[Source: 01-RESEARCH.md:468–472]

**Why self-contained (the phase's one genuine trap):** GitHub Pages serves `404.html` for *every* missing path at any depth; relative asset URLs resolve against the missing URL's directory → another 404 → unstyled page. [01-RESEARCH.md Pitfall 1, lines 400–404]

**Locked copy:** heading `essa página seguiu estrada diferente.` · body `O endereço que você abriu não existe por aqui (ou mudou de endereço).` · link `← voltar pro início` (to `index.html`). [01-UI-SPEC.md:91–93]

---

### `.nojekyll` (config — empty file)

**Pattern source:** `STACK.md` §Core Technologies + `PITFALLS.md` Pitfall 10. Empty file at repo root, created day 1. Prevents Jekyll from (a) silently dropping `_`-prefixed folders and (b) slowing deploys (~3 min → ~10 s). Belt-and-suspenders: never name any file/folder with a leading `_` anyway.

---

### `README.md` (doc — owner guide, pt-BR)

**Pattern source:** `01-RESEARCH.md` §Owner Guide content contract (lines 479–488) + `PITFALLS.md` Pitfalls 1/3/8. Six required sections, each mapped to a success criterion, tone "amigo do interior" (keywords: campo, cidade, estrada, rolê, bem-vindo, chega mais):

1. **Como o site é atualizado** — edit → GitHub Desktop commit → push → *espere 1 a 10 minutos* (Pages CDN `max-age=600`); hard refresh Ctrl+F5 / aba anônima no celular. [PITFALLS Pitfall 8]
2. **Convenção de nomes de arquivo (regra nº 1)** — minúsculas, sem acento, sem espaço, sem parêntese; hífens (`look-01-orbita.jpg`); servidor Linux diferencia maiúscula de minúscula; renomear **antes** de entrar no repositório. [PITFALLS Pitfall 1]
3. **SOP de otimização de fotos (regra nº 2)** — Squoosh: WebP, largura ≤1600 px (galeria) / ≤900 px (hero mobile), qualidade ~75–80 (hero ~85), apagar metadados → 200–400 KB por foto; originais FORA do repositório. [PITFALLS Pitfall 3]
4. **Convenção de alt text (regra nº 3)** — fotos de produto/campanha: `Campanha OUG RANCH — [cena]`; decorativas: `alt=""` (vazio de propósito). [REQUIREMENTS A11Y-01]
5. **O que nunca fazer** — nada de dados pessoais no repositório (público); nada de `_` no começo do nome; nada de caminhos começando com `/`. [PITFALLS §Security + Pitfall 4]
6. **Trocar o logo/textos** — tokens no topo de `css/styles.css`, textos no HTML, copy do 404. [UI-SPEC tokens contract]

Plus (Pitfall 7): document the deploy branch decision (`master` vs renamed `main`) and the Pages enablement clicks in the deploy section.

---

### Assets (generated/downloaded — no markup patterns, but exact specs)

| Asset | How | Spec | Source |
|-------|-----|------|--------|
| `fonts/yeseva-one-latin.woff2` | One-time download (do NOT hotlink) | 17,492 B — URL verified: `https://fonts.gstatic.com/s/yesevaone/v24/OpNJno4ck8vc-xYpwWWxli1VWw.woff2` | 01-RESEARCH.md:361 |
| `fonts/inter-variable-latin.woff2` | One-time download | 48,256 B — URL verified: `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2` | 01-RESEARCH.md:360 |
| `img/logo.png` | Copy from `C:/Users/dougl/AppData/Local/Temp/opencode/branding-image1.png` | 610×123 px transparent PNG [VERIFIED] | 01-RESEARCH.md:103 |
| `img/hero-mobile.jpg` | Generate via PowerShell + .NET `System.Drawing` (no npm) | **exactly** 900×1125 (4:5), ≤200 KB, JPEG q~80, warm earth-tone gradient (caramelo/café haze) | 01-RESEARCH.md Pitfall 6 + Open Question 2 |
| `img/hero-desktop.jpg` | Generate via System.Drawing | **exactly** 1600×1067 (3:2), ≤200 KB, same hue family as mobile crop | 01-RESEARCH.md Pitfall 6 |
| `favicon.svg` + `favicon-32.png` + `apple-touch-icon.png` (180×180) | Generate (System.Drawing / SVG→PNG) | Cream `#F4F4EF` square tile, café `#2B2623` serif monogram — do NOT shrink the 5:1 wordmark (illegible at 32 px) | 01-RESEARCH.md Pattern 6 |

---

## Shared Patterns

### 1. Relative paths only, everywhere (PLAT-01)
**Source:** `.planning/research/PITFALLS.md` Pitfall 4 + `STACK.md` §What NOT to Use
**Apply to:** `index.html`, `404.html` (self-contained exception), all future files
Absolute paths (`/css/styles.css`) break under `user.github.io/oug-ranch/` subpaths. Every href/src is `./css/styles.css`-style relative. Verification: `grep '"/' source` must return zero.

### 2. Classic `<script>` tags — never modules, never `fetch()` (PLAT-01, inherited by Phases 2–4)
**Source:** `.planning/research/ARCHITECTURE.md` Pattern 1 + Anti-Pattern 2
**Apply to:** `index.html`, `js/main.js`
ES modules/fetch/XHR are CORS-blocked on `file://` — the owner's de facto local preview is double-clicking `index.html`. Phase 1 establishes this so `window.OUG_COLLECTION[...]` data files (Phase 2) load as plain globals. Load order rule: data scripts before logic scripts.

### 3. Reduced-motion + focus-visible site-wide (A11Y)
**Source:** `01-UI-SPEC.md` §Global rules (line 115)
**Apply to:** `css/styles.css`, drawer, smooth scroll
`:focus-visible { outline: 2px solid #BB6F47; outline-offset: 2px }` and `@media (prefers-reduced-motion: reduce)` overrides for `scroll-behavior` and drawer animation.

### 4. Accent color reservation (D-02)
**Source:** `01-UI-SPEC.md` line 78
**Apply to:** all Phase 1 surfaces + every later phase
`#BB6F47` only on CTA hover/focus fill, link hover/focus underline, focus ring. Never on body text, headings, logo, backgrounds. Verde `#7A9B5F` / azul `#2C4A6F` are NOT defined as active tokens in v1.

### 5. Image attribute discipline (PERF/CLS)
**Source:** `.planning/research/PITFALLS.md` Pitfall 9 + `01-RESEARCH.md` Pattern 3
**Apply to:** hero (and all Phase 2/3 markup)
Every `<img>` gets explicit `width`/`height`; hero eager + `fetchpriority="high"` (no `loading` attr); below-fold photos (later phases) `loading="lazy" decoding="async"`. CLS via container `aspect-ratio`, not `<source>` dimensions.

### 6. External links carry `rel="noopener"` (ASVS V5, tabnabbing)
**Source:** `01-UI-SPEC.md` copy contract + `01-RESEARCH.md` §Security Domain
**Apply to:** header, drawer, footer, placeholder section — every `target="_blank"` Instagram link.

### 7. Folder-structure convention the phase establishes
**Source:** `01-RESEARCH.md` scaffold tree (lines 156–176) vs `.planning/research/ARCHITECTURE.md` tree (lines 47–71)
**Apply to:** scaffold. Flat root, 3 top-level folders (css/, js/, images-or-img/), lowercase-hyphen slugs only, no leading `_`. `collections/` folders are NOT scaffolded now (empty dirs don't survive git; Phase 2 creates them). **Resolve the `img/` vs `images/` conflict flagged at the top of this file before writing the plan.**

## No Analog Found

All 14 files are greenfield — no codebase analog exists. Coverage is 100% via documented pattern sources instead:

| File | Reason no code analog | Pattern source instead |
|------|----------------------|------------------------|
| all 14 files above | Repo contains zero source code (only `branding.md`, screenshots, `.planning/` docs) | `01-RESEARCH.md` Patterns 1–6 + 404 skeleton + §Owner Guide; `01-UI-SPEC.md` full interaction/copy/color/spacing contracts; `.planning/research/{STACK,ARCHITECTURE,PITFALLS}.md` |

## Metadata

**Analog search scope:** repo root (glob `*`, confirmed: `AGENTS.md`, `branding.md`, 2 screenshots — no source code), `.planning/**/*.md`
**Files scanned:** 8 planning/branding docs (01-CONTEXT, 01-RESEARCH, 01-UI-SPEC, STACK, ARCHITECTURE, PITFALLS + context scan of STATE/ROADMAP/REQUIREMENTS references)
**Pattern extraction date:** 2026-11-13
**Excerpt provenance:** every code excerpt above is quoted verbatim from verified project docs (MDN-verified patterns and Google-Fonts-API-probed font contract per 01-RESEARCH.md Sources §Primary; UI-SPEC approved by checker 2026-11-13). No code was invented.
