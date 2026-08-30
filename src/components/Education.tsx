import React, { useState, useEffect, useRef, useMemo } from "react";
import * as Icons from "lucide-react";
import { useLanguage } from "../i18n";
import { Masonry } from "./Masonry";
import { useSound } from "../context/SoundContext";
import { DEFAULT_EDUCATION_CARDS, EducationCard } from "../data/educationData";
import { PageBanner } from "./PageBanner";
import { cn } from "../lib/utils";

// Dynamic Icon Component mapping strings to Lucide icon components safely
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  let IconComponent = Icons.GraduationCap; // Default fallback

  const nameLower = name.toLowerCase();
  if (nameLower === "code") IconComponent = Icons.Code;
  else if (nameLower === "database") IconComponent = Icons.Database;
  else if (nameLower === "shield-alert") IconComponent = Icons.ShieldAlert;
  else if (nameLower === "briefcase") IconComponent = Icons.Briefcase;
  else if (nameLower === "award") IconComponent = Icons.Award;
  else if (nameLower === "users") IconComponent = Icons.Users;
  else if (nameLower === "presentation") IconComponent = Icons.Presentation;
  else if (nameLower === "user-check") IconComponent = Icons.UserCheck;
  else if (nameLower === "graduation-cap") IconComponent = Icons.GraduationCap;
  else if (nameLower === "phone-call") IconComponent = Icons.PhoneCall;
  else if (nameLower === "network") IconComponent = Icons.Network;
  else if (nameLower === "server") IconComponent = Icons.Server;

  return <IconComponent className={className} />;
}

