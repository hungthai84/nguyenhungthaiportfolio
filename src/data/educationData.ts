export interface EducationCard {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  type: "tech" | "management";
  image: string;
  courseImg: string;
  certImg: string;
  desc: string;
  modules: string[];
  results: string[];
  icon: string;
  theme: {
    text: string;
    badge: string;
    iconBg: string;
  };
}

export const DEFAULT_EDUCATION_CARDS: EducationCard[] = [
  {
    id: 1,
    title: "Thiết kế Webpages",
    subtitle: "Tự học & Phát triển chuyên môn",
    year: "Năm 2024",
    type: "tech",
    image: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    courseImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    certImg: "",
    desc: "Được trang bị kiến thức về phát triển website hiện đại với HTML5, CSS3, JavaScript, PHP và C++, đồng thời nâng cao kỹ năng thiết kế giao diện Responsive, tối ưu trải nghiệm người dùng (UI/UX) và ứng dụng AI trong phát triển website.",
    modules: [
      "Module 1: HTML5, CSS3 & Responsive UI Design",
      "Module 2: JavaScript ES6+ & Dynamic Web Apps",
      "Module 3: Lập trình Backend với PHP & MySQL/C++",
      "Module 4: Tối ưu UI/UX & Tích hợp AI Toolkits"
    ],
    results: [
      "Xây dựng thành công 5+ dự án Web Application thực tế",
      "Tối ưu tốc độ tải trang đạt 95+ điểm Lighthouse",
      "Thành thạo quy trình thiết kế UI/UX theo tiêu chuẩn 2026"
    ],
    icon: "code",
    theme: { text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300", iconBg: "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400" }
  },
  {
    id: 2,
    title: "Phân tích dữ liệu Big Data",
    subtitle: "Phát triển chuyên môn",
    year: "Năm 2019",
    type: "tech",
    image: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    courseImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    certImg: "",
    desc: "Nâng cao năng lực phân tích và trực quan hóa dữ liệu, xây dựng hệ thống báo cáo, KPI và Dashboard nhằm hỗ trợ quản trị và ra quyết định dựa trên dữ liệu.",
    modules: [
      "Module 1: Cơ sở dữ liệu lớn & SQL Nâng cao",
      "Module 2: Trực quan hóa dữ liệu với PowerBI / Tableau",
      "Module 3: Thiết lập KPI & Báo cáo quản trị số",
      "Module 4: Mô hình hóa dữ liệu dự báo kinh doanh"
    ],
    results: [
      "Xây dựng 10+ Executive Dashboards quản trị",
      "Tự động hóa 80% quy trình tổng hợp báo cáo",
      "Tăng chính xác trong dự báo xu hướng kinh doanh"
    ],
    icon: "database",
    theme: { text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300", iconBg: "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" }
  },
  {
    id: 3,
    title: "Quản lý rủi ro",
    subtitle: "Prudential Việt Nam",
    year: "Năm 2017",
    type: "management",
    image: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    courseImg: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    certImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    desc: "Được đào tạo phương pháp nhận diện, đánh giá và kiểm soát rủi ro, xây dựng kế hoạch ứng phó nhằm giảm thiểu tác động và đảm bảo hiệu quả vận hành dự án.",
    modules: [
      "Module 1: Nhận diện & Phân loại rủi ro vận hành",
      "Module 2: Phương pháp đánh giá định lượng rủi ro",
      "Module 3: Kế hoạch ứng phó & Giảm thiểu tổn thất",
      "Module 4: Giám sát & Báo cáo tuân thủ doanh nghiệp"
    ],
    results: [
      "Giảm thiểu 35% sự cố phát sinh trong vận hành",
      "Xây dựng Ma trận kiểm soát rủi ro chuẩn hóa",
      "Đạt chứng nhận hoàn thành xuất sắc từ Prudential"
    ],
    icon: "shield-alert",
    theme: { text: "text-rose-600 dark:text-rose-400", badge: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300", iconBg: "bg-rose-100/80 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" }
  },
  {
    id: 4,
    title: "Quản lý Dự án",
    subtitle: "Prudential Việt Nam",
    year: "Năm 2016",
    type: "management",
    image: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    courseImg: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    certImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    desc: "Nắm vững quy trình quản lý dự án từ lập kế hoạch, phân bổ nguồn lực, quản lý tiến độ, ngân sách, chất lượng đến đánh giá hiệu quả sau khi triển khai.",
    modules: [
      "Module 1: Khởi tạo & Lập kế hoạch dự án chuẩn PMP",
      "Module 2: Quản lý ngân sách, Tiến độ & Nguồn lực",
      "Module 3: Quản lý chất lượng & Giao tiếp nhóm",
      "Module 4: Nghiệm thu & Đánh giá hiệu quả triển khai"
    ],
    results: [
      "Đã điều phối thành công nhiều dự án lớn đúng hạn",
      "Tối ưu 20% chi phí vận hành nhờ phân bổ hiệu quả",
      "Chứng nhận Quản lý Dự án Chuyên nghiệp Prudential"
    ],
    icon: "briefcase",
    theme: { text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300", iconBg: "bg-amber-100/80 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400" }
  },
  {
    id: 5,
    title: "Quản lý cấp cao",
    subtitle: "Dale Carnegie Training",
    year: "Năm 2015",
    type: "management",
    image: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    courseImg: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    certImg: "https://i.ibb.co/zT5MVFmt/Qu-n-l-c-p-cao.png",
    desc: "Phát triển tư duy lãnh đạo, quản trị chiến lược, xây dựng đội ngũ và nâng cao năng lực điều hành tổ chức trong môi trường doanh nghiệp.",
    modules: [
      "Module 1: Nghệ thuật lãnh đạo & Truyền cảm hứng",
      "Module 2: Hoạch định chiến lược doanh nghiệp",
      "Module 3: Xây dựng văn hóa & Động lực làm việc",
      "Module 4: Ra quyết định điều hành cấp cao"
    ],
    results: [
      "Phát triển kỹ năng điều hành tổ chức toàn diện",
      "Nâng cao năng lực dẫn dắt đội ngũ quy mô lớn",
      "Chứng chỉ Lãnh đạo Cấp cao Dale Carnegie USA"
    ],
    icon: "award",
    theme: { text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300", iconBg: "bg-violet-100/80 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400" }
  },
  {
    id: 6,
    title: "Quản lý cấp trung",
    subtitle: "Dale Carnegie Training",
    year: "Năm 2014",
    type: "management",
    image: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    courseImg: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    certImg: "https://i.ibb.co/v6JvfyR4/Qu-n-l-c-p-trung.png",
    desc: "Hoàn thiện kỹ năng quản lý nhân sự, phân công công việc, giám sát hiệu quả thực hiện, huấn luyện nhân viên và phối hợp giữa các phòng ban.",
    modules: [
      "Module 1: Kỹ năng phân công & Ủy quyền công việc",
      "Module 2: Huấn luyện & Phát triển năng lực nhân viên",
      "Module 3: Giám sát & Đánh giá hiệu suất (KPI/OKRs)",
      "Module 4: Giao tiếp & Giải quyết xung đột nội bộ"
    ],
    results: [
      "Cải thiện 40% hiệu suất làm việc nhóm",
      "Tạo dựng môi trường làm việc tích cực, gắn kết",
      "Tốt nghiệp chứng chỉ Quản lý Cấp trung Dale Carnegie"
    ],
    icon: "users",
    theme: { text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300", iconBg: "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400" }
  },
  {
    id: 7,
    title: "Đào tạo & Thuyết trình",
    subtitle: "VietnamWorks",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
    courseImg: "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
    certImg: "https://i.ibb.co/GQ3gFt3S/Thuy-t-tr-nh.png",
    desc: "Nâng cao kỹ năng xây dựng chương trình đào tạo, thiết kế nội dung, thuyết trình và truyền đạt kiến thức hiệu quả cho nhiều đối tượng.",
    modules: [
      "Module 1: Phương pháp thiết kế bài giảng lôi cuốn",
      "Module 2: Kỹ thuật thuyết trình & Làm chủ sân khấu",
      "Module 3: Tương tác & Xử lý câu hỏi khó",
      "Module 4: Đánh giá hiệu quả sau đào tạo (Train The Trainer)"
    ],
    results: [
      "Thực hiện thành công 30+ buổi đào tạo doanh nghiệp",
      "Nâng cao khả năng diễn đạt và làm chủ đám đông",
      "Chứng nhận Giảng viên Nội bộ từ VietnamWorks"
    ],
    icon: "presentation",
    theme: { text: "text-orange-600 dark:text-orange-400", badge: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300", iconBg: "bg-orange-100/80 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400" }
  },
  {
    id: 8,
    title: "Kỹ năng Phỏng vấn",
    subtitle: "VietnamWorks",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/0RhVggb5/Ph-ng-v-n.png",
    desc: "Trang bị phương pháp tuyển dụng, kỹ thuật phỏng vấn, đánh giá năng lực ứng viên và lựa chọn nhân sự phù hợp với yêu cầu công việc.",
    modules: [
      "Module 1: Phỏng vấn dựa trên hành vi (BEI)",
      "Module 2: Đánh giá năng lực & Sự phù hợp văn hóa",
      "Module 3: Kỹ thuật đặt câu hỏi xoáy sâu",
      "Module 4: Quy trình thu hút & Lựa chọn nhân tài"
    ],
    results: [
      "Tuyển dụng thành công 100+ nhân sự chất lượng",
      "Tối ưu tỷ lệ giữ chân nhân sự mới đạt trên 90%",
      "Chứng nhận Chuyên gia Phỏng vấn Tuyển dụng"
    ],
    icon: "user-check",
    theme: { text: "text-fuchsia-600 dark:text-fuchsia-400", badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300", iconBg: "bg-fuchsia-100/80 text-fuchsia-600 dark:bg-fuchsia-950/60 dark:text-fuchsia-400" }
  },
  {
    id: 9,
    title: "Cử nhân Công nghệ Thông tin",
    subtitle: "Trường Đại học Công nghệ Sài Gòn (STU)",
    year: "Năm 2007",
    type: "tech",
    image: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    courseImg: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    certImg: "",
    desc: "Được đào tạo nền tảng về lập trình, cơ sở dữ liệu, phân tích thiết kế hệ thống, mạng máy tính và phát triển phần mềm, tạo nền tảng vững chắc cho sự nghiệp trong lĩnh vực công nghệ.",
    modules: [
      "Module 1: Lập trình OOP, C/C++ & Java Core",
      "Module 2: Cơ sở dữ liệu RDBMS & SQL Server",
      "Module 3: Phân tích Thiết kế Hệ thống Thông tin",
      "Module 4: Mạng máy tính & Bảo mật phần mềm"
    ],
    results: [
      "Tốt nghiệp Cử nhân Công nghệ Thông tin chính quy",
      "Đạt danh hiệu Sinh viên Xuất sắc các học kỳ",
      "Nền tảng kỹ thuật vững chắc cho toàn bộ sự nghiệp"
    ],
    icon: "graduation-cap",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 10,
    title: "Chứng nhận Tổng đài viên",
    subtitle: "MobiFone",
    year: "Năm 2007",
    type: "management",
    image: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    courseImg: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    certImg: "https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png",
    desc: "Được đào tạo chuyên sâu về nghiệp vụ Contact Center, quy trình chăm sóc khách hàng, kỹ năng giao tiếp, xử lý tình huống và tiêu chuẩn chất lượng dịch vụ.",
    modules: [
      "Module 1: Quy trình Chăm sóc Khách hàng Chuyên nghiệp",
      "Module 2: Kỹ năng Giao tiếp & Làm chủ giọng nói",
      "Module 3: Xử lý khiếu nại & Tình huống căng thẳng",
      "Module 4: Tra cứu & Thao tác hệ thống MobiFone"
    ],
    results: [
      "Đạt chỉ số hài lòng khách hàng (CSAT) 98%",
      "Xử lý trung bình 100+ cuộc gọi/ngày chất lượng cao",
      "Chứng chỉ Tổng đài viên Chuẩn MobiFone"
    ],
    icon: "phone-call",
    theme: { text: "text-red-600 dark:text-red-400", badge: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300", iconBg: "bg-red-100/80 text-red-600 dark:bg-red-950/60 dark:text-red-400" }
  },
  {
    id: 11,
    title: "Quản trị mạng CCNA",
    subtitle: "Trường Nghề Nhất Nghệ",
    year: "Năm 2006",
    type: "tech",
    image: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    courseImg: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    certImg: "https://i.ibb.co/jZr4051t/CCNA.png",
    desc: "Được đào tạo về thiết kế, triển khai và quản trị hệ thống mạng Cisco, bao gồm Routing, Switching, TCP/IP, VLAN và các kỹ thuật đảm bảo an toàn mạng.",
    modules: [
      "Module 1: Định tuyến Router Cisco (RIP, OSPF, EIGRP)",
      "Module 2: Chuyển mạch Switch Cisco, VLAN & STP",
      "Module 3: Địa chỉ hóa IPv4/IPv6 & Subnetting",
      "Module 4: Bảo mật mạng Access Control List (ACL)"
    ],
    results: [
      "Cấu hình & Vận hành thành công hạ tầng mạng Cisco",
      "Xử lý sự cố kết nối mạng trong thời gian ngắn",
      "Chứng chỉ Hoàn thành Quản trị Mạng CCNA"
    ],
    icon: "network",
    theme: { text: "text-teal-600 dark:text-teal-400", badge: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300", iconBg: "bg-teal-100/80 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400" }
  },
  {
    id: 12,
    title: "Quản trị hệ thống MCSA",
    subtitle: "Trường Nghề Nhất Nghệ",
    year: "Năm 2005",
    type: "tech",
    image: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    courseImg: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    certImg: "https://i.ibb.co/VYMs5kRq/MCSA.png",
    desc: "Được trang bị kiến thức về quản trị hệ thống Windows Server, Active Directory, DNS, DHCP, bảo mật, quản lý tài nguyên và vận hành hạ tầng máy chủ doanh nghiệp.",
    modules: [
      "Module 1: Quản trị Windows Server & Active Directory",
      "Module 2: Dịch vụ Mạng DNS, DHCP & IPAM",
      "Module 3: Bảo mật & Phân quyền Tài nguyên Doanh nghiệp",
      "Module 4: Vận hành & Sao lưu Hạ tầng Máy chủ"
    ],
    results: [
      "Triển khai & Quản trị hạ tầng Active Directory doanh nghiệp",
      "Đảm bảo tính sẵn sàng cao và an toàn dữ liệu hệ thống",
      "Chứng chỉ Hoàn thành Quản trị Hệ thống MCSA"
    ],
    icon: "server",
    theme: { text: "text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300", iconBg: "bg-purple-100/80 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400" }
  }
];
