import './globals.css';

export const metadata = {
  title: 'VL Builds — Sites, Ferramentas e Soluções com IA',
  description:
    'Agência especializada em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e apresentações profissionais.',
  authors: [{ name: 'Vitor' }],
  openGraph: {
    title: 'VL Builds — Sites, Ferramentas e Soluções com IA',
    description: 'Transforme suas ideias em produtos digitais.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
