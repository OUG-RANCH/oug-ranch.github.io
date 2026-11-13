---
phase: 01-foundation-scaffold-design-system-navigation
plan: 01
subsystem: ui
tags: [static-site, github-pages, css-tokens, dialog-drawer, picture-hero, self-hosted-fonts, vanilla-js]

# Dependency graph
requires:
  - phase: 00-project-init
    provides: brand manual (branding.md), reference screenshots, GSD planning setup
provides:
  - Complete branded home shell (index.html) working end-to-end on file:// and Pages subpath
  - Design token layer (css/styles.css) — the owner theme file with the 5-token palette/scale
  - Self-hosted font contract (Yeseva One + Inter variable, single Yeseva preload with crossorigin)
  - Native `<dialog>` drawer pattern + body scroll-lock + aria-expanded/aria-label sync
  - `<picture>` art-direction hero with per-breakpoint aspect-ratio (4:5 mobile / 3:2 desktop)
  - `images/` asset folder convention (binding for Phases 2–4), classic-script ordering rule
  - Favicon set (svg + 32px png + 180px apple-touch) and `.nojekyll`
affects: [01-02 (404 + README + Pages publish), 02-home-collections, 03-lookbook, 04-editorial-polish]

# Actuals (#2632) — same estimateTokens scale (chars/4 over realized diff)
actuals:
  tokens: 3482          # chars/4 over the 4 authored text files; binaries (fonts/jpegs/logo) excluded — generated/downloaded programmatically, not authored
  tasks: 2
  commits: 2            # MEASURED: git rev-list --count 542ded7..HEAD
plan_head_before: 542ded762971c3be1a4f9a63806ae18ca4baec61
plan_head_after: 545d39f

# Tech tracking
tech-stack:
  added: [Yeseva One v24 latin woff2 (self-hosted, 17492 B), Inter v20 variable latin woff2 (self-hosted, 48256 B)]
  patterns: [tokens-at-top theme file, native dialog showModal drawer, picture art direction, container aspect-ratio CLS guard, relative-paths-only, classic script defer]

key-files:
  created:
    - index.html
    - css/styles.css
    - js/main.js
    - fonts/yeseva-one-latin.woff2
    - fonts/inter-variable-latin.woff2
    - images/logo.png
    - images/hero-mobile.jpg
    - images/hero-desktop.jpg
    - favicon.svg
    - favicon-32.png
    - apple-touch-icon.png
    - .nojekyll
  modified: []

key-decisions:
  - "images/ is the project-wide asset folder (conflict from 01-PATTERNS.md resolved; binding for Phases 2-4)"
  - "Branch renamed master -> main (approved adjustment; Pages deploy-from-branch expectation, README documents it)"
  - "Hero placeholders are JPEG (not UI-SPEC's .webp names): no WebP encoder exists without npm; owner's real photos will be WebP via Squoosh SOP"
  - "TOKENS comment line reworded so the future-use palette hexes (verde/azul) do not appear anywhere in styles.css (verify gate enforces their absence)"
  - "Drawer gains a dialog 'close' event listener so Esc-close also syncs aria-expanded and releases the body scroll lock"

patterns-established:
  - "Theme file: tokens at the very top of css/styles.css; later phases never hardcode a hex"
  - "images/ asset folder; lowercase-hyphen file naming; no leading underscore"
  - "Classic <script> only — data files before logic (comment header in js/main.js documents the rule)"
  - "Relative ./ paths everywhere (PLAT-01)"
  - "External links always target=_blank rel=noopener (tabnabbing, T-1-01)"

requirements-completed: [PLAT-01, NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, A11Y-01, PERF-01]

