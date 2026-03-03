"use client";

import { useRef, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSponsorSchema, type SponsorFormData } from "./sponsorSchema";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useSponsorPage = () => {
  const t = useTranslations("Sponsor");
  const locale = useLocale();

  const schema = createSponsorSchema((key) =>
    t(key as Parameters<typeof t>[0]),
  );

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<SponsorFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-animate"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
        );
      }

      // Pillars fade-in
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.querySelectorAll(".pillar-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll("[data-count]");
        counters.forEach((el) => {
          const target = Number(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") ?? "";
          const prefix = el.getAttribute("data-prefix") ?? "";
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counter.val).toLocaleString("pt-BR")}${suffix}`;
            },
          });
        });
      }

      // Form slide-in
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: SponsorFormData) => {
    const toastId = toast.loading(t("toast.loading"));

    try {
      const res = await fetch("/api/sponsorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success(t("toast.success.title"), {
        id: toastId,
        description: t("toast.success.description"),
        duration: 8000,
      });

      reset();
    } catch (err) {
      console.error("[Sponsor] Submit error:", err);
      toast.error(t("toast.error.title"), {
        id: toastId,
        description: t("toast.error.description"),
        duration: 8000,
      });
    }
  };

  return {
    heroRef,
    pillarsRef,
    formRef,
    formSectionRef,
    statsRef,
    register,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    handleSubmit: rhfHandleSubmit(onSubmit),
    scrollToForm,
  };
};
