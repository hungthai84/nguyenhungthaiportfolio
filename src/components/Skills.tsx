import React, { useState } from "react";
import { PageBanner } from "./PageBanner";
import { useLanguage } from "../context/LanguageContext";
import { 
  Printer, 
  Sun, 
  Moon, 
  Target, 
  TrendingUp, 
  Zap, 
  LayoutGrid, 
  ChevronsUpDown, 
  Gem, 
  ChevronUp, 
  Rocket, 
  Bot, 
  HeartHandshake, 
  BarChart3, 
  Monitor, 
  ShieldAlert, 
  Cpu, 
  Users, 
  BadgeDollarSign, 
  PieChart, 
  Briefcase, 
  Users2, 
  Award, 
  Globe,
  Database,
  Workflow,
  UserCheck,
  ShieldCheck,
  FolderKanban,
  MessageSquare,
  Languages,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function SwotGradientIcon({ type, extraClass = "w-9 h-9 transform transition-transform group-hover:scale-110 duration-300 drop-shadow-sm" }: { type: "S" | "W" | "O" | "T"; extraClass?: string }) {
  const id = `swot-grad-${type}`;
  switch (type) {
    case "S": // Diamond / Gem / Strength
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-gem`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id={`${id}-facet`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.4"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <polygon points="50,16 84,36 50,86 16,36" fill={`url(#${id}-gem)`} />
            <polygon points="50,16 68,36 50,86 32,36" fill={`url(#${id}-facet)`} opacity="0.9" />
            <polygon points="50,16 84,36 68,36" fill="#bfdbfe" opacity="0.8" />
            <polygon points="50,16 16,36 32,36" fill="#93c5fd" opacity="0.8" />
            <polygon points="32,36 68,36 50,86" fill="#1e40af" opacity="0.6" />
          </g>
        </svg>
      );
    case "O": // Rocket / Opportunity
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
            <linearGradient id={`${id}-wing`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id={`${id}-flame`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#9333ea" floodOpacity="0.4"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 50 14 C 64 24 72 44 68 68 L 32 68 C 28 44 36 24 50 14 Z" fill={`url(#${id}-body)`} />
            <path d="M 32 52 L 18 68 L 32 68 Z" fill={`url(#${id}-wing)`} />
            <path d="M 68 52 L 82 68 L 68 68 Z" fill={`url(#${id}-wing)`} />
            <circle cx="50" cy="38" r="8" fill="#ffffff" opacity="0.9" />
            <circle cx="50" cy="38" r="5" fill="#3b82f6" />
            <polygon points="44,68 56,68 50,88" fill={`url(#${id}-flame)`} />
          </g>
        </svg>
      );
    case "W": // Target Bullseye / Growth
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-target`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id={`${id}-arrow`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#d97706" floodOpacity="0.4"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <circle cx="48" cy="52" r="32" fill={`url(#${id}-target)`} />
            <circle cx="48" cy="52" r="22" fill="#ffffff" />
            <circle cx="48" cy="52" r="13" fill={`url(#${id}-target)`} />
            <circle cx="48" cy="52" r="5" fill="#ffffff" />
            <path d="M 78 22 L 52 48 M 78 22 L 64 22 M 78 22 L 78 36" stroke={`url(#${id}-arrow)`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      );
    case "T": // Shield / Alert / Challenge
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-shield`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>
            <linearGradient id={`${id}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#e11d48" floodOpacity="0.4"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            <path d="M 50 16 L 82 28 C 82 58 68 76 50 86 C 32 76 18 58 18 28 Z" fill={`url(#${id}-shield)`} />
            <path d="M 50 22 L 76 32 C 76 56 64 71 50 80 Z" fill="#ffffff" opacity="0.25" />
            <path d="M 50 34 L 50 56 M 50 64 L 50 67" stroke={`url(#${id}-accent)`} strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}

type CardKey = "swot-s" | "swot-o" | "swot-w" | "swot-t";

export function Skills() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const isVi = language === "vi";

  // Manage individual card collapse states (false = expanded, true = collapsed)
  const [collapsedCards, setCollapsedCards] = useState<Record<CardKey, boolean>>({
    "swot-s": false,
    "swot-o": false,
    "swot-w": false,
    "swot-t": false,
  });

  const toggleSingleCard = (cardKey: CardKey) => {
    setCollapsedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  const areAllCollapsed = Object.values(collapsedCards).every(Boolean);

  const toggleAllCards = () => {
    const nextState = !areAllCollapsed;
    setCollapsedCards({
      "swot-s": nextState,
      "swot-o": nextState,
      "swot-w": nextState,
      "swot-t": nextState,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleTheme = () => {
    setTheme("light");
  };

  return (
    <div
      id="skills"
      className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 custom-scrollbar overflow-x-hidden overflow-y-auto relative font-['Play',sans-serif]"
    >
      {/* Component Specific Style Injector for Pixel-Exact Glassmorphism & Animations */}
      <style>{`
        /* Hiệu ứng Kính Mờ (Glassmorphism) */
        .skills-glass-panel {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 30px 0 rgba(31, 38, 135, 0.07);
        }

        .dark .skills-glass-panel {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.45);
        }

        /* Thẻ Phủ Màu Chuyên Biệt Cho 4 Nhánh SWOT */
        .skills-glass-swot-blue {
          background: linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(219, 234, 254, 0.7) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(147, 197, 253, 0.6);
          box-shadow: 0 8px 24px -6px rgba(37, 99, 235, 0.12);
        }
        .dark .skills-glass-swot-blue {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 58, 138, 0.3) 100%);
          border: 1px solid rgba(59, 130, 246, 0.25);
          box-shadow: 0 10px 30px -6px rgba(59, 130, 246, 0.2);
        }

        .skills-glass-swot-purple {
          background: linear-gradient(135deg, rgba(250, 245, 255, 0.9) 0%, rgba(243, 232, 255, 0.7) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(216, 180, 254, 0.6);
          box-shadow: 0 8px 24px -6px rgba(124, 58, 237, 0.12);
        }
        .dark .skills-glass-swot-purple {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(88, 28, 135, 0.3) 100%);
          border: 1px solid rgba(139, 92, 246, 0.25);
          box-shadow: 0 10px 30px -6px rgba(139, 92, 246, 0.2);
        }

        .skills-glass-swot-amber {
          background: linear-gradient(135deg, rgba(255, 251, 235, 0.9) 0%, rgba(254, 243, 199, 0.7) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(253, 230, 138, 0.6);
          box-shadow: 0 8px 24px -6px rgba(217, 119, 6, 0.12);
        }
        .dark .skills-glass-swot-amber {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(120, 53, 15, 0.3) 100%);
          border: 1px solid rgba(245, 158, 11, 0.25);
          box-shadow: 0 10px 30px -6px rgba(245, 158, 11, 0.2);
        }

        .skills-glass-swot-rose {
          background: linear-gradient(135deg, rgba(255, 241, 242, 0.9) 0%, rgba(254, 226, 226, 0.7) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(254, 205, 211, 0.6);
          box-shadow: 0 8px 24px -6px rgba(225, 29, 72, 0.12);
        }
        .dark .skills-glass-swot-rose {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(136, 19, 55, 0.3) 100%);
          border: 1px solid rgba(244, 63, 94, 0.25);
          box-shadow: 0 10px 30px -6px rgba(244, 63, 94, 0.2);
        }

        /* Thẻ con bên trong */
        .skills-glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }

        .dark .skills-glass-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .skills-hover-lift {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }
        .skills-hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
        }
        .dark .skills-hover-lift:hover {
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5);
        }

        /* Hoạt họa Thu Gọn / Mở Rộng Chuyên Nghiệp */
        .skills-swot-collapse-grid {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
          opacity: 1;
        }

        .skills-swot-collapse-grid.is-collapsed {
          grid-template-rows: 0fr;
          opacity: 0;
          pointer-events: none;
        }

        .skills-swot-collapse-inner {
          overflow: hidden;
          min-height: 0;
        }

        /* Tối ưu hóa khi In / Xuất PDF */
        @media print {
          .skills-glass-panel, .skills-glass-card, [class*="skills-glass-swot-"] { 
            background: #fff !important; 
            border: 1px solid #ddd !important; 
            box-shadow: none !important; 
          }
          #printBtn, #themeToggle, #toggleAllSwot, .swot-toggle-btn { 
            display: none !important; 
          }
          .skills-swot-collapse-grid { 
            grid-template-rows: 1fr !important; 
            opacity: 1 !important; 
          }
        }
      `}</style>

      {/* Hiệu Ứng Vầng Sáng Nền */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/15 dark:bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-purple-500/15 dark:bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-96 h-96 bg-pink-500/10 dark:bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-emerald-500/15 dark:bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      {/* Phần Tiêu Đề Đầu Trang (Card Tiêu Đề) */}
      <div id="hero-banner" className="w-full mb-[10px]">
        <PageBanner
          title={isVi ? "Bản đồ năng lực" : "Core professional competency map"}
          subtitle={
            isVi
              ? "Tri thức là sức mạnh cội nguồn, kỹ năng thực chiến mở ra mọi cánh cửa thành công."
              : "Knowledge is foundational power; practical skills open every door to success."
          }
          tag={isVi ? "KỸ NĂNG & SWOT" : "SKILLS & SWOT"}
          iconType="skills"
          gradient="from-slate-950 via-purple-950 to-indigo-950"
        />
      </div>

      {/* THẺ GOM MA TRẬN 4 THẺ SWOT */}
      <section className="bg-transparent backdrop-blur-none rounded-2xl sm:rounded-3xl border border-transparent shadow-none p-0 sm:p-0 space-y-4">
        {/* Header Thẻ Gom SWOT */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80 dark:border-slate-800/80 px-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-purple-600 rounded-full shrink-0" />
            <LayoutGrid className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 tracking-wide">
              {isVi ? "Phân tích ma trận SWOT cá nhân" : "Personal SWOT matrix analysis"}
            </h3>
          </div>

          <button
            id="toggleAllSwot"
            onClick={toggleAllCards}
            className="px-3 py-1.5 rounded-xl skills-glass-card hover:bg-white dark:hover:bg-slate-100 dark:bg-slate-800 hover:scale-105 active:scale-95 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-sm border border-slate-300/60 dark:border-slate-700 cursor-pointer ml-auto"
            title="Chuyển đổi trạng thái tất cả các thẻ"
          >
            <ChevronsUpDown id="toggleAllIcon" className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span id="toggleAllText">
              {areAllCollapsed ? "Mở rộng tất cả" : "Thu gọn tất cả"}
            </span>
          </button>
        </div>

        {/* 4 Khối SWOT Ghép Thành Vòng Tròn Tâm (Hỗ Trợ Thu Gọn / Mở Rộng) */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-[10px]">

        {/* 1. ĐIỂM MẠNH (S - Strengths) */}
        <section
          id="swot-s"
          className={`skills-glass-swot-blue rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300 ${
            collapsedCards["swot-s"] ? "h-[50%] min-h-[120px] self-start" : "h-full"
          }`}
        >
          {/* Góc Phần Tư S */}
          <div
            className="absolute bottom-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-tl-full rounded-br-2xl bg-gradient-to-br from-blue-500/30 via-blue-500/50 to-blue-600/70 dark:from-blue-500/35 dark:via-blue-500/50 dark:to-blue-600/70 border-t-2 border-l-2 border-blue-400/70 dark:border-blue-400/70 backdrop-blur-md flex items-center justify-center pl-2 pt-2 text-blue-900 dark:text-blue-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="S - Điểm Mạnh"
          >
            <span>S</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ S */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none"
              onClick={() => toggleSingleCard("swot-s")}
            >
              <div className="flex items-center gap-2.5">
                <div className="ultraflex-icon shrink-0 flex items-center justify-center">
                  <SwotGradientIcon type="S" extraClass="w-9 h-9 transform transition-transform group-hover:scale-110 duration-300 drop-shadow-sm" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-blue-800 dark:text-blue-300 leading-none">
                    Điểm mạnh
                  </h2>
                  <p className="text-[11px] font-semibold text-blue-700/90 dark:text-blue-400/90 mt-0.5">
                    Năng lực cốt lõi
                  </p>
                </div>
              </div>
              <button
                className="swot-toggle-btn p-1.5 rounded-lg skills-glass-card hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 transition-transform duration-300"
                title="Thu gọn / Mở rộng"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform duration-300 ${
                    collapsedCards["swot-s"] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ S */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col ${
                collapsedCards["swot-s"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Những thế mạnh vượt trội đã được chứng minh và khẳng định qua thực tiễn quản lý, vận hành hệ thống.
                  </p>

                  <ul className="space-y-1.5 text-xs font-medium">
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Kiến thức chuyên sâu về Hệ Thống CRM</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        95%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Phân tích &amp; Khai thác dữ liệu khách hàng</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        90%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Xây dựng &amp; Chuẩn hóa quy trình dịch vụ</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        90%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Tư duy lấy khách hàng làm trung tâm</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        90%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Lãnh đạo, Đào tạo &amp; Phát triển đội ngũ</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        90%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Năng lực giải quyết vấn đề phức tạp</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        90%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-blue-200/60 dark:border-blue-500/20">
                      <span className="flex items-center gap-2">
                        <HeartHandshake className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Quản trị Trải Nghiệm Khách Hàng (CX)</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[11px]">
                        90%
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t border-blue-300/50 dark:border-blue-500/20 text-[10px] font-bold text-blue-800 dark:text-blue-300 pr-12">
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-blue-200/80 dark:border-blue-500/30">
                    #QuanTriCRM
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-blue-200/80 dark:border-blue-500/30">
                    #DuLieuKhachHang
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-blue-200/80 dark:border-blue-500/30">
                    #TraiNghiemCX
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-blue-200/80 dark:border-blue-500/30">
                    #LanhDaoDoiNgu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CƠ HỘI (O - Opportunities) */}
        <section
          id="swot-o"
          className={`skills-glass-swot-purple rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300 ${
            collapsedCards["swot-o"] ? "h-[50%] min-h-[120px] self-start" : "h-full"
          }`}
        >
          {/* Góc Phần Tư O */}
          <div
            className="absolute bottom-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-tr-full rounded-bl-2xl bg-gradient-to-bl from-purple-500/30 via-purple-500/50 to-purple-600/70 dark:from-purple-500/35 dark:via-purple-500/50 dark:to-purple-600/70 border-t-2 border-r-2 border-purple-400/70 dark:border-purple-400/70 backdrop-blur-md flex items-center justify-center pr-2 pt-2 text-purple-900 dark:text-purple-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="O - Cơ Hội"
          >
            <span>O</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ O */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none"
              onClick={() => toggleSingleCard("swot-o")}
            >
              <div className="flex items-center gap-2.5">
                <div className="ultraflex-icon shrink-0 flex items-center justify-center">
                  <SwotGradientIcon type="O" extraClass="w-9 h-9 transform transition-transform group-hover:scale-110 duration-300 drop-shadow-sm" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-purple-800 dark:text-purple-300 leading-none">
                    Cơ hội
                  </h2>
                  <p className="text-[11px] font-semibold text-purple-700/90 dark:text-purple-400/90 mt-0.5">
                    Thời cơ phát triển
                  </p>
                </div>
              </div>
              <button
                className="swot-toggle-btn p-1.5 rounded-lg skills-glass-card hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 transition-transform duration-300"
                title="Thu gọn / Mở rộng"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform duration-300 ${
                    collapsedCards["swot-o"] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ O */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col ${
                collapsedCards["swot-o"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Làn sóng công nghệ và nhu cầu thị trường mở ra các đòn bẩy lớn để tạo bước nhảy vọt trong sự nghiệp.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 rounded-xl skills-glass-card border-purple-200/60 dark:border-purple-500/20 flex flex-col items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-700 dark:text-purple-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        AI &amp; Tự Động Hóa
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Ứng dụng AI, Chatbot và tự động hóa quy trình nghiệp vụ.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl skills-glass-card border-purple-200/60 dark:border-purple-500/20 flex flex-col items-center justify-center">
                      <HeartHandshake className="w-4 h-4 text-purple-700 dark:text-purple-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        Chiến Lược Trải Nghiệm CX
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Dẫn dắt chiến lược nâng tầm trải nghiệm đa điểm chạm.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl skills-glass-card border-purple-200/60 dark:border-purple-500/20 flex flex-col items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-purple-700 dark:text-purple-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        Quản Trị CX Bằng Dữ Liệu
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Khai thác dữ liệu sâu, đo lường &amp; cá nhân hóa dịch vụ.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl skills-glass-card border-purple-200/60 dark:border-purple-500/20 flex flex-col items-center justify-center">
                      <Monitor className="w-4 h-4 text-purple-700 dark:text-purple-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        Chuyển Đổi Số Toàn Diện
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Thúc đẩy số hóa CRM, cổng tự phục vụ và hệ sinh thái số.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t border-purple-300/50 dark:border-purple-500/20 text-[10px] font-bold text-purple-800 dark:text-purple-300 pl-12">
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-purple-200/80 dark:border-purple-500/30">
                    #TriTueNhanTao
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-purple-200/80 dark:border-purple-500/30">
                    #ChienLuocCX
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-purple-200/80 dark:border-purple-500/30">
                    #QuanTriDuLieu
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-purple-200/80 dark:border-purple-500/30">
                    #ChuyenDoiSo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ĐIỂM CẦN PHÁT TRIỂN (W - Weaknesses) */}
        <section
          id="swot-w"
          className={`skills-glass-swot-amber rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300 ${
            collapsedCards["swot-w"] ? "h-[50%] min-h-[120px] self-start" : "h-full"
          }`}
        >
          {/* Góc Phần Tư W */}
          <div
            className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-bl-full rounded-tr-2xl bg-gradient-to-tr from-amber-500/30 via-amber-500/50 to-amber-600/70 dark:from-amber-500/35 dark:via-amber-500/50 dark:to-amber-600/70 border-b-2 border-l-2 border-amber-400/70 dark:border-amber-400/70 backdrop-blur-md flex items-center justify-center pl-2 pb-2 text-amber-900 dark:text-amber-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="W - Phát Triển"
          >
            <span>W</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ W */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none pr-12"
              onClick={() => toggleSingleCard("swot-w")}
            >
              <div className="flex items-center gap-2.5">
                <div className="ultraflex-icon shrink-0 flex items-center justify-center">
                  <SwotGradientIcon type="W" extraClass="w-9 h-9 transform transition-transform group-hover:scale-110 duration-300 drop-shadow-sm" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-amber-800 dark:text-amber-300 leading-none">
                    Phát triển
                  </h2>
                  <p className="text-[11px] font-semibold text-amber-700/90 dark:text-amber-400/90 mt-0.5">
                    Dư địa hoàn thiện
                  </p>
                </div>
              </div>
              <button
                className="swot-toggle-btn p-1.5 rounded-lg skills-glass-card hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 transition-transform duration-300"
                title="Thu gọn / Mở rộng"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform duration-300 ${
                    collapsedCards["swot-w"] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ W */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col ${
                collapsedCards["swot-w"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Các năng lực chiến lược tiếp tục rèn giũa để hoàn thiện chân dung nhà lãnh đạo cấp cao toàn diện.
                  </p>

                  <ul className="space-y-1.5 text-xs font-medium">
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Tư duy chiến lược &amp; Hoạch định dài hạn</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        80%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <FolderKanban className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Quản trị dự án quy mô lớn</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        80%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Thiết kế &amp; Phát triển Web tương thích đa nền tảng</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        85%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Tự động hóa quy trình chuyên sâu</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        85%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Quản trị hiệu suất mục tiêu (KPIs, OKRs)</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        85%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Giao tiếp cấp cao &amp; Xử lý khiếu nại phức tạp</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        85%
                      </span>
                    </li>
                    <li className="flex items-center justify-between py-1 px-2.5 rounded-lg skills-glass-card border-amber-200/60 dark:border-amber-500/20">
                      <span className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>Tốc độ làm chủ &amp; ứng dụng công nghệ mới</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                        85%
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t border-amber-300/50 dark:border-amber-500/20 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-amber-200/80 dark:border-amber-500/30">
                    #TuDuyChienLuoc
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-amber-200/80 dark:border-amber-500/30">
                    #TuDongHoa
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-amber-200/80 dark:border-amber-500/30">
                    #QuanTriDuAn
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-amber-200/80 dark:border-amber-500/30">
                    #HocHoiKhongNgung
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THÁCH THỨC & RỦI RO (T - Threats) */}
        <section
          id="swot-t"
          className={`skills-glass-swot-rose rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300 ${
            collapsedCards["swot-t"] ? "h-[50%] min-h-[120px] self-start" : "h-full"
          }`}
        >
          {/* Góc Phần Tư T */}
          <div
            className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-br-full rounded-tl-2xl bg-gradient-to-tl from-rose-500/30 via-rose-500/50 to-rose-600/70 dark:from-rose-500/35 dark:via-rose-500/50 dark:to-rose-600/70 border-b-2 border-r-2 border-rose-400/70 dark:border-rose-400/70 backdrop-blur-md flex items-center justify-center pr-2 pb-2 text-rose-900 dark:text-rose-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="T - Thách Thức"
          >
            <span>T</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ T */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none pl-11 sm:pl-12"
              onClick={() => toggleSingleCard("swot-t")}
            >
              <div className="flex items-center gap-2.5">
                <div className="ultraflex-icon shrink-0 flex items-center justify-center">
                  <SwotGradientIcon type="T" extraClass="w-9 h-9 transform transition-transform group-hover:scale-110 duration-300 drop-shadow-sm" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-rose-800 dark:text-rose-300 leading-none">
                    Thách thức
                  </h2>
                  <p className="text-[11px] font-semibold text-rose-700/90 dark:text-rose-400/90 mt-0.5">
                    Biến số ngoại cảnh
                  </p>
                </div>
              </div>
              <button
                className="swot-toggle-btn p-1.5 rounded-lg skills-glass-card hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 transition-transform duration-300"
                title="Thu gọn / Mở rộng"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform duration-300 ${
                    collapsedCards["swot-t"] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ T */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col ${
                collapsedCards["swot-t"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    Những yếu tố khách quan từ môi trường kinh doanh đòi hỏi sự chủ động thích ứng và quản trị rủi ro linh hoạt.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                      <Cpu className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        AI định hình lại CSKH
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Tự động hóa thay thế các nghiệp vụ cũ, đòi hỏi nâng cấp năng lực liên tục.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        Công nghệ đổi mới nhanh
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Công nghệ CX, Dữ liệu và AI liên tục xoay trục với tốc độ cao.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                      <Users className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        Cạnh tranh nhân sự cao cấp
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Tiêu chuẩn nhân sự lai: Kinh doanh + Công nghệ + Lãnh đạo ngày càng khắt khe.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                      <BadgeDollarSign className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                        Áp lực tối ưu chi phí
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                        Yêu cầu tạo ra hiệu quả vận hành vượt bậc với chi phí tinh gọn nhất.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t border-rose-300/50 dark:border-rose-500/20 text-[10px] font-bold text-rose-800 dark:text-rose-300">
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-rose-200/80 dark:border-rose-500/30">
                    #TacDongAI
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-rose-200/80 dark:border-rose-500/30">
                    #BienDongCongNghe
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-rose-200/80 dark:border-rose-500/30">
                    #CanhTranhNhanSu
                  </span>
                  <span className="px-2 py-0.5 rounded-full skills-glass-card border-rose-200/80 dark:border-rose-500/30">
                    #ToiUuChiPhi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        </div>
      </section>

      {/* Ngôn Ngữ & Năng Lực Giao Tiếp Quốc Tế - 100% Trong Suốt */}
      <section className="bg-transparent backdrop-blur-none border border-transparent shadow-none rounded-2xl p-0 sm:p-0">
        <div className="flex items-center gap-2.5 mb-3.5 pb-3 border-b border-slate-200/80 dark:border-slate-800/80 px-1">
          <span className="w-2.5 h-6 bg-purple-600 rounded-full shrink-0" />
          <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
          <h3 className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 tracking-wide">
            {isVi ? "Ngôn ngữ & năng lực giao tiếp quốc tế" : "Languages & international communication"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          <div className="skills-glass-card rounded-xl p-3 flex items-center gap-3 skills-hover-lift shadow-sm">
            <div className="relative w-13 h-13 flex-shrink-0 flex items-center justify-center font-bold text-sm text-blue-700 dark:text-blue-400">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700 dark:text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 stroke-current"
                  strokeWidth="3.5"
                  strokeDasharray="100, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold">100%</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <Languages className="w-3 h-3" />
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Tiếng Việt</h4>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400">(Ngôn ngữ bản xứ)</p>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                Thành thạo tuyệt đối
              </span>
            </div>
          </div>

          <div className="skills-glass-card rounded-xl p-3 flex items-center gap-3 skills-hover-lift shadow-sm">
            <div className="relative w-13 h-13 flex-shrink-0 flex items-center justify-center font-bold text-sm text-purple-700 dark:text-purple-400">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700 dark:text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-600 stroke-current"
                  strokeWidth="3.5"
                  strokeDasharray="90, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold">90%</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <Globe className="w-3 h-3" />
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Tiếng Anh</h4>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400">(Giao tiếp chuyên nghiệp)</p>
              <span className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold flex items-center gap-1 mt-0.5">
                <Award className="w-2.5 h-2.5 shrink-0" />
                Làm việc môi trường quốc tế
              </span>
            </div>
          </div>

          <div className="skills-glass-card rounded-xl p-3 flex items-center gap-3 skills-hover-lift shadow-sm">
            <div className="relative w-13 h-13 flex-shrink-0 flex items-center justify-center font-bold text-sm text-emerald-700 dark:text-emerald-400">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700 dark:text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-600 stroke-current"
                  strokeWidth="3.5"
                  strokeDasharray="85, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold">85%</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-3 h-3" />
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                  Ứng dụng AI đa ngôn ngữ
                </h4>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                Hỗ trợ trao đổi &amp; họp đa quốc gia
              </p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-2.5 h-2.5 shrink-0" />
                Dịch thuật &amp; Trợ lý thời gian thực
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Skills;
