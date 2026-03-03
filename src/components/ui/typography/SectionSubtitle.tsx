import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface SectionSubtitleProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Classes adicionais para personalização */
  className?: string;
  /** Tag HTML para SEO */
  as?: "p" | "span" | "div";
}

/**
 * Subtítulo de seção padronizado do Design System.
 * 
 * @example
 * <SectionSubtitle>Quem faz acontecer</SectionSubtitle>
 */
export const SectionSubtitle = forwardRef<HTMLElement, SectionSubtitleProps>(
  ({ children, className, as: Tag = "p", ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          "text-xl md:text-2xl text-primary font-bold italic",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

SectionSubtitle.displayName = "SectionSubtitle";
