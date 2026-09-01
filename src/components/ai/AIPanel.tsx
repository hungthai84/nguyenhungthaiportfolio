import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, Mic, MicOff, Settings, X, Minus, RefreshCw, Volume2, ShieldCheck, HelpCircle, BookOpen } from 'lucide-react';
import { AIMessage as AIMessageType, AISettingsConfig } from '../../types/ai';
import { AIMessage } from './AIMessage';
import { AISampleQuestionsModal, SAMPLE_CATEGORIES } from './AISampleQuestionsModal';
import { playUiSound } from '../../lib/sound';

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: AIMessageType[];
  onSendMessage: (text: string) => void;
  onQuickQuestionSelect: (question: string) => void;
  config: AISettingsConfig;
  onOpenSettings: () => void;
  isSpeaking: boolean;
  speakingMessageId: string | null;
  onSpeakText: (text: string, msgId: string) => void;
  onStopSpeak: () => void;
  onActionClick: (actionType: string, target?: string) => void;
  isLoading: boolean;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onQuickQuestionSelect,
  config,
  onOpenSettings,
  isSpeaking,
  speakingMessageId,
  onSpeakText,
  onStopSpeak,
  onActionClick,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isDropTopOpen, setIsDropTopOpen] = useState(false);
  const [activeDropCategory, setActiveDropCategory] = useState<string>('profile');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectSampleQuestion = (q: string) => {
    setInputText(q);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  // Web Speech API Voice Recognition (SpeechToText)
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          onSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const quickQuestionsList = [
    "Anh Nguyễn Hùng Thái là ai?",
    "Bao nhiêu năm kinh nghiệm CSKH & Call Center?",
    "Các kỹ năng CRM & Công cụ đã triển khai",
    "Những dự án chuyển đổi số tiêu biểu",
    "Học vấn & Chứng chỉ quốc tế",
    "Làm thế nào để liên hệ & Tải CV?"
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay (Tap outside to close on mobile) */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9995] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs sm:hidden animate-fade-in"
      />

      <div
        id="ai-assistant-panel"
        className="fixed z-[9998] bottom-18 sm:bottom-22 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-[420px] h-[calc(100vh-100px)] max-h-[620px] bg-white/45 dark:bg-slate-900/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/60 dark:border-white/20 flex flex-col overflow-hidden animate-slide-up transition-all duration-300"
      >
      {/* HEADER */}
      <div className="flex items-center justify-between p-3.5 px-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl text-slate-800 dark:text-white border-b border-slate-200/60 dark:border-white/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-600 flex items-center justify-center p-0.5 shadow-md">
              <div className="w-full h-full glass-surface dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-200 dark:border-slate-900"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm tracking-wide text-slate-900 dark:text-white">{config.aiName || "Trí Nhân AI"}</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 border border-indigo-400/30 font-semibold">
                {config.mode.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-300">Trợ lý đại diện hồ sơ Nguyễn Hùng Thái</p>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-colors"
            title="Cấu hình Trợ lý AI"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-colors"
            title="Thu nhỏ Trợ lý"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VOICE SPEAKING BAR STATUS */}
      {isSpeaking && (
        <div className="bg-emerald-500/10 dark:bg-emerald-950/30 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 shrink-0 animate-fade-in">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="font-semibold text-[11px]">Đang đọc câu trả lời bằng giọng Tiếng Việt...</span>
          </div>
          <button
            onClick={onStopSpeak}
            className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
          >
            Dừng đọc
          </button>
        </div>
      )}

      {/* CHAT MESSAGES AREA */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {/* Rendered Messages */}
        {messages.map(msg => (
          <AIMessage
            key={msg.id}
            message={msg}
            onSpeak={text => onSpeakText(text, msg.id)}
            onStopSpeak={onStopSpeak}
            isSpeakingThis={isSpeaking && speakingMessageId === msg.id}
            onActionClick={onActionClick}
            onSuggestionClick={onQuickQuestionSelect}
          />
        ))}

        {/* Loading / Typing Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs w-max animate-pulse">
            <Bot className="w-4 h-4 text-indigo-500" />
            <span>Trí Nhân AI đang tra cứu hồ sơ...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* DROP-TOP LIST FOR 60 QUESTIONS */}
      {isDropTopOpen && (
        <div className="absolute bottom-[108px] left-3 right-3 max-h-[300px] glass-surface backdrop-blur-2xl rounded-2xl border border-amber-300/60 dark:border-amber-700/60 shadow-2xl z-50 overflow-hidden flex flex-col animate-slide-up transition-all duration-200">
          {/* Drop-top Header */}
          <div className="px-3 py-2 bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between shrink-0">
            <span className="text-[11px] font-black text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Danh sách 60 Câu hỏi mẫu
            </span>
            <button 
              type="button" 
              onClick={() => {
                playUiSound("click");
                setIsDropTopOpen(false);
              }}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Category Tabs inside drop-top */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar p-1.5 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-150 dark:border-slate-800/50 shrink-0">
            {SAMPLE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setActiveDropCategory(cat.id);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  activeDropCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Scrollable Questions list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[190px] scrollbar-thin">
            {SAMPLE_CATEGORIES.find(c => c.id === activeDropCategory)?.questions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playUiSound("click");
                  handleSelectSampleQuestion(q);
                  setIsDropTopOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-950 dark:hover:text-amber-200 border border-transparent hover:border-amber-500/20 transition-all cursor-pointer"
              >
                {idx + 1}. {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUICK ACTION BAR ABOVE INPUT FORM */}
      <div className="px-3 pt-2 pb-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-t border-slate-200/60 dark:border-white/20 shrink-0 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsSampleModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 hover:from-amber-500/25 hover:to-purple-500/25 text-amber-800 dark:text-amber-200 border border-amber-300/60 dark:border-amber-700/60 text-[11px] font-black shadow-2xs hover:scale-102 active:scale-98 transition-all cursor-pointer backdrop-blur-xs"
          title="Mở danh sách 60 câu hỏi mẫu theo 6 danh mục"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Danh sách câu hỏi mẫu</span>
          <span 
            onClick={(e) => {
              e.stopPropagation();
              playUiSound("click");
              setIsDropTopOpen(!isDropTopOpen);
            }}
            className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-900 dark:text-white cursor-pointer hover:bg-amber-600 active:scale-95 transition-all"
            title="Bấm để xem nhanh danh sách câu hỏi mẫu"
          >
            60 CÂU
          </span>
        </button>

        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
          6 Danh mục • Chọn để điền nhanh
        </span>
      </div>

      {/* FOOTER INPUT FORM */}
      <div className="p-3 pt-1.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-t border-slate-200/40 dark:border-white/10 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-800 border border-white/50 dark:border-slate-700/50'
            }`}
            title={isListening ? 'Đang lắng nghe...' : 'Nói câu hỏi qua Micro (Giọng nói)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder={isListening ? 'Đang nghe bạn nói...' : 'Nhập câu hỏi về Nguyễn Hùng Thái...'}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-300/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500 dark:text-slate-400 shadow-2xs"
          />

          {/* Submit Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 text-white shadow-md transition-all active:scale-95 flex items-center justify-center shrink-0"
            title="Gửi câu hỏi"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* SAMPLE QUESTIONS LIST MODAL */}
      <AISampleQuestionsModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onSelectQuestion={handleSelectSampleQuestion}
      />
    </div>
  </>
);
};
