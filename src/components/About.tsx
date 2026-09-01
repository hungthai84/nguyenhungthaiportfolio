import React, { useState, useEffect, useRef } from "react";
import { 
  User, Mail, Phone, MapPin, Linkedin, Clock, Award, 
  Settings, Headphones, Users, BarChart3, 
  Play, Pause, Volume2, VolumeX, Maximize, 
  Heart, Cpu, TrendingUp, Trophy, Star, Check, 
  Sparkles, ShieldCheck, Zap, Layers, FileText, Briefcase, ArrowRight,
  Calendar, Globe, CheckCircle2, Sliders, Bot, UserCheck, Copy, CheckCheck,
  ExternalLink, MessageSquare, Download, Share2, Compass, Award as CogIcon, Atom
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { PageBanner } from "./PageBanner";
import { cn } from "../lib/utils";

// Video/Profile Assets
const DEMO_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const PROFESSIONAL_AVATAR = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600";

export default function About() {
  const { lang } = useLanguage();
  const isVi = lang === 'vi';

  // Video State Management
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(105); // 1:45
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const togglePlayVideo = () => {
    playUiSound("click");
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    playUiSound("click");
    const nextMute = !isVideoAudioOn;
    setIsVideoAudioOn(nextMute);
    if (videoRef.current) {
      videoRef.current.muted = !nextMute;
    }
  };

  const handleFullscreen = () => {
    playUiSound("click");
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    playUiSound("success");
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Personal Info Data (Matching the exact list in Column 3 of the Image)
  const personalInfoList = [
    {
      id: "name",
      icon: User,
      iconBg: "bg-purple-500",
      label: isVi ? "Họ và tên" : "Full Name",
      value: "Nguyễn Hùng Thái",
      copyable: true
    },
    {
      id: "title",
      icon: Award,
      iconBg: "bg-amber-500",
      label: isVi ? "Chức danh" : "Title",
      value: "Trưởng phòng Chăm sóc Khách hàng",
      copyable: true
    },
    {
      id: "exp",
      icon: Clock,
      iconBg: "bg-emerald-500",
      label: isVi ? "Kinh nghiệm" : "Experience",
      value: "22+ năm trong lĩnh vực CSKH",
      copyable: false
    },
    {
      id: "email",
      icon: Mail,
      iconBg: "bg-blue-500",
      label: "Email",
      value: "thai.hung.cs@gmail.com",
      href: "mailto:thai.hung.cs@gmail.com",
      copyable: true
    },
    {
      id: "phone",
      icon: Phone,
      iconBg: "bg-blue-600",
      label: isVi ? "Số điện thoại" : "Phone Number",
      value: "0912 345 678",
      href: "tel:0912345678",
      copyable: true
    },
    {
      id: "linkedin",
      icon: Linkedin,
      iconBg: "bg-[#0a66c2]",
      label: "LinkedIn",
      value: "linkedin.com/in/nguyenhungthai",
      href: "https://www.linkedin.com/in/nguyenhungthai",
      copyable: true
    },
    {
      id: "address",
      icon: MapPin,
      iconBg: "bg-rose-500",
      label: isVi ? "Địa chỉ" : "Address",
      value: "Ho Chi Minh City, Vietnam",
      copyable: false
    }
  ];

  // Areas of Expertise (8 standard skills from the image)
  const expertiseSkills = [
    { title: "Customer Experience Strategy", sub: isVi ? "Chiến lược Trải nghiệm Khách hàng" : "CX Strategy & Journey Mapping", color: "text-blue-500" },
    { title: "CRM & Customer Data", sub: isVi ? "Quản trị Dữ liệu & Hệ thống CRM" : "HubSpot, Salesforce, Zoho", color: "text-purple-500" },
    { title: "Contact Center Operations", sub: isVi ? "Vận hành Tổng đài Đa kênh" : "Omnichannel, SLA, Inbound/Outbound", color: "text-blue-500" },
    { title: "People Leadership", sub: isVi ? "Lãnh đạo & Phát triển Đội ngũ" : "Team Coaching & KPI Tracking", color: "text-purple-500" },
    { title: "Process Excellence", sub: isVi ? "Chuẩn hóa Quy trình SOP" : "Lean, SOP Standard, Quality Metrics", color: "text-teal-500" },
    { title: "Data & Analytics", sub: isVi ? "Phân tích Chỉ số CSAT, NPS, CES" : "BI Dashboards & Cohort Retention", color: "text-rose-500" },
    { title: "Technology & Automation", sub: isVi ? "Ứng dụng AI Chatbot & Tự động" : "AI Copilot, Auto-Ticketing", color: "text-emerald-500" },
    { title: "Quality Assurance", sub: isVi ? "Kiểm soát Chất lượng Dịch vụ" : "Call Scoring & QA Coaching", color: "text-rose-500" }
  ];

  // Career Highlights List (Matching the 6 boxes at the bottom of the image)
  const careerHighlights = [
    {
      icon: Calendar,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50/50 dark:bg-blue-950/25 border-blue-100 dark:border-blue-900/40",
      value: "22+",
      desc: isVi ? "Năm kinh nghiệm trong lĩnh vực CSKH" : "Years of experience in CX & Operations"
    },
    {
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgClass: "bg-purple-50/50 dark:bg-purple-950/25 border-purple-100 dark:border-purple-900/40",
      value: "10+",
      desc: isVi ? "Doanh nghiệp lớn đã đồng hành" : "Leading enterprises & corporations"
    },
    {
      icon: Users,
      iconColor: "text-teal-600 dark:text-teal-400",
      bgClass: "bg-teal-50/50 dark:bg-teal-950/25 border-teal-100 dark:border-teal-900/40",
      value: "1000+",
      desc: isVi ? "Nhân sự đã quản lý và phát triển" : "Customer service staff coached & led"
    },
    {
      icon: TrendingUp,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50/50 dark:bg-emerald-950/25 border-emerald-100 dark:border-emerald-900/40",
      value: isVi ? "Nhiều dự án" : "Many Projects",
      desc: isVi ? "Tối ưu hệ thống CSKH, nâng cao trải nghiệm KH" : "CSKH optimization & CX transformation"
    },
    {
      icon: Atom,
      iconColor: "text-amber-600 dark:text-amber-400",
      bgClass: "bg-amber-50/50 dark:bg-amber-950/25 border-amber-100 dark:border-amber-900/40",
      value: isVi ? "Ứng dụng công nghệ" : "Tech Innovation",
      desc: isVi ? "CRM, AI Chatbot, Dashboard, Automation..." : "Omnichannel CRM, AI Chatbots & BI Dashboards"
    },
    {
      icon: Trophy,
      iconColor: "text-rose-600 dark:text-rose-400",
      bgClass: "bg-rose-50/50 dark:bg-rose-950/25 border-rose-100 dark:border-rose-900/40",
      value: isVi ? "Kết quả bền vững" : "Sustainable Results",
      desc: isVi ? "Nâng cao sự hài lòng & hiệu quả kinh doanh" : "Elevating CSAT, NPS & business value"
    }
  ];

  return (
    <section id="about" className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 lg:py-8 space-y-6 lg:space-y-8">
      
      {/* ================= 1. HERO BANNER TRANG GIỚI THIỆU ================= */}
      <div id="hero-banner" className="w-full">
        <PageBanner
          title={isVi ? "GIỚI THIỆU" : "ABOUT"}
          subtitle={
            isVi 
              ? "Lấy khách hàng làm trung tâm – Vận hành chuẩn mực – Giá trị bền vững"
              : "Customer Centricity – Standardized Operations – Sustainable Value"
          }
          tag={isVi ? "HỒ SƠ CÁ NHÂN" : "EXECUTIVE PROFILE"}
          iconType="about"
          gradient="from-slate-900 via-indigo-950 to-slate-950"
          rightContent={
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <div className="px-3 py-1 rounded-xl bg-white/5 text-center">
                  <span className="block text-xs sm:text-sm font-black text-blue-400 leading-tight">22+</span>
                  <span className="text-[8px] text-blue-200 font-bold uppercase tracking-wider">{isVi ? "Năm KN" : "Yrs Exp"}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-white/5 text-center">
                  <span className="block text-xs sm:text-sm font-black text-purple-400 leading-tight">10+</span>
                  <span className="text-[8px] text-purple-200 font-bold uppercase tracking-wider">{isVi ? "Doanh nghiệp" : "Brands"}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-white/5 text-center">
                  <span className="block text-xs sm:text-sm font-black text-emerald-400 leading-tight">1000+</span>
                  <span className="text-[8px] text-emerald-200 font-bold uppercase tracking-wider">{isVi ? "Nhân sự" : "Staff"}</span>
                </div>
              </div>
            </div>
          }
        />
      </div>

      {/* ================= 2. BENTO MAIN DASHBOARD LAYOUT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full">
        
        {/* ================= BENTO ITEM 1: INTERVIEW VIDEO CARD (Col: lg:col-span-4 lg:row-span-1) ================= */}
        <div className="lg:col-span-4 lg:row-span-1 flex flex-col">
          <div className="glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-3.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-amber-700 dark:text-amber-400 uppercase tracking-tight">
                    {isVi ? "VIDEO GIỚI THIỆU & PHỎNG VẤN" : "INTRODUCTION & INTERVIEW VIDEO"}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[9px] font-black uppercase">
                  HD 1080P
                </span>
              </div>

              {/* Video Player Container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={DEMO_VIDEO_URL}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlayVideo}
                  playsInline
                  muted={!isVideoAudioOn}
                />

                {/* Overlay Play/Pause Button when paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlayVideo}
                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-2xs flex items-center justify-center cursor-pointer group-hover:bg-slate-950/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Progress Slider */}
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
                    <div className="flex items-center gap-2">
                      <button onClick={togglePlayVideo} className="hover:text-amber-400 transition-colors">
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={toggleMute} className="hover:text-amber-400 transition-colors">
                        {isVideoAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={handleFullscreen} className="hover:text-amber-400 transition-colors">
                        <Maximize className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium italic mt-2">
              {isVi ? "Video chia sẻ quan điểm vận hành CSKH và quản trị trải nghiệm." : "Executive interview & perspectives on modern CX leadership."}
            </p>
          </div>
        </div>

        {/* ================= BENTO ITEM 2: BIOGRAPHY & INTRODUCTION (Col: lg:col-span-5 lg:row-span-1) ================= */}
        <div className="lg:col-span-5 lg:row-span-1 flex flex-col">
          {/* Card: Nội Dung Giới Thiệu */}
          <div className="glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-lg space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-blue-700 dark:text-cyan-400 uppercase tracking-tight">
                  {isVi ? "NỘI DUNG GIỚI THIỆU" : "BIOGRAPHY & INTRODUCTION"}
                </h3>
              </div>

              {/* Core bio content quote */}
              <div className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-justify relative">
                <span className="text-blue-500 text-3xl font-serif font-black leading-none shrink-0 translate-y-1">“</span>
                <div className="space-y-3 font-normal leading-relaxed text-slate-600 dark:text-slate-300">
                  <p>
                    {isVi 
                      ? "Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng."
                      : "I am Nguyen Hung Thai, Customer Service Manager with over 22 years of practical experience in establishing, operating, and scaling customer care frameworks."}
                  </p>
                  <p>
                    {isVi 
                      ? "Tôi đã có cơ hội làm việc và dẫn dắt đội ngũ tại nhiều doanh nghiệp lớn trong các lĩnh vực Viễn thông, Game, Tài chính - Bảo hiểm và Fintech."
                      : "I have directed teams at leading enterprises spanning Telecom, Gaming, Insurance, and Fintech."}
                  </p>
                  <p>
                    {isVi 
                      ? "Tôi đam mê xây dựng hệ thống CSKH hiệu quả, ứng dụng công nghệ, dữ liệu và tư duy khách hàng để nâng cao trải nghiệm và tạo ra giá trị bền vững cho doanh nghiệp."
                      : "I am passionate about building efficient customer care centers, adopting technology, data insights, and consumer empathy to secure sustainable business value."}
                  </p>
                </div>
              </div>

              {/* Big Quote Box with light purple-blue gradient */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 border border-indigo-100/50 dark:border-indigo-900/30 text-center relative overflow-hidden">
                <p className="text-xs sm:text-[13px] font-bold text-indigo-700 dark:text-indigo-300 italic leading-relaxed">
                  “ {isVi ? "Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời." : "Customer satisfaction is not born from flawless perfection, but from timely and sincere empathy."} ”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BENTO ITEM 3: PERSONAL INFO (Col: lg:col-span-3 lg:row-span-1) ================= */}
        <div className="lg:col-span-3 lg:row-span-1 flex flex-col">
          {/* Card: Thông Tin Cá Nhân */}
          <div className="glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-3.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-500/10 dark:bg-purple-400/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-purple-700 dark:text-purple-400 uppercase tracking-tight">
                    {isVi ? "THÔNG TIN CÁ NHÂN" : "PERSONAL DETAILS"}
                  </h3>
                </div>
                <span className="text-[9px] text-slate-400 uppercase">
                  {isVi ? "*Nhấp" : "*Copy"}
                </span>
              </div>

              <div className="space-y-1.5">
                {personalInfoList.map((item) => {
                  const Icon = item.icon;
                  const isCopied = copiedKey === item.id;

                  return (
                    <div 
                      key={item.id}
                      onClick={() => item.copyable && copyToClipboard(item.value, item.id)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-xl border transition-all text-[11px] group/item select-none cursor-pointer",
                        isCopied 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                          : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800/80 hover:border-purple-300 dark:hover:border-purple-950 hover:bg-slate-100/30"
                      )}
                      title={item.copyable ? (isVi ? "Nhấp để sao chép" : "Click to copy") : undefined}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-5.5 h-5.5 rounded-lg ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] sm:text-[11px]">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 ml-2 min-w-0">
                        {item.href ? (
                          <span className="font-bold text-blue-600 dark:text-blue-400 truncate block text-[11px] max-w-[110px] sm:max-w-[140px] group-hover/item:underline">
                            {item.value}
                          </span>
                        ) : (
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate block text-[11px] max-w-[110px] sm:max-w-[140px]">
                            {item.value}
                          </span>
                        )}

                        {item.copyable && (
                          <span className="p-0.5 text-slate-400 group-hover/item:text-slate-700 dark:group-hover/item:text-white shrink-0">
                            {isCopied ? <CheckCheck className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BENTO ITEM 4: WORK PHILOSOPHY & VALUES (Col: lg:col-span-5 lg:row-span-1) ================= */}
        <div className="lg:col-span-5 lg:row-span-1 flex flex-col">
          <div className="glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-lg space-y-4 flex-1 flex flex-col justify-between">
            {/* Triết Lý Làm Việc (3 Mini Columns) */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {isVi ? "TRIẾT LÝ LÀM VIỆC" : "WORK PHILOSOPHY"}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { title: isVi ? "Lấy khách hàng làm trung tâm" : "Customer Centric", desc: isVi ? "Trải nghiệm vượt trội" : "Superior experience", icon: Heart, bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-300" },
                  { title: isVi ? "Vận hành chuẩn mực" : "Standard Operations", desc: isVi ? "SLA & KPI rõ ràng" : "Clear SLAs/KPIs", icon: Settings, bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-300" },
                  { title: isVi ? "Tạo giá trị bền vững" : "Sustainable Value", desc: isVi ? "Phát triển trung thành" : "Customer loyalty", icon: TrendingUp, bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-700 dark:text-amber-300" }
                ].map((p, idx) => (
                  <div key={idx} className={cn("p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 flex flex-col items-center text-center space-y-1.5 shadow-2xs hover:scale-103 transition-transform", p.bg)}>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-2xs">
                      <p.icon className={cn("w-4 h-4", p.text)} />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black leading-tight text-slate-800 dark:text-slate-200 uppercase tracking-tight block">
                      {p.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Giá Trị Mang Lại */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {isVi ? "GIÁ TRỊ MANG LẠI" : "DELIVERED VALUE"}
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  isVi ? "Xây dựng hệ thống chăm sóc khách hàng hiện đại, tối ưu hiệu quả vận hành." : "Build modern customer care systems, optimizing operational efficiency.",
                  isVi ? "Phát triển đội ngũ chuyên nghiệp, giàu năng lực và tinh thần phục vụ." : "Develop professional teams equipped with strong capabilities and service dedication.",
                  isVi ? "Ứng dụng công nghệ và dữ liệu để nâng cao trải nghiệm khách hàng." : "Apply technology and data analytics to elevate customer experiences.",
                  isVi ? "Đồng hành cùng doanh nghiệp trong hành trình tăng trưởng bền vững." : "Partner with businesses throughout their journey of sustainable growth."
                ].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-800 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BENTO ITEM 5: AREAS OF EXPERTISE (Col: lg:col-span-3 lg:row-span-1) ================= */}
        <div className="lg:col-span-3 lg:row-span-1 flex flex-col">
          {/* Card: Lĩnh Vực Chuyên Môn */}
          <div className="glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
                <h3 className="text-xs sm:text-sm font-black text-purple-700 dark:text-purple-400 uppercase tracking-tight">
                  {isVi ? "LĨNH VỰC CHUYÊN MÔN" : "AREAS OF EXPERTISE"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {expertiseSkills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/80 flex flex-col justify-center space-y-0.5 hover:border-purple-300 transition-colors"
                  >
                    <span className="font-black text-[10.5px] text-slate-800 dark:text-slate-200 leading-tight">
                      {skill.title}
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-none">
                      {skill.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= 3. BOTTOM PANEL: DẤU ẤN SỰ NGHIỆP ================= */}
      <div className="w-full">
        <div className="glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-lg space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-blue-700 dark:text-cyan-400 uppercase tracking-tight">
                {isVi ? "DẤU ẤN SỰ NGHIỆP" : "CAREER MILESTONES"}
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black border border-blue-300 dark:border-blue-800 uppercase">
              PROVEN METRICS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {careerHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className={cn(
                    "p-4 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2 shadow-2xs hover:scale-103 transition-all duration-300 hover:shadow-md",
                    item.bgClass
                  )}
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs">
                    <Icon className={cn("w-5 h-5", item.iconColor)} />
                  </div>
                  <span className={cn("text-lg sm:text-xl font-black tracking-tight leading-none", item.iconColor)}>
                    {item.value}
                  </span>
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
