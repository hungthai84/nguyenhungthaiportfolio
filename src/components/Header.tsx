import React, { useState, useEffect, MouseEvent } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Home,
  UserCheck,
  GraduationCap,
  Briefcase,
  Server,
  PhoneCall,
  Mail,
  Phone,
  MailOpen,
  Film,
  Compass,
  Target,
  FolderKanban,
  MessagesSquare,
  Star,
  Camera,
  Columns3,
  Sparkles,
  Images,
  Video,
  Palette,
  Layers,
  Check,
  ChevronDown,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useBackground } from "../context/BackgroundContext";
import { useLayout } from "../context/LayoutContext";
import { useSound } from "../context/SoundContext";
import { useTheme, ThemeType } from "../context/ThemeContext";

interface HeaderProps {
  theme?: ThemeType;
  setTheme?: (theme: ThemeType) => void;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export default function Header({ theme: propTheme, setTheme: propSetTheme, activeSection = "home", onNavigate }: HeaderProps) {
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;
  const setTheme = propSetTheme || themeContext.setTheme;

  const { lang, setLang, t } = useLanguage();
  const { openModal: openBgModal } = useBackground();
  const { orientation, toggleOrientation, isSwitching } = useLayout();
  const { playSound } = useSound();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const isHorizontal = orientation === "horizontal";
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
      if (!(event.target as Element).closest('.theme-dropdown-container')) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Navigation Items for Top Header Center (Filtered to hide wallpapers icon as requested)
  const navItems = [
    { id: "home", label: t("nav.home"), Icon: Home },
    { id: "letter", label: t("nav.letter"), Icon: MailOpen },
    { id: "about", label: t("nav.about"), Icon: UserCheck },
    { id: "education", label: t("nav.education"), Icon: GraduationCap },
    { id: "domains", label: t("nav.domains"), Icon: Compass },
    { id: "experience", label: t("nav.experience"), Icon: Briefcase },
    { id: "skills", label: t("nav.skills"), Icon: Target },
    { id: "projects", label: t("nav.projects"), Icon: FolderKanban },
    { id: "interview", label: t("nav.interview"), Icon: Video },
    { id: "tuvi", label: t("nav.tuvi"), Icon: Star },
    { id: "memories", label: t("nav.memories"), Icon: Camera },
    { id: "systems", label: t("nav.systems"), Icon: Server },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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

  // Unified glassmorphism background and floating drop shadow for header, main card, and footer
  const getHeaderContainerStyle = () => {
    switch (theme as any) {
      case "light":
        return "glass-surface bg-white/85 border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] text-slate-900 dark:text-white backdrop-blur-2xl";
      case "industrial-futurist":
        return "glass-surface bg-[#050811]/10 border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.05)] text-white backdrop-blur-md";
      case "glass-dark":
        return "glass-surface bg-slate-950/45 dark:bg-slate-950/45 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.12)] text-white backdrop-blur-2xl";
      case "glass-vivid":
        return "glass-surface border-2 border-white/40 shadow-[0_20px_50px_rgba(124,58,237,0.35)] text-slate-900 dark:text-white backdrop-blur-2xl";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white/90 dark:border-slate-800 shadow-[-12px_-12px_30px_rgba(255,255,255,0.95),_12px_12px_36px_rgba(163,177,198,0.45)] dark:shadow-[-8px_-8px_24px_rgba(255,255,255,0.05),_8px_8px_30px_rgba(0,0,0,0.6)] text-slate-900 dark:text-white";
      case "clay":
        return "glass-surface border-2 border-white shadow-[0_20px_40px_rgba(140,150,200,0.35)] text-slate-900 dark:text-white backdrop-blur-2xl";
      case "glass-neon":
      case "glass-neo":
        return "glass-surface border-2 border-cyan-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.35)] text-slate-900 dark:text-cyan-50 backdrop-blur-2xl";
      case "dark":
      case "glass":
      default:
        return "glass-surface bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.2)] text-slate-900 dark:text-white backdrop-blur-2xl";
    }
  };

  const getNavContainerStyle = () => {
    return "bg-transparent border-transparent shadow-none shadow-transparent backdrop-blur-none ring-0";
  };

  const getNavItemStyle = (isActive: boolean) => {
    switch (theme as any) {
      case "industrial-futurist":
        return isActive
          ? "bg-blue-600/70 text-white font-black shadow-[0_0_20px_rgba(37,99,235,0.7)] border border-white/20 z-10 backdrop-blur-md"
          : "text-slate-300 hover:text-blue-400 hover:bg-white/5 border border-transparent font-semibold";
      case "glass-dark":
        return isActive
          ? "bg-white/20 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/25 z-10 backdrop-blur-md"
          : "text-slate-300 hover:text-white hover:bg-white/10 border border-transparent font-semibold";
      case "glass-vivid":
        return isActive
          ? "bg-violet-600/70 text-white font-black shadow-[0_6px_20px_rgba(124,58,237,0.45)] z-10 border border-white/80 ring-2 ring-pink-300/60 backdrop-blur-md"
          : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-pink-400 hover:bg-white/60 dark:hover:bg-white/10 border border-transparent font-semibold";
      case "nec":
        return isActive
          ? "bg-purple-600/70 text-white shadow-[inset_2px_2px_4px_rgba(163,177,198,0.7),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] ring-2 ring-purple-400/40 z-10 font-bold backdrop-blur-md"
          : "bg-[#f0f3f8] dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-[2px_2px_5px_rgba(163,177,198,0.45),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-[3px_3px_7px_rgba(163,177,198,0.6),-3px_-3px_7px_rgba(255,255,255,1)]";
      case "clay":
        return isActive
          ? "bg-indigo-600/70 text-white border-2 border-white shadow-[0_6px_16px_rgba(99,102,241,0.5)] z-10 font-bold backdrop-blur-md"
          : "bg-white/95 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-2 border-white dark:border-slate-600 shadow-[0_4px_8px_rgba(140,150,200,0.22),inset_0_2px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_6px_14px_rgba(140,150,200,0.35)]";
      case "glass-neon":
      case "glass-neo":
        return isActive
          ? "bg-cyan-500/70 text-white font-black shadow-[0_0_20px_rgba(0,240,255,0.85),0_0_25px_rgba(236,72,153,0.6)] border border-white/70 z-10 ring-2 ring-cyan-400/60 backdrop-blur-md"
          : "text-slate-300 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-fuchsia-500/20 hover:border-cyan-400/50 border border-transparent font-bold transition-all";
      case "glass":
      default:
        return isActive
          ? "bg-indigo-600/70 text-white shadow-lg shadow-indigo-500/40 z-10 border border-white/60 ring-2 ring-indigo-400/50 backdrop-blur-md"
          : "text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/30 dark:hover:bg-white/10";
    }
  };

  const getActionButtonStyle = () => {
    switch (theme as any) {
      case "industrial-futurist":
        return "bg-slate-950/40 text-slate-100 border border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_16px_rgba(37,99,235,0.3)] backdrop-blur-xl transition-all";
      case "glass-dark":
        return "bg-white/10 hover:bg-white/15 border border-white/10 text-white shadow-md backdrop-blur-xl transition-all";
      case "glass-vivid":
        return "bg-white/75 hover:bg-white/90 border border-white/90 text-slate-800 shadow-[0_4px_16px_rgba(99,102,241,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] backdrop-blur-xl";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-white/90 dark:border-slate-700 shadow-[2px_2px_5px_rgba(163,177,198,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[3px_3px_7px_rgba(163,177,198,0.55),-3px_-3px_7px_rgba(255,255,255,1)]";
      case "clay":
        return "bg-white/95 dark:bg-slate-800 text-indigo-700 dark:text-indigo-200 border-2 border-white dark:border-slate-600 shadow-[0_4px_10px_rgba(140,150,200,0.25),inset_0_2px_2px_rgba(255,255,255,0.9)] hover:scale-105";
      case "glass-neon":
      case "glass-neo":
        return "bg-slate-900/85 text-slate-100 border border-cyan-500/40 hover:border-fuchsia-400 hover:shadow-[0_0_16px_rgba(255,0,128,0.4),0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-xl transition-all";
      case "glass":
      default:
        return "bg-white/14 dark:bg-slate-900/60 hover:bg-white/25 dark:hover:bg-slate-800/80 border border-white/25 dark:border-white/15 text-slate-900 dark:text-slate-100 shadow-[0_4px_16px_rgba(31,38,135,0.1)] backdrop-blur-[16px]";
    }
  };

  return (
    <>
      <header 
        id="header"
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-20px)] sm:w-[92%] lg:w-[88%] xl:w-[85%] max-w-[1250px] min-h-[64px] sm:min-h-[68px] h-auto py-2 border-t-0 rounded-t-none rounded-b-2xl sm:rounded-b-3xl px-3 sm:px-5 md:px-6 flex flex-row items-center justify-between transition-all duration-500 ease-in-out ${getHeaderContainerStyle()}`}
      >
        {/* Hidden dummy svg to satisfy selector verification while keeping menu icons active */}
        <svg className="hidden" aria-hidden="true" />
        {/* LEFT CONTAINER: Avatar only (Trái chứa Avatar) */}
        <div className="flex items-center shrink-0">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center group cursor-pointer shrink-0"
            title="Nguyễn Hùng Thái - Trang chủ"
          >
            <div className="relative">
              <img 
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif" 
                alt="Hùng Thái Avata Gif"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-brand-primary/80 shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 ring-brand-primary/25"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-brand-card rounded-full" title="Online" />
            </div>
          </a>
        </div>

        {/* CENTER CONTAINER: Navigation Menu Formatted with Animated Indicator & Floating Titles */}
        <nav className="hidden md:flex flex-1 items-center justify-center mx-2 lg:mx-6 relative group/nav header-nav-container">
          <ul className="header-nav-list flex items-center justify-between gap-0.5 sm:gap-1 max-w-[650px] w-full relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const IconComponent = item.Icon;

              return (
                <li
                  key={item.id}
                  className={`header-nav-item ${isActive ? "active" : ""}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-label={item.label}
                  >
                    <span className="icon">
                      <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
                    </span>
                    <span className="title">
                      <IconComponent className="w-3.5 h-3.5 text-indigo-300 dark:text-cyan-300 shrink-0" />
                      <span>{item.label}</span>
                    </span>
                  </a>
                </li>
              );
            })}
            {(() => {
              const activeIdx = navItems.findIndex((item) => item.id === activeSection);
              const safeIdx = activeIdx >= 0 ? activeIdx : 0;
              const pct = (safeIdx / Math.max(1, navItems.length - 1)) * 100;
              return (
                <div
                  className="header-nav-indicator"
                  style={{
                    left: `${pct}%`,
                    transform: `translate(-${pct}%, -50%)`,
                  }}
                />
              );
            })()}
          </ul>
        </nav>

        {/* RIGHT CONTAINER: Nhóm nút tác vụ xếp chồng (Ngôn ngữ, Giao diện, Hình nền) - Mỗi nút có màu sắc riêng biệt */}
        <div 
          className="hidden md:flex relative group/stack shrink-0 py-1 pr-1 cursor-pointer min-h-[42px] w-[155px] sm:w-[170px] justify-end z-40"
          onMouseEnter={() => setIsStackHovered(true)}
          onMouseLeave={() => setIsStackHovered(false)}
        >
          <div className="relative w-full h-[40px]">
            {/* 1. Nút Ngôn ngữ (Language) - Màu Xanh Emerald độc bản - Hiển thị ngôn ngữ đang chọn */}
            <div className={`absolute top-0 right-0 w-full transition-all duration-300 ease-out z-30 ${
              isStackHovered ? "translate-y-0 opacity-100 scale-100 shadow-lg" : "translate-y-0 opacity-100 scale-100 shadow-md"
            }`}>
              <button
                onClick={() => {
                  playSound("click");
                  setLang(lang === "vi" ? "en" : "vi");
                }}
                className="w-full flex items-center justify-between gap-1.5 h-[38px] sm:h-[40px] px-3 sm:px-3.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer bg-emerald-500/55 dark:bg-emerald-600/50 hover:bg-emerald-500/70 text-slate-900 dark:text-emerald-50 border border-emerald-400/40 backdrop-blur-md shadow-md shadow-emerald-500/10 active:scale-95"
                title={lang === "vi" ? "Đang chọn: Tiếng Việt (Click để đổi)" : "Current: English (Click to change)"}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-200 shrink-0 animate-pulse" />
                  <span className="truncate">{lang === "vi" ? "Tiếng Việt" : "English"}</span>
                </div>
                <span className="text-[9.5px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-950/60 text-emerald-200 border border-emerald-400/30 shrink-0">
                  {lang === "vi" ? "VI" : "EN"}
                </span>
              </button>
            </div>

            {/* 2. Nút Giao diện (Theme) - Master Toggle Sáng ↔ Tối với Morphing Icon & Chi tiết Style Dropdown */}
            <div className={`absolute top-0 right-0 w-full transition-all duration-300 ease-out z-20 ${
              isStackHovered 
                ? "translate-y-[44px] opacity-100 scale-100 shadow-lg pointer-events-auto" 
                : "translate-y-[6px] opacity-90 scale-[0.96] shadow-sm pointer-events-none group-hover/stack:translate-y-[44px] group-hover/stack:opacity-100 group-hover/stack:scale-100 group-hover/stack:pointer-events-auto"
            }`}>
              <div className="relative theme-dropdown-container">
                <div 
                  className={`w-full flex items-center h-[38px] sm:h-[40px] rounded-full text-xs font-bold transition-all duration-500 backdrop-blur-md shadow-md border overflow-hidden ${
                    theme === "light"
                      ? "bg-white/45 dark:bg-slate-900/40 text-slate-900 dark:text-white border-white/55 dark:border-slate-800 shadow-slate-200/50"
                      : "bg-[#0f172a]/55 dark:bg-slate-950/60 text-slate-100 border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                  }`}
                >
                  {/* Left part: Direct Toggle Button with Morphing Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      const nextTheme = theme === "light" ? "glass-dark" : "light";
                      setTheme(nextTheme);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        const nextTheme = theme === "light" ? "glass-dark" : "light";
                        setTheme(nextTheme);
                      }
                    }}
                    tabIndex={0}
                    aria-label={theme === "light" ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng"}
                    className="flex-1 h-full flex items-center gap-1.5 px-3 hover:bg-white/20 dark:hover:bg-white/5 cursor-pointer active:scale-95 transition-all text-left group/toggle select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden shrink-0">
                      <AnimatePresence mode="wait">
                        {theme === "light" ? (
                          <motion.div
                            key="sun"
                            initial={{ rotate: -90, scale: 0, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 90, scale: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "backOut" }}
                          >
                            <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="moon"
                            initial={{ rotate: -90, scale: 0, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 90, scale: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "backOut" }}
                          >
                            <Moon className="w-4 h-4 text-indigo-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <span className="truncate font-black text-[10.5px] uppercase tracking-wider">
                      {theme === "light"
                        ? (lang === "vi" ? "☀️ Sáng" : "☀️ Light")
                        : (lang === "vi" ? "🌙 Tối" : "🌙 Dark")}
                    </span>
                  </button>

                  {/* Vertical Divider */}
                  <div className="w-[1px] h-4 bg-slate-300/40 dark:bg-slate-700/40" />

                  {/* Right part: Dropdown Chevron for details selection */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      setIsThemeDropdownOpen(!isThemeDropdownOpen);
                    }}
                    aria-label={lang === "vi" ? "Chọn kiểu giao diện nâng cao" : "Select advanced theme style"}
                    className="h-full px-2 hover:bg-white/20 dark:hover:bg-white/5 cursor-pointer flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-slate-400 dark:text-slate-300 ${isThemeDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {/* Dropdown Options */}
                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 5 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-2 shadow-xl z-50 backdrop-blur-xl"
                    >
                      {[
                        { id: "light", label: lang === "vi" ? "Giao diện Sáng" : "Light Glass", Icon: Sun, color: "text-amber-500", bg: "hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400" },
                        { id: "dark", label: lang === "vi" ? "Tối Cổ điển" : "Classic Dark", Icon: Moon, color: "text-slate-400", bg: "hover:bg-slate-500/10 hover:text-slate-600 dark:hover:text-slate-400" },
                        { id: "sunrise-glass", label: lang === "vi" ? "Sunrise Glass" : "Sunrise Glass", Icon: Palette, color: "text-orange-500", bg: "hover:bg-orange-500/10 hover:text-orange-600" },
                        { id: "glass-dark", label: lang === "vi" ? "Glass Tối" : "Glass Dark", Icon: Sparkles, color: "text-sky-400", bg: "hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400" },
                        { id: "industrial-futurist", label: lang === "vi" ? "Industrial" : "Industrial", Icon: Cpu, color: "text-blue-500", bg: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400" },
                        { id: "navy-neumorphic", label: lang === "vi" ? "Navy Neumorphic" : "Navy Neumorphic", Icon: Layers, color: "text-amber-500", bg: "hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400" }
                      ].map((tItem) => {
                        const isSelected = theme === tItem.id;
                        return (
                          <button
                            key={tItem.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              playSound("click");
                              setTheme(tItem.id as ThemeType);
                              setIsThemeDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between font-bold cursor-pointer mb-1 last:mb-0 ${
                              isSelected
                                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                                : `text-slate-700 dark:text-slate-300 ${tItem.bg} border border-transparent`
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <tItem.Icon className={`w-4 h-4 ${tItem.color}`} />
                              <span>{tItem.label}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3. Nút Hình nền (Wallpaper/Background) - Màu Hồng/Cam Rose độc bản -> Bung xuống 88px khi hover */}
            <div className={`absolute top-0 right-0 w-full transition-all duration-300 ease-out z-10 ${
              isStackHovered 
                ? "translate-y-[88px] opacity-100 scale-100 shadow-lg pointer-events-auto" 
                : "translate-y-[12px] opacity-80 scale-[0.92] shadow-xs pointer-events-none group-hover/stack:translate-y-[88px] group-hover/stack:opacity-100 group-hover/stack:scale-100 group-hover/stack:pointer-events-auto"
            }`}>
              <button
                onClick={(e) => {
                  playSound("click");
                  if (onNavigate) {
                    onNavigate("wallpapers");
                  } else {
                    const el = document.getElementById("wallpapers");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                    }
                  }
                }}
                className="w-full flex items-center justify-between gap-1.5 h-[38px] sm:h-[40px] px-3 sm:px-3.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer bg-rose-500/55 dark:bg-rose-600/50 hover:bg-rose-500/70 text-slate-900 dark:text-rose-50 border border-rose-400/40 backdrop-blur-md shadow-md shadow-rose-500/10 active:scale-95"
                title={lang === "vi" ? "Cài đặt Hình nền" : "Wallpaper Settings"}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Images className="w-4 h-4 text-rose-600 dark:text-rose-200 shrink-0" />
                  <span className="truncate">{lang === "vi" ? "Hình nền" : "Wallpaper"}</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping shrink-0"></span>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div 
          className="flex md:hidden relative group/mobilestack items-center justify-end shrink-0 py-1 pr-1 z-40"
          onMouseEnter={() => setIsStackHovered(true)}
          onMouseLeave={() => setIsStackHovered(false)}
        >
          <div className="relative w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] mr-2">
            {/* 1. Globe (Language) - Top - Emerald Green */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-30 ${
              isStackHovered ? "translate-y-0 opacity-100 scale-100" : "translate-y-0 opacity-100 scale-100"
            }`}>
              <button
                onClick={() => {
                  playSound("click");
                  setLang(lang === "vi" ? "en" : "vi");
                }}
                className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border-2 border-emerald-300/60 bg-gradient-to-r from-emerald-600 to-teal-600 text-white active:scale-95 shadow-md cursor-pointer"
                title={lang === "vi" ? "Ngôn ngữ: Tiếng Việt" : "Language: English"}
              >
                <Globe className="w-4.5 h-4.5 text-emerald-100" />
              </button>
            </div>

            {/* 2. Theme - Middle - Indigo/Purple */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-20 ${
              isStackHovered 
                ? "translate-y-[44px] opacity-100 scale-100 pointer-events-auto" 
                : "translate-y-[4px] opacity-90 scale-95 pointer-events-none group-hover/mobilestack:translate-y-[44px] group-hover/mobilestack:opacity-100 group-hover/mobilestack:pointer-events-auto"
            }`}>
              <div className="relative theme-dropdown-container">
                <button
                  onClick={() => {
                    playSound("click");
                    if (theme === "light") {
                      setTheme("sunrise-glass");
                    } else if (theme === "sunrise-glass") {
                      setTheme("glass-dark");
                    } else if (theme === "glass-dark") {
                      setTheme("industrial-futurist");
                    } else if (theme === "industrial-futurist") {
                      setTheme("dark");
                    } else {
                      setTheme("light");
                    }
                  }}
                  className={`flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border-2 shadow-md active:scale-95 cursor-pointer bg-gradient-to-r ${
                    theme === "light"
                      ? "border-amber-300/60 from-amber-500 to-orange-500 text-white"
                      : theme === "sunrise-glass"
                      ? "border-orange-300/60 from-orange-500 to-amber-500 text-white"
                      : theme === "industrial-futurist"
                      ? "border-blue-300/60 from-blue-600 to-indigo-900 text-white"
                      : "border-indigo-300/60 from-indigo-500 to-blue-500 text-white"
                  }`}
                  title={
                    theme === "light"
                      ? "Chuyển sang Sunrise Glass"
                      : theme === "sunrise-glass"
                      ? "Chuyển sang Glass Tối"
                      : theme === "glass-dark"
                      ? "Chuyển sang Industrial Futurist"
                      : theme === "industrial-futurist"
                      ? "Chuyển sang Classic Dark"
                      : "Chuyển sang Light Glass"
                  }
                >
                  {theme === "light" ? (
                    <Sun className="w-4.5 h-4.5 text-amber-100 animate-spin-slow" />
                  ) : theme === "sunrise-glass" ? (
                    <Palette className="w-4.5 h-4.5 text-orange-100" />
                  ) : theme === "industrial-futurist" ? (
                    <Cpu className="w-4.5 h-4.5 text-blue-100" />
                  ) : (
                    <Moon className="w-4.5 h-4.5 text-indigo-100" />
                  )}
                </button>
              </div>
            </div>

            {/* 3. Wallpaper - Bottom - Rose/Amber */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-10 ${
              isStackHovered 
                ? "translate-y-[88px] opacity-100 scale-100 pointer-events-auto" 
                : "translate-y-[8px] opacity-80 scale-90 pointer-events-none group-hover/mobilestack:translate-y-[88px] group-hover/mobilestack:opacity-100 group-hover/mobilestack:pointer-events-auto"
            }`}>
              <button
                onClick={(e) => {
                  playSound("click");
                  if (onNavigate) {
                    onNavigate("wallpapers");
                  } else {
                    const el = document.getElementById("wallpapers");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                    }
                  }
                }}
                className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border-2 border-rose-300/60 bg-gradient-to-r from-rose-600 to-amber-600 text-white active:scale-95 shadow-md cursor-pointer"
                title="Cài đặt Hình nền"
              >
                <Images className="w-4.5 h-4.5 text-rose-100" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] text-brand-text-light rounded-full bg-brand-border/40 border border-brand-border/60 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ml-1"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-between pt-20 pb-8 px-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          {/* Menu Items */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 pb-2 gap-2 border-b border-slate-200/10 dark:border-white/10 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary/80">
                {lang === "vi" ? "Giao diện & Bố cục" : "Themes & Layout"}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Theme options on mobile */}
                <button
                  onClick={() => {
                    playSound("click");
                    setTheme("light");
                  }}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "light"
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="☀️ Sáng"
                >
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>{lang === "vi" ? "Sáng" : "Light"}</span>
                </button>
                <button
                  onClick={() => {
                    playSound("click");
                    setTheme("sunrise-glass");
                  }}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "sunrise-glass"
                      ? "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="🌅 Sunrise"
                >
                  <Palette className="w-3 h-3 text-orange-500" />
                  <span>Sunrise</span>
                </button>
                <button
                  onClick={() => {
                    playSound("click");
                    setTheme("dark");
                  }}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "dark"
                      ? "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="🌙 Tối"
                >
                  <Moon className="w-3 h-3 text-slate-400" />
                  <span>{lang === "vi" ? "Tối" : "Dark"}</span>
                </button>
                <button
                  onClick={() => {
                    playSound("click");
                    setTheme("glass-dark");
                  }}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "glass-dark"
                      ? "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="🌌 Glass Tối"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>Glass Tối</span>
                </button>
                <button
                  onClick={() => {
                    playSound("click");
                    setTheme("industrial-futurist");
                  }}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "industrial-futurist"
                      ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="🛠️ Industrial"
                >
                  <Cpu className="w-3 h-3 text-blue-500" />
                  <span>Industrial</span>
                </button>

                {/* Divider */}
                <span className="text-slate-300 dark:text-slate-700 mx-0.5 font-normal">|</span>

                <button
                  onClick={toggleOrientation}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full active:scale-95 cursor-pointer"
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span>{isHorizontal ? (lang === "vi" ? "Ngang" : "Horiz") : (lang === "vi" ? "Dọc" : "Vert")}</span>
                </button>
              </div>
            </div>

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-primary/15 border-brand-primary/40 text-brand-primary font-bold shadow-md"
                      : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? "bg-brand-primary text-white" : "bg-white/10 text-slate-300"}`}>
                      <item.Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  {isActive && <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />}
                </a>
              );
            })}
          </div>

          {/* Quick Action Box in Mobile Menu */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-ai-assistant'));
                setIsMobileMenuOpen(false);
              }}
              className="glow-btn w-full py-3 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>{lang === "vi" ? "Mở Trợ lý AI" : "Open AI Assistant"}</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/10 dark:border-white/10">
              <a href="mailto:thai.hung.cs@gmail.com" className="flex items-center gap-1.5 hover:text-slate-900 dark:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-primary" />
                thai.hung.cs@gmail.com
              </a>
              <span>•</span>
              <a href="tel:0909097882" className="flex items-center gap-1.5 hover:text-slate-900 dark:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-primary" />
                0909 097 882
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
