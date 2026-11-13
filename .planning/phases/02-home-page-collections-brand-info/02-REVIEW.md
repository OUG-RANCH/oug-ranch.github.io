---
phase: 02-home-page-collections-brand-info
plan: 02-01
reviewed: 2026-11-13T00:00:00Z
depth: deep
files_reviewed: 6
files_reviewed_list:
  - js/collections.js
  - js/collections-render.js
  - index.html
  - css/styles.css
  - colecao.html
  - README.md
findings:
  critical: 0
  major: 2
  minor: 3
  advisory: 4
  total: 9
verdict: approve-with-conditions
status: issues_found
---

# Phase 2 / Plan 02-01: Code Review Report

**Reviewed:** 2026-11-13
**Depth:** deep (cross-file: renderer ↔ main.js carousel ↔ CSS contract ↔ data file ↔ README)
**Files Reviewed:** 6 (diff range b8d51ee..40659ce; commits f56c652, e9baaa0, cf3af47, 3f4e552, c2216bb confirmed via `git log`)
**Verdict:** approve-with-conditions — nothing blocks today's shipped visuals (all covers are typographic), but the photo-cover path has a latent layout defect and the owner docs contain one self-contradictory instruction that must be fixed before real photos/content arrive.

## Summary

The data-driven cards slice is solid where it matters most: the renderer is `createElement`/`textContent`/`setAttribute` only (no `innerHTML` anywhere — verified), the slug is validated against `^[a-z0-9-]+$` **before** being placed in the href, the query value uses `encodeURIComponent` (correct component encoder, not `encodeURI`), and script order in `index.html` is data → render → main.js, all `defer`, so the carousel's `update()` in `main.js:74` measures the already-rendered strip. All four stories, titles and slugs were **programmatically diffed against `b8d51ee`'s hardcoded `index.html` — verbatim ✓**. `?v=6` present in both `index.html` and `colecao.html`, no stale `v=5` anywhere (404.html is self-contained, unaffected). No global collisions (`window.OUG_COLLECTIONS` is the only new global; renderer and main.js are `'use strict'` IIFEs); all paths relative — `file://` double-click preview works. Hover zoom is correctly gated by `@media (min-width: 768px) and (hover: hover)` and fully killed under `prefers-reduced-motion: reduce` (both transitions and transforms, placed after the hover block so it wins). Only palette variables used — no forbidden colors. Corrupt/missing data renders the friendly `.cards-error` paragraph and, because a throwing classic script does not stop subsequent `defer` scripts, `main.js` still runs — the failure is non-blocking. Rendered `card-title` carries `role="heading" aria-level="3"`; photo `<img>` gets `alt`/`loading="lazy"`/`decoding="async"` with width/height only when both are positive (no `width="0"`).

The two major findings below are both **latent**: they cannot fire with the four shipped entries (`cover: ''` everywhere), but they fire the first time the owner uses the features the phase explicitly built for "daqui uns meses".

## Major

### MJ-01: Photo cover will not render as designed — img and legend fight for flex space; legend loses the tile

**File:** `css/styles.css:316-321` (with `js/collections-render.js:71-84`)
**Issue:** `.card-cover` is `display:flex; flex-direction:column; justify-content:flex-end` and the legend (`.card-title` + `.card-story`, `css/styles.css:362-386`) is ordinary in-flow content — there is **no** absolute positioning. The new `.card-cover--photo img { width:100%; height:100% }` makes the image a *flex item* claiming the full tile height. On overflow the default `flex-shrink:1` squeezes the image down to make room for the legend, so: (a) the CSS comment's claim "a imagem preenche o tile inteiro" (`css/styles.css:314`) is false — the photo occupies only the upper portion; (b) the legend ends up **below** the photo on a transparent background (`.card-cover--photo` sets no `background`), not overlaid on the photo — breaking the D-04 "legenda dentro da capa" ciena design the moment the first real photo lands. `aspect-ratio` of the tile is preserved, so nothing clips, but the intended look is not achieved. The shipped typographic path is unaffected (no `<img>` emitted while `cover` is empty).
**Fix:** take the image out of flex flow inside the already-`position:relative` tile:

```css
.card-cover--photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

The legend then stacks naturally over the photo via the existing `justify-content:flex-end`, and `overflow:hidden` (`css/styles.css:304`) keeps the hover zoom clipped. Bump `?v=7` on both pages when this lands.

### MJ-02: All-slugs-invalid edge case leaves a blank cards section — violates the "never a blank section" truth

**File:** `js/collections-render.js:53-97`
**Issue:** The shape validation (`valida`, line 32) only checks that `slug` is a *string*; entries failing `SLUG_OK` are individually skipped with a `console.warn`. If **every** entry has an invalid slug (realistic owner mistake: an accented slug like `coleção-nova` copied from the template), every entry is skipped, `posicao` never increments, and `#cardsMount` is left empty — no cards and no friendly message. This contradicts the plan truth "A missing or corrupt data file renders a friendly Portuguese message — never a blank section" (the corrupt case is covered; the all-invalid case is not).
**Fix:** count what was rendered and fall back to the same error paragraph:

```js
if (posicao === 0) {
  var aviso = document.createElement('p');
  aviso.className = 'cards-error';
  aviso.textContent = 'Nenhuma coleção válida encontrada. Confere o campo slug de cada coleção em js/collections.js (minúsculas, sem acento e sem espaço).';
  mount.appendChild(aviso);
  return;
}
```

(placed after the `forEach`, before the function ends).

## Minor

