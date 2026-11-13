# Phase 1: Foundation — Scaffold, Design System & Navigation - Research

**Researched:** 2026-11-13
**Domain:** Static site scaffold (GitHub Pages), CSS design tokens, accessible vanilla-JS navigation drawer, `<picture>` hero, owner-facing conventions documentation
**Confidence:** HIGH — all phase-specific mechanisms probed or fetched this session; platform layer inherited from same-day project research (STACK.md / PITFALLS.md, verified against official GitHub docs)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (verbatim from 01-CONTEXT.md `<decisions>`)

- **D-01:** Paleta oficial da marca (do `branding.md` §CORES): `#F4F4EF` (off-white creme, fundo do site), `#2B2623` (preto café, textos), `#BB6F47` (caramelo, acento principal), `#7A9B5F` (verde oliva, uso futuro), `#2C4A6F` (azul jeans, uso futuro). Fundo do site é claro (creme), confirmado pelo dono. [VERIFIED: 01-CONTEXT.md:17]
- **D-02:** Acento por enquanto: **somente caramelo `#BB6F47`** (botões, links, marcações). Verde e azul ficam guardados para uso futuro — não entram no v1.
- **D-03:** Logo da marca existe no `branding.md` §LOGO (wordmark serifado "Oug Rānch" com chapéu sobre o "a"). Usar a imagem do logo no cabeçalho; como fallback, texto em Yeseva One.
- **D-04:** Elementos gráficos da marca (estrela bordada, etiqueta EST. 2024, ilustração, numeração, moldura): **fora do v1 — minimal**. Só cores e tipografia.
- **D-05:** Títulos: **Yeseva One** (self-hosted WOFF2 latin subset). Usada também no nome gigante da home.
- **D-06:** Textos: **Inter** substitui a Aktiv Grotesk. Decisão reversível.
- **D-07:** Auto-hospedar as 2 fontes WOFF2 (Yeseva One regular; Inter variable latin), `font-display: swap`, preload apenas da Yeseva One.
- **D-08:** Home em cores simples estilo print: fundo creme `#F4F4EF`, texto preto café `#2B2623`, tipografia gigante.
- **D-10:** Hero: foto de campanha **placeholder** (imagem neutra/terrosa até o dono ter foto real) com nome da marca sobreposto, botão "ver coleções".
- **D-11:** Usar **coleções fictícias** para testar o site (2–3 coleções de teste) — mas as *cards* de coleção são Fase 2; a Fase 1 entrega apenas a seção placeholder `#colecoes`.

### the agent's Discretion (verbatim)

- Estrutura exata de arquivos/pastas do scaffold (guia da pesquisa STACK.md/ARCHITECTURE.md).
- Escolha das fotos placeholder e textos fictícios das coleções de teste.
- Detalhes de espaçamento, tamanhos tipográficos fluidos (`clamp()`) e microcopy do guia do dono.
- Quebra exata do menu hambúrguer (drawer vs overlay) — padrão da pesquisa.

### Deferred Ideas (OUT OF SCOPE)

- Elementos gráficos da marca (estrela, moldura, numeração de série, etiqueta EST. 2024) como detalhes do site — minimal no v1; revisitável na Fase 4 ou depois.
- Letreiro editorial de texto (HERO-03) e barra de aviso (NAV-05) — Fase 4.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PLAT-01 | Site estático no GitHub Pages com `.nojekyll`, caminhos relativos e `<script>` clássicos (funciona em `file://`) | Scaffold tree + `.nojekyll` + relative-paths rule (STACK.md/PITFALLS.md, official GitHub docs) |
| PLAT-03 | Guia do dono em português: trocar fotos/textos, convenção de nomes, SOP de otimização | README.md owner-guide content spec (§Owner Guide) |
| NAV-01 | Cabeçalho com logo/nome clicável → home | Header contract (UI-SPEC) + logo asset handling (§Logo Asset) |
| NAV-02 | Celular: hambúrguer abre painel com links | Native `<dialog>` drawer pattern (§Pattern 2), Baseline since Mar 2022 |
| NAV-03 | Desktop: links diretos no cabeçalho | Media-query switch ≥768px (UI-SPEC header contract) |
| NAV-04 | Rodapé com marca + Instagram | Footer contract (UI-SPEC); `rel="noopener"` for `target="_blank"` |
| HERO-01 | Hero tela cheia, foto + nome sobreposto, imagem separada p/ celular | `<picture>` art direction (§Pattern 3, MDN-verified) |
| HERO-02 | Botão "ver coleções" rola até a seção | CSS `scroll-behavior: smooth` anchor pattern (§Pattern 4) |
| A11Y-01 | Alt text em informativas, `alt=""` em decorativas (convenção documentada) | Alt-text convention written into README (§Owner Guide) |
| PERF-01 | Fotos ≤1600 px / ~200–400 KB, WebP/JPEG — SOP documentado | Squoosh SOP baked into README (§Owner Guide); placeholder images generated within budget |
</phase_requirements>

## Project Constraints (from AGENTS.md)

