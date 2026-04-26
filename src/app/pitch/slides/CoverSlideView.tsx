import Image from "next/image";
import { Flame } from "lucide-react";
import type { CoverSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";

interface CoverSlideViewProps {
  data: CoverSlide;
}

/**
 * CoverSlideView — hero/cover slide with logo, headline and subtitle.
 * Content has a -3% vertical nudge for visual balance.
 */
export function CoverSlideView({ data }: CoverSlideViewProps) {
  return (
    <SlideShell centered>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, var(--primary) 0%, transparent 70%)",
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center -translate-y-[3%]">
        {/* Logo */}
        <div className="mb-[3%]">
          <Image
            src="/logo.svg"
            alt="Incinera"
            width={80}
            height={80}
            className="w-[clamp(48px,6vw,96px)] h-auto drop-shadow-[0_0_30px_rgba(var(--primary),0.4)]"
            priority
          />
        </div>

        {/* Badge */}
        <div className="mb-[2.5%]">
          <span
            className="inline-flex items-center gap-[0.5em] rounded-full border border-primary/30 px-[1.2em] py-[0.4em] text-[clamp(9px,0.7vw,13px)] font-bold uppercase tracking-[0.2em] text-primary"
            style={{ background: "rgba(var(--primary), 0.08)" }}
          >
            <Flame className="w-[1em] h-[1em]" />
            {data.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(28px,5vw,96px)] font-black uppercase tracking-[-0.03em] leading-[0.92] text-foreground mb-[1.5%]">
          {data.title}{" "}
          <span className="text-primary">{data.highlight}</span>{" "}
          {data.subtitle}
        </h1>

        {/* Meta */}
        <p className="text-[clamp(12px,1.1vw,22px)] text-muted-foreground tracking-wide">
          {data.meta}
        </p>
      </div>
    </SlideShell>
  );
}
