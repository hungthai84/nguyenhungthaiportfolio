import React from "react";
import {
  Mail,
  Star,
  Radio,
  Users,
  Monitor,
  ShoppingCart,
  Gamepad2,
  Shield,
  Smartphone,
  Layers,
  BarChart2,
  Bot,
  Globe,
  Headset,
  Heart,
  Settings,
  User,
  TrendingUp,
  Volume2,
  Sprout,
  CheckCircle,
  Sparkles,
  Palette,
  Rocket
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function OpenLetter() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isVi = language === "vi";

  const getHeaderStyle = () => {
    switch (theme as any) {
      case "light":
        return "bg-gradient-to-r from-blue-50/95 via-indigo-50/90 to-purple-50/95 border border-slate-200/90 shadow-[0_10px_30px_rgba(59,130,246,0.08)]";
      case "glass-vivid":
        return "bg-gradient-to-r from-violet-950/85 via-indigo-950/80 to-fuchsia-950/80 border-2 border-white/40 shadow-[0_20px_50px_rgba(124,58,237,0.35)] text-white";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white/90 dark:border-slate-800 shadow-[-8px_-8px_20px_rgba(255,255,255,0.95),_8px_8px_24px_rgba(163,177,198,0.45)] dark:shadow-[-6px_-6px_16px_rgba(255,255,255,0.05),_6px_6px_20px_rgba(0,0,0,0.6)]";
      case "clay":
        return "bg-gradient-to-tr from-indigo-700/85 via-purple-700/85 to-pink-700/85 border-2 border-white shadow-[0_20px_40px_rgba(140,150,200,0.35)] text-white";
      case "glass-neon":
      case "glass-neo":
        return "bg-gradient-to-r from-slate-950/95 via-[#0b1026]/95 to-[#160b24]/95 border-2 border-cyan-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.35)] text-cyan-50";
      case "glass":
      default:
        return "bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-purple-500/15 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-purple-600/20 border border-slate-200/60 dark:border-white/10 shadow-sm";
    }
  };

  const getFooterBannerStyle = () => {
    switch (theme as any) {
      case "light":
        return "bg-gradient-to-r from-indigo-50/95 via-sky-50/90 to-blue-50/95 border border-indigo-200/90 shadow-[0_8px_25px_rgba(99,102,241,0.08)]";
      case "glass-vivid":
        return "bg-gradient-to-r from-fuchsia-950/85 via-violet-950/85 to-indigo-950/85 border-2 border-white/40 shadow-[0_16px_40px_rgba(236,72,153,0.35)] text-white";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white/90 dark:border-slate-800 shadow-[-6px_-6px_16px_rgba(255,255,255,0.95),_6px_6px_20px_rgba(163,177,198,0.45)] dark:shadow-[-4px_-4px_12px_rgba(255,255,255,0.05),_4px_4px_16px_rgba(0,0,0,0.6)]";
      case "clay":
        return "bg-gradient-to-tr from-pink-700/85 via-purple-700/85 to-indigo-700/85 border-2 border-white shadow-[0_16px_36px_rgba(140,150,200,0.35)] text-white";
      case "glass-neon":
      case "glass-neo":
        return "bg-gradient-to-r from-slate-950/95 via-[#160b24]/95 to-[#0b1026]/95 border-2 border-fuchsia-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(255,0,128,0.35)] text-cyan-50";
      case "glass":
      default:
        return "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-600/15 dark:via-purple-600/15 dark:to-pink-600/15 border border-slate-200/80 dark:border-white/15 shadow-sm";
    }
  };

  return (
    <section id="letter" className="relative min-h-full flex flex-col justify-center items-center p-[15px] w-full font-['Play',sans-serif] bg-transparent shadow-2xl drop-shadow-xl" style={{ backgroundColor: "transparent" }}>
      {/* ================================================================= */}
      {/* 1. HEADER: THƯ NGỎ (CĂN GIỮA - NỘI DUNG RA NGOÀI KHUNG MAIN)      */}
      {/* ================================================================= */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        <header className={`relative rounded-2xl p-6 sm:p-8 backdrop-blur-xl overflow-hidden transition-all duration-500 flex flex-col items-center text-center ${getHeaderStyle()}`}>
          
          {/* Avatar 3D phong cách Profile căn giữa */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-pink-500 p-[2.5px] shadow-xl shadow-blue-500/25 flex items-center justify-center">
              <div className="w-full h-full rounded-full glass-surface flex items-center justify-center overflow-hidden relative">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600 dark:text-cyan-400 mt-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 dark:from-cyan-400/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Nội dung Thư ngỏ căn giữa */}
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-cyan-400 tracking-wide uppercase">
                {isVi ? "Thư ngỏ" : "Open Letter"}
              </h1>
            </div>

            <p className="text-xs sm:text-[13px] font-medium italic text-slate-600 dark:text-slate-300 mb-3 text-center">
              {isVi ? "“Sứ mệnh của tôi là phụng sự và tạo giá trị thực.”" : "“My mission is to serve and create authentic value.”"}
            </p>

            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 text-center">
              {isVi ? "Kính chào Quý Công ty!" : "Greetings Respected Partners & Companies!"}
            </h2>

            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed text-center max-w-xl mx-auto">
              {isVi ? (
                <>Tôi là <strong className="text-blue-700 dark:text-cyan-400 font-bold">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn <strong className="text-slate-950 dark:text-white font-bold">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng.</>
              ) : (
                <>I am <strong className="text-blue-700 dark:text-cyan-400 font-bold">Nguyen Hung Thai</strong>, Customer Service Manager with over <strong className="text-slate-950 dark:text-white font-bold">22 years of experience</strong> in building, operating, and expanding comprehensive customer service ecosystems.</>
              )}
            </p>
          </div>
        </header>
      </div>

      {/* ================================================================= */}
      {/* 2. HÀNH TRÌNH SỰ NGHIỆP & CỘT MỐC QUẢN TRỊ (GOM CÁC THẺ TIMELINE VÀO THẺ CHUNG) */}
      {/* ================================================================= */}
      <section className="relative my-6 max-w-4xl mx-auto w-full glass-surface backdrop-blur-2xl rounded-[20px] p-5 sm:p-7 shadow-2xl border border-slate-200/80 dark:border-white/15 overflow-hidden transition-all duration-300">
        
        {/* Tiêu đề Section */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <div className="inline-flex items-center justify-center gap-2.5 mb-1 pb-3 border-b border-slate-200/80 dark:border-slate-800/80 w-full">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
              <Rocket className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isVi ? "HÀNH TRÌNH SỰ NGHIỆP & CỘT MỐC QUẢN TRỊ" : "CAREER JOURNEY & MANAGEMENT MILESTONES"}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium mb-2.5">
            {isVi 
              ? "20+ năm kinh nghiệm quản lý dịch vụ và vận hành hệ thống chăm sóc khách hàng đa ngành (2003 – 2023)"
              : "20+ years of management and multi-industry CS operation (2003 – 2023)"}
          </p>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-400/30 shadow-sm backdrop-blur">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {isVi ? "8 Cột Mốc Tiêu Biểu" : "8 Key Milestones"}
            </span>
          </div>
        </div>

        {/* Cấu trúc Timeline 2 Cột Đối Xứng */}
        <div className="relative">
          
          {/* Trục dọc Timeline với hiệu ứng Gradient Neon */}
          <div className="absolute top-[42px] bottom-[46px] left-[20px] md:left-1/2 w-[2px] -translate-x-1/2 md:translate-x-[-50%] bg-gradient-to-b from-purple-500 via-cyan-400 to-pink-500 shadow-sm z-0"></div>

          {/* Danh sách 4 Cặp Cột Mốc */}
          <div className="space-y-6 relative z-10">

              {/* ==================== CẶP 1: 2003 (TÍM) & 2007 (XANH DƯƠNG) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2003/2007 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full glass-surface border-2 border-purple-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 shadow-sm"></div>
                </div>

                {/* MỐC 1 (TRÁI): 2003 - MobiFone (TÍM) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-purple-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-purple-600 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Tím Glass */}
                  <div className="bg-gradient-to-br from-purple-100/75 via-purple-50/60 to-white/70 dark:from-purple-950/45 dark:via-slate-900/75 dark:to-purple-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-purple-200/90 dark:border-purple-500/35 shadow-lg hover:shadow-xl hover:border-purple-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/30">
                          <Radio className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "Chuyên viên Tổng đài CSKH" : "Call Center Specialist"}
                          </h3>
                          {/* Logo MobiFone */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/hxHm9TsZ/Mobifone.png" alt="Mobifone" className="h-4 sm:h-4.5 object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Badge Năm 2003 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold shadow-md shadow-purple-500/30 flex-shrink-0">
                        2003
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Tôi bắt đầu sự nghiệp tại MobiFone, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông. Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ."
                        : "Started in 2003 at MobiFone, mastering telecom service excellence, call center handling, incident recovery, and standard operating procedures."}
                    </p>
                  </div>
                </div>

                {/* MỐC 2 (PHẢI): 2007 - Viễn Liên V247 (XANH DƯƠNG) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-blue-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-blue-600 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Xanh Dương Glass */}
                  <div className="bg-gradient-to-br from-blue-100/75 via-blue-50/60 to-white/70 dark:from-blue-950/45 dark:via-slate-900/75 dark:to-cyan-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-blue-200/90 dark:border-blue-500/35 shadow-lg hover:shadow-xl hover:border-blue-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      {/* Badge Năm 2007 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[11px] font-bold shadow-md shadow-blue-500/30 flex-shrink-0">
                        2007
                      </div>

                      {/* Cụm Icon & Tiêu đề + Logo V247 */}
                      <div className="flex items-start gap-3 flex-row-reverse text-right">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
                          <Users className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "Giám sát Vận hành CSKH" : "CS Operations Supervisor"}
                          </h3>
                          {/* Logo Viễn Liên V247 */}
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/QvtbdnfP/V247.png" alt="V247" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-[11px] font-bold text-slate-800">Viễn Liên V247</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với quy mô lớn và xây dựng các chỉ số đánh giá chất lượng dịch vụ."
                        : "Advanced team supervision, service quality assurance, and operational throughput optimization at Vien Lien V247."}
                    </p>
                  </div>
                </div>

              </div>

              {/* ==================== CẶP 2: 2011 (LỤC BẢO) & 2015 (CAM HỔ PHÁCH) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2011/2015 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full glass-surface border-2 border-emerald-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-sm"></div>
                </div>

                {/* MỐC 3 (TRÁI): 2011 - LBC - HTV Cable (LỤC BẢO) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-emerald-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-emerald-600 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Lục Bảo Glass */}
                  <div className="bg-gradient-to-br from-emerald-100/75 via-emerald-50/60 to-white/70 dark:from-emerald-950/45 dark:via-slate-900/75 dark:to-teal-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-emerald-200/90 dark:border-emerald-500/35 shadow-lg hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/30">
                          <Monitor className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "Trưởng phòng CSKH" : "Customer Service Manager"}
                          </h3>
                          {/* Logo LBC & HTVC */}
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/tpG5fMrt/LBC.png" alt="LBC" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-[10px] text-slate-600 dark:text-slate-300">|</span>
                              <img src="https://i.ibb.co/1fNw0hBq/HTVC.png" alt="HTVC" className="h-4 sm:h-4.5 object-contain" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">LBC – HTV Cable</span>
                          </div>
                        </div>
                      </div>
                      {/* Badge Năm 2011 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold shadow-md shadow-emerald-500/30 flex-shrink-0">
                        2011
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng. Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một nhà quản trị toàn diện. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập hệ thống KPI, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy quản trị hệ thống và phát triển con người song song với mục tiêu kinh doanh."
                        : "First tenure as Head of CS: transitioning from operations manager to full executive leadership—building workflows, setting KPIs, and elevating CX."}
                    </p>
                  </div>
                </div>

                {/* MỐC 4 (PHẢI): 2015 - Shopee / AirPay (CAM HỔ PHÁCH) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-amber-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-orange-500 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Cam Hổ Phách Glass */}
                  <div className="bg-gradient-to-br from-amber-100/75 via-amber-50/60 to-white/70 dark:from-amber-950/45 dark:via-slate-900/75 dark:to-orange-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-amber-200/90 dark:border-amber-500/35 shadow-lg hover:shadow-xl hover:border-amber-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      {/* Badge Năm 2015 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold shadow-md shadow-orange-500/30 flex-shrink-0">
                        2015
                      </div>

                      {/* Cụm Icon & Tiêu đề + Logo Shopee & ShopeePay/AirPay */}
                      <div className="flex items-start gap-3 flex-row-reverse text-right">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/30">
                          <ShoppingCart className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "CS & Operations Lead" : "CS & Operations Lead"}
                          </h3>
                          {/* Logo Shopee & ShopeePay */}
                          <div className="flex items-center justify-end gap-1.5 mt-1 flex-wrap">
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/BSVS4xf/Shopee.png" alt="Shopee" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-[10px] text-slate-600 dark:text-slate-300">/</span>
                              <img src="https://i.ibb.co/LdYv3TJy/Shopee-Paye.png" alt="ShopeePay / AirPay" className="h-4 sm:h-4.5 object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Đặc biệt, việc tham gia vào giai đoạn phát triển ban đầu của Shopee giúp tôi tiếp cận tư duy quản trị thương mại điện tử hiện đại, từ hành trình khách hàng, trải nghiệm đa kênh, vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động. Tại Garena, tôi trực tiếp quản lý 129 nhân sự, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, thiết lập hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa. Làm việc trong môi trường tăng trưởng với tốc độ rất cao giúp tôi rèn luyện khả năng ra quyết định dưới áp lực, xử lý nhanh các tình huống phát sinh, điều phối nguồn lực hiệu quả và liên tục cải tiến quy trình để đáp ứng sự thay đổi của thị trường. Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: xây dựng hệ thống trước khi mở rộng quy mô, phát triển con người song hành cùng công nghệ và luôn lấy khách hàng làm trung tâm trong mọi quyết định."
                        : "Pioneered customer experience models in e-commerce and digital payments with customer-centric focus."}
                    </p>
                  </div>
                </div>

              </div>

              {/* ==================== CẶP 3: 2013 (ĐỎ HỒNG) & 2016 (CHÀM TÍM) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2013/2016 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full glass-surface border-2 border-rose-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 dark:bg-rose-400 shadow-sm"></div>
                </div>

                {/* MỐC 5 (TRÁI): 2013 - Garena & VED (ĐỎ HỒNG) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-rose-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-rose-500 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Đỏ Hồng Gaming Glass */}
                  <div className="bg-gradient-to-br from-rose-100/75 via-rose-50/60 to-white/70 dark:from-rose-950/45 dark:via-slate-900/75 dark:to-pink-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-rose-200/90 dark:border-rose-500/35 shadow-lg hover:shadow-xl hover:border-rose-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-rose-500/30">
                          <Gamepad2 className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "Head of Customer Support" : "Head of Customer Support"}
                          </h3>
                          {/* Logo Garena, VED & GCafe */}
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/h1Md65yV/Garena.png" alt="Garena" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-[10px] text-slate-600 dark:text-slate-300">|</span>
                              <img src="https://i.ibb.co/fYPJLfbw/VED.png" alt="VED" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-[10px] text-slate-600 dark:text-slate-300">|</span>
                              <img src="https://i.ibb.co/FkWk3s4W/GCafe.png" alt="GCafe" className="h-3.5 sm:h-4 object-contain" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200">Garena / VED</span>
                          </div>
                        </div>
                      </div>
                      {/* Badge Năm 2013 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[11px] font-bold shadow-md shadow-rose-500/30 flex-shrink-0">
                        2013
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn. Trong thời gian này, Garena phát triển mạnh với Liên Minh Huyền Thoại, đồng thời mở rộng thành Vietnam eSport và đầu tư vào nhiều lĩnh vực mới như Shopee, AirPay, Gcafe và Liên Quân Mobile. Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi sản phẩm đều có mô hình vận hành, hành vi người dùng và kỳ vọng khách hàng khác nhau, buộc tôi phải liên tục học hỏi, thích nghi và cập nhật kiến thức để xây dựng các quy trình chăm sóc khách hàng phù hợp với từng lĩnh vực."
                        : "Led high-scale eSports & gaming customer support, optimizing speed, precision, and peak volume handling."}
                    </p>
                  </div>
                </div>

                {/* MỐC 6 (PHẢI): 2016 - Prudential (CHÀM TÍM) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-indigo-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-indigo-600 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Chàm Tím Glass */}
                  <div className="bg-gradient-to-br from-indigo-100/75 via-indigo-50/60 to-white/70 dark:from-indigo-950/45 dark:via-slate-900/75 dark:to-purple-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-indigo-200/90 dark:border-indigo-500/35 shadow-lg hover:shadow-xl hover:border-indigo-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      {/* Badge Năm 2016 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold shadow-md shadow-purple-500/30 flex-shrink-0">
                        2016
                      </div>

                      {/* Cụm Icon & Tiêu đề + Logo Prudential */}
                      <div className="flex items-start gap-3 flex-row-reverse text-right">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/30">
                          <Shield className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "Quality & Project Manager" : "Quality & Project Manager"}
                          </h3>
                          {/* Logo Prudential */}
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/XfpQphWF/Prudential.png" alt="Prudential" className="h-4 sm:h-4.5 object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Tại Prudential, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự đồng cảm trong từng điểm chạm với khách hàng."
                        : "Mastered life insurance CX rigor: high precision, strict compliance, transparency, and absolute customer trust."}
                    </p>
                  </div>
                </div>

              </div>

              {/* ==================== CẶP 4: 2018 (HỒNG FINTECH) & 2023 (CYAN CÔNG NGHỆ) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2018/2023 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full glass-surface border-2 border-pink-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 dark:bg-pink-400 shadow-sm"></div>
                </div>

                {/* MỐC 7 (TRÁI): 2018 - MoMo (HỒNG FINTECH) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-pink-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-pink-500 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Hồng MoMo Glass */}
                  <div className="bg-gradient-to-br from-pink-100/75 via-pink-50/60 to-white/70 dark:from-pink-950/45 dark:via-slate-900/75 dark:to-rose-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-pink-200/90 dark:border-pink-500/35 shadow-lg hover:shadow-xl hover:border-pink-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/30 overflow-hidden p-1">
                          <img src="https://i.ibb.co/k2QtrgTw/Momo.png" alt="MoMo" className="w-full h-full object-contain rounded" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "FinTech CS Manager" : "FinTech CS Manager"}
                          </h3>
                          {/* Logo MoMo */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/k2QtrgTw/Momo.png" alt="MoMo" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-xs font-bold text-pink-600">MoMo</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Badge Năm 2018 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[11px] font-bold shadow-md shadow-pink-500/30 flex-shrink-0">
                        2018
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số. Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số."
                        : "Expanded fintech CS capabilities, streamlining support procedures and elevating operational efficiency on modern technology platforms."}
                    </p>
                  </div>
                </div>

                {/* MỐC 8 (PHẢI): 2023 - VI ECO / Finviet (CYAN CÔNG NGHỆ) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-cyan-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-sky-500 border-2 border-slate-200 dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Cyan Glass */}
                  <div className="bg-gradient-to-br from-cyan-100/75 via-cyan-50/60 to-white/70 dark:from-cyan-950/45 dark:via-slate-900/75 dark:to-sky-900/30 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-cyan-200/90 dark:border-cyan-500/35 shadow-lg hover:shadow-xl hover:border-cyan-400/80 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      {/* Badge Năm 2023 */}
                      <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[11px] font-bold shadow-md shadow-cyan-500/30 flex-shrink-0">
                        2023
                      </div>

                      {/* Cụm Icon & Tiêu đề + Logo Finviet / VI ECO */}
                      <div className="flex items-start gap-3 flex-row-reverse text-right">
                        <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-cyan-500/30">
                          <Smartphone className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {isVi ? "Operations & CS Advisor" : "Operations & CS Advisor"}
                          </h3>
                          {/* Logo Finviet / VI ECO */}
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-white/95 border border-slate-200/80 shadow-xs">
                              <img src="https://i.ibb.co/7NtSSz4d/Finviet.png" alt="Finviet" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-xs font-bold text-blue-700">VI ECO / Finviet</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Tại Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng."
                        : "Consulted and structured financial tech services where accuracy, transparency, and consumer trust are mission-critical."}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      {/* ================================================================= */}
      {/* 3. TRỤ CỘT NGUYÊN TẮC & ĐÀO TẠO ĐỘI NGŨ                            */}
      {/* ================================================================= */}
      <div className="max-w-4xl mx-auto w-full space-y-5 my-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          
          {/* Khối Trái: 3 Trụ Cột Cốt Lõi */}
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30 shrink-0">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-100">
                {isVi ? "Tôi luôn làm việc dựa trên 3 trụ cột nguyên tắc cốt lõi:" : "I work based on 3 core principle pillars:"}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* QUY TRÌNH */}
              <div className="bg-gradient-to-b from-blue-500/20 to-blue-500/5 dark:from-blue-600/30 dark:to-blue-600/10 rounded-xl p-3 text-center border border-blue-400/30 backdrop-blur-md flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-2 shadow-md shadow-blue-500/30">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-wide">{isVi ? "QUY TRÌNH" : "PROCESS"}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">{isVi ? "tạo nền tảng." : "builds baseline."}</span>
              </div>

              {/* CON NGƯỜI */}
              <div className="bg-gradient-to-b from-orange-500/20 to-orange-500/5 dark:from-orange-600/30 dark:to-orange-600/10 rounded-xl p-3 text-center border border-orange-400/30 backdrop-blur-md flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-2 shadow-md shadow-orange-500/30">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-wide">{isVi ? "CON NGƯỜI" : "PEOPLE"}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">{isVi ? "tạo giá trị." : "creates value."}</span>
              </div>

              {/* CÔNG NGHỆ */}
              <div className="bg-gradient-to-b from-purple-500/20 to-purple-500/5 dark:from-purple-600/30 dark:to-purple-600/10 rounded-xl p-3 text-center border border-purple-400/30 backdrop-blur-md flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-2 shadow-md shadow-purple-500/30">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-wide">{isVi ? "CÔNG NGHỆ" : "TECHNOLOGY"}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">{isVi ? "tạo đòn bẩy." : "drives leverage."}</span>
              </div>
            </div>
          </div>

          {/* Khối Phải: Đào Tạo Đội Ngũ */}
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                <Users className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-100">
                {isVi ? "Bên cạnh công nghệ, tôi luôn xem con người là yếu tố quyết định. Tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến trải nghiệm vượt mong đợi:" : "Alongside tech, I champion human talent development:"}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* HIỆU QUẢ */}
              <div className="bg-gradient-to-b from-cyan-500/20 to-cyan-500/5 dark:from-cyan-600/30 dark:to-cyan-600/10 rounded-xl p-3 text-center border border-cyan-400/30 backdrop-blur-md flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center mb-2 shadow-md shadow-cyan-500/30">
                  <Volume2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-wide">{isVi ? "HIỆU QUẢ" : "EFFICIENCY"}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-tight">{isVi ? <>Tối ưu &<br/>đo lường</> : <>Optimized &<br/>measured</>}</span>
              </div>

              {/* NHÂN VĂN */}
              <div className="bg-gradient-to-b from-pink-500/20 to-pink-500/5 dark:from-pink-600/30 dark:to-pink-600/10 rounded-xl p-3 text-center border border-pink-400/30 backdrop-blur-md flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center mb-2 shadow-md shadow-pink-500/30">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-wide">{isVi ? "NHÂN VĂN" : "HUMANITY"}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-tight">{isVi ? <>Thấu hiểu<br/>& đồng cảm</> : <>Empathy &<br/>insight</>}</span>
              </div>

              {/* BỀN VỮNG */}
              <div className="bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 dark:from-emerald-600/30 dark:to-emerald-600/10 rounded-xl p-3 text-center border border-emerald-400/30 backdrop-blur-md flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-md shadow-emerald-500/30">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white tracking-wide">{isVi ? "BỀN VỮNG" : "SUSTAINABLE"}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-tight">{isVi ? <>Gắn kết &<br/>đồng hành</> : <>Commitment<br/>& longevity</>}</span>
              </div>
            </div>
          </div>

        </section>

        {/* ================================================================= */}
        {/* 4. GIẢI PHÁP CÔNG NGHỆ & LỜI KẾT + CHỮ KÝ                          */}
        {/* ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mb-5">
          
          {/* Khối Trái: Giải Pháp Công Nghệ & Tự Động Hóa */}
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-blue-800 dark:text-cyan-300">
                    {isVi ? "Giải Pháp Công Nghệ & Tự Động Hóa" : "Tech Solutions & Automation"}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm">
                  AI & CRM 24/7
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3.5 text-justify">
                {isVi
                  ? <>Từ những nguyên tắc đó, tôi tập trung xây dựng các hệ thống <strong className="text-slate-950 dark:text-white font-bold">CRM, Dashboard quản trị, AI Chatbot</strong> cùng các <strong className="text-slate-950 dark:text-white font-bold">giải pháp tự động hóa</strong> nhằm nâng cao hiệu quả vận hành.</>
                  : <>From these principles, I focus on building <strong className="text-slate-950 dark:text-white font-bold">CRM, Executive Dashboards, AI Chatbots</strong> and automated workflows to optimize operations.</>}
              </p>

              {/* 3 Thẻ Công Nghệ */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-xl p-2 text-center border border-blue-400/30 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-1 shadow-md shadow-blue-500/30">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">CRM Omni</span>
                </div>
                <div className="bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl p-2 text-center border border-indigo-400/30 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-1 shadow-md shadow-indigo-500/30">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Dashboard</span>
                </div>
                <div className="bg-purple-500/10 dark:bg-purple-500/20 rounded-xl p-2 text-center border border-purple-400/30 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-1 shadow-md shadow-purple-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">AI Chatbot</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200/60 dark:border-white/10">
              <span className="text-amber-500 text-sm">⭐</span>
              <span>{isVi ? "Tối ưu hóa nguồn lực & Nâng cao CSAT toàn diện" : "Resource optimization & holistic CSAT uplift"}</span>
            </div>
          </div>

          {/* Khối Phải: Lời Kết & Chữ Ký */}
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
              <p className="text-[11px] sm:text-xs text-rose-600 dark:text-pink-400 leading-relaxed text-center mb-4 font-bold italic">
                {isVi
                  ? <>"Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời."</>
                  : <>"Customer satisfaction does not come from perfection, but from timely empathy."</>}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify mb-3">
                {isVi
                  ? <>Tôi mong muốn được đồng hành cùng Quý Công ty để xây dựng một hệ thống chăm sóc khách hàng hiện đại, lấy khách hàng làm trung tâm, tối ưu hiệu quả vận hành và tạo ra <strong className="text-blue-700 dark:text-cyan-400 font-bold">giá trị phát triển bền vững</strong>.</>
                  : <>I look forward to partnering with your Company to build a modern, customer-centric support ecosystem, maximizing operational efficiency and driving long-term sustainable growth.</>}
              </p>

              <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white mb-2">
                {isVi ? "Xin trân trọng cảm ơn Quý Công ty đã dành thời gian lắng nghe!" : "Thank you sincerely for your time and consideration!"}
              </p>
            </div>

            {/* Khối Chữ Ký Chuẩn */}
            <div className="flex items-end justify-end pt-1 relative">
              {/* Các chấm tròn màu trang trí */}
              <div className="absolute bottom-6 right-28 w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
              <div className="absolute bottom-10 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400"></div>

              <div className="text-right z-10">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-0.5">
                  {isVi ? "Trân trọng," : "Sincerely,"}
                </span>
                
                {/* Chữ ký vector */}
                <div className="inline-block py-0.5">
                  <svg className="w-28 h-10 text-blue-700 dark:text-cyan-400 inline-block" viewBox="0 0 160 50" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10,38 C25,10 35,5 45,28 C55,42 60,15 75,20 C85,25 90,38 100,22 C110,10 120,38 145,22" />
                    <path d="M38,24 L120,26" strokeWidth="1.5" />
                    <path d="M68,6 L68,40" strokeWidth="2" />
                  </svg>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-blue-800 dark:text-cyan-300 tracking-wide">
                  Nguyễn Hùng Thái
                </h4>
              </div>
            </div>
          </div>

        </section>

        {/* ================================================================= */}
        {/* 5. BANNER DƯỚI: TRIẾT LÝ HÀNH ĐỘNG                                */}
        {/* ================================================================= */}
        <footer className={`relative backdrop-blur-xl rounded-2xl p-4 sm:p-5 transition-all duration-500 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 ${getFooterBannerStyle()}`}>
          
          {/* Mascot Robot CSKH 3D Bên Trái */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl glass-surface flex items-center justify-center relative overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <Headset className="w-5 h-5" />
                  </div>
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-200 dark:border-slate-900"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-2 glass-surface px-1.5 py-0.5 rounded-full shadow text-[9px] font-bold text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-white/10">
                💬
              </div>
            </div>
          </div>

          {/* Nội dung Triết Lý Hành Động Ở Giữa */}
          <div className="text-center flex-grow px-2">
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/80 dark:bg-slate-800/80 text-blue-800 dark:text-cyan-300 shadow-sm border border-slate-200/60 dark:border-white/10 mb-1.5">
              <span className="text-amber-500 text-xs">⭐</span>
              {isVi ? "TRIẾT LÝ HÀNH ĐỘNG" : "ACTION PHILOSOPHY"}
            </div>

            <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-slate-100 mb-0.5 leading-snug">
              {isVi ? (
                <>“Chăm sóc khách hàng không chỉ là giải quyết vấn đề,<br className="hidden sm:inline"/> mà còn là xây dựng một hệ thống giúp doanh nghiệp <span className="text-blue-700 dark:text-cyan-400 font-bold">phát triển bền vững</span>.”</>
              ) : (
                <>“Customer service is not just about resolving issues,<br className="hidden sm:inline"/> but constructing an ecosystem enabling enterprises to <span className="text-blue-700 dark:text-cyan-400 font-bold">grow sustainably</span>.”</>
              )}
            </p>

            <p className="text-[10px] sm:text-[11px] text-rose-600 dark:text-pink-400 font-semibold flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              {isVi ? "Lấy khách hàng làm trọng tâm – Vận hành chuẩn mực – Giá trị bền vững" : "Customer-Centric – Standardized Operations – Sustainable Value"}
            </p>
          </div>

          {/* Biểu Đồ Cột Tăng Trưởng 3D Bên Phải */}
          <div className="flex-shrink-0 hidden sm:flex items-end gap-1.5 h-12 px-1 relative">
            <div className="w-2 h-4 rounded-t bg-rose-400 shadow-sm"></div>
            <div className="w-2 h-6 rounded-t bg-amber-400 shadow-sm"></div>
            <div className="w-2 h-8 rounded-t bg-cyan-400 shadow-sm"></div>
            <div className="w-2 h-10 rounded-t bg-emerald-500 shadow-sm"></div>
            <div className="w-2.5 h-12 rounded-t bg-blue-600 shadow-md"></div>
            <svg className="absolute -top-1 left-0 w-16 h-12 text-purple-600 dark:text-purple-400 pointer-events-none" viewBox="0 0 60 40" fill="none">
              <path d="M2 36 Q 30 20, 58 4" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2"/>
              <circle cx="58" cy="4" r="2" fill="currentColor"/>
            </svg>
          </div>

        </footer>

      </div>

    </section>
  );
}
