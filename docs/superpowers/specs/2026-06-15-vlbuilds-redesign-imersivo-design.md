# Redesign imersivo VL Builds — Design Spec

> Data: 2026-06-15 · Direção: "premium cinematográfico" · Abordagem: **A (Fundação primeiro, rollout secção a secção)**
> Referência de design extraída: `giga.ai` (via `designlang`, em `design-extract-output/`)

## Contexto

O site VL Builds (Next.js 15 + React 19 + Tailwind v4 + framer-motion) já evoluiu para uma base
preta + accent laranja `#FF3D00` + Space Grotesk/DM Sans + cantos 2px. O objetivo deste trabalho
é elevar o *polish* para um feel "premium cinematográfico", adaptando — não copiando — a linguagem
de design do `giga.ai`. O ADN do Giga (base preta + accent quente único) já está presente; o que
falta é o tratamento: tipografia leve e grande, forma suavizada, e movimento imersivo.

**Princípio orientador:** adaptar, não clonar. Manter a identidade própria da VL Builds.

## Decisões aprovadas

| Dimensão | Decisão |
|---|---|
| Tipografia | Manter **Space Grotesk**, aplicar "receita premium": peso 300, tracking -0.03em, escala fluida grande |
| Forma / radius | **Suavizar** para o Giga: cards 12px, CTAs pill (9999px), imagens/chips 6px, inputs 8px |
| Movimento | **Total imersivo**: scroll-pinned, transições encenadas, revelações passo-a-passo |
| Âmbito | **Site inteiro** (todas as secções) |
| Temas | **Escuro + claro ("Paper")**, ambos em paralelo, sincronizados ao nível dos tokens |
| Execução | Faseada, com porta de validação no Hero ("padrão-ouro") antes do rollout |

## Arquitetura existente (ponto de partida)

- `src/app/globals.css` — tokens: escuro (`:root`, default) + claro (`[data-theme="light"]`); bloco de
  tokens fixos (fontes, radius, ease, durations); `prefers-reduced-motion` já tratado globalmente.
- `src/lib/motion.framer.js` — `easings`, `durations`, `springs`, `transitions`, `variants`, `inView`.
- `src/app/components/Reveal.js` — `<Reveal>`, `<StaggerContainer>`, `<StaggerItem>` (framer-motion `whileInView`).
- `src/app/page.js` — secções na ordem: **Hero → Serviços → Preços → Processo → Portfólio (Selecionados) →
  Stats → Garantia → FAQ → CTA → Contato → Footer**.
- `src/app/components/Selecionados.js` — carrossel de portfólio (mecânica própria, não alterar).
- `src/app/components/Precos.js` — secção de preços por país (não alterar a lógica).

## Parte 1 — Fundação

### 1A. Camada de tokens (`globals.css`) — agnóstica ao tema

Adicionar no bloco de **tokens fixos** (herdados pelos 2 temas automaticamente):

**Tipografia:**
```css
--font-weight-display: 300;
--tracking-display:    -0.03em;
--text-hero:    clamp(2.75rem, 7vw, 6rem);
--text-h2:      clamp(2rem, 4.3vw, 3.25rem);
--text-eyebrow: 0.6875rem;       /* uppercase, tracking +0.14em */
--leading-tight: 1.02;
```

