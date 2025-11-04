'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Garante que o código só execute no lado do cliente
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const toggleMobileMenu = () => {
    if (!isMounted) return;
    
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    if (typeof document !== 'undefined') {
      document.body.style.overflow = newState ? 'hidden' : 'auto';
    }
  };

  const closeMobileMenu = () => {
    if (!isMounted) return;
    
    setIsMobileMenuOpen(false);
    
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Fecha o menu quando a rota muda
  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

  return (
    <>
      <header className="header">
        <Link href="/" className="logo" onClick={closeMobileMenu}>
          ♻️ ReciclaWeb
        </Link>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-expanded={isMounted ? isMobileMenuOpen : false}
          aria-label={isMounted ? (isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu') : 'Menu'}
          aria-controls="mainNav"
        >
          {isMounted && (isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />)}
        </button>
        
        {/* Overlay para fechar o menu ao clicar fora */}
        {isMounted && isMobileMenuOpen && (
          <div 
            className="nav-overlay active"
            onClick={closeMobileMenu}
            role="button"
            aria-label="Fechar menu"
            tabIndex={0}
          />
        )}
        
        <nav 
          className={`nav ${isMobileMenuOpen ? 'active' : ''}`} 
          id="mainNav"
          aria-hidden={!isMobileMenuOpen}
          style={!isMounted ? { display: 'none' } : {}}
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
            as="/desenvolvedores"
            className="nav-link" 
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            👥 Desenvolvedores
          </Link>
        </nav>
      </header>
      
      <style jsx global>{`
        /* Garante que o body não role quando o menu estiver aberto */
        body.menu-open {
          overflow: hidden;
        }
        
        /* Ajustes específicos para o menu mobile */
        @media (max-width: 768px) {
          .nav {
            display: flex;
            transform: translateX(100%);
          }
          
          .nav.active {
            transform: translateX(0);
          }
          
          .mobile-menu-toggle {
            display: flex;
            z-index: 1001;
          }
        }
      `}</style>
    </>
  );
}