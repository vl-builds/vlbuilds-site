'use client';

import { forwardRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Pinned — secção que "cola" no viewport durante o scroll.
 * O container externo é alto (`height`); o interno fica sticky e ocupa 100vh.
 * Encaminha `ref` para o container externo (use-o como alvo de scroll-progress).
 * Com prefers-reduced-motion, degrada para um container estático (sem pin).
 *
 * @param {string} height  altura do container externo (define quanto tempo "segura"). Padrão '200vh'.
 */
export const Pinned = forwardRef(function Pinned({ children, height = '200vh', className = '', style = {} }, ref) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }
  return (
    <div ref={ref} className={className} style={{ position: 'relative', height, ...style }}>
      <div style={{ position: 'sticky', top: 0, minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
});

export default Pinned;
