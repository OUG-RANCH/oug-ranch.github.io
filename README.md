# OUG RANCH — site do lookbook

Chega mais! Este é o repositório do site da OUG RANCH — um lookbook simples, feito com HTML, CSS e JavaScript puros, sem sistema de build. Ele mora no GitHub Pages e é atualizado direto daqui.

Este guia é pra você, dono, trocar fotos e textos sem quebrar nada. São três regras e dois "onde fica". Lê uma vez e tá resolvido.

---

## Como o site é atualizado

O fluxo é sempre o mesmo, em 5 passos:

1. Edite o arquivo (pelo VS Code ou qualquer editor).
2. Abra o GitHub Desktop, escreva uma frase curta do que mudou e clique em **Commit**.
3. Clique em **Push origin** (envia para o GitHub, branch `main`).
4. Espere **1 a 10 minutos** — o servidor do Pages guarda as páginas em cache e leva até 10 minutos para mostrar a versão nova.
5. Veja o resultado com o **refresh forçado** (`Ctrl+F5` no computador; no celular, abra o site numa **aba anônima** ou feche e reabra o navegador).

**Importante:** o site publica pela branch `main`, a partir da pasta raiz (`/ (root)`). Nas configurações de Pages do repositório, a opção correta é: *Settings → Pages → Build and deployment → Source "Deploy from a branch" → Branch: `main` → Folder: `/ (root)`*. Se um dia o Pages aparecer desligado ou publicado em outra branch, volte nessa tela e selecione `main`.

## Convenção de nomes de arquivo (regra nº 1)

Todo arquivo que entrar no repositório segue este formato:

- **minúsculas** — nada de `Foto.jpg`, use `foto.jpg`
- **sem acento** — `campanha.png`, nunca `campanhã.png`
- **sem espaço** — use hífen para separar: `look-01-orbita.jpg`
- **sem parêntese** (nem vírgula, nem cedilha)

**Por quê:** o site roda num servidor Linux que diferencia MAIÚSCULA de minúscula — `Foto.jpg` e `foto.jpg` são dois arquivos diferentes para ele. O que funciona no seu Windows pode dar link quebrado no site.

**Regra de ouro:** renomeie **ANTES** de colocar o arquivo no repositório, nunca depois. Se renomear depois, o site fica apontando para um arquivo que não existe mais.

## SOP de otimização de fotos (regra nº 2)

Toda foto entra no site pelo **Squoosh** (squoosh.app — grátis, roda no navegador, não instala nada). O passo a passo:

1. Abra a foto no Squoosh (arraste para a página).
2. Escolha o formato **WebP**.
3. Ajuste a **largura**: no máximo **1600px** (fotos de galeria) ou **900px** (foto do hero no celular).
4. Ajuste a **qualidade**: entre **75 e 80** para fotos de galeria; **~85** para o hero.
5. Marque para **apagar os metadados** (remove dados da câmera, GPS etc.).
6. Baixe o arquivo.

**Resultado esperado:** entre **200 e 400 KB por foto**.

**Se a foto passar do limite de tamanho ou de peso, é preciso reexportar no Squoosh em qualidade mais baixa e/ou largura menor — não suba como está.** Foto acima de ~400 KB pesa no bolso do visitante com internet de celular.

**Originais ficam FORA do repositório** (Google Drive ou seu disco). Aqui dentro só vai foto já otimizada — o repositório é público e o Pages tem limite de espaço.

**Onde ficam as fotos:** dentro da pasta `images/`. As fotos de coleção entram em `images/collections/<slug>/` na próxima fase — o nome da pasta é o "endereço" da coleção (o mesmo slug usado no link, ex.: `images/collections/novo-horizonte/`).

**Sobre as fotos atuais do hero:** os JPEGs atuais (`images/hero-mobile.jpg` e `images/hero-desktop.jpg`) são provisórios, só para o site nascer com cara de pronto. Quando você tiver a foto de campanha de verdade, exporte pelo Squoosh em WebP seguindo esta regra nº 2 e substitua.

## Convenção de alt text (regra nº 3)

Toda imagem no site tem atributo `alt`, e a regra depende do tipo:

- **Foto que mostra produto/campanha** (informativa): descreva a cena em uma frase curta em português, no formato `Campanha OUG RANCH — [cena]`. Ex.: `alt="Campanha OUG RANCH — jaqueta de lona na cerca da fazenda ao amanhecer"`.
- **Imagem puramente decorativa** (só enfeita, não comunica nada): use o atributo `alt` **vazio de propósito** — `alt=""`. Isso não é erro: é como se diz ao leitor de tela "pode pular essa".

## O que nunca fazer

- **Nada de dados pessoais ou sensíveis no repositório** — ele é **público**: qualquer pessoa no mundo pode ver tudo que está aqui. Nada de CPF, endereço, telefone, documento, preço de fornecedor.
- **Nada de arquivo ou pasta começando com underline** (`_`). O servidor do Pages ignora/esconde esses nomes — o arquivo simplesmente não aparece no site.
- **Nada de caminho começando com `/`** (barra). Caminhos de imagem, CSS e JS aqui dentro são sempre relativos (ex.: `./images/foto.webp`, `css/styles.css`). Caminho com `/` na frente quebra o site quando ele roda no endereço do Pages.

## Trocar o logo/textos

Onde fica cada coisa:

- **Cores, espaçamentos e tamanhos** (o "tema" do site): no topo do arquivo `css/styles.css`, no bloco `TOKENS`. Mudou o valor ali, o site inteiro muda junto.
- **Textos das páginas** (slogan, seções, rodapé): no próprio HTML (`index.html`, e depois `collections/...` e `lookbook.html`).
- **Texto do 404** (a página "endereço não existe"): no arquivo `404.html` mesmo — ele é autocontido, com estilo e texto embutidos.

---

*Dúvida? Antes de subir qualquer coisa, confira as três regras: nome certo, foto otimizada, alt text certo. Tá dentro disso, pode dar push.*