### MN-01: Tonal cover mapping uses *visible position*, not the entry's `order` — deviation from the approved formula

**File:** `js/collections-render.js:53,90` vs plan Task 2 (`(((order - 1) % 4) + 1)`)
**Issue:** The plan specifies `cover-1..cover-4` keyed by the entry's `order` field; the implementation keys them by `posicao`, a counter incremented only for entries that passed slug validation. The two differ whenever an entry is skipped (downstream tiles shift tone) or when `order` values are sparse/duplicated. Note the implementation is actually *safer* than the spec — `order: 0` under the plan's formula yields `(−1 % 4) + 1 = 0` → nonexistent class `cover-0` — but the code, plan and SUMMARY now disagree about the mapping rule.
**Fix:** keep the implemented behavior (avoids both `cover-0` and duplicate adjacent tones) and correct the formula in 02-01-SUMMARY.md, or restore the spec'd order-based mapping with a clamped index. One of the two; don't leave them divergent.

### MN-02: Contradictory owner instruction — "coleção mais nova = número menor" vs template example `order: 5`

**File:** `js/collections.js:76-78` (template comment) and `README.md:84`
**Issue:** The TEMPLATE entry teaches `order: 5` as "the next position" (new collection appears **last**), while the line directly beneath it says "Coleção mais nova = número menor" (newest appears **first**) and README step 3 repeats "coleção mais nova = número menor". A non-technical owner following the template verbatim produces the opposite ordering from the stated rule — and following the rule means renumbering all existing entries on every addition. The contradiction originates in the plan (Task 1 vs Task 4) and was faithfully implemented, but it will cause real ordering mistakes.
**Fix:** pick one semantics and align all three places (template, README step 2/3, data header). Recommended, least-error wording: "use o próximo número livre — a coleção nova entra no fim da lista; se quiser que ela apareça primeiro, dê a ela um número MENOR que todas as existentes (e aí ninguém repete número)".

### MN-03: `cover` path goes to `img src` unvalidated

**File:** `js/collections-render.js:72`
**Issue:** `foto.setAttribute('src', e.cover)` accepts any string from the data file: a full URL (`https://…`), a protocol-relative `//host/x.webp`, or a `data:` URI is silently loaded by the home page. Within the threat model (T-2-01/T-2-02, owner-edited public-repo file) this is low-risk — `<img src>` can't execute script — but README explicitly forbids leading-`/` paths and says nothing about remote URLs, so an owner pasting a Dropbox link gets a silent tracking/remote-content surface and a broken local preview story.
**Fix:** mirror the slug guard — one `console.warn` + skip when the value contains `:` or starts with `//`, e.g. `var COVER_OK = /^[^:\/]/;` and skip the photo branch (fall back to the typographic tile) when it fails.

## Advisory

### AD-01: Duplicate slug / duplicate `order` never detected

**File:** `js/collections-render.js:40-97`; rule stated at `README.md:83`
**Issue:** README forbids two collections sharing a slug or an `order` number, but the renderer neither warns nor dedupes: duplicate orders tiebreak silently by array position; duplicate slugs render two cards to the same collection.
**Fix:** one `Set` pass before rendering; `console.warn` on the first duplicate of each kind.

### AD-02: Stale global name in `main.js` header comment

**File:** `js/main.js:4`
**Issue:** The "REGRA DE ORDEM" comment cites `window.OUG_COLLECTION` (singular) as the example data global; the shipped name is `window.OUG_COLLECTIONS`. Harmless, but this comment is the documented convention future phases will copy.
**Fix:** one-word edit in the next phase that legitimately touches `main.js` (or now; one line).

### AD-03: README section header says "Dois passos:" then lists four numbered items

**File:** `README.md:80-85`
**Issue:** Items 3 and 4 are reorder/verify instructions, not part of the "two steps". Cosmetic, but for the non-technical audience the count should match the list.
**Fix:** reword to "O fluxo completo:" or split 3/4 out of the numbered list.

### AD-04: Photo tile has no fallback background while the image loads or if it 404s

**File:** `css/styles.css:314-321`
**Issue:** `.card-cover--photo` sets no `background`, so a slow-loading or missing cover photo renders a transparent tile (page background + legend only). MJ-01's absolute-position fix should add a tonal fallback (e.g. also carry a `cover-N` class in the photo branch, or `background: var(--color-bg)`) so the tile never looks empty.
**Fix:** in the renderer's photo branch, keep a tonal class (`cover-…`) alongside `card-cover--photo`; CSS already stacks the `<img>` above it once MJ-01 lands.

## Verification performed (evidence)

- `node --check` clean on both new JS files; `window.OUG_COLLECTIONS` evaluates to a 4-entry array, orders `1,2,3,4`, all covers empty.
- Stories/titles/slugs programmatically extracted from `git show b8d51ee:index.html` and string-matched against `js/collections.js` — 4/4 verbatim (D-05 ✓).
- `grep` across all `.html`: only `styles.css?v=6` references remain; no `v=5` anywhere.
- `--gutter` and `--color-ink` tokens exist (`css/styles.css:10,15,17`) — `.cards-error` styling resolves.
- Deferred-script failure semantics confirmed: a syntax error in `collections.js` does not prevent `collections-render.js`/`main.js` from running — the error path is genuinely non-blocking.
- No `innerHTML`, no `eval`, no `fetch`, no ES-module syntax, no absolute paths introduced.

---

_Reviewed: 2026-11-13_
_Reviewer: gsd-code-reviewer (advisory gate — report only, no code changed)_
_Depth: deep_
