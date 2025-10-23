'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import { lixoTypes } from './data/trashCategories';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lixoTypes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lixoTypes.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? lixoTypes.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container">
      <Header />
      
      <main id="mainContent">
        <section id="home" className="screen home-screen active section">
          <h1 className="section-title">🗂️ Conheça os Tipos de Lixo</h1>
          <p className="section-subtitle">
            Navegue pelas categorias e aprenda a separar corretamente cada resíduo para contribuir com um planeta mais sustentável
          </p>
          
          <div className="carousel-container">
            <button 
              className="carousel-nav prev" 
              type="button" 
              aria-label="Slide anterior" 
              onClick={previousSlide}
            >
              ‹
            </button>
            <button 
              className="carousel-nav next" 
              type="button" 
              aria-label="Próximo slide" 
              onClick={nextSlide}
            >
              ›
            </button>
            
            <div className="carousel-wrapper">
              {lixoTypes.map((lixo, index) => (
                <CategoryCard 
                  key={lixo.id}
                  trashType={lixo}
                  isActive={index === currentSlide}
                />
              ))}
            </div>
            
            <div className="indicators">
              {lixoTypes.map((_, index) => (
                <span 
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>

          <section className="cta-section">
            <h3 style={{ color: '#2E7D32', marginBottom: '1rem' }}>
              Pronto para testar seus conhecimentos?
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Agora que você aprendeu sobre os tipos de resíduos, que tal um desafio divertido?
            </p>
            <Link href="/game" className="btn">
              🎯 Jogar Agora!
            </Link>
          </section>
        </section>
      </main>
    </div>
  );
}
