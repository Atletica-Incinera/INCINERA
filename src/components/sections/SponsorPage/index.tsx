"use client";

import { useSponsorPage } from "./useSponsorPage";
import { SectionSeparator } from "@/components/ui/SectionSeparator";

import { SponsorHero } from "./SponsorHero";
import { SponsorStats } from "./SponsorStats";
import { SponsorPillars } from "./SponsorPillars";
import { SponsorActivations } from "./SponsorActivations";
import { SponsorAudience } from "./SponsorAudience";
import { SponsorImpactBanner } from "./SponsorImpactBanner";
import { SponsorForm } from "./SponsorForm";

/**
 * SponsorPage — página de patrocínio da Atlética Incinera.
 *
 * Atua como orquestrador: gerencia estado e refs via useSponsorPage
 * e distribui os dados para cada seção especializada.
 *
 * Estrutura:
 *   1. SponsorHero          — Hero com CTA de scroll
 *   2. SponsorStats         — 4 estatísticas animadas
 *   3. SponsorPillars       — 4 pilares de valor
 *   4. SponsorActivations   — 8 ativações de patrocínio
 *   5. SponsorAudience      — Employer branding / perfis
 *   6. SponsorImpactBanner  — Citação de impacto
 *   7. SponsorForm          — Formulário de conversão
 */
export const SponsorPage = () => {
  const {
    heroRef,
    pillarsRef,
    formRef,
    formSectionRef,
    statsRef,
    register,
    errors,
    isSubmitting,
    handleSubmit,
    scrollToForm,
  } = useSponsorPage();

  return (
    <div className="flex flex-col w-full bg-background">
      {/* 1. Hero */}
      <SponsorHero heroRef={heroRef} onScrollToForm={scrollToForm} />

      {/* 2. Stats */}
      <SponsorStats statsRef={statsRef} />

      <SectionSeparator
        variant="glow-line"
        className="container mx-auto px-6 md:px-12 py-8"
      />

      {/* 3. Por que investir — 4 Pilares */}
      <SponsorPillars pillarsRef={pillarsRef} />

      <SectionSeparator variant="angled-scar" className="my-[-20px] z-10" />

      {/* 4. Ativações */}
      <SponsorActivations />

      <SectionSeparator variant="ember-drift" className="py-4" />

      {/* 5. Audiência — Employer Branding */}
      <SponsorAudience />

      <SectionSeparator variant="flame-peak" className="z-20" />

      {/* 6. Impact Quote Banner */}
      <SponsorImpactBanner />

      {/* 7. Formulário de Conversão */}
      <SponsorForm
        formRef={formRef}
        formSectionRef={formSectionRef}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
