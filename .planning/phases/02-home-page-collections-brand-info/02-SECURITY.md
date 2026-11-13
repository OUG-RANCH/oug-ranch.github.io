---
phase: 02-home-page-collections-brand-info
phase_number: 2
audited_at: 2026-11-13
threats_total: 4
threats_open: 0
threats_closed: 4
asvs_level: 1
block_on: high
verdict: SECURED
---

# 02-SECURITY.md — Phase 2 Security Audit

**Method:** retroactive mitigation verification against the 02-01-PLAN.md `<threat_model>` register. FORCE stance — every mitigation assumed absent until grep/inspection proved it in the ACTUAL shipped code (commits f56c652..40659ce, tree at 40659ce). All four threats CLOSED by code evidence; verdict SECURED.

## Threat Verification

| Threat ID | Category | Component | Severity | Disposition | Status | Evidence |
|-----------|----------|-----------|----------|-------------|--------|----------|
| T-2-01 | Tampering | js/collections-render.js (DOM insertion of title/story/slug/cover) | high | mitigate | CLOSED | Renderer builds every data-driven node with createElement/textContent/setAttribute ONLY: `document.createElement` at lines 31, 67, 72, 79, 95, 101; `textContent` at 33, 56, 99, 103; `setAttribute` at 69, 80-86, 97-98. Repo-wide grep (all *.js + *.html, incl. inline scripts) for `innerHTML\|insertAdjacentHTML\|outerHTML\|document.write\|eval(`: **zero matches**. **javascript: URL check:** slug is validated against `SLUG_OK = /^[a-z0-9-]+$/` (line 42) at line 60 BEFORE href use — entries failing the pattern are skipped with console.warn (lines 61-62) — then href is built as `colecao.html?c=` + `encodeURIComponent(e.slug)` (line 69). A slug matching `^[a-z0-9-]+$` contains no `:" and no scheme characters, so a tampered data entry CANNOT produce a javascript: URL; the encoder is defense-in-depth on top of the allowlist |
| T-2-02 | Information Disclosure | js/collections.js in a PUBLIC repo | medium | accept | CLOSED | Full-file inspection (84 lines): only fictional pt-BR marketing texts (slug/title/story) and empty/zero photo fields — **zero** emails, phones, names, addresses, or personal identifiers. Accepted-risk documentation present: README.md `## O que nunca fazer` (line 62), line 64: "Nada de dados pessoais ou sensíveis no repositório — ele é público" (no CPF, endereço, telefone, documento, preço de fornecedor). Logged in Accepted Risks below |
| T-2-03 | DoS (perf/abuse) | owner-uploaded cover photos (oversized files) | medium | mitigate | CLOSED | Renderer: every rendered img gets `loading="lazy"` (line 82) + `decoding="async"` (line 83); `width`/`height` set from coverW/coverH ONLY when both are positive numbers (lines 84-87) — a half-filled entry cannot emit width="0". Photo branch additionally gets object-fit cover treatment in css/styles.css (PERF-02). README documents the oversized-photo convention: regra nº 2 Squoosh SOP (lines 36-47: max 1600px galeria / **900px capa**, ~400 KB weight ceiling, re-export rule) + section "Adicionar ou reordenar coleções" (line 82: capa ~900px, anotar largura×altura → coverW/coverH). js/collections.js TEMPLATE entry (lines 76-79) teaches the owner to fill coverW/coverH from the Squoosh export |
| T-2-SC | Tampering | npm/pip/cargo installs | n/a | accept | CLOSED | Accepted-risk surface verified EMPTY: no package.json / package-lock.json / requirements.txt anywhere in the repo (glob: zero matches); the site is dependency-free vanilla static per the stack constraint — nothing to install, nothing to audit |

## Regression Check: rel="noopener" (phase-1 T-1-01 surface)

All 9 `target="_blank"` anchors across the three pages carry `rel="noopener"` — index.html:19,34,35,84 · colecao.html:19,34,35,45,51 · 404.html:52. Grep for `target="_blank"` without rel="noopener": **zero matches**. The renderer creates ONLY same-origin `colecao.html?c=…` links — grep of js/ for `target`/`rel`/`javascript`: zero real matches (single hit is the word "relativo" in a comment); no `target` attribute is ever set on the rendered card.

## Accepted Risks

| Threat | Risk | Rationale |
|--------|------|-----------|
| T-2-02 | Owner could one day hand-edit personal data into js/collections.js | Data file currently ships only approved fictional marketing copy (verified line-by-line); README rule "o que nunca fazer" repo-wide forbids personal data in the public repo. No new disclosure surface created by this phase |
| T-2-SC | Supply-chain compromise via package installs | No package manager artifacts exist in the repo — accepted by construction; row retained for template completeness |

## Unregistered Flags

None — 02-01-SUMMARY.md contains no `## Threat Flags` section; no unmapped new attack surface. The two implementation deviations recorded in the summary (comment rewording for the gate; setAttribute over reflected properties) were re-verified directly and both STRENGTHEN the T-2-01 posture.

## Notes

- Informational (not a gap, outside the declared mitigation scope): `e.cover` is passed to `setAttribute('src', …)` (line 80) without scheme validation. A tampered cover value like `javascript:…` on an `<img>` does not execute script in any modern browser, and the declared T-2-01 mitigation (createElement/setAttribute construction — no markup-from-string) is fully met. The slug allowlist remains the boundary for the only navigable surface (href).
- All open-threat counting: 0 threats open; T-2-01 (high) is CLOSED, so nothing approaches the `block_on: high` threshold.
- Implementation files were not modified by this audit; no push performed (local commit only).
