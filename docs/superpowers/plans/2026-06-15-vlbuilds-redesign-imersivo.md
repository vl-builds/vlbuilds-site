# Redesign Imersivo VL Builds — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar o site VL Builds para um feel "premium cinematográfico" via tokens de tipografia/forma/movimento + primitivos de animação imersiva, aplicados a todas as secções nos dois temas.

**Architecture:** Abordagem A — Fundação primeiro (tokens em `globals.css` + primitivos de movimento sobre framer-motion), depois Hero como "padrão-ouro" (porta de validação), depois rollout secção a secção. Tokens de tipografia/forma/movimento vivem no bloco agnóstico ao tema, pelo que escuro e claro herdam a mesma identidade automaticamente.

**Tech Stack:** Next.js 15, React 19, framer-motion 12, Tailwind v4, CSS custom properties. Estilos inline com `var(--token)`. **Sem test runner** — verificação é visual (dev server `npm run dev`, conferir nos 2 temas via ThemeToggle, e `prefers-reduced-motion` via DevTools → Rendering → Emulate CSS).

**Spec:** `docs/superpowers/specs/2026-06-15-vlbuilds-redesign-imersivo-design.md`

**Como verificar visualmente (repetido em cada porta):**
1. `cd "D:/PROJETO - Renda extra online/VL builds/vlbuilds-site" && npm run dev`
2. Abrir `http://localhost:3000` (ou porta indicada).
3. Conferir tema **escuro** (default) e **claro** (ThemeToggle no Header).
4. DevTools → Cmd/Ctrl+Shift+P → "Emulate CSS prefers-reduced-motion: reduce" → confirmar que animações degradam para fade/estático sem partir o layout.

---

## File Structure

**Criar:**
- `src/app/components/motion/Pinned.js` — wrapper de secção scroll-pinned (sticky).
- `src/app/components/motion/ScrollScene.js` — mapeia progresso de scroll → y/opacity/scale.
- `src/app/components/motion/LineReveal.js` — headline revelado linha-a-linha.
- `src/app/components/motion/Counter.js` — número animado para Stats.

**Modificar:**
- `src/lib/motion.framer.js` — adicionar ease-out do Giga + durations tokenizadas; retunar variants.
- `src/app/globals.css` — adicionar tokens de tipografia/movimento/forma no bloco fixo.
- `src/app/components/Reveal.js` — usar as novas durations/ease (sem mudar API).
- `src/app/page.js` — refactor Hero (Tarefa 6) + secções no rollout (Tarefas 8–17). Botões `BtnPrimary`/`BtnGhost` → radius pill.

**Não tocar:** `src/app/components/Selecionados.js` (mecânica do carrossel), `src/app/components/Precos.js` (lógica de preço). Só os seus *wrappers de entrada* na `page.js`.

---

## FASE 0 — Fundação

### Task 1: Tokens de tipografia/movimento/forma (`globals.css`)

**Files:**
- Modify: `src/app/globals.css` (bloco "Tokens fixos", ~linhas 53-62)

- [ ] **Step 1: Adicionar os novos tokens ao bloco fixo**

Substituir o bloco `/* ─── Tokens fixos (não mudam com o tema) ─── */` por:

```css
/* ─── Tokens fixos (não mudam com o tema) ─── */
:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  /* Tipografia — receita premium */
  --font-weight-display: 300;
  --tracking-display:    -0.03em;
  --text-hero:    clamp(2.75rem, 7vw, 6rem);
  --text-h2:      clamp(2rem, 4.3vw, 3.25rem);
  --text-eyebrow: 0.6875rem;
  --leading-tight: 1.02;

  /* Forma — suavizada (Giga) */
  --radius-btn:   9999px;
  --radius-card:  12px;
  --radius-img:   6px;
  --radius-chip:  6px;
  --radius-input: 8px;

  /* Movimento — tokens partilhados com motion.framer.js */
  --dur-instant: 75ms;
  --dur-xs: 150ms;
  --dur-sm: 200ms;
  --dur-md: 300ms;
  --dur-lg: 420ms;
  --ease:        cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-sm: 0.2s;
  --duration-md: 0.3s;
}
```

> Mantém `--radius-btn`/`--radius-card` com os *mesmos nomes* já usados (antes 2px) — os consumidores existentes passam a herdar a forma nova automaticamente.

