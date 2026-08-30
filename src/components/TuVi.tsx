import { PageBanner } from "./PageBanner";
import { TuViDashboardSummary } from "./TuViDashboardSummary";
import React, { useState, useRef } from "react";
import { 
  Star, Filter, Calendar, User, Palette, 
  Briefcase, Wallet, Plane, Users, Shield, Heart,
  Layers, Sun, Droplets, Sprout, Flame, Mountain,
  TrendingUp, Target, CheckCircle2, ChevronRight,
  Sparkles, Award, Play, Pause, Compass
} from "lucide-react";
import { useLanguage } from "../i18n";
import WebsiteGradientIcon from "./WebsiteGradientIcon";

export default function TuVi() {
  const { lang, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Audio Playback State for Yin-Yang Circle
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
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

  const isVi = lang === "vi";

  const filters = [
    { id: "all", label: isVi ? "Tổng Quan Tất Cả" : "All Overview" },
    { id: "tong-quan", label: isVi ? "Tổng Quan Vận Hành & Lãnh Đạo" : "Executive Dashboard" },
    { id: "luc-cung", label: isVi ? "Lục Cung Trọng Yếu" : "Key 6 Palaces" },
    { id: "ngu-hanh", label: isVi ? "Ma Trận Ngũ Hành" : "Five Elements Matrix" },
    { id: "dai-van", label: isVi ? "Vận Trình 2026+" : "Major Cycle 2026+" },
  ];

  // 6 Key Palaces data matching reference
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
    <section id="tuvi" className="relative flex flex-col w-full flex-1 max-w-6xl mx-auto px-2 sm:px-4 md:px-6 py-2 transition-all gap-5">
      {/* 1. PAGE BANNER */}
      <div className="w-full">
        <PageBanner 
          title={isVi ? "Triết lý vận hành" : "Strategic executive leadership philosophy"}
          subtitle={isVi 
            ? "Giáp Tý 1984 – Hải Trung Kim: Nguồn nội lực thâm sâu, đức tính trọng Tín và Tam Hợp Thân-Tý-Thìn bệ đỡ vững vàng." 
            : "1984 Wood Rat (Hai Trung Kim): Deep inner resilience, unshakable integrity, supported by the powerful Shen-Zi-Chen Destiny Triad."
          }
          tag="TỬ VI"
          iconType="tuvi"
          gradient="from-fuchsia-950 via-purple-950 to-slate-950"
        />
      </div>

      {/* 2. MAIN HERO CARD - "TỬ VI ĐẨU SỐ – GIÁP TÝ 1984" (MOVED UP NEAR BANNER) */}
      {(selectedFilter === "all" || selectedFilter === "luc-cung") && (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg p-5 sm:p-7 relative overflow-hidden transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content Area (Col 1-8) */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-700/40 text-amber-800 dark:text-amber-300 rounded-full text-xs font-bold w-fit shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{isVi ? "TỬ VI ĐẨU SỐ – GIÁP TÝ 1984" : "PURPLE STAR ASTROLOGY – GIAP TY 1984"}</span>
              </div>

              {/* Main Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isVi ? "Hải Trung Kim - Ốc Thượng Chi Thử" : "Sea Metal (Hai Trung Kim) - House Rat"}
              </h3>

              {/* Description Paragraph */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify sm:text-left">
                {isVi
                  ? "Người tuổi Giáp Tý sinh năm 1984 mang mệnh Hải Trung Kim (Vàng dưới đáy biển), đại diện cho nguồn nội lực thâm sâu, trí tuệ tinh túy dồi dào và phẩm chất trọng tình, điềm đạm. Trải qua 22 năm thử thách thực chiến, ngọc sáng giữa biển khơi càng mài giũa sáng tỏa rạng, định hình nên phong cách lãnh đạo kiên cường nhưng giàu lòng trắc ẩn."
                  : "Born in 1984 (Wood Rat), bearing the Hai Trung Kim (Gold beneath the Sea) destiny, symbolizing deep internal resilience, refined intellect, and calm integrity. Through 22 years of hands-on battlefield experience, the jade has been continuously polished, establishing a leadership style that is both resilient and empathetic."}
              </p>

              {/* 4 Metadata Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {/* 1. Year */}
                <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {isVi ? "NĂM SINH" : "BIRTH YEAR"}
                    </div>
                    <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      {isVi ? "Giáp Tý (1984)" : "Rat (1984)"}
                    </div>
                  </div>
                </div>

                {/* 2. Element */}
                <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                  <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg shrink-0 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="22" y="18" width="56" height="64" rx="12" fill="currentColor" />
                      <circle cx="50" cy="42" r="11" fill="white" />
                      <path d="M 33 66 C 33 55 40 52 50 52 C 60 52 67 55 67 66 Z" fill="white" />
                      <circle cx="68" cy="26" r="8" fill="#10b981" />
                      <path d="M 65 26 L 67 28 L 71 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {isVi ? "NGŨ HÀNH MỆNH" : "ELEMENT"}
                    </div>
                    <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      {isVi ? "Hải Trung Kim" : "Sea Metal"}
                    </div>
                  </div>
                </div>

                {/* 3. Trigram */}
                <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 group">
                  <div className="shrink-0 transform transition-transform group-hover:scale-110 duration-300">
                    <WebsiteGradientIcon type="tuvi" extraClass="w-9 h-9" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {isVi ? "CUNG MỆNH" : "PALACE"}
                    </div>
                    <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      {isVi ? "Đoài Kim (Tây Tứ)" : "Doai (West)"}
                    </div>
                  </div>
                </div>

                {/* 4. Compatible Colors */}
                <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
                  <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {isVi ? "MÀU TƯƠNG HỢP" : "COLORS"}
                    </div>
                    <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                      {isVi ? "Vàng, Trắng, Xám" : "Gold, White, Gray"}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Graphic Area (Col 9-12) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative p-4 bg-gradient-to-br from-purple-100/90 via-indigo-50/70 to-purple-200/50 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-purple-900/30 rounded-2xl border border-purple-200/60 dark:border-purple-800/40 shadow-inner">

              {/* Center 3D Compass Dial Frame with Yin Yan Image & Audio Play Button */}
              <div className="relative my-2">
                <div 
                  onClick={toggleAudio}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-500 group ${
                    isAudioPlaying 
                      ? "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 ring-4 ring-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.85)]" 
                      : "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-4 ring-amber-300/30 hover:scale-105"
                  }`}
                  title={isAudioPlaying ? "Tắt âm thanh Tử vi" : "Phát âm thanh Tử vi"}
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
                    <div className="absolute inset-0 bg-slate-950/30 rounded-full flex items-center justify-center transition-opacity group-hover:bg-slate-950/40">
                      <div className={`p-2.5 rounded-full text-white shadow-2xl backdrop-blur-md border border-white/50 transition-all ${
                        isAudioPlaying ? "bg-amber-500/90 scale-110 shadow-amber-500/50" : "bg-black/60 group-hover:scale-110"
                      }`}>
                        {isAudioPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                      </div>
                    </div>

                    <span className="absolute top-1 text-[8px] font-bold text-amber-300 z-10 pointer-events-none">N</span>
                    <span className="absolute bottom-1 text-[8px] font-bold text-amber-300 z-10 pointer-events-none">S</span>
                    <span className="absolute left-1 text-[8px] font-bold text-amber-300 z-10 pointer-events-none">W</span>
                    <span className="absolute right-1 text-[8px] font-bold text-amber-300 z-10 pointer-events-none">E</span>
                  </div>
                </div>
              </div>

              {/* Badge 1984 - 2026+ */}
              <div className="mt-2 px-3.5 py-0.5 bg-amber-100/90 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700/60 rounded-full text-amber-900 dark:text-amber-200 text-xs font-extrabold shadow-2xs">
                1984 - 2026+
              </div>

              {/* Bottom Quote */}
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 italic text-center mt-2">
                {isVi ? "“Tâm tĩnh như thủy – Trí sáng như kim”" : "“Mind calm as water – Intellect bright as gold”"}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* NAVIGATION TABS / FILTER BAR */}
      <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {filters.map((flt) => {
            const isActive = selectedFilter === flt.id;
            return (
              <button
                key={flt.id}
                onClick={() => setSelectedFilter(flt.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-md scale-[1.02]"
                    : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700/80"
                }`}
              >
                {flt.id === "all" && <Star className="w-3.5 h-3.5" />}
                {flt.id === "tong-quan" && <Award className="w-3.5 h-3.5 text-purple-400 animate-pulse" />}
                {flt.id === "luc-cung" && <Shield className="w-3.5 h-3.5 text-emerald-400" />}
                {flt.id === "ngu-hanh" && <Layers className="w-3.5 h-3.5 text-sky-400" />}
                {flt.id === "dai-van" && <TrendingUp className="w-3.5 h-3.5 text-purple-400" />}
                <span>{flt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* EXECUTIVE OVERVIEW DASHBOARD FROM IMAGE */}
      {(selectedFilter === "all" || selectedFilter === "tong-quan") && (
        <div className="w-full">
          <TuViDashboardSummary />
        </div>
      )}

    </section>
  );
}
