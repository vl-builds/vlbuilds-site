import './globals.css';
import { headers } from 'next/headers';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import ClientProviders from './components/ClientProviders';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'VL Builds — Sites, Ferramentas e Soluções com IA',
  description:
    'Agência especializada em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e apresentações profissionais.',
  authors: [{ name: 'Vitor' }],
  alternates: {
    canonical: 'https://vlbuilds.com',
  },
  icons: {
    icon: '/logo-site.png',
    apple: '/logo-site.png',
  },
  openGraph: {
    title: 'VL Builds — Sites, Ferramentas e Soluções com IA',
    description: 'Transforme suas ideias em produtos digitais.',
    type: 'website',
    locale: 'pt_PT',
    url: 'https://vlbuilds.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VL Builds' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VL Builds — Sites, Ferramentas e Soluções com IA',
    description: 'Transforme suas ideias em produtos digitais.',
    images: ['/og-image.jpg'],
  },
};

export default async function RootLayout({ children }) {
  const market = (await headers()).get('x-vl-market') || 'PT';

  return (
    <html
      lang="pt-PT"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* aplica tema salvo antes da pintura — evita flash */}
        <script dangerouslySetInnerHTML={{__html:
          "(function(){try{var t=localStorage.getItem('vl-theme');if(!t){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();"
        }} />
      </head>
      <body><ClientProviders initialMarket={market}>{children}</ClientProviders></body>
    </html>
  );
}
