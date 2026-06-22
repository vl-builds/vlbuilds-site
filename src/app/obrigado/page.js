export const metadata = {
  title: 'Mensagem enviada! — VL Builds',
  description: 'Obrigado pelo contato. Retornarei em breve.',
  robots: { index: false, follow: false },
};

const DISPLAY = 'var(--font-display)';
const BODY    = 'var(--font-body)';
const ACCENT  = '#FF3D00';
const MUTED   = '#666666';

export default function Obrigado() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 clamp(24px, 5vw, 80px)',
    }}>
      {/* ícone */}
      <div style={{
        width: 64, height: 64,
        background: `rgba(255,61,0,0.1)`,
        border: `1px solid rgba(255,61,0,0.3)`,
        borderRadius: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 40,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 style={{
        fontFamily: DISPLAY,
        fontSize: 'clamp(2.5rem, 6vw, 6rem)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 0.95,
        color: '#ffffff',
        marginBottom: 24,
      }}>
        Mensagem<br />
        <em style={{ fontStyle: 'normal', color: ACCENT }}>enviada!</em>
      </h1>

      <p style={{
        fontFamily: BODY,
        fontSize: 16,
        color: MUTED,
        maxWidth: '44ch',
        lineHeight: 1.65,
        marginBottom: 48,
      }}>
        Recebi o seu contato e retornarei em até 24 horas.
        Obrigado por confiar na VL Builds.
      </p>

      <a
        href="/"
        style={{
          fontFamily: DISPLAY,
          fontSize: 14,
          fontWeight: 700,
          padding: '12px 28px',
          background: '#f0f0f0',
          color: '#000',
          borderRadius: 2,
          letterSpacing: '-0.01em',
        }}
      >
        ← Voltar para o início
      </a>
    </main>
  );
}
