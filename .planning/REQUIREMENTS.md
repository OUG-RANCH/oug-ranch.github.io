# REQUIREMENTS.md — OUG RANCH Lookbook

## v1 Requirements

### Navegação
- [x] **NAV-01**: Cabeçalho com logo/nome OUG RANCH clicável que volta para a home
- [x] **NAV-02**: No celular, menu hambúrguer abre painel com os links do site
- [x] **NAV-03**: No computador, links de navegação diretos no cabeçalho
- [x] **NAV-04**: Rodapé com nome da marca e link do Instagram
- [ ] **NAV-05**: Barra de aviso no topo com texto editável pelo dono (pausa com `prefers-reduced-motion`)

### Home / Hero
- [x] **HERO-01**: Hero em tela cheia com foto de campanha e nome da marca por cima (imagem separada para celular)
- [x] **HERO-02**: Botão "ver coleções" que rola até a seção de coleções
- [ ] **HERO-03**: Letreiro de texto rolando em loop (nomes das coleções / palavras da marca, estilo Isa)

### Coleções
- [ ] **COL-01**: Card de coleção com capa + título + texto da história, todo clicável, abre o lookbook
- [ ] **COL-02**: Coleções mais novas aparecem primeiro (dono reordena editando arquivo de dados)
- [ ] **COL-03**: No celular, cards deslizáveis em largura cheia (carrossel estilo Ciena)
- [ ] **COL-04**: No computador, leve zoom na capa ao passar o mouse

### Página do Lookbook
- [ ] **LOOK-01**: Página da coleção (`lookbook.html?c=slug`) mostra título + história no topo e fotos empilhadas em coluna única rolando (celular)
- [ ] **LOOK-02**: Tocar na foto amplia — lightbox com anterior/próxima/fechar, fecha ao clicar fora ou Esc, swipe no celular
- [ ] **LOOK-03**: Botão "← Voltar" para as coleções (para chegadas por link compartilhado)
- [ ] **LOOK-04**: No computador, fotos em grade

### Info da Marca
- [ ] **BRAND-01**: Texto "sobre a marca" (placeholder para o dono preencher)
- [ ] **BRAND-02**: Link do Instagram na seção da marca
- [ ] **BRAND-03**: Link do WhatsApp (wa.me) para contato
- [ ] **BRAND-04**: Link de e-mail

### Mobile / Performance
- [x] **PERF-01**: Fotos otimizadas (≤1600 px, ~200–400 KB cada, WebP/JPEG) — SOP documentado para o dono
- [ ] **PERF-02**: `width`/`height` em toda imagem (sem CLS); `loading="lazy"` abaixo da dobra; hero eager
- [ ] **PERF-03**: Alvos de toque ≥ 44 px (menu, lightbox, cards)

### SEO / Compartilhamento
- [ ] **SEO-01**: `<title>` + `<meta description>` únicos por página
- [ ] **SEO-02**: Open Graph + Twitter card com imagem 1200×630 (JPEG ≤300 KB) e URLs absolutas — preview bonito no WhatsApp/Instagram
- [ ] **SEO-03**: Canonical absoluto por página (subcaminho de projeto do GitHub Pages)
- [ ] **SEO-04**: Favicon, `sitemap.xml`, `robots.txt`, `404.html` com identidade da marca, `lang="pt-BR"`

### Acessibilidade
- [x] **A11Y-01**: Alt text em imagens informativas, `alt=""` em decorativas (convenção documentada)
- [ ] **A11Y-02**: Texto sobre foto com contraste ≥4.5:1 via scrim
- [ ] **A11Y-03**: Foco visível; marquee/animações pausáveis com `prefers-reduced-motion`

### Plataforma / Dono do site
- [x] **PLAT-01**: Site estático no GitHub Pages com `.nojekyll`, caminhos relativos e `<script>` clássicos (funciona em `file://`)
- [ ] **PLAT-02**: Adicionar nova coleção = criar pasta de fotos + 1 entrada em `collections.js` (2 passos, sem editar markup)
- [ ] **PLAT-03**: Guia do dono em português: trocar fotos/textos, convenção de nomes de arquivo (minúsculas, sem acento/espaço), SOP de otimização de imagens
- [ ] **PLAT-04**: Estados amigáveis: coleção inexistente, `collections.js` quebrado, imagem com erro

## v2 Requirements (deferred)

- **LOOK-05**: Links "próxima coleção →" no fim de cada lookbook (precisa ≥2 coleções reais)
- **HERO-04**: Preloader com contador (<1s, respeita reduced-motion)
- **HERO-05**: Vídeo em loop no hero/editorial (só com MP4 <10 MB fornecido pelo dono)
- **SEO-05**: JSON-LD Organization com `sameAs` (Instagram)
- **PERF-04**: Script auxiliar de otimização de imagens
- **DOM-01**: Domínio próprio (ex. ougranch.com.br) — exige reedição de canonicals/OG
- **SOC-01**: Grade estática curada de posts do Instagram (substituto sem custo do feed embutido)

## Out of Scope

- E-commerce / carrinho / checkout — marca ainda não lançada; site é vitrine
- Login / contas de usuário — lookbook estático não precisa
- CMS / painel administrativo — conteúdo editado em arquivos via GitHub
- Zoom por pinça no lightbox — exige biblioteca pesada; lightbox ampliado já atende
- Filtros/tabs por ano ou temporada — poucas coleções no v1
- Rodapé/barra superior da Ciena como obrigatório — ignorado por decisão do dono
- Feed do Instagram ao vivo — exige serviço pago/scripts de terceiros (quebra custo zero)
- Animations pesadas (GSAP/Lenis scroll-jacking) — mobile-first de baixo custo

## Traceability

Maps every v1 requirement to exactly one phase (34/34 covered).

| REQ-ID | Phase | Status |
|--------|-------|--------|
| PLAT-01 | Phase 1 | Complete |
| PLAT-03 | Phase 1 | Pending |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 1 | Complete |
| HERO-01 | Phase 1 | Complete |
| HERO-02 | Phase 1 | Complete |
| A11Y-01 | Phase 1 | Complete |
| PERF-01 | Phase 1 | Complete |
| COL-01 | Phase 2 | Pending |
| COL-02 | Phase 2 | Pending |
| COL-03 | Phase 2 | Pending |
| COL-04 | Phase 2 | Pending |
| PLAT-02 | Phase 2 | Pending |
| PERF-02 | Phase 2 | Pending |
| BRAND-01 | Phase 2 | Pending |
| BRAND-02 | Phase 2 | Pending |
| BRAND-03 | Phase 2 | Pending |
| BRAND-04 | Phase 2 | Pending |
| LOOK-01 | Phase 3 | Pending |
| LOOK-02 | Phase 3 | Pending |
| LOOK-03 | Phase 3 | Pending |
| LOOK-04 | Phase 3 | Pending |
| PLAT-04 | Phase 3 | Pending |
| NAV-05 | Phase 4 | Pending |
| HERO-03 | Phase 4 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| A11Y-02 | Phase 4 | Pending |
| A11Y-03 | Phase 4 | Pending |
| PERF-03 | Phase 4 | Pending |