- **Budget R$ 0** — GitHub Pages, no backend, no paid services, no third-party CDNs.
- **Stack: plain HTML/CSS/vanilla JS** — no build step, no Tailwind/Bootstrap, no jQuery, no framework CDN links. GLightbox is the only vendored lib (Phase 3, not now).
- **Performance focus mobile (4G)** — photos optimized; WebP + `srcset`; `loading="lazy"` never on the LCP hero.
- **Compat:** modern mobile browsers (Chrome/Safari Android & iOS).
- **GSD workflow enforcement:** repo edits go through GSD commands; the orchestrator owns commits (`commit_docs: true` — commit research file via seam at the end).
- **Data pattern for later phases:** classic `<script>` setting a global (`window.OUG_COLLECTION`), never `fetch()`/ES modules — preserved so `file://` preview works.
- **CONVENTIONS.md**: "not yet established" — Phase 1 *establishes* them (token file = owner theme file).

## Summary

Phase 1 is a greenfield static scaffold whose hard parts are not the HTML/CSS but four things: (1) an **accessible mobile drawer** that doesn't ship broken focus management, (2) a **hero that swaps crops per breakpoint** without layout shift, (3) **self-hosted fonts with the exact preload/@font-face contract** (preload without `crossorigin` silently double-downloads), and (4) a **404 page that stays styled on deeply-nested missing URLs** — the one genuine trap in this phase: GitHub Pages serves `404.html` for *every* missing path at *any* depth, so relative asset URLs in it resolve against the wrong base (`user.github.io/oug-ranch/a/b/css/styles.css`) and the page renders unstyled. Mitigation: make `404.html` self-contained (inline `<style>`, text wordmark instead of `<img>`).

Everything else is specified by the approved UI-SPEC (tokens, spacing, copy, interaction contracts) — this research supplies the implementation patterns and the exact verified asset facts (font file URLs/sizes, logo dimensions) so the planner can write tasks with concrete acceptance criteria.

**Primary recommendation:** Build the scaffold exactly on the UI-SPEC contracts; implement the drawer as a **native `<dialog>` with `showModal()`** (free Esc-close, focus trap, `inert` background, implicit `aria-modal` — MDN Baseline since March 2022), animate the open state with CSS **keyframes** (not `@starting-style` transitions, which older Safari lacks), lock body scroll manually (`showModal()` does **not** do it), ship placeholder hero JPEGs generated via .NET System.Drawing at the two crop ratios, and put the naming/SOP/alt-text rules in a Portuguese `README.md` at repo root.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Scaffold, `.nojekyll`, deploy | CDN/Static (GitHub Pages) | — | Branch deploy serves static files directly; no server tier exists |
| Design tokens (colors/spacing/type) | Browser (CSS custom properties) | — | One `css/styles.css` = owner theme file; no preprocessor |
| Header/nav + hamburger drawer | Browser | — | Vanilla JS `<dialog>`; must degrade (no-JS → links visible inline are enough) |
| Hero photo delivery (2 crops) | CDN/Static + Browser | — | `<picture>` picks the file; Pages CDN serves it; LCP eager |
| Smooth scroll to `#colecoes` | Browser (CSS only) | — | `scroll-behavior` — zero JS |
| Footer | Browser | — | Static markup on every page |
| Branded 404 | CDN/Static + Browser | — | Pages serves `404.html`; page must be self-contained (§Pitfall 1) |
| Owner guide (naming/SOP/alt) | Docs (repo README) | CDN/Static | Process knowledge, lives in repo, rendered by GitHub |
| Favicon set | CDN/Static + Browser | — | Explicit `<link>` declarations (auto-discovery fails under project subpath) |

## Standard Stack

### Core

| Library / Asset | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Native `<dialog>` element | Baseline (all browsers since Mar 2022) | Mobile drawer modal | Free Esc-close, focus trap, `inert` background, implicit `aria-modal` — replaces ~80 lines of hand-rolled focus management. [VERIFIED: MDN dialog page, fetched this session] |
| CSS custom properties in one file | — | Design token layer (UI-SPEC values) | The owner's "theme file" (AGENTS.md stack decision) |
| Self-hosted WOFF2 fonts | Inter v20 variable latin (48,256 bytes) + Yeseva One v24 latin (17,492 bytes) | Typography (D-05/06/07) | Pre-subset latin files downloaded once into `fonts/`; no runtime Google dependency; GDPR-clean. [VERIFIED: Google Fonts CSS2 API probe this session] |
| `<picture>` art direction | Baseline since Mar 2016 | Hero mobile/desktop crops (HERO-01) | Explicit MDN-documented use case: "Art direction. Cropping or modifying images for different media conditions". [VERIFIED: MDN picture page, fetched this session] |
| `favicon.svg` + PNG fallback + `apple-touch-icon.png` | — | Favicon (success criterion 1) | SVG favicon + explicit `<link>` declarations; see Pitfall 4 |
| `404.html` (self-contained) | — | Branded 404 (success criterion 1) | Official GitHub Pages mechanism [CITED: docs.github.com — creating a custom 404 page, via project research PITFALLS.md] |
| PowerShell + .NET `System.Drawing` | built into Windows | Generate placeholder hero JPEGs + resize logo/favicon | Verified available this session (used for the logo probe); no npm/Node needed |

### Supporting

