"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sincroniza estado inicial no cliente baseado no que o script injetou ou localStorage
    const root = document.documentElement;
    let initialTheme = root.getAttribute("data-theme") as Theme | null;
    
    if (!initialTheme) {
      initialTheme = localStorage.getItem("incinera-theme") as Theme | null;
    }
    if (!initialTheme) {
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    }
    
    setThemeState(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    const applyTheme = (t: Theme) => {
      root.setAttribute("data-theme", t);
      if (t === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    const observer = new MutationObserver((mutations) => {
      let needsReapply = false;
      for (const mutation of mutations) {
        if (mutation.attributeName === "class" || mutation.attributeName === "data-theme") {
          needsReapply = true;
          break;
        }
      }
      
      if (needsReapply) {
        const currentThemeAttr = root.getAttribute("data-theme");
        const hasDarkClass = root.classList.contains("dark");
        if (currentThemeAttr !== theme || (theme === "dark" && !hasDarkClass) || (theme === "light" && hasDarkClass)) {
          observer.disconnect();
          applyTheme(theme);
          observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    return () => observer.disconnect();
  }, [theme, mounted]);

  const changeTheme = (newTheme: Theme) => {
    localStorage.setItem("incinera-theme", newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
