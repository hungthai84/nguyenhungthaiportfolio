import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Users, 
  Trophy, 
  Cpu, 
  ShieldAlert, 
  TrendingUp, 
  Diamond, 
  Globe,
  Rocket,
  Heart,
  LineChart,
  Monitor,
  Bot,
  CircleDollarSign,
  Target,
  BarChart3,
  Layers,
  Sparkles
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useSound } from "../context/SoundContext";

interface SwotAnalysisProps {
  activeSection: string;
}

export function SwotAnalysis({ activeSection }: SwotAnalysisProps) {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const { playSound } = useSound();

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // 1. STRENGTHS DATA (Pixel-Exact from Kỹ năng.png)
  const strengths = {
    title: "STRENGTHS",
    subtitle: isVi ? "NĂNG LỰC CỐT LÕI" : "CORE COMPETENCIES",
    desc: isVi 
      ? "Những năng lực cốt lõi đã được rèn luyện và chứng minh qua thực tiễn quản lý & vận hành." 
      : "Core competencies forged and proven through hands-on operations & management.",
    skills: [
      { name: isVi ? "Kiến thức sâu về CRM" : "In-depth CRM Knowledge", level: 95 },
      { name: isVi ? "Phân tích dữ liệu khách hàng" : "Customer Data Analytics", level: 90 },
      { name: isVi ? "Xây dựng quy trình dịch vụ" : "Service Process Design", level: 90 },
      { name: isVi ? "Tư duy lấy khách hàng làm trung tâm" : "Customer-Centric Mindset", level: 90 },
      { name: isVi ? "Lãnh đạo & Phát triển đội ngũ" : "People Leadership & Coaching", level: 90 },
      { name: isVi ? "Giải quyết vấn đề" : "Problem Solving", level: 90 },
      { name: isVi ? "Trải nghiệm khách hàng (CX)" : "Customer Experience (CX)", level: 90 }
    ],
    tags: ["#CRM", "#CustomerData", "#CX", "#Leadership"]
  };

  // 2. OPPORTUNITIES DATA (Pixel-Exact from Kỹ năng.png)
  const opportunities = {
    title: "OPPORTUNITIES",
    subtitle: isVi ? "CƠ HỘI PHÁT TRIỂN" : "GROWTH OPPORTUNITIES",
    desc: isVi 
      ? "Xu hướng công nghệ & nhu cầu thị trường mở ra nhiều cơ hội để tạo đột phá và nâng tầm sự nghiệp." 
      : "Technology trends & market demand open up great opportunities for breakthrough and career advancement.",
    cards: [
      {
        title: isVi ? "Trí tuệ Nhân tạo & Tự động hóa" : "AI & Automation",
        desc: isVi 
          ? "Ứng dụng AI, Chatbot, RPA và Automation để tối ưu hóa vận hành & trải nghiệm." 
          : "Applying AI, Chatbots, RPA and Automation to optimize operations & experience.",
        icon: Bot
      },
      {
        title: isVi ? "Chiến lược & Chuyển đổi CX" : "CX Strategy & Transformation",
        desc: isVi 
          ? "Dẫn dắt chiến lược CX, nâng cao trải nghiệm khách hàng toàn diện." 
          : "Leading CX strategy, elevating comprehensive customer experience.",
        icon: Heart
      },
      {
        title: isVi ? "Quản trị CX dựa trên Dữ liệu" : "Data-driven CX Management",
        desc: isVi 
          ? "Khai thác dữ liệu, đo lường & cá nhân hóa trải nghiệm khách hàng." 
          : "Leveraging data, measuring & personalizing customer experience.",
        icon: LineChart
      },
      {
        title: isVi ? "Chuyển đổi số Doanh nghiệp" : "Digital Transformation",
        desc: isVi 
          ? "Thúc đẩy chuyển đổi số, CRM, Self-service và hệ sinh thái số." 
          : "Driving digital transformation, CRM, Self-service and digital ecosystems.",
        icon: Monitor
      }
    ],
    tags: ["#AI", "#CXStrategy", "#DataDriven", "#DigitalTransformation", "#Growth"]
  };

  // 3. WEAKNESSES DATA (Pixel-Exact from Kỹ năng.png)
  const weaknesses = {
    title: "WEAKNESSES",
    subtitle: isVi ? "ĐIỂM CẦN PHÁT TRIỂN" : "AREAS FOR DEVELOPMENT",
    desc: isVi 
      ? "Những năng lực cần tiếp tục nâng cao để đạt đến cấp độ chuyên gia và đáp ứng yêu cầu tương lai." 
      : "Competencies requiring continuous enhancement to achieve expert level and meet future demands.",
    skills: [
      { name: isVi ? "Tư duy chiến lược & Tầm nhìn dài hạn" : "Strategic Thinking & Long-term Vision", level: 80 },
      { name: isVi ? "Quản lý dự án" : "Project Management", level: 80 },
      { name: isVi ? "Thiết kế & Lập trình Web (Responsive)" : "Web Design & Development (Responsive)", level: 85 },
      { name: isVi ? "Tự động hóa" : "Automation", level: 85 },
      { name: isVi ? "Quản lý hiệu suất (KPIs, OKRs)" : "Performance Management (KPIs, OKRs)", level: 85 },
      { name: isVi ? "Giao tiếp" : "Communication", level: 85 },
      { name: isVi ? "Giải quyết khiếu nại" : "Complaint Resolution", level: 85 },
      { name: isVi ? "Xây dựng văn hóa dịch vụ nội bộ" : "Internal Service Culture Building", level: 85 },
      { name: isVi ? "Quản lý rủi ro dịch vụ" : "Service Risk Management", level: 85 },
      { name: isVi ? "Thích ứng với công nghệ" : "Technology Adaptation", level: 85 }
    ],
    tags: ["#AI", "#Automation", "#Direct", "#ProjectManagement", "#GrowthMindset"]
  };

  // 4. THREATS DATA (Pixel-Exact from Kỹ năng.png)
  const threats = {
    title: "THREATS",
    subtitle: isVi ? "THÁCH THỨC & RỦI RO" : "THREATS & RISKS",
    desc: isVi 
      ? "Những yếu tố bên ngoài có thể ảnh hưởng đến hiệu quả công việc và lộ trình phát triển." 
      : "External factors that may impact work performance and career progression.",
    cards: [
      {
        title: isVi ? "AI thay đổi ngành CSKH" : "AI transforming CS industry",
        desc: isVi 
          ? "AI & Automation thay thế nhiều nghiệp vụ, yêu cầu nâng cấp năng lực liên tục." 
          : "AI & Automation replacing routine tasks, demanding continuous skill upgrades.",
        icon: Bot
      },
      {
        title: isVi ? "Công nghệ thay đổi nhanh" : "Rapid tech changes",
        desc: isVi 
          ? "CRM, AI, Data, Automation liên tục đổi mới, đòi hỏi học hỏi & thích ứng nhanh." 
          : "CRM, AI, Data, Automation constantly evolving, requiring fast learning & adaptation.",
        icon: Cpu
      },
      {
        title: isVi ? "Cạnh tranh nhân sự" : "Talent competition",
        desc: isVi 
          ? "Yêu cầu phối hợp đa công nghệ: Business + FinTech + Leadership ngày càng cao." 
          : "Growing demand for multi-domain mastery: Business + FinTech + Leadership.",
        icon: Users
      },
      {
        title: isVi ? "Áp lực tối ưu chi phí" : "Cost optimization pressure",
        desc: isVi 
          ? "Doanh nghiệp yêu cầu hiệu quả cao hơn với chi phí thấp hơn." 
          : "Enterprises demanding higher efficiency with leaner operational costs.",
        icon: CircleDollarSign
      }
    ],
    tags: ["#AIImpact", "#TechnologyChange", "#Competition", "#CostOptimization"]
  };

  return (
    <div id="skills-container" className="w-full flex flex-col gap-8 sm:gap-10 pb-6">
      
      {/* SECTION HEADER BLOCK - Pixel exact matching Kỹ năng.png */}
      <div className="w-full flex flex-col items-center text-center gap-3 pt-2">
        
        {/* Title: PERSONAL SWOT with Multi-Color Gradient */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight flex items-center justify-center gap-3 font-sans">
          <span className="text-[#1e3a8a] dark:text-blue-300">PERSONAL</span>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            SWOT
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-[#1e3a8a] dark:text-indigo-300 uppercase">
          {isVi ? "NĂNG LỰC & ĐỊNH HƯỚNG NGHỀ NGHIỆP" : "COMPETENCIES & CAREER ORIENTATION"}
        </p>

        {/* 3 Bullet items matching image */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 mt-1 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isVi ? "Đánh giá năng lực hiện tại" : "Current competency assessment"}</span>
          </div>
          
          <span className="hidden sm:inline text-slate-300 dark:text-slate-600 font-bold">•</span>
          
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isVi ? "Xác định cơ hội phát triển" : "Identify development opportunities"}</span>
          </div>
          
          <span className="hidden sm:inline text-slate-300 dark:text-slate-600 font-bold">•</span>
          
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isVi ? "Chủ động thích ứng & bứt phá" : "Proactive adaptation & breakthrough"}</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE 4-QUADRANT SWOT MATRIX WITH CENTER S-W-O-T BADGE */}
      {(activeSection === "all" || activeSection === "swot") && (
        <div className="relative w-full">
          
          {/* Main 4-Quadrant Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10 items-stretch">

            {/* ============================================================ */}
            {/* QUADRANT 1: STRENGTHS (Top-Left)                            */}
            {/* ============================================================ */}
            <div 
              onClick={() => playSound("click")}
              className="relative flex flex-col justify-between rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-blue-200/80 dark:border-blue-800/60 p-6 sm:p-8 shadow-[0_12px_36px_rgba(37,99,235,0.08)] hover:shadow-[0_16px_44px_rgba(37,99,235,0.15)] transition-all duration-300 min-h-[490px] overflow-hidden group/scard cursor-pointer"
            >
              {/* Soft decorative background tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-transparent dark:from-blue-950/20 rounded-[2rem] pointer-events-none" />

              {/* Watermark Letter S in bottom-right corner */}
              <div className="absolute -bottom-4 -right-1 font-black text-[120px] sm:text-[150px] leading-none text-blue-500/15 dark:text-blue-400/15 select-none pointer-events-none transition-all duration-500 group-hover/scard:text-blue-500/25 group-hover/scard:scale-105 font-mono tracking-tighter">
                S
              </div>

              {/* Corner Badge S Emblem (Bottom-Right) */}
              <div className="absolute bottom-4 right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-300/40 dark:border-blue-700/40 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-sm sm:text-base shadow-sm group-hover/scard:bg-blue-600 group-hover/scard:text-white transition-all duration-300 pointer-events-none">
                S
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/60 dark:to-blue-800/40 border border-blue-300/50 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-sm shrink-0">
                    <Diamond className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                      {strengths.title}
                    </h3>
                    <h4 className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">
                      {strengths.subtitle}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {strengths.desc}
                </p>

                {/* Skill items list */}
                <div className="space-y-2">
                  {strengths.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      onMouseEnter={() => setHoveredSkill(`S-${idx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-blue-50/60 dark:hover:bg-blue-950/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-200 truncate">
                          {skill.name}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800/60 text-xs font-black text-blue-600 dark:text-blue-400 shrink-0 shadow-2xs">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Footer */}
              <div className="flex flex-wrap gap-2 mt-6 relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800 pr-12">
                {strengths.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-lg bg-blue-50/90 dark:bg-blue-950/50 text-[11px] font-bold text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ============================================================ */}
            {/* QUADRANT 2: OPPORTUNITIES (Top-Right)                       */}
            {/* ============================================================ */}
            <div 
              onClick={() => playSound("click")}
              className="relative flex flex-col justify-between rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-purple-200/80 dark:border-purple-800/60 p-6 sm:p-8 shadow-[0_12px_36px_rgba(147,51,234,0.08)] hover:shadow-[0_16px_44px_rgba(147,51,234,0.15)] transition-all duration-300 min-h-[490px] overflow-hidden group/ocard cursor-pointer"
            >
              {/* Soft decorative background tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-transparent to-transparent dark:from-purple-950/20 rounded-[2rem] pointer-events-none" />

              {/* Watermark Letter O in bottom-right corner */}
              <div className="absolute -bottom-4 -right-1 font-black text-[120px] sm:text-[150px] leading-none text-purple-500/15 dark:text-purple-400/15 select-none pointer-events-none transition-all duration-500 group-hover/ocard:text-purple-500/25 group-hover/ocard:scale-105 font-mono tracking-tighter">
                O
              </div>

              {/* Corner Badge O Emblem (Bottom-Right) */}
              <div className="absolute bottom-4 right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 dark:bg-purple-400/10 border border-purple-300/40 dark:border-purple-700/40 backdrop-blur-md flex items-center justify-center text-purple-600 dark:text-purple-400 font-black text-sm sm:text-base shadow-sm group-hover/ocard:bg-purple-600 group-hover/ocard:text-white transition-all duration-300 pointer-events-none">
                O
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200/80 dark:from-purple-900/60 dark:to-purple-800/40 border border-purple-300/50 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-sm shrink-0">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                      {opportunities.title}
                    </h3>
                    <h4 className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400">
                      {opportunities.subtitle}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {opportunities.desc}
                </p>

                {/* 4 Vertical Sub-Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {opportunities.cards.map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-all duration-300 shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-2 shrink-0">
                          <CardIcon className="w-5 h-5" />
                        </div>
                        <h5 className="text-[11.5px] font-black text-purple-900 dark:text-purple-200 leading-tight mb-1.5 min-h-[28px] flex items-center justify-center">
                          {card.title}
                        </h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tags Footer */}
              <div className="flex flex-wrap gap-2 mt-6 relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800">
                {opportunities.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-lg bg-purple-50/90 dark:bg-purple-950/50 text-[11px] font-bold text-purple-600 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ============================================================ */}
            {/* CENTER CIRCULAR S-W-O-T EMBLEM BADGE                        */}
            {/* ============================================================ */}
            <div className="hidden lg:flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 pointer-events-none select-none items-center justify-center">
              <div className="relative w-24 h-24 rounded-full bg-white dark:bg-slate-900 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.9)] border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                
                {/* 4 Quadrants Circle */}
                <div className="w-full h-full rounded-full grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden p-0.5 bg-slate-100 dark:bg-slate-800">
                  
                  {/* Top-Left: S (Blue) */}
                  <div className="bg-blue-50/90 dark:bg-blue-950/60 flex items-center justify-center rounded-tl-full border-r border-b border-white dark:border-slate-700">
                    <span className="text-base font-black text-blue-600 dark:text-blue-400">S</span>
                  </div>

                  {/* Top-Right: O (Purple) */}
                  <div className="bg-purple-50/90 dark:bg-purple-950/60 flex items-center justify-center rounded-tr-full border-l border-b border-white dark:border-slate-700">
                    <span className="text-base font-black text-purple-600 dark:text-purple-400">O</span>
                  </div>

                  {/* Bottom-Left: W (Orange) */}
                  <div className="bg-orange-50/90 dark:bg-orange-950/60 flex items-center justify-center rounded-bl-full border-r border-t border-white dark:border-slate-700">
                    <span className="text-base font-black text-orange-600 dark:text-orange-400">W</span>
                  </div>

                  {/* Bottom-Right: T (Red) */}
                  <div className="bg-rose-50/90 dark:bg-rose-950/60 flex items-center justify-center rounded-br-full border-l border-t border-white dark:border-slate-700">
                    <span className="text-base font-black text-rose-600 dark:text-rose-400">T</span>
                  </div>

                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* QUADRANT 3: WEAKNESSES (Bottom-Left)                        */}
            {/* ============================================================ */}
            <div 
              onClick={() => playSound("click")}
              className="relative flex flex-col justify-between rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-orange-200/80 dark:border-orange-800/60 p-6 sm:p-8 shadow-[0_12px_36px_rgba(234,88,12,0.08)] hover:shadow-[0_16px_44px_rgba(234,88,12,0.15)] transition-all duration-300 min-h-[490px] overflow-hidden group/wcard cursor-pointer"
            >
              {/* Soft decorative background tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-transparent to-transparent dark:from-orange-950/20 rounded-[2rem] pointer-events-none" />

              {/* Watermark Letter W in bottom-right corner */}
              <div className="absolute -bottom-4 -right-1 font-black text-[120px] sm:text-[150px] leading-none text-orange-500/15 dark:text-orange-400/15 select-none pointer-events-none transition-all duration-500 group-hover/wcard:text-orange-500/25 group-hover/wcard:scale-105 font-mono tracking-tighter">
                W
              </div>

              {/* Corner Badge W Emblem (Bottom-Right) */}
              <div className="absolute bottom-4 right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 dark:bg-orange-400/10 border border-orange-300/40 dark:border-orange-700/40 backdrop-blur-md flex items-center justify-center text-orange-600 dark:text-orange-400 font-black text-sm sm:text-base shadow-sm group-hover/wcard:bg-orange-600 group-hover/wcard:text-white transition-all duration-300 pointer-events-none">
                W
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200/80 dark:from-orange-900/60 dark:to-orange-800/40 border border-orange-300/50 flex items-center justify-center text-orange-600 dark:text-orange-300 shadow-sm shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                      {weaknesses.title}
                    </h3>
                    <h4 className="text-base sm:text-lg font-black text-orange-600 dark:text-orange-400">
                      {weaknesses.subtitle}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {weaknesses.desc}
                </p>

                {/* Skill items list */}
                <div className="space-y-1.5">
                  {weaknesses.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      onMouseEnter={() => setHoveredSkill(`W-${idx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="flex items-center justify-between py-0.5 px-2 rounded-lg hover:bg-orange-50/60 dark:hover:bg-orange-950/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                        <span className="text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-200 truncate">
                          {skill.name}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-orange-50 dark:bg-orange-950/70 border border-orange-200/60 dark:border-orange-800/60 text-xs font-black text-orange-600 dark:text-orange-400 shrink-0 shadow-2xs">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Footer */}
              <div className="flex flex-wrap gap-2 mt-6 relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800 pr-12">
                {weaknesses.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-lg bg-orange-50/90 dark:bg-orange-950/50 text-[11px] font-bold text-orange-600 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ============================================================ */}
            {/* QUADRANT 4: THREATS (Bottom-Right)                          */}
            {/* ============================================================ */}
            <div 
              onClick={() => playSound("click")}
              className="relative flex flex-col justify-between rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-rose-200/80 dark:border-rose-800/60 p-6 sm:p-8 shadow-[0_12px_36px_rgba(225,29,72,0.08)] hover:shadow-[0_16px_44px_rgba(225,29,72,0.15)] transition-all duration-300 min-h-[490px] overflow-hidden group/tcard cursor-pointer"
            >
              {/* Soft decorative background tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 via-transparent to-transparent dark:from-rose-950/20 rounded-[2rem] pointer-events-none" />

              {/* Watermark Letter T in bottom-right corner */}
              <div className="absolute -bottom-4 -right-1 font-black text-[120px] sm:text-[150px] leading-none text-rose-500/15 dark:text-rose-400/15 select-none pointer-events-none transition-all duration-500 group-hover/tcard:text-rose-500/25 group-hover/tcard:scale-105 font-mono tracking-tighter">
                T
              </div>

              {/* Corner Badge T Emblem (Bottom-Right) */}
              <div className="absolute bottom-4 right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 dark:bg-rose-400/10 border border-rose-300/40 dark:border-rose-700/40 backdrop-blur-md flex items-center justify-center text-rose-600 dark:text-rose-400 font-black text-sm sm:text-base shadow-sm group-hover/tcard:bg-rose-600 group-hover/tcard:text-white transition-all duration-300 pointer-events-none">
                T
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200/80 dark:from-rose-900/60 dark:to-rose-800/40 border border-rose-300/50 flex items-center justify-center text-rose-600 dark:text-rose-300 shadow-sm shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                      {threats.title}
                    </h3>
                    <h4 className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                      {threats.subtitle}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {threats.desc}
                </p>

                {/* 4 Vertical Sub-Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {threats.cards.map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-rose-100 dark:border-rose-900/30 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all duration-300 shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 flex items-center justify-center mb-2 shrink-0">
                          <CardIcon className="w-5 h-5" />
                        </div>
                        <h5 className="text-[11.5px] font-black text-rose-900 dark:text-rose-200 leading-tight mb-1.5 min-h-[28px] flex items-center justify-center">
                          {card.title}
                        </h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tags Footer */}
              <div className="flex flex-wrap gap-2 mt-6 relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800">
                {threats.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-lg bg-rose-50/90 dark:bg-rose-950/50 text-[11px] font-bold text-rose-600 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STATS SUMMARY METRIC HUB (4 Cards Row)                       */}
      {/* ============================================================ */}
      {(activeSection === "all" || activeSection === "overview") && (
        <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Card 1: 88% Competency Overview */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="6" />
                <circle 
                  cx="32" cy="32" r="26" 
                  className="stroke-blue-500 fill-none" 
                  strokeWidth="6" 
                  strokeDasharray="163.36" 
                  strokeDashoffset="19.6" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                {isVi ? "TỔNG QUAN NĂNG LỰC" : "COMPETENCY OVERVIEW"}
              </span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none my-1">
                88%
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isVi ? "Mức độ thành thạo trung bình" : "Average proficiency level"}
              </span>
            </div>
          </div>

          {/* Card 2: 20+ Years Experience */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/50">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none">
                20+
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                {isVi ? "Năm kinh nghiệm" : "Years of Experience"}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isVi ? "Quản lý & vận hành CSKH" : "CSKH Operations & Mgmt"}
              </span>
            </div>
          </div>

          {/* Card 3: 100+ Managed Personnel */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200/60 dark:border-purple-800/50">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400 leading-none">
                100+
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                {isVi ? "Quy mô quản lý" : "Managed Personnel"}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isVi ? "Nhân sự trực tiếp" : "Direct personnel team"}
              </span>
            </div>
          </div>

          {/* Card 4: CX Excellence Trophy */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/50">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                {isVi ? "CX xuất sắc" : "CX Excellence"}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                {isVi ? "Cam kết giá trị" : "Value Commitment"}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isVi ? "Kết quả bền vững" : "Sustainable results"}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* LANGUAGE TRACK CARD SECTION (NGÔN NGỮ)                       */}
      {/* ============================================================ */}
      {(activeSection === "all" || activeSection === "languages") && (
        <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-lg">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-white tracking-wide uppercase">
              {isVi ? "NGÔN NGỮ" : "LANGUAGES"}
            </h3>
          </div>

          {/* 3 Circular Gauge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Vietnamese 100% */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" className="stroke-blue-100 dark:stroke-slate-700 fill-none" strokeWidth="6.5" />
                  <circle 
                    cx="40" cy="40" r="32" 
                    className="stroke-blue-500 fill-none" 
                    strokeWidth="6.5" 
                    strokeDasharray="201" 
                    strokeDashoffset="0" 
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-sm font-black text-slate-800 dark:text-white">100%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {isVi ? "TIẾNG VIỆT" : "VIETNAMESE"}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {isVi ? "(Ngôn ngữ mẹ đẻ)" : "(Native language)"}
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  {isVi ? "Thành thạo tuyệt đối" : "Native fluency"}
                </span>
              </div>
            </div>

            {/* 2. English 90% */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" className="stroke-purple-100 dark:stroke-slate-700 fill-none" strokeWidth="6.5" />
                  <circle 
                    cx="40" cy="40" r="32" 
                    className="stroke-purple-500 fill-none" 
                    strokeWidth="6.5" 
                    strokeDasharray="201" 
                    strokeDashoffset="20.1" 
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-sm font-black text-slate-800 dark:text-white">90%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {isVi ? "TIẾNG ANH" : "ENGLISH"}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  (English)
                </span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1 leading-tight">
                  {isVi ? "Giao tiếp & Làm việc chuyên nghiệp" : "Professional Communication"}
                </span>
              </div>
            </div>

            {/* 3. AI Multilingual & Meetings 85% */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" className="stroke-emerald-100 dark:stroke-slate-700 fill-none" strokeWidth="6.5" />
                  <circle 
                    cx="40" cy="40" r="32" 
                    className="stroke-emerald-500 fill-none" 
                    strokeWidth="6.5" 
                    strokeDasharray="201" 
                    strokeDashoffset="30.15" 
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-sm font-black text-slate-800 dark:text-white">85%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight">
                  {isVi ? "DÙNG AI TRAO ĐỔI ĐA NGÔN NGỮ & HỌP" : "AI MULTILINGUAL & MEETINGS"}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                  {isVi 
                    ? "Sử dụng AI hỗ trợ trao đổi đa ngôn ngữ & họp quốc tế (AI-powered Communication)" 
                    : "Using AI to support multilingual communication & international meetings"}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default SwotAnalysis;

