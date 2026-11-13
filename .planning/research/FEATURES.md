# Feature Research

**Domain:** Fashion-brand lookbook website (streetwear, Brazilian market, static / zero-cost GitHub Pages, mobile-first)
**Researched:** 2026-11-13
**Confidence:** HIGH (patterns cross-verified between two live reference sites, 7 Brazilian streetwear sites, and industry/standards sources; single-source claims flagged inline)

## How to read this file

Each feature is tagged:
- **Category:** Table Stakes (users/owners expect it) vs Differentiator (sets brand apart) vs Anti-Feature (build nothing)
- **GitHub Pages fit:** ✅ free static hosting supports it natively / ⚠️ possible but needs tradeoff / ❌ needs paid service or backend

Feature statements are written user-centric so the requirements definer can present them for v1 scoping.

---

## Feature Landscape

### A. Navigation & Header

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Header with brand wordmark/logo that links to Home (smooth scroll to top) | Table stakes | ✅ | Universal: Ciena (SVG logo), isadeburgh (clickable SVG logotype), Supreme (logo as the page itself). Fashion sites read as premium with a **centered** logo | LOW | Logo as SVG keeps it crisp and free; no image generation needed |
| Mobile menu: hamburger button opening a drawer or full-screen overlay with the few nav links (Coleções, Lookbook, Sobre, Contato/Instagram) | Table stakes | ✅ | Ciena uses Shopify's drawer menu (`HeaderDrawer`); isadeburgh uses a hamburger with nav list. "Hamburger-first minimal" is rated the easiest responsive pattern because desktop already behaves like mobile | LOW | 4-7 links max; no mega menu needed |
| Desktop: inline nav links beside/below the centered logo | Table stakes | ✅ | Both reference sites show nav on desktop; only hamburger on mobile | LOW | Pure CSS media query |
| Sticky header that hides on scroll-down and reappears on scroll-up | Differentiator | ✅ | Common in fashion e-commerce themes (Shopify header docs: Always / hide-on-scroll-up / off). Nice on long photo pages but not expected of a lookbook | LOW | ~10 lines of CSS+JS. Alternative: non-sticky header, zero JS |
| Footer with Instagram icon link (aria-labeled), brand name, small nav repeat | Table stakes | ✅ | Every sampled site has social links in the footer; Ciena's footer Instagram SVG has `aria-label="Instagram"` | LOW | |
| Announcement bar above the header (promo / drop date / WhatsApp number), optional scrolling marquee | Differentiator (Table stakes for stores, differentiator for a lookbook site) | ✅ | Ciena runs a scrolling header marquee: "ATENDIMENTO PELO WHATSAPP (21) 93618-5575". BRZ Coast uses promo bars ("FRETE GRÁTIS…", "LIQUIDA 🔥"). Streetwear themes (Echelon) ship "marquee announcement bar" as a headline feature | LOW | Pure CSS marquee; must pause under `prefers-reduced-motion` |

### B. Home / Hero

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Full-bleed hero: large brand/campaign image with brand name overlaid | Table stakes | ✅ | 55.4% of fashion sites use text-over-full-bleed-image heroes (vs 35.7% general); 81.3% use photography. isadeburgh pairs hero copy with a dedicated **mobile hero image** | LOW | Separate mobile crop is a cheap quality win — include it |
| Hero CTA / scroll cue pointing to the collections ("Ver coleções" / featured-work button) | Table stakes | ✅ | isadeburgh has a "featured work" hero CTA that scrolls to `#work`; hero-slider templates always pair a CTA ("View Lookbook") | LOW | |
| Text marquee / ticker (brand words, collection names scrolling in infinite loop) | Differentiator | ✅ | isadeburgh runs two dual-direction infinite text carousels (desktop + separate mobile wrappers); "editorial marquee" is a recognized high-fashion device. CSS-keyframe marquee costs near-zero bandwidth | LOW-MED | Duplicate content once for seamless loop; pause on `prefers-reduced-motion` |
| Preloader with counter / intro animation before content shows | Differentiator | ⚠️ | isadeburgh has a numbered loader. Signature editorial move, but it **delays LCP** and hurts the first impression on slow phones | MED | Recommend skip in v1; if wanted, keep < 1s and skip it on repeat visits |
| Autoplay muted looping video in hero or as editorial break | Differentiator | ⚠️ | isadeburgh uses `autoplay muted loop playsinline` video; full-width video breaks are a fashion-site pattern. GitHub Pages serves video fine but **eats the free 1 GB soft limit** fast | MED | Only if owner supplies a small (<10 MB) compressed MP4 |

