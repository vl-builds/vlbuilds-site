import './globals.css';
import { headers } from 'next/headers';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import ClientProviders from './components/ClientProviders';
import { translations } from '../i18n';

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

// og:locale segue a língua detetada por IP (cf-ipcountry via middleware).
const OG_LOCALE = { pt: 'pt_PT', 'pt-BR': 'pt_BR', en: 'en_US', nl: 'nl_NL' };

// Metadados por idioma — público-alvo (não localização). Ver spec 2026-06-22-geo-keywords-copy.
const META = {
  pt: {
    title: 'Criação de Sites, Ferramentas Digitais e IA para Portugal — VL Builds',
    description: 'Freelancer especializado em criação de sites, ferramentas digitais, soluções com IA, folhas de cálculo Excel e SEO para Portugal.',
    ogTitle: 'VL Builds — Sites, Ferramentas Digitais e IA para Portugal',
    ogDescription: 'Transforme as suas ideias em produtos digitais. Sites, ferramentas e soluções com IA, entregues com qualidade profissional.',
  },
  'pt-BR': {
    title: 'Criação de Sites, Ferramentas Digitais e IA para o Brasil — VL Builds',
    description: 'Freelancer especializado em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e SEO para o Brasil.',
    ogTitle: 'VL Builds — Sites, Ferramentas Digitais e IA para o Brasil',
    ogDescription: 'Transforme suas ideias em produtos digitais. Sites, ferramentas e soluções com IA, entregues com qualidade profissional.',
  },
  en: {
    title: 'Websites, Digital Tools & AI Solutions — VL Builds',
    description: 'Freelance developer building websites, digital tools, AI solutions, spreadsheets and SEO for clients across Europe.',
    ogTitle: 'VL Builds — Websites, Digital Tools & AI Solutions',
    ogDescription: 'Turn your ideas into digital products. Websites, tools and AI solutions, delivered with professional quality.',
  },
  nl: {
    title: 'Websites, Digitale Tools en AI voor Nederland — VL Builds',
    description: 'Freelancer voor websites, digitale tools, AI-oplossingen, spreadsheets en SEO voor Nederland.',
    ogTitle: 'VL Builds — Websites, Digitale Tools en AI voor Nederland',
    ogDescription: 'Verander je ideeën in digitale producten. Websites, tools en AI-oplossingen, geleverd met professionele kwaliteit.',
  },
};

// hreflang auto-referencial: site multi-idioma servido numa URL única por geo-IP.
// Sem variantes de URL por locale, declaramos as 4 línguas + x-default a apontar
// para a homepage, para o Google não tratar a página como monolíngue.
const HREFLANG = {
  'pt-PT': 'https://vlbuilds.com',
  'pt-BR': 'https://vlbuilds.com',
  'nl': 'https://vlbuilds.com',
  'en': 'https://vlbuilds.com',
  'x-default': 'https://vlbuilds.com',
};

export async function generateMetadata() {
  const hdrs   = await headers();
  const locale = hdrs.get('x-vl-locale') || 'en';
  const ogLocale = OG_LOCALE[locale] || 'pt_PT';
  const m = META[locale] || META.en;

  return {
    title: m.title,
    metadataBase: new URL('https://vlbuilds.com'),
    description: m.description,
    authors: [{ name: 'Vitor' }],
    alternates: {
      canonical: 'https://vlbuilds.com',
      languages: HREFLANG,
    },
    icons: {
      icon: '/logo-site.png',
      apple: '/logo-site.png',
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      type: 'website',
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== ogLocale),
      url: 'https://vlbuilds.com',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VL Builds' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.ogDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function RootLayout({ children }) {
  const hdrs   = await headers();
  const market = hdrs.get('x-vl-market') || 'PT';
  const locale = hdrs.get('x-vl-locale') || 'en';

  // lang do <html> acompanha a língua detectada (SEO + acessibilidade)
  const htmlLang = { pt: 'pt-PT', 'pt-BR': 'pt-BR', nl: 'nl', en: 'en' }[locale] || 'en';

  // JSON-LD localizado: Service e FAQ vêm das traduções (i18n) e WebPage do mapa META,
  // alinhados com o idioma efetivamente renderizado (evita schema PT em páginas NL/EN).
  const t = translations[locale] || translations.en;
  const m = META[locale] || META.en;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vlbuilds.com/#organization",
        "name": "VL Builds",
        "url": "https://vlbuilds.com",
        "logo": { "@type": "ImageObject", "url": "https://vlbuilds.com/logo-site.png" },
        "email": "contact@vlbuilds.com",
        "areaServed": ["PT", "NL", "BR"],
        "sameAs": [
          "https://www.instagram.com/vl.builds/",
          "https://github.com/vl-builds",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://vlbuilds.com/#website",
        "url": "https://vlbuilds.com",
        "name": "VL Builds",
        "inLanguage": ["pt-PT", "pt-BR", "nl", "en"],
        "publisher": { "@id": "https://vlbuilds.com/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": "https://vlbuilds.com/#webpage",
        "url": "https://vlbuilds.com",
        "name": m.ogTitle,
        "description": m.description,
        "inLanguage": htmlLang,
        "isPartOf": { "@id": "https://vlbuilds.com/#website" },
      },
      ...t.services.items.map((s) => ({
        "@type": "Service",
        "@id": `https://vlbuilds.com/#service-${s.n}`,
        "name": s.titulo,
        "description": s.desc,
        "provider": { "@id": "https://vlbuilds.com/#organization" },
        "areaServed": ["PT", "NL", "BR"],
        "inLanguage": htmlLang,
      })),
      {
        "@type": "FAQPage",
        "@id": "https://vlbuilds.com/#faq",
        "inLanguage": htmlLang,
        "mainEntity": t.faq.items.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <html
      lang={htmlLang}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body><ClientProviders initialMarket={market} initialLocale={locale}>{children}</ClientProviders></body>
    </html>
  );
}