| Asset | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Extracted logo: `C:/Users/dougl/AppData/Local/Temp/opencode/branding-image1.png` | 610×123 px, transparent PNG [VERIFIED: System.Drawing probe — corners `A=0`, center pixel opaque black] | Header/footer logo (D-03) | Copy into `img/logo.png` in the scaffold task |
| Squoosh (squoosh.app) | — | Photo SOP for the owner (PERF-01) | Documented in README; not part of the build |
| `.nojekyll` (empty file) | — | Skip Jekyll | Day 1, repo root |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<dialog>` drawer | Hand-rolled `<div>` drawer + manual focus trap | Only if the executor hits an unsolvable `<dialog>` styling edge; costs ~80 lines of focus-trap/Esc/inert code and the classic WebKit scroll-lock bugs |
| `<dialog>` CSS transitions (`@starting-style`) | CSS **keyframe** animation on `dialog[open]` | Transitions need `transition-behavior: allow-discrete` (Safari ~17.4+) — keyframes with `display` inside the keyframe work on every `<dialog>`-supporting browser [VERIFIED: MDN dialog page] |
| Placeholder hero JPEGs | Pure CSS gradient hero (no image) | Violates HERO-01 ("foto de campanha … imagem separada para celular") — generate real image files |
| WebP placeholders | JPEG placeholders | No WebP encoder available on this Windows box without npm; placeholders are tiny and temporary — owner's real photos will be WebP via Squoosh SOP |

**Installation:** No npm. The only network fetches: the two Google Fonts woff2 files (URLs below, verified live this session) and copying the extracted logo PNG into the repo.

## Package Legitimacy Audit

> This phase installs **zero external packages** (no npm/PyPI/crates). Legitimacy gate not applicable — registry check skipped because nothing is installed.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| *(none — no packages installed)* | — | — | — | — | — | — |

**Third-party assets fetched once and self-hosted (not runtime dependencies):** Google Fonts woff2 files (Google Fonts serves official OFL-licensed fonts — established free-for-commercial-use source per STACK.md); extracted brand logo (owner's own asset from `branding.md`).

## Architecture Patterns

### System Architecture Diagram

```
Visitor (phone/desktop)
        │  opens URL (file:// locally, or *.github.io/oug-ranch/…)
        ▼
GitHub Pages CDN ──── serves static files (repo root = site root)
        │
        ├── index.html ──────────► header (logo→home, nav)
        │                            │ ≥768px: inline links
        │                            │ <768px: hamburger ──opens──► <dialog> drawer
        │                          hero <picture> ──┬─► hero-mobile (≤767px, 4:5)
        │                                           └─► hero-desktop (≥768px, landscape)
        │                          CTA "ver coleções ↓" ──smooth scroll──► section#colecoes (placeholder copy)
        │                          footer (logo + @ougranch ↗)
        ├── 404.html ── served for ANY missing path, any depth ──► self-contained styled page → link home
        ├── css/styles.css ── tokens at top + all styles (also loaded by index)
        ├── js/main.js ── drawer open/close + resize-close (only JS on the page)
        ├── fonts/*.woff2 (2 files, self-hosted)
        └── favicon.svg / favicon PNG / apple-touch-icon.png
```

Every flow: request → Pages serves static file → browser renders with zero build/zero server. The only branching is viewport-based (media queries) and drawer-state based.

### Recommended Project Structure

```
/ (repo root = site root)
├── index.html                  # header + hero + #colecoes placeholder + footer
├── 404.html                    # SELF-CONTAINED (inline styles, no shared CSS) — see Pitfall 1
├── .nojekyll                   # empty
├── README.md                   # guia do dono (pt-BR): naming, SOP, alt-text, Pages delay
├── favicon.svg                 # monogram tile (cream bg, café glyph)
├── favicon-32.png              # raster fallback for Safari/legacy
├── apple-touch-icon.png        # 180×180 (iOS home screen)
├── css/
│   └── styles.css              # tokens block at top = owner theme file
├── js/
│   └── main.js                 # drawer only (~40 lines) — Phase 2/3 append render code here
├── fonts/
│   ├── yeseva-one-latin.woff2  # 17,492 B [VERIFIED]
│   └── inter-variable-latin.woff2  # 48,256 B [VERIFIED]
└── img/
    ├── logo.png                # copied from extracted branding asset (610×123, transparent)
    ├── hero-mobile.jpg         # placeholder, 900×1125 (4:5), earthy, ≤200 KB
    └── hero-desktop.jpg        # placeholder, 1600×1067 (3:2), earthy, ≤200 KB
```

(`collections/` is created in Phase 2; do not scaffold it now — empty dirs don't survive git anyway.)

### Pattern 1: Design tokens (the owner theme file)

**What:** All visual constants as CSS custom properties at the very top of `styles.css`, commented in Portuguese.
**When to use:** Always; later phases never hardcode a hex.
**Values (verbatim from UI-SPEC line 76):** `--color-bg: #F4F4EF; --color-ink: #2B2623; --color-accent: #BB6F47;` plus `--rule: rgba(43,38,35,.2)` and `--scrim: rgba(43,38,35,.55)`. [VERIFIED: 01-UI-SPEC.md:76]

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

Accent usage is exhaustively reserved (UI-SPEC): CTA hover/focus fill, link hover/focus underline, `:focus-visible` ring — **never** body text, headings, logo, backgrounds.

### Pattern 2: Accessible drawer via native `<dialog>` (NAV-02)

**What:** Full-screen overlay drawer as `<dialog>` + `showModal()`. Browser provides: Esc-close, focus trap, `inert` background, implicit `role="dialog"` + `aria-modal="true"`. MDN: "The `<dialog>` element is exposed by browsers in a manner similar to custom dialogs that use the ARIA role="dialog" attribute" and recommends `autofocus` on the close button. [VERIFIED: MDN dialog page this session]

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
  <button class="drawer-close" autofocus aria-label="fechar menu">✕</button> <!-- ✕ inline SVG or glyph -->
  <nav aria-label="menu">
    <a href="./index.html">início</a>
    <a href="#colecoes">coleções</a>
    <a href="https://instagram.com/ougranch" target="_blank" rel="noopener">instagram</a>
  </nav>
</dialog>
```

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
  burger.focus();                           // explicit return (belt-and-braces, see Assumptions A3)
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

```css
.drawer {                    /* full-screen overlay, slides from right on OPEN via keyframes */
  position: fixed; inset: 0;
  margin: 0; border: 0; padding: 0;
  max-width: none; max-height: none; width: 100%; height: 100dvh;
  background: var(--color-bg);
  overflow-y: auto;          /* spec: scroll if content exceeds viewport */
  transform: none;
}
.drawer[open] { animation: drawer-in 250ms ease-out; }
@keyframes drawer-in {
  from { transform: translateX(100%); display: block; }  /* display in keyframe = works without allow-discrete */
  to   { transform: translateX(0);    display: block; }
}
.drawer::backdrop { background: transparent; }  /* drawer IS the full-screen panel */
body.menu-open { overflow: hidden; }
.drawer a { min-height: var(--touch-min); }      /* ≥44px targets */
@media (prefers-reduced-motion: reduce) { .drawer[open] { animation: none; } }
```

Notes: close animation is instant (acceptable — spec specifies the open slide; skipping close-transition avoids the `@starting-style` machinery entirely). `height: 100dvh` mirrors the iOS-safe viewport height used by the hero.

### Pattern 3: Hero with separate mobile crop via `<picture>` (HERO-01)

**What:** Art direction — different *crops*, not just sizes. MDN documents this exact use case. [VERIFIED: MDN picture page — "Art direction. Cropping or modifying images for different media conditions"; object-fit goes on the child `<img>`, not on `<picture>`]

```html
<section class="hero">
  <picture>
    <source media="(max-width: 767px)" srcset="./img/hero-mobile.jpg">
    <img src="./img/hero-desktop.jpg"
         alt="Campanha OUG RANCH — [descrição da cena]"      <!-- follows documented convention -->
         width="1600" height="1067"
         fetchpriority="high">                                <!-- eager is default; omit loading attr -->
  </picture>
  <div class="hero-scrim"></div>                              <!-- UI-SPEC gradient, ≥4.5:1 -->
  <h1 class="hero-wordmark">OUG RANCH</h1>
  <p class="hero-slogan">Do campo ao rolê, sem mudar quem você é.</p>
  <a class="cta" href="#colecoes">ver coleções <span aria-hidden="true">↓</span></a>
