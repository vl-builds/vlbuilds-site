'use client';

/* ─────────────────────────────────────────────
   VL Builds — Trabalhos em foco (Carrossel)
   Carrossel de projetos (1 por vez, abas embaixo)
   + slideshow de imagens DENTRO de cada card.
   Design: design_handoff_trabalhos_carrossel (hifi).
   ───────────────────────────────────────────── */

import { useState, useEffect, useRef } from 'react';
import { useLocale } from '../contexts/LocaleContext';

// Usa os tokens de tema do site (globals.css) — adapta a dark e light.
const PT = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
  bg: 'var(--color-bg)',
  bg1: 'var(--color-bg-1)',
  bg2: 'var(--color-bg-2)',
  fg: 'var(--color-fg)',
  muted: 'var(--color-fg-2)',
  faint: 'var(--color-fg-3)',
  border: 'var(--color-border)',
  border1: 'var(--color-border-1)',
};
const ACCENT = 'var(--color-accent)';

// Resolve as imagens de um projeto: array `imagens` (futuro) → imagem única
// `img` (atual) → vazio (mostra placeholder tipográfico).
function projImages(p) {
  if (Array.isArray(p.imagens) && p.imagens.length) return p.imagens;
  if (p.img) return [p.img];
  return [];
}

/* Placeholder brand-safe quando o projeto ainda não tem imagem. */
function SlotPlaceholder({ p, num, soon }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: PT.bg2, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', right: 24, bottom: -8,
        fontFamily: PT.display, fontWeight: 900, lineHeight: 0.7,
        fontSize: 240, letterSpacing: '-0.05em',
        WebkitTextStroke: '1px var(--color-num-ghost)',
        color: 'transparent', userSelect: 'none', pointerEvents: 'none',
      }}>{num}</div>
      <div style={{
        position: 'absolute', top: 26, left: 30,
        fontFamily: PT.display, fontSize: 11, fontWeight: 600,
        letterSpacing: '0.16em', textTransform: 'uppercase', color: PT.muted,
      }}>{soon}</div>
    </div>
  );
}

