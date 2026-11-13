---
phase: 02-home-page-collections-brand-info
plan: 01
subsystem: ui
tags: [static-site, github-pages, vanilla-js, data-driven-dom, classic-scripts, hover-zoom, owner-guide]

# Dependency graph
requires:
  - phase: 01-foundation-scaffold-design-system-navigation
    provides: approved card markup/CSS contract (.card > .card-cover.cover-N > .card-title + .card-story), data-before-logic script convention, tokens, README owner guide
provides:
  - `js/collections.js` — owner-editable collection data file (`window.OUG_COLLECTIONS`, classic script, commented Portuguese TEMPLATE entry)
  - `js/collections-render.js` — safe DOM renderer (createElement/textContent/setAttribute only, slug guard, friendly error path)
  - Empty `#cardsMount` on the `.cards` strip in index.html; script order data → render → main.js (all defer)
  - Photo-cover path ready: `card-cover--photo` img with width/height + lazy + object-fit (PERF-02), zero visual change today
  - Desktop hover-capable subtle zoom (1.02 tile / 1.03 photo) with prefers-reduced-motion kill switch; cache-bust v=6
  - README section "Adicionar ou reordenar coleções" (two-step owner flow)
affects: [03-lookbook (consolidates colecao.html onto the shared data file), 04-polish (BRAND re-evaluation)]

# Actuals (#2632) — same estimateTokens scale (chars/4 over realized diff)
actuals:
  tokens: 4864          # chars/4 over git diff b8d51ee..HEAD (19,457 chars); 6 files changed
  tasks: 5
  commits: 6            # MEASURED: git rev-list --count b8d51ee..HEAD (5 task commits + 1 docs commit)
plan_head_before: b8d51eed32782bde4e06c542f64875b6275c346a
plan_head_after: c2216bb

# Tech tracking
tech-stack:
  added: []   # zero new dependencies — vanilla static per stack constraint
  patterns: [window-global classic data script, createElement/textContent-only DOM insertion, slug regex guard with skip+console.warn, cover-empty-vs-photo render branch, hover-capable media query zoom, cache-bust ?v=N bump]

key-files:
  created:
    - js/collections.js
    - js/collections-render.js
  modified:
    - index.html
    - css/styles.css
    - colecao.html
    - README.md
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Single data file js/collections.js (window.OUG_COLLECTIONS plain array with order field) over per-collection collections/<slug>/data.js — D-01 planner pick: fewest concepts for a non-expert owner, order visible at a glance (justification recorded in plan objective)"
  - "No noscript duplication of cards — the data file is itself a script, so a fallback copy would triplicate approved texts and drift; no-JS shows the section title only; friendly-error path covers broken data (planner discretion item)"
  - "Reduced-motion zoom kill switch placed in a co-located prefers-reduced-motion block next to the card styles (not the global top block) — functionally identical, keeps component rules together for the owner"
  - "All data-driven img/link attributes set via setAttribute (not reflected properties) — matches threat T-2-01 mitigation verbatim"

requirements-completed: [COL-01, COL-02, COL-03 (annotated superseded-by-owner, D-06 — no code, checkbox untouched), COL-04, PLAT-02, PERF-02; BRAND-01..04 annotated deferred (D-08), checkboxes untouched]

