import { PageBanner } from "./PageBanner";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Images, 
  Search, 
  Filter, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Building2, 
  Users, 
  Tag, 
  Download, 
  Share2, 
  ZoomIn, 
  Heart,
  Camera,
  Layers,
  Award
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { Masonry } from "./Masonry";

export interface MemoryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  company: string;
  companyId: "all" | "mobifone" | "htvc" | "ved" | "prudential" | "momo" | "finviet" | "v247";
  year: string;
  tag: string;
  tagColor: string;
  description: string;
}

export const MEMORIES_DATA: MemoryPhoto[] = [
  // 1. MOBIFONE (3 photos)
  {
    id: "mobifone-1",
    src: "https://i.ibb.co/ccpzksY8/Mobifone-1.webp",
    alt: "Mobifone-1",
    title: "Tập thể Trung tâm Chăm sóc Khách hàng MobiFone",
    company: "MobiFone Telecom",
    companyId: "mobifone",
    year: "2003 - 2007",
    tag: "Khởi đầu sự nghiệp",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    description: "Những năm tháng đầu tiên rèn giũa kỹ năng nghiệp vụ tổng đài viễn thông chuyên nghiệp tại MobiFone.",
  },
  {
    id: "mobifone-2",
    src: "https://i.ibb.co/nxxj6MK/Mobifone-2.webp",
    alt: "Mobifone-2",
    title: "Kỷ niệm sự kiện & Teambuilding MobiFone",
    company: "MobiFone Telecom",
    companyId: "mobifone",
    year: "2005",
    tag: "Đồng đội & Văn hóa",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    description: "Gắn kết tinh thần đồng đội qua các hoạt động thi đua nâng cao chất lượng phục vụ khách hàng.",
  },
  {
    id: "mobifone-3",
    src: "https://i.ibb.co/TDgZqxG9/Mobifone-3.webp",
    alt: "Mobifone 3",
    title: "Giao lưu nghiệp vụ tổng đài viên MobiFone",
    company: "MobiFone Telecom",
    companyId: "mobifone",
    year: "2006",
    tag: "Vận hành Contact Center",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    description: "Đội ngũ nhân sự tổng đài viên nhiệt huyết luôn túc trực hỗ trợ hàng triệu thuê bao.",
  },

  // 2. HTVC (4 photos)
  {
    id: "htvc-1",
    src: "https://i.ibb.co/B2p35pD3/HTVC-1.webp",
    alt: "HTVC-1",
    title: "Đội ngũ Chăm sóc Khách hàng & Kỹ thuật HTVC",
    company: "HTVC (Truyền hình Cáp HTV)",
    companyId: "htvc",
    year: "2007 - 2011",
    tag: "Truyền hình & PayTV",
    tagColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    description: "Xây dựng hệ thống giải quyết khiếu nại và hỗ trợ kỹ thuật truyền hình cáp đa kênh.",
  },
  {
    id: "htvc-2",
    src: "https://i.ibb.co/5xv8S1Jg/HTVC-2.webp",
    alt: "HTVC-2",
    title: "Họp mặt tổng kết & vinh danh cán bộ CSKH HTVC",
    company: "HTVC (Truyền hình Cáp HTV)",
    companyId: "htvc",
    year: "2008",
    tag: "Vinh danh thành tích",
    tagColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    description: "Ghi nhận đóng góp xuất sắc của tập thể trong công tác nâng cao chỉ số hài lòng thuê bao.",
  },
  {
    id: "htvc-3",
    src: "https://i.ibb.co/gb36C8q2/HTVC-3.webp",
    alt: "HTVC-3",
    title: "Hoạt động dã ngoại gắn kết nhân sự HTVC",
    company: "HTVC (Truyền hình Cáp HTV)",
    companyId: "htvc",
    year: "2009",
    tag: "Gắn kết đội ngũ",
    tagColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    description: "Chương trình dã ngoại tạo năng lượng tích cực và sự đoàn kết vững chắc trong khối vận hành.",
  },
  {
    id: "htvc-4",
    src: "https://i.ibb.co/8LPfg0Pj/HTVC-4.webp",
    alt: "HTVC-4",
    title: "Hội nghị khách hàng & Đối tác HTVC",
    company: "HTVC (Truyền hình Cáp HTV)",
    companyId: "htvc",
    year: "2010",
    tag: "Hội nghị & Khách hàng",
    tagColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
    description: "Đại diện bộ phận CSKH tham gia giao lưu và lắng nghe phản hồi trực tiếp từ người xem đài.",
  },

  // 3. VED (4 photos)
  {
    id: "ved-1",
    src: "https://i.ibb.co/4w9G19mp/VED-1.webp",
    alt: "VED-1",
    title: "Đội ngũ Hỗ trợ Game & Esports VED (Garena)",
    company: "Vietnam Esports (Garena / Sea Group)",
    companyId: "ved",
    year: "2013 - 2016",
    tag: "Esports & Gaming",
    tagColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    description: "Quản trị quy mô hơn 100+ nhân sự hỗ trợ hàng triệu game thủ Liên Minh Huyền Thoại, FIFA Online.",
  },
  {
    id: "ved-2",
    src: "https://i.ibb.co/v6tf80cK/VED-2.webp",
    alt: "VED-2",
    title: "Sự kiện chung kết giải đấu thể thao điện tử VED",
    company: "Vietnam Esports (Garena / Sea Group)",
    companyId: "ved",
    year: "2014",
    tag: "Sự kiện quy mô lớn",
    tagColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    description: "Tổ chức và điều phối bàn hỗ trợ khán giả tại các giải đấu Esports chuyên nghiệp hàng đầu.",
  },
  {
    id: "ved-3",
    src: "https://i.ibb.co/xSrfV69v/VED-3.webp",
    alt: "VED-3",
    title: "Buổi đào tạo nghiệp vụ CSKH chuyên sâu VED",
    company: "Vietnam Esports (Garena / Sea Group)",
    companyId: "ved",
    year: "2015",
    tag: "Đào tạo & Chuẩn hóa",
    tagColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    description: "Huấn luyện quy trình xử lý tài khoản, phòng chống gian lận và tối ưu chỉ số First Contact Resolution.",
  },
  {
    id: "ved-4",
    src: "https://i.ibb.co/V0p3fRZJ/VED-4.webp",
    alt: "VED-4",
    title: "Year End Party & Tri ân đội ngũ CSKH VED",
    company: "Vietnam Esports (Garena / Sea Group)",
    companyId: "ved",
    year: "2015",
    tag: "Văn hóa doanh nghiệp",
    tagColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    description: "Đêm tiệc tri ân tinh thần cống hiến 24/7 của toàn thể chuyên viên hỗ trợ khách hàng.",
  },

  // 4. PRUDENTIAL (7 photos)
  {
    id: "pru-1",
    src: "https://i.ibb.co/SwrMcr8g/Prudential-1.webp",
    alt: "Prudential-1",
    title: "Tập thể Khối Vận hành CSKH Prudential Việt Nam",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2016 - 2018",
    tag: "Bảo hiểm & Tài chính",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Chuẩn hóa dịch vụ chăm sóc khách hàng bảo hiểm nhân thọ theo chuẩn mực tài chính quốc tế.",
  },
  {
    id: "pru-2",
    src: "https://i.ibb.co/rGkTgt0m/Prudential-2.webp",
    alt: "Prudential-2",
    title: "Hội thảo Chiến lược Trải nghiệm Khách hàng Prudential",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2016",
    tag: "Chiến lược CX",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Định hình hành trình trải nghiệm khách hàng số và tối ưu tỷ lệ duy trì hợp đồng bảo hiểm.",
  },
  {
    id: "pru-3",
    src: "https://i.ibb.co/XxRLfCsT/Prudential-3.webp",
    alt: "Prudential-3",
    title: "Chương trình huấn luyện kỹ năng xử lý khiếu nại khó",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2017",
    tag: "Huấn luyện chuyên sâu",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Tập huấn chuyên sâu kỹ năng thấu cảm và giải quyết thỏa đáng quyền lợi bảo hiểm cho khách hàng.",
  },
  {
    id: "pru-4",
    src: "https://i.ibb.co/ycHdr9gG/Prudential-4.webp",
    alt: "Prudential-4",
    title: "Lễ vinh danh cá nhân & tập thể xuất sắc Prudential",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2017",
    tag: "Vinh danh xuất sắc",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Ghi nhận những bước tiến vượt bậc trong việc nâng cao chỉ số NPS toàn khối CSKH.",
  },
  {
    id: "pru-5",
    src: "https://i.ibb.co/ccJWtgwm/Prudential-5.webp",
    alt: "Prudential-5",
    title: "Teambuilding kết nối trái tim Prudential",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2017",
    tag: "Tinh thần đồng đội",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Tăng cường gắn kết giữa các phòng ban Vận hành, CSKH, Thẩm định và Bồi thường.",
  },
  {
    id: "pru-6",
    src: "https://i.ibb.co/7d2qq7t1/Prudential-6.webp",
    alt: "Prudential-6",
    title: "Sự kiện tri ân khách hàng thân thiết Prudential",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2018",
    tag: "Tri ân khách hàng",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Gặp gỡ trực tiếp khách hàng VIP để lắng nghe và nâng tầm chất lượng dịch vụ bảo hiểm.",
  },
  {
    id: "pru-7",
    src: "https://i.ibb.co/F4q3srSB/Prudential-7.webp",
    alt: "Prudential-7",
    title: "Khoảnh khắc kỷ niệm cùng đồng nghiệp Prudential",
    company: "Prudential Vietnam Assurance",
    companyId: "prudential",
    year: "2018",
    tag: "Kỷ niệm đồng nghiệp",
    tagColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    description: "Lưu giữ những kỷ niệm đẹp cùng các cộng sự tâm huyết tại mái nhà Prudential.",
  },

  // 5. MOMO (8 photos)
  {
    id: "momo-1",
    src: "https://i.ibb.co/KzhnSqyv/Momo-1.webp",
    alt: "Momo-1",
    title: "Tập thể Khối Dịch vụ Khách hàng & Vận hành Ví MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2018 - 2023",
    tag: "FinTech Kỳ Lân",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Xây dựng và điều hành bộ máy Contact Center FinTech phục vụ hơn 31 triệu người dùng trên toàn quốc.",
  },
  {
    id: "momo-2",
    src: "https://i.ibb.co/8LS37Pzd/Momo-2.webp",
    alt: "Momo-2",
    title: "Triển khai chiến dịch bão quà Lắc Xì MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2019",
    tag: "Chiến dịch Tết Lắc Xì",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Trực ban chiến dịch cao điểm phục vụ hàng triệu lượt tương tác mỗi giờ an toàn và thông suốt.",
  },
  {
    id: "momo-3",
    src: "https://i.ibb.co/tkvm4qs/Momo-3.webp",
    alt: "Momo-3",
    title: "Ứng dụng AI Chatbot & Omnichannel tại MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2020",
    tag: "Chuyển đổi số AI",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Tự động hóa hơn 60% yêu cầu thường gặp, giúp giảm đáng kể thời gian chờ đợi của khách hàng.",
  },
  {
    id: "momo-4",
    src: "https://i.ibb.co/q3CQJbb8/Momo-4.webp",
    alt: "Momo-4",
    title: "Họp giao ban định kỳ tối ưu quy trình CSKH MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2021",
    tag: "Tối ưu hóa SLA",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Phân tích số liệu dữ liệu lớn (Big Data) để nâng cao tỷ lệ giải quyết triệt để vấn đề ở lần gọi đầu.",
  },
  {
    id: "momo-5",
    src: "https://i.ibb.co/hRzYb2fB/Momo-5.webp",
    alt: "Momo-5",
    title: "Chương trình gắn kết MoMoer & Văn hóa phục vụ",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2021",
    tag: "Văn hóa lấy khách hàng làm trọng tâm",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Lan tỏa tư duy 'Customer First' đến từng nhân sự và chuyên viên hỗ trợ.",
  },
  {
    id: "momo-6",
    src: "https://i.ibb.co/zhWTFjrP/Momo-6.webp",
    alt: "Momo-6",
    title: "Đêm Gala vinh danh chiến binh CSKH MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2022",
    tag: "Gala & Tri ân",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Tôn vinh những cá nhân và đội nhóm xuất sắc giữ vững chuẩn mực dịch vụ cao nhất.",
  },
  {
    id: "momo-7",
    src: "https://i.ibb.co/FqYGZW3q/Momo-7.webp",
    alt: "Momo-7",
    title: "Hoạt động thiện nguyện & trách nhiệm xã hội MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2022",
    tag: "Cộng đồng & Xã hội",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Đồng hành cùng cộng đồng qua các dự án thiện nguyện ý nghĩa trên nền tảng Ví MoMo.",
  },
  {
    id: "momo-8",
    src: "https://i.ibb.co/RkMPwhrG/Momo-8.webp",
    alt: "Momo-8",
    title: "Kỷ niệm 5 năm đồng hành cùng Kỳ lân FinTech MoMo",
    company: "Ví Điện Tử MoMo (M_Service)",
    companyId: "momo",
    year: "2023",
    tag: "Cột mốc tự hào",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    description: "Dấu ấn 5 năm cống hiến xây dựng hệ thống CSKH MoMo đạt chuẩn Top 1 thị trường thanh toán số.",
  },

  // 6. FINVIET / ECO (1 photo)
  {
    id: "finviet-1",
    src: "https://i.ibb.co/5WxKyhV0/Finviet-1.webp",
    alt: "Finviet-1",
    title: "Đội ngũ CSKH & Vận hành Finviet (Ví ECO)",
    company: "Finviet Technology (Ví ECO)",
    companyId: "finviet",
    year: "2023 - 2026",
    tag: "FinTech B2B",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    description: "Tái cấu trúc quy trình, thiết lập hệ thống tổng đài đa kênh phục vụ mạng lưới hơn 50.000 điểm bán.",
  },

  // 7. V247 (5 photos)
  {
    id: "v247-1",
    src: "https://i.ibb.co/9HwPTKGg/V247-1.jpg",
    alt: "V247-1",
    title: "Tập thể đội ngũ Contact Center Quốc tế V247",
    company: "V247 Telecom & Services (USA / VN)",
    companyId: "v247",
    year: "2011 - 2013",
    tag: "Viễn thông Quốc tế",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    description: "Vận hành dịch vụ thoại viễn thông và chăm sóc khách hàng kiều bào 24/7 thị trường Mỹ - Việt Nam.",
  },
  {
    id: "v247-2",
    src: "https://i.ibb.co/vr4hB1m/V247-2.jpg",
    alt: "V247-2",
    title: "Họp chiến lược nâng cao chất lượng đường truyền V247",
    company: "V247 Telecom & Services (USA / VN)",
    companyId: "v247",
    year: "2012",
    tag: "Chất lượng dịch vụ",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    description: "Đảm bảo chất lượng thoại xuyên suốt và bảo mật cao cho hàng triệu cuộc gọi xuyên quốc gia.",
  },
  {
    id: "v247-3",
    src: "https://i.ibb.co/gM7nPptY/V247-3.jpg",
    alt: "V247-3",
    title: "Chương trình đào tạo kỹ năng giao tiếp tiếng Anh V247",
    company: "V247 Telecom & Services (USA / VN)",
    companyId: "v247",
    year: "2012",
    tag: "Ngoại ngữ & Nghiệp vụ",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    description: "Nâng cao năng lực ngoại ngữ và am hiểu văn hóa phục vụ người Việt tại hải ngoại.",
  },
  {
    id: "v247-4",
    src: "https://i.ibb.co/s9gsmSHs/V247-4.jpg",
    alt: "V247-4",
    title: "Sinh hoạt văn hóa & Teambuilding sôi nổi V247",
    company: "V247 Telecom & Services (USA / VN)",
    companyId: "v247",
    year: "2013",
    tag: "Văn hóa & Đời sống",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    description: "Tạo dựng môi trường làm việc cởi mở, sáng tạo và gắn kết như một gia đình lớn.",
  },
  {
    id: "v247-5",
    src: "https://i.ibb.co/WNQkxzYQ/V247-5.jpg",
    alt: "V247-5",
    title: "Lễ tổng kết thành tích xuất sắc cùng ban lãnh đạo V247",
    company: "V247 Telecom & Services (USA / VN)",
    companyId: "v247",
    year: "2013",
    tag: "Thành tựu & Ghi nhận",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    description: "Vinh danh những đóng góp quan trọng trong việc giữ vững vị thế số 1 dịch vụ thoại kiều bào.",
  },
];

