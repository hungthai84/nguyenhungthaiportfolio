import React, { useState } from 'react';
import {
  X,
  Search,
  BookOpen,
  ArrowLeft,
  User,
  Headphones,
  Cpu,
  Globe,
  Trophy,
  Compass,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  MessageSquarePlus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playUiSound } from '../../lib/sound';

export interface QuestionCategory {
  id: string;
  num: string;
  title: string;
  titleEn: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  description: string;
  questions: string[];
}

export const SAMPLE_CATEGORIES: QuestionCategory[] = [
  {
    id: 'profile',
    num: '01',
    title: 'Tổng quan & Lý lịch',
    titleEn: 'Overview & Profile',
    icon: User,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50/80 dark:bg-indigo-950/40',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
    description: 'Thông tin cá nhân, quá trình làm việc, vị trí quản lý và triết lý hành động',
    questions: [
      'Anh Nguyễn Hùng Thái là ai và có định hướng nghề nghiệp gì?',
      'Tổng quan 22+ năm kinh nghiệm làm việc của anh Thái?',
      'Anh Thái từng nắm giữ những vị trí quản lý cốt lõi nào?',
      'Tóm tắt thế mạnh nổi bật nhất trong quản trị vận hành của anh Thái?',
      'Triết lý làm việc và phương châm hành động của anh Thái là gì?',
      'Anh Thái có kinh nghiệm làm việc ở những tập đoàn lớn nào?',
      'Tại sao doanh nghiệp nên tuyển dụng hoặc hợp tác với anh Thái?',
      'Mô tả phong cách lãnh đạo và quản lý đội ngũ của anh Thái?',
      'Địa điểm làm việc và khả năng công tác của anh Thái ra sao?',
      'Làm sao để liên hệ trực tiếp và nhận CV bản hoàn chỉnh?',
    ],
  },
  {
    id: 'cskh',
    num: '02',
    title: 'Vận hành CSKH & Call Center',
    titleEn: 'CSKH & Call Center Ops',
    icon: Headphones,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50/80 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
    description: 'Kinh nghiệm quản lý tổng đài, chuẩn hóa SLA, kịch bản SOP và đào tạo',
    questions: [
      'Quy mô trung tâm Call Center lớn nhất anh Thái từng quản lý?',
      'Kinh nghiệm tuyển dụng, đào tạo và phát triển nhân sự CSKH?',
      'Cách anh Thái tối ưu hóa chỉ số SLA và tỷ lệ giải quyết lần đầu FCR?',
      'Quy trình xây dựng bộ chuẩn giao tiếp và kịch bản tư vấn SOP?',
      'Kinh nghiệm quản lý đối tác thuê ngoài (Outsource Call Center)?',
      'Phương pháp kiểm soát tỷ lệ nghỉ việc (Turnover rate) của nhân viên?',
      'Cách anh Thái xử lý khủng hoảng truyền thông hoặc khiếu nại leo thang?',
      'Kinh nghiệm xây dựng hệ thống quản lý chất lượng (QA Scorecard)?',
      'Chiến lược nâng cao chỉ số hài lòng khách hàng CSAT và NPS?',
      'Cách tối ưu hóa chi phí vận hành tổng đài mà vẫn giữ chất lượng cao?',
    ],
  },
  {
    id: 'crm',
    num: '03',
    title: 'Chuyển đổi số & CRM',
    titleEn: 'Digital Transformation & CRM',
    icon: Cpu,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50/80 dark:bg-purple-950/40',
    borderColor: 'border-purple-200 dark:border-purple-800',
    badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300',
    description: 'Công nghệ CRM, AI Voicebot, Chatbot, Power BI và tự động hóa quy trình',
    questions: [
      'Anh Thái có kinh nghiệm triển khai các hệ thống CRM nào?',
      'Cách tích hợp AI Voicebot và Chatbot tự động vào tổng đài?',
      'Kinh nghiệm ứng dụng Power BI và phân tích dữ liệu khách hàng?',
      'Quy trình tự động hóa Ticket hỗ trợ và phân loại sự cố tự động?',
      'Anh Thái đã từng số hóa quy trình vận hành như thế nào?',
      'Kinh nghiệm kết nối Omnichannel (Zendesk, Facebook, Zalo, Call Center)?',
      'Cách bảo mật dữ liệu khách hàng và tuân thủ eKYC ngành FinTech?',
      'Tối ưu hóa hạ tầng tổng đài IP PBX, Avaya, AICC và tổng đài Cloud?',
      'Các công cụ quản lý dự án công nghệ anh Thái thường sử dụng?',
      'Xu hướng công nghệ CSKH nào anh Thái đánh giá cao nhất hiện nay?',
    ],
  },
  {
    id: 'domains',
    num: '04',
    title: 'Lĩnh vực hoạt động',
    titleEn: 'Core Industries',
    icon: Globe,
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-50/80 dark:bg-sky-950/40',
    borderColor: 'border-sky-200 dark:border-sky-800',
    badgeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300',
    description: 'Viễn thông, E-Commerce, Ví điện tử, Thể thao điện tử, Bảo hiểm, Tư vấn',
    questions: [
      'Kinh nghiệm 10+ năm trong ngành Viễn thông di động (MobiFone, CallV24/7)?',
      'Kinh nghiệm 6+ năm trong ngành Thương mại điện tử (Shopee, ShopeePay)?',
      'Kinh nghiệm 5+ năm trong ngành Ví điện tử & FinTech (MoMo, AirPay)?',
      'Kinh nghiệm 5+ năm trong ngành Thể thao điện tử (Garena, GCafé)?',
      'Kinh nghiệm 3+ năm trong ngành Bảo hiểm nhân thọ (Prudential)?',
      'Kinh nghiệm 8+ năm Tư vấn và Xây dựng Hệ thống Doanh nghiệp?',
      'Sự khác biệt khi vận hành CSKH mảng B2C so với B2B?',
      'Bài học lớn nhất khi chuyển đổi giữa các ngành nghề khác nhau?',
      'Lĩnh vực nào là thế mạnh chiến lược nhất của anh Thái?',
      'Khả năng thích ứng với mô hình kinh doanh và ngành nghề mới?',
    ],
  },
  {
    id: 'projects',
    num: '05',
    title: 'Dự án & Thành tựu',
    titleEn: 'Projects & Milestones',
    icon: Trophy,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50/80 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
    badgeBg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300',
    description: 'Các mốc dự án tiêu biểu, giải thưởng, thành tựu chỉ số và case study',
    questions: [
      'Những dự án chuyển đổi số quy mô lớn nhất anh Thái đã chủ trì?',
      'Thành tựu nâng chỉ số CSAT từ 88% lên 96.5% tại dự án E-Commerce?',
      'Dự án vận hành hệ thống hỗ trợ 50,000+ ticket/ngày cho eSports?',
      'Kết quả tối ưu hóa chi phí vận hành Call Center thành công nhất?',
      'Các giải thưởng hoặc chứng nhận thành tích anh Thái đạt được?',
      'Dự án xây dựng khung năng lực và lộ trình thăng tiến nhân sự?',
      'Case study xử lý sự cố gián đoạn hệ thống lớn nhất anh từng gặp?',
      'Dự án hợp tác quốc tế và dịch vụ khách hàng đa ngôn ngữ?',
      'Cách anh Thái đo lường ROI cho các dự án đầu tư công nghệ CSKH?',
      'Dự án nào mang lại niềm tự hào nhất trong sự nghiệp của anh?',
    ],
  },
  {
    id: 'tuvi',
    num: '06',
    title: 'Tử vi & Phong cách Lãnh đạo',
    titleEn: 'Astrology & Leadership',
    icon: Compass,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50/80 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
    description: 'Lá số Tử Vi Giáp Tý 1984, Ngũ Hành, 5 trụ cột năng lực & tương hợp 12 con giáp',
    questions: [
      'Tổng quan tử vi lá số Giáp Tý 1984 của anh Thái thể hiện điều gì?',
      'Ngũ hành bản mệnh và ma trận 5 trụ cột năng lực lãnh đạo?',
      'Điểm mạnh cốt lõi nổi bật nhất theo phân tích lá số tử vi?',
      'Điểm cần lưu ý và cách kiểm soát rủi ro trong quản trị?',
      'Các vai trò lãnh đạo phù hợp nhất (COO, CSO, Head of CS, PM)?',
      'Mức độ tương hợp nhân sự với 12 con giáp và cách phối hợp?',
      "Phương châm hành động: 'Lấy chân lý làm gốc, Lấy hành động làm đường'?",
      'Khả năng chịu áp lực và kiên trì theo đuổi mục tiêu dài hạn?',
      'Tầm nhìn chiến lược và khả năng tư duy hệ thống của anh Thái?',
      'Kết hợp giữa triết lý phương Đông và quản trị hiện đại ra sao?',
    ],
  },
];

