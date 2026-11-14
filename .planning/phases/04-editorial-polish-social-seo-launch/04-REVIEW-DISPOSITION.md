# 04-REVIEW-DISPOSITION

**Phase:** 04 — editorial-polish-social-seo-launch
**Review report:** 04-REVIEW.md (verdict: ship-with-warning; 0 critical / 1 warning / 2 info)
**Security report:** 04-SECURITY.md (verdict: SECURED, 2/2)
**Date:** 2026-11-13

## Findings Disposition

| ID | Severity | Finding | Disposition | Evidence |
|----|----------|---------|-------------|----------|
| WR-01 | warning | README.md:72 — swap guide referenced "regra nº 2" (WebP SOP) while the OG card must be JPEG; risk of WebP bytes with `.jpg` extension being rejected by strict WhatsApp scrapers | **FIXED** | README.md:72 rewritten in pt-BR: explicit "escolha o formato JPEG (não WebP)" instruction with the reason stated. Commit: fix(04): review fix - README OG swap must be JPEG |
| IN-01 | info | css/styles.css — `.text-link` and `.index-list` rows grew in height on mobile as inherent cost of the ≥44px touch-target fix | **ACCEPTED (owner UAT)** | Per plan (04-01-PLAN, touch-target task). Flag to owner during phone check: index list rows and in-text links may look slightly taller. No action unless owner rejects visually |
| IN-02 | info | index.html:33 — JSON-LD `logo` is the landscape 1200×630 og-card, not a squarish logo (deliberate per D-05, only brand asset available pre-launch) | **DEFERRED (post-launch verify)** | Owner runs Rich Results Test (search.google.com/test/rich-results) on the live URL after push; swap `logo` for a square asset only if Google flags it |

## Verdict

Phase 4 **ships**. WR-01 fixed pre-close; IN-01/IN-02 are non-blocking owner-verification notes (no code change required). Security SECURED. Owner still must perform the Meta Sharing Debugger + real WhatsApp share test as UAT before declaring the phase visually confirmed.
