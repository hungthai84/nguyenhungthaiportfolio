import React from 'react';
import { Sparkles, Bot, X, Volume2 } from 'lucide-react';

interface AIButtonProps {
  onClick: () => void;
  isOpen: boolean;
  aiName?: string;
  isSpeaking?: boolean;
}

export const AIButton: React.FC<AIButtonProps> = ({
  onClick,
  isOpen,
  aiName = "Trí Nhân AI",
  isSpeaking = false
}) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] flex items-center gap-2 pointer-events-auto group">
      {/* Floating Tooltip Tag formatted like menu icon label */}
      {!isOpen && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-surface dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-black border border-slate-200/20 dark:border-white/20 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Hỏi {aiName}</span>
        </div>
      )}

      {/* Main Floating Trigger Button formatted like menu icon */}
      <button
        id="btn-open-ai-assistant"
        onClick={onClick}
        aria-label={`Mở Trợ lý ${aiName}`}
        className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer backdrop-blur-md ${
          isOpen
            ? 'bg-slate-900/90 text-indigo-300 border border-indigo-400/60 rotate-90 scale-105 shadow-indigo-500/20'
            : 'bg-slate-900/85 dark:bg-slate-900/90 text-purple-400 dark:text-purple-300 border border-white/30 dark:border-slate-700/80 hover:bg-slate-900 hover:text-purple-300 hover:scale-110 active:scale-95 shadow-purple-500/20'
        }`}
      >
        {/* Glow ring */}
        {!isOpen && (
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-sm group-hover:opacity-80 transition-opacity"></span>
        )}

        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 text-indigo-300" />
          ) : isSpeaking ? (
            <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
          ) : (
            <Bot className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-all" />
          )}
        </div>

        {/* Live Status Badge */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900"></span>
          </span>
        )}
      </button>
    </div>
  );
};

