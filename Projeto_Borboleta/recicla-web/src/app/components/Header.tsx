'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Adiciona/remove a classe no body para evitar rolagem quando o menu estiver aberto
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Fecha o menu quando a rota muda
  useEffect(() => {
    const handleRouteChange = () => {
      closeMobileMenu();
    };

    // Adiciona listener para fechar o menu ao redimensionar a tela (caso mude para desktop)
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="header">
        <Link href="/" className="logo" onClick={closeMobileMenu}>
          ♻️ ReciclaWeb
        </Link>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-controls="mainNav"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        {/* Overlay para fechar o menu ao clicar fora */}
        <div 
          className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={closeMobileMenu}
          role="button"
          aria-label="Fechar menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        />
        
        <nav 
          className={`nav ${isMobileMenuOpen ? 'active' : ''}`} 
          id="mainNav"
          aria-hidden={!isMobileMenuOpen}
        >
          <Link 
            href="/" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            🏠 Home
          </Link>
          <Link 
            href="/game" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            🎮 Jogue Agora
          </Link>
          <Link 
            href="/team" 
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            👥 Desenvolvedores
          </Link>
        </nav>
      </header>
    </>
  );
}