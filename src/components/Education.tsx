import React, { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";
import { useTheme } from "../context/ThemeContext";
import { DEFAULT_EDUCATION_CARDS, EducationCard } from "../data/educationData";
import { cn } from "../lib/utils";
import { BannerIcon3D } from "./BannerIcon3D";
import { PageBanner } from "./PageBanner";

// Web Audio Sound Synthesizer with Authentic Paper Flip & Book Open Sounds
class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  public play(type: "paperFlip" | "flip" | "bookOpen" | "click" | "success" | "toggle") {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const now = this.ctx.currentTime;

      if (type === "paperFlip" || type === "flip") {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.24);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.exponentialRampToValueAtTime(2400, now + 0.08);
        filter.frequency.exponentialRampToValueAtTime(320, now + 0.22);
        filter.Q.setValueAtTime(2.6, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 0.24);
      } else if (type === "bookOpen") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === "click") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.005, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "success") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "toggle") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.linearRampToValueAtTime(680, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch {
      // Audio fallback safe
    }
  }
}

const soundSynth = new SoundEngine();

// Dynamic Icon Helper Function mapping strings to Lucide components
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const nameLower = (name || "").toLowerCase().trim();
  switch (nameLower) {
    case "code": return <Icons.Code className={className} />;
    case "code-2": return <Icons.Code2 className={className} />;
    case "database": return <Icons.Database className={className} />;
    case "shield-alert": return <Icons.ShieldAlert className={className} />;
    case "shield-check": return <Icons.ShieldCheck className={className} />;
    case "briefcase": return <Icons.Briefcase className={className} />;
    case "award": return <Icons.Award className={className} />;
    case "users": return <Icons.Users className={className} />;
    case "presentation": return <Icons.Presentation className={className} />;
    case "user-check": return <Icons.UserCheck className={className} />;
    case "phone-call": return <Icons.PhoneCall className={className} />;
    case "network": return <Icons.Network className={className} />;
    case "server": return <Icons.Server className={className} />;
    case "calculator": return <Icons.Calculator className={className} />;
    case "target": return <Icons.Target className={className} />;
    case "mic": return <Icons.Mic className={className} />;
    case "workflow": return <Icons.Workflow className={className} />;
    case "sparkles": return <Icons.Sparkles className={className} />;
    case "compass": return <Icons.Compass className={className} />;
    case "flame": return <Icons.Flame className={className} />;
    case "trending-up": return <Icons.TrendingUp className={className} />;
    case "list-checks": return <Icons.ListChecks className={className} />;
    case "help-circle": return <Icons.HelpCircle className={className} />;
    case "handshake": return <Icons.Handshake className={className} />;
    case "radio": return <Icons.Radio className={className} />;
    case "alert-octagon": return <Icons.AlertOctagon className={className} />;
    case "layers": return <Icons.Layers className={className} />;
    case "git-commit": return <Icons.GitCommit className={className} />;
    case "navigation": return <Icons.Navigation className={className} />;
    case "hard-drive": return <Icons.HardDrive className={className} />;
    case "globe": return <Icons.Globe className={className} />;
    case "folder-tree": return <Icons.FolderTree className={className} />;
    case "laptop": return <Icons.Laptop className={className} />;
    case "cpu": return <Icons.Cpu className={className} />;
    case "activity": return <Icons.Activity className={className} />;
    case "calendar": return <Icons.Calendar className={className} />;
    case "check-circle-2": return <Icons.CheckCircle2 className={className} />;
    case "user-plus": return <Icons.UserPlus className={className} />;
    case "message-square": return <Icons.MessageSquare className={className} />;
    case "smile": return <Icons.Smile className={className} />;
    default: return <Icons.GraduationCap className={className} />;
  }
}

const getCardThemeColors = (id: number) => {
  const themes = [
    { name: "indigo", from: "#1e1b4b", to: "#0f172a", via: "#312e81", border: "rgba(99, 102, 241, 0.45)" },
    { name: "blue", from: "#172554", to: "#090d16", via: "#1e3a8a", border: "rgba(59, 130, 246, 0.45)" },
    { name: "emerald", from: "#022c22", to: "#052e16", via: "#064e3b", border: "rgba(16, 185, 129, 0.45)" },
    { name: "rose", from: "#4c0519", to: "#1c040d", via: "#881337", border: "rgba(244, 63, 94, 0.45)" },
    { name: "amber", from: "#451a03", to: "#1c0f04", via: "#78350f", border: "rgba(245, 158, 11, 0.45)" },
    { name: "purple", from: "#3b0764", to: "#190426", via: "#581c87", border: "rgba(168, 85, 247, 0.45)" },
    { name: "cyan", from: "#083344", to: "#021c24", via: "#164e63", border: "rgba(6, 182, 212, 0.45)" },
    { name: "fuchsia", from: "#4a044e", to: "#1f0221", via: "#701a75", border: "rgba(217, 70, 239, 0.45)" },
    { name: "sky", from: "#0c4a6e", to: "#041e2e", via: "#0f766e", border: "rgba(14, 165, 233, 0.45)" },
    { name: "red", from: "#450a0a", to: "#1c0404", via: "#7f1d1d", border: "rgba(239, 68, 68, 0.45)" },
    { name: "teal", from: "#115e59", to: "#041c1a", via: "#134e4a", border: "rgba(20, 184, 166, 0.45)" },
    { name: "violet", from: "#2e1065", to: "#12042b", via: "#4c1d95", border: "rgba(139, 92, 246, 0.45)" },
  ];
  return themes[(id - 1) % themes.length];
};

