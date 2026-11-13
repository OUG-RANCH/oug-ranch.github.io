---
phase: 01-foundation-scaffold-design-system-navigation
reviewed: 2026-11-13T00:00:00Z
depth: deep
files_reviewed: 6
files_reviewed_list:
  - index.html
  - colecao.html
  - 404.html
  - css/styles.css
  - js/main.js
  - README.md
findings:
  critical: 0
  major: 1
  minor: 3
  advisory: 5
  total: 9
verdict: issues_found — no blockers; 1 major (404 nested-path link), 3 minor, 5 advisory. Safe to proceed to next phase after fixing the 404 script.
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-11-13
**Depth:** deep (full per-file read + cross-file asset/path checks + behavioral tracing of the drawer and 404 scripts)
**Files Reviewed:** 6
**Status:** issues_found

## Summary

Overall this is a solid MVP scaffold: relative paths everywhere (GitHub Pages subpath + `file://` safe), classic scripts with no `fetch`/ES modules (owner's `file://` preview works), `textContent`-only rendering of query-string data (no XSS surface), `rel="noopener"` on all `target="_blank"` links, correct font preload (`as="font" crossorigin` matching the CSS URL exactly), `prefers-reduced-motion` handled, and the native `<dialog>` drawer correctly synced via the `close` event (Esc is safe).

Referenced assets verified to exist: `fonts/inter-variable-latin.woff2`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `.nojekyll`. No hardcoded secrets, no dangerous functions, no empty catches.

Findings below: 1 major (404 base-fix script fails on its own stated use case), 3 minor, 5 advisory. No critical issues.

## Major

### MA-01: 404 "voltar pro início" link is broken for nested paths — including the exact case the comment claims to fix

**File:** `404.html:54-59` (regex at line 58)
**Issue:** The script computes the site base by stripping the last path segment: `location.pathname.replace(/\/[^/]*$/, '/')`. Verified behavior:

| Requested path (GitHub Pages project site) | Computed href | Result |
|---|---|---|
| `/oug-ranch/nao-existe` | `/oug-ranch/index.html` | ✅ works |
| `/oug-ranch/nao-existe/aninhado/` | `/oug-ranch/nao-existe/aninhado/index.html` | ❌ another 404 |
| `/oug-ranch/nao-existe/aninhado` | `/oug-ranch/nao-existe/aninhado/index.html` | ❌ another 404 |

The trailing-slash case is worst: the regex only matches the final `/` (zero non-slash chars), so the href is unchanged in essence and points at an `index.html` inside a nonexistent directory — the visitor clicks "voltar pro início" and lands on the 404 page again (a loop). This is the exact example in the file's own comment (lines 55-56), so the stated guarantee does not hold. Depth-2 paths are realistic: any mistyped URL with a `/` in it (`colecao.html` typoed as `colecao/old-name`, an old shared link, etc.).
**Fix:** Walk up the path and probe until a real `index.html` is found, falling back to the current behavior:

```html
<script>
  (function () {
    var link = document.getElementById('home');
    if (!/^https?:/.test(location.protocol)) return; // file:// — o caminho relativo atual já funciona
    var segs = location.pathname.split('/');
    var best = './index.html';
    while (segs.length > 1) {
      segs.pop();
      var candidate = segs.join('/') + '/index.html';
      try {
        var xhr = new XMLHttpRequest(); // síncrono e curto: só no 404
        xhr.open('HEAD', candidate, false);
        xhr.send();
        if (xhr.status === 200) { best = candidate; break; }
      } catch (e) { break; }
    }
    link.href = best;
  })();
</script>
```

Alternatively, once the Pages subpath is fixed and known (e.g. `/oug-ranch/`), hardcode it — simpler and 100% reliable for this site's one-level-deep URLs.

## Minor

### MI-01: `COLECOES[slug]` lookup trips over `Object.prototype` keys — `?c=constructor` renders "undefined"

**File:** `colecao.html:79-86`
**Issue:** `var dados = COLECOES[slug];` inherits from `Object.prototype`, so slugs like `constructor`, `__proto__`, `toString`, `hasOwnProperty` all resolve to truthy values. `dados.t` / `dados.s` are then `undefined`, and `titulo.textContent = undefined` renders the literal string "undefined" as the page title and story (`document.title` becomes "OUG RANCH — undefined"). Not a security issue (only crafted URLs), but a visible glitch reachable via a shared/crafted link.
**Fix:**
```js
var dados = Object.prototype.hasOwnProperty.call(COLECOES, slug) ? COLECOES[slug] : null;
```
(Or use `Object.create(null)` for the map / a `Map`.)

### MI-02: Breakpoint-change listener steals focus to the hamburger even when the drawer was never opened

**File:** `js/main.js:46-47`
**Issue:** On `matchMedia('(min-width: 768px)')` change, `closeMenu()` runs unconditionally. When the drawer is closed, `drawer.close()` is a no-op (no `close` event fires), but the subsequent lines still execute — `burger.focus()` runs whenever the viewport crosses to ≥768px with the menu closed. Real-world trigger: resizing a desktop browser across the breakpoint, or rotating a small tablet to landscape. Focus jumps from wherever the user was to the hamburger — an a11y/UX regression.
**Fix:**
```js
mq.addEventListener('change', function (e) {
  if (e.matches && drawer.open) drawer.close();
});
```

### MI-03: `unicode-range` omits the arrow glyphs the site actually uses — fallback-font glyphs in the back link and footer

**File:** `css/styles.css:27` (used in `index.html:19,96`, `colecao.html:46,51`)
**Issue:** The latin subset range includes U+2191 (↑) and U+2193 (↓) but not U+2190 (←), U+2192 (→), U+2197 (↗) — exactly the arrows used in the masthead, footer and the non-aria-hidden `← voltar pro início` link. Those glyphs render in the `system-ui` fallback instead of Inter, with mismatched weight/shape next to Inter text.
**Fix:** Either add `U+2190-2199` to the `unicode-range` (if the vendored Inter file contains them — verify first), or wrap every arrow in `<span aria-hidden="true">` and accept the fallback glyph deliberately (document the choice in a comment).

## Advisory

### AD-01: Card link's accessible name is the full ~50-word story text

**File:** `index.html:63-89`
**Issue:** The whole `<a class="card">` subtree is the link name for screen readers (title + entire story). Functional but verbose in link lists. Also reviewed per request: `role="heading" aria-level="3"` on the title `<span>` inside `<a>` is valid ARIA-in-HTML and the h1→h2→h3 hierarchy is correct — no defect there.
**Fix (optional):** `<a class="card" href="..." aria-label="SERRA BRUTA — coleção">` with the inner text wrapped in `aria-hidden` would shorten the name, at the cost of hiding the story from the link; or leave as-is for MVP.

### AD-02: Duplicated close logic in `closeMenu` vs the `close` event listener

**File:** `js/main.js:20-25` and `33-38`
**Issue:** Every real close path (button, Esc, anchor, breakpoint) ends in `drawer.close()`, which always fires the `close` listener — so the manual attribute/class/focus work inside `closeMenu` is redundant double-work (harmless today, but the two blocks can drift apart in later phases).
**Fix:** Reduce `closeMenu` to `function closeMenu() { drawer.close(); }` and keep all sync in the `close` listener; drop the redundant `burger.focus()` in MI-02's rewrite.

### AD-03: iOS Safari scroll-lock caveat

**File:** `css/styles.css:132`
**Issue:** `body.menu-open { overflow: hidden; }` does not fully lock background scroll on older iOS Safari. Mitigated in practice because the full-screen drawer has `overflow-y: auto` and covers the page; note for the lookbook phase, where background-scroll bleed becomes more visible.
**Fix (later):** If bleed appears, add `position: fixed; top: -<scrollY>px` on `.menu-open` with restore on close.

### AD-04: Missing `<meta name="description">` on `index.html` / `colecao.html`

**File:** `index.html:3-13`, `colecao.html:3-13`
**Issue:** No meta description; search results will fall back to arbitrary page text.
**Fix:** Add one-line pt-BR descriptions (brand slogan works for the home).

### AD-05: All four index-list links share the single destination `#colecoes`

**File:** `index.html:42-47`
**Issue:** Intentional placeholder (cards are the real targets), but "SERRA BRUTA" scrolling to the section top rather than its card is surprising once photos exist; also four same-destination links with distinct names can read as broken to users.
**Fix (next phase):** Add ids per card (`id="c-serra-bruta"` on each card) and point each list link at its anchor.

---

_Reviewer: gsd-code-reviewer (adversarial pass)_
_Depth: deep_
_Verdict gate: advisory only — no code fixes applied; REVIEW.md committed standalone._
