"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * MotionProvider — carrega as features do Framer Motion de forma lazy.
 *
 * Usando `LazyMotion` + `domAnimation` em vez de importar `motion` diretamente,
 * economizamos ~30kb no bundle inicial. As features são carregadas uma única vez
 * para toda a aplicação.
 *
 * Todos os componentes que usam animações devem importar `m` de "framer-motion"
 * (em vez de `motion`) e este provider deve estar presente na árvore acima deles.
 *
 * @see https://www.framer.com/motion/lazy-motion/
 *
 * @example
 * // Em vez de:
 * import { motion } from "framer-motion";
 * <motion.div animate={{ opacity: 1 }} />
 *
 * // Use:
 * import { m } from "framer-motion";
 * <m.div animate={{ opacity: 1 }} />
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
