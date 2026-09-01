import React, { useState, useEffect } from "react";
import { ArrowLeft, Maximize2, X, Info } from "lucide-react";
import { CaseStudy1_1_Header } from "./CaseStudy1_1_Header";
import { CaseStudy1_1_TOC } from "./CaseStudy1_1_TOC";
import { CaseStudy1_1_Mindmap } from "./CaseStudy1_1_Mindmap";
import { CaseStudy1_1_Sections } from "./CaseStudy1_1_Sections";
import { CaseStudy1_1_Modal } from "./CaseStudy1_1_Modal";
import { cn } from "../../lib/utils";
import { ProjectCard } from "../../data/projectsData";
import { playUiSound } from "../../lib/sound";

export function CaseStudy1_1({ project, onBack, onZoomImage }: { project: ProjectCard, onBack: () => void, onZoomImage: (img: string) => void }) {
  const [viewMode, setViewMode] = useState<"all" | "mindmap">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const jumpToSection = (id: string) => {
    if (viewMode === "mindmap") {
      setViewMode("all");
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="relative font-sans animate-fadeIn min-h-screen text-slate-800 dark:text-slate-100">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-base {
            backdrop-filter: blur(20px) saturate(190%);
            -webkit-backdrop-filter: blur(20px) saturate(190%);
            border: 1px solid rgba(255, 255, 255, 0.85);
            box-shadow: 0 16px 40px rgba(31, 38, 135, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.9);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .glass-base {
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        .glass-base:hover {
            transform: translateY(-2px);
            box-shadow: 0 22px 50px rgba(31, 38, 135, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1);
        }
        .dark .glass-base:hover {
            box-shadow: 0 22px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.18);
        }

        .glass-nav {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(24px) saturate(200%);
            -webkit-backdrop-filter: blur(24px) saturate(200%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
        }
        .dark .glass-nav {
            background: rgba(11, 17, 32, 0.78);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .glass-pill {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(14px) saturate(180%);
            -webkit-backdrop-filter: blur(14px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.85);
            box-shadow: 0 4px 12px rgba(31, 38, 135, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .glass-pill {
            background: rgba(30, 41, 59, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.06);
        }
        .glass-pill:hover, .glass-pill.active {
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(-1.5px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.18), inset 0 1px 2px rgba(255, 255, 255, 1);
        }
        .dark .glass-pill:hover, .dark .glass-pill.active {
            background: rgba(51, 65, 85, 0.95);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        .glass-inner {
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 6px 18px rgba(31, 38, 135, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }
        .dark .glass-inner {
            background: rgba(30, 41, 59, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.04);
        }

        .shadow-glow-sky { box-shadow: 0 0 35px -5px rgba(2, 132, 199, 0.35); }
        .shadow-glow-indigo { box-shadow: 0 0 35px -5px rgba(99, 102, 241, 0.35); }
        .shadow-glow-rose { box-shadow: 0 0 35px -5px rgba(244, 63, 94, 0.35); }
        .shadow-glow-purple { box-shadow: 0 0 35px -5px rgba(168, 85, 247, 0.35); }
        .shadow-glow-cyan { box-shadow: 0 0 35px -5px rgba(6, 182, 212, 0.35); }
        .shadow-glow-emerald { box-shadow: 0 0 35px -5px rgba(16, 185, 129, 0.35); }
        .shadow-glow-amber { box-shadow: 0 0 35px -5px rgba(245, 158, 11, 0.35); }
        .shadow-glow-teal { box-shadow: 0 0 35px -5px rgba(20, 184, 166, 0.35); }

        .mindmap-connector {
            stroke-dasharray: 8;
            animation: dash 20s linear infinite;
        }
        @keyframes dash {
            to { stroke-dashoffset: -1000; }
        }
        
        @keyframes float-slow {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(25px, -30px) scale(1.08); }
        }
        @keyframes float-reverse {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-30px, 20px) scale(0.95); }
        }
        .animate-float-1 { animation: float-slow 14s ease-in-out infinite; }
        .animate-float-2 { animation: float-reverse 18s ease-in-out infinite; }

        .custom-scrollbar::-webkit-scrollbar,
        ::-webkit-scrollbar {
            width: 7px;
            height: 7px;
        }
        .custom-scrollbar::-webkit-scrollbar-track,
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb,
        ::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.4);
            border-radius: 999px;
            backdrop-filter: blur(8px);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover,
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.7);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      `}} />

      {/* Floating orbs */}
      <div className="fixed -top-40 -left-40 w-[480px] h-[480px] bg-gradient-to-br from-sky-400/35 via-blue-500/25 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-1"></div>
      <div className="fixed top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-2"></div>
      <div className="fixed top-2/3 -left-32 w-[450px] h-[450px] bg-gradient-to-br from-emerald-400/25 via-teal-500/20 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-1"></div>
      <div className="fixed -bottom-40 right-1/4 w-[480px] h-[480px] bg-gradient-to-br from-amber-400/25 via-orange-500/20 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-2"></div>

      <CaseStudy1_1_TOC viewMode={viewMode} setViewMode={setViewMode} jumpToSection={jumpToSection} openModal={() => setIsModalOpen(true)} project={project} onBack={onBack} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative z-10">
        <CaseStudy1_1_Header onShowToast={showToast} project={project} onBack={onBack} />
        
        {viewMode === "mindmap" && (
          <CaseStudy1_1_Mindmap jumpToSection={jumpToSection} project={project} />
        )}
        
        {viewMode === "all" && (
          <>
            <CaseStudy1_1_Mindmap jumpToSection={jumpToSection} project={project} />
            <CaseStudy1_1_Sections project={project} />
          </>
        )}
      </main>

      {isModalOpen && <CaseStudy1_1_Modal onClose={() => setIsModalOpen(false)} />}
      
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none animate-in fade-in slide-in-from-bottom-4">
          <div className="glass-base bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-xs backdrop-blur-2xl border border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4 text-sky-500 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
