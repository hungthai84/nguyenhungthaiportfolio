import React, { useState } from "react";
import { 
  History, 
  LayoutGrid, 
  Calendar, 
  Users, 
  Star, 
  Gamepad2, 
  MapPin, 
  Trophy, 
  ClipboardList, 
  GitFork, 
  ShieldCheck, 
  Folder, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Quote, 
  ChevronRight, 
  ChevronLeft,
  Award, 
  Building2, 
  Image as ImageIcon,
  Check,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingUp,
  UserCheck,
  ExternalLink,
  X,
  Maximize2,
  PhoneCall,
  Globe,
  Monitor,
  Rocket,
  Play,
  Flag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";
import { useTheme } from "../context/ThemeContext";
import { PageBanner } from "./PageBanner";
import { cn } from "../lib/utils";
import WebsiteGradientIcon from "./WebsiteGradientIcon";

// Card item structure for the main timeline display matching image.png
interface TimelineCardItem {
  key: string;
  yearDisplay: string;
  yearsDuration: string;
  badgeStyle: string;
  dotColor: string; // Tailwind color class for node dot
  logoUrl: string;
  companyName: string;
  title: string;
  paragraphs: string[];
}

const TIMELINE_CARDS: TimelineCardItem[] = [
  {
    key: "2003",
    yearDisplay: "2003",
    yearsDuration: "4 năm",
    badgeStyle: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-purple-500/30",
    dotColor: "bg-purple-600 border-purple-300 ring-purple-200",
    logoUrl: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    companyName: "MobiFone (Ánh Hào Quang)",
    title: "Khởi đầu tại MobiFone",
    paragraphs: [
      "Tôi bắt đầu sự nghiệp tại MobiFone, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông.",
      "Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ."
    ]
  },
  {
    key: "2007",
    yearDisplay: "2007",
    yearsDuration: "4 năm",
    badgeStyle: "bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400 shadow-pink-500/30",
    dotColor: "bg-pink-600 border-pink-300 ring-pink-200",
    logoUrl: "https://i.ibb.co/QvtbdnfP/V247.png",
    companyName: "Viễn Liên V247",
    title: "Phát triển năng lực quản lý tại Viễn Liên V247",
    paragraphs: [
      "Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng.",
      "Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với quy mô lớn và xây dựng các chỉ số đánh giá chất lượng dịch vụ."
    ]
  },
  {
    key: "2011",
    yearDisplay: "2011",
    yearsDuration: "2 năm",
    badgeStyle: "bg-gradient-to-r from-purple-600 to-violet-600 text-white border-purple-400 shadow-purple-500/30",
    dotColor: "bg-purple-600 border-purple-300 ring-purple-200",
    logoUrl: "https://i.ibb.co/tpG5fMrt/LBC.png",
    companyName: "LBC (HTVC)",
    title: "Bước ngoặt tại LBC – Truyền hình Cáp HTV",
    paragraphs: [
      "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng.",
      "Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một nhà quản trị toàn diện: trực tiếp điều hành hoạt động phòng ban, xây dựng & chuẩn hóa quy trình, phát triển đội ngũ, thiết lập KPI và nâng cao chất lượng dịch vụ."
    ]
  },
  {
    key: "2013",
    yearDisplay: "2013",
    yearsDuration: "3 năm",
    badgeStyle: "bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 shadow-red-500/30",
    dotColor: "bg-red-600 border-red-300 ring-red-200",
    logoUrl: "https://i.ibb.co/fYPJLfbw/VED.png",
    companyName: "VED (Garena, Shopee)",
    title: "Garena và hành trình chuyển đổi số",
    paragraphs: [
      "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến với tốc độ xử lý nhanh, độ chính xác cao và quy mô khách hàng rất lớn.",
      "Đồng hành cùng các dự án mở rộng: Vietnam eSport, Shopee, AirPay, Gcafe, Liên Quân Mobile... trực tiếp quản lý 130 nhân sự, chuẩn hóa quy trình và đào tạo nguồn nhân lực kế thừa."
    ]
  },
  {
    key: "2016",
    yearDisplay: "2016",
    yearsDuration: "2 năm",
    badgeStyle: "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-400 shadow-teal-500/30",
    dotColor: "bg-teal-600 border-teal-300 ring-teal-200",
    logoUrl: "https://i.ibb.co/XfpQphWF/Prudential.png",
    companyName: "Prudential Việt Nam",
    title: "Prudential Việt Nam",
    paragraphs: [
      "Tại Prudential, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao.",
      "Thời gian này giúp tôi hiểu sâu hơn về quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững qua quy trình chuyên nghiệp."
    ]
  },
  {
    key: "2018",
    yearDisplay: "2018",
    yearsDuration: "3 năm",
    badgeStyle: "bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white border-pink-400 shadow-pink-500/30",
    dotColor: "bg-pink-600 border-pink-300 ring-pink-200",
    logoUrl: "https://i.ibb.co/k2QtrgTw/Momo.png",
    companyName: "MoMo (Mservice)",
    title: "Ví điện tử MoMo",
    paragraphs: [
      "Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số.",
      "Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số."
    ]
  },
  {
    key: "2023",
    yearDisplay: "2023",
    yearsDuration: "1 năm",
    badgeStyle: "bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-400 shadow-amber-500/30",
    dotColor: "bg-amber-600 border-amber-300 ring-amber-200",
    logoUrl: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    companyName: "Finviet (Ví ECO)",
    title: "Ví ECO - Finviet",
    paragraphs: [
      "Tại Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy.",
      "Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng."
    ]
  },
  {
    key: "2026",
    yearDisplay: "2026+",
    yearsDuration: "Hiện tại",
    badgeStyle: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-400 shadow-blue-500/30",
    dotColor: "bg-blue-600 border-blue-300 ring-blue-200",
    logoUrl: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
    companyName: "Sẵn sàng thử thách mới",
    title: "Sẵn sàng cho thử thách mới (2026+)",
    paragraphs: [
      "Sẵn sàng đảm nhận vị trí Trưởng phòng Dịch vụ Khách hàng (Head of CS) hoặc Giám đốc Trải nghiệm Khách hàng (CS Director) tại các doanh nghiệp Công nghệ, FinTech, Bảo hiểm.",
      "Định hướng ứng dụng AI Bot, tự động hóa CRM và nâng tầm trải nghiệm khách hàng xuất sắc."
    ]
  }
];

// Milestone definition interface
export interface Milestone {
  year: string;
  period: string;
  company: string;
  subCompanies?: string;
  tag: string;
  tagColor: string;
  logo: string;
  logoType?: "img" | "text";
  logoBg?: string;
  borderStyle?: string;
  headerTitle: string;
  paragraphs: string[];
  headcount: number;
  role: string;
  roleSub: string;
  industry: string;
  duration: string;
  location: string;
  managementItems: { label: string; value: string }[];
  kpis: { label: string; percent: number }[];
  tasks: string[];
  projects: string[];
  commitments: string[];
  photosCount: number;
  photoUrl: string;
}

const MILESTONES_DATA: Record<string, Milestone> = {
  "2003": {
    year: "2003",
    period: "Từ Năm 2003 đến Năm 2007 (2003 - 2007)",
    company: "Công ty Viễn Thông Mobifone (Cty Ánh Hào Quang)",
    subCompanies: "(Cty Ánh Hào Quang)",
    tag: "Viễn thông",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    headerTitle: "Năm 2003 – Khởi đầu tại MobiFone",
    paragraphs: [
      "Tôi bắt đầu sự nghiệp tại MobiFone, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông. Đây là nền tảng giúp tôi hình thành tư duy lấy khách hàng làm trung tâm và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ."
    ],
    headcount: 12,
    role: "Tổng đài viên (Trưởng nhóm từ 2007)",
    roleSub: "Tư vấn & Giải quyết Khiếu nại",
    industry: "Viễn thông",
    duration: "2003 – 2007 (4 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Tổng đài viên (Trưởng nhóm từ 2007)" },
      { label: "Thời gian công tác:", value: "Từ Năm 2003 đến Năm 2007 (2003 - 2007)" },
      { label: "Quy mô nhân sự:", value: "12 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "Viễn thông" }
    ],
    kpis: [
      { label: "Hoàn thành nhiệm vụ", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 90 }
    ],
    tasks: [
      "Nghe điện thoại tư vấn trả lời khách hàng",
      "Giải quyết khiếu nại trường hợp khó",
      "Gọi điện tư vấn những phiếu đã hoàn thành xong",
      "Hỗ trợ các nhân viên mới nghiệp vụ",
      "Xử lý các cuộc gọi quấy rối từ khách hàng",
      "Quản lý đội ngũ 12 nhân viên CSKH"
    ],
    projects: [
      "Đào tạo nghiệp vụ nhân viên mới",
      "Bổ nhiệm Trưởng nhóm CSKH"
    ],
    commitments: [
      "100% Hoàn thành công việc xuất sắc",
      "90% Trả lời và hỗ trợ khách hàng hài lòng"
    ],
    photosCount: 3,
    photoUrl: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp"
  },
  "2007": {
    year: "2007",
    period: "Từ Năm 2007 đến Năm 2011 (2007 - 2011)",
    company: "Công ty Viễn Liên V247 (Điện thoại V247)",
    subCompanies: "(Điện thoại V247)",
    tag: "Viễn thông",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    headerTitle: "Năm 2007 – Phát triển năng lực quản lý tại Viễn Liên V247",
    paragraphs: [
      "Gia nhập Viễn Liên V247, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với quy mô lớn và xây dựng các chỉ số đánh giá chất lượng dịch vụ."
    ],
    headcount: 12,
    role: "Trưởng Nhóm CSKH",
    roleSub: "Trưởng Nhóm CSKH & Giám sát Vận hành",
    industry: "Viễn thông",
    duration: "2007 – 2011 (4 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Trưởng Nhóm CSKH" },
      { label: "Thời gian công tác:", value: "Từ Năm 2007 đến Năm 2011 (2007 - 2011)" },
      { label: "Quy mô nhân sự:", value: "12 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "Viễn thông" }
    ],
    kpis: [
      { label: "Hướng dẫn nhân viên mới", percent: 96 },
      { label: "Biên soạn tài liệu", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 }
    ],
    tasks: [
      "Quản lý và giám sát đội ngũ chăm sóc khách hàng",
      "Theo dõi, phân bổ và phân phối cuộc gọi đến cho các thành viên",
      "Đánh giá và huấn luyện nhân viên chăm sóc khách hàng",
      "Lập kế hoạch và lịch trình chăm sóc khách hàng (giờ ăn trưa, cuối tuần)",
      "Xử lý những trở ngại của nhân viên",
      "Quản lý và xử lý yêu cầu khách hàng từ đa kênh (Email, Fax, Phone, Chat)",
      "Khảo sát sự hài lòng của khách hàng",
      "Nghe ghi âm cuộc gọi và định hướng đào tạo"
    ],
    projects: [
      "Quản lý vận hành dịch vụ đa kênh",
      "Thiết lập khung đánh giá ghi âm cuộc gọi"
    ],
    commitments: [
      "100% Biên soạn tài liệu hướng dẫn quy trình CSKH",
      "96% Đạt hiệu quả hướng dẫn nhân sự mới"
    ],
    photosCount: 5,
    photoUrl: "https://i.ibb.co/gM7nPptY/V247-3.jpg"
  },
  "2011": {
    year: "2011",
    period: "Từ Năm 2011 đến Năm 2013 (2011 - 2013)",
    company: "Công ty CPTTBR Cuộc Sống LBC (Truyền hình cáp HTVC)",
    subCompanies: "(Truyền hình cáp HTVC)",
    tag: "Truyền thông",
    tagColor: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
    logo: "https://i.ibb.co/tpG5fMrt/LBC.png",
    headerTitle: "Năm 2011 – Bước ngoặt tại LBC – Truyền hình Cáp HTV",
    paragraphs: [
      "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí Trưởng phòng Chăm sóc Khách hàng.",
      "Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một nhà quản trị toàn diện. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập hệ thống KPI, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành.",
      "Chính giai đoạn này đã giúp tôi hình thành tư duy quản trị hệ thống và phát triển con người song song với mục tiêu kinh doanh."
    ],
    headcount: 12,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Quản trị Toàn diện P.CSKH",
    industry: "Truyền thông",
    duration: "2011 – 2013 (2 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Trưởng Phòng Dịch vụ Khách hàng" },
      { label: "Thời gian công tác:", value: "Từ Năm 2011 đến Năm 2013 (2011 - 2013)" },
      { label: "Quy mô nhân sự:", value: "12 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "Truyền thông" }
    ],
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Tham gia dự án", percent: 80 }
    ],
    tasks: [
      "Quản lý và giám sát Phòng Dịch Vụ Khách Hàng",
      "Xử lý khiếu nại của khách hàng và cải thiện sản phẩm",
      "Đào tạo và huấn luyện Nhân Viên",
      "Khảo sát sự hài lòng của khách hàng",
      "Phối hợp các phòng ban thực hiện chương trình quảng cáo, khuyến mãi",
      "Theo dõi và phân tích hoạt động Dịch Vụ Khách Hàng của đối thủ cạnh tranh",
      "Lập kế hoạch thăm hỏi khách hàng VIP, đại lý",
      "Ghi nhận ý kiến khách hàng để cải tiến công việc"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Thúc đẩy cải tiến sản phẩm",
      "Chuẩn hóa quy trình CSKH",
      "Quản lý chiến dịch Outbound",
      "Phân tích & Báo cáo"
    ],
    commitments: [
      "100% Chuẩn hóa quy trình CSKH Truyền hình cáp HTVC",
      "Tối ưu ngân sách CSKH và chăm sóc chu đáo khách hàng VIP"
    ],
    photosCount: 4,
    photoUrl: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp"
  },
  "2013": {
    year: "2013",
    period: "Từ Năm 2013 đến Năm 2016 (2013 - 2016)",
    company: "Công ty Cổ Phần Việt Nam eSport (VED, Shopee, Garena, ShopeePay)",
    subCompanies: "(VED, Shopee, Garena, ShopeePay)",
    tag: "eSport & Game",
    tagColor: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
    logo: "https://i.ibb.co/fYPJLfbw/VED.png",
    headerTitle: "Năm 2013 – Garena và hành trình chuyển đổi số",
    paragraphs: [
      "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn.",
      "Trong thời gian này, Garena phát triển mạnh với Liên Minh Huyền Thoại, đồng thời mở rộng thành Vietnam eSport và đầu tư vào nhiều lĩnh vực mới như Shopee, AirPay, Gcafe và Liên Quân Mobile.",
      "Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi sản phẩm đều có mô hình vận hành, hành vi người dùng và kỳ vọng khách hàng khác nhau, buộc tôi phải liên tục học hỏi, thích nghi và cập nhật kiến thức để xây dựng các quy trình chăm sóc khách hàng phù hợp với từng lĩnh vực.",
      "Đặc biệt, việc tham gia vào giai đoạn phát triển ban đầu của Shopee giúp tôi tiếp cận tư duy quản trị thương mại điện tử hiện đại, từ hành trình khách hàng, trải nghiệm đa kênh, vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
      "Tại Garena, tôi trực tiếp quản lý 130 nhân sự, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, thiết lập hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa.",
      "Làm việc trong môi trường tăng trưởng với tốc độ rất cao giúp tôi rèn luyện khả năng ra quyết định dưới áp lực, xử lý nhanh các tình huống phát sinh, điều phối nguồn lực hiệu quả và liên tục cải tiến quy trình để đáp ứng sự thay đổi của thị trường.",
      "Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: xây dựng hệ thống trước khi mở rộng quy mô, phát triển con người song hành cùng công nghệ và luôn lấy khách hàng làm trung tâm trong mọi quyết định."
    ],
    headcount: 130,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Chăm sóc Khách hàng & Vận hành Dịch vụ",
    industry: "eSport & Game",
    duration: "2013 – 2016 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Trưởng Phòng Dịch vụ Khách hàng" },
      { label: "Thời gian công tác:", value: "Từ Năm 2013 đến Năm 2016 (2013 - 2016)" },
      { label: "Quy mô nhân sự:", value: "130 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "eSport & Game" }
    ],
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Tham gia dự án", percent: 80 }
    ],
    tasks: [
      "Tham gia xây dựng các dự án Sản phẩm mới",
      "Quản lý Đội ngũ và tổ chức Phòng Dịch Vụ Khách Hàng",
      "Xây dựng Quy trình tại Phòng Dịch Vụ Khách Hàng",
      "Xây dựng hệ thống CRM cho các dòng sản phẩm của Cty",
      "Đào tạo đội ngũ Dịch Vụ Khách Hàng và Giao tiếp với khách hàng",
      "Báo cáo tình hình Phòng Dịch Vụ Khách Hàng hàng tháng",
      "Giải quyết Khiếu nại đơn hàng",
      "Đánh giá và tham gia các chương trình MKT",
      "Kiểm tra và đánh giá sản phẩm trước khi cung cấp"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Quản lý dự án CSKH",
      "Chuẩn hóa quy trình CSKH",
      "Xây dựng hệ thống CRM",
      "Phát triển đào tạo trực tuyến",
      "Thành lập Trung tâm Hỗ trợ Khách hàng"
    ],
    commitments: [
      "Xây dựng hệ thống CSKH quy mô lớn hơn 130 nhân sự",
      "Chuẩn hóa 100% quy trình và đào tạo nguồn nhân lực kế thừa"
    ],
    photosCount: 4,
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp"
  },
  "2016": {
    year: "2016",
    period: "Từ Năm 2016 đến Năm 2018 (2016 - 2018)",
    company: "Công ty Bảo hiểm nhân thọ Prudential (Khu vực Việt Nam)",
    subCompanies: "(Prudential Việt Nam)",
    tag: "Bảo hiểm",
    tagColor: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    headerTitle: "Năm 2016 – Prudential Việt Nam",
    paragraphs: [
      "Tại Prudential, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao.",
      "Thời gian này giúp tôi hiểu sâu hơn về quản trị trải nghiệm khách hàng, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự đồng cảm trong từng điểm chạm với khách hàng."
    ],
    headcount: 12,
    role: "Trưởng Phòng CallCenter",
    roleSub: "CallCenter Leadership",
    industry: "Bảo hiểm",
    duration: "2016 – 2018 (2 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Trưởng Phòng CallCenter" },
      { label: "Thời gian công tác:", value: "Từ Năm 2016 đến Năm 2018 (2016 - 2018)" },
      { label: "Quy mô nhân sự:", value: "12 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "Bảo hiểm" }
    ],
    kpis: [
      { label: "Quản lý Call Center", percent: 90 },
      { label: "Thương mại điện tử BH", percent: 80 },
      { label: "Mua bảo hiểm trực tuyến", percent: 75 }
    ],
    tasks: [
      "Quản lý hệ thống Callcenter của Prudential",
      "Sắp xếp nhân sự cho hệ thống mới",
      "Xây dựng và phối hợp đưa E-commerce kết nối hệ thống Callcenter",
      "Xây dựng quy trình quản trị tư vấn qua kênh Videocall",
      "Xây dựng và chỉnh sửa lại hệ thống BCP",
      "Phối hợp giải quyết quyền lợi đáo hạn và bảo hiểm khách hàng"
    ],
    projects: [
      "Quản lý dự án CSKH",
      "Thúc đẩy cải tiến sản phẩm",
      "Tối ưu hóa kênh hỗ trợ",
      "Triển khai tự động hóa"
    ],
    commitments: [
      "Quản lý tổng đài Callcenter bảo hiểm chuẩn mực",
      "Tiên phong triển khai kênh tư vấn Videocall & E-commerce"
    ],
    photosCount: 7,
    photoUrl: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp"
  },
  "2018": {
    year: "2018",
    period: "Từ Năm 2018 đến Năm 2021 (2018 - 2021)",
    company: "Công ty Cổ Phần Mservice (Ví điện tử MoMo)",
    subCompanies: "(Ví điện tử MoMo)",
    tag: "FinTech",
    tagColor: "bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    headerTitle: "Năm 2018 – MoMo",
    paragraphs: [
      "Gia nhập MoMo, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số.",
      "Tôi tập trung tối ưu quy trình hỗ trợ khách hàng, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số."
    ],
    headcount: 60,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Quản lý CSKH Đa kênh & BPO",
    industry: "FinTech",
    duration: "2018 – 2021 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Trưởng Phòng Dịch vụ Khách hàng" },
      { label: "Thời gian công tác:", value: "Từ Năm 2018 đến Năm 2021 (2018 - 2021)" },
      { label: "Quy mô nhân sự:", value: "60 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "FinTech" }
    ],
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Hỗ trợ cộng đồng", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Hoàn thành dự án", percent: 80 }
    ],
    tasks: [
      "Quản lý phòng Dịch Vụ Khách Hàng đa kênh (Ví điện tử MoMo)",
      "Xây dựng hệ thống CRM - Quan hệ khách hàng",
      "Xây dựng và cải thiện quy trình phối hợp cùng pháp lý",
      "Đào tạo và cải thiện khả năng Dịch Vụ Khách Hàng của nhân viên",
      "Chịu trách nhiệm toàn bộ KPIs của phòng",
      "Đánh giá và nâng cấp trải nghiệm khách hàng",
      "Hỗ trợ đối tác và tham gia dự án kết nối Ví điện tử",
      "Thành lập trung tâm hỗ trợ khách hàng",
      "Quản lý BPO – Mắt Bảo"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Quản lý dự án CSKH",
      "Thúc đẩy cải tiến sản phẩm",
      "Chuẩn hóa quy trình CSKH",
      "Triển khai tự động hóa",
      "Xây dựng hệ thống CRM",
      "Phân tích & Báo cáo",
      "Khảo sát & Đánh giá khách hàng",
      "Thành lập Trung tâm Hỗ trợ Khách hàng"
    ],
    commitments: [
      "100% Chuẩn hóa quy trình CSKH ví điện tử hàng đầu",
      "Quản lý hiệu quả hệ thống BPO Mắt Bảo và đội ngũ CRM nội bộ"
    ],
    photosCount: 8,
    photoUrl: "https://i.ibb.co/S7ySGnvC/Momo-1.webp"
  },
  "2023": {
    year: "2023",
    period: "Từ Năm 2023 đến Năm 2024 (2023 - 2024)",
    company: "Công ty Cổ Phần Công Nghệ Finviet (Ví điện tử ECO)",
    subCompanies: "(Ví điện tử ECO)",
    tag: "FinTech",
    tagColor: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    headerTitle: "Năm 2023 – Ví ECO",
    paragraphs: [
      "Tại Ví ECO, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy.",
      "Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng hệ thống dịch vụ khách hàng hiện đại, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng."
    ],
    headcount: 17,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Quản lý & Giám sát Vận hành CSKH",
    industry: "FinTech",
    duration: "2023 – 2024 (1 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Trưởng Phòng Dịch vụ Khách hàng" },
      { label: "Thời gian công tác:", value: "Từ Năm 2023 đến Năm 2024 (2023 - 2024)" },
      { label: "Quy mô nhân sự:", value: "17 nhân sự trực tiếp" },
      { label: "Lĩnh vực hoạt động:", value: "FinTech" }
    ],
    kpis: [
      { label: "Chuẩn hóa quy trình", percent: 100 },
      { label: "Hỗ trợ cộng đồng", percent: 80 },
      { label: "Hỗ trợ sự kiện lớn", percent: 70 },
      { label: "Hoàn thành dự án", percent: 80 }
    ],
    tasks: [
      "Quản lý và giám sát đội ngũ Dịch Vụ Khách Hàng",
      "Theo dõi, phân bổ cuộc gọi đến cho các thành viên",
      "Đánh giá và huấn luyện nhân viên Dịch Vụ Khách Hàng",
      "Lập kế hoạch và lịch trình Dịch Vụ Khách Hàng",
      "Xử lý những trở ngại của nhân viên",
      "Xử lý khiếu nại của khách hàng và trao đổi sản phẩm",
      "Quản lý yêu cầu khách hàng đa kênh (Email, Fax, Phone, Chat)",
      "Khảo sát sự hài lòng của khách hàng",
      "Thực hiện nhiệm vụ từ Ban Giám Đốc",
      "Nghe ghi âm và định hướng chiến lược đào tạo"
    ],
    projects: [
      "Xây dựng P.CSKH",
      "Thiết lập mục tiêu phòng ban",
      "Chuẩn hóa quy trình CSKH",
      "Tối ưu hóa kênh hỗ trợ",
      "Triển khai tự động hóa",
      "Quản lý chiến dịch Outbound",
      "Xây dựng hệ thống CRM",
      "Phân tích & Báo cáo",
      "Khảo sát & Đánh giá khách hàng",
      "Xây dựng AI Bot",
      "Phát triển đào tạo trực tuyến"
    ],
    commitments: [
      "Xây dựng hệ thống dịch vụ khách hàng FinTech hiện đại",
      "100% Chuẩn hóa quy trình và tối ưu hóa trải nghiệm đối tác"
    ],
    photosCount: 1,
    photoUrl: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp"
  },
  "2026": {
    year: "2026+",
    period: "Từ Năm 2026 đến Hiện tại (2026 - Hiện tại)",
    company: "Sẵn sàng cho thử thách mới (2026+)",
    subCompanies: "(Head of CS / CS Director - FinTech, Bảo hiểm, Công nghệ)",
    tag: "Công nghệ / Chuyển đổi số",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
    logo: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
    headerTitle: "Sẵn sàng cho thử thách mới (2026+)",
    paragraphs: [
      "Sẵn sàng đảm nhận vị trí Trưởng phòng Dịch vụ Khách hàng (Head of CS) hoặc Giám đốc Trải nghiệm Khách hàng (CS Director) tại các doanh nghiệp Công nghệ, FinTech, Bảo hiểm. Định hướng ứng dụng AI Bot, tự động hóa CRM và nâng tầm trải nghiệm khách hàng xuất sắc."
    ],
    headcount: 100,
    role: "Head of CS / CS Director",
    roleSub: "Lãnh đạo cấp phòng ban / Chiến lược gia",
    industry: "Công nghệ / Chuyển đổi số",
    duration: "2026 – Hiện tại",
    location: "Hồ Chí Minh & Toàn quốc",
    managementItems: [
      { label: "Vai trò / Chức danh:", value: "Head of CS / CS Director" },
      { label: "Thời gian công tác:", value: "Từ Năm 2026 đến Hiện tại (2026 - Hiện tại)" },
      { label: "Quy mô nhân sự:", value: "Lãnh đạo cấp phòng ban / Chiến lược gia" },
      { label: "Lĩnh vực hoạt động:", value: "Công nghệ / Chuyển đổi số" }
    ],
    kpis: [
      { label: "Sẵn sàng vận hành 24/7", percent: 100 },
      { label: "Ứng dụng AI Chatbot & Automation", percent: 98 },
      { label: "Tối ưu hóa chỉ số CSAT / NPS", percent: 98 },
      { label: "Chuẩn hóa quy trình SOP 2026", percent: 95 }
    ],
    tasks: [
      "Hoạch định & Thực thi chiến lược Trải nghiệm Khách hàng (CX Strategy 2026+)",
      "Tích hợp công nghệ Generative AI & Automation CRM thế hệ mới",
      "Chuẩn hóa & Tối ưu hóa quy trình vận hành Contact Center / Call Center",
      "Xây dựng bộ chỉ số KPI, CSAT, NPS, FCR chuẩn quốc tế cho bộ phận CSKH",
      "Đào tạo, huấn luyện & Phát triển đội ngũ lãnh đạo kế thừa CSKH",
      "Quản trị rủi ro, xử lý khiếu nại phức tạp & Kết nối đa kênh tự động"
    ],
    projects: [
      "Chiến lược CX Strategy 2026+",
      "Tích hợp Generative AI vào CSKH",
      "Tự động hóa CRM & Omnichannel",
      "Đào tạo Lãnh đạo CSKH Kế thừa"
    ],
    commitments: [
      "Sẵn sàng đảm nhận vị trí Trưởng phòng / Giám đốc CSKH cho doanh nghiệp tăng trưởng",
      "Ứng dụng AI và tự động hóa nâng cấp toàn diện dịch vụ khách hàng"
    ],
    photosCount: 1,
    photoUrl: "https://i.ibb.co/wNTXx871/T-m-Job.jpg"
  }
};

