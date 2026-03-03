"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/ui/typography";
import { Target, ChevronRight } from "lucide-react";
import { profiles } from "./sponsorData";

/**
 * SponsorAudience — seção de employer branding.
 * Layout split: texto à esquerda + grade de perfis de profissionais à direita.
 */
export const SponsorAudience = () => {
  const t = useTranslations("Sponsor");

  return (
    <section
      aria-labelledby="audience-heading"
      className="w-full py-16 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Left: text */}
          <div className="space-y-4 sm:space-y-6">
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase border-primary/30 bg-primary/10 text-primary rounded-full"
            >
              <Target className="w-3 h-3" />
              {t("audience.badge")}
            </Badge>

            <SectionTitle
              id="audience-heading"
              className="text-4xl sm:text-5xl md:text-7xl leading-[0.95] sm:leading-none"
            >
              {t("audience.title")}
            </SectionTitle>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              {t("audience.body")}
            </p>

            <a
              href="https://www.portodigital.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary font-semibold group transition-colors"
            >
              {t("audience.portDigitalLink")}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: profile cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <div
                  key={profile.labelKey}
                  className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground group-hover:text-foreground leading-tight transition-colors">
                    {t(profile.labelKey as Parameters<typeof t>[0])}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
