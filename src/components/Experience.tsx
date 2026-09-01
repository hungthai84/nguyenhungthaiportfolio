import React, { useState } from "react";
import { 
  Calendar, 
  Users, 
  Star, 
  Gamepad2, 
  MapPin, 
  Trophy, 
  ClipboardList, 
  Folder, 
  CheckCircle2, 
  Quote, 
  Building2, 
  UserCheck, 
  X, 
  Maximize2, 
  LayoutGrid, 
  History, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  FileText,
  Shield,
  Layers,
  Search,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";
import { useTheme } from "../context/ThemeContext";
import { PageBanner } from "./PageBanner";
import { cn } from "../lib/utils";

// Milestone definition interface
export interface MilestoneData {
  key: string;
  year: string;
  period: string;
  company: string;
  subCompanies?: string;
  tag: string;
  tagColor: string;
  logo: string;
  headerTitle: string;
  highlightText: string;
  paragraphs: string[];
  headcount: number;
  role: string;
  roleSub: string;
  industry: string;
  duration: string;
  location: string;
  managementRole: string;
  managementHeadcount: string;
  kpis: { label: string; percent: number }[];
  tasks: string[];
  projects: string[];
  commitments: string[];
  photoUrl: string;
  photoCount: number;
}

const MILESTONES_DATA: Record<string, MilestoneData> = {
  "2003": {
    key: "2003",
    year: "2003",
    period: "Từ Năm 2003 đến Năm 2007",
    company: "Công ty Viễn Thông Mobifone",
    subCompanies: "(Cty Ánh Hào Quang - Mobifone)",
    tag: "Viễn thông",
    tagColor: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    headerTitle: "Năm 2003 – Khởi đầu nền tảng tại MobiFone",
    highlightText: "Tôi bắt đầu sự nghiệp tại MobiFone, nơi được đào tạo bài bản về dịch vụ khách hàng, xử lý khiếu nại và xây dựng quy trình chuẩn viễn thông.",
    paragraphs: [
      "Khởi đầu tại tập đoàn viễn thông hàng đầu Việt Nam giúp tôi rèn luyện tư duy đặt khách hàng làm trung tâm và tác phong vận hành chuẩn mực.",
      "Xử lý trực tiếp các tình huống sự cố phức tạp, nghe điện thoại tư vấn và hướng dẫn nghiệp vụ cho đội ngũ nhân viên mới.",
      "Năm 2007, tôi được bổ nhiệm làm Trưởng nhóm CSKH, trực tiếp điều phối đội ngũ 12 nhân sự và đảm bảo tỷ lệ hài lòng đạt trên 90%."
    ],
    headcount: 12,
    role: "Trưởng nhóm CSKH",
    roleSub: "Chăm sóc Khách hàng & Xử lý Khiếu nại",
    industry: "Viễn thông - Tổng đài",
    duration: "2003 – 2007 (4 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng nhóm Dịch vụ Khách hàng",
    managementHeadcount: "12 nhân sự trực thuộc",
    kpis: [
      { label: "Chỉ số hài lòng khách hàng (CSAT)", percent: 94 },
      { label: "Tỷ lệ giải quyết cuộc gọi đầu (FCR)", percent: 88 },
      { label: "Đào tạo nhân sự mới", percent: 96 },
      { label: "Tham gia dự án phòng ban", percent: 85 }
    ],
    tasks: [
      "Tư vấn giải đáp thông tin gói cước dịch vụ di động MobiFone",
      "Xử lý các ca khiếu nại phức tạp và cuộc gọi quấy rối",
      "Đào tạo và hướng dẫn nghiệp vụ tổng đài cho nhân viên mới",
      "Gọi điện Outbound chăm sóc và đo lường sự hài lòng",
      "Lập lịch ca trực và điều phối lưu lượng cuộc gọi hotline"
    ],
    projects: [
      "Chuẩn hóa kịch bản cuộc gọi tư vấn dịch vụ di động",
      "Xây dựng tài liệu đào tạo nghiệp vụ CSKH viễn thông",
      "Thiết lập quy trình theo dõi phiếu xử lý sự cố mạng"
    ],
    commitments: [
      "Đảm bảo 100% cuộc gọi khiếu nại được xử lý dứt điểm",
      "Giữ vững tỷ lệ CSAT trên 90% trong suốt thời gian đảm nhiệm"
    ],
    photoUrl: "https://i.ibb.co/6Rp6rqXt/Mobifone-1.webp",
    photoCount: 3
  },
  "2007": {
    key: "2007",
    year: "2007",
    period: "Từ Năm 2007 đến Năm 2011",
    company: "Công ty Viễn Liên V247",
    subCompanies: "(Điện thoại Viễn thông V247)",
    tag: "Viễn thông",
    tagColor: "bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    headerTitle: "Năm 2007 – Phát triển năng lực quản lý tại V247",
    highlightText: "Gia nhập Viễn Liên V247, tôi phát triển chuyên sâu kỹ năng quản lý vận hành tổng đài viễn thông quốc tế 24/7 và giám sát chất lượng.",
    paragraphs: [
      "Điều hành đội ngũ CSKH tư vấn dịch vụ viễn thông quốc tế giữa Mỹ và Việt Nam, đảm bảo thông suốt 24/7.",
      "Lập kế hoạch phân bổ nguồn lực, theo dõi lưu lượng cuộc gọi đến đa kênh (Phone, Email, Chat, Fax) và đánh giá chất lượng ghi âm.",
      "Biên soạn tài liệu hướng dẫn chuẩn SOP giúp nhân sự mới hòa nhập nhanh và nâng cao năng suất hỗ trợ khách hàng."
    ],
    headcount: 12,
    role: "Trưởng Nhóm CSKH",
    roleSub: "Giám sát Vận hành & Đào tạo CSKH",
    industry: "Viễn thông Quốc tế",
    duration: "2007 – 2011 (4 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Nhóm Chăm Sóc Khách Hàng",
    managementHeadcount: "12 nhân sự trực thuộc",
    kpis: [
      { label: "Chỉ số hài lòng dịch vụ (CSAT)", percent: 95 },
      { label: "Tỷ lệ đáp ứng cuộc gọi (SL)", percent: 90 },
      { label: "Biên soạn tài liệu SOP", percent: 100 },
      { label: "Đánh giá chất lượng QA", percent: 88 }
    ],
    tasks: [
      "Quản lý và phân phối cuộc gọi hotline cho các thành viên",
      "Lập lịch làm việc, ca trực 24/7 cho đội ngũ CSKH",
      "Nghe ghi âm cuộc gọi định kỳ và chấm điểm QA chất lượng",
      "Xử lý các sự cố kết nối cước viễn thông quốc tế V247",
      "Khảo sát sự hài lòng và ghi nhận phản hồi cải tiến"
    ],
    projects: [
      "Thiết lập biểu mẫu chấm điểm QA ghi âm cuộc gọi CSKH",
      "Triển khai quy trình hỗ trợ khách hàng qua Chat & Email",
      "Chuẩn hóa tài liệu hướng dẫn xử lý khiếu nại cước"
    ],
    commitments: [
      "Duy trì tổng đài vận hành thông suốt 24/7 không gián đoạn",
      "Chuẩn hóa 100% tài liệu quy trình hỗ trợ đa kênh"
    ],
    photoUrl: "https://i.ibb.co/gM7nPptY/V247-3.jpg",
    photoCount: 5
  },
  "2011": {
    key: "2011",
    year: "2011",
    period: "Từ Năm 2011 đến Năm 2013",
    company: "Công ty CPTTBR Cuộc Sống LBC",
    subCompanies: "(Truyền hình Cáp HTVC)",
    tag: "Truyền thông",
    tagColor: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    logo: "https://i.ibb.co/tpG5fMrt/LBC.png",
    headerTitle: "Năm 2011 – Bước ngoặt Quản trị tại LBC HTVC",
    highlightText: "Dấu mốc quan trọng khi tôi chính thức đảm nhiệm vị trí Trưởng phòng Dịch vụ Khách hàng, chuyển từ vận hành sang quản trị toàn diện.",
    paragraphs: [
      "Trực tiếp điều hành toàn bộ hoạt động của Phòng Dịch vụ Khách hàng truyền hình cáp HTVC.",
      "Xây dựng và chuẩn hóa hệ thống quy trình CSKH, thiết lập chỉ số KPI phòng ban, phối hợp với các phòng Marketing và Kỹ thuật.",
      "Tối ưu ngân sách CSKH, tổ chức các chương trình thăm hỏi khách hàng VIP và khảo sát đo lường mức độ hài lòng định kỳ."
    ],
    headcount: 12,
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    roleSub: "Quản trị Toàn diện P.CSKH",
    industry: "Truyền hình & Truyền thông",
    duration: "2011 – 2013 (2 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "12 nhân sự trực thuộc",
    kpis: [
      { label: "Chuẩn hóa quy trình phòng ban", percent: 100 },
      { label: "Chỉ số hài lòng khách hàng", percent: 92 },
      { label: "Hỗ trợ các chương trình lớn", percent: 85 },
      { label: "Tham gia triển khai dự án", percent: 80 }
    ],
    tasks: [
      "Điều hành toàn bộ hoạt động Phòng Dịch vụ Khách hàng LBC",
      "Xử lý khiếu nại sự cố tín hiệu truyền hình và lắp đặt",
      "Đào tạo và huấn luyện kỹ năng ứng xử cho nhân viên",
      "Phối hợp phòng Marketing tổ chức chương trình ưu đãi",
      "Thực hiện báo cáo phân tích đối thủ cạnh tranh ngành TV"
    ],
    projects: [
      "Xây dựng khung quy trình CSKH Truyền hình cáp HTVC",
      "Thiết lập hệ thống KPI và chính sách thưởng vận hành",
      "Quản lý chiến dịch Outbound chăm sóc khách hàng VIP"
    ],
    commitments: [
      "Chuẩn hóa 100% quy trình phục vụ khách hàng HTVC",
      "Nâng cao trải nghiệm dịch vụ truyền hình gia đình"
    ],
    photoUrl: "https://i.ibb.co/ZzjXpjsX/HTVC-1.webp",
    photoCount: 4
  },
  "2013": {
    key: "2013",
    year: "2013",
    period: "Từ Năm 2013 đến Năm 2016",
    company: "Công ty Cổ Phần Việt Nam eSport",
    subCompanies: "(VED, Shopee, Garena, ShopeePay)",
    tag: "eSport & Game",
    tagColor: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    logo: "https://i.ibb.co/fYPJLfbw/VED.png",
    headerTitle: "Năm 2013 – Garena và hành trình chuyển đổi số",
    highlightText: "Gia nhập Garena, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và nâng đáp ứng lượng khách hàng rất lớn.",
    paragraphs: [
      "Trong thời gian này, Garena phát triển mạnh với Liên Minh Huyền Thoại, đồng thời mở rộng thành Vietnam eSport và đầu tư vào nhiều lĩnh vực mới như Shopee, AirPay, Gcafe và Liên Quân Mobile.",
      "Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi môi trường đầy năng động giúp tôi rèn luyện tư duy hệ thống, kỹ năng lãnh đạo đội nhóm và khả năng thích nghi nhanh với thay đổi.",
      "Đặc biệt, việc tham gia vào giai đoạn phát triển ban đầu của Shopee giúp tôi tiếp cận tư duy quản trị thương mại điện tử hiện đại, từ hành trình khách hàng, trải nghiệm đa kênh, vận hành đến tự động hóa, làm nền tảng để tối trưởng thành từ chất lượng xử lý dữ liệu qua hoạt động.",
      "Tôi Garena, tôi trực tiếp quản lý 129 nhân sự, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, triển khai hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa.",
      "Làm việc trong môi trường tăng trưởng vượt bậc đã giúp tôi rèn luyện khả năng ra quyết định nhanh, nhạy, xử lý nhanh các tình huống phát sinh, điều phối nguồn lực hiệu quả và liên tục cải tiến quy trình để đáp ứng sự thay đổi của thị trường.",
      "Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: xây dựng hệ thống trước khi mở rộng quy mô, phát triển con người song hành công nghệ và luôn lấy khách hàng làm trung tâm trong mọi quyết định."
    ],
    headcount: 129,
    role: "Trưởng Phòng",
    roleSub: "Chăm Sóc Khách Hàng",
    industry: "Game – eSport – Fintech – TMĐT – Thanh toán",
    duration: "2013 – 2016 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "129 nhân sự trực thuộc",
    kpis: [
      { label: "Chỉ số hài lòng khách hàng", percent: 100 },
      { label: "Phản hồi & Hỗ trợ", percent: 80 },
      { label: "Hỗ trợ tự kiến tồn", percent: 70 },
      { label: "Tham gia dự án", percent: 80 }
    ],
    tasks: [
      "Tham gia xây dựng các dự án Sản phẩm mới",
      "Quản lý Đội ngũ và Tổ chức Phòng Dịch vụ Khách hàng",
      "Xây dựng Quy trình - Hệ thống Dịch vụ Khách hàng",
      "Xây dựng hệ thống CRM cho các dòng sản phẩm của Cty",
      "Đào tạo đội ngũ Dịch vụ Khách hàng và Giám sát vận hành hàng"
    ],
    projects: [
      "Xây dựng PC/SSH",
      "Thiết lập Hệ thống Tổng đài",
      "Quản lý dự án CSKH",
      "Chuẩn hóa quy trình CSKH",
      "Xây dựng hệ thống CRM",
      "Triển khai hệ thống trực tuyến",
      "Thành lập Trung tâm Hỗ trợ Khách hàng"
    ],
    commitments: [
      "Chuẩn hóa SOP quy trình dịch vụ khách hàng đa kênh",
      "Đào tạo & Quản trị năng suất đội ngũ theo chỉ số CSAT & NPS"
    ],
    photoUrl: "https://i.ibb.co/ds1qm1WD/VED-1.webp",
    photoCount: 4
  },
  "2016": {
    key: "2016",
    year: "2016",
    period: "Từ Năm 2016 đến Năm 2018",
    company: "Công ty Bảo hiểm Nhân thọ Prudential",
    subCompanies: "(Prudential Việt Nam)",
    tag: "Bảo hiểm",
    tagColor: "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    headerTitle: "Năm 2016 – Prudential Việt Nam & Chuẩn mực Bảo hiểm",
    highlightText: "Tại Prudential, tôi quản trị trải nghiệm khách hàng bảo hiểm – ngành dịch vụ đòi hỏi tính chính xác, minh bạch và sự tin cậy tuyệt đối.",
    paragraphs: [
      "Quản lý hệ thống Call Center bảo hiểm chuẩn mực quốc tế của Prudential Việt Nam.",
      "Xây dựng và kết nối mô hình E-commerce bảo hiểm với hệ thống Call Center, tiên phong triển khai kênh tư vấn bảo hiểm qua Videocall.",
      "Tái cấu trúc hệ thống phương án dự phòng sự cố BCP (Business Continuity Plan) và phối hợp giải quyết quyền lợi đáo hạn cho hàng nghìn hợp đồng."
    ],
    headcount: 12,
    role: "Trưởng Phòng CallCenter",
    roleSub: "Quản trị Trải nghiệm & CallCenter Bảo hiểm",
    industry: "Bảo hiểm Nhân thọ",
    duration: "2016 – 2018 (2 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Call Center",
    managementHeadcount: "12 nhân sự trực thuộc",
    kpis: [
      { label: "Quản lý Call Center chuẩn mực", percent: 95 },
      { label: "Kết nối E-commerce Bảo hiểm", percent: 85 },
      { label: "Tư vấn kênh Videocall", percent: 80 },
      { label: "Hoàn thiện hệ thống BCP", percent: 90 }
    ],
    tasks: [
      "Quản lý hệ thống Callcenter bảo hiểm Prudential",
      "Sắp xếp điều phối nhân sự vận hành cho hệ thống mới",
      "Xây dựng quy trình kết nối E-commerce với Callcenter",
      "Tối ưu quy trình quản trị tư vấn bảo hiểm Videocall",
      "Cập nhật và chỉnh sửa hệ thống BCP phòng ngừa rủi ro"
    ],
    projects: [
      "Dự án kết nối E-commerce & Callcenter Prudential",
      "Triển khai kênh tư vấn Videocall bảo hiểm",
      "Tối ưu hóa BCP vận hành liên tục cho Contact Center"
    ],
    commitments: [
      "Đảm bảo tính chính xác và bảo mật tuyệt đối cho dữ liệu hợp đồng",
      "Duy trì tiêu chuẩn hỗ trợ khách hàng bảo hiểm cao cấp"
    ],
    photoUrl: "https://i.ibb.co/CK2Y62Zy/Prudential-1.webp",
    photoCount: 7
  },
  "2018": {
    key: "2018",
    year: "2018",
    period: "Từ Năm 2018 đến Năm 2021",
    company: "Công ty Cổ Phần Mservice",
    subCompanies: "(Ví điện tử MoMo)",
    tag: "FinTech",
    tagColor: "bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    headerTitle: "Năm 2018 – Ví điện tử MoMo & Tối ưu hóa FinTech",
    highlightText: "Mở rộng chuyên môn trong lĩnh vực tài chính số tại Ví MoMo, tập trung tối ưu quy trình CSKH đa kênh quy mô hàng triệu người dùng.",
    paragraphs: [
      "Quản lý Phòng Dịch vụ Khách hàng đa kênh tại Ví MoMo (Inbound, Chat, Email, Social, BPO).",
      "Xây dựng hệ thống CRM số hóa, nâng cấp quy trình phối hợp với bộ phận Pháp lý & Rủi ro tài chính.",
      "Quản lý đối tác BPO Mắt Bảo, thành lập Trung tâm hỗ trợ khách hàng và chịu trách nhiệm toàn bộ các chỉ số KPI vận hành phòng ban."
    ],
    headcount: 60,
    role: "Trưởng Phòng CSKH",
    roleSub: "Vận hành CSKH Đa kênh & Quản lý BPO",
    industry: "FinTech & Ví điện tử",
    duration: "2018 – 2021 (3 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "60 nhân sự trực thuộc",
    kpis: [
      { label: "Chuẩn hóa quy trình CRM MoMo", percent: 100 },
      { label: "Chỉ số hài lòng khách hàng CSAT", percent: 96 },
      { label: "Quản lý hiệu suất BPO", percent: 90 },
      { label: "Tỷ lệ giải quyết sự cố 24h", percent: 88 }
    ],
    tasks: [
      "Quản lý phòng Dịch vụ Khách hàng đa kênh MoMo",
      "Xây dựng hệ thống CRM quan hệ khách hàng số hóa",
      "Xây dựng quy trình phối hợp xử lý tra soát tài chính",
      "Quản lý đối tác BPO Mắt Bảo đạt cam kết SLA",
      "Thành lập Trung tâm Hỗ trợ Khách hàng MoMo"
    ],
    projects: [
      "Dự án tích hợp CRM tự động hóa hỗ trợ MoMo",
      "Thành lập Trung tâm CSKH FinTech quy mô lớn",
      "Triển khai quy trình tra soát và khiếu nại giao dịch số"
    ],
    commitments: [
      "Chuẩn hóa 100% quy trình xử lý tra soát ví điện tử",
      "Nâng cao chỉ số CSAT & NPS toàn hệ thống MoMo"
    ],
    photoUrl: "https://i.ibb.co/S7ySGnvC/Momo-1.webp",
    photoCount: 8
  },
  "2023": {
    key: "2023",
    year: "2023",
    period: "Từ Năm 2023 đến Năm 2024",
    company: "Công ty Cổ Phần Công Nghệ Finviet",
    subCompanies: "(Ví điện tử ECO)",
    tag: "FinTech",
    tagColor: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    headerTitle: "Năm 2023 – Finviet Ví ECO & Hệ thống B2B/B2C",
    highlightText: "Tại Finviet Ví ECO, tôi hoàn thiện mô hình CSKH hiện đại kết hợp quy trình chuẩn hóa, công nghệ tự động và trải nghiệm đối tác.",
    paragraphs: [
      "Điều hành phòng CSKH phục vụ dịch vụ tài chính B2B/B2C và mạng lưới đại lý ECO trên toàn quốc.",
      "Triển khai xây dựng AI Bot, tối ưu hóa kênh hỗ trợ đại lý, nâng cao tỷ lệ giải quyết sự cố giao dịch trong ngày.",
      "Đánh giá huấn luyện nhân sự, lập kế hoạch lịch trình ca trực và thực hiện các nhiệm vụ chiến lược từ Ban Giám Đốc."
    ],
    headcount: 17,
    role: "Trưởng Phòng CSKH",
    roleSub: "Quản lý & Giám sát Vận hành CSKH",
    industry: "FinTech & Tài chính B2B/B2C",
    duration: "2023 – 2024 (1 năm)",
    location: "Hồ Chí Minh, Việt Nam",
    managementRole: "Trưởng Phòng Dịch vụ Khách hàng",
    managementHeadcount: "17 nhân sự trực thuộc",
    kpis: [
      { label: "Chuẩn hóa quy trình CSKH ECO", percent: 100 },
      { label: "Chỉ số hài lòng đối tác B2B", percent: 95 },
      { label: "Triển khai AI Bot hỗ trợ", percent: 90 },
      { label: "Tỷ lệ xử lý sự cố trong ngày", percent: 92 }
    ],
    tasks: [
      "Quản lý và giám sát đội ngũ Dịch vụ Khách hàng ECO",
      "Phân bổ điều phối lưu lượng cuộc gọi đến hotline",
      "Đánh giá huấn luyện kỹ năng giao tiếp và xử lý khiếu nại",
      "Xây dựng AI Bot hỗ trợ trả lời tự động cho đại lý",
      "Nghe ghi âm định hướng chiến lược đào tạo nhân sự"
    ],
    projects: [
      "Thử nghiệm AI Bot giải đáp thắc mắc dịch vụ ECO",
      "Tối ưu hóa kênh hỗ trợ đa kênh đại lý Finviet",
      "Chuẩn hóa bộ chỉ số đo lường hiệu quả vận hành"
    ],
    commitments: [
      "Xây dựng dịch vụ CSKH tài chính chuyên nghiệp và minh bạch",
      "100% chuẩn hóa quy trình tiếp nhận và giải quyết yêu cầu"
    ],
    photoUrl: "https://i.ibb.co/Rp4jmTWF/Finviet-1.webp",
    photoCount: 1
  },
  "2026": {
    key: "2026",
    year: "2026",
    period: "Từ Năm 2026 đến Hiện tại",
    company: "Chiến Lược Lãnh Đạo CSKH 2026+",
    subCompanies: "(Head of CS / CS Director - Technology & FinTech)",
    tag: "Lãnh đạo Chiến lược",
    tagColor: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    logo: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
    headerTitle: "Năm 2026 – Sẵn sàng thử thách Lãnh đạo cấp cao",
    highlightText: "Sẵn sàng đảm nhận vị trí Head of CS / CS Director tại các doanh nghiệp Công nghệ, FinTech, Bảo hiểm với định hướng AI Automation.",
    paragraphs: [
      "Tiên phong kiến tạo mô hình 'AI-First Customer Experience' kết hợp huấn luyện nhân sự thực chiến.",
      "Ứng dụng Generative AI, Chatbot thông minh và CRM Automation thế hệ mới để nâng tầm dịch vụ khách hàng xuất sắc.",
      "Xây dựng hệ thống bộ chỉ số chuẩn quốc tế CSAT, NPS, FCR, CES và đào tạo nguồn nhân lực lãnh đạo kế thừa."
    ],
    headcount: 100,
    role: "Head of CS",
    roleSub: "CS Director & CX Strategist",
    industry: "Công nghệ - FinTech - AI",
    duration: "2026 – Hiện tại",
    location: "Hồ Chí Minh & Toàn quốc",
    managementRole: "Giám đốc / Trưởng phòng CSKH",
    managementHeadcount: "Định hướng quy mô lớn",
    kpis: [
      { label: "Sẵn sàng vận hành chiến lược 24/7", percent: 100 },
      { label: "Ứng dụng AI Chatbot & Automation", percent: 98 },
      { label: "Tối ưu hóa chỉ số CSAT / NPS", percent: 98 },
      { label: "Chuẩn hóa quy trình SOP 2026+", percent: 96 }
    ],
    tasks: [
      "Hoạch định và thực thi chiến lược Trải nghiệm Khách hàng 2026+",
      "Tích hợp công nghệ Generative AI & Automation CRM thế hệ mới",
      "Chuẩn hóa & Tối ưu hóa quy trình vận hành Contact Center",
      "Xây dựng bộ chỉ số KPI, CSAT, NPS, FCR chuẩn quốc tế",
      "Đào tạo, huấn luyện & Phát triển đội ngũ lãnh đạo kế thừa"
    ],
    projects: [
      "Xây dựng chiến lược CX Strategy 2026+",
      "Tích hợp Generative AI vào quy trình CSKH tự động",
      "Chuyển đổi số Omnichannel Contact Center"
    ],
    commitments: [
      "Sẵn sàng tạo dựng đột phá trải nghiệm khách hàng cho doanh nghiệp",
      "Ứng dụng AI nâng cao năng suất và chỉ số hài lòng khách hàng"
    ],
    photoUrl: "https://i.ibb.co/wNTXx871/T-m-Job.jpg",
    photoCount: 1
  }
};

const TIMELINE_ORDER = ["2003", "2007", "2011", "2013", "2016", "2018", "2023", "2026"];

export default function Experience() {
  const { lang } = useLanguage();
  const { playSound } = useSound();
  const { theme } = useTheme();
  
  const [activeYear, setActiveYear] = useState<string>("2013");
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline");
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isVi = lang === "vi";
  const current = MILESTONES_DATA[activeYear] || MILESTONES_DATA["2013"];

  const getCardStyle = () => {
    switch (theme as any) {
      case "light":
        return "glass-surface bg-white/85 border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl text-slate-900";
      case "glass-dark":
        return "glass-surface bg-slate-950/45 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.12)] backdrop-blur-2xl text-white";
      case "glass-vivid":
        return "glass-surface border-2 border-white/40 shadow-[0_20px_50px_rgba(124,58,237,0.35)] backdrop-blur-2xl text-slate-900 dark:text-white";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white/90 dark:border-slate-800 shadow-[-12px_-12px_30px_rgba(255,255,255,0.95),_12px_12px_36px_rgba(163,177,198,0.45)] dark:shadow-[-8px_-8px_24px_rgba(255,255,255,0.05),_8px_8px_30px_rgba(0,0,0,0.6)] text-slate-900 dark:text-white";
      case "clay":
        return "glass-surface border-2 border-white shadow-[0_20px_40px_rgba(140,150,200,0.35)] backdrop-blur-2xl text-slate-900 dark:text-white";
      case "glass-neon":
      case "glass-neo":
        return "glass-surface border-2 border-cyan-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.35)] backdrop-blur-2xl text-slate-900 dark:text-cyan-50";
      default:
        return "glass-surface bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.2)] backdrop-blur-2xl text-slate-900 dark:text-white";
    }
  };

  const handleSelectYear = (key: string) => {
    playSound?.("click");
    setActiveYear(key);
  };

  // Filtered keys for list view mode
  const filteredKeys = TIMELINE_ORDER.filter((key) => {
    const item = MILESTONES_DATA[key];
    if (!item) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.company.toLowerCase().includes(q) ||
      item.headerTitle.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.year.includes(q) ||
      item.industry.toLowerCase().includes(q)
    );
  });

  return (
    <section id="experience" className="relative min-h-full flex flex-col justify-start font-sans text-slate-800 dark:text-slate-100 w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-3.5">
      
      {/* ================= 1. INTEGRATED CAREER EXPERIENCE HERO BANNER ================= */}
      <div className="w-full mb-5">
        <PageBanner
          title={isVi ? "Kinh nghiệm sự nghiệp" : "Career Experience"}
          subtitle={isVi ? "Kinh nghiệm là tài sản vô giá, sự kiên trì là chìa khóa chinh phục đỉnh cao." : "Experience is an invaluable asset; perseverance is the key to conquering heights."}
          tag={isVi ? "KINH NGHIỆM" : "EXPERIENCE"}
          iconType="experience"
          gradient="from-slate-950 via-indigo-950 to-slate-950"
        />
      </div>

      {/* View Toggles Row (Dòng thời gian & Danh sách) moved below the bottom of the banner */}
      <div className="w-full flex items-center justify-center mb-5">
        <div className="flex items-center gap-1.5 bg-white/75 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-slate-300/80 dark:border-white/20 shadow-xs">
          <button
            type="button"
            onClick={() => {
              playSound?.("click");
              setViewMode("timeline");
            }}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer",
              viewMode === "timeline"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            )}
          >
            <History className="w-3.5 h-3.5" />
            <span>{isVi ? "Dòng thời gian" : "Timeline"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound?.("click");
              setViewMode("list");
            }}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer",
              viewMode === "list"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{isVi ? "Danh sách" : "List"}</span>
          </button>
        </div>
      </div>

      {/* ================= 3. TIMELINE NODE CAROUSEL (TOP ROW) ================= */}
      {viewMode === "timeline" && (
        <div className="glass-surface border-2 border-white dark:border-slate-700 shadow-[0_14px_34px_rgba(160,165,210,0.32),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl rounded-3xl mb-[15px] p-0 sm:p-0 pt-0 pb-0 pl-0 pr-0 overflow-hidden">
          
          <div className="relative py-2 px-1">
            {/* Connecting Horizontal Dotted Line */}
            <div className="absolute top-[52px] left-8 right-8 h-[2px] border-b-2 border-dashed border-blue-400/60 dark:border-blue-500/50 pointer-events-none z-0" />

            {/* Timeline Nodes Carousel */}
            <div className="relative z-10 flex items-center justify-between overflow-x-auto custom-scrollbar pb-0 gap-2 sm:gap-4">
              {TIMELINE_ORDER.map((key, idx) => {
                const item = MILESTONES_DATA[key];
                const isActive = activeYear === key;
                const isFourth = idx === 3;

                return (
                  <div 
                    key={key} 
                    className="flex flex-col items-center shrink-0 cursor-pointer group"
                    onClick={() => handleSelectYear(key)}
                  >
                    {/* Top Year Label */}
                    <span className={cn(
                      "text-xs font-extrabold mb-2.5 transition-colors",
                      isActive ? "text-blue-600 dark:text-blue-400 scale-110" : "text-slate-600 dark:text-slate-400 group-hover:text-blue-500"
                    )}>
                      {isVi ? `Năm ${item.year}` : `Year ${item.year}`}
                    </span>

                    {/* Circular Logo Node */}
                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-spin-slow opacity-80 blur-xs" />
                      )}

                      <div className={cn(
                        "rounded-full bg-white dark:bg-slate-800 flex items-center justify-center transition-all duration-300 shadow-md relative z-10",
                        isFourth
                          ? "p-0 h-[75px] w-[75px] border border-solid border-slate-300 dark:border-slate-600"
                          : (isActive 
                              ? "p-1.5 w-16 h-16 sm:w-18 sm:h-18 border-4 border-blue-600 dark:border-blue-400 scale-110 shadow-blue-500/30 ring-4 ring-blue-100 dark:ring-blue-950" 
                              : "p-1.5 w-11 h-11 sm:w-13 sm:h-13 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:scale-105")
                      )}>
                        <img 
                          src={item.logo} 
                          alt={item.company} 
                          className="w-full h-full object-contain rounded-full select-none"
                        />
                      </div>
                    </div>

                    {/* Bottom Company Short Label */}
                    <span className={cn(
                      "mt-2 text-[11px] font-bold max-w-[80px] sm:max-w-[100px] truncate text-center transition-colors",
                      isActive ? "text-blue-700 dark:text-blue-300 font-black" : "text-slate-600 dark:text-slate-400"
                    )}>
                      {item.company.split("(")[0].trim()}
                    </span>

                    {/* Active Indicator Arrow */}
                    {isActive && (
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-blue-600 dark:border-b-blue-400 mt-1 animate-bounce" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. MAIN ACTIVE MILESTONE DISPLAY CARD ================= */}
      {viewMode === "timeline" && current && (
        <div className="space-y-6">

          {/* === TOP SUB-HEADER & MAIN CONTENT CONTAINER === */}
          <div className={cn(getCardStyle(), "p-5 sm:p-7 space-y-6 rounded-3xl")}>
            
            {/* Top Sub-Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
              
              {/* Left Logo + Company Info */}
              <div className="flex items-start gap-4">
                {/* Large Double Ringed Logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 border-4 border-blue-600/30 dark:border-blue-500/30 shadow-lg flex items-center justify-center shrink-0">
                  <img 
                    src={current.logo} 
                    alt={current.company} 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                <div className="space-y-1">
                  {/* Calendar Badge Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-black border border-blue-200 dark:border-blue-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{current.period}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {current.company}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {current.subCompanies && (
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {current.subCompanies}
                      </span>
                    )}
                    <span className={cn("text-xs font-extrabold px-3 py-0.5 rounded-full border shadow-2xs", current.tagColor)}>
                      {current.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Photo Card Block */}
              {current.photoUrl && (
                <div 
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-all shrink-0 self-start lg:self-center"
                  onClick={() => setIsPhotoViewerOpen(true)}
                >
                  <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                    <img 
                      src={current.photoUrl} 
                      alt="Card Kỷ niệm" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center gap-1 text-xs font-black text-rose-600 dark:text-rose-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isVi ? "Card Kỷ niệm" : "Memorable Card"}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {current.photoCount} {isVi ? "hình ảnh" : "photos"}
                    </p>
                  </div>
                  <Maximize2 className="w-4 h-4 text-slate-400 ml-1" />
                </div>
              )}
            </div>

            {/* Middle Grid: Detail Box (Left) & Sidebar Specs (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Translucent Blue Detail Box */}
              <div className="lg:col-span-8 bg-blue-50/70 dark:bg-slate-900/60 border border-blue-200/80 dark:border-blue-900/60 rounded-3xl p-5 sm:p-6 shadow-inner space-y-4">
                
                {/* Header Title Box */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-blue-200/60 dark:border-blue-900/40">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-blue-900 dark:text-blue-200">
                    {current.headerTitle}
                  </h4>
                </div>

                {/* Paragraphs */}
                <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-3 font-medium text-justify">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {current.highlightText}
                  </p>
                  {current.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      {p.includes("Shopee") || p.includes("Garena") || p.includes("129") ? (
                        <span dangerouslySetInnerHTML={{
                          __html: p
                            .replace(/Shopee/g, "<strong class='text-blue-700 dark:text-blue-400 font-extrabold'>Shopee</strong>")
                            .replace(/Garena/g, "<strong class='text-blue-700 dark:text-blue-400 font-extrabold'>Garena</strong>")
                            .replace(/129 nhân sự/g, "<strong class='text-blue-700 dark:text-blue-400 font-extrabold'>129 nhân sự</strong>")
                            .replace(/Liên Minh Huyền Thoại/g, "<strong class='text-blue-700 dark:text-blue-400 font-extrabold'>Liên Minh Huyền Thoại</strong>")
                            .replace(/Vietnam eSport/g, "<strong class='text-blue-700 dark:text-blue-400 font-extrabold'>Vietnam eSport</strong>")
                        }} />
                      ) : p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Column: Quick Specs Sidebar Box */}
              <div className="lg:col-span-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                
                <div className="space-y-4">
                  {/* Item 1: Quy mô quản lý */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight block">
                        {isVi ? "Quy mô quản lý" : "Management Scale"}
                      </span>
                      <p className="text-sm font-black text-slate-900 dark:text-white">
                        <span className="text-blue-600 dark:text-blue-400 text-lg mr-1">{current.headcount}</span> 
                        {isVi ? "nhân sự trực thuộc" : "team members"}
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Vị trí & chức năng */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Star className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight block">
                        {isVi ? "Vị trí & chức năng" : "Role & Title"}
                      </span>
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                        {current.role}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {current.roleSub}
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Lĩnh vực */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight block">
                        {isVi ? "Lĩnh vực" : "Industry Sector"}
                      </span>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                        {current.industry}
                      </p>
                    </div>
                  </div>

                  {/* Item 4: Thời gian */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight block">
                        {isVi ? "Thời gian" : "Tenure & Duration"}
                      </span>
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {current.duration}
                      </p>
                    </div>
                  </div>

                  {/* Item 5: Địa điểm */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight block">
                        {isVi ? "Địa điểm" : "Location"}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                        {current.location}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* === 5-CARD DASHBOARD GRID (01 QUẢN LÝ, 02 KẾT QUẢ, 03 CÔNG VIỆC, 04 DỰ ÁN, 05 CAM KẾT) MOVED INSIDE JOB CARD === */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              
              {/* CARD 01: QUẢN LÝ */}
              <div className="glass-surface border border-slate-200/90 dark:border-slate-700/80 shadow-xs backdrop-blur-xl rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    01
                  </div>
                  <h4 className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-tight">
                    {isVi ? "QUẢN LÝ" : "MANAGEMENT"}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">
                        {isVi ? "Chức danh:" : "Title:"}
                      </span>
                      <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                        {current.managementRole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">
                        {isVi ? "Quy mô:" : "Scale:"}
                      </span>
                      <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                        {current.managementHeadcount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 02: KẾT QUẢ & KPI */}
              <div className="glass-surface border border-slate-200/90 dark:border-slate-700/80 shadow-xs backdrop-blur-xl rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    02
                  </div>
                  <h4 className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-tight">
                    {isVi ? "KẾT QUẢ & KPI" : "KPIS & RESULTS"}
                  </h4>
                </div>

                <div className="space-y-2">
                  {current.kpis.map((kpi, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[110px]">{kpi.label}</span>
                        <span className="font-black text-emerald-600 dark:text-emerald-400">{kpi.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-emerald-500 shadow-xs" 
                          style={{ width: `${kpi.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 03: CÔNG VIỆC */}
              <div className="glass-surface border border-slate-200/90 dark:border-slate-700/80 shadow-xs backdrop-blur-xl rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                  <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    03
                  </div>
                  <h4 className="text-xs font-black text-purple-700 dark:text-purple-400 uppercase tracking-tight">
                    {isVi ? "CÔNG VIỆC" : "TASKS"}
                  </h4>
                </div>

                <div className="space-y-2">
                  {current.tasks.slice(0, 5).map((task, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      <span className="w-3.5 h-3.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-tight line-clamp-2">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 04: DỰ ÁN */}
              <div className="glass-surface border border-slate-200/90 dark:border-slate-700/80 shadow-xs backdrop-blur-xl rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2.5">
                  <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    04
                  </div>
                  <h4 className="text-xs font-black text-orange-700 dark:text-orange-400 uppercase tracking-tight">
                    {isVi ? "DỰ ÁN" : "PROJECTS"}
                  </h4>
                </div>

                <div className="space-y-1.5">
                  {current.projects.slice(0, 6).map((proj, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-orange-50/70 dark:bg-orange-950/40 p-1 rounded-lg border border-orange-200/60 dark:border-orange-900/40">
                      <FileText className="w-3 h-3 text-orange-600 dark:text-orange-400 shrink-0" />
                      <span className="truncate">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 05: CAM KẾT & GRAPHIC */}
              <div className="glass-surface border border-slate-200/90 dark:border-slate-700/80 shadow-xs backdrop-blur-xl rounded-2xl p-4 space-y-3 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2.5 mb-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      05
                    </div>
                    <h4 className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-tight">
                      {isVi ? "CAM KẾT" : "COMMITMENTS"}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {current.commitments.map((cmt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{cmt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative 3D Trophy Vector Graphic */}
                <div className="pt-2 flex justify-end">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 p-2 text-white flex items-center justify-center shadow-md shadow-amber-500/20 transform hover:scale-105 transition-transform">
                    <Trophy className="w-7 h-7 drop-shadow-md" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* === BOTTOM QUOTE BANNER === */}
          <div className="glass-surface border-2 border-white dark:border-slate-700 shadow-[0_14px_34px_rgba(160,165,210,0.32),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
            
            <div className="flex items-center gap-4">
              {/* Purple Quote Circle Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Quote className="w-6 h-6" />
              </div>

              <div className="space-y-0.5">
                <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug">
                  {isVi 
                    ? "Mỗi dự án là một chặng đường học hỏi."
                    : "Every project is a learning journey."}
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-purple-700 dark:text-purple-300">
                  {isVi 
                    ? "Mỗi kết quả là minh chứng cho sự nỗ lực không ngừng."
                    : "Every result is proof of non-stop dedication."}
                </p>
              </div>
            </div>

            {/* Target 3D Bullseye Graphic Illustration */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-2 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
              <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
              </svg>
            </div>
          </div>

        </div>
      )}

      {/* ================= 5. LIST VIEW MODE ================= */}
      {viewMode === "list" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKeys.map((key) => {
              const item = MILESTONES_DATA[key];
              return (
                <div 
                  key={key} 
                  className="glass-surface border-2 border-white dark:border-slate-700 shadow-[0_14px_34px_rgba(160,165,210,0.32),inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-2xl rounded-3xl p-5 hover:border-blue-500 transition-all cursor-pointer space-y-3"
                  onClick={() => {
                    setActiveYear(key);
                    setViewMode("timeline");
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white p-1.5 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
                        <img src={item.logo} alt={item.company} className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
                          {item.company}
                        </h4>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {item.role}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-black">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-medium">
                    {item.highlightText}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {item.duration} • {item.headcount} nhân sự
                    </span>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span>{isVi ? "Xem chi tiết" : "Details"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= PHOTO VIEWER MODAL ================= */}
      {isPhotoViewerOpen && current.photoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl">
            <button 
              type="button" 
              onClick={() => setIsPhotoViewerOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 sm:p-6 text-center">
              <img 
                src={current.photoUrl} 
                alt={current.company} 
                className="max-h-[70vh] w-auto mx-auto rounded-2xl object-contain"
              />
              <p className="mt-4 text-sm font-bold text-slate-200">
                {current.company} — {current.period}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
