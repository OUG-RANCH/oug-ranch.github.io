// js/main.js — lógica do site (Fase 1: só a gaveta do menu)
//
// REGRA DE ORDEM (convenção do projeto, valem para as Fases 2–4):
//   os <script> de DADOS (ex.: collections.js, que cria window.OUG_COLLECTION)
//   entram ANTES deste arquivo no HTML — dados primeiro, lógica depois.
//   Scripts clássicos apenas: sem módulos ES e sem fetch() (quebra no file://).
//
(function () {
  'use strict';

  var drawer = document.getElementById('menu');
  var burger = document.querySelector('.hamburger');

  function openMenu() {
    drawer.showModal();                       // de graça: Esc, foco preso, fundo inerte
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'fechar menu');
    document.body.classList.add('menu-open'); // trava o scroll — showModal NÃO faz isso
  }
  function closeMenu() {
    drawer.close();
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'abrir menu');
    burger.focus();                           // foco volta pro hambúrguer
  }

  burger.addEventListener('click', openMenu);
  drawer.querySelector('.drawer-close').addEventListener('click', closeMenu);

  // Segurança: qualquer fechamento nativo do <dialog> (tecla Esc, close())
  // sincroniza o estado — sem isso o Esc deixava o scroll travado e o
  // aria-expanded "true" (correção: o <dialog> dispara o evento "close").
  drawer.addEventListener('close', function () {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'abrir menu');
    document.body.classList.remove('menu-open');
    burger.focus();
  });

  // toques em links âncora fecham a gaveta; links de outra página navegam do mesmo jeito
  drawer.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () { closeMenu(); });
  });

  // especificação: fechar sozinho se a tela crescer pro desktop
  // (só quando a gaveta está aberta — senão o burger.focus() rouba o foco à toa)
  var mq = matchMedia('(min-width: 768px)');
  mq.addEventListener('change', function (e) { if (e.matches && drawer.open) closeMenu(); });
})();