**Movimento (portado do Giga):**
```css
--dur-instant: 75ms;  --dur-xs: 150ms;  --dur-sm: 200ms;  --dur-md: 300ms;  --dur-lg: 420ms;
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Forma (suavizar):**
```css
--radius-btn:   9999px;   /* era 2px */
--radius-card:  12px;     /* era 2px */
--radius-img:   6px;
--radius-chip:  6px;
--radius-input: 8px;
```

> Como os tokens de tipografia/movimento/forma são agnósticos ao tema, escuro e claro herdam a mesma
> identidade automaticamente. Só as cores diferem por tema (já implementado).

### 1B. Primitivos de movimento

Refinar `motion.framer.js` para usar o `ease-out` `[0, 0, 0.2, 1]` e durations tokenizadas
(75/150/200/300/420ms). Criar componentes reutilizáveis sobre framer-motion:

| Componente | Função | Base técnica |
|---|---|---|
| `<Reveal>` *(refinar)* | fade + subir ~14px, ease-out, durations dos tokens | `whileInView`, `once` |
| `<Stagger>` / `<StaggerItem>` *(retunar)* | cascata de filhos | `staggerChildren` |
| `<Pinned>` *(novo)* | secção que "cola" no scroll | `position: sticky` + `useScroll` |
| `<ScrollScene>` *(novo)* | progresso de scroll → parallax/opacity/scale | `useScroll` + `useTransform` |
| `<LineReveal>` *(novo)* | headline revelado linha-a-linha | stagger por linha |
| `<Counter>` *(novo)* | número animado | `useInView` + animação de valor |

Todos com guarda `useReducedMotion()` → degradam para fade simples ou estático.

## Parte 2 — Coreografia secção a secção

Cada secção recebe a nova tipografia + forma (base) e uma coreografia com propósito (guiar o olhar).
Tudo nos 2 temas.

| # | Secção | Coreografia |
|---|---|---|
| 1 | Hero | `<Pinned>`; headline `<LineReveal>`; fundo parallax (`<ScrollScene>`); badge + CTAs em stagger; saída com fade/scale para a 1ª secção |
| 2 | Serviços | cards em stagger; card ativo com leve scale/brilho; numeração `01–06` ghost grande em parallax |
| 3 | Preços | 3 pacotes sobem escalonados; pacote recomendado com micro-pop; lógica de preço inalterada |
| 4 | Processo | `<Pinned>`; 3 passos revelados passo-a-passo; conector que se "desenha" entre eles |
| 5 | Portfólio | reveals de entrada + transição encenada ao entrar/sair; **mecânica do carrossel inalterada** |
| 6 | Stats | `<Counter>` — números contam até ao valor no viewport |
| 7 | Garantia | reveal forte + selo/ícone com micro-animação |
| 8 | FAQ | itens em stagger; expand/collapse com transição de altura ease-out |
| 9 | CTA | `<ScrollScene>` com gradient-drift subtil; headline `<LineReveal>` |
| 10 | Contato | campos em stagger; foco com transição de borda accent |
| 11 | Footer | reveal simples |

### Regras transversais

- **Orçamento de movimento:** scroll-pinned **apenas** no Hero + Processo (secções narrativas). Resto
  usa reveals/parallax leves — evita "scroll hijacking" e protege performance.
- **Performance:** animar só `transform` e `opacity` (nunca propriedades de layout); `will-change`
  pontual; `whileInView`/`IntersectionObserver` com `once`.
- **Acessibilidade:** `prefers-reduced-motion` → fade simples ou estático em todos os efeitos.

## Parte 3 — Faseamento de execução

| Fase | Conteúdo | Porta de verificação |
|---|---|---|
| 0 · Fundação | tokens (`globals.css`); refinar `motion.framer.js`; criar primitivos | primitivos testados isoladamente; tokens nos 2 temas |
| 1 · Hero (padrão-ouro) | Hero 100% imersivo | **aprovação do utilizador nos 2 temas antes de prosseguir** |
| 2 · Rollout | clonar o padrão secção a secção pela ordem do `page.js` | verificar cada secção ao entregar |
| 3 · QA final | coesão nos 2 temas + auditoria de performance e reduced-motion | sem jank; reduced-motion degrada bem |

**Porta crítica:** após a Fase 1, parar para validação do Hero. Só propagar o padrão depois de aprovado.

## Fora de âmbito (YAGNI)

- Não alterar a mecânica do carrossel de portfólio (`Selecionados.js`) nem a lógica de preços (`Precos.js`).
- Não trocar a tipografia (decisão: manter Space Grotesk).
- Não mexer em conteúdo/copy, i18n, formulário (Web3Forms), deploy ou SEO — são tarefas separadas
  já registadas no estado do projeto.

## Critérios de sucesso

- O site lê como "premium cinematográfico", não genérico, mantendo identidade própria.
- Tipografia, forma e movimento coerentes em **ambos** os temas.
- 60fps sem jank percetível; `prefers-reduced-motion` respeitado.
- Cada secção verificada antes de se considerar concluída.
