import { z } from "zod";
import { socialLinksSchema } from "./social-links.schema";

export const SPORT_KEYS = [
  "sports.futsalMale",
  "sports.futsalFemale",
  "sports.volleyballMale",
  "sports.volleyballFemale",
  "sports.basketball",
  "sports.handball",
] as const;

export const athleteSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  imagePath: z.string().min(1),
  course: z.string().optional(), // i18n key or raw
  sports: z.array(z.string()),   // i18n keys
  socialLinks: socialLinksSchema.optional(),
});

export const teamSchema = z.object({
  id: z.string().min(1),
  sportKey: z.string().min(1), // i18n key, e.g. "sports.futsalMale"
  sportName: z.string().optional(),
  athletes: z.array(athleteSchema),
});

export type Athlete = z.infer<typeof athleteSchema>;
export type Team = z.infer<typeof teamSchema>;
