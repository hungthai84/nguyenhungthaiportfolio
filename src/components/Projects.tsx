import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Briefcase, 
  Search, 
  X, 
  Tag, 
  Layers, 
  Calendar, 
  Sparkles,
  CheckCircle2,
  Maximize2,
  LayoutGrid,
  List as ListIcon,
  AlignJustify,
  Users,
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  Target,
  Clock,
  Zap,
  Check,
  Award,
  TrendingUp,
  ShieldAlert,
  UserCheck
} from "lucide-react";
import { useLanguage } from "../i18n";
import { PageBanner } from "./PageBanner";
import { playUiSound } from "../lib/sound";
import { CSKHProjectDetails } from "./CSKHProjectDetails";
import { cn } from "../lib/utils";
import { PROJECTS_LIST, ProjectCard } from "../data/projectsData";

export default function Projects() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // Unified Filter State
  const [unifiedFilter, setUnifiedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3 | 4>(3);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [activeCard, setActiveCard] = useState<ProjectCard | null>(null);

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
          title: isVi 
            ? "Danh mục dự án" 
            : "Key case studies portfolio",
          subtitle: isVi 
            ? "“Tầm nhìn mà không được thực thi thì chỉ là ảo ảnh. Mỗi dự án là một case study STAR thực chiến với mục tiêu, giải pháp và kết quả định lượng rõ ràng.”"
            : "“Tầm nhìn mà không được thực thi thì chỉ là ảo ảnh / Vision without execution is just hallucination. Mỗi dự án là một case study STAR thực chiến với mục tiêu, giải pháp và kết quả định lượng rõ ràng.”",
          tag: isVi ? "HỒ SƠ 21 DỰ ÁN" : "HỒ SƠ 21 DỰ ÁN • 21 CASE STUDIES",
          iconType: "projects"
        };
    }
  }, [unifiedFilter, isVi]);

  return (
    <section id="projects" className="relative min-h-full flex flex-col justify-start" style={{ padding: '15px', gap: '10px' }}>
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

      {/* ================= IF ACTIVE CARD (DETAILED STAR CASE STUDY VIEW) ================= */}
      {activeCard ? (
        <div className="max-w-7xl mx-auto px-[10px] sm:px-6 w-full space-y-6 animate-fadeIn bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
          
          {/* Top Bar: Back Button & Project ID */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <button 
              onClick={() => { playUiSound("click"); setActiveCard(null); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all duration-300 shadow-sm cursor-pointer w-fit"
            >
              ← {isVi ? "Quay lại danh sách 21 dự án" : "Back to All 21 Projects"}
            </button>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                {activeCard.groupTitle}
              </span>
              <span className="text-slate-400 font-bold">ID: {activeCard.id}</span>
            </div>
          </div>

          {/* Cover Banner Area */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-slate-900">
            <img 
              src={activeCard.image} 
              alt={activeCard.branchTitle}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-cyan-400/30">
                  {activeCard.groupHashtag}
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-amber-400/30">
                  {activeCard.timeframe}
                </span>
                <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-sky-400/30">
                  {activeCard.role}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-md text-white">
                {activeCard.branchTitle}
              </h1>
            </div>
          </div>

          {/* STAR CASE STUDY DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
            
            {/* Main Content (Left 2 Columns) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. TÓM TẮT GIẢI PHÁP (SOLUTION SUMMARY) */}
              <section className="space-y-3 bg-gradient-to-br from-sky-500/5 via-indigo-500/5 to-purple-500/5 p-6 rounded-2xl border border-sky-500/20 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-sky-500/20">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white font-bold text-xs">
                    S
                  </div>
                  <span>{isVi ? "Tóm Tắt Giải Pháp" : "Solution Summary"}</span>
                </h2>
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-medium">
                  {activeCard.caseStudy.solutionSummary}
                </p>
              </section>

              {/* 2. BỐI CẢNH THỰC TRẠNG (CONTEXT / SITUATION) */}
              <section className="space-y-3 bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-amber-500/20">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-xs">
                    T
                  </div>
                  <span>{isVi ? "Bối Cảnh Thực Trạng" : "Background & Context"}</span>
                </h2>
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-medium">
                  {activeCard.caseStudy.context}
                </p>
              </section>

              {/* 3. CÁC HÀNH ĐỘNG THEN CHỐT (KEY ACTIONS 01..04) */}
              <section className="space-y-4">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                    A
                  </div>
                  <span>{isVi ? "Các Hành Động Then Chốt" : "Key Execution Actions"}</span>
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {activeCard.caseStudy.actions.map((act, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-sky-500/50 transition-all space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-extrabold text-sky-700 dark:text-sky-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                          {act.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {act.desc}
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                        <Zap size={14} className="text-emerald-500 shrink-0" />
                        <span>{isVi ? "Giá trị:" : "Impact:"} {act.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. KẾT QUẢ VẬN HÀNH (OPERATIONAL RESULTS) */}
              <section className="space-y-4 bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-emerald-500/20">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
                    R
                  </div>
                  <span>{isVi ? "Kết Quả Vận Hành & Tác Động Định Lượng" : "Operational Impact & Results"}</span>
                </h2>

                <div className="space-y-3">
                  {activeCard.caseStudy.results.map((res, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-500/20 shadow-xs">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white font-black text-xs mt-0.5">
                        <Check size={14} />
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                        {res}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* IF PROJECT p1_1, ALSO RENDER THE ARCHITECTURE MINDMAP */}
              {activeCard.id === 'p1_1' && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {isVi ? "Mô Hình Kiến Trúc & Công Cụ Tương Tác Vận Hành" : "Interactive Architecture & Operational Calculators"}
                    </h3>
                  </div>
                  <CSKHProjectDetails />
                </div>
              )}

            </div>

            {/* Sidebar Info Section (Right 1 Column) */}
            <div className="space-y-6">
              
              {/* Project Metadata Box */}
              <section className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <Calendar className="w-4 h-4 text-sky-500" /> {isVi ? "Thông tin dự án" : "Project Info"}
                </h3>

                <div className="space-y-3 text-xs font-medium">
                  <div className="space-y-1">
                    <span className="text-slate-400 block">{isVi ? "Vai trò đảm nhận:" : "Project Role:"}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">{activeCard.role}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block">{isVi ? "Thời gian thực hiện:" : "Timeframe:"}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">{activeCard.timeframe}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block">{isVi ? "Phân nhóm chiến lược:" : "Strategic Category:"}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 block">{activeCard.groupTitle}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block">{isVi ? "Giai đoạn thực hiện:" : "Phase:"}</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400 block">{activeCard.phase}</span>
                  </div>
                </div>
              </section>

              {/* Tags Section */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Hashtags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCard.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Footer controls */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between rounded-b-2xl mt-8">
            <div className="text-[10px] font-mono font-bold text-slate-400 hidden sm:block">
              PowerService Operation Portfolio • CSKH Case Study STAR
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button 
                onClick={() => { playUiSound("click"); window.print(); }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-extrabold text-xs transition-all active:scale-95 hidden sm:block cursor-pointer"
              >
                {isVi ? "In / Xuất tài liệu PDF" : "Print / Export PDF"}
              </button>
              <button 
                onClick={() => { playUiSound("click"); setActiveCard(null); }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
              >
                {isVi ? "Đóng chi tiết dự án" : "Close Case Study"}
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* ================= PROJECTS LIST VIEW ================= */
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5 w-full flex flex-col gap-[10px] animate-fadeIn text-slate-800 dark:text-slate-100">
          
          {/* ================= HERO BANNER ================= */}
          <div id="hero-banner" className="w-full mb-[10px]">
            <PageBanner
              title={bannerInfo.title}
              subtitle={bannerInfo.subtitle}
              tag={bannerInfo.tag}
              iconType={bannerInfo.iconType}
              gradient="from-slate-950 via-sky-950 to-indigo-950"
              rightContent={
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-md">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 animate-pulse" />
                  <span>{filteredProjects.length} / 21 {isVi ? "Dự án & Sáng kiến" : "Projects"}</span>
                </div>
              }
            >
              {/* Top Banner Controls: Search + Unified Filter Dropdown + View Controls */}
              <div className="w-full pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* Search & Single Unified Filter Dropdown Group */}
                <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  
                  {/* Search Input */}
                  <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isVi ? "Tìm kiếm trong 21 dự án, SOP, tag..." : "Search across 21 projects..."}
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/15 hover:bg-white/20 focus:bg-white/25 border border-white/20 text-white placeholder-white/60 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-md transition-all shadow-inner"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* UNIFIED FILTER SELECTOR */}
                  <div className="relative shrink-0">
                    <div className="relative flex items-center">
                      <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-300 pointer-events-none" />
                      <select
                        aria-label={isVi ? "Bộ lọc dự án hợp nhất" : "Unified project filter"}
                        value={unifiedFilter}
                        onChange={(e) => {
                          playUiSound("click");
                          setUnifiedFilter(e.target.value);
                        }}
                        className="w-full sm:w-auto pl-8.5 pr-8 py-2 rounded-xl bg-black/40 hover:bg-black/50 border border-amber-400/40 text-amber-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400/50 backdrop-blur-md cursor-pointer transition-all shadow-sm appearance-none"
                      >
                        {filterCategories.map((cat, idx) => (
                          <optgroup key={idx} label={cat.label} className="bg-slate-900 text-white font-semibold">
                            {cat.options.map((opt) => (
                              <option key={opt.id} value={opt.id} className="bg-slate-900 text-slate-100 py-1">
                                {opt.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-300 pointer-events-none transform rotate-90" />
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
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 border border-rose-400/40 text-[11px] font-bold transition-all shrink-0 cursor-pointer"
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
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-inner">
                      <span className="text-[10px] font-extrabold text-amber-300 uppercase px-2 hidden sm:inline-block">
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
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-110 ring-1 ring-white/50"
                              : "text-white/80 hover:text-white hover:bg-white/15"
                          )}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* View Mode Quick Toggles */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-inner">
                    <button
                      onClick={() => { playUiSound("click"); setViewMode("grid"); }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                        viewMode === "grid" ? "bg-sky-500 text-white shadow-md" : "text-white/80 hover:text-white"
                      )}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      {isVi ? "Lưới" : "Grid"}
                    </button>
                    <button
                      onClick={() => { playUiSound("click"); setViewMode("list"); }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                        viewMode === "list" ? "bg-sky-500 text-white shadow-md" : "text-white/80 hover:text-white"
                      )}
                    >
                      <ListIcon className="w-3.5 h-3.5" />
                      {isVi ? "Danh sách" : "List"}
                    </button>
                    <button
                      onClick={() => { playUiSound("click"); setViewMode("compact"); }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                        viewMode === "compact" ? "bg-sky-500 text-white shadow-md" : "text-white/80 hover:text-white"
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
            <div className="text-center py-12 bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-3 p-6 shadow-sm backdrop-blur-xl">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
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
                    gap: "16px",
                    alignItems: "stretch"
                  }}
                >
                  {filteredProjects.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="project-card rounded-2xl sm:rounded-3xl border-2 border-indigo-300/90 dark:border-indigo-700/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 group cursor-pointer bg-white dark:bg-slate-900 backdrop-blur-2xl w-full min-w-0 flex flex-col h-full ring-2 ring-indigo-500/10"
                    >
                      {/* Media Area */}
                      <div className="project-card-media relative w-full aspect-[16/11] min-h-[200px] sm:min-h-[220px] overflow-hidden bg-slate-100 dark:bg-slate-950 border-b-2 border-indigo-200/80 dark:border-indigo-900/60 shrink-0 group/img">
                        <img
                          src={card.image}
                          alt={card.branchTitle}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none"></div>

                        {/* Top Badges */}
                        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-3 gap-2 z-10">
                          <div className="flex items-center gap-1.5 text-amber-300 font-extrabold truncate drop-shadow-md bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/30 text-[10px] uppercase tracking-wider">
                            <Layers className="w-3 h-3 shrink-0 text-amber-400" />
                            <span className="truncate max-w-[140px] sm:max-w-[180px]">{card.groupTitle}</span>
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-sky-950/90 backdrop-blur-md text-sky-300 border border-sky-400/40 shrink-0 text-[10px] font-black tracking-wide shadow-md">
                            {card.phaseCode}
                          </div>
                        </div>

                        {/* Hover Overlay Hint */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <Maximize2 className="w-3.5 h-3.5" /> {isVi ? "Xem Case Study STAR" : "View STAR Case Study"}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="project-card-content p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0 text-left">
                        <div>
                          {/* Title formatted matching Contact card header format with vertical blue capsule */}
                          <div className="flex items-center gap-2.5 mb-2.5">
                            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
                            <h3 className="project-title text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                              {card.branchTitle}
                            </h3>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 mb-3">
                            {card.description}
                          </p>
                        </div>

                        {/* Tags Footer */}
                        <div className="project-tags flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                          {card.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50/80 dark:bg-slate-800 text-indigo-800 dark:text-slate-300 border border-indigo-200/80 dark:border-slate-700"
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
                <div className="projects-list flex flex-col gap-4 w-full min-w-0">
                  {filteredProjects.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="project-card rounded-2xl sm:rounded-3xl border-2 border-indigo-300/90 dark:border-indigo-700/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-600 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer bg-white dark:bg-slate-900 backdrop-blur-2xl w-full min-w-0 flex flex-col md:flex-row text-left ring-2 ring-indigo-500/10"
                    >
                      {/* Media Area */}
                      <div className="project-card-media relative w-full md:w-80 h-48 md:h-52 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b md:border-b-0 md:border-r border-indigo-200/80 dark:border-indigo-900/60 group/img">
                        <img
                          src={card.image}
                          alt={card.branchTitle}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                        {/* Top Badges */}
                        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-3 gap-2 z-10">
                          <div className="flex items-center gap-1.5 text-amber-300 font-extrabold truncate drop-shadow-md bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/30 text-[10px] uppercase tracking-wider">
                            <Layers className="w-3 h-3 shrink-0 text-amber-400" />
                            <span className="truncate max-w-[160px]">{card.groupTitle}</span>
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-sky-950/90 backdrop-blur-md text-sky-300 border border-sky-400/40 shrink-0 text-[10px] font-black tracking-wide shadow-md">
                            {card.phaseCode}
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="project-card-content p-5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {/* Title formatted matching Contact card header format with vertical blue capsule */}
                          <div className="flex items-center gap-2.5 mb-2.5">
                            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
                            <h3 className="project-title text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors leading-snug">
                              {card.branchTitle}
                            </h3>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 mb-3">
                            {card.description}
                          </p>
                        </div>

                        {/* Tags Footer */}
                        <div className="project-tags flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                          <div className="flex flex-wrap gap-1.5">
                            {card.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50/80 dark:bg-slate-800 text-indigo-800 dark:text-slate-300 border border-indigo-200/80 dark:border-slate-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            {isVi ? "Xem Case Study STAR" : "STAR Case Study"} <ArrowRight className="w-3.5 h-3.5" />
                          </span>
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
                    gridTemplateColumns: `repeat(${Math.min(4, Math.max(1, Math.floor((containerWidth + 12) / (220 + 12))))}, minmax(0, 1fr))`,
                    gap: "12px",
                    alignItems: "stretch"
                  }}
                >
                  {filteredProjects.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="project-card rounded-xl border-2 border-indigo-200/90 dark:border-slate-700/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-500/80 hover:-translate-y-1 transition-all duration-300 group cursor-pointer bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl w-full min-w-0 flex flex-col h-full text-left"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                        {/* Top Badges */}
                        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-2 gap-1.5 z-10">
                          <span className="px-2 py-0.5 rounded bg-black/60 text-amber-300 text-[9px] font-bold truncate max-w-[130px]">
                            {card.groupTitle}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-300 text-[9px] font-black">
                            {card.phaseCode}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="project-card-content p-3 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-4 bg-blue-600 rounded-full shrink-0" />
                            <h3 className="project-title text-xs font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                              {card.branchTitle}
                            </h3>
                          </div>
                        </div>

                        {/* Tags Footer */}
                        <div className="project-tags flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
                          {card.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-50/80 dark:bg-slate-800 text-indigo-800 dark:text-slate-300 border border-indigo-200/80 dark:border-slate-700 truncate max-w-[100px]"
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

    </section>
  );
}
