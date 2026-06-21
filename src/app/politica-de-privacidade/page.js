export const metadata = {
  title: 'Política de Privacidade — VL Builds',
  description: 'Como a VL Builds recolhe, usa e protege os seus dados pessoais.',
  alternates: { canonical: 'https://vlbuilds.com/politica-de-privacidade' },
  robots: { index: false },
};

export default function PoliticaPrivacidade() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px', fontFamily: 'var(--font-body)', color: 'var(--color-fg)', lineHeight: 1.7 }}>
      <a href="/" style={{ display: 'inline-block', marginBottom: 40, fontSize: 14, color: 'var(--color-fg-2)', textDecoration: 'none' }}>
        ← Voltar ao site
      </a>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
        Política de Privacidade
      </h1>
      <p style={{ color: 'var(--color-fg-2)', fontSize: 14, marginBottom: 48 }}>
        Última atualização: junho de 2026
      </p>

      <Section title="1. Responsável pelo Tratamento">
        <p>VL Builds — contact@vlbuilds.com — Portugal.</p>
      </Section>

      <Section title="2. Dados Recolhidos">
        <p>Através do formulário de contacto, recolhemos: nome, endereço de e-mail, tipo de serviço pretendido e mensagem. Não recolhemos dados de pagamento diretamente.</p>
      </Section>

      <Section title="3. Finalidade e Base Legal">
        <p>Os dados são utilizados exclusivamente para responder a pedidos de contacto e elaborar propostas comerciais. Base legal: consentimento (Art. 6.º, n.º 1, al. a) do RGPD).</p>
      </Section>

      <Section title="4. Conservação dos Dados">
        <p>Os dados são conservados pelo período necessário para dar resposta ao pedido, não ultrapassando 12 meses sem novo contacto.</p>
      </Section>

      <Section title="5. Partilha com Terceiros">
        <p>Os dados podem ser processados pelos seguintes subcontratantes:</p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li><strong>Web3Forms</strong> — processamento do formulário de contacto</li>
          <li><strong>hCaptcha</strong> — proteção anti-spam (dados de interação, sem identificação pessoal)</li>
          <li><strong>Cloudflare</strong> — alojamento e proteção do site (dados de rede anonimizados)</li>
        </ul>
        <p style={{ marginTop: 8 }}>Nenhum dado é vendido ou partilhado com terceiros para fins comerciais.</p>
      </Section>

      <Section title="6. Os Seus Direitos">
        <p>Nos termos do RGPD, tem direito a: acesso, retificação, apagamento, limitação do tratamento, portabilidade e oposição. Para exercer estes direitos, contacte: <a href="mailto:contact@vlbuilds.com" style={{ color: 'var(--color-accent)' }}>contact@vlbuilds.com</a>.</p>
        <p style={{ marginTop: 8 }}>Tem ainda o direito de apresentar reclamação à autoridade de supervisão: <strong>CNPD</strong> (Portugal) — <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>cnpd.pt</a>.</p>
      </Section>

      <Section title="7. Cookies">
        <p>Este site não utiliza cookies de rastreamento. São utilizados apenas cookies de sessão estritamente necessários para o funcionamento do site (preferência de tema e idioma, armazenados em localStorage).</p>
      </Section>

      <Section title="8. Segurança">
        <p>O site é servido exclusivamente por HTTPS. Aplicamos headers de segurança: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy.</p>
      </Section>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--color-fg)' }}>
        {title}
      </h2>
      <div style={{ color: 'var(--color-fg-2)', fontSize: 15 }}>{children}</div>
    </section>
  );
}
