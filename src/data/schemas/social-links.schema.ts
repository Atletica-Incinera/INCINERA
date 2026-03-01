import { z } from "zod";

export const socialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  email: z.string().email().optional(),
  github: z.string().optional(),
  website: z.string().url().optional(),
  personalWebsite: z.string().url().optional(),
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;
