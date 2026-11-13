---
phase: 04-editorial-polish-social-seo-launch
plan: 01
subsystem: seo-share + a11y-polish
tags: [open-graph, twitter-card, canonical, sitemap, robots, json-ld, touch-targets, reduced-motion, github-pages]

# Dependency graph
requires:
  - phase: 01-foundation-scaffold-design-system-navigation
    provides: three-page site (index/colecao/404), tokens-first css, cache-bust ?v= convention, favicon set
  - phase: 02-home-page-collections-brand-info
    provides: data-driven collections, approved visual direction (cream/black editorial)
  - phase: 04-editorial-polish-social-seo-launch (04-CONTEXT.md)
    provides: D-01..D-05 decisions binding this plan
provides:
  - images/og-card.jpg — 1200×630 JPEG share card (owner-swappable file, zero HTML edits)
  - Complete OG/Twitter/canonical share layer on index.html + colecao.html (absolute URLs in head meta only)
  - JSON-LD Organization (SEO-05, promoted from v2-deferred per D-05)
  - sitemap.xml (home only, pt-BR owner comment) + robots.txt (allow-all + absolute sitemap line)
  - All interactive touch targets ≥44px (masthead-link, text-link, index-list a fixed; cache-bust v=8)
  - Verified reduced-motion dual-marquee pause + global :focus-visible ring (recorded, not rebuilt)
  - README owner section "Imagem de compartilhamento"
affects: [03-lookbook (adds sitemap entries + per-collection OG titles), launch (live share validation)]

# Actuals (#2632) — same estimateTokens scale (chars/4 over realized diff)
actuals:
  tokens: 8500          # chars/4 over the authored/edited text files (og-card.jpg binary excluded)
  tasks: 6
  commits: 5            # MEASURED: git rev-list --count f787a68..HEAD (5 task commits; docs commit follows)
plan_head_before: f787a68
plan_head_after: b57603a

# Tech tracking
tech-stack:
  added: [sitemap.xml (sitemaps.org 0.9), JSON-LD schema.org Organization]
  patterns: [absolute-URLs-only-in-head-meta (body stays relative), negative og-free gate on 404, class-block parse gate for touch targets, cache-bust bump on css change]

key-files:
  created:
    - images/og-card.jpg
    - sitemap.xml
    - robots.txt
  modified:
    - index.html
    - colecao.html
    - 404.html
    - css/styles.css
    - README.md
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md

key-decisions:
  - "OG card shipped as the typographic fallback drawn directly (GDI+/System.Drawing, cream #F4F4EF + black Arial-Black wordmark) — AI image generation was unavailable (no credits); owner may swap for a prettier campaign card later (documented in README)"
  - "Arrows ← → ↗ ACCEPTED-fallback: the Inter latin unicode-range carries only U+2191/U+2193; the subset genuinely lacks U+2190/2192/2197, so no unicode-range edit was made (adding codepoints without glyphs would be a fake fix) — fallback system font renders the three arrows"
  - "404 gets title + meta description ONLY — no og:, no canonical, no loaded assets (self-containment contract from Phase 1 untouched)"
  - "index-list a also fixed to ≥44px (plan audit found it ~35px at the smallest clamp) with flex-centering so glyphs stay put"
  - "sitemap lists ONLY the home (D-04): colecao.html is a placeholder destination until Phase 3 lookbook pages exist; pt-BR comment inside teaches the owner the pattern"

patterns-established:
  - "Share metadata: absolute https://oug-ranch.github.io/... URLs ONLY in canonical/og/twitter/sitemap/JSON-LD values; every body href/src stays relative (T-4-01)"
  - "Cache-bust ?v=N bumps only when css/styles.css changes (v=7 → v=8 in both pages here)"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, HERO-03, A11Y-03, PERF-03]

