'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

// Componente para o botão do menu mobile
const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button 
    className="mobile-menu-toggle" 
    onClick={onClick}
    type="button"
    aria-expanded={isOpen}
    aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    aria-controls="mainNav"
  >
    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  </button>
);

// Componente para o overlay do menu
const MenuOverlay = ({ onClick }: { onClick: () => void }) => (
  <div 
    className="nav-overlay active"
    onClick={onClick}
    role="button"
    aria-label="Fechar menu"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  />
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Garante que o código só execute no lado do cliente
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    if (typeof document !== 'undefined') {
      document.body.style.overflow = newState ? 'hidden' : 'auto';
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }, []);

  // Fecha o menu quando a rota muda
  useEffect(() => {
    if (!isMounted) return;
    
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted, closeMobileMenu]);
  
  // Renderização condicional baseada no estado de montagem
  if (!isMounted) {
    return (
      <header className="header">
        <Link href="/" className="logo">
          ♻️ ReciclaWeb
        </Link>
        <MobileMenuButton isOpen={false} onClick={() => {}} />
      </header>
    );
  }

  return (
    <>
      <header className="header">
        <Link href="/" className="logo" onClick={closeMobileMenu}>
          ♻️ ReciclaWeb
        </Link>
        
        <MobileMenuButton 
          isOpen={isMobileMenuOpen} 
          onClick={toggleMobileMenu} 
        />
        
        {/* Overlay para fechar o menu ao clicar fora */}
        {isMobileMenuOpen && (
          <MenuOverlay onClick={closeMobileMenu} />
        )}
        
        <nav 
          className={`nav ${isMobileMenuOpen ? 'active' : ''}`} 
          id="mainNav"
          aria-hidden={!isMobileMenuOpen}
          style={!isMounted ? { visibility: 'hidden' } : {}}
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