interface AISampleQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
}

export const AISampleQuestionsModal: React.FC<AISampleQuestionsModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const activeCategory = SAMPLE_CATEGORIES.find((c) => c.id === activeCategoryId);

  // Filtered questions if user types in search box
  const searchResults = searchTerm.trim()
    ? SAMPLE_CATEGORIES.flatMap((cat) =>
        cat.questions
          .filter((q) => q.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((q) => ({ question: q, category: cat }))
      )
    : [];

  const handleChooseQuestion = (q: string) => {
    playUiSound('click');
    onSelectQuestion(q);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-surface backdrop-blur-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* TOP HEADER */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base tracking-wide text-slate-900 dark:text-white">
                    DANH SÁCH CÂU HỎI MẪU
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                    60 CÂU
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {activeCategory
                    ? `Danh mục: ${activeCategory.title}`
                    : '6 Danh mục chuyên sâu • 10 Câu hỏi mỗi mục'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 hover:text-white transition-colors text-slate-300"
              title="Đóng danh sách câu hỏi mẫu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="p-3 px-4 glass-surface border-b border-slate-200 dark:border-slate-800 shrink-0 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Tìm nhanh trong 60 câu hỏi mẫu (vd: SLA, CRM, Viễn thông, Tử vi...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl glass-surface border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500 dark:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-700 dark:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* MAIN CONTENT CONTAINER */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">
            {/* SEARCH RESULTS MODE */}
            {searchTerm.trim() ? (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>Kết quả tìm kiếm ({searchResults.length} câu)</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Xóa tìm kiếm
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    Không tìm thấy câu hỏi mẫu phù hợp với từ khóa "{searchTerm}".
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.map(({ question, category }, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChooseQuestion(question)}
                        className="w-full p-3 rounded-2xl glass-surface border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-start gap-3 group"
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${category.bgColor} ${category.color}`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                            {category.title}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {question}
                          </p>
                        </div>
                        <MessageSquarePlus className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : activeCategory ? (
              /* CATEGORY DETAIL MODE (SHOWING 10 QUESTIONS) */
              <div className="animate-fade-in">
                {/* Back Button & Category Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <button
                    onClick={() => {
                      playUiSound('click');
                      setActiveCategoryId(null);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Quay lại 6 Danh mục</span>
                  </button>

                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    10 CÂU HỎI MẪU
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl ${activeCategory.bgColor} border ${activeCategory.borderColor} mb-4 flex items-start gap-3`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl glass-surface flex items-center justify-center shrink-0 shadow-xs ${activeCategory.color}`}
                  >
                    <activeCategory.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-base font-black ${activeCategory.color}`}>
                      {activeCategory.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                {/* 10 Question Cards */}
                <div className="space-y-2.5">
                  {activeCategory.questions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChooseQuestion(q)}
                      className="w-full p-3.5 rounded-2xl glass-surface border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-start gap-3 group"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1 leading-snug">
                        {q}
                      </p>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        Điền câu hỏi ↵
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* CATEGORY SELECTION MODE (SHOWING 6 CATEGORY CARDS - 3 COLS x 2 ROWS) */
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    6 DANH MỤC CÂU HỎI (3 CỘT x 2 HÀNG)
                  </span>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    Bấm mục bất kỳ để xem 10 câu hỏi
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {SAMPLE_CATEGORIES.map((cat, index) => {
                    const Icon = cat.icon;
                    const catNumber = index + 1;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          playUiSound('click');
                          setActiveCategoryId(cat.id);
                        }}
                        className={`group p-4 rounded-2xl border-2 ${cat.borderColor} bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-900/90 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cat.bgColor} ${cat.color} border ${cat.borderColor}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <h4
                                  className={`text-xs font-black tracking-tight leading-tight ${cat.color}`}
                                >
                                  {catNumber}. {cat.title}
                                </h4>
                                <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                                  {cat.titleEn}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`text-[9.5px] font-black px-2 py-0.5 rounded-full shrink-0 ${cat.badgeBg}`}
                            >
                              10 CÂU
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed mb-3">
                            {cat.description}
                          </p>
                        </div>

                        {/* Sample preview box */}
                        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800">
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-semibold truncate flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                            <span className="truncate">"{cat.questions[0]}"</span>
                          </div>
                          <div className="flex items-center justify-end text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform mt-2">
                            <span>Mở 10 câu hỏi →</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-3.5 px-5 glass-surface border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between text-xs text-slate-500">
            <span>Bấm vào câu hỏi bất kỳ để điền trực tiếp vào ô chat</span>
            <button
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-300"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
