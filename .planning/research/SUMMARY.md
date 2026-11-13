# Project Research Summary

**Project:** OUG RANCH — Fashion Lookbook Website
**Domain:** Static editorial fashion lookbook (mobile-first, Brazilian market, zero-cost hosting, non-expert content owner)
**Researched:** 2026-11-13
**Confidence:** HIGH

## Executive Summary

OUG RANCH is a static, photo-first fashion lookbook for a Brazilian streetwear brand with no e-commerce: a hero, a list of collection cards, per-collection photo pages, brand/Instagram/WhatsApp info, and nothing else. Experts build this exact class of site with **plain HTML/CSS/vanilla JS, no build step, hosted free on GitHub Pages** — and the research is unanimous that adding a framework, SSG, or build tool at v1 would be an anti-pattern, because the owner is a non-expert who must edit photos and text forever via the GitHub web UI (or by double-clicking files locally). The recommended stack is vanilla everything, WebP images via `srcset`/`loading="lazy"`, one vendored tiny library (GLightbox, 11 KB gz) for the lightbox, 2 self-hosted WOFF2 fonts, and CSS custom properties as the theming layer.

The single most important architectural decision (verified against official docs and MDN) is the **data pattern**: one plain JS data file (`collections.js` setting `window.COLLECTIONS`) + one generic `lookbook.html?c=<slug>` template page, all loaded via classic `<script>` tags with relative paths. This is forced by two hard constraints: (1) `fetch()`/ES modules are CORS-blocked on `file://`, which would break the owner's double-click local preview, and (2) GitHub Pages project sites serve under a subpath (`user.github.io/repo/`), where absolute paths 404. It also gives every collection a stable shareable URL — critical because WhatsApp and Instagram are the brand's entire acquisition channel in Brazil.

The dominant risks are all *process* risks around a non-technical owner, not code risks: bad filenames (Windows case-insensitive vs Linux Pages), 5–10 MB camera photos blowing the 1 GB repo limit and 4G data, broken WhatsApp link previews from bad/oversized OG tags (silent failures, aggressive caching), and iOS Safari lightbox quirks (scroll lock, 100vh, gesture conflicts). All four are cheaply preventable if the repo scaffold, conventions, and owner-facing SOP documentation are built into Phase 1 rather than retrofitted.

## Key Findings

### Recommended Stack

Vanilla static site, zero build step, free GitHub Pages hosting. (Full detail: [STACK.md](STACK.md))

**Core technologies:**
- **Plain HTML + CSS + vanilla JS (no build)** — a non-expert must maintain this forever; zero toolchain = edit, push, live in ~1 min
- **GitHub Pages project site, "Deploy from a branch" (main/root)** — free hosting+CDN; ToS allows promotional brand sites (no e-commerce — compliant by design)
- **`.nojekyll` at repo root, day 1** — skips Jekyll: ~10s deploys instead of ~3 min, and prevents silent 404s of `_`-prefixed files
- **WebP + `<picture>`, `srcset`, `loading="lazy"` (never on the LCP hero)** — WebP is ~25–35% smaller than JPEG, universally supported
- **GLightbox 3.x (MIT, 11 KB gz), vendored locally** — the site's entire JS interactivity budget; mobile swipe/pinch built in; works offline, no CDN dependency
- **2 self-hosted WOFF2 fonts, latin subset** — e.g. Fraunces or Instrument Serif (display) + Inter or `system-ui` (body); variable files, `font-display: swap`, preload display font only

**Hard version/constraint facts (official docs):**
- Published site ≤ **1 GB**, single file ≤ **100 MB**, bandwidth **100 GB/month soft**, no server-side anything
- Relative paths everywhere (`./css/styles.css`) — non-negotiable for project-site subpath compatibility
- Classic `<script>` tags only — no `type="module"` (breaks `file://`)
- Naming convention: lowercase ASCII hyphens (`look-01-orbita.jpg`), enforced from day 1

### Expected Features

(Full detail: [FEATURES.md](FEATURES.md), cross-verified against two live reference sites — cienalab.com.br, isadeburgh.com — and 7 Brazilian streetwear sites.)

