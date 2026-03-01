/**
 * Teams data loader.
 *
 * Strategy:
 *   1. Try to fetch from Google Sheets (if GOOGLE_SHEETS_ID is set)
 *   2. Fall back to static data in src/data/teams.ts
 *
 * Google Sheet layout ("Atletas" tab):
 *   Col A: id           (e.g. "futsal-m-1")
 *   Col B: teamId       (e.g. "futsal-m") — matches Team.id
 *   Col C: name         (e.g. "Pedro Santos")
 *   Col D: imagePath    (Cloudinary public ID or full URL)
 *   Col E: course       (e.g. "cc")
 *   Col F: sports       (comma-separated i18n keys)
 *   Col G: instagram    (full URL)
 *   Col H: linkedin     (full URL)
 *
 * Google Sheet layout ("Equipes" tab):
 *   Col A: id           (e.g. "futsal-m")
 *   Col B: sportKey     (e.g. "sports.futsalMale")
 *   Col C: sportName    (e.g. "Futsal Masculino")
 */

import { fetchSheetRows, cell } from "./sheets.client";
import { athleteSchema, teamSchema } from "../schemas/team.schema";
import type { Team, Athlete } from "../types";

// Static fallback
import { teams as staticTeams } from "../teams";

const ATHLETES_RANGE = "Atletas!A2:H";
const TEAMS_RANGE = "Equipes!A2:C";

function rowToAthlete(row: string[]): Athlete | null {
  try {
    const sports = cell(row, 5)?.split(",").map(s => s.trim()).filter(Boolean) ?? [];
    return athleteSchema.parse({
      id: cell(row, 0) ?? "",
      name: cell(row, 2) ?? "",
      imagePath: cell(row, 3) ?? "/images/teams/athlete-placeholder.webp",
      course: cell(row, 4),
      sports,
      socialLinks: {
        instagram: cell(row, 6),
        linkedin: cell(row, 7),
      },
    });
  } catch (err) {
    console.warn("[loadTeams] Skipping invalid athlete row:", row, err);
    return null;
  }
}

/**
 * Loads teams and their athletes from Google Sheets or static fallback.
 */
export async function loadTeams(): Promise<Team[]> {
  try {
    const [athleteRows, teamRows] = await Promise.all([
      fetchSheetRows(ATHLETES_RANGE),
      fetchSheetRows(TEAMS_RANGE),
    ]);

    if (athleteRows.length === 0 || teamRows.length === 0) {
      console.info("[loadTeams] No rows from Sheets, using static data.");
      return staticTeams as unknown as Team[];
    }

    // Parse team definitions
    const teamDefs = teamRows.map(row => ({
      id: cell(row, 0) ?? "",
      sportKey: cell(row, 1) ?? "",
      sportName: cell(row, 2),
    }));

    // Parse and group athletes by teamId
    const athletesByTeam = new Map<string, Athlete[]>();
    for (const row of athleteRows) {
      const teamId = cell(row, 1);
      if (!teamId) continue;

      const athlete = rowToAthlete(row);
      if (!athlete) continue;

      const existing = athletesByTeam.get(teamId) ?? [];
      athletesByTeam.set(teamId, [...existing, athlete]);
    }

    // Build validated Team objects
    return teamDefs
      .map(def => {
        try {
          return teamSchema.parse({
            ...def,
            athletes: athletesByTeam.get(def.id) ?? [],
          });
        } catch (err) {
          console.warn(`[loadTeams] Invalid team "${def.id}":`, err);
          return null;
        }
      })
      .filter((t): t is Team => t !== null);
  } catch (err) {
    console.error("[loadTeams] Sheets fetch failed, using static fallback:", err);
    return staticTeams as unknown as Team[];
  }
}
