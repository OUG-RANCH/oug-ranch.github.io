# Pitfalls Research: OUG RANCH (Static Lookbook on GitHub Pages)

**Domain:** Free-static fashion lookbook site (GitHub Pages, pure HTML/CSS/JS, mobile-first, Brazilian market, non-expert content owner)
**Researched:** 2026-11-13
**Confidence:** HIGH for GitHub Pages platform specifics (verified against official GitHub Docs); MEDIUM-HIGH for mobile/lightbox behavior (verified against WebKit bug tracker + Meta/WhatsApp official docs)

## Pitfall Ranking Matrix (likelihood × impact, THIS project)

Ranked for the specific project shape: non-expert owner editing files via GitHub web UI / Windows, photo-heavy pages, Brazilian mobile audience arriving via WhatsApp/Instagram links.

| # | Pitfall | Likelihood | Impact | Score | Verdict |
|---|---------|-----------|--------|-------|---------|
| 1 | Bad filenames (spaces, accents, uppercase) breaking on Pages | **Very High** | High | 🔴 Critical | Design around it day 1 |
| 2 | Missing/oversized OG tags → broken WhatsApp link previews | **High** (if forgotten) | High | 🔴 Critical | Hard launch requirement |
| 3 | Huge camera photos wrecking 4G perf + repo/1GB limit | High | High | 🔴 Critical | Needs owner SOP + optimization |
| 4 | Absolute paths `/...` 404 on project Pages subpath | High | Medium-High | 🔴 Critical | Relative paths only |
| 5 | `file://` CORS breaks `fetch(JSON)` when owner opens index.html directly | Very High | Medium | 🟠 High | Document local server |
| 6 | Broken JSON (stray comma) → blank site | Medium | High | 🟠 High | Error handling + tiny data files |
| 7 | Lightbox vs iOS Safari: scroll lock, 100vh, swipe conflicts | High | Medium | 🟠 High | Test on real iPhone |
| 8 | Pages CDN cache (max-age=600) + deploy delay → "my edit didn't work" | Very High | Low-Medium | 🟡 Moderate | Expectation setting |
| 9 | Layout shift + unoptimized image loading (LCP/lazy) | High | Medium | 🟡 Moderate | width/height + fetchpriority |
| 10 | `.nojekyll` missing → underscore-prefixed files 404 | Medium | Medium | 🟡 Moderate | One-line fix, do it day 1 |
| 11 | Custom domain DNS/cert provisioning pain | Low-Medium (only if domain added) | Medium | 🟡 Moderate | Follow exact DNS recipe |
| 12 | Render-blocking fonts, overdone animation on low-end Android | Medium | Medium | 🟡 Moderate | Keep CSS minimal |
| 13 | Dark-theme contrast unreadable in outdoor Brazilian sunlight | Medium | Medium | 🟡 Moderate | Test contrast in sun |
| 14 | Repo bloat from git history of re-uploaded images | Medium (over time) | Medium | 🟡 Moderate | Keep originals out of repo |
| 15 | Missing favicon → 404 noise + blank tab | High | Low | ⚪ Minor | Ship favicon early |
| 16 | No analytics → owner flying blind | Certain | Low | ⚪ Minor | GA4 free or none |

---

## Critical Pitfalls

### Pitfall 1: Filenames that work on Windows but 404 on GitHub Pages

**What goes wrong:**
Owner uploads `Look 01 (Final).JPG` or `Camisa_Órbita.jpg`. Windows (NTFS) is case-insensitive and handles spaces/Unicode accents fine, so everything looks right locally — but GitHub Pages runs on Linux, which is strictly case-sensitive, and URLs with spaces/accents get percent-encoded or mismatch. Result: images silently 404 site-wide while working perfectly on the owner's machine.

**Why it happens:**
Windows/macOS filesystems are case-insensitive; Pages runs on Linux. Brazil's default photo-export conventions (spaces, `Ç`, `ã`, `É`, mixed case) collide directly with this. The non-expert owner has no way to know this rule exists.

