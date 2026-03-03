import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const VALID_LOCALES = ["pt", "en"] as const;
const DEFAULT_LOCALE = "pt";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale =
    cookieLocale && VALID_LOCALES.includes(cookieLocale as (typeof VALID_LOCALES)[number])
      ? cookieLocale
      : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
