import { PageBanner } from "./PageBanner";
import React, { useState, useRef, useMemo } from "react";
import { 
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
  Search,
  Maximize2,
  RefreshCw,
  Palette,
  Eye,
  Film,
  X
} from "lucide-react";
import { useBackground, PRESET_BACKGROUNDS, INITIAL_WALLPAPERS_FROM_JSON } from "../context/BackgroundContext";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

export default function Wallpapers() {
  const { 
    config, 
    addBackgroundLink, 
    removeBackground, 
    setActiveBackground, 
    setOverlayOpacity, 
    setBlurAmount, 
    resetToDefaultGradient,
    exportConfigToJson,
    importConfigFromJson,
    downloadJsonFile,
    resetToDefaultJsonLibrary
  } = useBackground();

  const { lang } = useLanguage();
  const [urlInput, setUrlInput] = useState("");
  const [selectedType, setSelectedType] = useState<'auto' | 'image' | 'video'>('auto');
  const [inputError, setInputError] = useState("");
  const [successToast, setSuccessToast] = useState("");
  
  // Filtering and Searching
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAddControls, setShowAddControls] = useState(false);
  const [showJsonStudio, setShowJsonStudio] = useState(false);
  const [jsonPasteInput, setJsonPasteInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      showToast(lang === "vi" ? "Đã thêm và kích hoạt hình nền thành công!" : "Background added and applied successfully!");
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
      setShowJsonStudio(false);
    } else {
      setJsonError(result.message);
    }
  };

  // Filtered List
  const filteredWallpapers = useMemo(() => {
    return config.items.filter((item) => {
      // Category filter
      if (activeCategory === "custom" && !item.isCustom && item.category !== "custom") return false;
      if (activeCategory === "video" && item.type !== "video") return false;
      if (activeCategory === "minimal" && item.category !== "minimal") return false;
      if (activeCategory === "abstract" && item.category !== "abstract") return false;
      if (activeCategory === "nature" && item.category !== "nature") return false;
      if (activeCategory === "gradient" && item.category !== "gradient") return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name?.toLowerCase().includes(query);
        const matchUrl = item.url.toLowerCase().includes(query);
        const matchTags = item.tags?.some(t => t.toLowerCase().includes(query));
        const matchCat = item.category?.toLowerCase().includes(query);
        if (!matchName && !matchUrl && !matchTags && !matchCat) return false;
      }

      return true;
    });
  }, [config.items, activeCategory, searchQuery]);

  const totalVideos = config.items.filter(it => it.type === 'video').length;
  const totalImages = config.items.filter(it => it.type === 'image' || it.type === 'beach').length;

  const categories = [
    { id: "all", label: lang === "vi" ? "Tất cả" : "All", count: config.items.length },
    { id: "custom", label: lang === "vi" ? "Đã lưu / Custom" : "Custom & Saved", count: config.items.filter(it => it.isCustom || it.category === 'custom').length },
    { id: "video", label: lang === "vi" ? "Video động" : "Live Video", count: totalVideos },
    { id: "minimal", label: lang === "vi" ? "Tối giản" : "Minimal", count: config.items.filter(it => it.category === 'minimal').length },
    { id: "abstract", label: lang === "vi" ? "Trừu tượng" : "Abstract", count: config.items.filter(it => it.category === 'abstract').length },
    { id: "nature", label: lang === "vi" ? "Thiên nhiên" : "Nature", count: config.items.filter(it => it.category === 'nature').length },
    { id: "gradient", label: lang === "vi" ? "Chuyển sắc" : "Gradient", count: config.items.filter(it => it.category === 'gradient').length },
  ];

  return (
    <section id="wallpapers" className="relative min-h-full flex flex-col justify-start px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-[10px]">
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileUpload}
        className="hidden"
      />
      <div className="w-full max-w-7xl mx-auto space-y-3 mb-[10px]">
        <PageBanner 
          title={lang === "vi" ? "Thư viện hình nền" : "Curated desktop wallpapers gallery"}
          subtitle={lang === "vi" ? "Bộ sưu tập hình nền đồ họa chất lượng cao, giao diện trực quan và phong cách thẩm mỹ đa dạng." : "Curated collection of high-resolution wallpapers, visual landscapes, and aesthetic backdrops."}
          tag={lang === "vi" ? "HÌNH NỀN" : "WALLPAPERS"}
          iconType="wallpapers"
          gradient="from-sky-950 via-teal-950 to-slate-950"
        />

        {/* Toolbar Bar: Moved under Banner without Studio button */}
        <div className="w-full p-3 sm:p-4 rounded-2xl glass-surface border border-brand-border/60 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <div className="px-2.5 py-1 rounded-lg glass-surface flex items-center gap-1.5 text-center shadow-xs">
                <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">{totalImages}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">ảnh</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg glass-surface flex items-center gap-1.5 text-center shadow-xs">
                <VideoIcon className="w-3.5 h-3.5 text-cyan-500" />
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">{totalVideos}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">video</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playUiSound("click");
                setShowAddControls(!showAddControls);
              }}
              className={`py-1.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border ${
                showAddControls 
                  ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>{lang === "vi" ? "Thêm nền" : "Add"}</span>
            </button>

            <button
              onClick={() => {
                playUiSound("click");
                fileInputRef.current?.click();
              }}
              className="py-1.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang === "vi" ? "Nhập JSON" : "Import JSON"}</span>
            </button>

            <button
              onClick={() => {
                playUiSound("click");
                downloadJsonFile();
              }}
              className="py-1.5 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>{lang === "vi" ? "Xuất JSON" : "Export JSON"}</span>
            </button>
          </div>
        </div>

        {/* Banner Row: Category Filter Tabs & Search Bar (Moved OUTSIDE) */}
        <div className="w-full p-4 rounded-2xl glass-surface border border-brand-border/60 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playUiSound("click");
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md font-black ring-1 ring-blue-500/20"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-brand-text-light border border-brand-border"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isActive ? "bg-blue-700 text-white font-bold" : "bg-slate-200 dark:bg-slate-700 text-brand-text-muted"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === "vi" ? "Tìm hình nền theo tên, tag..." : "Search wallpapers..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-8 py-1.5 text-xs rounded-xl bg-white/90 dark:bg-slate-950/90 border border-brand-border text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-light p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[1550px] mx-auto px-2 sm:px-6 w-full space-y-6">

        {/* Toast Alert */}
        {successToast && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 shadow-sm animate-fadeIn">
            <CheckCheck className="w-5 h-5 text-emerald-500" />
            <span>{successToast}</span>
          </div>
        )}

        {/* ================= 2. QUICK ADD BY URL & DISPLAY TUNING CONTROLS ================= */}
        {showAddControls && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fadeIn">
            
            {/* LEFT: Quick Add URL Box (7 Cols) */}
            <div className="lg:col-span-7 glass-card p-5 sm:p-6 rounded-3xl border border-brand-border/60 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>{lang === "vi" ? "Thêm hình / video nền bằng liên kết URL:" : "Add Wallpaper via Direct Link:"}</span>
                </span>

                {/* Type Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-brand-border/40 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedType('auto')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${selectedType === 'auto' ? 'bg-blue-600 text-white shadow-xs' : 'text-brand-text-muted hover:text-brand-text-light'}`}
                  >
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('image')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'image' ? 'bg-blue-600 text-white shadow-xs' : 'text-brand-text-muted hover:text-brand-text-light'}`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Ảnh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('video')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'video' ? 'bg-blue-600 text-white shadow-xs' : 'text-brand-text-muted hover:text-brand-text-light'}`}
                  >
                    <VideoIcon className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleAddLink} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder={lang === "vi" ? "Dán link ảnh (.jpg, .png, Unsplash, Pinterest...) hoặc video (.mp4)..." : "Paste image (.jpg, .png...) or video (.mp4, stream) URL..."}
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-surface border border-brand-border text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === "vi" ? "Thêm & Áp dụng" : "Add & Apply"}</span>
                  </button>
                </div>

                {inputError && (
                  <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
                )}
              </form>

              <div className="flex items-center justify-between text-[11px] text-brand-text-muted pt-1">
                <span>💡 {lang === "vi" ? "Hệ thống tự động lưu vĩnh viễn vào bộ nhớ trình duyệt." : "Auto-saved permanently in browser storage."}</span>
                <button 
                  type="button" 
                  onClick={resetToDefaultJsonLibrary} 
                  className="text-blue-500 hover:underline flex items-center gap-1 font-semibold"
                  title="Khôi phục toàn bộ danh sách 25+ hình nền gốc từ file JSON"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{lang === "vi" ? "Khôi phục kho JSON gốc" : "Restore original JSON library"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Live Visual Display Tuning (5 Cols) */}
            <div className="lg:col-span-5 glass-card p-5 sm:p-6 rounded-3xl border border-brand-border/60 shadow-md flex flex-col justify-between space-y-4">
              <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>{lang === "vi" ? "Tùy chỉnh hiệu ứng hiển thị:" : "Display Tuning:"}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Overlay Dim Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-text-light">
                    <span>{lang === "vi" ? "Độ tối lớp phủ" : "Overlay Dim"}</span>
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
                </div>

                {/* Blur Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-text-light">
                    <span>{lang === "vi" ? "Độ mờ hậu cảnh" : "Background Blur"}</span>
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
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-brand-border/50">
                <button
                  onClick={resetToDefaultGradient}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    config.activeType === 'gradient'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'glass-surface border-brand-border text-brand-text-light hover:border-blue-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Nền Gradient Mặc Định" : "Default Gradient"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadJsonFile}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-brand-text-light border border-brand-border text-xs transition-colors"
                    title="Tải file JSON cấu hình"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopyJson}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-brand-text-light border border-brand-border text-xs transition-colors"
                    title="Sao chép JSON"
                  >
                    {copiedJson ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= 3. JSON STUDIO EXPANDABLE DRAWER ================= */}
        {showJsonStudio && (
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 shadow-xl bg-purple-50/20 dark:bg-purple-950/20 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-purple-200/50 dark:border-purple-800/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-6 bg-purple-600 rounded-full shrink-0" />
                <FileJson className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-brand-text-light uppercase tracking-wide">
                  {lang === "vi" ? "JSON Studio • Nhập / Xuất & Chỉnh sửa trực tiếp" : "JSON Studio • Raw Config & Live Import"}
                </h3>
              </div>
              <div className="flex items-center gap-2">

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Tải lên file .json" : "Upload .json"}</span>
                </button>
                <button
                  onClick={downloadJsonFile}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-brand-text-light rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Tải về .json" : "Download .json"}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-brand-text-muted">
              {lang === "vi" 
                ? "Dán chuỗi JSON chứa danh sách hình nền (định dạng `customWallpapers` hoặc `allLinks`) để nhập tự động vào hệ thống:" 
                : "Paste raw JSON data containing wallpaper links to import directly:"}
            </p>

            <textarea
              rows={5}
              placeholder={lang === "vi" ? "Dán nội dung file JSON vào đây..." : "Paste JSON string here..."}
              value={jsonPasteInput}
              onChange={(e) => setJsonPasteInput(e.target.value)}
              className="w-full p-3 rounded-2xl glass-surface border border-brand-border text-xs font-mono text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-inner"
            />

            {jsonError && (
              <p className="text-xs text-red-500 font-bold">{jsonError}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setJsonPasteInput(exportConfigToJson())}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-brand-text-light text-xs font-bold rounded-xl transition-all"
              >
                {lang === "vi" ? "Nạp JSON hiện tại vào ô" : "Fill current JSON"}
              </button>
              <button
                onClick={handleImportPastedJson}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:opacity-90"
              >
                {lang === "vi" ? "Áp dụng JSON vừa dán" : "Import & Sync Now"}
              </button>
            </div>
          </div>
        )}

        {/* ================= 4. WALLPAPERS INTERACTIVE GALLERY GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          
          {/* Default Gradient Card */}
          <div 
            onDoubleClick={() => {
              playUiSound("special");
              resetToDefaultGradient();
            }}
            onClick={() => { playUiSound("click"); }}
            className={`group cursor-pointer aspect-video rounded-xl border overflow-hidden transition-all duration-300 relative shadow-xs hover:scale-103 ${
              config.activeType === 'gradient'
                ? 'border-blue-500 ring-2 ring-blue-500/25 bg-blue-50/10 dark:bg-blue-950/10'
                : 'border-brand-border/60 hover:border-blue-400'
            }`}
            title={lang === "vi" ? "Mặc định (Plain Mica Gradient) • Nhấp đúp để áp dụng" : "Default Mica Gradient • Double click to apply"}
          >
            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white/80 animate-pulse" />
              
              {config.activeType === 'gradient' && (
                <div className="absolute inset-0 bg-blue-600/25 flex items-center justify-center">
                  <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Hover Tooltip Overlay */}
            <div className="absolute inset-0 bg-slate-50/85 dark:bg-slate-950/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 pointer-events-none z-10">
              <span className="text-[10px] font-black text-slate-900 dark:text-white truncate">
                {lang === "vi" ? "Mặc định (Gradient)" : "Default Gradient"}
              </span>
              <span className="text-[8px] text-blue-300 font-bold">
                {lang === "vi" ? "Nháy đúp để áp dụng" : "Double click to set"}
              </span>
            </div>
          </div>

          {/* Wallpapers List from JSON */}
          {filteredWallpapers.map((item, idx) => {
            const isActive = config.activeId === item.id;
            return (
              <div
                key={item.id}
                onDoubleClick={() => {
                  playUiSound("special");
                  setActiveBackground(item.id, item.type, item.url);
                }}
                onClick={() => { playUiSound("click"); }}
                className={`group cursor-pointer aspect-video rounded-xl border overflow-hidden transition-all duration-300 relative shadow-xs hover:scale-103 ${
                  isActive
                    ? 'border-blue-500 ring-2 ring-blue-500/25 bg-blue-50/10 dark:bg-blue-950/10'
                    : 'border-brand-border/60 glass-surface hover:border-blue-400'
                }`}
                title={`${item.name || `Wallpaper #${idx + 1}`} • ${lang === "vi" ? "Nhấp đúp để áp dụng" : "Double click to apply"}`}
              >
                {/* Media Preview Container */}
                <div className="w-full h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.previewUrl || item.url}
                      alt={item.name || "Wallpaper"}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Active Indicator Overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-600/25 flex items-center justify-center">
                      <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* Type Badge top left (very tiny) */}
                  <div className="absolute top-1 left-1 px-1 py-0.2 rounded bg-white/60 dark:bg-black/60 backdrop-blur-xs text-[7px] font-bold text-slate-900 dark:text-white scale-90 origin-top-left z-10">
                    {item.type === 'video' ? 'LIVE' : (item.type === 'animated-gradient' || item.type === 'beach') ? 'DYNAMIC' : '4K'}
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    {true && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playUiSound("click");
                          removeBackground(item.id);
                        }}
                        className="p-1 rounded bg-rose-600/90 hover:bg-rose-700 text-white transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>

                  {/* Hover Tooltip Overlay with Title */}
                  <div className="absolute inset-0 bg-slate-50/85 dark:bg-slate-950/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 pointer-events-none z-10">
                    <span className="text-[10px] font-black text-slate-900 dark:text-white truncate">
                      {item.name || `Wallpaper #${idx + 1}`}
                    </span>
                    <span className="text-[8px] text-brand-text-muted capitalize truncate">
                      {item.category || "custom"} • {item.type}
                    </span>
                    <span className="text-[8px] text-blue-300 font-bold">
                      {lang === "vi" ? "Nháy đúp để áp dụng" : "Double click to set"}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