- [ ] **Step 2: Verificar build**

Run: `npm run dev` e abrir `http://localhost:3000`.
Expected: página carrega sem erro de CSS; nada visualmente partido ainda (tokens só passam a ter efeito quando consumidos).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(tokens): receita tipográfica premium + forma suavizada + motion tokens"
```

---

### Task 2: Refinar presets de movimento (`motion.framer.js`)

**Files:**
- Modify: `src/lib/motion.framer.js`

- [ ] **Step 1: Substituir easings, durations e transitions**

Substituir os blocos `easings`, `durations` e `transitions` por:

```js
/** Easing curves — ease-out assinatura do Giga + fallbacks. */
export const easings = {
  out:       [0, 0, 0.2, 1],      // ease-out cinematográfico (Giga)
  inOut:     [0.4, 0, 0.2, 1],
  custom1:   [0.44, 0, 0.56, 1],  // legado
  easeInOut: [0.25, 0.1, 0.25, 1],
};

/** Duration presets (segundos), tokenizadas (75–420ms). */
export const durations = {
  instant: 0.075,
  xs: 0.15,
  sm: 0.2,
  md: 0.3,
  lg: 0.42,
};

/** Ready-to-spread Framer Motion transition objects. */
export const transitions = {
  base:   { duration: durations.md, ease: easings.out },
  fast:   { duration: durations.xs, ease: easings.out },
  slow:   { duration: durations.lg, ease: easings.out },
  spring: springs.soft,
};
```

- [ ] **Step 2: Retunar a variant `slideUp` (subida ~14px)**

No bloco `variants`, substituir `slideUp` por:

```js
  slideUp: {
    hidden: { opacity: 0, y: 14 },
    show:   { opacity: 1, y: 0, transition: transitions.base },
  },
```

- [ ] **Step 3: Verificar**

Run: `npm run dev`. Fazer scroll pela página.
Expected: reveals existentes continuam a funcionar, agora com ease-out mais suave. Sem erros no console.

- [ ] **Step 4: Commit**

```bash
git add src/lib/motion.framer.js
git commit -m "feat(motion): ease-out do Giga + durations tokenizadas"
```

---

### Task 3: Primitivo `<Pinned>`

**Files:**
- Create: `src/app/components/motion/Pinned.js`

- [ ] **Step 1: Criar o componente**

```jsx
'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Pinned — secção que "cola" no viewport durante o scroll.
 * O container externo é alto (`height`); o interno fica sticky e ocupa 100vh.
 * Com prefers-reduced-motion, degrada para layout estático (sem pin).
 *
 * @param {string} height  altura do container externo (define quanto tempo "segura"). Padrão '200vh'.
 */
