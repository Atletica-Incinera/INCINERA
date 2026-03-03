"use client";

import { useTranslations } from "next-intl";
import { ValuePillarCard } from "@/components/ui/ValuePillarCard";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
import { pillars } from "./sponsorData";

interface SponsorPillarsProps {
  pillarsRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * SponsorPillars — seção "Por que investir?" com 4 pilares de valor.
 * O ref é usado pelo useSponsorPage para animar via GSAP ScrollTrigger.
 */
export const SponsorPillars = ({ pillarsRef }: SponsorPillarsProps) => {
  const t = useTranslations("Sponsor");

  return (
    <section aria-labelledby="pillars-heading" className="w-full py-20 lg:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-3">
          <SectionTitle id="pillars-heading">{t("pillars.title")}</SectionTitle>
          <SectionSubtitle>{t("pillars.subtitle")}</SectionSubtitle>
        </div>

        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <ValuePillarCard.Root key={pillar.titleKey}>
                <ValuePillarCard.Icon>
                  <Icon />
                </ValuePillarCard.Icon>
                <ValuePillarCard.Title>
                  {t(pillar.titleKey as Parameters<typeof t>[0])}
                </ValuePillarCard.Title>
                <ValuePillarCard.Body>
                  {t(pillar.descKey as Parameters<typeof t>[0])}
                </ValuePillarCard.Body>
              </ValuePillarCard.Root>
            );
          })}
        </div>
      </div>
    </section>
  );
};
