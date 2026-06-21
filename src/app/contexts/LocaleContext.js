'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, locales } from '../../i18n';

const LocaleContext = createContext(null);

// initialLocale vem do servidor (cf-ipcountry via middleware).
// localStorage só sobrepõe se o utilizador mudou manualmente (chave 'vl-locale-manual').
export function LocaleProvider({ children, initialLocale = 'en' }) {
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    try {
      const manual = localStorage.getItem('vl-locale-manual');
      if (manual && locales.includes(manual)) setLocale(manual);
    } catch {}
  }, []);

  const changeLocale = (next) => {
    if (!locales.includes(next)) return;
    setLocale(next);
    try { localStorage.setItem('vl-locale-manual', next); } catch {}
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
