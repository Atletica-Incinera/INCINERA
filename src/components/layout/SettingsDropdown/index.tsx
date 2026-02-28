"use client";

import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useSettingsDropdown } from "./useSettingsDropdown";

export function SettingsDropdown() {
  const t = useTranslations("Settings");
  const { refs, state, actions } = useSettingsDropdown();

  return (
    <div className="relative inline-block text-left">
      <button
        ref={refs.buttonRef}
        onClick={actions.toggleDropdown}
        onMouseEnter={actions.openDropdown}
        className="p-2 rounded-full hover:bg-accent transition-colors text-foreground focus-visible:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-primary group"
        aria-haspopup="true"
        aria-expanded={state.isOpen}
        aria-label={t("title")}
      >
        <Settings className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500 text-foreground" strokeWidth={1.5} />
      </button>

      {/* Invisible bridge for safe hover directly below the button before entering the math triangle */}
      {state.isOpen && (
        <div className="absolute top-full right-0 w-full h-4 z-40" />
      )}

      <div
        ref={refs.menuRef}
        className={`absolute right-0 top-[calc(100%+0.5rem)] w-[250px] sm:w-[320px] p-4 sm:p-5 bg-background/80 backdrop-blur-xl border border-primary/20 dark:border-white/10 rounded-[var(--radius-lg)] shadow-2xl transition-all duration-300 origin-top-right z-50 ${
          state.isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-2"
        }`}
        role="menu"
        aria-orientation="vertical"
      >
        {/* Subtle Glow behind the dropdown content */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[var(--radius-lg)] pointer-events-none" />

        <div className="relative z-10">
          <ThemeToggle />
          <div className="h-px w-full bg-border/50 my-3" />
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
