"use client";

import { useTranslations } from "next-intl";
import { StatCard } from "@/components/ui/StatCard";
import { stats } from "./sponsorData";

interface SponsorStatsProps {
  statsRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * SponsorStats — grid de 4 StatCards com animação de contador GSAP.
 * O ref é controlado pelo useSponsorPage para animar os [data-count] elements.
 */
export const SponsorStats = ({ statsRef }: SponsorStatsProps) => {
  const t = useTranslations("Sponsor");

  return (
    <section aria-label={t("ariaLabels.stats")} className="w-full py-12">
      <div
        ref={statsRef}
        className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.labelKey}
            countValue={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
            label={t(stat.labelKey as Parameters<typeof t>[0])}
          />
        ))}
      </div>
    </section>
  );
};