### C. Collections Listing (home section, ciena-lab style)

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Collection cards: **cover image + title + short story text**, whole card clickable → lookbook page | Table stakes | ✅ | Verified exactly on cienalab.com.br: `carousel-slide` → single `<a>` wrapping cover `<img>` (alt = title) + `<h3>` + `<p>` narrative. This is the requested pattern | LOW | One anchor per card is also the accessible pattern |
| Collections ordered **newest first** | Table stakes | ✅ | Drop culture: latest collection leads. Ciena's carousel starts with the most recent collection (Maximum Speed Research, Nov 2025 cover, before 2025/2024 collections) | LOW | Just list order in HTML; owner reorders by editing files |
| Narrative text per collection ("a coleção explora…") displayed under the title | Table stakes | ✅ | Ciena's core storytelling device — every collection card carries a paragraph explaining the concept. This is what makes a lookbook a story, not a gallery | LOW | |
| On mobile, collection cards presented as swipeable full-width slides (carousel) OR stacked full-width cards | Table stakes (pick one) | ✅ | Ciena: swipeable slides at `calc(100% - 20px)` width on ≤768px. Stacked full-width is the simpler zero-JS equivalent; vertical scroll is the natural mobile pattern | LOW | Recommendation: stacked cards in v1 (no Swiper dependency); swipe carousel is a v1.x upgrade |
| Cover hover state (image scale/zoom, title reveal) | Differentiator | ✅ | Fashion-card convention (hover-to-zoom is ubiquitous in fashion e-commerce; Ciena defines `.carousel-slide:hover`) | LOW | Pure CSS; on touch devices hover is meaningless so keep it subtle |
| Filter/tabs by year or season | Anti-Feature | — | Collections will number single digits in v1; filters add complexity with no user need | — | Revisit if >12 collections |

### D. Individual Lookbook Page

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Single-column photo stack, full-width, scroll to view (mobile) | Table stakes | ✅ | Industry consensus: "stacked layout… great for lifestyle brands with editorial-style photography… works well for apparel with lookbook-style images"; vertical scrolling is the mobile default. isadeburgh shows project work in flowing stacks | LOW | Add `width`/`height` or `aspect-ratio` to every photo |
| Lookbook page header: collection title + its story text at top | Table stakes | ✅ | Ciena shows the collection narrative on the collection page; storytelling must continue past the click | LOW | |
| Tap a photo → lightbox with enlarged view, prev/next arrows, close (×), click-outside closes | Table stakes | ✅ | Ciena implements exactly this custom lightbox (`.lightbox` with prev/next/close, closes on outside click). Requested by owner | MED | Native `<dialog>` + keyboard support is the modern zero-dependency route |
| Lightbox swipe between photos on mobile + keyboard arrows on desktop + Esc to close | Differentiator | ✅ | Ciena's lightbox has buttons; touch parity + `Esc` are the quality bar (keyboard/touch parity is explicitly recommended for galleries). CSS scroll-snap inside a dialog gives swipe free | MED | |
| Back navigation: "← Voltar / Coleções" link returning to home collections | Table stakes | ✅ | Ciena has "Voltar à loja"; every lookbook page needs an obvious exit. (Browser back also works; the link is for shared-link arrivals) | LOW | |
| Previous / Next collection navigation at page end ("Próxima coleção →") | Differentiator | ✅ | isadeburgh uses PREVIOUS/NEXT PROJECT buttons to chain work; keeps visitors browsing collections | LOW | |
| Photo grid (2-3 columns) on desktop instead of single column | Table stakes (desktop variant) | ✅ | Ciena uses a CSS grid gallery with variable spans on desktop; grids collapse to one column on phones | LOW | Grid via CSS `grid-column: span n`; single source of truth per photo |
| Pinch-zoom inside lightbox | Anti-Feature | ✅ | Reliable pinch-zoom needs a library (PhotoSwipe) and fights scroll-snap; the enlarged lightbox view already serves the need | — | Skip; revisit only if owner insists |

