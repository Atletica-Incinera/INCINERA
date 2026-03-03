"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRight } from "lucide-react";

interface SponsorHeroProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  onScrollToForm: () => void;
}

/**
 * SponsorHero — seção hero da página de patrocínio.
 * Exibe badge, headline, subtítulo e CTA de conversão.
 * As animações GSAP são aplicadas via classe `.hero-animate` e controladas pelo useSponsorPage.
 */
export const SponsorHero = ({ heroRef, onScrollToForm }: SponsorHeroProps) => {
  const t = useTranslations("Sponsor");

  return (
    <section
      aria-labelledby="sponsor-hero-heading"
      className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Dark red gradient overlay */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-background via-primary/5 dark:via-primary/20 to-background opacity-90 dark:opacity-100"
        aria-hidden="true"
      />
      {/* Center glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,var(--primary)_0%,transparent_70%)] opacity-10 dark:opacity-20"
        aria-hidden="true"
      />
      {/* Fine grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div
        ref={heroRef}
        className="relative z-10 text-center px-4 sm:px-6 md:px-12 max-w-5xl mx-auto py-20 md:py-24"
      >
        {/* Pill badge */}
        <div className="hero-animate flex justify-center mb-6 md:mb-8">
          <Badge
            variant="outline"
            className="gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase border-primary/30 bg-primary/10 text-primary rounded-full"
          >
            <Flame className="w-3.5 h-3.5" />
            {t("hero.badge")}
          </Badge>
        </div>

        {/* Headline */}
        <h1
          id="sponsor-hero-heading"
          className="hero-animate text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-foreground leading-[0.95] md:leading-[0.9] mb-6 drop-shadow-2xl"
        >
          {t("hero.title.line1")}{" "}
          <span className="text-primary">{t("hero.title.highlight")}</span>{" "}
          {t("hero.title.line2")}
        </h1>

        {/* Subtitle */}
        <p className="hero-animate text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* CTA */}
        <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            id="sponsor-hero-cta"
            onClick={onScrollToForm}
            size="lg"
            className="group h-12 sm:h-14 px-6 sm:px-10 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 dark:shadow-xl dark:shadow-primary/40 hover:shadow-xl hover:shadow-primary/40 dark:hover:shadow-2xl dark:hover:shadow-primary/70 transition-all duration-300 w-full sm:w-auto"
          >
            {t("hero.cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
        aria-hidden="true"
      />
    </section>
  );
};
