"use client";

import { useTranslations } from "next-intl";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
import { CheckCircle2 } from "lucide-react";
import { activations } from "./sponsorData";

/**
 * SponsorActivations — grade de 8 itens de ativação de patrocínio.
 * Cada item é puramente visual com ícone de check e texto traduzido.
 */
export const SponsorActivations = () => {
  const t = useTranslations("Sponsor");

  return (
    <section
      aria-labelledby="activations-heading"
      className="w-full py-12 lg:py-20 bg-card/20"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-14 space-y-3">
          <SectionTitle id="activations-heading">
            {t("activations.title")}
          </SectionTitle>
          <SectionSubtitle>{t("activations.subtitle")}</SectionSubtitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
          {activations.map((key) => (
            <div
              key={key}
              className="flex items-start gap-3 p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
            >
              <CheckCircle2
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-foreground leading-snug">
                {t(key as Parameters<typeof t>[0])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
