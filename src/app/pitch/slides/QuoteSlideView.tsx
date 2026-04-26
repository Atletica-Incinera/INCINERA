import Image from "next/image";
import type { QuoteSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";

interface QuoteSlideViewProps {
  data: QuoteSlide;
}

/**
 * QuoteSlideView — centered quote/statement slide.
 * Max-width 70% for optimal readability.
 * Used for the final "Dúvidas?" slide.
 */
export function QuoteSlideView({ data }: QuoteSlideViewProps) {
  return (
    <SlideShell centered>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, var(--primary) 0%, transparent 70%)",
          opacity: 0.1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[70%]">
        {/* Logo */}
        <div className="mb-[4%]">
          <Image
            src="/logo.svg"
            alt="Incinera"
            width={64}
            height={64}
            className="w-[clamp(40px,5vw,80px)] h-auto opacity-60"
          />
        </div>

        {/* Quote text */}
        <p className="text-[clamp(28px,4.5vw,88px)] font-black uppercase tracking-[-0.02em] leading-[0.95] text-foreground">
          {data.text}
        </p>

        {/* Attribution */}
        <p className="text-[clamp(12px,1vw,20px)] text-muted-foreground mt-[2%] tracking-wide">
          {data.attribution}
        </p>
      </div>
    </SlideShell>
  );
}
