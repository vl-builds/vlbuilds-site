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
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : '0.7em' },
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
