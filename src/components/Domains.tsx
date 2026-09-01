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
  ArrowRight,
  Users,
  Box,
  Trophy,
  Target,
  Quote,
  ChevronRight,
  PhoneCall,
  Lock,
  Zap,
  Cpu
} from "lucide-react";
import { contentData } from "../data";
import { PageLayout } from "./PageLayout";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

// 3D Header Illustration (Globe + City + Books + Magnifying Glass)
function Header3DIllustration({ className = "w-44 h-44 sm:w-56 sm:h-56" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plat-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="plat-side" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="globe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="mag-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="mag-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="book-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <filter id="shadow-3d" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1e3a8a" floodOpacity="0.25" />
        </filter>
        <filter id="glow-globe" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="200" cy="270" rx="140" ry="26" fill="#1e3a8a" opacity="0.15" />

      {/* Isometric 3D Base Platform */}
      <g filter="url(#shadow-3d)">
        <polygon points="200,210 330,250 200,285 70,250" fill="url(#plat-top)" />
        <polygon points="70,250 200,285 200,300 70,265" fill="url(#plat-side)" />
        <polygon points="200,285 330,250 330,265 200,300" fill="#172554" />
        <polygon points="200,225 310,250 200,275 90,250" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      </g>

      {/* 3D City Buildings on Platform */}
      <g>
        <rect x="110" y="170" width="22" height="60" rx="3" fill="#60a5fa" opacity="0.9" />
        <rect x="136" y="150" width="28" height="85" rx="3" fill="#3b82f6" />
        <rect x="142" y="160" width="6" height="65" fill="#93c5fd" opacity="0.8" />
        <rect x="152" y="160" width="6" height="65" fill="#93c5fd" opacity="0.8" />
      </g>

      {/* 3D Books Base */}
      <g>
        <rect x="90" y="240" width="55" height="12" rx="2" fill="url(#book-purple)" transform="rotate(-6, 90, 240)" />
        <rect x="95" y="232" width="50" height="10" rx="2" fill="#38bdf8" transform="rotate(-3, 95, 232)" />
      </g>

      {/* 3D Floating Globe */}
      <g filter="url(#glow-globe)">
        <circle cx="230" cy="140" r="62" fill="#38bdf8" opacity="0.15" />
        <circle cx="230" cy="140" r="54" fill="url(#globe-grad)" />
        <path d="M 195 130 C 205 110 225 105 240 115 C 255 125 265 110 275 125 C 270 140 250 155 235 150 Z" fill="#60a5fa" opacity="0.85" />
        <path d="M 200 155 C 210 165 230 170 245 160 C 260 175 240 185 220 185 Z" fill="#93c5fd" opacity="0.75" />
        <ellipse cx="230" cy="140" rx="54" ry="20" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.4" />
        <ellipse cx="230" cy="140" rx="54" ry="38" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.3" />
        <ellipse cx="230" cy="140" rx="22" ry="54" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
        <ellipse cx="230" cy="140" rx="72" ry="22" fill="none" stroke="url(#ring-grad)" strokeWidth="3" transform="rotate(-20 230 140)" />
        <circle cx="285" cy="115" r="4.5" fill="#a855f7" />
        <circle cx="175" cy="165" r="3.5" fill="#38bdf8" />
      </g>

      {/* 3D Magnifying Glass */}
      <g filter="url(#shadow-3d)">
        <rect x="285" y="175" width="14" height="65" rx="7" fill="url(#mag-rim)" transform="rotate(-40 285 175)" />
        <rect x="290" y="180" width="6" height="55" rx="3" fill="#c084fc" transform="rotate(-40 285 175)" opacity="0.8" />
        <circle cx="270" cy="145" r="32" fill="none" stroke="url(#mag-rim)" strokeWidth="9" />
        <circle cx="270" cy="145" r="27.5" fill="url(#mag-glass)" />
        <path d="M 250 135 A 22 22 0 0 1 280 125" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

// 3D Target & Bar Chart Illustration for Bottom Banner
function Target3DIllustration({ className = "w-36 h-32 sm:w-44 sm:h-36" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="target-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="target-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="arrow-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="shadow-target" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#312e81" floodOpacity="0.2" />
        </filter>
      </defs>

      <ellipse cx="160" cy="225" rx="110" ry="20" fill="#1e1b4b" opacity="0.12" />

      {/* 3D Bar Columns */}
      <g filter="url(#shadow-target)">
        <rect x="70" y="160" width="22" height="50" rx="4" fill="#60a5fa" />
        <rect x="98" y="130" width="22" height="80" rx="4" fill="#818cf8" />
        <rect x="126" y="105" width="22" height="105" rx="4" fill="#c084fc" />
      </g>

      {/* 3D Target Board */}
      <g filter="url(#shadow-target)">
        <circle cx="210" cy="130" r="68" fill="url(#target-purple)" />
        <circle cx="210" cy="130" r="54" fill="#ffffff" />
        <circle cx="210" cy="130" r="40" fill="url(#target-cyan)" />
        <circle cx="210" cy="130" r="26" fill="#ffffff" />
        <circle cx="210" cy="130" r="14" fill="#ef4444" />
        <circle cx="210" cy="130" r="6" fill="#ffffff" />
      </g>

      {/* 3D Dart Arrow */}
      <g filter="url(#shadow-target)">
        <path d="M 285 55 L 216 124" stroke="url(#arrow-gold)" strokeWidth="6" strokeLinecap="round" />
        <polygon points="285,55 300,45 295,65" fill="#ef4444" />
        <polygon points="285,55 270,40 290,45" fill="#f59e0b" />
      </g>
    </svg>
  );
}

const COLOR_PALETTE = [
  "#2563eb",
  "#ea580c",
  "#0284c7",
  "#059669",
  "#d97706",
  "#7c3aed",
];

// Detailed Industry Master Information for Modal
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
    tagline: "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
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
    tagline: "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
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
    techStack: ["Zendesk Omnichannel", "Shopee Admin CRM", "Live Chat Auto-router", "Power BI"],
    coreRole: "Customer Service Operations Manager",
  },
  "Bảo hiểm nhân thọ": {
    tagline: "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
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
    techStack: ["Prudential Life CRM", "AS400 System", "Voice Recording Quality Checklist"],
    coreRole: "Call Center Project & Quality Manager",
  },
  "Thể thao điện tử": {
    tagline: "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
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
    techStack: ["Garena Customer Desk", "Gcafe Management Tool", "AI Ticket Classifier"],
    coreRole: "Head of Game Customer Support",
  },
  "Ví điện tử": {
    tagline: "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
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
    techStack: ["MoMo Care Core", "AirPay Risk Portal", "Fraud Monitoring Tool", "Power BI"],
    coreRole: "FinTech CS Operation Lead",
  },
  "Xây dựng hệ thống": {
    tagline: "Tư vấn chuyển đổi số, thiết lập CRM & Quy trình CSKH toàn diện cho Doanh nghiệp",
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
    techStack: ["Zoho CRM", "Salesforce", "Notion SOP Matrix", "Process Flowcharting"],
    coreRole: "CX & Service System Consultant",
  },
};

