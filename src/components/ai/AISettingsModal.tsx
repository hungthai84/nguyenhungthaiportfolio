import React, { useState } from 'react';
import { Settings, Volume2, Sliders, Database, Trash2, X, Shield, Sparkles, HelpCircle } from 'lucide-react';
import { AISettingsConfig } from '../../types/ai';
import { AIFaqEditor } from './AIFaqEditor';
import { voiceEngine } from '../../services/voiceEngine';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AISettingsConfig;
  onUpdateConfig: (newConfig: Partial<AISettingsConfig>) => void;
  onClearChat: () => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onClearChat
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'faq'>('general');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl glass-surface rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Cấu hình Trợ lý AI (Trí Nhân AI)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/30 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'general'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 glass-surface'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Cấu hình Chung & Giọng nói
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2.5 font-bold text-xs rounded-t-xl transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'faq'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 glass-surface'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Quản lý FAQ Câu Hỏi Cấu Hình Sẵn
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'general' ? (
            <div className="space-y-5 text-xs text-slate-700 dark:text-slate-200">
              {/* AI Operating Mode */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700/60">
                <label className="font-bold text-slate-900 dark:text-white block mb-1 text-sm">
                  Chế độ hoạt động của AI (AI Operating Mode)
                </label>
                <p className="text-slate-500 dark:text-slate-400 mb-3 text-[11px]">
                  Mặc định hệ thống ưu tiên sử dụng dữ liệu nội bộ (Local Knowledge & FAQ) để đảm bảo tốc độ cực nhanh và không tốn chi phí API.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onUpdateConfig({ mode: 'auto' })}
                    className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                      config.mode === 'auto'
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-700 glass-surface hover:border-indigo-400'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AUTO MODE</span>
                    <span className="text-[9px] font-normal opacity-80">(Mặc định khuyên dùng)</span>
                  </button>

                  <button
                    onClick={() => onUpdateConfig({ mode: 'local' })}
                    className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                      config.mode === 'local'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-700 glass-surface hover:border-emerald-400'
                    }`}
                  >
                    <Database className="w-4 h-4" />
                    <span>LOCAL MODE</span>
                    <span className="text-[9px] font-normal opacity-80">(100% Offline / Không API)</span>
                  </button>

                  <button
                    onClick={() => onUpdateConfig({ mode: 'api' })}
                    className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                      config.mode === 'api'
                        ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-700 glass-surface hover:border-purple-400'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>API MODE</span>
                    <span className="text-[9px] font-normal opacity-80">(Bật Gemini AI Fallback)</span>
                  </button>
                </div>
              </div>

              {/* Voice Engine Settings */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Giọng đọc Tiếng Việt Nam (Web Speech TTS)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.voiceEnabled}
                      onChange={e => onUpdateConfig({ voiceEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-slate-200 dark:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:peer-focus:ring-indigo-800 peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div>
                  <div className="flex justify-between text-slate-500 mb-1">
                    <span>Tốc độ đọc (Voice Speed):</span>
                    <span className="font-bold text-indigo-600">{config.voiceRate}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="1.25"
                    step="0.05"
                    value={config.voiceRate}
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      onUpdateConfig({ voiceRate: val });
                      voiceEngine.setRate(val);
                    }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Answer Length Preference */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block mb-2">Độ dài câu trả lời mặc định</span>
                <div className="flex gap-2">
                  {(['short', 'medium', 'detailed'] as const).map(len => (
                    <button
                      key={len}
                      onClick={() => onUpdateConfig({ answerLength: len })}
                      className={`flex-1 py-2 rounded-xl font-bold uppercase text-[10px] transition-all border ${
                        config.answerLength === len
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-700 glass-surface text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {len === 'short' ? 'Ngắn gọn' : len === 'medium' ? 'Chuẩn (Medium)' : 'Chi tiết'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Chat Session */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Xóa lịch sử hội thoại hiện tại</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Không ảnh hưởng đến cấu hình FAQ hay dữ liệu Hồ sơ.</span>
                </div>
                <button
                  onClick={() => {
                    onClearChat();
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-600 dark:text-red-400 rounded-xl font-bold text-xs border border-red-200 dark:border-red-800/50"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa hội thoại
                </button>
              </div>
            </div>
          ) : (
            <AIFaqEditor />
          )}
        </div>
      </div>
    </div>
  );
};
