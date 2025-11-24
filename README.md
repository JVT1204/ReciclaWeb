# ReciclaWeb

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aplicação voltada para a conscientização da comunidade sobre o descarte adequado de resíduos.

## Equipe

- Eduardo Augusto Clara Olivato - 10738072
- João Vitor Tortorello - 32253796

## 1. Ideação do Projeto
    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A ideia surgiu a partir da necessidade de promover conscientização ambiental na comunidade, principalmente sobre a coleta seletiva de resíduos
sólidos. Muitas pessoas ainda têm dúvidas sobre em qual lixeira descartar corretamente determinados resíduos, o que prejudica o processo de reciclagem.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pensando nisso, o Recicla Web, uma plataforma digital interativa que une educação e prática, permitindo que a comunidade aprenda de forma lúdica sobre os tipos de lixo e teste seus conhecimentos em um jogo de arrastar e soltar.

## 2. Protótipo Inicial
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os protótipos foram desenvolvidos pelo software Figma, sendo criadas
wireframes simples das telas

### Tela inicial – Tipos de lixo: Mostra informações sobre cada categoria de lixo (plástico, papel, vidro, metal e orgânico).

![alt](/assets/TelaInicio-ReciclaWeb.png)

### Tela do jogo – Desafio da Separação: Permite ao usuário arrastar cada item de lixo para a lixeira correta, somando pontos conforme acertos.

![alt](/assets/Tela-ReciclaWeb.png)

## 3. Caráter Extensionista

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Este projeto busca atender uma demanda real da comunidade, ao ensinar práticas de coleta seletiva, e futuramente pode estar aberto para uso comunitário, podendo ser utilizado em escolas, ONGs, associações de bairro ou por qualquer usuário com acesso à internet.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Em suma, o site “ReciclaWeb” tem o intuito de gerar impacto social e
ambiental positivo, promovendo conscientização sobre sustentabilidade e
cidadania.

## 4. Entendendo o ReciclaWeb: Um Guia Detalhado

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O ReciclaWeb é uma aplicação web interativa desenvolvida com HTML, CSS e JavaScript, que tem como objetivo educar sobre a coleta seletiva de resíduos de forma divertida. Ele combina informações visuais com um jogo de classificação, incentivando a conscientização ambiental.

Obs: Há comentários dentro dos códigos para melhor entendimento

### 1. `index.html` – Estrutura

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O arquivo `index.html` é a espinha dorsal do site. Ele define a estrutura e o conteúdo de todas as páginas que o usuário vê.

**Principais Seções e o que elas fazem:**

*   **`<head>`**: 
    *   **`<meta charset="UTF-8">`**: Essencial para que o navegador entenda e exiba corretamente caracteres especiais e acentuações.
    *   **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Crucial para a **responsividade**. Isso diz ao navegador para ajustar a largura da página à largura do dispositivo, garantindo que o site funcione bem em celulares, tablets e computadores.
    *   **`<title>ReciclaWeb</title>`**: O texto que aparece na aba do navegador ou na lista de favoritos.
    *   **`<link rel="stylesheet" href="./style.css">`**: Conecta o arquivo HTML ao arquivo CSS. É aqui que você diz ao HTML "use as instruções de estilo que estão no arquivo `style.css`".