export default function Memories() {
  const { lang } = useLanguage();
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});
  const [hoveredPhoto, setHoveredPhoto] = useState<MemoryPhoto | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Deterministic delay map to support randomized fly-up animation of photos on load or filter
  const randomDelayMap = useMemo(() => {
    const map: Record<string, { delay: number; duration: number }> = {};
    MEMORIES_DATA.forEach((photo) => {
      let hash = 0;
      for (let i = 0; i < photo.id.length; i++) {
        hash = photo.id.charCodeAt(i) + ((hash << 5) - hash);
      }
      const delay = 0.05 + (Math.abs(hash) % 8) * 0.05; // 0.05s to 0.4s
      const duration = 0.8 + (Math.abs(hash) % 5) * 0.15; // 0.8s to 1.4s
      map[photo.id] = { delay, duration };
    });
    return map;
  }, []);

  const handleMouseMove = (e: React.MouseEvent, photo: MemoryPhoto) => {
    setMouseCoords({ x: e.clientX, y: e.clientY });
    if (hoveredPhoto?.id !== photo.id) {
      setHoveredPhoto(photo);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPhoto(null);
  };

  // Filter Categories
  const categories = [
    { id: "all", labelVi: "Tất cả ảnh", labelEn: "All Memories", count: 32 },
    { id: "momo", labelVi: "MoMo (8)", labelEn: "MoMo (8)", count: 8 },
    { id: "prudential", labelVi: "Prudential (7)", labelEn: "Prudential (7)", count: 7 },
    { id: "v247", labelVi: "V247 (5)", labelEn: "V247 (5)", count: 5 },
    { id: "ved", labelVi: "VED / Garena (4)", labelEn: "VED / Garena (4)", count: 4 },
    { id: "htvc", labelVi: "HTVC (4)", labelEn: "HTVC (4)", count: 4 },
    { id: "mobifone", labelVi: "MobiFone (3)", labelEn: "MobiFone (3)", count: 3 },
    { id: "finviet", labelVi: "Finviet / ECO (1)", labelEn: "Finviet / ECO (1)", count: 1 },
  ];

  // Filter Photos
  const filteredPhotos = useMemo(() => {
    return MEMORIES_DATA.filter((photo) => {
      const matchesCompany = selectedCompany === "all" || photo.companyId === selectedCompany;
      const matchesSearch = 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.year.includes(searchQuery) ||
        photo.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCompany && matchesSearch;
    });
  }, [selectedCompany, searchQuery]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === "Escape") {
        setActivePhoto(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, filteredPhotos]);

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % filteredPhotos.length;
      setActivePhoto(filteredPhotos[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setActivePhoto(filteredPhotos[prevIndex]);
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="memories" className="relative min-h-full flex flex-col items-center justify-start w-full text-slate-800 dark:text-slate-100 px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-[10px]">
      <div className="w-full max-w-7xl mx-auto mb-[10px]">
        <PageBanner 
          title={lang === "vi" ? "Kỷ niệm hành trình" : "Cherished team career memories"}
          subtitle={lang === "vi" ? "Những khoảnh khắc đáng nhớ, dấu ấn đồng đội và hành trình gắn kết qua từng giai đoạn phát triển." : "Cherished moments, team camaraderie, and memorable milestones through the years."}
          tag={lang === "vi" ? "KỶ NIỆM" : "GALLERY"}
          iconType="memories"
          gradient="from-rose-950 via-pink-950 to-purple-950"
          rightContent={
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="flex items-center gap-2 p-1 rounded-xl bg-black/25 border border-white/20 backdrop-blur-md">
                <div className="px-2.5 py-1 rounded-lg bg-white/10 text-center">
                  <span className="block text-xs sm:text-sm font-black text-white leading-tight">32</span>
                  <span className="text-[9px] text-pink-200 font-bold uppercase tracking-wider">{lang === "vi" ? "Hình ảnh" : "Photos"}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-white/10 text-center">
                  <span className="block text-xs sm:text-sm font-black text-white leading-tight">7</span>
                  <span className="text-[9px] text-pink-200 font-bold uppercase tracking-wider">{lang === "vi" ? "Doanh nghiệp" : "Companies"}</span>
                </div>
              </div>
            </div>
          }
        >
          {/* Banner Controls Row: Category Filter Pills + Search Box */}
          <div className="w-full pt-3 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => {
                const isActive = selectedCompany === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playUiSound("click");
                      setSelectedCompany(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-white text-slate-900 shadow-md font-black ring-1 ring-white"
                        : "bg-white/15 text-white hover:bg-white/25 hover:text-white border border-white/20 backdrop-blur-md"
                    }`}
                  >
                    <span>{lang === "vi" ? cat.labelVi : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "vi" ? "Tìm theo tên, công ty, năm..." : "Search photos, company, year..."}
                className="w-full pl-8.5 pr-8 py-1.5 rounded-xl bg-white/15 border border-white/20 text-xs text-white placeholder:text-white/60 outline-none focus:border-white/50 focus:ring-2 focus:ring-sky-400/50 transition-all shadow-inner backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </PageBanner>
      </div>
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 md:px-6 space-y-4 sm:space-y-6">

        {/* 2. PINTEREST / MASONRY PHOTO GRID */}
        {filteredPhotos.length > 0 ? (
          <Masonry<MemoryPhoto>
            items={filteredPhotos}
            keyExtractor={(photo: MemoryPhoto) => photo.id}
            gap={10}
            columns={{ 0: 1, 640: 2, 768: 3, 1024: 4 }}
            renderItem={(photo: MemoryPhoto, index: number) => {
              const isLiked = likedPhotos[photo.id];
              const anim = randomDelayMap[photo.id] || { delay: 0.1, duration: 1.0 };
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: anim.duration, 
                    delay: anim.delay, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                  onClick={() => setActivePhoto(photo)}
                  onMouseMove={(e) => handleMouseMove(e, photo)}
                  onMouseLeave={handleMouseLeave}
                  className="min-w-0 group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Photo Container - Thẻ chỉ hiển thị hình ảnh ban đầu */}
                  <div className="relative overflow-hidden w-full bg-slate-100 dark:bg-slate-800">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 z-10" />

                    {/* Top Floating Badges (Trượt xuống khi hover) */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 ease-out z-20">
                      <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold shadow-sm">
                        {photo.year}
                      </span>
                      <button
                        onClick={(e) => toggleLike(photo.id, e)}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                          isLiked 
                            ? "bg-rose-600 text-white" 
                            : "bg-black/50 text-white hover:bg-rose-600"
                        }`}
                        title="Yêu thích"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Bottom Floating Info on Hover (Trượt từ dưới lên kèm nội dung chi tiết) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 text-white space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border truncate ${photo.tagColor}`}>
                          {photo.tag}
                        </span>
                        <span className="text-[10px] font-bold text-slate-300 shrink-0">
                          {photo.year}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-300">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate uppercase tracking-wider">{photo.company}</span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-black text-white leading-snug drop-shadow-sm">
                        {photo.title}
                      </h4>

                      <p className="text-[11px] text-slate-200 line-clamp-3 leading-relaxed font-medium">
                        {photo.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            }}
          />
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {lang === "vi" ? "Không tìm thấy hình ảnh phù hợp" : "No memories found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {lang === "vi" 
                ? `Không có kết quả nào cho "${searchQuery}". Vui lòng thử tìm kiếm với từ khóa khác.` 
                : `No results matching "${searchQuery}". Please try another keyword.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCompany("all");
              }}
              className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              {lang === "vi" ? "Xem tất cả hình ảnh" : "View all photos"}
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. FULLSCREEN / LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-5xl max-h-[95vh] rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Prev Navigation button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-blue-600 text-white transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title="Ảnh trước (Mũi tên trái)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Navigation button */}
            <button
              onClick={handleNext}
              className="absolute right-3 md:right-[340px] top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-blue-600 text-white transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title="Ảnh tiếp theo (Mũi tên phải)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image Area */}
            <div className="flex-1 bg-black flex items-center justify-center p-2 sm:p-6 min-h-[300px] md:min-h-[520px] max-h-[60vh] md:max-h-[85vh] overflow-hidden">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Side Details Sidebar */}
            <div className="w-full md:w-80 lg:w-96 p-4 sm:p-6 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[85vh] custom-scrollbar">
              
              <div className="space-y-3.5">
                
                {/* Company & Year Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-black">
                    {activePhoto.year}
                  </span>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border ${activePhoto.tagColor}`}>
                    {activePhoto.tag}
                  </span>
                </div>

                {/* Title & Company */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{activePhoto.company}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    {activePhoto.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed space-y-2">
                  <p>{activePhoto.description}</p>
                </div>

                {/* Photo Details List */}
                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span>Đơn vị:</span>
                    <span className="font-bold text-slate-200">{activePhoto.company}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thời gian ghi dấu:</span>
                    <span className="font-bold text-slate-200">{activePhoto.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Danh mục:</span>
                    <span className="font-bold text-slate-200">{activePhoto.tag}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
                <a
                  href={activePhoto.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem ảnh gốc HD</span>
                </a>

                <button
                  onClick={(e) => toggleLike(activePhoto.id, e)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    likedPhotos[activePhoto.id]
                      ? "bg-rose-600 border-rose-500 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                  }`}
                  title="Yêu thích"
                >
                  <Heart className={`w-4 h-4 ${likedPhotos[activePhoto.id] ? "fill-current" : ""}`} />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Floating Cursor Information Tooltip */}
      {hoveredPhoto && (
        <div 
          className="fixed pointer-events-none z-[9999] bg-slate-950/95 text-white backdrop-blur-md border border-white/25 rounded-2xl p-3.5 shadow-2xl max-w-xs transition-all duration-75 ease-out flex flex-col gap-1.5"
          style={{ 
            left: mouseCoords.x + 18, 
            top: mouseCoords.y + 18 
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-400 uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>{hoveredPhoto.company}</span>
          </div>
          <h4 className="text-xs font-extrabold text-white leading-snug">
            {hoveredPhoto.title}
          </h4>
          <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
            {hoveredPhoto.description}
          </p>
          <div className="flex items-center justify-between mt-0.5 pt-1.5 border-t border-white/10 text-[9px] font-bold text-slate-400">
            <span>Mốc: {hoveredPhoto.year}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/20">{hoveredPhoto.tag}</span>
          </div>
        </div>
      )}

    </section>
  );
}
