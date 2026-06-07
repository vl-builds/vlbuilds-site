'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Serviços',  href: '#servicos' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Processo',  href: '#processo' },
  { label: 'FAQ',       href: '#faq' },
];

const FONT = "'Space Grotesk', sans-serif";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'rgba(8,8,8,0)',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.2s',
      }}
    >
      {/* logo */}
      <a href="#" style={{
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 700,
        color: '#f0f0f0',
        letterSpacing: '-0.02em',
        display: 'flex', alignItems: 'center', gap: 2,
      }}>
        VL<span style={{ color: '#FF3D00' }}>.</span>Builds
      </a>

      {/* nav desktop */}
      <nav className="vl-nav" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: FONT,
              color: '#666666',
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '0 16px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = '#f0f0f0'; }}
            onMouseLeave={e => { e.target.style.color = '#666666'; }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA — retangular, accent */}
      <a
        href="#contato"
        style={{
          fontFamily: FONT,
          background: '#FF3D00',
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 600,
          padding: '8px 18px',
          borderRadius: '2px',
          letterSpacing: '0.01em',
          transition: 'opacity 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.target.style.opacity = '0.85'; }}
        onMouseLeave={e => { e.target.style.opacity = '1'; }}
      >
        Fale comigo
      </a>

      <style>{`
        @media (max-width: 768px) {
          .vl-nav { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
