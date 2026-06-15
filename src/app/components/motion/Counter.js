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
