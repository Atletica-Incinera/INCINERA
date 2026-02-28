"use client";

import { useRef, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createContactSchema, type ContactFormData } from "./contactSchema";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useContactSection = () => {
  const t = useTranslations("Contact");
  const locale = useLocale();

  // Build the Zod schema with i18n messages
  const schema = createContactSchema((key) => t(key as Parameters<typeof t>[0]));

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched", // validate on blur, then re-validate on change
  });

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading(t("toast.loading"));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      toast.success(t("toast.success.title"), {
        id: toastId,
        description: t("toast.success.description"),
        duration: 6000,
      });

      reset();
    } catch (err) {
      console.error("[Contact] Submit error:", err);
      toast.error(t("toast.error.title"), {
        id: toastId,
        description: t("toast.error.description"),
        duration: 8000,
      });
    }
  };

  return {
    sectionRef,
    formRef,
    register,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    handleSubmit: rhfHandleSubmit(onSubmit),
  };
};
