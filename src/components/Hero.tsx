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
  User,
  Sun,
  Moon,
  Maximize
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";

const DEMO_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const PROFESSIONAL_AVATAR = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600";

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
  const { theme, setTheme } = useTheme();

  // Video State Management
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle_1");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

  // Card Video State (Imported from About.tsx to Home / Hero)
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const [isCardPlaying, setIsCardPlaying] = useState(false);
  const [isCardAudioOn, setIsCardAudioOn] = useState(false);
  const [cardCurrentTime, setCardCurrentTime] = useState(0);
  const [cardDuration, setCardDuration] = useState(105); // 1:45 default

  const togglePlayCardVideo = () => {
    playUiSound("click");
    if (!cardVideoRef.current) return;
    if (cardVideoRef.current.paused) {
      cardVideoRef.current.play().catch(() => {});
      setIsCardPlaying(true);
    } else {
      cardVideoRef.current.pause();
      setIsCardPlaying(false);
    }
  };

  const handleCardTimeUpdate = () => {
    if (cardVideoRef.current) {
      setCardCurrentTime(cardVideoRef.current.currentTime);
      if (cardVideoRef.current.duration && !isNaN(cardVideoRef.current.duration)) {
        setCardDuration(cardVideoRef.current.duration);
      }
    }
  };

  const handleCardSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCardCurrentTime(time);
    if (cardVideoRef.current) {
      cardVideoRef.current.currentTime = time;
    }
  };

  const toggleCardMute = () => {
    playUiSound("click");
    const nextMute = !isCardAudioOn;
    setIsCardAudioOn(nextMute);
    if (cardVideoRef.current) {
      cardVideoRef.current.muted = !nextMute;
    }
  };

  const handleCardFullscreen = () => {
    playUiSound("click");
    if (cardVideoRef.current) {
      if (cardVideoRef.current.requestFullscreen) {
        cardVideoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
            className="flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-slate-300/80 dark:border-white/40 bg-white/80 hover:bg-white dark:bg-white/20 dark:hover:bg-white/30 text-slate-800 dark:text-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
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

        {/* Bottom Area: Speech Card (Trở về phiên bản trước - Thẻ Giới thiệu chữ viết mượt mà, cao cấp) */}
        <div className="relative z-10 flex justify-end w-full mt-auto pt-4 sm:pt-6">
          
          {/* Card Wrapper: Giao diện Glassmorphism cao cấp, tỉ lệ cân đối */}
          <div className="w-full max-w-xs sm:max-w-sm">
            <div className={cn(
              "w-full group relative p-5 sm:p-6 rounded-3xl transition-all duration-500 space-y-4 overflow-hidden min-h-[280px] flex flex-col justify-between",
              "glass-surface backdrop-blur-2xl border border-white/40 dark:border-white/20 bg-white/80 dark:bg-slate-900/80",
              "shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.35)] text-slate-900 dark:text-white",
              "hover:border-indigo-400/60 dark:hover:border-white/50 hover:shadow-[0_24px_60px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
            )}>
              {/* Header Badge */}
              <div className="relative z-20 flex items-center justify-between gap-2 pb-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white font-black text-[9px] sm:text-[10px] shadow-md tracking-wider">
                  <Smile className="w-3 h-3 fill-current" />
                  <span>{isVi ? "THƯ NGỎ CHÀO MỪNG" : "WELCOME NOTE"}</span>
                </div>
              </div>

              {/* Speech Text Content */}
              <div className="relative z-20 space-y-2 mt-auto text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                    {isVi ? "XIN CHÀO! TÔI LÀ" : "WELCOME! I AM"}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300">
                      Nguyễn Hùng Thái
                    </span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                    {isVi 
                      ? "Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm thực chiến điều hành Call Center & tối ưu hóa Trải nghiệm Khách hàng (CX)."
                      : "Customer Service Leader with over 22 years of operations experience in Call Center & Customer Experience (CX)."}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button 
                    onClick={() => scrollTo('about')}
                    className="flex-1 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer text-center shadow-xs active:scale-95"
                  >
                    {isVi ? "Khám phá" : "Explore"}
                  </button>
                  <button 
                    onClick={() => scrollTo('contact')}
                    className="flex-1 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer text-center shadow-xs active:scale-95"
                  >
                    {isVi ? "Liên hệ" : "Contact"}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
