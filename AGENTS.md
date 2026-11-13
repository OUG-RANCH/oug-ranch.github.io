<!-- GSD:project-start source:PROJECT.md -->

## Project

**OUG RANCH — Lookbook Website**

Site vitrine (lookbook) para a marca de moda OUG RANCH, ainda não lançada. A página inicial une dois modelos de referência: o visual de marca com hero forte da isadeburgh.com e a seção de coleções da cienalab.com.br/pages/lookbook (capa + título + texto de cada coleção, clicável). Ao clicar em uma coleção, abre a página do lookbook com fotos em rolagem vertical, otimizado para visualização no celular.

**Core Value:** O visitante consegue rolar a home no celular, ver as coleções (capa + título + texto), clicar e navegar pelo lookbook da coleção — de graça, hospedado no GitHub Pages.

### Constraints

- **Budget**: R$ 0 — GitHub Pages, sem backend, sem serviços pagos
- **Tech stack**: HTML/CSS/JS puro (estático) — sem framework de build obrigatório, para facilitar manutenção pelo dono
- **Performance**: fotos otimizadas/comprimidas — foco mobile (4G)
- **Compatibilidade**: navegadores de celular modernos (Chrome/Safari Android e iOS)

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Plain HTML + CSS + vanilla JS | No build step, ES2020+ JS | Entire site | A non-expert owner must maintain this forever. Zero toolchain = open folder, edit file, push, live. GitHub Pages serves static files directly; a build step adds a failure mode (Node installed, build passing, output committed) for zero benefit at this scale |
| GitHub Pages, project site, "Deploy from a branch" (main / root) | — | Free hosting + CI | Simplest possible deployment: owner edits and pushes to `main`, site is live ~1 min later. No custom Actions workflow needed since there is no build. One project site per repository; free on public repos |
| `.nojekyll` file (empty, repo root) | — | Disable Jekyll processing | GitHub runs Jekyll on branch-based deploys by default, which slows deploys (~3min → ~10s in community-verified tests) and **silently drops any folder starting with `_`** (e.g. `_photos`). One empty file kills both problems |
| WebP + JPEG (via `<picture>`), `srcset`/`sizes`, `loading="lazy"` | — | Photo delivery | WebP is universally supported (all browsers since ~2020); ~25–35% smaller than JPEG at equal quality. `srcset` with 2–3 width variants stops phones from downloading desktop-sized files. `loading="lazy"` is native (no JS) — only below-the-fold images, never the LCP hero |
| GLightbox | latest (MIT) | Lightbox for lookbook photos | Pure JS, **11 KB gzipped** per official site (~30 KB uncompressed js+css vendored), no jQuery, mobile swipe/pinch/zoom built in, gallery grouping, responsive-image support, keyboard nav. Works fully offline once vendored into the repo — no CDN dependency |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GLightbox js + css (vendored in `js/vendor/`, `css/vendor/`) | 3.x | Full-screen photo viewer on collection pages | Always — it is the entire JS interactivity budget of the site. Load it only on collection pages |
| Per-collection data file: `collections/<slug>/data.js` | — | Collection metadata (title, description, photo list) | Pattern: each file sets a plain global (e.g. `window.OUG_COLLECTION['novo-horizonte'] = {...}`). A plain `<script src>` works on GitHub Pages **and** when the owner double-clicks files locally (`fetch()` and ES-module imports both break on `file://`, which would make local preview impossible for a non-expert) |
| Fonts: 2 self-hosted WOFF2 files (latin subset) | — | Editorial identity | Self-host on Pages same-origin instead of the Google Fonts CDN: removes a third-party connection, enables preloading, avoids GDPR friction (Google Fonts CDN has been ruled non-GDPR-compliant in Germany). 2025 Web Almanac: self-hosting is now the majority practice (~1/3 of sites self-host exclusively, trend rising) |
| Squoosh (web app, squoosh.app) | — | Photo compression workflow | Free, browser-based, no install. Owner exports WebP at 2–3 widths per photo. If the owner becomes comfortable later, a one-line ImageMagick/sharp script can replace it |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| VS Code + GitHub Desktop | Editing and publishing | The entire "deploy pipeline" for a non-expert: edit → commit → push. No CLI knowledge required |
| Local preview: double-click `index.html` or VS Code Live Server extension | Preview before push | The data-as-plain-script pattern (above) is chosen specifically so `file://` preview works |
| Squoosh (squoosh.app) | WebP export at multiple widths | Recommended settings: quality ~75–80 for gallery photos, ~85 for hero; strip metadata |

## Typography (editorial fashion feel at R$ 0)