### E. Brand Info Section

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| "Sobre a marca" blurb: short brand story/manifesto below the collections | Table stakes | ✅ | Every Brazilian streetwear site sampled has a Quem somos / Sobre Nós narrative (Real Grapixo, Hardvision); Ciena's brand line ("grupo jovem, irreverente e, essencialmente brasileiro") doubles as meta description. Storytelling rooted in place/suburb is the genre convention | LOW | Content TBD by owner; placeholder required |
| Instagram link/button (@handle) in brand section + footer | Table stakes | ✅ | Instagram is the primary social channel on all 7 sampled BR streetwear sites; Ciena footer has it. For an unlaunched brand, Instagram IS the storefront | LOW | |
| WhatsApp contact link (`wa.me/55…`) with a "fale conosco" CTA | Table stakes | ✅ | **Universal** in the BR sample: owlshit, BRZ Coast, Real Grapixo, Hardvision, OF Street, Bronky, Yung Street all list WhatsApp; Ciena puts it in the header marquee. Brazilian market convention | LOW | One `<a href="https://wa.me/55DDNº">`; zero cost |
| Embedded live Instagram feed | Differentiator | ⚠️ | Common on brand sites but real embeds need third-party widgets (paid tiers, scripts) or fragile iframes; GitHub Pages + zero-cost pushes against it | MED | Free alternative: owner curates a static grid of 4-6 screenshot cards linking to posts, or just the @handle link. Recommend link-only in v1 |
| Contact email link | Table stakes | ✅ | Present on all sampled sites | LOW | isadeburgh adds copy-to-clipboard with "Copied!" toast — nice cheap differentiator |
| Brand timeline / year-by-year milestones | Differentiator | ✅ | isadeburgh's year list; Hardvision's "Desde 2011" narrative | LOW | Only meaningful after the brand has history — defer |

### F. Mobile UX Must-Haves

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Touch targets ≥ 44px (WCAG 2.2 floor is 24×24 CSS px) for menu button, lightbox arrows/close, cards | Table stakes | ✅ | WCAG 2.2 SC 2.5.8 (new AA criterion); mobile-UX guidance says 48px min for lookbook UIs | LOW | CSS padding, not icon size |
| Every image declares `width`/`height` or CSS `aspect-ratio` (no layout jump while photos load) | Table stakes | ✅ | "Images without dimensions are the dominant cause of image-related CLS" (web.dev). Critical on photo-stack pages where everything below shifts | LOW | Owner must keep dimensions; a small build script or documented size convention helps |
| `loading="lazy"` on below-the-fold photos; hero/LCP image eager + `fetchpriority="high"` | Table stakes | ✅ | web.dev: never lazy-load the initial-viewport image; lazy-loading below-fold images improves LCP under poor networks | LOW | One attribute |
| Compressed, right-sized images (WebP/JPEG at display width, srcset when feasible) | Table stakes | ✅ | Photo payload is 80-90% cut by sizing; GitHub Pages has no image CDN, so files must ship pre-compressed | MED | Tension with "owner swaps files by hand": provide a one-command optimization script or document targets (e.g., ≤1600px, ≤300 KB). Multi-size `srcset` = owner burden; recommend single right-sized file in v1 |
| Loading placeholder (skeleton shimmer or dominant-color background) while photos load | Differentiator | ✅ | CSS-only skeleton costs 0 bytes (skeleton strategy table); prevents "empty gap then pop-in" feel on slow connections | LOW | |
| Smooth native scrolling (no scroll-jacking / heavy animation libraries) | Table stakes | ✅ | isadeburgh pulls in GSAP + Lenis; for a photo site the mobile win is *not* fighting the browser. Vertical flow + `prefers-reduced-motion` respect is the pattern | LOW | Vanilla site, zero dependencies |

