'use client';

import { motion } from 'framer-motion';
import { inView, variants } from '../../lib/motion.framer';

/**
 * Reveal — anima filhos quando entram no viewport.
 *
 * @param {'fadeIn'|'riseIn'} type  preset do inView (padrão: 'riseIn')
 * @param {number} delay  delay adicional em segundos (padrão: 0)
 * @param {string} className  classes extras no elemento
 * @param {*} children
 */
export function Reveal({ type = 'riseIn', delay = 0, className = '', children, ...rest }) {
  const preset = inView[type] ?? inView.riseIn;
  return (
    <motion.div
      initial={preset.initial}
      whileInView={preset.whileInView}
      viewport={preset.viewport}
      transition={{ ...preset.whileInView?.transition, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer — agrupa filhos num stagger (cascata).
 */
export function StaggerContainer({ className = '', children, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants.stagger}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — filho de StaggerContainer.
 */
export function StaggerItem({ variant = 'slideUp', className = '', children, ...rest }) {
  return (
    <motion.div variants={variants[variant] ?? variants.slideUp} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
