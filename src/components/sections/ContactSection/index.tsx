"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useContactSection } from "./useContactSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, AlertCircle } from "lucide-react";

/* ──────────────────────────────────────────────
   Inline Field Error Component
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
   Main Section
   ────────────────────────────────────────────── */
export const ContactSection = () => {
  const t = useTranslations("Contact");
  const {
    sectionRef,
    formRef,
    register,
    errors,
    isSubmitting,
    handleSubmit,
  } = useContactSection();

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative w-full py-24 lg:py-40 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* ── Left Content ── */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2
                id="contact-heading"
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground"
              >
                {t("title")}
              </h2>
              <p className="text-xl md:text-2xl text-primary font-bold italic max-w-lg">
                {t("subtitle")}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
              <p className="text-lg font-medium text-muted-foreground">
                {t("info.email")}:{" "}
                <a
                  href="mailto:incinera@cin.ufpe.br"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  incinera@cin.ufpe.br
                </a>
              </p>
              <p className="text-lg font-medium text-muted-foreground">
                {t("info.location")}: <span className="text-foreground">{t("info.campus")}</span>
              </p>
            </div>
          </div>

          {/* ── Right Form ── */}
          <div className="relative">
            {/* Decorative glow */}
            <div
              className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"
              aria-hidden="true"
            />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-label={t("form.ariaLabel")}
              className="relative p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl space-y-6"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">{t("form.name")}</Label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    placeholder={t("form.placeholders.name")}
                    aria-required="true"
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    aria-invalid={!!errors.name}
                    className={`bg-background h-12 transition-colors ${
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-border focus-visible:ring-primary"
                    }`}
                    {...register("name")}
                  />
                  <FieldError
                    id="contact-name-error"
                    message={errors.name?.message}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">{t("form.email")}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("form.placeholders.email")}
                    aria-required="true"
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
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
                    id="contact-email-error"
                    message={errors.email?.message}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <Label htmlFor="contact-subject">{t("form.subject")}</Label>
                <Input
                  id="contact-subject"
                  placeholder={t("form.placeholders.subject")}
                  aria-required="true"
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                  aria-invalid={!!errors.subject}
                  className={`bg-background h-12 transition-colors ${
                    errors.subject
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-border focus-visible:ring-primary"
                  }`}
                  {...register("subject")}
                />
                <FieldError
                  id="contact-subject-error"
                  message={errors.subject?.message}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">{t("form.message")}</Label>
                <Textarea
                  id="contact-message"
                  rows={4}
                  placeholder={t("form.placeholders.message")}
                  aria-required="true"
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  aria-invalid={!!errors.message}
                  className={`bg-background resize-none transition-colors ${
                    errors.message
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-border focus-visible:ring-primary"
                  }`}
                  {...register("message")}
                />
                <FieldError
                  id="contact-message-error"
                  message={errors.message?.message}
                />
              </div>

              {/* Submit */}
              <Button
                id="contact-submit"
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="w-full h-12 sm:h-14 text-sm sm:text-lg font-bold uppercase tracking-wider sm:tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground group disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin"
                      aria-hidden="true"
                    />
                    {t("form.submitting")}
                  </>
                ) : (
                  <>
                    {t("form.submit")}
                    <Send
                      className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