### G. SEO / Social Sharing (static-site table stakes)

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Unique `<title>` + `<meta description>` per page | Table stakes | ✅ | "Nine things every static site needs before it can rank" — item 1. Ciena sets both per page | LOW | |
| Open Graph + Twitter card tags with **absolute** 1200×630 image (JPEG, not WebP) | Table stakes | ✅ | Decides whether a shared link looks like a page or a bare string — for a brand with no ads, Instagram/WhatsApp shares ARE the acquisition channel. Ciena ships full OG set + `twitter:card summary_large_image` | LOW | Verify against the live URL, not github.io |
| Absolute canonical URL per page | Table stakes | ✅ | GitHub Pages-specific trap: `user.github.io/repo` and a custom domain serve **duplicate content**, and Pages offers no 301 — canonical is the only lever | LOW | Decide domain (github.io vs custom) before writing tags |
| `sitemap.xml` + `robots.txt` referencing it | Table stakes | ✅ | Standard static-SEO checklist; both reference sites ship favicons/robots conventions | LOW | Tiny hand-written file for a small site |
| `404.html` (auto-served by Pages) with link back home | Table stakes | ✅ | Pages serves it from root automatically; shared typo'd links get a branded recovery page | LOW | |
| Favicon (+ `theme-color`, `lang="pt-BR"`) | Table stakes | ✅ | Both reference sites ship them; mobile browser tab identity | LOW | |
| JSON-LD `Organization` with `sameAs` (Instagram) | Differentiator | ✅ | Standard on the Brazilian Nuvem-shop sites sampled (BRZ Coast, OF Street, Bronky all emit it); cheap structured-data win | LOW | |
| Per-photo alt text describing the look | Table stakes (overlaps Accessibility) | ✅ | Doubles as SEO (images indexable) | LOW | See H |

### H. Accessibility Table Stakes (image-heavy site)

| Feature | Category | GH Pages Fit | Why Expected | Complexity | Notes |
|---------|----------|--------------|--------------|------------|-------|
| Alt text on informative images; `alt=""` on decorative ones; linked cover images describe the **destination** ("Ver lookbook da coleção X") | Table stakes | ✅ | W3C WAI image tutorial: functional images' alt describes the function, decorative need `alt=""` (omitting the attribute is worse — screen readers announce filenames) | LOW | Owner-editable convention to document |
| Text over images meets 4.5:1 contrast (3:1 large text) via scrim overlay | Table stakes | ✅ | WCAG 2.2 SC 1.4.3; fashion heroes put text on photos by definition, so a semi-transparent overlay is the standard fix | LOW | |
| Visible focus states; lightbox moves focus in, Esc closes, focus returns | Table stakes | ✅ | Keyboard/touch parity is the recommended gallery bar; native `<dialog>` gives focus trapping free | MED | |
| Marquees/animations pause under `prefers-reduced-motion` | Table stakes | ✅ | Standard practice for editorial motion (marquee docs explicitly implement it) | LOW | |

---

## Feature Dependencies

```
[Hero with eager LCP image] ──requires──> [Image dimensions convention] ──requires──> [Owner photo workflow doc]
[Collection cards] ──requires──> [Lookbook pages exist] (links)
[Lightbox] ──requires──> [Photo stack/grid with dimensions] (no CLS when dialog opens)
[Lightbox keyboard/touch parity] ──requires──> [Focus management + Esc handling]
[Canonical URLs] ──requires──> [Domain decision: user.github.io/repo vs custom domain]
[OG share cards] ──requires──> [1200x630 og image asset] ──requires──> [brand imagery]
[Announcement bar / marquee] ──requires──> [prefers-reduced-motion handling]
[Prev/next collection nav] ──requires──> [≥2 collections] ──conflicts with──> [nothing; harmless at 1]
[Instagram feed embed] ──conflicts with──> [Zero-cost, no third-party scripts] → use link/screenshot grid instead
```

### Dependency Notes

- **Domain decision before SEO tags:** canonical, OG URLs, sitemap and robots all hard-code the production origin; changing later means editing every page.
- **Photo-dimension convention before launch content:** every CLS/lazy/aspect-ratio feature assumes owner-supplied photos carry known dimensions; bake the convention into the placeholder files from day one.
- **Lightbox after stack:** build the stack first — it must look complete without JS (photos visible, scrollable); the lightbox only enhances it.

## MVP Definition

### Launch With (v1)

