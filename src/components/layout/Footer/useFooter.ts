"use client";

import { useLayoutEffect, useRef } from "react";

export const useFooter = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // Subtle animations for footer if needed
  }, []);

  return {
    footerRef,
  };
};
