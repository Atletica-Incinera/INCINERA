"use client";

import { useRef } from "react";

/**
 * Hook para lógica do Footer.
 *
 * Atualmente expõe apenas `footerRef` para uso no componente.
 * Adicione aqui animações GSAP, observadores de scroll ou qualquer
 * efeito colateral relacionado ao Footer quando necessário.
 *
 * @example
 * const { footerRef } = useFooter();
 * return <footer ref={footerRef}>...</footer>;
 */
export const useFooter = () => {
  const footerRef = useRef<HTMLElement>(null);

  // Adicione useLayoutEffect com GSAP ou outros efeitos aqui quando necessário.

  return {
    footerRef,
  };
};
