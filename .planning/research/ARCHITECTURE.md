# Architecture Research

**Domain:** Static fashion lookbook website (GitHub Pages, no build step, non-expert maintainer)
**Researched:** 2026-11-13
**Confidence:** HIGH (hosting limits, CORS behavior, and Jekyll exclusions verified against official docs; architecture choices follow from verified constraints)

## Standard Architecture

### System Overview

```
┌────────────────────────────────────────────────────────────────┐
│                     GITHUB PAGES (free CDN)                     │
│         serves repo files as-is (add .nojekyll at root)         │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  index.html ──────────────► lookbook.html?c=<slug>              │
│  (home / hero)               (one generic template page)        │
│      │                            │                             │
│      ├── js/collections.js ◄──────┤   same data file, both pages │
│      │   (plain JS: window.COLLECTIONS = [...])                   │
│      ├── js/main.js              ├── js/lookbook.js             │
│      │   (renders cards)         │   (renders photos + lightbox)│
│      └── css/styles.css          └── css/styles.css             │
│                                                                 │
│  images/collections/<slug>/cover.jpg + 01.jpg … NN.jpg          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

There is **no backend, no build step, no framework, no JS module system**. The whole site is two page templates plus one data file plus one stylesheet.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `index.html` | Brand hero + list of collection cards | Static shell; cards rendered by `main.js` from data |
| `lookbook.html` | Single-column photo stack + lightbox for one collection | Static shell; populated by `lookbook.js` reading `?c=` slug |
| `js/collections.js` | **Single source of truth** for all collections (title, description, folder, photo list, cover) | Plain classic script: `window.COLLECTIONS = [ {...}, {...} ]` |
| `js/main.js` | Render home cards, sort by date, handle render errors | ~100 lines vanilla JS |
| `js/lookbook.js` | Read slug, render photo stack, lightbox, error state for unknown slug | ~150 lines vanilla JS |
| `css/styles.css` | All styling: tokens, layout, breakpoints, lightbox | One file, CSS custom properties for brand theming |
| `images/collections/<slug>/` | Photos for one collection | Owner drops files here; filenames listed in the data entry |
| `404.html` | Friendly fallback for mistyped links | GitHub Pages serves this automatically |
| `.nojekyll` | Skips Jekyll processing entirely | Empty file at repo root |

## Recommended Project Structure

```
LOOKBOOK/                      (repo root = Pages publish source)
├── .nojekyll                  # skip Jekyll — avoids underscore/hidden-file surprises
├── index.html                 # home: hero + collection cards
├── lookbook.html              # generic collection page (driven by ?c=slug)
├── 404.html                   # fallback page
├── css/
│   └── styles.css             # the ONLY stylesheet
├── js/
│   ├── collections.js         # THE data file owner edits to add collections
│   ├── main.js                # home page logic
│   └── lookbook.js            # lookbook page logic + lightbox
├── images/
│   └── collections/
│       ├── verao-2026/        # one folder per collection
│       │   ├── cover.jpg      # card thumbnail (same file reused on lookbook page)
│       │   ├── 01.jpg
│       │   ├── 02.jpg
│       │   └── ...
│       └── inverno-2026/
│           └── ...
└── README.md                  # owner-facing "how to add a collection" checklist
```

### Structure Rationale

- **Flat root, 3 top-level folders:** A non-expert opening the repo sees only `css/`, `js/`, `images/` plus a handful of HTML files. Nothing to configure, nothing to build.
- **One generic `lookbook.html`** instead of one HTML file per collection: new collections never require copying/editing HTML. This is the single most important structural decision (see Anti-Patterns).
- **`images/collections/<slug>/`:** "one collection = one folder" maps directly to the owner's mental model. Slugs are lowercase-with-hyphens, used both as folder name and as the `?c=` value.
- **Relative paths everywhere** (`images/...`, `css/...`): mandatory if the site is ever served from a project repo (`user.github.io/LOOKBOOK/`), where absolute `/images/...` paths break.
- **All scripts are classic `<script>` tags, NOT `type="module"`:** ES modules are CORS-fetched and are **blocked on `file://`** (verified — see Sources). Classic scripts keep "double-click index.html on Windows" working, which is the owner's de facto local preview method.

## Architectural Patterns

### Pattern 1: Data-driven static site with a plain JS data file (RECOMMENDED for collection data)

**What:** All collection metadata lives in `js/collections.js` as a global array, loaded via `<script src>` — no `fetch`, no JSON, no build step.

**Why this beats the alternatives (the key tradeoff decision):**