export function Pinned({ children, height = '200vh', className = '', style = {} }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <section className={className} style={style}>{children}</section>;
  }
  return (
    <div className={className} style={{ position: 'relative', height, ...style }}>
      <div style={{ position: 'sticky', top: 0, minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

export default Pinned;
```

- [ ] **Step 2: Verificar (smoke manual)**

Importar temporariamente em `page.js` à volta de uma secção qualquer, fazer scroll, confirmar que a secção pin-a, depois reverter o import temporário.
Expected: secção fica fixa enquanto se faz scroll dentro da sua altura; com reduced-motion comporta-se como `<section>` normal.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/motion/Pinned.js
git commit -m "feat(motion): primitivo Pinned (scroll-pin)"
```

---

### Task 4: Primitivos `<ScrollScene>` e `<LineReveal>`

**Files:**
- Create: `src/app/components/motion/ScrollScene.js`
- Create: `src/app/components/motion/LineReveal.js`

- [ ] **Step 1: Criar `ScrollScene.js`**

```jsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * ScrollScene — mapeia o progresso de scroll do elemento para y/opacity/scale.
 * `from`/`to` são objetos com chaves opcionais { y, opacity, scale }.
 * `offset` segue a convenção do framer-motion useScroll.
 */
export function ScrollScene({
  children,
  from = {},
  to = {},
  offset = ['start end', 'end start'],
  as = 'div',
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const y       = useTransform(scrollYProgress, [0, 1], [from.y ?? 0, to.y ?? 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [from.opacity ?? 1, to.opacity ?? 1]);
  const scale   = useTransform(scrollYProgress, [0, 1], [from.scale ?? 1, to.scale ?? 1]);

  const Comp = motion[as] ?? motion.div;
  const animStyle = reduce ? style : { ...style, y, opacity, scale };

  return <Comp ref={ref} className={className} style={animStyle}>{children}</Comp>;
}

export default ScrollScene;
```

- [ ] **Step 2: Criar `LineReveal.js`**

```jsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { easings, durations } from '../../../lib/motion.framer';

/**
 * LineReveal — revela um headline linha-a-linha (cada linha sobe de baixo, com máscara).
 * `lines` é um array de strings/nós. `as` é a tag do container (h1/h2/...).
 */
export function LineReveal({
  lines = [],
  as = 'h1',
  className = '',
  style = {},
  lineStyle = {},
  stagger = 0.12,
  delay = 0,
  amount = 0.4,
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h1;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };
  const line = {
    hidden: { opacity: 0, y: reduce ? 0 : '0.7em' },
    show:   { opacity: 1, y: 0, transition: { duration: durations.lg, ease: easings.out } },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {lines.map((l, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span style={{ display: 'block', ...lineStyle }} variants={line}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

export default LineReveal;
```

- [ ] **Step 3: Verificar import paths**

Confirmar que `motion.framer.js` está em `src/lib/` e o componente em `src/app/components/motion/`, logo o import relativo é `../../../lib/motion.framer`.
Run: `npm run dev`; sem erro de módulo.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/motion/ScrollScene.js src/app/components/motion/LineReveal.js
git commit -m "feat(motion): primitivos ScrollScene e LineReveal"
```

---

### Task 5: Primitivo `<Counter>`

**Files:**
- Create: `src/app/components/motion/Counter.js`

- [ ] **Step 1: Criar o componente**

```jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counter — anima um número de `from` até `to` quando entra no viewport (uma vez).
 * Com prefers-reduced-motion, mostra `to` imediatamente.
 */
export function Counter({
  to,
  from = 0,
  duration = 1.4,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, from, duration]);

  return <span ref={ref} className={className} style={style}>{prefix}{val}{suffix}</span>;
}

export default Counter;
```

- [ ] **Step 2: Verificar**

Run: `npm run dev`; sem erro de módulo. (Uso real é na Tarefa 12.)

- [ ] **Step 3: Commit**

```bash
git add src/app/components/motion/Counter.js
git commit -m "feat(motion): primitivo Counter (número animado)"
```

---

## FASE 1 — Hero (padrão-ouro) 🔒 PORTA DE VALIDAÇÃO

### Task 6: Refactor do Hero — tipografia premium + pin + parallax + line-reveal

**Files:**
- Modify: `src/app/page.js` — função `Hero` (linhas ~98-164); `BtnPrimary` (~22-46) e `BtnGhost` (~48-74) para radius pill.

- [ ] **Step 1: Botões para radius pill**

Em `BtnPrimary`, trocar `borderRadius: 2,` por `borderRadius: 'var(--radius-btn)',`.
Em `BtnGhost`, trocar `borderRadius: 2,` por `borderRadius: 'var(--radius-btn)',`.

- [ ] **Step 2: Importar os primitivos no topo de `page.js`**

Após a linha `import { Reveal, StaggerContainer, StaggerItem } from './components/Reveal';` adicionar:

```js
import { Pinned } from './components/motion/Pinned';
import { ScrollScene } from './components/motion/ScrollScene';
import { LineReveal } from './components/motion/LineReveal';
import { Counter } from './components/motion/Counter';
```

- [ ] **Step 3: Reescrever a função `Hero`**

Substituir toda a função `Hero` por:

```jsx
function Hero({ t }) {
  return (
    <Pinned height="180vh">
      <section style={{ flex: 1, minHeight: '100vh', padding: '0 40px 80px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <ScrollScene from={{ y: 0, scale: 1.05 }} to={{ y: -60, scale: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div className="vl-hero-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
        </ScrollScene>

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

          <Reveal type="fadeIn" delay={0.05}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: DISPLAY, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: ACCENT, marginBottom: 32,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, animation: 'vlpulse 2s ease-in-out infinite', display: 'inline-block' }} />
              {t.hero.badge}
            </div>
          </Reveal>

          <LineReveal
            as="h1"
            lines={[
              t.hero.headline[0],
              <em key="em" style={{ fontStyle: 'normal', color: ACCENT }}>{t.hero.headline[1]}</em>,
            ]}
            style={{
              fontFamily: DISPLAY,
              fontSize: 'var(--text-hero)',
              fontWeight: 'var(--font-weight-display)',
              letterSpacing: 'var(--tracking-display)',
              lineHeight: 'var(--leading-tight)',
              color: FG,
              marginBottom: 48,
              maxWidth: '12ch',
            }}
            stagger={0.14}
            delay={0.1}
          />

          <Reveal type="riseIn" delay={0.45}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <p style={{ fontFamily: BODY, fontSize: 16, color: MUTED, maxWidth: '42ch', lineHeight: 1.65 }}>
                {t.hero.body}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
                <BtnPrimary href="#contato">{t.hero.btnStart}</BtnPrimary>
                <BtnGhost href="#trabalhos">{t.hero.btnWork}</BtnGhost>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 40, right: 40, height: 1, background: BORDER, zIndex: 1 }} />

        <style>{`@keyframes vlpulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }`}</style>
      </section>
    </Pinned>
  );
}
```

> Mudança-chave: headline passa de `fontWeight: 900` / `clamp(3.5rem,9vw,11rem)` para a receita premium (peso 300, `var(--text-hero)`, tracking -0.03em), revelado linha-a-linha; fundo com parallax; secção em pin.

- [ ] **Step 4: Verificar nos 2 temas + reduced-motion**

Run: `npm run dev` → `http://localhost:3000`.
Expected:
- Escuro: headline leve e grande, revela linha-a-linha; ao fazer scroll o hero segura e o fundo faz parallax; CTAs em pill.
- Claro (ThemeToggle): mesma coreografia, cores Paper corretas.
- Reduced-motion: hero estático, headline visível, sem pin/parallax, layout intacto.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.js
git commit -m "feat(hero): tipografia premium + pin + parallax + line-reveal; botões pill"
```

- [ ] **Step 6: 🔒 PORTA — pedir validação do utilizador**

Parar e pedir ao Vitor para aprovar o Hero (padrão-ouro) nos 2 temas **antes** de prosseguir para o rollout. Se houver ajustes, fazê-los aqui e só depois continuar.

---

## FASE 2 — Rollout (clonar o padrão)

> Cada tarefa aplica: (a) tipografia/forma novas à secção; (b) a coreografia do mapa. As secções da `page.js` recebem `id` se ainda não tiverem, para verificação. Verificar cada uma nos 2 temas + reduced-motion antes de commitar.

### Task 7: Helper de forma — cards e imagens para radius novos

**Files:**
- Modify: `src/app/page.js` — `Eyebrow` e quaisquer estilos de card inline com `borderRadius: 2`.

- [ ] **Step 1: Localizar usos de radius afiado**

Run: `grep -n "borderRadius: 2\b\|borderRadius: '2px'\|radius-card\|radius-btn" src/app/page.js`
Expected: lista de ocorrências.

- [ ] **Step 2: Substituir por tokens**

Para cada card/container, trocar `borderRadius: 2` por `borderRadius: 'var(--radius-card)'`; para chips/badges por `var(--radius-chip)`; imagens por `var(--radius-img)`.

- [ ] **Step 3: Verificar + commit**

Run: `npm run dev`; confirmar cantos suavizados nos 2 temas.
```bash
git add src/app/page.js
git commit -m "feat(forma): aplicar radius suavizados aos cards/chips"
```

### Task 8: Serviços — stagger + numeração ghost em parallax

**Files:** Modify `src/app/page.js` → `ServicosSection` (~166-212).

- [ ] **Step 1:** Envolver o título da secção em `<LineReveal as="h2">` com estilo `fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-display)', letterSpacing: 'var(--tracking-display)'`. Manter a grelha de cards dentro de `<StaggerContainer>` / `<StaggerItem variant="slideUp">` (já existente).
- [ ] **Step 2:** Envolver o número `01–06` de cada card num `<ScrollScene from={{ y: 20 }} to={{ y: -20 }}>` para parallax subtil.
- [ ] **Step 3:** Verificar nos 2 temas + reduced-motion.
- [ ] **Step 4:** `git add -A && git commit -m "feat(serviços): line-reveal do título + stagger + numeração parallax"`

