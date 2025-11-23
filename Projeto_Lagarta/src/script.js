/* ========================================
   RECICLAWEB - JAVASCRIPT
   Funcionalidades do site
======================================== */

let currentScreen = 'home'; // Tela atualmente visível
let currentSlide = 0; // Índice do slide atual no carrossel da tela Home
let gameScore = 0; // Pontuação atual do jogador no jogo
let gameItems = []; // Itens restantes no jogo para serem classificados
const MAX_GAME_SCORE = 10; // Definindo a pontuação máxima como 10

const lixoTypes = [
    {
        id: 'plastico',
        icon: '🥤',
        title: 'PLÁSTICO - LIXEIRA VERMELHA',
        color: '#F44336',
        description: 'Garrafas PET, embalagens de produtos de limpeza, sacolas plásticas, potes de iogurte, tampas de refrigerante, brinquedos quebrados.',
        tip: '💡 Dica: Lave as embalagens antes de descartar para evitar contaminação!'
    },
    {
        id: 'papel',
        icon: '📄',
        title: 'PAPEL - LIXEIRA AZUL',
        color: '#2196F3',
        description: 'Jornais, revistas, caixas de papelão, envelopes, papel de escritório, livros velhos, embalagens de papel.',
        tip: '💡 Dica: Remova grampos e clipes antes de descartar o papel!'
    },
    {
        id: 'vidro',
        icon: '🍶',
        title: 'VIDRO - LIXEIRA VERDE',
        color: '#4CAF50',
        description: 'Garrafas de vidro, potes de conserva, frascos de perfume, copos quebrados, vidros de janela.',
        tip: '💡 Dica: Separe tampas e rótulos antes de descartar o vidro!'
    },
    {
        id: 'metal',
        icon: '🥫',
        title: 'METAL - LIXEIRA AMARELA',
        color: '#FF9800',
        description: 'Latas de alumínio, latas de conserva, tampas de garrafa, objetos de ferro, panelas velhas.',
        tip: '💡 Dica: Amasse as latas para economizar espaço na coleta!'
    },
    {
        id: 'organico',
        icon: '🍌',
        title: 'ORGÂNICO - LIXEIRA MARROM',
        color: '#795548',
        description: 'Restos de comida, cascas de frutas e legumes, borra de café, cascas de ovos, folhas secas.',
        tip: '💡 Dica: Use restos orgânicos para fazer compostagem em casa!'
    }
];

// Dados para o jogo
const gameData = [
    { item: '🍌', type: 'organico', name: 'Banana' },
    { item: '📄', type: 'papel', name: 'Papel' },
    { item: '🍶', type: 'vidro', name: 'Garrafa de vidro' },
    { item: '🥫', type: 'metal', name: 'Lata de conserva' },
    { item: '🍎', type: 'organico', name: 'Maçã' },
    { item: '📦', type: 'papel', name: 'Caixa de papelão' },
    { item: '🥤', type: 'plastico', name: 'Copo plástico' },
    { item: '🍺', type: 'vidro', name: 'Caneca de cerveja' },
    { item: '🔧', type: 'metal', name: 'Ferramenta de ferro' },
    { item: '🍠', type: 'organico', name: 'Batata' },
    { item: '🛍️', type: 'plastico', name: 'Sacola plástica' },
    { item: '📝', type: 'papel', name: 'Bloco de notas' },
    { item: '🍯', type: 'vidro', name: 'Pote de mel' },
    { item: '🛠️', type: 'metal', name: 'Chave de fenda' },
    { item: '🥬', type: 'organico', name: 'Folha de alface' },
    { item: '🧴', type: 'plastico', name: 'Frasco de sabonete líquido' },
    { item: '📬', type: 'papel', name: 'Envelope' },
    { item: '🍾', type: 'vidro', name: 'Garrafa de vinho' },
    { item: '🔩', type: 'metal', name: 'Parafuso' }
];

// ========================================
// NAVEGAÇÃO ENTRE TELAS + ROTEAMENTO
// ========================================

