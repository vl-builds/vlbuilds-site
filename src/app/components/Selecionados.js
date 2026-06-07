'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Reveal } from './Reveal';
import { useLocale } from '../contexts/LocaleContext';

const AUTOPLAY_MS = 4500;

function FeatVisual({ projeto, soon }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/9',
      background: '#0d0d0d',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      {projeto.img
        ? <img
            src={projeto.img}
            alt={projeto.titulo}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        : <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            opacity: 0.25,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="1"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {soon}
            </span>
          </div>
      }
      <div style={{
        position: 'absolute',
        top: 12, left: 12,
        background: 'var(--color-accent)',
        color: 'var(--color-on-accent)',
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '4px 8px',
        borderRadius: 2,
      }}>
        {projeto.cat}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const { t } = useLocale();
  const p_t = t.portfolio;
  const PROJETOS = p_t.items.map(item => ({ ...item, img: null }));

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progKey, setProgKey] = useState(0);
  const timerRef = useRef(null);
  const total = PROJETOS.length;

  const goTo = useCallback((idx) => {
    const next = (idx + total) % total;
    setActive(next);
    setProgKey(k => k + 1);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [active, paused, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const p = PROJETOS[active];

  return (
    <section
      id="trabalhos"
      style={{ padding: '112px 0', borderTop: '1px solid var(--color-border)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        <Reveal>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-fg-2)',
            marginBottom: 24,
          }}>
            {p_t.eyebrow}
            <span style={{ flex: 1, height: 1, background: 'var(--color-border)', display: 'block' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--color-fg)',
            }}>
              {p_t.heading}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={prev}
                aria-label="Anterior"
                style={{
                  width: 40, height: 40,
                  border: '1px solid var(--color-border-1)',
                  borderRadius: 2,
                  background: 'transparent',
                  color: 'var(--color-fg-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'color .2s, border-color .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-2)'; e.currentTarget.style.borderColor = 'var(--color-border-1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Próximo"
                style={{
                  width: 40, height: 40,
                  border: '1px solid var(--color-border-1)',
                  borderRadius: 2,
                  background: 'transparent',
                  color: 'var(--color-fg-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'color .2s, border-color .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-2)'; e.currentTarget.style.borderColor = 'var(--color-border-1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--color-fg-2)', letterSpacing: '0.08em', marginLeft: 8 }}>
                {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </Reveal>

        {/* main card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'start',
          animation: 'vlTrabSlide .35s cubic-bezier(0.44,0,0.56,1)',
        }} key={`${active}-${t.portfolio.heading}`}>

          <FeatVisual projeto={p} soon={p_t.soon} />

          <div style={{ paddingTop: 8 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 16,
            }}>
              {p.cat}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--color-fg)',
              marginBottom: 20,
            }}>
              {p.titulo}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--color-fg-2)',
              lineHeight: 1.7,
              maxWidth: '44ch',
              marginBottom: 28,
            }}>
              {p.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {p.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  padding: '5px 10px',
                  border: '1px solid var(--color-border-1)',
                  borderRadius: 2,
                  color: 'var(--color-fg-2)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {PROJETOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Projeto ${i + 1}`}
                  style={{
                    width: i === active ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === active ? 'var(--color-accent)' : 'var(--color-border-1)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'width .3s, background .3s',
                    padding: 0,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {i === active && (
                    <span
                      key={progKey}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        height: '100%',
                        background: 'rgba(255,255,255,0.5)',
                        animation: `vlTrabProg ${AUTOPLAY_MS}ms linear`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vlTrabSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vlTrabProg {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @media (max-width: 860px) {
          #trabalhos > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