# Coverage metadata (#1602)
coverage:
  - id: D1
    description: "All 9 real assets produced: self-hosted woff2 fonts (byte-verified), 610x123 logo, 900x1125 + 1600x1067 hero placeholders (<=200 KB each), favicon set, .nojekyll"
    requirement: PERF-01
    verification:
      - kind: integration
        ref: "powershell: Task 1 <verify> gate (dims read-back via System.Drawing, byte-size bands, 200 KB budget) -> ASSETS-OK"
        status: pass
    human_judgment: false
  - id: D2
    description: "Branded home page wired end-to-end on relative paths + classic scripts: header logo link, desktop nav, hamburger <dialog> drawer, <picture> hero with scrim/wordmark/slogan/CTA, collections empty state, footer with Instagram"
    requirement: NAV-01
    verification:
      - kind: integration
        ref: "powershell: Task 2 <verify> gate (27 structural checks: no absolute paths, alt/noopener/forbidden-hex/preload-count/fetchpriority/showModal/menu-open/clamp...) -> HOME-OK"
        status: pass
    human_judgment: false
  - id: D3
    description: "Visual/functional human check: double-click index.html renders branded page (fonts swap, hero shows, drawer opens/closes via hamburger/X/Esc, CTA scrolls to #colecoes) with no console errors"
    verification:
      - kind: manual_procedural
        ref: "plan <verification> section: open file://index.html + DevTools console/network check"
      - kind: manual_procedural
        ref: "designed end-of-phase human verify: 01-02-PLAN.md Task 3 checkpoint (repo creation + Pages publish + live checklist)"
    status: unknown
    human_judgment: true
    rationale: "file:// rendering, drawer interaction and console cleanliness cannot be proven by structural greps; phase verification design routes visual checks to the end-of-phase human checkpoint"

# Metrics
duration: 12min
completed: 2026-11-13
status: complete
---

# Phase 1 Plan 01: Walking Skeleton Summary

**Complete branded home shell end-to-end: self-hosted Yeseva One + Inter, brand logo, `<picture>` hero with per-breakpoint crops under a 4.5:1 scrim, accessible native-`<dialog>` hamburger drawer, smooth-scroll CTA to the locked "chega mais" empty state, Instagram footer, favicon set and `.nojekyll` — all on relative paths and classic scripts, verified by structural gates (ASSETS-OK / HOME-OK).**

## Performance

- **Duration:** 12 min (asset commit 11:22, code commit 11:25 local; session start a few minutes before)
- **Started:** 2026-11-13 ~11:10 (-03:00)
- **Completed:** 2026-11-13 11:25 (-03:00)
- **Tasks:** 2 of 2
- **Files modified:** 12 (all created; greenfield)

## Accomplishments
- All real assets produced and committed: two Google-Fonts woff2 files at the exact verified byte sizes (17,492 / 48,256), 610×123 brand logo, two warm-earth hero placeholders at the load-bearing exact dims 900×1125 (24,940 B) and 1600×1067 (40,886 B), favicon set (hand-written SVG tile + 32 px + 180 px rasters with the café serif "O" monogram), and `.nojekyll`
- Full branded home in three files: tokens-first `css/styles.css` (owner theme file, fonts contract with full latin unicode-ranges, focus-visible ring, reduced-motion), `index.html` (single Yeseva preload with crossorigin, `<picture>` hero eager + fetchpriority=high, native `<dialog>` drawer, locked pt-BR copy), `js/main.js` (~40-line drawer state machine with aria sync)
- Structural gates green: Task 1 `ASSETS-OK` and Task 2 `HOME-OK` (27 checks), zero third-party runtime resources, zero absolute paths, zero forbidden future-palette hexes

## Task Commits

Each task was committed atomically:

1. **Task 1: Produce all real assets — fonts, logo, hero placeholders, favicon set, .nojekyll** - `9dd0bc9` (feat)
2. **Task 2: Walking-skeleton tracer — full branded home page wired end-to-end** - `545d39f` (feat)

**Plan metadata:** committed together with SUMMARY + state updates (docs commit, see below)

