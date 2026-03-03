/**
 * Directory data loader.
 *
 * Fetches member data from Google Sheets and maps rows to the Member schema.
 *
 * Spreadsheet columns (0-indexed, row starting at A):
 *   0  (A) - Carimbo de data/hora (Timestamp)
 *   1  (B) - Nome completo
 *   2  (C) - E-mail CIn (ex.: nome@cin.ufpe.br)
 *   3  (D) - Curso
 *   4  (E) - Qual diretoria você faz parte?
 *   5  (F) - Qual o cargo que ocupa?
 *   6  (G) - LinkedIn (link)
 *   7  (H) - GitHub (link)
 *   8  (I) - Instagram (link)
 *   9  (J) - Site pessoal (link completo)
 *   10 (K) - X/Twitter (link completo)
 *   11 (L) - Bio (máx. 200 caracteres)
 *   12 (M) - Hero Badge (ex.: "Full Stack Developer")
 *   13 (N) - Foto (Google Drive — NÃO utilizar)
 *   14 (O) - Coluna 1 → Cloudinary public ID da foto
 *            (ex.: "profile_image_-_AtlÃ©tica_InCInera_up9fns")
 *
 * Course values from the form:
 *   "Ciência da Computação" → "cc"
 *   "Engenharia da Computação" → "ec"
 *   "Sistemas de Informação" → "si"
 *   "Inteligência Artificial" → "ia"
 *
 * Directory values from the form:
 *   "Financeiro"  → "financeiro"
 *   "Comunicação" → "comunicacao"
 *   "Eventos"     → "eventos"
 *   "Produtos"    → "produtos"
 *   "Esportes"    → "esportes"
 *
 * Role values from the form:
 *   "Presidente"      → "president"
 *   "Vice-Presidente" → "vicePresident"
 *   "Diretor"         → "director"
 *   "Vice-Diretor"    → "viceDirector"
 *   "Membro"          → "member"
 */

import { fetchSheetRows, cell } from "./sheets.client";
import {
  memberSchema,
  directorySchema,
  executiveBoardSchema,
} from "../schemas/member.schema";
import type {
  Member,
  Directory,
  ExecutiveBoard,
} from "../schemas/member.schema";
import { directoriesData as staticDirectories } from "../directory";
import { logger } from "@/lib/logger";

const RANGE = "'Respostas ao formulário 1'!A2:Z";

const PLACEHOLDER_PHOTO = "placeholders/default";

// ─── Exact-match parse maps ──────────────────────────────────────────────────

const COURSE_MAP: Record<string, "cc" | "ec" | "si" | "ia"> = {
  "Ciência da Computação": "cc",
  "Engenharia da Computação": "ec",
  "Sistemas de Informação": "si",
  "Inteligência Artificial": "ia",
};

const ROLE_MAP: Record<
  string,
  "president" | "vicePresident" | "director" | "viceDirector" | "member"
> = {
  Presidente: "president",
  "Vice-Presidente": "vicePresident",
  Diretor: "director",
  "Vice-Diretor": "viceDirector",
  Membro: "member",
};

const DIRECTORY_MAP: Record<
  string,
  "comunicacao" | "esportes" | "financeiro" | "eventos" | "produtos"