### Task 9: Preços — entrada escalonada + micro-pop no recomendado

**Files:** Modify `src/app/page.js` → wrapper `<PrecosSection />` (linha ~498). **Não alterar `Precos.js`.**

- [ ] **Step 1:** Envolver `<PrecosSection t={t} />` em `<StaggerContainer>` não é possível sem tocar no componente; em vez disso envolver em `<Reveal type="riseIn">` para a entrada da secção inteira.
- [ ] **Step 2:** Se `Precos.js` expuser os 3 cards como filhos diretos, adicionar `<Reveal>` por card *dentro* de `Precos.js` apenas se necessário — caso contrário manter no nível do wrapper (preferir não tocar). Decisão: manter no wrapper.
- [ ] **Step 3:** Verificar + commit: `git commit -m "feat(preços): reveal de entrada da secção"`

### Task 10: Processo — pin + revelação passo-a-passo

**Files:** Modify `src/app/page.js` → `ProcessoSection` (~214-260).

- [ ] **Step 1:** Envolver a secção em `<Pinned height="220vh">`.
- [ ] **Step 2:** Trocar o `<StaggerContainer>` dos 3 passos por revelação ligada ao scroll: cada passo num `<ScrollScene from={{ opacity: 0.2, y: 30 }} to={{ opacity: 1, y: 0 }} offset={['start center','center center']}>`.
- [ ] **Step 3:** Adicionar um conector vertical/horizontal entre passos cujo `scaleY`/`scaleX` é mapeado pelo progresso (um `<ScrollScene from={{ scale: 0 }} to={{ scale: 1 }}>` com `transformOrigin` no início, aplicado a uma `<div>` de 1-2px com `background: var(--color-accent)`).
- [ ] **Step 4:** Verificar nos 2 temas + reduced-motion (deve degradar para os 3 passos empilhados visíveis, sem pin).
- [ ] **Step 5:** `git commit -m "feat(processo): pin + revelação passo-a-passo + conector animado"`

