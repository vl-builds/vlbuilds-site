'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, defaultLocale, locales } from '../../i18n';

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vl-locale');
      if (saved && locales.includes(saved)) setLocale(saved);
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
