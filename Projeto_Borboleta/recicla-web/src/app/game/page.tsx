'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { GameItemDisplay } from '../components/GameItemDisplay';
import { gameData, MAX_GAME_SCORE } from '../data/trashCategories';
import { GameItem } from '../types';

export default function Game() {
  const [gameScore, setGameScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setGameScore(0);
    setGameItems([...gameData]);
    newItem();
  };

  const newItem = () => {
    if (gameScore === MAX_GAME_SCORE) {
      showMaxScoreFeedback();
      return;
    }

    let availableItems = gameItems.length > 0 ? gameItems : [...gameData];
    
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const selectedItem = availableItems[randomIndex];
    
    setCurrentItem(selectedItem);
    setGameItems(prev => prev.filter((_, index) => index !== randomIndex));
  };

  const checkAnswer = (selectedBinType: string) => {
    if (!currentItem) return;
    
    if (selectedBinType === currentItem.type) {
      setGameScore(prev => prev + 1);
      showFeedback(`✅ Correto! ${currentItem.name} vai para a lixeira ${currentItem.type}!`, true);
    } else {
      showFeedback(`❌ Errado! ${currentItem.name} deveria ir para a lixeira ${currentItem.type}.`, false);
    }
    
    setTimeout(() => {
      newItem();
    }, 2000);
  };

  const showFeedback = (message: string, isCorrect: boolean) => {
    setFeedback({ message, isCorrect });
    setTimeout(() => {
      setFeedback(null);
    }, 2000);
  };

  const showMaxScoreFeedback = () => {
    showFeedback('🎉 Parabéns! Você atingiu a pontuação máxima de reciclagem!', true);
    setTimeout(() => {
      initializeGame();
    }, 3000);
  };

  const showStats = () => {
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
  };

  const bins = [
    { type: 'plastico', label: 'PLÁSTICO', emoji: '♻️' },
    { type: 'papel', label: 'PAPEL', emoji: '📄' },
    { type: 'vidro', label: 'VIDRO', emoji: '🥛' },
    { type: 'metal', label: 'METAL', emoji: '🔩' },
    { type: 'organico', label: 'ORGÂNICO', emoji: '🍌' }
  ];

  // If no current item and not showing feedback, we're initializing
  const isInitializing = !currentItem && !feedback;

  return (
    <div className="container">
      <Header />
      <main id="mainContent">
        <section id="game" className="screen game-screen active section">
          <h1 className="section-title" id="gameTitle">🎯 Desafio da Separação</h1>
          <p className="section-subtitle">
            Teste seus conhecimentos! Clique na lixeira correta para cada resíduo e ganhe pontos
          </p>
          
          <div className="game-container">
            <div className="score-board mb-6">
              <div className="score bg-white bg-opacity-90 rounded-full px-6 py-2 shadow-md">
                <span className="text-lg font-semibold">Pontuação: <strong className="text-green-600">{gameScore} / {MAX_GAME_SCORE}</strong></span>
              </div>
            </div>

            <div className="current-item mb-8">
              {currentItem && (
                <div className="item-display bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col items-center">
                    <GameItemDisplay item={currentItem} className="mb-4" />
                    <p className="item-name text-xl font-medium text-gray-800 mt-2">{currentItem.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bins grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {bins.map((bin) => (
                <button
                  key={bin.type}
                  className={`bin ${bin.type} flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${!currentItem ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
                  onClick={() => checkAnswer(bin.type)}
                  disabled={!currentItem}
                >
                  <div className="text-4xl mb-2">{bin.emoji}</div>
                  <span className="font-medium">{bin.label}</span>
                </button>
              ))}
            </div>

            <div className="game-controls">
              <button className="btn-secondary" type="button" onClick={newItem}>
                🔄 Novo Item
              </button>
              <button className="btn-secondary" type="button" onClick={showStats}>
                📊 Estatísticas
              </button>
              <Link href="/" className="btn">
                🏠 Voltar ao Início
              </Link>
            </div>
          </div>
        </section>
      </main>

      {feedback && (
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '1rem 2rem',
            borderRadius: '10px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
            zIndex: 1000,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: feedback.isCorrect ? '#2E7D32' : '#F44336'
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
}