### Task 11: Portfólio — reveal de entrada/saída (carrossel intacto)

**Files:** Modify `src/app/page.js` → wrapper `<PortfolioSection />` (linha ~500). **Não alterar `Selecionados.js`.**

- [ ] **Step 1:** Envolver `<PortfolioSection />` em `<ScrollScene from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} offset={['start end','start center']}>` para entrada encenada.
- [ ] **Step 2:** Verificar que o carrossel continua a funcionar (setas, teclado, swipe) — só o invólucro anima.
- [ ] **Step 3:** `git commit -m "feat(portfólio): entrada encenada da secção (carrossel inalterado)"`

### Task 12: Stats — números animados

**Files:** Modify `src/app/page.js` → `StatsSection` (~262-286).

- [ ] **Step 1:** Identificar os valores numéricos renderizados (ex.: `t.stats.items[i].value`). Para cada valor que seja número (ou número+sufixo como "+", "%"), substituir o texto por `<Counter to={N} suffix="..." />`.
- [ ] **Step 2:** Se os valores em i18n forem strings tipo `"50+"`, extrair número e sufixo: `to={50} suffix="+"`. Documentar no código o mapeamento por item.
- [ ] **Step 3:** Manter o `<StaggerContainer>` existente para a entrada dos cards.
- [ ] **Step 4:** Verificar: números contam ao entrar no viewport; reduced-motion mostra valor final imediato.
- [ ] **Step 5:** `git commit -m "feat(stats): números animados com Counter"`

### Task 13: Garantia — reveal forte + selo animado

**Files:** Modify `src/app/page.js` → `GarantiaSection` (~287-312).

- [ ] **Step 1:** Título em `<LineReveal as="h2">` com a receita premium.
- [ ] **Step 2:** Envolver o ícone/selo num `<Reveal type="riseIn">` com `delay` ligeiro e, opcionalmente, `<ScrollScene from={{ scale: 0.9 }} to={{ scale: 1 }}>`.
- [ ] **Step 3:** Verificar + `git commit -m "feat(garantia): line-reveal + selo animado"`

### Task 14: FAQ — stagger + transição de altura suave

**Files:** Modify `src/app/page.js` → `FaqSection` (~313-347).

