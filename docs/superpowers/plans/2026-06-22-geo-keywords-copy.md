# Geografia + Palavras-chave no Copy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Injetar país + palavras-chave de serviço no copy visível (subtítulo do hero) e nos metadados (title/description/og), por idioma, para os mercados PT/BR/NL + EN internacional.

**Architecture:** Duas edições de copy, sem mudança estrutural. (1) `generateMetadata` em `layout.js` passa de valores únicos para um mapa `META` indexado pelo locale já lido do header `x-vl-locale`. (2) Os `hero.body` em `i18n/index.js` recebem o país pela fórmula "para Portugal / para o Brasil / voor Nederland / for clients across Europe".

**Tech Stack:** Next.js 15 (App Router), React 19. Locale resolvido server-side via `middleware.js` (`cf-ipcountry` → header `x-vl-locale`; override local `?locale=pt|pt-BR|en|nl`). Sem framework de testes → verificação por `npm run build` + inspeção do HTML servido.

## Global Constraints

- **Lógica de público, não de localização:** nunca alegar residência ("em Portugal"). O freelancer vive na Holanda e atende os mercados. Fórmula: `para Portugal` / `para o Brasil` / `voor Nederland` / EN `for clients across Europe`. Mantém o nome do país como keyword.
- **Não mexer** em: H1 do hero (`hero.headline`), badge (`hero.badge`), estrutura/secções, troca de idioma, Schema JSON-LD, informação pessoal.
- **Proibida a frase** "Entrega rápida e sem enrolação" e equivalentes (`delivered fast and with no nonsense`, `snel geleverd, zonder gedoe`).
- Locales: `pt`, `pt-BR`, `en`, `nl`. Fallback de metadados: `en`.
- Spec de referência: `docs/superpowers/specs/2026-06-22-geo-keywords-copy-design.md`.

---

### Task 1: Subtítulo do hero com país + keywords (i18n)

**Files:**
- Modify: `src/i18n/index.js` (campo `hero.body` em cada um dos 4 blocos de locale: `pt`, `pt-BR`, `en`, `nl`)

**Interfaces:**
- Consumes: nada de tarefas anteriores.
- Produces: `translations[locale].hero.body` (string) — consumido por `Hero` em `src/app/page.js` (`{t.hero.body}`); a forma não muda, só o texto.

- [ ] **Step 1: Atualizar `hero.body` — pt**

Em `src/i18n/index.js`, no bloco `pt:` → `hero:`, substituir:

```js
      body:     'Criação de sites, ferramentas digitais e soluções com IA — entregues com qualidade profissional.',
```

por:

```js
      body:     'Criação de sites, ferramentas digitais e soluções com IA para Portugal — entregues com qualidade profissional.',
```

- [ ] **Step 2: Atualizar `hero.body` — pt-BR**

No bloco `'pt-BR':` → `hero:`, substituir (texto idêntico ao pt original):

```js
      body:     'Criação de sites, ferramentas digitais e soluções com IA — entregues com qualidade profissional.',
```

por:

```js
      body:     'Criação de sites, ferramentas digitais e soluções com IA para o Brasil — entregues com qualidade profissional.',
```

> Nota: este texto é igual ao do bloco `pt` *antes* da edição do Step 1. Garantir que se edita o que está dentro do bloco `'pt-BR'` (por volta da linha 158). Após o Step 1, o bloco `pt` já não contém a string antiga, portanto a substituição é inequívoca.

- [ ] **Step 3: Atualizar `hero.body` — en**

No bloco `en:` → `hero:`, substituir:

```js
      body:     'Websites, tools, AI, spreadsheets, SEO and paid traffic — built in Portugal, delivered fast and with no nonsense.',
```

por:

```js
      body:     'Websites, tools, AI, spreadsheets, SEO and paid traffic for clients across Europe — delivered with professional quality.',
```

- [ ] **Step 4: Atualizar `hero.body` — nl**

No bloco `nl:` → `hero:`, substituir:

```js
      body:     'Websites, tools, AI, spreadsheets, SEO en betaald verkeer — geleverd met professionele kwaliteit, snel en zonder gedoe.',
```

por:

```js
      body:     'Websites, tools, AI, spreadsheets, SEO en betaald verkeer voor Nederland — geleverd met professionele kwaliteit.',
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: build conclui sem erros (sem erro de sintaxe no `i18n/index.js`).

- [ ] **Step 6: Verificar HTML por locale (dev)**

Run: `npm run dev` (noutro terminal) e abrir:
- `http://localhost:3000/?locale=pt` → o subtítulo do hero contém "para Portugal".
- `http://localhost:3000/?locale=pt-BR` → contém "para o Brasil".
- `http://localhost:3000/?locale=nl` → contém "voor Nederland".
- `http://localhost:3000/?locale=en` → contém "for clients across Europe".

Confirmar também que o H1 continua "Ideias que viram produto." (pt/BR) e que nenhuma versão contém "Entrega rápida e sem enrolação"/"no nonsense"/"zonder gedoe".

- [ ] **Step 7: Commit**

```bash
git add src/i18n/index.js
git commit -m "feat: subtitulo do hero com pais + keywords por idioma"
```