> = {
  Financeiro: "financeiro",
  Comunicação: "comunicacao",
  Eventos: "eventos",
  Produtos: "produtos",
  Esportes: "esportes",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseCourse(raw: string | undefined): "cc" | "ec" | "si" | "ia" {
  if (!raw) return "cc";
  return COURSE_MAP[raw.trim()] ?? "cc";
}

function parseRole(
  raw: string | undefined,
): "president" | "vicePresident" | "director" | "viceDirector" | "member" {
  if (!raw) return "member";
  return ROLE_MAP[raw.trim()] ?? "member";
}

function parseDirectory(
  raw: string | undefined,
):
  | "comunicacao"
  | "esportes"
  | "financeiro"
  | "eventos"
  | "produtos"
  | undefined {
  if (!raw) return undefined;
  return DIRECTORY_MAP[raw.trim()];
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

/**
 * Extracts the Cloudinary public ID from "Coluna 1" (column 14 / O).
 *
 * The form stores only the public ID — e.g. "profile_image_-_Atlética_InCInera_up9fns".
 * A full Cloudinary URL is also accepted (passed through as-is).
 * Google Drive links are rejected and fall back to the placeholder.
 */
function parsePhotoUrl(raw: string | undefined): string {
  if (!raw) return PLACEHOLDER_PHOTO;
  const trimmed = raw.trim();
  if (!trimmed) return PLACEHOLDER_PHOTO;

  // Full Cloudinary URL — return as-is (buildUrl will detect it)
  if (trimmed.includes("res.cloudinary.com")) return trimmed;

  // Reject Google Drive links
  if (trimmed.includes("drive.google.com")) return PLACEHOLDER_PHOTO;

  // Bare public ID — return as-is (memberPhotoUrl will build the full URL)
  return trimmed;
}

// ─── Row mapper ──────────────────────────────────────────────────────────────

function rowToMember(row: string[]): Member | null {
  try {
    const emailCin = cell(row, 2) ?? "";
    const id = emailCin
      ? emailCin.split("@")[0]
      : `member-${Math.random().toString(36).substr(2, 9)}`;

    const name = cell(row, 1) || "Membro";
    const role = parseRole(cell(row, 5));
    const course = parseCourse(cell(row, 3));
    const directoryId = parseDirectory(cell(row, 4));
    const photo = parsePhotoUrl(cell(row, 14)); // col 14 (O) = "Coluna 1" = Cloudinary public ID
    const bio = (cell(row, 11) ?? "").substring(0, 200);

    const heroBadge = cell(row, 12) ?? undefined;

    const raw = {
      id,
      name,
      role,
      course,
      photo,
      photoLarge: photo,
      heroBadge,
      bio,
      directoryId,
      emailCin,
      socialLinks: {
        linkedin: normalizeUrl(cell(row, 6)),
        github: normalizeUrl(cell(row, 7)),
        instagram: normalizeUrl(cell(row, 8)),
        personalWebsite: normalizeUrl(cell(row, 9)),
        twitter: normalizeUrl(cell(row, 10)),
      },
    };

    return memberSchema.parse(raw);
  } catch (err) {
    logger.warn(
      { event: "DIRECTORY_SKIP_INVALID_ROW", row, error: err },
      "[loadDirectory] Skipping invalid row",
    );
    return null;
  }
}

// ─── Grouper ─────────────────────────────────────────────────────────────────

const ALL_DIRECTORY_IDS = [
  "comunicacao",
  "esportes",
  "financeiro",
  "eventos",
  "produtos",
] as const;

function makePlaceholderMember(
  directoryId: (typeof ALL_DIRECTORY_IDS)[number],
): Member {
  return {
    id: `placeholder-dir-${directoryId}`,
    name: "A Definir",
    role: "director",
    course: "cc",
    photo: PLACEHOLDER_PHOTO,
    photoLarge: PLACEHOLDER_PHOTO,
    heroBadge: "Diretor(a)",
    bio: "",
    directoryId,
    emailCin: "contato@cin.ufpe.br",
    socialLinks: {},
  };
}

function groupIntoDirectories(members: Member[]): Directory[] {
  const map = new Map<string, Member[]>();
  for (const member of members) {
    const key = member.directoryId ?? "outros";
    map.set(key, [...(map.get(key) ?? []), member]);
  }

  const directories: Directory[] = [];

  for (const id of ALL_DIRECTORY_IDS) {
    const group = map.get(id) ?? [];
    const director = group.find((m) => m.role === "director");
    const viceDirector = group.find((m) => m.role === "viceDirector");
    const dirMembers = group.filter((m) => m.role === "member");

    const fallbackDirector = director ?? makePlaceholderMember(id);

    try {
      directories.push(
        directorySchema.parse({
          id,
          name: id,
          image: `directory/${id}`,
          director: fallbackDirector,
          viceDirector,
          members: dirMembers,
        }),
      );
    } catch (err) {
      logger.warn(
        { event: "DIRECTORY_INVALID_DIRECTORY", id, error: err },
        "[loadDirectory] Invalid directory",
      );
    }
  }

  return directories;
}

// ─── Shared rows fetcher (cached per-request) ─────────────────────────────────

/**
 * Fetches all member rows from Google Sheets once per request.
 * Both loadDirectories and loadExecutiveBoard reuse this result,
 * eliminating the duplicate API call that was causing double latency.
 */
async function fetchMemberRows(): Promise<string[][]> {
  try {
    const rows = await fetchSheetRows(RANGE);
    return rows;
  } catch (err) {
    logger.error(
      { event: "DIRECTORY_FETCH_FAILED", error: err },
      "[loadDirectory] Sheets fetch failed",
    );
    return [];
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function loadDirectories(): Promise<Directory[]> {
  const rows = await fetchMemberRows();
  if (rows.length === 0) {
    return staticDirectories as unknown as Directory[];
  }
  const members = rows.map(rowToMember).filter((m): m is Member => m !== null);
  return groupIntoDirectories(members);
}

export async function loadExecutiveBoard(): Promise<ExecutiveBoard> {
  const rows = await fetchMemberRows();
  if (rows.length === 0) {
    return { president: undefined, vicePresident: undefined };
  }
  const members = rows.map(rowToMember).filter((m): m is Member => m !== null);
  const president = members.find((m) => m.role === "president");
  const vicePresident = members.find((m) => m.role === "vicePresident");
  try {
    return executiveBoardSchema.parse({ president, vicePresident });
  } catch (err) {
    logger.error(
      { event: "DIRECTORY_EMPTY_BOARD", error: err },
      "[loadExecutiveBoard] Falling back to empty board",
    );
    return { president: undefined, vicePresident: undefined };
  }
}

/**
 * Carrega diretórios e board executivo em uma única request ao Google Sheets.
 * Use esta função na homepage para evitar chamadas duplicadas ao Sheets.
 *
 * @example
 * const { directories, executiveBoard } = await loadDirectoryData();
 */
export async function loadDirectoryData(): Promise<{
  directories: Directory[];
  executiveBoard: ExecutiveBoard;
}> {
  const rows = await fetchMemberRows();

  if (rows.length === 0) {
    return {
      directories: staticDirectories as unknown as Directory[],
      executiveBoard: { president: undefined, vicePresident: undefined },
    };
  }

  const members = rows.map(rowToMember).filter((m): m is Member => m !== null);

  const directories = groupIntoDirectories(members);
  const president = members.find((m) => m.role === "president");
  const vicePresident = members.find((m) => m.role === "vicePresident");

  let executiveBoard: ExecutiveBoard;
  try {
    executiveBoard = executiveBoardSchema.parse({ president, vicePresident });
  } catch {
    executiveBoard = { president: undefined, vicePresident: undefined };
  }

  return { directories, executiveBoard };
}
