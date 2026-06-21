'use client';

import { LocaleProvider } from '../contexts/LocaleContext';
import { MarketProvider } from '../contexts/MarketContext';

export default function ClientProviders({ children, initialMarket, initialLocale }) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <MarketProvider initialMarket={initialMarket}>{children}</MarketProvider>
    </LocaleProvider>
  );
}