**Must have (table stakes, P1):**
- Centered wordmark header + hamburger drawer (mobile) / inline links (desktop); footer with Instagram
- Full-bleed hero with brand overlay, separate mobile crop, "ver coleções" CTA
- Collection cards: cover + title + narrative text, whole card clickable, newest first
- Lookbook page: single-column photo stack (mobile), CSS grid (desktop), collection title + story at top, back link
- Lightbox: enlarged view, prev/next, close (✕ + Esc + click-outside), keyboard/touch parity
- Brand section: about blurb (placeholder), Instagram link, **WhatsApp link (`wa.me/55…` — universal in the BR sample)**
- SEO/social: per-page title/description, OG + Twitter cards with 1200×630 JPEG (≤300 KB for WhatsApp), absolute canonicals, sitemap.xml, robots.txt, 404.html, favicon, `lang="pt-BR"`
- Accessibility: alt-text convention, scrim contrast ≥4.5:1, focus states, 44px touch targets, `width`/`height` on every img, hero eager + below-fold lazy

**Should have (differentiators, P2):**
- Announcement bar / scrolling marquee (with `prefers-reduced-motion` pause)
- Editorial text marquee of collection names
- Prev/next collection navigation at lookbook page end (needs ≥2 collections)
- Sticky hide-on-scroll header; JSON-LD `Organization` with `sameAs`

**Defer (v2+):**
- Custom domain (decide *before* writing canonicals if wanted — it hard-codes the origin)
- Preloader counter, autoplay video hero (eats the 1 GB limit; only if owner supplies <10 MB MP4)
- Live Instagram embed (breaks zero-cost; curated screenshot grid or plain link instead)

**Anti-features (build nothing):** year/season filters, pinch-zoom library, SPA router, any e-commerce on Pages (ToS violation).

### Architecture Approach

Two page templates + one data file + one stylesheet; ~250 lines of JS total. (Full detail: [ARCHITECTURE.md](ARCHITECTURE.md))

**Major components:**
1. **`index.html` + `js/main.js`** — hero + collection cards rendered from data; defensive `Array.isArray(window.COLLECTIONS)` guard with a visible Portuguese error state
2. **`lookbook.html` + `js/lookbook.js`** — one generic template driven by `?c=slug`; renders photo stack + lightbox; friendly "coleção não encontrada" state for bad shared links; per-photo `onerror` placeholder
3. **`js/collections.js`** — the single source of truth the owner edits (one commented template entry pasted at the top per new collection); owner touches exactly **one folder + one file** per collection, never markup
4. **`css/styles.css`** — all styling; CSS custom properties on `:root` as the brand theming layer; mobile-first single column, min-width queries only widen

**Key patterns:** classic scripts with data loaded first; relative paths only; explicit `photos: [...]` lists (fail visibly, no miscount bugs); edge handling without a backend (unknown slug, corrupt data, missing photo, 404.html). Anti-patterns to refuse: one HTML page per collection (duplicate-and-edit), runtime `fetch()` of JSON, any framework/build step, absolute paths.

### Critical Pitfalls

(Full detail: [PITFALLS.md](PITFALLS.md), ranked likelihood × impact for this project shape.)

1. **Filenames that work on Windows but 404 on Linux Pages** (Very High × High) — enforce lowercase-ASCII-hyphen naming in the repo scaffold + editor guide; photos renamed *before* entering the repo
2. **Broken WhatsApp link previews** (High × High) — OG block in every page template's definition of done; dedicated 1200×630 JPEG ≤300 KB, absolute HTTPS URL; validate with Meta Sharing Debugger; expect aggressive preview caching
3. **Huge camera photos on 4G + repo bloat** (High × High) — photo SOP documented with a concrete Windows tool (PowerToys Image Resizer / Squoosh): ≤1600–2000 px, JPEG/WebP quality 75–80, 200–400 KB/photo; camera masters never in the repo
4. **Absolute paths `/...` + missing `.nojekyll`** (High × Medium-High) — relative paths rule + empty `.nojekyll` both baked into Phase 1 scaffold
5. **`file://` CORS / one stray comma kills the page** (Very High × Medium) — classic-script data pattern sidesteps fetch entirely; visible Portuguese error states for corrupt data; double-click preview must never be blank

**Also watch:** iOS lightbox behavior (body scroll lock via `position: fixed`, `100dvh` not `100vh`, horizontal-bias swipe with `touch-action: pan-y`, always-visible ✕ above the notch) — this is a lightbox-phase *acceptance criterion*, not an afterthought. Plus: 1–10 min Pages CDN cache expectations in the owner guide, `?v=` cache-busting on data, ≥4.5:1 contrast for outdoor-sunlight readability, favicon shipped early.

## Implications for Roadmap

Based on research, suggested phase structure (4 phases — the site is small, so phases should be few and each one user-visible):