# Coverage metadata (#1602)
coverage:
  - id: D1
    description: "OG card asset ships: images/og-card.jpg exactly 1200×630, 30,512 B JPEG (≤300 KB), no -src file remains"
    requirement: SEO-02
    verification:
      - kind: integration
        ref: "powershell: Task 1 gate — System.Drawing dims read-back (1200×630), size assert, og:image/canonical string asserts → OG-OK"
        status: pass
    human_judgment: true
    rationale: "The card's VISUAL acceptance (wordmark reads clean, brand-correct aesthetic) is owner judgment — orchestrator verified visually, owner sign-off pending; card is a swappable placeholder, not a finished asset"
  - id: D2
    description: "Full share layer: meta description + OG/Twitter set + absolute canonical on index and colecao; 404 gains description only and stays og-free/self-contained; JSON-LD Organization on index (D-05 sameAs: instagram + store)"
    requirement: SEO-03
    verification:
      - kind: integration
        ref: "powershell: Task 2 gate — og:url/canonical/twitter asserts, negative og: gate on 404 whole-file, ld+json/Organization/sameAs asserts → SEO-OK"
        status: pass
    human_judgment: false
  - id: D3
    description: "sitemap.xml + robots.txt with absolute URLs listing only real public pages"
    requirement: SEO-04
    verification:
      - kind: integration
        ref: "powershell: Task 3 gate — home <loc> assert, 404-exclusion, absolute sitemap line → SITEMAP-OK"
        status: pass
    human_judgment: false
  - id: D4
    description: "A11Y/PERF audit: every interactive target ≥44px (masthead-link, text-link, index-list a fixed visual-neutral), reduced-motion dual-marquee pause verified, :focus-visible verified, cache-bust v=8, README OG-swap guide"
    requirement: PERF-03
    verification:
      - kind: integration
        ref: "powershell: Task 4 gate — reduced-motion block + focus rule + per-class block parse (7 classes + index-list a + drawer nav a) + v=8 asserts + README assert + U+2190 fake-fix guard → AUDIT-OK"
        status: pass
    human_judgment: false
  - id: D5
    description: "Planning docs reconciled: NAV-05 owner-declined (D-01), HERO-03/A11Y-03/PERF-03/SEO-01..05 Complete with evidence, A11Y-02 pending scoped to Phase 3, ROADMAP criterion 1 bar-half reconciled, criterion 5 framed as owner UAT"
    requirement: SEO-01
    verification:
      - kind: integration
        ref: "powershell: Task 5 gate — NAV-05 declined annotation, [x] set for the 8 completed IDs, A11Y-02 unchecked + Fase 3 note, traceability rows, ROADMAP D-01/UAT strings → ANNOT-OK"
        status: pass
    human_judgment: false
  - id: D6
    description: "OWNER UAT (pending): Meta Sharing Debugger + one real WhatsApp share test post-push; full phone end-to-end launch check runs with Phase 3 (real photos) — both are human checkpoints, not automatable"
    verification:
      - kind: manual_procedural
        ref: "ROADMAP Phase 4 criteria 2 + 5 (owner UAT framing); live site https://oug-ranch.github.io/ after Pages deploy"
      status: unknown
    human_judgment: true
    rationale: "Preview-card rendering and the phone journey cannot be proven by structural greps; deferred to owner UAT by design"

# Metrics
duration: ~10min
completed: 2026-11-13
status: complete
---

# Phase 4 Plan 01: Social SEO + Polish Summary

**Complete share/SEO layer shipped in one pass: 1200×630 brand OG card + full OG/Twitter/canonical metadata on the home and collection pages, JSON-LD Organization, sitemap.xml + robots.txt with absolute URLs, every interactive touch target ≥44px (cache-bust v=8), verified reduced-motion/focus rules, README owner guide — verified by five structural gates (OG-OK / SEO-OK / SITEMAP-OK / AUDIT-OK / ANNOT-OK).**

## Performance

- **Duration:** ~10 min
- **Completed:** 2026-11-13
- **Tasks:** 6 of 6
- **Files:** 10 (3 created: og-card.jpg, sitemap.xml, robots.txt; 7 modified)

## Accomplishments

