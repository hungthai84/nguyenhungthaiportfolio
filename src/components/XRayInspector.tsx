import React, { useState, useEffect, useRef } from "react";
import { 
  Scan, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Crosshair, 
  Terminal, 
  FolderTree,
  ChevronDown,
  ChevronRight,
  Edit3,
  Trash2,
  PlusCircle,
  MoveRight,
  ArrowRightLeft,
  ExternalLink,
  Globe,
  Tag,
  Zap,
  RefreshCw,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  ListPlus,
  AlertCircle,
  FileCode,
  Layout,
  Code2,
  Image,
  Boxes
} from "lucide-react";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

interface ElementInfo {
  tag: string;
  id?: string;
  className?: string;
  rect: DOMRect;
  textSnippet: string;
  sectionName: string;
  sectionId: string;
  componentType: string;
  element: HTMLElement;
  fullSelector: string;
}

type InspectorMode = "element" | "tree" | "full_website";

interface TreeItem {
  id: string;
  sectionId: string;
  sectionName: string;
  title: string;
  tag: string;
  type: string;
  selector: string;
  children?: TreeItem[];
  element?: HTMLElement | null;
}

interface TreeAction {
  id: string;
  type: "edit" | "delete" | "add" | "move";
  targetTitle: string;
  targetSelector: string;
  sectionName: string;
  sectionId: string;
  description: string;
  targetDestination?: string;
}

interface PresetTemplate {
  id: "tsx" | "layout_image" | "html" | "exact_image" | "codepen";
  label: string;
  titleVi: string;
  shortDesc: string;
  icon: React.ElementType;
  badgeColor: string;
  promptSnippet: string;
}

// 5 Mẫu Áp Dụng Chuyên Dụng
const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: "tsx",
    label: "1. Code từ file TSX",
    titleVi: "Code từ file TSX",
    shortDesc: "Tái tạo & nhúng mã nguồn React TSX",
    icon: FileCode,
    badgeColor: "border-blue-500/40 text-blue-600 dark:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 1: CHUYỂN ĐỔI & TÍCH HỢP TỪ FILE TSX]
• Yêu cầu chuyên sâu: Phân tích toàn bộ mã nguồn file TSX được cung cấp, trích xuất 100% logic, state, props, TypeScript interfaces, Tailwind CSS utilities và tất cả các hiệu ứng tương tác (animations, hover/active states, sound effects, dark mode).
• Quy chuẩn thực thi: Chuyển đổi và nhúng trực tiếp vào component mục tiêu. Đảm bảo mã nguồn chạy được ngay lập tức, trích xuất đầy đủ tính năng và hiệu ứng mà không bỏ sót bất kỳ dòng code hay chi tiết giao diện nào.`
  },
  {
    id: "layout_image",
    label: "2. Hình để lấy bố cục",
    titleVi: "Hình để lấy bố cục",
    shortDesc: "Trích xuất khung sườn Flex/Grid Layout",
    icon: Layout,
    badgeColor: "border-amber-500/40 text-amber-600 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 2: TRÍCH XUẤT BỐ CỤC TỪ HÌNH ẢNH MẪU]
• Yêu cầu chuyên sâu: Dựa trên hình ảnh giao diện tham chiếu, trích xuất chính xác cấu trúc khung sườn (Layout Structure), hệ thống lưới Flexbox/Grid, tỷ lệ phân chia cột/dòng, khoảng cách padding/margin giữa các container.
• Quy chuẩn thực thi: Tái dựng lại khung bố cục hoàn chỉnh, chuẩn hóa tỷ lệ hiển thị responsive trên cả Mobile và Desktop, đảm bảo trích xuất trọn vẹn vị trí và bố cục không bỏ sót.`
  },
  {
    id: "html",
    label: "3. Code từ HTML",
    titleVi: "Code từ HTML",
    shortDesc: "Chuyển đổi HTML/CSS thuần sang React TSX",
    icon: Code2,
    badgeColor: "border-emerald-500/40 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 3: CHUYỂN ĐỔI CODE TỪ HTML SANG REACT TSX]
• Yêu cầu chuyên sâu: Chuyển đổi toàn bộ đoạn code HTML/CSS/JS thuần sang chuẩn React TSX và Tailwind CSS v4. Đổi class -> className, inline styles -> Tailwind utilities, chuyển đổi các sự kiện DOM thuần (addEventListener) thành React Hooks (useState, useEffect, useRef).
• Quy chuẩn thực thi: Đảm bảo mã nguồn React TSX có thể chạy được ngay lập tức, bảo toàn 100% hiệu ứng CSS transition, animation và cấu trúc phần tử không bỏ sót bất kỳ hiệu ứng hay tính năng nào.`
  },
  {
    id: "exact_image",
    label: "4. Hình xác như hình",
    titleVi: "Hình xác như hình",
    shortDesc: "Tái lập Pixel-Exact 1:1 từ Screenshot",
    icon: Image,
    badgeColor: "border-pink-500/40 text-pink-600 dark:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 4: TÁI LẬP PIXEL-EXACT 1:1 TỪ HÌNH ẢNH THỰC TẾ]
• Yêu cầu chuyên sâu: Tái tạo chính xác 100% giao diện thực tế từ hình ảnh minh họa (Pixel-Perfect Reconstruction).
• Quy chuẩn thực thi: Trích xuất chính xác bảng màu mã Hex, bộ font chữ & kích thước, khoảng cách bo góc (border-radius), hiệu ứng bóng đổ (box-shadow/glow), gradient, biểu tượng Lucide-React tương ứng và các trạng thái Hover/Active/Focus. Đảm bảo giao diện tái dựng hoàn chỉnh, chạy được ngay và trích xuất đầy đủ tính năng hiệu ứng không bỏ sót.`
  },
  {
    id: "codepen",
    label: "5. Codepen",
    titleVi: "CodePen",
    shortDesc: "Tích hợp Snippet HTML/CSS/JS từ CodePen",
    icon: Boxes,
    badgeColor: "border-purple-500/40 text-purple-600 dark:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20",
    promptSnippet: `[MẪU ÁP DỤNG 5: TÍCH HỢP DỰ ÁN / SNIPPET TỪ CODEPEN]
• Yêu cầu chuyên sâu: Tích hợp đoạn code từ CodePen (bao gồm HTML markup, CSS/SCSS styling, và JavaScript/GSAP/Canvas logic) vào component React TSX hiện tại.
• Quy chuẩn thực thi: Đóng gói gọn gàng trong React useEffect / useRef, chuyển đổi CSS sang Tailwind hoặc scoped CSS. Đảm bảo mọi hiệu ứng chuyển động, canvas particle, hoặc animation chạy mượt mà 60fps, chạy được ngay lập tức và không bỏ sót bất kỳ hiệu ứng hay tính năng nào.`
  }
];

