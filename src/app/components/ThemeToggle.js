'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('vl-theme', next); } catch (e) {}
    setTheme(next);
  };

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      title={isLight ? 'Tema escuro' : 'Tema claro'}
      style={{
        width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent',
        border: '1px solid var(--color-border-1)',
        borderRadius: 2,
        color: 'var(--color-fg-2)',
        cursor: 'pointer',
        transition: 'color .2s, border-color .2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--color-accent)';
        e.currentTarget.style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--color-fg-2)';
        e.currentTarget.style.borderColor = 'var(--color-border-1)';
      }}
    >
      {isLight
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
      }
    </button>
  );
}
