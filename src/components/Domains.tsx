import React, { useState, useEffect, useMemo } from "react";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  ShieldCheck,
  Wallet,
  Layers,
  Gamepad,
  Briefcase,
  CheckCircle2,
  Building2,
  Sparkles,
  X,
  Search,
  ExternalLink,
} from "lucide-react";
import { contentData } from "../data";
import { PageLayout } from "./PageLayout";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const iconMap: Record<string, React.ElementType> = {
  TowerControl: Smartphone,
  Smartphone: Smartphone,
  ShoppingCart: ShoppingCart,
  ShieldCheck: ShieldCheck,
  Wallet: Wallet,
  Layers: Layers,
  Gamepad: Gamepad,
  Globe: Globe,
};

const COLOR_PALETTE = [
  "#f25a2b",
  "#0088cc",
  "#16a34a",
  "#f59e0b",
  "#4f46e5",
  "#8b5cf6",
];

function DomainGradientIcon({ title, currentColor, index, extraClass = "w-10 h-10" }: { title: string; currentColor: string; index: number; extraClass?: string }) {
  const id = `dom-grad-${index}`;

  switch (title) {
    case "Viễn thông di động":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-mast`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor} />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id={`${id}-waves`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentColor} floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            {/* Cell Tower Mast */}
            <path d="M 46 80 L 49 24 Q 50 20 51 24 L 54 80" stroke={`url(#${id}-mast)`} strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Mast Crossbars */}
            <path d="M 40 70 L 60 70 M 43 55 L 57 55 M 46 40 L 54 40" stroke={`url(#${id}-mast)`} strokeWidth="4" strokeLinecap="round" />
            <path d="M 40 70 L 57 55 M 60 70 L 43 55 M 43 55 L 54 40 M 57 55 L 46 40" stroke={`url(#${id}-mast)`} strokeWidth="2.5" opacity="0.7" />
            
            {/* Pulse Beacon Top */}
            <circle cx="50" cy="20" r="5" fill="#ffffff" />
            <circle cx="50" cy="20" r="2" fill={currentColor} />

            {/* Wireless Signal Waves */}
            <path d="M 38 12 A 22 22 0 0 0 38 28" stroke={`url(#${id}-waves)`} strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path d="M 62 12 A 22 22 0 0 1 62 28" stroke={`url(#${id}-waves)`} strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path d="M 28 4 A 36 36 0 0 0 28 36" stroke={`url(#${id}-waves)`} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.65" />
            <path d="M 72 4 A 36 36 0 0 1 72 36" stroke={`url(#${id}-waves)`} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.65" />
          </g>
        </svg>
      );
    case "Thương mại điện tử":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-basket`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor} />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id={`${id}-goods`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentColor} floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            {/* Shopping Cart Handle & Base Frame */}
            <path d="M 16 22 H 26 L 36 64 H 74 L 84 32 H 30" stroke={`url(#${id}-basket)`} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Basket Mesh Grid lines */}
            <path d="M 38 38 H 80 M 40 48 H 76 M 46 32 L 42 60 M 58 32 L 56 60 M 70 32 L 68 60" stroke={`url(#${id}-basket)`} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            {/* Cart Wheels */}
            <circle cx="42" cy="76" r="8" fill={`url(#${id}-goods)`} />
            <circle cx="42" cy="76" r="3.5" fill="#ffffff" />
            <circle cx="68" cy="76" r="8" fill={`url(#${id}-goods)`} />
            <circle cx="68" cy="76" r="3.5" fill="#ffffff" />
            {/* Floating Package / Cargo inside Cart */}
            <rect x="42" y="36" width="24" height="18" rx="4" fill="#ffffff" opacity="0.9" />
            <path d="M 54 36 V 54 M 42 45 H 66" stroke={currentColor} strokeWidth="2.5" />
          </g>
        </svg>
      );
    case "Bảo hiểm nhân thọ":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-shield-main`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor} />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id={`${id}-heart-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentColor} floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            {/* Protective Shield Core */}
            <path d="M 50 15 C 68 15 80 25 80 50 C 80 72 50 88 50 88 C 50 88 20 72 20 50 C 20 25 32 15 50 15 Z" fill={`url(#${id}-shield-main)`} />
            {/* Inner Shield Inset */}
            <path d="M 50 21 C 64 21 73 29 73 50 C 73 68 50 81 50 81 C 50 81 27 68 27 50 C 27 29 36 21 50 21 Z" fill="#ffffff" opacity="0.25" />
            
            {/* Cozy Glowing Heart of Life in Center */}
            <path d="M 50 38 C 45 32 35 32 35 40 C 35 48 50 58 50 58 C 50 58 65 48 65 40 C 65 32 55 32 50 38 Z" fill={`url(#${id}-heart-accent)`} />
            {/* Shiny sparkle or tick icon on top */}
            <path d="M 44 43 L 48 47 L 55 40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );
    case "Thể thao điện tử":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-controller`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor} />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id={`${id}-pads`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentColor} floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            {/* Controller main grip handles */}
            <path d="M 18 42 C 18 32 34 26 50 26 C 66 26 82 32 82 42 C 82 52 76 74 68 74 C 62 74 56 62 50 62 C 44 62 38 74 32 74 C 24 74 18 52 18 42 Z" fill={`url(#${id}-controller)`} />
            
            {/* Directional Pad (D-pad) Left */}
            <path d="M 32 38 H 38 V 32 H 42 V 38 H 48 V 42 H 42 V 48 H 38 V 42 H 32 Z" fill="#ffffff" opacity="0.9" />
            
            {/* Action Buttons Right */}
            <circle cx="68" cy="35" r="4" fill={`url(#${id}-pads)`} />
            <circle cx="60" cy="42" r="4" fill={`url(#${id}-pads)`} />
            <circle cx="76" cy="42" r="4" fill={`url(#${id}-pads)`} />
            <circle cx="68" cy="49" r="4" fill={`url(#${id}-pads)`} />
            
            {/* Analog Joysticks in Center */}
            <circle cx="41" cy="51" r="7" fill="#ffffff" opacity="0.3" />
            <circle cx="41" cy="51" r="4" fill="#ffffff" />
            <circle cx="59" cy="51" r="7" fill="#ffffff" opacity="0.3" />
            <circle cx="59" cy="51" r="4" fill="#ffffff" />
          </g>
        </svg>
      );
    case "Ví điện tử":
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-wallet-base`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor} />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id={`${id}-coin-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentColor} floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            {/* Emerging Gold Coin from the Wallet */}
            <circle cx="50" cy="32" r="14" fill={`url(#${id}-coin-accent)`} />
            <circle cx="50" cy="32" r="10" fill="none" stroke="#ffffff" strokeWidth="2" />
            <path d="M 50 25 L 50 39 M 45 29 L 55 35" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

            {/* Wallet body */}
            <rect x="18" y="40" width="64" height="42" rx="10" fill={`url(#${id}-wallet-base)`} />
            {/* Card inside wallet */}
            <rect x="26" y="28" width="34" height="20" rx="3" fill="#ffffff" opacity="0.8" />
            <rect x="26" y="32" width="34" height="4" fill={currentColor} />

            {/* Wallet Locking Flap */}
            <path d="M 56 50 H 80 Q 84 50 84 56 V 66 Q 84 72 80 72 H 56 Z" fill={`url(#${id}-wallet-base)`} stroke="#ffffff" strokeWidth="2" />
            <circle cx="70" cy="61" r="4.5" fill={`url(#${id}-coin-accent)`} />
          </g>
        </svg>
      );
    case "Xây dựng hệ thống":
    default:
      return (
        <svg className={extraClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${id}-headphone-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id={`${id}-chat-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentColor} floodOpacity="0.35"/>
            </filter>
          </defs>
          <g filter={`url(#${id}-shadow)`}>
            {/* The headband/arch of the headphone */}
            <path d="M 22 56 C 22 24, 78 24, 78 56" stroke={`url(#${id}-headphone-grad)`} strokeWidth="13" strokeLinecap="round" fill="none" />
            
            {/* Left and Right Ear pads */}
            <rect x="13" y="48" width="14" height="26" rx="7" fill={`url(#${id}-headphone-grad)`} />
            <rect x="73" y="48" width="14" height="26" rx="7" fill={`url(#${id}-headphone-grad)`} />

            {/* Chat bubble in the middle */}
            <rect x="31" y="38" width="38" height="26" rx="10" fill={`url(#${id}-chat-grad)`} />
            
            {/* Three white dots inside chat bubble */}
            <circle cx="41" cy="51" r="3.2" fill="#ffffff" />
            <circle cx="50" cy="51" r="3.2" fill="#ffffff" />
            <circle cx="59" cy="51" r="3.2" fill="#ffffff" />
          </g>
        </svg>
      );
  }
}

// Detailed Industry Master Information for Modal & Enhanced Visual Cards
const INDUSTRY_DETAILS_MAP: Record<
  string,
  {
    tagline: string;
    experienceYears: string;
    headcountScope: string;
    keyProjects: string[];
    achievements: string[];
    techStack: string[];
    coreRole: string;
  }
> = {
  "Viễn thông di động": {
    tagline:
      "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
    experienceYears: "10+ Năm",
    headcountScope: "50 - 130+ Nhân sự",
    keyProjects: [
      "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
      "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
      "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
    ],
    achievements: [
      "Quản lý & duy trì chỉ số SLA tổng đài luôn đạt trên 98%",
      "Chuẩn hóa 100% kịch bản tư vấn và xử lý khiếu nại cước dịch vụ",
      "Xây dựng đội ngũ tư vấn viên chuyên nghiệp có tỷ lệ nghỉ việc < 3%",
    ],
    techStack: ["Avaya CallCenter", "AICC System", "SOP Matrix", "CRM Telecom"],
    coreRole: "Trưởng phòng CSKH / Quản lý Vận hành Tổng đài",
  },
  "Thương mại điện tử": {
    tagline:
      "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
    experienceYears: "6+ Năm",
    headcountScope: "100+ Nhân sự CSKH & Fraud",
    keyProjects: [
      "2.3 · Tự động hóa quy trình chăm sóc khách hàng",
      "3.1 · Xây dựng hệ thống quản lý thông tin khách hàng",
      "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    ],
    achievements: [
      "Tối ưu tỷ lệ phản hồi Chatbot & Live Chat giảm thời gian chờ xuống < 30 giây",
      "Xây dựng bộ quy trình kiểm soát gian lận đơn hàng & thanh toán trực tuyến",
      "Nâng chỉ số hài lòng khách hàng CSAT từ 88% lên 96.5%",
    ],
    techStack: [
      "Zendesk Omnichannel",
      "Shopee Admin CRM",
      "Live Chat Auto-router",
      "Power BI",
    ],
    coreRole: "Customer Service Operations Manager",
  },
  "Bảo hiểm nhân thọ": {
    tagline:
      "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
    experienceYears: "3+ Năm",
    headcountScope: "40+ Chuyên viên tư vấn",
    keyProjects: [
      "1.3 · Nâng cao chất lượng trải nghiệm khách hàng",
      "2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng",
      "3.3 · Khảo sát và đánh giá mức độ hài lòng",
    ],
    achievements: [
      "Kiến tạo trải nghiệm khách hàng tiêu chuẩn 5 sao ngành tài chính - bảo hiểm",
      "Giảm 45% thời gian xử lý yêu cầu thay đổi thông tin hợp đồng",
      "Đạt tỷ lệ giải quyết khiếu nại thành công ngay từ lần gọi đầu tiên (FCR) > 92%",
    ],
    techStack: [
      "Prudential Life CRM",
      "AS400 System",
      "Voice Recording Quality Checklist",
    ],
    coreRole: "Call Center Project & Quality Manager",
  },
  "Thể thao điện tử": {
    tagline:
      "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
    experienceYears: "5+ Năm",
    headcountScope: "80+ Game Supporter",
    keyProjects: [
      "1.4 · Quản lý và triển khai dự án chăm sóc khách hàng",
      "3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng",
      "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    ],
    achievements: [
      "Vận hành hệ thống Ticket hỗ trợ game thủ với lưu lượng xử lý 50,000+ yêu cầu/ngày",
      "Bảo mật tài khoản & hỗ trợ khôi phục vật phẩm game tức thì",
      "Phối hợp tổ chức trực tiếp các điểm hỗ trợ CSKH tại giải đấu eSports lớn",
    ],
    techStack: [
      "Garena Customer Desk",
      "Gcafe Management Tool",
      "AI Ticket Classifier",
    ],
    coreRole: "Head of Game Customer Support",
  },
  "Ví điện tử": {
    tagline:
      "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
    experienceYears: "5+ Năm",
    headcountScope: "120+ Nhân sự FinTech CS",
    keyProjects: [
      "1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ",
      "2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động",
      "3.2 · Phân tích và báo cáo dữ liệu khách hàng",
    ],
    achievements: [
      "Hỗ trợ xác minh định danh eKYC & xử lý sự cố giao dịch tức thì",
      "Xây dựng kịch bản ứng phó sự cố gián đoạn kết nối ngân hàng đối tác",
      "Tự động hóa 40% truy vấn lịch sử giao dịch bằng AI Voicebot & Chatbot",
    ],
    techStack: [
      "MoMo Care Core",
      "AirPay Risk Portal",
      "Fraud Monitoring Tool",
      "Power BI",
    ],
    coreRole: "FinTech CS Operation Lead",
  },
  "Xây dựng hệ thống": {
    tagline:
      "Tư vấn chuyển đổi số, thiết lập CRM & Quy trình CSKH toàn diện cho Doanh nghiệp",
    experienceYears: "8+ Năm",
    headcountScope: "Tư vấn Doanh nghiệp",
    keyProjects: [
      "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
      "4.1 · Phát triển chương trình đào tạo trực tuyến",
      "4.2 · Xây dựng khung năng lực và lộ trình phát triển",
    ],
    achievements: [
      "Thiết kế trọn gói mô hình Contact Center từ 10 đến 100+ vị trí ngồi",
      "Đóng gói tài liệu SOP, kịch bản giao tiếp & KPI scorecard chuẩn hóa",
      "Đào tạo & chuyển giao công nghệ cho đội ngũ quản lý kế thừa",
    ],
    techStack: [
      "Zoho CRM",
      "Salesforce",
      "Notion SOP Matrix",
      "Process Flowcharting",
    ],
    coreRole: "CX & Service System Consultant",
  },
};

const INDUSTRY_CATEGORIES = [
  { id: "all", title: "Tất cả lĩnh vực" },
  { id: "telecom", title: "Viễn thông" },
  { id: "fintech", title: "FinTech & eCommerce" },
  { id: "insurance", title: "Bảo hiểm & Khác" },
];

interface BrandLogo {
  name: string;
  url: string;
  color?: string;
}

interface IndustryItem {
  id: string;
  title: string;
  titleEn?: string;
  icon: string;
  category?: string;
  desc: string;
  descEn?: string;
  highlights?: string[];
  logos?: BrandLogo[];
}

export function Industries() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isVi = language === "vi";
  const items = contentData.industries as unknown as IndustryItem[];
  const [colorStep, setColorStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItemTitle, setExpandedItemTitle] = useState<string | null>(
    null,
  );
  const [ripplingItemTitle, setRipplingItemTitle] = useState<string | null>(
    null,
  );

  // Auto color rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setColorStep((prev) => (prev + 1) % COLOR_PALETTE.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (title: string) => {
    if (expandedItemTitle || ripplingItemTitle) return;
    playUiSound("click");
    setRipplingItemTitle(title);
    setTimeout(() => {
      setExpandedItemTitle(title);
      setRipplingItemTitle(null);
    }, 320);
  };

  const cardConfigs = [
    {
      color: "#f25a2b",
      icon: Smartphone,
      title: "Viễn thông di động",
      category: "telecom",
      desc: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, tạo nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
      logos: [
        {
          name: "Mobifone",
          url: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
          color: "#2563eb",
        },
        {
          name: "V247",
          url: "https://i.ibb.co/QvtbdnfP/V247.png",
          color: "#f97316",
        },
        {
          name: "LBC",
          url: "https://i.ibb.co/tpG5fMrt/LBC.png",
          color: "#9333ea",
        },
        {
          name: "HTVC",
          url: "https://i.ibb.co/1fNw0hBq/HTVC.png",
          color: "#0284c7",
        },
      ],
    },
    {
      color: "#0088cc",
      icon: ShoppingCart,
      category: "fintech",
      title: "Thương mại điện tử",
      desc: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, gian lận và chăm sóc khách hàng đa kênh.",
      logos: [
        {
          name: "Shopee",
          url: "https://i.ibb.co/BSVS4xf/Shopee.png",
          color: "#ee4d2d",
        },
        {
          name: "ShopeePay",
          url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png",
          color: "#ea580c",
        },
        {
          name: "Finviet",
          url: "https://i.ibb.co/7NtSSz4d/Finviet.png",
          color: "#eab308",
        },
      ],
    },
    {
      color: "#16a34a",
      icon: ShieldCheck,
      category: "insurance",
      title: "Bảo hiểm nhân thọ",
      desc: "Quản lý tổng đài và triển khai các dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn và trải nghiệm khách hàng.",
      logos: [
        {
          name: "Prudential",
          url: "https://i.ibb.co/XfpQphWF/Prudential.png",
          color: "#dc2626",
        },
        {
          name: "Power Service",
          url: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
          color: "#2563eb",
        },
      ],
    },
    {
      color: "#f59e0b",
      icon: Gamepad,
      category: "fintech",
      title: "Thể thao điện tử",
      desc: "Xây dựng và quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện eSports.",
      logos: [
        {
          name: "Garena",
          url: "https://i.ibb.co/h1Md65yV/Garena.png",
          color: "#df2027",
        },
        {
          name: "VED",
          url: "https://i.ibb.co/fYPJLfbw/VED.png",
          color: "#dc2626",
        },
        {
          name: "GCafe",
          url: "https://i.ibb.co/FkWk3s4W/GCafe.png",
          color: "#ff6600",
        },
        {
          name: "Logo VED",
          url: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif",
          color: "#ef4444",
        },
      ],
    },
    {
      color: "#ec4899",
      icon: Wallet,
      category: "fintech",
      title: "Ví điện tử",
      desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính.",
      logos: [
        {
          name: "MoMo",
          url: "https://i.ibb.co/k2QtrgTw/Momo.png",
          color: "#ec4899",
        },
        {
          name: "ShopeePay",
          url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png",
          color: "#ee4d2d",
        },
        {
          name: "Finviet",
          url: "https://i.ibb.co/7NtSSz4d/Finviet.png",
          color: "#eab308",
        },
      ],
    },
    {
      color: "#16a34a",
      icon: Layers,
      category: "insurance",
      title: "Xây dựng hệ thống",
      desc: "Tư vấn xây dựng và tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến CRM và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp.",
      logos: [
        {
          name: "Logo VED",
          url: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif",
          color: "#ef4444",
        },
        {
          name: "Power Service",
          url: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
          color: "#0284c7",
        },
        {
          name: "VED",
          url: "https://i.ibb.co/fYPJLfbw/VED.png",
          color: "#dc2626",
        },
        {
          name: "HTVC",
          url: "https://i.ibb.co/1fNw0hBq/HTVC.png",
          color: "#0ea5e9",
        },
      ],
    },
  ];

  // Merge items with fallback config
  const combinedItems = useMemo(() => {
    return items.map((item, idx) => {
      const cfg = cardConfigs[idx % cardConfigs.length];
      const title = item.title || cfg.title;
      const desc = item.desc || cfg.desc;
      const logos =
        item.logos && item.logos.length > 0 ? item.logos : cfg.logos;
      const details =
        INDUSTRY_DETAILS_MAP[title] ||
        INDUSTRY_DETAILS_MAP["Viễn thông di động"];

      return {
        ...item,
        title,
        desc,
        logos,
        cfg,
        details,
        category: cfg.category,
      };
    });
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return combinedItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [combinedItems, selectedCategory, searchQuery]);

  return (
    <PageLayout
      hideToolbar={true}
      id="domains"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      pageId="domains"
      pageName="Domains Main Card"
      title={isVi ? "Lĩnh vực hoạt động" : "Core industry expertise sectors"}
      subtitle={
        isVi
          ? "Tầm nhìn chiến lược định hình tương lai, hành động quyết liệt kiến tạo giá trị."
          : "Strategic vision shapes the future; decisive action creates sustainable value."
      }
      icon={Globe}
      contentContainerClassName="!pb-0 pb-0"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder={
        isVi ? "Tìm ngành nghề, giải pháp..." : "Search industry, solution..."
      }
      groupOptions={[
        {
          id: "all",
          labelVi: "Tất cả lĩnh vực",
          labelEn: "All Industries",
          icon: Globe,
          count: combinedItems.length,
        },
        ...combinedItems.map((item) => ({
          id: item.category || item.title,
          labelVi: item.title,
          labelEn: item.title,
          count: 1,
        })),
      ]}
      activeGroup={selectedCategory}
      onGroupChange={(cat) => setSelectedCategory(cat)}
      groupLabel={{ vi: "Lĩnh vực:", en: "Industry:" }}
      onReset={() => {
        setSearchQuery("");
        setSelectedCategory("all");
      }}
      totalCount={combinedItems.length}
      filteredCount={filteredItems.length}
    >
      {/* MAIN CARDS GRID - CENTERED LAYOUT WITH EMBEDDED ABSOLUTE OVERLAY */}
      <LayoutGroup>
        <div className="relative mx-auto w-full flex-1 my-2">
          {/* The Grid of all 6 cards */}
            <div className="mx-auto grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto place-content-center items-stretch justify-items-center justify-center gap-[10px] p-0">
              {filteredItems.map((item, index) => {
                const colorIndex =
                  (index - colorStep + COLOR_PALETTE.length * 100) %
                  COLOR_PALETTE.length;
                const currentColor = COLOR_PALETTE[colorIndex];
                const MappedIcon = iconMap[item.icon];
                const Icon = MappedIcon || item.cfg.icon || Globe;
                const isSomeCardExpanded = expandedItemTitle !== null;
                const isThisExpanded = expandedItemTitle === item.title;
                const isRippling = ripplingItemTitle === item.title;

                // Theme-specific Card Container Styles
                const getThemeCardClasses = () => {
                  if (theme === "glass-neo" || theme === "glass-neon") {
                    return "bg-slate-950/90 border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(0,240,255,0.4),0_0_35px_rgba(255,0,128,0.25)] hover:border-cyan-300 text-slate-100";
                  }
                  if (theme === "glass-vivid") {
                    return "bg-slate-950/85 border-white/30 shadow-[0_12px_35px_rgba(124,58,237,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_18px_45px_rgba(124,58,237,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white";
                  }
                  if (theme === "clay") {
                    return "bg-white/90 dark:bg-slate-900/90 border-white dark:border-slate-700 shadow-[0_14px_30px_rgba(160,165,210,0.35),inset_0_2px_4px_rgba(255,255,255,0.9)] hover:shadow-[0_18px_38px_rgba(160,165,210,0.45),inset_0_2px_4px_rgba(255,255,255,0.95)] text-slate-800 dark:text-slate-100";
                  }
                  if (theme === "nec") {
                    return "bg-[#f0f3f8] dark:bg-slate-900 border-white/90 dark:border-slate-800/90 shadow-[-6px_-6px_14px_rgba(255,255,255,0.9),_6px_6px_16px_rgba(163,177,198,0.5)] hover:shadow-[-8px_-8px_18px_rgba(255,255,255,0.95),_8px_8px_20px_rgba(163,177,198,0.6)] text-slate-800 dark:text-slate-100";
                  }
                  if (theme === "light") {
                    return "bg-white border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300 text-slate-800";
                  }
                  return "bg-white/80 dark:bg-slate-900/80 border-white/40 dark:border-white/15 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_14px_40px_rgba(31,38,135,0.25)] text-slate-900 dark:text-slate-100";
                };

                const getCardInlineStyle = () => {
                  if (theme === "glass-neo" || theme === "glass-neon") {
                    return {
                      backgroundColor: `color-mix(in srgb, ${currentColor} 10%, rgba(5, 10, 25, 0.92))`,
                      borderColor: `color-mix(in srgb, ${currentColor} 35%, rgba(0, 240, 255, 0.5))`,
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                    };
                  }
                  if (theme === "glass-vivid") {
                    return {
                      backgroundColor: `color-mix(in srgb, ${currentColor} 14%, rgba(15, 23, 42, 0.85))`,
                      borderColor: `color-mix(in srgb, ${currentColor} 40%, rgba(255, 255, 255, 0.4))`,
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                    };
                  }
                  if (theme === "clay") {
                    return {
                      backgroundColor: `color-mix(in srgb, ${currentColor} 6%, rgba(255, 255, 255, 0.85))`,
                      borderColor: `color-mix(in srgb, ${currentColor} 25%, rgba(255, 255, 255, 0.9))`,
                      borderWidth: "2px",
                      borderStyle: "solid",
                    };
                  }
                  if (theme === "nec") {
                    return {
                      backgroundColor: `color-mix(in srgb, ${currentColor} 5%, #f0f3f8)`,
                      borderColor: "rgba(255, 255, 255, 0.9)",
                      borderWidth: "2px",
                      borderStyle: "solid",
                    };
                  }
                  if (theme === "light") {
                    return {
                      backgroundColor: `color-mix(in srgb, ${currentColor} 4%, #ffffff)`,
                      borderColor: `color-mix(in srgb, ${currentColor} 20%, #e2e8f0)`,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    };
                  }
                  return {
                    backgroundColor: `color-mix(in srgb, ${currentColor} 6%, rgba(255, 255, 255, 0.45))`,
                    borderColor: `color-mix(in srgb, ${currentColor} 24%, rgba(255, 255, 255, 0.6))`,
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                  };
                };

                return (
                  <motion.div
                    key={`card-${item.title}`}
                    layout
                    layoutId={`industry-card-${item.title}`}
                    onClick={() => handleCardClick(item.title)}
                    className={cn(
                      "group relative col-span-1 flex min-h-[300px] w-full cursor-pointer flex-col mx-auto justify-self-center transition-all duration-300 rounded-2xl overflow-hidden p-[15px] text-center backdrop-blur-xl select-none",
                      getThemeCardClasses(),
                      isSomeCardExpanded && !isThisExpanded ? "opacity-20 blur-[2px] scale-95 pointer-events-none" : "",
                      isThisExpanded ? "opacity-0 pointer-events-none" : ""
                    )}
                    style={getCardInlineStyle()}
                  >
                    {/* Ripple spreading from icon on click */}
                    <AnimatePresence>
                      {isRippling && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0.85 }}
                          animate={{ scale: 45, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute z-30 h-12 w-12 rounded-full pointer-events-none"
                          style={{
                            backgroundColor: currentColor,
                            top: "24px",
                            left: "50%",
                            marginLeft: "-24px",
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Card Content */}
                    <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-between text-center">
                      {/* Header: Icon, Title & Experience Badge */}
                      <div className="mb-2 flex w-full shrink-0 items-center justify-center">
                        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
                          {/* 3D Duotone Gradient SVG Icon without bounding box/frame */}
                          <div className="flex h-16 w-16 items-center justify-center mb-1.5 transition-all duration-500 group-hover:scale-110 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                            <DomainGradientIcon title={item.title} currentColor={currentColor} index={index} extraClass="w-13 h-13 transform transition-transform group-hover:scale-110 duration-500 drop-shadow-md" />
                          </div>
                          <div className="text-center w-full">
                            <h3
                              className={cn(
                                "text-base sm:text-lg font-black tracking-tight mt-1",
                                theme === "glass-neo" && "text-cyan-100 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]",
                                theme === "glass-vivid" && "text-white drop-shadow-sm"
                              )}
                              style={{ color: (theme === "glass-neo" || theme === "glass-vivid") ? undefined : currentColor }}
                            >
                              {item.title}
                            </h3>
                            <span
                              className={cn(
                                "inline-flex items-center justify-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border mt-1",
                                theme === "glass-neo" && "border-cyan-400/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.25)]",
                                theme === "glass-vivid" && "border-white/30 bg-white/15 text-purple-200 shadow-xs",
                                theme === "clay" && "border-white dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 shadow-xs text-slate-700 dark:text-slate-200",
                                theme === "nec" && "border-white/80 dark:border-slate-700 bg-[#f0f3f8] dark:bg-slate-900 shadow-[-2px_-2px_6px_rgba(255,255,255,0.8),_2px_2px_6px_rgba(163,177,198,0.4)] text-slate-700 dark:text-slate-200",
                                theme === "light" && "border-slate-200 bg-slate-50 text-slate-700 shadow-2xs",
                                (!theme || theme === "glass") && "border shadow-2xs"
                              )}
                              style={{
                                color: (theme === "glass-neo" || theme === "glass-vivid" || theme === "clay" || theme === "nec" || theme === "light") ? undefined : currentColor,
                                borderColor: (theme === "glass-neo" || theme === "glass-vivid" || theme === "clay" || theme === "nec" || theme === "light") ? undefined : `color-mix(in srgb, ${currentColor} 30%, transparent)`,
                                backgroundColor: (theme === "glass-neo" || theme === "glass-vivid" || theme === "clay" || theme === "nec" || theme === "light") ? undefined : `color-mix(in srgb, ${currentColor} 10%, rgba(255, 255, 255, 0.65))`,
                              }}
                            >
                              <span>
                                {item.details.experienceYears} kinh nghiệm
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Body Description */}
                      <p className={cn(
                        "my-auto line-clamp-3 text-center text-xs leading-relaxed font-medium py-2 sm:text-sm",
                        theme === "glass-neo" ? "text-slate-300" :
                        theme === "glass-vivid" ? "text-slate-200" :
                        "text-slate-700 dark:text-slate-200"
                      )}>
                        {item.desc}
                      </p>

                      {/* Brand Logos Footer */}
                      {item.logos && item.logos.length > 0 && (
                        <div className={cn(
                          "relative z-10 mt-auto flex w-full shrink-0 items-center justify-center border-t pt-3 pb-0.5",
                          theme === "glass-neo" ? "border-cyan-500/20" :
                          theme === "glass-vivid" ? "border-white/20" :
                          "border-slate-200/60 dark:border-white/10"
                        )}>
                          <div className="flex items-center justify-center -space-x-2.5 flex-nowrap">
                            {item.logos.map((logoObj: BrandLogo, lIdx: number) => (
                              <div
                                key={lIdx}
                                className={cn(
                                  "group/logo relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-white/95 shadow-sm transition-all duration-300 hover:z-20 hover:scale-115 hover:shadow-md",
                                  theme === "glass-neo" ? "border-cyan-400/60 shadow-[0_0_10px_rgba(0,240,255,0.3)] bg-slate-900" :
                                  theme === "glass-vivid" ? "border-white/50 bg-white/95 shadow-md" :
                                  "border-white/90 dark:border-white/20 bg-white/95"
                                )}
                                style={{
                                  boxShadow: theme === "glass-neo" ? `0 0 12px ${logoObj.color || currentColor}80` : `0 3px 8px ${logoObj.color || currentColor}30`,
                                }}
                                title={logoObj.name}
                              >
                                <img
                                  src={logoObj.url}
                                  alt={logoObj.name}
                                  className="h-full w-full rounded-full object-cover object-center"
                                  onError={(
                                    e: React.SyntheticEvent<HTMLImageElement>,
                                  ) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    target.src = `https://placehold.co/100x100/ffffff/${currentColor.replace("#", "")}?text=${encodeURIComponent(logoObj.name)}`;
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Absolute overlay taking full dimensions of the 6-card container */}
            <AnimatePresence>
              {expandedItemTitle && (() => {
                const expandedItem = filteredItems.find((i) => i.title === expandedItemTitle);
                if (!expandedItem) return null;
                const index = filteredItems.findIndex((i) => i.title === expandedItemTitle);
                const colorIndex =
                  (index - colorStep + COLOR_PALETTE.length * 100) %
                  COLOR_PALETTE.length;
                const currentColor = COLOR_PALETTE[colorIndex];
                const MappedIcon = iconMap[expandedItem.icon];
                const Icon = MappedIcon || expandedItem.cfg.icon || Globe;

                const getThemeOverlayClasses = () => {
                  if (theme === "glass-neo") {
                    return "bg-slate-950/95 border-cyan-400/70 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.4),0_0_45px_rgba(255,0,128,0.3)] text-slate-100 backdrop-blur-2xl";
                  }
                  if (theme === "glass-vivid") {
                    return "bg-slate-950/90 border-white/35 shadow-[0_25px_60px_rgba(124,58,237,0.45)] text-white backdrop-blur-2xl";
                  }
                  if (theme === "clay") {
                    return "bg-white/95 dark:bg-slate-900/95 border-white dark:border-slate-700 shadow-2xl backdrop-blur-2xl text-slate-800 dark:text-slate-100";
                  }
                  if (theme === "nec") {
                    return "bg-[#f0f3f8] dark:bg-slate-900 border-white/90 dark:border-slate-800/90 shadow-2xl backdrop-blur-xl text-slate-800 dark:text-slate-100";
                  }
                  if (theme === "light") {
                    return "bg-white border-slate-200 shadow-2xl text-slate-900";
                  }
                  return "bg-white/95 dark:bg-slate-900/95 border-slate-200/80 dark:border-slate-700/80 shadow-2xl backdrop-blur-2xl text-slate-900 dark:text-slate-100";
                };

                return (
                  <motion.div
                    key={`card-expanded-${expandedItem.title}`}
                    layout
                    layoutId={`industry-card-${expandedItem.title}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "absolute inset-0 z-30 flex flex-col gap-4 rounded-2xl border-2 text-left p-5 sm:p-7 overflow-hidden",
                      getThemeOverlayClasses()
                    )}
                    style={{
                      borderColor: theme === "glass-neo" ? "rgba(0, 240, 255, 0.7)" : currentColor,
                      backgroundColor: theme === "glass-neo"
                        ? `color-mix(in srgb, ${currentColor} 12%, rgba(5, 10, 25, 0.98))`
                        : theme === "glass-vivid"
                        ? `color-mix(in srgb, ${currentColor} 15%, rgba(15, 23, 42, 0.96))`
                        : `color-mix(in srgb, ${currentColor} 10%, var(--expanded-card-bg, rgba(255, 255, 255, 0.96)))`,
                    }}
                  >
                    {/* Background fallback for better readability in both dark and light modes */}
                    <div className="absolute inset-0 -z-10 bg-white/90 dark:bg-slate-900/95 backdrop-blur-3xl" />

                    {/* Header Bar */}
                    <div className="relative border-b border-slate-200/80 dark:border-white/10 pr-12 pb-4 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playUiSound("click");
                          setExpandedItemTitle(null);
                        }}
                        className="absolute top-0 right-0 z-30 cursor-pointer rounded-full border border-slate-300 dark:border-white/20 bg-white/90 dark:bg-slate-800/90 p-2.5 text-slate-600 dark:text-slate-300 shadow-md transition-all hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:scale-105 active:scale-95"
                        title={
                          isVi ? "Đóng / Thu gọn thẻ" : "Close / Collapse Card"
                        }
                      >
                        <X size={20} />
                      </button>

                      <div className="flex flex-col gap-2 text-left">
                        {/* Title & Icon */}
                        <div className="flex flex-wrap items-center gap-3">
                          {/* 3D Duotone Gradient SVG Icon without bounding box/frame */}
                          <div className="flex h-16 w-16 items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                            <DomainGradientIcon title={expandedItem.title} currentColor={currentColor} index={index} extraClass="w-13 h-13 drop-shadow-md" />
                          </div>
                          <div>
                            <h3
                              className="text-2xl leading-tight font-black tracking-tight sm:text-3xl"
                              style={{ color: currentColor }}
                            >
                              {expandedItem.title}
                            </h3>
                            <span
                              className="inline-block rounded-full border px-3 py-0.5 text-[10px] font-black tracking-wider uppercase sm:text-xs mt-1"
                              style={{
                                borderColor: `${currentColor}35`,
                                color: currentColor,
                                backgroundColor: `${currentColor}15`,
                              }}
                            >
                              {expandedItem.details.coreRole}
                            </span>
                          </div>
                        </div>

                        {/* Tagline */}
                        <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300 sm:text-sm">
                          {expandedItem.details.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Scrollable Content Container */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {/* Col 1: Scope & Details & Associated Brands */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 p-3 shadow-xs">
                            <div>
                              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                {isVi ? "Thâm niên:" : "Experience:"}
                              </span>
                              <span className="text-xs font-black text-slate-800 dark:text-slate-100 sm:text-sm">
                                {expandedItem.details.experienceYears}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                {isVi ? "Quy mô:" : "Headcount:"}
                              </span>
                              <span className="text-xs font-black text-slate-800 dark:text-slate-100 sm:text-sm">
                                {expandedItem.details.headcountScope}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs leading-relaxed font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                            {expandedItem.desc}
                          </p>

                          {/* Brand Logos */}
                          {expandedItem.logos && expandedItem.logos.length > 0 && (
                            <div className="space-y-2 border-t border-slate-200/80 dark:border-white/10 pt-4">
                              <span className="block text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                                {isVi
                                  ? "Thương hiệu trực thuộc:"
                                  : "Associated Brands:"}
                              </span>
                              <div className="flex w-full items-center justify-start -space-x-3 flex-nowrap py-1">
                                {expandedItem.logos.map(
                                  (logoObj: BrandLogo, lIdx: number) => (
                                    <div
                                      key={lIdx}
                                      className="group/logo relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/90 dark:border-white/20 bg-white shadow-md transition-all duration-300 hover:z-20 hover:scale-115 hover:shadow-xl"
                                      style={{
                                        boxShadow: `0 4px 12px ${logoObj.color || currentColor}30`,
                                      }}
                                      title={logoObj.name}
                                    >
                                      <img
                                        src={logoObj.url}
                                        alt={logoObj.name}
                                        className="h-full w-full rounded-full object-cover"
                                        onError={(
                                          e: React.SyntheticEvent<HTMLImageElement>,
                                        ) => {
                                          const target = e.currentTarget;
                                          target.onerror = null;
                                          target.src = `https://placehold.co/100x100/ffffff/${currentColor.replace("#", "")}?text=${encodeURIComponent(logoObj.name)}`;
                                        }}
                                      />
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Col 2: Key Achievements */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-1.5 text-xs font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                              <CheckCircle2
                                size={14}
                                className="text-emerald-500"
                              />
                              <span>
                                {isVi
                                  ? "Thành tựu nổi bật:"
                                  : "Key Achievements:"}
                              </span>
                            </h4>
                            <ul className="space-y-2">
                              {expandedItem.details.achievements.map(
                                (ach: string, aIdx: number) => (
                                  <li
                                    key={aIdx}
                                    className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 p-3 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-emerald-500/10 transition-colors"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                    <span>{ach}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>

                        {/* Col 3: Key Projects & Tech Stack */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-1.5 text-xs font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                              <Briefcase size={14} className="text-purple-500" />
                              <span>
                                {isVi
                                  ? "Dự án chính (Xem chi tiết):"
                                  : "Key Projects (Click to view):"}
                              </span>
                            </h4>
                            <div className="flex flex-col gap-2">
                              {expandedItem.details.keyProjects.map(
                                (proj: string, pIdx: number) => (
                                  <button
                                    key={pIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playUiSound("click");
                                      sessionStorage.setItem(
                                        "pending_project_title",
                                        proj,
                                      );
                                      window.dispatchEvent(
                                        new CustomEvent("app-navigate", {
                                          detail: "projects",
                                        }),
                                      );
                                      window.dispatchEvent(
                                        new CustomEvent("app-select-project", {
                                          detail: proj,
                                        }),
                                      );
                                    }}
                                    className="group/proj flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs transition-all hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600"
                                    title={
                                      isVi
                                        ? `Xem chi tiết dự án: ${proj}`
                                        : `View project details: ${proj}`
                                    }
                                  >
                                    <span className="truncate font-semibold">
                                      📌 {proj}
                                    </span>
                                    <ExternalLink
                                      size={13}
                                      className="ml-1 shrink-0 opacity-70 transition-opacity group-hover/proj:opacity-100"
                                    />
                                  </button>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 border-t border-slate-200/80 dark:border-white/10 pt-4">
                            <h4 className="flex items-center gap-1.5 text-xs font-black tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                              <Sparkles size={14} className="text-sky-500" />
                              <span>
                                {isVi ? "Công nghệ & Công cụ:" : "Tech & Tools:"}
                              </span>
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {expandedItem.details.techStack.map(
                                (tech: string, tIdx: number) => (
                                  <span
                                    key={tIdx}
                                    className="rounded-lg border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-xs"
                                  >
                                    {tech}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </LayoutGroup>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --card-bg: rgba(255, 255, 255, 0.9);
          --expanded-card-bg: rgba(255, 255, 255, 0.96);
        }
        .dark {
          --card-bg: rgba(15, 23, 42, 0.85);
          --expanded-card-bg: rgba(15, 23, 42, 0.95);
        }
      `}} />
    </PageLayout>
  );
}

export const Domains = Industries;
export default Industries;
