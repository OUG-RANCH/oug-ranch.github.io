# Phase 3: Lookbook Pages & Lightbox - Context

**Gathered:** 2026-11-13
**Status:** BLOCKED — waiting on owner photos (owner decision: "Esperar as fotos")

<domain>
## Phase Boundary

Generic lookbook page (`lookbook.html?c=slug` or the existing `colecao.html` — planner picks) showing collection title + story at top, photo stack in a single scrolling column on mobile, grid on desktop, with a full lightbox (prev/next/close, Esc, click-outside, swipe on mobile), Voltar link (deep-link safe), and friendly Portuguese states for bad slugs / corrupt data / missing photos (PLAT-04).

**Owner decision 2026-11-13: phase execution waits for real collection photos** ("daqui uns meses"). Do NOT build placeholder-block lookbooks. When photos arrive, resume planning from this CONTEXT — the visual decisions below are already locked, so planning can be fast.

</domain>

<decisions>
## Implementation Decisions

### Captured in this discussion
- **D-01:** Each lookbook photo can carry its own caption/legend, written by the owner in the data file ("Com legenda" — owner explicitly chose captions per photo, unlike the home cards where the caption is the collection story). Data shape: photo entries get an optional `caption` field; empty = clean photo.
- **D-02:** Desktop grid = **3 photos per line** (owner chose 3 over 2 and 1). Mobile stays single-column vertical scroll (project core value, already locked in PROJECT.md).
- **D-03:** No placeholder build — the lookbook page ships only when real photos exist. (Supersedes the "build now with tonal blocks" default.)

### Carried forward from earlier phases (do not re-ask)
- **From Phase 1/2 (binding):** classic scripts only, file://-safe, relative paths, creme/café/caramelo tokens, Inter only, legend = café full opacity, cache-bust `?v=N` on every css/styles.css change, cards open `colecao.html?c=slug` (if the page gets renamed to lookbook.html, update ALL card hrefs + 404/README references in the same commit), friendly-error pattern (`.cards-error`), createElement/textContent rendering with slug guard, `?c=` query parsing with hasOwnProperty guard.
- **From Phase 2 data system:** `js/collections.js` is the single owner data file — photo lists belong there (per-collection `photos` array) or in per-collection `collections/<slug>/data.js`; planner decides, owner edits ONE place either way. Photo folder convention: `images/collections/<slug>/`.
- **Roadmap success criterion 5 (iPhone real-device lightbox check)** needs the OWNER's phone — schedule as UAT when the phase runs, not automatable.

### the agent's Discretion
- GLightbox (vendored, per stack doc) vs hand-rolled <dialog> lightbox — planner decides with the stack constraint (no CDN, vendored files in js/vendor/ + css/vendor/, works on file://).
- URL: keep `colecao.html` vs rename to `lookbook.html` (roadmap names lookbook.html; cards + README + any shared links must stay consistent — renaming is a one-commit mechanical change).
- Photo sizing convention (reuse README § Squoosh: ~900px WebP variants, per-photo width/height annotated by owner).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning
- `.planning/ROADMAP.md` § Phase 3 — goal + 5 success criteria (criterion 5 = real-iPhone UAT)
- `.planning/REQUIREMENTS.md` — LOOK-01..04, PLAT-04 definitions
- `.planning/phases/02-home-page-collections-brand-info/02-CONTEXT.md` — data system decisions that phase 3 builds on
- `.planning/phases/02-home-page-collections-brand-info/02-01-SUMMARY.md` — shipped render/data patterns
- `AGENTS.md` § Technology Stack — GLightbox vendoring, photo delivery, no-CDN rule

### Code patterns (binding)
- `js/collections.js` + `js/collections-render.js` — data + guarded render pattern to extend
- `colecao.html` — current placeholder page (slug map, hasOwnProperty guard, generic state)
- `css/styles.css` — tokens + card-cover layout patterns
- `README.md` — owner guide (photo naming/export SOP to extend for lookbook photos)
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `colecao.html` — already parses `?c=slug` with prototype-safe guard and shows a generic state; becomes the lookbook page
- `js/collections.js` — data file gains a per-collection `photos` array (slug, caption, w/h); template comment teaches the owner
- `.cards-error` CSS pattern — reuse for lookbook friendly states
- README Squoosh SOP — extend with lookbook photo naming (`01.webp`, `02.webp`… order = display order)

### Established Patterns
- data-before-logic script order (defer); cache-bust ?v=N; no innerHTML; aria-hidden decorative; rel=noopener externals

### Integration Points
- Home cards link colecao.html?c=slug → lookbook page reads the same slug + data
- PLAT-04 corrupt-data guard: home error pattern generalizes to the lookbook page
</code_context>

<specifics>
## Specific Ideas

- Owner: "Esperar as fotos" — do not build with placeholders.
- Owner: "Com legenda" — per-photo captions, owner-written.
- Owner: "3 por linha" — desktop grid.
- When photos arrive: owner drops files into `images/collections/<slug>/` + lists them in the data file (planner makes this 2 steps max, mirroring PLAT-02's philosophy).
</specifics>

<deferred>
## Deferred Ideas

- Phase execution itself — deferred until owner delivers real photos (months away).
- Real-iPhone lightbox UAT — happens when the phase executes.
</deferred>

---

*Phase: 03-lookbook-pages-lightbox*
*Context gathered: 2026-11-13*
