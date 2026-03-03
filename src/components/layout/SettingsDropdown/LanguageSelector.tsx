"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { setUserLocale } from "@/lib/actions/locale";

export function LanguageSelector() {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: string) => {
    startTransition(async () => {
      await setUserLocale(nextLocale as "pt" | "en");
      router.refresh();
    });
  };

  const languages = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  return (
    <div className="flex flex-col gap-1 mt-2">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
        {t("language")}
      </div>
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isPending}
            className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-colors w-full text-sm cursor-pointer ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-accent text-foreground hover:text-accent-foreground"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xl leading-none">{lang.flag}</span>
              {lang.label}
            </span>
            {isActive && <Check className="w-4 h-4 text-primary" />}
          </button>
        );
      })}
    </div>
  );
}
