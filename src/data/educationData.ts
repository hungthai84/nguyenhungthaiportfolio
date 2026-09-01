export interface ModuleItem {
  code: string;
  title: string;
  focus: string;
  icon: string;
}

export interface EducationCard {
  id: number;
  title: string;
  subtitle: string;
  major?: string;
  year: string;
  type: "tech" | "management";
  image: string;
  courseImg?: string;
  certImg?: string;
  certImg2?: string;
  speakerImg?: string;
  desc: string;
  modules: ModuleItem[];
  results: string[];
  gallery?: string[];
  icon: string;
  gradientBadge?: string;
  theme?: {
    text: string;
    badge: string;
    iconBg: string;
  };
}

export const DEFAULT_EDUCATION_CARDS: EducationCard[] = [
  {
    id: 7,
    title: "Đào tạo & Thuyết trình",
    subtitle: "VietnamWorks / Navigos Group",
    major: "Phương pháp Sư phạm Doanh nghiệp & Kỹ năng Thuyết trình",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
    courseImg: "https://i.ibb.co/ynL53f7X/o-t-o.png",
    certImg: "https://i.ibb.co/GQ3gFt3S/Thuy-t-tr-nh.png",
    certImg2: "https://i.ibb.co/p6J0BqTb/o-t-o.png",
    speakerImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    desc: "Nâng cao kỹ năng xây dựng chương trình đào tạo, thiết kế nội dung, thuyết trình và truyền đạt kiến thức hiệu quả cho đội ngũ nhân sự doanh nghiệp.",
    modules: [
      {
        code: "MOD-01",
        title: "Phân tích Nhu cầu Đào tạo (TNA) & Thiết kế Bài giảng",
        focus: "Khảo sát khoảng trống năng lực, thiết kế bài giảng chuẩn mô hình ADDIE.",
        icon: "calculator"
      },
      {
        code: "MOD-02",
        title: "Phương pháp Sư phạm Tương tác & Điều phối Lớp học",
        focus: "Kỹ thuật điều phối tương tác đa chiều, kích hoạt tư duy người học.",
        icon: "users"
      },
      {
        code: "MOD-03",
        title: "Kỹ thuật Thuyết trình Chuyên nghiệp & Tác phong Đứng lớp",
        focus: "Làm chủ giọng nói, ngôn ngữ cơ thể, kiểm soát sân khấu hội trường.",
        icon: "mic"
      },
      {
        code: "MOD-04",
        title: "Đánh giá Sau Đào tạo & Xử lý Tình huống Khó",
        focus: "Đo lường hiệu quả 4 cấp độ Kirkpatrick, giải đáp phản biện khéo léo.",
        icon: "target"
      }
    ],
    results: [
      "Xây dựng & chuẩn hóa hệ thống giáo trình đào tạo nội bộ bài bản.",
      "Đào tạo nâng cao nghiệp vụ CSKH & kỹ năng giao tiếp chuẩn cho hàng trăm nhân sự.",
      "Tăng 40% hiệu quả truyền đạt và mức độ hài lòng của học viên sau các khóa học.",
      "Số hóa tri thức thực chiến thành bộ tài liệu đào tạo chuẩn hóa cho tổ chức."
    ],
    gallery: [
      "https://i.ibb.co/TDD9zdST/o-t-o-Thuy-t-tr-nh.png",
      "https://i.ibb.co/ynL53f7X/o-t-o.png",
      "https://i.ibb.co/GQ3gFt3S/Thuy-t-tr-nh.png",
      "https://i.ibb.co/p6J0BqTb/o-t-o.png"
    ],
    icon: "presentation",
    gradientBadge: "from-blue-600 to-indigo-600 text-white",
    theme: { text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300", iconBg: "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400" }
  },
  {
    id: 1,
    title: "Thiết kế Webpages",
    subtitle: "Tự học & Phát triển Chuyên môn",
    major: "Lập trình Web Frontend & Thiết kế Trải nghiệm Người dùng",
    year: "Năm 2024",
    type: "tech",
    image: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    courseImg: "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
    certImg: "https://i.ibb.co/JRm9qQbC/Thi-t-k-Website.png",
    speakerImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    desc: "Được trang bị kiến thức về phát triển website hiện đại với HTML5, CSS3, JavaScript, PHP và C++, đồng thời nâng cao kỹ năng thiết kế giao diện Responsive, tối ưu trải nghiệm người dùng (UI/UX) và ứng dụng AI trong phát triển website.",
    modules: [
      { code: "MOD-01", title: "Kiến trúc HTML5, CSS3 & Responsive Design", focus: "Thiết kế chuẩn công thái học Mobile-First, Flexbox/Grid đa thiết bị.", icon: "code" },
      { code: "MOD-02", title: "Lập trình Động JavaScript ES6+ & DOM Events", focus: "Xử lý tương tác mượt mà, kết nối REST API và tối ưu luồng dữ liệu.", icon: "cpu" },
      { code: "MOD-03", title: "Nguyên lý UI/UX & Tối ưu Trải nghiệm", focus: "Wireframing, thiết kế bố cục chuẩn UX, tăng tốc độ tải trang.", icon: "workflow" },
      { code: "MOD-04", title: "Tích hợp AI & Số hóa Hệ thống Website", focus: "Tích hợp Gemini AI hỗ trợ lập trình, số hóa hệ thống báo cáo.", icon: "sparkles" }
    ],
    results: [
      "Làm chủ kỹ năng lập trình web frontend và tự tay xây dựng giao diện phức tạp.",
      "Tối ưu hóa giao diện người dùng đạt chuẩn Responsive, mượt mà trên mọi thiết bị.",
      "Ứng dụng AI và tự động hóa giúp tăng 50% tốc độ phát triển dự án website.",
      "Triển khai thành công hệ thống hồ sơ & báo cáo số hóa đa nền tảng cho tổ chức."
    ],
    gallery: [
      "https://i.ibb.co/Z6G0SmwN/Thi-t-k-Website.png",
      "https://i.ibb.co/JRm9qQbC/Thi-t-k-Website.png",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "code",
    gradientBadge: "from-blue-600 to-indigo-600 text-white",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 2,
    title: "Phân tích Dữ liệu",
    subtitle: "Chương trình Nâng cao Năng lực Dữ liệu",
    major: "Phân tích Dữ liệu Vận hành & Báo cáo Thông minh (BI)",
    year: "Năm 2019",
    type: "tech",
    image: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    courseImg: "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
    certImg: "https://i.ibb.co/cKyZRpCt/Ph-n-t-ch-d-li-u.png",
    speakerImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    desc: "Nâng cao năng lực phân tích và trực quan hóa dữ liệu, xây dựng hệ thống báo cáo, KPI và Dashboard nhằm hỗ trợ quản trị và ra quyết định dựa trên dữ liệu.",
    modules: [
      { code: "MOD-01", title: "Thu thập, Làm sạch & Tiền xử lý Dữ liệu", focus: "ETL dữ liệu đa nguồn, chuẩn hóa và xử lý tập dữ liệu vận hành.", icon: "database" },
      { code: "MOD-02", title: "Truy vấn Dữ liệu Chuyên sâu bằng SQL", focus: "Lập chỉ mục, truy vấn dữ liệu quan hệ, trích xuất chỉ số KPI.", icon: "trending-up" },
      { code: "MOD-03", title: "Xây dựng Dashboard & Trực quan hóa KPI", focus: "Thiết kế PowerBI Dashboard theo dõi SLA, CSAT, FCR real-time.", icon: "layout-grid" },
      { code: "MOD-04", title: "Phân tích Dự báo & Quyết định Chiến lược", focus: "Dự báo lưu lượng tương tác, định biên nhân sự tối ưu.", icon: "award" }
    ],
    results: [
      "Xây dựng thành công hệ thống Dashboard KPI theo dõi vận hành real-time.",
      "Tăng 35% độ chính xác trong dự báo lưu lượng tương tác Contact Center.",
      "Giảm thiểu chi phí vận hành nhờ các quyết định chiến lược dựa trên dữ liệu.",
      "Chuẩn hóa quy trình báo cáo dữ liệu định kỳ tự động cho ban lãnh đạo."
    ],
    gallery: [
      "https://i.ibb.co/bj6CYy2L/Ph-n-t-ch-d-li-u.png",
      "https://i.ibb.co/cKyZRpCt/Ph-n-t-ch-d-li-u.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "database",
    gradientBadge: "from-indigo-600 to-purple-600 text-white",
    theme: { text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300", iconBg: "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" }
  },
  {
    id: 3,
    title: "Quản lý Rủi ro",
    subtitle: "Prudential Việt Nam",
    major: "Quản trị Rủi ro Vận hành & Duy trì Kinh doanh Liên tục (BCP)",
    year: "Năm 2017",
    type: "management",
    image: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    courseImg: "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
    certImg: "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
    speakerImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    desc: "Được đào tạo phương pháp nhận diện, đánh giá và kiểm soát rủi ro, xây dựng kế hoạch ứng phó nhằm giảm thiểu tác động và đảm bảo hiệu quả vận hành dự án.",
    modules: [
      { code: "MOD-01", title: "Nhận diện & Khảo sát Rủi ro Vận hành", focus: "Phân tích điểm nghẽn quy trình, rủi ro hạ tầng viễn thông.", icon: "shield-alert" },
      { code: "MOD-02", title: "Định lượng & Thiết lập Ma trận Rủi ro", focus: "Risk Matrix, đo lường xác suất & mức độ tác động gián đoạn SLA.", icon: "activity" },
      { code: "MOD-03", title: "Kế hoạch Duy trì Vận hành Liên tục (BCP)", focus: "Xây dựng khung BCP đảm bảo hệ thống vận hành 24/7 không trễ.", icon: "workflow" },
      { code: "MOD-04", title: "Kịch bản Kiểm soát & Khắc phục Sự cố", focus: "Xử lý gián đoạn tổng đài khẩn cấp, truyền thông minh bạch.", icon: "shield-check" }
    ],
    results: [
      "Giảm thiểu 90% nguy cơ gián đoạn dịch vụ tổng đài trong các sự cố.",
      "Thiết lập quy trình phản ứng nhanh & minh bạch thông tin khi có sự cố.",
      "Bảo vệ tuyệt đối độ tin cậy dịch vụ và uy tín thương hiệu doanh nghiệp.",
      "Chuẩn hóa kịch bản dự phòng thảm họa CNTT đạt chuẩn quốc tế."
    ],
    gallery: [
      "https://i.ibb.co/d48JsC4S/Quan-l-rui-ro.png",
      "https://i.ibb.co/nN5wcyDy/Qu-n-l-r-i-ro.png",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "shield-alert",
    gradientBadge: "from-rose-500 to-pink-600 text-white",
    theme: { text: "text-rose-600 dark:text-rose-400", badge: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300", iconBg: "bg-rose-100/80 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" }
  },
  {
    id: 4,
    title: "Quản lý Dự án",
    subtitle: "Prudential Việt Nam",
    major: "Phương pháp luận & Thực thi Dự án Chuyên nghiệp",
    year: "Năm 2016",
    type: "management",
    image: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    courseImg: "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
    certImg: "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
    speakerImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    desc: "Nắm vững quy trình quản lý dự án từ lập kế hoạch, phân bổ nguồn lực, quản lý tiến độ, ngân sách, chất lượng đến đánh giá hiệu quả sau khi triển khai.",
    modules: [
      { code: "MOD-01", title: "Khởi tạo & Định hình Scope Dự án", focus: "Xây dựng Project Charter, WBS, xác định yêu cầu dự án.", icon: "briefcase" },
      { code: "MOD-02", title: "Hoạch định Tiến độ & Quản lý Chi phí", focus: "Lập sơ đồ Gantt, ma trận đường găng, kiểm soát ngân sách.", icon: "calendar" },
      { code: "MOD-03", title: "Điều phối Nhân sự & Kiểm soát Chất lượng", focus: "Phân công nhiệm vụ, quản lý QA/QC & phối hợp liên ban.", icon: "users" },
      { code: "MOD-04", title: "Nghiệm thu, Bàn giao & Đánh giá Sau Dự án", focus: "Đo lường KPI, chuyển giao hệ thống & đúc kết bài học.", icon: "check-circle-2" }
    ],
    results: [
      "Quản lý & hoàn thành 100% dự án nâng cấp Contact Center đúng tiến độ.",
      "Tối ưu quy trình phối hợp liên phòng ban, tiết kiệm 25% thời gian.",
      "Kiểm soát ngân sách dự án chính xác, không phát sinh chi phí ngoài dự kiến.",
      "Chuẩn hóa bộ công cụ theo dõi & báo cáo tiến độ dự án cho ban điều hành."
    ],
    gallery: [
      "https://i.ibb.co/ZpBZTHjD/Qu-n-l-d-n.png",
      "https://i.ibb.co/DH9qKGJ2/Qu-n-l-d-n.png",
      "https://i.ibb.co/4ZBDkbHp/Qu-n-l-d-n.png",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "briefcase",
    gradientBadge: "from-amber-500 to-orange-600 text-white",
    theme: { text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300", iconBg: "bg-amber-100/80 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400" }
  },
  {
    id: 5,
    title: "Quản lý Cấp cao",
    subtitle: "Dale Carnegie Training",
    major: "Lãnh đạo Chiến lược & Điều hành Tổ chức",
    year: "Năm 2015",
    type: "management",
    image: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    courseImg: "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
    certImg: "https://i.ibb.co/zT5MVFmt/Qu-n-l-c-p-cao.png",
    speakerImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    desc: "Phát triển tư duy lãnh đạo, quản trị chiến lược, xây dựng đội ngũ và nâng cao năng lực điều hành tổ chức trong môi trường doanh nghiệp.",
    modules: [
      { code: "MOD-01", title: "Định hình Tầm nhìn Chiến lược & Lãnh đạo", focus: "Tạo lập định hướng dài hạn, định hình văn hóa phụng sự.", icon: "compass" },
      { code: "MOD-02", title: "Truyền Cảm Hứng & Trao quyền Lãnh đạo", focus: "Thúc đẩy tinh thần tự chủ, phát triển đội ngũ vững mạnh.", icon: "flame" },
      { code: "MOD-03", title: "Quản trị Thay đổi & Tối ưu Hiệu suất", focus: "Dẫn dắt chuyển đổi số, thích ứng biến động thị trường.", icon: "trending-up" },
      { code: "MOD-04", title: "Chiến lược Tổ chức Lấy Khách hàng làm Trung tâm", focus: "Customer Centricity toàn diện, gắn kết dịch vụ & tăng trưởng.", icon: "award" }
    ],
    results: [
      "Nâng cao năng lực điều hành chiến lược, dẫn dắt bộ phận đạt mục tiêu.",
      "Phát triển thành công đội ngũ nhân sự kế thừa có tư duy chủ động.",
      "Xây dựng văn hóa làm việc tích cực, tăng 30% mức độ hài lòng nhân sự.",
      "Thúc đẩy tư duy phục vụ khách hàng xuất sắc ở mọi cấp độ tổ chức."
    ],
    gallery: [
      "https://i.ibb.co/LdvTgHdt/Qu-n-l-c-p-cao.png",
      "https://i.ibb.co/qYxHgVYs/Qu-n-l-c-p-cao.png",
      "https://i.ibb.co/zT5MVFmt/Qu-n-l-c-p-cao.png",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "award",
    gradientBadge: "from-purple-500 to-indigo-600 text-white",
    theme: { text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300", iconBg: "bg-violet-100/80 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400" }
  },
  {
    id: 6,
    title: "Quản lý Cấp trung",
    subtitle: "Dale Carnegie Training",
    major: "Kỹ năng Quản lý Nhân sự & Điều hành Đội ngũ",
    year: "Năm 2014",
    type: "management",
    image: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    courseImg: "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
    certImg: "https://i.ibb.co/v6JvfyR4/Qu-n-l-c-p-trung.png",
    speakerImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    desc: "Hoàn thiện kỹ năng quản lý nhân sự, phân công công việc, giám sát hiệu quả thực hiện, huấn luyện nhân viên và phối hợp giữa các phòng ban.",
    modules: [
      { code: "MOD-01", title: "Lập Kế hoạch & Phân bổ Mục tiêu Công việc", focus: "Xác lập chỉ tiêu SMART, phân công công việc khoa học.", icon: "target" },
      { code: "MOD-02", title: "Kỹ năng Huấn luyện & Kèm cặp Nhân viên", focus: "Coaching 1-on-1, phản hồi xây dựng phát triển tiềm năng.", icon: "user-plus" },
      { code: "MOD-03", title: "Giao tiếp Hiệu quả & Giải quyết Xung đột", focus: "Lắng nghe thấu cảm, đàm phán giải quyết mâu thuẫn nội bộ.", icon: "message-square" },
      { code: "MOD-04", title: "Giám sát, Đánh giá Hiệu suất & Tạo Động lực", focus: "Đo lường KPI, ghi nhận và tạo động lực phát triển.", icon: "smile" }
    ],
    results: [
      "Tăng 25% năng suất làm việc của đội ngũ nhóm thông qua quy trình chuẩn.",
      "Rút ngắn thời gian đào tạo hòa nhập nhân sự mới nhờ hoạt động coaching.",
      "Xây dựng môi trường làm việc cởi mở, giảm đáng kể tỷ lệ biến động nhân sự.",
      "Chuẩn hóa quy trình đánh giá KPI định kỳ công bằng và minh bạch."
    ],
    gallery: [
      "https://i.ibb.co/zh13J5nw/Qu-n-l-c-p-trung.png",
      "https://i.ibb.co/d0SNgcWy/Qu-n-l-c-p-trung.png",
      "https://i.ibb.co/v6JvfyR4/Qu-n-l-c-p-trung.png",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "users",
    gradientBadge: "from-indigo-500 to-purple-600 text-white",
    theme: { text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300", iconBg: "bg-cyan-100/80 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400" }
  },
  {
    id: 8,
    title: "Kỹ năng Phỏng vấn",
    subtitle: "VietnamWorks / Navigos Group",
    major: "Kỹ thuật Phỏng vấn Tuyển dụng & Đánh giá Năng lực",
    year: "Năm 2013",
    type: "management",
    image: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    courseImg: "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
    certImg: "https://i.ibb.co/0RhVggb5/Ph-ng-v-n.png",
    speakerImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    desc: "Trang bị phương pháp tuyển dụng, kỹ thuật phỏng vấn, đánh giá năng lực ứng viên và lựa chọn nhân sự phù hợp với yêu cầu công việc.",
    modules: [
      { code: "MOD-01", title: "Xây dựng Bộ Tiêu chí Tuyển chọn Năng lực", focus: "Khung năng lực vị trí CSKH, bộ tiêu chuẩn ASK.", icon: "list-checks" },
      { code: "MOD-02", title: "Kỹ thuật Phỏng vấn Hành vi STAR", focus: "Khai thác tình huống Situation-Task-Action-Result thực tế.", icon: "help-circle" },
      { code: "MOD-03", title: "Đánh giá Độ Phù hợp Văn hóa & Động lực", focus: "Đo lường độ thấu cảm, sự kiên nhẫn và cam kết gắn bó.", icon: "user-check" },
      { code: "MOD-04", title: "Đánh giá Khách quan & Quyết định Tuyển dụng", focus: "Thang điểm chuẩn hóa, thu hút và hội nhập ứng viên.", icon: "handshake" }
    ],
    results: [
      "Tuyển chọn chính xác 95% nhân sự phù hợp với yêu cầu khắt khe của tổng đài.",
      "Giảm 40% tỷ lệ nghỉ việc trong giai đoạn 2 tháng thử việc đầu tiên.",
      "Chuẩn hóa bộ câu hỏi phỏng vấn chuyên biệt cho từng vị trí CSKH.",
      "Rút ngắn 30% thời gian tuyển dụng mà vẫn đảm bảo chất lượng đầu vào."
    ],
    gallery: [
      "https://i.ibb.co/q3Fk9RXh/Ph-ng-v-n.png",
      "https://i.ibb.co/W4pgFcq7/Ph-ng-v-n.png",
      "https://i.ibb.co/0RhVggb5/Ph-ng-v-n.png",
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "user-check",
    gradientBadge: "from-teal-500 to-emerald-600 text-white",
    theme: { text: "text-fuchsia-600 dark:text-fuchsia-400", badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300", iconBg: "bg-fuchsia-100/80 text-fuchsia-600 dark:bg-fuchsia-950/60 dark:text-fuchsia-400" }
  },
  {
    id: 9,
    title: "Cử nhân CNTT",
    subtitle: "Trường Đại học Công nghệ Sài Gòn (STU)",
    major: "Khoa học Máy tính & Kỹ thuật Phần mềm",
    year: "Năm 2007",
    type: "tech",
    image: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    courseImg: "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
    certImg: "https://i.ibb.co/m5YgnJ9r/C-nh-n-CNTT.png",
    speakerImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    desc: "Được đào tạo nền tảng về lập trình, cơ sở dữ liệu, phân tích thiết kế hệ thống, mạng máy tính và phát triển phần mềm, tạo nền tảng vững chắc cho sự nghiệp trong lĩnh vực công nghệ.",
    modules: [
      { code: "MOD-01", title: "Cấu trúc Dữ liệu, Giải thuật & Lập trình", focus: "Tư duy thuật toán, lập trình hướng đối tượng OOP.", icon: "code-2" },
      { code: "MOD-02", title: "Cơ sở Dữ liệu & Thiết kế Hệ thống", focus: "Thiết kế RDBMS, SQL Server, tối ưu hóa truy vấn.", icon: "database" },
      { code: "MOD-03", title: "Mạng Máy tính, Viễn thông & VoIP", focus: "Kiến trúc TCP/IP, truyền dẫn dữ liệu & tổng đài thoại.", icon: "network" },
      { code: "MOD-04", title: "Phân tích Thiết kế Hệ thống & SDLC", focus: "Quy trình phát triển phần mềm, kiểm thử & chuyển đổi số.", icon: "laptop" }
    ],
    results: [
      "Tốt nghiệp Cử nhân CNTT hệ chính quy, tạo nền tảng công nghệ vững chắc.",
      "Làm chủ kiến thức hạ tầng mạng - phần mềm, ứng dụng vào quản trị tổng đài.",
      "Cầu nối hiệu quả giữa khối vận hành CSKH và bộ phận kỹ thuật CNTT.",
      "Khả năng phân tích hệ thống và tự phát triển các công cụ hỗ trợ công việc."
    ],
    gallery: [
      "https://i.ibb.co/tpNF0Bqw/C-nh-n-CNTT.png",
      "https://i.ibb.co/m5YgnJ9r/C-nh-n-CNTT.png",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "graduation-cap",
    gradientBadge: "from-blue-500 to-indigo-700 text-white",
    theme: { text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300", iconBg: "bg-blue-100/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" }
  },
  {
    id: 10,
    title: "Tổng đài viên",
    subtitle: "MobiFone",
    major: "Nghiệp vụ Chăm sóc Khách hàng Viễn thông",
    year: "Năm 2007",
    type: "management",
    image: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    courseImg: "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
    certImg: "https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png",
    speakerImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    desc: "Được đào tạo chuyên sâu về nghiệp vụ Contact Center, quy trình chăm sóc khách hàng, kỹ năng giao tiếp, xử lý tình huống và tiêu chuẩn chất lượng dịch vụ.",
    modules: [
      { code: "MOD-01", title: "Nghiệp vụ Tổng đài & Định tuyến Cuộc gọi", focus: "Hệ thống ACD, CRM viễn thông, tra cứu dịch vụ.", icon: "radio" },
      { code: "MOD-02", title: "Kỹ năng Giao tiếp & Kiểm soát Giọng nói", focus: "Phát âm chuẩn, nhịp điệu, thấu cảm người nghe.", icon: "phone-call" },
      { code: "MOD-03", title: "Quy trình Xử lý Khiếu nại Khó", focus: "Kỹ thuật xoa dịu, xử lý sự cố dịch vụ khẩn cấp.", icon: "alert-octagon" },
      { code: "MOD-04", title: "Tiêu chuẩn Chất lượng QA/QC & SLA", focus: "Chỉ số CSAT, First Contact Resolution FCR, quy trình dịch vụ.", icon: "award" }
    ],
    results: [
      "Đạt chứng nhận Tổng đài viên xuất sắc của nhà mạng MobiFone.",
      "Mở đầu cho hành trình 22+ năm gắn bó và phát triển trong ngành CSKH.",
      "Rèn luyện tư duy phục vụ tận tâm, làm chủ mọi kỹ năng xử lý cuộc gọi.",
      "Luôn duy trì chỉ số hài lòng khách hàng CSAT ở mức tối đa."
    ],
    gallery: [
      "https://i.ibb.co/cX8KThxQ/T-ng-i-vi-n-Mobifone.png",
      "https://i.ibb.co/2YM0K35d/T-ng-i-vi-n-Mobifone.png",
      "https://i.ibb.co/vCKQGYB2/T-ng-i-vi-n-Mobifone.png",
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "phone-call",
    gradientBadge: "from-sky-500 to-blue-600 text-white",
    theme: { text: "text-red-600 dark:text-red-400", badge: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300", iconBg: "bg-red-100/80 text-red-600 dark:bg-red-950/60 dark:text-red-400" }
  },
  {
    id: 11,
    title: "Quản trị mạng CCNA",
    subtitle: "Trường Nghề Nhất Nghệ",
    major: "Hạ tầng Mạng Doanh nghiệp Cisco (CCNA)",
    year: "Năm 2006",
    type: "tech",
    image: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    courseImg: "https://i.ibb.co/DPVsnrfj/CCNA.png",
    certImg: "https://i.ibb.co/jZr4051t/CCNA.png",
    speakerImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    desc: "Được đào tạo về thiết kế, triển khai và quản trị hệ thống mạng Cisco, bao gồm Routing, Switching, TCP/IP, VLAN và các kỹ thuật đảm bảo an toàn mạng.",
    modules: [
      { code: "MOD-01", title: "Mô hình OSI, TCP/IP & Chia Subnet Mạng", focus: "Thiết kế địa chỉ IP IPv4/IPv6, phân luồng mạng.", icon: "layers" },
      { code: "MOD-02", title: "Cấu hình Cisco Switching & VLAN", focus: "Phân chia VLAN, Trunking 802.1Q, Spanning Tree STP.", icon: "git-commit" },
      { code: "MOD-03", title: "Cấu hình Cisco Routing Protocols", focus: "Định tuyến OSPF, EIGRP, WAN, kết nối thoại VoIP.", icon: "navigation" },
      { code: "MOD-04", title: "Bảo mật Mạng ACLs, NAT & Khắc phục Sự cố", focus: "Access Control Lists, NAT/PAT, VPN, Troubleshooting.", icon: "shield" }
    ],
    results: [
      "Tốt nghiệp chứng chỉ CCNA xuất sắc tại Nhất Nghệ.",
      "Thiết lập và vận hành hạ tầng mạng tổng đài thoại VoIP ổn định, không trễ.",
      "Tối ưu hóa băng thông truyền dẫn dữ liệu cho hệ thống Contact Center.",
      "Khắc phục tức thì các sự cố mạng phát sinh, đảm bảo kết nối liên tục 24/7."
    ],
    gallery: [
      "https://i.ibb.co/DPVsnrfj/CCNA.png",
      "https://i.ibb.co/FkxNtH4d/CCNA.png",
      "https://i.ibb.co/jZr4051t/CCNA.png",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "network",
    gradientBadge: "from-orange-500 to-amber-600 text-white",
    theme: { text: "text-teal-600 dark:text-teal-400", badge: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300", iconBg: "bg-teal-100/80 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400" }
  },
  {
    id: 12,
    title: "Quản trị hệ thống MCSA",
    subtitle: "Trường Nghề Nhất Nghệ",
    major: "Hạ tầng Máy chủ Doanh nghiệp Windows Server",
    year: "Năm 2005",
    type: "tech",
    image: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    courseImg: "https://i.ibb.co/ZRp6cDRz/MCSA.png",
    certImg: "https://i.ibb.co/VYMs5kRq/MCSA.png",
    speakerImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    desc: "Quản trị hệ thống Windows Server, Active Directory, DNS, DHCP, bảo mật tài nguyên và vận hành hạ tầng máy chủ doanh nghiệp.",
    modules: [
      { code: "MOD-01", title: "Cài đặt & Cấu hình Windows Server", focus: "Kiến trúc máy chủ, Storage Pool, RAID, Virtualization.", icon: "server" },
      { code: "MOD-02", title: "Quản trị Dịch vụ Thư mục Active Directory", focus: "AD DS, Domain Controller, Group Policy GPO.", icon: "folder-tree" },
      { code: "MOD-03", title: "Triển khai Dịch vụ Mạng Cốt lõi", focus: "Máy chủ phân giải DNS, cấp phát IP DHCP, IIS Web Server.", icon: "globe" },
      { code: "MOD-04", title: "Bảo mật Hệ thống & Sao lưu Phục hồi", focus: "Phân quyền NTFS, BitLocker, Backup & Disaster Recovery.", icon: "hard-drive" }
    ],
    results: [
      "Hoàn thành chứng chỉ MCSA với nền tảng kỹ thuật hạ tầng hệ thống vững chắc.",
      "Đảm bảo toàn bộ máy chủ hệ thống nội bộ hoạt động ổn định với độ sẵn sàng 99.9%.",
      "Tự động hóa chính sách an toàn thông tin & bảo mật dữ liệu khách hàng.",
      "Xây dựng quy trình sao lưu và phục hồi dữ liệu phòng chống thảm họa sự cố."
    ],
    gallery: [
      "https://i.ibb.co/ZRp6cDRz/MCSA.png",
      "https://i.ibb.co/DPHDw2Pf/MCSA.png",
      "https://i.ibb.co/VYMs5kRq/MCSA.png",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
    ],
    icon: "server",
    gradientBadge: "from-violet-500 to-purple-700 text-white",
    theme: { text: "text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300", iconBg: "bg-purple-100/80 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400" }
  }
];
