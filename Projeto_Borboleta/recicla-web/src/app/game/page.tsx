'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
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

  const binTypes = [
    { type: 'plastico', label: 'PLÁSTICO' },
    { type: 'papel', label: 'PAPEL' },
    { type: 'vidro', label: 'VIDRO' },
    { type: 'metal', label: 'METAL' },
    { type: 'organico', label: 'ORGÂNICO' }
  ];

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
            <div className="score-board">
              <div className="score">
                <span>Pontuação: <strong>{gameScore} / {MAX_GAME_SCORE}</strong></span>
                <span>⭐</span>
              </div>
              <p style={{ marginTop: '0.5rem', color: '#666' }}>
                Acerte o máximo de separações possíveis!
              </p>
            </div>
            
            <div className="game-area">
              <h3 style={{ color: '#2E7D32', marginBottom: '1rem' }}>Item Atual</h3>
              
              <div className="current-item">
                <div className="trash-item" id="currentTrash">
                  {currentItem?.item}
                </div>
                <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.1rem' }}>
                  <strong>Clique</strong> na lixeira correta correspondente ao item acima ⬇️
                </p>
              </div>
              
              <div className="bins-container">
                {binTypes.map((bin) => (
                  <div 
                    key={bin.type}
                    className={`bin ${bin.type}`}
                    data-type={bin.type}
                    onClick={() => checkAnswer(bin.type)}
                  >
                    <div className="bin-label">{bin.label}</div>
                  </div>
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
