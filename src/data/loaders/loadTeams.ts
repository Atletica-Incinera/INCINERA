/**
 * Athlete / Team data loader.
 *
 * Fetches athletes from Google Sheets (GOOGLE_SHEETS_ATHLETS_ID) and
 * groups them into Team objects by sport + category.
 * Falls back to static data in src/data/teams.ts if the API is unavailable.
 *
 * Spreadsheet columns (0-indexed, "Respostas ao formulário 1"):
 *   0  (A) - Carimbo de data/hora
 *   1  (B) - Nome Completo
 *   2  (C) - E-mail CIn
 *   3  (D) - Curso
 *   4  (E) - Modalidade (pode selecionar mais de uma, separado por vírgula)
 *   5  (F) - Categoria (Masculino / Feminino)
 *   6  (G) - Rede social escolhida (Instagram / Github / Linkedin / Site pessoal / X/Twitter)
 *   7  (H) - Link da conta
 *   8  (I) - Foto Drive (IGNORADO)
 *   9–20   - Dados pessoais (IGNORADOS — não exibidos no front-end)
 *   21 (V) - Cloudinary public ID da foto ("Coluna 22")
 *
 * Course values (form → internal key):
 *   "Ciência da Computação"   → "cc"
 *   "Engenharia da Computação" → "ec"
 *   "Sistemas de Informação"  → "si"
 *   "Inteligência Artificial" → "ia"
 *
 * Sport values (form → internal key):
 *   "Futsal"   → "futsal"
 *   "Vôlei"    → "volei"
 *   "Handebol" → "handebol"
 *   "Basquete" → "basquete"
 *
 * Category values (form → internal key):
 *   "Masculino" → "masculino"
 *   "Feminino"  → "feminino"
 *
 * Social link type (form → internal key):
 *   "Instagram"    → "instagram"
 *   "Github"       → "github"
 *   "Linkedin"     → "linkedin"
 *   "Site pessoal" → "personalWebsite"
 *   "X/Twitter"    → "twitter"
 */

import { fetchSheetRows, cell } from "./sheets.client";
import {
  athleteSchema,
  teamSchema,
  TEAM_KEYS,
  type Athlete,
  type Team,
  type TeamKey,
  type AthleteSocialType,
} from "../schemas/team.schema";
import { COURSES } from "../schemas/member.schema";
import { teams as staticTeams } from "../teams";
import { logger } from "@/lib/logger";

const RANGE = "'Respostas ao formulário 1'!A2:Z";

const PLACEHOLDER_PHOTO = "placeholders/default";

// ─── Parse maps ──────────────────────────────────────────────────────────────

const COURSE_MAP: Record<string, (typeof COURSES)[number]> = {
  "Ciência da Computação": "cc",
  "Engenharia da Computação": "ec",
  "Sistemas de Informação": "si",
  "Inteligência Artificial": "ia",
};

const SPORT_MAP: Record<string, "futsal" | "volei" | "handebol" | "basquete"> =
  {
    Futsal: "futsal",
    Vôlei: "volei",
    Handebol: "handebol",
    Basquete: "basquete",
  };

const CATEGORY_MAP: Record<string, "masculino" | "feminino"> = {
  Masculino: "masculino",
  Feminino: "feminino",
};

const SOCIAL_TYPE_MAP: Record<string, AthleteSocialType> = {
  Instagram: "instagram",
  Github: "github",
  Linkedin: "linkedin",
  "Site pessoal": "personalWebsite",
  "X/Twitter": "twitter",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseCourse(
  raw: string | undefined,
): (typeof COURSES)[number] | undefined {
  if (!raw) return undefined;
  return COURSE_MAP[raw.trim()];
}

/**
 * Parses the "Modalidade" field (can be multiple values separated by comma).
 * Returns an array of sport keys.
 */
function parseSports(
  raw: string | undefined,
): ("futsal" | "volei" | "handebol" | "basquete")[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => SPORT_MAP[s.trim()])
    .filter((s): s is "futsal" | "volei" | "handebol" | "basquete" => !!s);
}

function parseCategory(
  raw: string | undefined,
): "masculino" | "feminino" | undefined {
  if (!raw) return undefined;
  return CATEGORY_MAP[raw.trim()];
}

function parseSocialType(
  raw: string | undefined,
): AthleteSocialType | undefined {
  if (!raw) return undefined;
  return SOCIAL_TYPE_MAP[raw.trim()];
}

/**
 * Formats a full name to "Primeiro Sobrenome" (first + last name only).
 * "João Victor Soares Ferreira" → "João Ferreira"
 */
function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 2) return fullName.trim();
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

