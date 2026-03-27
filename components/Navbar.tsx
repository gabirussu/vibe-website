'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Descoperă experiența', href: '#features' },
  { label: 'Vezi meniul', href: '#menu' },
  { label: 'Vizitează-ne', href: '#locatie' },
  { label: 'Lasă aici gândurile tale', href: '#feedback' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight - 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(28, 25, 23, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? 'all' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <a
          href="#"
          className="text-2xl font-bold transition-colors duration-300"
          style={{ fontFamily: 'var(--font-heading)', color: '#F5E6C8' }}
        >
          Vibe Caffè
        </a>

        {/* LINKURI DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-light transition-all duration-300 hover:opacity-100 opacity-75"
              style={{ fontFamily: 'var(--font-cinzel)', color: '#E5E4E2', fontSize: '12px' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5E6C8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#E5E4E2')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* HAMBURGER — MOBILE */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meniu"
        >
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: '#E5E4E2', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: '#E5E4E2', opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: '#E5E4E2', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>

      </div>

      {/* MENIU MOBIL */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col px-6 pb-6 gap-4"
          style={{ background: 'rgba(28, 25, 23, 0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-light py-2 border-b border-white/10 transition-colors duration-200"
              style={{ fontFamily: 'var(--font-cinzel)', color: '#E5E4E2', fontSize: '12px' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
