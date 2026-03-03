/**
 * Google Sheets API client (singleton).
 *
 * Authentication: Service Account JSON key stored in env vars.
 * All credentials are expected in environment variables (never committed).
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL    - Service account email
 *   GOOGLE_SERVICE_ACCOUNT_KEY      - Private key (with \n escaped)
 *   GOOGLE_SHEETS_ID                - Spreadsheet ID from the URL
 */

import { google, sheets_v4 } from "googleapis";
import { logger } from "@/lib/logger";

let _sheetsClient: sheets_v4.Sheets | null = null;

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error(
      "[Sheets] Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars.",
    );
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

/**
 * Returns a singleton Google Sheets API client.
 */
export function getSheetsClient(): sheets_v4.Sheets {
  if (!_sheetsClient) {
    _sheetsClient = google.sheets({ version: "v4", auth: getAuth() });
  }
  return _sheetsClient;
}

/**
 * Fetches raw rows from a specific sheet range.
 * Returns an empty array if the spreadsheet is not configured.
 *
 * @param range          Sheet range, e.g. "'Sheet1'!A2:Z"
 * @param spreadsheetId  Optional override. Defaults to GOOGLE_SHEETS_ID env var.
 */
export async function fetchSheetRows(
  range: string,
  spreadsheetId?: string,
): Promise<string[][]> {
  const id = spreadsheetId ?? process.env.GOOGLE_SHEETS_ID;

  if (!id) {
    logger.warn({ event: "SHEETS_MISSING_ID", range }, "[Sheets] No spreadsheetId provided and GOOGLE_SHEETS_ID not set. Returning empty rows.");
    return [];
  }

  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range,
  });
  return (res.data.values as string[][]) ?? [];
}

/**
 * Helper to safely read a cell from a row by column index.
 * Returns undefined if the column doesn't exist.
 */
export function cell(row: string[], index: number): string | undefined {
  const value = row[index]?.trim();
  return value === "" || value === undefined ? undefined : value;
}
