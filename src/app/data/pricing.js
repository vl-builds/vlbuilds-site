// Dados de preço por mercado (NL / PT / BR).
// Aqui ficam SÓ números, símbolos e bandeiras — nada de texto traduzível.
// Os rótulos (nomes de pacote, features etc.) vivem em `i18n/index.js`.
// As chaves (essencial, seo, identidade…) casam com os `id` usados no i18n,
// e é por elas que o componente cruza preço × texto.

export const MARKETS = {
  NL: {
    flag: '🇳🇱',
    currency: { code: 'EUR', symbol: '€' },
    packages:  { essencial: 290, profissional: 690, completo: 1090 },
    recurring: { seo: 122, trafego: 175, ia: 50 },
    addons:    { identidade: 300, social: 125, peca: 20, dashboard: 175, apresentacao: 100, chatbot: 300, ferramenta: 600, hora: 23 },
  },
  PT: {
    flag: '🇵🇹',
    currency: { code: 'EUR', symbol: '€' },
    packages:  { essencial: 200, profissional: 520, completo: 790 },
    recurring: { seo: 105, trafego: 150, ia: 40 },
    addons:    { identidade: 225, social: 90, peca: 13, dashboard: 140, apresentacao: 75, chatbot: 225, ferramenta: 450, hora: 15 },
  },
  BR: {
    flag: '🇧🇷',
    currency: { code: 'BRL', symbol: 'R$' },
    packages:  { essencial: 560, profissional: 1390, completo: 2190 },
    recurring: { seo: 280, trafego: 400, ia: 125 },
    addons:    { identidade: 600, social: 200, peca: 30, dashboard: 350, apresentacao: 200, chatbot: 750, ferramenta: 1250, hora: 45 },
  },
};

// Formata um valor no padrão do mercado: símbolo + separador de milhar por ponto
// (€290, €1.090, R$1.390) — consistente com a tabela interna VL-Builds-Precos.md.
export function formatPrice(market, value) {
  const m = MARKETS[market] ?? MARKETS.NL;
  const n = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${m.currency.symbol}${n}`;
}
