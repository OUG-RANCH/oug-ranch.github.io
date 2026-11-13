---
phase: 01-foundation-scaffold-design-system-navigation
plan: 02
subsystem: ui
tags: [github-pages, 404-page, owner-guide, publication, visual-direction, favicon, org-repo]

# Dependency graph
requires:
  - phase: 01-foundation-scaffold-design-system-navigation
    plan: 01
    provides: branded home shell, design tokens, fonts, favicon set, images/ convention, .nojekyll
provides:
  - Live published site: https://oug-ranch.github.io/ (org repo OUG-RANCH/oug-ranch.github.io, Pages deploy-from-branch main/root)
  - Self-contained branded 404 page (any-depth nested URLs render styled; path-recomputed home link)
  - Portuguese owner guide (README.md): update flow, naming rule, Squoosh SOP with boundary values, alt-text convention, never-do rules, theme-file map
  - Owner-approved visual direction: light cream editorial, giant Inter Bold text wordmark, no hero photo (supersedes the Plan 01 scaffold hero)
  - ciena-style portrait cover tiles with in-tile legend + `colecao.html` placeholder page (Phase 2/3 consume)
  - Owner's cowboy-hat favicon mark (32px PNG, 180px apple-touch, SVG embed)
affects: [02-home-collections, 03-lookbook, 04-editorial-polish]

# Actuals (#2632) — same estimateTokens scale (chars/4 over realized diff)
actuals:
  tokens: 9800        # chars/4 over authored text files (404.html, README.md, .gitignore, index.html, colecao.html, css/styles.css, favicon.svg); binaries excluded
  tasks: 3
  commits: 8          # MEASURED: git rev-list --count cec6f99..c8ba21f (task + checkpoint fix-round commits; docs commit excluded)
plan_head_before: cec6f99ea0b799a4e441551f5aa18d53c98e143b
plan_head_after: c8ba21f

# Tech tracking
tech-stack:
  added: [organization GitHub repo (OUG-RANCH) with user-subdomain Pages root, owner-provided favicon mark (FAVE CON), colecao.html placeholder page]
  removed: [Yeseva One woff2 (fonts/yeseva-one-latin.woff2), images/logo.png, images/hero-mobile.jpg, images/hero-desktop.jpg]
  patterns: [giant text wordmark in Inter Bold, ciena-style portrait cover tiles with legend inside the tile, self-contained 404 (inline styles + base-fix script), org-subdomain publication]

key-files:
  created:
    - 404.html
    - README.md
    - colecao.html
    - .gitignore
  modified:
    - index.html
    - css/styles.css
    - favicon.svg
    - favicon-32.png
    - apple-touch-icon.png
  deleted:
    - fonts/yeseva-one-latin.woff2
    - images/logo.png
    - images/hero-mobile.jpg
    - images/hero-desktop.jpg

key-decisions:
  - "Published on an ORGANIZATION repo (OUG-RANCH/oug-ranch.github.io) so the live URL is https://oug-ranch.github.io/ with no personal username; first personal repo douglascavalcante004/oug-ranch was created then deleted"
  - "Visual direction per owner: light cream editorial page, giant Inter Bold TEXT wordmark, no hero photo, Inter only (Yeseva One removed); approved after 2 fix rounds on the live site"
  - "Drawer menu gains 'site' item → https://ougranch.com.br/ (owner's store) and the footer carries the full slogan 'OUG RANCH — Do campo ao rolê, sem mudar quem você é.'"
  - "branding.md + reference screenshots + favicon source kept OUT of the public repo (.gitignore) — public-repo hygiene per the no-unpublished-brand-plans constraint"

patterns-established:
  - "Publication flow: edit → GitHub Desktop/CLI commit → push main → wait 1–10 min (Pages CDN) → hard refresh; documented in README"
  - "404 page stays fully self-contained: inline styles only, zero ./css ./js ./images ./fonts references, home link recomputed from location.pathname"
  - "Collection cover pattern (Phase 2 input): portrait tile, legend INSIDE the tile at the bottom, full-opacity café text"