function showScreen(screenId, options = { updateHash: true }) {
    // Esconder todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.setAttribute('aria-hidden', 'true');
    });
    
    // Mostrar tela selecionada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active'); // Adiciona a classe 'active' para exibi-la
        targetScreen.setAttribute('aria-hidden', 'false'); // Acessibilidade: indica que a tela está visível
        currentScreen = screenId; // Atualiza o estado global da tela atual
        
        // Atualizar navegação ativa no menu
        updateActiveNavigation(screenId);
        
        // Fechar menu mobile se estiver aberto para evitar sobreposição
        closeMobileMenu();
        
        // Inicializar funcionalidades específicas da tela quando ela é exibida
        if (screenId === 'home') {
            initializeCarousel(); // Inicializa o carrossel na tela Home
        } else if (screenId === 'game') {
            initializeGame(); // Inicializa o jogo na tela Game
        }

        // Atualiza a hash da URL, se for para atualizar
        if (options.updateHash) {
            window.location.hash = screenId;
        }
    }
}

// Atualiza a classe 'active' nos links de navegação para indicar a tela atual.
function updateActiveNavigation(screenId) {
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove a classe 'active' de todos os links
        link.removeAttribute('aria-current'); // Remove atributo de acessibilidade
    });
    
    // Encontra o link correspondente à tela ativa pelo href (#home, #game, #team)
    let activeLink = null;
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
            const target = href.slice(1); // remove o '#'
            if (target === screenId) {
                activeLink = link;
            }
        }
    });

    if (activeLink) {
        activeLink.classList.add('active'); // Adiciona a classe 'active'
        activeLink.setAttribute('aria-current', 'page'); // Acessibilidade: indica a página atual
    }
}

// Controle de rota via hash (#home, #game, #team)
function handleRoute() {
    // Pega o que vem depois do #
    let route = window.location.hash.replace('#', '');

    // Se não tiver nada, vai pra home
    if (!route) {
        route = 'home';
    }

    // Só permite telas conhecidas
    const validScreens = ['home', 'game', 'team'];
    if (!validScreens.includes(route)) {
        route = 'home';
    }

    // Mostra a tela correta sem alterar a hash de novo
    showScreen(route, { updateHash: false });
}

// Quando mudar o # na URL (clicou no menu ou usou voltar/avançar)
window.addEventListener('hashchange', handleRoute);

// ========================================
// MENU MOBILE
// ========================================

// Alterna a visibilidade do menu mobile.
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const button = document.querySelector('.mobile-menu-toggle');
    
    if (nav && button) {
        const isOpen = nav.classList.contains('active'); // Verifica se o menu está aberto
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const nav = document.getElementById('mainNav');
    const button = document.querySelector('.mobile-menu-toggle');
    
    if (nav && button) {
        nav.classList.add('active'); // Adiciona a classe 'active' para exibir o menu
        button.setAttribute('aria-expanded', 'true'); // Acessibilidade: indica que o menu está expandido
        button.setAttribute('aria-label', 'Fechar menu'); // Altera o rótulo do botão
    }
}

function closeMobileMenu() {
    const nav = document.getElementById('mainNav');
    const button = document.querySelector('.mobile-menu-toggle');
    
    if (nav && button) {
        nav.classList.remove('active'); // Remove a classe 'active' para esconder o menu
        button.setAttribute('aria-expanded', 'false'); // Acessibilidade: indica que o menu está recolhido
        button.setAttribute('aria-label', 'Abrir menu'); // Altera o rótulo do botão
    }
}

// ========================================
// CARROSSEL
// ========================================

function initializeCarousel() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (!carouselWrapper) return;
    
    // Limpar conteúdo existente
    carouselWrapper.innerHTML = '';
    
    // Criar slides para cada tipo de lixo
    lixoTypes.forEach((lixo, index) => {
        const slide = createSlideElement(lixo, index);
        carouselWrapper.appendChild(slide);
    });
    
    // Mostrar slide inicial
    showSlide(0);
}

// Cria e retorna um elemento HTML para um slide do carrossel.
function createSlideElement(lixo, index) {
    const slide = document.createElement('div');
    slide.className = `lixo-card ${lixo.id}${index === 0 ? ' active' : ''}`;
    slide.id = `slide-${index}`; // Define um ID único para o slide
    
    // Preenche o HTML interno do slide com os dados do tipo de lixo
    slide.innerHTML = `
        <div class="lixo-icon ${lixo.id}">${lixo.icon}</div>
        <h3 class="lixo-title" style="color: ${lixo.color};">${lixo.title}</h3>
        <p class="lixo-description">${lixo.description}</p>
        <div class="lixo-tip">${lixo.tip}</div>
    `;
    
    return slide;
}

