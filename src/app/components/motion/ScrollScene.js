'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * ScrollScene — mapeia o progresso de scroll para y/opacity/scale.
 * `from`/`to` são objetos com chaves opcionais { y, opacity, scale }.
 * `offset` segue a convenção do framer-motion useScroll.
 * `target` (opcional) — ref de um elemento em fluxo a usar como alvo do scroll-progress.
 *   Se omitido, usa o próprio elemento animado (adequado a elementos em fluxo).
 */
export function ScrollScene({
  children,
  from = {},
  to = {},
  offset = ['start end', 'end start'],
  target,
  as = 'div',
  className = '',
  style = {},
}) {
  const innerRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: target ?? innerRef, offset });

  const y       = useTransform(scrollYProgress, [0, 1], [from.y ?? 0, to.y ?? 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [from.opacity ?? 1, to.opacity ?? 1]);
  const scale   = useTransform(scrollYProgress, [0, 1], [from.scale ?? 1, to.scale ?? 1]);

  const Comp = motion[as] ?? motion.div;
  const animStyle = reduce ? style : { ...style, y, opacity, scale };

  return <Comp ref={target ? undefined : innerRef} className={className} style={animStyle}>{children}</Comp>;
}

export default ScrollScene;