requirements-completed: [PLAT-01, PLAT-03, NAV-04, A11Y-01, PERF-01]

# Coverage metadata (#1602)
coverage:
  - id: D1
    description: "Self-contained branded 404: inline styles only, zero external asset refs, locked pt-BR copy verbatim, base-fix home-link script, brand + Instagram footer with rel=noopener, ≥44px touch targets, caramelo focus ring"
    requirement: PLAT-01
    verification:
      - kind: integration
        ref: "powershell: Task 1 <verify> gate (11 checks: external-asset-ref, inline style, base-fix, verbatim heading/body/link, noopener, lang, instagram, no asset file extensions) -> P404-OK"
        status: pass
    human_judgment: false
  - id: D2
    description: "README owner guide in pt-BR: update flow (branch main, 1–10 min CDN wait, Ctrl+F5 / aba anônima), naming rule, Squoosh SOP with exact boundary values (≤1600px / ≤900px, ~75–80 / ~85, 200–400 KB, 'reexportar' beyond-boundary rule), alt-text convention (descriptive 'Campanha OUG RANCH — [cena]' vs decorative empty alt), never-do rules (public repo, no leading underscore, no leading slash), theme-file map"
    requirement: PLAT-03
    verification:
      - kind: integration
        ref: "powershell: Task 2 <verify> gate (all boundary strings + section headings + alt convention) -> GUIDE-OK"
        status: pass
    human_judgment: false
  - id: D3
    description: "Live publication: site renders on https://oug-ranch.github.io/ — branded home, working drawer, collections section, favicon in tab, and a nested bogus path serves the STYLED branded 404 with working 'voltar pro início'"
    requirement: PLAT-01
    verification:
      - kind: human_procedural
        ref: "01-02-PLAN.md Task 3 checkpoint checklist executed by the owner on a real phone (org repo created via GitHub CLI, Pages deploy-from-branch main/root enabled); owner approved (styled nested 404 verified)"
        status: pass
    human_judgment: true
    rationale: "Pages any-depth 404 behavior and mobile rendering cannot be proven by local greps; the owner verified on the live URL and approved"
  - id: D4
    description: "Visual direction accepted by the brand owner: light cream editorial home, giant Inter Bold text wordmark, no hero photo, ciena-style portrait cover tiles, drawer 'site' item to the store, full footer slogan, owner-provided cowboy-hat favicon"
    verification:
      - kind: human_procedural
        ref: "owner reviewed on phone, REJECTED the scaffold hero direction, and APPROVED after two fix rounds (d39589b/43e4817, 2fd3700) plus favicon swap (09be500)"
        status: pass
    human_judgment: true
    rationale: "taste/brand-identity approval is inherently human; documented as checkpoint outcome, not a silent deviation"