| Option | Works when owner double-clicks index.html on Windows? | Owner edit difficulty via GitHub web UI | New collection requires touching markup? |
|--------|------|------|------|
| **Plain JS data file (`collections.js`)** | ✅ Yes — script tags load fine on `file://` | ✅ Edit one file, copy-paste an entry | ❌ Never |
| JSON + `fetch()` at runtime | ❌ **No — blocked by CORS on `file://`** (Chrome/Edge/Firefox all treat `file://` origins as opaque; verified) | ✅ Same as above | ❌ Never |
| Per-collection HTML template page (duplicate & edit) | ✅ Yes | ❌ Owner must copy HTML and edit `<img>` tags by hand — error-prone | ✅ Yes (copy page, edit markup) |

**When to use:** Always, for this project. The `file://` failure mode of the JSON option is disqualifying: the owner WILL open the folder locally to check their work before pushing, and a blank page with a console error is exactly the kind of thing that makes a non-expert give up.

**Downside honestly stated:** `collections.js` must be valid JavaScript (a missing comma breaks everything). Mitigate with: a commented template entry at the top of the file, and a defensive pattern in `main.js` (`if (!Array.isArray(window.COLLECTIONS)) show "check collections.js" message`).

**Example:**

```js
// js/collections.js
// To add a collection: 1) create images/collections/<slug>/ and upload photos
// 2) copy this template, fill in, paste at the TOP of the list:
//   { slug: "meu-look", title: "Título", date: "2026-03-01",
//     description: "Texto curto da coleção.",
//     cover: "cover.jpg",
//     photos: ["01.jpg", "02.jpg", "03.jpg"] },
window.COLLECTIONS = [
  {
    slug: "verao-2026",
    title: "Verão 2026",
    date: "2026-01-15",
    description: "Primeira coleção da marca.",
    cover: "cover.jpg",
    photos: ["01.jpg", "02.jpg", "03.jpg"]
  }
];
```

```html
<!-- in both index.html and lookbook.html, order matters: data first, then logic -->
<script src="js/collections.js"></script>
<script src="js/main.js"></script> <!-- or lookbook.js -->
```

**Why explicit `photos: [...]` list instead of a numeric `count` + auto-numbering:** a miscounted number silently produces broken image links; an explicit list fails visibly during editing and needs no special casing. Cost: owner types filenames once per collection.

### Pattern 2: One generic template page + URL query parameter (RECOMMENDED for lookbook pages)

**What:** `lookbook.html?c=verao-2026` — a single HTML file whose content is generated by `lookbook.js` from the slug in the query string.

**Why:** Satisfies both constraints that usually conflict:
- **Shareable, stable links** (WhatsApp/Instagram bio links — critical for a Brazilian fashion brand, where traffic is overwhelmingly mobile + WhatsApp): every collection has its own URL, works in any browser, no JS-router hacks.
- **Zero markup edits** when adding a collection.

**When to use:** Whenever the number of "pages" is data-defined and the page layout is identical across items — exactly this case.

**Trade-offs:** Content is JS-rendered, so view-source shows a shell. Acceptable here: a lookbook is an image-first product; SEO matters far less than for a content site, and the brand can add `<meta>` tags for the shared title/description. Avoid a full SPA hash-router (`#/lookbook/verao-2026`): it complicates links, adds no value over `?c=`, and is harder for a non-expert to reason about.

**Example:**

```js
// js/lookbook.js
const slug = new URLSearchParams(location.search).get("c");
const col = (window.COLLECTIONS || []).find(c => c.slug === slug);
if (!col) { document.body.innerHTML = ""; /* render "collection not found" + link home */ }
else { document.title = col.title; /* render title, description, <img> stack */ }
```

### Pattern 3: CSS custom properties as the brand theming layer

**What:** All brand decisions (colors, fonts, spacing, breakpoints) are CSS custom properties on `:root`, in one `styles.css`.

**When to use:** Any project where a non-designer will tweak the look over time — changing the brand color becomes a one-line edit instead of a hunt through the file.

**Trade-offs:** None meaningful at this scale; custom properties are supported in every browser that matters (and gracefully degrade to defaults if one is misnamed).

**Example:**

```css
:root {
  --color-bg: #ffffff;
  --color-ink: #111111;
  --color-accent: #b98a5e;   /* ← owner changes this, whole site follows */
  --font-display: "Georgia", serif;
  --font-body: system-ui, sans-serif;
  --max-width: 1200px;
}
@media (min-width: 640px)  { /* tablet: cards in 2 columns */ }
@media (min-width: 1024px) { /* desktop: cards in 3 columns */ }
```

Mobile-first single-column is the default (no media query needed); min-width queries only widen. One stylesheet, no preprocessor, no Tailwind build.

## Data Flow

### Request Flow

