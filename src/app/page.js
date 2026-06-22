'use client';

import Image from 'next/image';
import Header from './components/Header';
import CaptchaLoader from './components/CaptchaLoader';
import { Reveal, StaggerContainer, StaggerItem } from './components/Reveal';
import PortfolioSection from './components/Selecionados';
import PrecosSection from './components/Precos';
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
      <div className="vl-hero-bg" aria-hidden="true" />
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

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

      <div style={{ position: 'absolute', bottom: 0, left: 40, right: 40, height: 1, background: BORDER, zIndex: 1 }} />

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
                className="vl-svc-card"
                style={{ padding: '40px 36px', height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
              >
                <div aria-hidden="true" className="vl-svc-img vl-svc-img-dark"
                  style={{ position: 'absolute', inset: '-20px', filter: 'blur(1px)', opacity: 0.4, zIndex: 0 }}>
                  <Image src={`/services/${item.n}-dark.webp`} alt="" fill
                    sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                </div>
                <div aria-hidden="true" className="vl-svc-img vl-svc-img-light"
                  style={{ position: 'absolute', inset: '-20px', filter: 'blur(1px)', opacity: 0.4, zIndex: 0 }}>
                  <Image src={`/services/${item.n}-light.webp`} alt="" fill
                    sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: 11, color: ACCENT, letterSpacing: '0.1em', marginBottom: 20 }}>{item.n}</div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: FG, marginBottom: 10 }}>{item.titulo}</h3>
                  <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
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
          {t.stats.map((s, i) => (
            <StaggerItem key={i} variant="pop" style={{ display: 'flex' }}>
              <div style={{ flex: 1, background: BG, padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          {f.items.map((faq, i) => (
            <StaggerItem key={i} variant="fadeIn">
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
            <BtnGhost href="mailto:contact@vlbuilds.com">{c.email}</BtnGhost>
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
            <p style={{ fontFamily: BODY, fontSize: 14, color: 'var(--color-fg-3)', lineHeight: 1.65, marginBottom: 24 }}>{c.body}</p>
            <a href="mailto:contact@vlbuilds.com" style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 500, color: MUTED, borderBottom: `1px solid ${BORDER}`, paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = FG; e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = BORDER; }}>
              contact@vlbuilds.com
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="9bf71dda-e445-49f0-8f77-ecfcc635e98d" />
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
                <div className="h-captcha" data-captcha="true" />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
          <span style={{ width: 1, height: 14, background: BORDER, display: 'inline-block' }} />
          <a href="/politica-de-privacidade"
            style={{ fontFamily: BODY, fontSize: 12, color: 'var(--color-fg-3)', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.target.style.color = 'var(--color-fg-2)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--color-fg-3)'; }}>
            Privacidade
          </a>
          <a href="https://www.instagram.com/vl.builds/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            style={{ color: 'var(--color-fg-3)', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg-2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-3)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://github.com/vl-builds" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            style={{ color: 'var(--color-fg-3)', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg-2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-3)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}


export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <CaptchaLoader />
      <Header />
      <main style={{ background: BG }}>
        <Hero t={t} />
        <ServicosSection t={t} />
        <PrecosSection t={t} />
        <ProcessoSection t={t} />
        <PortfolioSection />
        <StatsSection t={t} />
        <GarantiaSection t={t} />
        <FaqSection t={t} />
        <CtaSection t={t} />
        <ContatoSection t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