/**
 * Cloudinary public ID from "Coluna 22" (col 21 / V).
 * Rejects Google Drive links and returns placeholder for empty values.
 */
function parsePhoto(raw: string | undefined): string {
  if (!raw) return PLACEHOLDER_PHOTO;
  const trimmed = raw.trim();
  if (!trimmed) return PLACEHOLDER_PHOTO;
  if (trimmed.includes("drive.google.com")) return PLACEHOLDER_PHOTO;
  return trimmed;
}

function normalizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  if (trimmed.startsWith("@"))
    return `https://instagram.com/${trimmed.substring(1)}`;
  return undefined;
}

// ─── Row mapper ───────────────────────────────────────────────────────────────

/**
 * Maps a single spreadsheet row to an Athlete.
 * Returns null if the row is invalid (skipped with a warning).
 */
function rowToAthlete(row: string[]): Athlete | null {
  try {
    const emailCin = cell(row, 2);
    const id = emailCin
      ? emailCin.split("@")[0]
      : `athlete-${Math.random().toString(36).substring(2, 9)}`;

    const fullName = cell(row, 1) ?? "";
    const name = formatName(fullName);
    const course = parseCourse(cell(row, 3));
    const sports = parseSports(cell(row, 4));
    const category = parseCategory(cell(row, 5));
    const photo = parsePhoto(cell(row, 21)); // col 21 (V) = "Coluna 22"

    if (sports.length === 0 || !category) {
      logger.warn({ event: "TEAMS_SKIP_MISSING_SPORT_CATEGORY", name, sports, category }, "[loadTeams] Skipping row — missing sport or category");
      return null;
    }

    // Build teamKeys: one entry per sport+category combination
    const teamKeys = sports
      .map((sport): TeamKey | null => {
        const key = `${sport}-${category}` as TeamKey;
        return (TEAM_KEYS as readonly string[]).includes(key) ? key : null;
      })
      .filter((k): k is TeamKey => k !== null);

    if (teamKeys.length === 0) {
      logger.warn({ event: "TEAMS_SKIP_NO_VALID_TEAMKEYS", name, sports, category }, "[loadTeams] No valid teamKeys for row");
      return null;
    }

    // Social link: one optional link
    const socialTypeRaw = cell(row, 6);
    const socialUrl = normalizeUrl(cell(row, 7));
    const socialType = parseSocialType(socialTypeRaw);
    const socialLink =
      socialType && socialUrl
        ? { type: socialType, url: socialUrl }
        : undefined;

    return athleteSchema.parse({
      id,
      name,
      photo,
      course,
      teamKeys,
      socialLink,
      emailCin: emailCin || undefined,
    });
  } catch (err) {
    logger.warn({ event: "TEAMS_SKIP_INVALID_ROW", row, error: err }, "[loadTeams] Skipping invalid row");
    return null;
  }
}

// ─── Grouper ─────────────────────────────────────────────────────────────────

/**
 * Groups athletes into Team objects.
 * An athlete who plays 2 sports appears in 2 teams.
 * Only teams that have at least 1 athlete are returned.
 */
function groupIntoTeams(athletes: Athlete[]): Team[] {
  const map = new Map<TeamKey, Athlete[]>();

  for (const athlete of athletes) {
    for (const key of athlete.teamKeys) {
      map.set(key, [...(map.get(key) ?? []), athlete]);
    }
  }

  const teams: Team[] = [];
  for (const key of TEAM_KEYS) {
    const teamAthletes = map.get(key);
    if (!teamAthletes || teamAthletes.length === 0) continue;

    try {
      teams.push(teamSchema.parse({ key, athletes: teamAthletes }));
    } catch (err) {
      logger.warn({ event: "TEAMS_INVALID_TEAM", key, error: err }, "[loadTeams] Invalid team");
    }
  }
  return teams;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function loadTeams(): Promise<Team[]> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ATHLETS_ID;

  if (!spreadsheetId) {
    logger.warn({ event: "TEAMS_MISSING_ID" }, "[loadTeams] GOOGLE_SHEETS_ATHLETS_ID not set — using static fallback.");
    return staticTeams as unknown as Team[];
  }

  try {
    const rows = await fetchSheetRows(RANGE, spreadsheetId);

    if (rows.length === 0) {
      return staticTeams as unknown as Team[];
    }

    const athletes = rows
      .map(rowToAthlete)
      .filter((a): a is Athlete => a !== null);

    return groupIntoTeams(athletes);
  } catch (err) {
    logger.error({ event: "TEAMS_FETCH_FAILED", error: err }, "[loadTeams] Sheets fetch failed — using static fallback");
    return staticTeams as unknown as Team[];
  }
}