- [ ] Header: centered wordmark + hamburger drawer menu (mobile) / inline links (desktop) — the whole site's navigation is 4-5 links
- [ ] Hero: full-bleed brand image (separate mobile crop) with wordmark overlay + "ver coleções" scroll cue
- [ ] Collections section: cards with cover + title + story text, whole card clickable, newest first
- [ ] Lookbook pages: single-column photo stack (mobile), grid + lightbox (desktop), lightbox with prev/next/close + Esc, back link
- [ ] Brand info section: about blurb placeholder + Instagram link + WhatsApp link
- [ ] Footer: social links + brand name
- [ ] SEO basics: per-page title/description, OG/Twitter with 1200×630 image, absolute canonicals, robots.txt + sitemap.xml, 404.html, favicon, `lang="pt-BR"`
- [ ] Accessibility basics: alt text convention, scrim contrast, focus states, 44px touch targets, image dimensions + lazy loading

### Add After Validation (v1.x)

- [ ] Announcement bar / marquee ticker — when the owner has promos or a drop date to announce
- [ ] Text marquee of collection names (isadeburgh-style editorial device) — when brand voice is settled
- [ ] Swipe carousel for collection cards (replacing stacked cards) — if owner wants the exact ciena feel
- [ ] Prev/next collection links at lookbook page end — trivial, add when 2+ collections exist
- [ ] JSON-LD Organization with sameAs — anytime, 20 lines
- [ ] Image optimization helper script (resize/compress to spec) — when owner starts swapping real photos
- [ ] Copy-to-clipboard email with toast — nice touch, trivial

### Future Consideration (v2+)

- [ ] Custom domain (+ DNS/CNAME + HTTPS enforcement) — costs only the domain registration; decide before writing canonicals if the owner wants one
- [ ] Autoplay video hero / editorial video break — only when owner supplies small compressed MP4s
- [ ] Preloader counter animation — brand flourish; must be <1s and respect reduced-motion
- [ ] Instagram feed embed (if a free acceptable path emerges) — otherwise curated screenshot grid stays the substitute
- [ ] Brand year-timeline section — after the brand has history to show

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Collections cards (cover+title+text, clickable) | HIGH | LOW | P1 |
| Lookbook photo stack (mobile single column) | HIGH | LOW | P1 |
| Lightbox (enlarge/prev/next/close) | HIGH | MEDIUM | P1 |
| Hero (full-bleed + wordmark + CTA) | HIGH | LOW | P1 |
| Header + hamburger menu | HIGH | LOW | P1 |
| Brand info (about + IG + WhatsApp) | HIGH | LOW | P1 |
| SEO/social meta (OG, canonical, sitemap, 404) | HIGH | LOW | P1 |
| Image loading UX (dimensions, lazy, compression) | HIGH | LOW-MED | P1 |
| Accessibility basics (alt, contrast, focus, targets) | MEDIUM | LOW | P1 |
| Announcement bar / promo marquee | MEDIUM | LOW | P2 |
| Editorial text marquee | MEDIUM | LOW-MED | P2 |
| Swipe carousel cards | MEDIUM | MEDIUM | P2 |
| Prev/next collection links | MEDIUM | LOW | P2 |
| JSON-LD Organization | LOW-MED | LOW | P2 |
| Skeleton placeholders | LOW-MED | LOW | P3 |
| Custom domain | MEDIUM | LOW (needs $$ + DNS) | P3 |
| Video hero / preloader | LOW-MED | MED | P3 |
| Instagram live feed | LOW | MED (breaks zero-cost) | P3 |

**Priority key:** P1 = must have for launch · P2 = should have, add when possible · P3 = nice to have, future consideration

## Competitor Feature Analysis

