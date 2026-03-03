import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface SectionTitleProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Classes adicionais para personalização */
  className?: string;
  /** Tag HTML para SEO */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Título de seção padronizado do Design System.
 *
 * @example
 * <SectionTitle>DIRETORIA</SectionTitle>
 * <SectionTitle as="h3" className="text-3xl">Subtítulo menor</SectionTitle>
 */
export const SectionTitle = forwardRef<HTMLElement, SectionTitleProps>(
  ({ children, className, as: Tag = "h2", ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          "text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

SectionTitle.displayName = "SectionTitle";
