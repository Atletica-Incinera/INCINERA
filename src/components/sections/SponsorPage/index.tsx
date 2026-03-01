"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useSponsorPage } from "./useSponsorPage";

// ── Design System Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ValuePillarCard } from "@/components/ui/ValuePillarCard";
import { StatCard } from "@/components/ui/StatCard";
import { SectionSeparator } from "@/components/ui/SectionSeparator";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";

import {
  Send,
  Loader2,
  AlertCircle,
  Target,
  Flame,
  Smartphone,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  Brain,
  BarChart3,
  Palette,
  Shield,
  Cloud,
  ArrowRight,
} from "lucide-react";

/* ──────────────────────────────────────────────
   FieldError Sub-Component
   ────────────────────────────────────────────── */
interface FieldErrorProps {
  message?: string;
  id: string;
}

const FieldError = ({ message, id }: FieldErrorProps) => {
  if (!message) return null;
  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className="flex items-center gap-1.5 mt-1.5 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Data: Pillars of Value
   ────────────────────────────────────────────── */
const pillars = [
  {
    icon: Target,
    titleKey: "pillars.talent.title",
    descKey: "pillars.talent.desc",
  },
  {
    icon: Flame,
    titleKey: "pillars.regional.title",
    descKey: "pillars.regional.desc",
  },
  {
    icon: Smartphone,
    titleKey: "pillars.reach.title",
    descKey: "pillars.reach.desc",
  },
  {
    icon: Calendar,
    titleKey: "pillars.presence.title",
    descKey: "pillars.presence.desc",
  },
];

/* ──────────────────────────────────────────────
   Data: Activations
   ────────────────────────────────────────────── */
const activations = [
  "activations.uniforms",
  "activations.banners",
  "activations.instagram",
  "activations.events",
  "activations.competitions",
  "activations.website",
  "activations.newsletters",
  "activations.equipment",
];

/* ──────────────────────────────────────────────
   Data: Stats
   ────────────────────────────────────────────── */
const stats = [
  { value: 30000, suffix: "+", prefix: "", labelKey: "stats.impressions" },
  { value: 5, suffix: "°", prefix: "Top ", labelKey: "stats.ranking" },
  { value: 3, suffix: "", prefix: "", labelKey: "stats.courses" },
  { value: 100, suffix: "%", prefix: "", labelKey: "stats.events" },
];

/* ──────────────────────────────────────────────
   Data: Target Profiles
   ────────────────────────────────────────────── */
const profiles = [
  { icon: Code2, labelKey: "audience.profiles.fullstack" },
  { icon: Brain, labelKey: "audience.profiles.aiml" },
  { icon: BarChart3, labelKey: "audience.profiles.data" },
  { icon: Palette, labelKey: "audience.profiles.ux" },
  { icon: Shield, labelKey: "audience.profiles.security" },
  { icon: Cloud, labelKey: "audience.profiles.cloud" },
];

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */
export const SponsorPage = () => {
  const t = useTranslations("Sponsor");
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
      {/* ════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════ */}
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

          {/* Sub */}
          <p className="hero-animate text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              id="sponsor-hero-cta"
              onClick={scrollToForm}
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
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background))",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ════════════════════════════════════════
          2. STATS
          ════════════════════════════════════════ */}
      <section aria-label={t("ariaLabels.stats")} className="w-full py-12">
        <div
          ref={statsRef}
          className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              countValue={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={t(stat.labelKey as Parameters<typeof t>[0])}
            />
          ))}
        </div>
      </section>

      <SectionSeparator variant="glow-line" className="container mx-auto px-6 md:px-12 py-8" />

      {/* ════════════════════════════════════════
          3. WHY INVEST — 4 PILLARS
          ════════════════════════════════════════ */}
      <section
        aria-labelledby="pillars-heading"
        className="w-full py-20 lg:py-28"
      >
        <div className="container mx-auto px-6 md:px-12">
          {/* Section header — matches the site pattern */}
          <div className="text-center mb-16 space-y-3">
            <SectionTitle id="pillars-heading">
              {t("pillars.title")}
            </SectionTitle>
            <SectionSubtitle>
              {t("pillars.subtitle")}
            </SectionSubtitle>
          </div>

          {/* Grid of ValuePillarCards */}
          <div
            ref={pillarsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <ValuePillarCard.Root key={i}>
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

      <SectionSeparator variant="angled-scar" className="my-[-20px] z-10" />

      {/* ════════════════════════════════════════
          4. ACTIVATIONS
          ════════════════════════════════════════ */}
      <section
        aria-labelledby="activations-heading"
        className="w-full py-12 lg:py-20 bg-card/20"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-14 space-y-3">
            <SectionTitle id="activations-heading">
              {t("activations.title")}
            </SectionTitle>
            <SectionSubtitle>
              {t("activations.subtitle")}
            </SectionSubtitle>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {activations.map((key, i) => (
              <div
                key={i}
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

      <SectionSeparator variant="ember-drift" className="py-4" />

      {/* ════════════════════════════════════════
          5. AUDIENCE — EMPLOYER BRANDING
          ════════════════════════════════════════ */}
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
                href="https://portosdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary font-semibold group transition-colors"
              >
                {t("audience.portDigitalLink")}
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right: profile cards following MemberCard spacing pattern */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {profiles.map((profile, i) => {
                const Icon = profile.icon;
                return (
                  <div
                    key={i}
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

      <SectionSeparator variant="flame-peak" className="z-20" />

      {/* ════════════════════════════════════════
          6. IMPACT QUOTE BANNER
          ════════════════════════════════════════ */}
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
            {["INTERENG", "JUPS", "UFPE"].map((event) => (
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

      {/* ════════════════════════════════════════
          7. FORM — CONVERSION
          ════════════════════════════════════════ */}
      <section
        id="formulario-patrocinio"
        ref={formSectionRef}
        aria-labelledby="form-heading"
        className="w-full py-20 lg:py-28"
        style={{ scrollMarginTop: "100px" }}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          {/* Section header */}
          <div className="text-center mb-14 space-y-4">
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase border-primary/30 bg-primary/10 text-primary rounded-full"
              >
                <Flame className="w-3.5 h-3.5" />
                {t("form.badge")}
              </Badge>
            </div>
            <SectionTitle id="form-heading">
              {t("form.title")}
            </SectionTitle>
            <SectionSubtitle className="max-w-2xl mx-auto">
              {t("form.subtitle")}
            </SectionSubtitle>
          </div>

          {/* Form card */}
          <div className="relative">
            {/* Ambient glow behind card */}
            <div
              className="absolute inset-0 -z-10 scale-75 blur-3xl rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)] opacity-15"
              aria-hidden="true"
            />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-label={t("ariaLabels.form")}
              className="relative p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl space-y-8"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Fantasia */}
                <div className="space-y-2">
                  <Label
                    htmlFor="sponsor-nome-fantasia"
                    className="text-sm font-semibold"
                  >
                    {t("form.fields.nomeFantasia.label")}
                  </Label>
                  <Input
                    id="sponsor-nome-fantasia"
                    autoComplete="organization"
                    placeholder={t("form.fields.nomeFantasia.placeholder")}
                    aria-required="true"
                    aria-describedby={
                      errors.nomeFantasia
                        ? "sponsor-nome-fantasia-error"
                        : undefined
                    }
                    aria-invalid={!!errors.nomeFantasia}
                    className={`bg-background h-12 transition-colors ${
                      errors.nomeFantasia
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-border focus-visible:ring-primary"
                    }`}
                    {...register("nomeFantasia")}
                  />
                  <FieldError
                    id="sponsor-nome-fantasia-error"
                    message={errors.nomeFantasia?.message}
                  />
                </div>

                {/* Nome Responsável */}
                <div className="space-y-2">
                  <Label
                    htmlFor="sponsor-nome-responsavel"
                    className="text-sm font-semibold"
                  >
                    {t("form.fields.nomeResponsavel.label")}
                  </Label>
                  <Input
                    id="sponsor-nome-responsavel"
                    autoComplete="name"
                    placeholder={t("form.fields.nomeResponsavel.placeholder")}
                    aria-required="true"
                    aria-describedby={
                      errors.nomeResponsavel
                        ? "sponsor-nome-responsavel-error"
                        : undefined
                    }
                    aria-invalid={!!errors.nomeResponsavel}
                    className={`bg-background h-12 transition-colors ${
                      errors.nomeResponsavel
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-border focus-visible:ring-primary"
                    }`}
                    {...register("nomeResponsavel")}
                  />
                  <FieldError
                    id="sponsor-nome-responsavel-error"
                    message={errors.nomeResponsavel?.message}
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="sponsor-email"
                  className="text-sm font-semibold"
                >
                  {t("form.fields.email.label")}
                </Label>
                <Input
                  id="sponsor-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("form.fields.email.placeholder")}
                  aria-required="true"
                  aria-describedby={
                    errors.email ? "sponsor-email-error" : undefined
                  }
                  aria-invalid={!!errors.email}
                  className={`bg-background h-12 transition-colors ${
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-border focus-visible:ring-primary"
                  }`}
                  {...register("email")}
                />
                <FieldError
                  id="sponsor-email-error"
                  message={errors.email?.message}
                />
              </div>

              {/* Row 3: Vision textarea */}
              <div className="space-y-2">
                <Label
                  htmlFor="sponsor-visao-parceria"
                  className="text-sm font-semibold"
                >
                  {t("form.fields.visaoParceria.label")}
                </Label>
                <Textarea
                  id="sponsor-visao-parceria"
                  rows={6}
                  placeholder={t("form.fields.visaoParceria.placeholder")}
                  aria-required="true"
                  aria-describedby={
                    errors.visaoParceria
                      ? "sponsor-visao-error"
                      : "sponsor-visao-hint"
                  }
                  aria-invalid={!!errors.visaoParceria}
                  className={`bg-background resize-none transition-colors ${
                    errors.visaoParceria
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-border focus-visible:ring-primary"
                  }`}
                  {...register("visaoParceria")}
                />
                <p
                  id="sponsor-visao-hint"
                  className="text-xs text-muted-foreground"
                >
                  {t("form.fields.visaoParceria.hint")}
                </p>
                <FieldError
                  id="sponsor-visao-error"
                  message={errors.visaoParceria?.message}
                />
              </div>

              {/* Privacy */}
              <p className="text-xs text-muted-foreground text-center">
                {t("form.privacy")}
              </p>

              {/* Submit */}
              <Button
                id="sponsor-submit"
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                size="lg"
                className="w-full h-14 text-sm font-bold uppercase tracking-widest group disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="mr-2 h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    {t("form.submitting")}
                  </>
                ) : (
                  <>
                    {t("form.submit")}
                    <Send
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
