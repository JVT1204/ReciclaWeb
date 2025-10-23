'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <Link href="/" className="logo" onClick={closeMobileMenu}>
        ♻️ ReciclaWeb
      </Link>
      
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        ☰
      </button>
      
      <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`} id="mainNav">
        <Link href="/" className="nav-link" onClick={closeMobileMenu}>
          🏠 Home
        </Link>
        <Link href="/game" className="nav-link" onClick={closeMobileMenu}>
          🎮 Jogue Agora
        </Link>
        <Link href="/team" className="nav-link" onClick={closeMobileMenu}>
          👥 Desenvolvedores
        </Link>
      </nav>
    </header>
  );
}