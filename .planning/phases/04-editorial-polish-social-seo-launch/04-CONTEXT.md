# Phase 4: Editorial Polish, Social SEO & Launch - Context

**Gathered:** 2026-11-13
**Status:** Ready for planning — NON-PHOTO scope only (photos still months away per Phase 3 block)

<domain>
## Phase Boundary

Ship everything in the phase-4 contract that does NOT depend on lookbook photos: complete share/SEO metadata (OG/Twitter cards, unique titles/descriptions, canonicals, sitemap, robots, JSON-LD), a generated brand OG image (1200×630), the reduced-motion/a11y/touch-target audit, and reconciliation of items already shipped or declined by the owner. Launch-check items that require real photos (A11Y-02 scrim over photos) stay pending with Phase 3.

</domain>

<decisions>
## Implementation Decisions

### Captured in this discussion
- **D-01:** **NAV-05 announcement bar: OWNER DECLINED** ("Não quero barra"). No bar ships — ever, unless the owner asks again. REQUIREMENTS.md NAV-05 gets annotated superseded-by-owner-declined; ROADMAP success criterion 1's announcement-bar half is reconciled (marquee half already shipped).
- **D-02:** OG/share image = **generated brand card** (owner approved): cream #F4F4EF background + giant black OUG RANCH wordmark, matching the approved home aesthetic. 1200×630, JPEG ≤300 KB, at `images/og-card.jpg` (gitignored-source? No — it SHIPS in the repo). When real campaign photos arrive, owner can swap it by replacing the file (documented in README).
- **D-03:** Share/SEO texts: `<title>` unique per page; description defaults to the full brand slogan family — index: "Do campo ao rolê, sem mudar quem você é." + collections line; colecao/lookbook placeholder: generic collection description; 404: friendly. OG `og:site_name` = OUG RANCH; `og:locale` = pt_BR; `og:url`/canonical = absolute `https://oug-ranch.github.io/...` (SEO-03, GitHub Pages project subpath-safe even though this is the org root).
- **D-04:** sitemap.xml lists the real pages (index, 404 not listed, colecao placeholder listed or not — planner judgment: list index + colecao only if it's a real destination; today it's a placeholder → list index.html only, revisit at Phase 3). robots.txt: allow all + sitemap pointer.
- **D-05:** SEO-05 JSON-LD Organization with `sameAs` → https://instagram.com/ougranch (and https://ougranch.com.br/ as url? The brand site IS oug-ranch.github.io; the STORE is ougranch.com.br — use github.io as url, store + instagram in sameAs).

### Carried forward / already shipped (verify & reconcile, don't rebuild)
- **HERO-03 marquee**: shipped in Phase 1 (dual marquee + fence, owner-approved). Verify `prefers-reduced-motion` pause covers BOTH tracks → mark Complete.
- **A11Y-03**: focus-visible ring shipped (Phase 1); marquee pause shipped. Verify programmatically → mark Complete.
- **PERF-03**: touch targets ≥44px — hamburger button, drawer close, .cards-btn (44px already) — audit and fix any sub-44px target.
- **A11Y-02** (scrim over photos): photos don't exist yet → stays pending with Phase 3; note text-shadow mitigation already shipped on photo covers.
- Prior review open items routed here: arrows ←→↗ unicode-range (Phase 1 review, minor) — fix by adding the codepoints to the Inter @font-face unicode-range (font file lacks glyphs? The WOFF2 latin subset may not include arrows — if glyphs truly absent, document fallback as accepted; verify before claiming fixed).

### the agent's Discretion
- Exact OG/Twitter tag set (og:title/description/image/url/type + twitter:card summary_large_image), meta tag placement, sitemap lastmod values.
- OG image generation method (image-generation tool, then JPEG-compress via System.Drawing to ≤300 KB; fallback: typographic card drawn with GDI+ using a bold system font if the generated text is garbled — must read the produced image to verify the wordmark text is correct).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning
- `.planning/ROADMAP.md` § Phase 4 — goal + success criteria (announcement bar reconciled per D-01; phone end-to-end check is owner UAT)
- `.planning/REQUIREMENTS.md` — NAV-05, HERO-03, SEO-01..05, A11Y-02/03, PERF-03 definitions
- `.planning/phases/02-home-page-collections-brand-info/02-01-SUMMARY.md` — current shipped state
- `README.md` — owner guide (add "trocar a imagem de compartilhamento" step when the file exists)

### Code
- `index.html`, `colecao.html`, `404.html` — pages getting metadata
- `css/styles.css` — reduced-motion + focus rules to audit; touch targets
- `js/main.js` — hamburger/drawer targets to audit
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Approved home aesthetic (cream + giant black Inter wordmark + fence) = the OG card design source
- Favicon set already shipped (SEO-04 partially complete)
- GitHub Pages org-root deployment → absolute URLs are simply https://oug-ranch.github.io/...

### Established Patterns
- Cache-bust ?v=N on css changes (currently v=7); classic scripts; relative paths in page internals; rel=noopener on externals

### Integration Points
- `<head>` of the 3 pages; new top-level files sitemap.xml + robots.txt; images/og-card.jpg
</code_context>

<specifics>
## Specific Ideas

- Owner declined the announcement bar explicitly — do not implement it "as a courtesy"; annotate and move on.
- OG card must match the approved visual direction (cream/black typographic) — NOT a photo collage.
</specifics>

<deferred>
## Deferred Ideas

- A11Y-02 scrim + og:image photo swap + full phone launch check → complete when Phase 3 executes with real photos.
- None else — scope stayed within phase.
</deferred>

---

*Phase: 04-editorial-polish-social-seo-launch*
*Context gathered: 2026-11-13*
