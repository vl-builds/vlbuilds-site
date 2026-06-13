'use client';

import { createContext, useContext } from 'react';
import { MARKETS } from '../data/pricing';

const MarketContext = createContext(null);

const DEFAULT_MARKET = 'PT'; // acessos fora de NL/PT/BR usam a tabela de Portugal

// O mercado (moeda + tabela de preços) é determinado pela LOCALIZAÇÃO do
// visitante — detectada por IP no middleware e repassada pelo layout via
// `initialMarket`. É um eixo independente do idioma e NÃO é alterável pelo
// visitante: não há seletor nem persistência de escolha.
export function MarketProvider({ children, initialMarket }) {
  const market = MARKETS[initialMarket] ? initialMarket : DEFAULT_MARKET;

  return (
    <MarketContext.Provider value={{ market, data: MARKETS[market] }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error('useMarket must be used inside MarketProvider');
  return ctx;
}