### Phase 1: Foundation — Scaffold, Design System & Owner Conventions
**Rationale:** Every critical pitfall (naming, paths, `.nojekyll`, OG head template, photo SOP, error states) is a scaffold-level decision that becomes expensive if retrofitted; the design tokens are the owner's theme file.
**Delivers:** Repo scaffold (`.nojekyll`, relative paths, `404.html`, favicon), `css/styles.css` with custom-property tokens + fluid editorial type (self-hosted fonts), header/hero/footer markup, canonical OG head template snippet, README + content-editor guide (photo SOP, naming rules, cache expectations, add-a-collection workflow).
**Addresses:** FEATURES A/B partial, G (SEO head template), H partial; STACK folder structure; PITFALLS 1, 3, 4, 5, 6, 8, 9, 10, 15.
**Avoids:** All five critical pitfalls' *process* components.

### Phase 2: Collections System — Data File, Home Page & Cards
**Rationale:** The data pattern is the architecture's load-bearing decision; build it before any dependent page. Cards are the verified ciena pattern the owner explicitly requested.
**Delivers:** `js/collections.js` with commented owner template, `js/main.js` rendering collection cards (cover + title + story, newest first, stacked full-width mobile / 3-col desktop), corrupt-data guard with friendly Portuguese error, hero CTA wiring.
**Addresses:** FEATURES C; ARCHITECTURE Patterns 1 + 3; PITFALLS 6, 8 (cache-busting), 9 (image attributes).
**Uses:** Classic-script data pattern, CSS grid/flexbox, `aspect-ratio`.

### Phase 3: Lookbook Pages & Lightbox
**Rationale:** Depends on Phase 2 data; the photo stack must work without the lightbox (progressive enhancement); the lightbox is the site's only complex JS and carries the iOS-specific acceptance criteria.
**Delivers:** `lookbook.html` generic template + `lookbook.js` (`?c=slug` routing, photo stack, GLightbox lightbox with prev/next/Esc/click-outside, unknown-slug and broken-photo states, back link); explicit real-iPhone acceptance checklist (scroll lock, `100dvh`, swipe vs scroll, ✕ above notch, pinch-zoom).
**Addresses:** FEATURES D; ARCHITECTURE Pattern 2 + edge handling; PITFALLS 7 (critical for this phase).
**Uses:** Vendored GLightbox, `loading="lazy"`/`fetchpriority` conventions.

### Phase 4: Editorial Polish, Social SEO & Launch
**Rationale:** Differentiators and launch-blocking social items layer cleanly on a working site; OG validation must use the *live* URL, so it belongs last.
**Delivers:** Full OG/Twitter set per page validated in Meta Sharing Debugger + real WhatsApp share test, sitemap.xml + robots.txt, absolute canonicals (domain decision made here if custom domain is wanted), JSON-LD `Organization`, announcement bar / text marquee with reduced-motion support, prev/next collection links, `prefers-reduced-motion` audit, "looks done but isn't" checklist run end-to-end.
**Addresses:** FEATURES G/H remainder, P2 differentiators; PITFALLS 2 (final validation), 12, 13, 16.
**Deferred to v2 (not phased now):** custom domain DNS setup (documented recipe in PITFALLS 11 when needed), video hero, preloader, Instagram embed.

### Phase Ordering Rationale

- **Scaffold-and-conventions first** because 4 of the 5 critical pitfalls are prevented by repo-level decisions and documentation, and retrofits (path sweeps, OG head injection into every page, naming fixes after content exists) cost far more than day-1 discipline.
- **Data file before lookbook page** because both home cards and lookbook rendering consume `window.COLLECTIONS`; getting the owner-editing UX right first shapes everything downstream.
- **Lightbox as its own phase** because it is the only component with device-specific acceptance criteria (iOS Safari) that deserve real-device testing rather than emulator checks.
- **Social/SEO validation last** because WhatsApp preview caching and canonical URLs must be verified against the deployed live URL, not a local build.
- **Research is already dense** — the stack, features, and pitfalls research all cross-verified against official docs (GitHub, MDN, Meta, WebKit) and two live reference sites, so planning can lean on existing artifacts.

### Research Flags

