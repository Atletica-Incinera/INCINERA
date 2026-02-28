"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SeparatorVariant = "glow-line" | "angled-scar" | "ember-drift" | "flame-peak";

interface SectionSeparatorProps {
  variant?: SeparatorVariant;
  className?: string;
  flip?: boolean;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  variant = "glow-line",
  className,
  flip = false,
}) => {
  const baseStyles = "relative w-full overflow-hidden pointer-events-none";

  const renderVariant = () => {
    switch (variant) {
      case "glow-line":
        return (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 dark:via-primary to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[40px] bg-primary/10 dark:bg-primary/30 blur-[40px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[3px] bg-primary blur-[2px] shadow-sm dark:shadow-[0_0_15px_var(--primary)]" />
          </div>
        );

      case "angled-scar":
        return (
          <div 
            className={cn(
              "h-24 md:h-24 w-full relative",
              flip ? "scale-y-[-1]" : ""
            )}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 dark:via-primary/15 to-transparent"
              style={{
                clipPath: "polygon(0 15%, 100% 45%, 100% 85%, 0 55%)",
              }}
            />
            <div 
              className="absolute top-[45%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primary to-transparent shadow-none dark:shadow-[0_0_10px_var(--primary)]"
              style={{ transform: "rotate(0.5deg)" }}
            />
            <div 
              className="absolute top-[55%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 dark:via-primary/60 to-transparent"
              style={{ transform: "rotate(-0.5deg)" }}
            />
          </div>
        );

      case "ember-drift":
        return (
          <div className="h-64 w-full flex items-center justify-center relative">
            {/* Heat Haze Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
            
            {/* Animated Embers - Increased count and size */}
            <div className="flex gap-8 md:gap-16 relative z-10">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce shadow-[0_0_12px_var(--primary)]"
                  style={{
                    animationDuration: `${1.5 + (i % 3)}s`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6 + (i % 4) * 0.1,
                    marginTop: `${(i % 5) * 15}px`
                  }}
                />
              ))}
            </div>
            
            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-primary/5 blur-[60px]" />
          </div>
        );

      case "flame-peak":
        return (
          <div className={cn("h-24 md:h-40 w-full relative", flip ? "scale-y-[-1]" : "")}>
             <svg 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="absolute bottom-0 left-0 w-full h-full text-background fill-current filter drop-shadow-[0_-10px_15px_var(--color-primary)]"
            >
              <path d="M0,0 C150,110 400,20 600,110 C800,20 1050,110 1200,0 L1200,120 L0,120 Z" />
            </svg>
            {/* Intense Flame Edge */}
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[2px] opacity-80" />
            <div className="absolute bottom-0 left-0 w-full h-[10px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[8px]" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(baseStyles, className)}>
      {renderVariant()}
    </div>
  );
};
