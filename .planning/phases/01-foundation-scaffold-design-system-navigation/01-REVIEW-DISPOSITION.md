---
phase: 01
source: 01-REVIEW.md
review-commit: 5192bb9
disposition-date: 2026-11-13
total: 9
---

# Disposição dos achados do code review — Fase 1

| Finding | Severidade | Arquivo | Disposição | Nota |
|---------|-----------|---------|------------|------|
| Base-fix do 404 só funciona na profundidade 1 (loop de 404 em caminhos aninhados) | MAJOR | 404.html | **fixed** | Reescrito: conta os segmentos do pathname e sobe um `../` por segmento (`'../'.repeat(...)`); correto em qualquer profundidade. Commit `fix(01): review fixes - 404 nested-depth base fix, slug prototype guard, drawer focus` |
| `COLECOES[slug]` herda Object.prototype (`?c=constructor` → título "undefined") | minor | colecao.html | **fixed** | Guard `Object.prototype.hasOwnProperty.call(COLECOES, slug)`; slug desconhecido cai no estado genérico "coleção em breve" |
| Listener de breakpoint chama closeMenu() incondicionalmente (burger.focus() rouba foco com gaveta fechada) | minor | js/main.js | **fixed** | Agora só fecha se `drawer.open` |
| unicode-range do Inter não cobre ← → ↗ (setas caem na fonte de fallback) | minor | css/styles.css | open | O arquivo WOFF2 latin do Inter não tem esses glifos — impossível cobrir pelo subset; fallback visualmente aceitável. Reavaliar na Fase 4 (polimento) se as setas incomodarem |
| Nome acessível do card = história inteira (~50 palavras) | advisory | index.html | open | Decorativo nesta fase; Fase 2 revisa a semântica dos cards |
| Lógica de fechamento duplicada entre closeMenu() e o evento close | advisory | js/main.js | open | Inofensivo; consolidar na Fase 2 se a gaveta ganhar mais superfícies |
| Scroll-lock via body{overflow:hidden} imperfeito no iOS Safari antigo | advisory | css/styles.css | open | Mitigado pela gaveta em tela cheia; padrão conhecido |
| Sem `<meta name="description">` | advisory | index.html | open | SEO-03 cobre metas na Fase 4 |
| Links do index-list apontam todos para #colecoes | advisory | index.html | open | Placeholder do MVP; Fase 2 ancora por coleção |

## Resumo

- **fixed: 3** (1 MAJOR + 2 minor) — commit `fix(01): review fixes` (ver abaixo)
- **open: 6** (1 minor + 5 advisory) — todos com rota documentada (Fase 2 ou Fase 4); nenhum bloqueia
- **won't fix: 0**
