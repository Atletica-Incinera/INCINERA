import { z } from "zod";

/**
 * Zod schema for the contact form.
 * Validation messages are supplied at runtime using i18n keys,
 * so we export a factory that receives the translation function.
 */
export const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, t("validation.name.required"))
      .min(3, t("validation.name.min")),
    email: z
      .string()
      .min(1, t("validation.email.required"))
      .email(t("validation.email.invalid")),
    subject: z
      .string()
      .min(1, t("validation.subject.required"))
      .min(5, t("validation.subject.min")),
    message: z
      .string()
      .min(1, t("validation.message.required"))
      .min(20, t("validation.message.min"))
      .max(1000, t("validation.message.max")),
  });

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