export default function Education() {
  const { lang, t } = useLanguage();
  const { playSound } = useSound();

  // State Management
  const [cards, setCards] = useState<EducationCard[]>(() => {
    return JSON.parse(JSON.stringify(DEFAULT_EDUCATION_CARDS));
  });
  const [selectedCardId, setSelectedCardId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "tech" | "management">("all");

  // Physics overlap sliders state
  const [overlap, setOverlap] = useState<number>(-65);
  const [shift, setShift] = useState<number>(65);
  const [lift, setLift] = useState<number>(-22);

  // Book interaction state
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [bookSpread, setBookSpread] = useState<number>(1);
  const [isBookCoverFlipped, setIsBookCoverFlipped] = useState<boolean>(false);

  const [viewMode, setViewMode] = useState<"grid" | "stack">("stack");
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3 | 4>(3);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const gridContainerRef = useRef<HTMLDivElement>(null);

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

  const MIN_CARD_WIDTH = 280;
  const GAP = 16;
  const actualColumns = useMemo(() => {
    if (viewMode !== "grid") return 1;
    if (!containerWidth) return gridColumns;
    const maxPossibleColumns = Math.max(1, Math.floor((containerWidth + GAP) / (MIN_CARD_WIDTH + GAP)));
    return Math.min(gridColumns, maxPossibleColumns);
  }, [viewMode, containerWidth, gridColumns]);


  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        let cardW = 240;
        if (width < 480) cardW = 110;
        else if (width < 640) cardW = 140;
        
        const rowS = Math.ceil(cards.length / 2);
        if (rowS > 1) {
            let requiredOverlap = (width - 40 - cardW) / (rowS - 1) - cardW;
            // limit overlap max to -15px
            if (requiredOverlap > -15) requiredOverlap = -15;
            setOverlap(Math.floor(requiredOverlap));
            setShift(Math.floor(Math.abs(requiredOverlap)));
        }
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [cards.length]);


  // Form edit fields (synced with selectedCardId)
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputSubtitle, setInputSubtitle] = useState<string>("");
  const [inputImage, setInputImage] = useState<string>("");
  const [inputDesc, setInputDesc] = useState<string>("");
  const [inputIcon, setInputIcon] = useState<string>("code");

  // Other modals
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isAiBannerModalOpen, setIsAiBannerModalOpen] = useState<boolean>(false);
  const [isBannerEditModalOpen, setIsBannerEditModalOpen] = useState<boolean>(false);
  const [aiPromptInput, setAiPromptInput] = useState<string>("");
  const [aiBannerLoading, setAiBannerLoading] = useState<boolean>(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  // Profile banner customization
  const [profileName, setProfileName] = useState<string>("Nguyễn Hùng Thái");
  const [profileTitle, setProfileTitle] = useState<string>("CHUYÊN GIA & QUẢN LÝ CSKH • 22+ NĂM KINH NGHIỆM");
  const [profileSlogan, setProfileSlogan] = useState<string>(
    "Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm xây dựng, vận hành và tối ưu hóa hệ thống CSKH cho các doanh nghiệp hàng đầu."
  );
  const [profileAvatar, setProfileAvatar] = useState<string>("https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif");
  const [bannerBgImage, setBannerBgImage] = useState<string>("");

  // Temp states for Banner Edit Dialog
  const [tempProfileName, setTempProfileName] = useState<string>("");
  const [tempProfileTitle, setTempProfileTitle] = useState<string>("");
  const [tempProfileSlogan, setTempProfileSlogan] = useState<string>("");
  const [tempProfileAvatar, setTempProfileAvatar] = useState<string>("");

  // Sync edit form fields when selected card changes
  useEffect(() => {
    const card = cards.find((c) => c.id === selectedCardId);
    if (card) {
      setInputTitle(card.title);
      setInputSubtitle(card.subtitle);
      setInputImage(card.image);
      setInputDesc(card.desc);
      setInputIcon(card.icon);
    }
  }, [selectedCardId, cards]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleCardClick = (id: number) => {
    playSound?.("click");
    setSelectedCardId(id);
    const card = cards.find((c) => c.id === id);
    if (card) {
      setIsBookOpen(true);
      setBookSpread(1);
      setIsBookCoverFlipped(true);
    }
  };

  const handleUpdateCardField = (field: keyof EducationCard, value: any) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === selectedCardId) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const handleAddCard = () => {
    playSound?.("click");
    const newId = cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1;
    const newCard: EducationCard = {
      id: newId,
      title: `Chứng Nhận Mới ${newId}`,
      subtitle: `Phát triển chuyên môn`,
      year: `Năm 2026`,
      type: "tech",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
      courseImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      certImg: "https://images.unsplash.com/photo-1589330694653-aded6fac0243?auto=format&fit=crop&w=600&q=80",
      desc: `Mô tả nội dung đào tạo và thành tích đạt được trong quá trình học tập của chứng chỉ số ${newId}.`,
      modules: [
        "Module 1: Kiến thức nền tảng",
        "Module 2: Đào tạo chuyên sâu",
        "Module 3: Thực hành thực tế",
        "Module 4: Kiểm tra đánh giá"
      ],
      results: [
        "Hoàn thành xuất sắc bài thi đánh giá",
        "Ứng dụng hiệu quả vào quy trình vận hành",
        "Nâng cao năng lực chuyên môn"
      ],
      icon: "award",
      theme: {
        text: "text-indigo-600 dark:text-indigo-400",
        badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
        iconBg: "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
      }
    };

    setCards((prev) => [...prev, newCard]);
    setSelectedCardId(newId);
    triggerToast("Đã thêm thẻ học vấn mới!");
  };

  const handleDeleteCard = () => {
    playSound?.("click");
    if (cards.length <= 1) {
      triggerToast("Cần giữ lại ít nhất 1 thẻ!");
      return;
    }
    const updated = cards.filter((c) => c.id !== selectedCardId);
    setCards(updated);
    setSelectedCardId(updated[0].id);
    triggerToast("Đã xóa thẻ học vấn thành công!");
  };

  const handleResetDefaults = () => {
    playSound?.("click");
    setCards(JSON.parse(JSON.stringify(DEFAULT_EDUCATION_CARDS)));
    setOverlap(-65);
    setShift(65);
    setLift(-22);
    setSelectedCardId(1);
    triggerToast("Khôi phục danh sách 12 thẻ học vấn mặc định!");
  };

  const handleSaveBannerProfile = () => {
    playSound?.("click");
    setProfileName(tempProfileName);
    setProfileTitle(tempProfileTitle);
    setProfileSlogan(tempProfileSlogan);
    setProfileAvatar(tempProfileAvatar);
    setIsBannerEditModalOpen(false);
    triggerToast("Đã cập nhật thông tin Banner thành công!");
  };

  const openBannerEditModal = () => {
    playSound?.("click");
    setTempProfileName(profileName);
    setTempProfileTitle(profileTitle);
    setTempProfileSlogan(profileSlogan);
    setTempProfileAvatar(profileAvatar);
    setIsBannerEditModalOpen(true);
  };

  const generateAiBanner = async () => {
    const promptText = aiPromptInput.trim();
    if (!promptText) {
      triggerToast("Vui lòng nhập mô tả ảnh Banner AI!");
      return;
    }
    setAiBannerLoading(true);
    playSound?.("click");

    try {
      // Lazy call Google Gemini Flash Image generation API
      const payload = {
        contents: [
          {
            parts: [{ text: `Create a professional wide 16:9 banner cover image for an academic diploma portfolio: ${promptText}` }]
          }
        ],
        generationConfig: {
          responseModalities: ["IMAGE"],
          imageConfig: { aspectRatio: "16:9" }
        }
      };

      const apiKey = ""; // Let infrastructure fallback or proxy
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const base64Data = result?.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;

      if (base64Data) {
        const imageUrl = `data:image/png;base64,${base64Data}`;
        setBannerBgImage(imageUrl);
        triggerToast("Đã tạo Banner AI nghệ thuật thành công!");
        setIsAiBannerModalOpen(false);
      } else {
        triggerToast("Không thể tạo ảnh lúc này. Vui lòng thử lại sau!");
      }
    } catch (err) {
      console.error("AI Banner Generation Error:", err);
      triggerToast("Có lỗi xảy ra khi tạo ảnh AI.");
    } finally {
      setAiBannerLoading(false);
    }
  };

  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  // Filtering cards
  const filteredCards = cards.filter((c) => {
    const matchesCategory = categoryFilter === "all" || c.type === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const rows = [[...filteredCards, ...filteredCards, ...filteredCards]];

  const selectedExportCode = `<style>
.stack-card {
  display: flex; flex-direction: column; height: 380px; width: 240px;
  background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(20px);
  border-radius: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: -0.75rem 0.5rem 2.5rem rgba(120, 105, 150, 0.22);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.stack-card:not(:first-child) { margin-left: ${overlap}px; }
.stack-card:hover { transform: translateY(${lift}px) scale(1.04); }
.stack-card:hover ~ .stack-card { position: relative; left: ${shift}px; }
</style>`;

  return (
    <section id="education" ref={containerRef} className="relative min-h-full flex flex-col justify-start" style={{ padding: '15px', gap: '10px' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5 w-full flex flex-col gap-[10px] animate-fadeIn text-slate-800 dark:text-slate-100">
      
      {/* SCOPED STYLES FOR THE 3D BOOK & CARD FANNING */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --glass-bg: rgba(255, 255, 255, 0.65);
          --glass-border: rgba(255, 255, 255, 0.85);
          --glass-shadow: 0 20px 40px -15px rgba(135, 120, 165, 0.2), 0 8px 16px -8px rgba(135, 120, 165, 0.12);
        }

        .glass-card-edu {
          background: transparent;
          border: none;
          box-shadow: none;
          border-radius: 1.75rem;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .dark .glass-card-edu {
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .glass-card-edu:hover {
          box-shadow: none;
        }
        .dark .glass-card-edu:hover {
          box-shadow: none;
        }

        /* 3D Stack Overlap CSS Engine */
        @keyframes slideRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .cards-container {
          display: flex;
          padding: 16px 20px;
          justify-content: flex-start;
          align-items: center;
          perspective: 1000px;
          min-height: 400px;
          width: max-content;
          animation: slideRightToLeft 45s linear infinite;
        }
        .cards-container:hover {
          animation-play-state: paused;
        }

        .stack-card {
          display: flex;
          flex-direction: column;
          height: 380px;
          width: 240px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          box-shadow: -0.75rem 0.5rem 2.5rem rgba(120, 105, 150, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.9);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
          left: 0;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.9);
          padding: 14px;
          user-select: none;
          flex-shrink: 0;
          overflow: hidden;
        }
        .dark .stack-card {
          background: rgba(24, 20, 36, 0.9);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: -0.75rem 0.5rem 2.5rem rgba(0, 0, 0, 0.4);
        }

        .card-thumb {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: rgba(0,0,0,0.03);
          border-radius: 0.9rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .stack-card:not(:first-child) {
          margin-left: var(--card-overlap, -65px);
        }

        .stack-card:hover {
          z-index: 30;
        }
        .dark .stack-card:hover {
          z-index: 30;
        }

        .stack-card:hover ~ .stack-card {
          position: relative;
          left: var(--card-shift, 65px);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* 3D Book Stage Mechanics */
        .book-stage {
          perspective: 1800px;
        }

        .book-wrapper {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .book-cover-hinge {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 50%;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), z-index 0.5s 0.3s, box-shadow 0.4s ease;
          z-index: 30;
          cursor: pointer;
        }

        /* Pre-Opening Cover Hover Preview Effect */
        .book-wrapper:not(.book-open) .book-cover-hinge:hover {
          transform: rotateY(-22deg) translateZ(12px);
          box-shadow: -20px 20px 40px rgba(15, 10, 30, 0.45), 0 0 25px rgba(129, 140, 248, 0.4);
        }

        .book-wrapper:not(.book-open) .book-cover-hinge::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 0 1.25rem 1.25rem 0;
        }

        .book-wrapper:not(.book-open) .book-cover-hinge:hover::after {
          opacity: 1;
        }

        .book-cover-front,
        .book-cover-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0 1.25rem 1.25rem 0;
          overflow: hidden;
        }

        .book-cover-front {
          box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.22);
        }

        .book-cover-back {
          transform: rotateY(180deg);
          border-radius: 1.25rem 0 0 1.25rem;
          background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
          box-shadow: -10px 10px 30px rgba(0, 0, 0, 0.15);
        }
        .dark .book-cover-back {
          background: linear-gradient(135deg, #181227 0%, #0c0817 100%);
          box-shadow: -10px 10px 30px rgba(0, 0, 0, 0.4);
        }

        .book-spine-shadow {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 30px;
          transform: translateX(-15px);
          background: linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%);
          z-index: 25;
          pointer-events: none;
        }

        .book-spread-panel {
          transform-style: preserve-3d;
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .book-spread-panel.opacity-0 {
          transform: rotateY(12deg) scale(0.97);
        }

        .cert-seal {
          background: radial-gradient(circle, #f59e0b 0%, #b45309 100%);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.4);
        }

        @keyframes medalFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-7px) rotate(2deg) scale(1.04); }
        }

        @keyframes shineGlow {
          0% { transform: rotate(0deg); opacity: 0.6; }
          50% { opacity: 1; }
          100% { transform: rotate(360deg); opacity: 0.6; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.8); }
          50% { box-shadow: 0 0 35px rgba(245, 158, 11, 0.85), 0 0 50px rgba(251, 191, 36, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.9); }
        }

        .medal-wrapper {
          animation: medalFloat 3.5s ease-in-out infinite;
        }

        .medal-aura {
          animation: shineGlow 12s linear infinite;
        }

        .medal-box {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        .book-open .book-cover-hinge {
          transform: rotateY(-180deg);
          z-index: 1;
        }

        .book-open .book-spread-panel {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
        }

        .book-page-flip {
          position: absolute;
          inset: 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), z-index 0.5s 0.2s;
        }

        .book-page-flip.flipped {
          transform: rotateY(-180deg);
        }

        .flip-nav-btn {
          position: absolute;
          bottom: 1.25rem;
          padding: 0.5rem 0.85rem;
          border-radius: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 40;
        }

        .flip-nav-next {
          right: 1.25rem;
          background: #4f46e5;
          color: white;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
        .flip-nav-next:hover {
          background: #4338ca;
          transform: translateX(2px);
        }

        .flip-nav-prev {
          left: 1.25rem;
          background: #f1f5f9;
          color: #334155;
          border: 1px solid #e2e8f0;
        }
        .dark .flip-nav-prev {
          background: #1e293b;
          color: #e2e8f0;
          border-color: rgba(255,255,255,0.1);
        }
        .flip-nav-prev:hover {
          background: #e2e8f0;
          transform: translateX(-2px);
        }
        .dark .flip-nav-prev:hover {
          background: #334155;
        }

        @media (max-width: 640px) {
          .cards-container {
            min-height: 250px;
            padding: 8px 10px;
          }
          .stack-card {
            height: 380px !important;
            width: 240px !important;
          }
          .stack-card:not(:first-child) {
            margin-left: -55px !important;
          }
          .stack-card:hover ~ .stack-card {
            left: 55px !important;
          }
          .book-stage {
            transform: scale(0.85);
            transform-origin: top center;
          }
        }
        @media (max-width: 480px) {
          .cards-container {
            min-height: 200px;
          }
          .stack-card {
            height: 380px !important;
            width: 240px !important;
          }
          .stack-card:not(:first-child) {
            margin-left: -45px !important;
          }
          .stack-card:hover ~ .stack-card {
            left: 45px !important;
          }
          .book-stage {
            transform: scale(0.72);
            transform-origin: top center;
          }
        }
      ` }} />

      {/* ================= 1. HEADER BANNER ================= */}
      <div id="hero-banner" className="w-full mb-[10px]">
        <PageBanner
          title={lang === "vi" ? "Hồ sơ học vấn" : "Education and professional credentials"}
          subtitle={lang === "vi" ? "Nền tảng tri thức & năng lực chuyên môn: Cử nhân Công nghệ Thông tin (STU) cùng hệ thống chứng chỉ quản trị, kỹ thuật & vận hành chuyên sâu." : "Knowledge foundation & professional expertise: IT Bachelor Degree (STU) alongside executive management & technology certifications."}
          tag={lang === "vi" ? "HỌC VẤN" : "EDUCATION"}
          iconType="education"
          gradient="from-slate-950 via-indigo-950 to-slate-950"
          rightContent={
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-md">
              <Icons.GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 animate-pulse" />
              <span>{filteredCards.length} {lang === "vi" ? "Bằng cấp & Chứng chỉ" : "Certifications"}</span>
            </div>
          }
        >
          {/* Top Banner Control Row: Search + Category Filter Dropdown + Column Selector + View Toggles */}
          <div className="w-full pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search & Unified Category Filter Dropdown Group */}
            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2">
              
              {/* Search Input */}
              <div className="relative flex-1 sm:max-w-xs">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === "vi" ? "Tìm kiếm bằng cấp, chuyên ngành..." : "Search degree, major, desc..."}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/15 hover:bg-white/20 focus:bg-white/25 border border-white/20 text-white placeholder-white/60 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400/50 backdrop-blur-md transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <Icons.X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* UNIFIED FILTER SELECTOR */}
              <div className="relative shrink-0">
                <div className="relative flex items-center">
                  <Icons.SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-300 pointer-events-none" />
                  <select
                    aria-label={lang === "vi" ? "Bộ lọc học vấn hợp nhất" : "Unified education filter"}
                    value={categoryFilter}
                    onChange={(e) => {
                      playSound?.("click");
                      setCategoryFilter(e.target.value as any);
                    }}
                    className="w-full sm:w-auto pl-8.5 pr-8 py-2 rounded-xl bg-black/40 hover:bg-black/50 border border-amber-400/40 text-amber-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400/50 backdrop-blur-md cursor-pointer transition-all shadow-sm appearance-none"
                  >
                    <option value="all" className="bg-slate-900 text-slate-100 py-1">
                      {lang === "vi" ? "✨ Tất cả học vấn & bằng cấp" : "✨ All Degrees & Certs"}
                    </option>
                    <option value="tech" className="bg-slate-900 text-slate-100 py-1">
                      {lang === "vi" ? "💻 Chuyên môn Kỹ thuật" : "💻 Tech Expertise"}
                    </option>
                    <option value="management" className="bg-slate-900 text-slate-100 py-1">
                      {lang === "vi" ? "📊 Quản lý Vận hành" : "📊 Management & Operations"}
                    </option>
                  </select>
                  <Icons.ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-300 pointer-events-none transform rotate-90" />
                </div>
              </div>

              {/* Active Filter Clear Tag */}
              {(categoryFilter !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    playSound?.("click");
                    setCategoryFilter("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 border border-rose-400/40 text-[11px] font-bold transition-all shrink-0 cursor-pointer"
                  title={lang === "vi" ? "Xóa bộ lọc" : "Clear filter"}
                >
                  <Icons.X className="w-3 h-3" />
                  <span>{lang === "vi" ? "Bỏ lọc" : "Clear"}</span>
                </button>
              )}

            </div>

            {/* View Switcher & Column Selector */}
            <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
              {/* Grid Column Selector (Active when in Grid Mode) */}
              {viewMode === "grid" && !isBookOpen && (
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-inner">
                  <span className="text-[10px] font-extrabold text-amber-300 uppercase px-2 hidden sm:inline-block">
                    {lang === "vi" ? "Cột:" : "Cols:"}
                  </span>
                  {([1, 2, 3, 4] as const).map((col) => (
                    <button
                      key={col}
                      type="button"
                      aria-label={lang === "vi" ? `Hiển thị ${col} cột` : `Show ${col} columns`}
                      aria-pressed={gridColumns === col}
                      onClick={() => {
                        playSound?.("click");
                        setGridColumns(col);
                      }}
                      className={cn(
                        "w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-black flex items-center justify-center transition-all cursor-pointer",
                        gridColumns === col
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-110 ring-1 ring-white/50"
                          : "text-white/80 hover:text-white hover:bg-white/15"
                      )}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              )}

              {/* View Mode Quick Toggles */}
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-inner">
                <button
                  onClick={() => { playSound?.("click"); setViewMode("stack"); setIsBookOpen(false); }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                    viewMode === "stack" && !isBookOpen ? "bg-indigo-600 text-white shadow-md" : "text-white/80 hover:text-white"
                  )}
                >
                  <Icons.AlignJustify className="w-3.5 h-3.5" />
                  {lang === "vi" ? "Thu gọn" : "Compact"}
                </button>
                <button
                  onClick={() => { playSound?.("click"); setViewMode("grid"); setIsBookOpen(false); }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                    viewMode === "grid" && !isBookOpen ? "bg-indigo-600 text-white shadow-md" : "text-white/80 hover:text-white"
                  )}
                >
                  <Icons.LayoutGrid className="w-3.5 h-3.5" />
                  {lang === "vi" ? "Lưới" : "Grid"}
                </button>
                <button
                  onClick={() => { playSound?.("click"); setIsBookOpen(true); }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer",
                    isBookOpen ? "bg-amber-500 text-white shadow-md" : "text-white/80 hover:text-white"
                  )}
                >
                  <Icons.BookOpen className="w-3.5 h-3.5" />
                  {lang === "vi" ? "Sách 3D" : "3D Book"}
                </button>
              </div>
            </div>

          </div>
        </PageBanner>
      </div>

      {/* MAIN CARDS STAGE & INLINE BOOK PREVIEW */}
      {!isBookOpen ? (
        viewMode === "grid" ? (
          /* GRID VIEW (Modern Responsive Bento Grid formatted like Projects Grid) */
          <div 
            ref={gridContainerRef}
            id="education-grid"
            className="education-grid w-full min-w-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${actualColumns}, minmax(0, 1fr))`,
              gap: "16px",
              alignItems: "stretch"
            }}
          >
            {filteredCards.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-3 p-6 shadow-sm backdrop-blur-xl">
                <Icons.Search className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {lang === "vi" ? "Không tìm thấy hồ sơ học vấn phù hợp" : "No matching education items found"}
                </h3>
              </div>
            ) : (
              filteredCards.map((card) => {
                const isSelected = card.id === selectedCardId;
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`edu-grid-card rounded-[20px] border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-md cursor-pointer bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col justify-between text-left p-[5px] ${isSelected ? 'ring-2 ring-indigo-500/50 dark:ring-indigo-500/70 shadow-indigo-500/20' : ''}`}
                  >
                    <div>
                      {/* Media Area (Top Card Banner - Clean Image Cover with Bottom-Left Pill Badge) */}
                      <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 group/img flex items-center justify-center">
                        <img
                          src={card.image || card.courseImg || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'}
                          alt={card.title}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>

                        {/* Pill Badge at bottom-left inside image */}
                        <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600/95 text-white font-bold text-xs shadow-md backdrop-blur-md border border-white/20">
                          <Icons.Award className="w-4 h-4 text-white shrink-0" />
                          <span className="truncate max-w-[200px]">{card.subtitle}</span>
                        </div>

                        {/* Copy Snippet Code Button top-right */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound?.("click");
                            const snippet = `<div class="edu-card" data-id="${card.id}">\n  <h3>${card.title}</h3>\n  <p>${card.desc}</p>\n  <span>${card.subtitle} (${card.year})</span>\n</div>`;
                            navigator.clipboard.writeText(snippet);
                            triggerToast(lang === "vi" ? "Đã sao chép mã snippet thẻ học vấn!" : "Copied education card snippet!");
                          }}
                          className="absolute top-3 right-3 z-30 px-2 py-0.5 rounded-lg glass-panel hover:bg-white/60 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1 text-[10px] font-bold border border-white/40 active:scale-95 shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md cursor-pointer"
                          title="Copy Code"
                        >
                          <Icons.Code className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          <span>Copy</span>
                        </button>
                      </div>

                      {/* Header Title with Mortarboard Icon */}
                      <div className="flex items-center gap-2.5 mt-4 mb-3 px-0.5">
                        <Icons.GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 stroke-[2.2]" />
                        <h3 className="text-base sm:text-lg font-black text-indigo-950 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                          {card.title}
                        </h3>
                      </div>

                      {/* Middle Nested Info Box */}
                      <div className="rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 p-[5px] my-0 border border-slate-100/90 dark:border-slate-800/80 space-y-3.5">
                        {/* Item 1: Học tại */}
                        <div className="flex items-start gap-2.5">
                          <Icons.MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0 stroke-[2]" />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                              {lang === "vi" ? "Học tại:" : "Institution:"}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug block mt-0.5">
                              {card.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Item 2: Mô tả */}
                        <div className="flex items-start gap-2.5">
                          <Icons.Info className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0 stroke-[2]" />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                              {lang === "vi" ? "Mô tả:" : "Description:"}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-0.5 line-clamp-3">
                              {card.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Graduation Year */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <Icons.Calendar className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 stroke-[2]" />
                        <span>{lang === "vi" ? "Năm tốt nghiệp:" : "Graduation year:"}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black tracking-wide border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                        {card.year}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="w-full overflow-hidden relative h-[400px] min-h-[400px] rounded-[20px] bg-transparent border border-slate-200/20 dark:border-slate-800/20 shadow-none">
              <div 
                className="cards-container mt-0 px-[10px] py-0"
                style={{ 
                  marginTop: '0px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  '--card-overlap': '-120px', 
                  '--hover-lift': '-25px', 
                  '--hover-shift': '130px' 
                }}
              >
                {[...filteredCards, ...filteredCards, ...filteredCards].map((card, idx) => (
                <div 
                  key={card.id + "-" + idx} 
                  className="stack-card"
                  style={{ zIndex: 10 + idx }}
                  onClick={() => { playSound?.("click"); handleCardClick(card.id); }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                  
                  {/* Image/Thumb (Top) */}
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-4 shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                    <img src={card.image} alt={card.title} className="card-thumb transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Content (Bottom) */}
                  <div className="flex-1 flex flex-col justify-between z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {card.type === "tech" ? <Icons.Cpu className="w-4 h-4 text-blue-500" /> : <Icons.Workflow className="w-4 h-4 text-indigo-500" />}
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{card.year}</span>
                      </div>
                      <h3 className="text-[15px] sm:text-base font-black text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{card.subtitle}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {card.type === "tech" ? (lang === "vi" ? "Công Nghệ" : "Tech") : (lang === "vi" ? "Quản Lý" : "Mgmt")}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )
        ) : (
          /* INLINE 3D BOOK PREVIEW */
          <div id="inlineBookContainer" className="w-full flex flex-col items-center justify-center py-2 transition-all duration-500">
            
            {/* Book Top Bar Controls */}
            <div className="w-full flex flex-wrap justify-between items-center gap-3 mb-4 max-w-[840px] px-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <Icons.BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Sách Học Vấn 3D {!isBookCoverFlipped ? "(Đang ở Bìa)" : "(Đang mở)"}</span>
                </span>
                
                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/60 p-1 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  <button
                    onClick={() => { playSound?.("click"); setIsBookCoverFlipped(false); }}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${!isBookCoverFlipped ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold" : "hover:text-slate-950 dark:hover:text-white"}`}
                  >
                    📖 Bìa Sách
                  </button>
                  <button
                    onClick={() => { playSound?.("click"); setBookSpread(1); setIsBookCoverFlipped(true); }}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${isBookCoverFlipped && bookSpread === 1 ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold" : "hover:text-slate-950 dark:hover:text-white"}`}
                  >
                    Trang 01
                  </button>
                  <button
                    onClick={() => { playSound?.("click"); setBookSpread(2); setIsBookCoverFlipped(true); }}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${isBookCoverFlipped && bookSpread === 2 ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold" : "hover:text-slate-950 dark:hover:text-white"}`}
                  >
                    Trang 02 - 03
                  </button>
                  <button
                    onClick={() => { playSound?.("click"); setBookSpread(3); setIsBookCoverFlipped(true); }}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${isBookCoverFlipped && bookSpread === 3 ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold" : "hover:text-slate-950 dark:hover:text-white"}`}
                  >
                    Trang 04 (Bằng cấp)
                  </button>
                </div>
              </div>

              <button
                onClick={() => { playSound?.("click"); setIsBookOpen(false); }}
                className="px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-md border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Icons.ArrowLeft className="w-3.5 h-3.5 text-rose-500" />
                <span>Quay Lại Danh Sách</span>
              </button>
            </div>

            {/* 3D Book Stage */}
            <div className="book-stage w-full max-w-[840px] select-none">
              {!isBookCoverFlipped ? (
                /* STANDALONE 3D CLOSED BOOK INTERFACE */
                <div className="w-full flex flex-col items-center justify-center py-2 relative z-30">
                  <div 
                    onClick={() => { playSound?.("click"); setIsBookCoverFlipped(true); }}
                    className="group relative cursor-pointer transition-all duration-700 ease-out py-2"
                    style={{ perspective: "1600px" }}
                  >
                    {/* 3D Closed Book Hardcover Container */}
                    <div 
                      className="w-[300px] sm:w-[360px] md:w-[400px] h-[460px] sm:h-[500px] rounded-r-3xl rounded-l-md relative transition-transform duration-700 ease-out transform rotate-y-[-24deg] rotate-x-[10deg] rotate-z-[-2deg] group-hover:rotate-y-[-32deg] group-hover:rotate-x-[14deg] group-hover:rotate-z-[-3deg] group-hover:scale-105 shadow-2xl"
                      style={{
                        transformStyle: "preserve-3d",
                        boxShadow: "-30px 30px 60px rgba(0, 0, 0, 0.65), -10px 10px 25px rgba(79, 70, 229, 0.35)",
                      }}
                    >
                      {/* 1. 3D Spine on Left (Gáy Sách 3D Nổi) */}
                      <div 
                        className="absolute -left-[28px] top-0 bottom-0 w-[28px] rounded-l-lg bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border-y-2 border-amber-400/60 flex flex-col items-center justify-between py-6 z-30 shadow-2xl overflow-hidden"
                        style={{
                          transformOrigin: "right center",
                          transform: "rotateY(-90deg)",
                          boxShadow: "inset 0 0 12px rgba(0,0,0,0.95)"
                        }}
                      >
                        <div className="w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 shadow-sm"></div>
                        
                        {/* Vertical Gold Foil Text */}
                        <div 
                          className="font-black text-[10px] text-amber-300 tracking-[0.25em] uppercase font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate max-h-[320px] transform rotate-180"
                          style={{ writingMode: "vertical-lr" }}
                        >
                          {activeCard.title} • STU 2026
                        </div>

                        <div className="w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 shadow-sm"></div>
                      </div>

                      {/* 2. 3D Paper Pages Edge - Right (Khối Mép Trang Sách 3D Nổi) */}
                      <div 
                        className="absolute -right-[18px] top-2 bottom-2 w-[18px] bg-gradient-to-r from-amber-100 via-slate-100 to-amber-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 border-r-2 border-amber-400/50 rounded-r-md z-10 shadow-md overflow-hidden"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.14) 2px, rgba(0,0,0,0.14) 3px)"
                        }}
                      >
                        <div className="w-full h-full bg-amber-400/10"></div>
                      </div>

                      {/* 3D Paper Pages Edge - Top */}
                      <div 
                        className="absolute -top-[14px] left-1 right-1 h-[14px] bg-gradient-to-b from-amber-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-t border-amber-300/40 rounded-t-sm z-10"
                        style={{
                          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.14) 2px, rgba(0,0,0,0.14) 3px)"
                        }}
                      ></div>

                      {/* 3D Paper Pages Edge - Bottom */}
                      <div 
                        className="absolute -bottom-[14px] left-1 right-1 h-[14px] bg-gradient-to-t from-amber-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-b border-amber-300/40 rounded-b-sm z-10"
                        style={{
                          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.14) 2px, rgba(0,0,0,0.14) 3px)"
                        }}
                      ></div>

                      {/* Back Cover Bottom Rim Extension */}
                      <div className="absolute -bottom-[18px] -right-[22px] -left-[30px] h-[6px] bg-indigo-950 dark:bg-slate-950 border-b-2 border-amber-500/60 rounded-b-xl z-0 shadow-2xl"></div>

                      {/* 3. HARDCOVER FRONT COVER (Mặt Bìa Nổi 3D Chi Tiết) */}
                      <div className="absolute inset-0 rounded-r-3xl rounded-l-sm bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-5 sm:p-6 border-4 border-amber-400/90 shadow-[inset_0_2px_8px_rgba(255,255,255,0.4),0_15px_35px_rgba(0,0,0,0.6)] z-20 flex flex-col justify-between overflow-hidden group/cover">
                        
                        {/* Leather Texture & Light Shimmer Sweep */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none"></div>
                        <div className="absolute -inset-full group-hover/cover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none z-30"></div>

                        {/* Golden Corner Flourishes */}
                        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-300/90 rounded-tl"></div>
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-300/90 rounded-tr"></div>
                        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-300/90 rounded-bl"></div>
                        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-300/90 rounded-br"></div>

                        {/* Top Header Badge */}
                        <div className="relative z-10 flex items-center justify-between border-b-2 border-amber-400/40 pb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md border border-amber-200">
                              <Icons.GraduationCap className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <div>
                              <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest block leading-none">
                                SÁCH HỌC VẤN 3D NỔI
                              </span>
                              <span className="text-[11px] font-bold text-white tracking-wide block mt-0.5">
                                OFFICIAL DIPLOMA
                              </span>
                            </div>
                          </div>

                          <div className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono font-extrabold uppercase shadow-inner">
                            STU • {activeCard.year}
                          </div>
                        </div>

                        {/* Center Image Banner with 3D Gold Frame */}
                        <div className="relative z-10 my-2 w-full h-36 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl group/img flex items-center justify-center bg-slate-900">
                          <img 
                            src={activeCard.image || activeCard.courseImg || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'} 
                            alt={activeCard.title}
                            className="max-w-full max-h-full object-contain transform group-hover/img:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                          
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                            <span className="text-[10px] font-bold text-amber-300 bg-black/65 px-2.5 py-1 rounded-lg border border-amber-400/30 backdrop-blur-md">
                              🎓 {activeCard.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* 3D Embossed Title Text & Description */}
                        <div className="relative z-10 space-y-1 my-1 text-center">
                          <h2 className="text-sm sm:text-base font-black text-white leading-tight tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] line-clamp-2">
                            {activeCard.title}
                          </h2>
                          <p className="text-[10px] text-indigo-200 font-medium line-clamp-1 italic">
                            "{activeCard.desc}"
                          </p>
                        </div>

                        {/* Bottom Interactive Golden Seal & CTA Button */}
                        <div className="relative z-10 pt-2.5 border-t-2 border-amber-400/40 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-300">
                            <Icons.ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                            <span>Đã Xác Thực</span>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              playSound?.("click");
                              setIsBookCoverFlipped(true);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg border border-amber-200 flex items-center gap-1.5 transition transform hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                          >
                            <Icons.BookOpen className="w-3.5 h-3.5" />
                            <span>Nhấn Mở Sách 3D</span>
                          </button>
                        </div>

                        {/* 3D Gold Seal Stamp in Bottom-Right Corner */}
                        <div className="absolute bottom-12 right-3 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-xl border-2 border-amber-100 flex items-center justify-center text-amber-950 z-20 pointer-events-none transform rotate-12 opacity-90 group-hover/cover:rotate-0 transition-transform duration-500">
                          <div className="w-full h-full rounded-full border border-dashed border-amber-900/50 flex flex-col items-center justify-center text-center p-0.5">
                            <Icons.Award className="w-3.5 h-3.5 text-amber-950 stroke-[2.5]" />
                            <span className="text-[5px] font-black uppercase leading-none mt-0.5">VERIFIED</span>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Floor Shadow */}
                    <div className="w-[85%] h-5 bg-slate-950/70 dark:bg-black/90 blur-xl rounded-full mx-auto translate-y-3 transform scale-x-110 group-hover:scale-x-125 transition-all duration-700"></div>
                  </div>

                  {/* Hint Label */}
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-amber-400/40 text-slate-800 dark:text-slate-100 font-bold text-xs shadow-md backdrop-blur-md animate-bounce">
                    <Icons.Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Nhấn vào bìa sách để lật trang mở sách 3D</span>
                  </div>
                </div>
              ) : (
                /* OPEN 2-PAGE SPREAD CONTENT */
                <div id="bookEntity" className={`book-wrapper w-full h-[480px] sm:h-[520px] rounded-3xl relative shadow-2xl book-open`}>
                  <div className="book-spine-shadow"></div>

                {/* SPREAD 1: OVERVIEW (LEFT) & CORE MODULES (RIGHT) */}
                <div id="spread1" className={`book-spread-panel book-page-flip absolute inset-0 flex transition-all duration-300 ${bookSpread === 1 ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
                  
                  {/* PAGE 01 LEFT: OVERVIEW */}
                  <div className={`w-1/2 bg-white dark:bg-slate-900 rounded-l-3xl p-4 sm:p-5 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-inner text-slate-800 dark:text-slate-200 transition-all duration-500 ${isBookCoverFlipped && bookSpread === 1 ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"}`}>
                    <div className="space-y-3">
                      {/* Top Image Banner Area like Grid card */}
                      <div className="relative w-full h-32 sm:h-36 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 group/img flex items-center justify-center">
                        <img 
                          src={activeCard.image || activeCard.courseImg || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'} 
                          alt={activeCard.title} 
                          className="max-w-full max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>

                        {/* Pill Badge at bottom-left inside image */}
                        <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/95 text-white font-bold text-[10px] shadow-md backdrop-blur-md border border-white/20">
                          <Icons.Award className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="truncate max-w-[140px]">{activeCard.subtitle}</span>
                        </div>

                        <div className="absolute top-2.5 right-2.5 z-10 text-[8px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          HỒ SƠ HỌC VẤN
                        </div>
                      </div>

                      {/* Header Title with Mortarboard Icon */}
                      <div className="flex items-center gap-2 px-0.5">
                        <Icons.GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 stroke-[2.2]" />
                        <h3 className="text-sm font-black text-indigo-950 dark:text-indigo-100 leading-snug line-clamp-2">
                          {activeCard.title}
                        </h3>
                      </div>

                      {/* Middle Nested Info Box */}
                      <div className="rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 p-2.5 border border-slate-100/90 dark:border-slate-800/80 space-y-2.5 text-[10px]">
                        <div className="flex items-start gap-2">
                          <Icons.MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0 stroke-[2]" />
                          <div className="flex-1 min-w-0">
                            <span className="text-slate-500 dark:text-slate-400 font-medium block">
                              {lang === "vi" ? "Học tại:" : "Institution:"}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white leading-snug block">
                              {activeCard.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Icons.Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0 stroke-[2]" />
                          <div className="flex-1 min-w-0">
                            <span className="text-slate-500 dark:text-slate-400 font-medium block">
                              {lang === "vi" ? "Mô tả:" : "Description:"}
                            </span>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                              {activeCard.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        <Icons.Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                        <span>{lang === "vi" ? "Năm tốt nghiệp:" : "Year:"}</span>
                        <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{activeCard.year}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">01</span>
                    </div>
                  </div>

                  {/* PAGE 01 RIGHT: CORE MODULES 2x2 GRID */}
                  <div className="w-1/2 bg-white dark:bg-slate-900 rounded-r-3xl p-5 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-inner text-slate-800 dark:text-slate-200 relative">
                    <div className="space-y-3 pb-8">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 leading-none">01</span>
                        <div>
                          <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight">Nội dung cốt lõi</h3>
                          <p className="text-[10px] text-slate-500 font-medium">Khóa học gồm các mô-đun trọng tâm giúp rèn luyện năng lực thực chiến.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {activeCard.modules && activeCard.modules.map((m, idx) => {
                          const moduleIcons = [Icons.Target, Icons.BookOpenCheck, Icons.Mic, Icons.UsersRound];
                          const moduleColors = ["text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40", "text-purple-500 bg-purple-50 dark:bg-purple-950/40", "text-blue-500 bg-blue-50 dark:bg-blue-950/40", "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"];
                          const TargetIcon = moduleIcons[idx % 4] || Icons.BookOpen;
                          const colorClasses = moduleColors[idx % 4];
                          return (
                            <div key={idx} className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-1 font-sans">
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${colorClasses}`}>
                                <TargetIcon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                  {m}
                                </h5>
                                <p className="text-[8px] text-slate-400 dark:text-slate-500 mt-0.5">Hoàn thành & Đạt chuẩn.</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-2.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Icons.ClipboardCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-extrabold text-indigo-900 dark:text-indigo-300 leading-tight">Đánh giá kết quả & Cải tiến</h5>
                          <p className="text-[8px] text-indigo-700 dark:text-indigo-400 leading-tight mt-0.5">Đo lường – Huấn luyện – Tối ưu liên tục.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-300">01</span>
                      <button 
                        onClick={() => { playSound?.("click"); setBookSpread(2); }}
                        className="flip-nav-btn flip-nav-next py-1.5 px-2.5 rounded-lg text-[10px]"
                      >
                        Trang 02 - 03 <Icons.ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SPREAD 2: RESULTS (PAGE 2) & GALLERY (PAGE 3) */}
                <div id="spread2" className={`book-spread-panel book-page-flip absolute inset-0 flex transition-all duration-300 ${bookSpread === 2 ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
                  
                  {/* PAGE 02 LEFT: OUTCOMES (Hidden when book is closed at Cover) */}
                  <div className={`w-1/2 bg-white dark:bg-slate-900 rounded-l-3xl p-5 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-inner text-slate-800 dark:text-slate-200 relative transition-all duration-500 ${!isBookCoverFlipped ? "opacity-0 pointer-events-none invisible" : "opacity-100"}`}>
                    <div className="space-y-3 pb-8">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 leading-none">02</span>
                        <div>
                          <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight">Kết quả & Ứng dụng</h3>
                          <p className="text-[10px] text-slate-500 font-medium">Sau khóa học, áp dụng kiến thức vào thực tiễn để mang lại giá trị.</p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1 font-sans">
                        {activeCard.results && activeCard.results.map((r, idx) => {
                          const resultIcons = [Icons.UserCheck, Icons.Headphones, Icons.Megaphone, Icons.FileCheck2];
                          const resultColors = ["text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40", "text-purple-500 bg-purple-50 dark:bg-purple-950/40", "text-blue-500 bg-blue-50 dark:bg-blue-950/40", "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"];
                          const ResultIcon = resultIcons[idx % 4] || Icons.CheckCircle;
                          const colorClasses = resultColors[idx % 4];
                          return (
                            <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 font-sans">
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${colorClasses}`}>
                                <ResultIcon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">{r}</h5>
                                <p className="text-[8px] text-slate-400 dark:text-slate-500 mt-0.5">Ứng dụng trực tiếp và nâng tầm quy trình.</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <button 
                        onClick={() => { playSound?.("click"); setBookSpread(1); }}
                        className="flip-nav-btn flip-nav-prev py-1.5 px-2.5 rounded-lg text-[10px]"
                      >
                        <Icons.ChevronLeft className="w-3 h-3" /> Trang 01
                      </button>
                      <span className="text-[10px] font-bold text-slate-300">02</span>
                    </div>
                  </div>

                  {/* PAGE 03 RIGHT: GALLERY PHOTOS */}
                  <div className="w-1/2 bg-white dark:bg-slate-900 rounded-r-3xl p-5 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-inner text-slate-800 dark:text-slate-200 relative">
                    <div className="space-y-3 pb-8">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 leading-none">03</span>
                        <div>
                          <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight">Hình ảnh khóa học</h3>
                          <p className="text-[10px] text-slate-500 font-medium">Khoảnh khắc học tập, thực hành và kết nối trong hành trình.</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full h-28 rounded-2xl overflow-hidden shadow-xs border border-slate-100 dark:border-slate-800">
                          <img 
                            src={activeCard.courseImg || activeCard.image} 
                            alt="Main Class Photo" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 h-16">
                          <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xs">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80" alt="Gallery 1" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xs">
                            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=150&q=80" alt="Gallery 2" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xs">
                            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=150&q=80" alt="Gallery 3" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-purple-50/70 dark:bg-purple-950/25 border border-purple-100 dark:border-purple-900/40 rounded-2xl text-center">
                        <p className="text-[10px] font-bold text-purple-900 dark:text-purple-300 italic">
                          💬 "Học để chia sẻ – Truyền cảm hứng – Tạo giá trị bền vững."
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-300">03</span>
                      <button 
                        onClick={() => { playSound?.("click"); setBookSpread(3); }}
                        className="flip-nav-btn flip-nav-next py-1.5 px-2.5 rounded-lg text-[10px]"
                      >
                        Bằng cấp <Icons.ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SPREAD 3: CERTIFICATE (PAGE 04) & VERIFICATION */}
                <div id="spread3" className={`book-spread-panel book-page-flip absolute inset-0 flex transition-all duration-300 ${bookSpread === 3 ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
                  
                  {/* PAGE 04 LEFT: DIPLOMA FRAME (Hidden when book is closed at Cover) */}
                  <div className={`w-1/2 bg-white dark:bg-slate-900 rounded-l-3xl p-5 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-inner text-slate-800 dark:text-slate-200 relative transition-all duration-500 ${!isBookCoverFlipped ? "opacity-0 pointer-events-none invisible" : "opacity-100"}`}>
                    <div className="space-y-3 pb-8">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 leading-none">04</span>
                        <div>
                          <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight">Bằng cấp</h3>
                          <p className="text-[10px] text-slate-500 font-medium">Chứng nhận hoàn thành khóa học chính thức.</p>
                        </div>
                      </div>

                      {activeCard.certImg ? (
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                          <img 
                            src={activeCard.certImg} 
                            alt={`Chứng nhận ${activeCard.title}`} 
                            className="w-full h-auto object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center opacity-80 bg-slate-50/50 dark:bg-slate-800/20">
                          <Icons.FileX className="w-10 h-10 text-slate-400 mb-2 opacity-50" />
                          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            Chưa có chứng chỉ
                          </h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                            Bằng cấp cho hạng mục này đang để trống.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                      <button 
                        onClick={() => { playSound?.("click"); setBookSpread(2); }}
                        className="flip-nav-btn flip-nav-prev py-1.5 px-2.5 rounded-lg text-[10px]"
                      >
                        <Icons.ChevronLeft className="w-3 h-3" /> Trang 02 - 03
                      </button>
                      <span className="text-[10px] font-bold text-slate-300">04</span>
                    </div>
                  </div>

                  {/* PAGE 04 RIGHT: SYSTEM VERIFICATION */}
                  <div className="w-1/2 bg-white dark:bg-slate-900 rounded-r-3xl p-5 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-inner text-slate-800 dark:text-slate-200">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                          <Icons.ShieldCheck className="w-4 h-4 text-emerald-600" /> Xác Thực Dữ Liệu
                        </h3>
                        <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500">VERIFIED</span>
                      </div>

                      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300 font-sans">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400">Tình trạng bằng:</span>
                          <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                            <Icons.CheckCircle className="w-3.5 h-3.5" /> Hợp lệ & Đã cấp
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400">Trình độ chuyên môn:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Chuyên gia / Xuất sắc</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-400">Năm phát hành:</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{activeCard.year}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 rounded-2xl text-[10px] text-indigo-900 dark:text-indigo-300 leading-relaxed italic font-sans">
                        "Hồ sơ học vấn này đã được cập nhật chính thức vào hệ thống quản lý năng lực cá nhân Nguyễn Hùng Thái năm 2026."
                      </div>

                      <button 
                        onClick={() => triggerToast("Đã xuất bằng cấp định dạng PDF!")}
                        className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Icons.Download className="w-3.5 h-3.5" /> Tải Bằng Cấp PDF
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
                      <button 
                        onClick={() => { playSound?.("click"); setIsBookOpen(false); }}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Icons.Check className="w-3.5 h-3.5 text-emerald-400" /> Hoàn Thành Xem Sách
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3D FLIPPING FRONT COVER */}
                <div 
                  id="bookCoverHinge" 
                  className="book-cover-hinge" 
                  onClick={() => { playSound?.("click"); setIsBookCoverFlipped(!isBookCoverFlipped); }}
                >
                  <div className="book-cover-front bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-950 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 flex flex-col justify-between p-4 sm:p-5 border-2 border-indigo-300/80 dark:border-slate-700 text-white overflow-hidden relative shadow-2xl rounded-r-3xl">
                    {/* Top Image Banner Area like Grid card */}
                    <div className="relative w-full h-36 sm:h-40 overflow-hidden rounded-2xl bg-slate-950 border border-white/20 shrink-0 shadow-md flex items-center justify-center">
                      <img
                        src={activeCard.image || activeCard.courseImg || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'}
                        alt={activeCard.title}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                      {/* Pill Badge at bottom-left inside image */}
                      <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/95 text-white font-bold text-[10px] shadow-md backdrop-blur-md border border-white/20">
                        <Icons.Award className="w-3.5 h-3.5 text-white shrink-0" />
                        <span className="truncate max-w-[150px]">{activeCard.subtitle}</span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-indigo-500/30 backdrop-blur-md text-indigo-100 border border-indigo-400/30 text-[9px] font-black uppercase">
                        3D BOOK
                      </div>
                    </div>

                    {/* Header Title with Mortarboard Icon */}
                    <div className="flex items-center gap-2 mt-2.5 mb-1 px-0.5">
                      <Icons.GraduationCap className="w-5 h-5 text-amber-300 shrink-0 stroke-[2.2]" />
                      <h3 className="text-sm sm:text-base font-black text-white leading-tight line-clamp-2">
                        {activeCard.title}
                      </h3>
                    </div>

                    {/* Middle Info Box */}
                    <div className="rounded-xl bg-black/35 backdrop-blur-md p-2.5 my-0 border border-white/20 space-y-2 text-[10px]">
                      <div className="flex items-start gap-2">
                        <Icons.MapPin className="w-3.5 h-3.5 text-indigo-300 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-indigo-200 font-medium block">
                            {lang === "vi" ? "Học tại:" : "Institution:"}
                          </span>
                          <span className="font-bold text-white leading-snug block truncate">
                            {activeCard.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Icons.Info className="w-3.5 h-3.5 text-indigo-300 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-indigo-200 font-medium block">
                            {lang === "vi" ? "Mô tả:" : "Description:"}
                          </span>
                          <p className="text-indigo-100/90 leading-relaxed font-normal line-clamp-2">
                            {activeCard.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between shrink-0 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-white font-medium">
                        <Icons.Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span className="font-extrabold text-amber-300">{activeCard.year}</span>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-950 bg-amber-400 hover:bg-amber-300 px-3 py-1 rounded-full shadow-md animate-pulse cursor-pointer">
                        ✨ Mở bìa
                      </span>
                    </div>
                  </div>

                  <div className="book-cover-back p-5 flex flex-col justify-between text-slate-800 dark:text-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-slate-800 rounded-l-3xl shadow-inner">
                    <div className="space-y-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                        <Icons.Bookmark className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">Ghi Chú Học Vấn</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed italic font-sans">
                        "Học tập là một hành trình liên tục tích lũy kiến thức, tư duy chiến lược và năng lực thực thi nhằm mang lại giá trị bền vững."
                      </p>
                    </div>

                    <div className="text-[8px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-2 shrink-0">
                      MÃ CHỨNG CHỈ: STU-EDU-2026-X{activeCard.id}89
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        )}

      {/* MODAL 1: EXPORT CODE DIALOG */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] border border-slate-200 dark:border-slate-800">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
              <div className="flex items-center gap-1.5">
                <Icons.Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Mã Nguồn Glassmorphic Card Stack</h3>
              </div>
              <button 
                onClick={() => setIsCodeModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-xl transition"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1 font-mono text-[11px] text-slate-200 bg-slate-950">
              <pre className="whitespace-pre-wrap break-all">{selectedExportCode}</pre>
            </div>

            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
              <span className="text-[10px] font-medium text-slate-500">Sao chép mã CSS để áp dụng hiệu ứng</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(selectedExportCode);
                  triggerToast("Đã sao chép mã nguồn CSS thành công!");
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md cursor-pointer"
              >
                <Icons.Copy className="w-3.5 h-3.5" /> Sao Chép Mã
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI BANNER GENERATOR DIALOG */}
      {isAiBannerModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Icons.Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-slate-200 text-xs">Vẽ Banner AI Nghệ Thuật</h3>
                  <p className="text-[8px] text-slate-400 font-medium">Dùng Gemini AI vẽ hình nền Banner học vấn độc bản</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiBannerModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-xl transition"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mô tả Banner bạn muốn tạo (Prompt):</label>
                <textarea 
                  rows={3} 
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 text-xs leading-relaxed font-sans" 
                  placeholder="Ví dụ: High-tech academic gradient banner with glowing 3D degree diploma, clean dark blue purple glassmorphic style..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 dark:text-slate-400 mb-1.5 text-[10px] uppercase tracking-wider">Gợi ý mẫu Prompt đẹp:</label>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => setAiPromptInput("Cyberpunk academic tech banner with glowing blue purple neon lines, certificates, 3d graduation cap, soft lighting")}
                    className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold border border-indigo-200/40 dark:border-indigo-900/30 transition cursor-pointer"
                  >
                    ⚡ High-Tech Academic
                  </button>
                  <button 
                    onClick={() => setAiPromptInput("Minimalist elegant purple glassmorphic abstract banner, soft 3d diploma ribbon, university background blur")}
                    className="px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-semibold border border-purple-200/40 dark:border-purple-900/30 transition cursor-pointer"
                  >
                    ✨ Minimal Glassmorphism
                  </button>
                  <button 
                    onClick={() => setAiPromptInput("Futuristic data science and management abstract network banner, dark indigo gold certificate icons")}
                    className="px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] font-semibold border border-amber-200/40 dark:border-amber-900/30 transition cursor-pointer"
                  >
                    🏆 Executive Gold
                  </button>
                </div>
              </div>

              {aiBannerLoading && (
                <div className="py-2 text-center space-y-1.5 animate-pulse shrink-0">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Gemini AI đang vẽ hình ảnh Banner nghệ thuật...</p>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center shrink-0">
              <button 
                onClick={() => setIsAiBannerModalOpen(false)}
                className="px-3.5 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
              >
                Hủy
              </button>
              <button 
                onClick={generateAiBanner}
                disabled={aiBannerLoading}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md cursor-pointer disabled:opacity-50"
              >
                <Icons.Wand2 className="w-3.5 h-3.5" /> Tạo Ảnh Banner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PROFILE BANNER EDIT DIALOG */}
      {isBannerEditModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-black text-slate-800 dark:text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
                <Icons.UserCog className="w-4 h-4 text-indigo-600" />
                <span>Chỉnh Sửa Thông Tin Banner</span>
              </h3>
              <button 
                onClick={() => setIsBannerEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-xl transition"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Họ &amp; Tên Chủ Hồ Sơ:</label>
                <input 
                  type="text" 
                  value={tempProfileName}
                  onChange={(e) => setTempProfileName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 font-bold" 
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Chức Danh / Bằng Cấp:</label>
                <input 
                  type="text" 
                  value={tempProfileTitle}
                  onChange={(e) => setTempProfileTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/30" 
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Phương Châm / Slogan Học Tập:</label>
                <textarea 
                  rows={2} 
                  value={tempProfileSlogan}
                  onChange={(e) => setTempProfileSlogan(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 text-xs font-sans resize-none" 
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Link Ảnh Avatar Hồ Sơ:</label>
                <input 
                  type="text" 
                  value={tempProfileAvatar}
                  onChange={(e) => setTempProfileAvatar(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 font-mono text-[10px]" 
                />
              </div>
            </div>

            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-2 shrink-0">
              <button 
                onClick={handleSaveBannerProfile}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div id="toast" className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 flex items-center gap-2 z-[1000] text-xs font-bold animate-bounce">
          <Icons.CheckCircle className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      </div>
    </section>
  );
}
