---
phase: 04-editorial-polish-social-seo-launch
reviewed: 2026-11-13T00:00:00Z
depth: standard
plan: 04-01
files_reviewed: 8
files_reviewed_list:
  - index.html
  - colecao.html
  - 404.html
  - css/styles.css
  - images/og-card.jpg
  - sitemap.xml
  - robots.txt
  - README.md
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
verdict: ship-with-warning
---

# Phase 4 (Plan 04-01): Code Review Report

**Reviewed:** 2026-11-13
**Depth:** standard (per-file read + cross-file checks: XML/JSON parse, image byte-level verification, v=7 sweep)
**Files Reviewed:** 8
**Status:** issues_found (0 critical / 1 warning / 2 info — all non-blocking)
**Verdict:** ship-with-warning — the SEO/share layer is correct and verified end-to-end; fix WR-01 before the owner's first og-card swap.

## Summary

Reviewed the full f787a68..68daad1 range for plan 04-01 (social/SEO layer + a11y/touch-target polish). Every automated acceptance gate from 04-01-PLAN.md was re-verified independently, not trusted from the summary:

**Verified clean (6 areas from the review brief):**

1. **SEO correctness** — `og:image` is the exact absolute `https://oug-ranch.github.io/images/og-card.jpg` on both index.html:16 and colecao.html:17; `og:image:width/height` = 1200/630 on both; canonical per page matches the real URL (`https://oug-ranch.github.io/` index:24, `https://oug-ranch.github.io/colecao.html` colecao:25); titles and descriptions are unique, pt-BR, and non-duplicated across all three pages; JSON-LD at index.html:27-39 parses as valid JSON (`ConvertFrom-Json` passed) with Organization name/url/logo/sameAs `[instagram.com/ougranch, ougranch.com.br/]` per D-05; `twitter:card summary_large_image` with absolute `twitter:image` on both pages.
2. **404 self-containment** — 404.html:7 adds meta description only; zero `og:` strings in the whole file (grep-verified negative); no asset href/src added; the base-fix inline script (lines 57-63) is untouched by the diff; title remains unique.
3. **CSS touch targets** — `.masthead-link` (styles.css:60-66): the parent row `.masthead-links` already had `min-height: var(--touch-min)` + `align-items: center`, so growing the link to 44px fills the existing row — **no visual shift of the approved header look** (the inline-flex fix is the correct, shift-free implementation). `?v=8` present in both index.html:45 and colecao.html:31; a repo-wide sweep found **zero `v=7` references** in any HTML or JS file.
4. **sitemap.xml / robots.txt** — sitemap.xml parses as valid XML (single `<url>`, absolute `<loc>https://oug-ranch.github.io/</loc>`, `lastmod` = today 2026-11-13, owner comment with the Phase-3 example, 404 correctly excluded); robots.txt has `User-agent: *`, `Allow: /`, and the absolute `Sitemap:` pointer.
5. **og-card.jpg** — System.Drawing verifies exactly **1200×630**; **30,512 bytes** (≤ 300 KB with huge margin); magic bytes `FF D8 FF E0` = real JPEG/JFIF (not a renamed WebP); visual read confirms cream card, black "OUG RANCH" wordmark, "DO CAMPO AO ROLÊ" with correct Ê glyph. No `og-card-src.*` leftovers in `images/`.
6. **HTML validity** — all `og:*` tags use `property=`, all `twitter:*` tags use `name=` (consistent on both pages); JSON-LD uses `type="application/ld+json"`.

Also verified: no JS file references `styles.css` or a cache-bust string dynamically (the v=8 bump can't be bypassed); working tree clean at 68daad1 (only an untracked owner-material `PRINTS/` folder, out of scope); og:type is `website` on the placeholder colecao page (correct, per plan); body hrefs/src all stay relative (backstop intact).

## Warnings

### WR-01: README swap instructions point the owner at a SOP that exports WebP, but the OG card must be JPEG

**File:** `README.md:72` (new "Imagem de compartilhamento" section), conflicting with `README.md:40` (regra nº 2)

**Issue:** The section tells the owner to "exporte pela **regra nº 2** (Squoosh) … salve como **JPEG**", but regra nº 2's SOP step 2 explicitly says "Escolha o formato **WebP**" (and the README's own line 88 spells it out: "Squoosh, WebP"). A non-expert owner following the referenced SOP literally will export WebP bytes and save them as `og-card.jpg`. GitHub Pages then serves WebP content with an `image/jpeg` Content-Type — the byte/format mismatch is exactly the kind of thing strict social scrapers (WhatsApp's crawler is notoriously picky) reject or misrender, which silently breaks the share preview this whole phase built. The defect is dormant at HEAD (the committed card is a real JPEG) and bites on the first owner swap.

**Fix:** One clause in the "Imagem de compartilhamento" section, e.g.: "No Squoosh, escolha **JPEG** (não WebP) — a regra nº 2 pede WebP só pra fotos do site; o cartão de compartilhamento é diferente: precisa ser JPEG." (Or add a JPEG-format exception note inside regra nº 2 itself.)

## Info

### IN-01: 44px touch-target boxes grow the visible line height of two body locations (per-plan tradeoff, owner UAT)

**File:** `css/styles.css:466-473` (`.text-link`, rendered at `colecao.html:63-64`) and `css/styles.css:178-184` (`.index-list a`, rendered at `index.html:75-80`)

**Issue:** `.text-link` becomes a 44px-tall inline-flex inside the `.colecao-note` paragraph, so the line containing `@ougranch` grows from ~24px to ~44px of vertical air (text stays centered, but the paragraph rhythm changes visibly). Likewise `.index-list a` rows grow from ~35px (2rem × 1.1 line-height) to 44px on mobile — ~9px extra per row across the four collection names. Both are the inherent cost of the approved PERF-03 fix and are explicitly described in the plan ("a caixa cresce, o nome fica centrado"), not implementation errors. Flagging only so the owner's phone UAT (ROADMAP criterion 5) explicitly looks at these two spots.

**Fix:** None required. If the owner dislikes the line growth on first phone check, the alternative is a pseudo-element hit-area expansion (keeps the line box at 24px), but that is a v2 polish decision, not a blocker.

### IN-02: JSON-LD `logo` points at a 1200×630 landscape campaign card, not a compact logo asset

**File:** `index.html:33`

**Issue:** The Organization JSON-LD `logo` uses the OG share card (1.9:1 landscape). Google's Organization/logo structured-data guidance favors a logo that renders cleanly small and squarish; the landscape card is unlikely to win a logo rich result. The plan (D-05) deliberately chose this asset, and the JSON-LD itself validates, so this is an expectation-management note, not an error.

**Fix:** None now. When the brand gets a proper mark, either point `logo` at a square-ish asset or wrap it as an `ImageObject` with width/height; verify with Google's Rich Results Test after the first push.

---

_Reviewed: 2026-11-13_
_Reviewer: the agent (gsd-code-reviewer)_
_Depth: standard_
