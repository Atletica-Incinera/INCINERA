import { z } from "zod";

export const createSponsorSchema = (t: (key: string) => string) =>
  z.object({
    nomeFantasia: z.string().min(1, t("validation.nomeFantasia.required")),
    nomeResponsavel: z
      .string()
      .min(1, t("validation.nomeResponsavel.required"))
      .min(3, t("validation.nomeResponsavel.min")),
    email: z
      .string()
      .min(1, t("validation.email.required"))
      .email(t("validation.email.invalid")),
    visaoParceria: z
      .string()
      .min(1, t("validation.visaoParceria.required"))
      .min(20, t("validation.visaoParceria.min"))
      .max(1000, t("validation.visaoParceria.max")),
  });

export type SponsorFormData = z.infer<ReturnType<typeof createSponsorSchema>>;