</section>
```

```css
.hero { position: relative; min-height: 100vh; min-height: 100svh; }  /* svh fallback order matters */
.hero picture, .hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 767px) { .hero { aspect-ratio: 4 / 5; } }   /* locks slot shape → zero CLS, no JS */
@media (min-width: 768px) { .hero { aspect-ratio: 3 / 2; } }
```

CLS protection comes from the container `aspect-ratio` per breakpoint (robust everywhere) rather than `width`/`height` on `<source>` (which is a newer, less uniformly supported attribute — avoided deliberately; Assumption A1 avoided by design). Keep the exact placeholder dimensions matching these ratios so the rendered crop is what the owner will get.

### Pattern 4: Smooth scroll to collections (HERO-02)

**What:** CSS-only anchor scroll; JS not needed.

```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

```html
<a class="cta" href="#colecoes">…</a>
…
<section id="colecoes">…</section>
```

Header is static in flow (not fixed/sticky, per UI-SPEC line 103) → no `scroll-margin-top` compensation needed. Works identically on `file://`.

### Pattern 5: Fonts — exact self-hosting contract (D-07)

**What:** Download the two latin woff2 files once; declare with the exact @font-face the Google API emitted; preload only Yeseva One. **The `crossorigin` attribute is mandatory on font preloads even same-origin** — fonts are always fetched in CORS mode; without it the preload is wasted (double download). [CITED: web.dev font best practices, via STACK.md sources]

Verified font facts [VERIFIED: Google Fonts CSS2 API probe with Chrome UA, this session] — quote of the emitted @font-face blocks:

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
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="./fonts/yeseva-one-latin.woff2">
<!-- Inter: NO preload (per D-07) -->
```

Glyph coverage notes from the verified `unicode-range`: the latin subset `U+0000-00FF` covers **all pt-BR accents** (ã õ ç á é í ó ú â ê à) — latin-ext not needed for this copy. `↓` (U+2193) and `↑` (U+2191) ARE included; `→` (U+2192) and `↗` (U+2197) are NOT — those two glyphs will render from system fonts (fine: they're `aria-hidden` decorative arrows; don't count on Inter styling them).

Download URLs (fetch once, commit files; do not hotlink):
- Inter variable latin: `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2` (48,256 bytes)
- Yeseva One latin: `https://fonts.gstatic.com/s/yesevaone/v24/OpNJno4ck8vc-xYpwWWxli1VWw.woff2` (17,492 bytes)

