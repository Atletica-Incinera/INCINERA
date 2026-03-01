import { z } from "zod";
import { socialLinksSchema } from "./social-links.schema";

export const partnerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  logoPath: z.string().min(1),
  url: z.string().url().optional(),
  description: z.string().optional(), // Legacy fallback, prefer i18n
  socialLinks: socialLinksSchema.optional(),
});

export type Partner = z.infer<typeof partnerSchema>;
