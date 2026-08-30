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
import WebsiteGradientIcon from "./WebsiteGradientIcon";
import { PageBanner } from "./PageBanner";
import { motion } from "motion/react";

export default function OpenLetter() {
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <section id="letter" className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full px-3 sm:px-6 py-4 sm:py-5 overflow-x-hidden">

      {/* ================= 1. HEADER BANNER ================= */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-[12px] w-full"
      >
        <PageBanner
          title={isVi ? "Thư ngỏ" : "Open Letter"}
          subtitle={isVi 
            ? "Sứ mệnh của tôi là phụng sự và tạo giá trị thực." 
            : "My mission is to serve and create authentic value."
          }
          tag={isVi ? "KÍNH CHÀO QUÝ CÔNG TY!" : "GREETINGS RESPECTED PARTNERS!"}
          iconType="letter"
          gradient="from-blue-950 via-indigo-950 to-purple-950"
        />
      </motion.div>

            {/* ================= 2. MASONRY LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* CỘT TRÁI */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col gap-6 w-full lg:col-span-7 min-w-0"
        >
          {/* Main Content Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[20px] p-[15px] sm:p-6 md:p-8 shadow-2xl border border-white/80 dark:border-white/15 relative overflow-hidden transition-all duration-300">
        {/* Quả cầu ánh sáng 3D Gradient động phong cách Glass UI */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-400/40 via-blue-500/30 to-purple-500/40 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-12 w-52 h-52 rounded-full bg-gradient-to-tr from-pink-500/30 via-purple-500/25 to-indigo-500/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 right-1/4 w-44 h-44 rounded-full bg-gradient-to-tr from-emerald-400/30 via-cyan-400/20 to-blue-500/30 blur-3xl pointer-events-none"></div>
        
        {/* Hạt ngọc phát sáng mini nổi góc trên bên phải */}
        <div className="absolute top-6 right-36 w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50 opacity-90 pointer-events-none animate-pulse"></div>
        <div className="absolute top-12 right-24 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-lg shadow-amber-500/50 opacity-90 pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 shadow-lg shadow-purple-500/50 opacity-80 pointer-events-none"></div>
        <div className="absolute top-24 right-20 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 opacity-80 pointer-events-none"></div>
{/* Nội dung giới thiệu ban đầu */}
        <div className="relative z-10 mb-8 bg-blue-50/50 dark:bg-slate-800/50 rounded-xl p-5 border border-blue-100 dark:border-slate-700">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            {isVi ? (
              <>Tôi là <strong className="text-blue-700 dark:text-cyan-400 font-bold">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn <strong className="text-slate-950 dark:text-white font-bold">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển dịch vụ khách hàng toàn diện.</>
            ) : (
              <>I am <strong className="text-blue-700 dark:text-cyan-400 font-bold">Nguyen Hung Thai</strong>, Customer Service Manager with over <strong className="text-slate-950 dark:text-white font-bold">22 years of experience</strong> in building, operating, and expanding comprehensive customer service ecosystems.</>
            )}
          </p>
        </div>

        
{/* ================================================================= */}
        {/* 2. HÀNH TRÌNH SỰ NGHIỆP & CỘT MỐC QUẢN TRỊ                        */}
        {/* ================================================================= */}
        <div className="relative mb-4">
          
          {/* Tiêu đề Section */}
          <div className="text-center max-w-2xl mx-auto mb-7">
            <div className="inline-flex items-center justify-center gap-2 mb-1">
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
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-purple-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 shadow-sm"></div>
                </div>

                {/* MỐC 1 (TRÁI): 2003 - MobiFone (TÍM) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-purple-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-purple-600 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Tím Glass */}
                  <div className="bg-gradient-to-br from-purple-100/75 via-purple-50/60 to-white/70 dark:from-purple-950/45 dark:via-slate-900/75 dark:to-purple-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-purple-200/90 dark:border-purple-500/35 shadow-lg hover:shadow-xl hover:border-purple-400/80 transition-all duration-300">
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
                        ? "Bắt đầu sự nghiệp từ năm 2003 tại MobiFone, nơi tôi được đào tạo nền tảng về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn viễn thông."
                        : "Started in 2003 at MobiFone, mastering telecom service excellence, call center handling, incident recovery, and standard operating procedures."}
                    </p>
                  </div>
                </div>

                {/* MỐC 2 (PHẢI): 2007 - Viễn Liên V247 (XANH DƯƠNG) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-blue-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Xanh Dương Glass */}
                  <div className="bg-gradient-to-br from-blue-100/75 via-blue-50/60 to-white/70 dark:from-blue-950/45 dark:via-slate-900/75 dark:to-cyan-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-blue-200/90 dark:border-blue-500/35 shadow-lg hover:shadow-xl hover:border-blue-400/80 transition-all duration-300">
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
                        ? "Tiếp đó, tại Viễn Liên V247, tôi phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng."
                        : "Advanced team supervision, service quality assurance, and operational throughput optimization at Vien Lien V247."}
                    </p>
                  </div>
                </div>

              </div>

              {/* ==================== CẶP 2: 2011 (LỤC BẢO) & 2015 (CAM HỔ PHÁCH) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2011/2015 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-sm"></div>
                </div>

                {/* MỐC 3 (TRÁI): 2011 - LBC - HTV Cable (LỤC BẢO) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-emerald-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Lục Bảo Glass */}
                  <div className="bg-gradient-to-br from-emerald-100/75 via-emerald-50/60 to-white/70 dark:from-emerald-950/45 dark:via-slate-900/75 dark:to-teal-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-emerald-200/90 dark:border-emerald-500/35 shadow-lg hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300">
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
                              <span className="text-[10px] text-slate-300">|</span>
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
                        ? "Lần đầu tiên đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng. Đây là giai đoạn giúp tôi chuyển mình từ một nhà quản lý vận hành sang một nhà quản trị toàn diện: xây dựng quy trình, phát triển đội ngũ, thiết lập KPI và tối ưu trải nghiệm khách hàng."
                        : "First tenure as Head of CS: transitioning from operations manager to full executive leadership—building workflows, setting KPIs, and elevating CX."}
                    </p>
                  </div>
                </div>

                {/* MỐC 4 (PHẢI): 2015 - Shopee / AirPay (CAM HỔ PHÁCH) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-amber-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-orange-500 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Cam Hổ Phách Glass */}
                  <div className="bg-gradient-to-br from-amber-100/75 via-amber-50/60 to-white/70 dark:from-amber-950/45 dark:via-slate-900/75 dark:to-orange-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-amber-200/90 dark:border-amber-500/35 shadow-lg hover:shadow-xl hover:border-amber-400/80 transition-all duration-300">
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
                              <span className="text-[10px] text-slate-300">/</span>
                              <img src="https://i.ibb.co/LdYv3TJy/Shopee-Paye.png" alt="ShopeePay / AirPay" className="h-4 sm:h-4.5 object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      {isVi
                        ? "Tham gia xây dựng trải nghiệm khách hàng trong lĩnh vực thương mại điện tử và thanh toán số, với định hướng lấy khách hàng làm trung tâm."
                        : "Pioneered customer experience models in e-commerce and digital payments with customer-centric focus."}
                    </p>
                  </div>
                </div>

              </div>

              {/* ==================== CẶP 3: 2013 (ĐỎ HỒNG) & 2016 (CHÀM TÍM) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2013/2016 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-rose-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 dark:bg-rose-400 shadow-sm"></div>
                </div>

                {/* MỐC 5 (TRÁI): 2013 - Garena & VED (ĐỎ HỒNG) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-rose-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Đỏ Hồng Gaming Glass */}
                  <div className="bg-gradient-to-br from-rose-100/75 via-rose-50/60 to-white/70 dark:from-rose-950/45 dark:via-slate-900/75 dark:to-pink-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-rose-200/90 dark:border-rose-500/35 shadow-lg hover:shadow-xl hover:border-rose-400/80 transition-all duration-300">
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
                              <span className="text-[10px] text-slate-300">|</span>
                              <img src="https://i.ibb.co/fYPJLfbw/VED.png" alt="VED" className="h-4 sm:h-4.5 object-contain" />
                              <span className="text-[10px] text-slate-300">|</span>
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
                        ? "Quản lý hoạt động chăm sóc khách hàng trong lĩnh vực eSports & game, đội ngũ tốc độ xử lý nhanh, chính xác và khả năng đáp ứng khối lượng khách hàng cực lớn."
                        : "Led high-scale eSports & gaming customer support, optimizing speed, precision, and peak volume handling."}
                    </p>
                  </div>
                </div>

                {/* MỐC 6 (PHẢI): 2016 - Prudential (CHÀM TÍM) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-indigo-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Chàm Tím Glass */}
                  <div className="bg-gradient-to-br from-indigo-100/75 via-indigo-50/60 to-white/70 dark:from-indigo-950/45 dark:via-slate-900/75 dark:to-purple-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-indigo-200/90 dark:border-indigo-500/35 shadow-lg hover:shadow-xl hover:border-indigo-400/80 transition-all duration-300">
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
                        ? "Hiểu sâu sắc về trải nghiệm khách hàng ngành Bảo hiểm nhân thọ, đòi hỏi sự chính xác, minh bạch và củng cố niềm tin tuyệt đối."
                        : "Mastered life insurance CX rigor: high precision, strict compliance, transparency, and absolute customer trust."}
                    </p>
                  </div>
                </div>

              </div>

              {/* ==================== CẶP 4: 2018 (HỒNG FINTECH) & 2023 (CYAN CÔNG NGHỆ) ==================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Node trung tâm 2018/2023 */}
                <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-pink-500 items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 dark:bg-pink-400 shadow-sm"></div>
                </div>

                {/* MỐC 7 (TRÁI): 2018 - MoMo (HỒNG FINTECH) */}
                <div className="relative pl-10 md:pl-0 md:pr-6">
                  <div className="hidden md:block absolute right-0 top-10 w-6 h-[2px] bg-gradient-to-r from-transparent to-pink-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-pink-500 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Hồng MoMo Glass */}
                  <div className="bg-gradient-to-br from-pink-100/75 via-pink-50/60 to-white/70 dark:from-pink-950/45 dark:via-slate-900/75 dark:to-rose-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-pink-200/90 dark:border-pink-500/35 shadow-lg hover:shadow-xl hover:border-pink-400/80 transition-all duration-300">
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
                        ? "Mở rộng kinh nghiệm trong lĩnh vực dịch vụ tài chính số, tối ưu quy trình hỗ trợ khách hàng và nâng cao hiệu quả vận hành trên nền tảng công nghệ."
                        : "Expanded fintech CS capabilities, streamlining support procedures and elevating operational efficiency on modern technology platforms."}
                    </p>
                  </div>
                </div>

                {/* MỐC 8 (PHẢI): 2023 - VI ECO / Finviet (CYAN CÔNG NGHỆ) */}
                <div className="relative pl-10 md:pl-6">
                  <div className="hidden md:block absolute left-0 top-10 w-6 h-[2px] bg-gradient-to-l from-transparent to-cyan-400"></div>
                  <div className="md:hidden absolute left-[11px] top-6 w-4 h-4 rounded-full bg-sky-500 border-2 border-white dark:border-slate-900 z-20"></div>

                  {/* Thẻ Kính Cyan Glass */}
                  <div className="bg-gradient-to-br from-cyan-100/75 via-cyan-50/60 to-white/70 dark:from-cyan-950/45 dark:via-slate-900/75 dark:to-sky-900/30 backdrop-blur-xl rounded-2xl p-[15px] border border-cyan-200/90 dark:border-cyan-500/35 shadow-lg hover:shadow-xl hover:border-cyan-400/80 transition-all duration-300">
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
                        ? "Hiểu sâu hơn về trải nghiệm khách hàng trong lĩnh vực tài chính, nơi sự chính xác, minh bạch và niềm tin luôn được đặt lên hàng đầu."
                        : "Consulted and structured financial tech services where accuracy, transparency, and consumer trust are mission-critical."}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

          </div>