const TIMELINE_KEYS = ["2003", "2007", "2011", "2013", "2016", "2018", "2023", "2026"];

export interface WindingMilestone {
  key: string;
  orderNumber: string;
  companyLabel: string;
  yearDisplay: string;
  descriptionVi: string;
  descriptionEn: string;
  anchorX: number;
  anchorY: number;
  poleHeight: number;
  themeColor: string;
  badgeBg: string;
  logoUrl?: string;
  customIcon?: "power" | "img";
}

const WINDING_MILESTONES: WindingMilestone[] = [
  {
    key: "2011",
    orderNumber: "03",
    companyLabel: "LBC HTVC",
    yearDisplay: "Năm 2011",
    descriptionVi: "Tham gia dự án lớn, tăng cường năng lực và uy tín thương hiệu.",
    descriptionEn: "Participated in large-scale projects, strengthened team capabilities and brand reputation.",
    anchorX: 155,
    anchorY: 275,
    poleHeight: 110,
    themeColor: "#2563eb",
    badgeBg: "#2563eb",
    customIcon: "power"
  },
  {
    key: "2007",
    orderNumber: "02",
    companyLabel: "V247",
    yearDisplay: "Năm 2007",
    descriptionVi: "Mở rộng hoạt động, đổi mới dịch vụ và nâng cao giá trị.",
    descriptionEn: "Expanded operations, innovated service standards, and enhanced customer value.",
    anchorX: 420,
    anchorY: 350,
    poleHeight: 110,
    themeColor: "#2563eb",
    badgeBg: "#2563eb",
    customIcon: "power"
  },
  {
    key: "2003",
    orderNumber: "01",
    companyLabel: "MOBIFONE",
    yearDisplay: "Năm 2003",
    descriptionVi: "Khởi đầu hành trình, xây dựng nền tảng và tích lũy kinh nghiệm.",
    descriptionEn: "Began the professional career path, built strong operational foundation and experience.",
    anchorX: 735,
    anchorY: 355,
    poleHeight: 110,
    themeColor: "#2563eb",
    badgeBg: "#2563eb",
    logoUrl: "https://i.ibb.co/hxHm9TsZ/Mobifone.png"
  },
  {
    key: "2013",
    orderNumber: "04",
    companyLabel: "VED GARENA",
    yearDisplay: "Năm 2013",
    descriptionVi: "Bước ngoặt phát triển bền vững với các giải pháp thân thiện môi trường.",
    descriptionEn: "Key milestone turning point in fast-paced eSports, e-commerce, and digital services.",
    anchorX: 695,
    anchorY: 575,
    poleHeight: 110,
    themeColor: "#ea580c",
    badgeBg: "#ea580c",
    logoUrl: "https://i.ibb.co/h1Md65yV/Garena.png"
  },
  {
    key: "2016",
    orderNumber: "05",
    companyLabel: "PRUDENTIAL",
    yearDisplay: "Năm 2016",
    descriptionVi: "Nghiên cứu và phát triển, thử nghiệm ý tưởng sáng tạo.",
    descriptionEn: "Deep-dived into premium insurance call center and quality customer experiences.",
    anchorX: 945,
    anchorY: 610,
    poleHeight: 110,
    themeColor: "#0d9488",
    badgeBg: "#0d9488",
    logoUrl: "https://i.ibb.co/XfpQphWF/Prudential.png"
  },
  {
    key: "2018",
    orderNumber: "06",
    companyLabel: "MOMO",
    yearDisplay: "Năm 2018",
    descriptionVi: "Ứng dụng công nghệ mới, mang lại trải nghiệm đột phá cho người dùng.",
    descriptionEn: "Integrated tech-driven fintech support operations with massive active user-base.",
    anchorX: 1195,
    anchorY: 645,
    poleHeight: 110,
    themeColor: "#0284c7",
    badgeBg: "#0284c7",
    logoUrl: "https://i.ibb.co/k2QtrgTw/Momo.png"
  },
  {
    key: "2026",
    orderNumber: "07",
    companyLabel: "LEADERSHIP",
    yearDisplay: "Năm 2026",
    descriptionVi: "Khẳng định vai trò lãnh đạo, định hướng chiến lược và phát triển dài hạn.",
    descriptionEn: "Ready to scale, lead and transform next-generation customer service with AI.",
    anchorX: 940,
    anchorY: 885,
    poleHeight: 115,
    themeColor: "#2563eb",
    badgeBg: "#2563eb",
    customIcon: "power"
  },
  {
    key: "2023",
    orderNumber: "08",
    companyLabel: "FINVIET",
    yearDisplay: "Năm 2023",
    descriptionVi: "Tối ưu tài chính, tạo giá trị và giải pháp hiệu quả cho khách hàng.",
    descriptionEn: "Optimized partner finance channels and integrated B2B wallet system capabilities.",
    anchorX: 1360,
    anchorY: 775,
    poleHeight: 115,
    themeColor: "#f59e0b",
    badgeBg: "#f59e0b",
    logoUrl: "https://i.ibb.co/7NtSSz4d/Finviet.png"
  }
];

