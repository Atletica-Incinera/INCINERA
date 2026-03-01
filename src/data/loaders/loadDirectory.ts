/**
 * Directory data loader.
 *
 * Strategy:
 *   1. Try to fetch from Google Sheets (if GOOGLE_SHEETS_ID is set)
 *   2. Fall back to static data in src/data/directory.ts
 *
 * Google Sheet layout ("Diretoria" tab):
 *   Col A: id           (e.g. "dir-marketing-1")
 *   Col B: directoryId  (e.g. "marketing")
 *   Col C: name         (e.g. "Maria Oliveira")
 *   Col D: role         (e.g. "director")
 *   Col E: course       (e.g. "ec")
 *   Col F: sports       (comma-separated, e.g. "volei,natacao")
 *   Col G: photo        (Cloudinary public ID or full URL)
 *   Col H: instagram    (full URL)
 *   Col I: linkedin     (full URL)
 *   Col J: twitter      (full URL)
 *   Col K: email        (email address)
 *   Col L: github       (username)
 *   Col M: personalWebsite (full URL)
 */

import { fetchSheetRows, cell } from "./sheets.client";
import { memberSchema, directorySchema, executiveBoardSchema } from "../schemas/member.schema";
import type { Member, Directory, ExecutiveBoard } from "../types";

// Static fallback data
import { directoriesData as staticDirectories, executiveBoard as staticExecutiveBoard } from "../directory";

const RANGE = "Diretoria!A2:M";

function rowToMember(row: string[]): Member | null {
  try {
    const sports = cell(row, 5)?.split(",").map(s => s.trim()).filter(Boolean) ?? [];
    const raw = {
      id: cell(row, 0) ?? "",
      name: cell(row, 2) ?? "",
      role: cell(row, 3) ?? "member",
      course: cell(row, 4) ?? "cc",
      sports,
      photo: cell(row, 6) ?? "/images/directory/placeholder.webp",
      photoLarge: cell(row, 6),
      directoryId: cell(row, 1),
      socialLinks: {
        instagram: cell(row, 7),
        linkedin: cell(row, 8),
        twitter: cell(row, 9),
        email: cell(row, 10),
        github: cell(row, 11),
        personalWebsite: cell(row, 12),
      },
    };
    return memberSchema.parse(raw);
  } catch (err) {
    console.warn("[loadDirectory] Skipping invalid row:", row, err);
    return null;
  }
}

/**
 * Groups a flat list of members into Directory objects.
 */
function groupIntoDirectories(members: Member[]): Directory[] {
  const map = new Map<string, Member[]>();
  for (const member of members) {
    const key = member.directoryId ?? "outros";
    const existing = map.get(key) ?? [];
    map.set(key, [...existing, member]);
  }

  const directories: Directory[] = [];
  for (const [id, group] of map.entries()) {
    const director = group.find(m => m.role === "director");
    const viceDirector = group.find(m => m.role === "viceDirector");
    const members = group.filter(m => m.role === "member");

    if (!director) continue;

    try {
      directories.push(
        directorySchema.parse({
          id,
          name: id,
          image: `/images/directory/${id}.png`,
          director,
          viceDirector,
          members,
        })
      );
    } catch (err) {
      console.warn(`[loadDirectory] Invalid directory "${id}":`, err);
    }
  }

  return directories;
}

/**
 * Loads directory data from Google Sheets or falls back to static data.
 */
export async function loadDirectories(): Promise<Directory[]> {
  try {
    const rows = await fetchSheetRows(RANGE);
    if (rows.length === 0) {
      console.info("[loadDirectory] No rows from Sheets, using static data.");
      return staticDirectories as unknown as Directory[];
    }

    const members = rows.map(rowToMember).filter((m): m is Member => m !== null);
    return groupIntoDirectories(members);
  } catch (err) {
    console.error("[loadDirectory] Sheets fetch failed, using static fallback:", err);
    return staticDirectories as unknown as Directory[];
  }
}

/**
 * Loads executive board (president/vice-president) from Sheets or falls back.
 *
 * In the Sheet: members with role "president" or "vicePresident"
 * and no directoryId are treated as executive board.
 */
export async function loadExecutiveBoard(): Promise<ExecutiveBoard> {
  try {
    const rows = await fetchSheetRows(RANGE);
    if (rows.length === 0) return staticExecutiveBoard as unknown as ExecutiveBoard;

    const members = rows.map(rowToMember).filter((m): m is Member => m !== null);
    const president = members.find(m => m.role === "president");
    const vicePresident = members.find(m => m.role === "vicePresident");

    return executiveBoardSchema.parse({ president, vicePresident });
  } catch (err) {
    console.error("[loadExecutiveBoard] Falling back to static data:", err);
    return staticExecutiveBoard as unknown as ExecutiveBoard;
  }
}
