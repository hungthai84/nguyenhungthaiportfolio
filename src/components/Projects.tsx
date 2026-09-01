import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Briefcase, 
  Search, 
  X, 
  Layers, 
  LayoutGrid,
  List as ListIcon,
  AlignJustify,
  SlidersHorizontal,
  ChevronRight,
  Zap,
  Check,
  Calendar,
  Maximize2,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { PageBanner } from "./PageBanner";
import { ProjectArticle } from "./ProjectArticle";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { PROJECTS_LIST, ProjectCard } from "../data/projectsData";

export default function Projects() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  // Unified Filter State
  const [unifiedFilter, setUnifiedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3 | 4>(3);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [activeCard, setActiveCard] = useState<ProjectCard | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  const gridContainerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver to track content container width
  useEffect(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [viewMode]);

  // Responsive Grid Calculation
  const MIN_CARD_WIDTH = 260;
  const GAP = 16;
  const actualColumns = useMemo(() => {
    if (viewMode !== "grid") return 1;
    if (!containerWidth) return gridColumns;
    const maxPossibleColumns = Math.max(1, Math.floor((containerWidth + GAP) / (MIN_CARD_WIDTH + GAP)));
    return Math.min(gridColumns, maxPossibleColumns);
  }, [viewMode, containerWidth, gridColumns]);

  // Filter Categories matching the 6 Groups and Phases
  const filterCategories = useMemo(() => [
    {
      label: isVi ? "Tất cả" : "All",
      options: [
        { id: "all", label: isVi ? "✨ Tất cả 21 dự án & sáng kiến" : "✨ All 21 Projects" }
      ]
    },
    {
      label: isVi ? "Theo Nhóm Phân Loại (6 Nhóm)" : "By Category (6 Groups)",
      options: [
        { id: "g1", label: isVi ? "Nhóm 01 · Xây dựng & Phát triển" : "Group 01 · Setup & Development" },
        { id: "g2", label: isVi ? "Nhóm 02 · Vận hành & Tối ưu" : "Group 02 · Ops & Optimization" },
        { id: "g3", label: isVi ? "Nhóm 03 · Hệ thống & Dữ liệu" : "Group 03 · Systems & Data" },
        { id: "g4", label: isVi ? "Nhóm 04 · Đào tạo & Năng lực" : "Group 04 · Training & Capacity" },
        { id: "g5", label: isVi ? "Nhóm 05 · Hỗ trợ Khách hàng" : "Group 05 · Customer Helpdesk" },
        { id: "g6", label: isVi ? "Nhóm 06 · Phân tích & Cải tiến" : "Group 06 · Analytics & Improvement" }
      ]
    },
    {
      label: isVi ? "Theo Giai Đoạn Thực Hiện" : "By Implementation Phase",
      options: [
        { id: "phase_1", label: isVi ? "🚀 Giai đoạn 1 (Thiết lập & Chuẩn hóa)" : "🚀 Phase 1 (Foundation)" },
        { id: "phase_2", label: isVi ? "⚡ Giai đoạn 2 (Tự động hóa & Hệ thống)" : "⚡ Phase 2 (Automation)" },
        { id: "phase_3", label: isVi ? "📈 Giai đoạn 3 (Nâng cao & Dự án)" : "📈 Phase 3 (Scaling)" },
        { id: "phase_all", label: isVi ? "🔄 Xuyên suốt (TQA, AI & Khủng hoảng)" : "🔄 Continuous (TQA & Crisis)" }
      ]
    }
  ], [isVi]);

  // Quick filter pills
  const quickPills = useMemo(() => [
    { id: "all", label: isVi ? "Tất cả (21)" : "All (21)" },
    { id: "g1", label: isVi ? "Nhóm 01" : "Group 01" },
    { id: "g2", label: isVi ? "Nhóm 02" : "Group 02" },
    { id: "g3", label: isVi ? "Nhóm 03" : "Group 03" },
    { id: "g4", label: isVi ? "Nhóm 04" : "Group 04" },
    { id: "g5", label: isVi ? "Nhóm 05" : "Group 05" },
    { id: "g6", label: isVi ? "Nhóm 06" : "Group 06" },
  ], [isVi]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_LIST.filter(item => {
      let matchesFilter = true;
      if (unifiedFilter === "all") {
        matchesFilter = true;
      } else if (unifiedFilter.startsWith("g")) {
        matchesFilter = item.groupId === unifiedFilter;
      } else if (unifiedFilter === "phase_1") {
        matchesFilter = item.phase === "Giai đoạn 1";
      } else if (unifiedFilter === "phase_2") {
        matchesFilter = item.phase === "Giai đoạn 2";
      } else if (unifiedFilter === "phase_3") {
        matchesFilter = item.phase === "Giai đoạn 3";
      } else if (unifiedFilter === "phase_all") {
        matchesFilter = item.phase === "Xuyên suốt";
      }

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || (
        item.branchTitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.groupTitle.toLowerCase().includes(q) ||
        item.phase.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.timeframe.toLowerCase().includes(q) ||
        item.caseStudy?.solutionSummary?.toLowerCase().includes(q) ||
        item.caseStudy?.context?.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      );

      return matchesFilter && matchesSearch;
    });
  }, [unifiedFilter, searchQuery]);

  const handleCardClick = (card: ProjectCard) => {
    playUiSound("click");
    setActiveCard(card);
  };

  const bannerInfo = useMemo(() => {
    switch (unifiedFilter) {
      case "g1":
        return {
          title: isVi ? "Nhóm 01 · Xây dựng & Phát triển" : "Group 01 · Setup & Development",
          subtitle: isVi 
            ? "Thiết lập tổ chức, OKR/KPI, nâng cao trải nghiệm khách hàng, quản lý dự án và cải tiến sản phẩm."
            : "Organizational setup, OKR/KPI frameworks, CX designs, project management, and product voice-of-customer loops.",
          tag: isVi ? "Phát triển CSKH" : "CS Setup & Dev",
          iconType: "strategy"
        };
      case "g2":
        return {
          title: isVi ? "Nhóm 02 · Vận hành & Tối ưu" : "Group 02 · Operations & Optimization",
          subtitle: isVi 
            ? "Chuẩn hóa SOP, hợp nhất Omnichannel, tự động hóa RPA, chiến dịch Outbound và quản lý BPO."
            : "SOP standardization, Omnichannel integration, RPA automation, outbound campaigns, and BPO management.",
          tag: isVi ? "Vận hành SOP" : "Ops & SOP",
          iconType: "workflow"
        };
      case "g3":
        return {
          title: isVi ? "Nhóm 03 · Hệ thống & Dữ liệu" : "Group 03 · Systems & Data",
          subtitle: isVi 
            ? "Xây dựng CRM 360, Realtime Analytics Dashboard, khảo sát CSAT/NPS/CES và Trợ lý ảo AI Chatbot."
            : "CRM 360 view, real-time analytics dashboards, CSAT/NPS/CES surveys, and AI Chatbots.",
          tag: isVi ? "Công nghệ & CRM" : "CRM & AI Data",
          iconType: "tech"
        };
      case "g4":
        return {
          title: isVi ? "Nhóm 04 · Đào tạo & Năng lực" : "Group 04 · Training & Capacity",
          subtitle: isVi 
            ? "Học viện E-Learning CS Academy, khung năng lực ASK và lộ trình thăng tiến nhân sự."
            : "E-learning platform, ASK competency frameworks, and clear career pathing.",
          tag: isVi ? "Đào tạo CS" : "Training & Talent",
          iconType: "training"
        };
      case "g5":
        return {
          title: isVi ? "Nhóm 05 · Hỗ trợ Khách hàng" : "Group 05 · Customer Helpdesk",
          subtitle: isVi 
            ? "Thành lập Trung tâm Hỗ trợ Tự phục vụ Help Center, cổng theo dõi ticket và thư viện tri thức FAQ."
            : "Self-service Help Center, ticket tracking portals, and FAQ knowledge bases.",
          tag: isVi ? "Trợ giúp tự phục vụ" : "Self-Service",
          iconType: "selfservice"
        };
      case "g6":
        return {
          title: isVi ? "Nhóm 06 · Phân tích & Cải tiến" : "Group 06 · Analytics & Continuous Improvement",
          subtitle: isVi 
            ? "Khung quản trị chất lượng TQA (COPC), ứng phó khủng hoảng dịch vụ và AI Copilot / Auto QA 100%."
            : "TQA (COPC) quality frameworks, crisis incident response, and Generative AI Copilot / 100% Auto QA.",
          tag: isVi ? "Quản trị & Cải tiến" : "TQA & GenAI",
          iconType: "customer"
        };
      default:
        return {
          title: "Danh Mục Dự Án",
          subtitle: "“Tầm nhìn mà không được thực thi thì chỉ là ảo ảnh.”",
          tag: "HỒ SƠ 21 DỰ ÁN",
          iconType: "projects"
        };
    }
  }, [unifiedFilter, isVi]);

  return (
    <section id="projects" className="relative min-h-full flex flex-col justify-start" style={{ padding: '5px', gap: '10px' }}>
      {/* Dynamic Marquee CSS Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ================= PROJECT DETAIL ARTICLE (FULL WEB PAGE) VS LIST VIEW ================= */}
      {activeCard ? (
        <ProjectArticle
          project={activeCard}
          onBack={() => {
            playUiSound("click");
            setActiveCard(null);
          }}
          onSelectProject={(newProj) => {
            playUiSound("click");
            setActiveCard(newProj);
          }}
        />
      ) : (
        /* ================= PROJECTS LIST VIEW ================= */
        <div className="w-full px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-[10px] animate-fadeIn text-slate-800 dark:text-slate-100">
          
          {/* ================= HERO BANNER ================= */}
          <div id="hero-banner" className="w-full mb-[10px]">
            <PageBanner
              title={bannerInfo.title}
              subtitle={bannerInfo.subtitle}
              tag={bannerInfo.tag}
              iconType={bannerInfo.iconType}
              gradient="from-slate-950 via-sky-950 to-indigo-950"
            >
              {/* Top Banner Controls: Search + Unified Filter Dropdown + View Controls */}
              <div className="w-full pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-t border-slate-200/80 dark:border-white/10">
                
                {/* Search & Single Unified Filter Dropdown Group */}
                <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  
                  {/* Search Input */}
                  <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-white/60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isVi ? "Tìm kiếm trong 21 dự án, SOP, tag..." : "Search across 21 projects..."}
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/80 dark:bg-white/15 hover:bg-white/95 dark:hover:bg-white/20 focus:bg-white dark:focus:bg-white/25 border border-slate-300/80 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/60 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/50 backdrop-blur-md transition-all shadow-xs dark:shadow-inner"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-white/60 dark:hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* UNIFIED FILTER SELECTOR */}
                  <div className="relative shrink-0">
                    <div className="relative flex items-center">
                      <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-600 dark:text-amber-300 pointer-events-none" />
                      <select
                        aria-label={isVi ? "Bộ lọc dự án hợp nhất" : "Unified project filter"}
                        value={unifiedFilter}
                        onChange={(e) => {
                          playUiSound("click");
                          setUnifiedFilter(e.target.value);
                        }}
                        className="w-full sm:w-auto pl-8.5 pr-8 py-2 rounded-xl bg-white/90 dark:bg-black/40 hover:bg-white dark:hover:bg-black/50 border border-amber-500/40 dark:border-amber-400/40 text-amber-900 dark:text-amber-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-md cursor-pointer transition-all shadow-xs appearance-none"
                      >
                        {filterCategories.map((cat, idx) => (
                          <optgroup key={idx} label={cat.label} className="glass-surface text-slate-900 dark:text-white font-semibold">
                            {cat.options.map((opt) => (
                              <option key={opt.id} value={opt.id} className="glass-surface text-slate-800 dark:text-slate-100 py-1">
                                {opt.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-600 dark:text-amber-300 pointer-events-none transform rotate-90" />
                    </div>
                  </div>

                  {/* Active Filter Clear Tag */}
                  {(unifiedFilter !== "all" || searchQuery) && (
                    <button
                      onClick={() => {
                        playUiSound("click");
                        setUnifiedFilter("all");
                        setSearchQuery("");
                      }}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 dark:bg-rose-500/30 dark:hover:bg-rose-500/50 text-rose-700 dark:text-rose-200 border border-rose-300 dark:border-rose-400/40 text-[11px] font-bold transition-all shrink-0 cursor-pointer shadow-xs"
                      title={isVi ? "Xóa bộ lọc" : "Clear filter"}
                    >
                      <X className="w-3 h-3" />
                      <span>{isVi ? "Bỏ lọc" : "Clear"}</span>
                    </button>
                  )}

                </div>

                {/* View Switcher & Column Selector */}
                <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
                  {/* Grid Column Selector */}
                  {viewMode === "grid" && (
                    <div className="flex items-center gap-1 glass-surface backdrop-blur-md p-1 rounded-full border border-slate-300/80 dark:border-white/20 shadow-xs dark:shadow-inner">
                      <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-300 uppercase px-2 hidden sm:inline-block">
                        {isVi ? "Cột:" : "Cols:"}
                      </span>
                      {([1, 2, 3, 4] as const).map((col) => (
                        <button
                          key={col}
                          type="button"
                          aria-label={isVi ? `Hiển thị ${col} cột` : `Show ${col} columns`}
                          aria-pressed={gridColumns === col}
                          onClick={() => {
                            playUiSound("click");
                            setGridColumns(col);
                          }}
                          className={cn(
                            "w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-black flex items-center justify-center transition-all cursor-pointer",
                            gridColumns === col
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-110 ring-1 ring-amber-300 dark:ring-white/50"
                              : "text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/15"
                          )}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* View Mode Quick Toggles */}
                  <div className="flex items-center gap-1 glass-surface backdrop-blur-md p-1 rounded-full border border-slate-300/80 dark:border-white/20 shadow-xs dark:shadow-inner">
                    <button
                      onClick={() => { playUiSound("click"); setViewMode("grid"); }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                        viewMode === "grid" ? "bg-sky-600 text-white shadow-md" : "text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      {isVi ? "Lưới" : "Grid"}
                    </button>
                    <button
                      onClick={() => { playUiSound("click"); setViewMode("list"); }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                        viewMode === "list" ? "bg-sky-600 text-white shadow-md" : "text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <ListIcon className="w-3.5 h-3.5" />
                      {isVi ? "Danh sách" : "List"}
                    </button>
                    <button
                      onClick={() => { playUiSound("click"); setViewMode("compact"); }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                        viewMode === "compact" ? "bg-sky-600 text-white shadow-md" : "text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <AlignJustify className="w-3.5 h-3.5" />
                      {isVi ? "Thu gọn" : "Compact"}
                    </button>
                  </div>
                </div>

              </div>
            </PageBanner>
          </div>

          {/* PROJECT CARDS CONTENT */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-3 p-6 shadow-sm backdrop-blur-xl">
              <Search className="w-10 h-10 text-slate-500 dark:text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                {isVi ? "Không tìm thấy dự án phù hợp" : "No matching project cards found"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {isVi ? "Thử thay đổi từ khóa tìm kiếm hoặc chọn nhóm giai đoạn khác để hiển thị dự án." : "Try adjusting your search query or reset the filter."}
              </p>
              <button
                onClick={() => {
                  setUnifiedFilter("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-sky-600/20"
              >
                {isVi ? "Đặt lại bộ lọc" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <>
              {/* 1. GRID VIEW */}
              {viewMode === "grid" && (
                <div 
                  ref={gridContainerRef}
                  id="projects-grid"
                  className="projects-grid w-full min-w-0"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${actualColumns}, minmax(0, 1fr))`,
                    gap: "10px",
                    alignItems: "stretch"
                  }}
                >
                  {filteredProjects.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="project-card rounded-2xl sm:rounded-3xl border-2 border-indigo-200/90 dark:border-indigo-700/80 overflow-hidden shadow-md hover:shadow-2xl hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 group cursor-pointer glass-surface backdrop-blur-2xl w-full min-w-0 flex flex-col h-full ring-2 ring-indigo-500/10"
                    >
                      {/* Media Area */}
                      <div className="project-card-media relative w-full aspect-[16/11] min-h-[200px] sm:min-h-[220px] overflow-hidden bg-slate-100 dark:bg-slate-950 border-b-2 border-indigo-100 dark:border-indigo-900/60 shrink-0 group/img">
                        <img
                          src={card.image}
                          alt={card.branchTitle}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                      </div>

                      {/* Content Area */}
                      <div className="project-card-content p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0 text-left">
                        <div>
                          {/* Title formatted matching Contact Info card header format */}
                          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
                              <h3 className="project-title text-base sm:text-lg font-black text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                                {card.branchTitle}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Tags Footer */}
                        <div className="project-tags flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                          <div className="flex items-center gap-1 text-amber-800 dark:text-amber-300 font-extrabold truncate bg-amber-50/90 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-300/80 dark:border-amber-700/60 text-[10px] uppercase tracking-wider shadow-2xs">
                            <Layers className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span className="truncate max-w-[150px]">{card.groupTitle}</span>
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-sky-100/90 dark:bg-sky-950/90 text-sky-800 dark:text-sky-300 border border-sky-300/80 dark:border-sky-700/60 shrink-0 text-[10px] font-black tracking-wide shadow-2xs">
                            {card.phaseCode}
                          </div>
                          {card.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50/90 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. LIST VIEW */}
              {viewMode === "list" && (
                <div className="projects-list flex flex-col gap-[10px] w-full min-w-0">
                  {filteredProjects.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="project-card rounded-2xl sm:rounded-3xl border-2 border-indigo-200/90 dark:border-indigo-700/80 overflow-hidden shadow-md hover:shadow-2xl hover:border-blue-600 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer glass-surface backdrop-blur-2xl w-full min-w-0 flex flex-col md:flex-row text-left ring-2 ring-indigo-500/10"
                    >
                      {/* Media Area */}
                      <div className="project-card-media relative w-full md:w-80 h-48 md:h-52 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b md:border-b-0 md:border-r border-indigo-100 dark:border-indigo-900/60 group/img">
                        <img
                          src={card.image}
                          alt={card.branchTitle}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                      </div>

                      {/* Content Area */}
                      <div className="project-card-content p-5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {/* Title formatted matching Contact Info card header format */}
                          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
                              <h3 className="project-title text-base sm:text-lg font-black text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors leading-snug">
                                {card.branchTitle}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Tags Footer */}
                        <div className="project-tags flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                          <div className="flex items-center gap-1 text-amber-800 dark:text-amber-300 font-extrabold truncate bg-amber-50/90 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-300/80 dark:border-amber-700/60 text-[10px] uppercase tracking-wider shadow-2xs">
                            <Layers className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400" />
                            <span className="truncate max-w-[160px]">{card.groupTitle}</span>
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-sky-100/90 dark:bg-sky-950/90 text-sky-800 dark:text-sky-300 border border-sky-300/80 dark:border-sky-700/60 shrink-0 text-[10px] font-black tracking-wide shadow-2xs">
                            {card.phaseCode}
                          </div>
                          {card.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50/90 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. COMPACT VIEW */}
              {viewMode === "compact" && (
                <div 
                  ref={gridContainerRef}
                  id="projects-compact-grid"
                  className="projects-compact-grid w-full min-w-0"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(4, Math.max(1, Math.floor((containerWidth + 10) / (220 + 10))))}, minmax(0, 1fr))`,
                    gap: "10px",
                    alignItems: "stretch"
                  }}
                >
                  {filteredProjects.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="project-card rounded-xl border-2 border-indigo-200/90 dark:border-slate-700/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-500/80 hover:-translate-y-1 transition-all duration-300 group cursor-pointer glass-surface backdrop-blur-2xl w-full min-w-0 flex flex-col h-full text-left"
                    >
                      {/* Media Area */}
                      <div className="project-card-media relative w-full h-28 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 shrink-0 group/img">
                        <img
                          src={card.image}
                          alt={card.branchTitle}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="project-card-content p-3 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-2 h-5 bg-blue-600 rounded-full shrink-0" />
                              <h3 className="project-title text-xs sm:text-sm font-black text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                                {card.branchTitle}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Tags Footer */}
                        <div className="project-tags flex flex-wrap items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[9px] font-bold truncate max-w-[110px] border border-amber-300/60 dark:border-amber-700/60">
                            {card.groupTitle}
                          </span>
                          <span className="px-1 py-0.5 rounded bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-[9px] font-black border border-sky-300/60 dark:border-sky-700/60">
                            {card.phaseCode}
                          </span>
                          {card.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-50/90 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-slate-700 truncate max-w-[90px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      )}

      {/* ================= FULLSCREEN IMAGE PREVIEW MODAL ================= */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-slate-100 dark:bg-slate-950 flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-4">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[80vw]">
                {previewImage.title}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