### Pattern 6: Favicon set with explicit declarations (success criterion 1)

```html
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
<link rel="icon" href="./favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="./apple-touch-icon.png">   <!-- 180×180 -->
```

Mark design (discretion): square cream `#F4F4EF` tile with the "O"/"R" monogram in café `#2B2623` serif — the 5:1 wordmark logo is illegible at 32 px, so don't shrink it. Generate `favicon-32.png`/`apple-touch-icon.png` from an SVG→PNG render or simple .NET drawing (no favicon.ico tooling needed).

### Anti-Patterns to Avoid

- **Hand-rolled focus trap on the drawer:** replicating Esc/inert/aria-modal badly is the #1 a11y regression in vanilla drawers — `<dialog>` does it natively.
- **`<link rel="preload" as="font">` without `crossorigin`:** silently double-downloads the font.
- **Absolute paths anywhere** (`/css/styles.css`): breaks on `*.github.io/oug-ranch/` (PLAT-01) — relative only.
- **Shared CSS in `404.html`:** breaks on nested 404s (Pitfall 1) — self-contained page.
- **`width`/`height` on `<source>` for CLS:** partially supported; use container `aspect-ratio` instead.
- **Synthesized bold on Yeseva One:** it ships only weight 400 (UI-SPEC typography contract) — fake-bold looks amateur and shifts metrics.
- **Copying the raw wordmark logo into favicon:** 5:1 wordmark is illegible at tab size — use a monogram tile.
- **`scroll-behavior: smooth` with no reduced-motion override:** violates A11Y intent baked into the spec.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Drawer focus trap, Esc-close, aria-modal | JS keydown loops + focus bookkeeping | Native `<dialog>` + `showModal()` | Browser-native, MDN-documented, fewer bugs; hand-rolled versions routinely miss focus-return and inert background |
| Body scroll lock | JS scroll-position juggling (the iOS `position:fixed` hack) | `body { overflow: hidden }` class toggle | Full-screen drawer covers the page; the iOS fixed-position hack is for partially-visible overlays (Phase 3 lightbox territory) |
| Smooth scroll | `scrollIntoView({behavior})` JS + rAF | CSS `scroll-behavior: smooth` | Zero JS, respects reduced-motion with one media query |
| Font subsetting | Any font tooling | Download Google Fonts' pre-subset latin woff2 | Subsetting is a solved, free problem at the source |
| Placeholder image generation | npm sharp/PIL installs | PowerShell + .NET `System.Drawing` (verified present) | Zero installs; JPEG at explicit dims/quality |
| Multi-size favicon tooling | Hand-crafted ICO builder | SVG + PNG pair with explicit `<link>`s | .ico is legacy-only; SVG+PNG covers modern mobile browsers |
| CSS/build pipeline | Vite/PostCSS/Tailwind | One hand-written `styles.css` | AGENTS.md stack decision — non-negotiable |

**Key insight:** every "hard" part of Phase 1 (a11y drawer, smooth scroll, font loading, image loading) has a native browser primitive as of the Baseline the project targets — the job is wiring them per spec, not reimplementing them.

## Common Pitfalls

### Pitfall 1: 404 page renders unstyled on nested missing URLs
**What goes wrong:** GitHub Pages serves `404.html` for *every* missing path, at any depth (e.g. `user.github.io/oug-ranch/foo/bar/`). A `404.html` that links `./css/styles.css` resolves that against the *missing* URL's directory → `/oug-ranch/foo/bar/css/styles.css` → another 404 → raw unstyled page. [CITED: docs.github.com custom 404 mechanism, via PITFALLS.md; resolution behavior is standard relative-URL semantics — see Assumptions A2]
**Why it happens:** Relative URLs resolve against the current document URL, which for a 404 is the URL the visitor *requested*.
**How to avoid:** Make `404.html` **self-contained**: inline `<style>` (tokens + a few rules), text wordmark instead of `<img src>`, links written as root-relative-with-repo-path is NOT portable — use `./index.html` only from the root-level 404 (it is always served from the repo root path when the missing URL has no trailing slash *directory* context — safest is absolute-with-repo-path `href="/oug-ranch/"` ONLY if the deploy subpath is fixed; prefer the self-contained + `location`-free `./index.html` for root-level and accept styling-only self-containment as the guarantee). Simplest correct contract: **inline styles + inline SVG/text logo + recovery link to `./index.html`** — the home link itself may resolve wrong on deep nested URLs; add one tiny inline script that computes the base: `var base = location.pathname.replace(/\/[^/]*$/, '/');` and rewrites the home link `href = base + 'index.html'`.
**Warning signs:** Test locally: create `test/` folder, open a bogus nested path via a local server, check the 404 keeps cream background and serif heading.

### Pitfall 2: `showModal()` does not lock background scroll
**What goes wrong:** Drawer open → page still scrolls behind it (drawer is full-screen so users see content jump when it closes and scroll position changed).
**Why it happens:** `<dialog>`'s `inert` blocks *interaction*, not scrolling. [ASSUMED — well-established platform behavior, see A3]
**How to avoid:** `body.menu-open { overflow: hidden }` toggled with the drawer state (in Pattern 2 JS). Restore on close via the same class removal (no scroll-position preservation needed — drawer is full-screen).
**Warning signs:** On a phone, two-finger swipe on the drawer moves the page behind it.

