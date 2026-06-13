'use client';

import { Reveal, StaggerContainer, StaggerItem } from './Reveal';
import { useMarket } from '../contexts/MarketContext';
import { formatPrice } from '../data/pricing';

/* ─── design tokens inline (espelha page.js) ─── */
const DISPLAY = 'var(--font-display)';
const BODY    = 'var(--font-body)';
const ACCENT  = 'var(--color-accent)';
const FG       = 'var(--color-fg)';
const MUTED    = 'var(--color-fg-2)';
const BG       = 'var(--color-bg)';
const BG1      = 'var(--color-bg-1)';
const BORDER   = 'var(--color-border)';
const BORDER1  = 'var(--color-border-1)';

const W = { maxWidth: 1200, margin: '0 auto', padding: '0 40px' };

const HIGHLIGHT_ID = 'profissional';

function Eyebrow({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      fontFamily: DISPLAY, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: MUTED, marginBottom: 24,
    }}>
      {children}
      <span style={{ flex: 1, height: 1, background: BORDER, display: 'block' }} />
    </div>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Indicador de moeda — estático e não-clicável.
   A moeda é definida pela localização do visitante (IP), não escolhida por ele. */
function CurrencyNote({ label, currency }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 14px',
      border: `1px solid ${BORDER1}`, borderRadius: 2,
      fontFamily: DISPLAY,
    }}>
      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED }}>
        {label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, color: FG }}>
        {currency.symbol} {currency.code}
      </span>
    </div>
  );
}

/* Botão pill — sólido. `accent` deixa em laranja; senão usa a cor de texto. */
function PillButton({ href, children, accent = false }) {
  const baseBg = accent ? ACCENT : FG;
  const baseColor = accent ? 'var(--color-on-accent)' : 'var(--color-on-fg)';
  return (
    <a
      href={href}
      style={{
        display: 'block', textAlign: 'center',
        fontFamily: DISPLAY, fontSize: 14, fontWeight: 700,
        padding: '13px 24px',
        background: baseBg, color: baseColor,
        borderRadius: 2, letterSpacing: '-0.01em',
        transition: 'background 0.2s, color 0.2s, opacity 0.2s',
      }}
      onMouseEnter={e => {
        if (accent) { e.currentTarget.style.opacity = '0.88'; }
        else { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = 'var(--color-on-accent)'; }
      }}
      onMouseLeave={e => {
        if (accent) { e.currentTarget.style.opacity = '1'; }
        else { e.currentTarget.style.background = FG; e.currentTarget.style.color = 'var(--color-on-fg)'; }
      }}
    >
      {children}
    </a>
  );
}

export default function PrecosSection({ t }) {
  const p = t.pricing;
  const { market, data } = useMarket();

  return (
    <section id="precos" style={{ padding: '112px 0', borderTop: `1px solid ${BORDER}` }}>
      <div style={W}>

        {/* Cabeçalho + seletor de país */}
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 56 }}>
            <h2 style={{
              fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
              fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: FG,
            }}>
              {p.heading[0]}<br />{p.heading[1]}
            </h2>
            <CurrencyNote label={p.marketLabel} currency={data.currency} />
          </div>
        </Reveal>

        {/* 3 pacotes */}
        <StaggerContainer style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 64,
          alignItems: 'stretch',
        }}>
          {p.packages.map(pkg => {
            const highlight = pkg.id === HIGHLIGHT_ID;
            const price = data.packages[pkg.id];
            return (
              <StaggerItem key={pkg.id} variant={highlight ? 'pop' : 'fadeIn'}>
                <div style={{
                  position: 'relative', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  padding: '40px 32px',
                  background: highlight ? BG1 : BG,
                  border: `1px solid ${highlight ? ACCENT : BORDER1}`,
                  borderRadius: 2,
                }}>
                  {highlight && (
                    <span style={{
                      position: 'absolute', top: 0, right: 24, transform: 'translateY(-50%)',
                      background: ACCENT, color: 'var(--color-on-accent)',
                      fontFamily: DISPLAY, fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 2,
                    }}>
                      {p.popular}
                    </span>
                  )}

                  <h3 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: FG, marginBottom: 18 }}>
                    {pkg.nome}
                  </h3>

                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 4 }}>{p.fromLabel}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.03em', color: FG, lineHeight: 1 }}>
                      {formatPrice(market, price)}
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginBottom: 32, flex: 1 }}>
                    {pkg.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                        <Check />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <PillButton href="#contato" accent={highlight}>{p.ctaPackage}</PillButton>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Recorrentes */}
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: FG, marginBottom: 4 }}>
              {p.recurringTitle}
            </h3>
            <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 24 }}>{p.recurringNote}</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 1, background: BORDER, border: `1px solid ${BORDER}`,
            }}>
              {p.recurring.map(r => (
                <div key={r.id} style={{ background: BG, padding: '24px 28px' }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: FG, marginBottom: 10 }}>{r.nome}</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: FG }}>
                    {formatPrice(market, data.recurring[r.id])}
                    <span style={{ fontSize: 13, fontWeight: 500, color: MUTED }}>{p.perMonth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Add-ons à la carte */}
        <Reveal>
          <div>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: FG, marginBottom: 24 }}>
              {p.addonsTitle}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 1, background: BORDER, border: `1px solid ${BORDER}`,
            }}>
              {p.addons.map(a => (
                <div key={a.id} style={{ background: BG, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontFamily: BODY, fontSize: 14, color: MUTED }}>{a.nome}</span>
                  <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: FG, whiteSpace: 'nowrap' }}>
                    {formatPrice(market, data.addons[a.id])}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA "sob orçamento" para o que foge dos formatos */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 16, flexWrap: 'wrap',
              marginTop: 16, padding: '20px 24px',
              border: `1px dashed ${BORDER1}`, borderRadius: 2,
            }}>
              <span style={{ fontFamily: BODY, fontSize: 14, color: MUTED }}>{p.customCta}</span>
              <a href="#contato" style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 700, color: ACCENT, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                {p.quote} →
              </a>
            </div>

            <p style={{ fontFamily: BODY, fontSize: 12, color: 'var(--color-fg-3)', marginTop: 32, maxWidth: '74ch', lineHeight: 1.6 }}>
              {p.footnote}
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