interface BrandLogo {
  name: string;
  url: string;
  color?: string;
  isCustomSvg?: boolean;
}

interface SectorCardConfig {
  num: string;
  title: string;
  exp: string;
  desc: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  titleColor: string;
  expColor: string;
  btnColor: string;
  IconComponent: React.ElementType;
  category: string;
  logos: BrandLogo[];
  blobColor: string;
}

export function Industries() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItemTitle, setExpandedItemTitle] = useState<string | null>(null);

  const cardConfigs: SectorCardConfig[] = [
    {
      num: "01",
      title: "Viễn thông di động",
      exp: "10+ Năm kinh nghiệm",
      desc: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, nhắn tin và giải pháp kết nối toàn diện.",
      badgeBg: "bg-blue-50 dark:bg-blue-950/60",
      badgeText: "text-blue-600 dark:text-blue-400",
      badgeBorder: "border-blue-200/80 dark:border-blue-800",
      iconBg: "bg-blue-50 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBorder: "border-blue-100 dark:border-blue-900",
      titleColor: "text-blue-900 dark:text-blue-300",
      expColor: "text-blue-600 dark:text-blue-400",
      btnColor: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
      IconComponent: Smartphone,
      category: "telecom",
      blobColor: "#2563eb",
      logos: [
        { name: "Mobifone", url: "https://i.ibb.co/hxHm9TsZ/Mobifone.png", color: "#2563eb" },
        { name: "Call24/7", url: "https://i.ibb.co/QvtbdnfP/V247.png", color: "#f97316" },
        { name: "LBC", url: "https://i.ibb.co/tpG5fMrt/LBC.png", color: "#9333ea" },
      ],
    },
    {
      num: "02",
      title: "Thương mại điện tử",
      exp: "6+ Năm kinh nghiệm",
      desc: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vững chắc và tăng trưởng bền vững.",
      badgeBg: "bg-orange-50 dark:bg-orange-950/60",
      badgeText: "text-orange-600 dark:text-orange-400",
      badgeBorder: "border-orange-200/80 dark:border-orange-800",
      iconBg: "bg-orange-50 dark:bg-orange-950/50",
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBorder: "border-orange-100 dark:border-orange-900",
      titleColor: "text-orange-900 dark:text-orange-300",
      expColor: "text-orange-600 dark:text-orange-400",
      btnColor: "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300",
      IconComponent: ShoppingCart,
      category: "fintech",
      blobColor: "#ff4500",
      logos: [
        { name: "Shopee", url: "https://i.ibb.co/BSVS4xf/Shopee.png", color: "#ee4d2d" },
        { name: "ShopeePay", url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", color: "#ea580c" },
        { name: "MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", color: "#ec4899" },
        { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", color: "#eab308" },
      ],
    },
    {
      num: "03",
      title: "Bảo hiểm nhân thọ",
      exp: "3+ Năm kinh nghiệm",
      desc: "Quản lý tổng đài và triển khai các dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành và nâng cao trải nghiệm khách hàng.",
      badgeBg: "bg-sky-50 dark:bg-sky-950/60",
      badgeText: "text-sky-600 dark:text-sky-400",
      badgeBorder: "border-sky-200/80 dark:border-sky-800",
      iconBg: "bg-sky-50 dark:bg-sky-950/50",
      iconColor: "text-sky-600 dark:text-sky-400",
      iconBorder: "border-sky-100 dark:border-sky-900",
      titleColor: "text-sky-900 dark:text-sky-300",
      expColor: "text-sky-600 dark:text-sky-400",
      btnColor: "text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300",
      IconComponent: ShieldCheck,
      category: "insurance",
      blobColor: "#0284c7",
      logos: [
        { name: "Prudential", url: "https://i.ibb.co/XfpQphWF/Prudential.png", color: "#dc2626" },
      ],
    },
    {
      num: "04",
      title: "Thể thao điện tử",
      exp: "5+ Năm kinh nghiệm",
      desc: "Xây dựng và quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống game và cộng đồng người chơi.",
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
      badgeText: "text-emerald-600 dark:text-emerald-400",
      badgeBorder: "border-emerald-200/80 dark:border-emerald-800",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBorder: "border-emerald-100 dark:border-emerald-900",
      titleColor: "text-emerald-900 dark:text-emerald-300",
      expColor: "text-emerald-600 dark:text-emerald-400",
      btnColor: "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300",
      IconComponent: Gamepad,
      category: "esports",
      blobColor: "#10b981",
      logos: [
        { name: "Garena", url: "https://i.ibb.co/h1Md65yV/Garena.png", color: "#df2027" },
        { name: "Vietnam Esports", url: "https://i.ibb.co/fYPJLfbw/VED.png", color: "#dc2626" },
        { name: "eCafe", url: "https://i.ibb.co/FkWk3s4W/GCafe.png", color: "#ff6600" },
      ],
    },
    {
      num: "05",
      title: "Ví điện tử",
      exp: "5+ Năm kinh nghiệm",
      desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng đến xử lý giao dịch và khiếu nại.",
      badgeBg: "bg-amber-50 dark:bg-amber-950/60",
      badgeText: "text-amber-600 dark:text-amber-400",
      badgeBorder: "border-amber-200/80 dark:border-amber-800",
      iconBg: "bg-amber-50 dark:bg-amber-950/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBorder: "border-amber-100 dark:border-amber-900",
      titleColor: "text-amber-900 dark:text-amber-300",
      expColor: "text-amber-600 dark:text-amber-400",
      btnColor: "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
      IconComponent: Wallet,
      category: "fintech",
      blobColor: "#ec4899",
      logos: [
        { name: "MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", color: "#ec4899" },
        { name: "ShopeePay", url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", color: "#ee4d2d" },
        { name: "AirPay", url: "https://i.ibb.co/X4ZXZXZX/AirPay.png", color: "#00a8e8" },
        { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", color: "#eab308" },
      ],
    },
    {
      num: "06",
      title: "Xây dựng hệ thống",
      exp: "8+ Năm kinh nghiệm",
      desc: "Tư vấn xây dựng và tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến công nghệ và dữ liệu.",
      badgeBg: "bg-purple-50 dark:bg-purple-950/60",
      badgeText: "text-purple-600 dark:text-purple-400",
      badgeBorder: "border-purple-200/80 dark:border-purple-800",
      iconBg: "bg-purple-50 dark:bg-purple-950/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBorder: "border-purple-100 dark:border-purple-900",
      titleColor: "text-purple-900 dark:text-purple-300",
      expColor: "text-purple-600 dark:text-purple-400",
      btnColor: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
      IconComponent: Layers,
      category: "systems",
      blobColor: "#7c3aed",
      logos: [
        { name: "System Architecture", url: "", color: "#7c3aed", isCustomSvg: true },
      ],
    },
  ];

  // Filtered cards
  const filteredCards = useMemo(() => {
    return cardConfigs.filter((cfg) => {
      const matchesCategory =
        selectedCategory === "all" || cfg.category === selectedCategory;
      const matchesSearch =
        cfg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cfg.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [cardConfigs, selectedCategory, searchQuery]);

  const handleOpenDetail = (title: string) => {
    playUiSound("click");
    setExpandedItemTitle(title);
  };

  return (
    <PageLayout
      hideToolbar={true}
      id="domains"
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-0 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      pageId="domains"
      pageName="Domains Main Card"
      title={isVi ? "Lĩnh vực hoạt động" : "Core industry sectors"}
      subtitle={
        isVi
          ? "Chúng tôi không ngừng mở rộng và chuyên sâu ở nhiều lĩnh vực để mang đến giải pháp tối ưu và giá trị bền vững cho khách hàng."
          : "We continuously expand and specialize across multiple domains to deliver optimal solutions and sustainable value to our clients."
      }
      icon={Globe}
      contentContainerClassName="!pb-6 pb-6"
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
          count: cardConfigs.length,
        },
        {
          id: "telecom",
          labelVi: "Viễn thông",
          labelEn: "Telecom",
          count: 1,
        },
        {
          id: "fintech",
          labelVi: "eCommerce & FinTech",
          labelEn: "FinTech",
          count: 2,
        },
        {
          id: "insurance",
          labelVi: "Bảo hiểm",
          labelEn: "Insurance",
          count: 1,
        },
        {
          id: "esports",
          labelVi: "eSports",
          labelEn: "eSports",
          count: 1,
        },
        {
          id: "systems",
          labelVi: "Hệ thống",
          labelEn: "Systems",
          count: 1,
        },
      ]}
      activeGroup={selectedCategory}
      onGroupChange={(cat) => setSelectedCategory(cat)}
      groupLabel={{ vi: "Lĩnh vực:", en: "Industry:" }}
      onReset={() => {
        setSearchQuery("");
        setSelectedCategory("all");
      }}
      totalCount={cardConfigs.length}
      filteredCount={filteredCards.length}
    >
      <div className="w-full max-w-[1400px] mx-auto space-y-6 sm:space-y-8 px-2 sm:px-4 pt-2">
        {/* ================= 1. HEADER STATS PANEL ================= */}
        <div className="w-full shrink-0 bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/80 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.2)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/70 dark:border-purple-800/60 shadow-xs hover:scale-[1.02] transition-transform">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-300 leading-none mb-1">
                  06+
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Lĩnh vực hoạt động
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                  Đa dạng & Chuyên sâu
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200/70 dark:border-orange-800/60 shadow-xs hover:scale-[1.02] transition-transform">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-300 leading-none mb-1">
                  10+
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Năm kinh nghiệm
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                  Trong nhiều ngành nghề
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 shadow-xs hover:scale-[1.02] transition-transform">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-300 leading-none mb-1">
                  50+
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Dự án đã triển khai
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                  Thành công & Hiệu quả
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 shadow-xs hover:scale-[1.02] transition-transform">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-300 leading-none mb-1">
                  100%
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Cam kết chất lượng
                </div>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                  Uy tín & Đồng hành
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. MAIN 6-CARD SECTOR GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {filteredCards.map((card, idx) => {
            const Icon = card.IconComponent;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleOpenDetail(card.title)}
                className="group relative w-full rounded-2xl z-10 overflow-hidden flex flex-col items-center justify-center min-h-[350px] cursor-pointer select-none transition-all duration-300 hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:shadow-2xl border border-white/80 dark:border-white/20 bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl"
              >
                {/* Foreground Glass Surface (.bg) */}
                <div className="relative z-2 w-full h-full min-h-[340px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between">
                  {/* Top Number Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg border font-black text-xs font-mono shadow-xs",
                        card.badgeBg,
                        card.badgeText,
                        card.badgeBorder
                      )}
                    >
                      {card.num}
                    </span>
                  </div>

                  {/* Center Circle Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full border flex items-center justify-center mx-auto mb-2 shadow-inner group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-900/80 overflow-hidden",
                      card.iconBorder
                    )}
                  >
                    <Header3DIllustration className="w-12 h-12 select-none pointer-events-none drop-shadow-md" />
                  </div>

                  {/* Title & Experience */}
                  <div className="text-center space-y-1 mb-2">
                    <h3 className={cn("text-base font-black leading-tight line-clamp-1", card.titleColor)}>
                      {card.title}
                    </h3>
                    <div className={cn("text-xs font-bold flex items-center justify-center gap-1", card.expColor)}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{card.exp}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300 text-center font-normal line-clamp-3 min-h-[52px] mb-3">
                    {card.desc}
                  </p>

                  {/* Section Divider & Representative Projects */}
                  <div className="space-y-2 mt-auto">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center flex items-center justify-center gap-2 before:h-px before:flex-1 before:bg-slate-200 dark:before:bg-slate-800 after:h-px after:flex-1 after:bg-slate-200 dark:after:bg-slate-800">
                      <span>Dự án tiêu biểu</span>
                    </div>

                    {/* Brand Logo Chips */}
                    <div className="flex items-center justify-center gap-1.5 py-0.5 min-h-[34px]">
                      {card.logos.map((logo, lIdx) => (
                        <div
                          key={lIdx}
                          className="w-7 h-7 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-xs hover:scale-110 transition-transform"
                          title={logo.name}
                        >
                          {logo.isCustomSvg ? (
                            <div className="w-full h-full bg-purple-600 text-white flex items-center justify-center font-bold text-[9px]">
                              <Cpu className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <img
                              src={logo.url}
                              alt={logo.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://placehold.co/80x80/2563eb/ffffff?text=${encodeURIComponent(
                                  logo.name.slice(0, 2)
                                )}`;
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Link Button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(card.title);
                        }}
                        className={cn(
                          "inline-flex items-center gap-1 text-xs font-extrabold transition-colors cursor-pointer",
                          card.btnColor
                        )}
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= 3. BOTTOM BANNER (QUOTE & CTA) ================= */}
        <div className="relative rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-white/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.2)] overflow-hidden backdrop-blur-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left Quote Block */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200 dark:shadow-indigo-950/50">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl">
                Chúng tôi không ngừng mở rộng và chuyên sâu ở nhiều lĩnh vực để mang đến giải pháp tối ưu và giá trị bền vững cho khách hàng.
              </p>
            </div>

            {/* Center 3D Target Graphic */}
            <div className="shrink-0 hidden md:block">
              <Target3DIllustration className="w-36 h-28 lg:w-44 lg:h-32 drop-shadow-md" />
            </div>

            {/* Right Action Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setSelectedCategory("all");
                  setSearchQuery("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-100/90 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/60 dark:hover:bg-blue-900/90 dark:text-blue-200 font-extrabold text-xs sm:text-sm border border-blue-200/80 dark:border-blue-700/60 shadow-xs transition-all cursor-pointer group"
              >
                <span>Xem tất cả lĩnh vực</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. DETAILED MODAL OVERLAY ================= */}
      <AnimatePresence>
        {expandedItemTitle && (() => {
          const details = INDUSTRY_DETAILS_MAP[expandedItemTitle] || INDUSTRY_DETAILS_MAP["Viễn thông di động"];
          const cardCfg = cardConfigs.find((c) => c.title === expandedItemTitle) || cardConfigs[0];
          const Icon = cardCfg.IconComponent;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-white/80 dark:border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.8)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.2)] backdrop-blur-3xl overflow-hidden"
              >
                {/* Header Bar */}
                <div className="relative p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-indigo-950/30">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-2xl border flex items-center justify-center shadow-md", cardCfg.iconBg, cardCfg.iconColor, cardCfg.iconBorder)}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2.5 py-0.5 rounded-md text-xs font-black font-mono border", cardCfg.badgeBg, cardCfg.badgeText, cardCfg.badgeBorder)}>
                          SECTOR {cardCfg.num}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {details.experienceYears} kinh nghiệm
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
                        {cardCfg.title}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedItemTitle(null)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white dark:bg-slate-800 dark:hover:bg-rose-500 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-left">
                  {/* Tagline */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{details.tagline}</span>
                    </p>
                  </div>

                  {/* 3 Columns Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Col 1: Scope & Role */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Vai trò chính</span>
                        <p className="text-xs font-black text-indigo-600 dark:text-indigo-400">{details.coreRole}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Quy mô nhân sự</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{details.headcountScope}</p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Thương hiệu đồng hành</span>
                        <div className="flex flex-wrap gap-2">
                          {cardCfg.logos.map((logo, lIdx) => (
                            <span key={lIdx} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {logo.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Achievements */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Thành tựu tiêu biểu</span>
                      </h4>
                      <ul className="space-y-2">
                        {details.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 3: Key Projects & Tech Stack */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-purple-500" />
                          <span>Dự án chính</span>
                        </h4>
                        <div className="space-y-2">
                          {details.keyProjects.map((proj, pIdx) => (
                            <div key={pIdx} className="p-2.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200">
                              {proj}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-sky-500" />
                          <span>Công nghệ & Công cụ</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {details.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </PageLayout>
  );
}

export const Domains = Industries;
export default Industries;
