import React, { useState, useEffect, MouseEvent } from "react";
import {
  Home,
  Mail,
  User,
  GraduationCap,
  Globe,
  Award,
  Target,
  Layers,
  Video,
  Sparkles,
  Images,
  Server,
  Send,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bot,
  Phone,
  MessageCircle,
  Columns3,
  Volume2,
  X
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";
import { useTheme, ThemeType } from "../context/ThemeContext";
import FooterWeather from "./FooterWeather";
import SoundWidget from "./SoundWidget";

interface FooterProps {
  theme?: ThemeType;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

const SECTION_ORDER = [
  "home",
  "letter",
  "about",
  "education",
  "domains",
  "experience",
  "skills",
  "projects",
  "interview",
  "tuvi",
  "memories",
  "systems",
  "contact"
];

export default function Footer({ theme: propTheme, activeSection = "home", onNavigate }: FooterProps) {
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;
  const { t, lang } = useLanguage();
  const { playSound } = useSound();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  const isHome = activeSection === "home";

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  useEffect(() => {
    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean; isSpeaking: boolean }>;
      if (customEvent.detail) {
        setIsAIOpen(customEvent.detail.isOpen);
        setIsAISpeaking(customEvent.detail.isSpeaking);
      }
    };
    window.addEventListener('ai-assistant-state-changed', handleStateChange);
    return () => window.removeEventListener('ai-assistant-state-changed', handleStateChange);
  }, []);

  const handleToggleAIAssistant = () => {
    playSound("special");
    window.dispatchEvent(new CustomEvent('toggle-ai-assistant'));
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = currentTime.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", { weekday: 'short', day: 'numeric', month: 'short' });

  // Navigation Items matching Header Menu
  const navItems = [
    { id: "home", label: t("nav.home"), Icon: Home },
    { id: "letter", label: t("nav.letter"), Icon: Mail },
    { id: "about", label: t("nav.about"), Icon: User },
    { id: "education", label: t("nav.education"), Icon: GraduationCap },
    { id: "domains", label: t("nav.domains"), Icon: Globe },
    { id: "experience", label: t("nav.experience"), Icon: Award },
    { id: "skills", label: t("nav.skills"), Icon: Target },
    { id: "projects", label: t("nav.projects"), Icon: Layers },
    { id: "interview", label: t("nav.interview"), Icon: Video },
    { id: "tuvi", label: t("nav.tuvi"), Icon: Sparkles },
    { id: "memories", label: t("nav.memories"), Icon: Images },
    { id: "systems", label: t("nav.systems"), Icon: Server },
    { id: "contact", label: t("nav.contact"), Icon: Send },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    playSound("switch");
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    }
  };

  const currentIndex = SECTION_ORDER.indexOf(activeSection);

  const handlePrevPage = () => {
    playSound("switch");
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : SECTION_ORDER.length - 1;
    const prevId = SECTION_ORDER[prevIdx];
    if (onNavigate) {
      onNavigate(prevId);
    } else {
      const el = document.getElementById(prevId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    playSound("switch");
    const nextIdx = currentIndex < SECTION_ORDER.length - 1 ? currentIndex + 1 : 0;
    const nextId = SECTION_ORDER[nextIdx];
    if (onNavigate) {
      onNavigate(nextId);
    } else {
      const el = document.getElementById(nextId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenAIAssistant = () => {
    playSound("special");
    window.dispatchEvent(new CustomEvent('open-ai-assistant'));
    const btn = document.getElementById("btn-open-ai-assistant");
    if (btn) btn.click();
  };

  // Helper styles based on active Theme
  const getFooterContainerStyle = () => {
    switch (theme) {
      case "light":
        return "bg-white/95 border-2 border-slate-200/90 shadow-[0_-10px_30px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,1)] backdrop-blur-2xl";
      case "glass-vivid":
        return "bg-white/70 border-2 border-white/90 shadow-[0_16px_40px_rgba(99,102,241,0.18),0_4px_16px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl";
      case "nec":
        return "bg-[#f0f3f8]/95 dark:bg-slate-900/95 border-2 border-white/90 dark:border-slate-800/90 shadow-[-4px_-4px_12px_rgba(255,255,255,0.9),_4px_4px_14px_rgba(163,177,198,0.4)] backdrop-blur-xl";
      case "clay":
        return "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-[0_14px_34px_rgba(160,165,210,0.32),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl";
      case "glass-neo":
      case "glass-neon":
        return "bg-slate-950/85 border border-cyan-500/35 shadow-[0_12px_36px_rgba(0,0,0,0.75),0_0_24px_rgba(0,240,255,0.22),0_0_36px_rgba(236,72,153,0.15)] backdrop-blur-2xl";
      case "glass":
      default:
        return "bg-white/12 dark:bg-slate-900/55 border border-white/25 dark:border-white/15 shadow-[0_8px_32px_0_rgba(31,38,135,0.14)] backdrop-blur-[16px]";
    }
  };

  const getNavContainerStyle = () => {
    switch (theme) {
      case "light":
        return "bg-slate-100/90 border border-slate-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-xl";
      case "glass-vivid":
        return "bg-white/60 border border-white/80 shadow-[0_4px_20px_rgba(99,102,241,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] backdrop-blur-xl";
      case "nec":
        return "bg-[#e8ecf3]/90 dark:bg-slate-950/70 border border-white/90 dark:border-slate-800 shadow-[inset_2px_2px_5px_rgba(163,177,198,0.45),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]";
      case "clay":
        return "bg-white/80 dark:bg-slate-800/80 border-2 border-white dark:border-slate-700 shadow-[0_6px_16px_rgba(160,165,210,0.22)]";
      case "glass-neo":
        return "bg-slate-900/80 border border-cyan-500/30 shadow-[inset_0_0_16px_rgba(0,240,255,0.12),0_0_20px_rgba(168,85,247,0.18)] backdrop-blur-xl";
      case "glass":
      default:
        return "bg-white/10 dark:bg-slate-950/40 border border-white/20 dark:border-white/10 backdrop-blur-[16px] shadow-inner";
    }
  };

  const getNavItemStyle = (isActive: boolean) => {
    switch (theme) {
      case "light":
        return isActive
          ? "bg-blue-600 text-white font-black shadow-[0_4px_14px_rgba(37,99,235,0.35)] scale-110 z-10 border border-blue-400"
          : "text-slate-700 hover:text-blue-600 hover:bg-white/80 border border-transparent font-bold";
      case "glass-vivid":
        return isActive
          ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 text-white font-black shadow-[0_6px_20px_rgba(124,58,237,0.35)] scale-115 z-10 border border-white/60 ring-2 ring-pink-300/50"
          : "text-slate-700 hover:text-indigo-600 hover:bg-white/50 border border-transparent font-semibold";
      case "nec":
        return isActive
          ? "bg-[#e2e8f0] dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.7),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] scale-110 ring-2 ring-purple-400/40 z-10 font-bold"
          : "bg-[#f0f3f8] dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-[2px_2px_5px_rgba(163,177,198,0.45),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-[3px_3px_7px_rgba(163,177,198,0.6),-3px_-3px_7px_rgba(255,255,255,1)]";
      case "clay":
        return isActive
          ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white border-2 border-white shadow-[0_6px_16px_rgba(99,102,241,0.5),inset_0_2px_4px_rgba(255,255,255,0.6)] scale-115 z-10 font-bold"
          : "bg-white/95 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-2 border-white dark:border-slate-600 shadow-[0_4px_8px_rgba(140,150,200,0.22),inset_0_2px_2px_rgba(255,255,255,0.9)] hover:scale-110 hover:shadow-[0_6px_14px_rgba(140,150,200,0.35)]";
      case "glass-neo":
        return isActive
          ? "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 text-white font-black shadow-[0_0_20px_rgba(0,240,255,0.85),0_0_25px_rgba(236,72,153,0.6)] border border-white/70 scale-115 z-10 ring-2 ring-cyan-400/60"
          : "text-slate-300 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-fuchsia-500/20 hover:border-cyan-400/50 border border-transparent font-bold transition-all";
      case "glass":
      default:
        return isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110 z-10 border border-white/40"
          : "text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-white/10";
    }
  };

  const getActionCircleStyle = (type: "zalo" | "phone" | "ai" | "nav") => {
    switch (theme) {
      case "light":
        return "bg-slate-100 hover:bg-white border border-slate-300 text-slate-800 shadow-sm hover:scale-110";
      case "glass-vivid":
        return "bg-white/75 hover:bg-white/90 border border-white/90 text-slate-800 shadow-[0_4px_16px_rgba(99,102,241,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] backdrop-blur-xl hover:scale-110";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-800 border border-white/90 dark:border-slate-700 shadow-[2px_2px_5px_rgba(163,177,198,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[3px_3px_7px_rgba(163,177,198,0.55),-3px_-3px_7px_rgba(255,255,255,1)]";
      case "clay":
        return "bg-white/95 dark:bg-slate-800 border-2 border-white dark:border-slate-600 shadow-[0_4px_10px_rgba(140,150,200,0.25),inset_0_2px_2px_rgba(255,255,255,0.9)] hover:scale-110";
      case "glass-neo":
        return "bg-slate-900/85 border border-cyan-500/40 text-slate-100 hover:border-fuchsia-400 hover:shadow-[0_0_16px_rgba(255,0,128,0.4),0_0_20px_rgba(0,240,255,0.3)] shadow-md transition-all";
      case "glass":
      default:
        return "bg-white/14 dark:bg-slate-900/60 hover:bg-white/25 dark:hover:bg-slate-800/80 border border-white/25 dark:border-white/15 text-slate-900 dark:text-slate-100 shadow-[0_4px_16px_rgba(31,38,135,0.1)] backdrop-blur-[16px]";
    }
  };

  return (
    <footer 
      id="footer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-20px)] sm:w-[92%] lg:w-[88%] xl:w-[85%] max-w-[1250px] min-h-[64px] sm:min-h-[68px] h-auto py-2 border-b-0 rounded-b-none rounded-t-2xl sm:rounded-t-3xl px-3 sm:px-5 md:px-6 flex flex-col justify-between transition-all duration-400 ease-out cursor-default ${getFooterContainerStyle()} ${
        isHome 
          ? "translate-y-0 opacity-100" 
          : isHovered 
            ? "translate-y-0 opacity-100 ring-2 ring-blue-500/30 shadow-[0_-12px_36px_rgba(0,0,0,0.25)]" 
            : "translate-y-[calc(100%-14px)] sm:translate-y-[calc(100%-16px)] hover:translate-y-0 opacity-90 hover:opacity-100"
      }`}
    >
      {/* Floating Circular Next Page Button on top of footer with down arrow (50% opacity) */}
      <button
        type="button"
        onClick={currentIndex === SECTION_ORDER.length - 1 ? () => {
          playSound("switch");
          if (onNavigate) {
            onNavigate("home");
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } : handleNextPage}
        className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/50 dark:bg-slate-800/50 hover:bg-slate-900/85 dark:hover:bg-slate-800/90 text-white border border-white/40 dark:border-slate-700/70 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center opacity-50 hover:opacity-100 group/nextbtn shrink-0 pointer-events-auto"
        title={currentIndex === SECTION_ORDER.length - 1 ? (lang === "vi" ? "Lên đầu trang" : "To Top") : (lang === "vi" ? "Trang tiếp" : "Next Page")}
      >
        {currentIndex === SECTION_ORDER.length - 1 ? (
          <Sparkles className="w-4 h-4 text-amber-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-sky-300 group-hover/nextbtn:translate-y-0.5 transition-transform" />
        )}
      </button>

      <div className="w-full flex flex-row justify-between items-center gap-2">
        {/* LEFT: Time/Date, Weather Widget, Sound & 5-Cursor Effect Settings */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />

          <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-full border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
            {/* Sound & Cursor Effect Control Widget integrated into Footer */}
            <SoundWidget />
          </div>
        </div>

        {/* RIGHT: Quick Action Icons (Only Contact and Call 0909097882) */}
        <div className="flex items-center justify-end gap-2 ml-auto shrink-0">
          {/* Direct Phone Call Icon 0909097882 */}
          <a
            href="tel:0909097882"
            className={`w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] text-emerald-600 dark:text-emerald-400 rounded-full active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm ${getActionCircleStyle("phone")}`}
            title={lang === "vi" ? "Gọi 0909 097 882" : "Call 0909 097 882"}
          >
            <Phone className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-pulse" />
          </a>

          {/* Zalo / Message Icon 0909097882 */}
          <a
            href="https://zalo.me/0909097882"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] text-blue-500 rounded-full active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm ${getActionCircleStyle("zalo")}`}
            title="Chat Zalo (0909 097 882)"
          >
            <MessageCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </a>

          {/* AI Assistant Button */}
          <button
            id="btn-open-ai-assistant"
            onClick={handleToggleAIAssistant}
            className={`relative w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm group ${
              isAIOpen
                ? "bg-slate-900/90 text-indigo-300 border border-indigo-400/60 rotate-90 shadow-indigo-500/20"
                : `text-purple-600 dark:text-purple-400 ${getActionCircleStyle("nav")}`
            }`}
            title={lang === "vi" ? "Mở Trợ lý Trí Nhân AI" : "Open Trí Nhân AI Assistant"}
          >
            {/* Glow ring */}
            {!isAIOpen && (
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-sm group-hover:opacity-80 transition-opacity"></span>
            )}

            <div className="relative z-10 flex items-center justify-center">
              {isAIOpen ? (
                <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-indigo-300" />
              ) : isAISpeaking ? (
                <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
              ) : (
                <Bot className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 group-hover:scale-110 transition-all" />
              )}
            </div>

            {/* Live Status Badge */}
            {!isAIOpen && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </button>

          {/* Contact Section Anchor Icon */}
          <button
            onClick={(e) => handleNavClick(e, "contact")}
            className={`w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] text-indigo-600 dark:text-indigo-400 rounded-full active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm ${getActionCircleStyle("nav")}`}
            title={lang === "vi" ? "Chuyển tới phần Liên hệ" : "Go to Contact Section"}
          >
            <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