- [ ] **Step 1:** Itens da FAQ dentro de `<StaggerContainer>`/`<StaggerItem variant="slideUp">`.
- [ ] **Step 2:** No expand/collapse, animar altura com framer-motion: envolver o corpo da resposta em `<motion.div>` com `initial={{ height: 0, opacity: 0 }}` / `animate={{ height: 'auto', opacity: 1 }}` / `exit={{ height: 0, opacity: 0 }}` e `transition={{ duration: 0.3, ease: [0,0,0.2,1] }}`, dentro de `<AnimatePresence>` (importar de `framer-motion`).
- [ ] **Step 3:** Verificar: abrir/fechar suave; reduced-motion sem salto brusco.
- [ ] **Step 4:** `git commit -m "feat(faq): stagger + expand/collapse animado"`

### Task 15: CTA — gradient-drift + line-reveal

**Files:** Modify `src/app/page.js` → `CtaSection` (~348-373); `globals.css` para keyframe.

- [ ] **Step 1:** Adicionar em `globals.css`:
```css
@keyframes vlGradientDrift { 0%{background-position:0% center} 50%{background-position:100% center} 100%{background-position:0% center} }
.vl-cta-drift { background-size: 200% 200%; animation: vlGradientDrift 8s ease-in-out infinite; }
```
- [ ] **Step 2:** Aplicar `className="vl-cta-drift"` ao fundo/accent da CTA (um gradiente subtil com `var(--color-accent)`).
- [ ] **Step 3:** Headline da CTA em `<LineReveal as="h2">`.
- [ ] **Step 4:** Verificar nos 2 temas + reduced-motion (a media query global já desliga a animação).
- [ ] **Step 5:** `git commit -m "feat(cta): gradient-drift + line-reveal"`

### Task 16: Contato — stagger nos campos + foco accent

**Files:** Modify `src/app/page.js` → `ContatoSection` (~374-...).

- [ ] **Step 1:** Envolver os campos do formulário em `<StaggerContainer>`/`<StaggerItem variant="slideUp">`.
- [ ] **Step 2:** Inputs com `borderRadius: 'var(--radius-input)'` e transição de borda no foco: `onFocus`/`onBlur` a trocar `borderColor` para `var(--color-accent)` (ou via CSS `:focus`), com `transition: 'border-color var(--dur-sm) var(--ease)'`.
- [ ] **Step 3:** Verificar + `git commit -m "feat(contato): stagger nos campos + foco accent + radius input"`

### Task 17: Footer — reveal simples

**Files:** Modify `src/app/page.js` → bloco footer.

- [ ] **Step 1:** Envolver o conteúdo do footer em `<Reveal type="fadeIn">`.
- [ ] **Step 2:** Verificar + `git commit -m "feat(footer): reveal de entrada"`

---

## FASE 3 — QA final

### Task 18: Auditoria de coesão, performance e acessibilidade

**Files:** nenhum (auditoria); correções pontuais onde necessário.

- [ ] **Step 1: Passagem nos 2 temas**

Percorrer o site inteiro em escuro e claro. Anotar qualquer secção onde tipografia/forma/movimento estejam inconsistentes. Corrigir.

- [ ] **Step 2: prefers-reduced-motion**

Com reduced-motion ativo, percorrer o site. Confirmar: sem pin, sem parallax, reveals→fade simples ou estático, Counter mostra valor final, nenhum layout partido.

- [ ] **Step 3: Performance / jank**

DevTools → Performance → gravar um scroll completo. Confirmar ~60fps; procurar long tasks. Garantir que só `transform`/`opacity` são animados (sem animar `width/height/top/left`). Adicionar `will-change: transform` pontual só onde houver jank medido.

- [ ] **Step 4: Build de produção**

Run: `npm run build`
Expected: build conclui sem erros.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore(qa): auditoria de coesão, performance e reduced-motion"
```

---

## Notas de execução

- **Porta crítica:** após a Task 6 (Hero), parar para validação do utilizador antes da Fase 2.
- **Não fabricar:** valores de animação na Fase 2 são pontos de partida do spec; afinar visualmente durante a implementação de cada secção.
- **DRY:** reutilizar sempre os primitivos (`Reveal`, `Stagger`, `Pinned`, `ScrollScene`, `LineReveal`, `Counter`); não recriar lógica de motion inline.
- **Out of scope:** mecânica do carrossel (`Selecionados.js`), lógica de preços (`Precos.js`), copy/i18n, Web3Forms, deploy, SEO.