# Coverage metadata (#1602)
coverage:
  - id: D1
    description: "Home cards fully data-driven: js/collections.js (4 entries, locked order, verbatim pt-BR stories) + renderer paints byte-equivalent approved card DOM; cards exist only at runtime (no <a> in shipped cards container)"
    requirement: COL-01
    verification:
      - kind: integration
        ref: "powershell: Task 1 <verify> (node --check + require + field/order assertions) -> DATA-SHAPE-OK, DATA-OK"
        status: pass
      - kind: integration
        ref: "powershell: Task 2 <verify> (script order IndexOf chain, empty #cardsMount, no <a\\s in cards container, renderer structural checks) -> RENDER-OK"
        status: pass
      - kind: behavioral
        ref: "DOM-shim simulation in node: renderer eval'd against minimal createElement/classList shim — 4 cards in locked order, verbatim stories, href colecao.html?c=<slug>, role=heading aria-level=3; photo-entry branch emits img with src/width=900/height=1125/lazy/async/alt"
        status: pass
    human_judgment: false
  - id: D2
    description: "Order governed by `order` number (lower = first); invalid slug skipped with console.warn; missing/corrupt/empty data renders friendly Portuguese .cards-error message — never a blank section"
    requirement: COL-02
    verification:
      - kind: behavioral
        ref: "DOM-shim simulation modes: ok / empty([]) / badsyn(undefined) / badslug('SERRA BRUTA') — error message path and skip+warn path exercised"
        status: pass
    human_judgment: false
  - id: D3
    description: "Hover zoom (D-07/COL-04) + photo-cover treatment (D-04/PERF-02): overflow-hidden tile, object-fit cover img, desktop (hover:hover) scale 1.02/1.03, reduced-motion kill switch, .cards-error style, cache-bust v=6 both pages"
    requirement: PERF-02
    verification:
      - kind: integration
        ref: "powershell: Task 3 <verify> (6 CSS structural checks + v=6 both pages, no stale v=5) -> ZOOM-OK"
        status: pass
    human_judgment: false
  - id: D4
    description: "README teaches the two-step flow (photos folder + TEMPLATE data entry) without duplicating the Squoosh SOP; reordering = order numbers only"
    requirement: PLAT-02
    verification:
      - kind: integration
        ref: "powershell: Task 4 <verify> (accented heading + file paths + TEMPLATE + order + Squoosh ref) -> COLLECTIONS-GUIDE-OK"
        status: pass
    human_judgment: false
  - id: D5
    description: "REQUIREMENTS.md annotated: COL-03 superseded-by-owner (D-06 stacked mobile), BRAND-01..04 deferred (D-08) — checkboxes untouched, no other line altered"
    requirement: COL-03
    verification:
      - kind: integration
        ref: "powershell: Task 5 <verify> (COL-03 superseded + 4 BRAND deferred matches) -> REQ-ANNOT-OK"
        status: pass
    human_judgment: false
  - id: D6
    description: "Visual/functional spot checks: file:// double-click renders 4 cards matching approved visuals, drawer/carousel work, console clean; mobile stacked full-width; desktop arrows only on overflow; hover zoom subtle; reduced-motion kills zoom; live Pages check"
    verification:
      - kind: manual_procedural
        ref: "plan <verification> manual spot checks (file://, narrow viewport, desktop window, colecao.html?c=serra-bruta, renamed-script error case)"
      - kind: manual_procedural
        ref: "live-site check post-push (ougranch.github.io) — happens after this plan's push"
    status: unknown
    human_judgment: true
    rationale: "No real browser available in this execution environment; renderer logic verified behaviorally via DOM-shim simulation and colecao.html's inline map confirmed untouched by diff (only ?v=6). Visual/interaction checks route to the post-push live-site check and owner review — stated honestly per plan binding constraints"

# Metrics
duration: 8min
completed: 2026-11-13
status: complete
---

# Phase 2 Plan 01: Data-Driven Collections Summary

**Home collections converted from hardcoded markup to owner-editable data: `js/collections.js` (classic `window.OUG_COLLECTIONS` array with Portuguese TEMPLATE entry) + `js/collections-render.js` (createElement/textContent-only renderer with slug guard and friendly error path) + empty `#cardsMount` on the `.cards` strip, plus approved-visual-preserving CSS for the photo-cover and desktop hover zoom (cache-bust v=6), README "Adicionar ou reordenar coleções" and REQUIREMENTS annotations (COL-03 superseded, BRAND deferred).**

## Performance

- **Duration:** 8 min (15:55→16:05 -03:00; all six sentinels green at close)
- **Started:** 2026-11-13 ~15:55 (-03:00)
- **Completed:** 2026-11-13 16:05 (-03:00)
- **Tasks:** 5 of 5
- **Files modified:** 7 (2 created, 5 edited)

