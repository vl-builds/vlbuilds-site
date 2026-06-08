'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LangSwitcher from './LangSwitcher';
import { useLocale } from '../contexts/LocaleContext';

export default function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV_LINKS = [
    { label: t.nav.services, href: '#servicos' },
    { label: t.nav.work,     href: '#trabalhos' },
    { label: t.nav.process,  href: '#processo' },
    { label: t.nav.faq,      href: '#faq' },
  ];

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
        background: scrolled
          ? 'color-mix(in srgb, var(--color-bg) 85%, transparent)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.2s',
      }}
    >
      {/* logo */}
      <a href="#" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--color-fg)',
        letterSpacing: '-0.02em',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <img
          src="/logo-site.png"
          alt="VL Builds"
          width="30"
          height="30"
          style={{ display: 'block', width: 30, height: 30, flexShrink: 0 }}
        />
        <span>VL<span style={{ color: 'var(--color-accent)' }}>.</span>Builds</span>
      </a>

      {/* nav desktop */}
      <nav className="vl-nav" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-fg-2)',
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '0 16px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--color-fg)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--color-fg-2)'; }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LangSwitcher />
        <ThemeToggle />
        <a
          href="#contato"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'var(--color-accent)',
            color: 'var(--color-on-accent)',
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
          {t.nav.cta}
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vl-nav { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
