import { z } from "zod";
import { socialLinksSchema } from "./social-links.schema";

/**
 * Cursos disponíveis:
 * ec = Engenharia da Computação
 * cc = Ciência da Computação
 * si = Sistemas de Informação
 * ia = Inteligência Artificial
 */
export const COURSES = ["ec", "cc", "si", "ia"] as const;

/**
 * Cargos possíveis na diretoria:
 * president, vicePresident, director, viceDirector, member
 */
export const MEMBER_ROLES = [
  "president",
  "vicePresident",
  "director",
  "viceDirector",
  "member",
] as const;

/**
 * Diretorias possíveis:
 * comunicacao, esportes, financeiro, eventos, produtos
 */
export const DIRECTORIES = [
  "comunicacao",
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
  /** Cloudinary public ID or direct Cloudinary URL */
  photo: z.string().min(1),
  photoLarge: z.string().optional(),
  heroBadge: z.string().min(1).max(60).optional(),
  bio: z.string().max(200).default(""),
  course: z.enum(COURSES),
  directoryId: z.enum(DIRECTORIES).optional(),
  emailCin: z.string().email(),
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