export default function Education() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { playSound: playContextSound } = useSound();
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const safePlay = (type: "paperFlip" | "flip" | "bookOpen" | "click" | "success" | "toggle") => {
    try {
      playContextSound?.(type === "paperFlip" ? "switch" : type === "success" ? "success" : "click");
    } catch {
      // safe fallback
    }
    soundSynth.play(type);
  };

  // State Management
  const [cards, setCards] = useState<EducationCard[]>(() => DEFAULT_EDUCATION_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<number>(7);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "tech" | "management">("all");

  const [viewMode, setViewMode] = useState<"stack" | "book">("stack");
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3 | 4>(3);
  const [containerWidth, setContainerWidth] = useState<number>(1200);

  const gridContainerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver to track container width for responsive grid
  useEffect(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [viewMode]);

  // Responsive Grid Calculation
  const MIN_CARD_WIDTH = 260;
  const GAP = 16;
  const actualColumns = React.useMemo(() => {
    if (viewMode !== "grid") return 1;
    if (!containerWidth) return gridColumns;
    const maxPossibleColumns = Math.max(1, Math.floor((containerWidth + GAP) / (MIN_CARD_WIDTH + GAP)));
    return Math.min(gridColumns, maxPossibleColumns);
  }, [viewMode, containerWidth, gridColumns]);

  // 3D Flip Book Leaf State
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [isCoverFlipped, setIsCoverFlipped] = useState<boolean>(false);
  const [isPage1Flipped, setIsPage1Flipped] = useState<boolean>(false);
  const [isPage2Flipped, setIsPage2Flipped] = useState<boolean>(false);
  const [isPage3Flipped, setIsPage3Flipped] = useState<boolean>(false);
  const [certIndex, setCertIndex] = useState<number>(0);

  useEffect(() => {
    setCertIndex(0);
  }, [selectedCardId]);

  // Profile Banner Customization
  const [profileName, setProfileName] = useState<string>("Nguyễn Hùng Thái");
  const [profileTitle, setProfileTitle] = useState<string>("TRƯỞNG PHÒNG CSKH • 22+ NĂM KINH NGHIỆM");
  const [isBannerModalOpen, setIsBannerModalOpen] = useState<boolean>(false);
  const [inputProfileName, setInputProfileName] = useState<string>("");
  const [inputProfileTitle, setInputProfileTitle] = useState<string>("");

  // AI Assistant Modal (Gemini 2.5 Flash)
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiPromptInput, setAiPromptInput] = useState<string>("");
  const [aiResponseText, setAiResponseText] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [showAiResponse, setShowAiResponse] = useState<boolean>(false);

  // Lightbox Image Preview Modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewModalImg, setPreviewModalImg] = useState<string>("");
  const [previewModalTitle, setPreviewModalTitle] = useState<string>("Xem Trước Bằng Cấp");

  // Image Crop & Banner Selection State
  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [cropTargetCardId, setCropTargetCardId] = useState<number | null>(null);
  const [cropImgUrl, setCropImgUrl] = useState<string>("");
  const [cropZoom, setCropZoom] = useState<number>(1);
  const [cropAspectRatio, setCropAspectRatio] = useState<string>("16/9");
  const [cropTitle, setCropTitle] = useState<string>("");

  const openCropModal = (cardId: number, imgUrl: string, title: string) => {
    safePlay("click");
    setCropTargetCardId(cardId);
    setCropImgUrl(imgUrl);
    setCropTitle(title);
    setCropZoom(1);
    setCropAspectRatio("16/9");
    setIsCropModalOpen(true);
  };

  const handleSaveCrop = () => {
    if (!cropTargetCardId) return;
    safePlay("success");
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cropTargetCardId) {
          return {
            ...c,
            courseImg: cropImgUrl,
            image: cropImgUrl,
          };
        }
        return c;
      })
    );
    setIsCropModalOpen(false);
    triggerToast(`Đã cắt hình và cập nhật banner cho thẻ "${cropTitle}" thành công!`);
  };

  const handleSetAsBanner = (cardId: number, imgUrl: string, title: string) => {
    safePlay("success");
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            courseImg: imgUrl,
            image: imgUrl,
          };
        }
        return c;
      })
    );
    triggerToast(`Đã chọn hình ảnh làm banner chính cho "${title}"!`);
  };

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    safePlay("toggle");
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  // Filtered Cards
  const filteredCards = cards.filter((c) => {
    const matchCat = categoryFilter === "all" || c.type === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.year.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const getBookCoverTheme = (id: number) => {
    const index = (id - 1) % 12;
    const themes = [
      {
        // 1. Indigo
        frontBg: "linear-gradient(145deg, #4f46e5 0%, #312e81 50%, #1e1b4b 100%)",
        backBg: "linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)",
        backCoverBg: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
        borderColor: "rgba(99, 102, 241, 0.45)",
        badgeBg: "rgba(30, 27, 75, 0.45)",
        badgeBorder: "rgba(99, 102, 241, 0.35)",
        textAccent: "#818cf8"
      },
      {
        // 2. Blue
        frontBg: "linear-gradient(145deg, #2563eb 0%, #1e3a8a 50%, #172554 100%)",
        backBg: "linear-gradient(145deg, #172554 0%, #1e3a8a 50%, #2563eb 100%)",
        backCoverBg: "linear-gradient(135deg, #172554 0%, #2563eb 100%)",
        borderColor: "rgba(59, 130, 246, 0.45)",
        badgeBg: "rgba(23, 37, 84, 0.45)",
        badgeBorder: "rgba(59, 130, 246, 0.35)",
        textAccent: "#60a5fa"
      },
      {
        // 3. Emerald
        frontBg: "linear-gradient(145deg, #059669 0%, #064e3b 50%, #022c22 100%)",
        backBg: "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #059669 100%)",
        backCoverBg: "linear-gradient(135deg, #022c22 0%, #059669 100%)",
        borderColor: "rgba(16, 185, 129, 0.45)",
        badgeBg: "rgba(2, 44, 34, 0.45)",
        badgeBorder: "rgba(16, 185, 129, 0.35)",
        textAccent: "#34d399"
      },
      {
        // 4. Rose
        frontBg: "linear-gradient(145deg, #e11d48 0%, #881337 50%, #4c0519 100%)",
        backBg: "linear-gradient(145deg, #4c0519 0%, #881337 50%, #e11d48 100%)",
        backCoverBg: "linear-gradient(135deg, #4c0519 0%, #e11d48 100%)",
        borderColor: "rgba(244, 63, 94, 0.45)",
        badgeBg: "rgba(76, 5, 25, 0.45)",
        badgeBorder: "rgba(244, 63, 94, 0.35)",
        textAccent: "#f43f5e"
      },
      {
        // 5. Amber
        frontBg: "linear-gradient(145deg, #d97706 0%, #78350f 50%, #451a03 100%)",
        backBg: "linear-gradient(145deg, #451a03 0%, #78350f 50%, #d97706 100%)",
        backCoverBg: "linear-gradient(135deg, #451a03 0%, #d97706 100%)",
        borderColor: "rgba(245, 158, 11, 0.45)",
        badgeBg: "rgba(69, 26, 3, 0.45)",
        badgeBorder: "rgba(245, 158, 11, 0.35)",
        textAccent: "#fbbf24"
      },
      {
        // 6. Purple
        frontBg: "linear-gradient(145deg, #9333ea 0%, #581c87 50%, #3b0764 100%)",
        backBg: "linear-gradient(145deg, #3b0764 0%, #581c87 50%, #9333ea 100%)",
        backCoverBg: "linear-gradient(135deg, #3b0764 0%, #9333ea 100%)",
        borderColor: "rgba(168, 85, 247, 0.45)",
        badgeBg: "rgba(59, 7, 100, 0.45)",
        badgeBorder: "rgba(168, 85, 247, 0.35)",
        textAccent: "#c084fc"
      },
      {
        // 7. Cyan
        frontBg: "linear-gradient(145deg, #0891b2 0%, #164e63 50%, #083344 100%)",
        backBg: "linear-gradient(145deg, #083344 0%, #164e63 50%, #0891b2 100%)",
        backCoverBg: "linear-gradient(135deg, #083344 0%, #0891b2 100%)",
        borderColor: "rgba(6, 182, 212, 0.45)",
        badgeBg: "rgba(8, 51, 68, 0.45)",
        badgeBorder: "rgba(6, 182, 212, 0.35)",
        textAccent: "#22d3ee"
      },
      {
        // 8. Fuchsia
        frontBg: "linear-gradient(145deg, #c026d1 0%, #701a75 50%, #4a044e 100%)",
        backBg: "linear-gradient(145deg, #4a044e 0%, #701a75 50%, #c026d1 100%)",
        backCoverBg: "linear-gradient(135deg, #4a044e 0%, #c026d1 100%)",
        borderColor: "rgba(217, 70, 239, 0.45)",
        badgeBg: "rgba(74, 4, 78, 0.45)",
        badgeBorder: "rgba(217, 70, 239, 0.35)",
        textAccent: "#e879f9"
      },
      {
        // 9. Sky
        frontBg: "linear-gradient(145deg, #0369a1 0%, #0f766e 50%, #0c4a6e 100%)",
        backBg: "linear-gradient(145deg, #0c4a6e 0%, #0f766e 50%, #0369a1 100%)",
        backCoverBg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
        borderColor: "rgba(14, 165, 233, 0.45)",
        badgeBg: "rgba(12, 74, 110, 0.45)",
        badgeBorder: "rgba(14, 165, 233, 0.35)",
        textAccent: "#38bdf8"
      },
      {
        // 10. Red
        frontBg: "linear-gradient(145deg, #dc2626 0%, #7f1d1d 50%, #450a0a 100%)",
        backBg: "linear-gradient(145deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)",
        backCoverBg: "linear-gradient(135deg, #450a0a 0%, #dc2626 100%)",
        borderColor: "rgba(239, 68, 68, 0.45)",
        badgeBg: "rgba(69, 10, 10, 0.45)",
        badgeBorder: "rgba(239, 68, 68, 0.35)",
        textAccent: "#f87171"
      },
      {
        // 11. Teal
        frontBg: "linear-gradient(145deg, #0d9488 0%, #134e4a 50%, #115e59 100%)",
        backBg: "linear-gradient(145deg, #115e59 0%, #134e4a 50%, #0d9488 100%)",
        backCoverBg: "linear-gradient(135deg, #115e59 0%, #0d9488 100%)",
        borderColor: "rgba(20, 184, 166, 0.45)",
        badgeBg: "rgba(17, 94, 89, 0.45)",
        badgeBorder: "rgba(20, 184, 166, 0.35)",
        textAccent: "#2dd4bf"
      },
      {
        // 12. Violet
        frontBg: "linear-gradient(145deg, #7c3aed 0%, #4c1d95 50%, #2e1065 100%)",
        backBg: "linear-gradient(145deg, #2e1065 0%, #4c1d95 50%, #7c3aed 100%)",
        backCoverBg: "linear-gradient(135deg, #2e1065 0%, #7c3aed 100%)",
        borderColor: "rgba(139, 92, 246, 0.45)",
        badgeBg: "rgba(46, 16, 101, 0.45)",
        badgeBorder: "rgba(139, 92, 246, 0.35)",
        textAccent: "#a78bfa"
      }
    ];
    return themes[index];
  };

  // 3D Book Step Navigation & Current Active Page Step
  const jumpToBookPage = (step: number) => {
    safePlay(step === 0 ? "bookOpen" : "paperFlip");
    if (step === 0) {
      setIsBookOpen(false);
      setIsCoverFlipped(false);
      setIsPage1Flipped(false);
      setIsPage2Flipped(false);
      setIsPage3Flipped(false);
    } else if (step === 1) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(false);
      setIsPage2Flipped(false);
      setIsPage3Flipped(false);
    } else if (step === 2) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(true);
      setIsPage2Flipped(false);
      setIsPage3Flipped(false);
    } else if (step === 3) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(true);
      setIsPage2Flipped(true);
      setIsPage3Flipped(false);
    } else if (step >= 4) {
      setIsBookOpen(true);
      setIsCoverFlipped(true);
      setIsPage1Flipped(true);
      setIsPage2Flipped(true);
      setIsPage3Flipped(true);
    }
  };

  const currentBookStep = !isBookOpen 
    ? 0 
    : !isPage1Flipped 
    ? 1 
    : !isPage2Flipped 
    ? 2 
    : !isPage3Flipped 
    ? 3 
    : 4;

  const openBookMode = (id: number) => {
    safePlay("bookOpen");
    setSelectedCardId(id);
    setViewMode("book");
    jumpToBookPage(0); // Show cover first
  };

  // Lightbox Image Preview
  const openImagePreview = (url: string, title: string = "Xem Trước Bằng Cấp") => {
    safePlay("click");
    setPreviewModalImg(url);
    setPreviewModalTitle(title);
    setIsPreviewModalOpen(true);
  };

  const downloadPreviewImg = (url?: string) => {
    const targetUrl = url || previewModalImg;
    if (!targetUrl) return;
    safePlay("success");
    const a = document.createElement("a");
    a.href = targetUrl;
    a.download = "Chung-Chi-Nguyen-Hung-Thai.png";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    triggerToast("Đang chuẩn bị tải hình ảnh bằng cấp...");
  };

  // Add New Card
  const handleAddCard = () => {
    safePlay("click");
    const newId = cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1;
    const newCard: EducationCard = {
      id: newId,
      title: `Chứng Nhận Chuyên Môn Mới ${newId}`,
      subtitle: `Học viện Quản trị & Công nghệ`,
      major: "Phát triển kỹ năng & Năng lực chuyên môn",
      year: `2025 – 2026`,
      type: "management",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      courseImg: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
      certImg: "https://images.unsplash.com/photo-1589330694653-aded6fac0243?auto=format&fit=crop&w=600&q=80",
      speakerImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      desc: "Chương trình nâng cao năng lực hoạch định chiến lược và chuẩn hóa quy trình dịch vụ khách hàng chất lượng cao đa kênh.",
      modules: [
        { code: "MOD-01", title: "Khung lý thuyết Quản trị Hiện đại", focus: "Nguyên lý vận hành tiên tiến & Chuẩn mực SLA quốc tế", icon: "book-open" },
        { code: "MOD-02", title: "Ứng dụng Thực hành Tình huống", focus: "Kịch bản thực chiến điều hành Contact Center đa kênh", icon: "workflow" },
        { code: "MOD-03", title: "Đo lường Hiệu suất & Giám sát", focus: "Thiết lập hệ thống chỉ số KPI, CSAT & Quản trị rủi ro", icon: "target" },
        { code: "MOD-04", title: "Kiểm tra Đánh giá & Cấp Chứng chỉ", focus: "Bài tập tình huống thực tế và thẩm định năng lực", icon: "award" }
      ],
      results: [
        "Hoàn thành xuất sắc toàn bộ tiêu chí sát hạch.",
        "Ứng dụng trực tiếp vào quy trình thực tế Contact Center.",
        "Nâng cao năng lực cạnh tranh và hiệu suất đội ngũ.",
        "Đóng gói tài liệu đào tạo thực chiến cho tổ chức."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
      ],
      icon: "award",
      gradientBadge: "from-purple-500 to-indigo-600 text-white"
    };

    setCards((prev) => [newCard, ...prev]);
    setSelectedCardId(newId);
    triggerToast("Đã thêm một chứng chỉ mới thành công!");
  };

  // Banner Modal Actions
  const openBannerModal = () => {
    safePlay("click");
    setInputProfileName(profileName);
    setInputProfileTitle(profileTitle);
    setIsBannerModalOpen(true);
  };

  const saveProfileBanner = () => {
    safePlay("success");
    const name = inputProfileName.trim();
    const title = inputProfileTitle.trim();
    if (name) setProfileName(name);
    if (title) setProfileTitle(title);
    setIsBannerModalOpen(false);
    triggerToast("Đã cập nhật thông tin hồ sơ Banner!");
  };

  // AI Assistant Call (Gemini API with fallback)
  const handleAiAnalyze = async () => {
    const promptText = aiPromptInput.trim() || "Phân tích ma trận năng lực toàn diện của Nguyễn Hùng Thái kết hợp giữa nền tảng CNTT và Năng lực Đào tạo & Thuyết trình chuyên nghiệp.";
    safePlay("click");
    setAiLoading(true);
    setShowAiResponse(true);
    setAiResponseText("Đang tổng hợp dữ liệu học vấn và phân tích thông minh...");

    try {
      const apiKey = ""; // Let infrastructure runtime resolve or server API
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

      const systemInstruction = `Bạn là Trí Nhân - Cố vấn Chiến lược & Chuyên gia Phân tích Năng lực Lãnh đạo cấp cao.
Anh Nguyễn Hùng Thái có 22+ năm kinh nghiệm trong ngành Chăm sóc Khách hàng (CSKH / Contact Center), từng đào tạo tại MobiFone, Prudential, Dale Carnegie, VietnamWorks và tốt nghiệp Cử nhân Công nghệ Thông tin tại Trường ĐH Công nghệ Sài Gòn (STU), sở hữu các chứng nhận kỹ thuật CCNA, MCSA, Big Data, Web UI/UX.
Hãy phân tích sắc sảo, tự tin, chuyên nghiệp, khích lệ và đưa ra góc nhìn tầm nhìn xa cho anh Hùng Thái.`;

      const payload = {
        contents: [{ parts: [{ text: promptText }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          safePlay("success");
          setAiResponseText(text);
          return;
        }
      }
      throw new Error("API call error");
    } catch {
      // Intelligently formatted structured response
      setAiResponseText(
        `[TỔNG HỢP NĂNG LỰC ĐỘT PHÁ - NGUYỄN HÙNG THÁI]\n\n1. LỢI THẾ CẠNH TRANH KÉP (DUAL-CORE ADVANTAGE):\n• Năng lực Sư phạm & Thuyết trình (VietnamWorks & Dale Carnegie): Đóng gói và chuyển giao quy trình chuẩn hóa CSKH cho hàng trăm nhân sự.\n• Nền tảng Kỹ thuật Số (STU Bachelor, Big Data, CCNA, Web UI/UX): Làm chủ tuyệt đối kiến trúc hạ tầng Omnichannel Contact Center & Chuyển đổi số.\n\n2. ĐỊNH HƯỚNG TẦM NHÌN 2026+:\n• Tiên phong mô hình 'AI-First Customer Experience' kết hợp huấn luyện nhân sự thực chiến.`
      );
      safePlay("success");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between select-none relative p-1 sm:p-3 text-slate-800 dark:text-slate-100 gap-3">
      {/* Scoped Custom CSS Animations & Mechanics */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .glass-canvas-main {
          background: linear-gradient(135deg, rgba(255, 241, 242, 0.88) 0%, rgba(238, 242, 255, 0.94) 50%, rgba(224, 242, 254, 0.88) 100%);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.7);
        }
        .dark .glass-canvas-main {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .glass-card-bright {
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 16px 36px -10px rgba(100, 116, 139, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.6);
        }
        .dark .glass-card-bright {
          background: rgba(15, 23, 42, 0.88);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5);
        }

        .glass-inner-item {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }
        .dark .glass-inner-item {
          background: rgba(30, 41, 59, 0.75);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .card-banner-zoom {
          object-fit: cover;
          object-position: center center;
          transform: scale(1.28);
          transform-origin: center center;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .group:hover .card-banner-zoom,
        .stack-card:hover .card-banner-zoom {
          transform: scale(1.38);
        }

        @keyframes slideRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cards-container {
          display: flex;
          padding: 20px 12px;
          justify-content: flex-start;
          align-items: center;
          perspective: 1200px;
          min-height: 390px;
          width: max-content;
          animation: slideRightToLeft 46s linear infinite;
        }
        .cards-container:hover {
          animation-play-state: paused;
        }

        .edu-card-container {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 0;
          border-radius: 1rem;
          overflow: hidden;
          background-color: transparent;
        }

        .blob {
          position: absolute;
          width: 380px;
          height: 380px;
          background: linear-gradient(
            180deg,
            rgba(47, 184, 255, 0.42) 31.77%,
            #5c9df1 100%
          );
          mix-blend-mode: color-dodge;
          -webkit-animation: move 25s infinite alternate;
          animation: move 25s infinite alternate;
          transition: 1s cubic-bezier(0.07, 0.8, 0.16, 1);
          pointer-events: auto;
          z-index: 1;
        }

        .blob:hover {
          width: 420px;
          height: 420px;
          -webkit-filter: blur(30px);
          filter: blur(30px);
          box-shadow:
            inset 0 0 0 5px rgba(255,255,255, 0.6),
            inset 100px 100px 0 0px #fa709a,
            inset 200px 200px 0 0px #784ba8,
            inset 300px 300px 0 0px #2b86c5;
        }

        @-webkit-keyframes move {
          from {
            transform: translate(-100px, -50px) rotate(-90deg);
            border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
          }
          to {
            transform: translate(150px, 80px) rotate(-10deg);
            border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
          }
        }

        @keyframes move {
          from {
            transform: translate(-100px, -50px) rotate(-90deg);
            border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
          }
          to {
            transform: translate(150px, 80px) rotate(-10deg);
            border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
          }
        }

        .edu-glass-card {
          width: 100%;
          min-height: 250px;
          background: rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 1.5rem;
          position: relative;
          z-index: 10;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .edu-glass-card {
          background: rgba(15, 23, 42, 0.80);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1.5px 2px rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .edu-glass-card::after {
          z-index: -1;
          content: " ";
          position: absolute;
          width: 150%;
          top: 0;
          left: 0;
          height: 10px;
          background: #ffffff;
          transform: rotateZ(50deg);
          filter: blur(30px);
          animation: shine 10s ease infinite;
          pointer-events: none;
        }

        .innerText {
          color: transparent;
          -webkit-background-clip: text;
          background-image: linear-gradient(90deg, rgb(15, 23, 42), rgb(100, 116, 139));
          font-weight: 800;
        }

        .dark .innerText {
          background-image: linear-gradient(90deg, rgb(255, 255, 255), rgb(203, 213, 225));
        }

        @keyframes shine {
          0% {
            top: 100%;
            left: -100%;
          }
          50%,
          100% {
            top: 0%;
            left: 70%;
          }
        }

        .stack-card {
          display: flex;
          flex-direction: column;
          height: 350px;
          width: 250px;
          background: rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-radius: 18px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.6) !important;
          transition: all 0.38s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
          left: 0;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          padding: 12px;
          user-select: none;
          flex-shrink: 0;
        }
        .dark .stack-card {
          background: rgba(15, 23, 42, 0.3) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.05) !important;
        }

        .stack-card:not(:first-child) {
          margin-left: -95px;
        }

        .stack-card:hover {
          z-index: 50 !important;
          transform: translateY(-18px) scale(1.05);
          box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.8) !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          background: rgba(255, 255, 255, 0.3) !important;
        }
        .dark .stack-card:hover {
          box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          background: rgba(15, 23, 42, 0.45) !important;
        }

        .stack-card:hover ~ .stack-card {
          position: relative;
          left: 95px;
          transition: all 0.38s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .book-stage-outer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          perspective: 2400px;
        }

        .book {
          width: 360px;
          height: 480px;
          position: relative;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
        }

        .book.is-open {
          transform: translateX(180px);
        }

        .cover, .back-cover {
          width: 100%;
          height: 100%;
          border-radius: 0 16px 16px 0;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.38);
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center left;
          transform-style: preserve-3d;
        }

        .cover {
          z-index: 50;
          transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          cursor: pointer;
          background: transparent !important;
        }

        .cover.flipped {
          transform: rotateY(-180deg);
        }

        .back-cover {
          z-index: -1;
          background: linear-gradient(135deg, #090e17 0%, #171d2b 100%);
          border: 2px solid rgba(255, 255, 255, 0.15);
          padding: 15px !important;
        }

        .cover .cover-spine-effect {
          position: absolute;
          width: 10px;
          height: 100%;
          left: 0;
          top: 0;
          border-left: 1.5px solid rgba(0, 0, 0, 0.3);
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%);
          z-index: 30;
          pointer-events: none;
        }

        .book .page {
          position: absolute;
          background: transparent !important;
          width: 356px;
          height: 468px;
          top: 6px;
          left: 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          transform: rotateY(0deg);
          transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          cursor: pointer;
        }

        .book .page.flipped {
          transform: rotateY(-180deg);
        }

        .front-page, .back-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          padding: 15px !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
          background: #ffffff;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.02);
        }
        .dark .front-page, .dark .back-page {
          background: #0f172a;
          color: #f8fafc;
        }

        .front-page {
          transform: rotateY(0deg);
          border-radius: 0 14px 14px 0;
          border: 1px solid rgba(203, 213, 225, 0.85);
          border-left: none;
          background-image: linear-gradient(to right, rgba(0,0,0,0.035) 0%, rgba(0,0,0,0) 3%);
        }

        .back-page {
          transform: rotateY(180deg);
          border-radius: 14px 0 0 14px;
          border: 1px solid rgba(203, 213, 225, 0.85);
          border-right: none;
          background-image: linear-gradient(to left, rgba(0,0,0,0.035) 0%, rgba(0,0,0,0) 3%);
        }

        .cover-front, .cover-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          padding: 15px !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .cover-front {
          transform: rotateY(0deg);
          border-radius: 0 16px 16px 0;
          background: linear-gradient(145deg, #111827 0%, #0f172a 50%, #1e293b 100%);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .cover-back {
          transform: rotateY(180deg);
          border-radius: 16px 0 0 16px;
          background: linear-gradient(145deg, #090d16 0%, #111827 100%);
          border: 2px solid rgba(255, 255, 255, 0.12);
        }

        .btn-page-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          padding: 3px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .btn-page-nav.next {
          background: rgba(99, 102, 241, 0.1);
          color: #4f46e5;
        }

        .btn-page-nav.next:hover {
          background: #4f46e5;
          color: #ffffff;
        }

        .btn-page-nav.prev {
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
        }

        .btn-page-nav.prev:hover {
          background: #475569;
          color: #ffffff;
        }

        .spine-center-shadow {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          transform: translateX(-4px);
          background: linear-gradient(90deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.14) 100%);
          z-index: 40;
          pointer-events: none;
          display: none;
        }

        .book.is-open .spine-center-shadow {
          display: block;
        }

        @media (max-width: 920px) {
          .book {
            transform: scale(0.85);
            transform-origin: center center;
          }
          .book.is-open {
            transform: scale(0.85) translateX(180px);
          }
        }
        @media (max-width: 720px) {
          .book {
            transform: scale(0.68);
            transform-origin: center center;
          }
          .book.is-open {
            transform: scale(0.68) translateX(180px);
          }
        }
        @media (max-width: 500px) {
          .book {
            transform: scale(0.52);
            transform-origin: center center;
          }
          .book.is-open {
            transform: scale(0.52) translateX(180px);
          }
        }
      `
      }} />


        {/* Multi-color ambient background spheres */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-400/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-400/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 right-10 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* ================= HERO BANNER TRANG HỌC VẤN (PAGEBANNER CONDITIONAL COMPONENT) ================= */}
        {viewMode !== "book" && (
          <div className="w-full mb-6">
            <PageBanner
              title={isVi ? "Hồ Sơ Học Vấn & Bằng Cấp" : "Education & Credentials"}
              subtitle={
                isVi
                  ? "Nền tảng Công nghệ Thông tin vững chắc kết hợp Năng lực Huấn luyện & Sư phạm CSKH Chuyên nghiệp."
                  : "Solid IT engineering foundation combined with Professional Training & Customer Service Leadership."
              }
              tag={isVi ? "HỌC VẤN & BẰNG CẤP" : "EDUCATION & CREDENTIALS"}
              iconType="education"
              gradient="from-slate-950 via-indigo-950 to-slate-900"
              rightContent={
                <div className="relative z-10 shrink-0 self-end md:self-center flex flex-col sm:flex-row items-start sm:items-center gap-2 p-2 rounded-2xl bg-white/10 border border-white/10 shadow-lg backdrop-blur-xl">
                  <div className="text-[11px] font-black uppercase text-indigo-200 px-1.5 tracking-wider">
                    {isVi ? "Chế độ hiển thị:" : "View Mode:"}
                  </div>

                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
                    <button
                      onClick={() => { safePlay("click"); setViewMode("stack"); }}
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer",
                        viewMode === "stack" ? "bg-sky-600 text-white shadow-md" : "text-slate-300 hover:text-white"
                      )}
                    >
                      <Icons.AlignJustify className="w-3.5 h-3.5" />
                      <span>{isVi ? "Xếp Thẻ" : "Stack"}</span>
                    </button>
                    <button
                      onClick={() => openBookMode(selectedCardId || 7)}
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer",
                        viewMode === "book" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : "text-slate-300 hover:text-white"
                      )}
                    >
                      <Icons.BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isVi ? "Sách 3D" : "3D Book"}</span>
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        )}

        {/* ================= 2. MAIN CONTENT STAGE ================= */}
        <main className="flex-1 w-full my-3 relative z-10 px-1 sm:px-0">
          {viewMode === "stack" && (
            <div className="w-full flex flex-col items-center justify-center h-full">
              <div className="w-full overflow-x-auto thin-scrollbar flex items-center justify-start sm:justify-center py-4 px-2">
                <div className="cards-container">
                  {[...filteredCards, ...filteredCards].map((card, idx) => (
                    <div
                      key={card.id + "-" + idx}
                      onClick={() => openBookMode(card.id)}
                      className="stack-card"
                      style={{ zIndex: 10 + idx }}
                    >
                      <div className="w-full h-32 rounded-[14px] overflow-hidden mb-1.5 bg-slate-900 relative shrink-0">
                        <img
                          src={card.image}
                          alt={card.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/indigo/white?text=Diploma+Certificate"; }}
                          className="w-full h-full object-contain scale-[3.0] group-hover:scale-[3.1] transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold shadow-xs">
                          {card.year}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openImagePreview(card.image, card.title);
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition cursor-pointer"
                          title="Phóng to"
                        >
                          <Icons.Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <DynamicIcon name={card.icon || "graduation-cap"} className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-1">
                              {card.title}
                            </h4>
                          </div>

                          <div className="p-2 rounded-[10px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 mt-2 space-y-1 text-[10px]">
                            <div className="flex items-center gap-1">
                              <Icons.MapPin className="w-3 h-3 text-indigo-500" />
                              <span className="text-slate-400">Học tại:</span>
                              <span className="font-bold text-slate-700 dark:text-slate-200 truncate">{card.subtitle}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed pt-0.5">
                              {card.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                          <span>Mở Sách 3D</span>
                          <Icons.ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/10 text-[10px] font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-2 shadow-xs">
                <Icons.Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                <span>{isVi ? "Kéo / Cuộn ngang hoặc nhấn vào thẻ để mở sách 3D" : "Drag / Scroll or click on card to open 3D Book"}</span>
              </div>
            </div>
          )}

          {viewMode === "book" && (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Navigation Toolbar for 3D Book */}
              <div className="w-full max-w-4xl flex flex-nowrap items-center justify-between mb-2 px-2 gap-2 overflow-x-auto thin-scrollbar shrink-0">
                {/* Profile / Diploma Selector */}
                <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-[12px] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-[10px] sm:text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase px-1 hidden sm:inline-block">
                    Hồ sơ:
                  </span>
                  <select
                    value={selectedCardId}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setSelectedCardId(id);
                      jumpToBookPage(0);
                    }}
                    className="px-2 py-0.5 rounded-[8px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-[10px] sm:text-xs font-bold border border-slate-300 dark:border-slate-700 cursor-pointer outline-none"
                  >
                    {cards.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.id}. {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Page Jump Toolbar Buttons */}
                <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-[12px] glass-card-bright text-[10px] sm:text-xs font-bold overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => jumpToBookPage(0)}
                    className={cn(
                      "px-2.5 sm:px-3 py-1 rounded-[8px] transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border",
                      currentBookStep === 0
                        ? "bg-amber-500 text-slate-950 font-black shadow-md border-amber-300 ring-1 ring-amber-300"
                        : "bg-slate-900/90 text-white hover:bg-slate-800 border-white/20"
                    )}
                  >
                    <Icons.Book className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Bìa Sách</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(1)}
                    className={cn(
                      "px-2.5 sm:px-3 py-1 rounded-[8px] transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border",
                      currentBookStep === 1
                        ? "bg-amber-500 text-slate-950 font-black shadow-md border-amber-300 ring-1 ring-amber-300"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/40"
                    )}
                  >
                    <Icons.LayoutGrid className="w-3.5 h-3.5" />
                    <span>Trang 01 (Nội dung)</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(2)}
                    className={cn(
                      "px-2.5 sm:px-3 py-1 rounded-[8px] transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border",
                      currentBookStep === 2
                        ? "bg-amber-500 text-slate-950 font-black shadow-md border-amber-300 ring-1 ring-amber-300"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/40"
                    )}
                  >
                    <Icons.Layers className="w-3.5 h-3.5" />
                    <span>Trang 02 – 03 (Ứng dụng)</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(3)}
                    className={cn(
                      "px-2.5 sm:px-3 py-1 rounded-[8px] transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border",
                      currentBookStep === 3
                        ? "bg-amber-500 text-slate-950 font-black shadow-md border-amber-300 ring-1 ring-amber-300"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/40"
                    )}
                  >
                    <Icons.Award className="w-3.5 h-3.5" />
                    <span>Trang 04 (Bằng cấp)</span>
                  </button>
                  <button
                    onClick={() => jumpToBookPage(4)}
                    className={cn(
                      "px-2.5 sm:px-3 py-1 rounded-[8px] transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border",
                      currentBookStep === 4
                        ? "bg-amber-500 text-slate-950 font-black shadow-md border-amber-300 ring-1 ring-amber-300"
                        : "bg-slate-900/90 text-white hover:bg-slate-800 border-white/20"
                    )}
                  >
                    <Icons.Bookmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bìa Sau</span>
                  </button>
                </div>

                <button
                  onClick={() => { safePlay("click"); setViewMode("grid"); }}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-[12px] bg-white/80 hover:bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-[10px] sm:text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Icons.ArrowLeft className="w-3.5 h-3.5 text-rose-500" />
                  <span>Quay lại</span>
                </button>
              </div>

              {/* Floating Interactive Page Tabs on top of the 3D Book Stage (Hidden) */}
              <div className="hidden flex items-center justify-center gap-1 sm:gap-1.5 mb-2 z-20">
                <button
                  onClick={() => jumpToBookPage(0)}
                  className={cn(
                    "px-2.5 py-1 rounded-t-xl text-[10px] font-extrabold transition-all border-t border-x cursor-pointer shadow-xs",
                    currentBookStep === 0
                      ? "bg-amber-500 text-slate-950 border-amber-300 scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  📖 Bìa Sách
                </button>
                <button
                  onClick={() => jumpToBookPage(1)}
                  className={cn(
                    "px-2.5 py-1 rounded-t-xl text-[10px] font-extrabold transition-all border-t border-x cursor-pointer shadow-xs",
                    currentBookStep === 1
                      ? "bg-indigo-600 text-white border-indigo-400 scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  📄 Trang 01
                </button>
                <button
                  onClick={() => jumpToBookPage(2)}
                  className={cn(
                    "px-2.5 py-1 rounded-t-xl text-[10px] font-extrabold transition-all border-t border-x cursor-pointer shadow-xs",
                    currentBookStep === 2
                      ? "bg-indigo-600 text-white border-indigo-400 scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  📊 Trang 02 - 03
                </button>
                <button
                  onClick={() => jumpToBookPage(3)}
                  className={cn(
                    "px-2.5 py-1 rounded-t-xl text-[10px] font-extrabold transition-all border-t border-x cursor-pointer shadow-xs",
                    currentBookStep === 3
                      ? "bg-indigo-600 text-white border-indigo-400 scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  📜 Trang 04 & Xác Thực
                </button>
                <button
                  onClick={() => jumpToBookPage(4)}
                  className={cn(
                    "px-2.5 py-1 rounded-t-xl text-[10px] font-extrabold transition-all border-t border-x cursor-pointer shadow-xs",
                    currentBookStep === 4
                      ? "bg-amber-500 text-slate-950 border-amber-300 scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  📕 Bìa Sau
                </button>
              </div>

              {/* ================= PURE 3D LEAF-FLIP BOOK ================= */}
              <div className="book-stage-outer">
                <div className={cn("book", isBookOpen && "is-open")}>
                  <div className="spine-center-shadow"></div>

                  {/* 1. COVER (FLIPS -180DEG) */}
                  <div
                    className={cn("cover", isCoverFlipped && "flipped")}
                    style={{
                      zIndex: isCoverFlipped ? 1 : 40,
                      background: "transparent"
                    }}
                    onClick={() => {
                      if (!isBookOpen) {
                        jumpToBookPage(1);
                      }
                    }}
                  >
                    <div className="cover-spine-effect"></div>

                    {/* FRONT COVER FACE (Font 'Play') */}
                    <div 
                      className="cover-front font-play text-white relative flex flex-col justify-between h-full p-4 sm:p-5 overflow-hidden transition-all duration-500 rounded-2xl shadow-xl cursor-pointer"
                      style={{
                        background: getBookCoverTheme(activeCard.id).frontBg,
                        border: `2px solid ${getBookCoverTheme(activeCard.id).borderColor}`
                      }}
                      onClick={() => jumpToBookPage(1)}
                    >
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          {/* Header pill indicator */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span 
                              className="text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full border text-white font-play"
                              style={{
                                background: getBookCoverTheme(activeCard.id).badgeBg,
                                borderColor: getBookCoverTheme(activeCard.id).badgeBorder
                              }}
                            >
                              STU Digitized Profile
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-200">
                              {activeCard.year}
                            </span>
                          </div>

                          {/* Unified Card Banner matching Education Card */}
                          <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 mx-auto my-2 rounded-xl border border-white/20 shadow-inner group/img">
                            <img
                              src={activeCard.courseImg || activeCard.image}
                              alt={activeCard.title}
                              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/indigo/white?text=Training+Cover"; }}
                              className="w-full h-full object-contain p-1"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openImagePreview(activeCard.courseImg || activeCard.image, activeCard.title);
                              }}
                              className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition shadow-md border border-white/20 cursor-pointer z-20"
                              title="Phóng to ảnh"
                            >
                              <Icons.Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Title Block with Play font */}
                          <div className="mb-1.5">
                            <h2 className="font-play font-bold text-white leading-tight tracking-tight text-base sm:text-lg flex items-center gap-2 line-clamp-2">
                              <DynamicIcon name={activeCard.icon || "graduation-cap"} className="w-5 h-5 text-indigo-300 shrink-0 inline-block" />
                              <span>{activeCard.title}</span>
                            </h2>
                          </div>

                          {/* Unified Metadata Grid matching Education Card */}
                          <div className="space-y-2 text-xs sm:text-[13px] mt-2 font-play">
                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.GraduationCap className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <span className="text-slate-300 w-18 shrink-0 font-medium">Học tại:</span>
                                <span className="font-bold text-white truncate">{activeCard.subtitle}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.Compass className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <span className="text-slate-300 w-18 shrink-0 font-medium">Ngành học:</span>
                                <span className="font-semibold text-white line-clamp-1">{activeCard.major || "Phát triển kỹ năng & Năng lực chuyên môn"}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.FileText className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <span className="text-slate-300 w-18 shrink-0 font-medium">Mô tả:</span>
                                <span className="font-normal text-slate-200 line-clamp-2 leading-tight">{activeCard.desc}</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                <Icons.Calendar className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <span className="text-slate-300 w-18 shrink-0 font-medium">Năm học:</span>
                                <span className="font-extrabold" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>{activeCard.year}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] mt-2 font-play">
                          <span className="text-slate-300 font-semibold">Chủ sở hữu: Nguyễn Hùng Thái</span>
                          <span className="font-bold flex items-center gap-1 animate-pulse" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>
                            <span>Nhấp mở sách</span>
                            <Icons.ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK COVER FACE (Font 'Play') */}
                    <div 
                      className="cover-back font-play text-white flex flex-col justify-between items-center text-center transition-all duration-500 cursor-pointer"
                      style={{
                        background: getBookCoverTheme(activeCard.id).backBg,
                        border: `2px solid ${getBookCoverTheme(activeCard.id).borderColor}`
                      }}
                      onClick={() => jumpToBookPage(1)}
                    >
                      <div className="w-full flex justify-between items-center text-[8px] text-slate-300 font-play">
                        <span>❖ {activeCard.title}</span>
                        <span>BÌA TRONG</span>
                      </div>

                      <div className="space-y-3">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border shadow-lg transition-all"
                          style={{
                            background: getBookCoverTheme(activeCard.id).badgeBg,
                            borderColor: getBookCoverTheme(activeCard.id).badgeBorder,
                            color: getBookCoverTheme(activeCard.id).textAccent
                          }}
                        >
                          <Icons.Sparkles className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-white tracking-wide font-play">{activeCard.subtitle}</h3>
                          <p className="text-[9.5px] mt-1 max-w-[200px] mx-auto italic font-play" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>"Tri thức thực chiến • Dẫn dắt tương lai"</p>
                        </div>
                      </div>

                      <div className="w-full pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-300 font-bold font-play">
                        <span 
                          className="btn-page-nav prev cursor-pointer flex items-center gap-1" 
                          style={{ color: getBookCoverTheme(activeCard.id).textAccent }} 
                          onClick={(e) => { e.stopPropagation(); jumpToBookPage(0); }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Đóng Bìa
                        </span>
                        <span>STU • 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. LEAF 1: TRANG 01 (FRONT) & TRANG 02 (BACK) */}
                  <div
                    className={cn("page", isPage1Flipped && "flipped")}
                    style={{ zIndex: isPage1Flipped ? 10 : 30 }}
                    onClick={() => {
                      safePlay("paperFlip");
                      setIsPage1Flipped(!isPage1Flipped);
                    }}
                  >
                    {/* TRANG 01 • NỘI DUNG CỐT LÕI */}
                    <div className="front-page">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(1); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(1); }}
                          >
                            Trang 01
                          </span>
                        </div>

                        <div className="mb-3">
                          <span className="text-base font-extrabold text-indigo-600 font-mono leading-none block">01</span>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Nội dung cốt lõi</h3>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                            Khám phá 4 mô-đun trọng tâm giúp bạn làm chủ kỹ năng chuyên sâu & truyền cảm hứng.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {activeCard.modules.map((mod, idx) => (
                            <div key={idx} className="p-2.5 rounded-[12px] bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between items-center text-center shadow-xs">
                              <div className="w-7 h-7 rounded-lg bg-indigo-100/70 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5">
                                <DynamicIcon name={mod.icon || "book-open"} className="w-4 h-4" />
                              </div>
                              <h4 className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 min-h-[26px]">
                                {mod.title}
                              </h4>
                              <p className="text-[8px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight mt-1">
                                {mod.focus}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-400">
                        <span>CHỦ HỒ SƠ: NGUYỄN HÙNG THÁI</span>
                        <span 
                          className="btn-page-nav next cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          Trang 02 (Ứng dụng) <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* TRANG 02 • KẾT QUẢ & ỨNG DỤNG */}
                    <div className="back-page">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            Trang 02
                          </span>
                        </div>

                        <div className="mb-2.5">
                          <span className="text-base font-extrabold text-indigo-600 font-mono leading-none block">02</span>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Kết quả & Ứng dụng</h3>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                            Áp dụng kiến thức vào thực tiễn, tạo ra giá trị cho tổ chức và phát triển sự nghiệp.
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          {activeCard.results.map((res, i) => {
                            const icons = ["graduation-cap", "users", "trending-up", "file-text"];
                            return (
                              <div key={i} className="p-2 rounded-[8px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                  <DynamicIcon name={icons[i % icons.length]} className="w-3.5 h-3.5" />
                                </div>
                                <p className="text-[9px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                                  {res}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(1);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 01
                        </span>
                        <span 
                          className="btn-page-nav next cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          Trang 03 (Ảnh) <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. LEAF 2: TRANG 03 (FRONT) & TRANG XÁC THỰC (BACK) */}
                  <div
                    className={cn("page", isPage2Flipped && "flipped")}
                    style={{ zIndex: isPage2Flipped ? 20 : 20 }}
                    onClick={() => {
                      safePlay("paperFlip");
                      setIsPage2Flipped(!isPage2Flipped);
                    }}
                  >
                    {/* TRANG 03 • HÌNH ẢNH KHÓA HỌC */}
                    <div className="front-page">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(2); }}
                          >
                            Trang 03
                          </span>
                        </div>

                        <div className="mb-2.5">
                          <span className="text-base font-extrabold text-indigo-600 font-mono leading-none block">03</span>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Hình ảnh khóa học</h3>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                            Hình ảnh chứng nhận hoàn thành khóa học chính thức.
                          </p>
                        </div>

                        {/* Single Featured Course Image Frame */}
                        <div 
                          className="relative w-full h-52 rounded-[14px] overflow-hidden bg-slate-950 border-2 border-indigo-200/90 dark:border-indigo-800/80 shadow-md group/courseSingle flex items-center justify-center p-2 cursor-pointer"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            openImagePreview(activeCard.courseImg || activeCard.image, `${activeCard.title} - Hình ảnh khóa học`); 
                          }}
                        >
                          <img 
                            src={activeCard.courseImg || activeCard.image} 
                            alt={activeCard.title} 
                            className="max-w-full max-h-full object-contain group-hover/courseSingle:scale-105 transition-transform duration-300 rounded-md" 
                            referrerPolicy="no-referrer" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = activeCard.image;
                            }}
                          />
                          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                            <span className="text-[9px] text-white font-medium">Hình khóa học</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openImagePreview(activeCard.courseImg || activeCard.image, `${activeCard.title} - Hình ảnh khóa học`);
                              }}
                              className="w-5.5 h-5.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition shadow-md cursor-pointer ml-1"
                              title="Xem ảnh phóng to"
                            >
                              <Icons.Maximize2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 02
                        </span>
                        <span 
                          className="btn-page-nav next cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(3);
                          }}
                        >
                          Trang 04 (Bằng cấp) <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* TRANG XÁC THỰC SỐ */}
                    <div className="back-page">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            Xác thực số
                          </span>
                        </div>

                        <div className="p-3 rounded-[12px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 my-1 text-center">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 shadow-xs">
                            <Icons.ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">XÁC THỰC BẰNG CẤP CHÍNH THỨC</h4>
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">Chứng nhận đã được thẩm định tính xác thực và công nhận trên toàn hệ thống hồ sơ số hóa.</p>
                          </div>

                          <div className="p-2 rounded-[8px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[8.5px] text-slate-600 dark:text-slate-300 space-y-1 text-left">
                            <div className="flex justify-between"><span className="text-slate-400 font-semibold">Đơn vị đào tạo:</span><span className="font-bold text-indigo-700 dark:text-indigo-400">{activeCard.subtitle}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400 font-semibold">Chủ sở hữu:</span><span className="font-bold text-slate-800 dark:text-slate-100">Nguyễn Hùng Thái</span></div>
                            <div className="flex justify-between"><span className="text-slate-400 font-semibold">Mã định danh:</span><span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">STU-VERIFIED-X{activeCard.id}89</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 03
                        </span>
                        <span>STU • VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. LEAF 3: TRANG 04 BẰNG CẤP (FRONT) & BÌA SAU (BACK) */}
                  <div
                    className={cn("page", isPage3Flipped && "flipped")}
                    style={{ zIndex: isPage3Flipped ? 30 : 10 }}
                    onClick={() => {
                      safePlay("paperFlip");
                      setIsPage3Flipped(!isPage3Flipped);
                    }}
                  >
                    {/* TRANG 04 • BẰNG CẤP */}
                    <div className="front-page">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
                          <span 
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            ❖ {activeCard.title}
                          </span>
                          <span 
                            className="cursor-pointer font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); jumpToBookPage(3); }}
                          >
                            Trang 04
                          </span>
                        </div>

                        <div className="mb-2.5">
                          <span className="text-base font-extrabold text-indigo-600 font-mono leading-none block">04</span>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight mt-0.5">Bằng cấp & Chứng nhận</h3>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                            Chứng nhận hoàn thành khóa học {activeCard.title} tại {activeCard.subtitle}.
                          </p>
                        </div>

                        {/* Certificate Selection if multiple exist */}
                        {activeCard.certImg2 && (
                          <div className="flex gap-1 mb-1.5 justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCertIndex(0);
                              }}
                              className={cn(
                                "px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer transition-colors",
                                certIndex === 0
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                              )}
                            >
                              Thuyết trình
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCertIndex(1);
                              }}
                              className={cn(
                                "px-2 py-0.5 rounded text-[8px] font-bold cursor-pointer transition-colors",
                                certIndex === 1
                                  ? "bg-indigo-600 text-white shadow-xs"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                              )}
                            >
                              Đào tạo
                            </button>
                          </div>
                        )}

                        {/* Certificate Frame displaying the actual certificate image */}
                        <div className="rounded-[12px] overflow-hidden border-2 border-indigo-200/90 dark:border-indigo-800/80 bg-slate-50 dark:bg-slate-950 relative h-48 group/cert flex items-center justify-center">
                          <img
                            src={certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image)}
                            alt="Bằng cấp"
                            className="max-w-full max-h-full object-contain group-hover/cert:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImagePreview(
                                certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image),
                                `${activeCard.title} - ${certIndex === 1 ? "Đào tạo" : "Thuyết trình"}`
                              );
                            }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-2 right-2 flex gap-1 bg-black/40 p-1 rounded-md backdrop-blur-xs">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadPreviewImg(certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image));
                              }}
                              className="w-5.5 h-5.5 rounded bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition shadow-md cursor-pointer"
                              title="Tải về"
                            >
                              <Icons.Download className="w-2.5 h-2.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openImagePreview(
                                  certIndex === 1 && activeCard.certImg2 ? activeCard.certImg2 : (activeCard.certImg || activeCard.image),
                                  activeCard.title
                                );
                              }}
                              className="w-5.5 h-5.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition shadow-md cursor-pointer"
                              title="Xem đầy đủ"
                            >
                              <Icons.Maximize2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-400">
                        <span 
                          className="btn-page-nav prev cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            jumpToBookPage(2);
                          }}
                        >
                          <Icons.ChevronLeft className="w-3 h-3" /> Trang 03
                        </span>
                        <span 
                          className="btn-page-nav next cursor-pointer" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            jumpToBookPage(4); 
                          }}
                        >
                          Bìa Sau <Icons.ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* LÓT BÌA SAU TRONG */}
                    <div 
                      className="back-page bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex flex-col justify-between font-play cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        jumpToBookPage(0);
                      }}
                    >
                      <div className="text-center py-6">
                        <Icons.Bookmark className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                        <h4 className="text-xs font-bold text-slate-200 font-play">HỒ SƠ NĂNG LỰC SỐ HÓA</h4>
                        <p className="text-[9px] text-slate-400 mt-1 max-w-[200px] mx-auto font-play">"Học tập suốt đời • Làm chủ công nghệ • Lãnh đạo bằng sự thấu cảm"</p>
                      </div>
                      <div className="text-[8px] text-slate-500 text-center font-play">BẢN QUYỀN THUỘC VỀ NGUYỄN HÙNG THÁI</div>
                    </div>
                  </div>

                  {/* 5. BACK COVER (Font 'Play') */}
                  <div 
                    className="back-cover font-play flex flex-col justify-between items-center text-center text-white transition-all duration-500 cursor-pointer"
                    style={{
                      background: getBookCoverTheme(activeCard.id).backCoverBg,
                      border: `2px solid ${getBookCoverTheme(activeCard.id).borderColor}`
                    }}
                    onClick={() => jumpToBookPage(0)}
                  >
                    <div className="w-full flex justify-end">
                      <span className="text-[8px] font-mono font-bold" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>STU • 2026</span>
                    </div>
                    <div className="space-y-2">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border shadow-md transition-all"
                        style={{
                          background: getBookCoverTheme(activeCard.id).badgeBg,
                          borderColor: getBookCoverTheme(activeCard.id).badgeBorder,
                          color: getBookCoverTheme(activeCard.id).textAccent
                        }}
                      >
                        <Icons.GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-white font-play">HỒ SƠ HỌC VẤN 3D</h3>
                      <p className="text-[9.5px] font-play" style={{ color: getBookCoverTheme(activeCard.id).textAccent }}>Nguyễn Hùng Thái • STU Alumni</p>
                    </div>
                    <div className="w-full pt-2 border-t border-white/10 text-[8px] text-slate-300 font-play">
                      <span>BÌA SAU</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

      {/* ================= EDIT PROFILE BANNER MODAL ================= */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-[20px] glass-card-bright p-5 shadow-2xl space-y-3 bg-white dark:bg-slate-900 border border-white dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                <Icons.UserCog className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Chỉnh Sửa Thông Tin Chủ Hồ Sơ</span>
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Họ và Tên:</label>
                <input
                  type="text"
                  value={inputProfileName}
                  onChange={(e) => setInputProfileName(e.target.value)}
                  className="w-full p-2.5 rounded-[10px] glass-inner-item text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Chức Danh & Kinh Nghiệm:</label>
                <input
                  type="text"
                  value={inputProfileTitle}
                  onChange={(e) => setInputProfileTitle(e.target.value)}
                  className="w-full p-2.5 rounded-[10px] glass-inner-item text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="px-3.5 py-1.5 rounded-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={saveProfileBanner}
                className="px-4 py-1.5 rounded-[10px] bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-500 transition cursor-pointer"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= AI ASSISTANT MODAL (GEMINI 2.5 FLASH) ================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-[20px] glass-card-bright p-5 shadow-2xl space-y-3.5 bg-white dark:bg-slate-900 border border-white dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white">
                  <Icons.Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Trợ Lý Phân Tích Năng Lực AI (Gemini 2.5)</h3>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Tự động tổng hợp ma trận năng lực & lộ trình phát triển</p>
                </div>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Yêu cầu phân tích chuyên sâu:</label>
              <textarea
                rows={3}
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="Ví dụ: Phân tích sự kết hợp giữa kỹ năng Đào tạo & Thuyết trình và năng lực Lãnh đạo CSKH..."
                className="w-full p-2.5 rounded-[12px] glass-inner-item text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { safePlay("click"); setAiPromptInput("Đánh giá ma trận Kỹ thuật & Quản trị"); }}
                className="text-[10px] px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 font-medium transition border border-indigo-100 dark:border-indigo-900 cursor-pointer"
              >
                Đánh giá ma trận Kỹ thuật & Quản trị
              </button>
              <button
                onClick={() => { safePlay("click"); setAiPromptInput("Năng lực Đào tạo & Truyền cảm hứng đội ngũ"); }}
                className="text-[10px] px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 font-medium transition border border-purple-100 dark:border-purple-900 cursor-pointer"
              >
                Năng lực Đào tạo & Truyền cảm hứng đội ngũ
              </button>
              <button
                onClick={() => { safePlay("click"); setAiPromptInput("Tóm tắt năng lực nổi bật cho hồ sơ Lãnh đạo"); }}
                className="text-[10px] px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-medium transition border border-emerald-100 dark:border-emerald-900 cursor-pointer"
              >
                Tóm tắt năng lực nổi bật cho hồ sơ Lãnh đạo
              </button>
            </div>

            {/* AI Response Container */}
            {showAiResponse && (
              <div className="max-h-48 overflow-y-auto thin-scrollbar p-3 rounded-[12px] bg-slate-900 text-slate-100 text-xs leading-relaxed space-y-2 font-mono">
                <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-700 pb-1">
                  <Icons.Cpu className="w-3.5 h-3.5" />
                  <span>KẾT QUẢ PHÂN TÍCH TỪ AI:</span>
                </div>
                <div className="text-[11px] whitespace-pre-wrap">{aiResponseText}</div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-3.5 py-1.5 rounded-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Đóng
              </button>
              <button
                disabled={aiLoading}
                onClick={handleAiAnalyze}
                className={cn(
                  "px-4 py-1.5 rounded-[10px] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer",
                  aiLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icons.Zap className="w-3.5 h-3.5" />
                <span>Phân Tích Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CROP & BANNER SELECTION MODAL ================= */}
      {isCropModalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsCropModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white dark:bg-slate-900 rounded-[22px] p-5 shadow-2xl border border-white/80 dark:border-slate-800 flex flex-col space-y-4 glass-card-bright"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                  <Icons.Crop className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Cắt Hình & Chọn Làm Banner Thẻ</h4>
                  <p className="text-[10px] text-slate-500 truncate max-w-[320px]">{cropTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCropModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Crop Preview Area with aspect ratio & zoom */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Chọn tỷ lệ khung hình (Aspect Ratio):</span>
                <div className="flex gap-1.5">
                  {(["16/9", "4/3", "1/1", "21/9"] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => { safePlay("click"); setCropAspectRatio(ratio); }}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer border",
                        cropAspectRatio === ratio
                          ? "bg-amber-500 text-slate-950 border-amber-300 shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crop Frame Box */}
              <div 
                className={cn(
                  "relative w-full mx-auto overflow-hidden bg-slate-950 rounded-[14px] border-2 border-amber-400/80 shadow-inner flex items-center justify-center p-2",
                  cropAspectRatio === "16/9" && "aspect-video",
                  cropAspectRatio === "4/3" && "aspect-[4/3]",
                  cropAspectRatio === "1/1" && "aspect-square",
                  cropAspectRatio === "21/9" && "aspect-[21/9]"
                )}
              >
                <img
                  src={cropImgUrl}
                  alt="Crop Preview"
                  className="max-w-full max-h-full object-contain transition-transform duration-200 rounded"
                  style={{ transform: `scale(${cropZoom})` }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-2 border-dashed border-amber-400/60 pointer-events-none rounded-[14px] m-2"></div>
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-bold text-amber-300 border border-white/20">
                  Tỷ lệ: {cropAspectRatio} | Zoom: {cropZoom.toFixed(1)}x
                </div>
              </div>

              {/* Zoom Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Thu phóng (Zoom):</span>
                  <span className="font-mono">{cropZoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={cropZoom}
                  onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsCropModalOpen(false)}
                className="px-4 py-2 rounded-[12px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCrop}
                className="px-4 py-2 rounded-[12px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black shadow-md hover:opacity-95 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Icons.Check className="w-4 h-4" />
                <span>Cắt & Lưu Làm Banner</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= IMAGE LIGHTBOX PREVIEW MODAL ================= */}
      {isPreviewModalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white/95 dark:bg-slate-900/95 rounded-[22px] p-4 shadow-2xl border border-white/80 dark:border-slate-800 flex flex-col items-center glass-card-bright"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Icons.ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm truncate max-w-[400px]">{previewModalTitle}</h4>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full flex-1 overflow-hidden flex items-center justify-center rounded-[16px] bg-slate-950/5 p-2 border border-slate-200/60 dark:border-slate-800">
              <img
                src={previewModalImg}
                alt="Certificate Preview"
                className="max-h-[58vh] max-w-full object-contain rounded-[12px] shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="w-full flex items-center justify-between pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold">
              <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Bản số hóa gốc đã kiểm định</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadPreviewImg()}
                  className="px-3.5 py-1.5 rounded-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-1.5 shadow hover:opacity-95 transition cursor-pointer"
                >
                  <Icons.Download className="w-3.5 h-3.5" />
                  <span>Tải Hình Ảnh</span>
                </button>
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-[14px] shadow-2xl flex items-center gap-2 z-50 text-xs font-bold animate-bounce">
          <Icons.CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
