'use client';

import Header from './components/Header';
import { Reveal, StaggerContainer, StaggerItem } from './components/Reveal';
import PortfolioSection from './components/Selecionados';
import { useLocale } from './contexts/LocaleContext';

/* ─── design tokens inline ─── */
const DISPLAY = 'var(--font-display)';
const BODY    = 'var(--font-body)';
const ACCENT  = 'var(--color-accent)';
const FG      = 'var(--color-fg)';
const MUTED   = 'var(--color-fg-2)';
const BG      = 'var(--color-bg)';
const BG1     = 'var(--color-bg-1)';
const BORDER  = 'var(--color-border)';
const BORDER1 = 'var(--color-border-1)';

const W = { maxWidth: 1200, margin: '0 auto', padding: '0 40px' };

/* ─── botões ─── */
function BtnPrimary({ href, children, style = {} }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        fontFamily: DISPLAY,
        fontSize: 14,
        fontWeight: 700,
        padding: '12px 24px',
        background: FG,
        color: 'var(--color-on-fg)',
        borderRadius: 2,
        letterSpacing: '-0.01em',
        transition: 'background 0.2s, color 0.2s',
        ...style,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-on-accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-fg)'; e.currentTarget.style.color = 'var(--color-on-fg)'; }}
    >
      {children}
    </a>
  );
}

function BtnGhost({ href, children, target }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: DISPLAY,
        fontSize: 14,
        fontWeight: 500,
        padding: '12px 20px',
        background: 'transparent',
        color: MUTED,
        border: `1px solid ${BORDER1}`,
        borderRadius: 2,
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-2)'; e.currentTarget.style.borderColor = 'var(--color-border-1)'; }}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontFamily: DISPLAY,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: MUTED,
      marginBottom: 24,
    }}>
      {children}
      <span style={{ flex: 1, height: 1, background: BORDER, display: 'block' }} />
    </div>
  );
}

/* ─── seções ─── */

