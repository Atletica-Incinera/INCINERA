"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const t = useTranslations("Settings");
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mb-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
          {t("appearance")}
        </div>
        <div className="w-full h-12 bg-accent/20 animate-pulse rounded-full" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
        {t("appearance")}
      </div>
      <button
        onClick={toggleTheme}
        className="relative flex items-center w-full h-12 p-1 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-full overflow-hidden transition-colors hover:border-primary/50 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        role="switch"
        aria-checked={isDark}
        aria-label={t("toggleTheme")}
      >
        {/* Background Particles when hovered */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-full">
          <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-orange-400 rounded-full animate-[float-spark_1s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] left-[40%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-[float-spark_1.5s_ease-in-out_infinite_0.2s]" />
          <div className="absolute top-[30%] right-[30%] w-1 h-1 bg-red-400 rounded-full animate-[float-spark_1.2s_ease-in-out_infinite_0.4s]" />
          <div className="absolute bottom-[30%] right-[10%] w-1 h-1 bg-orange-300 rounded-full animate-[float-spark_0.8s_ease-in-out_infinite_0.1s]" />
        </div>

        {/* The Track Icons */}
        <div className="relative w-full flex justify-between px-4 z-0 text-muted-foreground transition-colors">
          <Sun
            className={`w-4 h-4 transition-colors duration-300 ${!isDark ? "text-white" : "group-hover:text-foreground/80"}`}
          />
          {!isDark ? (
            <Moon
              className={`w-4 h-4 transition-colors duration-300 ${isDark ? "text-white" : "group-hover:text-foreground/00"}`}
            />
          ) : null}
        </div>

        {/* The Fire Handle */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg flex items-center justify-center z-10 ${
            isDark ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
          }`}
        >
          {/* Fire Gradient Base */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 animate-[fire-pulse_2s_ease-in-out_infinite] opacity-90 shadow-[0_0_15px_rgba(234,88,12,0.6)] group-hover:shadow-[0_0_25px_rgba(234,88,12,0.8)] transition-shadow" />

          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent mix-blend-overlay pointer-events-none" />

          {/* Active Icon in Handle */}
          <div className="relative z-20 text-white drop-shadow-md pointer-events-none">
            {!isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
