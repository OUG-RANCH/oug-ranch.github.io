# Roadmap: OUG RANCH — Lookbook Website

## Overview

Static, mobile-first fashion lookbook for the OUG RANCH brand (pre-launch, Brazilian market, zero-cost hosting). Four phases take the project from an empty repo to a published GitHub Pages site: (1) scaffold + design system + navigation/hero shell with owner conventions baked in from day 1, (2) the collections data system and complete home page, (3) per-collection lookbook pages with lightbox, (4) editorial polish, social/SEO validation, and launch. Every v1 requirement maps to exactly one phase; each phase ends with something a visitor can actually see and use on a phone.

**Milestone:** v1.0 — MVP (site published and navigable end-to-end on mobile)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation — Scaffold, Design System & Navigation** - Static repo scaffold on GitHub Pages, design tokens/fonts, header/nav/footer, full-screen hero
- [ ] **Phase 2: Home Page — Collections & Brand Info** - `collections.js` data system, clickable collection cards (mobile carousel / desktop hover), brand info section
- [ ] **Phase 3: Lookbook Pages & Lightbox** - Generic `lookbook.html?c=slug` template with photo stack (mobile) / grid (desktop) and full lightbox
- [ ] **Phase 4: Editorial Polish, Social SEO & Launch** - Marquee verified, complete OG/social set validated live (announcement bar declined by owner, D-01), final accessibility/perf pass, end-to-end launch check

## Phase Details

### Phase 1: Foundation — Scaffold, Design System & Navigation
**Goal**: The brand's visual shell is live: a visitor opens the site (locally by double-click or on GitHub Pages) and sees a branded page with a strong hero, working navigation, and the owner has the conventions needed to never break the site
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: PLAT-01, PLAT-03, NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, A11Y-01, PERF-01
**Success Criteria** (what must be TRUE):
  1. Opening the site (double-click locally or via the GitHub Pages URL under the project subpath) shows a branded page — no blank screen, no console-blocking error, favicon present, and a branded 404 page exists
  2. On a phone, the hamburger opens a panel with the site links; on desktop, navigation links appear directly in the header; the OUG RANCH wordmark/logo always returns to home
  3. The home shows a full-screen hero with campaign photo (separate mobile crop) and brand name overlay; tapping "ver coleções" scrolls toward the collections section
  4. A footer with the brand name and Instagram link is visible on every page
  5. A non-technical owner can follow the Portuguese guide (README/editor guide) to add a photo: rename it per the naming convention (lowercase, no accents/spaces), optimize it via the documented SOP to ≤1600 px / ~200–400 KB, and see the alt-text convention documented
