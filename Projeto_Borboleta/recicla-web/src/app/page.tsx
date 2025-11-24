'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [frase, setFrase] = useState('Clique no botão para carregar uma frase.');
  const [autor, setAutor] = useState('');

  function carregarFrase() {
    setFrase('Carregando frase...');
    setAutor('');

    fetch('/api/frases')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao buscar /api/frases');
        }
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data.frases) ? data.frases : [];

        if (lista.length === 0) {
          setFrase('Não foi possível carregar a frase.');
          setAutor('');
          return;
        }

        const randomIndex = Math.floor(Math.random() * lista.length);
        const f = lista[randomIndex];

        setFrase(f.frase || 'Não foi possível carregar a frase.');
        setAutor(f.autor ? `— ${f.autor}` : '— Autor desconhecido');
      })
      .catch((err) => {
        console.error('Erro ao carregar frase da API:', err);
        setFrase('Erro ao carregar a frase.');
        setAutor('');
      });
  }

  useEffect(() => {
    carregarFrase();
  }, []);

  return (
    <main className="main">
      <div className="container">

        {/* HEADER */}
        <header className="header">
          <h1 className="logo">♻️ ReciclaWeb</h1>
          <p className="subtitle">Projeto Borboleta</p>
        </header>

        {/* HOME CONTENT */}
        <section className="content">
          <h2 className="title">📁 Conheça os Tipos de Lixo</h2>
          <p className="description">
            Navegue pelas categorias e aprenda a separar corretamente cada resíduo
            para contribuir com um planeta mais sustentável.
          </p>

          {/* BLOCO DA FRASE */}
          <section className="api-quote">
            <h2>💬 Conselhos ambientais</h2>

            <p id="quote-text">{frase}</p>
            <p id="quote-author">{autor}</p>

            <button
              type="button"
              className="btn"
              onClick={carregarFrase}
            >
              🔄 Nova frase
            </button>
          </section>

          {/* TIPOS DE LIXO */}
          <div className="categories">
            <div className="category">
              <div className="categoryIcon">🥤</div>
              <h3>PLÁSTICO</h3>
              <p>Garrafas PET, embalagens, sacolas plásticas</p>
            </div>

            <div className="category">
              <div className="categoryIcon">📄</div>
              <h3>PAPEL</h3>
              <p>Jornais, revistas, caixas de papelão</p>
            </div>

            <div className="category">
              <div className="categoryIcon">🍶</div>
              <h3>VIDRO</h3>
              <p>Garrafas de vidro, potes de conserva</p>
            </div>

            <div className="category">
              <div className="categoryIcon">🥫</div>
              <h3>METAL</h3>
              <p>Latas de alumínio, objetos de ferro</p>
            </div>

            <div className="category">
              <div className="categoryIcon">🍌</div>
              <h3>ORGÂNICO</h3>
              <p>Restos de comida, cascas de frutas</p>
            </div>
          </div>

          {/* CTA BONITÃO */}
          <div className="cta-home">
            <h3 className="cta-title">Pronto para colocar em prática o que aprendeu?</h3>
            <p className="cta-subtitle">
              Clique no botão abaixo e teste seus conhecimentos no jogo da reciclagem.
            </p>

            {/* ROTA DINÂMICA: /game/ */}
            <Link href="/game/" className="btn btn-lg">
              🎯 Jogar Agora!
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>Desenvolvido por João Vitor Tortorello e Eduardo Augusto Clara Olivato</p>
          <p>Web Mobile - 2025.2</p>
        </footer>
      </div>
    </main>
  );
}
