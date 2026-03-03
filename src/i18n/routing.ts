// Re-exports for backward compatibility — locale is now handled via cookies,
// so we no longer need next-intl routing. All navigation uses Next.js directly.
export { default as Link } from "next/link";
export { useRouter, usePathname, redirect } from "next/navigation";

// Kept for any static references (e.g., generateStaticParams in legacy pages)
export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt" as const;
