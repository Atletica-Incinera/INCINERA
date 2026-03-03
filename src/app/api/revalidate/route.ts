/**
 * On-demand revalidation endpoint.
 *
 * Triggers ISR revalidation for all localized routes.
 *
 * Usage (curl):
 *   curl -X POST https://incinera.vercel.app/api/revalidate \
 *     -H "x-revalidate-secret: SEU_SECRET_AQUI"
 *
 * Or trigger from Google Apps Script after updating the Sheet.
 *
 * Required env var:
 *   REVALIDATE_SECRET  — A random string, kept private
 */

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

const LOCALES = ["pt", "en"] as const;

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET) {
    logger.error(
      { event: "REVALIDATE_MISSING_SECRET" },
      "[revalidate] REVALIDATE_SECRET env var is not set!",
    );
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate all localized pages
    for (const locale of LOCALES) {
      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}/equipes`);
    }
    // Also revalidate the root (redirects to locale)
    revalidatePath("/");

    logger.info(
      { event: "REVALIDATE_SUCCESS" },
      "[revalidate] Cache cleared for all routes.",
    );
    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logger.error(
      { event: "REVALIDATE_FAILED", error: err },
      "[revalidate] Failed",
    );
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
