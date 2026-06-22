# Geografia + palavras-chave no copy (SEO Phase 3 — M4 + M5)

**Data:** 2026-06-22
**Âmbito:** Injetar geografia (país) e palavras-chave de serviço no texto visível e nos metadados, por idioma, para os 3 mercados (PT, BR, NL) por igual + EN internacional. Sem mexer em estrutura, troca de idioma, informação pessoal ou Schema.

## Contexto

- O site é uma só URL (`vlbuilds.com`) que troca de idioma automaticamente por IP (`cf-ipcountry` → header `x-vl-locale`): PT→Portugal, pt-BR→Brasil, NL→Holanda, EN→fallback internacional.
- Cada versão de idioma serve o seu mercado → meter o país certo em cada idioma cobre os 3 mercados sem diluição numa só página.
- **O conteúdo já é renderizado server-side** (SSR de client components no Next.js App Router), logo os crawlers já leem o texto. Esta intervenção é sobre **relevância de keywords/geo**, não sobre acessibilidade do conteúdo.

## Decisões tomadas (brainstorming)

1. Mercado-alvo: **os 3 por igual** (PT, BR, NL), EN internacional.
2. H1 do hero: **manter** "Ideias que viram produto." (marca). Keywords entram à volta.
3. Badge do hero: **manter** "Disponível para projetos" (sinal de conversão). Sem keywords no badge.
4. M1 (refactor Server Component): **descartado** — benefício de SEO marginal.

## Mudança 1 — Metadados por idioma (`src/app/layout.js`, `generateMetadata`)

**Problema atual:** `title`, `description`, `og:title`, `og:description`, `twitter` são únicos e em português, mostrados a todos os idiomas (um visitante NL/EN vê o site listado no Google em português).

**Solução:** definir um objeto `META` indexado por locale e escolher pelo `locale` já lido dos headers. Manter `metadataBase`, `alternates.canonical`, `icons`, e o `OG_LOCALE` existente.

Copy proposto (final, pronto a implementar):

### pt (Portugal)
- **title:** `Criação de Sites, Ferramentas Digitais e IA em Portugal — VL Builds`
- **description:** `Freelancer em Portugal especializado em criação de sites, ferramentas digitais, soluções com IA, folhas de cálculo Excel e SEO. Entrega rápida e sem enrolação.`
- **og:title:** `VL Builds — Sites, Ferramentas Digitais e IA em Portugal`
- **og:description:** `Transforme as suas ideias em produtos digitais. Sites, ferramentas e soluções com IA, entregues com qualidade profissional.`

### pt-BR (Brasil)
- **title:** `Criação de Sites, Ferramentas Digitais e IA no Brasil — VL Builds`
- **description:** `Freelancer especializado em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e SEO para o Brasil. Entrega rápida e sem enrolação.`
- **og:title:** `VL Builds — Sites, Ferramentas Digitais e IA no Brasil`
- **og:description:** `Transforme suas ideias em produtos digitais. Sites, ferramentas e soluções com IA, entregues com qualidade profissional.`

### en (internacional)
- **title:** `Websites, Digital Tools & AI Solutions — VL Builds`
- **description:** `Freelance developer building websites, digital tools, AI solutions, spreadsheets and SEO. Based in Portugal, delivered fast and with no nonsense.`
- **og:title:** `VL Builds — Websites, Digital Tools & AI Solutions`
- **og:description:** `Turn your ideas into digital products. Websites, tools and AI solutions, delivered with professional quality.`

### nl (Nederland)
- **title:** `Websites, Digitale Tools en AI in Nederland — VL Builds`
- **description:** `Freelancer voor websites, digitale tools, AI-oplossingen, spreadsheets en SEO in Nederland. Snel geleverd, zonder gedoe.`
- **og:title:** `VL Builds — Websites, Digitale Tools en AI in Nederland`
- **og:description:** `Verander je ideeën in digitale producten. Websites, tools en AI-oplossingen, geleverd met professionele kwaliteit.`

`twitter.title`/`twitter.description` seguem os valores de `og` do mesmo locale.

## Mudança 2 — Subtítulo do hero (`src/i18n/index.js`, `hero.body`)

Manter `hero.headline` e `hero.badge` intactos. Atualizar `hero.body` por idioma para incluir país + keywords naturalmente:

- **pt:** `Criação de sites, ferramentas digitais e soluções com IA em Portugal — entregues com qualidade profissional.`
- **pt-BR:** `Criação de sites, ferramentas digitais e soluções com IA no Brasil — entregues com qualidade profissional.`
- **en:** *(manter — já refere "built in Portugal")* `Websites, tools, AI, spreadsheets, SEO and paid traffic — built in Portugal, delivered fast and with no nonsense.`
- **nl:** `Websites, tools, AI, spreadsheets, SEO en betaald verkeer in Nederland — geleverd met professionele kwaliteit, snel en zonder gedoe.`

## Fora de âmbito

- Estrutura/secções, troca de idioma, refactor Server Component (M1).
- Secção About e Schema `Person` (informação pessoal — adiado por decisão do utilizador).
- Schema: mantém-se (`areaServed: ["PT","NL","BR"]` já serve os 3 mercados).
- Backlinks off-site (M7), Google Search Console, páginas dedicadas (Phase 3 P3).

## Verificação

1. `npm run build` verde.
2. Inspecionar HTML servido por locale (forçar via `?market=`/header) e confirmar `<title>`, `<meta name="description">`, `og:title`, `og:description` corretos por idioma.
3. Confirmar `<h1>` continua "Ideias que viram produto." e o subtítulo já tem país + keywords.
