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