# Metrics
duration: 15min executor-active (excludes the owner's checkpoint wait and fix-round turnaround)
completed: 2026-11-13
status: complete
---

# Phase 1 Plan 02: 404 + Owner Guide + Publication Summary

**Self-contained branded 404 (any-depth styled, path-recomputed home link) + Portuguese owner guide with exact photo boundary values + the site PUBLISHED and owner-APPROVED at https://oug-ranch.github.io/ — on an org repo so the URL carries no personal username, with the visual direction finalized by the owner after two fix rounds (Inter-only text wordmark, ciena-style covers).**

## Live URL

**https://oug-ranch.github.io/** — org repo `OUG-RANCH/oug-ranch.github.io`, public, Pages: Deploy from a branch → `main` → `/ (root)`.

## Performance

- **Duration:** ~15 min executor-active (Tasks 1–2 + checkpoint preamble); publication and the two owner-driven fix rounds happened at the human checkpoint
- **Completed:** 2026-11-13
- **Tasks:** 3 of 3 (Task 3 = publication checkpoint, resolved by owner)
- **Files:** 4 created, 5 modified, 4 deleted across 9 code/docs commits

## Accomplishments

- **404 page (success criterion 1):** fully self-contained — inline `<style>` with local token values (creme/café/caramelo), zero references to ./css ./js ./images ./fonts, wordmark as plain text, locked copy verbatim ("essa página seguiu estrada diferente." / body / "← voltar pro início"), home-link href recomputed from `location.pathname` for nested missing URLs, brand + Instagram footer (`target=_blank rel=noopener`), ≥44px touch targets, caramelo focus ring. Gate: `P404-OK` (11 checks), re-verified after the fix rounds.
- **Owner guide (PLAT-03/PERF-01/A11Y-01):** `README.md` in pt-BR with the "amigo do interior" tone — six sections: update flow (edit → GitHub Desktop → push `main` → espere 1 a 10 minutos → Ctrl+F5/aba anônima; branch `main` + `/ (root)` stated explicitly), naming rule (regra nº 1), Squoosh SOP (regra nº 2: WebP, largura ≤1600px galeria / ≤900px hero mobile, qualidade ~75–80 / hero ~85, apagar metadados, 200–400 KB esperados, "reexportar" beyond-boundary rule, originais FORA do repositório, `images/` + `images/collections/<slug>/` convention), alt-text convention (regra nº 3: `Campanha OUG RANCH — [cena]` vs decorative `alt=""` de propósito), o que nunca fazer (repo público — nada de dados pessoais; nada de `_`; nada de `/` inicial), e onde trocar logo/textos (tokens no topo de `css/styles.css`, textos no HTML, copy do 404 no próprio `404.html`). Gate: `GUIDE-OK`; updated by fix round 1 to match the new Inter-only/no-logo reality.
- **Publication (PLAT-01):** org `OUG-RANCH` created (owner decision: no personal name in the URL); repo pushed via GitHub CLI; Pages deploy-from-branch enabled; live checklist verified on the owner's phone including a nested bogus path serving the STYLED 404.
- **Checkpoint-phase visual fixes (owner-driven, on the live site):** home rebuilt as a light cream editorial page with a giant Inter Bold TEXT wordmark (no hero photo, Yeseva One removed, logo file + hero JPEGs deleted), 4 fictional collections in the ciena card pattern, `colecao.html` placeholder page, ciena-style portrait cover tiles with the legend inside the tile, drawer "site" item → `https://ougranch.com.br/`, full footer slogan, and the owner-provided cowboy-hat favicon mark.

## Task Commits

| Task | Commit | Description |
| ---- | ------ | ----------- |
| 1 — 404 page | `767c4f5` | feat(01-02): self-contained branded 404 page (P404-OK) |
| 2 — owner guide | `e15b2c1` | docs(01-02): guia do dono em português (GUIDE-OK) |
| 3 preamble | `4ac5124` | chore(01-02): .gitignore — brand manual + reference screenshots kept out of the public repo |
| checkpoint fix 1a | `d39589b` | fix(01-02): home rebuilt per owner feedback — light editorial, Inter only, text wordmark, fictional collections |
| checkpoint fix 1b | `43e4817` | docs(01-02): README font/logo notes update |
| checkpoint fix 2 | `2fd3700` | fix(01-02): ciena-style covers, COLEÇÕES title, "site" menu item, full footer slogan |
| checkpoint favicon | `09be500` | fix(01-02): owner-provided cowboy-hat favicon (32px, 180px, svg embed) |
| close-out | `c8ba21f` | chore(01-02): ignore owner favicon source file |

## Files Created/Modified

- `404.html` (created) — self-contained branded 404, unchanged since creation; verified again post-fix-rounds
- `README.md` (created, updated in `43e4817`) — owner guide
- `colecao.html` (created, fix round 1) — placeholder collection page for Phase 3
- `.gitignore` (created) — `branding.md`, `Captura de tela*.png`, `FAVE CON.png` stay local
- `index.html`, `css/styles.css` (modified, fix rounds) — rebuilt per owner's approved direction
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (modified) — owner's cowboy-hat mark
- **Deleted:** `fonts/yeseva-one-latin.woff2`, `images/logo.png`, `images/hero-mobile.jpg`, `images/hero-desktop.jpg` (intentional — superseded visual direction)

## Deviations from Plan

All checkpoint outcomes are documented here (none silent):

1. **[Checkpoint outcome — Task 3] First personal repo created then deleted.** `douglascavalcante004/oug-ranch` was created per the original checklist, then the owner created org `OUG-RANCH` and republished so the URL is `https://oug-ranch.github.io/` (no personal username). The personal repo was deleted. Publication instructions in the README remain valid (branch `main`, root).
2. **[Checkpoint outcome — Task 3] Visual direction REJECTED then APPROVED after two fix rounds.** The owner rejected the scaffold's hero direction (photo hero) on the live site. Fix round 1 (`d39589b`, `43e4817`): light cream editorial page, giant Inter Bold text wordmark, no photo, Inter only (Yeseva One deleted), 4 fictional collections (ciena pattern), `colecao.html`. Fix round 2 (`2fd3700`): portrait cover tiles with legend inside the tile, "COLEÇÕES" title, drawer "site" → `ougranch.com.br`, full footer slogan. Favicon swap (`09be500`) with the owner's cowboy-hat mark. **Note for Phase 2/4 planning:** the owner-approved direction supersedes parts of the Plan 01 UI-SPEC hero contract (HERO-01's photo-hero form); REQUIREMENTS checkboxes for HERO-01/02 were left as-is per the shared-ID rule — Phase 2 planning should reconcile them against the approved direction.
3. **[Rule 3 — Blocking] Untracked local files blocked the clean-tree gate of Task 3.** `branding.md` + 2 reference screenshots + (later) the favicon source PNG are local working files; committing them to a public repo would violate the no-unpublished-brand-plans constraint. Fix: `.gitignore` (`4ac5124`, `c8ba21f`).
4. **[Gate-harness — same treatment as Wave 1]** Verify gates with accented literals were run with codepoint-correct regex equivalents (`\u00E1` etc.); no gate weakened. Console display shows mojibake (display-only); committed files verified UTF-8-correct via codepoint containment.

## Issues Encountered

- The owner-published URL is the org **user-site root** (`oug-ranch.github.io`), not a project subpath — relative paths work identically; canonical/OG absolute URLs (Phase 4, SEO-03) should use `https://oug-ranch.github.io/…` directly.
- Yeseva One preload referenced in Plan 01 docs no longer exists (font removed in fix round 1) — Phase 2/3 docs should not assume it.

## User Setup Required

Completed at the checkpoint: org repo + Pages enabled. None outstanding.

## Next Phase Readiness

- Phase 2 (collections) starts with the approved visual language in place: ciena-style cover tiles, fictional collections (SERRA BRUTA, GALPAO 78, ESTRADA DE TERRA, CHEGADA BOIEIRA) in markup awaiting the `collections.js` data system, `colecao.html` placeholder consuming future data
- Owner conventions (README) are live; real photos will follow the Squoosh SOP into `images/collections/<slug>/`
- Open for Phase 4: SEO canonicals against `https://oug-ranch.github.io/`, reconciling HERO-01/02 with the approved no-photo direction

## Self-Check: PASSED

- Key files exist on disk: `404.html` (2748 B), `README.md` (5679 B), `colecao.html`, `index.html`, `css/styles.css` — all verified present and committed
- Sentinels re-run post-fix-rounds: `P404-OK` + `GUIDE-OK`, exit 0
- All 8 task/fix commits are ancestors of HEAD; working tree clean on `main`
- Live URL confirmed by owner at the checkpoint: https://oug-ranch.github.io/

---
*Phase: 01-foundation-scaffold-design-system-navigation*
*Completed: 2026-11-13*