**How to avoid:**
- Enforce a naming convention in the project README and in every "how to add photos" doc: **all lowercase, ASCII only, hyphens instead of spaces** (e.g. `look-01-orbita.jpg`).
- Since "one collection = 1 data file + photo folder", make folder names follow the same rule: `collections/verao-2027/`.
- Build a tiny pre-upload sanity habit: photos are renamed *before* they enter the repo, never after (renaming after means breaking the data file references).
- Optional safeguard: a small JS dev check that scans the collection data file and warns if any path contains uppercase, spaces, or non-ASCII characters — this can even run at runtime in a "content check" console message.

**Warning signs:**
Console 404s on image URLs; images render locally (opened via double-click) but not on the live URL.

**Phase to address:**
Phase 1 (repo scaffold + naming convention documented) and the content-editor guide delivered with Phase 1.

---

### Pitfall 2: Broken WhatsApp link previews (missing or oversized OG tags)

**What goes wrong:**
Someone shares the site link in a WhatsApp group and instead of a branded card with a hero image, they get a bare URL or a random cropped thumbnail. In Brazil, WhatsApp + Instagram DMs *are* the traffic channel for a fashion brand — this is the difference between "looks professional" and "looks like a sketchy link".

**Why it happens:**
WhatsApp is the strictest major platform for Open Graph. Per Meta's official docs, the preview image must be an **absolute HTTPS URL, under ~600 KB (community testing shows ~300 KB is the safe ceiling), at least 300 px wide, with aspect ratio ≤ 4:1** — and failures are *silent* (no error anywhere). WhatsApp also aggressively caches the first preview it generates, so fixing the tags doesn't refresh an already-crawled URL.

**How to avoid:**
- In the `<head>` of every page: `og:title`, `og:description`, `og:image` (absolute HTTPS URL), `og:url`, `og:type=website`, `og:locale=pt_BR`, plus Twitter `twitter:card=summary_large_image`.
- Create a dedicated small JPEG for OG (e.g. 1200×630, quality-tuned to land **under 300 KB**) — do NOT point `og:image` at a full-res lookbook photo.
- Static site = tags must be hand-maintained per page. Keep one template head-block, copy it for each collection page, change only title/description/image/URL.
- To refresh a cached preview, change the URL (query string) or wait for the cache to expire; verify tags with Meta's Sharing Debugger before announcing the site.

**Warning signs:**
Preview shows page text instead of image, or no preview at all; `og:image` pointing to a >600 KB file.

**Phase to address:**
Phase 1 (home page head) and every collection-page phase — make OG tags part of the page template definition of done.

---

### Pitfall 3: Huge camera photos destroying mobile performance (and the repo)

**What goes wrong:**
Straight-off-the-camera photos are 5–10 MB each (modern phones: 12–50 MP). A lookbook page with 15 stacked photos would try to download ~100+ MB on 4G — unusable on Brazilian mobile data, and it's exactly how a lookbook is consumed (scroll through 15+ photos). Secondary effect: repo and git history balloon toward the 1 GB published-site limit and the 100 GB/month soft bandwidth cap (GitHub's documented limits — GitHub even emails you if you approach the bandwidth cap). GitHub also hard-blocks individual files over 100 MB.

**Why it happens:**
The owner is a non-expert; the natural workflow is "download photos from camera, upload to GitHub". Nothing in the GitHub web UI warns about size. There's no build step in this project to auto-optimize.

