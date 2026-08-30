import React, { useState } from "react";
import { PageBanner } from "./PageBanner";
import { useLanguage } from "../context/LanguageContext";
import WebsiteGradientIcon from "./WebsiteGradientIcon";
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
  MessageSquare
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
    if (theme === "light") {
      setTheme("glass");
    } else {
      setTheme("light");
    }
  };

  return (
    <section
      id="skills-main-card"
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
          rightContent={
            <div className="flex items-center gap-2">
              <button
                id="printBtn"
                onClick={handlePrint}
                className="p-2 rounded-xl bg-black/25 hover:bg-black/40 border border-white/20 backdrop-blur-md text-white shadow-sm cursor-pointer transition-all"
                title="In / Xuất Hồ Sơ PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                id="themeToggle"
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-black/25 hover:bg-black/40 border border-white/20 backdrop-blur-md text-amber-300 shadow-sm cursor-pointer transition-all"
                title="Chuyển chế độ Sáng / Tối"
              >
                <Sun className="w-4 h-4 hidden dark:block" />
                <Moon className="w-4 h-4 block dark:hidden" />
              </button>
            </div>
          }
        />
      </div>

      {/* Thanh Điều Khiển Tác Vụ SWOT */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Bảng Ma Trận 4 Góc Phần Tư</span>
        </div>
        <button
          id="toggleAllSwot"
          onClick={toggleAllCards}
          className="px-3 py-1.5 rounded-xl skills-glass-card hover:bg-white dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-sm border border-slate-300/60 dark:border-slate-700 cursor-pointer"
          title="Chuyển đổi trạng thái tất cả các thẻ"
        >
          <ChevronsUpDown id="toggleAllIcon" className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span id="toggleAllText">
            {areAllCollapsed ? "Mở rộng tất cả" : "Thu gọn tất cả"}
          </span>
        </button>
      </div>

      {/* 4 Khối SWOT Ghép Thành Vòng Tròn Tâm (Hỗ Trợ Thu Gọn / Mở Rộng) */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

        {/* 1. ĐIỂM MẠNH (S - Strengths) */}
        <section
          id="swot-s"
          className="skills-glass-swot-blue rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300"
        >
          {/* Góc Phần Tư S */}
          <div
            className="absolute bottom-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-tl-full rounded-br-2xl bg-gradient-to-br from-blue-500/30 via-blue-500/50 to-blue-600/70 dark:from-blue-500/35 dark:via-blue-500/50 dark:to-blue-600/70 border-t-2 border-l-2 border-blue-400/70 dark:border-blue-400/70 backdrop-blur-md flex items-center justify-center pl-2 pt-2 text-blue-900 dark:text-blue-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="S - Điểm Mạnh"
          >
            <span>S</span>
          </div>

          <div>
            {/* Header Thẻ S */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none"
              onClick={() => toggleSingleCard("swot-s")}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 transform transition-transform group-hover/swot:scale-110 duration-300">
                  <WebsiteGradientIcon type="skills" extraClass="w-9 h-9" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-blue-800 dark:text-blue-300 leading-none">
                    ĐIỂM MẠNH
                  </h2>
                  <p className="text-[11px] font-semibold text-blue-700/90 dark:text-blue-400/90 uppercase mt-0.5">
                    Năng Lực Cốt Lõi
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
              className={`skills-swot-collapse-grid ${
                collapsedCards["swot-s"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner">
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

                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-blue-300/50 dark:border-blue-500/20 text-[10px] font-bold text-blue-800 dark:text-blue-300 pr-12">
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
          className="skills-glass-swot-purple rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300"
        >
          {/* Góc Phần Tư O */}
          <div
            className="absolute bottom-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-tr-full rounded-bl-2xl bg-gradient-to-bl from-purple-500/30 via-purple-500/50 to-purple-600/70 dark:from-purple-500/35 dark:via-purple-500/50 dark:to-purple-600/70 border-t-2 border-r-2 border-purple-400/70 dark:border-purple-400/70 backdrop-blur-md flex items-center justify-center pr-2 pt-2 text-purple-900 dark:text-purple-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="O - Cơ Hội"
          >
            <span>O</span>
          </div>

          <div>
            {/* Header Thẻ O */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none"
              onClick={() => toggleSingleCard("swot-o")}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 dark:bg-purple-500/25 text-purple-700 dark:text-purple-400 flex items-center justify-center border border-purple-500/40 shadow-sm flex-shrink-0">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-purple-800 dark:text-purple-300 leading-none">
                    CƠ HỘI
                  </h2>
                  <p className="text-[11px] font-semibold text-purple-700/90 dark:text-purple-400/90 uppercase mt-0.5">
                    Thời Cơ Phát Triển
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
              className={`skills-swot-collapse-grid ${
                collapsedCards["swot-o"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner">
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

                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-purple-300/50 dark:border-purple-500/20 text-[10px] font-bold text-purple-800 dark:text-purple-300 pl-12">
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
          className="skills-glass-swot-amber rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300"
        >
          {/* Góc Phần Tư W */}
          <div
            className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-bl-full rounded-tr-2xl bg-gradient-to-tr from-amber-500/30 via-amber-500/50 to-amber-600/70 dark:from-amber-500/35 dark:via-amber-500/50 dark:to-amber-600/70 border-b-2 border-l-2 border-amber-400/70 dark:border-amber-400/70 backdrop-blur-md flex items-center justify-center pl-2 pb-2 text-amber-900 dark:text-amber-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="W - Điểm Cần Phát Triển"
          >
            <span>W</span>
          </div>

          <div>
            {/* Header Thẻ W */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none pr-12"
              onClick={() => toggleSingleCard("swot-w")}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 dark:bg-amber-500/25 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-sm flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-amber-800 dark:text-amber-300 leading-none">
                    ĐIỂM CẦN PHÁT TRIỂN
                  </h2>
                  <p className="text-[11px] font-semibold text-amber-700/90 dark:text-amber-400/90 uppercase mt-0.5">
                    Dư Địa Hoàn Thiện
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
              className={`skills-swot-collapse-grid ${
                collapsedCards["swot-w"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner">
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

                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-amber-300/50 dark:border-amber-500/20 text-[10px] font-bold text-amber-800 dark:text-amber-300">
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
          className="skills-glass-swot-rose rounded-2xl p-4 sm:p-5 flex flex-col justify-between skills-hover-lift relative overflow-hidden group transition-all duration-300"
        >
          {/* Góc Phần Tư T */}
          <div
            className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-br-full rounded-tl-2xl bg-gradient-to-tl from-rose-500/30 via-rose-500/50 to-rose-600/70 dark:from-rose-500/35 dark:via-rose-500/50 dark:to-rose-600/70 border-b-2 border-r-2 border-rose-400/70 dark:border-rose-400/70 backdrop-blur-md flex items-center justify-center pr-2 pb-2 text-rose-900 dark:text-rose-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="T - Thách Thức & Rủi Ro"
          >
            <span>T</span>
          </div>

          <div>
            {/* Header Thẻ T */}
            <div
              className="flex items-center justify-between mb-2.5 cursor-pointer select-none pl-11 sm:pl-12"
              onClick={() => toggleSingleCard("swot-t")}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 dark:bg-rose-500/25 text-rose-700 dark:text-rose-400 flex items-center justify-center border border-rose-500/40 flex-shrink-0 shadow-sm">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider text-rose-800 dark:text-rose-300 leading-none">
                    THÁCH THỨC &amp; RỦI RO
                  </h2>
                  <p className="text-[11px] font-semibold text-rose-700/90 dark:text-rose-400/90 uppercase mt-0.5">
                    Biến Số Ngoại Cảnh
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
              className={`skills-swot-collapse-grid ${
                collapsedCards["swot-t"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner">
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                  Những yếu tố khách quan từ môi trường kinh doanh đòi hỏi sự chủ động thích ứng và quản trị rủi ro linh hoạt.
                </p>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                    <Cpu className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                      AI Định Hình Lại CSKH
                    </h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Tự động hóa thay thế các nghiệp vụ cũ, đòi hỏi nâng cấp năng lực liên tục.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                      Công Nghệ Đổi Mới Nhanh
                    </h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Công nghệ CX, Dữ liệu và AI liên tục xoay trục với tốc độ cao.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                    <Users className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                      Cạnh Tranh Nhân Sự Cao Cấp
                    </h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Tiêu chuẩn nhân sự lai: Kinh doanh + Công nghệ + Lãnh đạo ngày càng khắt khe.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl skills-glass-card border-rose-200/60 dark:border-rose-500/20 flex flex-col items-center justify-center">
                    <BadgeDollarSign className="w-4 h-4 text-rose-700 dark:text-rose-400 mb-1" />
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                      Áp Lực Tối Ưu Chi Phí
                    </h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Yêu cầu tạo ra hiệu quả vận hành vượt bậc với chi phí tinh gọn nhất.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-rose-300/50 dark:border-rose-500/20 text-[10px] font-bold text-rose-800 dark:text-rose-300">
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

      {/* Số Liệu Năng Lực Điều Hành Cốt Lõi */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="skills-glass-panel rounded-xl p-3.5 flex items-center gap-3 skills-hover-lift">
          <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-700 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold block uppercase">
              TỔNG QUAN NĂNG LỰC
            </span>
            <span className="text-lg font-bold text-blue-700 dark:text-blue-400 leading-tight">
              88%
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">
              Thành thạo trung bình
            </span>
          </div>
        </div>

        <div className="skills-glass-panel rounded-xl p-3.5 flex items-center gap-3 skills-hover-lift">
          <div className="w-10 h-10 rounded-lg bg-purple-500/15 text-purple-700 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold block uppercase">
              KINH NGHIỆM ĐIỀU HÀNH
            </span>
            <span className="text-lg font-bold text-purple-700 dark:text-purple-400 leading-tight">
              20+
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">
              Năm Quản lý CSKH &amp; CX
            </span>
          </div>
        </div>

        <div className="skills-glass-panel rounded-xl p-3.5 flex items-center gap-3 skills-hover-lift">
          <div className="w-10 h-10 rounded-lg bg-pink-500/15 text-pink-700 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold block uppercase">
              QUẢN LÝ ĐỘI NGŨ
            </span>
            <span className="text-lg font-bold text-pink-700 dark:text-pink-400 leading-tight">
              100+
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">
              Nhân sự trực tiếp
            </span>
          </div>
        </div>

        <div className="skills-glass-panel rounded-xl p-3.5 flex items-center gap-3 skills-hover-lift">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold block uppercase">
              TRẢI NGHIỆM XUẤT SẮC
            </span>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block leading-tight">
              Cam Kết Giá Trị
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">
              Tăng trưởng bền vững
            </span>
          </div>
        </div>
      </section>

      {/* Ngôn Ngữ & Năng Lực Giao Tiếp Quốc Tế */}
      <section className="skills-glass-panel rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3.5">
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            NGÔN NGỮ &amp; NĂNG LỰC GIAO TIẾP
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="skills-glass-card rounded-xl p-3 flex items-center gap-3 skills-hover-lift shadow-sm">
            <div className="relative w-13 h-13 flex-shrink-0 flex items-center justify-center font-bold text-sm text-blue-700 dark:text-blue-400">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700 stroke-current"
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
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">TIẾNG VIỆT</h4>
              <p className="text-[10px] text-slate-600 dark:text-slate-400">(Ngôn ngữ bản xứ)</p>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold block mt-0.5">
                Thành thạo tuyệt đối
              </span>
            </div>
          </div>

          <div className="skills-glass-card rounded-xl p-3 flex items-center gap-3 skills-hover-lift shadow-sm">
            <div className="relative w-13 h-13 flex-shrink-0 flex items-center justify-center font-bold text-sm text-purple-700 dark:text-purple-400">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700 stroke-current"
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
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">TIẾNG ANH</h4>
              <p className="text-[10px] text-slate-600 dark:text-slate-400">(Giao tiếp chuyên nghiệp)</p>
              <span className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold block mt-0.5">
                Làm việc môi trường quốc tế
              </span>
            </div>
          </div>

          <div className="skills-glass-card rounded-xl p-3 flex items-center gap-3 skills-hover-lift shadow-sm">
            <div className="relative w-13 h-13 flex-shrink-0 flex items-center justify-center font-bold text-sm text-emerald-700 dark:text-emerald-400">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700 stroke-current"
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
              <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                ỨNG DỤNG AI ĐA NGÔN NGỮ
              </h4>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                Hỗ trợ trao đổi &amp; họp đa quốc gia
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Skills;
