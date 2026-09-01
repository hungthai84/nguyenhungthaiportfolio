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
  const [selectedZodiacId, setSelectedZodiacId] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<{
    zName: string;
    animal: string;
    icon: string;
    score: string;
    tier: "best" | "support" | "caution";
    relationship: string;
    advice: string;
    years: string;
  } | null>(null);

  const zodiacList = [
    { id: "ty", vi: "Tý", en: "Rat", animalVi: "Chuột", animalEn: "Rat", icon: "🐭", score: "45% - 55%", tier: "caution" as const, relationshipVi: "Đồng Chi / Tự Hình", relationshipEn: "Same Branch", years: "1984, 1996, 2008", adviceVi: "Cần phân định ranh giới & thẩm quyền rõ ràng.", adviceEn: "Need clear authority boundaries." },
    { id: "suu", vi: "Sửu", en: "Ox", animalVi: "Trâu", animalEn: "Ox", icon: "🐂", score: "85% - 90%", tier: "best" as const, relationshipVi: "Lục Hợp (Tý - Sửu)", relationshipEn: "Six Harmonies", years: "1985, 1997, 2009", adviceVi: "Hợp tác cực kỳ ổn định, kiên định và tin cậy lâu dài.", adviceEn: "Highly stable, loyal and trustworthy partnership." },
    { id: "dan", vi: "Dần", en: "Tiger", animalVi: "Hổ", animalEn: "Tiger", icon: "🐯", score: "70% - 80%", tier: "support" as const, relationshipVi: "Tương Sinh Bình Hòa", relationshipEn: "Harmonious", years: "1986, 1998, 2010", adviceVi: "Quyết đoán, tiên phong; cần điều phối nhịp nhàng.", adviceEn: "Decisive and pioneering; needs smooth alignment." },
    { id: "mao", vi: "Mão", en: "Cat", animalVi: "Mèo", animalEn: "Cat/Rabbit", icon: "🐱", score: "45% - 55%", tier: "caution" as const, relationshipVi: "Tương Hình (Tý - Mão)", relationshipEn: "Mutual Penalty", years: "1987, 1999, 2011", adviceVi: "Dễ bất đồng ngầm; cần giao tiếp minh bạch và chuẩn hóa SOP.", adviceEn: "Prone to subtle friction; requires open communication and SOPs." },
    { id: "thin", vi: "Thìn", en: "Thìn", animalVi: "Rồng", animalEn: "Dragon", icon: "🐲", score: "88% - 92%", tier: "best" as const, relationshipVi: "Tam Hợp (Thân - Tý - Thìn)", relationshipEn: "Three Harmonies Triad", years: "1988, 2000, 2012", adviceVi: "Tầm nhìn lớn, bệ đỡ chiến lược vững chắc và bứt phá quy mô.", adviceEn: "Great vision, solid strategic foundation and scale breakthroughs." },
    { id: "ty_snake", vi: "Tỵ", en: "Snake", animalVi: "Rắn", animalEn: "Snake", icon: "🐍", score: "75% - 85%", tier: "support" as const, relationshipVi: "Tương Trợ Thực Thi", relationshipEn: "Execution Support", years: "1989, 2001, 2013", adviceVi: "Sắc bén, tư duy mưu lược; cần rõ ràng chỉ số KPI.", adviceEn: "Sharp strategic thinker; needs clear KPI benchmarks." },
    { id: "ngo", vi: "Ngọ", en: "Horse", animalVi: "Ngựa", animalEn: "Horse", icon: "🐴", score: "45% - 55%", tier: "caution" as const, relationshipVi: "Lục Xung (Tý - Ngọ)", relationshipEn: "Six Conflicts", years: "1990, 2002, 2014", adviceVi: "Tính cách đối lập; cần cơ chế phân quyền độc lập và tôn trọng sự khác biệt.", adviceEn: "Opposing traits; needs autonomous delegation and mutual respect." },
    { id: "mui", vi: "Mùi", en: "Goat", animalVi: "Dê", animalEn: "Goat", icon: "🐐", score: "70% - 80%", tier: "support" as const, relationshipVi: "Bình Hòa Trợ Lực", relationshipEn: "Supportive", years: "1991, 2003, 2015", adviceVi: "Hòa nhã, sáng tạo; hợp tác tốt trong môi trường linh hoạt.", adviceEn: "Gentle and creative; collaborates well in agile settings." },
    { id: "than", vi: "Thân", en: "Monkey", animalVi: "Khỉ", animalEn: "Monkey", icon: "🐵", score: "92% - 96%", tier: "best" as const, relationshipVi: "Tam Hợp (Thân - Tý - Thìn)", relationshipEn: "Three Harmonies Triad", years: "1992, 2004, 2016", adviceVi: "Đỉnh cao hòa hợp! Bổ trợ năng lực mưu lược, vận hành ăn ý tuyệt đối.", adviceEn: "Peak harmony! Perfect complement in strategy and seamless execution." },
    { id: "dau", vi: "Dậu", en: "Rooster", animalVi: "Gà", animalEn: "Rooster", icon: "🐔", score: "88% - 93%", tier: "best" as const, relationshipVi: "Tương Sinh Kim - Thủy", relationshipEn: "Generating Harmony", years: "1993, 2005, 2017", adviceVi: "Kỷ luật, chuẩn mực cao; bổ sung hoàn hảo cho quản trị chất lượng.", adviceEn: "High discipline and benchmarks; ideal for quality governance." },
    { id: "tuat", vi: "Tuất", en: "Dog", animalVi: "Chó", animalEn: "Dog", icon: "🐶", score: "75% - 82%", tier: "support" as const, relationshipVi: "Trung Thành Trợ Lực", relationshipEn: "Loyal Support", years: "1994, 2006, 2018", adviceVi: "Tận tụy, trách nhiệm cao; là trụ cột đáng tin cậy trong đội ngũ.", adviceEn: "Dedicated and responsible; a reliable pillar in the team." },
    { id: "hoi", vi: "Hợi", en: "Pig", animalVi: "Lợn", animalEn: "Pig", icon: "🐷", score: "50% - 60%", tier: "caution" as const, relationshipVi: "Tương Trợ Nhưng Cần Định Hướng", relationshipEn: "Needs Direction", years: "1983, 1995, 2007", adviceVi: "Hòa đồng nhưng cần người dẫn dắt mục tiêu cụ thể để tránh phân tán.", adviceEn: "Sociable but needs explicit guidance to avoid distraction." }
  ];

  const handleSelectZodiac = (item: typeof zodiacList[0]) => {
    setSelectedZodiacId(item.id);
    setBirthInput(item.years.split(",")[0].trim());
    setSearchResult({
      zName: isVi ? item.vi : item.en,
      animal: isVi ? item.animalVi : item.animalEn,
      icon: item.icon,
      score: item.score,
      tier: item.tier,
      relationship: isVi ? item.relationshipVi : item.relationshipEn,
      advice: isVi ? item.adviceVi : item.adviceEn,
      years: item.years
    });
  };

  const handleSearchCompatibility = () => {
    if (!birthInput.trim()) {
      return;
    }

    const year = parseInt(birthInput.trim(), 10);
    if (isNaN(year) || year < 1920 || year > 2040) {
      return;
    }

    const zodiacOrder = ["than", "dau", "tuat", "hoi", "ty", "suu", "dan", "mao", "thin", "ty_snake", "ngo", "mui"];
    const index = (year % 12);
    const targetId = zodiacOrder[index];
    const item = zodiacList.find(z => z.id === targetId);
    if (item) {
      handleSelectZodiac(item);
    }
  };

  return (
    <div className="w-full space-y-6 text-slate-800 dark:text-slate-100 font-sans">
      


      {/* ================= SECTION II: TRỤ CỘT NĂNG LỰC (HÀNG RIÊNG w-full) ================= */}
      <div className="w-full glass-surface backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-5 relative overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {isVi ? "II. TRỤ CỘT NĂNG LỰC" : "II. CORE COMPETENCY PILLARS"}
                </h3>
                <h4 className="text-xs sm:text-sm font-black text-purple-900 dark:text-purple-300">
                  {isVi ? "Ma Trận Năng Lực Lãnh Đạo" : "Leadership Competency Matrix"}
                </h4>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pl-0 sm:pl-15">
              {isVi ? "Đánh giá chi tiết 5 trụ cột năng lực & Tiềm năng Triển Vọng" : "Detailed assessment of 5 competency pillars & growth potential"}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-black rounded-full border border-purple-200 dark:border-purple-800 flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isVi ? "Điểm TB: 87.8% • Hạng Xuất Sắc" : "Avg Score: 87.8% • Excellent"}</span>
            </span>
          </div>
        </div>

        {/* Center Content: Radar Chart + Detailed 5 Pillar Cards in a Wide Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Center: SVG Radar Chart (5 Pillars) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-2">
            <svg viewBox="0 0 300 280" className="w-full max-w-[280px] h-auto drop-shadow-sm">
              
              {/* Background Grid Circles / Pentagons */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((rRatio, idx) => {
                const pts = calculatePentagramPoints(150, 140, 95 * rRatio);
                return (
                  <polygon
                    key={idx}
                    points={pts}
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-700 dark:text-slate-200 dark:text-slate-800"
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
                  className="text-slate-700 dark:text-slate-200 dark:text-slate-800"
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

          {/* Right: 5 Pillar Cards with Visual Progress & Clear Description */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* 1. Hợp tác */}
              <div className="p-3 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/60 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="text-xs font-black text-orange-950 dark:text-orange-200">
                      {isVi ? "1. Hợp tác liên kết" : "1. Collaboration"}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300">
                    89%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {isVi ? "Gắn kết đội ngũ, đàm phán & hợp tác liên phòng ban nhịp nhàng." : "Team bonding, stakeholder negotiation & cross-functional harmony."}
                </p>
                <div className="w-full bg-orange-200/50 dark:bg-orange-950/80 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>

              {/* 2. Trải nghiệm */}
              <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="text-xs font-black text-purple-950 dark:text-purple-200">
                      {isVi ? "2. Trải nghiệm & Dịch vụ" : "2. Experience & CX"}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300">
                    89%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {isVi ? "Tư duy lấy khách hàng làm trung tâm, tối ưu hóa điểm chạm." : "Customer-centric mindset, continuous touchpoint optimization."}
                </p>
                <div className="w-full bg-purple-200/50 dark:bg-purple-950/80 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>

              {/* 3. CRM & Dữ liệu */}
              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-black text-blue-950 dark:text-blue-200">
                      {isVi ? "3. CRM & Quản trị Dữ liệu" : "3. CRM & Data Analytics"}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300">
                    88%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {isVi ? "Quản trị quan hệ đối tác, phân tích dữ liệu chuyên sâu & số hóa." : "Partner lifecycle management, deep analytical data-driven systems."}
                </p>
                <div className="w-full bg-blue-200/50 dark:bg-blue-950/80 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              {/* 4. Đổi mới */}
              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-black text-emerald-950 dark:text-emerald-200">
                      {isVi ? "4. Đổi mới & Chuyển đổi" : "4. Innovation & Pivot"}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    88%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {isVi ? "Tiên phong giải pháp mới, linh hoạt thích ứng công nghệ AI." : "Pioneering new solutions, agile adaptation to modern tech & AI."}
                </p>
                <div className="w-full bg-emerald-200/50 dark:bg-emerald-950/80 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              {/* 5. Lãnh đạo (Full Width on SM) */}
              <div className="sm:col-span-2 p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/60 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="text-xs font-black text-rose-950 dark:text-rose-200">
                      {isVi ? "5. Lãnh đạo Chiến lược & Quản trị Mục tiêu" : "5. Strategic Leadership & Governance"}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300">
                    86%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {isVi ? "Xác lập tầm nhìn, truyền lửa nhiệt huyết và kiên định triển khai mục tiêu dài hạn." : "Establishing vision, inspiring high morale, and steadfast execution of long-term milestones."}
                </p>
                <div className="w-full bg-rose-200/50 dark:bg-rose-950/80 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: "86%" }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Note Bar */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
          <div className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>Điểm TB 5 Trụ Cột Năng Lực: <strong>87.8%</strong></span>
            <span className="text-purple-700 dark:text-purple-400 font-bold ml-1.5">Xếp Loại: 5. HỢP TÁC - 89%</span>
          </div>
          <div className="italic text-[10px] text-slate-500">
            * Kết quả dựa trên thảo luận, đánh giá, hành vi & dữ liệu cá nhân
          </div>
        </div>

      </div>

      {/* ================= SECTION III: CHÂN DUNG LÃNH ĐẠO & THIẾT LẬP VẬN HÀNH (HÀNG RIÊNG w-full) ================= */}
      <div className="w-full flex flex-col justify-between glass-surface backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {isVi ? "III. CHÂN DUNG LÃNH ĐẠO & THIẾT LẬP VẬN HÀNH" : "III. LEADERSHIP PORTRAIT & OPERATIONAL SETUP"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isVi ? "4 Trụ cột thiết lập mô hình vận hành và phong cách quản trị thực chiến" : "4 operational setup pillars & pragmatic management framework"}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black rounded-full border border-rose-200 dark:border-rose-800">
            {isVi ? "Tích hợp" : "Integrated"}
          </span>
        </div>

        {/* 4 Cards in Responsive 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* 1. Hệ Thống & Quy Trình */}
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
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
                {isVi ? "Chuẩn hóa Thao Tác - Tối thiểu lỗi" : "Standardized Ops - Minimized Errors"}
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
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
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
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
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
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5 flex flex-col justify-between hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
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

      </div>
      {/* ================= SECTION IV: ĐIỂM MẠNH, ĐIỂM CẦN LƯU Ý & VAI TRÒ PHÙ HỢP ================= */}
      <div className="w-full glass-surface backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
        
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
          
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
      <div className="w-full glass-surface backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-5">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20 text-2xl">
              <span>🔮</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {isVi ? "V. ĐỘ TƯƠNG HỢP NHÂN SỰ & CỘNG SỰ (12 CON GIÁP)" : "V. TEAM & PARTNER ASTROLOGY SYNERGY (12 ZODIACS)"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isVi ? "Ma trận tương hợp 12 Con Giáp với mệnh Giáp Tý (1984) – Hải Trung Kim" : "12 Zodiac synergy matrix for 1984 Wood Rat (Hai Trung Kim)"}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black rounded-full border border-rose-200 dark:border-rose-800 w-fit">
            {isVi ? "Phân Tích & Tư Vấn" : "Analysis & Advisory"}
          </span>
        </div>

        {/* 12 ZODIAC INTERACTIVE SELECTOR RIBBON */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {isVi ? "CHỌN NHANH 12 CON GIÁP ĐỂ XEM CHI TIẾT:" : "QUICK SELECT 12 ZODIACS TO VIEW DETAILS:"}
            </span>
            <span className="text-[11px] text-slate-500 italic hidden sm:inline">
              {isVi ? "Nhấp vào con giáp để xem luận giải" : "Click a zodiac to view synergy profile"}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {zodiacList.map((item) => {
              const isSelected = selectedZodiacId === item.id;
              const isBest = item.tier === "best";
              const isSupport = item.tier === "support";

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectZodiac(item)}
                  className={`relative p-2 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "ring-2 ring-blue-500 shadow-md bg-blue-50/90 dark:bg-blue-950/80 border-blue-400 dark:border-blue-600 scale-105"
                      : isBest
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/50 border-emerald-200/80 dark:border-emerald-800/60 hover:scale-102"
                      : isSupport
                      ? "bg-sky-50/50 dark:bg-sky-950/20 hover:bg-sky-100/60 dark:hover:bg-sky-950/50 border-sky-200/80 dark:border-sky-800/60 hover:scale-102"
                      : "bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/70 border-slate-200/80 dark:border-slate-700/60 hover:scale-102"
                  }`}
                  title={`${item.vi} (${item.animalVi}) - ${item.score}`}
                >
                  <span className="text-2xl filter drop-shadow-xs transition-transform transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  <div className="mt-1 flex flex-col items-center">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight">
                      {isVi ? item.vi : item.en}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-none">
                      {isVi ? item.animalVi : item.animalEn}
                    </span>
                  </div>
                  <span className={`mt-1 text-[9px] font-black px-1.5 py-0.2 rounded-full leading-tight ${
                    isBest
                      ? "bg-emerald-600 text-white"
                      : isSupport
                      ? "bg-sky-600 text-white"
                      : "bg-amber-600 text-white"
                  }`}>
                    {item.tier === "best" ? (isVi ? "HỢP" : "BEST") : item.tier === "support" ? (isVi ? "TỐT" : "GOOD") : (isVi ? "THẬN TRỌNG" : "WARN")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: Left Input Box + 3 Category Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[10px] items-stretch pt-1">
          
          {/* Left Input Box (Col 1-3) */}
          <div className="lg:col-span-12 max-w-2xl mx-auto w-full bg-slate-50/90 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs text-2xl">
                  {searchResult ? searchResult.icon : "👥"}
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {searchResult ? `${searchResult.zName} (${searchResult.animal})` : (isVi ? "Tra cứu con giáp" : "Compatibility Lookup")}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isVi ? "Nhập năm sinh hoặc chọn icon ở trên" : "Enter birth year or select icon above"}
                </p>
              </div>

              {/* Interactive Input */}
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="number"
                    placeholder={isVi ? "Nhập năm sinh (VD: 1992)" : "Enter birth year (e.g. 1992)"}
                    value={birthInput}
                    onChange={(e) => setBirthInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchCompatibility()}
                    className="w-full pl-3 pr-8 py-2 rounded-xl glass-surface border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {birthInput && (
                    <button 
                      onClick={() => { setBirthInput(""); setSearchResult(null); setSelectedZodiacId(null); }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  onClick={handleSearchCompatibility}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isVi ? "TRA CỨU TƯƠNG HỢP" : "CHECK COMPATIBILITY"}</span>
                </button>
              </div>

              {/* Detailed Result Card */}
              {searchResult ? (
                <div className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                  searchResult.tier === "best"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                    : searchResult.tier === "support"
                    ? "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200"
                    : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                }`}>
                  <div className="flex items-center justify-between border-b border-current/20 pb-1.5">
                    <div className="flex items-center gap-1.5 font-black text-sm">
                      <span className="text-xl">{searchResult.icon}</span>
                      <span>{searchResult.zName} ({searchResult.animal})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full font-black text-[11px] glass-surface shadow-2xs">
                      {searchResult.score}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div>
                      <span className="font-bold">{isVi ? "Quan hệ: " : "Relation: "}</span>
                      <span>{searchResult.relationship}</span>
                    </div>
                    <div>
                      <span className="font-bold">{isVi ? "Năm sinh: " : "Years: "}</span>
                      <span className="opacity-90">{searchResult.years}</span>
                    </div>
                    <div className="pt-1 border-t border-current/15 leading-relaxed font-medium">
                      <span className="font-bold">{isVi ? "Tư vấn: " : "Advice: "}</span>
                      {searchResult.advice}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-100/70 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-center space-y-1">
                  <div className="text-xl">✨</div>
                  <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    {isVi ? "Chọn một con giáp ở trên để xem phân tích chi tiết" : "Click any zodiac icon above for in-depth synergy advice"}
                  </p>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center italic border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
              ✦ {isVi ? "Cơ sở: Tam Hợp, Lục Hợp & Ngũ Hành Nạp Âm" : "Basis: Triad, Hexagon Harmony & Five Elements"}
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
