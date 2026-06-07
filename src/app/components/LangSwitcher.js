'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import { locales, localeNames, localeFull } from '../../i18n';

export default function LangSwitcher() {
  const { locale, changeLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Idioma / Language"
        style={{
          height: 36,
          padding: '0 10px',
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'transparent',
          border: '1px solid var(--color-border-1)',
          borderRadius: 2,
          color: 'var(--color-fg-2)',
          fontFamily: 'var(--font-display)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          cursor: 'pointer',
          transition: 'color .2s, border-color .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-2)'; e.currentTarget.style.borderColor = 'var(--color-border-1)'; }}
      >
        {localeNames[locale]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: 'var(--color-bg-1)',
          border: '1px solid var(--color-border-1)',
          borderRadius: 2,
          overflow: 'hidden',
          minWidth: 120,
          zIndex: 200,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          {locales.map(l => (
            <button
              key={l}
              onClick={() => { changeLocale(l); setOpen(false); }}
              style={{
                width: '100%',
                padding: '10px 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                background: l === locale ? 'var(--color-accent-wash)' : 'transparent',
                border: 'none',
                color: l === locale ? 'var(--color-accent)' : 'var(--color-fg-2)',
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                fontWeight: l === locale ? 700 : 400,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background .15s, color .15s',
              }}
              onMouseEnter={e => { if (l !== locale) { e.currentTarget.style.background = 'var(--color-surface-hover)'; e.currentTarget.style.color = 'var(--color-fg)'; } }}
              onMouseLeave={e => { if (l !== locale) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-fg-2)'; } }}
            >
              <span>{localeFull[l]}</span>
              <span style={{ opacity: 0.5, fontSize: 10 }}>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
