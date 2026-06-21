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
  title: 'VL Builds — Criação de Sites, Ferramentas Digitais e IA',
  metadataBase: new URL('https://vlbuilds.com'),
  description:
    'Freelancer especializado em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e SEO. Entrega rápida e sem enrolação.',
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
  const hdrs   = await headers();
  const market = hdrs.get('x-vl-market') || 'PT';
  const locale = hdrs.get('x-vl-locale') || 'en';

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://vlbuilds.com/#organization",
                "name": "VL Builds",
                "url": "https://vlbuilds.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vlbuilds.com/logo-site.png"
                },
                "email": "contact@vlbuilds.com",
                "areaServed": ["PT", "NL", "BR"],
                "sameAs": [
                  "https://www.instagram.com/vl.builds/",
                  "https://github.com/vl-builds"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://vlbuilds.com/#website",
                "url": "https://vlbuilds.com",
                "name": "VL Builds",
                "publisher": { "@id": "https://vlbuilds.com/#organization" }
              },
              {
                "@type": "WebPage",
                "@id": "https://vlbuilds.com/#webpage",
                "url": "https://vlbuilds.com",
                "name": "VL Builds — Sites, Ferramentas e Soluções com IA",
                "description": "Agência especializada em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e apresentações profissionais.",
                "isPartOf": { "@id": "https://vlbuilds.com/#website" }
              },
              {
                "@type": "Service",
                "name": "Criação de Sites",
                "provider": { "@id": "https://vlbuilds.com/#organization" },
                "description": "Landing pages, portfólios e sites institucionais modernos, rápidos e prontos para converter.",
                "areaServed": ["PT", "NL", "BR"]
              },
              {
                "@type": "Service",
                "name": "Ferramentas Digitais",
                "provider": { "@id": "https://vlbuilds.com/#organization" },
                "description": "Apps web e automações que resolvem problemas reais e poupam horas do seu dia.",
                "areaServed": ["PT", "NL", "BR"]
              },
              {
                "@type": "Service",
                "name": "Soluções com IA",
                "provider": { "@id": "https://vlbuilds.com/#organization" },
                "description": "Chatbots, automações inteligentes e integrações com GPT/Claude que trabalham por você.",
                "areaServed": ["PT", "NL", "BR"]
              },
              {
                "@type": "Service",
                "name": "SEO & Presença Digital",
                "provider": { "@id": "https://vlbuilds.com/#organization" },
                "description": "Otimização para o Google: páginas empresariais que aparecem nas buscas certas.",
                "areaServed": ["PT", "NL", "BR"]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Qual o prazo de entrega?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sites simples saem em 5–7 dias úteis. Projetos maiores têm cronograma definido no briefing."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Como funciona o pagamento?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "50% na aprovação do briefing e 50% na entrega final."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "O código fica comigo?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sim, 100%. Você recebe todo o código-fonte. Sem lock-in."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Há suporte após a entrega?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sim, ofereço suporte pós-entrega e pacotes de manutenção mensal."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Trabalha com orçamento pequeno?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Me conta o que você precisa e encontramos o melhor formato."
                    }
                  }
                ]
              }
            ]
          })}}
        />
      </head>
      <body><ClientProviders initialMarket={market} initialLocale={locale}>{children}</ClientProviders></body>
    </html>
  );
}
