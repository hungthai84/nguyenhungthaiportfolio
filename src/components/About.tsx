import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { 
  User, Mail, Phone, MapPin, Linkedin, Clock, Award, 
  Settings, Headphones, Users, BarChart3, 
  Play, Pause, Volume2, VolumeX, Maximize, 
  Heart, Cpu, TrendingUp, Trophy, Star, Check, 
  Atom, Sparkles, ChevronRight, ChevronLeft, Smile, Brain, Flame,
  ShieldCheck, Zap, Layers, FileText, Briefcase, ArrowRight, Database,
  Calendar, Home, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { PageBanner } from "./PageBanner";
import Fluent3DIcon from "./icons/Fluent3DIcon";

const IDLE_1_URL =
  "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const INTRO_1_URL =
  "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";

const IDLE_2_URL =
  "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";
const INTRO_2_URL =
  "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";

const TRANSITION_1_TO_2_URL =
  "https://cdn.scena.ai/project/10124/2c5df2cd27cd1bcaa6fdf3b3aca254988d34a2933c461281b1332dabd1d1c89b.mp4";
const TRANSITION_2_TO_1_URL =
  "https://cdn.scena.ai/project/10124/a2f3d2280da33e96bd8c66c95d1192f2fe192c1fec1357b24bf23c9a85494e22.mp4";

type VideoState =
  | "idle_1"
  | "intro_1"
  | "transition_1_to_2"
  | "idle_2"
  | "intro_2"
  | "transition_2_to_1";

function AboutGradientIcon({ type, index, extraClass = "w-8 h-8" }: { type: string; index: number; extraClass?: string }) {
  return (
    <div className="relative shrink-0 flex items-center justify-center">
      <Fluent3DIcon name="HRM" className={extraClass} />
    </div>
  );
}

export default function About() {
  const { lang } = useLanguage();

  // Interactive Multi-state Video Player State using real HTML5 video
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle_1");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  
  // Keep legacy state variables for other parts of the page if needed
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(105);
  const [isMuted, setIsMuted] = useState(false);

  const getVideoUrl = (state: VideoState) => {
    switch (state) {
      case "idle_1": return IDLE_1_URL;
      case "intro_1": return INTRO_1_URL;
      case "transition_1_to_2": return TRANSITION_1_TO_2_URL;
      case "idle_2": return IDLE_2_URL;
      case "intro_2": return INTRO_2_URL;
      case "transition_2_to_1": return TRANSITION_2_TO_1_URL;
    }
  };

  const changeVideoState = (state: VideoState) => {
    setVideoState(state);
    let shouldAudioBeOn = isVideoAudioOn;
    if (state.startsWith("intro_") || state.startsWith("transition_")) {
      shouldAudioBeOn = true;
      setIsVideoAudioOn(true);
    }
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(state);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = !shouldAudioBeOn;
      videoRef.current.loop = state.startsWith("idle_");
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePlayIntroVideo = () => {
    if (videoState === "idle_2" || videoState === "intro_2") {
      changeVideoState("intro_2");
    } else {
      changeVideoState("intro_1");
    }
  };

  const handleCancelIntro = () => {
    if (videoState === "intro_1") {
      changeVideoState("idle_1");
    } else if (videoState === "intro_2") {
      changeVideoState("idle_2");
    }
  };

  const handleVideoEnded = () => {
    if (videoState === "intro_1" || videoState === "transition_2_to_1") {
      changeVideoState("idle_1");
    } else if (videoState === "intro_2" || videoState === "transition_1_to_2") {
      changeVideoState("idle_2");
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoAudioOn;
    }
  }, [isVideoAudioOn]);

  useEffect(() => {
    // Autoplay first idle video
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl("idle_1");
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 105);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const isVi = lang === 'vi';

  const coreValues = [
    {
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      title: isVi ? "Vận hành Contact Center" : "Contact Center Ops",
      desc: isVi 
        ? "Xây dựng và vận hành tổng đài đa kênh quy mô từ 10 đến 130+ nhân sự tiêu chuẩn tập đoàn." 
        : "Building and operating omnichannel call centers scaling 10 to 130+ FTEs."
    },
    {
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      title: isVi ? "Tự động hóa & AI CSKH" : "Automation & AI CX",
      desc: isVi 
        ? "Ứng dụng Chatbot, Voicebot, CRM & Power BI giúp tối ưu 40% thời gian xử lý khiếu nại." 
        : "Deploying Chatbot, Voicebot, CRM & BI to cut issue handling time by 40%."
    },
    {
      icon: Award,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      title: isVi ? "Tối ưu SLA & CSAT" : "SLA & CSAT Optimization",
      desc: isVi 
        ? "Duy trì SLA tổng đài trên 98%, nâng chỉ số hài lòng khách hàng CSAT đạt trên 96.5%." 
        : "Maintaining 98%+ call center SLA and boosting CSAT to over 96.5%."
    },
    {
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      title: isVi ? "Đào tạo & Phát triển Đội ngũ" : "Team Leadership & Training",
      desc: isVi 
        ? "Chuẩn hóa kịch bản SOP, khung năng lực và giảm tỷ lệ nghỉ việc xuống dưới 3%." 
        : "Standardizing SOPs, competency models, and reducing attrition below 3%."
    }
  ];

  const quickLinks = [
    { id: "letter", title: isVi ? "Thư ngỏ" : "Open Letter", icon: FileText, color: "text-indigo-500" },
    { id: "domains", title: isVi ? "Lĩnh vực hoạt động" : "Industries", icon: Layers, color: "text-sky-500" },
    { id: "experience", title: isVi ? "Kinh nghiệm thực chiến" : "Experience", icon: Award, color: "text-amber-500" },
    { id: "projects", title: isVi ? "Dự án tiêu biểu" : "Key Projects", icon: Briefcase, color: "text-emerald-500" },
  ];

  const [readingTime, setReadingTime] = useState(3);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      const text = aboutRef.current.innerText || "";
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const mins = Math.max(1, Math.ceil(words / 200));
      setReadingTime(mins);
    }
  }, [isVi]);

  const scrollTo = (id: string) => {
    playUiSound("click");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
  };

  return (
    <section id="about" className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full px-3 sm:px-6 py-4 sm:py-5 overflow-x-hidden">

        {/* ================= 1. HEADER BANNER ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-[12px] w-full"
        >
          <PageBanner
            title={isVi ? "Hồ sơ năng lực" : "Strategic executive leadership profile"}
            subtitle={isVi 
              ? "Hành trình vạn dặm bắt đầu từ một bước chân, bản lĩnh vượt trội tạo nên thành công." 
              : "A journey of a thousand miles begins with a single step; superior resilience creates success."
            }
            tag={isVi ? "TỔNG QUAN" : "OVERVIEW"}
            iconType="about"
            gradient="from-slate-950 via-indigo-950 to-slate-950"
          />
        </motion.div>


        {/* ================= 2. MASONRY LAYOUT ================= */}
        <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          
          {/* CỘT TRÁI (Video + Nội dung giới thiệu) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full lg:col-span-7 min-w-0"
          >
            {/* Left Portion: Interactive Multi-State Video Presenter */}
            <div className="w-full relative h-[260px] sm:h-[320px] md:h-[360px] shrink-0 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-950 group">
              <video 
                ref={videoRef}
                autoPlay
                muted={!isVideoAudioOn}
                playsInline
                loop={videoState.startsWith("idle_")}
                src={getVideoUrl(videoState)}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover transition-all duration-700 filter brightness-105 contrast-[1.05]"
              />
              
              {/* Absolute Arrow Button over the video */}
              <div className="absolute top-1/2 right-3 -translate-y-1/2 z-20">
                <button
                  type="button"
                  onClick={() => {
                    changeVideoState(
                      videoState === "idle_1" || videoState === "intro_1"
                        ? "transition_1_to_2"
                        : "transition_2_to_1"
                    );
                  }}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/60 dark:border-white/20 bg-black/40 hover:bg-black/60 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                  title={
                    videoState.includes("1")
                      ? isVi ? "Chuyển sang Màn hình 2" : "Switch to Screen 2"
                      : isVi ? "Quay lại Màn hình 1" : "Back to Screen 1"
                  }
                >
                  {videoState.includes("1") ? (
                    <ChevronRight className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {/* Bottom active state label & Interactive buttons overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
                <div className="px-2.5 py-1 rounded-md bg-black/60 text-[10px] font-black text-white backdrop-blur-md tracking-wider uppercase border border-white/20 shadow">
                  {videoState.startsWith("idle_") 
                    ? (isVi ? "Trạng thái nghỉ" : "Idle state") 
                    : (isVi ? "Đang giới thiệu" : "Intro playing")}
                </div>

                {/* Grouped 2-Action Pill Control */}
                <div className="flex items-center rounded-full border border-white/60 dark:border-white/20 bg-black/60 backdrop-blur-xl shadow-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (videoState.startsWith("intro_")) {
                        handleCancelIntro();
                      } else {
                        handlePlayIntroVideo();
                      }
                    }}
                    className="flex h-[34px] cursor-pointer items-center justify-center gap-2 px-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-[11px] font-black text-white shrink-0 hover:scale-105 active:scale-95 transition-all"
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                      {videoState.startsWith("intro_") ? (
                        <Pause size={9} className="fill-indigo-600 text-indigo-600" />
                      ) : (
                        <Play size={9} className="translate-x-0.2 fill-indigo-600 text-indigo-600" />
                      )}
                    </div>
                    <span className="whitespace-nowrap font-black">
                      {videoState.startsWith("intro_")
                        ? (isVi ? "Dừng" : "Stop")
                        : (isVi ? "Xem giới thiệu" : "Watch Intro")}
                    </span>
                  </button>

                  <div className="w-px h-4 bg-white/30 my-auto mx-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsVideoAudioOn(!isVideoAudioOn);
                    }}
                    className={`flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-all text-white hover:scale-105 active:scale-95 ${
                      isVideoAudioOn ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                    title={isVideoAudioOn ? (isVi ? "Tắt âm thanh" : "Mute") : (isVi ? "Bật âm thanh" : "Unmute")}
                  >
                    {isVideoAudioOn ? (
                      <Volume2 size={13} className="animate-pulse" />
                    ) : (
                      <VolumeX size={13} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ---------------- COLUMN 1: NỘI DUNG GIỚI THIỆU (7 cols) ---------------- */}
            <div className="relative group w-full p-5 sm:p-6 rounded-3xl border border-white/70 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 shadow-xl backdrop-blur-xl flex flex-col justify-between gap-5 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Soft multi-chromatic background glow */}
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-pink-500/10 opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-700" />
              
              {/* Header block with circle blue icon */}
              <div className="relative flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                  <User size={20} className="fill-white" />
                </div>
                <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300 tracking-tight uppercase">
                  {isVi ? "NỘI DUNG GIỚI THIỆU" : "INTRODUCTION"}
                </h2>
              </div>

              {/* Speech bubble style contents */}
              <div className="relative flex flex-col gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-medium">
                <div className="flex items-start gap-2.5">
                  <span className="text-blue-500 text-3xl font-serif leading-none font-bold select-none shrink-0 mt-0.5">“</span>
                  <p className="flex-1">
                    {isVi ? (
                      <>
                        Tôi là <strong className="text-slate-950 dark:text-white font-bold">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn <strong className="text-slate-950 dark:text-white font-bold">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng.
                      </>
                    ) : (
                      <>
                        I am <strong className="text-slate-950 dark:text-white font-bold">Nguyen Hung Thai</strong>, Customer Experience Manager with over <strong className="text-slate-950 dark:text-white font-bold">22 years of experience</strong> in building, operating, and developing customer service systems.
                      </>
                    )}
                  </p>
                </div>
                <p className="pl-5">
                  {isVi ? (
                    "Tôi đã có cơ hội làm việc và dẫn dắt đội ngũ tại nhiều doanh nghiệp lớn trong các lĩnh vực Viễn thông, Game, Tài chính – Bảo hiểm và Fintech."
                  ) : (
                    "I have had the opportunity to work and lead teams at many large enterprises in Telecommunications, Gaming, Insurance & Finance, and Fintech."
                  )}
                </p>
                <p className="pl-5">
                  {isVi ? (
                    "Tôi đam mê xây dựng hệ thống CSKH hiệu quả, ứng dụng công nghệ, dữ liệu và tư duy khách hàng để nâng cao trải nghiệm và tạo ra giá trị bền vững cho doanh nghiệp."
                  ) : (
                    "I am passionate about building efficient customer care systems, applying technology, data, and a customer-centric mindset to enhance experiences and create sustainable value for businesses."
                  )}
                </p>
              </div>

              {/* Beautiful Highlighted Quotation Box */}
              <div className="relative bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-indigo-100 dark:border-indigo-950 rounded-2xl py-4 px-5 text-center shadow-xs backdrop-blur-md overflow-hidden">
                <span className="text-blue-400 text-3xl font-serif font-black absolute top-1 left-3 opacity-60">“</span>
                <p className="text-sm sm:text-base font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300 px-6 leading-relaxed">
                  {isVi 
                    ? "Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời." 
                    : "Customer satisfaction does not come from absolute perfection, but from timely and sincere empathy."}
                </p>
                <span className="text-purple-400 text-3xl font-serif font-black absolute bottom-1 right-3 opacity-60">”</span>
              </div>

              {/* TRIẾT LÝ LÀM VIỆC */}
              <div className="relative flex flex-col gap-3 pt-2">
                <h3 className="text-sm font-black uppercase text-blue-900 dark:text-blue-400 tracking-wider">
                  {isVi ? "TRIẾT LÝ LÀM VIỆC" : "WORK PHILOSOPHY"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Item 1 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center text-center gap-2 shadow-2xs backdrop-blur-md hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 group/item">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <Heart className="w-5 h-5 stroke-[2.2] fill-blue-500/5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {isVi ? "Lấy khách hàng làm trung tâm" : "Customer-centric focus"}
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center text-center gap-2 shadow-2xs backdrop-blur-md hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 group/item">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <Settings className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {isVi ? "Vận hành chuẩn mực" : "Standardized operations"}
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3.5 rounded-2xl bg-white/75 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center text-center gap-2 shadow-2xs backdrop-blur-md hover:border-amber-300 dark:hover:border-amber-500/50 transition-all duration-300 group/item">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <BarChart3 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {isVi ? "Tạo giá trị bền vững" : "Sustainable value creation"}
                    </span>
                  </div>
                </div>
              </div>

              {/* GIÁ TRỊ MANG LẠI */}
              <div className="relative flex flex-col gap-3 pt-2">
                <h3 className="text-sm font-black uppercase text-blue-900 dark:text-blue-400 tracking-wider">
                  {isVi ? "GIÁ TRỊ MANG LẠI" : "DELIVERED VALUES"}
                </h3>

                <div className="grid grid-cols-1 gap-2.5">
                  <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-100/80 dark:border-slate-700/50 backdrop-blur-md shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      {isVi ? "Xây dựng hệ thống chăm sóc khách hàng hiện đại, tối ưu hiệu quả vận hành." : "Building modern customer care systems, optimizing operational efficiency."}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-100/80 dark:border-slate-700/50 backdrop-blur-md shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      {isVi ? "Phát triển đội ngũ chuyên nghiệp, giàu năng lực và tinh thần phục vụ." : "Developing professional teams with high competence and service spirit."}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-100/80 dark:border-slate-700/50 backdrop-blur-md shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      {isVi ? "Ứng dụng công nghệ và dữ liệu để nâng cao trải nghiệm khách hàng." : "Applying technology and data to elevate customer experiences."}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-100/80 dark:border-slate-700/50 backdrop-blur-md shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      {isVi ? "Đồng hành cùng doanh nghiệp trong hành trình tăng trưởng bền vững." : "Partnering with businesses in their sustainable growth journey."}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* CỘT PHẢI (Overview + Thông tin cá nhân & Lĩnh vực chuyên môn) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full lg:col-span-5 min-w-0"
          >
            {/* THÔNG TIN CÁ NHÂN CARD */}
            <div className="relative group w-full p-5 sm:p-6 rounded-3xl border border-white/70 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 shadow-xl backdrop-blur-xl flex flex-col justify-between gap-4 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Soft glow */}
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-700" />
              <div className="pointer-events-none absolute -right-4 -bottom-4 text-purple-500/10 dark:text-purple-400/15 transition-transform duration-500">
                <Award size={90} />
              </div>

              {/* Header style speech card */}
              <div className="relative flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white shadow-md">
                  <User size={20} className="fill-white" />
                </div>
                <h2 className="text-lg font-extrabold text-purple-900 dark:text-purple-300 tracking-tight uppercase">
                  {isVi ? "THÔNG TIN CÁ NHÂN" : "PERSONAL INFO"}
                </h2>
              </div>

              {/* Profile Fields List - Styled as a clean table format with light gray outlines */}
              <div className="relative flex flex-col gap-2 mt-1">
                
                {/* Row 1: Họ và tên */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="name" index={1} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Họ và tên" : "Full name"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">Nguyễn Hùng Thái</span>
                </div>

                {/* Row 2: Chức danh */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-amber-300 dark:hover:border-amber-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="title" index={2} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Chức danh" : "Title"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "Trưởng phòng Chăm sóc khách hàng" : "Customer Care Manager"}</span>
                </div>

                {/* Row 3: Kinh nghiệm */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="experience" index={3} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Kinh nghiệm" : "Experience"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "22+ năm trong lĩnh vực CSKH" : "22+ years in Customer Care"}</span>
                </div>

                {/* Row 4: Giới tính */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="gender" index={4} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Giới tính" : "Gender"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "Nam giới" : "Male"}</span>
                </div>

                {/* Row 5: Dân tộc */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="ethnicity" index={5} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Dân tộc" : "Ethnicity"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "Kinh" : "Kinh"}</span>
                </div>

                {/* Row 6: Tình trạng */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-rose-300 dark:hover:border-rose-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="status" index={6} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Tình trạng" : "Marital Status"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "Độc thân" : "Single"}</span>
                </div>

                {/* Row 7: Sinh nhật */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-pink-300 dark:hover:border-pink-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="birthday" index={7} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Sinh nhật" : "Date of Birth"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">22/06/1984</span>
                </div>

                {/* Row 8: Tạm trú */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="temporary" index={8} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Tạm trú" : "Temporary Residence"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "Q7, Hồ Chí Minh" : "District 7, HCMC"}</span>
                </div>

                {/* Row 9: Cư trú */}
                <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 group/row">
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="permanent" index={9} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Cư trú" : "Permanent Residence"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">{isVi ? "Mỹ Tho, Tiền Giang" : "My Tho, Tien Giang"}</span>
                </div>

                {/* Row 10: Email */}
                <a 
                  href="mailto:hungthai84@gmail.com"
                  className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 group/row"
                >
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="email" index={10} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">Email</span>
                  </div>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-right break-all">hungthai84@gmail.com</span>
                </a>

                {/* Row 11: Điện thoại & Zalo */}
                <a 
                  href="tel:0909097882"
                  className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-cyan-300 dark:hover:border-cyan-500/50 transition-all duration-300 group/row"
                >
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="phone" index={11} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{isVi ? "Điện thoại & Zalo" : "Phone & Zalo"}</span>
                  </div>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline text-right">0909097882</span>
                </a>

                {/* Row 12: Website */}
                <a 
                  href="https://nguyenhungthai.powerservice.one/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-teal-300 dark:hover:border-teal-500/50 transition-all duration-300 group/row"
                >
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="website" index={12} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">Website</span>
                  </div>
                  <span className="font-semibold text-teal-600 dark:text-teal-400 hover:underline text-right truncate max-w-[200px]">nguyenhungthai.powerservice.one</span>
                </a>

                {/* Row 13: LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/hungthai84/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-xs sm:text-sm shadow-2xs hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-300 group/row"
                >
                  <div className="flex items-center gap-2.5">
                    <AboutGradientIcon type="linkedin" index={13} extraClass="w-8.5 h-8.5 transform transition-transform group-hover/row:scale-110 duration-300" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">LinkedIn</span>
                  </div>
                  <span className="font-semibold text-sky-600 dark:text-sky-400 hover:underline text-right truncate max-w-[200px]">linkedin.com/in/hungthai84</span>
                </a>

              </div>
            </div>

            {/* LĨNH VỰC CHUYÊN MÔN CARD - NEW ELEMENT EXACTLY FROM THE IMAGE */}
            <div className="relative group w-full p-5 sm:p-6 rounded-3xl border border-white/70 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 shadow-xl backdrop-blur-xl flex flex-col justify-between gap-4 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Soft glow */}
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-indigo-500/10 to-purple-500/5 opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-700" />
              
              {/* Header block with Star Icon */}
              <div className="relative flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
                <h2 className="text-lg font-extrabold text-indigo-900 dark:text-indigo-300 tracking-tight uppercase">
                  {isVi ? "LĨNH VỰC CHUYÊN MÔN" : "AREAS OF EXPERTISE"}
                </h2>
              </div>

              {/* 2-Column Grid exactly matching the design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                
                {/* Field 1: Customer Experience Strategy */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Customer Experience Strategy</span>
                </div>

                {/* Field 2: CRM & Customer Data */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">CRM & Customer Data</span>
                </div>

                {/* Field 3: Contact Center Operations */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Contact Center Operations</span>
                </div>

                {/* Field 4: People Leadership */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">People Leadership</span>
                </div>

                {/* Field 5: Process Excellence */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Process Excellence</span>
                </div>

                {/* Field 6: Data & Analytics */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Data & Analytics</span>
                </div>

                {/* Field 7: Technology & Automation */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Technology & Automation</span>
                </div>

                {/* Field 8: Quality Assurance */}
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-3xs hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Quality Assurance</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
    </section>
  );
}
