"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { impactEventBadges } from "./sponsorData";

/**
 * SponsorImpactBanner — banner de citação de impacto com blockquote semântico.
 * Exibe quote, atribuição e badges de eventos nos quais a Incinera participa.
 */
export const SponsorImpactBanner = () => {
  const t = useTranslations("Sponsor");

  return (
    <section
      aria-label={t("ariaLabels.impact")}
      className="w-full py-20 bg-card/30 border-y border-border/30 relative overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,var(--color-primary)_0%,transparent_70%)] opacity-10"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center space-y-8 max-w-4xl">
        <blockquote className="space-y-4">
          <div
            className="text-6xl md:text-8xl leading-none text-primary/20 font-serif select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight">
            {t("gallery.quote")}
          </p>
          <footer>
            <cite className="text-base text-muted-foreground not-italic">
              {t("gallery.attribution")}
            </cite>
          </footer>
        </blockquote>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {impactEventBadges.map((event) => (
            <Badge
              key={event}
              variant="outline"
              className="px-5 py-2 text-xs font-bold tracking-widest uppercase border-primary/30 bg-primary/10 text-primary rounded-full"
            >
              {event}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