| Feature | Ciena Lab (BR reference) | Isadeburgh (editorial reference) | BR streetwear sites (owlshit, BRZ Coast, Real Grapixo, Hardvision…) | Our Approach (OUG RANCH) |
|---------|--------------------------|----------------------------------|--------------------------------------------------------------------|--------------------------|
| Collection presentation | Swipeable carousel of cards: cover + title + story, whole card links to `/pages/{slug}` | Work sections as editorial case studies with prev/next | Products-first (shops), collections in menus | Same card pattern, stacked on mobile (no JS), grid-capable on desktop |
| Individual lookbook page | CSS grid gallery + custom lightbox (prev/next/close/outside-click) | Image collages, autoplay videos, project meta | N/A (product pages) | Single-column stack mobile + grid desktop, lightbox w/ Esc + swipe |
| Header | Drawer menu mobile, inline desktop, **WhatsApp marquee announcement** | Hamburger + nav list, GET IN TOUCH CTA, preloader | Hamburger + announcement promo bars | Centered wordmark + hamburger; sticky optional |
| Brand info | Brand line in OG/meta; WhatsApp in header | About section, year timeline, email copy-to-clipboard, socials | Quem somos pages, WhatsApp everywhere, Instagram primary | About blurb + Instagram + WhatsApp links, owner-filled |
| SEO/social | Full OG + twitter + canonical + favicon per page | Full OG set + robots + favicon | OG basics + JSON-LD Organization w/ sameAs | Same set + sitemap/404; absolute canonicals for Pages duplicate-host trap |
| Stack | Shopify (heavy) | Static HTML/CSS/JS + GSAP + Lenis (vanilla hosting, library-heavy) | Nuvemshop/Shopify platforms | Pure static vanilla HTML/CSS/JS on GitHub Pages — zero cost, owner-editable files |

## Sources

Direct site inspection (HIGH confidence — primary artifacts):
- Ciena Lab lookbook index: https://www.cienalab.com.br/pages/lookbook (card pattern, WhatsApp marquee, drawer menu, OG set, Swiper 11, Instagram footer)
- Ciena Lab collection page: https://cienalab.com.br/pages/maximum-speed-research (grid gallery + custom lightbox prev/next/close, "Voltar à loja", srcset + loading=eager logo)
- Isadeburgh home: https://isadeburgh.com/ (hero, marquees, hamburger, preloader, prev/next project, email copy, meta set)
- Brazilian streetwear contact/about pages: https://owlshit.store/policies/contact-information · https://www.brzcoast.com.br/contato/ · https://www.realgrapixo.com.br/pagina/quem-somos.html · https://www.hardvision.com.br/pagina/sobre-nos.html · https://www.ofstreet.com.br/contato/ · https://bronkybrand.com/contato/ · https://yungstreet.com.br/contato/ (WhatsApp universality, Instagram primacy, JSON-LD sameAs, announcement bars)

Industry / standards sources (MEDIUM confidence, cross-checked):
- Hero-layout statistics & fashion examples: https://createtoday.io/examples?category=fashion
- Editorial marquee hero pattern: https://www.redesignee.com/items/editorial-marquee-image-hero/1824
- Lookbook layout choice (grid vs masonry vs carousel, mobile 1-column): https://hbn-studio.com/notes/choose-grid-masonry-or-carousel-for-shopify-lookbook/ and https://snug-gallery.beaconwavestudio.com/guides/gallery-layouts-masonry-grid-carousel-collage
- Stacked-vs-grid gallery for fashion: https://craftshift.com/shopify-product-gallery-layouts/
- Mobile-first lookbook behavior: https://www.ryviu.com/blog/design-lookbooks-for-mobile-first-shopping-behavior
- Header/nav layouts (centered logo premium, hamburger-first, mobile behavior): https://www.zachswebdesigns.com/website-header-design-ideas-11-layouts-that-work-for-different-business-types/ and https://fourcore.dev/docs/esses/header/
- GitHub Pages SEO: https://lkowalskil.github.io/deploy-static-site-github-pages.html · https://www.runxbuild.com/blog/github-pages-seo/ · https://zjq.me/blog/2026-03-12-seo-optimization-github-pages/
- Image performance: https://web.dev/learn/performance/image-performance · https://web.dev/articles/optimize-cls · https://cloudinary.com/guides/web-performance/react-lazy-loading-images · https://sujeet.pro/articles/image-loading-optimization
- Accessibility: https://www.w3.org/WAI/tutorials/images/ · https://www.w3.org/TR/WCAG22/ (SC 1.4.3, 2.5.8) · https://www.wcag.com/blog/content-over-images-how-does-this-ux-ui-trend-impact-accessibility/ · https://web.dev/learn/accessibility/images

---
*Feature research for: OUG RANCH — static fashion-brand lookbook site*
*Researched: 2026-11-13*
