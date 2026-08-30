export interface InterviewQuestion {
  id: string;
  stt: number;
  timestamp: string;
  startSec: number;
  endSec: number;
  summaryVi: string;
  summaryEn: string;
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
}

export const INTERVIEW_VIDEO_1_URL = "https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4";
export const INTERVIEW_VIDEO_2_URL = "https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4";

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "q1",
    stt: 1,
    timestamp: "00:00 - 00:45",
    startSec: 0,
    endSec: 45,
    summaryVi: "Giới thiệu bản thân & Triết lý vận hành CX",
    summaryEn: "Self Introduction & CX Leadership Philosophy",
    questionVi: "Anh có thể giới thiệu đôi nét về bản thân và triết lý quản trị dịch vụ khách hàng cốt lõi của mình?",
    questionEn: "Could you introduce yourself and your core customer service management philosophy?",
    answerVi: "Với hơn 20 năm chuyên sâu trong lĩnh vực Dịch vụ Khách hàng (CX/CS) tại các tập đoàn hàng đầu như MoMo, Prudential, V247 Telecom và Garena, triết lý cốt lõi của tôi là 'Lấy khách hàng làm trọng tâm (Customer-Centric) kết hợp Tối ưu vận hành dựa trên Dữ liệu (Data-Driven) và Công nghệ AI'. Tôi tin rằng dịch vụ xuất sắc bắt nguồn từ một đội ngũ gắn kết, quy trình tinh gọn và khả năng thấu hiểu trọn vẹn điểm nghẽn của khách hàng.",
    answerEn: "With over 20 years dedicated to Customer Experience (CX/CS) leadership across major enterprises including MoMo, Prudential, V247 Telecom, and Garena, my core philosophy is 'Customer-Centricity combined with Data-Driven Operations and AI Automation'. I believe exceptional service stems from an empowered team, streamlined SOPs, and empathetic resolution of customer friction."
  },
  {
    id: "q2",
    stt: 2,
    timestamp: "00:45 - 01:30",
    startSec: 45,
    endSec: 90,
    summaryVi: "Chiến lược chuyển đổi số AI & Tự động hóa",
    summaryEn: "AI Transformation & Contact Center Automation",
    questionVi: "Anh đã ứng dụng AI và Tự động hóa như thế nào để tối ưu hóa hiệu suất Contact Center?",
    questionEn: "How have you applied AI and Automation to optimize Contact Center performance?",
    answerVi: "Tại MoMo và các dự án trước đây, tôi dẫn dắt tích hợp AI Chatbot thông minh xử lý tự động hơn 65% thắc mắc thường gặp (FAQ, tra cứu giao dịch, mở khóa tài khoản), giúp giảm 40% chi phí cho mỗi lượt liên hệ (Cost per Contact). Đồng thời triển khai hệ thống Voice AI định tuyến cuộc gọi thông minh và phân tích cảm xúc (Sentiment Analysis) theo thời gian thực để hỗ trợ nhân sự xử lý nhanh các ca khó.",
    answerEn: "At MoMo and previous roles, I spearheaded the deployment of AI Chatbots automating over 65% of repetitive queries (FAQs, transaction status, account unlock), slashing Cost per Contact by 40%. Concurrently, we rolled out intelligent IVR Voice AI and real-time sentiment analytics to assist agents during complex escalations."
  },
  {
    id: "q3",
    stt: 3,
    timestamp: "01:30 - 02:15",
    startSec: 90,
    endSec: 135,
    summaryVi: "Quản trị chất lượng QA/QC & Giảm Escalation",
    summaryEn: "QA/QC Quality Assurance & Escalation Reduction",
    questionVi: "Phương pháp của anh để kiểm soát chất lượng dịch vụ (QA/QC) và giảm thiểu khiếu nại phức tạp là gì?",
    questionEn: "What is your methodology for QA/QC service quality control and reducing escalations?",
    answerVi: "Tôi xây dựng bộ tiêu chuẩn đánh giá cuộc gọi/tin nhắn đa chiều (Compliance, Soft Skills, Accuracy, Empathy) kết hợp chấm điểm tự động bằng Speech Analytics. Với các ca khiếu nại phức tạp, tôi thiết lập quy trình 'Escalation War-Room' phối hợp trực tiếp với bộ phận Kỹ thuật, Vận hành và Pháp lý, cam kết giải quyết dứt điểm 95% sự vụ trong vòng 4 - 8 giờ làm việc.",
    answerEn: "I established multi-dimensional QA scoring matrices (Compliance, Soft Skills, Accuracy, Empathy) augmented by automated Speech Analytics. For critical escalations, I initiated an 'Escalation War-Room' mechanism with Tech, Operations, and Legal, ensuring 95% of urgent cases are resolved within 4–8 hours."
  },
  {
    id: "q4",
    stt: 4,
    timestamp: "02:15 - 03:00",
    startSec: 135,
    endSec: 180,
    summaryVi: "Thiết lập SOP & Trải nghiệm Đa kênh (Omnichannel)",
    summaryEn: "SOP Standardization & Omnichannel CX",
    questionVi: "Làm thế nào để đồng bộ hóa quy trình SOP trên tất cả các kênh (Hotline, Chat, Email, Social)?",
    questionEn: "How do you standardize SOPs across all omnichannel touchpoints (Phone, Chat, Email, Social)?",
    answerVi: "Tôi chuẩn hóa hơn 200+ kịch bản xử lý SOP chi tiết trên nền tảng Knowledge Base tập trung (Confluence / Zendesk Guide), tích hợp dữ liệu khách hàng 360 độ từ CRM. Bất kể khách hàng liên hệ qua Hotline, Zalo, In-app Chat hay Fanpage, lịch sử tương tác đều được đồng bộ tức thì, loại bỏ tình trạng khách hàng phải lặp lại vấn đề nhiều lần.",
    answerEn: "I standardized 200+ detailed SOP scenario workflows within a centralized Knowledge Base (Confluence / Zendesk), linked directly to a 360-degree CRM customer profile. Whether reaching out via Hotline, Zalo, In-app Chat, or Social, customer history is unified instantly, preventing repetitive customer explanations."
  },
  {
    id: "q5",
    stt: 5,
    timestamp: "03:00 - 03:45",
    startSec: 180,
    endSec: 225,
    summaryVi: "Quản trị nhân sự & Giữ chân nhân tài Call Center",
    summaryEn: "Talent Retention & Call Center Team Motivation",
    questionVi: "Làm sao để anh duy trì động lực và giảm tỷ lệ nghỉ việc (Attrition) trong ngành CS vốn có áp lực cao?",
    questionEn: "How do you maintain morale and minimize attrition in a high-stress contact center environment?",
    answerVi: "Tôi thiết lập lộ trình thăng tiến rõ ràng (SME -> QA -> Team Leader -> Trainer/Manager), chính sách thưởng KPI minh bạch theo hiệu suất và chỉ số CSAT cá nhân. Bên cạnh đó là các chương trình 'Chăm sóc sức khỏe tinh thần', teambuilding định kỳ và vinh danh Star of the Month, giúp giảm tỷ lệ Turnover từ 28% xuống dưới 12% hàng năm.",
    answerEn: "I implemented transparent career development pathways (Agent -> SME -> QA -> Team Lead -> Trainer/Manager) paired with clear KPI bonuses tied to CSAT. Coupled with mental wellness programs, team retreats, and 'Star of the Month' recognitions, annual turnover plummeted from 28% to under 12%."
  },
  {
    id: "q6",
    stt: 6,
    timestamp: "03:45 - 04:30",
    startSec: 225,
    endSec: 270,
    summaryVi: "Tối ưu hóa các chỉ số SLA, CSAT, FCR, AHT",
    summaryEn: "SLA, CSAT, FCR & AHT Metrics Optimization",
    questionVi: "Anh cân bằng thế nào giữa việc giảm thời gian đàm thoại (AHT) và nâng cao chỉ số hài lòng (CSAT)?",
    questionEn: "How do you balance reducing Average Handle Time (AHT) while driving higher Customer Satisfaction (CSAT)?",
    answerVi: "Tôi không ép buộc nhân viên ngắt máy sớm để chạy đua AHT mà tập trung vào chỉ số Giải quyết ngay từ lần đầu (FCR - First Contact Resolution). Khi FCR đạt trên 88%, số lượng cuộc gọi lặp lại giảm mạnh, từ đó AHT tự động được tối ưu mà điểm CSAT vẫn duy trì ở mức cao trên 94%.",
    answerEn: "Rather than forcing premature call terminations to chase low AHT, I prioritize First Contact Resolution (FCR). When FCR surpasses 88%, repeat contacts drop significantly, naturally streamlining AHT while maintaining CSAT above 94%."
  },
  {
    id: "q7",
    stt: 7,
    timestamp: "04:30 - 05:15",
    startSec: 270,
    endSec: 315,
    summaryVi: "Xử lý Khủng hoảng & Sự cố Hệ thống Khẩn cấp",
    summaryEn: "Crisis Response & System Downtime Management",
    questionVi: "Khi xảy ra sự cố kỹ thuật lớn gây nghẽn tổng đài, anh chỉ đạo ứng phó ra sao?",
    questionEn: "During major system downtime causing severe contact surges, what is your crisis action plan?",
    answerVi: "Kích hoạt quy trình BCP (Business Continuity Plan) trong 5 phút: 1) Cập nhật IVR thông báo tự động về sự cố và thời gian dự kiến khắc phục; 2) Triển khai Banner thông báo khẩn cấp trên App/Web; 3) Huy động toàn bộ lực lượng Back-office hỗ trợ; 4) Giám sát chặt chẽ luồng tin mạng xã hội để ngăn chặn khủng hoảng truyền thông.",
    answerEn: "I activate the BCP within 5 minutes: 1) Inject dynamic emergency IVR messages stating issue and ETA; 2) Push in-app and website broadcast banners; 3) Mobilize back-office reserve forces; 4) Monitor social sentiment proactively to neutralize media escalation risks."
  },
  {
    id: "q8",
    stt: 8,
    timestamp: "05:15 - 06:00",
    startSec: 315,
    endSec: 360,
    summaryVi: "Xây dựng Văn hóa Customer-Centric toàn diện",
    summaryEn: "Fostering Company-Wide Customer-Centricity",
    questionVi: "Làm thế nào để truyền cảm hứng về tinh thần dịch vụ tới các phòng ban khác (Product, Tech, Sales)?",
    questionEn: "How do you foster a customer-centric mindset across non-service teams like Product, Tech, and Sales?",
    answerVi: "Tôi tổ chức chương trình 'Một ngày làm CSKH' cho các Product Manager và Kỹ sư công nghệ để họ trực tiếp lắng nghe phản hồi của người dùng. Dữ liệu từ CSKH được phân loại và chia sẻ trong báo cáo VoC (Voice of Customer) hàng tuần tới Ban Giám Đốc, biến tiếng nói của khách hàng thành kim chỉ nam cho sự phát triển tính năng sản phẩm.",
    answerEn: "I organized 'Customer Service Shadowing Days' for Product Managers and Engineers to directly hear user pain points. CS insights are synthesized into weekly Executive Voice of Customer (VoC) dashboards, turning user feedback into product roadmap priorities."
  },
  {
    id: "q9",
    stt: 9,
    timestamp: "06:00 - 06:45",
    startSec: 360,
    endSec: 405,
    summaryVi: "Chiến lược Tối ưu Ngân sách & Cost per Contact",
    summaryEn: "Budget Optimization & Cost per Contact Strategy",
    questionVi: "Chiến lược của anh để tối ưu hóa chi phí vận hành mà không ảnh hưởng tới chất lượng dịch vụ?",
    questionEn: "What is your strategy for optimizing operating costs without compromising quality of care?",
    answerVi: "Chuyển dịch cơ cấu liên hệ từ kênh thoại (Voice) đắt đỏ sang các kênh số tự phục vụ (Self-Service) và Chatbot. Áp dụng mô hình Hybrid (In-house Core Team kết hợp BPO Linh hoạt theo mùa vụ Tết/Mega Sale), giúp giảm 25% tổng chi phí vận hành hàng năm.",
    answerEn: "Shifting contact distribution from costly voice channels to digital self-service tools and conversational AI. Adopting a flexible hybrid resourcing model (in-house core leads paired with seasonal BPO scalability during peak sales), cutting annual operational expenditure by 25%."
  },
  {
    id: "q10",
    stt: 10,
    timestamp: "06:45 - 07:30",
    startSec: 405,
    endSec: 450,
    summaryVi: "Kinh nghiệm Tổng đài Quốc tế & Kiều bào (V247)",
    summaryEn: "Global & Overseas Contact Center Operations (V247)",
    questionVi: "Kinh nghiệm điều hành tổng đài phục vụ thị trường Mỹ / Quốc tế tại V247 mang lại bài học gì cho anh?",
    questionEn: "What lessons did managing cross-border US/global telecom support at V247 teach you?",
    answerVi: "Quản trị đội ngũ vận hành 24/7 theo múi giờ Hoa Kỳ đòi hỏi tính kỷ luật cao, quy chuẩn ngôn ngữ chuyên nghiệp (tiếng Anh và tiếng Việt kiều bào) và hiểu biết sâu sắc về văn hóa tiêu dùng phương Tây. Đây là nền tảng giúp tôi có khả năng quản trị các dự án CSKH chuẩn quốc tế.",
    answerEn: "Running 24/7 round-the-clock shifts aligned with US time zones instilled strict operational discipline, bilingual English/Vietnamese communication rigor, and deep appreciation for global customer expectations under international standards."
  },
  {
    id: "q11",
    stt: 11,
    timestamp: "07:30 - 08:15",
    startSec: 450,
    endSec: 495,
    summaryVi: "Phối hợp Liên chức năng (Cross-functional Alignment)",
    summaryEn: "Cross-functional Collaboration with Tech & Growth",
    questionVi: "Anh giải quyết xung đột mục tiêu giữa CSKH (muốn an toàn/hỗ trợ) và Growth (muốn tăng trưởng nhanh) thế nào?",
    questionEn: "How do you resolve goal friction between CS (quality/protection) and Growth teams (rapid acquisition)?",
    answerVi: "Tôi sử dụng dữ liệu thực tế để chứng minh rằng trải nghiệm sau bán hàng kém sẽ hủy hoại tỷ lệ giữ chân khách hàng (Retention Rate) và gia tăng chi phí chuyển đổi. Chúng tôi thiết lập thỏa thuận cấp dịch vụ chung (Internal SLA) để vừa hỗ trợ Growth tung chiến dịch nhanh, vừa bảo vệ tối đa trải nghiệm người dùng.",
    answerEn: "I leverage churn analytics to demonstrate that compromised onboarding CX directly degrades customer retention and inflates CAC. We establish shared internal SLAs, allowing Growth to launch campaigns aggressively while safeguarding UX."
  },
  {
    id: "q12",
    stt: 12,
    timestamp: "08:15 - 09:00",
    startSec: 495,
    endSec: 540,
    summaryVi: "Data Analytics & Tiếng nói Khách hàng (VoC)",
    summaryEn: "Data Analytics & Voice of Customer Insights",
    questionVi: "Làm thế nào anh biến hàng triệu cuộc gọi/tin nhắn CSKH thành giá trị kinh doanh cho công ty?",
    questionEn: "How do you translate millions of CS interactions into tangible business value?",
    answerVi: "Chúng tôi áp dụng mô hình gắn tag tự động (Auto-tagging) và phân tích nguyên nhân gốc rễ (Root-Cause Analysis). Hàng tháng, CSKH cung cấp danh sách Top 5 'Điểm nghẽn gây thất thoát doanh thu' để đội ngũ Tech & Product ưu tiên fix lỗi, giúp nâng cao chỉ số NPS toàn sàn lên +15 điểm.",
    answerEn: "We deploy automated topic clustering and root-cause analysis. Every month, CS provides an actionable Top 5 'Revenue Leakage Points' report to Tech & Product for rapid resolution, boosting company-wide NPS by +15 points."
  },
  {
    id: "q13",
    stt: 13,
    timestamp: "09:00 - 09:45",
    startSec: 540,
    endSec: 585,
    summaryVi: "Tầm nhìn Chiến lược 3 - 5 năm cho ngành CX",
    summaryEn: "Strategic 3-5 Year Vision for Customer Experience",
    questionVi: "Tầm nhìn của anh về tương lai của ngành Chăm sóc & Trải nghiệm Khách hàng trong 3 - 5 năm tới là gì?",
    questionEn: "What is your strategic vision for the Customer Experience industry over the next 3 to 5 years?",
    answerVi: "Tương lai thuộc về 'Hyper-Personalized & Proactive CX' (Dịch vụ cá nhân hóa cao độ và Chủ động). Không còn đợi khách hàng gặp lỗi rồi mới gọi lên tổng đài, AI sẽ phát hiện sự cố từ trước và chủ động khắc phục, biến CSKH từ một trung tâm chi phí (Cost Center) thành một trung tâm gia tăng giá trị và thúc đẩy doanh thu (Value & Revenue Driver).",
    answerEn: "The future belongs to 'Hyper-Personalized & Proactive CX'. Instead of waiting for users to report errors, predictive AI will detect and resolve issues proactively, transforming Customer Care from a cost center into a decisive value and revenue driver."
  }
];
