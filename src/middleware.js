import { NextResponse } from 'next/server';

// País do visitante (ISO 3166-1 alpha-2) → mercado / tabela de preços.
// Qualquer país fora desta lista cai no padrão: Portugal (EUR).
const MARKET_BY_COUNTRY = {
  NL: 'NL', // Holanda  → EUR (tabela NL)
  PT: 'PT', // Portugal → EUR (tabela PT)
  BR: 'BR', // Brasil   → BRL
};

const DEFAULT_MARKET = 'PT';

export function middleware(request) {
  // No Cloudflare, o país do visitante (geolocalização por IP) chega no header
  // `cf-ipcountry`. Mantém fallback para `x-vercel-ip-country` por segurança.
  const country = (
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    ''
  ).toUpperCase();
  let market = MARKET_BY_COUNTRY[country] || DEFAULT_MARKET;

  // Atalho APENAS em desenvolvimento: ?market=NL|PT|BR para testar as 3 tabelas
  // localmente (onde não há geolocalização). Ignorado em produção.
  if (process.env.NODE_ENV !== 'production') {
    const override = (request.nextUrl.searchParams.get('market') || '').toUpperCase();
    if (MARKET_BY_COUNTRY[override]) market = override;
  }

  // Repassa o mercado detectado ao layout (server component) via header da requisição.
  const headers = new Headers(request.headers);
  headers.set('x-vl-market', market);

  return NextResponse.next({ request: { headers } });
}

// Não executa em assets estáticos do Next nem em arquivos com extensão.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)'],
};