// Exibe um slide específico do carrossel, escondendo os outros.
function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.lixo-card');
    const indicators = document.querySelectorAll('.indicator');
    
    // Esconder todos os slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Mostrar slide atual
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    
    // Atualizar indicadores de navegação (bolinhas abaixo do carrossel)
    indicators.forEach((indicator, index) => {
        // Adiciona/remove a classe 'active' com base no índice do slide
        indicator.classList.toggle('active', index === slideIndex);
        // Acessibilidade: indica qual indicador está selecionado
        indicator.setAttribute('aria-selected', index === slideIndex);
    });
    
    currentSlide = slideIndex; // Atualiza o índice do slide atual
}

// Navega para o próximo slide do carrossel.
function nextSlide() {
    // Calcula o próximo índice, voltando ao início se for o último slide
    const nextIndex = (currentSlide + 1) % lixoTypes.length;
    showSlide(nextIndex);
}

// Navega para o slide anterior do carrossel.
function previousSlide() {
    // Calcula o índice anterior, indo para o final se for o primeiro slide
    const prevIndex = currentSlide === 0 ? lixoTypes.length - 1 : currentSlide - 1;
    showSlide(prevIndex);
}

// Navega para um slide específico pelo seu índice.
function goToSlide(slideIndex) {
    // Verifica se o índice é válido antes de exibir o slide
    if (slideIndex >= 0 && slideIndex < lixoTypes.length) {
        showSlide(slideIndex);
    }
}

// ========================================
// JOGO
// ========================================

// Inicializa o jogo, reiniciando a pontuação e os itens.
function initializeGame() {
    gameScore = 0;
    gameItems = [...gameData]; // Copiar array
    updateScore();
    newItem();
}

function newItem() {
    // Verifica se a pontuação máxima foi atingida. Se sim, exibe o feedback e para o jogo.
    if (gameScore === MAX_GAME_SCORE) { 
        showMaxScoreFeedback(); // Mostra feedback de pontuação máxima
        return; // Sai da função para não gerar um novo item
    }

    // Se todos os itens do gameItems foram usados (e a pontuação máxima ainda não foi atingida),
    // reinicia o array gameItems com todos os itens do gameData para continuar o jogo.
    if (gameItems.length === 0) {
        gameItems = [...gameData];
    }

    // Seleciona um item de lixo aleatoriamente do array gameItems e o remove (para não repetir imediatamente).
    const randomIndex = Math.floor(Math.random() * gameItems.length);
    const selectedItem = gameItems.splice(randomIndex, 1)[0];
    
    const trashElement = document.getElementById('currentTrash'); // Pega o elemento onde o item é exibido
    if (trashElement) {
        trashElement.textContent = selectedItem.item; // Atualiza o ícone do item
        trashElement.setAttribute('data-type', selectedItem.type); // Armazena o tipo correto no atributo data-type
        trashElement.setAttribute('data-name', selectedItem.name); // Armazena o nome do item no atributo data-name
    }

    updateScore(); // Atualiza a exibição da pontuação após um novo item ser gerado
}

// Verifica se a resposta do usuário está correta ao clicar em uma lixeira.
function checkAnswer(selectedBinType) {
    const trashElement = document.getElementById('currentTrash');
    if (!trashElement) return;
    
    const correctType = trashElement.getAttribute('data-type'); // Pega o tipo correto do item
    const itemName = trashElement.getAttribute('data-name'); // Pega o nome do item
    
    if (selectedBinType === correctType) {
        gameScore++;
        showFeedback(`✅ Correto! ${itemName} vai para a lixeira ${correctType}!`, true);
    } else {
        showFeedback(`❌ Errado! ${itemName} deveria ir para a lixeira ${correctType}.`, false);
    }
    
    updateScore(); // Atualiza a exibição da pontuação
    
    // Próximo item após delay
    setTimeout(() => {
        newItem();
    }, 2000); // Atraso de 2 segundos (2000 milissegundos)
}