/* Banner do projeto ativo + slideshow de imagens interno. */
function Banner({ p, num, soon, viewProject }) {
  const imgs = projImages(p);
  const SHOTS = imgs.length;
  const multi = SHOTS > 1;
  const [shot, setShot] = useState(0);
  const nextShot = () => setShot((s) => (s + 1) % SHOTS);
  const prevShot = () => setShot((s) => (s - 1 + SHOTS) % SHOTS);

  return (
    <article
      className="proj-banner bnr-in"
      style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: PT.bg2 }}
    >
      {/* área de mídia — sempre 16:9 */}
      <div className="proj-media" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
      {/* track de imagens (escala no hover) */}
      <div className="proj-imginner" style={{ position: 'absolute', inset: 0 }}>
        {SHOTS === 0 ? (
          <SlotPlaceholder p={p} num={num} soon={soon} />
        ) : (
          imgs.map((src, i) => (
            <div key={i} className="gal-slide" style={{
              position: 'absolute', inset: 0,
              opacity: i === shot ? 1 : 0,
              pointerEvents: i === shot ? 'auto' : 'none',
              transition: 'opacity .5s ease', zIndex: i === shot ? 2 : 1,
            }}>
              <img
                src={src}
                alt={`${p.titulo} — ${i + 1}`}
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, display: 'block' }}
              />
            </div>
          ))
        )}
      </div>

      {/* gradiente de legibilidade */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
        background:
          'linear-gradient(to top, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.55) 30%, rgba(8,8,8,0.08) 58%, transparent 78%),' +
          'linear-gradient(to right, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.12) 40%, transparent 62%)',
      }} />

      {/* controles do slideshow interno (só com 2+ imagens) */}
      {multi && (
        <>
          <button className="gal-arrow gal-prev" onClick={prevShot} aria-label="Imagem anterior">‹</button>
          <button className="gal-arrow gal-next" onClick={nextShot} aria-label="Próxima imagem">›</button>
          <div className="gal-dots" style={{ position: 'absolute', top: 24, right: 28, zIndex: 5, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: PT.display, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.85)' }}>
              {shot + 1} <span style={{ color: 'rgba(255,255,255,0.4)' }}>/ {SHOTS}</span>
            </span>
            <span style={{ display: 'flex', gap: 6 }}>
              {imgs.map((_, i) => (
                <button key={i} onClick={() => setShot(i)} aria-label={`Imagem ${i + 1}`} style={{
                  width: i === shot ? 18 : 7, height: 7, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === shot ? ACCENT : 'rgba(255,255,255,0.35)', transition: 'all .3s',
                }} />
              ))}
            </span>
          </div>
        </>
      )}
      </div>{/* /proj-media */}

      {/* conteúdo (sobreposto no desktop, abaixo da imagem no mobile) */}
      <div className="banner-content" style={{ position: 'absolute', inset: 0, zIndex: 4, padding: 'clamp(28px,3.6vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'none' }}>
        <div className="banner-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 48 }}>
          <div className="banner-main" style={{ maxWidth: '58%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <span style={{ fontFamily: PT.display, fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>{p.cat}</span>
              {p.ano && (
                <>
                  <span style={{ width: 38, height: 1, background: 'var(--bc-divider)' }} />
                  <span style={{ fontFamily: PT.display, fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', color: 'var(--bc-year)' }}>{p.ano}</span>
                </>
              )}
            </div>
            <h3 className="proj-title" style={{ fontFamily: PT.display, fontWeight: 700, fontSize: 'clamp(32px,4.2vw,58px)', letterSpacing: '-0.04em', color: 'var(--bc-title)', lineHeight: 0.98, margin: 0 }}>{p.titulo}</h3>
          </div>

          <div className="banner-side" style={{ width: 360, flexShrink: 0, paddingBottom: 6 }}>
            {/* métrica oculta por ora — religa automaticamente quando o projeto tiver `metric` */}
            {p.metric && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: PT.display, fontWeight: 900, fontSize: 44, letterSpacing: '-0.04em', color: ACCENT, lineHeight: 0.85 }}>{p.metric}</span>
                {p.metricLabel && (
                  <span style={{ fontFamily: PT.body, fontSize: 12, color: PT.fg, textTransform: 'uppercase', letterSpacing: '0.07em', paddingBottom: 6, maxWidth: 120, lineHeight: 1.3 }}>{p.metricLabel}</span>
                )}
              </div>
            )}
            <p style={{ fontFamily: PT.body, fontSize: 15.5, color: 'var(--bc-desc)', lineHeight: 1.62, margin: '0 0 20px' }}>{p.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.tags.map((tag) => (
                  <span key={tag} style={{ fontFamily: PT.display, fontSize: 11, color: 'var(--bc-tag)', border: '1px solid var(--bc-tag-border)', borderRadius: 999, padding: '5px 12px' }}>{tag}</span>
                ))}
              </div>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ pointerEvents: 'auto', fontFamily: PT.display, fontSize: 13, fontWeight: 600, color: ACCENT, display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                  {viewProject} <span className="proj-arrow" style={{ transition: 'transform .25s' }}>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* Abas de projeto (navegação do carrossel). */
function ProjectTabs({ items, active, setActive }) {
  return (
    <div className="trab-tabs" style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 0, marginTop: 18, borderTop: `1px solid ${PT.border}` }}>
      {items.map((proj, i) => {
        const on = i === active;
        const num = String(i + 1).padStart(2, '0');
        return (
          <button key={i} onClick={() => setActive(i)} className="trab-tab" style={{
            position: 'relative', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
            padding: '18px 16px 16px', borderTop: `2px solid ${on ? ACCENT : 'transparent'}`, marginTop: -1,
            display: 'flex', flexDirection: 'column', gap: 5, transition: 'background .2s', minWidth: 0,
          }}>
            <span style={{ fontFamily: PT.display, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: on ? ACCENT : PT.faint }}>{num}</span>
            <span style={{ fontFamily: PT.display, fontSize: 13.5, fontWeight: on ? 700 : 500, letterSpacing: '-0.01em', color: on ? ACCENT : PT.muted, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.titulo}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function PortfolioSection() {
  const { t } = useLocale();
  const p_t = t.portfolio;
  const items = p_t.items;
  const total = items.length;

  const [active, setActive] = useState(0);
  const p = items[active];
  const go = (d) => setActive((a) => (a + d + total) % total);

  // teclado ← → troca de projeto
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('input,textarea')) return;
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  // swipe horizontal no banner → troca de projeto (toque)
  const touch = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => {
    const tcoord = e.touches[0];
    touch.current = { x: tcoord.clientX, y: tcoord.clientY };
  };
  const onTouchEnd = (e) => {
    const tcoord = e.changedTouches[0];
    const dx = tcoord.clientX - touch.current.x;
    const dy = tcoord.clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const num = String(active + 1).padStart(2, '0');

  return (
    <section id="trabalhos" style={{ background: PT.bg, borderTop: `1px solid ${PT.border}`, padding: '100px 40px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* header */}
        <div className="trab-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: PT.display, fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: 18 }}>
              <span style={{ whiteSpace: 'nowrap' }}>{p_t.eyebrow}</span>
              <span style={{ flex: 1, height: 1, background: PT.border, display: 'block' }} />
            </div>
            <h2 style={{ fontFamily: PT.display, fontWeight: 900, fontSize: 'clamp(40px,5vw,60px)', letterSpacing: '-0.04em', lineHeight: 0.95, color: PT.fg, margin: 0 }}>{p_t.heading}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 6 }}>
            <span style={{ fontFamily: PT.display, fontSize: 15, color: PT.muted, letterSpacing: '0.05em' }}>
              <span style={{ color: PT.fg, fontWeight: 700 }}>{num}</span> / {String(total).padStart(2, '0')}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['‹', -1], ['›', 1]].map(([s, d]) => (
                <button key={s} onClick={() => go(d)} className="trab-navbtn" aria-label={d < 0 ? 'Anterior' : 'Próximo'} style={{
                  width: 44, height: 44, borderRadius: 999, border: `1px solid ${PT.border1}`, background: 'transparent', color: PT.fg, fontSize: 20, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* carrossel: 1 projeto por vez */}
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <Banner key={active} p={p} num={num} soon={p_t.soon} viewProject={p_t.viewProject} />
        </div>

        {/* abas de navegação */}
        <ProjectTabs items={items} active={active} setActive={setActive} />
      </div>

      {/* estilos de interação + responsivo */}
      <style>{`
        /* texto sobre a imagem (desktop): sempre claro sobre o gradiente escuro */
        #trabalhos .banner-content {
          --bc-title: #fff;
          --bc-desc: rgba(255,255,255,0.82);
          --bc-year: rgba(255,255,255,0.65);
          --bc-divider: rgba(255,255,255,0.30);
          --bc-tag: #fff;
          --bc-tag-border: rgba(255,255,255,0.25);
        }
        @keyframes bnrin { from { transform: translateY(10px); } to { transform: none; } }
        #trabalhos .bnr-in { animation: bnrin .42s cubic-bezier(.2,.6,.2,1); }
        #trabalhos .proj-imginner { transition: transform .6s cubic-bezier(.2,.6,.2,1); }
        #trabalhos .proj-banner:hover .proj-imginner { transform: scale(1.035); }
        #trabalhos .proj-banner:hover .proj-title { color: ${ACCENT}; transition: color .25s; }
        #trabalhos .proj-link:hover .proj-arrow { transform: translateX(4px); }
        #trabalhos .trab-navbtn:hover { border-color: ${ACCENT}; color: ${ACCENT}; }
        #trabalhos .trab-tab:hover { background: var(--color-surface-hover); }

        #trabalhos .gal-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
          width: 46px; height: 46px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25);
          background: rgba(10,10,10,0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
          color: #fff; font-size: 22px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity .25s, background .2s, border-color .2s; }
        #trabalhos .gal-prev { left: 22px; } #trabalhos .gal-next { right: 22px; }
        #trabalhos .proj-banner:hover .gal-arrow { opacity: 1; }
        #trabalhos .gal-arrow:hover { background: ${ACCENT}; border-color: ${ACCENT}; }

        @media (hover: none) {
          #trabalhos .gal-arrow { opacity: 1; }
        }

        @media (max-width: 920px) {
          #trabalhos { padding: 64px 20px !important; }
          /* mídia continua 16:9; conteúdo flui abaixo da imagem (não espreme o texto) */
          #trabalhos .banner-content { position: static !important; padding: 22px 20px 26px !important; pointer-events: auto !important;
            /* abaixo da imagem fica sobre o card (--color-bg-2): cores seguem o tema */
            --bc-title: var(--color-fg);
            --bc-desc: var(--color-fg-2);
            --bc-year: var(--color-fg-2);
            --bc-divider: var(--color-border-1);
            --bc-tag: var(--color-fg);
            --bc-tag-border: var(--color-border-1);
          }
          #trabalhos .banner-row { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
          #trabalhos .banner-main { max-width: 100% !important; }
          #trabalhos .banner-side { width: 100% !important; }
          #trabalhos .trab-tabs { grid-template-columns: repeat(3, 1fr) !important; }
          #trabalhos .gal-arrow { opacity: 1; width: 40px; height: 40px; }
        }
        @media (max-width: 560px) {
          #trabalhos .trab-tabs { grid-template-columns: repeat(2, 1fr) !important; }
          #trabalhos .gal-dots { top: 16px !important; right: 18px !important; }
        }
        @media (max-width: 380px) {
          #trabalhos { padding: 56px 16px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          #trabalhos .bnr-in { animation: none !important; }
          #trabalhos .proj-imginner,
          #trabalhos .proj-banner:hover .proj-imginner,
          #trabalhos .gal-slide { transition: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
