'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLocale, locales } from '../../i18n';

const LocaleContext = createContext(null);

// Países de língua portuguesa (ISO 3166-1 alpha-2)
const PT_COUNTRIES = new Set(['BR','PT','AO','MZ','CV','GW','ST','TL']);

// Deriva o idioma preferido a partir das línguas do navegador
function detectLocale() {
  try {
    const langs = Array.from(navigator.languages || [navigator.language]);
    for (const raw of langs) {
      const lang = raw.toLowerCase();
      if (lang.startsWith('nl')) return 'nl';
      if (lang.startsWith('pt')) return 'pt';
    }
    // Fallback: tenta extrair região do idioma principal (ex: "en-NL" → nl)
    const primary = (langs[0] || '').toLowerCase();
    const region = primary.split('-')[1];
    if (region === 'nl') return 'nl';
    if (region && PT_COUNTRIES.has(region.toUpperCase())) return 'pt';
  } catch {}
  return 'en';
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vl-locale');
      if (saved && locales.includes(saved)) {
        setLocale(saved);
      } else {
        setLocale(detectLocale());
      }
    } catch {}
  }, []);

  const changeLocale = (next) => {
    if (!locales.includes(next)) return;
    setLocale(next);
    try { localStorage.setItem('vl-locale', next); } catch {}
  };

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}
