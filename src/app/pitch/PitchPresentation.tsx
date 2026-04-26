"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { usePitchDeck } from "./usePitchDeck";
import { cn } from "@/lib/utils";
import type { PitchSlide } from "./pitchData";

import { CoverSlideView } from "./slides/CoverSlideView";
import { ContentSlideView } from "./slides/ContentSlideView";
import { StatsSlideView } from "./slides/StatsSlideView";
import { BentoSlideView } from "./slides/BentoSlideView";
import { TiersSlideView } from "./slides/TiersSlideView";
import { StepsSlideView } from "./slides/StepsSlideView";
import { QuoteSlideView } from "./slides/QuoteSlideView";

/* ── Slide Renderer ── */

function renderSlide(slide: PitchSlide) {
  switch (slide.type) {
    case "cover":
      return <CoverSlideView data={slide} />;
    case "content":
      return <ContentSlideView data={slide} />;
    case "stats":
      return <StatsSlideView data={slide} />;
    case "bento":
      return <BentoSlideView data={slide} />;
    case "tiers":
      return <TiersSlideView data={slide} />;
    case "steps":
      return <StepsSlideView data={slide} />;
    case "quote":
      return <QuoteSlideView data={slide} />;
    default:
      return null;
  }
}

/**
 * PitchPresentation — fullscreen slide deck with:
 *  - Keyboard navigation (arrows, space, F)
 *  - Auto-hide bottom navigation bar
 *  - Slide transition animations (opacity + scale)
 *  - Progress dots with active pill
 */
export function PitchPresentation() {
  const {
    slides,
    currentSlide,
    totalSlides,
    direction,
    isFullscreen,
    navVisible,
    containerRef,
    next,
    prev,
    goTo,
    toggleFullscreen,
  } = usePitchDeck();

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-background select-none"
      role="application"
      aria-label="Apresentação de Patrocínio Incinera"
      aria-roledescription="slide deck"
    >
      {/* ── Slide viewport ── */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPast = index < currentSlide;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} de ${totalSlides}`}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 w-full h-full transition-all duration-500 ease-in-out",
                isActive
                  ? "opacity-100 scale-100 z-10"
                  : isPast
                    ? "opacity-0 scale-[0.95] z-0 pointer-events-none"
                    : "opacity-0 scale-[1.05] z-0 pointer-events-none",
              )}
            >
              {renderSlide(slide)}
            </div>
          );
        })}
      </div>

      {/* ── Navigation bar (auto-hide) ── */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-50 flex items-center justify-between px-[3%] py-[1.2%] transition-all duration-500",
          navVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
        style={{
          backdropFilter: "blur(20px) saturate(1.3)",
          background: "rgba(0,0,0,0.4)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* ── Left: Slide counter ── */}
        <span className="text-[clamp(10px,0.8vw,15px)] text-muted-foreground/50 tabular-nums font-mono min-w-[4em]">
          {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>

        {/* ── Center: Progress dots ── */}
        <div className="flex items-center gap-[clamp(4px,0.4vw,8px)]">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Ir para slide ${index + 1}`}
              className={cn(
                "rounded-full transition-all duration-300 cursor-pointer",
                index === currentSlide
                  ? "w-[clamp(16px,1.5vw,28px)] h-[clamp(5px,0.4vw,8px)] bg-primary"
                  : "w-[clamp(5px,0.4vw,8px)] h-[clamp(5px,0.4vw,8px)] bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
            />
          ))}
        </div>

        {/* ── Right: Controls ── */}
        <div className="flex items-center gap-[clamp(6px,0.6vw,12px)] min-w-[4em] justify-end">
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            aria-label="Slide anterior"
            className="p-[clamp(4px,0.4vw,8px)] rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-[clamp(14px,1.2vw,22px)] h-[clamp(14px,1.2vw,22px)]" />
          </button>
          <button
            onClick={next}
            disabled={currentSlide === totalSlides - 1}
            aria-label="Próximo slide"
            className="p-[clamp(4px,0.4vw,8px)] rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-[clamp(14px,1.2vw,22px)] h-[clamp(14px,1.2vw,22px)]" />
          </button>
          <div className="w-px h-[clamp(12px,1vw,20px)] bg-white/10" />
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            className="p-[clamp(4px,0.4vw,8px)] rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-[clamp(14px,1.2vw,22px)] h-[clamp(14px,1.2vw,22px)]" />
            ) : (
              <Maximize2 className="w-[clamp(14px,1.2vw,22px)] h-[clamp(14px,1.2vw,22px)]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