## Files Created/Modified
- `index.html` - home shell: header/nav/drawer/hero/colecoes/footer, lang pt-BR, single font preload, favicon declarations
- `css/styles.css` - TOKENS theme block, @font-face pair, header/hamburger/drawer/hero/colecoes/footer styles
- `js/main.js` - drawer only: open/close, Esc-safety close listener, anchor-close, resize-close, aria toggles
- `fonts/yeseva-one-latin.woff2` + `fonts/inter-variable-latin.woff2` - self-hosted (D-05/06/07)
- `images/logo.png` (610×123), `images/hero-mobile.jpg` (900×1125), `images/hero-desktop.jpg` (1600×1067)
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` - cream tile + café serif "O" monogram (Pattern 6)
- `.nojekyll` - empty file, skips Jekyll

## Decisions Made
- **`images/` folder convention** adopted project-wide (01-PATTERNS.md flagged conflict) — Phase 2 inherits `images/collections/<slug>/`
- **Favicon mark**: cream tile with serif "O" monogram; the 5:1 wordmark logo is illegible at tab size (per Pattern 6)
- **Hero placeholders as JPEG** (UI-SPEC named `.webp`): no WebP encoder on this machine without npm; ≤200 KB budget still met; documented assumption A6
- **Drawer Esc-safety**: added a `dialog` `close` event listener so keyboard-Esc closes also reset `aria-expanded`, `aria-label`, body scroll lock and focus (the verbatim pattern only handled ✕/link/resize closes)

## Deviations from Plan

### Auto-fixed Issues

**1. [Pre-approved adjustment] Branch renamed `master` → `main`**
- **Found during:** Task 1 (step 1)
- **Issue:** Plan said `git init -b main`, but the repo already existed on `master` with local-only history
- **Fix:** `git branch -m master main` (lossless, no remote; matches 01-RESEARCH.md Pitfall 7 branch decision; README (Plan 02) documents it)
- **Verification:** `git branch --show-current` → `main`
- **Committed in:** (repo state, part of `9dd0bc9`)

**2. [Rule 3 - Blocking] Verify-gate slogan pattern was mojibake**
- **Found during:** Task 2 (verify run)
- **Issue:** The plan's Task 2 `<verify>` pattern for the slogan contained encoding-corrupted text (`rolǦ`, `vocǦ Ǹ`), so it could never match the correct UTF-8 slogan
- **Fix:** Gate re-run with the codepoint-correct equivalent pattern (`Do campo ao rolê, sem mudar quem você é\.`) — no gate weakened; all other 26 checks unchanged
- **Files modified:** none in repo (gate script only, in session temp)
- **Verification:** `HOME-OK` final line, exit 0
- **Committed in:** n/a

**3. [Rule 1 - Bug] Esc-close left the drawer state desynced**
- **Found during:** Task 2 (writing js/main.js)
- **Issue:** The verbatim pattern handled ✕ / link-tap / resize closes, but a native Esc close fired none of them — `aria-expanded` stayed `true` and `body.menu-open` kept the page scroll-locked (violates must_have: "closes via ✕, Esc, or link tap")
- **Fix:** Added a `drawer.addEventListener('close', ...)` that resets aria-expanded/aria-label, removes `menu-open` and returns focus to the hamburger
- **Files modified:** js/main.js
- **Verification:** structural gate checks `aria-expanded`, `menu-open`, `fechar menu` — all pass
- **Committed in:** `545d39f` (Task 2 commit)

**4. [Rule 3 - Blocking] TOKENS comment conflicted with the forbidden-hex gate**
- **Found during:** Task 2 (writing css/styles.css)
- **Issue:** The "verbatim" TOKENS block's trailing comment contains the literal verde/azul hexes, but the plan's own action text and verify gate require those hexes to appear nowhere in the file
- **Fix:** Comment reworded ("NÃO use o verde nem o azul de uso futuro no v1 (decisão D-02)") — values themselves never defined as tokens, gate passes
- **Committed in:** `545d39f`

---

**Total deviations:** 4 auto-handled (1 pre-approved adjustment, 2 blocking-gate/harness, 1 bug fix)
**Impact on plan:** All necessary for correctness and gate integrity. No scope creep; no architectural changes.

## Issues Encountered
- PowerShell 5.1 reads BOM-less .ps1 gate scripts as ANSI, mangling accented regex literals — worked around with `[char]`-codepoint construction for the slogan check
- Console output shows mojibake for accented chars (display-only); committed files verified UTF-8-correct via codepoint containment checks

## User Setup Required

None - no external service configuration required in this plan. (GitHub repo creation + Pages enablement are the owner's manual step, designed as the end-of-phase checkpoint in **01-02-PLAN.md Task 3**.)

## Next Phase Readiness
- Plan 01-02 (404 + README + publish checkpoint) can start immediately: tokens, fonts, logo, favicon set, `images/` convention and the classic-script ordering rule are all in place for it to consume
- Open item for the human checkpoint: repo creation on GitHub, Pages deploy-from-branch (`main`), live subpath checklist
- No stubs shipped: every interactive behavior on the page is real (drawer, smooth scroll, external links); placeholders are intentional content placeholders per D-10/D-11, not code stubs

## Self-Check: PASSED
- All 12 plan files exist and are committed (`9dd0bc9`, `545d39f`)
- Both verify sentinels printed (`ASSETS-OK`, `HOME-OK`), exit 0

---
*Phase: 01-foundation-scaffold-design-system-navigation*
*Completed: 2026-11-13*