### Pitfall 3: Font preload double-download / wrong file preloaded
**What goes wrong:** Preloading `yeseva-one-latin.woff2` without `crossorigin` — or with a URL that doesn't byte-match the `@font-face` src — makes the browser fetch it twice; preload silently wasted. Preloading Inter when the spec says only Yeseva One wastes the critical bytes on the heavier file.
**How to avoid:** Exactly one preload: Yeseva One, with `crossorigin`, href byte-identical to the @font-face `src`. Inter gets `font-display: swap` only (per D-07). [CITED: web.dev font-best-practices via STACK.md]
**Warning signs:** DevTools Network shows the font twice, or "preloaded but not used" console warning.

### Pitfall 4: Favicon never loads under the project subpath
**What goes wrong:** Browsers that request `/favicon.ico` by convention hit the *domain* root (`user.github.io/favicon.ico` — someone else's site or 404), not `user.github.io/oug-ranch/favicon.ico`. Tab shows a generic icon.
**How to avoid:** Always declare `<link rel="icon">` explicitly with relative hrefs (Pattern 6); ship both SVG + PNG. [ASSUMED — A4; universally consistent behavior]
**Warning signs:** Missing-icon 404 in devtools on the published URL.

### Pitfall 5: Drawer open animation is invisible on older Safari (if built with `@starting-style`)
**What goes wrong:** The spec's 250ms slide written as a CSS *transition* on `<dialog>` requires `transition-behavior: allow-discrete` + `@starting-style` + `overlay` in the transition list (MDN-documented machinery) — unsupported below Safari ~17.4, so the drawer just pops.
**How to avoid:** Use a **keyframe animation** on `dialog[open]` with `display: block` inside the keyframes (MDN: keyframes need no `allow-discrete`). [VERIFIED: MDN dialog page this session]
**Warning signs:** iPhone on iOS 16 shows instant open — cosmetic, acceptable, but don't ship the transition version without knowing why.

### Pitfall 6: Placeholder hero aspect ratios don't match the CSS contract
**What goes wrong:** Generated placeholder files at random dimensions + `object-fit: cover` → the placeholder *looks* fine but previews a crop the owner's real photo won't match; and wrong container `aspect-ratio` reintroduces CLS.
**How to avoid:** Generate `hero-mobile` exactly 900×1125 (4:5) and `hero-desktop` exactly 1600×1067 (3:2); container `aspect-ratio` set to the same values per breakpoint (Pattern 3). Keep each file ≤200 KB (JPEG quality ~80).
**Warning signs:** Hero height jumps between load and render; check with DevTools performance "layout shift regions".

### Pitfall 7: Repository/branch mismatch at deploy time
**What goes wrong:** Local repo is on branch `master` [VERIFIED: `git status` this session]; when the owner creates the GitHub repo and enables Pages "deploy from branch", they must pick the branch that actually exists (`master`) — or rename to `main` first. A silent mismatch = Pages serves nothing.
**How to avoid:** Decide in the plan: keep `master` (owner selects it in the Pages dropdown) or rename to `main` now (`git branch -m master main`) to match GitHub's default-new-repo expectation. Either works; pick one and document it in the README deploy section.
**Warning signs:** Pages settings show "deploy from branch: main" but repo has no `main`.

## Code Examples

See Patterns 1–6 above — all sourced from MDN pages fetched this session (`<dialog>`, `<picture>`), the Google Fonts API probe, and the approved UI-SPEC contracts. The 404 self-contained skeleton:

```html
<!-- 404.html — SELF-CONTAINED: inline styles, text wordmark, no shared assets -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Página não encontrada — OUG RANCH</title>
  <style>
    :root { --bg:#F4F4EF; --ink:#2B2623; --accent:#BB6F47; --gutter:16px; }
    body { margin:0; background:var(--bg); color:var(--ink);
           font-family:system-ui,sans-serif; }
    .wrap { min-height:100svh; padding:64px var(--gutter); display:flex;
            flex-direction:column; justify-content:center; gap:24px; }
    .marca { font-family:Georgia,serif; font-size:28px; letter-spacing:.02em; }
    h1 { font-family:Georgia,serif; font-weight:400; font-size:28px; margin:0; }
    a { color:var(--ink); text-decoration:underline; min-height:44px; display:inline-flex;
        align-items:center; }
    a:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
  </style>
</head>
<body>
  <main class="wrap">
    <p class="marca">OUG RANCH</p>
    <h1>essa página seguiu estrada diferente.</h1>
    <p>O endereço que você abriu não existe por aqui (ou mudou de endereço).</p>
    <a id="home" href="./index.html">← voltar pro início</a>
  </main>
  <script>
    // fix the home link when the 404 was served for a nested missing URL
    document.getElementById('home').href =
      location.pathname.replace(/\/[^/]*$/, '/') + 'index.html';
  </script>
</body>
</html>
```

(Copy is verbatim from the UI-SPEC Copywriting Contract [VERIFIED: 01-UI-SPEC.md:91-93]. System-UI/Georgia fallback fonts here — the 404 stays self-contained and doesn't fetch brand fonts.)

## Owner Guide (README.md) — content contract for PLAT-03 / PERF-01 / A11Y-01

Written in pt-BR, "amigo do interior" tone. Required sections (each maps to a success criterion):

1. **Como o site é atualizado** — edit → GitHub Desktop commit → push → *espere 1 a 10 minutos* (Pages CDN `max-age=600` — expectation-setting from PITFALLS.md §8); hard refresh: Ctrl+F5 / aba anônima no celular.
2. **Convenção de nomes de arquivo (regra nº 1)** — minúsculas, sem acento, sem espaço, sem parêntese; hífens para separar (`look-01-orbita.jpg`). *Por quê:* o site roda num servidor Linux que diferencia MAIÚSCULA de minúscula — arquivos renomeiam **antes** de entrar no repositório, nunca depois.
3. **SOP de otimização de fotos (regra nº 2)** — Squoosh (squoosh.app): WebP, largura ≤1600 px (galeria) / ≤900 px (hero mobile), qualidade ~75–80 (hero ~85), apagar metadados → resultado esperado **200–400 KB por foto**; originais ficam FORA do repositório (Google Drive/disco próprio).
4. **Convenção de alt text (regra nº 3)** — fotos que mostram produto/campanha: descreva a cena, formato `Campanha OUG RANCH — [cena]`; imagens puramente decorativas: `alt=""` (vazio de propósito, não é erro).
5. **O que nunca fazer** — nada de dados pessoais/sensíveis no repositório (ele é público); nada de arquivos com `_` no começo do nome; nada de caminhos começando com `/`.
6. **Trocar o logo/textos** — onde fica cada coisa (tokens no topo de `css/styles.css`, textos no HTML, copy do 404).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hand-rolled modal focus trap (keydown loops) | Native `<dialog>` + `showModal()` | Baseline Mar 2022 | Phase 1 drawer a11y is ~10 lines, not ~100 |
| `100vh` for full-screen sections | `100svh` (+ `vh` fallback line) | Safari 15.4 / Chrome 108 (2022) | Hero doesn't hide CTA under mobile browser chrome |
| `@starting-style` dialog transitions | Keyframes with `display` in keyframe | MDN-documented alternative | Works on every `<dialog>` browser, not just newest |
| Google Fonts CDN `<link>` | Self-hosted latin-subset woff2 | Web Almanac 2025: self-hosting now majority practice | No third-party connection, preloadable, GDPR-clean (per STACK.md) |
| Hand-built `.ico` favicon | SVG favicon + PNG fallback with explicit `<link>` | SVG favicons mainstream | No ICO tooling needed |

**Deprecated/outdated for this phase:** none of the UI-SPEC choices rely on deprecated APIs; `closedby` attribute on `<dialog>` is too new to depend on.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `width`/`height` on `<source>` is inconsistently supported → container `aspect-ratio` used instead | Pattern 3 | None (design choice avoids the question) |
| A2 | Relative URLs in `404.html` resolve against the requested (missing) URL's directory on Pages | Pitfall 1 | Unstyled 404 on deep links — verify in 30 s with a local server test (nested bogus path) during execution |
| A3 | `showModal()` does not block background scroll; focus-return-to-invoker may or may not be automatic → explicit `burger.focus()` added | Pattern 2 / Pitfall 2 | Minor UX annoyance; the explicit focus() makes A3's second half moot |
| A4 | Browser auto-discovery of `/favicon.ico` hits domain root under project subpath; Safari ignores SVG favicons → PNG fallback shipped | Pattern 6 / Pitfall 4 | Generic tab icon on Safari only (cosmetic) |
| A5 | `fetchpriority` browser support: Chromium 101+, Safari 17+, Firefox 132+; unsupported browsers ignore it harmlessly (eager remains default) | Pattern 3 | None — progressive enhancement |
| A6 | Placeholder hero JPEGs generated via .NET `System.Drawing` (probed available) suffice for v1; WebP reserved for owner's real photos via Squoosh SOP | Standard Stack / Scaffold | Placeholder files ~10× heavier than WebP but ≤200 KB each — within PERF-01 spirit; document deviation from UI-SPEC's `hero-*.webp` filenames in the plan |
| A7 | `master` branch is acceptable for Pages deploy-from-branch (or rename to `main` — plan decides) | Pitfall 7 | Owner confusion at deploy; mitigated by README deploy section |

## Open Questions (RESOLVED)

1. **GitHub repo creation & Pages enablement (owner/manual step)** — RESOLVED
   - What we know: local repo exists with `master` branch and 5 commits; no remote configured yet (git status clean of remotes this session).
   - What's unclear: exact account/repo name (fixes the Pages subpath) and whether branch stays `master` or becomes `main`.
   - Recommendation: end-of-phase `checkpoint:human-verify` task — create repo + enable Pages deploy-from-branch + confirm site loads under the subpath; plan documents the exact clicks in the README.
   - Resolution: enacted as **01-02-PLAN.md Task 3** (`checkpoint:human-verify` — repo creation, Pages enablement, live checklist). Branch decision taken in **01-01-PLAN.md Task 1** (`git init -b main`, per Pitfall 7) and documented in the README deploy section (**01-02-PLAN.md Task 2**).
2. **Placeholder hero visual direction** (discretion per CONTEXT.md) — RESOLVED
   - What we know: D-10 wants "imagem neutra/terrosa"; no real campaign photo exists.
   - Recommendation: warm gradient in brand-adjacent earth tones (caramelo/café haze), identical hue family across both crops so the mobile/desktop swap feels intentional.
   - Resolution: decided in **01-01-PLAN.md Task 1** (action step 4) — warm caramelo/café gradient placeholders at exactly 900×1125 (4:5) and 1600×1067 (3:2), same hue family in both crops, JPEG ≤200 KB each.
3. **Favicon monogram design** (discretion) — RESOLVED
   - Resolution: decided in **01-01-PLAN.md Task 1** (action step 5) — cream tile with a café-colored serif "O"/"OR" monogram per Pattern 6 (never the shrunken 5:1 wordmark); the owner can replace it later via the README instructions (**01-02-PLAN.md Task 2**).

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| git | Scaffold commits, phase commits | ✓ | (repo active, branch `master`, 5 commits) | — |
| PowerShell + .NET `System.Drawing` | Placeholder hero JPEGs, favicon PNGs, logo copy | ✓ | probed this session | — |
| Google Fonts access (one-time download of 2 woff2) | Self-hosted fonts | ✓ | both URLs returned 200 / `font/woff2` this session | Google Fonts CDN `<link>` (acceptable fallback per STACK.md) |
| Node/npm | *Not required* | — | — | Not needed by design (AGENTS.md stack) |
| GitHub repository + Pages | Deploy verification (success criterion 1) | ✗ manual owner step | — | `checkpoint:human-verify` at end of phase |
| Browser for smoke test (phone or DevTools emulation) | Success criteria 1–3 | ✓ assumed (user's machine) | — | DevTools device emulation |

**Missing dependencies with no fallback:** none — the only un-provisionable item is the GitHub repo itself, handled as a human-verify step, not a blocker for building/previewing locally (`file://` works by design).

## Security Domain

> Included because `security_enforcement: true`, `security_asvs_level: 1` in `.planning/config.json`.

### Applicable ASVS Categories (L1, static site — no auth/session/crypto surface in this phase)

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication / V3 Session / V6 Crypto | no | No accounts, sessions, or crypto exist in Phase 1 |
| V4 Access Control | no | Public static content, no privileged paths |
| V5 Input Validation | minimal | No user inputs in Phase 1; `target="_blank"` links carry `rel="noopener"` (tabnabbing) |
| V14 Config/Deployment | yes | `.nojekyll` present; zero third-party JS; no secrets in public repo |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Reverse tabnabbing via external Instagram link | Tampering | `rel="noopener"` on every `target="_blank"` (UI-SPEC copy contract already includes it) |
| Supply-chain JS injection | Tampering | Zero third-party scripts (AGENTS.md constraint); only self-authored `main.js` |
| Sensitive data in public repo | Information Disclosure | README rule: nothing personal/sensitive committed (PITFALLS §Security) |
| Malicious file upload via owner workflow | Tampering | Naming convention (ASCII, lowercase) doubles as a hygiene gate |

Nothing at `security_block_on: high` level is anticipated in this phase.

## Sources

### Primary (HIGH confidence — probed/fetched this session)
- MDN `<dialog>` element page (developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) — Baseline since Mar 2022, showModal semantics, autofocus recommendation, animation machinery (@starting-style vs keyframes), implicit aria-modal
- MDN `<picture>` element page (developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture) — Baseline since Mar 2016, art-direction use case, media/srcset on `<source>`, object-fit on child img
- Google Fonts CSS2 API (`fonts.googleapis.com/css2?family=Yeseva+One&family=Inter:wght@100..900&display=swap`, Chrome UA) — exact @font-face blocks, variable weight range `100 900`, latin unicode-range, woff2 URLs; HEAD probes confirmed sizes (48,256 B / 17,492 B)
- `branding-image1.png` probe (System.Drawing) — 610×123 px, transparent PNG
- Local `git status` — branch `master`, repo active
- Project files read this session: `01-CONTEXT.md` (D-01…D-11 verbatim), `01-UI-SPEC.md` (tokens, spacing, copy, interaction contracts), `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `branding.md`, `.planning/config.json`, `.planning/research/STACK.md`, `.planning/research/PITFALLS.md`

### Secondary (MEDIUM-HIGH — same-day project research, official-doc-backed)
- `.planning/research/STACK.md` + `PITFALLS.md` — GitHub Pages limits/404/`.nojekyll`/relative-paths/cache-delay facts, each with official GitHub Docs citations (checked 2026-11-13)
- web.dev font best practices (via STACK.md sources) — preload `crossorigin` requirement

### Tertiary (LOW — training knowledge, flagged in Assumptions Log)
- Safari `@starting-style`/`fetchpriority`/SVG-favicon support specifics (A4/A5)

## Metadata

**Confidence breakdown:**
- Scaffold/platform facts: HIGH — inherited from same-day official-docs-verified project research
- Drawer & picture patterns: HIGH — MDN pages fetched this session
- Font contract: HIGH — live Google Fonts API probe with byte sizes
- Pitfall 1 (404 self-containment): HIGH reasoning, MEDIUM provenance — flagged as A2 with a 30-second execution-time check
- Owner guide content: HIGH — direct mapping from REQUIREMENTS + PITFALLS SOP

**Research date:** 2026-11-13
**Valid until:** 2026-12-13 (stable static-platform domain; font URLs are one-time downloads, not runtime dependencies)
