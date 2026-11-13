# Phase 2: Home Page — Collections & Brand Info - Context

**Gathered:** 2026-11-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the home collections **data-driven**: the four approved collection cards stop being hardcoded HTML and start rendering from an owner-editable data file (`collections/js` classic-script pattern), so the owner can add/reorder collections and later drop in real photos without touching markup. Collection pages themselves (lookbook with photo stacks) remain **Phase 3** — cards keep opening `colecao.html?c=slug` placeholders.

The **brand info section** (sobre a marca + Instagram/WhatsApp/e-mail) was **deferred by the owner** — real contact info and real photos arrive "daqui uns meses". It does NOT ship in this phase.

**Reality correction vs roadmap:** the owner-approved home rebuild (Phase 1 fix rounds) already delivered most of this phase's visual scope (ciena-style cover cards with legend inside, section title, horizontal paging on desktop). This phase converts that approved markup into a data-driven system **without changing the approved visuals**.

</domain>

<decisions>
## Implementation Decisions

### Data system (core of this phase)
- **D-01:** Collections render from a classic-script data file (pattern: `collections/<slug>/data.js` or a single `js/collections.js` setting `window.OUG_COLLECTIONS` — planner/researcher pick per the stack doc constraint: must work on `file://`, NO fetch/ES modules). Each entry: slug, title, story (existing approved texts verbatim), cover image path (optional/empty for now), order position. — **Reversibility:** reversible — markup fallback keeps site working.
- **D-02:** Adding a collection = one data-file entry + one photo folder (PLAT-02). The data file ships with a **commented template entry** in Portuguese teaching the owner exactly what to fill (README points to it).
- **D-03:** Collection order = array order in the data file (COL-02 "newest first" = owner puts newest first). **Current order stays: SERRA BRUTA, GALPAO 78, ESTRADA DE TERRA, CHEGADA BOIADEIRA** (owner confirmed "manter ordem atual" 2026-11-13).

### Photos / covers
- **D-04:** Real photos arrive in a few months ("essas informações vão ser colocadas daqui uns meses"). Until then, covers keep the **approved typographic tonal blocks** (cover-1..4 backgrounds). The data entry has a `cover` field: when empty → typographic cover; when filled → `<img>` cover with PERF-02 treatment (`width`/`height`, `loading="lazy"`, aspect-ratio preserved). Zero visual change now.
- **D-05:** Card stories remain the approved fictional pt-BR texts verbatim (do not rewrite them).

### Interaction (supersedes roadmap/requirements text)
- **D-06:** COL-03 (mobile swipe carousel) is **SUPERSEDED BY OWNER DECISION** (2026-11-13, round 5): on mobile, covers are **stacked full-width, scrolling with the page** ("aquela que rolava"). Horizontal paging strip + ‹ › arrows are **desktop-only** and appear only when collections overflow the row. This matches the shipped, owner-approved behavior.
- **D-07:** COL-04 (desktop hover zoom on cover) stays in scope — implement subtly (transform scale ~1.02-1.03 on hover, respect prefers-reduced-motion) without disturbing the legend inside the tile. NOT yet implemented; current cards have no zoom.

### Deferred by owner
- **D-08:** **Brand info section (BRAND-01..BRAND-04) deferred** — owner decision 2026-11-13: "deixar pra depois"; real Instagram/WhatsApp/e-mail + sobre-a-marca text arrive in a few months. Route: re-evaluate at Phase 4 (launch/polish) or a future milestone when the owner supplies the info. Nothing ships for it in Phase 2.

### the agent's Discretion
- File layout details (single data file vs per-collection data files), exact CSS technique for the hover zoom, and how the render script degrades (noscript fallback) — planner/researcher decide, constrained by the file:// classic-script rule.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning
- `.planning/PROJECT.md` — core value, constraints (R$0, static, file:// must work)
- `.planning/REQUIREMENTS.md` — COL-01..04, PLAT-02, PERF-02 definitions and traceability (annotate COL-03 as superseded when closing this phase)
- `.planning/ROADMAP.md` § Phase 2 — success criteria (note D-06 supersedes criterion 2's mobile-carousel wording; criterion 5 brand-info is deferred per D-08)
- `.planning/phases/02-home-page-collections-brand-info/02-CONTEXT.md` — this file

### Stack constraints (binding)
- `AGENTS.md` § Technology Stack — classic `<script>` data pattern (window global, `file://`-safe), relative paths only, no build step, no fetch/ES modules, `.nojekyll`
- `.planning/phases/01-foundation-scaffold-design-system-navigation/01-02-SUMMARY.md` — approved visual direction + patterns established

### Owner reference
- `PRINTS/` — ciena lookbook prints + CERCADO.png reference (fence already shipped; do not add the image)
- `README.md` — owner guide; Phase 2 must extend it with the data-file editing steps
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `index.html` cards block — the exact approved markup each data entry must reproduce (`.card > .card-cover.cover-N > .card-title + .card-story`, anchor `colecao.html?c=slug`)
- `css/styles.css` — full approved component styles: `.collections-head`, `.cards-nav`, `.cards-btn`, `.cards` (mobile block / desktop flex scroller), `.card-cover` tonal classes, legend styles
- `js/main.js` — guarded carousel logic (`update()` already hides arrows when no overflow); render code must follow the same classic-IIFE style and run AFTER data script (established ordering convention documented in its header)
- `colecao.html` — slug map + `hasOwnProperty` guard pattern to mirror for safe slug handling

### Established Patterns
- Classic scripts, IIFE, `'use strict'`, no globals leaked; data-before-logic script order
- Tokens-first CSS (`--color-*`, `--space-*`); creme/café/caramelo only; no green/blue
- Relative paths everywhere (`./…`); CSS cache-busting via `?v=N` (currently v=5 — bump on any styles.css change)
- Every external link `target="_blank" rel="noopener"`; decorative elements `aria-hidden="true"`

### Integration Points
- `index.html` — replace the 4 hardcoded `.card` anchors with a render mount point (keep `.collections-head` static)
- `css/styles.css` — hover-zoom rule additions; bump `?v=` version
- `README.md` — new section: "como adicionar/reordenar uma coleção" (data-file steps)
</code_context>

<specifics>
## Specific Ideas

- Owner: "essas informações vão ser colocadas daqui uns meses" — the system must be complete NOW but filled with placeholders (typographic covers), ready for photos later.
- Owner approved current visuals verbatim — render must be pixel-identical to the shipped hardcoded version.
- No specific requirements beyond decisions — standard approaches otherwise.
</specifics>

<deferred>
## Deferred Ideas

- **Brand info section** (sobre a marca + WhatsApp wa.me + e-mail + Instagram links) — deferred by owner to when real info exists (~months). Revisit at Phase 4 or next milestone. BRAN-01..04 requirements stay Pending.
- **Real collection photos** — owner delivers later; `cover` field in data file already anticipates them.
- None else — discussion stayed within phase scope.
</deferred>

---

*Phase: 02-home-page-collections-brand-info*
*Context gathered: 2026-11-13*
