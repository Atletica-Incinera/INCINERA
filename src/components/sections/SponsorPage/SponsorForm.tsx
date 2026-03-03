"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
import { Send, Loader2, Flame } from "lucide-react";
import { FieldError } from "./FieldError";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SponsorFormData } from "./sponsorSchema";

interface SponsorFormProps {
  formRef: React.RefObject<HTMLFormElement | null>;
  formSectionRef: React.RefObject<HTMLElement | null>;
  register: UseFormRegister<SponsorFormData>;
  errors: FieldErrors<SponsorFormData>;
  isSubmitting: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

/**
 * SponsorForm — seção de conversão com formulário de proposta de patrocínio.
 * Inclui validação acessível via react-hook-form, FieldError e ARIA labels.
 * Animações de entrada controladas pelo useSponsorPage via formRef.
 */
export const SponsorForm = ({
  formRef,
  formSectionRef,
  register,
  errors,
  isSubmitting,
  onSubmit,
}: SponsorFormProps) => {
  const t = useTranslations("Sponsor");

  return (
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
          <SectionTitle id="form-heading">{t("form.title")}</SectionTitle>
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
            onSubmit={onSubmit}
            noValidate
            aria-label={t("ariaLabels.form")}
            className="relative p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl space-y-8"
          >
            {/* Row 1: Nome Fantasia + Nome Responsável */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label htmlFor="sponsor-email" className="text-sm font-semibold">
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

            {/* Row 3: Visão da Parceria */}
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
  );
};