## Accomplishments
- **Task 1** — `js/collections.js`: classic-script `window.OUG_COLLECTIONS` array, 4 entries in the locked order (SERRA BRUTA 1, GALPAO 78 2, ESTRADA DE TERRA 3, CHEGADA BOIADEIRA 4) with the approved pt-BR stories **verbatim**, empty `cover`/`coverAlt`/`coverW`/`coverH` ready for real photos, and a commented Portuguese TEMPLATE entry teaching every field with `order: 5` as the next position
- **Task 2 (tracer)** — `js/collections-render.js` + index.html mount: cards painted at runtime only; createElement/textContent/setAttribute exclusively (no innerHTML anywhere — T-2-01); slug validated `^[a-z0-9-]+$` with skip+console.warn; cover-empty → tonal `cover-1..4` by position (pixel-identical to approved), cover-filled → `card-cover--photo` img with width/height/lazy/async (PERF-02); friendly Portuguese `.cards-error` on missing/corrupt/empty data; script order data → render → main.js all defer so the carousel's `update()` measures the rendered strip
- **Task 3** — CSS: `overflow: hidden` on the tile, `object-fit: cover` photo treatment preserving the 4/5 and 3/4 tiles, desktop-only subtle zoom at 1.02 (tile) / 1.03 (photo) gated on `min-width: 768px and (hover: hover)`, reduced-motion kill switch, `.cards-error` style; cache-bust bumped to `?v=6` on both pages, no stale `v=5`
- **Task 4** — README section "Adicionar ou reordenar coleções": two-step flow (photos via regra nº 2 Squoosh into `images/collections/<slug>/` + TEMPLATE data entry), order-number reordering, defer to the existing update SOP
- **Task 5** — REQUIREMENTS.md annotations with decision dates and 02-CONTEXT references; checkboxes untouched (shared-ID rule)

## Task Commits

Each task was committed atomically on `main`:

1. **Task 1: Create js/collections.js — owner-editable data file with Portuguese template entry** - `f56c652` (feat)
2. **Task 2 (TRACER): Render script + index.html mount — data file to visible cards end-to-end** - `e9baaa0` (feat)
3. **Task 3: Hover zoom CSS (D-07) + photo-cover styles (D-04/PERF-02) + cache-bust v=6** - `cf3af47` (feat)
4. **Task 4: README section — "Adicionar ou reordenar coleções"** - `3f4e552` (feat)
5. **Task 5: REQUIREMENTS.md annotations — COL-03 superseded, BRAND-01..04 deferred (D-06/D-08)** - `c2216bb` (docs)

**Plan metadata:** committed together with SUMMARY + state updates (docs commit, see below), then pushed to origin main.

## Tracer Feedback Gate

Task 2 (tracer) verified end-to-end before expansion: full renderer logic exercised under a DOM-shim simulation in four modes (healthy data, empty array, undefined/corrupt, invalid slug) plus the photo-entry branch — all paint exactly the approved DOM or the friendly error message. ⚡ Tracer verified — expanding.

## Files Created/Modified
- `js/collections.js` - owner data list + commented TEMPLATE block (D-01/D-02/D-05)
- `js/collections-render.js` - safe renderer: validation, order sort, slug guard, cover branch, friendly error (T-2-01 mitigations)
- `index.html` - hardcoded cards → empty `#cardsMount` directly on `.cards`; three defer scripts in data → render → logic order; v=6
- `css/styles.css` - overflow-hidden tile, photo-cover object-fit, hover-capable zoom 1.02/1.03, reduced-motion kill switch, `.cards-error` (48 lines added, tokens untouched)
- `colecao.html` - stylesheet cache-bust `?v=6` only (inline slug map untouched — Phase 3 consolidates)
- `README.md` - new owner-guide section (PLAT-02/D-02)
- `.planning/REQUIREMENTS.md` - COL-03 + BRAND-01..04 annotations (D-06/D-08)

