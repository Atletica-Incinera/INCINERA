/**
 * Gallery data loader (About section).
 *
 * Strategy:
 *   1. Try to fetch from Google Sheets (if GOOGLE_SHEETS_ID is set)
 *   2. Fall back to static data in src/data/about.ts
 *
 * Google Sheet layout ("Galeria" tab):
 *   Col A: src   (Cloudinary public ID or full URL)
 */

import { fetchSheetRows, cell } from "./sheets.client";
import {
  galleryImageSchema,
  stackStyleSchema,
} from "../schemas/gallery.schema";
import type { GalleryImage, StackStyle } from "../types";
import { logger } from "@/lib/logger";

// Static fallback
import {
  GALLERY_IMAGES as staticGallery,
  STACK_STYLES as staticStackStyles,
} from "../about";

const RANGE = "Galeria!A2:A";

/**
 * Default stack animation styles (visual only, not data-driven).
 * These stay static regardless of data source.
 */
export const STACK_STYLES: readonly StackStyle[] = staticStackStyles.map((s) =>
  stackStyleSchema.parse(s),
);

/**
 * Loads gallery images from Google Sheets or static fallback.
 */
export async function loadGallery(): Promise<GalleryImage[]> {
  try {
    const rows = await fetchSheetRows(RANGE);

    if (rows.length === 0) {
      logger.info(
        { event: "GALLERY_NO_ROWS" },
        "[loadGallery] No rows from Sheets, using static data.",
      );
      return staticGallery.map((img) => galleryImageSchema.parse(img));
    }

    return rows
      .map((row) => {
        const src = cell(row, 0);
        if (!src) return null;
        try {
          return galleryImageSchema.parse({ src });
        } catch {
          return null;
        }
      })
      .filter((img): img is GalleryImage => img !== null);
  } catch (err) {
    logger.error(
      { event: "GALLERY_FETCH_FAILED", error: err },
      "[loadGallery] Sheets fetch failed, using static fallback",
    );
    return staticGallery.map((img) => galleryImageSchema.parse(img));
  }
}
