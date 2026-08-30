import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "glass-vivid" | "light" | "nec" | "glass" | "glass-neo" | "glass-neon" | "clay" | "liquid-glass";

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isThemeTransitioning: boolean;
}

const THEME_STORAGE_KEY = "portfolio_theme_pref";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
      if (saved && ["light", "glass"].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error("Failed to load theme preference from localStorage", e);
    }
    return "glass";
  });

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme) return;
    setIsThemeTransitioning(true);
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error("Failed to save theme preference to localStorage", e);
    }
    setTimeout(() => {
      setIsThemeTransitioning(false);
    }, 550);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "theme-light", "theme-nec", "theme-glass", "theme-clay", "theme-glass-vivid", "theme-glass-neo", "theme-glass-neon");
    
    if (theme === "light") {
      root.classList.add("theme-light");
    } else if (theme === "glass") {
      root.classList.add("dark", "theme-glass");
    } else if (theme === "glass-neon") {
      root.classList.add("dark", "theme-glass-neon");
    } else if (theme === "glass-neo") {
      root.classList.add("dark", "theme-glass-neo");
    } else if (theme === "nec") {
      root.classList.add("theme-nec");
    } else if (theme === "clay") {
      root.classList.add("theme-clay");
    } else if (theme === "glass-vivid") {
      root.classList.add("theme-glass-vivid");
    } else if (theme === "liquid-glass") {
      root.classList.add("dark", "theme-liquid-glass");
    } else {
      root.classList.add("dark", "theme-glass");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isThemeTransitioning }}>
      {children}
      {/* Global visual cross-fade light veil when switching themes */}
      <div 
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-500 ease-out ${
          isThemeTransitioning ? "opacity-30 backdrop-blur-[2px] bg-white/20 dark:bg-black/20" : "opacity-0"
        }`}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      theme: "glass",
      setTheme: () => {},
      isThemeTransitioning: false
    };
  }
  return context;
};
