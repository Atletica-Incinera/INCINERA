/**
 * Partners data loader.
 *
 * Strategy:
 *   1. Try to fetch from Google Sheets (if GOOGLE_SHEETS_ID is set)
 *   2. Fall back to static data in src/data/partners.ts
 *
 * Google Sheet layout ("Patrocinadores" tab):
 *   Col A: id           (e.g. "s1")
 *   Col B: type         ("sponsor" | "partner")
 *   Col C: name         (e.g. "Empresa X")
 *   Col D: logoPath     (Cloudinary public ID or full URL)
 *   Col E: url          (website URL)
 *   Col F: instagram    (full URL)
 *   Col G: linkedin     (full URL)
 *   Col H: website      (same or different from url)
 */

import { fetchSheetRows, cell } from "./sheets.client";
import { partnerSchema } from "../schemas/partner.schema";
import type { Partner } from "../types";

import { sponsors as staticSponsors, partners as staticPartners } from "../partners";

const RANGE = "Patrocinadores!A2:H";

function rowToPartner(row: string[]): Partner | null {
  try {
    return partnerSchema.parse({
      id: cell(row, 0) ?? "",
      name: cell(row, 2) ?? "",
      logoPath: cell(row, 3) ?? "/images/partners/placeholder-logo.svg",
      url: cell(row, 4),
      socialLinks: {
        instagram: cell(row, 5),
        linkedin: cell(row, 6),
        website: cell(row, 7) ?? cell(row, 4),
      },
    });
  } catch (err) {
    console.warn("[loadPartners] Skipping invalid partner row:", row, err);
    return null;
  }
}

/**
 * Loads sponsors and partners from Google Sheets or static fallback.
 * Returns { sponsors, partners } split by type column.
 */
export async function loadPartners(): Promise<{
  sponsors: Partner[];
  partners: Partner[];
}> {
  try {
    const rows = await fetchSheetRows(RANGE);

    if (rows.length === 0) {
      console.info("[loadPartners] No rows from Sheets, using static data.");
      return {
        sponsors: staticSponsors as Partner[],
        partners: staticPartners as Partner[],
      };
    }

    const sponsors: Partner[] = [];
    const partners: Partner[] = [];

    for (const row of rows) {
      const type = cell(row, 1);
      const partner = rowToPartner(row);
      if (!partner) continue;

      if (type === "partner") {
        partners.push(partner);
      } else {
        sponsors.push(partner); // Default to sponsor
      }
    }

    return { sponsors, partners };
  } catch (err) {
    console.error("[loadPartners] Sheets fetch failed, using static fallback:", err);
    return {
      sponsors: staticSponsors as Partner[],
      partners: staticPartners as Partner[],
    };
  }
}
