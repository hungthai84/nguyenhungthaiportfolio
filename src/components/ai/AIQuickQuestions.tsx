import React from 'react';
import { HelpCircle, Sparkles, BookOpen } from 'lucide-react';

interface AIQuickQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  onOpenSampleModal?: () => void;
}

export const AIQuickQuestions: React.FC<AIQuickQuestionsProps> = ({
  questions,
  onSelect,
  onOpenSampleModal,
}) => {
  return (
    <div className="p-3 my-2 bg-indigo-50/60 dark:bg-slate-800/50 rounded-2xl border border-indigo-100 dark:border-slate-700/60">
      <div className="flex items-center justify-between gap-1.5 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>CÂU HỎI NHANH VỀ HỒ SƠ</span>
        </div>

        {onOpenSampleModal && (
          <button
            onClick={onOpenSampleModal}
            className="flex items-center gap-1 text-[11px] font-black text-amber-600 dark:text-amber-400 hover:text-amber-700 bg-amber-100/70 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-300/40 dark:border-amber-800 transition-colors"
          >
            <BookOpen className="w-3 h-3 text-amber-500" />
            <span>Danh sách 60 câu mẫu →</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 text-xs text-left font-medium transition-all duration-200 shadow-xs border border-slate-200/60 dark:border-slate-700/60 hover:shadow-md group"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500 group-hover:text-white shrink-0 transition-colors" />
            <span className="line-clamp-2">{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

