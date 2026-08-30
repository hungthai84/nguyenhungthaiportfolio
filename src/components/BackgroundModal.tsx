import React, { useState, useRef } from "react";
import { 
  X, 
  Plus, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Trash2, 
  Check, 
  Download, 
  Upload, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Copy, 
  CheckCheck,
  FileJson,
  Layers,
  ExternalLink,
  Film
} from "lucide-react";
import { useBackground, PRESET_BACKGROUNDS } from "../context/BackgroundContext";
import { useLanguage } from "../i18n";

export default function BackgroundModal() {
  const { 
    config, 
    isModalOpen, 
    closeModal, 
    addBackgroundLink, 
    removeBackground, 
    setActiveBackground, 
    setOverlayOpacity, 
    setBlurAmount, 
    resetToDefaultGradient,
    exportConfigToJson,
    importConfigFromJson,
    downloadJsonFile
  } = useBackground();

  const { lang } = useLanguage();
  const [urlInput, setUrlInput] = useState("");
  const [selectedType, setSelectedType] = useState<'auto' | 'image' | 'video'>('auto');
  const [inputError, setInputError] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [activeTab, setActiveTab] = useState<'my-backgrounds' | 'presets' | 'json-tools' | 'settings'>('my-backgrounds');
  
  // JSON input state for direct pasting
  const [jsonPasteInput, setJsonPasteInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError("");
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setInputError(lang === "vi" ? "Vui lòng dán liên kết ảnh hoặc video." : "Please enter a valid image or video URL.");
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setInputError(lang === "vi" ? "Định dạng URL không hợp lệ (cần bắt đầu bằng http:// hoặc https://)" : "Invalid URL format.");
      return;
    }

    const explicitType = selectedType === 'auto' ? undefined : selectedType;
    const ok = addBackgroundLink(trimmed, explicitType);
    if (ok) {
      setUrlInput("");
      showToast(lang === "vi" ? "Đã thêm và áp dụng hình nền thành công!" : "Background added and applied successfully!");
    }
  };

  const handleCopyJson = () => {
    const json = exportConfigToJson();
    navigator.clipboard.writeText(json);
    setCopiedJson(true);
    showToast(lang === "vi" ? "Đã sao chép cấu hình JSON vào bộ nhớ tạm!" : "Copied JSON configuration to clipboard!");
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importConfigFromJson(content);
        if (result.success) {
          showToast(result.message);
          setJsonError("");
        } else {
          setJsonError(result.message);
        }
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImportPastedJson = () => {
    setJsonError("");
    if (!jsonPasteInput.trim()) {
      setJsonError(lang === "vi" ? "Vui lòng dán chuỗi JSON vào ô bên dưới." : "Please paste a JSON string.");
      return;
    }
    const result = importConfigFromJson(jsonPasteInput);
    if (result.success) {
      showToast(result.message);
      setJsonPasteInput("");
    } else {
      setJsonError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {lang === "vi" ? "Quản lý Hình nền & Video nền" : "Background & Video Wallpaper Manager"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === "vi" 
                  ? "Lưu trực tiếp trên website để sử dụng lâu dài • Nhập & Xuất JSON" 
                  : "Saved permanently on website • JSON Import & Export"}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Alert */}
        {successToast && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 animate-fadeIn">
            <CheckCheck className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Quick Link Input Bar (Không cần tạo tên, chỉ cần dán link) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
          <form onSubmit={handleAddLink} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-blue-500" />
                <span>{lang === "vi" ? "Dán liên kết (Video / Hình ảnh) - Không cần tạo tên:" : "Paste Video / Image URL (No name needed):"}</span>
              </label>

              {/* Type Switcher */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedType('auto')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${selectedType === 'auto' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  Auto
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('image')}
                  className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${selectedType === 'image' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Ảnh</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('video')}
                  className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${selectedType === 'video' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
                >
                  <VideoIcon className="w-3 h-3" />
                  <span>Video</span>
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={lang === "vi" ? "Ví dụ: https://domain.com/video.mp4 hoặc https://domain.com/photo.jpg" : "e.g. https://domain.com/video.mp4 or https://images.unsplash.com/..."}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === "vi" ? "Thêm & Áp dụng" : "Add & Apply"}</span>
              </button>
            </div>

            {inputError && (
              <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
            )}
          </form>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-950/20 text-xs sm:text-sm font-bold gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('my-backgrounds')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'my-backgrounds'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{lang === "vi" ? `Đã lưu (${config.items.length})` : `Saved (${config.items.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === "vi" ? "Kho mẫu tuyển chọn" : "Curated Presets"}</span>
          </button>

          <button
            onClick={() => setActiveTab('json-tools')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'json-tools'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>{lang === "vi" ? "Nhập & Xuất JSON" : "Import & Export JSON"}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{lang === "vi" ? "Tùy chỉnh hiển thị" : "Display Adjustments"}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: MY SAVED BACKGROUNDS */}
          {activeTab === 'my-backgrounds' && (
            <div className="space-y-4">
              
              {/* Default Theme Background Card */}
              <div 
                onClick={resetToDefaultGradient}
                className={`p-3 sm:p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  config.activeType === 'gradient'
                    ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {lang === "vi" ? "Nền Gradient Glassmorphism (Mặc định)" : "Glassmorphism Gradient (Default)"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {lang === "vi" ? "Chuyển sắc tương thích tự động theo Light / Dark mode" : "Adaptive multi-color gradient"}
                    </p>
                  </div>
                </div>

                {config.activeType === 'gradient' && (
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === "vi" ? "Đang dùng" : "Active"}</span>
                  </span>
                )}
              </div>

              {/* Saved items list */}
              {config.items.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {lang === "vi" 
                      ? "Chưa có liên kết nền nào được thêm. Hãy dán link ảnh/video ở ô phía trên hoặc chọn từ kho mẫu!" 
                      : "No custom backgrounds yet. Paste a link above or pick from presets!"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.items.map((item, idx) => {
                    const isActive = config.activeId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                          isActive
                            ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-400'
                        }`}
                      >
                        {/* Preview */}
                        <div className="h-28 w-full bg-slate-950 relative overflow-hidden group">
                          {item.type === 'video' ? (
                            <video
                              src={item.url}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={item.url}
                              alt="Wallpaper"
                              className="w-full h-full object-cover"
                            />
                          )}

                          {/* Overlay Tag */}
                          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-bold text-white backdrop-blur-xs">
                            {item.type === 'video' ? <VideoIcon className="w-3 h-3 text-cyan-400" /> : <ImageIcon className="w-3 h-3 text-amber-400" />}
                            <span className="uppercase">{item.type} #{idx + 1}</span>
                          </div>

                          {/* Action overlay on hover */}
                          <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg text-xs flex items-center gap-1 backdrop-blur-sm"
                              title="Mở link gốc"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => removeBackground(item.id)}
                              className="p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg text-xs flex items-center gap-1 backdrop-blur-sm"
                              title="Xóa hình này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Card Info & Select Button */}
                        <div className="p-3 flex items-center justify-between gap-2">
                          <div className="overflow-hidden">
                            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate" title={item.url}>
                              {item.url}
                            </p>
                          </div>

                          <button
                            onClick={() => setActiveBackground(item.id, item.type, item.url)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
                              isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-700 hover:bg-blue-500 hover:text-white text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {isActive ? (lang === "vi" ? "Đang chọn" : "Active") : (lang === "vi" ? "Sử dụng" : "Apply")}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: PRESET GALLERY */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === "vi" 
                  ? "Bấm vào bất kỳ mẫu nào bên dưới để áp dụng trực tiếp làm hình nền website:" 
                  : "Click any curated preset below to apply immediately:"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_BACKGROUNDS.map((preset) => {
                  const isActive = config.activeId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setActiveBackground(preset.id, preset.type, preset.url)}
                      className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all relative ${
                        isActive
                          ? 'border-blue-500 ring-2 ring-blue-500/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'
                      }`}
                    >
                      <div className="h-32 w-full bg-slate-950 relative overflow-hidden">
                        {preset.type === 'video' ? (
                          <video
                            src={preset.url}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            muted
                            autoPlay
                            loop
                            playsInline
                          />
                        ) : (
                          <img
                            src={preset.url}
                            alt={preset.tag}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-white drop-shadow-md">
                            {preset.tag}
                          </span>
                          {isActive && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: IMPORT & EXPORT JSON */}
          {activeTab === 'json-tools' && (
            <div className="space-y-5">
              
              {/* Export Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-500" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {lang === "vi" ? "Xuất cấu hình JSON (Export)" : "Export JSON Configuration"}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJson}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-colors flex items-center gap-1.5"
                    >
                      {copiedJson ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedJson ? (lang === "vi" ? "Đã chép" : "Copied") : (lang === "vi" ? "Sao chép JSON" : "Copy JSON")}</span>
                    </button>

                    <button
                      onClick={downloadJsonFile}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === "vi" ? "Tải file .json" : "Download .json"}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === "vi"
                    ? "Sao lưu toàn bộ danh sách liên kết hình/video nền và các thông số hiển thị để lưu trữ hoặc chuyển sang máy khác."
                    : "Backup your entire background library and settings to transfer or restore anytime."}
                </p>
              </div>

              {/* Import Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-purple-500" />
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {lang === "vi" ? "Nhập cấu hình JSON (Import)" : "Import JSON Configuration"}
                    </h4>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === "vi" ? "Tải lên file .json" : "Upload .json file"}</span>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <textarea
                    rows={4}
                    placeholder={lang === "vi" ? "Hoặc dán nội dung chuỗi JSON vào đây..." : "Or paste raw JSON content here..."}
                    value={jsonPasteInput}
                    onChange={(e) => setJsonPasteInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />

                  {jsonError && (
                    <p className="text-xs text-red-500 font-medium">{jsonError}</p>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleImportPastedJson}
                      className="px-4 py-1.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all shadow-xs"
                    >
                      {lang === "vi" ? "Áp dụng JSON vừa dán" : "Import from Pasted Text"}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: VISUAL DISPLAY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-5 p-2">
              
              {/* Overlay Dim Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{lang === "vi" ? "Độ tối lớp phủ (Overlay Dim)" : "Overlay Dim (Readability)"}</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{config.overlayOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={config.overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === "vi" 
                    ? "Tăng độ tối giúp chữ và các thẻ nội dung website luôn rõ ràng, không bị chói mắt." 
                    : "Adjust dimming to ensure foreground text remains readable on bright backgrounds."}
                </p>
              </div>

              {/* Blur Slider */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{lang === "vi" ? "Độ mờ hậu cảnh (Background Blur)" : "Background Blur"}</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">{config.blurAmount}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={config.blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === "vi" 
                    ? "Làm mờ nền giúp tăng hiệu ứng chiều sâu 3D và tập trung thị giác vào nội dung." 
                    : "Add subtle blur to enhance 3D depth and focus on cards."}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === "vi" ? "Tự động lưu vĩnh viễn trong LocalStorage" : "Permanently preserved in LocalStorage"}</span>
          </div>

          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors"
          >
            {lang === "vi" ? "Đóng" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
}
