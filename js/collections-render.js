// js/collections-render.js — desenha os cartões de coleção na home
//
// Lê a lista do dono (window.OUG_COLLECTIONS, criada em js/collections.js)
// e monta os cartões da seção COLEÇÕES. Script CLÁSSICO (sem módulos, sem
// fetch) — funciona no file:// dando dois cliques no index.html.
//
// Segurança: todo texto que vem do arquivo de dados entra na página com
// document.createElement + textContent — NUNCA montamos HTML a partir de
// strings (o arquivo é editado à mão pelo dono).
//
// Convenção do projeto: dados primeiro, lógica depois — no index.html este
// arquivo entra DEPOIS de js/collections.js e ANTES do js/main.js.
(function () {
  'use strict';

  var mount = document.getElementById('cardsMount');
  if (!mount) return; // sem a seção de coleções nesta página: nada a fazer

  var dados = window.OUG_COLLECTIONS;

  // Validação da lista: existe, é array, não vazia, e toda entrada tem os
  // campos de texto. Falhou qualquer coisa → mensagem amigável no lugar
  // (nunca uma seção em branco).
  var valida = Array.isArray(dados) && dados.length > 0 && dados.every(function (e) {
    return e
      && typeof e.slug === 'string'
      && typeof e.title === 'string'
      && typeof e.story === 'string';
  });
  if (!valida) {
    var erro = document.createElement('p');
    erro.className = 'cards-error';
    erro.textContent = 'As cole\u00E7\u00F5es n\u00E3o carregaram. Confere se o arquivo js/collections.js existe e est\u00E1 sem erros de digita\u00E7\u00E3o.';
    mount.textContent = '';
    mount.appendChild(erro);
    return;
  }

  // Regras do slug: minúsculas, dígitos e hífen — é o que vai no link e
  // no nome da pasta de fotos. Entrada com slug estranho é pulada (com
  // aviso no console) para não quebrar o site todo.
  var SLUG_OK = /^[a-z0-9-]+$/;

  // Ordena uma cópia pela posição (order): menor número aparece primeiro.
  // Empate: fica na ordem em que está no arquivo (estável).
  var ordenadas = dados
    .map(function (e, i) { return { e: e, i: i }; })
    .sort(function (a, b) {
      var oa = (typeof a.e.order === 'number' && isFinite(a.e.order)) ? a.e.order : a.i + 1;
      var ob = (typeof b.e.order === 'number' && isFinite(b.e.order)) ? b.e.order : b.i + 1;
      return (oa - ob) || (a.i - b.i);
    })
    .map(function (x) { return x.e; });

  // Limpa o que tiver no lugar antes de desenhar os cartões novos.
  mount.textContent = '';

  var posicao = 0; // posição VISÍVEL na home (1, 2, 3, 4...) — só entra quem passou na validação
  ordenadas.forEach(function (e) {
    if (!SLUG_OK.test(e.slug)) {
      console.warn('Cole\u00E7\u00E3o pulada (slug inv\u00E1lido: ' + e.slug + '): ' + e.title);
      return;
    }
    posicao += 1;

    // Cartão inteiro é um link para a página da coleção (?c=slug).
    var card = document.createElement('a');
    card.className = 'card';
    card.setAttribute('href', 'colecao.html?c=' + encodeURIComponent(e.slug));

    // Capa do cartão.
    var capa = document.createElement('span');
    capa.className = 'card-cover';

    if (e.cover) {
      // Capa com FOTO: a capa ganha a classe de foto e entra a imagem
      // com width/height (sem pulo de layout) e lazy (fica abaixo da dobra).
      // Só caminho relativo local (sem ":", sem "//", sem "/") — igual à
      // convenção de caminhos relativos do site; outra coisa é pulada.
      var local = e.cover.indexOf(':') === -1 &&
                  e.cover.indexOf('//') === -1 &&
                  e.cover.charAt(0) !== '/';
      if (!local) {
        console.warn('Capa ignorada (caminho precisa ser relativo, tipo images/collections/.../capa.webp): ' + e.cover);
      } else {
      capa.classList.add('card-cover--photo');
      var foto = document.createElement('img');
      foto.setAttribute('src', e.cover);
      foto.setAttribute('alt', typeof e.coverAlt === 'string' ? e.coverAlt : '');
      foto.setAttribute('loading', 'lazy');
      foto.setAttribute('decoding', 'async');
      if (typeof e.coverW === 'number' && e.coverW > 0 && typeof e.coverH === 'number' && e.coverH > 0) {
        foto.setAttribute('width', e.coverW);
        foto.setAttribute('height', e.coverH);
      }
      capa.appendChild(foto);
      }
    }
    if (!e.cover || !local) {
      // Capa tipográfica (bloco de cor): variação tonal pela posição na home.
      capa.classList.add('cover-' + (((posicao - 1) % 4) + 1));
    }

    // Legenda DENTRO da capa: título + história (igual às capas aprovadas).
    var titulo = document.createElement('span');
    titulo.className = 'card-title';
    titulo.setAttribute('role', 'heading');
    titulo.setAttribute('aria-level', '3');
    titulo.textContent = e.title;

    var historia = document.createElement('span');
    historia.className = 'card-story';
    historia.textContent = e.story;

    capa.appendChild(titulo);
    capa.appendChild(historia);
    card.appendChild(capa);
    mount.appendChild(card);
  });

  // Se NENHUMA entrada passou na validação (todos os slugs estranhos),
  // não deixa a seção vazia: avisa o dono com a mesma mensagem amigável.
  if (posicao === 0) {
    mount.textContent = '';
    var aviso = document.createElement('p');
    aviso.className = 'cards-error';
    aviso.textContent = 'N\u00E3o achei nenhuma cole\u00E7\u00E3o v\u00E1lida no arquivo de dados. Confira o campo slug no js/collections.js (tudo min\u00FAsculo, sem acento, sem espa\u00E7o).';
    mount.appendChild(aviso);
  }
})();
