// js/collections.js — LISTA DE COLEÇÕES DO SITE (arquivo do dono)
//
// É AQUI que você adiciona, reordena ou edita as coleções da home.
// Cada coleção é um bloco entre { } abaixo.
//
// Convenção do projeto (vale pra sempre): DADOS primeiro, lógica depois.
// Este arquivo entra ANTES do collections-render.js e do main.js no HTML.
// É um script clássico (sem módulos, sem fetch) de propósito: assim o site
// funciona também dando dois cliques no index.html no seu computador.
//
// O que significa cada campo está explicado no bloco TEMPLATE no fim da lista,
// e no README (seção "Adicionar ou reordenar coleções").

window.OUG_COLLECTIONS = [
  {
    slug: 'serra-bruta',
    title: 'SERRA BRUTA',
    story: 'Poeira na bota, barranco na frente e a boiada descendo a serra. Essa coleção é pra quem encara o sol das dez da manhã e a madrugada de frio lá em cima — roupa firme, igual a gente.',
    cover: '',
    coverAlt: '',
    coverW: 0,
    coverH: 0,
    order: 1
  },
  {
    slug: 'galpao-78',
    title: 'GALPAO 78',
    story: 'Rádio ligado, moda de viola baixinho e o LED do galpão aceso até clarear. Cerveja gelada na mão, chimarrão na roda e a noite começando no galpão — pra terminar só na estrada. Vesti pra esse rolê.',
    cover: '',
    coverAlt: '',
    coverW: 0,
    coverH: 0,
    order: 2
  },
  {
    slug: 'estrada-de-terra',
    title: 'ESTRADA DE TERRA',
    story: 'Saída do sítio de madrugada, poeira laranja pintando o para-brisa. Chega na cidade sem tirar o chapéu e ninguém perde a viagem. Essa coleção é do caminho de terra que liga a roça ao rolê.',
    cover: '',
    coverAlt: '',
    coverW: 0,
    coverH: 0,
    order: 3
  },
  {
    slug: 'chegada-boiadeira',
    title: 'CHEGADA BOIADEIRA',
    story: 'Lida de gado no rabo do dia, turno de madrugada e o coração no ritmo da boiada. Uniforme de quem trabalha firme e comemora do mesmo jeito — sem frescura, com orgulho. Feito pra aguentar a lida toda.',
    cover: '',
    coverAlt: '',
    coverW: 0,
    coverH: 0,
    order: 4
  }

  // ============================================================
  // TEMPLATE — copie este bloco, descomente e preencha pra
  // adicionar uma coleção nova (uma coleção = um bloco deste).
  // ============================================================
  // {
  //   slug: 'nome-da-colecao',
  //     // ^ tudo minúsculo, sem acento e sem espaço (use hífen) —
  //     //   vira o link da coleção E o nome da pasta de fotos
  //     //   (images/collections/nome-da-colecao/)
  //   title: 'NOME DA COLEÇÃO',
  //     // ^ nome que aparece na home, em maiúsculas
  //   story: 'A história da coleção, do jeito que você já escreve as outras.',
  //     // ^ texto que aparece dentro da capa
  //   cover: '',
  //     // ^ SEM foto: deixe vazio (a capa vira o bloco de cor aprovado).
  //     //   COM foto: o caminho relativo, tipo
  //     //   'images/collections/nome-da-colecao/capa.webp'
  //   coverAlt: '',
  //     // ^ com foto: descreva a cena no formato da regra nº 3 do README,
  //     //   ex.: 'Campanha OUG RANCH — jaqueta de lona na cerca ao amanhecer'
  //   coverW: 0,
  //     // ^ com foto: a LARGURA da foto exportada no Squoosh (em pixels)
  //   coverH: 0,
  //     // ^ com foto: a ALTURA da foto exportada no Squoosh (em pixels)
  //   order: 5
  //     // ^ posição na home: o MENOR número aparece PRIMEIRO.
  //     //   Coleção mais nova = número menor. Nunca repita um número.
  // }
];
