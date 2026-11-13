---
phase: 02
source: 02-REVIEW.md
review-commit: 8a58a1e
disposition-date: 2026-11-13
total: 9
---

# Disposição dos achados do code review — Fase 2

| Finding | Severidade | Arquivo | Disposição | Nota |
|---------|-----------|---------|------------|------|
| MJ-01: capa de foto era flex-item com height:100% — flex-shrink espremeria a foto e a legenda cairia FORA do tile quando a 1ª foto real chegar (latente) | MAJOR | css/styles.css | **fixed** | `img` agora `position:absolute; inset:0` + legenda `position:relative` (pinta acima do img) + text-shadow leve de contraste + fundo creme enquanto carrega (resolve também AD-04). Testado no simulation: foto local aceita com width/height |
| MJ-02: se TODOS os slugs forem inválidos, a seção ficava em branco | MAJOR | js/collections-render.js | **fixed** | `posicao === 0` → mensagem amigável `.cards-error` no lugar dos cartões. Teste t4 no simulation passa |
| MN-01: cover-N pela posição visível, não pelo `(order-1)%4+1` do plano | minor | js/collections-render.js | **kept-impl** | Implementação mantida (mais segura — nunca gera cover-0 e o dono não pensa em números ao ver as capas); plano/SUMMARY reconciliados nesta disposição |
| MN-02: template dizia `order: 5` contradizendo "mais nova = número menor" | minor | js/collections.js | **fixed** | Template agora exemplifica `order: 1` com instrução de renumerar as antigas; README § 84 reforça |
| MN-03: `cover` ia pro `src` sem validação (URL remota/data: carregaria) | minor | js/collections-render.js | **fixed** | Guard: só caminho relativo local (sem `:`, sem `//`, sem `/` inicial); senão warn + fallback tonal. Testes t2/t3/t5 passam |
| AD-01: slug/order duplicados nunca detectados | advisory | js/collections.js | open | Slug duplicado abre 2 links pro mesmo lugar (inofensivo); Fase 3 ou 4 pode validar |
| AD-02: comentário velho em main.js citava `window.OUG_COLLECTION` | advisory | js/main.js | **fixed** | Comentário atualizado para `OUG_COLLECTIONS` |
| AD-03: README "Dois passos" mas listava 4 itens | advisory | README.md | **fixed** | Resumo reformulado ("resumo em dois passos… na prática:") |
| AD-04: tile de foto sem fundo enquanto a imagem carrega | advisory | css/styles.css | **fixed** | `.card-cover--photo { background:#EDE9DF }` (entrou junto com MJ-01) |

## Resumo

- **fixed: 7** (2 MAJOR + 3 minor + 2 advisory) — commit `fix(02): review fixes ...`
- **kept-impl: 1** (MN-01, reconciliado aqui)
- **open: 1** (AD-01, rota Fase 3/4)

## Verificação das correções

- `node --check` nos 3 scripts: OK
- Simulation comportamental (`RENDER-BEHAVIOR-OK`): ordenação por order, capas sequenciais, capa remota rejeitada com fallback tonal, foto local aceita com width/height/lazy, todos-slugs-inválidos → mensagem amigável (não em branco), slug `javascript:` bloqueado
- Cache-bust: `styles.css?v=7` em index.html e colecao.html
- Segurança (02-SECURITY.md): SECURED, 4/4 ameaças fechadas