---

### Task 2: Metadados (title/description/og) por idioma

**Files:**
- Modify: `src/app/layout.js` (adicionar o mapa `META`; refatorar o `return` de `generateMetadata` para usar o locale)

**Interfaces:**
- Consumes: `headers().get('x-vl-locale')` (já lido como `locale` em `generateMetadata`); `OG_LOCALE` (já existe no ficheiro).
- Produces: objeto de metadados Next.js com `title`, `description`, `openGraph.{title,description}`, `twitter.{title,description}` específicos do locale. Sem alterar `metadataBase`, `alternates.canonical`, `icons`, `authors`, nem o JSON-LD do `RootLayout`.

- [ ] **Step 1: Adicionar o mapa `META`**

Em `src/app/layout.js`, imediatamente a seguir à linha:

```js
const OG_LOCALE = { pt: 'pt_PT', 'pt-BR': 'pt_BR', en: 'en_US', nl: 'nl_NL' };
```

inserir:

```js
// Metadados por idioma — público-alvo (não localização). Ver spec 2026-06-22-geo-keywords-copy.
const META = {
  pt: {
    title: 'Criação de Sites, Ferramentas Digitais e IA para Portugal — VL Builds',
    description: 'Freelancer especializado em criação de sites, ferramentas digitais, soluções com IA, folhas de cálculo Excel e SEO para Portugal.',
    ogTitle: 'VL Builds — Sites, Ferramentas Digitais e IA para Portugal',
    ogDescription: 'Transforme as suas ideias em produtos digitais. Sites, ferramentas e soluções com IA, entregues com qualidade profissional.',
  },
  'pt-BR': {
    title: 'Criação de Sites, Ferramentas Digitais e IA para o Brasil — VL Builds',
    description: 'Freelancer especializado em criação de sites, ferramentas digitais, soluções com IA, planilhas Excel e SEO para o Brasil.',
    ogTitle: 'VL Builds — Sites, Ferramentas Digitais e IA para o Brasil',
    ogDescription: 'Transforme suas ideias em produtos digitais. Sites, ferramentas e soluções com IA, entregues com qualidade profissional.',
  },
  en: {
    title: 'Websites, Digital Tools & AI Solutions — VL Builds',
    description: 'Freelance developer building websites, digital tools, AI solutions, spreadsheets and SEO for clients across Europe.',
    ogTitle: 'VL Builds — Websites, Digital Tools & AI Solutions',
    ogDescription: 'Turn your ideas into digital products. Websites, tools and AI solutions, delivered with professional quality.',
  },
  nl: {
    title: 'Websites, Digitale Tools en AI voor Nederland — VL Builds',
    description: 'Freelancer voor websites, digitale tools, AI-oplossingen, spreadsheets en SEO voor Nederland.',
    ogTitle: 'VL Builds — Websites, Digitale Tools en AI voor Nederland',
    ogDescription: 'Verander je ideeën in digitale producten. Websites, tools en AI-oplossingen, geleverd met professionele kwaliteit.',
  },
};
```

- [ ] **Step 2: Selecionar o bloco do locale dentro de `generateMetadata`**

Dentro de `generateMetadata`, a seguir à linha `const ogLocale = OG_LOCALE[locale] || 'pt_PT';`, inserir:

```js
  const m = META[locale] || META.en;
```

- [ ] **Step 3: Usar `m` no objeto de retorno**

Substituir o `return { ... }` atual de `generateMetadata` por:

```js
  return {
    title: m.title,
    metadataBase: new URL('https://vlbuilds.com'),
    description: m.description,
    authors: [{ name: 'Vitor' }],
    alternates: {
      canonical: 'https://vlbuilds.com',
    },
    icons: {
      icon: '/logo-site.png',
      apple: '/logo-site.png',
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      type: 'website',
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== ogLocale),
      url: 'https://vlbuilds.com',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'VL Builds' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.ogDescription,
      images: ['/og-image.jpg'],
    },
  };
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build conclui sem erros.

- [ ] **Step 5: Verificar metadados por locale (dev)**

Run: `npm run dev` e, no view-source (Ctrl+U) de cada URL, confirmar `<title>` e `<meta name="description">`:
- `http://localhost:3000/?locale=pt` → title termina em "para Portugal — VL Builds".
- `http://localhost:3000/?locale=pt-BR` → "para o Brasil — VL Builds".
- `http://localhost:3000/?locale=nl` → "voor Nederland — VL Builds".
- `http://localhost:3000/?locale=en` → "Websites, Digital Tools & AI Solutions — VL Builds".

Confirmar ainda: `<meta property="og:title">` e `og:description` acompanham o locale; `<link rel="canonical" href="https://vlbuilds.com">` mantém-se; nenhuma description contém a frase proibida.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.js
git commit -m "feat: metadados (title/description/og) por idioma com pais + keywords"
```

---

## Notas de execução

- Tarefas 1 e 2 são independentes; podem ser executadas em qualquer ordem.
- Branch já criado: `seo-phase3-geo-keywords` (contém o spec).
- Deploy não faz parte deste plano — fica para depois da QA do utilizador.
