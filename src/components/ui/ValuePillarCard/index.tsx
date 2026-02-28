"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ── Root ── */
interface ValuePillarCardRootProps {
  children: React.ReactNode;
  className?: string;
}

const ValuePillarCardRoot = ({
  children,
  className,
}: ValuePillarCardRootProps) => (
  <article
    className={cn(
      "pillar-card group relative flex flex-col gap-5 p-8 rounded-2xl bg-card border border-border",
      "transition-all duration-500 overflow-hidden",
      "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
      className
    )}
  >
    {/* Hover top-right glow */}
    <div
      className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      aria-hidden="true"
    />
    {/* Bottom-left accent line */}
    <div
      className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-700 ease-out"
      aria-hidden="true"
    />
    {children}
  </article>
);

/* ── Icon ── */
interface ValuePillarCardIconProps {
  children: React.ReactNode;
  className?: string;
}

const ValuePillarCardIcon = ({
  children,
  className,
}: ValuePillarCardIconProps) => (
  <div
    className={cn(
      "relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-xl",
      "bg-primary/10 border border-primary/20",
      "group-hover:bg-primary/20 group-hover:border-primary/40",
      "transition-all duration-300",
      "[&>svg]:w-7 [&>svg]:h-7 [&>svg]:text-primary",
      className
    )}
  >
    {children}
  </div>
);

/* ── Title ── */
interface ValuePillarCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ValuePillarCardTitle = ({
  children,
  className,
}: ValuePillarCardTitleProps) => (
  <h3
    className={cn(
      "relative z-10 text-2xl font-bold tracking-tight text-foreground",
      "group-hover:text-primary transition-colors duration-300",
      className
    )}
  >
    {children}
  </h3>
);

/* ── Body ── */
interface ValuePillarCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const ValuePillarCardBody = ({
  children,
  className,
}: ValuePillarCardBodyProps) => (
  <p
    className={cn(
      "relative z-10 text-muted-foreground leading-relaxed text-[0.95rem]",
      className
    )}
  >
    {children}
  </p>
);

/* ── Compound Export ── */
export const ValuePillarCard = {
  Root: ValuePillarCardRoot,
  Icon: ValuePillarCardIcon,
  Title: ValuePillarCardTitle,
  Body: ValuePillarCardBody,
};
