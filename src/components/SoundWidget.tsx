import React, { useState, useEffect } from "react";
import { 
  Volume2, VolumeX, Music, Sliders, Check, 
  MousePointer, Sparkles, Zap, Droplets, Palette,
  Settings2, X, PowerOff
} from "lucide-react";
import { useSound } from "../context/SoundContext";
import { useLanguage } from "../i18n";
import { useCursor, CursorEffectType } from "../context/CursorContext";
import { SoundType } from "../utils/soundEffects";

export default function SoundWidget() {
  const { isMuted, volume, toggleMute, setVolume, playSound } = useSound();
  const { cursorEffect, setCursorEffect, cursorEffects } = useCursor();
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"sound" | "cursor">("sound");
  const [isCursorDropdownOpen, setIsCursorDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
      if (!(event.target as Element).closest('.sound-widget-container')) {
        setIsOpen(false);
        setIsCursorDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const testSounds: { type: SoundType; labelVi: string; labelEn: string }[] = [
    { type: "click", labelVi: "Tiếng Click", labelEn: "Click" },
    { type: "hover", labelVi: "Rê chuột (Hover)", labelEn: "Hover" },
    { type: "switch", labelVi: "Chuyển trang (Slide)", labelEn: "Switch" },
    { type: "success", labelVi: "Thành công (Chime)", labelEn: "Success" },
    { type: "special", labelVi: "Phép thuật (Sparkle)", labelEn: "Sparkle" },
    { type: "warp", labelVi: "Warp (Woosh)", labelEn: "Warp" },
  ];

  const getCursorIcon = (id: CursorEffectType) => {
    switch (id) {
      case "off": return PowerOff;
      case "sparkles": return Sparkles;
      case "cyber": return Zap;
      case "bubbles": return Droplets;
      case "clay": return Palette;
      default: return MousePointer;
    }
  };

  const CurrentCursorIcon = getCursorIcon(cursorEffect);

  return (
    <div className="relative flex items-center sound-widget-container">
      {/* Group Controls near Speaker: Speaker Button + Cursor Quick Trigger + Settings */}
      <div className="flex items-center gap-1">
        
        {/* 1. Main Mute / Unmute Speaker Button */}
        <button
          onClick={toggleMute}
          data-no-click-sound="true"
          className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isMuted
              ? "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              : "text-brand-primary bg-brand-primary/15 shadow-2xs hover:scale-105"
          }`}
          title={isMuted ? (lang === "vi" ? "Bật âm thanh Website" : "Enable Sound") : (lang === "vi" ? "Tắt âm thanh Website" : "Mute Sound")}
        >
          {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
        </button>

        {/* 2. Quick Cursor Effect Trigger Button right beside Speaker */}
        <button
          onClick={() => {
            playSound("click");
            setIsCursorDropdownOpen(!isCursorDropdownOpen);
            setIsOpen(false);
          }}
          className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isCursorDropdownOpen 
              ? "bg-indigo-500 text-white shadow-md scale-105" 
              : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/15"
          }`}
          title={lang === "vi" ? "Tùy chọn kiểu hiệu ứng con trỏ (có nút tắt)" : "Cursor Effect Options (includes Turn Off)"}
        >
          <CurrentCursorIcon className="w-4 h-4" />
        </button>

        {/* 3. Sound Equalizer Waves Animation when not muted */}
        {!isMuted && (
          <div 
            onClick={() => {
              setActiveTab("sound");
              setIsOpen(!isOpen);
              setIsCursorDropdownOpen(false);
            }}
            className="flex items-end gap-0.5 px-0.5 h-3.5 cursor-pointer" 
            title={lang === "vi" ? "Tùy chỉnh âm thanh" : "Sound settings"}
          >
            <span className="w-0.5 h-2.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-0.5 h-3.5 bg-brand-primary rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-0.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:300ms]" />
            <span className="w-0.5 h-3 bg-brand-primary rounded-full animate-bounce [animation-delay:75ms]" />
          </div>
        )}

        {/* 4. Mini Settings Trigger */}
        <button
          onClick={() => {
            playSound("click");
            setIsOpen(!isOpen);
            setIsCursorDropdownOpen(false);
          }}
          className="p-1 text-brand-text-muted hover:text-brand-text-light rounded-full hover:bg-brand-border/40 transition-colors cursor-pointer"
          title={lang === "vi" ? "Bảng cài đặt Âm thanh & Con trỏ" : "Audio & Cursor Settings"}
        >
          <Sliders className="w-4 h-4" />
        </button>

      </div>

      {/* QUICK CURSOR DROPDOWN (Direct 5 Cursor Effects Picker) */}
      {isCursorDropdownOpen && (
        <div className="absolute bottom-11 left-0 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-black text-indigo-600 dark:text-indigo-400">
              <MousePointer className="w-4 h-4" />
              <span>{lang === "vi" ? `Tùy chọn Con trỏ Chuột (${cursorEffects.length})` : `Cursor Effects (${cursorEffects.length})`}</span>
            </div>
            <button
              onClick={() => setIsCursorDropdownOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {cursorEffects.map((effect) => {
              const isSelected = cursorEffect === effect.id;
              const Icon = getCursorIcon(effect.id);
              return (
                <button
                  key={effect.id}
                  onClick={() => {
                    playSound("success");
                    setCursorEffect(effect.id);
                    setIsCursorDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div 
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? "bg-white/20 text-white" 
                          : "bg-slate-100 dark:bg-slate-800 text-indigo-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">
                        {lang === "vi" ? effect.nameVi : effect.nameEn}
                      </div>
                      <div className={`text-[10px] truncate ${isSelected ? "text-indigo-100" : "text-slate-400"}`}>
                        {lang === "vi" ? effect.descVi : effect.descEn}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 shrink-0 text-white ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* FULL SETTINGS PANEL (Sound + Cursor tabs) */}
      {isOpen && (
        <div className="absolute bottom-11 left-0 w-80 bg-brand-card/95 backdrop-blur-2xl border border-brand-border p-4 rounded-2xl shadow-2xl space-y-3 z-50 text-brand-text-light text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Header & Tabs */}
          <div className="flex items-center justify-between pb-2 border-b border-brand-border">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab("sound")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "sound"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "text-brand-text-muted hover:text-brand-text-light"
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? "Âm thanh" : "Sound"}</span>
              </button>
              <button
                onClick={() => setActiveTab("cursor")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "cursor"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "text-brand-text-muted hover:text-brand-text-light"
                }`}
              >
                <MousePointer className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? `Con trỏ (${cursorEffects.length})` : `Cursor (${cursorEffects.length})`}</span>
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-text-muted hover:text-brand-text-light font-bold text-xs p-1"
            >
              ✕
            </button>
          </div>

          {/* TAB 1: SOUND SETTINGS */}
          {activeTab === "sound" && (
            <div className="space-y-3">
              {/* Status & Volume Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-brand-text-muted">{lang === "vi" ? "Âm lượng:" : "Volume:"}</span>
                  <span className="font-mono font-bold text-brand-primary">
                    {isMuted ? "Muted" : `${Math.round(volume * 100)}%`}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={volume}
                  disabled={isMuted}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-primary disabled:opacity-40"
                />
              </div>

              {/* Test Interactive Sound Buttons */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-text-muted block">
                  {lang === "vi" ? "Thử nghiệm âm thanh:" : "Test sound effects:"}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {testSounds.map((s) => (
                    <button
                      key={s.type}
                      disabled={isMuted}
                      onClick={() => playSound(s.type)}
                      className="p-1.5 rounded-lg bg-brand-border/30 hover:bg-brand-border/60 text-[10px] font-semibold text-brand-text-light border border-brand-border/40 transition-all text-left truncate active:scale-95 disabled:opacity-40 cursor-pointer"
                    >
                      {lang === "vi" ? s.labelVi : s.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-brand-text-muted italic pt-1 border-t border-brand-border/50 text-center">
                {lang === "vi" 
                  ? "Tự động phát khi rê chuột, bấm nút & tương tác." 
                  : "Auto-plays on hover, clicks & interactions."}
              </p>
            </div>
          )}

          {/* TAB 2: 5 CURSOR EFFECTS SELECTOR */}
          {activeTab === "cursor" && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-text-muted block">
                {lang === "vi" ? "Chọn kiểu hiệu ứng con trỏ chuột:" : "Select mouse cursor effect style:"}
              </span>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {cursorEffects.map((effect) => {
                  const isSelected = cursorEffect === effect.id;
                  const Icon = getCursorIcon(effect.id);
                  return (
                    <button
                      key={effect.id}
                      onClick={() => {
                        playSound("success");
                        setCursorEffect(effect.id);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-primary text-white shadow-md font-bold"
                          : "bg-brand-border/20 hover:bg-brand-border/50 text-brand-text-light border border-brand-border/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div 
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? "bg-white/20 text-white" 
                              : "bg-brand-border/30 text-brand-primary"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs truncate font-bold">
                            {lang === "vi" ? effect.nameVi : effect.nameEn}
                          </div>
                          <div className={`text-[10px] truncate ${isSelected ? "text-white/80" : "text-brand-text-muted"}`}>
                            {lang === "vi" ? effect.descVi : effect.descEn}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white ml-1" />}
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] text-brand-text-muted italic pt-1 border-t border-brand-border/50 text-center">
                {lang === "vi" 
                  ? "Hiệu ứng phản hồi mượt mà theo chuyển động & nhấp chuột." 
                  : "Smooth response to movement & mouse clicks."}
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