- **Share card:** `images/og-card.jpg` — exactly 1200×630, 30,512 B (well under the 300 KB budget), cream #F4F4EF card with the giant black "OUG RANCH" wordmark + "DO CAMPO AO ROLÊ" — the file the owner later swaps for a campaign photo (same name, zero HTML edits)
- **Share layer (index + colecao):** meta description + og:type/site_name/locale/title/description/url/image(+width/height/alt) + twitter:card/title/description/image + absolute canonical — absolute URLs ONLY in head meta values; body hrefs untouched (file:// contract intact)
- **404:** title + friendly pt-BR description only — verified og-free and asset-free by a negative gate
- **SEO-05 promoted per D-05:** JSON-LD Organization on index — url = github.io, logo = og-card, sameAs = Instagram + store
- **sitemap.xml** (home only + pt-BR owner comment for Phase 3 collections) and **robots.txt** (allow-all + absolute sitemap pointer)
- **Touch targets ≥44px:** .masthead-link (~37px), .text-link (~24px) and .index-list a (~35px at smallest clamp) widened visual-neutrally (inline-flex/flex + min-height, glyphs stay put); cache-bust v=7 → v=8 on both pages
- **Verified-not-rebuilt:** reduced-motion block pauses BOTH marquee variants via the shared `.marquee-track` base class; global `:focus-visible` ring confirmed — recorded as verification, no code churn
- **README:** new "Imagem de compartilhamento" section — swap SOP (1200×630 JPEG ≤300 KB via Squoosh) + Meta Sharing Debugger check
- **Planning docs reconciled:** NAV-05 marked owner-declined (D-01, never ships), 8 requirement IDs marked Complete with evidence, A11Y-02 pending scoped to Phase 3, ROADMAP criteria 1/5 corrected (announcement bar dead; phone check = owner UAT)

## Task Commits

1. **Task 1: OG card asset + home share path end-to-end (tracer)** — `a295f7f`
2. **Task 2: Metadata for colecao.html + 404.html, JSON-LD Organization on index** — `27cd894`
3. **Task 3: sitemap.xml + robots.txt (SEO-04 completion)** — `5247fd2`
4. **Task 4: A11Y/PERF audit — touch targets, reduced-motion, focus, arrows, README** — `585ff1c`
5. **Task 5: REQUIREMENTS/ROADMAP reconciliation** — `b57603a`

**Plan metadata:** SUMMARY + STATE + ROADMAP completion committed as docs(04-01), then everything pushed to origin main.

## Decisions Made

- **OG card is the typographic fallback** (D-02): AI image generation was unavailable in this session (no generation credits), so the card was drawn directly with System.Drawing — cream #F4F4EF, giant black "OUG RANCH" (Arial Black), "DO CAMPO AO ROLÊ" below with the correct Ê (codepoint-constructed). It matches the approved home aesthetic and is the intended swappable placeholder; the owner may want a prettier campaign card later (README documents the swap with zero HTML edits).
- **Arrows ← → ↗: ACCEPTED-fallback.** The Inter latin WOFF2 unicode-range (styles.css line 27) carries U+2191/U+2193 but NOT U+2190/2192/2197 — the latin subset genuinely lacks those glyphs. Adding the codepoints would make the browser *skip* the fallback and show tofu — a fake fix. Verified honestly; fallback system font renders the arrows; nothing changed. (Carried from the Phase 1 review item.)
- **404 stays byte-simple:** a 404 page is never shared, so it gets title + description only; negative gate proves zero `og:` strings and zero loaded assets.
- **index-list a also widened:** the plan named masthead-link and text-link, but the audit found .index-list a ~35px at the smallest clamp — fixed the same visual-neutral way (PERF-03 "any other class below 44px").
- **colecao.html og:type = website:** it is a placeholder page, not an article; per-collection OG titles arrive with the real lookbook pages in Phase 3 (HTML comment in the file).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] 404 negative gate over-matched its own prose**
- **Found during:** Task 2 (verify run)
- **Issue:** First gate drafts matched the words "canonical" and "./css" inside 404.html's pre-existing Phase-1 COMMENT text (which documents the self-containment rule) — prose, not loaded assets
- **Fix:** Gate scoped to real artifacts: `rel="canonical"`, `<link>`, `<script src=`, `<img` — no gate weakened (negative assertions strengthened)
- **Files modified:** none in repo (gate script only)
- **Verification:** SEO-OK, exit 0
- **Committed in:** n/a

**2. [Rule 3 - Blocking] Touch-target gate alternative for width/height**
- **Found during:** Task 4 (verify run)
- **Issue:** .hamburger/.drawer-close satisfy 44px via `width/height: var(--touch-min)`, but the gate initially demanded `min-height:` or literal `44px`
- **Fix:** Gate accepts the plan's stated alternative ("explicit 44px width/height") — assertion intent unchanged
- **Committed in:** n/a

---

**Total deviations:** 2 auto-handled gate-scoping fixes (no repo impact) + 0 code deviations.
**Impact on plan:** None — plan executed as written; all six tasks green.

## Issues Encountered

- PowerShell 5.1 parses `&&` as an invalid separator and reads BOM-less .ps1 as ANSI — scripts written ASCII-safe, accented content asserted via codepoint prefixes (`'Essa p'`)
- `throw "$page: ..."` interpolated `$page:` as a scoped variable — fixed with `${page}`

## User Setup Required

Post-push owner checks (live, not automatable):
1. **Meta Sharing Debugger** (developers.facebook.com/tools/debug/) on `https://oug-ranch.github.io/` — confirms the preview card pulls `images/og-card.jpg` (also forces the crawler to refresh after future swaps)
2. **One real WhatsApp share test** — paste the home URL in a chat and eyeball the card (ROADMAP criterion 2 — owner/live)
3. Full phone end-to-end launch check = **owner UAT at Phase 3** (criterion 5)

## Next Phase Readiness

- Phase 3 (lookbook) remains **BLOCKED on owner photos** — this plan changes nothing about that
- When Phase 3 ships real lookbook pages: add one sitemap `<url>` entry per collection page (pt-BR comment inside sitemap.xml teaches the pattern) and per-collection OG titles on the lookbook template
- A11Y-02 (scrim over photos) executes with Phase 3 real photos; text-shadow mitigation already shipped on photo covers (02-01)
- Known non-issue carried forward: `.card` targets are huge editorial tiles; lightbox controls land with Phase 3 and inherit the ≥44px convention

## Self-Check: PASSED

- All 10 files exist and are committed (a295f7f, 27cd894, 5247fd2, 585ff1c, b57603a)
- All five sentinels printed in one final run (OG-OK, SEO-OK, SITEMAP-OK, AUDIT-OK, ANNOT-OK), exit 0

---
*Phase: 04-editorial-polish-social-seo-launch*
*Completed: 2026-11-13*