## Decisions Made
- **Single data file** (D-01 planner pick): one `js/collections.js` beats per-folder files at 4 collections — one place to edit, order visible at a glance
- **No noscript card duplication**: data file is itself a script; a fallback would triplicate approved texts and drift. No-JS shows the section title only; broken data shows the friendly message
- **setAttribute over reflected properties** for all data-driven img/link attributes — matches the threat register's mitigation wording verbatim
- **Co-located reduced-motion block**: the zoom kill switch lives in its own `prefers-reduced-motion` block next to the card styles (not in the global top block) — functionally identical, easier for the owner to find

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Verify-gate IndexOf order inverted by a comment**
- **Found during:** Task 2 (verify run)
- **Issue:** The cards-block comment mentioned `js/collections-render.js` before `js/collections.js`, so the gate's `IndexOf` order chain failed even though the actual script tags were in the correct order
- **Fix:** Comment reworded to mention `js/collections.js` first — script tags unchanged, gate passes unweakened
- **Files modified:** index.html (comment only)
- **Verification:** `RENDER-OK`, exit 0
- **Committed in:** `e9baaa0`

**2. [Rule 2 - Missing critical] Data-driven img/link attributes moved to setAttribute**
- **Found during:** Task 2 (behavioral photo-branch check)
- **Issue:** First draft set `img.src`/`img.loading`/`card.href` as reflected properties — works in browsers, but the threat register T-2-01 mitigation specifies createElement/textContent/setAttribute for data-driven fields; reflected-property assignment for `src` also risks relative-resolution edge cases
- **Fix:** All data-driven attributes set via setAttribute
- **Files modified:** js/collections-render.js
- **Verification:** photo-branch shim check (src/width=900/height=1125/loading=lazy/decoding=async/alt="") + `RENDER-OK` re-run
- **Committed in:** `e9baaa0`

---

**Total deviations:** 2 auto-handled (1 blocking-gate, 1 hardening). No scope creep; no architectural changes.

## Issues Encountered
- No real browser available in this execution environment: the file:// double-click check (plan Task 2 done-line and <verification> manual spot checks) could not be run live. Compensations: node --check on both scripts, all six structural PowerShell gates, and a DOM-shim behavioral simulation covering the healthy/error/slug-guard/photo paths. **Marked unverified-live in coverage D6 — the live-site check happens post-push** on https://oug-ranch.github.io/ (owner/next session confirms visuals, mobile stacking, desktop arrows/hover/reduced-motion, and the colecao.html map).

## Known Stubs

None. All interactive behavior shipped is real; empty `cover` fields are intentional content placeholders per D-04 (owner fills when photos arrive in months), fully wired with the photo render path already implemented and tested.

## User Setup Required

None - no external service configuration required. (Push to origin main is executed by this plan per the dispatch; the live-site visual check follows the push.)

## Next Phase Readiness
- Phase 3 (lookbook) can start immediately: the shared data file, slug convention, `images/collections/<slug>/` folder rule, and the friendly-error pattern (PLAT-04 early ground) are all in place; Phase 3 should consolidate colecao.html's inline slug map onto `js/collections.js` (its duplication is documented in the plan context)
- COL-03 stays closed as an annotation — no swipe/carousel code to build; the stacked mobile behavior is the requirement
- BRAND-01..04 re-evaluate at Phase 4 or next milestone when the owner supplies real contact info (D-08)

## Self-Check: PASSED
- All 7 plan files exist and are committed (`f56c652`, `e9baaa0`, `cf3af47`, `3f4e552`, `c2216bb` + docs commit)
- All six verify sentinels printed and exited 0: DATA-SHAPE-OK, DATA-OK, RENDER-OK, ZOOM-OK, COLLECTIONS-GUIDE-OK, REQ-ANNOT-OK
- Behavioral simulation passed in all 5 modes (healthy, empty, corrupt, bad-slug, photo-entry)

---
*Phase: 02-home-page-collections-brand-info*
*Completed: 2026-11-13*
