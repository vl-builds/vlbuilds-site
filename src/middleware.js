import { NextResponse } from 'next/server';

const MARKET_BY_COUNTRY = {
  NL: 'NL',
  PT: 'PT',
  BR: 'BR',
};
const DEFAULT_MARKET = 'PT';

// Países de língua portuguesa
const PT_COUNTRIES = new Set(['BR','PT','AO','MZ','CV','GW','ST','TL']);
const DEFAULT_LOCALE = 'en';

function countryToLocale(country) {
  if (country === 'NL') return 'nl';
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

  const lOverride = (request.nextUrl.searchParams.get('locale') || '').toLowerCase();
  if (['pt', 'en', 'nl'].includes(lOverride)) locale = lOverride;

  const headers = new Headers(request.headers);
  headers.set('x-vl-market', market);
  headers.set('x-vl-locale', locale);

  return NextResponse.next({ request: { headers } });
}

// Não executa em assets estáticos do Next nem em arquivos com extensão.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)'],
};