**How to avoid:**
- Define a **photo SOP** the owner follows before upload: resize to max ~1600–2000 px on the long edge, save as JPEG quality ~75–80 → typical result 200–400 KB per photo (vs 5–10 MB raw).
- Give the owner a concrete Windows tool, not abstract advice: e.g. "open the folder of photos → select all → right-click → Resize pictures (PowerToys Image Resizer)" or an online bulk compressor (squoosh.app / bulk resizers). Put this in the editing guide with screenshots.
- Budget rule to document: a full collection of ~20 photos at ~300 KB ≈ 6 MB per lookbook page — acceptable; 20 photos × 8 MB = 160 MB — never ship that.
- Keep camera originals OUT of the repo (owner's own disk / Google Drive). The repo holds only web-optimized exports.
- For the hero/LCP image, consider a slightly smaller still-further-compressed variant.

**Warning signs:**
Repo size growing past ~200–300 MB; lookbook page taking >5 s to show first photo on a phone; GitHub emails about bandwidth.

**Phase to address:**
Phase 1 (SOP written into the content-editor guide + optimized placeholder images set the example) — this is a process pitfall, not a code pitfall, so it must be baked into documentation.

---

### Pitfall 4: Absolute paths `/...` breaking on the project-pages subpath

**What goes wrong:**
Links and images written as `/images/look.jpg` or `/collections/verao/index.html` work at a custom apex domain but 404 at the default `user.github.io/oug-ranch/` URL, because the leading slash resolves to the domain root, not the repo folder.

**Why it happens:**
Absolute paths look cleaner and are what tutorials show; they happen to work when testing locally or on a custom domain, then break on the default URL.

**How to avoid:**
- Rule for all HTML/CSS/JS/data files: **relative paths only** (`images/look.jpg`, `./collections/...`, `../data/verao.json`).
- Decide the domain story early: if the brand will get a custom apex domain (`ougranch.com.br`), the root-path problem mostly disappears — but keep relative paths anyway so the site works in both states.
- If JS ever fetches data files, build the URL relative to the current document, never from `/`.

**Warning signs:**
Site works with custom domain or locally, 404s on `*.github.io/oug-ranch/`; JS fetch errors mentioning the wrong URL prefix.

**Phase to address:**
Phase 1 (architecture decision: relative-paths-only + custom-domain plan).

---

### Pitfall 5: `file://` CORS breaks `fetch(JSON)` — "the site is broken on my computer"

**What goes wrong:**
The owner double-clicks `index.html` to preview locally. Any `fetch('data/collections.json')` throws a CORS error (`Cross origin requests are only supported for protocol schemes: http...`), the dynamic parts of the page render empty, and the owner concludes the site is broken or that their edit ruined it. Verified behavior: CORS applies only to HTTP(S); `file://` requests are cross-origin with `null` origin and browsers block them (MDN).

**Why it happens:**
Opening HTML files by double-click is the natural Windows habit; there is no error message that a non-expert can interpret.

**How to avoid:**
- Two-pronged:
  1. **Design for graceful degradation:** where cheap, prefer inline data (small `<script>` blocks or per-page HTML) over fetched JSON so core content renders even from `file://`. For fetched data, implement `fetch().catch()` that renders a friendly "pré-visualização local incompleta — abra pelo servidor" fallback instead of a blank page.
  2. **Teach the one-command local server:** document `npx serve` or VS Code's Live Server extension (owner-friendly), or `python -m http.server 8000`. One command, documented in the editing guide with exact steps.
- Alternatively, keep the truly-owner-edited content in HTML that renders without JS, using JS only for enhancement (lightbox). This is the more robust architecture for a non-expert site.

**Warning signs:**
Console CORS errors; page sections empty locally but fine on live URL (or vice versa after a refactor).

**Phase to address:**
Phase 1 (architecture decision: how much content is JSON vs inline; error-handling pattern) + Phase 1 docs.

---

### Pitfall 6: One stray comma in the JSON kills the whole page

**What goes wrong:**
The owner edits `collections.json` in the GitHub web editor and leaves a trailing comma, forgets a quote, or pastes a smart quote (`“”` instead of `"`). `JSON.parse` throws → the script that renders collections/lookbook entries dies → page renders blank or half-broken, with a console error a non-expert can't read.

**Why it happens:**
JSON has zero tolerance for syntax errors, and the GitHub web editor is a plain textarea with no validation. Non-experts edit prose; JSON is prose that happens to be code.

**How to avoid:**
- Keep data files **small and shallow** (the "1 collection = 1 data file" model helps: blast radius of a mistake is one collection).
- Wrap `JSON.parse` in try/catch with a **visible, human-friendly error state in Portuguese**: "Ocorreu um erro ao ler o arquivo de dados. Verifique vírgulas e aspas em `data/verao-2027.json`." This turns a mystery into an actionable message.
- Include a comment-style example at the top of the editing guide: "after editing, visit jsonlint.com and paste the file — green check = safe".
- Optionally: JSON5 or a lenient parser is *not* recommended (more moving parts); a strict parser + good error message is enough at this scale.

**Warning signs:**
Site blank after an edit; console shows `SyntaxError: Unexpected token`.

**Phase to address:**
Phase 1 (error-handling pattern in the render script) + content-editor guide.

---

### Pitfall 7: Lightbox vs iOS Safari — scroll lock, 100vh, swipe/zoom conflicts

**What goes wrong:**
Three interlocking failure modes, all common:
1. **Body scroll lock fails on iOS.** The classic `body { overflow: hidden }` lock is famously unreliable in WebKit — the background page keeps scrolling behind the open lightbox ("scroll chaining"). This has been a known 8+ year WebKit interoperability problem (tracked in web-platform-tests interop #788).
2. **100vh is wrong on mobile Safari.** `100vh` equals the viewport with browser chrome *collapsed*, so a full-screen lightbox opened via `height: 100vh` is taller than the visible screen — the "close" button or image edge sits under Safari's address bar. The modern fix is dynamic viewport units (`100dvh` / `100svh`) with a `100vh` fallback, since `dvh` is now supported across current Safari/Chrome/Firefox.
3. **Touch gesture conflicts.** Horizontal swipe-to-navigate fights with vertical page scroll (diagonal swipes jitter between next-image and scrolling), and naive `touch-action` / `preventDefault` handling breaks pinch-zoom, which users expect on fashion detail shots.

**Why it happens:**
Lightbox behavior is easy on desktop and subtle on iOS; most tutorials and codepens are desktop-first. Testing usually happens on a desktop emulator, which hides all three issues.

**How to avoid:**
- Scroll lock pattern: `position: fixed; top: -<scrollY>px` on body while open (preserving scroll position), restore on close — or rely on a simple non-modal full-page view if gesture conflicts prove worse than the lock. On iOS, also set `overscroll-behavior: none` on the lightbox container.
- Use `height: 100dvh` (with `100vh` fallback line above it) for the lightbox viewport; avoid `position: sticky` + `100vh` combos on iOS.
- Gestures: horizontal swipe with a horizontal-bias threshold (only treat as swipe when |dx| > |dy| × 1.5), `touch-action: pan-y` on the image container so vertical scrolling stays native while horizontal swipes are captured. Do NOT call `preventDefault` on touchmove except when a horizontal swipe is confirmed, to preserve pinch-zoom.
- Closing: support swipe-down-to-dismiss expectation lightly OR a big visible close button — do not rely on gestures alone; the ✕ must always be reachable above the notch area (`env(safe-area-inset-top)`).
- Test on a real iPhone (or ask the owner to test) — emulators hide these bugs.

**Warning signs:**
Background scrolls behind lightbox on iPhone; image taller than screen; pinch-zoom does nothing; page "sticks" when swiping.

**Phase to address:**
The lightbox phase — mobile gesture/viewport behavior should be an explicit acceptance criterion, not an afterthought.

---

## Moderate Pitfalls

### Pitfall 8: "My edit isn't showing" — Pages CDN cache + deploy delay

**What goes wrong:**
Pages serves with `Cache-Control: max-age=600` (10-minute CDN cache via Fastly), and the deploy pipeline itself takes seconds-to-minutes (occasionally much longer during GitHub incidents; deployments also time out at 10 minutes and can queue behind each other). The owner makes an edit, refreshes instantly, sees the old version, and re-edits — sometimes stacking several identical changes or concluding GitHub is broken.

**Why it happens:**
The edit→live pipeline is invisible; browsers also cache HTML/images locally.

**How to avoid:**
- Set expectations in the editing guide: "pode levar de ~1 a 10 minutos para aparecer no site".
- Teach hard-refresh (Ctrl+F5 on desktop; on mobile, open in private tab).
- Cache-busting trick worth building in from Phase 1: fetch JSON with a version query (`collections.json?v=7` bumped by the owner or timestamped), since the 10-min cache applies to data files too.
- Check the Actions tab / deployment status when in doubt, not just the page.

**Phase to address:** Phase 1 (documentation) + data-fetching pattern (cache-busting built in).

---

### Pitfall 9: Layout shift and unoptimized image loading (CLS + LCP)

**What goes wrong:**
Stacked photos without `width`/`height` attributes cause each photo's slot to collapse to 0 until it loads → the page jumps violently while scrolling on 4G (bad CLS, and Google penalizes it). Meanwhile if every image is eager-loaded, the hero (LCP) competes with 14 below-fold photos for bandwidth; if everything is lazy, the hero itself is delayed.

**Why it happens:**
Hand-written HTML from templates often omits dimension attributes; "lazy load everything" is cargo-culted advice.

**How to avoid:**
- Every `<img>` gets explicit `width` and `height` attributes (from the photo SOP export dimensions — uniform aspect ratios per collection make this trivial).
- Hero/first image: `loading="eager"` + `fetchpriority="high"`.
- All below-fold photos: `loading="lazy"` + `decoding="async"`.
- Since the site is hand-maintained, bake the attributes into the page template snippets the owner copies.

**Phase to address:** Phase 1 (image-loading conventions in the template).

---

### Pitfall 10: Missing `.nojekyll` → files starting with `_` silently 404

**What goes wrong:**
GitHub Pages runs Jekyll by default and treats anything starting with `_` as a Jekyll-special file, not publishing it. If data lives in `_data/collections.json` or an asset folder is named `_img/`, those files 404 on Pages while working locally. The fix is one empty `.nojekyll` file at the repo root (officially documented) — but it must be *in the publishing source*, and forgetting it produces a confusing 404.

**Why it happens:**
Nothing warns you; it only manifests live.

**How to avoid:**
- Add `.nojekyll` to the repo root on day 1 (this project needs no Jekyll processing).
- Belt-and-suspenders: don't name any folder/file with a leading `_` anyway — it also confuses the non-expert owner.

**Phase to address:** Phase 1 (repo scaffold).

---

### Pitfall 11: Custom domain DNS and HTTPS certificate provisioning (if/when a domain is added)

**What goes wrong:**
Classic failure chain: apex configured with only one A record or with a leftover parking A record → "DNS check in progress" forever; `www` CNAME pointed at the apex instead of `username.github.io` → Let's Encrypt issues a cert covering only one host → "Enforce HTTPS" stays unavailable for days; Cloudflare proxy (orange cloud) in front of Pages breaks cert validation. GitHub community is full of multi-week stuck-provisioning threads.

**Why it happens:**
DNS record types are unintuitive; registrars pre-fill parking records; the checkbox for HTTPS stays disabled for an hour or more even in the happy path, tempting "fixes" that break things.

**How to avoid (exact recipe, verified vs GitHub Docs):**
- Apex: 4 × A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (optionally the matching 4 × AAAA records).
- `www`: CNAME → `username.github.io` (NOT to the apex).
- Remove all leftover/parking/conflicting A/AAAA/ALIAS records on apex and www.
- Set the **apex** as the custom domain in Pages settings; GitHub then covers both hosts with one cert and redirects www → apex.
- If DNS-only is not possible through a CDN like Cloudflare, prefer proxy off (gray cloud) initially.
- Wait patiently: "Enforce HTTPS unavailable — certificate not yet issued" is normal for up to ~24 h; remove-and-re-add the domain to force re-provisioning if stuck.
- Never delete the uppercase `CNAME` file the setting creates in the publishing source.

**Phase to address:** Defer to a launch/custom-domain phase; document the recipe then.

---

### Pitfall 12: Render-blocking fonts and overdone animation on low-end Androids

**What goes wrong:**
Brazilian mobile fleet skews to mid/low-end Android on 4G. Google-Fonts `@import` or non-`swap` font loading blocks first paint; heavy hero animations/parallax jank at 10–15 fps on budget devices — for a *fashion* site where smoothness is part of the brand feel. Excessive `box-shadow`/large blurred layers and long transitions on scroll are the usual offenders.

**How to avoid:**
- Load fonts with `<link rel="preconnect">` + `display=swap`; at most 2 weights; consider system-font fallback stack as the default and a display font only for the logo/headings.
- Reference implementations (isadeburgh-style hero) are animation-heavy — pick 1–2 subtle effects (fade/slide-in on load) and skip scroll-driven parallax.
- Prefer CSS transitions over JS animation loops; nothing per-scroll-event.

**Phase to address:** Design/UI phase (define the animation budget explicitly: "what we animate" list).

---

### Pitfall 13: Dark theme unreadable outdoors

**What goes wrong:**
Fashion lookbooks love dark themes; most Brazilian users browse on phones in full sun. Pure-black backgrounds with thin light-gray type (contrast ratios ~2–3:1) vanish outdoors; photos with dark tones also blend into the background losing edge definition.

**How to avoid:**
- Keep body text at ≥ WCAG AA contrast on the dark background (≥ 4.5:1 — effectively use near-white on near-black, not gray-on-black).
- Test the home page on a phone at maximum brightness outdoors before launch.
- Photo treatment: slight off-white or framed background behind photos can help separation in a dark theme.

**Phase to address:** Design phase (contrast tokens in the design spec).

---

### Pitfall 14: Repo bloat from image history

**What goes wrong:**
Every re-upload of corrected photos adds the old version to git history forever (GitHub web UI commits on main). Over months, the repo history balloons — cloning gets slow, and the *published site* size (1 GB hard cap) counts the deployed artifact only, but the repo hits its own recommended 1 GB. Also: pushing any single file >100 MB is rejected outright.

**Why it happens:** Git history is invisible in the web UI.

**How to avoid:**
- Web-optimized photos only in repo (Pitfall 3) keeps individual files tiny; history growth is then slow.
- If a photo needs replacing, upload under the **same filename** (replaces content; history still grows but by small deltas).
- Check repo size occasionally in Settings; if it exceeds ~500 MB, archive old collections out of the repo (move to a separate "archive" repo or branch) rather than deleting files (deletion doesn't shrink history).

**Phase to address:** Content-model phase (collection lifecycle rules: active vs archived).

---

## Minor Pitfalls

### Pitfall 15: Missing favicon

**What goes wrong:** Browser requests `/favicon.ico` → 404 in every session's log; tab shows generic globe; when the link is bookmarked to the phone home screen there's no icon.

**Prevention:** Ship a small `favicon.ico` (+ `apple-touch-icon.png` 180×180) in Phase 1 — 10 minutes of work, permanent polish.

### Pitfall 16: No visibility into traffic (analytics)

**What goes wrong:** Owner has zero idea whether anyone visits, from where, or on what device — and can't justify effort on new collections.

**Prevention:** GA4 is free and standard for this; a tiny snippet in every page. Caveat: GA4's UI has a learning curve for a non-expert — consider configuring a single simple "pages + countries" report for them, or honestly decide that "no analytics" is acceptable for an MVP and add GA4 in a later phase. (Plausible/Fathom are privacy-friendly but paid.) If GA4 is added, keep the snippet minimal — no cookies beyond GA defaults — since LGPD applies to Brazilian sites and a static lookbook should collect nothing more than page views.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Uploading raw camera photos "for now" | Faster to launch | Bandwidth blowup, repo bloat, broken UX on 4G; painful re-process later | Never — the SOP is cheaper than the cleanup |
| One giant `data.json` for all collections | Fewer files to manage | Every edit risks the whole site; merge conflicts if a helper ever edits | Never — the "1 collection = 1 file" model already planned |
| Absolute paths `/...` in templates | Shorter strings | Breaks on `*.github.io` subpath; blocks domain experiments | Never |
| Skipping `width`/`height` on imgs | Faster to write template | Layout shift on every scroll; rework to fix later | Only in throwaway mockups |
| Inline copy-pasted head block per page | No build step (already required) | OG tags drift out of sync across pages | Acceptable — but keep a canonical template snippet to copy |
| Font loaded without `swap` | Looks "designed" in desktop demos | Invisible-text flash on 4G, worse FCP | Never |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages | Assuming instant updates after commit | Expect ~1–10 min CDN/deploy latency; verify in Actions tab |
| GitHub Pages | Letting Jekyll process the site (no `.nojekyll`) | Empty `.nojekyll` at publishing-source root; avoid `_`-prefixed names |
| WhatsApp sharing | `og:image` pointing at a 2 MB WebP | Dedicated JPEG ≤ ~300 KB, ≥ 300 px wide, ≤ 4:1, absolute HTTPS URL |
| WhatsApp caching | Editing tags and expecting the preview to change | Change URL/query param to force re-crawl; validate in Meta Sharing Debugger |
| Google Fonts | CSS `@import` | `<link rel="preconnect">` + `<link rel="stylesheet">` with `display=swap` |
| GA4 | Full default snippet with enhanced measurement everywhere later | Decide consciously: either minimal GA4 in Phase 1 or none until asked |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Uncompressed photos | 5–10 MB/photo; 100+ MB lookbook page | Photo SOP: ≤2000 px, JPEG q75–80, 200–400 KB/photo | Immediately on 4G; repo at ~10+ collections |
| All-eager image loading | Hero LCP >4 s on 4G | `fetchpriority=high` hero + `loading=lazy` rest | First phone test |
| Missing dimension attributes | Violent scroll jumping (CLS) | `width`/`height` on every img | First phone test |
| Scroll-driven animations | Jank on budget Androids | CSS-only, load-time transitions only | Any low-end device |
| Un-busted JSON caching | Owner's new collection doesn't appear for 10 min | `?v=` query param on data fetches | First content update post-launch |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Committing personal info (phone/WhatsApp number, address) into public repo pages | Spam/stalking; repo is public and永久 archived | Decide what contact info goes public; keep private channels private |
| Replying to GitHub "support" phishing after site gets traffic | Account compromise | Real GitHub never emails asking for credentials |
| Third-party scripts from random tutorials (counters, widgets) | Supply-chain/malware risk on a brand site | Zero third-party JS except (optionally) GA4 |
| Default repo visibility assumptions | Owner may expect "unlisted" to mean "private" | The site URL is public and scrapable; nothing sensitive in repo |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Close button only (no swipe-back on lightbox) | Minor friction on Android back-gesture | Support hardware/browser back to close lightbox (history state) if cheap; always visible ✕ |
| Pinch-zoom disabled globally (`user-scalable=no`) | Users can't inspect garment details — fatal for fashion | Allow pinch-zoom everywhere, especially in lightbox |
| Dark theme with low contrast | Unreadable in sunlight | ≥4.5:1 body text contrast |
| Horizontal-scroll collections with no visual affordance | Users miss half the catalog | Vertical scroll list (matches chosen reference: cienalab-style collection list) |
| Lightbox "close" gesture conflicts with scroll | Feels broken on iPhone | Horizontal-bias swipe detection + `touch-action: pan-y` |

## "Looks Done But Isn't" Checklist

- [ ] **OG preview:** Shared in WhatsApp — branded card with image appears (not bare URL). Test with the *live* URL, not localhost.
- [ ] **Favicon:** Tab shows icon; no 404 for `/favicon.ico`.
- [ ] **Case-sensitivity:** All links/images resolve on the live `*.github.io` URL even though they also work locally (dev-check paths for uppercase/spaces/accents).
- [ ] **`.nojekyll`:** Present at publishing-source root.
- [ ] **Relative paths:** Zero root-absolute `/...` paths in HTML/CSS/JS/data.
- [ ] **file:// fallback:** Opening `index.html` by double-click shows a friendly message (or readable content), not a blank page.
- [ ] **JSON error state:** Corrupting the data file on purpose shows the friendly Portuguese error, not a blank site.
- [ ] **Lightbox on iPhone:** Background doesn't scroll behind; ✕ reachable below the notch; pinch-zoom works; hardware back closes it.
- [ ] **Image attributes:** Every `<img>` has width/height; hero eager, rest lazy.
- [ ] **Contrast:** Home page readable at max brightness outdoors.
- [ ] **404 page:** Custom `404.html` exists (brand-styled) — free polish, catches the case-sensitivity misses too.
- [ ] **Cache expectations:** Editing guide states the 1–10 min update delay.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Bad filenames | LOW | Rename in repo + update data file references; same-day fix |
| Broken OG tags | LOW | Fix tags; new URL or wait out WhatsApp cache; validate in Sharing Debugger |
| Oversized photos already in repo | MEDIUM | Re-export compressed under same filenames; history keeps old blobs (consider history rewrite only if repo >1 GB) |
| Absolute-path breakage | LOW-MEDIUM | Find/replace `/` prefixes across files; one sweep |
| Blank site from bad JSON | LOW | Fix the comma; the friendly error message tells the owner which file |
| Lightbox iOS bugs found post-launch | MEDIUM | Acceptance-test on real device in the lightbox phase; fixes are contained to one JS file |
| Stuck domain cert | LOW (time) | Remove/re-add domain in Pages settings; verify DNS recipe; wait 24 h |
| Repo bloat | HIGH | Requires history rewrite or archiving collections to a second repo — prevention is much cheaper |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Filenames/case (1) | Phase 1 — scaffold + conventions doc | Dev-check script flags bad paths; live URL smoke test |
| WhatsApp OG (2) | Phase 1 template + every collection phase | Meta Sharing Debugger + real WhatsApp share test |
| Photo SOP (3) | Phase 1 — editor guide + example assets | Repo size check; page weight < ~8 MB/lookbook |
| Relative paths (4) | Phase 1 — architecture decision | Grep for `"/` in source; live-URL smoke test |
| file:// + JSON robustness (5, 6) | Phase 1 — render script error handling | Double-click index.html → friendly state; corrupt-JSON drill |
| Lightbox iOS (7) | Lightbox phase | Real-iPhone acceptance checklist |
| Cache expectations (8) | Phase 1 docs + cache-busting fetch | Documented in guide; `?v=` present in fetch URLs |
| Image loading (9) | Phase 1 templates | All imgs have dimensions; hero fetchpriority |
| `.nojekyll` (10) | Phase 1 scaffold | File present in repo root |
| Custom domain (11) | Launch/domain phase (deferred) | DNS recipe checklist; Enforce HTTPS enabled |
| Design perf (12, 13) | Design phase | Animation budget list; outdoor contrast test |
| Repo lifecycle (14) | Content-model phase | Collection archive procedure documented |
| Favicon + 404 + analytics (15, 16) | Phase 1 / launch phase | Files present; GA4 decision recorded |

## Sources

- GitHub Docs — GitHub Pages limits (1 GB site, 100 GB/month soft bandwidth, 10-min deploy timeout): https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Docs — Troubleshooting 404s (case-sensitive `index.html`, DNS, custom domain): https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites
- GitHub Blog — Bypassing Jekyll with `.nojekyll` (underscore files): https://github.blog/news-insights/bypassing-jekyll-on-github-pages/
- GitHub Community — Pages `Cache-Control: max-age=600` (10-min CDN cache): https://github.com/orgs/community/discussions/11884
- GitHub Community — deploy-pages 10-min timeout / queue behavior: https://github.com/orgs/community/discussions/204128
- GitHub Docs — Managing a custom domain (A/AAAA records 185.199.108–111.153, www CNAME recipe): https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Community — cert provisioning covering only www or apex: https://github.com/orgs/community/discussions/211446
- GitHub Community — Windows-local vs live case-sensitivity 404s: https://github.com/orgs/community/discussions/196670
- MDN — CORS request not HTTP (`file://` blocked): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp
- Meta for Developers — WhatsApp link preview requirements (og:image < 600 KB, ≥300 px, ≤4:1): https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews
- Andrew Baker — WhatsApp ~300 KB silent og:image failures (2026): https://andrewbaker.ninja/2026/03/05/fix-thumbnail-previews-on-whatsapp-linkedin-x-guide/
- WebKit Bug 141832 — 100vh taller than visible viewport: https://bugs.webkit.org/show_bug.cgi?id=141832
- web-platform-tests interop #788 — body scroll-lock unreliable in Safari: https://github.com/web-platform-tests/interop/issues/788
- dev.to — 100vh iOS Safari problem and fixes (dvh/svh): https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9
- devactivity — GitHub Pages 404 decoding (case sensitivity, Jekyll underscore skip): https://devactivity.com/insights/decoding-github-pages-404s-essential-fixes-for-broken-links

---
*Pitfalls research for: OUG RANCH static lookbook (GitHub Pages, mobile-first, Brazilian market)*
*Researched: 2026-11-13*
