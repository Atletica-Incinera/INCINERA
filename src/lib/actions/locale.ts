"use server";

import { cookies } from "next/headers";

const VALID_LOCALES = ["pt", "en"] as const;
type Locale = (typeof VALID_LOCALES)[number];

export async function setUserLocale(locale: Locale): Promise<void> {
  if (!VALID_LOCALES.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 ano
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