// Comprehensive Structure of Website Pages & Sub-components
const DEFAULT_PAGE_STRUCTURE: TreeItem[] = [
  {
    id: "sec-home",
    sectionId: "home",
    sectionName: "Trang chủ (Home / Hero)",
    title: "Trang chủ & Giới thiệu nhanh",
    tag: "section",
    type: "Section",
    selector: "#home",
    children: [
      { id: "h-badge", sectionId: "home", sectionName: "Trang chủ", title: "Huy hiệu Trạng thái (Open for Roles)", tag: "div", type: "Badge", selector: "#home .status-badge" },
      { id: "h-title", sectionId: "home", sectionName: "Trang chủ", title: "Tiêu đề Chính & Tên chức danh (CX/CS Leader)", tag: "h1", type: "Heading", selector: "#home h1" },
      { id: "h-desc", sectionId: "home", sectionName: "Trang chủ", title: "Mô tả Tầm nhìn & Tóm lược Năng lực", tag: "p", type: "Text", selector: "#home p" },
      { id: "h-cta", sectionId: "home", sectionName: "Trang chủ", title: "Nhóm nút Kêu gọi hành động (Liên hệ & Tải CV)", tag: "div", type: "Button Group", selector: "#home .hero-cta" },
      { id: "h-stats", sectionId: "home", sectionName: "Trang chủ", title: "4 Thẻ Thống kê Thành tựu (CSAT, SLA, NPS, Teams)", tag: "div", type: "Metrics Card", selector: "#home .metrics-grid" }
    ]
  },
  {
    id: "sec-letter",
    sectionId: "letter",
    sectionName: "Thư ngỏ (Open Letter)",
    title: "Thư ngỏ & Triết lý Quản trị",
    tag: "section",
    type: "Section",
    selector: "#letter",
    children: [
      { id: "l-header", sectionId: "letter", sectionName: "Thư ngỏ", title: "Tiêu đề Thư ngỏ & Lời tựa", tag: "h2", type: "Heading", selector: "#letter h2" },
      { id: "l-body", sectionId: "letter", sectionName: "Thư ngỏ", title: "Nội dung bức thư chia sẻ tâm huyết CX/CS", tag: "div", type: "Article", selector: "#letter .letter-body" },
      { id: "l-sign", sectionId: "letter", sectionName: "Thư ngỏ", title: "Khối chữ ký số & Cam kết chất lượng", tag: "div", type: "Signature", selector: "#letter .letter-sign" }
    ]
  },
  {
    id: "sec-about",
    sectionId: "about",
    sectionName: "Giới thiệu (About)",
    title: "Tiểu sử & Chân dung Lãnh đạo",
    tag: "section",
    type: "Section",
    selector: "#about",
    children: [
      { id: "a-profile", sectionId: "about", sectionName: "Giới thiệu", title: "Thẻ Chân dung & Thông tin cá nhân", tag: "div", type: "Profile Card", selector: "#about .profile-card" },
      { id: "a-values", sectionId: "about", sectionName: "Giới thiệu", title: "Khối 4 Giá trị cốt lõi (Tận tâm, Thấu cảm, Hiệu quả, Sáng tạo)", tag: "div", type: "Grid", selector: "#about .values-grid" },
      { id: "a-bio", sectionId: "about", sectionName: "Giới thiệu", title: "Đoạn văn tóm tắt quá trình phát triển sự nghiệp", tag: "p", type: "Text", selector: "#about .bio-text" }
    ]
  },
  {
    id: "sec-domains",
    sectionId: "domains",
    sectionName: "Lĩnh vực (Domains)",
    title: "Lĩnh vực & Trụ cột Chuyên môn",
    tag: "section",
    type: "Section",
    selector: "#domains",
    children: [
      { id: "d-cards", sectionId: "domains", sectionName: "Lĩnh vực", title: "4 Thẻ Trụ cột (CS Ops, CX Design, Tech & AI, QA/Training)", tag: "div", type: "Cards Grid", selector: "#domains .domain-card" },
      { id: "d-framework", sectionId: "domains", sectionName: "Lĩnh vực", title: "Mô hình Khung quản trị vận hành toàn diện", tag: "div", type: "Framework", selector: "#domains .framework-box" }
    ]
  },
  {
    id: "sec-education",
    sectionId: "education",
    sectionName: "Học vấn (Education)",
    title: "Học vấn, Bằng cấp & Chứng chỉ",
    tag: "section",
    type: "Section",
    selector: "#education",
    children: [
      { id: "e-degrees", sectionId: "education", sectionName: "Học vấn", title: "Thẻ Bằng Cử nhân & Bằng cấp chính quy", tag: "div", type: "Timeline", selector: "#education .degree-card" },
      { id: "e-certs", sectionId: "education", sectionName: "Học vấn", title: "Danh sách Chứng chỉ Quốc tế & Đào tạo chuyên sâu", tag: "div", type: "Cert List", selector: "#education .cert-grid" },
      { id: "e-scores", sectionId: "education", sectionName: "Học vấn", title: "Bảng điểm & Thành tích học tập nổi bật", tag: "div", type: "Stats Box", selector: "#education .score-box" }
    ]
  },
  {
    id: "sec-experience",
    sectionId: "experience",
    sectionName: "Kinh nghiệm (Experience)",
    title: "Kinh nghiệm Chuyên môn & Lãnh đạo",
    tag: "section",
    type: "Section",
    selector: "#experience",
    children: [
      { id: "exp-timeline", sectionId: "experience", sectionName: "Kinh nghiệm", title: "Dòng thời gian sự nghiệp các vị trí CS/CX Manager", tag: "div", type: "Timeline", selector: "#experience .timeline" },
      { id: "exp-kpi", sectionId: "experience", sectionName: "Kinh nghiệm", title: "Bảng Chỉ số Thành tích & Đóng góp tăng trưởng", tag: "div", type: "KPI Cards", selector: "#experience .kpi-cards" },
      { id: "exp-responsibilities", sectionId: "experience", sectionName: "Kinh nghiệm", title: "Danh sách nhiệm vụ điều hành & Quản lý đội ngũ", tag: "ul", type: "List", selector: "#experience .resp-list" }
    ]
  },
  {
    id: "sec-skills",
    sectionId: "skills",
    sectionName: "Kỹ năng (Skills)",
    title: "Bản đồ Kỹ năng & Năng lực Chuyên sâu",
    tag: "section",
    type: "Section",
    selector: "#skills",
    children: [
      { id: "sk-soft", sectionId: "skills", sectionName: "Kỹ năng", title: "Nhóm Kỹ năng Lãnh đạo & Quản trị con người", tag: "div", type: "Skill Group", selector: "#skills .soft-skills" },
      { id: "sk-hard", sectionId: "skills", sectionName: "Kỹ năng", title: "Nhóm Kỹ năng Vận hành hệ thống & Quy trình CS", tag: "div", type: "Skill Group", selector: "#skills .hard-skills" },
      { id: "sk-tech", sectionId: "skills", sectionName: "Kỹ năng", title: "Kỹ năng Công nghệ, AI Prompting & CRM", tag: "div", type: "Tech Badges", selector: "#skills .tech-badges" }
    ]
  },
  {
    id: "sec-projects",
    sectionId: "projects",
    sectionName: "Dự án (Projects)",
    title: "Dự án Tiêu biểu & Chuyển đổi số CS",
    tag: "section",
    type: "Section",
    selector: "#projects",
    children: [
      { id: "p-grid", sectionId: "projects", sectionName: "Dự án", title: "Bộ lọc & Danh mục Dự án thực chiến", tag: "div", type: "Filter Tabs", selector: "#projects .project-filter" },
      { id: "p-cards", sectionId: "projects", sectionName: "Dự án", title: "Các Thẻ Dự án chi tiết (CSAT Boost, AI Chatbot, Omni-channel)", tag: "div", type: "Cards Grid", selector: "#projects .project-cards" }
    ]
  },
  {
    id: "sec-systems",
    sectionId: "systems",
    sectionName: "Hệ thống (Systems)",
    title: "Hệ thống Vận hành & Kiến trúc CS",
    tag: "section",
    type: "Section",
    selector: "#systems",
    children: [
      { id: "sys-arch", sectionId: "systems", sectionName: "Hệ thống", title: "Sơ đồ Kiến trúc Vận hành Đa kênh Omni-channel", tag: "div", type: "Diagram", selector: "#systems .arch-box" },
      { id: "sys-flow", sectionId: "systems", sectionName: "Hệ thống", title: "Quy trình Xử lý Sự cố & Phản hồi Khách hàng", tag: "div", type: "Flowchart", selector: "#systems .flow-chart" }
    ]
  },
  {
    id: "sec-wallpapers",
    sectionId: "wallpapers",
    sectionName: "Hình nền (Wallpapers)",
    title: "Kho Hình nền & Video Động 4K",
    tag: "section",
    type: "Section",
    selector: "#wallpapers",
    children: [
      { id: "wp-grid", sectionId: "wallpapers", sectionName: "Hình nền", title: "Lưới 25+ Hình nền & Video 4K phong cách nghệ thuật", tag: "div", type: "Gallery", selector: "#wallpapers .wp-grid" },
      { id: "wp-custom", sectionId: "wallpapers", sectionName: "Hình nền", title: "Form Thêm link hình/video nền cá nhân hóa", tag: "div", type: "Input Box", selector: "#wallpapers .custom-url-box" },
      { id: "wp-controls", sectionId: "wallpapers", sectionName: "Hình nền", title: "Thanh trượt Độ mờ (Opacity) & Độ nhòe (Blur)", tag: "div", type: "Sliders", selector: "#wallpapers .controls-box" }
    ]
  },
  {
    id: "sec-memories",
    sectionId: "memories",
    sectionName: "Kỷ niệm (Memories)",
    title: "Kỷ niệm, Dấu ấn & Hoạt động Đội ngũ",
    tag: "section",
    type: "Section",
    selector: "#memories",
    children: [
      { id: "mem-gallery", sectionId: "memories", sectionName: "Kỷ niệm", title: "Bộ sưu tập Khoảnh khắc Đào tạo & Team Building", tag: "div", type: "Photo Grid", selector: "#memories .photo-gallery" },
      { id: "mem-filter", sectionId: "memories", sectionName: "Kỷ niệm", title: "Thanh phân loại Album sự kiện", tag: "div", type: "Filter", selector: "#memories .album-filter" }
    ]
  },
  {
    id: "sec-interview",
    sectionId: "interview",
    sectionName: "Phỏng vấn (Interview)",
    title: "Video Phỏng vấn Chiến lược CX/CS",
    tag: "section",
    type: "Section",
    selector: "#interview",
    children: [
      { id: "int-video", sectionId: "interview", sectionName: "Phỏng vấn", title: "Trình phát Video tương tác & Nút Phóng to 1.1x", tag: "video", type: "Video Player", selector: "#interview video" },
      { id: "int-q-btn", sectionId: "interview", sectionName: "Phỏng vấn", title: "Nút Tròn Xem 13 Câu hỏi Chiến lược", tag: "button", type: "Button", selector: "#interview .question-trigger" },
      { id: "int-spotlight", sectionId: "interview", sectionName: "Phỏng vấn", title: "Thẻ Chi tiết Câu hỏi & Câu trả lời Mẫu", tag: "div", type: "Spotlight Card", selector: "#interview .qa-spotlight" }
    ]
  },
  {
    id: "sec-tuvi",
    sectionId: "tuvi",
    sectionName: "Tử vi (TuVi)",
    title: "Tử vi, Bản mệnh & Phong thủy",
    tag: "section",
    type: "Section",
    selector: "#tuvi",
    children: [
      { id: "tv-info", sectionId: "tuvi", sectionName: "Tử vi", title: "Bảng Thông tin Can Chi, Bản Mệnh Thổ, Cung Phi", tag: "div", type: "Card", selector: "#tuvi .destiny-box" },
      { id: "tv-guide", sectionId: "tuvi", sectionName: "Tử vi", title: "Luận giải Phong thủy hướng làm việc & Quẻ cát tường", tag: "div", type: "Analysis", selector: "#tuvi .analysis-box" }
    ]
  },
  {
    id: "sec-contact",
    sectionId: "contact",
    sectionName: "Liên hệ (Contact)",
    title: "Liên hệ, Đặt lịch & Kết nối",
    tag: "section",
    type: "Section",
    selector: "#contact",
    children: [
      { id: "c-form", sectionId: "contact", sectionName: "Liên hệ", title: "Form Gửi lời nhắn & Đặt lịch phỏng vấn", tag: "form", type: "Form", selector: "#contact form" },
      { id: "c-info", sectionId: "contact", sectionName: "Liên hệ", title: "Thông tin Email, Số điện thoại & Địa chỉ", tag: "div", type: "Contact Info", selector: "#contact .contact-card" },
      { id: "c-social", sectionId: "contact", sectionName: "Liên hệ", title: "Các liên kết Mạng xã hội chuyên nghiệp (LinkedIn, GitHub)", tag: "div", type: "Social Links", selector: "#contact .social-box" }
    ]
  },
  {
    id: "sec-header",
    sectionId: "header",
    sectionName: "Thanh Điều hướng (Header)",
    title: "Header Đa hướng Dọc / Ngang",
    tag: "header",
    type: "Navigation",
    selector: "header",
    children: [
      { id: "h-logo", sectionId: "header", sectionName: "Header", title: "Logo Thương hiệu cá nhân (Hung Thai)", tag: "a", type: "Brand Logo", selector: "header .brand-logo" },
      { id: "h-nav", sectionId: "header", sectionName: "Header", title: "Thanh Menu điều hướng 14 phân mục", tag: "nav", type: "Nav Links", selector: "header nav" },
      { id: "h-orient", sectionId: "header", sectionName: "Header", title: "Nút Đổi hướng Dọc / Ngang (Columns3 / Rows3)", tag: "button", type: "Layout Switcher", selector: "header .layout-switch" },
      { id: "h-lang", sectionId: "header", sectionName: "Header", title: "Nút Ngôn ngữ (Tiếng Việt / English)", tag: "button", type: "Language Switcher", selector: "header .lang-btn" },
      { id: "h-theme", sectionId: "header", sectionName: "Header", title: "Nút Giao diện (Bản Sáng / Bản Tối)", tag: "button", type: "Theme Switcher", selector: "header .theme-btn" },
      { id: "h-sound", sectionId: "header", sectionName: "Header", title: "Nút Bật / Tắt Âm thanh tương tác", tag: "button", type: "Sound Toggle", selector: "header .sound-btn" }
    ]
  },
  {
    id: "sec-footer",
    sectionId: "footer",
    sectionName: "Chân trang (Footer)",
    title: "Chân trang & Tiện ích Thời tiết",
    tag: "footer",
    type: "Footer",
    selector: "footer",
    children: [
      { id: "f-weather", sectionId: "footer", sectionName: "Footer", title: "Widget Dự báo thời tiết trực tiếp", tag: "div", type: "Weather Widget", selector: "footer .weather-box" },
      { id: "f-links", sectionId: "footer", sectionName: "Footer", title: "Danh mục liên kết nhanh & Bản quyền tác giả", tag: "div", type: "Footer Links", selector: "footer .footer-links" }
    ]
  }
];