*   **`<body>`**: 
    *   **`<div class="container">`**: Este é o contêiner principal de todo o conteúdo visível. Ele ajuda a centralizar o site na tela e aplicar estilos gerais, como uma sombra.
    *   **`<header class="header">`**: 
        *   Contém o logo (`<a class="logo">`), que também serve como um botão para voltar à tela inicial.
        *   Um botão de menu "hambúrguer" (`<button class="mobile-menu-toggle">`) para navegação em dispositivos móveis.
        *   A navegação principal (`<nav class="nav" id="mainNav">`), com links para as seções "Home", "Jogue Agora" e "Desenvolvedores". Cada link usa o atributo `onclick` para chamar uma função JavaScript (`showScreen()`) que muda a tela visível.
    *   **`<main id="mainContent">`**: Esta é a área principal onde as diferentes telas do seu site (Home, Jogo, Equipe) serão exibidas. Anteriormente, essas telas eram envolvidas por `div`s genéricas, mas foram refatoradas para usar `<section>` diretamente.
        *   **`<section id="home" class="screen home-screen active section">`**: Representa a tela inicial. Agora, é uma `section` sem a `div` extra.
            *   Contém um título e subtítulo.
            *   Um **carrossel (`carousel-container`)** com botões de navegação e indicadores de slide, onde o conteúdo de cada slide (tipos de lixo) é gerado dinamicamente pelo JavaScript.
            *   Um botão "Jogar Agora!" (`<button class="btn">`) que leva o usuário para a tela do jogo.
        *   **`<section id="game" class="screen game-screen section">`**: A tela do jogo. Também refatorada para ser uma `section` direta.
            *   Exibe o painel de pontuação (`score-board`).
            *   A área do jogo (`game-area`) com o item de lixo atual (`trash-item`) e as cinco lixeiras (`bins-container`).
            *   Controles do jogo (`game-controls`) com botões para "Novo Item", "Estatísticas" e "Voltar ao Início".
        *   **`<section id="team" class="screen team-screen section">`**: A tela de desenvolvedores. Refatorada para ser uma `section` direta.
            *   Apresenta informações sobre a equipe (`team-members`).
            *   Detalhes do projeto (`project-info`), incluindo sua missão e um link para o repositório GitHub. A seção de detalhes do projeto foi refatorada para usar a lista de descrição (`<dl>`, `<dt>`, `<dd>`) para melhor semântica.
    *   **`<script src="./script.js"></script>`**: Conecta o arquivo HTML ao arquivo JavaScript. É aqui que você diz ao HTML "use as instruções de interatividade que estão no arquivo `script.js`". É importante que este link esteja antes de fechar o `</body>` para garantir que todos os elementos HTML já existam quando o JavaScript tentar manipulá-los.

### 2. `style.css` – Aparência

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O arquivo `style.css` é responsável por toda a parte visual do seu site. Ele diz ao navegador como cada elemento HTML deve ser estilizado: cores, tamanhos, fontes, posicionamento, animações e como o site se adapta a diferentes tamanhos de tela.

**Principais Seções e o que elas fazem:**

*   **`/* Reset e Base */`**:
    *   **`* { margin: 0; padding: 0; box-sizing: border-box; }`**: Uma prática comum para "resetar" os estilos padrão dos navegadores, garantindo que seu design comece de uma base limpa e consistente. `box-sizing: border-box;` simplifica o cálculo de largura e altura dos elementos.
    *   **`html { scroll-behavior: smooth; }`**: Ativa a rolagem suave quando o usuário clica em links de âncora (como os do menu de navegação que levam a uma seção da mesma página).
    *   **`body`**: Define a fonte padrão, altura de linha e um fundo gradiente para toda a página.
*   **`.container`**: Estiliza o contêiner principal, centralizando-o e adicionando uma sombra elegante.
*   **`/* HEADER */`**: Estilos para o cabeçalho:
    *   Define o fundo gradiente, cor do texto, preenchimento, e usa `display: flex` para alinhar o logo, o botão de menu mobile e a navegação.
    *   **`position: sticky; top: 0; z-index: 100;`**: Faz o cabeçalho "grudar" no topo da tela quando o usuário rola a página, mantendo a navegação sempre visível.
    *   `.logo:hover`: Adiciona um efeito de escala suave ao passar o mouse sobre o logo.
*   **`.nav` (Menu de Navegação)**:
    *   `display: none;` por padrão: O menu de navegação é inicialmente oculto.
    *   `position: absolute; top: 100%; left: 0;`: Posiciona o menu abaixo do cabeçalho.
    *   `.nav.active { display: flex; }`: Quando a classe `active` é adicionada pelo JavaScript, o menu é exibido como uma coluna flexível, ideal para mobile.
    *   `.nav-link:hover, .nav-link.active`: Adiciona um fundo semi-transparente quando o mouse passa sobre os links ou quando um link está ativo.
