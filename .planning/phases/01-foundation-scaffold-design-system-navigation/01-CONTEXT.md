# Phase 1: Foundation — Scaffold, Design System & Navigation - Context

**Gathered:** 2026-11-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Estrutura inicial do site OUG RANCH no ar: scaffold estático (GitHub Pages, `.nojekyll`, caminhos relativos), design system da marca (paleta, tipografia, tokens CSS), cabeçalho com menu responsivo, hero da home em estilo editorial claro, rodapé com Instagram, e o guia do dono em português (naming, SOP de fotos, alt-text). Placeholder/foto de campanha no hero e coleções fictícias para teste (definido pelo dono).

</domain>

<decisions>
## Implementation Decisions

### Identidade Visual (fonte: branding.md)
- **D-01:** Paleta oficial da marca (do `branding.md` §CORES): `#F4F4EF` (off-white creme, fundo do site), `#2B2623` (preto café, textos), `#BB6F47` (caramelo, acento principal), `#7A9B5F` (verde oliva, uso futuro), `#2C4A6F` (azul jeans, uso futuro). Fundo do site é claro (creme), confirmado pelo dono.
- **D-02:** Acento por enquanto: **somente caramelo `#BB6F47`** (botões, links, marcações). Verde e azul ficam guardados para uso futuro — não entram no v1.
- **D-03:** Logo da marca existe no `branding.md` §LOGO (wordmark serifado "Oug Rānch" com chapéu sobre o "a" — imagem embutida). Usar a imagem do logo no cabeçalho; como fallback, texto em Yeseva One. O dono não escolheu discutir logo — usar o existente no arquivo. A imagem foi extraída para uso: ver `<specifics>`.
- **D-04:** Elementos gráficos da marca (estrela bordada, etiqueta EST. 2024, ilustração de traço fino, numeração "No. 01 / Série 001", moldura fina): **fora do v1 — minimal**. Só cores e tipografia por enquanto. Revisitável depois.

### Tipografia
- **D-05:** Títulos: **Yeseva One** (definida no `branding.md` §TIPOGRAFIA; gratuita no Google Fonts, self-hosted WOFF2 latin subset). Usada também no nome gigante da home.
- **D-06:** Textos: **Inter** substitui a Aktiv Grotesk (comercial — não é possível em custo zero). Inter é a mais próxima e melhor legibilidade mobile. Decisão reversível.
- **D-07:** Auto-hospedar as 2 fontes WOFF2 (Yeseva One regular; Inter variable latin), `font-display: swap`, preload apenas da Yeseva One.

### Home / Hero (estilo do print isadeburgh.com)
- **D-08:** Home em **cores simples estilo print**: fundo creme `#F4F4EF`, texto preto café `#2B2623`, tipografia gigante — clima preto-no-branco do print do Isa de Burgh, mas com a paleta da marca (creme em vez de branco puro).
- **D-09:** O dono quer o clima geral do site claro/terroso — a página inicial segue o estilo minimal do print; páginas internas mantêm o mesmo fundo creme com acentos caramelo.
- **D-10:** Hero: foto de campanha placeholder (usar imagem neutra/terrosa até o dono ter foto real) com nome da marca sobreposto, botão "ver coleções".

### Coleções fictícias (teste)
- **D-11:** Usar **coleções fictícias** para testar o site (definido pelo dono): criar 2–3 coleções de teste com nomes/textos fictícios e fotos placeholder, seguindo a convenção de dados (ex.: `colecao-teste-01`). O dono troca depois.

### the agent's Discretion
- Estrutura exata de arquivos/pastas do scaffold (guia da pesquisa STACK.md/ARCHITECTURE.md).
- Escolha das fotos placeholder e textos fictícios das coleções de teste.
- Detalhes de espaçamento, tamanhos tipográficos fluidos (`clamp()`) e microcopy do guia do dono.
- Quebra exata do menu hambúrguer (drawer vs overlay) — padrão da pesquisa.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Marca / Identidade
- `branding.md` — Manual da marca OUG RANCH: paleta (§CORES), logo (§LOGO), tipografia (§TIPOGRAFIA: Yeseva One + Aktiv Grotesk), tom de voz, slogan "Do campo ao rolê, sem mudar quem você é.". **Fonte da verdade da identidade visual.**
- `Captura de tela 2026-11-13 000846.png` — Print da home de referência isadeburgh.com: fundo claro, nome gigante preto, lista serifada, letreiro. Estilo visual alvo da home.

### Planejamento
- `.planning/ROADMAP.md` §Phase 1 — Goal, requisitos mapeados e critérios de sucesso da fase
- `.planning/REQUIREMENTS.md` — REQ-IDs da fase: PLAT-01, PLAT-03, NAV-01…04, HERO-01, HERO-02, A11Y-01, PERF-01
- `.planning/research/STACK.md` — Stack recomendada, limites do GitHub Pages, estrutura de pastas
- `.planning/research/ARCHITECTURE.md` — Padrão de dados (collections.js), multi-page-lite, workflow de nova coleção
- `.planning/research/PITFALLS.md` — Convenções de naming, `.nojekyll`, caminhos relativos, SOP de fotos
- `.planning/PROJECT.md` — Contexto geral e restrições

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Nenhum código existe ainda — repositório vazio (greenfield). Únicos insumos: `branding.md` (logo extraído como `C:/Users/dougl/AppData/Local/Temp/opencode/branding-image1.png` durante a discussão — copiar para o projeto como asset) e o print de referência.

### Established Patterns
- Padrões definidos pela pesquisa (STACK/ARCHITECTURE): `<script>` clássicos (sem módulos), caminhos relativos, `collections.js` com global, CSS custom properties como tema, mobile-first.

### Integration Points
- Este é o primeiro código do projeto — estabelece o scaffold que as Fases 2–4 herdam (tokens CSS, estrutura de pastas, convenção de assets).

</code_context>

<specifics>
## Specific Ideas

- **Print do Isa de Burgh como alvo visual da home** (o dono enviou a captura `Captura de tela 2026-11-13 000846.png`): nome gigante no topo esquerdo, lista de "serviços"/palavras da marca em serifada, foto central, letreiro de nomes — mas em **creme/preto café** da paleta OUG em vez de branco puro.
- **Tom de voz** (do branding.md): amigo do interior, direto, sem linguagem de luxo. Usar no texto do hero e no guia do dono. Palavras-chave: campo, cidade, estrada, rolê, bem-vindo, chega mais.
- **Slogan**: "Do campo ao rolê, sem mudar quem você é." — candidato natural para o hero ou a seção da marca (fase 2).
- **Coleções fictícias** para testar todo o fluxo antes do conteúdo real.

</specifics>

<deferred>
## Deferred Ideas

- Elementos gráficos da marca (estrela, moldura, numeração de série, etiqueta EST. 2024) como detalhes do site — o dono escolheu "minimal" no v1; revisitável em fase de polimento (Fase 4) ou depois.
- Letreiro editorial de texto e barra de aviso — já mapeados para a Fase 4 pelo roadmap (não são escopo da Fase 1).

</deferred>

---

*Phase: 1-Foundation — Scaffold, Design System & Navigation*
*Context gathered: 2026-11-13*
