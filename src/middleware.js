import { NextResponse } from 'next/server';

const MARKET_BY_COUNTRY = {
  NL: 'NL',
  PT: 'PT',
  BR: 'BR',
};
const DEFAULT_MARKET = 'PT';

// Países de língua portuguesa (Brasil recebe pt-BR; restantes recebem pt-PT)
const PT_COUNTRIES = new Set(['PT','AO','MZ','CV','GW','ST','TL']);
const DEFAULT_LOCALE = 'en';

function countryToLocale(country) {
  if (country === 'NL') return 'nl';
  if (country === 'BR') return 'pt-BR';
  if (PT_COUNTRIES.has(country)) return 'pt';
  return DEFAULT_LOCALE;
}

export function middleware(request) {
  const country = (
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    ''
  ).toUpperCase();

  let market = MARKET_BY_COUNTRY[country] || DEFAULT_MARKET;
  let locale = countryToLocale(country);

  // Override via query string para testes: ?market=NL|PT|BR e ?locale=pt|en|nl
  const mOverride = (request.nextUrl.searchParams.get('market') || '').toUpperCase();
  if (MARKET_BY_COUNTRY[mOverride]) market = mOverride;

  const lParam = request.nextUrl.searchParams.get('locale') || '';
  // normaliza 'pt-br' → 'pt-BR'; restantes minúsculas
  const lOverride = lParam.toLowerCase() === 'pt-br' ? 'pt-BR' : lParam.toLowerCase();
  if (['pt', 'pt-BR', 'en', 'nl'].includes(lOverride)) locale = lOverride;

  const headers = new Headers(request.headers);
  headers.set('x-vl-market', market);
  headers.set('x-vl-locale', locale);

  return NextResponse.next({ request: { headers } });
}

// Não executa em assets estáticos do Next nem em arquivos com extensão.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)'],
};