*   **`.mobile-menu-toggle` (Botão Hambúrguer)**:
    *   `display: block;` (em mobile): Garante que o ícone do menu hambúrguer esteja visível em telas menores.
    *   Estiliza o botão com cores, tamanho e um efeito de fundo suave ao passar o mouse.
*   **`/* TELAS E NAVEGAÇÃO */`**:
    *   `.screen { display: none; }`: Todas as telas (Home, Jogo, Equipe) são ocultadas por padrão.
    *   `.screen.active { display: block; animation: fadeIn 0.5s ease-in-out; }`: A tela com a classe `active` é exibida com uma animação suave de fade-in (aparecendo gradualmente e subindo um pouco).
*   **`/* TELA HOME */`**: Estilos específicos para o carrossel, cartões de lixo, botões de navegação do carrossel e indicadores. Define cores de borda para cada tipo de lixo, animações de transição e responsividade dos elementos.
*   **`/* TELA JOGO */`**: Estilos para o painel de pontuação, área do jogo, o item de lixo arrastável (`trash-item`), as lixeiras (`bin` com cores específicas para cada tipo) e os botões de controle do jogo. Inclui efeitos de `hover` e `active` para o item de lixo e as lixeiras.
*   **`/* TELA EQUIPE */`**: Estilos para os cartões dos membros da equipe (`member-card`), avatares, informações do projeto e o link do GitHub. O `text-align: center;` foi aplicado diretamente à `.project-info` para centralizar o conteúdo, eliminando a necessidade de uma classe `centered-content` separada.
*   **`/* MEDIA QUERIES - RESPONSIVIDADE */`**:
    *   **`@media (max-width: 768px)` e `@media (max-width: 480px)` e `@media (max-width: 320px)`**: Essas são as instruções mágicas que adaptam seu site para diferentes tamanhos de tela. Elas permitem que você mude os estilos (tamanhos de fonte, espaçamento, layout, etc.) quando a largura da tela é menor que um determinado valor, garantindo uma boa experiência em celulares e tablets.
*   **`/* ANIMAÇÕES ADICIONAIS */`**:
    *   **`@keyframes slideInUp` e `@keyframes pulse`**: Define animações personalizadas que são usadas em diferentes elementos (como a entrada dos cartões de membro ou o efeito de pulso no item de lixo).
    *   **Efeitos de ondulação nos botões (`.btn`, `.btn-secondary`)**: Criam um efeito visual de "onda" quando os botões são clicados.

### 3. `script.js` – Interatividade

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O arquivo `script.js` é onde toda a inteligência e interatividade do seu site residem. Ele manipula os elementos HTML, responde às ações do usuário e gerencia a lógica do jogo.

**Principais Seções e o que elas fazem:**

*   **`// Estado global da aplicação`**:
    *   Variáveis como `currentScreen`, `currentSlide`, `gameScore`, `gameItems` e `MAX_GAME_SCORE`. Estas variáveis armazenam o estado atual do site e do jogo, permitindo que o JavaScript "lembre" onde o usuário está e o que está acontecendo.
*   **`const lixoTypes = [...]`**:
    *   Define um array de objetos que contém os dados detalhados para cada tipo de lixo. Esses dados são usados para popular o carrossel na tela Home.
*   **`const gameData = [...]`**:
    *   Define um array de objetos que lista todos os itens de lixo que aparecerão no jogo, junto com seu tipo correto.
*   **`// NAVEGAÇÃO ENTRE TELAS`**:
    *   **`function showScreen(screenId)`**: Esta é a função central para mudar de tela. Ela esconde todas as outras telas e exibe apenas a que foi solicitada (por exemplo, "home", "game" ou "team"). Ela também chama outras funções para inicializar o carrossel ou o jogo, dependendo da tela.
    *   **`function updateActiveNavigation(screenId)`**: Gerencia qual link de navegação no cabeçalho deve estar "ativo" (destacado) para corresponder à tela atual.
