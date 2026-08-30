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
  Palette
} from "lucide-react";
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
    { id: "interview", label: t("nav.interview"), Icon: MessagesSquare },
    { id: "tuvi", label: t("nav.tuvi"), Icon: Star },
    { id: "memories", label: t("nav.memories"), Icon: Camera },
    { id: "systems", label: t("nav.systems"), Icon: Server },
    { id: "contact", label: t("nav.contact"), Icon: PhoneCall },
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

  // Helper styles based on active Theme
  const getHeaderContainerStyle = () => {
    switch (theme) {
      case "glass-vivid":
        return "bg-white/70 border-2 border-white/90 shadow-[0_16px_40px_rgba(99,102,241,0.18),0_4px_16px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl";
      case "nec":
        return "bg-[#f0f3f8]/95 dark:bg-slate-900/95 border-2 border-white/90 dark:border-slate-800/90 shadow-[-4px_-4px_12px_rgba(255,255,255,0.9),_4px_4px_14px_rgba(163,177,198,0.4)] backdrop-blur-xl";
      case "clay":
        return "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-[0_14px_34px_rgba(160,165,210,0.32),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl";
      case "glass-neo":
        return "bg-slate-950/85 border border-cyan-500/35 shadow-[0_12px_36px_rgba(0,0,0,0.75),0_0_24px_rgba(0,240,255,0.22),0_0_36px_rgba(236,72,153,0.15)] backdrop-blur-2xl";
      case "glass":
      default:
        return "bg-white/12 dark:bg-slate-900/55 border border-white/25 dark:border-white/15 shadow-[0_8px_32px_0_rgba(31,38,135,0.14)] backdrop-blur-[16px]";
    }
  };

  const getNavContainerStyle = () => {
    switch (theme) {
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
      case "glass-vivid":
        return isActive
          ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 text-white font-black shadow-[0_6px_20px_rgba(124,58,237,0.35)] scale-110 z-10 border border-white/60 ring-2 ring-pink-300/50"
          : "text-slate-700 hover:text-indigo-600 hover:bg-white/50 border border-transparent font-semibold";
      case "nec":
        return isActive
          ? "bg-[#e2e8f0] dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.7),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] scale-110 ring-2 ring-purple-400/40 z-10 font-bold"
          : "bg-[#f0f3f8] dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-[2px_2px_5px_rgba(163,177,198,0.45),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-[3px_3px_7px_rgba(163,177,198,0.6),-3px_-3px_7px_rgba(255,255,255,1)]";
      case "clay":
        return isActive
          ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white border-2 border-white shadow-[0_6px_16px_rgba(99,102,241,0.5),inset_0_2px_4px_rgba(255,255,255,0.6)] scale-115 z-10 font-bold"
          : "bg-white/95 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-2 border-white dark:border-slate-600 shadow-[0_4px_8px_rgba(140,150,200,0.22),inset_0_2px_2px_rgba(255,255,255,0.9)] hover:scale-110 hover:shadow-[0_6px_14px_rgba(140,150,200,0.35)]";
      case "glass-neon":
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

  const getActionButtonStyle = () => {
    switch (theme) {
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

        {/* CENTER CONTAINER: Navigation Menu Formatted by Theme */}
        <nav className={`hidden md:flex flex-1 items-center justify-between gap-1 sm:gap-1.5 p-1 rounded-full overflow-x-auto no-scrollbar mx-4 lg:mx-8 ${getNavContainerStyle()}`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.Icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`group relative w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${getNavItemStyle(isActive)}`}
                aria-label={item.label}
              >
                <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-115 shrink-0" />
                
                {/* Custom Elegant CSS Tooltip */}
                <span className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-950/95 border border-white/10 text-white text-[10px] font-black rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">
                  {item.label}
                </span>
              </a>
            );
          })}
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

            {/* 2. Nút Giao diện (Theme) - Màu Tím Indigo độc bản - Hiển thị giao diện đang chọn -> Bung xuống 44px khi hover */}
            <div className={`absolute top-0 right-0 w-full transition-all duration-300 ease-out z-20 ${
              isStackHovered 
                ? "translate-y-[44px] opacity-100 scale-100 shadow-lg pointer-events-auto" 
                : "translate-y-[6px] opacity-90 scale-[0.96] shadow-sm pointer-events-none group-hover/stack:translate-y-[44px] group-hover/stack:opacity-100 group-hover/stack:scale-100 group-hover/stack:pointer-events-auto"
            }`}>
              <div className="relative theme-dropdown-container">
                <button
                  onClick={() => {
                    playSound("click");
                    setIsThemeDropdownOpen(!isThemeDropdownOpen);
                  }}
                  className="w-full flex items-center justify-between gap-1.5 h-[38px] sm:h-[40px] px-3 sm:px-3.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer bg-indigo-500/55 dark:bg-indigo-600/50 hover:bg-indigo-500/70 text-slate-900 dark:text-indigo-50 border border-indigo-400/40 backdrop-blur-md shadow-md shadow-indigo-500/10 active:scale-95"
                  title={lang === "vi" ? "Đổi giao diện" : "Change Theme"}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    {theme === "light" ? <Sun className="w-4 h-4 text-amber-500 shrink-0" /> :
                     <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-200 shrink-0" />}
                    <span className="truncate">
                      {theme === "light" ? (lang === "vi" ? "Giao diện Sáng Tinh Tế" : "Pure Light Modern") :
                       (lang === "vi" ? "Giao diện Glass" : "Glass Theme")}
                    </span>
                  </div>
                  <span className="bg-purple-950/60 text-purple-200 border border-purple-400/30 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shrink-0">
                    {theme === "light" ? "Light" : "Glass"}
                  </span>
                </button>

                {/* Submenu chọn Theme bung sang bên trái khi rê/click */}
                {isThemeDropdownOpen && (
                  <div className="absolute top-0 right-full mr-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col p-1.5 animate-in fade-in slide-in-from-right-2 text-white">
                    <button
                      onClick={() => { playSound("switch"); setTheme("light"); setIsThemeDropdownOpen(false); }}
                      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${theme === "light" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Giao diện Sáng Tinh Tế</span>
                    </button>
                    <button
                      onClick={() => { playSound("switch"); setTheme("glass"); setIsThemeDropdownOpen(false); }}
                      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${theme === "glass" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Giao diện Glass</span>
                    </button>
                    <button
                      onClick={() => { playSound("switch"); setTheme("liquid-glass"); setIsThemeDropdownOpen(false); }}
                      className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${theme === "liquid-glass" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-300 hover:bg-slate-800"}`}
                    >
                      <Moon className="w-4 h-4 text-cyan-400" />
                      <span>Liquid Glass</span>
                    </button>
                  </div>
                )}
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
                    setIsThemeDropdownOpen(!isThemeDropdownOpen);
                  }}
                  className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border-2 border-indigo-300/60 bg-gradient-to-r from-indigo-600 to-purple-600 text-white active:scale-95 shadow-md cursor-pointer"
                  title="Giao diện"
                >
                  {theme === "light" ? <Sun className="w-4.5 h-4.5 text-amber-200" /> :
                   <Moon className="w-4.5 h-4.5 text-indigo-100" />}
                </button>

                {isThemeDropdownOpen && (
                  <div className="absolute top-0 right-full mr-2 w-52 bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-xl overflow-hidden z-[100] flex flex-col p-1.5 animate-in slide-in-from-right-2 text-white">
                    <button
                      onClick={() => { playSound("switch"); setTheme("light"); setIsThemeDropdownOpen(false); }}
                      className={`flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${theme === "light" ? "bg-amber-500/20 text-amber-300" : "text-slate-300"}`}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Giao diện Sáng Tinh Tế</span>
                    </button>
                    <button
                      onClick={() => { playSound("switch"); setTheme("glass"); setIsThemeDropdownOpen(false); }}
                      className={`flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${theme === "glass" ? "bg-indigo-500/20 text-indigo-300" : "text-slate-300"}`}
                    >
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Giao diện Glass</span>
                    </button>
                    <button
                      onClick={() => { playSound("switch"); setTheme("liquid-glass"); setIsThemeDropdownOpen(false); }}
                      className={`flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${theme === "liquid-glass" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-300"}`}
                    >
                      <Moon className="w-4 h-4 text-cyan-400" />
                      <span>Liquid Glass</span>
                    </button>
                  </div>
                )}
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
        <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-between pt-20 pb-8 px-6 bg-slate-950/80 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          {/* Menu Items */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between px-3 pb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary/80">
                Menu điều hướng
              </span>
              <button
                onClick={toggleOrientation}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full active:scale-95 cursor-pointer"
              >
                <Columns3 className="w-4 h-4" />
                <span>{isHorizontal ? "Chiều dọc" : "Chiều ngang"}</span>
              </button>
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

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
              <a href="mailto:hungthai84@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-primary" />
                hungthai84@gmail.com
              </a>
              <span>•</span>
              <a href="tel:0909097882" className="flex items-center gap-1.5 hover:text-white transition-colors">
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
