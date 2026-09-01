import React, { useRef, useState, useEffect } from "react";
import {
  Video,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
  MessageSquare,
  Award,
  Zap,
  HelpCircle,
  Film,
  ChevronRight,
  BookOpen,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { PageBanner } from "./PageBanner";
import { useLanguage } from "../context/LanguageContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

import {
  INTERVIEW_QUESTIONS,
  INTERVIEW_VIDEO_1_URL as VIDEO_1_URL,
  INTERVIEW_VIDEO_2_URL as VIDEO_2_URL,
} from "../data/interviewQuestions";

export function Interview() {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for Video & Audio
  const [isInterviewPlaying, setIsInterviewPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

  // Card Expand 1.1x & Blur State
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  // Active Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sync Active Question with Video Playback Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isInterviewPlaying) return;
      const time = video.currentTime;
      let idx = INTERVIEW_QUESTIONS.findIndex(
        (q) => time >= q.startSec && time <= q.endSec
      );
      if (idx === -1) {
        // Fallback: find the last question that started before current time
        for (let i = INTERVIEW_QUESTIONS.length - 1; i >= 0; i--) {
          if (time >= INTERVIEW_QUESTIONS[i].startSec) {
            idx = i;
            break;
          }
        }
      }
      if (idx !== -1 && idx !== currentQuestionIndex) {
        setCurrentQuestionIndex(idx);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isInterviewPlaying, currentQuestionIndex]);

  // Handle video end event
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isInterviewPlaying) {
        setIsInterviewPlaying(false);
        video.src = VIDEO_1_URL;
        video.loop = true;
        video.muted = true;
        video.load();
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isInterviewPlaying]);

  const toggleInterview = () => {
    playUiSound("click");
    const video = videoRef.current;
    if (!video) return;

    if (isInterviewPlaying) {
      setIsInterviewPlaying(false);
      video.src = VIDEO_1_URL;
      video.loop = true;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    } else {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.play().catch(() => {});
    }
  };

  // Seek video to specific question
  const handleSelectQuestion = (index: number) => {
    playUiSound("click");
    setCurrentQuestionIndex(index);
    const q = INTERVIEW_QUESTIONS[index];
    const video = videoRef.current;
    if (!video) return;

    if (!isInterviewPlaying || video.src !== VIDEO_2_URL) {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.currentTime = q.startSec;
      video.play().catch(() => {});
    } else {
      video.currentTime = q.startSec;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  const currentQ = INTERVIEW_QUESTIONS[currentQuestionIndex] || INTERVIEW_QUESTIONS[0];

  return (
    <section 
      id="interview" 
      className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full px-3 sm:px-6 py-4 sm:py-5 rounded-[20px] border-2 border-solid border-slate-200/90 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-xl"
    >

      {/* ================= 1. HEADER BANNER ================= */}
      <div className="mb-[10px] w-full">
        <PageBanner
          title={isVi ? "Phỏng vấn chiến lược" : "Strategic executive interview session"}
          subtitle={
            isVi
              ? "Video phỏng vấn mẫu trả lời 13 câu hỏi then chốt về Quản trị Trải nghiệm & Dịch vụ Khách hàng (CX/CS)."
              : "Sample executive interview addressing 13 core CX/CS operational leadership questions."
          }
          tag={isVi ? "PHỎNG VẤN CHIẾN LƯỢC" : "STRATEGIC INTERVIEW"}
          iconType="interview"
          gradient="from-slate-950 via-rose-950 to-slate-950"
        />
      </div>

      {/* BLUR BACKDROP WHEN CARD IS EXPANDED */}
      <AnimatePresence>
        {isCardExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playUiSound("click");
              setIsCardExpanded(false);
            }}
            className="fixed inset-0 z-[90] flex cursor-pointer items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
          />
        )}
      </AnimatePresence>

      {/* ================= 2. 2-COLUMN VIEW LAYOUT (MATCHING ABOUT.TSX) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* CỘT TRÁI (Video + Nội dung câu hỏi đang phát) lg:col-span-7 */}
        <div className="flex flex-col gap-4 w-full lg:col-span-7 min-w-0">
          
          {/* Video Player Card */}
          <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] shrink-0 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-xl bg-slate-50 dark:bg-slate-950">
            <video
              ref={videoRef}
              controls={isInterviewPlaying}
              autoPlay
              loop={!isInterviewPlaying}
              muted={!isInterviewPlaying || !isVideoAudioOn}
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 brightness-105 contrast-100"
              src={isInterviewPlaying ? VIDEO_2_URL : VIDEO_1_URL}
            />

            {/* Minimal light Gradient for readability without dimming video */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/10" />

            {/* Top Left Status Badge */}
            <div className="pointer-events-none absolute left-3.5 top-3.5 z-20 flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-surface border border-slate-200/20 dark:border-white/20 backdrop-blur-md text-[11px] font-bold text-slate-900 dark:text-white shadow-md">
                <span className={cn("w-2 h-2 rounded-full", isInterviewPlaying ? "bg-emerald-400 animate-ping" : "bg-indigo-400")} />
                <span>
                  {isInterviewPlaying 
                    ? (isVi ? "Đang phát câu hỏi: " + currentQ.stt : "Live Question: " + currentQ.stt)
                    : (isVi ? "Video Giới thiệu Sẵn sàng" : "Ready to Play")}
                </span>
              </div>
            </div>

            {/* Top Right Sound & Expand Controls */}
            <div className="pointer-events-auto absolute right-3.5 top-3.5 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playUiSound("click");
                  const nextAudio = !isVideoAudioOn;
                  setIsVideoAudioOn(nextAudio);
                  if (videoRef.current) {
                    videoRef.current.muted = !nextAudio;
                  }
                }}
                title={isVideoAudioOn ? (isVi ? "Tắt âm thanh" : "Mute") : (isVi ? "Bật âm thanh" : "Unmute")}
                className={cn(
                  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 backdrop-blur-md text-white shadow-lg transition-all hover:scale-105 active:scale-95",
                  isVideoAudioOn ? "bg-emerald-500/80" : "bg-slate-900/80"
                )}
              >
                {isVideoAudioOn ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setIsCardExpanded(!isCardExpanded);
                }}
                title={isCardExpanded ? (isVi ? "Thu nhỏ (1x)" : "Minimize") : (isVi ? "Phóng to (1.1x)" : "Expand (1.1x)")}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full glass-surface border border-slate-200/20 dark:border-white/20 text-slate-900 dark:text-white backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                {isCardExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>

            {/* Bottom Right Play / Pause Action Capsule Bar matching Hero */}
            <div className="pointer-events-auto absolute right-3.5 bottom-3.5 z-20">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between rounded-[999px] transition-all duration-300 text-xs font-black p-0.5 border border-indigo-400/40 dark:border-white/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_4px_16px_rgba(99,102,241,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-xl text-white"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleInterview();
                  }}
                  className="flex items-center gap-1 pl-2.5 pr-1 py-1.5 cursor-pointer text-xs font-black flex-1 min-w-0 rounded-[999px]"
                >
                  <div className="flex h-4 sm:h-5 w-4 sm:w-5 shrink-0 items-center justify-center rounded-full shadow-md bg-white text-indigo-600">
                    {isInterviewPlaying ? (
                      <Pause size={9} className="fill-current" />
                    ) : (
                      <Play size={9} className="translate-x-0.5 fill-current" />
                    )}
                  </div>
                  <span className="uppercase tracking-wider font-extrabold text-[9px] sm:text-[10px] truncate">
                    {isInterviewPlaying
                      ? (isVi ? "Dừng" : "Stop")
                      : (isVi ? "Phát phỏng vấn" : "Play Interview")}
                  </span>
                </button>

                <div className="w-px h-3.5 my-auto shrink-0 bg-white/30" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playUiSound("click");
                    const nextAudio = !isVideoAudioOn;
                    setIsVideoAudioOn(nextAudio);
                    if (videoRef.current) {
                      videoRef.current.muted = !nextAudio;
                    }
                  }}
                  title={isVideoAudioOn ? (isVi ? "Tắt âm thanh" : "Mute") : (isVi ? "Bật âm thanh" : "Unmute")}
                  className={cn(
                    "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all ml-0.5 mr-1",
                    isVideoAudioOn 
                      ? "bg-emerald-500 text-white shadow-sm border border-emerald-300/40"
                      : "bg-white/20 hover:bg-white/30 text-white border border-white/20"
                  )}
                >
                  {isVideoAudioOn ? (
                    <Volume2 className="w-3 h-3 animate-pulse" />
                  ) : (
                    <VolumeX className="w-3 h-3" />
                  )}
                </button>
              </motion.div>
            </div>

          </div>

          {/* Active Question & Answer Detail Card */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 glass-surface p-5 sm:p-6 backdrop-blur-xl shadow-lg text-left space-y-3">
            
            {/* Header: STT, Timestamp, and Summary Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-black text-white shadow-md">
                  {currentQ.stt}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <Clock size={12} />
                  {currentQ.timestamp}
                </span>
              </div>

              <span className="rounded-full border border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-800 dark:text-amber-300 shadow-2xs">
                {isVi ? "Cốt lõi: " : "Core: "}
                {isVi ? currentQ.summaryVi : currentQ.summaryEn}
              </span>
            </div>

            {/* Question title */}
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              {isVi ? currentQ.questionVi : currentQ.questionEn}
            </h3>

            {/* Answer Content */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
              {isVi ? currentQ.answerVi : currentQ.answerEn}
            </p>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => handleSelectQuestion(Math.max(0, currentQuestionIndex - 1))}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
              >
                ← {isVi ? "Câu trước" : "Previous"}
              </button>

              <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                {currentQuestionIndex + 1} / {INTERVIEW_QUESTIONS.length}
              </span>

              <button
                type="button"
                disabled={currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1}
                onClick={() => handleSelectQuestion(Math.min(INTERVIEW_QUESTIONS.length - 1, currentQuestionIndex + 1))}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
              >
                {isVi ? "Câu tiếp theo" : "Next"} →
              </button>
            </div>

          </div>

        </div>

        {/* CỘT PHẢI (Danh mục 13 câu hỏi phỏng vấn + Triết lý quản trị) lg:col-span-5 */}
        <div className="flex flex-col gap-4 w-full lg:col-span-5 min-w-0">
          
          {/* Card: 13 Questions Interactive List */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 glass-surface p-4 sm:p-5 backdrop-blur-xl shadow-lg text-left flex flex-col">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-slate-800/80 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-6 bg-purple-600 rounded-full shrink-0" />
                <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 tracking-wide uppercase">
                  {isVi ? "DANH MỤC 13 CÂU HỎI" : "13 INTERVIEW QUESTIONS"}
                </h3>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                13 Q&As
              </span>
            </div>

            {/* Questions Scrollable List */}
            <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {INTERVIEW_QUESTIONS.map((q, idx) => {
                const isActive = currentQuestionIndex === idx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleSelectQuestion(idx)}
                    className={cn(
                      "w-full flex items-start gap-2.5 rounded-2xl p-2.5 text-left transition-all border cursor-pointer group",
                      isActive
                        ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-500 shadow-xs"
                        : "border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800"
                    )}
                  >
                    <span className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-xl text-[10px] font-black shadow-xs transition-colors",
                      isActive
                        ? "bg-indigo-600 text-white animate-pulse"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50"
                    )}>
                      {q.stt}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5">
                          <Clock size={9} />
                          {q.timestamp}
                        </span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <p className={cn(
                        "mt-0.5 text-xs font-semibold leading-tight line-clamp-2",
                        isActive ? "text-indigo-900 dark:text-indigo-100 font-bold" : "text-slate-800 dark:text-slate-200"
                      )}>
                        {isVi ? q.questionVi : q.questionEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Card: Executive CX Management Takeaways */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 glass-surface p-4 sm:p-5 backdrop-blur-xl shadow-lg text-left space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {isVi ? "TRỌNG TÂM CHIẾN LƯỢC" : "STRATEGIC FOCUS"}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isVi ? "Tối ưu chi phí & NPS" : "Cost & NPS Optimization"}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{isVi ? "Quy trình chuẩn ISO/COPC" : "ISO/COPC Standardized"}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{isVi ? "Tích hợp AI & Omnichannel" : "AI & Omnichannel Ready"}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500 shrink-0" />
                <span>{isVi ? "Văn hóa lấy KH làm trung tâm" : "Customer-Centric Culture"}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Interview;
