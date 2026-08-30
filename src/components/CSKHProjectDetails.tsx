import React, { useState, useEffect, useRef } from "react";
import {
  Info,
  Globe,
  AlertTriangle,
  Target,
  Network,
  ListChecks,
  UserCheck,
  Monitor,
  TrendingUp,
  Award,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  BarChart,
  Map,
  Heart,
  ShieldCheck,
  Users,
  Zap,
  Clock,
  MessageSquare,
  FileText,
  Compass,
  Tag,
  Sparkles,
  PhoneCall,
  PhoneOutgoing,
  ShieldAlert,
  Sliders,
  Check,
  CheckCircle,
  Star,
  CheckSquare,
  Eye,
  Rocket,
  Trophy,
  Activity,
  Bot,
  X,
  RefreshCw,
  Printer,
  ArrowUp,
  SlidersHorizontal,
  Folder,
  Briefcase,
  Layers,
  LayoutList,
  LayoutGrid
} from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";

export const CSKHProjectDetails: React.FC = () => {
  const { language } = useLanguage();
  const isVi = language === "vi";

  // State to control layout of "Cấu trúc Chi Tiết Dự Án": 1 column or 2 columns, defaulting to "1-col" (view 1 cột) as requested.
  const [layoutMode, setLayoutMode] = useState<"1-col" | "2-col">(
    () => (localStorage.getItem("project_structure_layout") as "1-col" | "2-col") || "1-col"
  );

  const toggleLayoutMode = (mode: "1-col" | "2-col") => {
    playUiSound("click");
    setLayoutMode(mode);
    localStorage.setItem("project_structure_layout", mode);
  };

  // Modal Simulation State
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [selectedSimOption, setSelectedSimOption] = useState<number | null>(null);

  // Active Tool Tab State
  const [activeToolTab, setActiveToolTab] = useState<"calc" | "qa" | "csat">("calc");

  // Headcount Calculator Inputs
  const [volume, setVolume] = useState<number>(15000);
  const [aht, setAht] = useState<number>(6);
  const [hours, setHours] = useState<number>(8);
  const [days, setDays] = useState<number>(22);
  const [occupancy, setOccupancy] = useState<number>(80);
  const [shrinkage, setShrinkage] = useState<number>(15);

  // QA Scorecard Checkboxes
  const [qaC1, setQaC1] = useState(true);
  const [qaC2, setQaC2] = useState(true);
  const [qaC3, setQaC3] = useState(true);
  const [qaC4, setQaC4] = useState(true);
  const [qaC5, setQaC5] = useState(true);
  const [qaFatal, setQaFatal] = useState(false);

  // CSAT & NPS Inputs
  const [csatGood, setCsatGood] = useState<number>(484);
  const [csatTotal, setCsatTotal] = useState<number>(500);
  const [npsPromoters, setNpsPromoters] = useState<number>(350);
  const [npsPassives, setNpsPassives] = useState<number>(110);
  const [npsDetractors, setNpsDetractors] = useState<number>(40);

  // Mindmap Connector Curves
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>(["", "", "", ""]);

  const updateMindmapPaths = () => {
    if (!containerRef.current || !centerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    const cX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const cY = centerRect.top + centerRect.height / 2 - containerRect.top;

    const refs = [p1Ref, p2Ref, p3Ref, p4Ref];
    const newPaths = refs.map((ref) => {
      if (!ref.current) return "";
      const cardRect = ref.current.getBoundingClientRect();
      let cardX = cardRect.left + cardRect.width / 2 - containerRect.left;
      let cardY = cardRect.top + cardRect.height / 2 - containerRect.top;

      if (cardX < cX) {
        cardX = cardRect.right - containerRect.left;
      } else {
        cardX = cardRect.left - containerRect.left;
      }

      const deltaX = Math.abs(cardX - cX) * 0.5;
      const controlX1 = cardX < cX ? cX - deltaX : cX + deltaX;
      const controlX2 = cardX < cX ? cX + deltaX : cX - deltaX;

      return `M ${cX} ${cY} C ${controlX1} ${cY}, ${controlX2} ${cardY}, ${cardX} ${cardY}`;
    });
    setPaths(newPaths);
  };

  useEffect(() => {
    updateMindmapPaths();
    window.addEventListener("resize", updateMindmapPaths);
    return () => window.removeEventListener("resize", updateMindmapPaths);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateMindmapPaths, 100);
    return () => clearTimeout(timer);
  }, [activeToolTab]);

  // Calculations: Headcount
  const totalWorkloadMinutes = volume * aht;
  const totalWorkloadHours = Math.round(totalWorkloadMinutes / 60);
  const netHoursPerAgent = hours * days * (occupancy / 100) * (1 - shrinkage / 100);
  const agentsNeeded = netHoursPerAgent > 0 ? Math.ceil(totalWorkloadHours / netHoursPerAgent) : 0;
  const tlNeeded = Math.max(1, Math.ceil(agentsNeeded / 10));
  const qaNeeded = Math.max(1, Math.ceil(agentsNeeded / 15));
  const totalHeadcount = agentsNeeded + tlNeeded + qaNeeded;

  // Calculations: QA
  const getQAScore = () => {
    if (qaFatal) return { score: 0, label: "FATAL ERROR", color: "bg-red-500" };
    let score = 0;
    if (qaC1) score += 15;
    if (qaC2) score += 20;
    if (qaC3) score += 35;
    if (qaC4) score += 20;
    if (qaC5) score += 10;

    let label = isVi ? "Rất Tốt" : "Excellent";
    let color = "bg-emerald-500";
    if (score < 70) {
      label = isVi ? "Cần Đào Tạo" : "Needs Training";
      color = "bg-red-500";
    } else if (score < 85) {
      label = isVi ? "Đạt Yêu Cầu" : "Satisfactory";
      color = "bg-amber-500";
    }
    return { score, label, color };
  };
  const qaResult = getQAScore();

  // Calculations: CSAT & NPS
  const csatVal = csatTotal > 0 ? Math.min(100, Math.round((csatGood / csatTotal) * 1000) / 10) : 0;
  const npsTotal = npsPromoters + npsPassives + npsDetractors;
  const npsScore = npsTotal > 0 ? Math.round(((npsPromoters - npsDetractors) / npsTotal) * 100) : 0;

  const highlightPillar = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-sky-500", "scale-[1.02]");
      setTimeout(() => el.classList.remove("ring-4", "ring-sky-500", "scale-[1.02]"), 2500);
    }
  };

  return (
    <div className="space-y-10">
      {/* Mindmap Card */}
      <article className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/40 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/40 sm:p-8">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4 border-b border-slate-200/60 pb-5 dark:border-slate-700/60 sm:flex-row sm:items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg ring-2 ring-white/50 font-black">
              <Network size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  {isVi ? "Sơ Đồ Tư Duy Kiến Trúc CSKH" : "CSKH Architecture Mindmap"}
                </h3>
                <span className="rounded-full border border-sky-500/30 bg-sky-500/20 px-2.5 py-0.5 text-xs font-black uppercase text-sky-700 dark:text-sky-300">
                  Interactive
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {isVi ? "Bản đồ tương tác kết nối 4 Trụ cột chiến lược & 6 Khối chức năng chuyên trách" : "Interactive map connecting 4 Strategic Pillars & 6 Specialized Blocks"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => {
                playUiSound("click");
                updateMindmapPaths();
              }}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-200/60 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200"
            >
              <RefreshCw size={14} className="text-sky-500" />
              <span>{isVi ? "Căn Chỉnh Luồng Lines" : "Align Lines"}</span>
            </button>
          </div>
        </div>

        {/* Quick Pillar Filter Grid */}
        <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            onClick={() => highlightPillar("pillar-1")}
            className="group cursor-pointer rounded-2xl border border-sky-500/30 bg-white/50 p-3.5 hover:bg-sky-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Compass size={10} className="text-amber-300" /> {isVi ? "TRỤ CỘT 01" : "PILLAR 01"}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-500">
                <Compass size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">{isVi ? "Tầm Nhìn & Sứ Mệnh" : "Vision & Mission"}</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{isVi ? "6 Giá trị cốt lõi & Tuyên ngôn" : "6 Core values & Manifesto"}</p>
          </div>

          <div
            onClick={() => highlightPillar("pillar-2")}
            className="group cursor-pointer rounded-2xl border border-purple-500/30 bg-white/50 p-3.5 hover:bg-purple-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Network size={10} className="text-pink-300" /> {isVi ? "TRỤ CỘT 02" : "PILLAR 02"}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-500">
                <Network size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">{isVi ? "Sơ Đồ 6 Khối CSKH" : "6 Blocks Schema"}</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Inbound, Outbound, Escalation</p>
          </div>

          <div
            onClick={() => highlightPillar("pillar-3")}
            className="group cursor-pointer rounded-2xl border border-emerald-500/30 bg-white/50 p-3.5 hover:bg-emerald-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Users size={10} className="text-emerald-200" /> {isVi ? "TRỤ CỘT 03" : "PILLAR 03"}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
                <Users size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">{isVi ? "Định Biên & Tuyển Dụng" : "Headcount & Hiring"}</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{isVi ? "Ma trận ASK & Tuyển dụng 5 bước" : "ASK Matrix & 5-Step Hiring"}</p>
          </div>

          <div
            onClick={() => highlightPillar("pillar-4")}
            className="group cursor-pointer rounded-2xl border border-orange-500/30 bg-white/50 p-3.5 hover:bg-orange-500/10 dark:bg-slate-950/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-md bg-gradient-to-r from-orange-600 to-amber-500 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                <Heart size={10} className="text-rose-200" /> {isVi ? "TRỤ CỘT 04" : "PILLAR 04"}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-orange-500">
                <Heart size={16} />
              </div>
            </div>
            <div className="mt-2 text-xs font-black text-slate-900 dark:text-white">{isVi ? "Văn Hóa Customer-Centric" : "Customer-Centric Culture"}</div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{isVi ? "Lắng nghe, thấu cảm & trao quyền" : "Listen, Empathize & Empower"}</p>
          </div>
        </div>

        {/* Visual Canvas Container */}
        <div
          ref={containerRef}
          className="relative mt-8 flex min-h-[620px] w-full items-center justify-center overflow-x-auto rounded-3xl bg-slate-900/5 p-4 dark:bg-slate-950/60 sm:p-8 border border-slate-200/80 dark:border-slate-800/80"
        >
          {/* SVG Connector Layer */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="grad-sky" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path d={paths[0]} stroke="url(#grad-sky)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
            <path d={paths[1]} stroke="url(#grad-purple)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
            <path d={paths[2]} stroke="url(#grad-emerald)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
            <path d={paths[3]} stroke="url(#grad-orange)" strokeWidth="3" fill="none" className="stroke-dasharray-[8_4]" />
          </svg>

          {/* Mindmap Tree Grid */}
          <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-6 md:grid-cols-12">
            {/* Left Column: Pillar 1 & Pillar 3 */}
            <div className="space-y-8 md:col-span-4 flex flex-col justify-center">
              <div
                ref={p1Ref}
                onClick={() => highlightPillar("pillar-1")}
                className="group cursor-pointer rounded-2xl border-2 border-sky-500/50 bg-white/80 p-4 shadow-md dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/30">
                    <Compass size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">{isVi ? "Trụ Cột 01" : "Pillar 01"}</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">{isVi ? "Tầm Nhìn & Sứ Mệnh" : "Vision & Mission"}</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" alt="Tầm nhìn CSKH" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">{isVi ? "Tuyên ngôn đối tác tin cậy & 6 Giá trị cốt lõi" : "Trusted partner manifesto & 6 core values"}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">{isVi ? "Tận tâm" : "Dedicated"}</span>
                  <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">{isVi ? "Lắng nghe" : "Listening"}</span>
                  <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">{isVi ? "Chủ động" : "Proactive"}</span>
                </div>
              </div>

              <div
                ref={p3Ref}
                onClick={() => highlightPillar("pillar-3")}
                className="group cursor-pointer rounded-2xl border-2 border-emerald-500/50 bg-white/80 p-4 shadow-md dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                    <Users size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{isVi ? "Trụ Cột 03" : "Pillar 03"}</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">{isVi ? "Định Biên & Tuyển Dụng" : "Headcount & Hiring"}</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" alt="Tuyển dụng CSKH" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">{isVi ? "Khung năng lực 3 cấp & 5 Bước HR" : "3-Tier competency & 5-Step HR"}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">{isVi ? "Nhân viên" : "Agent"}</span>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Leader</span>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Manager</span>
                </div>
              </div>
            </div>

            {/* Center Hub Column */}
            <div className="flex justify-center py-4 md:col-span-4">
              <div
                ref={centerRef}
                className="group relative flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 p-6 text-center text-white shadow-2xl dark:border-slate-700 sm:h-72 sm:w-72 ring-8 ring-sky-400/20"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md">
                  <Monitor size={28} className="text-amber-300" />
                </div>
                <h3 className="text-sm font-black uppercase leading-snug sm:text-base">
                  {isVi ? "PHÒNG CHĂM SÓC KHÁCH HÀNG" : "CUSTOMER SERVICE DEPARTMENT"}
                </h3>
                <p className="my-1 text-[11px] font-medium text-sky-100">Value Center & Bệ Phóng CX</p>
                <div className="rounded-full bg-white/20 border border-white/30 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide">
                  Master Plan CSKH
                </div>
              </div>
            </div>

            {/* Right Column: Pillar 2 & Pillar 4 */}
            <div className="space-y-8 md:col-span-4 flex flex-col justify-center">
              <div
                ref={p2Ref}
                onClick={() => highlightPillar("pillar-2")}
                className="group cursor-pointer rounded-2xl border-2 border-purple-500/50 bg-white/80 p-4 shadow-md hover:border-purple-400 dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <Network size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">{isVi ? "Trụ Cột 02" : "Pillar 02"}</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">{isVi ? "Sơ Đồ Tổ Chức 6 Khối" : "6 Blocks Organization"}</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop" alt="Cấu trúc tổ chức CSKH" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">{isVi ? "6 Khối chuyên trách & Phân cấp 3 Tuyến" : "6 Specialized blocks & 3-Tier escalation"}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:text-purple-300">Inbound</span>
                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:text-purple-300">Outbound</span>
                  <span className="rounded-md bg-purple-500/15 px-2 py-0.5 text-purple-700 dark:text-purple-300">Escalation</span>
                </div>
              </div>

              <div
                ref={p4Ref}
                onClick={() => highlightPillar("pillar-4")}
                className="group cursor-pointer rounded-2xl border-2 border-orange-500/50 bg-white/80 p-4 shadow-md hover:border-orange-400 dark:bg-slate-900/80"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-500/30">
                    <Heart size={20} />
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">{isVi ? "Trụ Cột 04" : "Pillar 04"}</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm line-clamp-1">{isVi ? "Văn Hóa Customer-Centric" : "Customer-Centric Culture"}</h4>
                  </div>
                </div>
                <div className="relative mt-3 h-20 overflow-hidden rounded-xl border border-white/20">
                  <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=400&auto=format&fit=crop" alt="Văn hóa Customer Centric" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                    <p className="text-[11px] font-semibold text-white">{isVi ? "Trao quyền tuyến đầu & CRM hội tụ" : "Frontline empowerment & converged CRM"}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-bold">
                  <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-700 dark:text-orange-300">{isVi ? "Đồng cảm" : "Empathy"}</span>
                  <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-700 dark:text-orange-300">{isVi ? "Trao quyền" : "Empower"}</span>
                  <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-orange-700 dark:text-orange-300">{isVi ? "Ghi nhận" : "Recognition"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Accordion Cards Sections list */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-xs font-black tracking-wider text-slate-500 uppercase">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span>{isVi ? "Cấu trúc Chi Tiết Dự Án" : "Detailed Project Structure"}</span>
          </div>

          {/* Dynamic Column Switcher Buttons */}
          <div className="flex items-center rounded-lg bg-[var(--surface)] p-0.5 border border-[var(--border)] shadow-xs bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => toggleLayoutMode("1-col")}
              title={isVi ? "Chế độ xem 1 cột" : "1 Column view"}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-black transition-all",
                layoutMode === "1-col"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700"
              )}
            >
              <LayoutList size={12} />
              <span>{isVi ? "1 Cột" : "1 Col"}</span>
            </button>
            <button
              onClick={() => toggleLayoutMode("2-col")}
              title={isVi ? "Chế độ xem 2 cột" : "2 Column view"}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-black transition-all",
                layoutMode === "2-col"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700"
              )}
            >
              <LayoutGrid size={12} />
              <span>{isVi ? "2 Cột" : "2 Cols"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid (1-column layout by default, or 2-column) */}
        <div className={cn(
          layoutMode === "1-col"
            ? "grid grid-cols-1 gap-6 max-w-4xl mx-auto"
            : "grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr"
        )}>
          {/* SECTION 00 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-indigo-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Layers size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "00 · YÊU CẦU ĐẶT RA CỦA DỰ ÁN" : "00 · PROJECT REQUIREMENTS"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-indigo-500/5 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {isVi ? "Xác định rõ ràng các mục tiêu bài toán, bài học vận hành và tiêu chuẩn chất lượng trọng tâm mà phòng Chăm sóc Khách hàng cần giải quyết ngay từ giai đoạn khởi tạo nhằm tạo nền tảng vững chắc cho sự phát triển lâu dài của doanh nghiệp." : "Clearly define business goals, operational lessons, and core quality standards for the Customer Service department from the initiation stage."}
              </p>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">100%</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? "Phủ Kênh CSKH" : "Omnichannel Coverage"}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Tích hợp đa kênh Omnichannel" : "Integrated omnichannel support"}</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">&lt; 15p</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? "Thời Gian Phản Hồi" : "Response Time"}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Cam kết SLA chuẩn hóa" : "Standardized SLA commitment"}</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">&ge; 95%</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? "Chỉ Số CSAT Target" : "Target CSAT"}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Đo lường độ hài lòng khách hàng" : "Customer satisfaction tracking"}</p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">01</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? "Bộ Chuẩn SOP" : "SOP Framework"}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Quy trình vận hành đồng bộ" : "Synchronized operation workflows"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-800 dark:text-indigo-300">
                    <Layers size={14} className="text-indigo-500" /> {isVi ? "XÂY DỰNG TỪ SỐ 0" : "BUILD FROM SCRATCH"}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isVi ? "Thiết lập toàn bộ sơ đồ tổ chức, chức năng nhiệm vụ, mô hình phân cấp và định biên nhân sự phù hợp với quy mô phát triển doanh nghiệp." : "Establish organizational chart, functions, hierarchy and headcount matching enterprise scale."}
                  </p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-800 dark:text-indigo-300">
                    <CheckCircle size={14} className="text-indigo-500" /> {isVi ? "CHUẨN HÓA QUY TRÌNH SOP & SLA" : "STANDARDIZE SOP & SLA"}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isVi ? "Xây dựng cẩm nang vận hành, quy trình xử lý khiếu nại, kịch bản giao tiếp và cam kết thời gian phản hồi minh bạch cho từng kênh dịch vụ." : "Build operational handbooks, complaint handling workflows and transparent SLA commitments."}
                  </p>
                </div>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-800 dark:text-indigo-300">
                    <Sliders size={14} className="text-indigo-500" /> {isVi ? "ỨNG DỤNG CÔNG NGHỆ CRM" : "CRM TECHNOLOGY"}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isVi ? "Triển khai hạ tầng Helpdesk/Ticket, đài tổng đài IP đàm thoại và Omnichannel hội tụ (Hotline, Chat, Zalo, Mail, Social) đồng bộ." : "Deploy Helpdesk/Ticket infrastructure, IP PBX phone systems and converged omnichannel tools."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 01 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-sky-500 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Info size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "01 · TỔNG QUAN DỰ ÁN & TẦM NHÌN" : "01 · PROJECT OVERVIEW & VISION"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-sky-500/5 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold w-1/4 text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <Folder size={14} className="text-sky-500" /> {isVi ? "Tên dự án" : "Project Name"}
                        </td>
                        <td className="p-3.5 font-extrabold text-slate-900 dark:text-white text-xs">
                          1.1 {isVi ? "Xây Dựng & Vận Hành Phòng Dịch Vụ Khách Hàng" : "Customer Service Department Setup & Operations"}
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <Briefcase size={14} className="text-purple-500" /> {isVi ? "Nhóm dự án" : "Project Group"}
                        </td>
                        <td className="p-3.5 text-xs">{isVi ? "Chiến lược & Quản lý (Strategy & Operations)" : "Strategy & Operations"}</td>
                      </tr>
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <Tag size={14} className="text-pink-500" /> {isVi ? "Thẻ (Tags)" : "Tags"}
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400 text-xs">
                          #CS_Strategy #Structure #CSStrategy #CSKH #CustomerCentric
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-500/5">
                        <td className="p-3.5 font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 text-xs">
                          <UserCheck size={14} className="text-emerald-500" /> {isVi ? "Vai trò thực hiện" : "Role"}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white text-xs">
                          Senior Project Architect + Customer Experience Strategist
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Vision / Mission grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex h-full flex-col justify-between p-4 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white shadow-md border-none space-y-2 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center space-x-1.5 text-white font-black text-xs">
                      <Eye size={16} className="text-white" />
                      <span>{isVi ? "TẦM NHÌN (VISION)" : "VISION"}</span>
                    </div>
                    <p className="text-xs font-bold text-sky-50 leading-snug">
                      &quot;{isVi ? "Trở thành đối tác tin cậy, dẫn đầu về trải nghiệm khách hàng trong ngành." : "To be the trusted partner leading in customer experience within the industry."}&quot;
                    </p>
                  </div>
                  <div className="flex h-full flex-col justify-between p-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white shadow-md border-none space-y-2 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center space-x-1.5 text-white font-black text-xs">
                      <Rocket size={16} className="text-white" />
                      <span>{isVi ? "SỰ MỆNH (MISSION)" : "MISSION"}</span>
                    </div>
                    <ul className="space-y-1 text-purple-50 text-[11px] font-medium">
                      <li>• {isVi ? "Giải quyết vấn đề nhanh chóng & triệt để" : "Quick & thorough problem resolution"}</li>
                      <li>• {isVi ? "Tạo dựng lòng trung thành bền vững" : "Build lasting customer loyalty"}</li>
                      <li>• {isVi ? "Thu thập insight khách hàng đóng góp cải tiến sản phẩm" : "Gather CS insights to improve product"}</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 02 */}
          <div id="pillar-2" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-purple-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Network size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "02 · THIẾT KẾ CƠ CẤU TỔ CHỨC & MÔ HÌNH VẬN HÀNH" : "02 · ORGANIZATION & OPERATIONS MODEL"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-purple-500/5 space-y-6">
                <div className="text-center space-y-1">
                  <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase">{isVi ? "Sơ đồ cơ cấu tổ chức 6 Khối" : "6 Blocks Organizational Chart"}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{isVi ? "Phân cấp tinh gọn từ Quản lý đến Agent chuyên biệt" : "Streamlined hierarchy from Management to Specialized Agents"}</p>
                </div>

                <div className="flex justify-center">
                  <div className="rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 p-3.5 text-center text-white w-72 shadow-md">
                    <span className="text-[10px] uppercase font-black tracking-wider opacity-80">{isVi ? "CẤP CAO NHẤT" : "EXECUTIVE"}</span>
                    <div className="font-bold text-sm">{isVi ? "Giám Đốc Dịch Vụ Khách Hàng" : "Customer Service Director"}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-sky-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-sky-600">{isVi ? "Khối 01: Inbound & Voice" : "Block 01: Inbound & Voice"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Tiếp nhận cuộc gọi nóng, giải đáp thông tin tức thời và xử lý Ticket cơ bản." : "Handle hotlines, immediate inquiries & basic tickets."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-emerald-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-emerald-600">{isVi ? "Khối 02: Omnichannel Chat" : "Block 02: Omnichannel Chat"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Hỗ trợ Livechat Website, Fanpage, Zalo OA và hộp thư Email hội tụ." : "Support Website Livechat, Fanpage, Zalo OA & converged Email."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-purple-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-purple-600">{isVi ? "Khối 03: Outbound Care" : "Block 03: Outbound Care"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Gọi thăm hỏi chủ động, chăm sóc tập khách VIP và đo lường CSAT/NPS định kỳ." : "Proactive outbound calls, VIP care & regular CSAT/NPS surveys."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-red-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-red-600">{isVi ? "Khối 04: Escalation (Khiếu Nại)" : "Block 04: Escalation"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Giải quyết khiếu nại sâu, sự cố nhạy cảm và khủng hoảng truyền thông." : "Resolve deep complaints, sensitive incidents & PR crises."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-amber-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-amber-600">{isVi ? "Khối 05: QA & Training" : "Block 05: QA & Training"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Chấm điểm chất lượng đàm thoại, đào tạo chuyên môn Onboarding 14 ngày." : "Score call quality, deliver 14-day onboarding training."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-indigo-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-indigo-600">{isVi ? "Khối 06: Data & CRM System" : "Block 06: Data & CRM System"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Xây dựng báo cáo realtime, phân tích Voice of Customer & bảo trì CRM." : "Build realtime reports, analyze Voice of Customer & maintain CRM."}</p>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 03 */}
          <div id="pillar-3" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-emerald-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Users size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "03 · ĐỊNH BIÊN NHÂN SỰ & KHUNG NĂNG LỰC" : "03 · HEADCOUNT & COMPETENCY FRAMEWORK"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/5 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-emerald-500/10 text-slate-800 dark:text-slate-200 font-bold text-xs border-b border-emerald-500/20">
                        <th className="p-3">{isVi ? "Vị trí nhân sự" : "Role"}</th>
                        <th className="p-3">{isVi ? "Yêu cầu khung năng lực cốt lõi" : "Core Competency Requirements"}</th>
                        <th className="p-3">{isVi ? "Trọng tâm đánh giá performance" : "Performance Evaluation Focus"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-600 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">Agent ({isVi ? "Nhân viên" : "Staff"})</td>
                        <td className="p-3">{isVi ? "Kỹ năng giao tiếp, xử lý vấn đề, kiến thức sản phẩm, đồng cảm sâu sắc." : "Communication, problem-solving, product knowledge, deep empathy."}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Thái độ & điểm CSAT, FCR" : "Attitude, CSAT score, FCR"}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-purple-700 dark:text-purple-400">Team Leader ({isVi ? "Trưởng nhóm" : "Team Leader"})</td>
                        <td className="p-3">{isVi ? "Quản lý đội nhóm, coaching chuyên môn, xử lý sự cố Escalation nâng cao." : "Team management, professional coaching, advanced escalation handling."}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Hiệu suất nhóm & Cam kết SLA" : "Team performance & SLA commitment"}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-sky-700 dark:text-sky-400">Manager ({isVi ? "Quản lý" : "Manager"})</td>
                        <td className="p-3">{isVi ? "Hoạch định chiến lược, thiết kế quy trình, phân tích hệ thống & tối ưu ROI." : "Strategic planning, workflow design, system analysis & ROI optimization."}</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Hiệu quả tài chính & NPS" : "Financial efficiency & NPS"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>

          {/* SECTION 04 */}
          <div id="pillar-4" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-orange-500 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-orange-500 via-amber-500 to-rose-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Heart size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "04 · VĂN HÓA CUSTOMER-CENTRIC & HỆ THỐNG CRM" : "04 · CUSTOMER-CENTRIC CULTURE & CRM SYSTEM"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-orange-500/5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">{isVi ? "LẮNG NGHE" : "LISTENING"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Nắm bắt chính xác phản hồi từ khách hàng và thu thập lỗi phần mềm." : "Accurately capture customer feedback & software bug reports."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">{isVi ? "ĐỒNG CẢM" : "EMPATHY"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Luôn đứng ở góc nhìn khách hàng để giải quyết mâu thuẫn một cách êm đẹp." : "Always stand in customers' shoes to resolve conflicts smoothly."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">{isVi ? "TRAO QUYỀN" : "EMPOWERMENT"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Cho phép nhân viên bồi thường trực tiếp trong khung hạn mức bồi thường SOP." : "Allow staff direct compensation within SOP limits."}</p>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-orange-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                    <span className="font-extrabold text-xs text-orange-600 uppercase">{isVi ? "GHI NHẬN" : "RECOGNITION"}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Biểu dương xuất sắc các ca hỗ trợ vượt kỳ vọng của khách hàng hàng tuần." : "Weekly praise for outstanding customer support cases."}</p>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 05 */}
          <div id="pillar-1" className="flex flex-col overflow-hidden rounded-[20px] border-2 border-sky-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Target size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "05 · MÔ HÌNH & GIẢI PHÁP CHIẾN LƯỢC" : "05 · STRATEGIC MODELS & SOLUTIONS"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-sky-500/5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-sky-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <div className="relative h-24 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="Tầm nhìn" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <span className="font-extrabold text-xs text-white uppercase tracking-wider bg-sky-600/80 px-2.5 py-1 rounded">01 · {isVi ? "TẦM NHÌN & SỨ MỆNH" : "VISION & MISSION"}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>{isVi ? "Tập trung:" : "Focus:"}</strong> {isVi ? "Xây dựng tuyên ngôn Tầm nhìn đối tác tin cậy, định vị dịch vụ bệ phóng trải nghiệm bền vững và bộ 6 giá trị cốt lõi làm kim chỉ nam." : "Build trusted partner vision manifesto, position sustainable experience launchpad."}
                    </p>
                  </div>

                  <div className="flex h-full flex-col justify-between rounded-xl border border-purple-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <div className="relative h-24 overflow-hidden rounded-lg">
                      <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop" alt="Sơ đồ" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <span className="font-extrabold text-xs text-white uppercase tracking-wider bg-purple-600/80 px-2.5 py-1 rounded">02 · {isVi ? "THIẾT KẾ SƠ ĐỒ TỔ CHỨC" : "ORG CHART DESIGN"}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>{isVi ? "Tập trung:" : "Focus:"}</strong> {isVi ? "Sắp xếp 6 khối chuyên trách (Inbound, Outbound, Escalation, Social, QA, CRM System) kết hợp quy trình luân chuyển Ticket 3 Tuyến thông minh." : "Arrange 6 specialized blocks combining smart 3-tier ticket routing."}
                    </p>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 06 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-amber-500 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Clock size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "06 · TRIỂN KHAI & VẬN HÀNH" : "06 · DEPLOYMENT & OPERATIONS"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-orange-500/5 space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 text-center font-bold">
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">1</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">{isVi ? "Khảo sát & Đánh giá" : "Discovery"}</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">2</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">{isVi ? "Thiết kế Sơ đồ" : "Design"}</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">3</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">{isVi ? "Tuyển dụng 5 Bước" : "Hiring"}</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">4</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">{isVi ? "Đào tạo Onboarding" : "Training"}</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/10 space-y-1">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">5</div>
                    <div className="text-[10px] text-slate-800 dark:text-slate-200 uppercase">{isVi ? "Vận hành Thử" : "Pilot"}</div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-between p-3 rounded-xl bg-amber-600 text-white space-y-1 shadow">
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-white text-amber-600 text-xs font-black">6</div>
                    <div className="text-[10px] uppercase">{isVi ? "Bàn giao & Tối ưu" : "Scale"}</div>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 07 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-teal-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-teal-600 to-emerald-500 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <UserCheck size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "07 · VAI TRÒ & ĐÓNG GÓP CỦA DỰ ÁN" : "07 · ROLE & CONTRIBUTIONS"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-teal-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <span className="font-extrabold text-xs text-teal-700 dark:text-teal-400 uppercase">{isVi ? "Trách nhiệm chính:" : "Key Responsibilities:"}</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                      <li>{isVi ? "Nghiên cứu thị trường và quy hoạch toàn bộ cơ cấu vận hành phòng CSKH." : "Research market and plan CS operations structure."}</li>
                      <li>{isVi ? "Trực tiếp xây dựng giáo trình đào tạo, tổ chức kiểm tra năng lực nhân viên tuyến đầu." : "Build training curriculum and evaluate frontline staff."}</li>
                      <li>{isVi ? "Giám sát ca trực Hotline và bảo vệ tỷ lệ tuân thủ SLA phản hồi." : "Monitor hotline shifts and protect SLA compliance rates."}</li>
                    </ul>
                  </div>
                  <div className="flex h-full flex-col justify-between rounded-xl border border-teal-200 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-950 space-y-2">
                    <span className="font-extrabold text-xs text-teal-700 dark:text-teal-400 uppercase">{isVi ? "Quyết định then chốt:" : "Key Decisions:"}</span>
                    <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
                      <li>{isVi ? "Áp dụng chính sách \"Ủy quyền bồi thường ngay tuyến đầu\" cho Agent có năng lực tốt." : "Apply frontline compensation empowerment policy for capable agents."}</li>
                      <li>{isVi ? "Lựa chọn giải pháp tổng đài đa kênh Omnichannel tập trung." : "Select centralized omnichannel call center solution."}</li>
                      <li>{isVi ? "Thiết kế hệ thống báo cáo kết quả Realtime cập nhật liên tục." : "Design realtime outcome reporting system."}</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>

          {/* SECTION 08 (INTERACTIVE TOOLS) */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-blue-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <SlidersHorizontal size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "08 · HỆ THỐNG & CÔNG CỤ INTERACTIVE" : "08 · INTERACTIVE TOOLS & SYSTEMS"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-blue-500/5 space-y-6">
                <div className="inline-flex flex-wrap items-center gap-2.5 p-1 bg-transparent mx-2.5 my-2.5">
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setActiveToolTab("calc");
                    }}
                    className={cn(
                      "px-3.5 py-2 m-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer",
                      activeToolTab === "calc"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    <Sliders size={14} /> 1. {isVi ? "Định Biên Headcount" : "Headcount Calculator"}
                  </button>
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setActiveToolTab("qa");
                    }}
                    className={cn(
                      "px-3.5 py-2 m-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer",
                      activeToolTab === "qa"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    <CheckSquare size={14} /> 2. {isVi ? "Chấm Điểm QA" : "QA Scorecard"}
                  </button>
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setActiveToolTab("csat");
                    }}
                    className={cn(
                      "px-3.5 py-2 m-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer",
                      activeToolTab === "csat"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    <Heart size={14} /> 3. {isVi ? "Đo Lường CSAT / NPS" : "CSAT / NPS Tracker"}
                  </button>
                </div>

                {/* TAB 1: HEADCOUNT */}
                {activeToolTab === "calc" && (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 lg:col-span-7 space-y-4">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">{isVi ? "Thông Số Đầu Vào" : "Input Parameters"}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{isVi ? "Ticket/Cuộc gọi (tháng):" : "Volume / Month:"}</label>
                          <input
                            type="number"
                            value={volume}
                            onChange={(e) => setVolume(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{isVi ? "Thời gian xử lý TB AHT (phút):" : "Average Handle Time AHT (min):"}</label>
                          <input
                            type="number"
                            step="0.5"
                            value={aht}
                            onChange={(e) => setAht(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{isVi ? "Giờ làm việc/ngày (giờ):" : "Hours / Day:"}</label>
                          <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{isVi ? "Số ngày làm việc/tháng (ngày):" : "Working Days / Month:"}</label>
                          <input
                            type="number"
                            value={days}
                            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Occupancy (%):</label>
                          <input
                            type="number"
                            value={occupancy}
                            onChange={(e) => setOccupancy(Math.min(100, Math.max(10, parseInt(e.target.value) || 0)))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Shrinkage (%):</label>
                          <input
                            type="number"
                            value={shrinkage}
                            onChange={(e) => setShrinkage(Math.min(90, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/20 lg:col-span-5 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-400 tracking-wider">{isVi ? "Định Biên Khuyến Nghị" : "Recommended Headcount"}</span>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 text-xs">
                          <span className="text-slate-500">{isVi ? "Tổng giờ công tháng:" : "Total Workload Hours:"}</span>
                          <span className="font-bold">{totalWorkloadHours.toLocaleString()} {isVi ? "Giờ" : "Hrs"}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs">
                          <span className="font-extrabold text-sky-700 dark:text-sky-400">{isVi ? "Số Nhân viên trực tiếp (Agents):" : "Direct Agents Needed:"}</span>
                          <span className="font-black text-sky-600 dark:text-sky-400 text-sm">{agentsNeeded} NV</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                          <span className="font-extrabold text-purple-700 dark:text-purple-400">{isVi ? "Trưởng Nhóm / Giám Sát (TL):" : "Team Leaders (TL):"}</span>
                          <span className="font-black text-purple-600 dark:text-purple-400 text-sm">{tlNeeded} NV</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                          <span className="font-extrabold text-emerald-700 dark:text-emerald-400">{isVi ? "Đảm bảo chất lượng (QA):" : "Quality Assurance (QA):"}</span>
                          <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">{qaNeeded} NV</span>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-sky-600 text-white text-center shadow">
                        <div className="text-[10px] uppercase font-bold opacity-80">{isVi ? "Tổng định biên phòng ban" : "Total Department Staff"}</div>
                        <div className="text-2xl font-black">{totalHeadcount} {isVi ? "Nhân Sự" : "Personnel"}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: QA */}
                {activeToolTab === "qa" && (
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">{isVi ? "Tiêu Chí Chấm Điểm" : "Scorecard Criteria"}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{isVi ? "Điểm QA đạt:" : "Achieved QA Score:"}</span>
                        <span className={cn("px-3 py-1 rounded-xl text-white font-black text-xs", qaResult.color)}>
                          {qaResult.score}% ({qaResult.label})
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC1} onChange={(e) => setQaC1(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">1. {isVi ? "Chào hỏi đúng chuẩn & Lời xưng hô lịch sự" : "Standard Greeting & Polite Address"}</span>
                            <span className="text-[10px] text-slate-400 block">{isVi ? "Đúng kịch bản lời chào, xưng tên tư vấn viên." : "Follow script greeting, state agent name."}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+15 Pts</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC2} onChange={(e) => setQaC2(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">2. {isVi ? "Lắng nghe, đồng cảm & Thấu hiểu nhu cầu" : "Listening, Empathy & Needs Understanding"}</span>
                            <span className="text-[10px] text-slate-400 block">{isVi ? "Thể hiện tinh thần sẵn sàng trợ giúp, đồng cảm với sự cố." : "Show readiness to help, empathize with issues."}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+20 Pts</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC3} onChange={(e) => setQaC3(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">3. {isVi ? "Tra cứu thông tin chính xác theo chuẩn SOP" : "Accurate Information Lookup per SOP"}</span>
                            <span className="text-[10px] text-slate-400 block">{isVi ? "Sử dụng đúng cơ sở dữ liệu tri thức nội bộ." : "Use correct internal knowledge base database."}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+35 Pts</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC4} onChange={(e) => setQaC4(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">4. {isVi ? "Chủ động đưa giải pháp & Hướng dẫn từng bước" : "Proactive Solutions & Step-by-Step Guide"}</span>
                            <span className="text-[10px] text-slate-400 block">{isVi ? "Chủ động hỗ trợ đền bù trong hạn mức nhanh chóng." : "Proactively support swift compensation within limits."}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+20 Pts</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaC5} onChange={(e) => setQaC5(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">5. {isVi ? "Kết thúc cuộc gọi & Lời chào cảm ơn" : "Closing & Thank You Greeting"}</span>
                            <span className="text-[10px] text-slate-400 block">{isVi ? "Lời chào đúng chuẩn, xác nhận không còn thắc mắc khác." : "Standard closing, confirm no further questions."}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600 shrink-0">+10 Pts</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 cursor-pointer">
                        <div className="flex items-center space-x-3 text-left">
                          <input type="checkbox" checked={qaFatal} onChange={(e) => setQaFatal(e.target.checked)} className="w-4 h-4 accent-red-600" />
                          <div>
                            <span className="block text-xs font-extrabold text-red-700 dark:text-red-300">VI PHẠM NGHIÊM TRỌNG (FATAL ERROR)</span>
                            <span className="text-[10px] text-red-600 dark:text-red-400 block">{isVi ? "Thái độ gắt gỏng, ngắt kết nối chủ động hoặc tiết lộ thông tin." : "Harsh attitude, proactive call dropping or leaking data."}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-red-600 shrink-0 uppercase">{isVi ? "Trừ 100% Điểm" : "-100% Score"}</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 3: CSAT & NPS */}
                {activeToolTab === "csat" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex h-full flex-col justify-between p-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 space-y-4">
                      <div className="flex items-center space-x-1.5 font-extrabold text-amber-900 dark:text-amber-200 text-xs border-b border-amber-500/20 pb-2">
                        <Star size={16} />
                        <span>{isVi ? "CHỈ SỐ HÀI LÒNG KHÁCH HÀNG (CSAT)" : "CUSTOMER SATISFACTION (CSAT)"}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{isVi ? "Số lượt đánh giá 4* và 5*:" : "Positive Ratings (4-5*):"}</label>
                          <input
                            type="number"
                            value={csatGood}
                            onChange={(e) => setCsatGood(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{isVi ? "Tổng số lượt đánh giá CSAT:" : "Total CSAT Ratings:"}</label>
                          <input
                            type="number"
                            value={csatTotal}
                            onChange={(e) => setCsatTotal(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-center">
                          <span className="block text-[11px] text-slate-500 font-bold uppercase">{isVi ? "Điểm số CSAT:" : "CSAT Score:"}</span>
                          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{csatVal}%</span>
                          <p className="text-[10px] text-amber-700 mt-1 font-semibold">{isVi ? "Đạt & Vượt mục tiêu (≥90%)" : "Achieved Target (≥90%)"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col justify-between p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 space-y-4">
                      <div className="flex items-center space-x-1.5 font-extrabold text-indigo-900 dark:text-indigo-200 text-xs border-b border-indigo-500/20 pb-2">
                        <Heart size={16} />
                        <span>NET PROMOTER SCORE (NPS)</span>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Promoters (9-10*)</label>
                            <input
                              type="number"
                              value={npsPromoters}
                              onChange={(e) => setNpsPromoters(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Passives (7-8*)</label>
                            <input
                              type="number"
                              value={npsPassives}
                              onChange={(e) => setNpsPassives(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Detractors (0-6*)</label>
                            <input
                              type="number"
                              value={npsDetractors}
                              onChange={(e) => setNpsDetractors(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-center">
                          <span className="block text-[11px] text-slate-500 font-bold uppercase">{isVi ? "Chỉ số NPS đạt:" : "NPS Score:"}</span>
                          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{npsScore > 0 ? `+${npsScore}` : npsScore}</span>
                          <p className="text-[10px] text-indigo-700 mt-1 font-semibold">{isVi ? "Mức Xuất Sắc (>50)" : "Excellent (>50)"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* SECTION 09 */}
          <div className="flex flex-col overflow-hidden rounded-[20px] border-2 border-emerald-600 bg-white shadow-md dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 p-4 text-left text-white">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-white/20 p-2 text-white">
                  <Trophy size={18} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wide sm:text-base">
                  {isVi ? "09 · KẾT QUẢ ĐẠT ĐƯỢC CỦA DỰ ÁN" : "09 · PROJECT RESULTS & ACHIEVEMENTS"}
                </h4>
              </div>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/5 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-emerald-500/10 text-slate-800 dark:text-slate-200 font-bold text-xs border-b border-emerald-500/20">
                        <th className="p-3">{isVi ? "Chỉ số đo lường (KPIs)" : "Key Performance Indicators"}</th>
                        <th className="p-3 text-red-600 dark:text-red-400">{isVi ? "Trước khi triển khai" : "Before Deployment"}</th>
                        <th className="p-3 text-emerald-600 dark:text-emerald-400">{isVi ? "Sau khi hoàn thiện" : "After Completion"}</th>
                        <th className="p-3">{isVi ? "Cải thiện" : "Improvement"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Thời gian phản hồi ban đầu (FRT)" : "First Response Time (FRT)"}</td>
                        <td className="p-3 text-red-500">45 {isVi ? "Phút" : "Mins"}</td>
                        <td className="p-3 font-extrabold text-emerald-600">2.8 {isVi ? "Phút" : "Mins"}</td>
                        <td className="p-3 font-extrabold text-sky-600">{isVi ? "Nhanh hơn 93.7%" : "93.7% Faster"}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Tỷ lệ giải quyết lần đầu (FCR)" : "First Contact Resolution (FCR)"}</td>
                        <td className="p-3 text-red-500">52.0%</td>
                        <td className="p-3 font-extrabold text-emerald-600">88.2%</td>
                        <td className="p-3 font-extrabold text-sky-600">+36.2%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Chỉ số Hài lòng (CSAT)" : "Customer Satisfaction (CSAT)"}</td>
                        <td className="p-3 text-red-500">72.0%</td>
                        <td className="p-3 font-extrabold text-emerald-600">96.8%</td>
                        <td className="p-3 font-extrabold text-sky-600">+24.8%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{isVi ? "Tỷ lệ tuân thủ SLA phản hồi" : "SLA Compliance Rate"}</td>
                        <td className="p-3 text-red-500">68.5%</td>
                        <td className="p-3 font-extrabold text-emerald-600">98.5%</td>
                        <td className="p-3 font-extrabold text-sky-600">+30.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-emerald-500/15 via-sky-500/15 to-purple-500/15 border border-emerald-500/20 rounded-xl p-4 gap-3">
                  <div className="text-left">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                      <Award size={14} className="text-emerald-500" /> {isVi ? "BẢO CHỨNG TÁC ĐỘNG TÀI CHÍNH & ROI 210%" : "FINANCIAL IMPACT & ROI 210%"}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{isVi ? "Chuyển đổi hoàn toàn bộ máy CSKH từ Cost Center thành Value Center đắc lực." : "Transform CS department from Cost Center to powerful Value Center."}</p>
                  </div>
                  <button
                    onClick={() => {
                      playUiSound("click");
                      window.print();
                    }}
                    className="cursor-pointer px-4.5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow hover:bg-emerald-500 transition shrink-0"
                  >
                    {isVi ? "In Báo Cáo Kết Quả" : "Print Results Report"}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slogan Banner with Simulation trigger */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/40 p-8 shadow-2xl dark:border-white/10 dark:bg-slate-900/40 sm:p-14 text-center">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/30 via-pink-500/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-300">
            <Sparkles size={14} className="text-amber-400" /> {isVi ? "Tuyên Ngôn Chiến Lược Trải Nghiệm Khách Hàng" : "Customer Experience Strategic Manifesto"}
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-4xl leading-tight">
            &quot;{isVi ? "TỪ TRUNG TÂM CHI PHÍ THỤ ĐỘNG THÀNH BỆ PHÓNG TRẢI NGHIỆM VÀ KẾT NỐI BỀN VỮNG" : "FROM PASSIVE COST CENTER TO SUSTAINED EXPERIENCE & CONNECTION LAUNCHPAD"}&quot;
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            {isVi ? "Một phòng CSKH xuất sắc không chỉ giải quyết sự cố, mà còn kiến tạo niềm tin, giữ chân khách hàng và lan tỏa giá trị thương hiệu dài hạn." : "An excellent CS department not only solves issues, but builds trust, retains customers and spreads long-term brand value."}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                playUiSound("click");
                setIsSimOpen(true);
              }}
              className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold shadow-lg flex items-center space-x-2 text-xs"
            >
              <Bot size={16} />
              <span>{isVi ? "Thử Nghiệm Mô Phỏng CSKH" : "Test CSKH Simulation"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* CSKH SIMULATION MODAL */}
      {isSimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsSimOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Box */}
          <div
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/40 bg-white/90 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900/90 backdrop-blur-xl max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 dark:border-slate-700/60">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow">
                  <Bot size={22} />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{isVi ? "Mô Phỏng Xử Lý Tình Huống CSKH" : "CSKH Scenario Simulation"}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{isVi ? "Kiểm tra ứng xử Customer-Centric & Khung năng lực tuyến đầu" : "Test Customer-Centric behavior & frontline competencies"}</p>
                </div>
              </div>
              <button
                onClick={() => setIsSimOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {selectedSimOption === null ? (
              <div className="space-y-5 text-left">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 space-y-2">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-red-600 dark:text-red-400 uppercase">
                    <AlertTriangle size={14} /> {isVi ? "Tình huống khiếu nại khách hàng:" : "Customer Complaint Scenario:"}
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm">
                    &quot;{isVi ? "Đơn hàng của tôi bị trễ 3 ngày so với cam kết, sản phẩm nhận được còn bị móp góc! Tôi muốn hủy dịch vụ và yêu cầu hoàn tiền ngay lập tức!" : "My order is 3 days delayed, and the item arrived dented! I want to cancel and get an immediate refund!"}&quot;
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase">{isVi ? "Hãy chọn phương án phản hồi của tư vấn viên:" : "Select agent response option:"}</p>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setSelectedSimOption(1);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 space-y-1 block cursor-pointer"
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      {isVi ? "Phương án A: \"Dạ đây là lỗi bên vận chuyển chứ không phải bên em. Anh/chị vui lòng tự gọi shipper nhé!\"" : "Option A: \"This is the shipping company's fault, please call the courier yourself!\""}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Hành vi: Đổ lỗi cho đối tác vận chuyển, thoái thác trách nhiệm." : "Behavior: Blaming delivery partner, deflecting responsibility."}</p>
                  </button>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setSelectedSimOption(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 space-y-1 block cursor-pointer"
                  >
                    <div className="font-bold text-slate-950 dark:text-white text-xs">
                      {isVi ? "Phương án B: \"Dạ em rất hiểu sự thất vọng của anh/chị. Cho phép em gửi lời xin lỗi chân thành! Em xin phép gửi đổi sản phẩm mới ngay hôm nay kèm voucher đền bù 20% ạ.\"" : "Option B: \"I deeply understand your frustration. Please accept my sincere apologies! Let me ship a replacement today with a 20% compensation voucher.\""}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Hành vi: Đồng cảm sâu sắc, chủ động trao quyền đền bù tức thì tuyến đầu." : "Behavior: Deep empathy, proactive frontline compensation empowerment."}</p>
                  </button>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setSelectedSimOption(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-500 space-y-1 block cursor-pointer"
                  >
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      {isVi ? "Phương án C: \"Anh/chị vui lòng viết email khiếu nại gửi bộ phận kỹ thuật, bên em sẽ xem xét phản hồi trong vòng 7 ngày làm việc.\"" : "Option C: \"Please write a complaint email to technical department, we will review within 7 working days.\""}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{isVi ? "Hành vi: Xử lý quan liêu theo quy trình chậm chạp, gây ức chế thêm." : "Behavior: Bureaucratic slow process, causing further frustration."}</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                {selectedSimOption === 2 ? (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 space-y-3">
                    <span className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase">
                      <CheckCircle size={16} /> {isVi ? "XỬ LÝ CHUẨN CUSTOMER-CENTRIC (+100 ĐIỂM QA)" : "CORRECT CUSTOMER-CENTRIC HANDLING (+100 QA PTS)"}
                    </span>
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-semibold">
                      {isVi ? "Tuyệt vời! Bạn đã áp dụng đúng triết lý đồng cảm sâu sắc kết hợp cơ chế Trao quyền tuyến đầu bồi thường tức thì. Khách hàng cảm thấy bức xúc được giải tỏa ngay lập tức, chuyển hóa khiếu nại căng thẳng thành lòng trung thành lâu bền với thương hiệu!" : "Fantastic! You applied deep empathy combined with frontline empowerment. Customer frustration was instantly relieved, turning tension into lasting brand loyalty!"}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 space-y-3">
                    <span className="flex items-center gap-1.5 text-xs font-black text-red-800 dark:text-red-300 uppercase">
                      <ShieldAlert size={16} /> {isVi ? "XỬ LÝ SAI QUY CHUẨN (0 ĐIỂM QA - FATAL)" : "INCORRECT HANDLING (0 QA PTS - FATAL)"}
                    </span>
                    <p className="text-xs text-red-900 dark:text-red-200 leading-relaxed">
                      {selectedSimOption === 1
                        ? (isVi ? "Hành vi đổ lỗi cho đối tác vận chuyển shipper làm khách hàng phẫn nộ đỉnh điểm, dẫn tới khủng hoảng khiếu nại leo thang trên mạng xã hội." : "Blaming the delivery partner makes the customer furious, leading to escalation.")
                        : (isVi ? "Quy trình giải quyết hành chính trễ nải 7 ngày của bạn gây ra tỷ lệ rời bỏ dịch vụ (Churn Rate) tăng vọt, phá hỏng uy tín thương hiệu." : "Your slow 7-day administrative process spikes churn and ruins brand reputation.")}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    playUiSound("click");
                    setSelectedSimOption(null);
                  }}
                  className="cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-900"
                >
                  {isVi ? "Thử Lại Phương Án Khác" : "Try Another Option"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
