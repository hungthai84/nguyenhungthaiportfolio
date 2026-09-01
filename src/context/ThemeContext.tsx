import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Sparkles, CheckCircle2, Palette, X, Layers, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export const THEMES = [
  "light",
  "dark",
  "glass-dark",
  "industrial-futurist",
  "sunrise-glass",
  "navy-neumorphic"
] as const;

export type ThemeType = typeof THEMES[number];

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isThemeTransitioning: boolean;
  isApplyingTheme: boolean;
  themeProgress: number;
  currentStepTitle: string;
}

const THEME_STORAGE_KEY = "portfolio_theme";
const OLD_THEME_PREF_KEY = "portfolio_theme_pref";

const THEME_LABELS: Record<string, string> = {
  "light": "Giao diện Sáng (Light Glass ☀️)",
  "dark": "Giao diện Tối Cổ điển (Classic Dark 🌙)",
  "glass-dark": "Giao diện Glass UI tối (Glass Dark 🌌)",
  "industrial-futurist": "Giao diện Industrial Futurist (Industrial 🛠️)",
  "sunrise-glass": "Giao diện Sunrise Glass (Sunrise 🌅)",
  "navy-neumorphic": "Giao diện Navy Neumorphic (Navy Dashboard 🟨)"
};

const PAGE_SECTIONS = [
  { id: "home", name: "Trang chủ", subtitle: "Hero & Banner Tổng Quan" },
  { id: "letter", name: "Thư ngỏ", subtitle: "Lời Chào & Tầm Nhìn Chiến Lược" },
  { id: "about", name: "Giới thiệu", subtitle: "Tiểu Sử & Hành Trình Lãnh Đạo" },
  { id: "education", name: "Học vấn", subtitle: "Bằng Cấp & Sách 3D Tương Tác" },
  { id: "domains", name: "Lĩnh vực", subtitle: "Chuyên Môn & Năng Lực Vận Hành" },
  { id: "experience", name: "Kinh nghiệm", subtitle: "Hành Trình 22+ Năm Cống Hiến" },
  { id: "skills", name: "Kỹ năng", subtitle: "Bộ Năng Lực Cốt Lõi" },
  { id: "projects", name: "Dự án", subtitle: "Sản Phẩm & Giải Pháp Thực Chiến" },
  { id: "interview", name: "Phỏng vấn", subtitle: "Truyền Thông & Video Phim Ảnh" },
  { id: "tuvi", name: "Tử vi & Lá số", subtitle: "Phân Tích Vận Mệnh & Phong Thủy" },
  { id: "memories", name: "Kỷ niệm", subtitle: "Thư Viện Hình Ảnh & Hoạt Động" },
  { id: "systems", name: "Hệ thống", subtitle: "Quản Trị & Hạ Tầng Kỹ Thuật" },
];

// Helper to play Web Audio API sound effects without external audio assets
const playAudioChime = (type: "step" | "complete") => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "step") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      // Completion chord
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + i * 0.07);
        g.gain.setValueAtTime(0.12, now + i * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.45);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + i * 0.07);
        o.stop(now + i * 0.07 + 0.45);
      });
    }
  } catch (e) {
    // Audio context not allowed or failed silently
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [isApplyingTheme, setIsApplyingTheme] = useState(false);
  const [themeProgress, setThemeProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepTitle, setCurrentStepTitle] = useState("");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCompletionNotice, setShowCompletionNotice] = useState(false);
  const [noticeThemeName, setNoticeThemeName] = useState("");

  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      // 1. Check master prompt storage key 'portfolio_theme'
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && THEMES.includes(savedTheme as ThemeType)) {
        return savedTheme as ThemeType;
      }

      // 2. Otherwise, check for legacy values and perform precise migration
      const legacyThemeVal = localStorage.getItem("theme");
      const legacyPrefVal = localStorage.getItem(OLD_THEME_PREF_KEY);

      // light -> light
      if (legacyThemeVal === "light") {
        localStorage.setItem(THEME_STORAGE_KEY, "light");
        return "light";
      }

      // dark + portfolio_theme_pref = ...
      if (legacyThemeVal === "dark") {
        if (legacyPrefVal && THEMES.includes(legacyPrefVal as ThemeType)) {
          localStorage.setItem(THEME_STORAGE_KEY, legacyPrefVal);
          return legacyPrefVal as ThemeType;
        }
        localStorage.setItem(THEME_STORAGE_KEY, "glass-dark");
        return "glass-dark";
      }

      // If legacyPrefVal exists without legacyThemeVal
      if (legacyPrefVal && THEMES.includes(legacyPrefVal as ThemeType)) {
        localStorage.setItem(THEME_STORAGE_KEY, legacyPrefVal);
        return legacyPrefVal as ThemeType;
      }

      // 3. System preference fallback
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem(THEME_STORAGE_KEY, "glass-dark");
        return "glass-dark";
      }
    } catch (e) {
      // ignore
    }
    return "light";
  });

  // Apply theme classes to root
  const applyThemeToDOM = (themeName: ThemeType) => {
    const root = document.documentElement;
    root.classList.remove(
      "dark", 
      "theme-light", 
      "theme-dark",
      "theme-glass-dark",
      "theme-nec", 
      "theme-glass", 
      "theme-clay", 
      "theme-glass-vivid", 
      "theme-glass-neo", 
      "theme-glass-neon", 
      "theme-fintech-glass",
      "theme-industrial-futurist",
      "theme-sunrise-glass",
      "theme-navy-neumorphic"
    );
    
    // Set data-theme attribute to the exact theme name for CSS selector matching
    root.setAttribute("data-theme", themeName);
    
    if (themeName === "light" || themeName === "sunrise-glass") {
      root.classList.add(`theme-${themeName}`);
    } else {
      root.classList.add("dark", `theme-${themeName}`);
    }
  };

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme) return;

    setIsThemeTransitioning(true);
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      // Synchronize to legacy keys with exact values for backward compatibility
      localStorage.setItem("theme", newTheme);
      localStorage.setItem(OLD_THEME_PREF_KEY, newTheme);
    } catch (e) {
      console.error("Failed to save theme preference", e);
    }

    setTimeout(() => {
      setIsThemeTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isThemeTransitioning,
      isApplyingTheme: false,
      themeProgress: 0,
      currentStepTitle: ""
    }}>
      {children}

      {/* Global visual cross-fade veil when switching themes */}
      <div 
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ease-out ${
          isThemeTransitioning ? "opacity-25 backdrop-blur-[2px] bg-indigo-500/10" : "opacity-0"
        }`}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light",
      setTheme: () => {},
      isThemeTransitioning: false,
      isApplyingTheme: false,
      themeProgress: 0,
      currentStepTitle: ""
    };
  }
  return context;
};

