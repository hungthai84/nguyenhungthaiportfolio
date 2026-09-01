import React, { useRef, useState } from "react";
import { Briefcase, CheckCircle2, Heart, Network, TrendingUp, Play, Square, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import { ProjectCard } from "../../data/projectsData";
import { playUiSound } from "../../lib/sound";

export function CaseStudy1_1_Header({ onShowToast, project, onBack }: { onShowToast: (msg: string) => void; project?: ProjectCard; onBack: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        onShowToast("Trình duyệt chặn tự động phát audio demo");
      });
    }
  };

  const bannerImg = project?.image || "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1200&auto=format&fit=crop";
  const phaseCode = project?.phaseCode || "1.1";
  const title = project?.branchTitle || "XÂY DỰNG & VẬN HÀNH PHÒNG DỊCH VỤ KHÁCH HÀNG";
  const desc = project?.description || "Quy hoạch hoàn chỉnh bộ máy CSKH từ nền móng ban đầu: Chuẩn hóa cơ cấu 6 khối chuyên trách, quy hoạch khung năng lực 3 cấp, xây dựng quy trình SOP và lan tỏa văn hóa Customer-Centric bền vững.";
  const tags = project?.tags || ["Chủ động", "Thấu hiểu", "Kết nối", "Giá trị bền vững"];

  return (
    <header className="relative rounded-3xl bg-slate-950/80 text-white py-12 sm:py-16 px-8 sm:px-12 shadow-2xl border border-white/30 backdrop-blur-2xl overflow-hidden">
      <img src={bannerImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover object-center opacity-25 pointer-events-none" onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x500/0f172a/ffffff?text=Case+Study+CSKH'; }} />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none"></div>

      {/* Nút trở về nằm bên trên góc phải Banner */}
      <button
        onClick={() => {
          playUiSound("click");
          onBack();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-sky-200" />
        <span>Trở về</span>
      </button>

      <div className="relative z-10 max-w-4xl space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-sky-200 font-bold tracking-wide uppercase text-xs backdrop-blur-md shadow-lg">
          <Briefcase className="w-3.5 h-3.5 text-sky-300" />
          <span>CASE STUDY {phaseCode} · SENIOR CX ARCHITECT & STRATEGIST PORTFOLIO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 via-rose-200 to-purple-300">{title}</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-3xl font-normal font-body drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          {desc}
        </p>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {tags.map((tag, idx) => {
            const styles = [
              "bg-sky-500/20 border-sky-400/40 text-sky-200",
              "bg-purple-500/20 border-purple-400/40 text-purple-200",
              "bg-emerald-500/20 border-emerald-400/40 text-emerald-200",
              "bg-amber-500/20 border-amber-400/40 text-amber-200"
            ];
            const s = styles[idx % styles.length];
            return (
              <span key={idx} className={`px-3.5 py-1.5 rounded-xl border backdrop-blur-md font-bold text-xs flex items-center gap-1.5 shadow-sm ${s}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> {tag.replace(/^#/, '')}
              </span>
            );
          })}
        </div>
      </div>

      <div className="relative z-20 mt-8 flex justify-start sm:absolute sm:bottom-8 sm:right-8 sm:mt-0">
        <button onClick={toggleAudio} className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500/80 via-indigo-600/80 to-purple-600/80 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-500/40 ring-2 ring-white/50 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl">
          {isPlayingAudio ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlayingAudio ? "Dừng phát tóm tắt" : "Nghe tóm tắt Case Study"}</span>
          <div className={cn("flex items-end space-x-0.5 h-4", !isPlayingAudio && "hidden")}>
            <span className="soundwave-bar w-0.5 bg-sky-200 rounded-full animate-[soundwave_1.2s_ease-in-out_infinite_alternate]" style={{animationDelay: '0.1s'}}></span>
            <span className="soundwave-bar w-0.5 bg-sky-200 rounded-full animate-[soundwave_1.2s_ease-in-out_infinite_alternate]" style={{animationDelay: '0.3s'}}></span>
            <span className="soundwave-bar w-0.5 bg-sky-200 rounded-full animate-[soundwave_1.2s_ease-in-out_infinite_alternate]" style={{animationDelay: '0.2s'}}></span>
            <span className="soundwave-bar w-0.5 bg-sky-200 rounded-full animate-[soundwave_1.2s_ease-in-out_infinite_alternate]" style={{animationDelay: '0.4s'}}></span>
          </div>
        </button>
        <audio ref={audioRef} onEnded={() => setIsPlayingAudio(false)} src="https://cdn.scena.ai/project/10124/177f586f79091b5e144f89160202d3f8724f26388ee0cec8f7167d69c7214c62.mp3" preload="metadata"></audio>
      </div>
    </header>
  );
}
