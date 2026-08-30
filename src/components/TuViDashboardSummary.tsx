import React, { useState } from "react";
import { 
  User, Calendar, Star, Award, Compass, Shield, Target, 
  Layers, Zap, Flag, Lightbulb, Settings, Clock, TrendingUp, 
  Users, CheckCircle2, AlertTriangle, Sparkles, Check, Info,
  Search, ArrowRight
} from "lucide-react";
import { useLanguage } from "../i18n";

export function TuViDashboardSummary() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Interactive Zodiac / Birthdate Lookup State for Section V
  const [birthInput, setBirthInput] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearchCompatibility = () => {
    if (!birthInput.trim()) {
      setSearchResult(
        isVi 
          ? "Vui lòng nhập năm sinh (ví dụ: 1992, 1988, 1995...) để xem mức độ tương hợp."
          : "Please enter a birth year (e.g. 1992, 1988, 1995...) to check compatibility."
      );
      return;
    }

    const year = parseInt(birthInput.trim(), 10);
    if (isNaN(year) || year < 1930 || year > 2030) {
      setSearchResult(
        isVi 
          ? "Năm sinh không hợp lệ. Vui lòng nhập từ 1930 đến 2030."
          : "Invalid year. Please enter a year between 1930 and 2030."
      );
      return;
    }

    const zodiacsVi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
    const zodiacsEn = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Cat/Rabbit", "Dragon", "Snake", "Horse", "Goat"];
    const emojiMap = ["🐵", "🐓", "🐶", "🐷", "🐭", "🐂", "🐯", "🐱", "🐉", "🐍", "🐴", "🐐"];
    
    const index = (year % 12);
    const zName = isVi ? zodiacsVi[index] : zodiacsEn[index];
    const emoji = emojiMap[index];

    // Check tier
    if (["Thân", "Dậu", "Sửu"].includes(zodiacsVi[index])) {
      setSearchResult(
        isVi 
          ? `Tuổi ${emoji} ${zName} (${year}): KHÁ NỔI BẬT & HỢP NHẤT (88% - 95%). Rất phù hợp để hợp tác lâu dài, bổ trợ năng lực!`
          : `Year of ${emoji} ${zName} (${year}): HIGH COMPATIBILITY (88% - 95%). Excellent for long-term synergy & leadership alignment!`
      );
    } else if (["Thìn", "Tỵ", "Mùi"].includes(zodiacsVi[index])) {
      setSearchResult(
        isVi
          ? `Tuổi ${emoji} ${zName} (${year}): NHÓM HỖ TRỢ (72% - 85%). Hợp tác khá tốt, cần phân định rõ KPI và vai trò!`
          : `Year of ${emoji} ${zName} (${year}): SUPPORTIVE GROUP (72% - 85%). Good synergy, require clear scope & KPI boundaries!`
      );
    } else {
      setSearchResult(
        isVi
          ? `Tuổi ${emoji} ${zName} (${year}): CẦN THẬN TRỌNG (45% - 60%). Có sự khác biệt tư duy, cần giao tiếp thẳng thắn & cơ chế minh bạch.`
          : `Year of ${emoji} ${zName} (${year}): CAUTION & OPTIMIZATION (45% - 60%). Mindset friction, requires transparent communication & structures.`
      );
    }
  };

  return (
    <div className="w-full space-y-6 text-slate-800 dark:text-slate-100 font-sans">
      
      {/* ================= 0. TOP BANNER HEADER ================= */}
      <div className="w-full bg-gradient-to-r from-purple-50 via-indigo-50/50 to-blue-50 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-slate-900 rounded-2xl sm:rounded-3xl border border-purple-200/80 dark:border-purple-800/60 p-4 sm:p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-purple-950 dark:text-purple-200 tracking-tight flex items-center gap-2">
            <span>{isVi ? "TỔNG QUAN" : "EXECUTIVE OVERVIEW"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-700/90 dark:text-purple-300/80 italic font-medium">
            "{isVi ? "Hiểu mình để vượt xa. Nắm quyết để bứt phá." : "Know yourself to excel. Master decisions to break through."}"
          </p>
        </div>
      </div>

      {/* ================= TOP GRID: SECTION I & SECTION II ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* SECTION I: HỒ SƠ LÃNH ĐẠO (Col 1-5) */}
        <div className="lg:col-span-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-4">
          
          {/* Section Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <svg className="w-8 h-8 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="profile-id-main" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="profile-id-badge" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <rect x="22" y="18" width="56" height="64" rx="12" fill="url(#profile-id-main)" />
                  <circle cx="50" cy="42" r="11" fill="#ffffff" />
                  <path d="M 33 66 C 33 55 40 52 50 52 C 60 52 67 55 67 66 Z" fill="#ffffff" />
                  <circle cx="68" cy="26" r="8" fill="url(#profile-id-badge)" />
                  <path d="M 65 26 L 67 28 L 71 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {isVi ? "I. HỒ SƠ LÃNH ĐẠO" : "I. LEADERSHIP PROFILE"}
              </h3>
            </div>

            {/* Profile Sub Banner */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    Lê Thái Hùng
                  </span>
                  <span className="text-xs text-slate-500 font-medium">| {isVi ? "Lãnh Đạo" : "Executive"}</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  <strong>{isVi ? "Phái:" : "Gender:"}</strong> Tử Vi Nam &nbsp;|&nbsp; <strong>{isVi ? "Tên:" : "Name:"}</strong> Thành Công &nbsp;|&nbsp; <strong>{isVi ? "Cung Mệnh:" : "Life Palace:"}</strong> Tỵ
                </div>
              </div>

              <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[11px] font-black rounded-full border border-amber-300/80 dark:border-amber-700 shrink-0">
                ✦ {isVi ? "Dương trị nam" : "Yang Male"}
              </span>
            </div>
          </div>

          {/* 6 Info Cards Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            
            {/* 1. Mệnh & Thân */}
            <div className="p-2.5 bg-gradient-to-br from-amber-50/70 to-orange-50/50 dark:from-amber-950/20 dark:to-slate-800/40 rounded-xl border border-amber-200/70 dark:border-amber-800/50">
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 text-[11px] font-bold">
                <CrownIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>{isVi ? "Mệnh & Thân" : "Destiny & Body"}</span>
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white mt-1">
                {isVi ? "Mệnh: Mộc" : "Element: Wood"}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                {isVi ? "Thân cư: Quan" : "Body: Career"}
              </div>
            </div>

            {/* 2. Ngày & Giờ sinh */}
            <div className="p-2.5 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-blue-950/20 dark:to-slate-800/40 rounded-xl border border-blue-200/70 dark:border-blue-800/50">
              <div className="flex items-center gap-1.5 text-blue-800 dark:text-blue-400 text-[11px] font-bold">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{isVi ? "Ngày & Giờ sinh" : "Birth Date & Time"}</span>
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white mt-1">
                18/12/1984
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                14:30
              </div>
            </div>

            {/* 3. Ưu điểm nổi bật */}
            <div className="p-2.5 bg-gradient-to-br from-purple-50/70 to-fuchsia-50/50 dark:from-purple-950/20 dark:to-slate-800/40 rounded-xl border border-purple-200/70 dark:border-purple-800/50">
              <div className="flex items-center gap-1.5 text-purple-800 dark:text-purple-400 text-[11px] font-bold">
                <Star className="w-3.5 h-3.5 text-purple-600" />
                <span>{isVi ? "Ưu điểm nổi bật" : "Key Strengths"}</span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold mt-1 leading-tight">
                {isVi ? "Hội Tụ Tuệ • Kiên Trì • Nhạy bén" : "Intellect • Persistence • Agility"}
              </div>
            </div>

            {/* 4. Giá trị cốt lõi */}
            <div className="p-2.5 bg-gradient-to-br from-indigo-50/70 to-purple-50/50 dark:from-indigo-950/20 dark:to-slate-800/40 rounded-xl border border-indigo-200/70 dark:border-indigo-800/50">
              <div className="flex items-center gap-1.5 text-indigo-800 dark:text-indigo-400 text-[11px] font-bold">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isVi ? "Giá trị cốt lõi" : "Core Values"}</span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold mt-1 leading-tight">
                {isVi ? "Chính trực • Trách nhiệm • Tầm nhìn" : "Integrity • Responsibility • Vision"}
              </div>
            </div>

            {/* 5. Định hướng */}
            <div className="p-2.5 bg-gradient-to-br from-slate-100/80 to-slate-50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-xl border border-slate-300/70 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 text-[11px] font-bold">
                <Compass className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>{isVi ? "Định hướng" : "Direction"}</span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold mt-1">
                {isVi ? "Chiến lược • Dài hạn" : "Strategic • Long-term"}
              </div>
            </div>

            {/* 6. Phong cách */}
            <div className="p-2.5 bg-gradient-to-br from-fuchsia-50/70 to-pink-50/50 dark:from-fuchsia-950/20 dark:to-slate-800/40 rounded-xl border border-fuchsia-200/70 dark:border-fuchsia-800/50">
              <div className="flex items-center gap-1.5 text-fuchsia-800 dark:text-fuchsia-400 text-[11px] font-bold">
                <svg className="w-3.5 h-3.5 text-fuchsia-600 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="style-id-main" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d946ef" />
                      <stop offset="100%" stopColor="#a21caf" />
                    </linearGradient>
                  </defs>
                  <rect x="22" y="18" width="56" height="64" rx="12" fill="url(#style-id-main)" />
                  <circle cx="50" cy="42" r="11" fill="#ffffff" />
                  <path d="M 33 66 C 33 55 40 52 50 52 C 60 52 67 55 67 66 Z" fill="#ffffff" />
                  <circle cx="68" cy="26" r="8" fill="#f472b6" />
                  <path d="M 65 26 L 67 28 L 71 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{isVi ? "Phong cách" : "Leadership Style"}</span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold mt-1">
                {isVi ? "Quyết đoán • Bền bỉ" : "Decisive • Resilient"}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION II: TRỤ CỘT NĂNG LỰC (Col 6-12) */}
        <div className="lg:col-span-7 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
          
          {/* Header & Yin-Yang Icon */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {isVi ? "II. TRỤ CỘT NĂNG LỰC" : "II. CORE COMPETENCY PILLARS"}
                </h3>
              </div>
              <h4 className="text-sm font-black text-purple-900 dark:text-purple-300">
                {isVi ? "Ma Trận Năng Lực Lãnh Đạo" : "Leadership Competency Matrix"}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isVi ? "Đánh giá chi tiết 5 trụ cột năng lực & Tiềm năng Triển Vọng" : "Detailed assessment of 5 competency pillars & growth potential"}
              </p>
            </div>

            {/* Yin-Yang Decorative Circle */}
            <div className="relative w-14 h-14 rounded-full bg-slate-900 p-1 shadow-md border-2 border-slate-700 shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 animate-spin-slow" viewBox="0 0 100 100" fill="none">
                <path d="M50 0 A50 50 0 0 1 50 100 A25 25 0 0 1 50 50 A25 25 0 0 0 50 0 Z" fill="#ffffff" />
                <path d="M50 100 A50 50 0 0 1 50 0 A25 25 0 0 1 50 50 A25 25 0 0 0 50 100 Z" fill="#0f172a" />
                <circle cx="50" cy="25" r="7" fill="#0f172a" />
                <circle cx="50" cy="75" r="7" fill="#ffffff" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
                <Star className="w-3 h-3 fill-slate-900" />
              </div>
            </div>
          </div>

          {/* Center Content: Radar Chart + Badges Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* SVG Radar Chart (5 Pillars) */}
            <div className="sm:col-span-7 flex flex-col items-center justify-center relative">
              <svg viewBox="0 0 300 280" className="w-full max-w-[260px] h-auto drop-shadow-sm">
                
                {/* Background Grid Circles / Pentagons */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((rRatio, idx) => {
                  const pts = calculatePentagramPoints(150, 140, 95 * rRatio);
                  return (
                    <polygon
                      key={idx}
                      points={pts}
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth={idx === 4 ? "1.5" : "1"}
                      strokeDasharray={idx < 4 ? "3,3" : "none"}
                    />
                  );
                })}

                {/* Radar Axis Lines */}
                {calculatePentagramCoords(150, 140, 95).map((pt, idx) => (
                  <line
                    key={idx}
                    x1="150"
                    y1="140"
                    x2={pt.x}
                    y2={pt.y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="1"
                  />
                ))}

                {/* Filled Performance Polygon */}
                {/* Pillars: Hợp tác 89%, Đổi mới 88%, Lãnh đạo 86%, CRM 88%, Trải nghiệm 89% */}
                <polygon
                  points={calculatePentagramPointsCustom(150, 140, 95, [0.89, 0.88, 0.86, 0.88, 0.89])}
                  fill="url(#radarGradient)"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  className="drop-shadow-md"
                />

                {/* Gradient Def */}
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.45" />
                  </linearGradient>
                </defs>

                {/* Center Average Tag */}
                <circle cx="150" cy="140" r="32" fill="#ffffff" className="dark:fill-slate-900 stroke-purple-400 dark:stroke-purple-600" strokeWidth="2" />
                <text x="150" y="144" textAnchor="middle" className="text-base font-black fill-purple-900 dark:fill-purple-300">
                  87.8%
                </text>

                {/* Point Labels around Radar */}
                {/* 1. Top: Hợp Tác 89% */}
                <text x="150" y="24" textAnchor="middle" className="text-[11px] font-extrabold fill-slate-800 dark:fill-slate-200">
                  Hợp Tác (89%)
                </text>
                {/* 2. Top Right: Đổi Mới 88% */}
                <text x="245" y="105" textAnchor="start" className="text-[11px] font-extrabold fill-blue-600 dark:fill-blue-400">
                  Đổi Mới (88%)
                </text>
                {/* 3. Bottom Right: Lãnh Đạo 86% */}
                <text x="210" y="248" textAnchor="start" className="text-[11px] font-extrabold fill-amber-600 dark:fill-amber-400">
                  Lãnh Đạo (86%)
                </text>
                {/* 4. Bottom Left: CRM & Dữ liệu 88% */}
                <text x="90" y="248" textAnchor="end" className="text-[11px] font-extrabold fill-emerald-600 dark:fill-emerald-400">
                  CRM & Dữ liệu (88%)
                </text>
                {/* 5. Top Left: Trải Nghiệm 89% */}
                <text x="55" y="105" textAnchor="end" className="text-[11px] font-extrabold fill-rose-600 dark:fill-rose-400">
                  Trải Nghiệm (89%)
                </text>
              </svg>
            </div>

            {/* Score Pill Badges (Right Column) */}
            <div className="sm:col-span-5 space-y-2 flex flex-col justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-300 text-xs font-bold flex items-center justify-between">
                  <span>Hợp tác</span>
                  <span className="font-extrabold text-orange-600">89%</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-bold flex items-center justify-between">
                  <span>Trải nghiệm</span>
                  <span className="font-extrabold text-purple-600">89%</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs font-bold flex items-center justify-between">
                  <span>CRM & Dữ liệu</span>
                  <span className="font-extrabold text-blue-600">88%</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-300 text-xs font-bold flex items-center justify-between">
                  <span>Lãnh đạo</span>
                  <span className="font-extrabold text-rose-600">86%</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold flex items-center justify-between col-span-2 sm:col-span-1">
                  <span>Đổi mới</span>
                  <span className="font-extrabold text-emerald-600">88%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Note Bar */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
            <div className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Điểm TB 5 Trụ Cột Năng Lực: <strong>87.8%</strong></span>
              <span className="text-purple-700 dark:text-purple-400 font-bold ml-1">Xếp Loại: 5. HỢP TÁC - 89%</span>
            </div>
            <div className="italic text-[10px] text-slate-500">
              * Kết quả dựa trên thảo luận, đánh giá, hành vi & dữ liệu cá nhân
            </div>
          </div>

        </div>

      </div>

      {/* ================= SECTION III: CHÂN DUNG LÃNH ĐẠO & THIẾT LẬP VẬN HÀNH ================= */}
      <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {isVi ? "III. CHÂN DUNG LÃNH ĐẠO & THIẾT LẬP VẬN HÀNH" : "III. LEADERSHIP PORTRAIT & OPERATIONAL SETUP"}
            </h3>
          </div>

          <span className="px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black rounded-full border border-rose-200 dark:border-rose-800">
            {isVi ? "Tích hợp" : "Integrated"}
          </span>
        </div>

        {/* 4 Cards Grid + Quote Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          
          {/* 4 Cards in 2x2 Grid (Col 1-8) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* 1. Hệ Thống & Quy Trình */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">
                    {isVi ? "Hệ Thống & Quy Trình" : "System & Processes"}
                  </h4>
                </div>
                <h5 className="text-sm font-black text-slate-900 dark:text-white">
                  {isVi ? "Chuẩn hóa Thao Tác - Tối thiểu lường" : "Standardized Ops - Minimized Errors"}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isVi ? "Tối ưu hóa hệ thống, loại bỏ sự phụ thuộc cá nhân, tăng hiệu suất và giảm sai sót." : "System optimization, removing single points of failure, boosting efficiency."}
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{isVi ? "Quy trình chuẩn hóa" : "Standardized SOPs"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{isVi ? "Tự động hóa tác vụ" : "Automated Workflows"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{isVi ? "Đo lường hiệu quả" : "Performance Tracking"}</span>
                </div>
              </div>
            </div>

            {/* 2. Tái Cấu Trúc & Năng Lực */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">
                    {isVi ? "Tái Cấu Trúc & Năng Lực" : "Restructuring & Talent"}
                  </h4>
                </div>
                <h5 className="text-sm font-black text-slate-900 dark:text-white">
                  {isVi ? "Đào tạo đội ngũ & phân quyền" : "Team Coaching & Empowerment"}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isVi ? "Sức mạnh của tổ chức đến từ năng lực cá nhân và sự gắn kết đội ngũ." : "Organizational strength comes from individual mastery and team unity."}
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{isVi ? "Đào tạo & phát triển" : "Coaching & Development"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{isVi ? "Phân quyền rõ ràng" : "Clear Delegation"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{isVi ? "Gắn kết đội ngũ" : "Team Retention & Unity"}</span>
                </div>
              </div>
            </div>

            {/* 3. Thực Chiến & KPI */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">
                    {isVi ? "Thực Chiến & KPI" : "Execution & KPI"}
                  </h4>
                </div>
                <h5 className="text-sm font-black text-slate-900 dark:text-white">
                  {isVi ? "Làm Thật & Cường Thực" : "Pragmatic Action & Tangible Impact"}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isVi ? "KPI rõ ràng, bám sát thực chiến giúp đo lường hiệu quả và tạo động lực." : "Clear KPIs grounded in battlefield realities drive clarity and motivation."}
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isVi ? "Thiết lập KPI SMART" : "SMART KPI Alignment"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isVi ? "Review & cải tiến" : "Continuous Iteration"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{isVi ? "Thưởng phạt minh bạch" : "Transparent Governance"}</span>
                </div>
              </div>
            </div>

            {/* 4. Tư Duy Chiến Lược */}
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Flag className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase">
                    {isVi ? "Tư Duy Chiến Lược" : "Strategic Mindset"}
                  </h4>
                </div>
                <h5 className="text-sm font-black text-slate-900 dark:text-white">
                  {isVi ? "Tạo tầm nhìn & định hướng dài hạn" : "Visionary Alignment & Long-term Scale"}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isVi ? "Lãnh đạo cần tầm nhìn xa, xác lập chiến lược đúng và dẫn dắt bền vững." : "Leadership requires long-term vision, sound strategy, and sustainable execution."}
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{isVi ? "Phân tích thị trường" : "Market Analysis"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{isVi ? "Xác lập chiến lược" : "Strategic Roadmap"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{isVi ? "Kiểm soát rủi ro" : "Risk Management"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quote Block Column (Col 9-12) */}
          <div className="md:col-span-4 bg-gradient-to-br from-orange-50/80 via-amber-50/50 to-orange-100/40 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-900 rounded-2xl border border-orange-200/80 dark:border-orange-800/60 p-5 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-black text-orange-500 leading-none">“</span>
                <span className="text-xs font-black text-orange-800 dark:text-orange-300 uppercase tracking-wider">
                  {isVi ? "PHƯƠNG CHÂM HÀNH" : "ACTION CREED"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "{isVi
                  ? "Tư duy chiến lược thấu hiểu bản thân, hiểu đội ngũ, dẫn dắt bằng dữ liệu."
                  : "Strategic thinking understanding self, understanding the team, leading with data."}"
              </p>
            </div>

            <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-orange-300/60 dark:border-orange-800/60 shadow-xs space-y-1">
              <div className="text-xs sm:text-sm font-black text-orange-900 dark:text-orange-200 leading-snug">
                {isVi ? "Lấy chân lý làm gốc, Lấy hành động làm đường, Lấy kết quả làm thước đo." : "Rooted in Truth, Guided by Action, Measured by Results."}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= SECTION IV: ĐIỂM MẠNH, ĐIỂM CẦN LƯU Ý & VAI TRÒ PHÙ HỢP ================= */}
      <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {isVi ? "IV. ĐIỂM MẠNH, ĐIỂM CẦN LƯU Ý & VAI TRÒ PHÙ HỢP" : "IV. STRENGTHS, IMPROVEMENTS & MATCHED ROLES"}
            </h3>
          </div>

          <span className="px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black rounded-full border border-rose-200 dark:border-rose-800">
            {isVi ? "Dựa Trên 5 Trụ Cột" : "Based on 5 Pillars"}
          </span>
        </div>

        {/* 4 Column Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. 87% ĐIỂM MẠNH CỐT LÕI */}
          <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-amber-200/60 dark:border-amber-800/60 pb-2">
                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase">
                  <span className="text-amber-600 font-extrabold mr-1">87%</span>
                  {isVi ? "ĐIỂM MẠNH CỐT LÕI" : "CORE STRENGTHS"}
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isVi ? "Tư duy hệ thống sắc bén, logic và kỷ luật cao" : "Sharp systemic thinking, strong logic & discipline"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isVi ? "Khả năng truyền cảm hứng & dẫn dắt đội ngũ tốt" : "Great team inspiration & leadership mastery"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isVi ? "Kiên định mục tiêu, bền bỉ đến cùng" : "Goal-driven perseverance through challenges"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isVi ? "Giỏi công nghệ & phân tích dữ liệu nâng cao" : "Advanced tech literacy & data analytics"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isVi ? "Kỹ năng giao tiếp & thuyết phục hiệu quả" : "Effective executive communication & influence"}</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 text-[10px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1 border-t border-amber-200/60 dark:border-amber-800/60">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{isVi ? "Thế mạnh cạnh tranh vượt trội" : "Outstanding competitive advantage"}</span>
            </div>
          </div>

          {/* 2. 78% ĐIỂM CẦN LƯU Ý */}
          <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/50 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-rose-200/60 dark:border-rose-800/60 pb-2">
                <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  <Settings className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-black text-rose-900 dark:text-rose-200 uppercase">
                  <span className="text-rose-600 font-extrabold mr-1">78%</span>
                  {isVi ? "ĐIỂM CẦN LƯU Ý" : "AREAS OF ATTENTION"}
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isVi ? "Khuynh hướng cầu toàn, áp lực cao & ngại nhờ vả" : "Perfectionist tendency under high pressure"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isVi ? "Đôi khi cứng nhắc trong tư duy, khó thích ứng nhanh" : "Occasional rigidity in rapid pivot scenarios"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isVi ? "Dễ ôm đồm & quá tải công việc" : "Risk of over-commitment & workload density"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isVi ? "Cần cân bằng giữa công việc & đời sống" : "Needs deliberate work-life harmony management"}</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 text-[10px] font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1 border-t border-rose-200/60 dark:border-rose-800/60">
              <Info className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{isVi ? "Cân bằng & linh hoạt để tối ưu hiệu suất" : "Balance & agility to optimize output"}</span>
            </div>
          </div>

          {/* 3. 89% VAI TRÒ PHÙ HỢP */}
          <div className="p-4 rounded-2xl bg-sky-50/40 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-800/50 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-sky-200/60 dark:border-sky-800/60 pb-2">
                <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-black text-sky-900 dark:text-sky-200 uppercase">
                  <span className="text-sky-600 font-extrabold mr-1">89%</span>
                  {isVi ? "VAI TRÒ PHÙ HỢP" : "OPTIMAL ROLES"}
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>{isVi ? "Giám đốc Chiến lược (CSO)" : "Chief Strategy Officer (CSO)"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>{isVi ? "Giám đốc Vận hành (COO)" : "Chief Operating Officer (COO)"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>{isVi ? "Trưởng phòng Phát triển Kinh doanh" : "Head of Business Development"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>{isVi ? "Quản lý Dự án quy mô lớn" : "Large-scale Enterprise Program Director"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>Management Consultant (Chiến lược)</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 text-[10px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1 border-t border-sky-200/60 dark:border-sky-800/60">
              <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{isVi ? "Phù hợp với vai trò định hướng chiến lược" : "Ideal for strategic direction & ops leadership"}</span>
            </div>
          </div>

          {/* 4. 92% GIÁ TRỊ MANG LẠI */}
          <div className="p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/50 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-blue-200/60 dark:border-blue-800/60 pb-2">
                <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-black text-blue-900 dark:text-blue-200 uppercase">
                  <span className="text-blue-600 font-extrabold mr-1">92%</span>
                  {isVi ? "GIÁ TRỊ MANG LẠI" : "VALUE DELIVERED"}
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{isVi ? "Tạo dựng tăng trưởng bền vững & lợi thế dài hạn" : "Sustainable growth & long-term advantage"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{isVi ? "Tối ưu hiệu suất tổ chức và lợi nhuận" : "Optimized organizational ROI & productivity"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{isVi ? "Thúc đẩy đổi mới sáng tạo & chuyển đổi số" : "Driving innovation & digital transformation"}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{isVi ? "Xây dựng văn hóa mạnh & đội ngũ gắn kết" : "Strong team culture & talent alignment"}</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 text-[10px] font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1 border-t border-blue-200/60 dark:border-blue-800/60">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{isVi ? "Tạo tác động lớn & lâu dài cho tổ chức" : "Creates lasting high impact for the enterprise"}</span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= SECTION V: ĐỘ TƯƠNG HỢP NHÂN SỰ & CỘNG SỰ (12 CON GIÁP) ================= */}
      <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {isVi ? "V. ĐỘ TƯƠNG HỢP NHÂN SỰ & CỘNG SỰ (12 CON GIÁP)" : "V. TEAM & PARTNER ASTROLOGY SYNERGY (12 ZODIACS)"}
            </h3>
          </div>

          <span className="px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black rounded-full border border-rose-200 dark:border-rose-800">
            {isVi ? "Phân Tích & Tư Vấn" : "Analysis & Advisory"}
          </span>
        </div>

        {/* Layout: Left Input Box + 3 Category Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Left Input Box (Col 1-3) */}
          <div className="lg:col-span-3 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
                <Users className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isVi ? "Tổng quan tương hợp" : "Compatibility Lookup"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isVi ? "với nhân sự & cộng sự" : "with team members & partners"}
                </p>
              </div>

              {/* Interactive Input */}
              <div className="space-y-2 pt-1">
                <input
                  type="number"
                  placeholder={isVi ? "Nhập ngày sinh (VD: 1992)" : "Enter birth year (e.g. 1992)"}
                  value={birthInput}
                  onChange={(e) => setBirthInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  onClick={handleSearchCompatibility}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{isVi ? "XEM KẾT QUẢ" : "CHECK RESULT"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Search Result Feedback */}
              {searchResult && (
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] font-bold text-amber-900 dark:text-amber-200 leading-relaxed">
                  {searchResult}
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-400 text-center italic">
              ✦ {isVi ? "Đánh giá dựa trên Tam Hợp & Lục Hợp" : "Evaluated on Triad & Hexagon Harmony"}
            </div>
          </div>

          {/* 3 Group Columns (Col 4-12) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            {/* 1. Nhóm Hợp Nhất (Green Theme) */}
            <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="text-center border-b border-emerald-200/60 dark:border-emerald-800/60 pb-2">
                  <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase">
                    {isVi ? "Nhóm Hợp Nhất" : "Optimal Alignment"}
                  </h4>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                    {isVi ? "Hợp tác hiệu quả quá" : "High Synergy & Results"}
                  </p>
                </div>

                {/* Badges */}
                <div className="space-y-1.5">
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐵 Thân (90% - 95%)</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">BEST</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐉 Thìn (85% - 90%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Có tầm nhìn, giữ vững" : "Visionary stability"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐓 Dậu (88% - 93%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Bổ trợ hoàn hảo" : "Perfect complement"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐂 Sửu (85% - 90%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Ổn định & bền vững" : "Stable & durable"}</span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-1 text-xs text-emerald-900 dark:text-emerald-300 font-medium pt-1">
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Dễ phối hợp, cùng chí hướng" : "Easy synergy, shared vision"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Bổ sung năng lực tốt" : "Strong skill complement"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Hợp tác lâu dài" : "Long-term partnership"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Nên ưu tiên kết hợp để tối đa hiệu suất & kết quả" : "Prioritize for max efficiency"}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Nhóm Hỗ Trợ (Blue Theme) */}
            <div className="p-4 rounded-2xl bg-sky-50/40 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-800/50 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="text-center border-b border-sky-200/60 dark:border-sky-800/60 pb-2">
                  <h4 className="text-xs font-black text-sky-900 dark:text-sky-300 uppercase">
                    {isVi ? "Nhóm Hỗ Trợ" : "Supportive Group"}
                  </h4>
                  <p className="text-[11px] text-sky-700 dark:text-sky-400 font-bold">
                    {isVi ? "Hợp tác khá tốt" : "Good Collaboration"}
                  </p>
                </div>

                {/* Badges */}
                <div className="space-y-1.5">
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-sky-200 dark:border-sky-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐍 Tỵ (75% - 85%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Hợp tác khá thi" : "Workable partner"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-sky-200 dark:border-sky-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐉 Thìn (72% - 82%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Cần rõ vai trò" : "Clear scope required"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-sky-200 dark:border-sky-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐐 Mùi (70% - 80%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Hợp tác trung bình" : "Average synergy"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-sky-200 dark:border-sky-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐷 Hợi (1983, 1995)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Chủ khô, cần người dẫn" : "Needs explicit direction"}</span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-1 text-xs text-sky-900 dark:text-sky-300 font-medium pt-1">
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Cần giao việc theo năng lực & kỳ vọng" : "Assign tasks by capacity"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Quản trị tốt để khai thác tiềm năng" : "Good management unlocks potential"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span>{isVi ? "Cần minh bạch" : "Requires transparency"}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Cần Thận Trọng (Orange Theme) */}
            <div className="p-4 rounded-2xl bg-orange-50/40 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-800/50 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="text-center border-b border-orange-200/60 dark:border-orange-800/60 pb-2">
                  <h4 className="text-xs font-black text-orange-900 dark:text-orange-300 uppercase">
                    {isVi ? "Cần Thận Trọng" : "Caution & Optimization"}
                  </h4>
                  <p className="text-[11px] text-orange-700 dark:text-orange-400 font-bold">
                    {isVi ? "Khác biệt lớn, cần tối ưu" : "Mindset Friction, Needs Structure"}
                  </p>
                </div>

                {/* Badges */}
                <div className="space-y-1.5">
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐷 Hợi (50% - 60%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Khác biệt quan điểm" : "Different views"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐴 Ngọ (48% - 58%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Dễ xung đột" : "Friction prone"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐱 Mão (45% - 55%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Khó đồng hành" : "Challenging alignment"}</span>
                  </div>
                  <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-orange-200 dark:border-orange-800 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-white">🐍 Tỵ (40% - 50%)</span>
                    <span className="text-[10px] text-slate-500 font-medium">{isVi ? "Cần thời gian & tái cấu trúc" : "Requires restructuring"}</span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-1 text-xs text-orange-900 dark:text-orange-300 font-medium pt-1">
                  <li className="flex items-start gap-1">
                    <span className="text-orange-500 font-bold">△</span>
                    <span>{isVi ? "Dễ phát sinh mâu thuẫn" : "Potential communication gaps"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-orange-500 font-bold">△</span>
                    <span>{isVi ? "Khác biệt tư duy lớn" : "Large mindset divergence"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-orange-500 font-bold">△</span>
                    <span>{isVi ? "Cần cơ chế rõ ràng" : "Strict governance required"}</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-orange-500 font-bold">△</span>
                    <span>{isVi ? "Cần cân nhắc kỹ trước khi giao việc trọng yếu" : "Deliberate review before key delegation"}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// Helper SVG Crown Icon
function CrownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}

// Pentagram Helpers
function calculatePentagramPoints(cx: number, cy: number, r: number): string {
  const coords = calculatePentagramCoords(cx, cy, r);
  return coords.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

function calculatePentagramCoords(cx: number, cy: number, r: number) {
  const points = [];
  const startAngle = -Math.PI / 2; // top center
  for (let i = 0; i < 5; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / 5;
    points.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    });
  }
  return points;
}

function calculatePentagramPointsCustom(cx: number, cy: number, maxR: number, ratios: number[]): string {
  const startAngle = -Math.PI / 2;
  const points = [];
  for (let i = 0; i < 5; i++) {
    const r = maxR * (ratios[i] || 1);
    const angle = startAngle + (i * 2 * Math.PI) / 5;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return points.join(" ");
}