interface HotspotMilestoneOverlay {
  key: string;
  order: string;
  name: string;
  sub: string;
  year: string;
  role: string;
  desc: string;
  logo?: string;
  customIcon?: "power" | "img";
  color: string;
  borderColor: string;
  btnBg: string;
  glowShadow: string;
  pos: { left: string; top: string; width: string; height: string };
  popoverPos: string;
}

export default function Experience() {
  const { t, lang } = useLanguage();
  const { playSound } = useSound();
  const { theme } = useTheme();
  const [activeYear, setActiveYear] = useState<string>("2013");
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
  const [jobModalYear, setJobModalYear] = useState<string>("2013");

  const current = MILESTONES_DATA[activeYear] || MILESTONES_DATA["2013"];
  const modalCurrent = MILESTONES_DATA[jobModalYear] || MILESTONES_DATA["2013"];

  // Open Job Card modal
  const openJobCard = (yrKey: string) => {
    playSound?.("click");
    setActiveYear(yrKey);
    setJobModalYear(yrKey);
    setIsJobModalOpen(true);
  };

  // Helper to navigate between job cards inside modal
  const navigateJobCard = (direction: "prev" | "next") => {
    const currentIndex = TIMELINE_KEYS.indexOf(jobModalYear);
    if (currentIndex === -1) return;
    
    let newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = TIMELINE_KEYS.length - 1;
    if (newIndex >= TIMELINE_KEYS.length) newIndex = 0;
    
    const newYear = TIMELINE_KEYS[newIndex];
    setJobModalYear(newYear);
    setActiveYear(newYear);
  };

  // Helper to format bold markdown in text
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section 
      id="experience" 
      className={cn(
        "relative min-h-full flex flex-col justify-start font-sans w-full px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-[10px] transition-all duration-500",
        theme === "light" ? "text-slate-900" : "text-slate-100"
      )}
    >
      
      {/* ================= 1. HEADER BANNER ================= */}
      <div className="mb-3 w-full shrink-0">
        <PageBanner
          title={current.headerTitle || current.company}
          subtitle={current.paragraphs[0]}
          tag={lang === "vi" ? `NĂM ${current.year}` : `YEAR ${current.year}`}
          iconType="experience"
          logoUrl={current.logo || undefined}
          gradient="from-slate-950 via-indigo-950 to-slate-950"
        />
      </div>


      {/* ================= 2. DESKTOP & MOBILE INTEGRATED TIMELINE SECTION ================= */}
      {/* ================= STAGE: HIGH-RESOLUTION TIMELINE IMAGE WITH INTERACTIVE HOTSPOTS ================= */}
      <div className={cn(
        "relative w-full rounded-2xl overflow-hidden group z-10 mb-6 transition-all duration-500 min-h-[450px] sm:min-h-[520px] md:min-h-[560px]",
        (theme === "glass-neo" || theme === "glass-neon") && "bg-gradient-to-br from-slate-950/95 via-[#0c1229]/90 to-[#190d2e]/90 border border-cyan-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,240,255,0.3),0_0_40px_rgba(255,0,128,0.22)] backdrop-blur-2xl text-cyan-50",
        theme === "glass-vivid" && "bg-slate-950/85 border-2 border-white/35 shadow-[0_16px_40px_rgba(124,58,237,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.4)] backdrop-blur-2xl text-white",
        theme === "clay" && "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-[0_14px_34px_rgba(160,165,210,0.32),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl text-slate-800 dark:text-slate-100",
        theme === "nec" && "bg-[#f0f3f8]/95 dark:bg-slate-900/95 border-2 border-white/90 dark:border-slate-800/90 shadow-[-6px_-6px_16px_rgba(255,255,255,0.9),_6px_6px_20px_rgba(163,177,198,0.5)] backdrop-blur-xl text-slate-800 dark:text-slate-100",
        theme === "light" && "bg-gradient-to-br from-white/95 via-sky-50/70 to-indigo-100/60 border-2 border-indigo-200/90 shadow-[0_20px_50px_rgba(79,70,229,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl text-slate-900",
        (!theme || theme === "glass") && "bg-gradient-to-br from-white/90 via-indigo-50/60 to-purple-50/60 dark:from-slate-950/90 dark:via-indigo-950/80 dark:to-slate-950/90 border-2 border-indigo-200/80 dark:border-white/20 shadow-[0_20px_50px_rgba(31,38,135,0.14),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl text-slate-900 dark:text-slate-100"
      )}>
        {/* Decorative Ambient Glass Glow Orbs for Light & Dark Glass Themes */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-400/20 dark:bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-400/20 dark:bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/15 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Main Reference Timeline Image */}
          <div className="relative w-full aspect-[16/10.6]">
            <img 
              src="https://i.ibb.co/XrmHyS5x/Luu-do-Timline.png" 
              alt="Cột mốc sự nghiệp timeline" 
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/* INTERACTIVE HOTSPOTS OVERLAY FOR EACH MILESTONE - PIXEL-EXACT STAND-UP LOGO PINS */}
            {([
              {
                key: "2011",
                order: "03",
                name: "LBC HTVC",
                sub: "Truyền hình Cáp HTV",
                year: "2011",
                role: lang === "vi" ? "Trưởng phòng CSKH" : "Customer Service Manager",
                desc: lang === "vi" 
                  ? "Điều hành toàn diện Contact Center truyền hình cáp, xây dựng quy trình SOP chuẩn mực, thiết lập KPI và nâng cao chỉ số hài lòng khách hàng."
                  : "Managed comprehensive cable TV contact center, standardized SOPs, established KPI frameworks, and elevated customer satisfaction.",
                logo: "https://i.ibb.co/tpG5fMrt/LBC.png",
                color: "#7c3aed",
                borderColor: "border-[#7c3aed]",
                btnBg: "bg-violet-600 hover:bg-violet-700",
                glowShadow: "shadow-violet-500/40",
                pos: { left: "8.8%", top: "6.0%", width: "80px", height: "22%" },
                popoverPos: "top-full left-0 mt-3"
              },
              {
                key: "2007",
                order: "02",
                name: "V247",
                sub: "Viễn Liên V247",
                year: "2007",
                role: lang === "vi" ? "Trưởng nhóm CSKH" : "CS & Operations Lead",
                desc: lang === "vi"
                  ? "Vận hành tổng đài viễn thông quốc tế Hoa Kỳ - Việt Nam 24/7, giám sát chất lượng và nâng cao năng suất hỗ trợ khách hàng đa kênh."
                  : "Operated 24/7 international telecom contact center between US and Vietnam, ensuring service quality and multi-channel support efficiency.",
                logo: "https://i.ibb.co/QvtbdnfP/V247.png",
                color: "#db2777",
                borderColor: "border-[#db2777]",
                btnBg: "bg-pink-600 hover:bg-pink-700",
                glowShadow: "shadow-pink-500/40",
                pos: { left: "26.4%", top: "13.5%", width: "80px", height: "22%" },
                popoverPos: "top-full left-1/2 -translate-x-1/2 mt-3"
              },
              {
                key: "2003",
                order: "01",
                name: "MOBIFONE",
                sub: "Viễn thông MobiFone",
                year: "2003",
                role: lang === "vi" ? "Chuyên viên CSKH & Kỹ thuật" : "Telecom CS Specialist",
                desc: lang === "vi"
                  ? "Khởi đầu sự nghiệp với nền tảng đào tạo bài bản từ tập đoàn viễn thông quốc gia, xử lý sự cố và kiến tạo tư duy lấy khách hàng làm trung tâm."
                  : "Started career with foundational training at leading national telecom operator, handling technical issues with customer-centric mindset.",
                logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
                color: "#1d4ed8",
                borderColor: "border-[#1d4ed8]",
                btnBg: "bg-blue-600 hover:bg-blue-700",
                glowShadow: "shadow-blue-500/40",
                pos: { left: "46.2%", top: "19.0%", width: "84px", height: "22%" },
                popoverPos: "top-full left-1/2 -translate-x-1/2 mt-3"
              },
              {
                key: "2013",
                order: "04",
                name: "VED GARENA",
                sub: "Vietnam Esports & Garena",
                year: "2013",
                role: lang === "vi" ? "Trưởng phòng CSKH" : "Head of Customer Service",
                desc: lang === "vi"
                  ? "Quản lý 129 nhân sự, thiết lập hệ thống CSKH game online quy mô lớn (LMHT, GCafe, AirPay), đạt CSAT 96%, FCR 88% và đào tạo đội ngũ kế thừa."
                  : "Managed 129 personnel, built large-scale eSports & online game support system (LoL, GCafe, AirPay), achieved 96% CSAT and 88% FCR.",
                logo: "https://i.ibb.co/h1Md65yV/Garena.png",
                color: "#dc2626",
                borderColor: "border-[#dc2626]",
                btnBg: "bg-red-600 hover:bg-red-700",
                glowShadow: "shadow-red-500/40",
                pos: { left: "43.5%", top: "41.5%", width: "84px", height: "22%" },
                popoverPos: "bottom-full left-1/2 -translate-x-1/2 mb-3"
              },
              {
                key: "2016",
                order: "05",
                name: "PRUDENTIAL",
                sub: "Bảo hiểm Nhân thọ Prudential",
                year: "2016",
                role: lang === "vi" ? "Trưởng bộ phận CSKH" : "CS Section Manager",
                desc: lang === "vi"
                  ? "Quản trị trải nghiệm khách hàng bảo hiểm cao cấp, xây dựng tiêu chuẩn tư vấn minh bạch, quản lý chất lượng dịch vụ và niềm tin bền vững."
                  : "Led premium life insurance customer experience, established transparent consultation standards and robust quality assurance frameworks.",
                logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
                color: "#0d9488",
                borderColor: "border-[#0d9488]",
                btnBg: "bg-teal-600 hover:bg-teal-700",
                glowShadow: "shadow-teal-500/40",
                pos: { left: "59.3%", top: "44.5%", width: "84px", height: "22%" },
                popoverPos: "bottom-full left-1/2 -translate-x-1/2 mb-3"
              },
              {
                key: "2018",
                order: "06",
                name: "MOMO",
                sub: "Ví Điện Tử MoMo",
                year: "2018",
                role: lang === "vi" ? "Trưởng bộ phận Vận hành CSKH" : "CS Operations Manager",
                desc: lang === "vi"
                  ? "Tối ưu hóa vận hành CSKH nền tảng Fintech số 1 Việt Nam, ứng dụng CRM số hóa và nâng cao trải nghiệm thanh toán của hàng triệu người dùng."
                  : "Optimized Fintech CS operations for Vietnam's #1 digital wallet, deploying CRM automation and resolving high-volume transaction inquiries.",
                logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
                color: "#0284c7",
                borderColor: "border-[#0284c7]",
                btnBg: "bg-sky-600 hover:bg-sky-700",
                glowShadow: "shadow-sky-500/40",
                pos: { left: "74.8%", top: "48.5%", width: "84px", height: "22%" },
                popoverPos: "bottom-full right-0 mb-3"
              },
              {
                key: "2026",
                order: "07",
                name: "LEADERSHIP",
                sub: "Chiến lược & AI Automation",
                year: "2026",
                role: lang === "vi" ? "Lãnh đạo CSKH & CX Chiến lược" : "Strategic CX & CS Director",
                desc: lang === "vi"
                  ? "Khẳng định vai trò lãnh đạo cấp cao 22+ năm kinh nghiệm, ứng dụng Generative AI & CRM Automation để kiến tạo dịch vụ khách hàng vượt trội."
                  : "Driving 22+ years executive CS leadership, pioneering Generative AI & CRM Automation for industry-standard customer experiences.",
                logo: "",
                customIcon: "power",
                color: "#1e40af",
                borderColor: "border-[#1e40af]",
                btnBg: "bg-blue-700 hover:bg-blue-800",
                glowShadow: "shadow-blue-600/40",
                pos: { left: "58.9%", top: "69.0%", width: "84px", height: "22%" },
                popoverPos: "bottom-full left-1/2 -translate-x-1/2 mb-3"
              },
              {
                key: "2023",
                order: "08",
                name: "FINVIET",
                sub: "Finviet - Ví ECO",
                year: "2023",
                role: lang === "vi" ? "Trưởng phòng CSKH & Vận hành" : "Head of CS & Operations",
                desc: lang === "vi"
                  ? "Tối ưu hóa dịch vụ tài chính B2B/B2C, phát triển các kênh hỗ trợ đại lý, nâng cao tỷ lệ giải quyết khiếu nại thành công trong 24 giờ."
                  : "Optimized B2B/B2C financial services, expanded merchant support channels, and improved 24-hour resolution rates.",
                logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
                color: "#d97706",
                borderColor: "border-[#d97706]",
                btnBg: "bg-amber-600 hover:bg-amber-700",
                glowShadow: "shadow-amber-500/40",
                pos: { left: "85.1%", top: "61.5%", width: "84px", height: "22%" },
                popoverPos: "bottom-full right-0 mb-3"
              },
            ] as HotspotMilestoneOverlay[]).map((spot) => (
              <div
                key={spot.key}
                className="absolute z-20 flex flex-col items-center -translate-x-1/2 group/pin cursor-pointer"
                style={{
                  left: spot.pos.left,
                  top: spot.pos.top,
                  height: spot.pos.height,
                  width: spot.pos.width
                }}
                onClick={() => {
                  playSound("click");
                  openJobCard(spot.key);
                }}
              >
                {/* 0. YEAR BADGE PILL (THẺ NĂM TRÊN CỘT MỐC SỰ NGHIỆP) */}
                <div 
                  className={cn(
                    "mb-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black text-white shadow-md border transition-all duration-300 group-hover/pin:scale-115 group-hover/pin:-translate-y-1 select-none z-30 font-['Play',sans-serif] tracking-wider",
                    theme === "glass-neo" ? "border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.7)]" : "border-white/90"
                  )}
                  style={{ 
                    backgroundColor: spot.color,
                    boxShadow: theme === "glass-neo" ? `0 0 12px ${spot.color}` : `0 2px 8px ${spot.color}60`
                  }}
                >
                  {lang === "vi" ? `Năm ${spot.key}` : `Year ${spot.key}`}
                </div>

                {/* 1. TOP LOGO CIRCLE BADGE (ĐĨA LOGO TRÒN VIỀN MÀU THƯƠNG HIỆU LẮP ĐẦY KHUNG) */}
                <div 
                  className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white flex items-center justify-center p-0.5 relative z-20 shadow-lg transition-all duration-300 overflow-hidden group-hover/pin:scale-115 group-hover/pin:-translate-y-1.5",
                    "border-[2.5px] sm:border-[3px]",
                    spot.borderColor,
                    theme === "glass-neo" && "shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  )}
                  style={{
                    boxShadow: theme === "glass-neo" ? `0 0 15px ${spot.color}80` : `0 4px 14px ${spot.color}40`
                  }}
                >
                  {spot.customIcon === "power" ? (
                    <div 
                      className="flex items-center justify-center w-full h-full rounded-full"
                      style={{ backgroundColor: `${spot.color}15` }}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ color: spot.color }} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v7" />
                        <circle cx="12" cy="14" r="7.5" />
                      </svg>
                    </div>
                  ) : (
                    <img 
                      src={spot.logo} 
                      alt={spot.name} 
                      className="w-full h-full object-cover rounded-full select-none pointer-events-none transition-transform duration-300 group-hover/pin:scale-108"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = `https://placehold.co/80x80/ffffff/${spot.color.replace("#", "")}?text=${spot.order}`;
                      }}
                    />
                  )}
                </div>

                {/* 2. VERTICAL PIN STEM (TRỤC ĐỨNG NỐI TỪ VÒNG LOGO XUỐNG ĐẦU GHIM) */}
                <div 
                  className={cn(
                    "w-[2.5px] sm:w-[3px] flex-1 my-0 transition-all duration-300 group-hover/pin:brightness-125",
                    theme === "glass-neo" && "shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                  )}
                  style={{ backgroundColor: spot.color }}
                />

                {/* 3. TEARDROP MAP PIN MARKER (ĐẦU GHIM ĐỊNH VỊ TEARDROP CHẠM ĐƯỜNG) */}
                <div className="relative flex flex-col items-center shrink-0 z-10 transition-transform duration-300 group-hover/pin:scale-110">
                  <svg 
                    viewBox="0 0 24 30" 
                    className={cn(
                      "w-4.5 h-6 sm:w-5 sm:h-7.5 drop-shadow-md",
                      theme === "glass-neo" && "drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                    )}
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M12 0C5.37258 0 0 5.37258 0 12C0 19.5 12 30 12 30C12 30 24 19.5 24 12C24 5.37258 18.6274 0 12 0Z" 
                      fill={spot.color} 
                    />
                    <circle cx="12" cy="11.5" r="4.5" fill="white" />
                  </svg>

                  {/* 4. BASE CONTACT POINT SHADOW & RADAR PULSE ON ROAD */}
                  <div 
                    className="absolute -bottom-1 w-5 h-1.5 rounded-full bg-slate-900/35 blur-[1px] pointer-events-none transition-all duration-300 group-hover/pin:scale-150 group-hover/pin:bg-slate-900/50"
                  />
                  <span 
                    className={cn(
                      "absolute -bottom-1.5 w-4 h-4 rounded-full ring-2 opacity-0 group-hover/pin:opacity-100 group-hover/pin:animate-ping pointer-events-none",
                      theme === "glass-neo" && "shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                    )}
                    style={{ borderColor: spot.color }}
                  />
                </div>

                  {/* 5. FLOATING RICH HOVER CARD (THÔNG TIN CHI TIẾT KHI DI CHUỘT) */}
                <div 
                  className={cn(
                    "absolute hidden group-hover/pin:flex flex-col w-[260px] sm:w-[290px] p-3.5 rounded-2xl backdrop-blur-2xl border z-50 pointer-events-none transition-all duration-300 text-left animate-in fade-in zoom-in-95",
                    theme === "glass-neo" && "bg-slate-950/95 border-cyan-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.35),0_0_35px_rgba(255,0,128,0.25)] text-slate-100",
                    theme === "glass-vivid" && "bg-slate-900/95 border-purple-400/50 shadow-[0_16px_40px_rgba(124,58,237,0.4)] text-white",
                    theme === "clay" && "bg-white/95 dark:bg-slate-900/95 border-2 border-white dark:border-slate-700 shadow-[0_16px_36px_rgba(140,150,200,0.35)] text-slate-800 dark:text-slate-100",
                    theme === "nec" && "bg-[#f0f3f8]/95 dark:bg-slate-900/95 border-white/90 dark:border-slate-800/90 shadow-[6px_6px_16px_rgba(163,177,198,0.45),-6px_-6px_16px_rgba(255,255,255,0.8)] text-slate-800 dark:text-slate-100",
                    theme === "light" && "bg-gradient-to-br from-white/95 via-sky-50/90 to-purple-50/95 border-2 border-indigo-200/90 shadow-[0_20px_45px_rgba(30,27,75,0.18)] text-slate-900",
                    (!theme || theme === "glass") && "bg-gradient-to-br from-white/95 via-indigo-50/90 to-slate-50/95 dark:from-slate-900/95 dark:via-slate-950/95 dark:to-slate-900/95 border-2 border-indigo-200/80 dark:border-white/20 shadow-[0_20px_45px_rgba(30,27,75,0.2)] text-slate-900 dark:text-white",
                    spot.popoverPos
                  )}
                  style={{ 
                    borderColor: theme === "glass-neo" ? undefined : `${spot.color}70`, 
                    boxShadow: theme === "glass-neo" ? undefined : `0 20px 40px ${spot.color}35, 0 4px 15px rgba(0,0,0,0.06)` 
                  }}
                >
                  {/* Header with Company Logo & Order Badge */}
                  <div className={cn(
                    "flex items-center gap-2.5 pb-2.5 border-b",
                    theme === "glass-neo" ? "border-cyan-500/30" : "border-indigo-100 dark:border-slate-800"
                  )}>
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-xl bg-white p-1 border-2 flex items-center justify-center shrink-0 shadow-sm",
                        theme === "glass-neo" && "shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      )}
                      style={{ borderColor: spot.color }}
                    >
                      {spot.customIcon === "power" ? (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ color: spot.color }} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3v7" />
                          <circle cx="12" cy="14" r="8" />
                          <circle cx="12" cy="14" r="4" />
                        </svg>
                      ) : (
                        <img 
                          src={spot.logo} 
                          alt={spot.name} 
                          className="max-h-7 max-w-[85%] object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.src = `https://placehold.co/80x80/ffffff/${spot.color.replace("#", "")}?text=${encodeURIComponent(spot.name)}`;
                          }}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className={cn(
                          "text-xs font-black uppercase truncate",
                          theme === "glass-neo" ? "text-cyan-200" : "text-slate-900 dark:text-white"
                        )}>
                          {spot.order}. {spot.name}
                        </h4>
                        <span 
                          className="px-2 py-0.5 rounded-full text-[9px] font-black text-white shrink-0 uppercase tracking-wider shadow-xs"
                          style={{ backgroundColor: spot.color }}
                        >
                          {lang === "vi" ? `Năm ${spot.year}` : `Year ${spot.year}`}
                        </span>
                      </div>
                      <p className={cn(
                        "text-[10px] font-bold truncate",
                        theme === "glass-neo" ? "text-slate-300" : "text-indigo-600 dark:text-indigo-300"
                      )}>
                        {spot.role}
                      </p>
                    </div>
                  </div>

                  {/* Company Detailed Description Frame (Khung mô tả nổi bật) */}
                  <div className={cn(
                    "my-2.5 p-2.5 rounded-xl border shadow-xs",
                    theme === "glass-neo" && "bg-slate-900/90 border-cyan-500/30 text-slate-200",
                    theme === "glass-vivid" && "bg-slate-950/80 border-purple-500/30 text-slate-200",
                    theme === "clay" && "bg-indigo-50/80 dark:bg-slate-800/80 border-white/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200",
                    theme === "nec" && "bg-[#e2e8f0]/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-200",
                    theme === "light" && "bg-gradient-to-br from-indigo-50/90 to-purple-50/90 border-indigo-200/80 text-slate-800",
                    (!theme || theme === "glass") && "bg-gradient-to-br from-indigo-50/80 to-sky-50/80 dark:bg-slate-800/80 border-indigo-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200"
                  )}>
                    <p className="text-[11px] leading-relaxed line-clamp-3 font-medium">
                      {spot.desc}
                    </p>
                  </div>

                  {/* Action Callout Button inside Card */}
                  <div className={cn(
                    "pt-2 flex items-center justify-between border-t",
                    theme === "glass-neo" ? "border-cyan-500/30" : "border-indigo-100 dark:border-slate-800"
                  )}>
                    <span className={cn(
                      "text-[10px] font-semibold",
                      theme === "glass-neo" ? "text-cyan-300/80" : "text-slate-500 dark:text-slate-400"
                    )}>
                      {lang === "vi" ? "Nhấp để mở báo cáo chi tiết" : "Click to open full report"}
                    </span>
                    <div 
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm",
                        spot.btnBg,
                        theme === "glass-neo" && "shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      )}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{lang === "vi" ? "Xem chi tiết" : "Details"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Footer Banner inside Desktop card */}
          <div className={cn(
            "px-4 py-3 flex items-center justify-between border-t text-xs transition-colors duration-300 backdrop-blur-xl",
            theme === "glass-neo" && "bg-slate-950/90 border-cyan-500/30 text-cyan-200",
            theme === "glass-vivid" && "bg-slate-950/85 border-white/15 text-violet-200",
            theme === "clay" && "bg-white/80 dark:bg-slate-800/80 border-white dark:border-slate-700 text-indigo-700 dark:text-indigo-200",
            theme === "nec" && "bg-[#e2e8f0]/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300",
            theme === "light" && "bg-gradient-to-r from-indigo-50/90 via-sky-50/90 to-purple-50/90 border-t border-indigo-200/80 text-slate-700",
            (!theme || theme === "glass") && "bg-gradient-to-r from-indigo-50/90 via-sky-50/80 to-purple-50/90 dark:bg-slate-900/90 border-t border-indigo-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          )}>
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className={cn(
                "w-3.5 h-3.5",
                theme === "glass-neo" ? "text-cyan-400 animate-pulse" : "text-amber-500"
              )} />
              {lang === "vi" ? "Nhấp trực tiếp vào bất kỳ cột mốc hoặc thẻ doanh nghiệp trên hình để xem báo cáo chi tiết & KPI" : "Click directly on any milestone or company card to view detailed KPI and reports"}
            </span>
            <span className={cn(
              "font-bold",
              theme === "glass-neo" && "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]",
              theme === "glass-vivid" && "text-fuchsia-300",
              theme === "clay" && "text-pink-600 dark:text-pink-300",
              theme === "nec" && "text-purple-600 dark:text-purple-400",
              theme === "light" && "text-indigo-600",
              (!theme || theme === "glass") && "text-indigo-600 dark:text-indigo-400"
            )}>
              {lang === "vi" ? "8 Cột mốc tiêu biểu" : "8 Milestone Highlights"}
            </span>
          </div>

          {/* ================= POPUP MODAL JOB CARD MATCHING EXPERIENCE CARD SIZE ================= */}
          <AnimatePresence>
            {isJobModalOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "absolute inset-0 z-50 w-full h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300",
                  (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-950/95 border border-cyan-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.35)] backdrop-blur-2xl text-slate-100",
                  theme === "glass-vivid" && "bg-slate-950/95 border-2 border-white/30 shadow-[0_25px_60px_rgba(124,58,237,0.4)] backdrop-blur-2xl text-white",
                  theme === "clay" && "bg-white/95 dark:bg-slate-900/95 border-2 border-white dark:border-slate-700 shadow-2xl backdrop-blur-2xl text-slate-800 dark:text-slate-100",
                  theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 shadow-2xl text-slate-800 dark:text-slate-100",
                  (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-br from-white/95 via-slate-50/95 to-indigo-50/90 dark:from-slate-900/95 dark:via-slate-950/95 dark:to-slate-900/95 border-2 border-indigo-200/90 dark:border-indigo-800/80 shadow-[0_30px_80px_rgba(30,27,75,0.25)] backdrop-blur-2xl text-slate-900 dark:text-slate-100"
                )}
              >
                {/* Modal Top Ribbon */}
                <div className={cn(
                  "relative z-10 px-5 py-3.5 flex items-center justify-between border-b shrink-0 text-white shadow-md",
                  (theme === "glass-neo" || theme === "glass-neon") ? "bg-gradient-to-r from-slate-950 via-[#0c1229] to-slate-950 border-cyan-500/40" : "bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-800 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 border-white/20"
                )}>
                  <div className="flex items-center gap-2">
                    <div className="shrink-0 transform transition-transform duration-300 hover:scale-110">
                      <WebsiteGradientIcon type="experience" extraClass="w-8.5 h-8.5" />
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-sm font-black tracking-wide uppercase",
                        (theme === "glass-neo" || theme === "glass-neon") ? "text-cyan-200 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" : "text-white"
                      )}>
                        {lang === "vi" ? "THẺ JOB KINH NGHIỆM CHI TIẾT" : "DETAILED CAREER JOB CARD"}
                      </h3>
                      <p className={cn(
                        "text-[10.5px]",
                        (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-300" : "text-indigo-100"
                      )}>
                        Năm {modalCurrent.year} — {modalCurrent.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous / Next buttons */}
                    <div className={cn(
                      "flex items-center gap-1 rounded-xl p-0.5 border",
                      (theme === "glass-neo" || theme === "glass-neon") ? "bg-slate-900/90 border-cyan-500/40" : "bg-white/20 border-white/20 backdrop-blur-md"
                    )}>
                      <button
                        type="button"
                        onClick={() => navigateJobCard("prev")}
                        title="Mốc trước"
                        className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className={cn(
                        "text-[11px] font-bold px-1.5",
                        (theme === "glass-neo" || theme === "glass-neon") ? "text-cyan-300" : "text-white"
                      )}>
                        {modalCurrent.year}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigateJobCard("next")}
                        title="Mốc kế tiếp"
                        className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Close Modal */}
                    <button
                      type="button"
                      onClick={() => setIsJobModalOpen(false)}
                      className={cn(
                        "p-1.5 rounded-xl transition-all cursor-pointer",
                        (theme === "glass-neo" || theme === "glass-neon") ? "bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-400/50 text-cyan-200 shadow-[0_0_10px_rgba(0,240,255,0.3)]" : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
                      )}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-5 text-left flex-1">
                  
                  {/* Header of Job Card */}
                  <div className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4.5 rounded-2xl border shadow-xs backdrop-blur-xl",
                    (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-900/80 border-cyan-500/30 text-slate-100",
                    theme === "glass-vivid" && "bg-slate-950/70 border-purple-500/30 text-white",
                    theme === "clay" && "bg-white/90 dark:bg-slate-800/90 border-2 border-white dark:border-slate-700",
                    theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-800 border-2 border-white dark:border-slate-800",
                    (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-r from-white/95 via-indigo-50/80 to-purple-50/80 dark:bg-slate-800/60 border-2 border-indigo-200/80 dark:border-slate-700/80 shadow-[0_8px_25px_rgba(99,102,241,0.1)]"
                  )}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200/80 dark:border-slate-700 p-2 flex items-center justify-center shrink-0 shadow-md">
                        <img 
                          src={modalCurrent.logo} 
                          alt={modalCurrent.company} 
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-xs font-extrabold border border-indigo-200 dark:border-indigo-800 mb-1">
                          <Calendar className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                          <span>{modalCurrent.period}</span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                          {modalCurrent.company}
                        </h2>
                        {modalCurrent.subCompanies && (
                          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                            {modalCurrent.subCompanies}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-xs ${modalCurrent.tagColor}`}>
                        {modalCurrent.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {modalCurrent.headcount} Nhân sự
                      </span>
                    </div>
                  </div>

                  {/* Job Title & Main Narrative */}
                  <div className={cn(
                    "space-y-2.5 p-4.5 rounded-2xl border shadow-xs backdrop-blur-xl",
                    (!theme || theme === "light" || theme === "glass") ? "bg-gradient-to-br from-white/95 via-sky-50/50 to-indigo-50/60 dark:bg-slate-900/80 border-2 border-indigo-100 dark:border-slate-800" : "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                  )}>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        {modalCurrent.headerTitle}
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {modalCurrent.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-justify font-medium">
                          {renderFormattedText(p)}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* 4 Multi-color Glass Details Grids inside Modal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Quản lý & Quy mô (Blue/Sky Glass) */}
                    <div className={cn(
                      "p-4.5 rounded-2xl space-y-3 shadow-xs backdrop-blur-xl transition-all",
                      (!theme || theme === "light" || theme === "glass") ? "bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/90 dark:bg-slate-800/50 border-2 border-blue-200/90 dark:border-blue-800/50 shadow-[0_8px_20px_rgba(59,130,246,0.08)]" : "bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
                    )}>
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <h4 className="text-xs font-black uppercase tracking-wider">01 QUẢN LÝ & QUY MÔ ĐỘI NGŨ</h4>
                      </div>
                      <div className="space-y-2">
                        {modalCurrent.managementItems.map((item, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-blue-200/80 dark:border-blue-700/60 text-xs shadow-2xs hover:border-blue-300 transition-colors">
                            <span className="text-[10px] text-slate-500 font-semibold block">{item.label}</span>
                            <span className="font-bold text-slate-900 dark:text-slate-200">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kết quả & KPI (Emerald/Teal Glass) */}
                    <div className={cn(
                      "p-4.5 rounded-2xl space-y-3 shadow-xs backdrop-blur-xl transition-all",
                      (!theme || theme === "light" || theme === "glass") ? "bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-emerald-50/90 dark:bg-slate-800/50 border-2 border-emerald-200/90 dark:border-emerald-800/50 shadow-[0_8px_20px_rgba(16,185,129,0.08)]" : "bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
                    )}>
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-xs font-black uppercase tracking-wider">02 KẾT QUẢ & KPI VẬN HÀNH</h4>
                      </div>
                      <div className="space-y-2.5">
                        {modalCurrent.kpis.map((kpi, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-300">
                              <span>{kpi.label}</span>
                              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{kpi.percent}%</span>
                            </div>
                            <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden border border-emerald-200/60 dark:border-emerald-800/60 shadow-inner">
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.35)]" 
                                style={{ width: `${kpi.percent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nhiệm vụ cốt lõi (Purple/Fuchsia Glass) */}
                    <div className={cn(
                      "p-4.5 rounded-2xl space-y-3 shadow-xs backdrop-blur-xl transition-all",
                      (!theme || theme === "light" || theme === "glass") ? "bg-gradient-to-br from-purple-50/90 via-fuchsia-50/70 to-violet-50/90 dark:bg-slate-800/50 border-2 border-purple-200/90 dark:border-purple-800/50 shadow-[0_8px_20px_rgba(168,85,247,0.08)]" : "bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
                    )}>
                      <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                        <ClipboardList className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <h4 className="text-xs font-black uppercase tracking-wider">03 NHIỆM VỤ CỐT LÕI</h4>
                      </div>
                      <div className="space-y-1.5">
                        {modalCurrent.tasks.map((task, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-purple-200/80 dark:border-purple-700/60 text-xs text-slate-800 dark:text-slate-200 font-medium shadow-2xs hover:border-purple-300 transition-colors">
                            <span className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-extrabold text-[9px] shrink-0 border border-purple-200 dark:border-purple-800">
                              {i + 1}
                            </span>
                            <span className="leading-snug">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Các dự án lớn (Amber/Orange Glass) */}
                    <div className={cn(
                      "p-4.5 rounded-2xl space-y-3 shadow-xs backdrop-blur-xl transition-all",
                      (!theme || theme === "light" || theme === "glass") ? "bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-amber-50/90 dark:bg-slate-800/50 border-2 border-amber-200/90 dark:border-amber-800/50 shadow-[0_8px_20px_rgba(245,158,11,0.08)]" : "bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
                    )}>
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                        <GitFork className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-xs font-black uppercase tracking-wider">04 DỰ ÁN TRỌNG ĐIỂM</h4>
                      </div>
                      <div className="space-y-1.5">
                        {modalCurrent.projects.map((proj, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-800/70 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs hover:border-amber-300 transition-colors">
                            <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{proj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-3.5 bg-gradient-to-r from-slate-50 via-indigo-50/60 to-slate-50 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0">
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold hidden sm:inline">
                    {lang === "vi" ? "Kinh nghiệm thực chiến 22+ năm Nguyễn Hùng Thái" : "22+ Years Hands-on Leadership"}
                  </span>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => setIsJobModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-100 font-extrabold text-xs transition-all cursor-pointer shadow-xs"
                    >
                      {lang === "vi" ? "Đóng Thẻ" : "Close"}
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= MOBILE STAGE: ADAPTIVE RESPONSIVE CARDS ================= */}
        <div className="block md:hidden space-y-3 z-10">
          <div className={cn(
            "w-full rounded-2xl overflow-hidden border shadow-md",
            theme === "glass-neo" && "border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]",
            theme === "glass-vivid" && "border-purple-500/40 shadow-xl",
            theme === "clay" && "border-2 border-white dark:border-slate-700 shadow-lg",
            theme === "nec" && "border-2 border-white dark:border-slate-800 shadow-md",
            (!theme || theme === "light" || theme === "glass") && "border-slate-200 dark:border-slate-700"
          )}>
            <img 
              src="https://i.ibb.co/XrmHyS5x/Luu-do-Timline.png" 
              alt="Luu do Timline" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Mobile Milestone Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {WINDING_MILESTONES.map((m) => {
              const isActive = activeYear === m.key;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => openJobCard(m.key)}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer shadow-xs backdrop-blur-xl",
                    theme === "glass-neo" ? (isActive ? "bg-slate-900/90 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)] text-cyan-50" : "bg-slate-950/80 border-cyan-500/30 hover:border-cyan-400/60 text-slate-200") :
                    theme === "glass-vivid" ? (isActive ? "bg-slate-900/90 border-purple-400 ring-2 ring-purple-400/40 text-white" : "bg-slate-950/70 border-white/20 text-white") :
                    theme === "clay" ? (isActive ? "bg-white/90 dark:bg-slate-800/90 border-2 border-pink-400 ring-2 ring-pink-400/20 text-slate-800 dark:text-slate-100" : "bg-white/80 dark:bg-slate-900/80 border-2 border-white dark:border-slate-700") :
                    theme === "nec" ? (isActive ? "bg-[#e2e8f0] dark:bg-slate-800 border-2 border-purple-400 text-slate-800 dark:text-slate-100 shadow-inner" : "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 shadow-[-3px_-3px_8px_rgba(255,255,255,0.8),3px_3px_8px_rgba(163,177,198,0.4)]") :
                    (isActive ? "bg-gradient-to-r from-white via-indigo-50 to-purple-50 dark:bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/30 shadow-md" : "bg-white/90 dark:bg-slate-800/90 border-indigo-100/90 dark:border-slate-700 hover:border-indigo-300 shadow-xs")
                  )}
                >
                  <div className={cn(
                    "w-11 h-11 rounded-xl border-2 bg-white flex items-center justify-center p-1 shrink-0 shadow-xs",
                    theme === "glass-neo" && "shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                  )} style={{ borderColor: m.themeColor }}>
                    {m.customIcon === "power" ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v7" />
                        <circle cx="12" cy="14" r="8" />
                        <circle cx="12" cy="14" r="4" />
                      </svg>
                    ) : (
                      <img src={m.logoUrl} alt={m.companyLabel} className="max-h-7 max-w-[85%] object-contain" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-black uppercase truncate" style={{ color: m.themeColor }}>
                        {m.orderNumber}. {m.companyLabel}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black text-white uppercase shadow-2xs" style={{ backgroundColor: m.badgeBg }}>
                        {m.yearDisplay}
                      </span>
                    </div>
                    <p className={cn(
                      "text-[10.5px] font-semibold truncate mt-0.5",
                      theme === "glass-neo" ? "text-slate-300" : "text-slate-600 dark:text-slate-300"
                    )}>
                      {lang === "vi" ? m.descriptionVi : m.descriptionEn}
                    </p>
                  </div>
                  <ChevronRight className={cn(
                    "w-4 h-4 shrink-0",
                    theme === "glass-neo" ? "text-cyan-400" : "text-indigo-500"
                  )} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. BOTTOM STATS BAR (5 CARDS) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          
          {/* Box 1: 22+ Năm kinh nghiệm */}
          <div className={cn(
            "flex items-center gap-3.5 p-4 rounded-2xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-2xl",
            (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-950/85 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-slate-100",
            theme === "glass-vivid" && "bg-gradient-to-br from-purple-950/80 via-indigo-900/40 to-slate-950/80 border border-purple-400/40 text-white",
            theme === "clay" && "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-100",
            theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 text-slate-800 dark:text-slate-100",
            (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-br from-white/95 via-purple-50/80 to-indigo-100/70 dark:from-slate-900/95 dark:via-purple-950/50 dark:to-indigo-950/50 border-2 border-purple-300/90 dark:border-purple-500/60 shadow-[0_8px_25px_rgba(147,51,234,0.18)] hover:border-purple-500 text-slate-900 dark:text-white"
          )}>
            <div className="shrink-0 transform transition-transform duration-300 hover:scale-110">
              <WebsiteGradientIcon type="experience" extraClass="w-13 h-13" />
            </div>
            <div className="text-left">
              <div className={cn(
                "text-xl sm:text-2xl font-black tracking-tight",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-cyan-200" : "text-purple-700 dark:text-purple-300"
              )}>
                22+
              </div>
              <div className={cn(
                "text-xs font-bold",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-300" : "text-slate-700 dark:text-slate-300"
              )}>
                Năm kinh nghiệm
              </div>
            </div>
          </div>

          {/* Box 2: 100+ Nhân sự đã dẫn dắt */}
          <div className={cn(
            "flex items-center gap-3.5 p-4 rounded-2xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-2xl",
            (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-950/85 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-slate-100",
            theme === "glass-vivid" && "bg-gradient-to-br from-blue-950/80 via-sky-900/40 to-slate-950/80 border border-blue-400/40 text-white",
            theme === "clay" && "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-100",
            theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 text-slate-800 dark:text-slate-100",
            (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-br from-white/95 via-sky-50/80 to-blue-100/70 dark:from-slate-900/95 dark:via-blue-950/50 dark:to-cyan-950/50 border-2 border-blue-300/90 dark:border-blue-500/60 shadow-[0_8px_25px_rgba(59,130,246,0.18)] hover:border-blue-500 text-slate-900 dark:text-white"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all shadow-md",
              (theme === "glass-neo" || theme === "glass-neon") ? "bg-blue-950/60 text-cyan-300 border-cyan-400/50" : "bg-gradient-to-tr from-blue-600 to-sky-500 text-white border-blue-200/80 dark:border-blue-700/60"
            )}>
              <Users className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className={cn(
                "text-xl sm:text-2xl font-black tracking-tight",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-cyan-200" : "text-blue-700 dark:text-blue-300"
              )}>
                100+
              </div>
              <div className={cn(
                "text-xs font-bold",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-300" : "text-slate-700 dark:text-slate-300"
              )}>
                Nhân sự đã dẫn dắt
              </div>
            </div>
          </div>

          {/* Box 3: 98% CSAT cao nhất đạt được */}
          <div className={cn(
            "flex items-center gap-3.5 p-4 rounded-2xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-2xl",
            (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-950/85 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-slate-100",
            theme === "glass-vivid" && "bg-gradient-to-br from-emerald-950/80 via-teal-900/40 to-slate-950/80 border border-emerald-400/40 text-white",
            theme === "clay" && "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-100",
            theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 text-slate-800 dark:text-slate-100",
            (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-br from-white/95 via-emerald-50/80 to-teal-100/70 dark:from-slate-900/95 dark:via-emerald-950/50 dark:to-teal-950/50 border-2 border-emerald-300/90 dark:border-emerald-500/60 shadow-[0_8px_25px_rgba(16,185,129,0.18)] hover:border-emerald-500 text-slate-900 dark:text-white"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all shadow-md",
              (theme === "glass-neo" || theme === "glass-neon") ? "bg-emerald-950/60 text-emerald-300 border-emerald-400/50" : "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white border-emerald-200/80 dark:border-emerald-700/60"
            )}>
              <Star className="w-6 h-6 fill-white/30 text-white" />
            </div>
            <div className="text-left">
              <div className={cn(
                "text-xl sm:text-2xl font-black tracking-tight",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-emerald-200" : "text-emerald-700 dark:text-emerald-300"
              )}>
                98%
              </div>
              <div className={cn(
                "text-xs font-bold",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-300" : "text-slate-700 dark:text-slate-300"
              )}>
                CSAT cao nhất đạt được
              </div>
            </div>
          </div>

          {/* Box 4: 20+ Năm quản trị vận hành */}
          <div className={cn(
            "flex items-center gap-3.5 p-4 rounded-2xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-2xl",
            (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-950/85 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] text-slate-100",
            theme === "glass-vivid" && "bg-gradient-to-br from-amber-950/80 via-orange-900/40 to-slate-950/80 border border-amber-400/40 text-white",
            theme === "clay" && "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-100",
            theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 text-slate-800 dark:text-slate-100",
            (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-br from-white/95 via-amber-50/80 to-orange-100/70 dark:from-slate-900/95 dark:via-amber-950/50 dark:to-orange-950/50 border-2 border-amber-300/90 dark:border-amber-500/60 shadow-[0_8px_25px_rgba(245,158,11,0.18)] hover:border-amber-500 text-slate-900 dark:text-white"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all shadow-md",
              (theme === "glass-neo" || theme === "glass-neon") ? "bg-amber-950/60 text-amber-300 border-amber-400/50" : "bg-gradient-to-tr from-amber-500 to-orange-500 text-white border-amber-200/80 dark:border-amber-700/60"
            )}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className={cn(
                "text-xl sm:text-2xl font-black tracking-tight",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-amber-200" : "text-amber-700 dark:text-amber-300"
              )}>
                20+
              </div>
              <div className={cn(
                "text-xs font-bold",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-300" : "text-slate-700 dark:text-slate-300"
              )}>
                Năm quản trị vận hành
              </div>
            </div>
          </div>

          {/* Box 5: Giá trị tạo ra */}
          <div className={cn(
            "flex items-center gap-3.5 p-4 rounded-2xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-2xl",
            (theme === "glass-neo" || theme === "glass-neon") && "bg-slate-950/85 border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.2)] text-slate-100",
            theme === "glass-vivid" && "bg-gradient-to-br from-fuchsia-950/80 via-indigo-900/40 to-slate-950/80 border border-fuchsia-400/40 text-white",
            theme === "clay" && "bg-white/90 dark:bg-slate-900/90 border-2 border-white dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-100",
            theme === "nec" && "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white dark:border-slate-800 text-slate-800 dark:text-slate-100",
            (!theme || theme === "light" || theme === "glass") && "bg-gradient-to-br from-white/95 via-fuchsia-50/80 to-purple-100/70 dark:from-slate-900/95 dark:via-fuchsia-950/50 dark:to-indigo-950/50 border-2 border-fuchsia-300/90 dark:border-fuchsia-500/60 shadow-[0_8px_25px_rgba(217,70,239,0.18)] hover:border-fuchsia-500 text-slate-900 dark:text-white"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all shadow-md",
              (theme === "glass-neo" || theme === "glass-neon") ? "bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-400/50" : "bg-gradient-to-tr from-fuchsia-600 via-pink-600 to-indigo-600 text-white border-fuchsia-200/80 dark:border-fuchsia-700/60"
            )}>
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className={cn(
                "text-xs font-black tracking-tight uppercase",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-fuchsia-200" : "text-fuchsia-800 dark:text-fuchsia-300"
              )}>
                Giá trị tạo ra
              </div>
              <div className={cn(
                "text-[11px] font-bold leading-tight mt-0.5",
                (theme === "glass-neo" || theme === "glass-neon") ? "text-slate-300" : "text-slate-700 dark:text-slate-300"
              )}>
                Trải nghiệm khách hàng xuất sắc và tăng trưởng bền vững
              </div>
            </div>
          </div>

        </div>

    </section>
  );
}
