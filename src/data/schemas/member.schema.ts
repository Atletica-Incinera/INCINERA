import { z } from "zod";
import { socialLinksSchema } from "./social-links.schema";

export const COURSES = ["ec", "cc", "si", "es"] as const;
export const SPORTS = [
  "basquete",
  "volei",
  "natacao",
  "futsal",
  "futebol",
  "handebol",
  "esports",
] as const;
export const MEMBER_ROLES = [
  "president",
  "vicePresident",
  "director",
  "viceDirector",
  "member",
] as const;
export const DIRECTORIES = [
  "marketing",
  "esportes",
  "financeiro",
  "eventos",
  "produtos",
] as const;

export const memberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  role: z.enum(MEMBER_ROLES),
  roleLiteral: z.string().optional(),
  photo: z.string().min(1), // Can be a relative path or Cloudinary URL
  photoLarge: z.string().optional(),
  sports: z.array(z.string()), // i18n keys
  course: z.enum(COURSES),
  directoryId: z.enum(DIRECTORIES).optional(),
  socialLinks: socialLinksSchema,
});

export const directorySchema = z.object({
  id: z.enum(DIRECTORIES),
  name: z.string().min(1),
  image: z.string().min(1),
  director: memberSchema,
  viceDirector: memberSchema.optional(),
  members: z.array(memberSchema),
});

export const executiveBoardSchema = z.object({
  president: memberSchema.optional(),
  vicePresident: memberSchema.optional(),
});

export type Member = z.infer<typeof memberSchema>;
export type Directory = z.infer<typeof directorySchema>;
export type ExecutiveBoard = z.infer<typeof executiveBoardSchema>;
