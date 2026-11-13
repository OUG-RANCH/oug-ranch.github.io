# Walking Skeleton — OUG RANCH Lookbook

**Phase:** 1
**Generated:** 2026-11-13

## Capability Proven End-to-End

> A visitor opens the site (double-click `index.html` locally or the GitHub Pages URL under the project subpath) and sees a branded cream page with a full-screen campaign hero, a working header whose logo returns home, a mobile drawer / desktop inline nav, a "ver coleções" CTA that scrolls to the collections placeholder, and a footer with Instagram — with zero build step and zero console-blocking errors.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Plain HTML/CSS/vanilla JS — no build step, no framework (AGENTS.md, D-00 stack lock) | Non-expert owner must maintain forever; zero toolchain = edit → push → live |
| Data layer | (later phases) classic `<script src="data.js">` setting a global (`window.OUG_COLLECTION`); never `fetch()`/ES modules | Works on `file://` and Pages subpath; owner's de facto preview is double-click |
| Auth | none — public static vitrine, no accounts (Out of Scope) | Lookbook needs no login |
| Deployment target | GitHub Pages project site, "Deploy from a branch" (branch `main` / root), `.nojekyll` at repo root | Free, ~10 s deploys without Jekyll; `main` chosen over `master` to match GitHub default-new-repo expectation (documented in README) |
| Directory layout | Flat repo root: `index.html`, `404.html`, `css/`, `js/`, `fonts/`, `images/`, favicons at root; **`images/` is the project-wide asset folder convention** (PATTERNS conflict resolved — Phase 2's `images/collections/<slug>/` inherits it); no leading-underscore names | Relative paths everywhere; survives Pages subpath |
| Design tokens | CSS custom properties block at the very top of `css/styles.css` = the owner's theme file | Later phases never hardcode a hex |
| Mobile drawer | Native `<dialog>` + `showModal()` + keyframe open animation + `body.menu-open` scroll lock | Browser-native Esc/focus-trap/inert; works on every `<dialog>` browser |
| Fonts | Self-hosted WOFF2 latin subsets: Yeseva One (display, 400 only) + Inter variable; preload Yeseva One **with `crossorigin`**; Inter never preloaded | GDPR-clean, preloadable, no third-party runtime connection |
| Placeholder strategy | Real image files (JPEG hero placeholders, exact 4:5 / 3:2 dims) matching the CSS container `aspect-ratio` contract | Proves the LCP/CLS path the owner's real WebP photos will follow |

## Stack Touched in Phase 1

- [x] Project scaffold (`.nojekyll`, folder tree, tokens file, favicon set) — no build/lint by design
- [x] Routing — two real pages: `index.html` (home shell) + self-contained `404.html` (Pages serves it for every missing path)
- [x] Data layer — *not in Phase 1* (static markup; `collections.js` global pattern is established in Phase 2)
- [x] UI — real interactive element: hamburger → `<dialog>` drawer wired to `js/main.js` (open/Esc/✕/anchor-close/resize-close/scroll lock/focus return)
- [x] Deployment — `file://` local run works by design; documented push-to-Publish flow + end-of-phase human checkpoint validates the published URL

## Out of Scope (Deferred to Later Slices)

- Collection cards, `collections.js` data file, carousel/hover-zoom (Phase 2)
- Lookbook pages, lightbox, friendly error states for bad slugs (Phase 3)
- Marquee, announcement bar, OG/social set, sitemap, reduced-motion audit final pass (Phase 4)
- Brand ornament graphics (estrela bordada, etiqueta EST. 2024, moldura, numeração) — owner chose "minimal" for v1 (D-04)
- Verde `#7A9B5F` / azul `#2C4A6F` accent usage (D-02: guardados, fora do v1)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: collections data system + clickable cards + brand info section (home page complete)
- Phase 3: generic `lookbook.html?c=slug` template + photo stack/grid + GLightbox lightbox (vendored)
- Phase 4: editorial polish (marquee/announcement), OG/SEO validation, final a11y/perf pass, launch check
