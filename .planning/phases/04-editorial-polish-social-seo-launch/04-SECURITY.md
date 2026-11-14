---
phase: 04-editorial-polish-social-seo-launch
plans: [04-01]
threats_total: 2
threats_open: 0
asvs_level: 1
block_on: high
verified_commits: a295f7f..68daad1
date: 2026-11-13
verdict: SECURED
---

# 04-SECURITY — Security Audit (Phase 4)

Auditoria de mitigação de ameaças da Fase 4 (camada social/SEO + polimento editorial). Cada ameaça verificada por evidência em código entregue (a295f7f..68daad1), não por intenção documental.

## Verdict: SECURED

**2/2 ameaças fechadas. threats_open: 0. Nenhuma flag não registrada.**

## Threat Verification

| Threat ID | Categoria | Severidade | Disposição | Status | Evidência |
|-----------|-----------|------------|------------|--------|-----------|
| T-4-01 | URL correctness (og:image/canonical absolutos) | medium | mitigate | CLOSED | Verificação 1 abaixo |
| T-4-02 | Information exposure via sitemap/robots | medium | mitigate | CLOSED | Verificação 2 abaixo |

## T-4-01 — URLs absolutas corrigidas (og/twitter/canonical/JSON-LD) — CLOSED

Verificado no código entregue:

- index.html (linhas 15–24): og:url = https://oug-ranch.github.io/, og:image = https://oug-ranch.github.io/images/og-card.jpg, twitter:image idêntica, <link rel="canonical" href="https://oug-ranch.github.io/">.
- colecao.html (linhas 16–25): og:url = https://oug-ranch.github.io/colecao.html, og:image/twitter:image apontam para https://oug-ranch.github.io/images/og-card.jpg, canonical idêntico.
- images/og-card.jpg existe no repo: exatamente 1200×630 px, 30.512 bytes (≤ 300 KB), verificado com System.Drawing. Arquivo intermediário og-card-src.* removido (pasta images/ contém apenas og-card.jpg).
- JSON-LD (index.html linhas 27–39): parse OK (ConvertFrom-Json). @type Organization, url = https://oug-ranch.github.io/, logo = https://oug-ranch.github.io/images/og-card.jpg, sameAs = ["https://instagram.com/ougranch", "https://ougranch.com.br/"] — somente propriedades do dono.
- Estático puro, sem superfície de injeção: varredura em js/*.js confirma que nenhum script manipula meta tags, og: ou canonical. O único rewrite dinâmico (colecao.html) troca document.title via textContent com valor vindo de tabela estática (COLECOES[slug]), slug usado só como chave hasOwnProperty — slug desconhecido cai no estado genérico.
- Varredura de allowlist em todos os https?:// dos três HTML: zero URLs fora de oug-ranch.github.io / instagram.com/ougranch / ougranch.com.br / schema.org.

## T-4-02 — Sitemap/robots expõem apenas páginas públicas — CLOSED

- sitemap.xml: única entrada <loc>https://oug-ranch.github.io/</loc> + comentário pt-BR instrutivo ao dono. Nenhum caminho interno (.planning/, nada interno). A 404 é explicitamente excluída por comentário ("A 404 NUNCA entra na lista").
- robots.txt: User-agent: * / Allow: / + Sitemap: https://oug-ranch.github.io/sitemap.xml (URL absoluta, conforme plano).
- Commits: 27cd894, 5247fd2 (ambos dentro do range verificado).

## Verificações de regressão (fases anteriores) — todas OK

| Cheque | Resultado | Evidência |
|--------|-----------|-----------|
| rel="noopener" em todo target="_blank" | 10/10 (index 4, colecao 5, 404 1) | grep target="_blank" — todas as linhas carregam rel="noopener" |
| Zero recursos de runtime de terceiros | OK | Todos os URLs externos estão na allowlist (Instagram/loja do dono — links de navegação, não recursos carregados); todos os href/src de assets são relativos (./css, ./js, ./fonts, ./favicon) |
| 404.html autocontida, sem leak de og: | OK | Só <title> + <meta name="description"> adicionados (linhas 6–7); zero tags og/twitter/canonical; zero refs a ./css ./js ./images ./fonts (estilos 100% inline); único link externo é Instagram com noopener |
| JSON-LD bem-formado, valores estáticos | OK | Parse válido; script clássico estático no <head>, sem injeção dinâmica |

## Unregistered Flags

Nenhum. O flag de ameaça do SUMMARY (linha 60, "URLs absolutas SÓ em canonical/og/twitter/sitemap/JSON-LD") mapeia diretamente para T-4-01 — informativo.

## Notas

- Nenhuma ameaça aceita ou transferida nesta fase.
- Severidades atribuídas (T-4-01/T-4-02: medium) não atingem block_on: high; ambos fechados de qualquer forma, threats_open = 0.
