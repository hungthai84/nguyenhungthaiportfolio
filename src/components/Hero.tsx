import React, { useState, useRef, useEffect } from "react";
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Briefcase, 
  Star, 
  Award, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Users, 
  Layers, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  PhoneCall,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Smile,
  Brain,
  Flame,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import WebsiteGradientIcon from "./WebsiteGradientIcon";

const IDLE_1_URL =
  "https://cdn.scena.ai/project/9741/73e39b037268a364ed0bac9563119e5c5ea6d6294e8b4a50052653303b75c52f.mp4";
const INTRO_1_URL =
  "https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4";

const IDLE_2_URL =
  "https://cdn.scena.ai/project/10112/bd20d7cafa2d764146ab362cf1c4473ded1f79ae87b789f0ba689056ca1b2904.mp4";
const INTRO_2_URL =
  "https://cdn.scena.ai/project/8606/87d892c1c37f70cfae99aa55e5888f93ea6b7015050fe44e5d1f54418f0b06b9.mp4";

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

export default function Hero() {
  const { t, lang } = useLanguage();
  const isVi = lang === "vi";
  const theme = useTheme().theme as string;

  // Video State Management
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle_1");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

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

  const changeVideoState = (state: VideoState, playSound = true) => {
    if (playSound) playUiSound("click");
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
      changeVideoState("intro_2", true);
    } else {
      changeVideoState("intro_1", true);
    }
  };

  const handleCancelIntro = () => {
    playUiSound("click");
    if (videoState === "intro_1") {
      changeVideoState("idle_1", false);
    } else if (videoState === "intro_2") {
      changeVideoState("idle_2", false);
    }
  };

  const handleVideoEnded = () => {
    if (videoState === "intro_1" || videoState === "transition_2_to_1") {
      changeVideoState("idle_1", false);
    } else if (videoState === "intro_2" || videoState === "transition_1_to_2") {
      changeVideoState("idle_2", false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoAudioOn;
    }
  }, [isVideoAudioOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl("idle_1");
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollTo = (id: string) => {
    playUiSound("click");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
  };

  const isIntro = videoState.startsWith("intro_");
  const isTransitioning = videoState.startsWith("transition_");

  return (
    <section id="home" className="relative overflow-hidden w-full h-full min-h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">

      {/* Main Background Video Player - Fills entire card/section */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={!isVideoAudioOn}
          playsInline
          loop={videoState.startsWith("idle_")}
          src={getVideoUrl(videoState)}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover transition-all duration-700 brightness-105 contrast-100"
        />
        {/* Transparent Subtle Gradient Overlays for optimal video brightness and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl mx-auto h-full flex-1 relative z-10 flex flex-col justify-between">
        
        {/* Middle Right Screen Navigation Arrow (Chuyển màn hình 1 / 2) */}
        <div className="absolute top-1/2 right-4 sm:right-6 -translate-y-1/2 z-20">
          <button
            id="hero-screen-navigation-btn"
            onClick={() => {
              changeVideoState(
                videoState === "idle_1" || videoState === "intro_1"
                  ? "transition_1_to_2"
                  : "transition_2_to_1",
                true
              );
            }}
            className="flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/20 hover:bg-white/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
            title={
              videoState.includes("1")
                ? (isVi ? "Chuyển sang Màn hình 2" : "Switch to Screen 2")
                : (isVi ? "Quay lại Màn hình 1" : "Back to Screen 1")
            }
          >
            {videoState.includes("1") ? (
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Bottom Area: Speech Card (Giảm 50% kích thước và chuyển nút Xem video giới thiệu vào thẻ) */}
        <div className="relative z-10 flex justify-end w-full mt-auto pt-4 sm:pt-6">
          
          {/* Speech Card Wrapper: Compact width ~50% footprint (max-w-xs sm:max-w-sm) */}
          <div className="w-full max-w-xs sm:max-w-sm">
            <div className={cn(
              "w-full group relative p-3.5 sm:p-4 rounded-2xl transition-all duration-500 space-y-2.5",
              theme === "glass-vivid" && "bg-slate-950/85 border-2 border-white/40 shadow-[0_16px_40px_rgba(124,58,237,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] backdrop-blur-2xl text-white",
              theme === "nec" && "bg-[#f0f3f8]/95 dark:bg-slate-900/95 border-2 border-white/90 dark:border-slate-800/90 shadow-[-6px_-6px_16px_rgba(255,255,255,0.9),_6px_6px_20px_rgba(163,177,198,0.5)] backdrop-blur-xl text-slate-800 dark:text-slate-100",
              theme === "clay" && "bg-gradient-to-tr from-indigo-900/90 via-purple-900/90 to-pink-900/90 border-2 border-white/80 shadow-[0_16px_36px_rgba(140,150,200,0.35),inset_0_2px_4px_rgba(255,255,255,0.8)] backdrop-blur-2xl text-white",
              (theme === "glass-neo" || theme === "glass-neon") && "bg-gradient-to-br from-slate-950/95 via-[#0c1229]/90 to-[#190d2e]/90 border border-cyan-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.3),0_0_35px_rgba(255,0,128,0.25)] backdrop-blur-2xl text-cyan-50",
              theme === "liquid-glass" && "bg-white/10 dark:bg-black/10 border-t border-white/60 border-l border-white/30 border-r border-white/10 border-b border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.05)] backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] text-slate-900 dark:text-white",
              (!theme || theme === "glass") && "bg-slate-950/80 border border-white/30 shadow-2xl backdrop-blur-2xl text-white"
            )}>
              {/* Glow & Sparkles Background */}
              {theme !== "nec" && (
                <div className={cn(
                  "pointer-events-none absolute -inset-1 rounded-2xl opacity-60 blur-xl transition-opacity duration-700",
                  theme === "glass-vivid" && "bg-gradient-to-r from-violet-500/30 via-indigo-500/30 to-pink-500/30",
                  theme === "clay" && "bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30",
                  (theme === "glass-neo" || theme === "glass-neon") && "bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/40 to-purple-500/40 opacity-80",
                  (!theme || theme === "glass") && "bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20"
                )} />
              )}
              
              {/* Card Header: Xin chào! Tôi là Nguyễn Hùng Thái */}
              <div className={cn(
                "relative flex items-center justify-between gap-2 pb-2 border-b",
                theme === "nec" ? "border-slate-200 dark:border-slate-700/80" : 
                (theme === "glass-neo" || theme === "glass-neon") ? "border-cyan-500/30" : theme === "liquid-glass" ? "border-slate-300/50 dark:border-white/20" : "border-white/20"
              )}>
                <div className="flex items-center gap-2.5">
                  
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-[9px] font-black tracking-widest uppercase",
                      theme === "nec" ? "text-slate-500 dark:text-slate-400" :
                      (theme === "glass-neo" || theme === "glass-neon") ? "text-cyan-300 font-extrabold drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]" : theme === "liquid-glass" ? "text-slate-600 dark:text-slate-300" :
                      theme === "clay" ? "text-pink-200" :
                      theme === "glass-vivid" ? "text-violet-300" :
                      "text-slate-300"
                    )}>
                      {isVi ? "Xin chào! Tôi là" : "Hello! I am"}
                    </span>
                    <span className={cn(
                      "text-base sm:text-lg font-black leading-tight uppercase",
                      theme === "nec" ? "text-blue-600 dark:text-blue-400" :
                      (theme === "glass-neo" || theme === "glass-neon") ? "bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]" : theme === "liquid-glass" ? "text-slate-900 dark:text-white" :
                      theme === "clay" ? "bg-gradient-to-r from-pink-200 via-purple-100 to-white bg-clip-text text-transparent" :
                      theme === "glass-vivid" ? "bg-gradient-to-r from-violet-200 via-pink-200 to-white bg-clip-text text-transparent" :
                      "bg-gradient-to-r from-blue-300 via-indigo-200 to-pink-300 bg-clip-text text-transparent"
                    )}>
                      Nguyễn Hùng Thái
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body: Compact content */}
              <div className="relative space-y-1.5 py-0.5 text-left">
                <h2 className={cn(
                  "text-xs sm:text-sm font-black leading-snug drop-shadow-sm",
                  theme === "nec" ? "text-slate-900 dark:text-slate-100" :
                  (theme === "glass-neo" || theme === "glass-neon") ? "text-cyan-100 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" : theme === "liquid-glass" ? "text-slate-800 dark:text-slate-100" :
                  "text-white"
                )}>
                  {isVi
                    ? "Kiến tạo chuẩn mực, trải nghiệm khách hàng xuất sắc & bền vững."
                    : "Architecting standard-setting, exceptional customer experiences."}
                </h2>
                <p className={cn(
                  "text-[11px] leading-relaxed font-normal text-justify",
                  theme === "nec" ? "text-slate-600 dark:text-slate-300" :
                  (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-200/95" : theme === "liquid-glass" ? "text-slate-700 dark:text-slate-300" :
                  theme === "clay" ? "text-purple-100/90" :
                  "text-slate-200/90"
                )}>
                  {isVi
                    ? "Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm xây dựng, vận hành và tối ưu hóa hệ thống CSKH cho các doanh nghiệp và tập đoàn hàng đầu."
                    : "I am Nguyen Hung Thai, Head of Customer Service with 22+ years of experience building, operating, and optimizing customer support systems for leading enterprises."}
                </p>
              </div>

              {/* Card Actions: Video Intro Button & Contact Button on same row */}
              <div className={cn(
                "relative pt-2 border-t flex flex-row items-center gap-2",
                theme === "nec" ? "border-slate-200 dark:border-slate-700/80" : 
                (theme === "glass-neo" || theme === "glass-neon") ? "border-cyan-500/40" : "border-white/20"
              )}>
                {/* 1. Watch Intro Video Button with Sound Control */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center justify-between rounded-[999px] transition-all duration-300 text-xs font-black p-0.5 flex-1 min-w-0",
                    theme === "nec" ? "bg-blue-600 text-white shadow-md" :
                    (theme === "glass-neo" || theme === "glass-neon") ? "border border-cyan-400/80 bg-gradient-to-r from-cyan-950/90 via-purple-950/90 to-fuchsia-950/90 text-cyan-100 shadow-[0_0_18px_rgba(0,240,255,0.4),0_0_24px_rgba(255,0,128,0.25)] backdrop-blur-md" :
                    theme === "clay" ? "border border-white/40 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg backdrop-blur-md" :
                    theme === "glass-vivid" ? "border border-white/40 bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md" :
                    theme === "liquid-glass" ? "bg-white/20 dark:bg-black/20 border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-[20px] backdrop-saturate-[1.5] text-slate-900 dark:text-white rounded-[999px]" :
                    "border border-white/35 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_0_15px_rgba(99,102,241,0.4)] backdrop-blur-md text-white"
                  )}
                >
                  {/* Play / Stop Action */}
                  <button
                    id="hero-play-intro-btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isIntro) {
                        handleCancelIntro();
                      } else {
                        handlePlayIntroVideo();
                      }
                    }}
                    className="flex items-center gap-1 pl-2.5 pr-1 py-1.5 cursor-pointer text-xs font-black flex-1 min-w-0 rounded-[999px]"
                  >
                    <div className={cn(
                      "flex h-4 sm:h-5 w-4 sm:w-5 shrink-0 items-center justify-center rounded-full shadow-md",
                      theme === "nec" ? "bg-white text-blue-600" :
                      (theme === "glass-neo" || theme === "glass-neon") ? "bg-gradient-to-tr from-cyan-400 to-fuchsia-400 text-slate-950 shadow-[0_0_8px_rgba(0,240,255,0.8)]" :
                      "bg-white text-indigo-600"
                    )}>
                      {isIntro ? (
                        <Pause size={9} className={(theme === "glass-neo" || theme === "glass-neon") ? "fill-slate-950 text-slate-950" : "fill-current"} />
                      ) : (
                        <Play size={9} className={cn("translate-x-0.5", (theme === "glass-neo" || theme === "glass-neon") ? "fill-slate-950 text-slate-950" : "fill-current")} />
                      )}
                    </div>
                    <span className="uppercase tracking-wider font-extrabold text-[9px] sm:text-[10px] truncate">
                      {isIntro
                        ? (isVi ? "Dừng" : "Stop")
                        : (isVi ? "Giới thiệu" : "Watch Intro")}
                    </span>
                  </button>

                  {/* Integrated Speaker Toggle Divider & Button */}
                  <div className={cn(
                    "w-px h-3.5 my-auto shrink-0",
                    (theme === "glass-neo" || theme === "glass-neon") ? "bg-cyan-400/50" : "bg-white/30"
                  )} />

                  <button
                    type="button"
                    id="hero-toggle-sound-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      playUiSound("click");
                      setIsVideoAudioOn(!isVideoAudioOn);
                    }}
                    title={isVideoAudioOn ? (isVi ? "Tắt âm thanh video" : "Mute Video") : (isVi ? "Bật âm thanh video" : "Unmute Video")}
                    className={cn(
                      "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all ml-0.5 mr-1",
                      isVideoAudioOn 
                        ? ((theme === "glass-neo" || theme === "glass-neon") ? "bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-950 shadow-[0_0_8px_rgba(0,240,255,0.8)]" : "bg-emerald-500/90 text-white shadow-sm")
                        : ((theme === "glass-neo" || theme === "glass-neon") ? "bg-cyan-900/70 hover:bg-cyan-800/80 text-cyan-200 border border-cyan-500/40" : "bg-white/20 hover:bg-white/30 text-white/90")
                    )}
                  >
                    {isVideoAudioOn ? (
                      <Volume2 className="w-3 h-3 animate-pulse" />
                    ) : (
                      <VolumeX className="w-3 h-3" />
                    )}
                  </button>
                </motion.div>

                {/* 2. Contact / Talk Button */}
                <button 
                  onClick={() => scrollTo('contact')}
                  className={cn(
                    "glow-btn shrink-0 flex items-center justify-center gap-1 px-2.5 py-1.5 text-[10px] sm:text-[11px] font-bold active:scale-95 transition-transform shadow-md rounded-xl whitespace-nowrap",
                    theme === "nec" ? "bg-emerald-600 hover:bg-emerald-700 text-white" :
                    (theme === "glass-neo" || theme === "glass-neon") ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white border border-fuchsia-400/50 shadow-[0_0_15px_rgba(236,72,153,0.4)]" :
                    theme === "liquid-glass" ? "bg-white/20 dark:bg-black/20 border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-[20px] backdrop-saturate-[1.5] text-slate-900 dark:text-white rounded-[12px]" :
                    "bg-emerald-600 hover:bg-emerald-500 text-white"
                  )}
                >
                  <PhoneCall className="w-3 h-3 text-white" />
                  <span>{t('hero.letsTalk')}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
