'use client';

import { LocaleProvider } from '../contexts/LocaleContext';
import { MarketProvider } from '../contexts/MarketContext';

export default function ClientProviders({ children, initialMarket }) {
  return (
    <LocaleProvider>
      <MarketProvider initialMarket={initialMarket}>{children}</MarketProvider>
    </LocaleProvider>
  );
}