*   **`// MENU MOBILE`**:
    *   **`function toggleMobileMenu()`, `openMobileMenu()`, `closeMobileMenu()`**: Controlam a abertura e fechamento do menu hambúrguer em dispositivos móveis, adicionando e removendo classes CSS para exibir/ocultar o menu e atualizando atributos de acessibilidade.
*   **`// CARROSSEL`**:
    *   **`function initializeCarousel()`**: Monta o carrossel na tela Home, criando dinamicamente os cartões de lixo com base nos dados de `lixoTypes`.
    *   **`function createSlideElement(lixo, index)`**: Uma função auxiliar que cria o elemento HTML para um único slide do carrossel.
    *   **`function showSlide(slideIndex)`**: Exibe um slide específico, garantindo que apenas um esteja visível por vez e atualizando os indicadores de navegação.
    *   **`function nextSlide()`, `previousSlide()`, `goToSlide(slideIndex)`**: Funções para navegar entre os slides do carrossel.
*   **`// JOGO`**:
    *   **`function initializeGame()`**: Prepara o jogo, zerando a pontuação, copiando os itens de lixo para uma lista mutável (`gameItems`) e gerando o primeiro item.
    *   **`function newItem()`**: É responsável por selecionar um novo item de lixo aleatoriamente para o jogador classificar. **Crucialmente, verifica se a `MAX_GAME_SCORE` foi atingida e, se sim, chama `showMaxScoreFeedback()` em vez de gerar um novo item.** Também reinicia a lista de `gameItems` se todos os itens foram usados, permitindo que o jogo continue até a pontuação máxima.
    *   **`function checkAnswer(selectedBinType)`**: Quando o jogador clica em uma lixeira, esta função verifica se a escolha está correta, atualiza a `gameScore` e exibe um feedback visual.
    *   **`function showFeedback(message, isCorrect)`**: Cria e exibe uma mensagem de feedback temporária na tela (verde para acerto, vermelho para erro).
    *   **`function updateScore()`**: Atualiza o texto da pontuação no painel do jogo, mostrando a pontuação atual em relação à `MAX_GAME_SCORE`.
    *   **`function showStats()`**: Exibe um alerta com a pontuação final do jogador e uma mensagem de desempenho personalizada.
    *   **`function showMaxScoreFeedback()`**: Esta é a função que foi adicionada para o seu pedido. Ela é chamada quando o `gameScore` atinge 10. Exibe uma mensagem de parabéns e, após um atraso, redireciona o usuário para a tela inicial e reseta a pontuação do jogo.
*   **`// EVENT LISTENERS PARA O JOGO`**:
    *   **`document.addEventListener('DOMContentLoaded', function() { ... });`**: Este bloco de código garante que todas as funcionalidades JavaScript sejam executadas somente depois que a página HTML estiver completamente carregada.
    *   Contém os ouvintes de eventos para as lixeiras (quando clicadas), para fechar o menu mobile ao clicar fora dele, e para fechar o menu mobile ao redimensionar a janela (voltando para desktop).
*   **`// FUNÇÕES GLOBAIS (para compatibilidade com onclick)`**:
    *   **`window.showScreen = showScreen;` (e outras)**: Torna as funções JavaScript acessíveis globalmente, permitindo que elas sejam chamadas diretamente de atributos `onclick` no HTML.

### 4. Como tudo se conecta para replicar o site

1.  **HTML (`index.html`)**: Fornece a estrutura semântica e os "ganchos" (IDs e classes) para o CSS e o JavaScript. Sem ele, não há nada para estilizar ou interagir.
2.  **CSS (`style.css`)**: Pega a estrutura do HTML e a transforma em um site visualmente atraente e responsivo. Ele usa os IDs e classes definidos no HTML para aplicar os estilos, com uma abordagem mais otimizada após as refatorações.
3.  **JavaScript (`script.js`)**: Adiciona vida ao site. Ele pega os elementos HTML (usando IDs e classes), manipula seus atributos, altera seus conteúdos e responde às interações do usuário, criando a lógica do carrossel e do jogo.

