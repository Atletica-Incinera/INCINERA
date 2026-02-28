"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  /**
   * The numeric value to display (used for GSAP counter animation).
   * Pass as data-count attribute via the `countValue` prop.
   */
  countValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export const StatCard = ({
  countValue,
  suffix = "",
  prefix = "",
  label,
  className,
}: StatCardProps) => (
  <div
    className={cn(
      "relative flex flex-col items-center gap-2 p-6 rounded-2xl",
      "bg-card border border-border",
      "hover:border-primary/30 transition-all duration-300",
      className
    )}
  >
    {/* Subtle top glow */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-primary/20 blur-xl rounded-full pointer-events-none"
      aria-hidden="true"
    />

    <p className="text-4xl md:text-5xl font-black text-primary tracking-tighter leading-none">
      <span
        data-count={countValue}
        data-suffix={suffix}
        data-prefix={prefix}
        aria-label={`${prefix}${countValue}${suffix}`}
      >
        {prefix}0{suffix}
      </span>
    </p>

    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] text-center">
      {label}
    </p>
  </div>
);
