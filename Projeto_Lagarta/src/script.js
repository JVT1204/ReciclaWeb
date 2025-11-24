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
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.setAttribute('aria-hidden', 'true');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.setAttribute('aria-hidden', 'false');
        currentScreen = screenId;
        
        updateActiveNavigation(screenId);
        closeMobileMenu();
        
        if (screenId === 'home') {
            initializeCarousel();
            loadQuoteFromApi(); // chama API na Home
        } else if (screenId === 'game') {
            initializeGame();
        }

        if (options.updateHash) {
            window.location.hash = screenId;
        }
    }
}

function updateActiveNavigation(screenId) {
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    let activeLink = null;
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
            const target = href.slice(1);
            if (target === screenId) {
                activeLink = link;
            }
        }
    });

    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }
}

function handleRoute() {
    let route = window.location.hash.replace('#', '');

    if (!route) {
        route = 'home';
    }

    const validScreens = ['home', 'game', 'team'];
    if (!validScreens.includes(route)) {
        route = 'home';
    }

    showScreen(route, { updateHash: false });
}

window.addEventListener('hashchange', handleRoute);

// ========================================
// MENU MOBILE
// ========================================

function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const button = document.querySelector('.mobile-menu-toggle');
    
    if (nav && button) {
        const isOpen = nav.classList.contains('active');
        
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
        nav.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-label', 'Fechar menu');
    }
}

function closeMobileMenu() {
    const nav = document.getElementById('mainNav');
    const button = document.querySelector('.mobile-menu-toggle');
    
    if (nav && button) {
        nav.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Abrir menu');
    }
}

// ========================================
// CARROSSEL
// ========================================

function initializeCarousel() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (!carouselWrapper) return;
    
    carouselWrapper.innerHTML = '';
    
    lixoTypes.forEach((lixo, index) => {
        const slide = createSlideElement(lixo, index);
        carouselWrapper.appendChild(slide);
    });
    
    showSlide(0);
}

function createSlideElement(lixo, index) {
    const slide = document.createElement('div');
    slide.className = `lixo-card ${lixo.id}${index === 0 ? ' active' : ''}`;
    slide.id = `slide-${index}`;
    
    slide.innerHTML = `
        <div class="lixo-icon ${lixo.id}">${lixo.icon}</div>
        <h3 class="lixo-title" style="color: ${lixo.color};">${lixo.title}</h3>
        <p class="lixo-description">${lixo.description}</p>
        <div class="lixo-tip">${lixo.tip}</div>
    `;
    
    return slide;
}

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.lixo-card');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
        indicator.setAttribute('aria-selected', index === slideIndex);
    });
    
    currentSlide = slideIndex;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % lixoTypes.length;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = currentSlide === 0 ? lixoTypes.length - 1 : currentSlide - 1;
    showSlide(prevIndex);
}

function goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < lixoTypes.length) {
        showSlide(slideIndex);
    }
}


/// ========================================
// "API" LOCAL DE FRASES (frases.json)
// ========================================
function loadQuoteFromApi() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    if (!quoteText || !quoteAuthor) return;

    quoteText.textContent = 'Carregando frase...';
    quoteAuthor.textContent = '';

<<<<<<< HEAD
    fetch('frases.json')
=======
    fetch('./frases.json')
>>>>>>> 0ac3e75f633cfac0b971c0beead44cf42f4d8a7e
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar frases.json: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const lista = Array.isArray(data.frases) ? data.frases : [];

            if (lista.length === 0) {
                quoteText.textContent = 'Não foi possível carregar a frase.';
                quoteAuthor.textContent = '';
                return;
            }

            const randomIndex = Math.floor(Math.random() * lista.length);
            const fraseObj = lista[randomIndex];

            quoteText.textContent = fraseObj.frase || 'Não foi possível carregar a frase.';
            quoteAuthor.textContent = fraseObj.autor
                ? `— ${fraseObj.autor}`
                : '— Autor desconhecido';
        })
        .catch(error => {
            console.error('Erro ao carregar frase da API local:', error);
            quoteText.textContent = 'Erro ao carregar a frase.';
            quoteAuthor.textContent = '';
        });
}


// ========================================
// JOGO
// ========================================

function initializeGame() {
    gameScore = 0;
    gameItems = [...gameData];
    updateScore();
    newItem();
}

function newItem() {
    if (gameScore === MAX_GAME_SCORE) { 
        showMaxScoreFeedback();
        return;
    }

    if (gameItems.length === 0) {
        gameItems = [...gameData];
    }

    const randomIndex = Math.floor(Math.random() * gameItems.length);
    const selectedItem = gameItems.splice(randomIndex, 1)[0];
    
    const trashElement = document.getElementById('currentTrash');
    if (trashElement) {
        trashElement.textContent = selectedItem.item;
        trashElement.setAttribute('data-type', selectedItem.type);
        trashElement.setAttribute('data-name', selectedItem.name);
    }

    updateScore();
}

function checkAnswer(selectedBinType) {
    const trashElement = document.getElementById('currentTrash');
    if (!trashElement) return;
    
    const correctType = trashElement.getAttribute('data-type');
    const itemName = trashElement.getAttribute('data-name');
    
    if (selectedBinType === correctType) {
        gameScore++;
        showFeedback(`✅ Correto! ${itemName} vai para a lixeira ${correctType}!`, true);
    } else {
        showFeedback(`❌ Errado! ${itemName} deveria ir para a lixeira ${correctType}.`, false);
    }
    
    updateScore();
    
    setTimeout(() => {
        newItem();
    }, 2000);
}

function showFeedback(message, isCorrect) {
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
        `;
        document.body.appendChild(feedback);
    }
    
    feedback.textContent = message;
    feedback.style.color = isCorrect ? '#2E7D32' : '#F44336';
    feedback.style.display = 'block';
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 2000);
}

function updateScore() {
    const scoreElement = document.querySelector('.score strong');
    if (scoreElement) {
        scoreElement.textContent = `${gameScore} / ${MAX_GAME_SCORE}`;
    }
}

function showStats() {
    const percentage = Math.round((gameScore / MAX_GAME_SCORE) * 100); 
    const message = `📊 Sua pontuação: ${gameScore}/${MAX_GAME_SCORE} (${percentage}%)\n\n`;
    
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

function showMaxScoreFeedback() {
    const feedbackMessage = '🎉 Parabéns! Você atingiu a pontuação máxima de reciclagem!';
    showFeedback(feedbackMessage, true);

    setTimeout(() => {
        showScreen('home');
        gameScore = 0;
        updateScore();
    }, 3000);
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const bins = document.querySelectorAll('.bin');
    bins.forEach(bin => {
        bin.addEventListener('click', function() {
            if (currentScreen === 'game') {
                const binType = this.getAttribute('data-type');
                checkAnswer(binType);
            }
        });
    });
    
    document.addEventListener('click', function(event) {
        const nav = document.getElementById('mainNav');
        const button = document.querySelector('.mobile-menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            if (!nav.contains(event.target) && !button.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    handleRoute();
});

// ========================================
// FUNÇÕES GLOBAIS
// ========================================

window.showScreen = showScreen;
window.toggleMobileMenu = toggleMobileMenu;
window.previousSlide = previousSlide;
window.nextSlide = nextSlide;
window.goToSlide = goToSlide;
window.newItem = newItem;
window.showStats = showStats;
window.loadQuoteFromApi = loadQuoteFromApi;
