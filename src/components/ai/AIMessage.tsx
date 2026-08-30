import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ExternalLink, Download, PhoneCall, Bot, User, Sparkles } from 'lucide-react';
import { AIMessage as AIMessageType } from '../../types/ai';

interface AIMessageProps {
  message: AIMessageType;
  onSpeak?: (text: string) => void;
  onStopSpeak?: () => void;
  isSpeakingThis?: boolean;
  onActionClick?: (actionType: string, target?: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

export const AIMessage: React.FC<AIMessageProps> = ({
  message,
  onSpeak,
  onStopSpeak,
  isSpeakingThis = false,
  onActionClick,
  onSuggestionClick
}) => {
  const [copied, setCopied] = useState(false);
  const isAI = message.sender === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceBadge = () => {
    if (!message.source) return null;
    switch (message.source) {
      case 'faq':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">✓ Câu trả lời cấu hình sẵn (FAQ)</span>;
      case 'knowledge':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium">✓ Hồ sơ cá nhân</span>;
      case 'synthesis':
      case 'api':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-medium">✦ AI Tổng hợp</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`flex gap-3 mb-4 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {/* Avatar for AI */}
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs shadow-md shrink-0 mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
        {/* Message Bubble */}
        <div
          className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
            isAI
              ? 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-sm backdrop-blur-md'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm shadow-indigo-500/20'
          }`}
        >
          {/* Text Content */}
          <div className="whitespace-pre-wrap font-sans">{message.text}</div>

          {/* Source Badge & Action Toolbar for AI Message */}
          {isAI && (
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {getSourceBadge()}
                <span className="text-[10px] text-slate-400">{message.timestamp}</span>
              </div>

              <div className="flex items-center gap-1">
                {/* Voice Speak Button */}
                {message.canSpeak !== false && onSpeak && (
                  <button
                    onClick={() => (isSpeakingThis ? onStopSpeak?.() : onSpeak(message.text))}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      isSpeakingThis
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 animate-pulse'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                    title={isSpeakingThis ? 'Dừng đọc' : 'Đọc câu trả lời (Giọng Việt Nam)'}
                  >
                    {isSpeakingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                )}

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                  title="Sao chép nội dung"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Chips (e.g., Navigate, Download CV, Contact) */}
        {isAI && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actions.map((act, idx) => (
              <button
                key={idx}
                onClick={() => onActionClick?.(act.type, act.target)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-xs"
              >
                {act.type === 'navigate' && <ExternalLink className="w-3.5 h-3.5" />}
                {act.type === 'download_cv' && <Download className="w-3.5 h-3.5" />}
                {act.type === 'contact' && <PhoneCall className="w-3.5 h-3.5" />}
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Follow-up Suggestions */}
        {isAI && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="text-[11px] text-slate-400 w-full mb-0.5">Gợi ý câu hỏi tiếp theo:</span>
            {message.suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick?.(sug)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 text-xs transition-colors border border-slate-200/60 dark:border-slate-700/60"
              >
                {sug}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Avatar for User */}
      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xs shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