**Para replicar o site:**

*   **Entenda o Propósito**: Primeiro, entenda o objetivo de cada arquivo (estrutura, estilo, interatividade).
*   **Estrutura é a Base**: Comece com o `index.html`. Crie a estrutura básica das telas e dos elementos, aproveitando as tags semânticas.
*   **Estilize Gradualmente**: Adicione o `style.css` e estilize as seções uma por uma, vendo como as regras CSS afetam a aparência. Use as "media queries" para garantir que o site funcione bem em diferentes dispositivos.
*   **Adicione Interatividade**: Com o HTML e CSS no lugar, comece a implementar as funcionalidades do `script.js`. Pense em como cada ação do usuário (clicar em um botão, arrastar um item) deve ser tratada pelo JavaScript.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao seguir essa abordagem e consultar os comentários adicionados, você terá uma compreensão sólida de como o ReciclaWeb funciona e estará bem equipado para replicá-lo ou adaptá-lo às suas próprias necessidades.

**##5.Rotas dinamicas**
O projeto utiliza uma rota dinâmica no Next.js para demonstrar o uso de parâmetros na URL, conforme os requisitos da disciplina. 
A rota foi criada em:

src/app/fase/[id]/page.tsx

O nome [id] indica que essa parte da URL é variável.
Assim, qualquer endereço como:

/fase/1
/fase/2
/fase/teste

acessa a mesma página, exibindo o valor recebido pela URL.

O componente é assíncrono porque o Next envia params como uma Promise:

export default async function FasePage({ params }) {
  const { id } = await params;
  return <p>Fase {id} do Jogo</p>;
}

Mesmo o jogo tendo apenas uma fase real, a rota dinâmica foi incluída para mostrar domínio do App Router, cumprir o requisito da professora e deixar o projeto preparado para futuras expansões.

**##6. API/frases – API de Frases Ambientais**

A rota /api/frases é a responsável por fornecer frases ambientais aleatórias para a página inicial.No Next.js (App Router), ela funciona como um pequeno servidor interno que retorna dados em formato JSON.O arquivo route.js define uma rota de API no Next.js.
Ele permite que o frontend faça requisições usando:fetch('/api/frases')e receba frases prontas para exibir na interface.
 Principais Responsabilidades
GET:
Retorna um JSON contendo uma lista de frases ambientais.
Cada frase contém: o texto motivacional ambiental

Como o frontend usa essa API
Na Home (app/page.tsx):Um useEffect() faz a requisição automaticamente ao carregar a página.A resposta é lida com .json().Uma frase aleatória é selecionada.O texto e o autor são exibidos na seção de “💬 Conselhos ambientais”.
Isso adiciona conteúdo dinâmico real ao site, tornando-o mais interativo.


## 7. Conclusão e Aprendizados

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O ReciclaWeb representa uma jornada de aprendizado e aplicação prática de tecnologias web front-end (HTML5, CSS3, JavaScript). Desde a ideação, passando pelo desenvolvimento de protótipos e a implementação final, o foco sempre esteve em criar uma ferramenta educativa e interativa que pudesse engajar a comunidade na causa da coleta seletiva. As refatorações contínuas, visando a semântica do HTML e a otimização do CSS, não apenas aprimoraram a manutenibilidade do código, mas também reforçaram a importância de boas práticas de desenvolvimento.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Este projeto extensionista nos permitiu não só consolidar conhecimentos técnicos, mas também entender como a tecnologia pode ser uma poderosa aliada na promoção da sustentabilidade e da cidadania. Continuaremos explorando novas formas de expandir e aprimorar esta iniciativa, sempre com o compromisso de fazer a diferença.