**Plans**: 2/2 plans executed (live at https://oug-ranch.github.io/, owner-approved)

Plans:
**Wave 1**
- [x] 01-01-PLAN.md — Walking Skeleton: assets + tokens + full branded home end-to-end (header/nav/drawer, hero `<picture>` + CTA, placeholder section, footer, fonts, favicon, `.nojekyll`)

**Wave 2** *(blocked on Wave 1 completion)*
- [x] 01-02-PLAN.md — Self-contained branded 404 + Portuguese owner guide (README) + GitHub Pages publish checkpoint *(published at https://oug-ranch.github.io/; owner-approved after 2 visual fix rounds)*
**UI hint**: yes

### Phase 2: Home Page — Collections & Brand Info
**Goal**: The home page is complete: collections render from the owner-editable data file as clickable cards (newest first, mobile carousel / desktop hover-zoom), and the brand info section sits below with Instagram, WhatsApp and e-mail contact
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: COL-01, COL-02, COL-03, COL-04, PLAT-02, PERF-02, BRAND-01, BRAND-02, BRAND-03, BRAND-04
**Success Criteria** (what must be TRUE):
  1. A visitor scrolling the home sees collection cards — cover image + title + descriptive story — rendered from the data file, with the most recent collection first
  2. On a phone, cards swipe horizontally at full width (Ciena-style carousel); on desktop, the cover image zooms slightly on hover
  3. Tapping/clicking anywhere on a card opens that collection's lookbook page
  4. The owner adds a new collection by creating one photo folder + one entry in `collections.js` (two steps, no markup edits) and sees it appear on home after refresh — following the commented template entry in the data file
  5. Below the collections, the brand info section shows the "sobre a marca" placeholder text plus working Instagram, WhatsApp (wa.me) and e-mail links
**Plans**: 1/1 executed (02-01 — data-driven collections shipped 2026-11-13; criterion 2's mobile-carousel wording superseded by D-06 stacked scroll — COL-03 annotated in REQUIREMENTS.md; criterion 5 brand-info deferred per D-08 — BRAND-01..04 annotated)

Plans:
**Wave 1**
- [x] 02-01-PLAN.md — Data-driven collections: `js/collections.js` data file + renderer, cards mount, hover zoom, README guide, REQUIREMENTS annotations *(executed 2026-11-13; pushed to main — live check post-push)*
**UI hint**: yes

### Phase 3: Lookbook Pages & Lightbox
**Goal**: Every collection has a shareable lookbook page: title + story + vertical photo stack on mobile (grid on desktop), with a lightbox for enlarged viewing and friendly states for bad links and broken images
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: LOOK-01, LOOK-02, LOOK-03, LOOK-04, PLAT-04
**Success Criteria** (what must be TRUE):
  1. Opening `lookbook.html?c=slug` shows the collection title + story at the top and photos stacked in a single scrolling column on a phone; on desktop the photos display in a grid
  2. Tapping a photo opens the lightbox with previous/next/close; it closes via the ✕ button, Esc key, or clicking outside; swiping navigates photos on mobile
  3. A "← Voltar" link returns to the collections — including for visitors arriving via a shared WhatsApp/Instagram link
  4. An invalid collection slug, corrupt/broken `collections.js`, or a missing photo shows a friendly Portuguese message (never a blank page) — a broken data file shows the error on home too
  5. The lightbox works correctly on a real iPhone: the background doesn't scroll behind it, the close button is visible above the notch, and swiping doesn't conflict with page scroll
**Plans**: TBD
**UI hint**: yes

### Phase 4: Editorial Polish, Social SEO & Launch
**Goal**: The site launches properly: animated editorial touches respect reduced motion, every page shares beautifully on WhatsApp/Instagram with complete OG/SEO metadata, the accessibility and performance details are verified, and the full journey works end-to-end on a published phone
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: NAV-05 *(declined by owner, D-01 — never ships)*, HERO-03, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05 *(promoted from v2-deferred per D-05)*, A11Y-02 *(pending with Phase 3 photos)*, A11Y-03, PERF-03
**Success Criteria** (what must be TRUE):
  1. A text marquee (collection names / brand words) loops on the home and pauses under `prefers-reduced-motion` (shipped Phase 1, dual-track pause verified Phase 4). ~~Top announcement bar~~ — DECLINED by the owner per 04-CONTEXT.md D-01 ("Não quero barra"): never ships, not an open condition
  2. Sharing any page URL in WhatsApp shows a proper preview card (validated with Meta Sharing Debugger + one real share test — owner/live check after push): unique `<title>`/description per page, OG + Twitter tags with a 1200×630 image ≤300 KB, absolute canonical URLs (GitHub Pages subpath), `sitemap.xml`, `robots.txt`, favicon, `lang="pt-BR"`
  3. Text over photos reads at ≥4.5:1 contrast (scrim — scoped to Phase 3, needs real photos), focus is visible when keyboard-navigating, and all touch targets (menu, lightbox controls, cards) are ≥44 px
  4. Every image carries `width`/`height` (no layout shift), below-fold images lazy-load, the hero loads eagerly — spot-checked on the published site
  5. **OWNER UAT** — full end-to-end launch check on a real phone: GitHub Pages URL → home → collection → lookbook → lightbox → back, all working. NOT automatable and NOT a task in any plan: it runs as a human checkpoint at launch, when Phase 3 executes with real photos
**Plans**: 1/1 executed (04-01 — non-photo scope: OG card + share/SEO metadata + sitemap/robots + JSON-LD + touch-target/reduced-motion audit + REQUIREMENTS reconciliation, executed 2026-11-13; live validation post-push is owner UAT)
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation — Scaffold, Design System & Navigation | 2/2 | Complete | 2026-11-13 |
| 2. Home Page — Collections & Brand Info | 1/1 | Executed — pending live check | 2026-11-13 |
| 3. Lookbook Pages & Lightbox | 0/0 | Not started | - |
| 4. Editorial Polish, Social SEO & Launch | 0/0 | Not started | - |