- **Two fonts maximum, self-hosted WOFF2, latin subset only** (tens of KB each when subset — full CJK-style files run into MBs, latin subsets do not).
- Recommended pairing from Google Fonts (all OFL-licensed, free for commercial use):
- Use the **variable** WOFF2 (one file covers all weights) rather than separate 400/700 files.
- Apply: `font-display: swap`, `<link rel="preload" as="font">` for the display font only, and `font-size: clamp()` for fluid editorial scaling between mobile and desktop.
- Google Fonts CDN is an acceptable fallback (it's free and fast), but self-hosting is the current best practice and costs nothing on Pages.

## CSS approach

- CSS custom properties for the design tokens (colors, spacing scale, type scale) — this is the owner's "theme file."
- Modern layout only: `grid` + `flexbox`, `aspect-ratio` for photo frames (prevents layout shift with zero JS), `clamp()` for fluid typography, logical properties not required.
- Container queries: available in all evergreen browsers — nice for the collections card component, but **not required**; media queries are sufficient at this scale. Don't build on them as a dependency.
- **No Tailwind / no utility framework / no PostCSS**: all require a build step (or CDN runtime), and hand-written utility classes make later edits harder for a non-expert. Editorial design is distinctive *because* of hand-tuned type — utility frameworks fight that.
- Dark-mode via `prefers-color-scheme` only if brand wants it — editorial fashion usually locks a fixed palette.

## GitHub Pages constraints (verified against official docs)

| Constraint | Value | Impact on this project |
|------------|-------|------------------------|
| Published site size | **1 GB max** (hard) | Budget ~100–300 photos/collection era. At ~150 KB/photo × 3 sizes = ~450 KB/photo set; 1 GB ≈ ~2,000 optimized photo files. Keep original masters **out of the repo** (owner's own storage) — repo should contain only web exports |
| Single file size | **100 MB blocked** (50 MB warning) | Non-issue for compressed WebP; would bite with unedited RAW/full-res JPEG masters |
| Bandwidth | **100 GB/month (soft limit)** | ≈ 200K photo-pageviews/month at ~5 MB per visit. Fine at launch; if brand blows up, GitHub emails first (soft). Escape hatch: put a free Cloudflare CDN in front, or migrate to Cloudflare Pages (same free static model) |
| Builds | Soft limit 10 builds/hour (branch deploys); custom Actions workflows exempt | Branch deploy is fine — owner won't push 10×/hour |
| Deploy timeout | 10 minutes | Non-issue; a `.nojekyll` branch deploy takes seconds |
| Server-side anything | **None** — no PHP/Node/Python, no DB, no `.htaccess`, no server config, no redirects file | URL redirects, custom 404 (`404.html` works), and clean URLs (`/foo` → `foo.html`) are the only server-ish features available. Everything must be client-side |
| Commercial use | Pages ToS prohibits e-commerce / online business use | A lookbook with **no e-commerce** is fine — and this project explicitly has none. Do not later bolt a checkout onto Pages; that would require moving hosts |
| Repo visibility | Public repo required on free plan | Code/photos are public. Nothing sensitive may live in the repo (no unpublished brand plans) |
| Custom domain | **Free**, incl. auto HTTPS via Let's Encrypt | 4 apex A records (or ALIAS) + `www` CNAME + `CNAME` file in repo root + optional TXT verification. "Enforce HTTPS" becomes available after cert provisioning (up to ~24 h). Recommend **relative paths everywhere** (`./css/styles.css`, not `/css/styles.css`) so the site works identically on `user.github.io/oug-ranch/` and on a future custom domain |

### Project site vs user site

## Folder structure that scales

## Installation

# No npm. The entire setup:

# 1. Download GLightbox dist files from https://github.com/biati-digital/glightbox/releases

#    -> js/vendor/glightbox.min.js + css/vendor/glightbox.min.css

# 2. Download WOFF2 latin subsets from Google Fonts -> fonts/

# 3. git init, push to GitHub, enable Pages: Settings → Pages → Deploy from branch (main / root)

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Pure HTML/CSS/JS, no build | **Vite** (dev server, minify, asset hashing) | When the site grows real JS complexity or needs multiple pages generated from data. Adds `npm install` + build discipline to every content edit — bad fit for a non-expert owner. Base-path gotcha: Vite needs `base: './'` for project-site relative URLs |
| Pure HTML/CSS/JS | **Eleventy (11ty)** | When collections multiply (~15+) and hand-copying the template folder becomes the bottleneck. 11ty generates collection pages from a single template + data files, still ships zero client JS, still static output on Pages. Cost: owner must run `npx @11ty/eleventy` (or a custom Actions deploy) for every change |
| Pure HTML/CSS/JS | **Astro** | Same trigger as 11ty plus if the owner/agents want component ergonomics. Heavier toolchain; overkill here. Noted 2025-26 consensus: Astro is the most beginner-friendly SSG, but "beginner" still means Node + build |
| GLightbox (11 KB gz) | **PhotoSwipe 5** (MIT, ~10 KB gz core, dynamic-import module) | If pinch-zoom quality on mobile is paramount — PhotoSwipe 5 is the best-in-class mobile gesture/zoom/focus-management implementation and loads its core only on demand. Slightly more wiring (ES module init). Either choice is defensible; GLightbox wins on simpler setup |
| Self-hosted Google Fonts | Google Fonts CDN `<link>` | If the owner refuses to manage font files — still free, one line of HTML, minor performance/GDPR tradeoff |
| WebP primary | AVIF in `<picture>` before WebP | Optional later: AVIF is ~20–30% smaller again, and `<picture>` with type="image/avif" is safe. Not worth the encoding hassle at launch (WebP is the 90% win) |
| GitHub Pages | Cloudflare Pages | Same free static model, 20 GB→ actually generous unlimited-ish bandwidth, better edge. Keep as the pre-planned migration path **only** if bandwidth becomes a problem — do not start there, Pages is where the project already plans to live |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Any build tool (Vite/11ty/Astro) at v1 | Every content edit becomes a dev-tooling task; breaks the "owner swaps photos and text" requirement | Plain files, direct push to main |
| Tailwind / Bootstrap | Class soup fights the editorial aesthetic; Bootstrap look is instantly recognizable; Tailwind needs a build or a 300 KB+ runtime script | Hand-written CSS with custom properties |
| jQuery, or any CSS/JS framework CDN link | Third-party dependency on a free site that must never break; jQuery era is over | Vanilla JS; vendor the one tiny lib (GLightbox) locally |
| Loading fonts/images from third-party CDNs | Extra connection + reliability + GDPR exposure | Self-host everything; GitHub Pages itself is the CDN |
| Uncompressed original photos in the repo | Blows the 1 GB published-site limit fast; 100 MB file cap blocks full-res masters | Squoosh-exported WebP variants only; masters live outside the repo |
| `fetch()`/ES modules for collection data | Breaks `file://` preview — owner opens index.html locally and sees nothing | Plain `<script src="data.js">` setting a global |
| Absolute paths (`/css/styles.css`) | Breaks the moment the site runs under `username.github.io/oug-ranch/` | Relative paths (`./css/styles.css`) everywhere |
| client-side routed SPA patterns (hash-less nav via JS) | Deep links break, no server rewrite support on Pages | Real multi-page HTML; GitHub Pages even serves `/foo` → `foo.html` for free |

## Stack Patterns by Variant

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| GLightbox 3.x | All evergreen browsers | Pure ES5-compatible build; include its CSS once per collection page |
| WebP | Every browser in use today | No JPEG fallback needed for modern traffic; keep JPEG as Squoosh export option only if old-device analytics ever justify it |
| `loading="lazy"`, `aspect-ratio`, `clamp()`, custom properties | All evergreen browsers, degrades gracefully | No polyfills needed |
| Variable fonts (WOFF2) | All evergreen browsers since ~2018 | Safe |

## Sources

- GitHub Docs — Pages limits (1 GB published site, 1 GB recommended source repo, 100 GB/month soft bandwidth, 10 builds/hour, 10-min deploy timeout): https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits — **HIGH confidence (official)**
- GitHub Docs — configuring a publishing source / recommended custom Actions workflow: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site — HIGH
- GitHub Docs — custom domain management & verification (A/CNAME/TXT records, Enforce HTTPS up to 24 h): https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site — HIGH
- GitHub Community discussions — `.nojekyll` skipping Jekyll (3m36s → 10s deploy) and underscore-folder drops: https://github.com/orgs/community/discussions/135679 — MEDIUM
- Simon Willison TIL — GitHub Pages missing manual (`/foo` → `foo.html`, `.nojekyll`): https://til.simonwillison.net/github/github-pages — MEDIUM
- GLightbox official site (11 KB gzipped, mobile swipe/pinch, responsive images): https://biati-digital.github.io/glightbox — HIGH (vendor's own claim, cross-checked with npm-compare)
- PhotoSwipe 5 (MIT, dynamic import, mobile zoom/focus): https://photoswipe.com — HIGH
- Lightbox comparison (npm-compare: glightbox/photoswipe/viewerjs et al.): https://npm-compare.com/glightbox,lightbox2,lightgallery.js,magnific-popup,photoswipe,viewerjs — MEDIUM
- web.dev — browser-level lazy loading (never lazy-load LCP/above-fold images): https://web.dev/articles/browser-level-image-lazy-loading — HIGH
- web.dev — font best practices (self-hosting, subsetting, preload): https://web.dev/articles/font-best-practices — HIGH
- Web Almanac 2025 Fonts chapter (self-hosting share rising, variable fonts mainstream, Google Fonts ~54% of sites): https://almanac.httparchive.org/en/2025/fonts — HIGH
- Self-hosting guidance (fewer connections, cache partitioning killed the "shared Google cache" argument): https://speedvitals.com/blog/self-host-google-fonts — MEDIUM
- Cloudinary/DEV — image optimization (AVIF/WebP `<picture>` pattern, lazy-load rule): https://dev.to/cloudinary/your-images-are-probably-slowing-down-your-website-heres-how-to-fix-it-23je — MEDIUM
- SSG landscape 2025-26 (11ty = zero client JS by default; Astro = most beginner-friendly SSG): https://www.11ty.dev , https://bugfender.com/blog/top-static-site-generators — MEDIUM

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-fast` for a trivial task inline, with no subagents and no PLAN.md
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
