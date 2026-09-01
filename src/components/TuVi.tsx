import React, { useState, useRef } from "react";
import { 
  Star, Calendar, User, Palette, 
  Briefcase, Wallet, Plane, Users, Heart,
  Sun, Droplets, Sprout, Flame, Mountain,
  TrendingUp, CheckCircle2,
  Sparkles, Play, Pause, Compass
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { PageBanner } from "./PageBanner";
import { TuViDashboardSummary } from "./TuViDashboardSummary";

export default function TuVi() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Audio Playback State for Yin-Yang Circle
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    playUiSound("click");
    if (!audioRef.current) {
      audioRef.current = new Audio("https://cdn.scena.ai/project/9626/b40b848d5a2ad108760073e8c64bd80f963850ab7e79c19af228c82a83f6419d.mp3");
      audioRef.current.loop = true;
    }
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsAudioPlaying(true);
    }
  };

  // 6 Key Palaces data
  const sixPalaces = [
    {
      id: "menh",
      name: isVi ? "Cung Mệnh (Tý)" : "Life Palace (Rat / Ty)",
      tag: isVi ? "Bản Mệnh Chi Lực" : "Core Destiny Power",
      colorTheme: "purple",
      icon: User,
      stars: [
        { name: isVi ? "Hải Trung Kim" : "Sea Metal", main: true },
        { name: isVi ? "Thiên Phủ" : "Thien Phu", main: false },
        { name: isVi ? "Hóa Khoa" : "Hoa Khoa", main: false }
      ],
      description: isVi 
        ? "Chủ về trí tuệ mưu lược, tư duy nhạy bén và tính cách điềm tĩnh, trọng chữ Tín. Khí chất điềm đạm, có tài quy tụ lòng người và năng lực điều hành tổng thể."
        : "Governs strategic intellect, keen thinking, calm demeanor, and high integrity. Natural charisma to unite teams with comprehensive executive capability.",
      checkpoints: [
        isVi ? "Tư duy chiến lược dài hạn" : "Long-term strategic thinking",
        isVi ? "Chính trực & trọng danh dự" : "Integrity & honor-driven",
        isVi ? "Điềm đạm trước áp lực lớn" : "Composed under high pressure"
      ]
    },
    {
      id: "quan-loc",
      name: isVi ? "Cung Quan Lộc (Thìn)" : "Career Palace (Dragon / Thin)",
      tag: isVi ? "Sự Nghiệp Vận Hành" : "Operational Career",
      colorTheme: "emerald",
      icon: Briefcase,
      stars: [
        { name: isVi ? "Thái Âm" : "Thai Am", main: true },
        { name: isVi ? "Văn Xương" : "Van Xuong", main: false },
        { name: isVi ? "Thiên Khôi" : "Thien Khoi", main: false }
      ],
      description: isVi
        ? "Sự nghiệp gắn liền với quản trị hệ thống, dịch vụ quy mô lớn, công nghệ và chuyển đổi số. Càng dấn thân phụng sự khách hàng càng tỏa sáng rực rỡ."
        : "Career is anchored in enterprise operations, large-scale customer service, technology, and digital transformation. Thrives in dedication to customer experience.",
      checkpoints: [
        isVi ? "Vận hành Contact Center 150+" : "Operated 150+ Contact Centers",
        isVi ? "Kiến trúc CRM & AI Bot" : "Architected CRM & AI Bots",
        isVi ? "22 năm cống hiến thực chiến" : "22+ years hands-on mastery"
      ]
    },
    {
      id: "tai-bach",
      name: isVi ? "Cung Tài Bạch (Thân)" : "Wealth Palace (Monkey / Than)",
      tag: isVi ? "Tài Lộc Thực Chiến" : "Practical Financial Value",
      colorTheme: "teal",
      icon: Wallet,
      stars: [
        { name: isVi ? "Thiên Đồng" : "Thien Dong", main: true },
        { name: isVi ? "Lộc Tồn" : "Loc Ton", main: false },
        { name: isVi ? "Hóa Lộc" : "Hoa Loc", main: false }
      ],
      description: isVi
        ? "Tài lộc cộng chắc từ năng lực điều hành thực chiến và tối ưu hóa chi phí vận hành (Cost-to-Serve), tạo ra giá trị thặng dư bền vững cho tổ chức."
        : "Financial value is generated through solid execution mastery and operational cost optimization (Cost-to-Serve), delivering sustainable enterprise surplus.",
      checkpoints: [
        isVi ? "Tối ưu chi phí vận hành" : "Optimized Cost-to-Serve",
        isVi ? "Quản trị ngân sách minh bạch" : "Transparent budget governance",
        isVi ? "Đầu tư giá trị bền vững" : "Sustainable value generation"
      ]
    },
    {
      id: "thien-di",
      name: isVi ? "Cung Thiên Di (Ngọ)" : "Travel / Expansion Palace (Horse / Ngo)",
      tag: isVi ? "Ngoại Giao & Mở Rộng" : "Diplomacy & Expansion",
      colorTheme: "blue",
      icon: Plane,
      stars: [
        { name: isVi ? "Thất Sát" : "That Sat", main: true },
        { name: isVi ? "Thiên Mã" : "Thien Ma", main: false },
        { name: isVi ? "Quý Nhân" : "Noble Benefactor", main: false }
      ],
      description: isVi
        ? "Ra ngoài có nhiều quý nhân tương trợ, thích ứng nhanh với môi trường đa văn hóa, tập đoàn đa quốc gia và các thị trường công nghệ chuyển biến liên tục."
        : "Blessed with noble benefactors when expanding outward, agile adaptation to multicultural environments, multinational corporations, and fast-moving tech markets.",
      checkpoints: [
        isVi ? "Hòa nhập tập đoàn lớn" : "Seamless enterprise integration",
        isVi ? "Kết nối đối tác chiến lược" : "Strategic partner networking",
        isVi ? "Linh hoạt ứng biến thời cuộc" : "High agility in changing times"
      ]
    },
    {
      id: "no-boc",
      name: isVi ? "Cung Nô Bộc (Tỵ)" : "Subordinates Palace (Snake / Ty)",
      tag: isVi ? "Đội Ngũ Nhân Sự" : "Team & Human Resources",
      colorTheme: "amber",
      icon: Users,
      stars: [
        { name: isVi ? "Tả Phù" : "Ta Phu", main: true },
        { name: isVi ? "Hữu Bật" : "Huu Bat", main: false },
        { name: isVi ? "Thiên Đức" : "Thien Duc", main: false }
      ],
      description: isVi
        ? "Đội ngũ cấp dưới đoàn kết, tôn trọng kỷ luật và luôn được truyền cảm hứng qua phong cách lãnh đạo thấu cảm (Empathetic Leadership)."
        : "Subordinates are unified, disciplined, and consistently inspired through Empathetic Leadership, fostering strong loyalty and trust.",
      checkpoints: [
        isVi ? "Lãnh đạo truyền cảm hứng" : "Inspirational leadership style",
        isVi ? "Đào tạo đội ngũ kế thừa" : "Successor talent cultivation",
        isVi ? "Giữ chân nhân tài (Low Churn)" : "High retention (Low Churn)"
      ]
    },
    {
      id: "phuc-duc",
      name: isVi ? "Cung Phúc Đức (Dần)" : "Karma & Ancestral Palace (Tiger / Dan)",
      tag: isVi ? "Phúc Khí & Đạo Tâm" : "Virtue & Inner Compass",
      colorTheme: "rose",
      icon: Heart,
      stars: [
        { name: isVi ? "Thiên Phúc" : "Thien Phuc", main: true },
        { name: isVi ? "Thiên Quan" : "Thien Quan", main: false },
        { name: isVi ? "Long Trì" : "Long Tri", main: false }
      ],
      description: isVi
        ? "Gốc rễ phúc đức vững bền, tâm niệm luôn đặt đạo đức nghề nghiệp và lòng nhân ái lên hàng đầu. Biến nguy thành an qua mọi giai đoạn thử thách."
        : "Deep ancestral blessings and high ethical standards. Always prioritizing professionalism and benevolence, turning adversity into peace and triumph.",
      checkpoints: [
        isVi ? "Tâm sáng – Vận thông" : "Pure mind brings smooth fortune",
        isVi ? "Bình diện trước biến động" : "Equanimity amidst turbulence",
        isVi ? "Lan tỏa năng lượng tích cực" : "Spreads positive energy"
      ]
    }
  ];

  // 5 Elements Matrix
  const fiveElements = [
    {
      element: isVi ? "KIM (MỆNH CHỦ)" : "METAL (CORE DESTINY)",
      subtitle: isVi ? "Quy trình & Tiêu chuẩn" : "SOP & Standards",
      icon: Sun,
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-200/80 dark:border-amber-700/50",
      iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      titleColor: "text-amber-800 dark:text-amber-300",
      subColor: "text-amber-600/90 dark:text-amber-400/80",
      desc: isVi
        ? "Nền tảng cho kỷ luật, tính chuẩn mực, hệ thống quy trình SOP sắc bén và chỉ số đo lường KPI/SLA rõ ràng, minh bạch."
        : "Foundation for discipline, benchmark excellence, sharp SOP systems, and transparent KPI/SLA metrics."
    },
    {
      element: isVi ? "THỦY (TƯƠNG SINH)" : "WATER (GENERATING)",
      subtitle: isVi ? "Dữ liệu & Công nghệ AI" : "Data & AI Technology",
      icon: Droplets,
      bgColor: "bg-sky-50 dark:bg-sky-950/30",
      borderColor: "border-sky-200/80 dark:border-sky-700/50",
      iconBg: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
      titleColor: "text-sky-800 dark:text-sky-300",
      subColor: "text-sky-600/90 dark:text-sky-400/80",
      desc: isVi
        ? "Thủy biểu trưng cho dòng chảy dữ liệu CRM, hệ thống AI Chatbot tự động và khả năng giao tiếp lắng nghe khách hàng linh hoạt, mềm mại."
        : "Water symbolizes CRM data flows, automated AI Chatbots, and agile, empathetic active customer listening."
    },
    {
      element: isVi ? "MỘC (PHÁT TRIỂN)" : "WOOD (GROWTH)",
      subtitle: isVi ? "Đào tạo & Phát triển Con người" : "People Development & Coaching",
      icon: Sprout,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-200/80 dark:border-emerald-700/50",
      iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      titleColor: "text-emerald-800 dark:text-emerald-300",
      subColor: "text-emerald-600/90 dark:text-emerald-400/80",
      desc: isVi
        ? "Mộc nuôi dưỡng sự trưởng thành các đội ngũ nhân sự, kiến tạo văn hóa học tập suốt đời và nuôi dưỡng các thế hệ quản lý kế thừa."
        : "Wood nurtures team growth, fosters a lifelong learning culture, and grooms future generations of leadership talent."
    },
    {
      element: isVi ? "HỎA (NHIỆT HUYẾT)" : "FIRE (PASSION)",
      subtitle: isVi ? "Trải nghiệm Khách hàng Vượt trội" : "Customer Experience Excellence",
      icon: Flame,
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
      borderColor: "border-rose-200/80 dark:border-rose-700/50",
      iconBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
      titleColor: "text-rose-800 dark:text-rose-300",
      subColor: "text-rose-600/90 dark:text-rose-400/80",
      desc: isVi
        ? "Hỏa truyền lửa tận tâm, sự ấm áp chân thành trong từng điểm chạm dịch vụ và khát vọng phụng sự nâng tầm thương hiệu."
        : "Fire spreads wholehearted passion, genuine warmth across every customer touchpoint, elevating brand advocacy."
    },
    {
      element: isVi ? "THỔ (NỀN TẢNG)" : "EARTH (FOUNDATION)",
      subtitle: isVi ? "Hạ tầng & Giá trị Bền vững" : "Infrastructure & Sustainability",
      icon: Mountain,
      bgColor: "bg-amber-50/60 dark:bg-amber-950/20",
      borderColor: "border-amber-300/60 dark:border-amber-800/40",
      iconBg: "bg-amber-600/15 text-amber-700 dark:text-amber-300",
      titleColor: "text-amber-900 dark:text-amber-200",
      subColor: "text-amber-700/90 dark:text-amber-400/80",
      desc: isVi
        ? "Thổ là bệ đỡ hạ tầng vững chắc, cơ sở dữ liệu an toàn bảo mật và nền móng vận hành doanh nghiệp không lay chuyển."
        : "Earth acts as a rock-solid infrastructure foundation, secure enterprise data, and unshakable business governance."
    }
  ];

  return (
    <section id="tuvi" className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full px-3 sm:px-6 py-4 sm:py-6 space-y-4">
      
      {/* ================= 1. PAGE BANNER ================= */}
      <div id="tuvi-banner" className="w-full">
        <PageBanner 
          title={isVi ? "Triết lý vận hành & Tử vi" : "Strategic Leadership Philosophy & Destiny"}
          subtitle={isVi 
            ? "Giáp Tý 1984 – Hải Trung Kim: Nguồn nội lực thâm sâu, đức tính trọng Tín và Tam Hợp Thân-Tý-Thìn bệ đỡ vững vàng." 
            : "1984 Wood Rat (Hai Trung Kim): Deep inner resilience, unshakable integrity, supported by the powerful Shen-Zi-Chen Destiny Triad."
          }
          tag={isVi ? "TỬ VI ĐẨU SỐ" : "DESTINY MATRIX"}
          iconType="tongquan"
          gradient="from-fuchsia-950 via-purple-950 to-slate-950"
          rightContent={
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-white/80 dark:bg-black/25 border border-slate-300/80 dark:border-white/20 backdrop-blur-md shadow-xs">
                <div className="px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-white/10 text-center">
                  <span className="block text-xs sm:text-sm font-black text-amber-500 dark:text-amber-400 leading-tight">1984</span>
                  <span className="text-[9px] text-slate-700 dark:text-amber-200 font-bold uppercase tracking-wider">{isVi ? "Giáp Tý" : "Rat"}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-white/10 text-center">
                  <span className="block text-xs sm:text-sm font-black text-purple-600 dark:text-purple-400 leading-tight">Kim</span>
                  <span className="text-[9px] text-slate-700 dark:text-purple-200 font-bold uppercase tracking-wider">{isVi ? "Bản Mệnh" : "Metal"}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-white/10 text-center">
                  <span className="block text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 leading-tight">2026+</span>
                  <span className="text-[9px] text-slate-700 dark:text-emerald-200 font-bold uppercase tracking-wider">{isVi ? "Đại Vận" : "Cycle"}</span>
                </div>
              </div>
            </div>
          }
        />
      </div>

      {/* Banner Subtitle / Identity Statement */}
      <div className="w-full px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-600/10 dark:bg-purple-400/20 text-purple-600 dark:text-purple-300 shrink-0">
            <Sparkles className="w-3 h-3" />
          </span>
          <span>
            {isVi ? "Tâm tĩnh như thủy – Trí sáng như kim • Tam Hợp Thân - Tý - Thìn bệ đỡ vững vàng" : "Mind calm as water – Intellect bright as gold • Solid Shen-Zi-Chen Destiny Triad"}
          </span>
        </div>
        <div className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shrink-0">
          {isVi ? "Bản Mệnh: Hải Trung Kim" : "Core Destiny: Sea Metal"}
        </div>
      </div>

      {/* ================= 2. EXECUTIVE PROFILE & OVERVIEW (TOP GRID) ================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: ÂM DƯƠNG LA BÀN & AUDIO THIỀN ĐỊNH */}
        <div className="lg:col-span-4 bg-gradient-to-br from-purple-100/95 via-indigo-50/85 to-purple-200/75 dark:from-purple-950/50 dark:via-indigo-950/40 dark:to-purple-900/40 backdrop-blur-md rounded-3xl border border-purple-200/80 dark:border-purple-800/60 p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between relative overflow-hidden text-center space-y-4">
          <div className="flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 glass-surface border border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isVi ? "ÂM DƯƠNG LA BÀN" : "YIN-YANG COMPASS"}</span>
            </div>
            <div className="px-3 py-0.5 bg-amber-100/90 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700/60 rounded-full text-amber-900 dark:text-amber-200 text-xs font-extrabold shadow-2xs">
              1984 - 2026+
            </div>
          </div>

          {/* Center 3D Compass Dial Frame with Yin Yan Image & Audio Play Button */}
          <div className="relative my-2">
            <div 
              onClick={toggleAudio}
              className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full p-2 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-500 group ${
                isAudioPlaying 
                  ? "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 ring-4 ring-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.85)]" 
                  : "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-4 ring-amber-300/30 hover:scale-105"
              }`}
              title={isAudioPlaying ? (isVi ? "Tắt âm thanh Tử vi" : "Stop audio") : (isVi ? "Phát âm thanh Tử vi thiền định" : "Play meditation audio")}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 border-2 border-amber-300 flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/nsKpgT8V/Yin-Yan.jpg"
                    alt="Yin Yan"
                    className={`w-full h-full rounded-full object-cover transition-all duration-700 ${
                      isAudioPlaying ? "animate-[spin_10s_linear_infinite]" : ""
                    }`}
                  />
                </div>
                
                {/* Center Overlay Play/Pause Button */}
                <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/30 rounded-full flex items-center justify-center transition-opacity group-hover:bg-slate-950/40">
                  <div className={`p-3.5 rounded-full text-white shadow-2xl backdrop-blur-md border border-white/60 transition-all ${
                      isAudioPlaying ? "bg-amber-500/90 scale-110 shadow-amber-500/60" : "bg-black/60 group-hover:scale-110"
                  }`}>
                    {isAudioPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                  </div>
                </div>

                <span className="absolute top-1 text-[9px] font-bold text-amber-300 z-10 pointer-events-none">N</span>
                <span className="absolute bottom-1 text-[9px] font-bold text-amber-300 z-10 pointer-events-none">S</span>
                <span className="absolute left-1.5 text-[9px] font-bold text-amber-300 z-10 pointer-events-none">W</span>
                <span className="absolute right-1.5 text-[9px] font-bold text-amber-300 z-10 pointer-events-none">E</span>
              </div>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic text-center">
            {isVi ? "“Tâm tĩnh như thủy – Trí sáng như kim”" : "“Mind calm as water – Intellect bright as gold”"}
          </p>
        </div>

        {/* Right: I. HỒ SƠ LÃNH ĐẠO – TỬ VI ĐẨU SỐ GIÁP TÝ 1984 */}
        <div className="lg:col-span-8 glass-surface backdrop-blur-md rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                  {isVi ? "I. HỒ SƠ LÃNH ĐẠO" : "I. LEADERSHIP PROFILE"}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-700/40 text-amber-800 dark:text-amber-300 rounded-full text-xs font-bold w-fit shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{isVi ? "GIÁP TÝ 1984" : "GIAP TY 1984"}</span>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Hải Trung Kim - Ốc Thượng Chi Thử" : "Sea Metal (Hai Trung Kim) - House Rat"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              {isVi
                ? "Người tuổi Giáp Tý sinh năm 1984 mang mệnh Hải Trung Kim (Vàng dưới đáy biển), đại diện cho nguồn nội lực thâm sâu, trí tuệ tinh túy dồi dào và phẩm chất trọng tình, điềm đạm. Trải qua 22 năm thử thách thực chiến, ngọc sáng giữa biển khơi càng mài giũa sáng tỏa rạng, định hình nên phong cách lãnh đạo kiên cường nhưng giàu lòng trắc ẩn."
                : "Born in 1984 (Wood Rat), bearing the Hai Trung Kim (Gold beneath the Sea) destiny, symbolizing deep internal resilience, refined intellect, and calm integrity. Through 22 years of hands-on battlefield experience, the jade has been continuously polished, establishing a leadership style that is both resilient and empathetic."}
            </p>
          </div>

          {/* 4 Metadata Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-2.5 bg-slate-50/90 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2.5 shadow-2xs hover:border-emerald-300 transition-colors">
              <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider truncate">
                  {isVi ? "NĂM SINH" : "BIRTH YEAR"}
                </div>
                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                  {isVi ? "Giáp Tý (1984)" : "Rat (1984)"}
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50/90 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2.5 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider truncate">
                  {isVi ? "NGŨ HÀNH" : "ELEMENT"}
                </div>
                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                  {isVi ? "Hải Trung Kim" : "Sea Metal"}
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50/90 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2.5 shadow-2xs hover:border-teal-300 transition-colors">
              <div className="p-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider truncate">
                  {isVi ? "CUNG MỆNH" : "PALACE"}
                </div>
                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                  {isVi ? "Đoài Kim" : "Doai (West)"}
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50/90 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2.5 shadow-2xs hover:border-amber-300 transition-colors">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
                <Palette className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider truncate">
                  {isVi ? "MÀU HỢP" : "COLORS"}
                </div>
                <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                  {isVi ? "Vàng, Trắng" : "Gold, White"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. TỔNG QUAN VẬN HÀNH & NĂNG LỰC LÃNH ĐẠO ================= */}
      <div className="w-full rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <TuViDashboardSummary />
      </div>

      {/* ================= 4. II. LỤC CUNG TRỌNG YẾU (TAM HỢP MỆNH - TÀI - QUAN) ================= */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-purple-600 rounded-full shrink-0" />
            <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              {isVi ? "II. Lục Cung Trọng Yếu (Tam Hợp Thân – Tý – Thìn)" : "II. Six Core Palaces (Destiny Triad)"}
            </h3>
          </div>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
            {isVi ? "6 Cung Cốt Lõi" : "6 Key Palaces"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sixPalaces.map((palace) => {
            const Icon = palace.icon;
            const colorClasses: Record<string, string> = {
              purple: "border-purple-200 dark:border-purple-800/60 bg-purple-50/40 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300",
              emerald: "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300",
              teal: "border-teal-200 dark:border-teal-800/60 bg-teal-50/40 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300",
              blue: "border-blue-200 dark:border-blue-800/60 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300",
              amber: "border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300",
              rose: "border-rose-200 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300",
            };
            const badgeColors: Record<string, string> = {
              purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300/40",
              emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300/40",
              teal: "bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 border-teal-300/40",
              blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-300/40",
              amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300/40",
              rose: "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 border-rose-300/40",
            };

            return (
              <div
                key={palace.id}
                className={`p-5 sm:p-6 rounded-3xl border backdrop-blur-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 ${colorClasses[palace.colorTheme]}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-white/90 dark:bg-black/40 rounded-xl shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                        {palace.name}
                      </h4>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-2xs ${badgeColors[palace.colorTheme]}`}>
                      {palace.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                    {palace.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {palace.stars.map((star, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          star.main
                            ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/40"
                            : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        }`}
                      >
                        ★ {star.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1.5">
                  {palace.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{cp}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 5. III. MA TRẬN NGŨ HÀNH & ĐẠI VẬN SỰ NGHIỆP ================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
        {/* Left: MA TRẬN NGŨ HÀNH KHẮC DỤNG */}
        <div className="lg:col-span-6 glass-surface backdrop-blur-md rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2.5 h-6 bg-teal-600 rounded-full shrink-0" />
              <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                {isVi ? "III. Ma Trận Ngũ Hành Khắc Dụng" : "III. Five Elements Executive Matrix"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fiveElements.map((el, idx) => {
                const ElIcon = el.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex flex-col justify-between hover:shadow-md transition-all duration-300 ${el.bgColor} ${el.borderColor}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold tracking-wider ${el.titleColor}`}>
                          {el.element}
                        </span>
                        <div className={`p-1.5 rounded-lg ${el.iconBg}`}>
                          <ElIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h4 className={`text-xs font-black leading-snug ${el.titleColor}`}>
                        {el.subtitle}
                      </h4>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {el.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: VẬN TRÌNH SỰ NGHIỆP & ĐẠI VẬN 2026+ */}
        <div className="lg:col-span-6 glass-surface backdrop-blur-md rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="w-2.5 h-6 bg-amber-600 rounded-full shrink-0" />
            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              {isVi ? "IV. Vận Trình Sự Nghiệp & Đại Vận 2026+" : "IV. Career Cycle & Future Outlook (2026+)"}
            </h3>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-4 py-1 space-y-4">
            {/* 2026 */}
            <div className="relative">
              <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900 shadow-xs" />
              <div className="p-3 bg-slate-50/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs space-y-1">
                <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">
                  2026
                </span>
                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                  {isVi ? "Năm Định Hình & Chuẩn Hóa Quy Trình (SOP & Cost-to-Serve)" : "Process Standardization & Optimization"}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isVi 
                    ? "Tập trung chuẩn hóa quy trình chăm sóc khách hàng đa kênh, cấu trúc lại sơ đồ tổ chức, thiết lập hệ thống KPI/SLA minh bạch." 
                    : "Standardizing multichannel customer care operations, reorganizing workflow structures, setting transparent KPIs/SLAs."}
                </p>
              </div>
            </div>

            {/* 2027 */}
            <div className="relative">
              <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 shadow-xs" />
              <div className="p-3 bg-slate-50/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs space-y-1">
                <span className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                  2027
                </span>
                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                  {isVi ? "Năm Tăng Tốc & Tự Động Hóa (AI Chatbot & CRM Integration)" : "Acceleration & AI Automation"}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isVi 
                    ? "Triển khai đồng loạt các hệ thống tự động hóa kênh hỗ trợ, tích hợp trợ lý AI Bot chuyên sâu xử lý yêu cầu nhanh." 
                    : "Deploying automated support systems, integrating specialized AI Conversational Assistants."}
                </p>
              </div>
            </div>

            {/* 2028 */}
            <div className="relative">
              <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-white dark:border-slate-900 shadow-xs" />
              <div className="p-3 bg-slate-50/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs space-y-1">
                <span className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded">
                  2028
                </span>
                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                  {isVi ? "Năm Chuyển Đổi Số Toàn Diện & Trải Nghiệm Khách Hàng (CX)" : "Full Digital & CX Transformation"}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isVi 
                    ? "Dẫn dắt các chiến dịch nâng tầm trải nghiệm khách hàng vượt trội (Customer Experience), đo lường sự hài lòng thời gian thực." 
                    : "Leading campaigns to elevate Customer Experience (CX), capturing real-time satisfaction surveys."}
                </p>
              </div>
            </div>

            {/* 2029+ */}
            <div className="relative">
              <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" />
              <div className="p-3 bg-slate-50/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs space-y-1">
                <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                  2029+
                </span>
                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                  {isVi ? "Đại Vận Kiến Tạo Di Sản & Lãnh Đạo Cấp Cao" : "Enterprise Legacy & Executive Leadership"}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isVi 
                    ? "Phát huy phong cách lãnh đạo thấu cảm toàn diện, bồi dưỡng quản lý kế cận xuất sắc, kiến tạo các giá trị di sản vững chắc." 
                    : "Exercising comprehensive empathetic leadership, nurturing outstanding successor talents."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 6. IV. PHƯƠNG CHÂM HÀNH ĐỘNG ================= */}
      <div className="w-full bg-gradient-to-br from-orange-50/90 via-amber-50/60 to-orange-100/50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-900 rounded-3xl border border-orange-200/80 dark:border-orange-800/60 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-3xl font-serif font-black text-orange-500 leading-none">“</span>
            <span className="text-xs sm:text-sm font-black text-orange-800 dark:text-orange-300 uppercase tracking-wider">
              {isVi ? "PHƯƠNG CHÂM HÀNH ĐỘNG" : "ACTION CREED"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "{isVi
              ? "Tư duy chiến lược thấu hiểu bản thân, hiểu đội ngũ, dẫn dắt bằng dữ liệu."
              : "Strategic thinking understanding self, understanding the team, leading with data."}"
          </p>
        </div>
        <div className="p-4 glass-surface rounded-2xl border border-orange-300/60 dark:border-orange-800/60 shadow-xs text-center shrink-0 max-w-md">
          <div className="text-xs sm:text-sm font-black text-orange-900 dark:text-orange-200 leading-snug">
            {isVi ? "Lấy chân lý làm gốc, Lấy hành động làm đường, Lấy kết quả làm thước đo." : "Rooted in Truth, Guided by Action, Measured by Results."}
          </div>
        </div>
      </div>
    </section>
  );
}