```
Visitor opens link (e.g. from WhatsApp bio)
    ↓
GitHub Pages CDN serves static file (no server logic)
    ↓
Browser loads styles.css → collections.js → main.js / lookbook.js (classic scripts)
    ↓
JS reads window.COLLECTIONS, renders cards or photo stack
    ↓
<img loading="lazy"> fetches photos only when scrolled near (saves bandwidth)
    ↓
Click photo → lightbox (same image at full size, Esc/click closes)
```

### Owner Content Flow (the architecture's real "data flow")

```
New collection:
  1. Create folder images/collections/<slug>/
  2. Upload photos (cover.jpg, 01.jpg … NN.jpg), resized to ≤1600px wide
  3. Open js/collections.js → paste filled-in template entry at top
  4. Commit (GitHub web UI "Add file"/"Upload files" or drag-and-drop)
     ↓
  GitHub Pages auto-rebuilds (~1 min) → site live
```

The owner touches exactly **two things per collection: one folder, one file**. No HTML, no CSS, no JS logic.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1–10 collections (~50–200 photos) | Nothing. Base design handles this. |
| 10–50 collections (~200–1,500 photos) | Watch repo size: keep ≤1 GB (GitHub Pages hard limit) and ≤100 MB per file. At ~400 KB/photo, 1 GB ≈ 2,000+ photos. Resize photos before upload. |
| 50+ collections / traffic grows | Two escape hatches, no rewrite needed: (a) offload images to an image CDN (Cloudinary/imgur-style) and keep URLs in the same `photos: []` arrays; (b) move to Netlify/Cloudflare Pages — folder structure is 100% portable. |
| Bandwidth | Soft limit 100 GB/month (verified). A 15-photo lookbook at ~400 KB/photo ≈ 6 MB/visit → ~16k visits/month before any concern. `loading="lazy"` is the main lever. |

### Scaling Priorities

1. **First bottleneck: repo size from photos.** Prevention is behavioral, not technical: owner resizes to ≤1600 px / ~400 KB before upload (Windows Photos app → Resize, or a one-time helper). Nothing in the architecture needs to change for years.
2. **Second bottleneck: bandwidth** (unlikely for a new brand). If hit, swap photo folder URLs for CDN URLs in the data file — a data-only change.

## Anti-Patterns

### Anti-Pattern 1: One HTML page per collection (duplicate-and-edit)

**What people do:** Copy `lookbook-verao-2026.html` for each collection and edit the `<img>` tags by hand.
**Why it's wrong:** Doesn't scale with the explicit requirement "many collections over time"; every photo add/edit means editing HTML markup; a typo in one page breaks only that page (silent drift); updating the page layout means editing N files.
**Do this instead:** One `lookbook.html` + data entry (Pattern 2). If the owner ever wants per-collection custom styling, add an optional `theme` field to the data entry that toggles a CSS class.

### Anti-Pattern 2: Runtime `fetch()` of JSON (or ES module imports) for the data

**What people do:** `fetch('data/collections.json')` — feels "cleaner".
**Why it's wrong:** Verified: browsers block `fetch`/XHR/module-imports on `file://` (opaque origin). The owner double-clicking `index.html` gets a blank page with only a console error. It works on GitHub Pages, which makes the bug intermittent-by-environment — the worst kind for a non-expert.
**Do this instead:** Plain JS data file loaded via `<script>` tag (Pattern 1). If JSON structure is strongly preferred later, embed it as `<script type="application/json">` inside the HTML — but the separate JS file is more editable.

### Anti-Pattern 3: A JS framework / SPA router / build step "to be safe"

**What people do:** Add React/Vite because "it's the standard way".
**Why it's wrong:** Violates three project constraints at once — no build step, owner edits files directly via GitHub web UI (a build makes the repo un-editable without tooling), and free hosting simplicity. Any SPA routing also breaks "view this collection" link sharing unless carefully handled.
**Do this instead:** Vanilla JS rendering from data is fully sufficient for two page types; ~250 lines of JS total.

### Anti-Pattern 4: Absolute paths (`/images/...`) or folders/files starting with `_`

**What people do:** `/images/collections/...` (works locally, breaks on project Pages sites) and `_drafts/` or `_nova-colecao/` folder names.
**Why it's wrong:** Absolute paths break under `user.github.io/REPO/` subpaths. Jekyll (GitHub Pages' default processor) silently excludes files/folders starting with `_`, `.`, `#`, or ending with `~` — **404s with no error message** (verified). `_config.yml`-style folders also get special treatment.
**Do this instead:** Relative paths always; add an empty `.nojekyll` at repo root to disable Jekyll processing entirely (then even `_`-named files would serve — but still avoid them for habit hygiene); use plain lowercase-hyphen slugs.

### Anti-Pattern 5: Serving full-size camera photos and "fixing it with CSS"