// Exibe uma mensagem de feedback temporária na tela.
function showFeedback(message, isCorrect) {
    // Criar elemento de feedback se não existir
    let feedback = document.getElementById('gameFeedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'gameFeedback';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            font-size: 1.1rem;
            font-weight: bold;
            text-align: center;
        `; // Estilos inline para o feedback (para ser independente do CSS externo)
        document.body.appendChild(feedback); // Adiciona o elemento ao corpo do documento
    }
    
    feedback.textContent = message; // Define o texto da mensagem de feedback
    feedback.style.color = isCorrect ? '#2E7D32' : '#F44336'; // Define a cor do texto (verde para correto, vermelho para errado)
    feedback.style.display = 'block'; // Torna o feedback visível
    
    // Esconder após 2 segundos
    setTimeout(() => {
        feedback.style.display = 'none'; // Esconde o feedback
    }, 2000); // Atraso de 2 segundos
}

// Atualiza a exibição da pontuação no painel do jogo.
function updateScore() {
    const scoreElement = document.querySelector('.score strong'); // Pega o elemento strong dentro de .score
    if (scoreElement) {
        scoreElement.textContent = `${gameScore} / ${MAX_GAME_SCORE}`; // Atualiza o texto com a pontuação atual e máxima
    }
}

// Exibe as estatísticas finais do jogo em um alerta.
function showStats() {
    // Calcula a porcentagem de acertos com base na pontuação máxima definida
    const percentage = Math.round((gameScore / MAX_GAME_SCORE) * 100); 
    const message = `📊 Sua pontuação: ${gameScore}/${MAX_GAME_SCORE} (${percentage}%)\n\n`; // Mensagem inicial
    
    let performance = '';
    if (percentage >= 90) {
        performance = '🌟 Excelente! Você é um expert em reciclagem!';
    } else if (percentage >= 70) {
        performance = '👍 Muito bom! Continue praticando!';
    } else if (percentage >= 50) {
        performance = '📚 Bom começo! Estude mais sobre reciclagem.';
    } else {
        performance = '💪 Não desista! Pratique mais e você vai melhorar!';
    }
    
    alert(message + performance);
}

// Exibe um feedback especial quando o jogador atinge a pontuação máxima.
function showMaxScoreFeedback() {
    const feedbackMessage = '🎉 Parabéns! Você atingiu a pontuação máxima de reciclagem!';
    showFeedback(feedbackMessage, true); // Reutiliza a função showFeedback

    // Reinicia o jogo ou retorna à tela inicial após o feedback
    setTimeout(() => {
        showScreen('home');
        gameScore = 0;
        updateScore();
    }, 3000); // Atraso de 3 segundos (3000 milissegundos)
}

// ========================================
// EVENT LISTENERS PARA O JOGO: Configurações de eventos que iniciam a interatividade.
// ========================================

// Executa o código quando o DOM (Document Object Model) estiver completamente carregado.
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar event listeners para as lixeiras na tela do jogo
    const bins = document.querySelectorAll('.bin');
    bins.forEach(bin => {
        bin.addEventListener('click', function() {
            if (currentScreen === 'game') {
                const binType = this.getAttribute('data-type'); // Pega o tipo da lixeira clicada
                checkAnswer(binType); // Chama a função para verificar a resposta
            }
        });
    });
    
    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', function(event) {
        const nav = document.getElementById('mainNav');
        const button = document.querySelector('.mobile-menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            // Se clicou fora do menu e do botão, fecha o menu
            if (!nav.contains(event.target) && !button.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Fechar menu mobile ao redimensionar a tela (se voltar para desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Em vez de inicializar direto o carrossel, usamos a rota atual
    handleRoute();
});

// ========================================
// FUNÇÕES GLOBAIS (para compatibilidade com onclick)
// ========================================

// Tornar funções globais para uso nos atributos onclick de elementos HTML.
// Isso permite que funções como showScreen() ou toggleMobileMenu() sejam chamadas diretamente de eventos HTML.
window.showScreen = showScreen;
window.toggleMobileMenu = toggleMobileMenu;
window.previousSlide = previousSlide;
window.nextSlide = nextSlide;
window.goToSlide = goToSlide;
window.newItem = newItem;
window.showStats = showStats;
