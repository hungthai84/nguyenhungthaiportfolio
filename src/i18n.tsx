import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'vi' | 'en';

const translations = {
  vi: {
    'nav.nec': 'Trang UI NEC',
    'nav.bento': 'Bento Dark Dashboard',
    'nav.components': 'UI Components',
    'nav.ui_glass': 'UI Glass',
    'nav.home': 'Trang chủ',
    'nav.letter': 'Thư ngỏ',
    'nav.about': 'Giới thiệu',
    'nav.domains': 'Lĩnh vực',
    'nav.education': 'Học vấn',
    'nav.experience': 'Kinh nghiệm',
    'nav.skills': 'Kỹ năng',
    'nav.projects': 'Dự án',
    'nav.systems': 'Hệ thống',
    'nav.wallpapers': 'Hình nền',
    'nav.memories': 'Kỷ niệm',
    'nav.interview': 'Phỏng vấn',
    'nav.tuvi': 'Tử vi',
    'nav.downloadCV': 'Tải CV',

    'hero.badge': 'Chuyên gia & Quản lý CSKH',
    'hero.title1': 'Kiến tạo chuẩn mực, ',
    'hero.title2': 'trải nghiệm khách hàng ',
    'hero.title3': 'xuất sắc & vượt trội.',
    'hero.desc': 'Tôi là Nguyễn Hùng Thái, Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm kinh nghiệm xây dựng, vận hành và tối ưu hóa hệ thống CSKH cho các tập đoàn hàng đầu.',
    'hero.viewWork': 'Xem dự án',
    'hero.letsTalk': 'Liên hệ ngay',
    'hero.cleanCode': 'Vận hành chuẩn',
    'hero.scalable': 'Mở rộng quy mô',
    'hero.pixel': 'Trải nghiệm đỉnh cao',
    'hero.yearsExp': 'Năm\nKinh nghiệm',
    'hero.projCompleted': 'Dự án\nTrọng điểm',
    'hero.clientSat': 'Chỉ số CSAT\nHài Lòng',

    'about.title': 'Về Tôi',
    'about.desc': 'Tôi là một nhà quản lý dịch vụ khách hàng với trọng tâm là xây dựng hệ thống CSKH hiện đại, tối ưu chi phí và nâng cao trải nghiệm khách hàng bền vững.',
    'about.name': 'Họ và tên',
    'about.location': 'Địa điểm',
    'about.email': 'Email',
    'about.availability': 'Trạng thái',
    'about.openToWork': 'Sẵn sàng hợp tác',
    'about.more': 'Xem chi tiết',
    'about.expertise': 'Chuyên môn cốt lõi',

    'projects.title': 'Dự án & Sáng kiến Tiêu biểu',
    'projects.viewAll': 'Xem tất cả',
    'projects.p1.title': 'Hệ thống Omnichannel Contact Center',
    'projects.p1.desc': 'Tích hợp đa kênh Hotline, LiveChat, Facebook, Zalo, Email vào một nền tảng quản lý tập trung, rút ngắn 40% thời gian xử lý.',
    'projects.p2.title': 'AI Chatbot & Voicebot CSKH 24/7',
    'projects.p2.desc': 'Tự động hóa giải đáp 60% yêu cầu thường gặp, phân luồng thông minh và tích hợp sâu dữ liệu CRM.',
    'projects.p3.title': 'Hệ thống Đánh giá & Giám sát Chất lượng QA/QC',
    'projects.p3.desc': 'Chuẩn hóa quy trình chấm điểm cuộc gọi, huấn luyện kỹ năng và quản lý hiệu suất nhân sự Contact Center.',
    'projects.p4.title': 'CRM & Dashboard Phân tích CSAT / NPS',
    'projects.p4.desc': 'Theo dõi phản hồi khách hàng theo thời gian thực, phân tích nguyên nhân gốc rễ và cải thiện tỷ lệ giữ chân khách hàng.',
    'projects.p5.title': 'Chuyển đổi số & Tối ưu Quy trình CSKH',
    'projects.p5.desc': 'Tối ưu hóa quy trình liên phòng ban (CS - Kỹ thuật - Kinh doanh), giảm 50% thời gian xử lý khiếu nại.',
    
    'process.title': 'Quy trình Vận hành & Cải tiến',
    'process.s1.title': 'Khảo sát & Đánh giá',
    'process.s1.desc': 'Phân tích hiện trạng, luồng tương tác và điểm nghẽn trải nghiệm khách hàng.',
    'process.s2.title': 'Chiến lược & Quy chuẩn',
    'process.s2.desc': 'Xây dựng bộ tiêu chuẩn dịch vụ (SLA, SOP, KPIs) và lộ trình phát triển.',
    'process.s3.title': 'Ứng dụng Công nghệ',
    'process.s3.desc': 'Lựa chọn và triển khai CRM, Tổng đài VoIP, AI Chatbot và Automation.',
    'process.s4.title': 'Đào tạo & Dẫn dắt',
    'process.s4.desc': 'Huấn luyện đội ngũ, xây dựng văn hóa lấy khách hàng làm trọng tâm.',
    'process.s5.title': 'Đo lường & QA/QC',
    'process.s5.desc': 'Kiểm soát chất lượng liên tục qua chỉ số CSAT, CES, FCR và NPS.',
    'process.s6.title': 'Cải tiến Bền vững',
    'process.s6.desc': 'Phân tích dữ liệu phản hồi để tối ưu hóa quy trình định kỳ.',

    'test.title': 'Đánh giá & Phản hồi',
    'test.quote': '"Anh Thái là một nhà lãnh đạo CSKH xuất sắc! Với kinh nghiệm sâu rộng và khả năng dẫn dắt đội ngũ tận tâm, anh đã nâng tầm dịch vụ khách hàng của chúng tôi đạt chuẩn mực cao nhất."',
    'test.numbers': 'Những Con Số Ấn Tượng',
    'test.happy': 'Khách Hàng\nHài Lòng',
    'test.completed': 'Dự Án\nHoàn Thành',
    'test.years': 'Năm\nKinh Nghiệm',
    'test.rate': 'Tỷ Lệ\nCSAT',

    'contact.title': 'Kết nối & Hợp tác',
    'contact.desc': 'Quý doanh nghiệp đang tìm kiếm giải pháp nâng tầm hệ thống CSKH & Trải nghiệm khách hàng? Hãy liên hệ ngay hôm nay.',
    'contact.name': 'Họ và tên của bạn',
    'contact.email': 'Email liên hệ',
    'contact.subject': 'Tiêu đề trao đổi',
    'contact.message': 'Nội dung tin nhắn',
    'contact.send': 'Gửi Tin Nhắn Ngay',
    
    'footer.rights': '© 2026 Nguyễn Hùng Thái. Mọi quyền được bảo lưu.'
  },
  en: {
    'nav.nec': 'UI NEC Page',
    'nav.bento': 'Bento Dark Dashboard',
    'nav.components': 'UI Template',
    'nav.ui_glass': 'UI Glass',
    'nav.home': 'Home',
    'nav.letter': 'Open Letter',
    'nav.about': 'About',
    'nav.domains': 'Domains',
    'nav.education': 'Education',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.systems': 'Systems',
    'nav.wallpapers': 'Wallpapers',
    'nav.memories': 'Memories',
    'nav.interview': 'Interview',
    'nav.tuvi': 'Astrology',
    'nav.downloadCV': 'Download CV',

    'hero.badge': 'CX & CS Leader',
    'hero.title1': 'Architecting standard-setting, ',
    'hero.title2': 'exceptional customer ',
    'hero.title3': 'experiences.',
    'hero.desc': 'I am Nguyen Hung Thai, Head of Customer Service with 22+ years of experience building, operating, and optimizing customer support systems for leading enterprises',
    'hero.viewWork': 'View Projects',
    'hero.letsTalk': 'Contact Me',
    'hero.cleanCode': 'Standardized Ops',
    'hero.scalable': 'Scalable Growth',
    'hero.pixel': 'Peak CX',
    'hero.yearsExp': 'Years of\nExperience',
    'hero.projCompleted': 'Key\nProjects',
    'hero.clientSat': 'CSAT\nScore',

    'about.title': 'About Me',
    'about.desc': 'I am a customer service leader dedicated to building modern CSKH systems, optimizing operational costs, and driving sustainable customer satisfaction.',
    'about.name': 'Full Name',
    'about.location': 'Location',
    'about.email': 'Email',
    'about.availability': 'Availability',
    'about.openToWork': 'Open to Collaborate',
    'about.more': 'View Details',
    'about.expertise': 'Core Expertise',

    'projects.title': 'Key Projects & Initiatives',
    'projects.viewAll': 'View All',
    'projects.p1.title': 'Omnichannel Contact Center System',
    'projects.p1.desc': 'Unified Hotline, LiveChat, Facebook, Zalo, and Email into a centralized platform, reducing handling time by 40%.',
    'projects.p2.title': 'AI Chatbot & Voicebot 24/7',
    'projects.p2.desc': 'Automated 60% of routine inquiries with intelligent routing and deep CRM integration.',
    'projects.p3.title': 'QA/QC Quality Assurance Framework',
    'projects.p3.desc': 'Standardized call scoring, staff coaching, and Contact Center performance management.',
    'projects.p4.title': 'CSAT / NPS Analytics & CRM Dashboard',
    'projects.p4.desc': 'Real-time customer feedback tracking, root-cause analysis, and customer retention enhancement.',
    'projects.p5.title': 'Digital Transformation & Process Optimization',
    'projects.p5.desc': 'Streamlined cross-department workflows (CS - Tech - Sales), cutting complaint turnaround time by 50%.',

    'process.title': 'Operational & Improvement Framework',
    'process.s1.title': 'Discovery & Audit',
    'process.s1.desc': 'Analyzing current bottlenecks, customer touchpoints, and service gaps.',
    'process.s2.title': 'Strategy & SOPs',
    'process.s2.desc': 'Establishing SLA, standard operating procedures, KPIs, and roadmap.',
    'process.s3.title': 'Technology Integration',
    'process.s3.desc': 'Deploying modern CRM, VoIP Contact Center, AI Chatbots, and Automation.',
    'process.s4.title': 'People & Coaching',
    'process.s4.desc': 'Training teams and cultivating a customer-centric culture.',
    'process.s5.title': 'Measurement & QA',
    'process.s5.desc': 'Continuous quality control via CSAT, CES, FCR, and NPS metrics.',
    'process.s6.title': 'Sustainable Impact',
    'process.s6.desc': 'Iterative data-driven optimization for long-term growth.',

    'test.title': 'Testimonials & Endorsements',
    'test.quote': '"Mr. Thai is an outstanding Customer Service leader! With extensive domain mastery and dedicated leadership, he elevated our customer service standards to top-tier industry benchmarks."',
    'test.numbers': 'Key Milestones',
    'test.happy': 'Happy\nClients',
    'test.completed': 'Key\nProjects',
    'test.years': 'Years of\nExperience',
    'test.rate': 'CSAT\nRate',

    'contact.title': 'Let\'s Connect & Collaborate',
    'contact.desc': 'Looking to elevate your Customer Service operations & Customer Experience? Reach out today.',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message Now',
    
    'footer.rights': '© 2026 Nguyen Hung Thai. All rights reserved.'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('vi');

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['vi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
