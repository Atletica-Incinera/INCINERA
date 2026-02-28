"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePartnersSection } from "./usePartnersSection";
import { sponsors, partners } from "@/data/partners";
import { ArrowRight } from "lucide-react";
import { SponsorDetailModal } from "./SponsorDetailModal";

export const PartnersSection = () => {
  const t = useTranslations("Partners");
  const { refs, state, actions } = usePartnersSection();

  return (
    <section
      id="partners"
      ref={refs.sectionRef}
      className="relative w-full py-24 lg:py-15 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
            {t("title")}
          </h2>
          <p className="text-xl md:text-2xl text-primary font-bold italic">
            {t("subtitle")}
          </p>
        </div>

        {/* Patrocinadores (Main Sponsors) */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-muted-foreground uppercase tracking-widest text-center mb-12">
            {t("sponsorsHeading")}
          </h3>
          <div
            ref={refs.sponsorsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            {sponsors.map((sponsor) => (
              <button
                key={sponsor.id}
                onClick={() => actions.handlePartnerClick(sponsor)}
                aria-label={t("common.viewSponsor", { name: sponsor.name })}
                className="group relative block aspect-video bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center p-12 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={sponsor.logoPath}
                    alt={sponsor.name}
                    width={240}
                    height={120}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parceiros (Partners) */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-muted-foreground/60 uppercase tracking-widest text-center mb-8">
            {t("partnersHeading")}
          </h3>
          <div
            ref={refs.partnersRef}
            className="flex flex-wrap justify-center gap-6"
          >
            {partners.map((partner) => (
              <button
                key={partner.id}
                onClick={() => actions.handlePartnerClick(partner)}
                aria-label={t("common.viewPartner", { name: partner.name })}
                className="group relative block w-full max-w-[140px] aspect-square bg-card/50 border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 cursor-pointer hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute inset-0 flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={partner.logoPath}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA — Seja um Apoiador */}
        <div className="relative rounded-3xl border border-primary/20 bg-primary/5 p-10 md:p-14 text-center overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,var(--color-primary)_0%,transparent_70%)] opacity-10"
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
              {t("cta.heading")}
            </h3>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("cta.body")}
            </p>
            <Link
              href="/seja-patrocinador"
              id="partners-sponsor-cta"
              className="inline-flex items-center gap-2 mt-4 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm group transition-all duration-300 hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 cursor-pointer"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <SponsorDetailModal
        partner={state.selectedPartner}
        isOpen={!!state.selectedPartner}
        onClose={actions.handleCloseModal}
      />
    </section>
  );
};