**What people do:** Upload 4000 px / 6 MB phone photos, display them at 300 px with CSS, rely on lazy loading.
**Why it's wrong:** CSS shrinks display size, not download size. Every visitor downloads megabytes; the 1 GB repo fills in ~150 photos.
**Do this instead:** Owner resizes before upload (one habit, written in README), plus `loading="lazy" decoding="async"` as the runtime safety net.

## Error / Edge Handling Without a Backend

| Edge case | Handling | Where |
|-----------|----------|-------|
| Unknown/missing `?c=` slug (bad shared link) | Render friendly "coleção não encontrada" + link home; never a blank page | `lookbook.js` |
| `collections.js` broken/missing (owner typo) | Guard: `Array.isArray(window.COLLECTIONS)` fails → visible "check collections.js" message on home | `main.js` |
| Photo file missing (typo in `photos` list) | `onerror` on `<img>` → hide the broken image or swap in a "foto indisponível" placeholder tile; other photos unaffected | `lookbook.js` |
| Slow network / many photos | `loading="lazy"` + `decoding="async"` + explicit `width`/`height` attributes (no layout jump) | markup generated by JS |
| Lightbox without backend | Simplest possible: fullscreen fixed overlay showing the clicked image, close on click/Esc/arrow keys; no library needed | `lookbook.js` |
| Old browsers | Not a real concern (GitHub Pages audience is modern mobile); keep JS to plain ES2017 features, no transpilation | — |
| Mistyped URL anywhere | `404.html` at repo root — GitHub Pages serves it automatically | static |
| Very large future repo | Soft early warning in README: keep total under ~900 MB | process |

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Publish from main branch root; add `.nojekyll` | ToS explicitly allows promotional/portfolio brand sites; prohibits e-commerce/transactions — this lookbook (no sales) is compliant (verified) |
| Instagram / WhatsApp | Plain `<a>` links to collection pages; links are stable `?c=slug` URLs | The reason for real per-collection URLs |
| Custom domain (optional, later) | `CNAME` file + DNS setting; use relative paths so nothing breaks | Nice-to-have, zero architecture impact |
| Image CDN (Cloudinary or similar, only if limits hit) | Replace local folder paths with CDN URLs inside the existing `photos: []` arrays | Pure data change; keep as documented escape hatch, don't build now |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `collections.js` ↔ page scripts | Global `window.COLLECTIONS` (classic script, load order: data first) | The only shared state in the whole site |
| Home page ↔ lookbook page | URL: `lookbook.html?c=<slug>` | No shared JS state across pages; each page bootstraps independently |
| Data ↔ images | Convention: `slug` = folder name; `photos[]` filenames relative to that folder | Documented in a template comment inside `collections.js` itself, so the contract lives next to the code the owner edits |

## The "Add a New Collection" Workflow (for requirements/roadmap)

1. Create folder `images/collections/<new-slug>/` and upload photos: `cover.jpg` + `01.jpg`…`NN.jpg` (resized, ≤1600 px wide).
2. Open `js/collections.js` (in the browser via GitHub, click the pencil icon) and paste the commented template at the **top** of the list, filling slug/title/date/description/cover/photos.
3. Commit. Site updates in ~1 minute. Total: 1 folder + 1 file edit, no markup.

(README at repo root repeats these steps; consider also an optional "validate" checklist entry — if a photo is misspelled, the site shows a placeholder instead of breaking.)

## Sources

- GitHub Pages limits (1 GB repo/site, 100 MB per file, 10-min deploy timeout, 100 GB/mo soft bandwidth, 10 builds/hr): https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits — **HIGH** (official)
- GitHub Pages acceptable use (promotion OK, e-commerce/transactions prohibited): same limits page + https://docs.github.com/en/pages — **HIGH**
- Jekyll silently excludes files/folders starting with `_`, `.`, `#`, or ending `~`; `.nojekyll` bypasses processing: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll and https://github.blog/news-insights/bypassing-jekyll-on-github-pages — **HIGH** (official)
- `fetch()`/XHR/ES modules blocked on `file://` (opaque origins; classic `<script>`, `<img>`, `<link>` still work): https://developer.mozilla.org/en-US/docs/Web/API/fetch — CORS request not HTTP; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp — **HIGH** (MDN); behavior cross-checked with multiple Stack Overflow reports (e.g. https://stackoverflow.com/questions/49971575) — **MEDIUM**
- GitHub warns at 50 MB per file, rejects at 100 MB: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github — **HIGH**
- Image CDN offload recommendation for Pages media-heavy sites (community consensus): https://github.com/orgs/community/discussions + Cloudinary docs — **MEDIUM**

---
*Architecture research for: OUG RANCH static lookbook (GitHub Pages)*
*Researched: 2026-11-13*
