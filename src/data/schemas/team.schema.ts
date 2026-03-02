import { z } from "zod";
import { COURSES } from "./member.schema";

// ─── Sports & Categories ─────────────────────────────────────────────────────

/**
 * Modalidades disponíveis no formulário de atletas.
 * Usado como chave estável internamente (nunca exposto ao usuário diretamente).
 */
export const SPORTS = ["futsal", "volei", "handebol", "basquete"] as const;
export type Sport = (typeof SPORTS)[number];

/**
 * Categorias de gênero para cada modalidade.
 */
export const CATEGORIES = ["masculino", "feminino"] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Chave composta de time: <sport>-<category>
 * Ex: "futsal-masculino", "volei-feminino"
 */
export const TEAM_KEYS = [
  "futsal-masculino",
  "futsal-feminino",
  "volei-masculino",
  "volei-feminino",
  "handebol-masculino",
  "handebol-feminino",
  "basquete-masculino",
  "basquete-feminino",
] as const;
export type TeamKey = (typeof TEAM_KEYS)[number];

// ─── Social Link ──────────────────────────────────────────────────────────────

/**
 * Tipos de rede social disponíveis no formulário de atletas.
 * Um atleta compartilha apenas UM link.
 */
export const ATHLETE_SOCIAL_TYPES = [
  "instagram",
  "github",
  "linkedin",
  "personalWebsite",
  "twitter",
] as const;
export type AthleteSocialType = (typeof ATHLETE_SOCIAL_TYPES)[number];

export const athleteSocialLinkSchema = z.object({
  type: z.enum(ATHLETE_SOCIAL_TYPES),
  url: z.string().url(),
});

// ─── Athlete ──────────────────────────────────────────────────────────────────

export const athleteSchema = z.object({
  id: z.string().min(1),
  /** Primeiro nome + sobrenome (ex.: "João Ferreira") */
  name: z.string().min(2),
  /** Cloudinary public ID da foto */
  photo: z.string().min(1),
  course: z.enum(COURSES).optional(),
  /** Lista de teamKeys em que o atleta participa (um atleta pode jogar mais de uma modalidade) */
  teamKeys: z.array(z.enum(TEAM_KEYS)).min(1),
  /** Um único link social, conforme escolhido pelo atleta */
  socialLink: athleteSocialLinkSchema.optional(),
  emailCin: z.string().email().optional(),
});

// ─── Team ─────────────────────────────────────────────────────────────────────

export const teamSchema = z.object({
  /** Chave composta: "futsal-masculino", "volei-feminino", etc. */
  key: z.enum(TEAM_KEYS),
  athletes: z.array(athleteSchema),
});

// ─── Exported types ──────────────────────────────────────────────────────────

export type AthleteSocialLink = z.infer<typeof athleteSocialLinkSchema>;
export type Athlete = z.infer<typeof athleteSchema>;
export type Team = z.infer<typeof teamSchema>;