{/* ================================================================= */}
        {/* 5. BANNER DƯỚI: TRIẾT LÝ HÀNH ĐỘNG                                */}
        {/* ================================================================= */}
        <footer className="relative bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-purple-500/20 dark:from-blue-600/30 dark:via-indigo-600/20 dark:to-purple-600/30 backdrop-blur-xl rounded-2xl p-[15px] border border-white/80 dark:border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Mascot Robot CSKH 3D Bên Trái */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <Headset className="w-5 h-5" />
                  </div>
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-2 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded-full shadow text-[9px] font-bold text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-white/10">
                💬
              </div>
            </div>
          </div>

          {/* Nội dung Triết Lý Hành Động Ở Giữa */}
          <div className="text-center flex-grow px-2">
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/80 dark:bg-slate-800/80 text-blue-800 dark:text-cyan-300 shadow-sm border border-white/60 dark:border-white/10 mb-1.5">
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

      
        </motion.div>

        {/* CỘT PHẢI */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-6 w-full lg:col-span-5 min-w-0"
        >
{/* ================================================================= */}
        {/* 3. TRỤ CỘT NGUYÊN TẮC & ĐÀO TẠO ĐỘI NGŨ                            */}
        {/* ================================================================= */}
        
          
          {/* Khối Trái: 3 Trụ Cột Cốt Lõi */}
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-[15px] border border-white/80 dark:border-white/10 shadow-lg">
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
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-[15px] border border-white/80 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                <Users className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-100">
                {isVi ? "Bên cạnh công nghệ, tôi luôn chú trọng đào tạo đội ngũ:" : "Alongside tech, I champion human talent development:"}
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

        
{/* ================================================================= */}
        {/* 4. GIẢI PHÁP CÔNG NGHỆ & LỜI KẾT + CHỮ KÝ                          */}
        {/* ================================================================= */}
        
          
          {/* Khối Trái: Giải Pháp Công Nghệ & Tự Động Hóa */}
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-[15px] border border-white/80 dark:border-white/10 shadow-lg flex flex-col justify-between">
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
          <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-[15px] border border-white/80 dark:border-white/10 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
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

        
        </motion.div>

      </div>
    </section>
  );
}