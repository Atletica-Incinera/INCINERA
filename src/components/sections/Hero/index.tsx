"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useHero } from "./useHero";
import { brandImageUrl } from "@/data/utils/cloudinary";

export function Hero() {
  const t = useTranslations("Hero");
  const { refs: { container, redOverlay, leftContent, titleSplit1, titleSplit2, rightContent, mascot }, actions } = useHero();

  return (
    <section
      ref={container}
      className="relative w-full h-[100dvh] overflow-hidden bg-background"
    >
      {/* 1. Initial State covering everything, animating to reveal the split */}
      <div
        ref={redOverlay}
        className="absolute inset-0 bg-primary z-40 pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="absolute inset-0 flex flex-col md:block">
        {/* Left Side (White/Foreground context) */}
        <div
          ref={leftContent}
          className="relative md:absolute md:inset-0 w-full flex-1 flex flex-col justify-center px-8 md:pl-[8%] md:pr-[48%] lg:pl-[10%] lg:pr-[45%] pt-24 pb-12 z-10 bg-background opacity-0"
        >
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
              {t("badge")}
            </div>

            <div className="flex flex-col tracking-tighter leading-[0.85]">
              <h1
                ref={titleSplit1}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground uppercase drop-shadow-sm"
              >
                {t("title1")}
              </h1>
              <h1
                ref={titleSplit2}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary uppercase mt-[-0.05em] drop-shadow-md"
              >
                {t("title2")}
              </h1>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium max-w-xl">
              {t("subtitle")}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={actions.handleScrollToAbout}
                className="h-14 px-8 rounded-full text-lg font-bold shadow-[0_4px_14px_0_hsl(var(--primary)/0.39)] hover:shadow-[0_6px_20px_rgba(var(--primary)/0.5)] transition-all group overflow-hidden relative w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center">
                  {t("cta")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side (Red Background with gradient to dark) */}
        <div
          ref={rightContent}
          className="relative md:absolute md:inset-0 w-full bg-gradient-to-br from-primary via-primary/80 to-primary/90 flex items-center justify-end overflow-hidden z-20 md:[clip-path:polygon(75%_0,100%_0,100%_100%,55%_100%)] lg:[clip-path:polygon(65%_0,100%_0,100%_100%,50%_100%)] opacity-0"
        >
          {/* subtle noise/gradient map */}
          
          <div
              ref={mascot}
              className="relative w-full max-w-[400px] md:max-w-[450px] lg:max-w-[600px] aspect-square flex items-center justify-center md:mr-[2%] lg:mr-[10%] filter drop-shadow-2xl"
            >
              <Image
                src={brandImageUrl("brand/hero-mascot")}
                alt={t("mascotAlt")}
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 400px, (max-width: 1024px) 450px, 600px"
              />
            </div>
        </div>
      </div>

    </section>
  );
}