function Hero({ t }) {
  return (
    <section style={{ minHeight: '100vh', padding: '0 40px 80px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        <Reveal type="fadeIn" delay={0.05}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: DISPLAY,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: ACCENT,
            marginBottom: 32,
          }}>
            <span style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: ACCENT,
              animation: 'vlpulse 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            {t.hero.badge}
          </div>
        </Reveal>

        <Reveal type="riseIn" delay={0.08}>
          <h1 style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(3.5rem, 9vw, 11rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: FG,
            marginBottom: 48,
            maxWidth: '10ch',
          }}>
            {t.hero.headline[0]}{' '}
            <em style={{ fontStyle: 'normal', color: ACCENT }}>{t.hero.headline[1]}</em>
          </h1>
        </Reveal>

        <Reveal type="riseIn" delay={0.15}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <p style={{ fontFamily: BODY, fontSize: 16, color: MUTED, maxWidth: '42ch', lineHeight: 1.65 }}>
              {t.hero.body}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
              <BtnPrimary href="#contato">{t.hero.btnStart}</BtnPrimary>
              <BtnGhost href="#trabalhos">{t.hero.btnWork}</BtnGhost>
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 40, right: 40, height: 1, background: BORDER }} />

      <style>{`
        @keyframes vlpulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </section>
  );
}

function ServicosSection({ t }) {
  const s = t.services;
  return (
    <section id="servicos" style={{ padding: '112px 0', borderTop: `1px solid ${BORDER}` }}>
      <div style={W}>
        <Reveal>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: FG,
            marginBottom: 64,
          }}>
            {s.heading[0]}<br />{s.heading[1]}
          </h2>
        </Reveal>

        <StaggerContainer style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 1,
          background: BORDER,
          border: `1px solid ${BORDER}`,
          overflow: 'hidden',
        }}>
          {s.items.map(item => (
            <StaggerItem key={item.n} variant="fadeIn">
              <div
                style={{ padding: '40px 36px', background: BG, height: '100%', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg)'; }}
              >
                <div style={{ fontFamily: DISPLAY, fontSize: 11, color: ACCENT, letterSpacing: '0.1em', marginBottom: 20 }}>{item.n}</div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: FG, marginBottom: 10 }}>{item.titulo}</h3>
                <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ProcessoSection({ t }) {
  const p = t.process;
  return (
    <section id="processo" style={{ padding: '112px 0', borderTop: `1px solid ${BORDER}`, background: BG1 }}>
      <div style={W}>
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: FG,
            marginBottom: 64,
          }}>
            {p.heading[0]}<br />{p.heading[1]}
          </h2>
        </Reveal>

        <div>
          {p.items.map((step, i) => (
            <StaggerItem key={step.n} variant="fadeIn" delay={i * 0.07}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 2fr',
                  gap: '0 48px',
                  padding: '40px 0',
                  borderBottom: `1px solid ${BORDER}`,
                  alignItems: 'center',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.65'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(3rem, 5vw, 5rem)', letterSpacing: '-0.05em', color: 'var(--color-num-ghost)', lineHeight: 1 }}>{step.n}</div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 28, letterSpacing: '-0.03em', color: FG }}>{step.titulo}</h3>
                <p style={{ fontFamily: BODY, fontSize: 15, color: MUTED, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ t }) {
  return (
    <section style={{ padding: '80px 0', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={W}>
        <StaggerContainer style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: BORDER,
          border: `1px solid ${BORDER}`,
        }}>
          {t.stats.map(s => (
            <StaggerItem key={s.label} variant="pop">
              <div style={{ background: BG, padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 4.5rem)', letterSpacing: '-0.04em', color: FG, lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
                <div style={{ fontFamily: BODY, fontSize: 12, color: MUTED, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function GarantiaSection({ t }) {
  const g = t.guarantee;
  return (
    <section style={{ padding: '112px 0', borderTop: `1px solid ${BORDER}` }}>
      <div style={W}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <Eyebrow>{g.eyebrow}</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: FG, marginBottom: 24 }}>
                {g.heading[0]}<br />{g.heading[1]}{' '}
                <em style={{ fontStyle: 'normal', color: ACCENT }}>{g.heading[2]}</em>
              </h2>
              <p style={{ fontFamily: BODY, fontSize: 15, color: MUTED, lineHeight: 1.7 }}>{g.body}</p>
            </div>
            <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 40 }}>
              <p style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 500, color: FG, lineHeight: 1.5, marginBottom: 32, letterSpacing: '-0.01em' }}>{g.quote}</p>
              <BtnPrimary href="#contato">{g.btn}</BtnPrimary>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection({ t }) {
  const f = t.faq;
  return (
    <section id="faq" style={{ padding: '112px 0', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ ...W, maxWidth: 860 }}>
        <Reveal>
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: FG, marginBottom: 64 }}>
            {f.heading[0]}<br />{f.heading[1]}
          </h2>
        </Reveal>

        <StaggerContainer>
          {f.items.map(faq => (
            <StaggerItem key={faq.q} variant="fadeIn">
              <details style={{ borderTop: `1px solid ${BORDER}` }}>
                <summary
                  style={{ fontFamily: DISPLAY, padding: '24px 0', fontSize: 16, fontWeight: 600, color: FG, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: '-0.01em', userSelect: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                >
                  {faq.q}
                  <span style={{ width: 28, height: 28, border: `1px solid ${BORDER}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: MUTED, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.7, padding: '0 0 28px', maxWidth: '60ch' }}>{faq.a}</p>
              </details>
              <div style={{ borderTop: `1px solid ${BORDER}` }} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CtaSection({ t }) {
  const c = t.cta;
  return (
    <section style={{ padding: '128px 0', borderTop: `1px solid ${BORDER}`, background: BG1, textAlign: 'center' }}>
      <div style={W}>
        <Reveal>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 7rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: FG, maxWidth: '14ch', margin: '0 auto 24px' }}>
            {c.heading[0]}{' '}
            <em style={{ fontStyle: 'normal', color: ACCENT }}>{c.heading[1]}</em>
          </h2>
          <p style={{ fontFamily: BODY, fontSize: 16, color: MUTED, maxWidth: '44ch', margin: '0 auto 40px', lineHeight: 1.65 }}>{c.body}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BtnPrimary href="#contato">{c.btn}</BtnPrimary>
            <BtnGhost href="https://wa.me/5500000000000?text=Olá! Vi o site da VL Builds e quero conversar sobre um projeto." target="_blank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {c.wa}
            </BtnGhost>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContatoSection({ t }) {
  const c = t.contact;
  const LBL = { display: 'block', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 500, color: 'var(--color-fg-2)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' };
  const INP = { width: '100%', padding: '12px 14px', background: 'var(--color-field)', border: '1px solid var(--color-border-1)', borderRadius: 2, color: 'var(--color-fg)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s' };

  return (
    <section id="contato" style={{ padding: '112px 0', borderTop: `1px solid ${BORDER}` }}>
      <div style={W}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: FG, marginBottom: 24 }}>
              {c.heading[0]}<br />{c.heading[1]}
            </h2>
            <p style={{ fontFamily: BODY, fontSize: 15, color: MUTED, lineHeight: 1.7, marginBottom: 8 }}>{c.response}</p>
            <p style={{ fontFamily: BODY, fontSize: 14, color: 'var(--color-fg-3)', lineHeight: 1.65 }}>{c.body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <form action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="SEU-ACCESS-KEY-AQUI" />
              <input type="hidden" name="redirect" value="/obrigado" />
              <input type="hidden" name="subject" value="Novo lead — VL Builds" />

              <div style={{ display: 'grid', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={LBL}>{c.labelName}</label>
                    <input type="text" name="name" required placeholder={c.phName} style={INP}
                      onFocus={e => { e.target.style.borderColor = 'var(--color-accent)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--color-border-1)'; }} />
                  </div>
                  <div>
                    <label style={LBL}>{c.labelEmail}</label>
                    <input type="text" name="email" required placeholder={c.phEmail} style={INP}
                      onFocus={e => { e.target.style.borderColor = 'var(--color-accent)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--color-border-1)'; }} />
                  </div>
                </div>
                <div>
                  <label style={LBL}>{c.labelSvc}</label>
                  <select name="servico" style={{ ...INP, cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--color-border-1)'; }}>
                    <option value="">{c.selectSvc}</option>
                    {c.services.map(sv => <option key={sv}>{sv}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LBL}>{c.labelMsg}</label>
                  <textarea name="message" rows={5} required placeholder={c.phMsg} style={{ ...INP, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-accent)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--color-border-1)'; }} />
                </div>
                <button type="submit" style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 700, padding: '14px 28px', background: 'var(--color-fg)', color: 'var(--color-on-fg)', border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'background 0.2s, color 0.2s', alignSelf: 'flex-start', letterSpacing: '-0.01em' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-on-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-fg)'; e.currentTarget.style.color = 'var(--color-on-fg)'; }}>
                  {c.btn}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #contato > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ padding: '32px 0', borderTop: `1px solid ${BORDER}`, background: 'var(--color-footer-bg)' }}>
      <div style={{ ...W, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 700, color: MUTED, letterSpacing: '-0.01em' }}>
          VL<span style={{ color: ACCENT }}>.</span>Builds
        </div>
        <div style={{ fontFamily: BODY, fontSize: 12, color: 'var(--color-fg-3)' }}>
          © {new Date().getFullYear()} VL Builds. {t.footer.copy}
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: t.nav.services, href: '#servicos' },
            { label: t.nav.work,     href: '#trabalhos' },
            { label: t.nav.cta,      href: '#contato' },
          ].map(l => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: BODY, fontSize: 12, color: 'var(--color-fg-3)', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.target.style.color = 'var(--color-fg-2)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--color-fg-3)'; }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function WhatsApp() {
  return (
    <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, width: 48, height: 48, borderRadius: 2, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.35)', transition: 'opacity 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <Header />
      <main style={{ background: BG }}>
        <Hero t={t} />
        <ServicosSection t={t} />
        <ProcessoSection t={t} />
        <PortfolioSection />
        <StatsSection t={t} />
        <GarantiaSection t={t} />
        <FaqSection t={t} />
        <CtaSection t={t} />
        <ContatoSection t={t} />
      </main>
      <Footer t={t} />
      <WhatsApp />
    </>
  );
}
