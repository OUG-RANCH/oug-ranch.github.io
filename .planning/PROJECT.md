# OUG RANCH — Lookbook Website

## What This Is

Site vitrine (lookbook) para a marca de moda OUG RANCH, ainda não lançada. A página inicial une dois modelos de referência: o visual de marca com hero forte da isadeburgh.com e a seção de coleções da cienalab.com.br/pages/lookbook (capa + título + texto de cada coleção, clicável). Ao clicar em uma coleção, abre a página do lookbook com fotos em rolagem vertical, otimizado para visualização no celular.

## Core Value

O visitante consegue rolar a home no celular, ver as coleções (capa + título + texto), clicar e navegar pelo lookbook da coleção — de graça, hospedado no GitHub Pages.

## Business Context

- **Customer**: Visitantes e futuros clientes da marca OUG RANCH (foco: mobile)
- **Revenue model**: Nenhum por enquanto — site de apresentação da marca pré-lançamento
- **Success metric**: Site publicado e acessível via GitHub Pages, navegável no celular
- **Strategy notes**: —

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home com hero estilo Isa de Burgh (visual de marca, forte impacto)
- [ ] Seção de coleções estilo Ciena Lab: capa + título + texto descritivo, clicável
- [ ] Página individual de lookbook: título da coleção + fotos empilhadas em coluna única (rolagem vertical), estilo Ciena
- [ ] Infos da marca abaixo das coleções (conteúdo a definir pelo dono)
- [ ] Site 100% estático, hospedável no GitHub Pages (custo zero)
- [ ] Mobile-first: foco na experiência de celular, funcionando também em desktop
- [ ] Conteúdo placeholder (fotos e textos) facilmente substituível pelo dono
- [ ] Estrutura preparada para adicionar várias coleções futuramente

### Out of Scope

- E-commerce / carrinho / checkout — a marca ainda não foi lançada; site é apenas vitrine
- Rodapé do topo da Ciena (barra de anúncio/aviso) — ignorado por decisão do dono
- Login, contas de usuário — não faz sentido para um lookbook estático
- CMS ou painel de administração — conteúdo será trocado editando arquivos

## Context

- Referência visual 1: https://isadeburgh.com/?ref=onepagelove — home com hero, tipografia forte, navegação limpa (HOME/ABOUT/WORK/CONTACT), seções horizontais de projetos
- Referência visual 2: https://cienalab.com.br/pages/lookbook — lista de coleções com imagem de capa, título e parágrafo descritivo; página individual = título + fotos em coluna única + lightbox
- Marca OUG RANCH ainda não lançada — sem fotos reais nem textos no momento da inicialização
- A marca futuramente terá várias coleções — a arquitetura de dados (uma coleção = 1 arquivo de dados + pasta de fotos) deve escalar
- Seção de infos da marca ainda não foi decidida pelo dono — criar área genérica editável
- Deploy alvo: GitHub Pages (repositório com index.html na raiz ou pasta docs/)

## Constraints

- **Budget**: R$ 0 — GitHub Pages, sem backend, sem serviços pagos
- **Tech stack**: HTML/CSS/JS puro (estático) — sem framework de build obrigatório, para facilitar manutenção pelo dono
- **Performance**: fotos otimizadas/comprimidas — foco mobile (4G)
- **Compatibilidade**: navegadores de celular modernos (Chrome/Safari Android e iOS)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Unir isadeburgh (home) + Ciena (coleções/lookbook) | Referências escolhidas pelo dono | — Pending |
| Hospedagem GitHub Pages | Custo zero, dono não pode gastar | — Pending |
| Site estático HTML/CSS/JS puro | Simples de manter e publicar, sem build complexo | — Pending |
| Coleção como unidade de dados editável | Marca terá várias coleções futuramente | — Pending |
| Placeholders no lançamento | Conteúdo real ainda não existe | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-11-13 after initialization*
