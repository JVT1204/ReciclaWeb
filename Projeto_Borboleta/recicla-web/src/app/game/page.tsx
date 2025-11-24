'use client';

import { useState, useEffect } from 'react';

type Categoria = 'plastico' | 'papel' | 'vidro' | 'metal' | 'organico';

type ItemLixo = {
  id: number;
  nome: string;
  emoji: string;
  categoria: Categoria;
};

const ITENS: ItemLixo[] = [
  { id: 1, nome: 'Garrafa PET', emoji: '🥤', categoria: 'plastico' },
  { id: 2, nome: 'Sacola plástica', emoji: '🛍️', categoria: 'plastico' },
  { id: 3, nome: 'Revista velha', emoji: '📖', categoria: 'papel' },
  { id: 4, nome: 'Caixa de papelão', emoji: '📦', categoria: 'papel' },
  { id: 5, nome: 'Garrafa de vidro', emoji: '🍾', categoria: 'vidro' },
  { id: 6, nome: 'Pote de conserva', emoji: '🥫', categoria: 'vidro' },
  { id: 7, nome: 'Lata de alumínio', emoji: '🥤', categoria: 'metal' },
  { id: 8, nome: 'Lata de milho', emoji: '🥫', categoria: 'metal' },
  { id: 9, nome: 'Casca de banana', emoji: '🍌', categoria: 'organico' },
  { id: 10, nome: 'Restos de comida', emoji: '🍽️', categoria: 'organico' },
];

const BINS: { categoria: Categoria; label: string; icon: string }[] = [
  { categoria: 'plastico', label: 'PLÁSTICO', icon: '🥤' },
  { categoria: 'papel', label: 'PAPEL', icon: '📄' },
  { categoria: 'vidro', label: 'VIDRO', icon: '🍶' },
  { categoria: 'metal', label: 'METAL', icon: '🥫' },
  { categoria: 'organico', label: 'ORGÂNICO', icon: '🍌' },
];

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [erros, setErros] = useState(0);
  const [itemAtual, setItemAtual] = useState<ItemLixo | null>(null);
  const [mensagem, setMensagem] = useState<string>('');

  function sortearItem() {
    const idx = Math.floor(Math.random() * ITENS.length);
    setItemAtual(ITENS[idx]);
    setMensagem('');
  }

  function reiniciarJogo() {
    setScore(0);
    setErros(0);
    sortearItem();
  }

  function handleEscolha(categoriaEscolhida: Categoria) {
    if (!itemAtual) return;

    if (categoriaEscolhida === itemAtual.categoria) {
      setScore((antigo) => antigo + 1);
      setMensagem('✅ Muito bem! Você separou o lixo corretamente.');
    } else {
      setErros((antigo) => antigo + 1);
      setMensagem('❌ Ops! Esse lixo deveria ir para outra lixeira.');
    }

    // Sorteia próximo item depois de um tempinho
    setTimeout(() => {
      sortearItem();
    }, 900);
  }

  useEffect(() => {
    sortearItem();
  }, []);

  return (
    <div className="container game-screen">
      {/* HEADER IGUAL DO SITE */}
      <header className="header">
        <a href="/" className="logo">
          ♻️ ReciclaWeb
        </a>
      </header>

      <main className="section">
        <div className="game-container">
          <h1 className="section-title">🎮 Jogo da Reciclagem</h1>
          <p className="section-subtitle">
            Arraste mentalmente o objeto para a lixeira correta . Clique na categoria certa e veja se acertou!
          </p>

          {/* PLACAR */}
          <div className="score-board">
            <div className="score">
              <span>✅ Acertos: {score}</span>
              <span>❌ Erros: {erros}</span>
            </div>
          </div>

          {/* ÁREA DO JOGO */}
          <div className="game-area">
            <h2>Qual é o destino correto desse resíduo?</h2>

            <div className="current-item">
              {itemAtual && (
                <>
                  <div className="trash-item">
                    <span>{itemAtual.emoji}</span>
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                    {itemAtual.nome}
                  </p>
                </>
              )}
            </div>

            <div className="bins-container">
              {BINS.map((bin) => (
                <button
                  key={bin.categoria}
                  type="button"
                  className={`bin ${bin.categoria}`}
                  onClick={() => handleEscolha(bin.categoria)}
                >
                  <div className="bin-icon">{bin.icon}</div>
                  <div className="bin-label">{bin.label}</div>
                </button>
              ))}
            </div>

            {mensagem && (
              <p style={{ marginTop: '1rem', fontWeight: 600 }}>{mensagem}</p>
            )}

            <div className="game-controls">
              <button type="button" className="btn-secondary" onClick={reiniciarJogo}>
                🔁 Reiniciar jogo
              </button>
              <a href="/" className="btn-secondary">
                ⬅️ Voltar para a Home
              </a>
              <a href="/team" className="btn-secondary">
                👥 Ver equipe
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