Phases likely needing deeper research during planning (`--research-phase`):
- **Phase 3 (Lookbook & Lightbox):** iOS Safari gesture/scroll-lock specifics are documented but the *integration* of GLightbox with the `?c=` template and per-collection image sets has project-specific wiring worth a focused check; real-device test plan needs definition.
- **Phase 4 (Social SEO & Launch):** only if the owner wants a custom domain — the DNS/HTTPS recipe (PITFALLS 11) is documented but is the one area where a live verification pass is cheap insurance.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Scaffold & Design System):** GitHub Pages setup, tokens, fonts, head templates — exhaustively covered by existing research.
- **Phase 2 (Collections System):** the classic-script data pattern is fully specified in ARCHITECTURE.md with code examples.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Hosting limits, Jekyll/`.nojekyll`, `file://` CORS verified against official GitHub docs and MDN; library sizes from official project pages |
| Features | HIGH | Patterns cross-verified between two live inspected reference sites and 7 Brazilian streetwear sites; standards-based claims (WCAG, web.dev) are official |
| Architecture | HIGH | All choices derive from verified platform constraints; tradeoffs explicitly documented with working code examples |
| Pitfalls | HIGH (platform) / MEDIUM-HIGH (device) | GitHub specifics official-doc-verified; iOS lightbox behavior verified against WebKit bug tracker but needs real-device acceptance testing |

**Overall confidence:** HIGH — this is a well-trodden domain with unusually strong source coverage; no speculative technology choices exist to invalidate.

### Gaps to Address

- **Domain decision (github.io vs custom):** canonical URLs, OG URLs, and sitemap all hard-code the origin. Must be resolved with the owner in Phase 1 requirements or Phase 4; changing later means editing every page. *Handle: ask at roadmap/requirements time; default to `*.github.io` with relative paths (safe either way).*
- **Brand content assets:** OG image (1200×630), favicon, wordmark/logo, hero photos, about-blurb text are owner-supplied and not yet in existence. *Handle: placeholders required in Phase 1; real assets are a launch prerequisite, not a code task.*
- **Lightbox choice (GLightbox vs hand-rolled `<dialog>`):** research supports either (FEATURES recommends native `<dialog>` zero-dep; STACK recommends vendored GLightbox). *Recommendation: GLightbox vendored — it solves the iOS gesture/zoom pitfalls out of the box for 11 KB; keep the native-dialog route as fallback if integration friction appears. Decide in Phase 3 planning.*
- **Photo-export tooling fit:** the SOP assumes Squoosh/PowerToys work for the owner's actual photo workflow (phone? camera? JPEG or HEIC exports?). *Handle: validate the exact owner workflow during Phase 1 discussion, not by assumption.*
- **Exact brand palette/typography choice:** research narrowed candidates (Fraunces / Instrument Serif + Inter or system-ui) but the final pairing is a design decision. *Handle: Phase 1 discussion or UI-SPEC.*

## Sources

### Primary (HIGH confidence)
- GitHub Docs — Pages limits, publishing source, custom domains, Jekyll/`.nojekyll`, large files: https://docs.github.com/en/pages/...
- MDN — CORS on `file://` (blocked fetch/XHR/modules): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp
- Meta for Developers — WhatsApp link preview requirements: https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews
- web.dev — image performance, CLS, lazy loading, font best practices: https://web.dev/...
- W3C — WCAG 2.2 (SC 1.4.3, 2.5.8), WAI image tutorials: https://www.w3.org/TR/WCAG22/
- GLightbox & PhotoSwipe official sites (sizes, mobile gesture claims)
- Live site inspections (primary artifacts): cienalab.com.br (card pattern, drawer menu, grid gallery + custom lightbox, OG set), isadeburgh.com (hero, marquees, prev/next, meta set)

### Secondary (MEDIUM confidence)
- GitHub Community discussions — CDN cache max-age=600, deploy timeouts, case-sensitivity 404s, deploy speed with `.nojekyll`
- WebKit Bug 141832 + web-platform-tests interop #788 — iOS 100vh and scroll-lock behavior
- Web Almanac 2025 Fonts chapter — self-hosting share, variable fonts
- BR streetwear site sample (owlshit, BRZ Coast, Real Grapixo, Hardvision, OF Street, Bronky, Yung Street) — WhatsApp universality, Instagram primacy, JSON-LD conventions
- SSG landscape (11ty, Astro) — escalation paths only

### Tertiary (LOW confidence / needs live validation)
- WhatsApp ~300 KB practical `og:image` ceiling (single-source community testing; validate with Meta Sharing Debugger at launch)
- Custom-domain DNS/cert recipe timing (official recipe verified; real-world provisioning delays vary)

---
*Research completed: 2026-11-13*
*Ready for roadmap: yes*