export default function XRayInspector() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hoveredElement, setHoveredElement] = useState<ElementInfo | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null);
  const [mode, setMode] = useState<InspectorMode>("tree");
  const [userInstruction, setUserInstruction] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);
  
  // Custom states for website sections check box & preset code input analyzer
  const [selectedSections, setSelectedSections] = useState<string[]>(DEFAULT_PAGE_STRUCTURE.map(s => s.sectionId));
  const [presetCodeInput, setPresetCodeInput] = useState<string>("");

  // Light/Dark Theme inside Popup
  const [popupTheme, setPopupTheme] = useState<"light" | "dark">("dark");

  // Tree View State
  const [treeStructure, setTreeStructure] = useState<TreeItem[]>(DEFAULT_PAGE_STRUCTURE);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "sec-home": true,
    "sec-interview": true
  });
  const [selectedTreeItem, setSelectedTreeItem] = useState<TreeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Action Queue (Chỉnh / Xóa / Thêm / Chuyển)
  const [actionQueue, setActionQueue] = useState<TreeAction[]>([]);
  const [modalActionType, setModalActionType] = useState<"edit" | "delete" | "add" | "move" | null>(null);
  const [actionDescription, setActionDescription] = useState<string>("");
  const [actionDestination, setActionDestination] = useState<string>("home");

  // Check document theme on mount
  useEffect(() => {
    const isDocDark = document.documentElement.classList.contains("dark");
    setPopupTheme(isDocDark ? "dark" : "light");
  }, [inspectorOpen]);

  // Clean snippet helper
  const cleanSnippet = (text: string, maxLength: number = 50): string => {
    if (!text) return "";
    const condensed = text.replace(/\s+/g, " ").trim();
    if (condensed.length <= maxLength) return condensed;
    return condensed.slice(0, maxLength) + "...";
  };

  // Extract section info
  const getSectionInfo = (el: HTMLElement): { name: string; id: string } => {
    const sectionEl = el.closest("section") || el.closest("header") || el.closest("footer") || el.closest("[id]");
    if (sectionEl) {
      const id = sectionEl.getAttribute("id") || sectionEl.tagName.toLowerCase();
      const matched = DEFAULT_PAGE_STRUCTURE.find(s => s.sectionId === id);
      return {
        id: id,
        name: matched ? matched.sectionName : `Phần #${id}`
      };
    }
    return { name: "Giao diện chính", id: "app" };
  };

  const getComponentType = (el: HTMLElement): string => {
    const tag = el.tagName.toLowerCase();
    if (tag === "button" || el.getAttribute("role") === "button" || el.onclick) return "Nút bấm (Button)";
    if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") return "Tiêu đề (Heading)";
    if (tag === "p" || tag === "span") return "Đoạn văn bản (Text)";
    if (tag === "img" || tag === "svg") return "Hình ảnh / Biểu tượng (Media)";
    if (tag === "input" || tag === "textarea" || tag === "select") return "Trường nhập liệu (Input)";
    if (tag === "a") return "Đường liên kết (Link)";
    if (tag === "video") return "Trình phát Video (Video)";
    if (el.classList.contains("rounded-2xl") || el.classList.contains("border")) return "Thẻ chứa (Card / Box)";
    return "Phần tử giao diện (Component)";
  };

  const getCssPath = (el: HTMLElement): string => {
    if (el.id) return `#${el.id}`;
    let path = el.tagName.toLowerCase();
    if (el.className && typeof el.className === "string") {
      const classes = el.className
        .split(" ")
        .filter(c => c && !c.includes(":") && !c.includes("[") && !c.includes("/") && !c.includes("hover") && !c.includes("active") && !c.includes("dark"))
        .slice(0, 2);
      if (classes.length) path += `.${classes.join(".")}`;
    }
    return path;
  };

  // Toggle X-Ray on keypress or custom event
  useEffect(() => {
    const handleToggleEvent = () => {
      setIsActive(prev => {
        const nextState = !prev;
        if (!nextState) {
          setHoveredElement(null);
          setSelectedElement(null);
          setInspectorOpen(false);
        } else {
          playUiSound("special");
        }
        return nextState;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "x" || e.key === "X") {
        e.preventDefault();
        handleToggleEvent();
      }

      if (e.key === "Escape" && isActive) {
        setIsActive(false);
        setHoveredElement(null);
        setSelectedElement(null);
        setInspectorOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-xray", handleToggleEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-xray", handleToggleEvent);
    };
  }, [isActive]);

  // Inspect hovering elements when active
  useEffect(() => {
    if (!isActive || inspectorOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest("#xray-inspector-ui")) return;

      const rect = target.getBoundingClientRect();
      const secInfo = getSectionInfo(target);
      const rawText = target.innerText || target.getAttribute("alt") || target.getAttribute("title") || "";
      const text = cleanSnippet(rawText, 50);

      setHoveredElement({
        tag: target.tagName.toLowerCase(),
        id: target.id,
        className: typeof target.className === "string" ? target.className : "",
        rect,
        textSnippet: text,
        sectionName: secInfo.name,
        sectionId: secInfo.id,
        componentType: getComponentType(target),
        element: target,
        fullSelector: getCssPath(target)
      });
    };

    const handleClick = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest("#xray-inspector-ui")) return;

      e.preventDefault();
      e.stopPropagation();

      playUiSound("click");
      const rect = target.getBoundingClientRect();
      const secInfo = getSectionInfo(target);
      const rawText = target.innerText || target.getAttribute("alt") || target.getAttribute("title") || "";
      const text = cleanSnippet(rawText, 50);

      const info: ElementInfo = {
        tag: target.tagName.toLowerCase(),
        id: target.id,
        className: typeof target.className === "string" ? target.className : "",
        rect,
        textSnippet: text,
        sectionName: secInfo.name,
        sectionId: secInfo.id,
        componentType: getComponentType(target),
        element: target,
        fullSelector: getCssPath(target)
      };

      setSelectedElement(info);
      setMode("element");
      setHoveredElement(null);
      setInspectorOpen(true);
      setGeneratedPrompt("");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [isActive, inspectorOpen]);

  const toggleSectionExpand = (sectionKey: string) => {
    playUiSound("click");
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Add Action from Tree
  const handleOpenActionModal = (item: TreeItem, type: "edit" | "delete" | "add" | "move") => {
    playUiSound("click");
    setSelectedTreeItem(item);
    setModalActionType(type);
    if (type === "edit") {
      setActionDescription(`Chỉnh sửa giao diện và nội dung của [${item.title}]: `);
    } else if (type === "delete") {
      setActionDescription(`Xóa bỏ đối tượng [${item.title}] khỏi component và tối ưu lại khoảng cách layout.`);
    } else if (type === "add") {
      setActionDescription(`Bổ sung thêm thành phần mới vào [${item.title}]: `);
    } else if (type === "move") {
      setActionDescription(`Di chuyển đối tượng [${item.title}] sang vị trí mới.`);
    }
  };

  const handleConfirmAction = () => {
    if (!selectedTreeItem || !modalActionType) return;
    playUiSound("success");

    const newAction: TreeAction = {
      id: `act-${Date.now()}`,
      type: modalActionType,
      targetTitle: selectedTreeItem.title,
      targetSelector: selectedTreeItem.selector,
      sectionName: selectedTreeItem.sectionName,
      sectionId: selectedTreeItem.sectionId,
      description: actionDescription.trim() || "Thực hiện theo yêu cầu thiết kế chuẩn.",
      targetDestination: modalActionType === "move" ? actionDestination : undefined
    };

    setActionQueue(prev => [newAction, ...prev]);
    setModalActionType(null);
    setActionDescription("");
  };

  const handleRemoveAction = (actionId: string) => {
    playUiSound("click");
    setActionQueue(prev => prev.filter(a => a.id !== actionId));
  };

  // Jump/Navigate to section on live page
  const handleNavigateToSection = (sectionId: string) => {
    playUiSound("click");
    const targetEl = document.getElementById(sectionId) || document.querySelector(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Generate Prompt
  const handleGeneratePrompt = () => {
    playUiSound("special");

    const activePresetObj = PRESET_TEMPLATES.find(p => p.id === selectedPreset);
    const presetText = activePresetObj 
      ? `\n📌 ${activePresetObj.promptSnippet}\n`
      : "";

    let codeAnalysisBlock = "";
    if (presetCodeInput.trim()) {
      const linesCount = presetCodeInput.trim().split("\n").length;
      const containsReact = presetCodeInput.includes("useState") || presetCodeInput.includes("useEffect") || presetCodeInput.includes("react");
      const containsTailwind = presetCodeInput.includes("className=") || presetCodeInput.includes("flex ") || presetCodeInput.includes("grid ");
      const containsLucide = presetCodeInput.includes("lucide-react") || presetCodeInput.includes("lucide");
      const containsFramerMotion = presetCodeInput.includes("motion") || presetCodeInput.includes("framer-motion");
      
      codeAnalysisBlock = `
🔍 [PHÂN TÍCH CHUYÊN SÂU MÃ NGUỒN CUNG CẤP]:
- Độ dài mã nguồn: ${linesCount} dòng.
- Đặc trưng kỹ thuật phát hiện: ${[
        containsReact ? "React hooks & State" : "",
        containsTailwind ? "Tailwind CSS v4 classes" : "",
        containsLucide ? "Biểu tượng Lucide-React" : "",
        containsFramerMotion ? "Chuyển động Framer Motion" : ""
      ].filter(Boolean).join(", ") || "Mã nguồn/HTML thuần"}.
- Yêu cầu chuyển đổi cấu trúc: Phân tích toàn bộ yêu cầu kỹ thuật và trích xuất 100% logic, styles, các hàm xử lý sự kiện, và giao diện từ đoạn mã nguồn dưới đây để tích hợp trực tiếp, đồng bộ vào website:
\`\`\`tsx
${presetCodeInput.trim()}
\`\`\`
`;
    }

    if (mode === "tree") {
      if (actionQueue.length === 0 && !userInstruction.trim() && !selectedPreset && !presetCodeInput.trim()) {
        const promptText = `Hãy thực hiện tối ưu hóa cấu trúc cây đối tượng trên Website:
- 📌 Cấu trúc phân cấp: Toàn bộ 14 Sections và các thẻ con đã được rà soát trong X-Ray Tree View.
- ⚡ YÊU CẦU THỰC HIỆN: Chuẩn hóa lại bố cục, phân cấp thẻ card và hiệu ứng tương tác cho các trang chính.

Vui lòng cập nhật trực tiếp vào mã nguồn của các component liên quan, đảm bảo trích xuất đầy đủ tính năng và hiệu ứng không bỏ sót.`;
        setGeneratedPrompt(promptText);
        return;
      }

      let actionsText = "";
      if (actionQueue.length > 0) {
        actionsText = `\n📋 DANH SÁCH CÁC THAO TÁC CẦN THỰC HIỆN (${actionQueue.length} yêu cầu):\n` +
          actionQueue.map((act, idx) => {
            const typeLabel = act.type === "edit" ? "✏️ [CHỈNH SỬA]" : act.type === "delete" ? "🗑️ [XÓA BỎ]" : act.type === "add" ? "➕ [THÊM MỚI]" : "🔄 [CHUYỂN TRANG]";
            return `${idx + 1}. ${typeLabel} Đối tượng: ${act.targetTitle} (Vị trí: ${act.sectionName} - Selector: \`${act.targetSelector}\`)\n   👉 Chi tiết: ${act.description}${act.targetDestination ? `\n   📍 Đích chuyển đến: #${act.targetDestination}` : ''}`;
          }).join("\n\n");
      }

      const promptText = `Hãy thực hiện các chỉ thị quản lý cấu trúc cây giao diện cho Website:
- 🌐 Phạm vi: Hệ thống Cây Đối tượng Trang web (Tree Structure Management)
${actionsText}
${presetText}
${codeAnalysisBlock}
${userInstruction.trim() ? `\n⚡ GHI CHÚ BỔ SUNG TỔNG THỂ: ${userInstruction.trim()}\n` : ''}
Vui lòng thực thi chính xác vào từng component, đảm bảo mã nguồn chạy được ngay và trích xuất đầy đủ tính năng hiệu ứng không bỏ sót.`;

      setGeneratedPrompt(promptText);

    } else if (mode === "element") {
      if (!selectedElement) return;
      const condensedSnippet = cleanSnippet(selectedElement.textSnippet, 45);

      const promptText = `- Hãy thực hiện thay đổi cho phần tử ${selectedElement.componentType} (<${selectedElement.tag}>) tại vị trí ${selectedElement.sectionName} (Section ID: #${selectedElement.sectionId}) có Selector là \`${selectedElement.fullSelector}\`${selectedElement.id ? ` (#${selectedElement.id})` : ''}${condensedSnippet ? ` và Nội dung nhận dạng là "${condensedSnippet}"` : ''}: Yêu cầu thực thi chi tiết: ${userInstruction.trim() || "Tối ưu hóa và làm đẹp giao diện theo chuẩn thiết kế hiện đại."} (Yêu cầu cập nhật trực tiếp vào mã nguồn tương ứng, mã chạy được ngay và trích xuất đầy đủ tính năng hiệu ứng không bỏ sót).${presetText || codeAnalysisBlock ? `\n${presetText}${codeAnalysisBlock}` : ""}`;

      setGeneratedPrompt(promptText);

    } else {
      // Full Website Mode with selected checkboxes
      const selectedNames = DEFAULT_PAGE_STRUCTURE
        .filter(s => selectedSections.includes(s.sectionId))
        .map(s => `#${s.sectionId} (${s.sectionName})`)
        .join(", ");

      const promptText = `Hãy thực hiện thay đổi cho TOÀN BỘ WEBSITE:
- 🌐 Phạm vi: Toàn bộ dự án Portfolio & Hệ thống giao diện (Full Website Scope)
- 📑 Các phân mục đã chọn áp dụng (${selectedSections.length}/${DEFAULT_PAGE_STRUCTURE.length} phân mục): [${selectedNames || "Chưa chọn phân mục nào - Vui lòng áp dụng toàn website"}]
${presetText}
${codeAnalysisBlock}
- ⚡ LỆNH YÊU CẦU THỰC HIỆN: ${userInstruction.trim() || "Tối ưu hóa tổng thể trải nghiệm người dùng, bảng màu sắc và hiệu ứng chuyển cảnh trên các trang đã chọn."}

Vui lòng áp dụng các thay đổi tổng thể, đồng bộ trên toàn bộ website và các phân mục đã chọn, đảm bảo mã nguồn chạy được ngay và trích xuất đầy đủ tính năng hiệu ứng không bỏ sót.`;

      setGeneratedPrompt(promptText);
    }
  };

  const handleCopyPrompt = () => {
    if (!generatedPrompt) return;
    playUiSound("success");
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredTree = treeStructure.filter(section => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.sectionName.toLowerCase().includes(q) ||
      section.title.toLowerCase().includes(q) ||
      (section.children && section.children.some(c => c.title.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)))
    );
  });

  const isLight = popupTheme === "light";

  return (
    <div id="xray-inspector-ui">
      {/* 2. ACTIVE HUD STATUS BAR */}
      {isActive && !inspectorOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9998] px-4 sm:px-5 py-2 rounded-full bg-slate-950/95 text-white border border-emerald-500/60 shadow-2xl shadow-emerald-500/20 backdrop-blur-md flex items-center gap-2.5 sm:gap-3 animate-in fade-in slide-in-from-top-4 max-w-[92vw]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5 truncate">
            <Scan className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Di chuột để soi & Click đối tượng để tạo lệnh AI</span>
            <span className="sm:hidden">Click đối tượng để tạo lệnh</span>
          </span>

          <button
            onClick={() => {
              playUiSound("click");
              setMode("tree");
              setInspectorOpen(true);
            }}
            className="px-2.5 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors"
          >
            <FolderTree className="w-3 h-3" />
            <span>Cây Đối Tượng</span>
          </button>

          <button
            onClick={() => {
              playUiSound("click");
              setIsActive(false);
            }}
            className="p-1 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors shrink-0"
            title="Đóng X-Ray"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. HOVER BOUNDING BOX & ELEMENT INFO BADGE */}
      {isActive && hoveredElement && !inspectorOpen && (
        <div
          className="fixed pointer-events-none z-[9990] transition-all duration-75"
          style={{
            top: `${hoveredElement.rect.top}px`,
            left: `${hoveredElement.rect.left}px`,
            width: `${hoveredElement.rect.width}px`,
            height: `${hoveredElement.rect.height}px`,
          }}
        >
          {/* Glowing box outline */}
          <div className="w-full h-full border-2 border-emerald-400 bg-emerald-400/10 rounded-sm shadow-[0_0_15px_rgba(52,211,153,0.5)] relative">
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-300" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-300" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-300" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-300" />

            <div 
              className="absolute -top-10 left-0 bg-slate-950/95 text-white border border-emerald-400/80 px-2.5 py-1 rounded-lg text-[11px] font-mono shadow-2xl flex items-center gap-2 whitespace-nowrap z-50 backdrop-blur-md"
              style={{
                top: hoveredElement.rect.top < 45 ? "100%" : "-36px"
              }}
            >
              <span className="font-bold text-emerald-400">{hoveredElement.sectionName}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-semibold">{hoveredElement.componentType}</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-300">&lt;{hoveredElement.tag}&gt;</span>
              <span className="text-slate-400 text-[10px]">
                {Math.round(hoveredElement.rect.width)}x{Math.round(hoveredElement.rect.height)}px
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN X-RAY INSPECTOR POPUP MODAL (WITH LIGHT & DARK THEME SUPPORT) */}
      {inspectorOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div 
            className={cn(
              "w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 max-h-[92vh] border",
              isLight
                ? "bg-white text-slate-900 border-slate-200 shadow-[0_25px_70px_rgba(0,0,0,0.2)]"
                : "bg-slate-900 text-slate-100 border-emerald-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Theme Switcher & Close */}
            <div className={cn(
              "p-3.5 sm:p-4 px-4 sm:px-6 border-b flex items-center justify-between transition-colors",
              isLight ? "bg-slate-50/95 border-slate-200" : "bg-slate-950 border-slate-800"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl border flex items-center justify-center shadow-xs",
                  mode === "tree"
                    ? "bg-indigo-500/20 text-indigo-500 border-indigo-500/30"
                    : mode === "full_website"
                      ? "bg-sky-500/20 text-sky-500 border-sky-500/30"
                      : "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                )}>
                  {mode === "tree" ? <FolderTree className="w-5 h-5" /> : mode === "full_website" ? <Globe className="w-5 h-5" /> : <Scan className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black tracking-tight">
                      X-Ray Inspector • Trình Quản Lý & Xuất Lệnh AI
                    </h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                      isLight ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-indigo-950/60 text-indigo-300 border-indigo-500/30"
                    )}>
                      v3.0 Pro
                    </span>
                  </div>
                  <p className={cn("text-xs", isLight ? "text-slate-500" : "text-slate-400")}>
                    {mode === "tree"
                      ? "Cấu trúc cây đối tượng: Xem danh sách, Chỉnh / Xóa / Thêm / Chuyển và Xuất Prompt"
                      : mode === "full_website"
                        ? "Tạo chỉ thị và prompt tổng thể áp dụng cho toàn bộ cấu trúc website"
                        : "Định danh chính xác phần tử và tạo prompt thay đổi riêng biệt"}
                  </p>
                </div>
              </div>

              {/* Header Right Actions (Popup Theme Toggle & Close) */}
              <div className="flex items-center gap-2">
                {/* Popup Theme Switch Button: Sáng / Tối */}
                <button
                  onClick={() => {
                    playUiSound("switch");
                    setPopupTheme(isLight ? "dark" : "light");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs active:scale-95",
                    isLight 
                      ? "bg-slate-200/80 hover:bg-slate-300 text-slate-800 border-slate-300" 
                      : "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700"
                  )}
                  title={isLight ? "Chuyển sang Giao diện Tối cho popup" : "Chuyển sang Giao diện Sáng cho popup"}
                >
                  {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isLight ? "Bản Sáng" : "Bản Tối"}</span>
                </button>

                <button
                  onClick={() => {
                    playUiSound("click");
                    setInspectorOpen(false);
                    setGeneratedPrompt("");
                  }}
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    isLight ? "text-slate-400 hover:text-slate-900 hover:bg-slate-200" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3 Scope Selection Tabs: [Cấu trúc cây] [Phần tử đã chọn] [Toàn bộ Website] */}
            <div className={cn(
              "flex border-b p-1.5 gap-1.5 transition-colors",
              isLight ? "bg-slate-100/90 border-slate-200" : "bg-slate-950/70 border-slate-800"
            )}>
              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("tree");
                  setGeneratedPrompt("");
                }}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
                  mode === "tree"
                    ? isLight
                      ? "bg-white text-indigo-700 border border-indigo-300 shadow-sm"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <FolderTree className="w-3.5 h-3.5 text-indigo-500" />
                <span>Cấu trúc cây (Tree)</span>
                {actionQueue.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px] font-bold">
                    {actionQueue.length} thao tác
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("element");
                  setGeneratedPrompt("");
                }}
                disabled={!selectedElement}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
                  mode === "element"
                    ? isLight
                      ? "bg-white text-emerald-700 border border-emerald-300 shadow-sm"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-40 disabled:cursor-not-allowed"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                <Crosshair className="w-3.5 h-3.5 text-emerald-500" />
                <span>Phần tử đã chọn</span>
                {selectedElement && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded font-mono",
                    isLight ? "bg-emerald-100 text-emerald-800" : "bg-emerald-500/30 text-emerald-300"
                  )}>
                    &lt;{selectedElement.tag}&gt;
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  playUiSound("click");
                  setMode("full_website");
                  setGeneratedPrompt("");
                }}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
                  mode === "full_website"
                    ? isLight
                      ? "bg-white text-sky-700 border border-sky-300 shadow-sm"
                      : "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                    : isLight
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>Toàn bộ Website</span>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[68vh] custom-scrollbar">

              {/* ================= TAB 1: TREE VIEW (CẤU TRÚC CÂY) ================= */}
              {mode === "tree" && (
                <div className="space-y-4">
                  {/* Top Tree Search & Actions Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                    <div className="w-full sm:w-80 relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm trang hoặc đối tượng..."
                        className={cn(
                          "w-full px-3.5 py-2 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2",
                          isLight
                            ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                            : "bg-slate-950 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-900/40"
                        )}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          playUiSound("click");
                          // Expand all
                          const allKeys: Record<string, boolean> = {};
                          treeStructure.forEach(s => { allKeys[s.id] = true; });
                          setExpandedSections(allKeys);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                          isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        )}
                      >
                        Mở rộng tất cả
                      </button>

                      <button
                        onClick={() => {
                          playUiSound("click");
                          setExpandedSections({});
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                          isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        )}
                      >
                        Thu gọn
                      </button>
                    </div>
                  </div>

                  {/* ACTION QUEUE BADGES (IF ANY PENDING ACTIONS) */}
                  {actionQueue.length > 0 && (
                    <div className={cn(
                      "p-3.5 rounded-xl border space-y-2 animate-in fade-in",
                      isLight ? "bg-indigo-50/70 border-indigo-200" : "bg-indigo-950/40 border-indigo-500/40"
                    )}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                          Danh sách ({actionQueue.length}) thao tác đã đánh dấu:
                        </span>
                        <button
                          onClick={() => {
                            playUiSound("click");
                            setActionQueue([]);
                          }}
                          className="text-[11px] font-bold text-rose-500 hover:underline"
                        >
                          Xóa tất cả thao tác
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {actionQueue.map((act) => (
                          <div
                            key={act.id}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border shadow-xs",
                              isLight ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900 border-slate-700 text-slate-200"
                            )}
                          >
                            <span className={cn(
                              "px-1.5 py-0.2 rounded text-[10px] font-bold uppercase",
                              act.type === "edit" ? "bg-amber-500/20 text-amber-600 dark:text-amber-300" :
                              act.type === "delete" ? "bg-rose-500/20 text-rose-600 dark:text-rose-300" :
                              act.type === "add" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300" :
                              "bg-sky-500/20 text-sky-600 dark:text-sky-300"
                            )}>
                              {act.type === "edit" ? "Chỉnh" : act.type === "delete" ? "Xóa" : act.type === "add" ? "Thêm" : "Chuyển"}
                            </span>
                            <span className="font-semibold">{act.targetTitle}</span>
                            <span className="text-slate-400 text-[11px]">({act.sectionName})</span>
                            <button
                              onClick={() => handleRemoveAction(act.id)}
                              className="text-slate-400 hover:text-rose-500 p-0.5"
                              title="Xóa thao tác này"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TREE LIST CONTAINER */}
                  <div className={cn(
                    "border rounded-2xl p-2 space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar",
                    isLight ? "bg-slate-50/50 border-slate-200" : "bg-slate-950/60 border-slate-800"
                  )}>
                    {filteredTree.map((section) => {
                      const isExpanded = !!expandedSections[section.id];
                      return (
                        <div
                          key={section.id}
                          className={cn(
                            "rounded-xl border transition-all overflow-hidden",
                            isLight ? "bg-white border-slate-200/90 shadow-2xs" : "bg-slate-900/80 border-slate-800/90 shadow-xs"
                          )}
                        >
                          {/* Section Header Row */}
                          <div className={cn(
                            "p-2.5 px-3 flex items-center justify-between gap-2 transition-colors",
                            isLight ? "hover:bg-slate-100/70" : "hover:bg-slate-800/60"
                          )}>
                            <div
                              onClick={() => toggleSectionExpand(section.id)}
                              className="flex items-center gap-2 flex-1 cursor-pointer select-none"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-indigo-500 shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span className="font-bold text-xs sm:text-sm">
                                {section.sectionName}
                              </span>
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.2 rounded font-mono hidden sm:inline",
                                isLight ? "bg-slate-100 text-slate-600 border border-slate-200" : "bg-slate-800 text-slate-400 border border-slate-700"
                              )}>
                                #{section.sectionId}
                              </span>
                              <span className="text-[11px] text-slate-400 font-normal">
                                ({section.children?.length || 0} đối tượng)
                              </span>
                            </div>

                            {/* Section Action Buttons: [Chỉnh] [Xóa] [Thêm] [Chuyển] */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleOpenActionModal(section, "edit")}
                                title="Chỉnh sửa toàn bộ trang này"
                                className="p-1.5 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span className="hidden sm:inline">Chỉnh</span>
                              </button>

                              <button
                                onClick={() => handleOpenActionModal(section, "add")}
                                title="Thêm đối tượng mới vào trang này"
                                className="p-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                              >
                                <PlusCircle className="w-3 h-3" />
                                <span className="hidden sm:inline">Thêm</span>
                              </button>

                              <button
                                onClick={() => handleNavigateToSection(section.sectionId)}
                                title="Nhảy tới xem trang này"
                                className="p-1.5 px-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span className="hidden sm:inline">Xem</span>
                              </button>
                            </div>
                          </div>

                          {/* Sub-children Tree Items */}
                          {isExpanded && section.children && (
                            <div className={cn(
                              "p-2 pt-0 space-y-1.5 border-t",
                              isLight ? "bg-slate-50/50 border-slate-100" : "bg-slate-950/40 border-slate-800/60"
                            )}>
                              {section.children.map((child) => (
                                <div
                                  key={child.id}
                                  className={cn(
                                    "p-2 px-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all",
                                    isLight ? "bg-white border-slate-200 hover:border-indigo-300" : "bg-slate-900/90 border-slate-800 hover:border-indigo-500/50"
                                  )}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                                        {child.title}
                                      </p>
                                      <p className="text-[10px] text-slate-400 font-mono truncate">
                                        &lt;{child.tag}&gt; {child.selector} • <span className="text-indigo-500 font-medium">{child.type}</span>
                                      </p>
                                    </div>
                                  </div>

                                  {/* 4 Action Buttons for Child Item: [Chỉnh] [Xóa] [Thêm] [Chuyển] */}
                                  <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                                    <button
                                      onClick={() => handleOpenActionModal(child, "edit")}
                                      className="p-1 px-2 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1"
                                      title="Chỉnh sửa nội dung / kiểu dáng của đối tượng này"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Chỉnh</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "delete")}
                                      className="p-1 px-2 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-[10px] font-bold flex items-center gap-1"
                                      title="Xóa đối tượng này"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>Xóa</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "add")}
                                      className="p-1 px-2 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1"
                                      title="Thêm đối tượng con bên trong"
                                    >
                                      <PlusCircle className="w-3 h-3" />
                                      <span>Thêm</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenActionModal(child, "move")}
                                      className="p-1 px-2 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-[10px] font-bold flex items-center gap-1"
                                      title="Chuyển qua trang khác hoặc đổi vị trí"
                                    >
                                      <ArrowRightLeft className="w-3 h-3" />
                                      <span>Chuyển</span>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: ELEMENT MODE ================= */}
              {mode === "element" && selectedElement && (
                <div className="space-y-3">
                  <div className={cn(
                    "p-3.5 rounded-xl border space-y-2",
                    isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950/80 border-slate-800"
                  )}>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-300 font-semibold border border-blue-500/30 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {selectedElement.sectionName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-300 font-semibold border border-amber-500/30 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {selectedElement.componentType}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-mono text-[11px] border border-emerald-500/30">
                        &lt;{selectedElement.tag}&gt; {selectedElement.fullSelector}
                      </span>
                    </div>

                    {selectedElement.textSnippet && (
                      <div className="text-xs pt-1 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5">
                        <span className="text-slate-500 font-medium shrink-0">Nội dung:</span>
                        <span className="italic text-emerald-600 dark:text-emerald-300 font-mono bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 truncate">
                          "{cleanSnippet(selectedElement.textSnippet, 45)}"
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================= TAB 3: FULL WEBSITE MODE ================= */}
              {mode === "full_website" && (
                <div className={cn(
                  "p-3.5 rounded-xl border space-y-2.5 animate-in fade-in duration-200",
                  isLight ? "bg-sky-50/60 border-sky-200" : "bg-slate-950/80 border-sky-500/30"
                )}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-500/10 pb-2">
                    <span className="text-xs font-black text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      Hộp kiểm chọn trang áp dụng (Nhấp để bật/tắt):
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setSelectedSections(DEFAULT_PAGE_STRUCTURE.map(s => s.sectionId));
                        }}
                        className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
                      >
                        Chọn tất cả
                      </button>
                      <span className="text-[10px] text-slate-400">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setSelectedSections([]);
                        }}
                        className="text-[10px] font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:underline"
                      >
                        Bỏ chọn tất cả
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] leading-relaxed grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {DEFAULT_PAGE_STRUCTURE.map((sec) => {
                      const isChecked = selectedSections.includes(sec.sectionId);
                      return (
                        <label
                          key={sec.id}
                          className={cn(
                            "p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all duration-200 select-none group",
                            isChecked
                              ? isLight 
                                ? "bg-indigo-50/70 border-indigo-300 text-indigo-950 font-bold shadow-xs scale-[1.01]" 
                                : "bg-indigo-950/40 border-indigo-500/40 text-indigo-200 font-bold shadow-xs scale-[1.01]"
                              : isLight 
                                ? "bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800" 
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              playUiSound("click");
                              if (isChecked) {
                                setSelectedSections(prev => prev.filter(id => id !== sec.sectionId));
                              } else {
                                setSelectedSections(prev => [...prev, sec.sectionId]);
                              }
                            }}
                            className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer accent-indigo-600"
                          />
                          <span className="truncate">{sec.sectionName}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5 MẪU ÁP DỤNG PROMPT CHUYÊN DỤNG */}
              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Chọn Mẫu Áp Dụng Chuyên Dụng (Prompt Preset):</span>
                  </label>
                  {selectedPreset && (
                    <button
                      onClick={() => {
                        playUiSound("click");
                        setSelectedPreset(null);
                      }}
                      className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                    >
                      Bỏ chọn mẫu
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {PRESET_TEMPLATES.map((tmpl) => {
                    const isSelected = selectedPreset === tmpl.id;
                    const IconComp = tmpl.icon;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          if (isSelected) {
                            setSelectedPreset(null);
                          } else {
                            setSelectedPreset(tmpl.id);
                          }
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-1.5 relative group",
                          isSelected
                            ? "bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-pink-500/15 border-indigo-500 ring-2 ring-indigo-500/40 shadow-md scale-[1.01]"
                            : isLight
                              ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                              : "bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-300"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={cn(
                            "p-1.5 rounded-lg border flex items-center justify-center shrink-0",
                            tmpl.badgeColor
                          )}>
                            <IconComp className="w-3.5 h-3.5" />
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-black leading-snug">{tmpl.label}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight mt-0.5">
                            {tmpl.shortDesc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active preset details snippet preview */}
                {selectedPreset && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                    <div className={cn(
                      "p-3 rounded-xl border text-xs leading-relaxed space-y-1",
                      isLight ? "bg-indigo-50/80 border-indigo-200 text-indigo-950" : "bg-indigo-950/40 border-indigo-500/30 text-indigo-200"
                    )}>
                      <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Đã kích hoạt: {PRESET_TEMPLATES.find(p => p.id === selectedPreset)?.label}</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-600 dark:text-slate-300 whitespace-pre-line">
                        {PRESET_TEMPLATES.find(p => p.id === selectedPreset)?.promptSnippet}
                      </p>
                    </div>

                    {/* Specialized code input area */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold flex items-center justify-between text-slate-800 dark:text-slate-200">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="w-4 h-4 text-indigo-500" />
                          Khu vực nhập code (Chuyên dụng để phân tích và áp dụng vào Website):
                        </span>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                          Phân tích mã nguồn
                        </span>
                      </label>
                      <textarea
                        value={presetCodeInput}
                        onChange={(e) => setPresetCodeInput(e.target.value)}
                        placeholder="Hãy dán hoặc viết đoạn code (React, HTML/CSS, CodePen...) tại đây để hệ thống tự động phân tích và tạo prompt tích hợp hoàn chỉnh..."
                        rows={5}
                        className={cn(
                          "w-full border rounded-xl p-3 font-mono text-[11px] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y min-h-[100px]",
                          isLight
                            ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                            : "bg-slate-950 border-slate-700 text-slate-100 focus:border-indigo-500 focus:ring-indigo-900/40"
                        )}
                      />
                      {presetCodeInput.trim() && (
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Hệ thống đã nhận diện được {presetCodeInput.trim().split("\n").length} dòng code và sẽ tự động tạo prompt tích hợp thông minh.</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Instruction Prompt Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    Nhập yêu cầu thực thi hoặc ghi chú bổ sung:
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Tùy chọn</span>
                </label>

                <textarea
                  value={userInstruction}
                  onChange={(e) => setUserInstruction(e.target.value)}
                  placeholder={
                    mode === "tree"
                      ? "Ví dụ: Áp dụng các thay đổi trong danh sách trên, đồng thời làm nổi bật các thẻ tiêu đề và tối ưu khoảng cách..."
                      : mode === "full_website"
                        ? "Ví dụ: Đồng bộ lại tông màu xanh navy cao cấp, thêm hiệu ứng chuyển trang mượt mà..."
                        : "Ví dụ: Đổi màu nút thành xanh ngọc gradient, làm đậm chữ và thêm hiệu ứng hover..."
                  }
                  rows={2}
                  className={cn(
                    "w-full border rounded-xl p-3 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none",
                    isLight
                      ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                      : "bg-slate-950 border-slate-700 text-white focus:border-emerald-500 focus:ring-emerald-900/40"
                  )}
                />
              </div>

              {/* ACTION: GENERATE OR COPY PROMPT BUTTON */}
              <div className="flex items-center gap-3 pt-1">
                {!generatedPrompt ? (
                  <button
                    onClick={handleGeneratePrompt}
                    className="w-full py-3 px-4 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>XUẤT CÂU LỆNH THỰC HIỆN (PROMPT)</span>
                  </button>
                ) : copied ? (
                  <button
                    onClick={() => {
                      playUiSound("click");
                      setInspectorOpen(false);
                      setGeneratedPrompt("");
                    }}
                    className="w-full py-3 px-4 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 bg-rose-600 hover:bg-rose-500 cursor-pointer border border-rose-500 shadow-rose-500/20"
                    title="Đóng toàn bộ màn hình X-Ray ngay"
                  >
                    <X className="w-4 h-4 animate-spin-slow" />
                    <span>ĐÓNG POPUP (CLOSE WINDOW)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleCopyPrompt}
                    className={cn(
                      "w-full py-3 px-4 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-95 cursor-pointer",
                      "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25"
                    )}
                  >
                    <Copy className="w-4 h-4 animate-bounce" />
                    <span>SAO CHÉP PROMPT THỰC HIỆN (COPY)</span>
                  </button>
                )}
              </div>

              {/* GENERATED PROMPT OUTPUT */}
              {generatedPrompt && (
                <div className={cn(
                  "p-3.5 rounded-xl border space-y-2.5 animate-in fade-in slide-in-from-bottom-2",
                  isLight ? "bg-slate-50 border-indigo-300 shadow-sm" : "bg-slate-950 border-emerald-500/40"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Câu Lệnh Prompt AI Đã Tạo Sẵn:
                    </span>

                    <div className="flex items-center gap-2">
                      {copied ? (
                        <button
                          onClick={() => {
                            playUiSound("click");
                            setInspectorOpen(false);
                            setGeneratedPrompt("");
                          }}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-xs active:scale-95 cursor-pointer border border-rose-500 animate-pulse"
                          title="Đóng toàn bộ màn hình X-Ray ngay"
                        >
                          <X className="w-3.5 h-3.5 animate-spin-slow" />
                          <span>Đóng Popup</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleCopyPrompt}
                          className={cn(
                            "flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer",
                            "bg-indigo-600 hover:bg-indigo-500 text-white"
                          )}
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép Prompt</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <pre className={cn(
                    "p-3 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border select-all max-h-56 overflow-y-auto custom-scrollbar",
                    isLight ? "bg-white text-slate-800 border-slate-200" : "bg-slate-900/90 text-slate-200 border-slate-800"
                  )}>
                    {generatedPrompt}
                  </pre>
                  
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic flex items-center gap-1">
                    <Info className="w-3 h-3 text-indigo-500 shrink-0" />
                    Nhấn "Sao chép Prompt" và dán trực tiếp vào khung chat để AI cập nhật trang web cho bạn ngay lập tức!
                  </p>
                </div>
              )}

            </div>

            {/* Footer buttons */}
            <div className={cn(
              "p-3 px-5 border-t flex items-center justify-between text-xs",
              isLight ? "bg-slate-50 border-slate-200 text-slate-500" : "bg-slate-950 border-slate-800 text-slate-400"
            )}>
              <span>Nhấn <kbd className={cn("px-1.5 py-0.5 rounded font-mono", isLight ? "bg-slate-200 text-slate-700" : "bg-slate-800 text-slate-300")}>ESC</kbd> hoặc dấu X để đóng</span>
              <button
                onClick={() => {
                  playUiSound("click");
                  setInspectorOpen(false);
                  setGeneratedPrompt("");
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg font-bold transition-colors cursor-pointer",
                  isLight ? "bg-slate-200 hover:bg-slate-300 text-slate-800" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                )}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ACTION MODAL FOR TREE (CHỈNH / XÓA / THÊM / CHUYỂN) */}
      {modalActionType && selectedTreeItem && (
        <div className="fixed inset-0 z-[10005] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className={cn(
            "w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-5 border space-y-4",
            isLight ? "bg-white text-slate-900 border-slate-300" : "bg-slate-900 text-white border-indigo-500/50"
          )}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "p-2 rounded-xl text-white font-bold",
                  modalActionType === "edit" ? "bg-amber-500" :
                  modalActionType === "delete" ? "bg-rose-500" :
                  modalActionType === "add" ? "bg-emerald-500" : "bg-purple-500"
                )}>
                  {modalActionType === "edit" ? <Edit3 className="w-4 h-4" /> :
                   modalActionType === "delete" ? <Trash2 className="w-4 h-4" /> :
                   modalActionType === "add" ? <PlusCircle className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                </span>
                <div>
                  <h4 className="font-black text-sm uppercase">
                    {modalActionType === "edit" ? "Chỉnh Sửa Đối Tượng" :
                     modalActionType === "delete" ? "Xác Nhận Xóa Đối Tượng" :
                     modalActionType === "add" ? "Thêm Đối Tượng Mới" : "Chuyển Đối Tượng Sang Trang Khác"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                    {selectedTreeItem.title} ({selectedTreeItem.sectionName})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalActionType(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* If Move Action, show Target Destination Selector */}
            {modalActionType === "move" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Chọn trang/phân mục muốn chuyển tới:
                </label>
                <select
                  value={actionDestination}
                  onChange={(e) => setActionDestination(e.target.value)}
                  className={cn(
                    "w-full p-2.5 rounded-xl border text-xs font-bold focus:outline-none",
                    isLight ? "bg-slate-50 border-slate-300 text-slate-900" : "bg-slate-950 border-slate-700 text-white"
                  )}
                >
                  {DEFAULT_PAGE_STRUCTURE.map((s) => (
                    <option key={s.sectionId} value={s.sectionId}>
                      {s.sectionName} (#{s.sectionId})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Instruction Description Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Mô tả chi tiết yêu cầu:
              </label>
              <textarea
                value={actionDescription}
                onChange={(e) => setActionDescription(e.target.value)}
                rows={3}
                className={cn(
                  "w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 resize-none",
                  isLight
                    ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
                    : "bg-slate-950 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-900/40"
                )}
                placeholder="Nhập yêu cầu chỉnh sửa, xóa, thêm mới hoặc di chuyển..."
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setModalActionType(null)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors",
                  isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                )}
              >
                Hủy
              </button>

              <button
                onClick={handleConfirmAction}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-white text-xs font-bold shadow-md transition-all active:scale-95",
                  modalActionType === "edit" ? "bg-amber-600 hover:bg-amber-500" :
                  modalActionType === "delete" ? "bg-rose-600 hover:bg-rose-500" :
                  modalActionType === "add" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-purple-600 hover:bg-purple-500"
                )}
              >
                Xác nhận & Thêm vào danh sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
