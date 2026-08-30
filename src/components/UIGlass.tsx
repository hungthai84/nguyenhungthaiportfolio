import React, { useState, FormEvent } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  ExternalLink, 
  QrCode, 
  Copy, 
  Check, 
  Sparkles, 
  Video, 
  Coffee, 
  Briefcase, 
  CalendarPlus, 
  ArrowRight,
  MessageCircle,
  HelpCircle,
  X,
  Star,
  Layout,
  Columns3
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

export default function UIGlass() {
  const { lang, t } = useLanguage();
  const isVi = lang === "vi";
  
  // State form đặt lịch hẹn
  const [bookingPurpose, setBookingPurpose] = useState<string>("interview");
  const [meetingFormat, setMeetingFormat] = useState<"online" | "offline" | "phone">("online");
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>("09:30 - 10:30");
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [isCopiedZalo, setIsCopiedZalo] = useState(false);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [showZaloQR, setShowZaloQR] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Danh sách mục đích cuộc hẹn
  const PURPOSES = [
    {
      id: "interview",
      labelVi: "Phỏng vấn tuyển dụng",
      labelEn: "Job Interview / Hiring",
      descVi: "Trao đổi vị trí Head of CSKH / CX Leader",
      descEn: "Discuss CS / CX Leadership roles",
      icon: Briefcase,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      id: "consulting",
      labelVi: "Cố vấn & Tối ưu Contact Center",
      labelEn: "CX & Contact Center Advisory",
      descVi: "Xây dựng SOP, CRM, AI Chatbot & QA/QC",
      descEn: "SOP, CRM, AI Chatbot & QA/QC audits",
      icon: Sparkles,
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30"
    },
    {
      id: "meeting",
      labelVi: "Gặp mặt & Trao đổi hợp tác",
      labelEn: "Business Meeting & Collab",
      descVi: "Kết nối đối tác, cà phê chia sẻ kinh nghiệm",
      descEn: "Partner networking & industry sharing",
      icon: Coffee,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      id: "other",
      labelVi: "Trao đổi chủ đề khác",
      labelEn: "General Inquiries",
      descVi: "Giải đáp thắc mắc & thông tin dịch vụ",
      descEn: "General questions & inquiries",
      icon: HelpCircle,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30"
    }
  ];

  // Khung giờ có sẵn
  const TIME_SLOTS = [
    "09:00 - 10:00",
    "10:30 - 11:30",
    "14:00 - 15:00",
    "15:30 - 16:30",
    "19:30 - 20:30"
  ];

  const handleCopy = (text: string, type: "zalo" | "email") => {
    playUiSound("click");
    navigator.clipboard.writeText(text);
    if (type === "zalo") {
      setIsCopiedZalo(true);
      setTimeout(() => setIsCopiedZalo(false), 2000);
    } else {
      setIsCopiedEmail(true);
      setTimeout(() => setIsCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playUiSound("success");

    const selectedPurposeObj = PURPOSES.find(p => p.id === bookingPurpose);

    setConfirmedBooking({
      purpose: isVi ? selectedPurposeObj?.labelVi : selectedPurposeObj?.labelEn,
      format: meetingFormat === "online" ? "Online Meeting (Google Meet)" : meetingFormat === "offline" ? "Gặp trực tiếp (Offline)" : "Cuộc gọi điện thoại",
      date: bookingDate,
      time: bookingTimeSlot,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes
    });

    setSubmitted(true);
  };

  return (
    <section id="ui_glass" className="py-6 sm:py-10 md:py-14 relative min-h-full flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full space-y-8 sm:space-y-10">
        
        {/* 1. HERO OVERVIEW BANNER (NỘI DUNG TỔNG QUAN) */}
        <div className="w-full md:h-[150px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-white/25 p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 group">
          
          {/* Animated Ambient Light Blobs & Shimmer Pass Overlay */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl animate-glow-pulse pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-glow-pulse pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer-pass pointer-events-none"></div>

          {/* Left Text & Animated Graphic */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 max-w-2xl lg:max-w-3xl text-left h-full">
            {/* Floating Animated Graphic Box - description image */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-amber-300/90 shadow-[0_0_20px_rgba(252,211,77,0.4)] shrink-0 animate-banner-float group/avatar bg-gradient-to-br from-indigo-950 to-slate-900 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400" 
                alt="Kiến tạo trải nghiệm khách hàng xuất sắc" 
                className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              
              {/* Floating Badge Overlay */}
              <div className="absolute top-1 right-1 p-0.5 rounded-full bg-amber-400 text-slate-950 font-black shadow-md animate-pulse">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                <span>{t('hero.badge')} • 22+ Năm</span>
              </div>

              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md truncate">
                {t('hero.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 animate-pulse">{t('hero.title2')}</span>
              </h1>

              <p className="text-white/85 text-xs font-medium line-clamp-1 leading-relaxed hidden sm:block max-w-xl">
                {t('hero.desc')}
              </p>

              {/* Action Buttons inside Banner */}
              <div className="pt-0.5 flex items-center gap-2">
                <a href="#projects" className="px-3.5 py-1.5 rounded-lg bg-white text-brand-primary font-bold text-xs hover:bg-slate-100 transition-all shadow active:scale-95 flex items-center gap-1.5 group/btn">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{t('hero.viewWork')}</span>
                </a>
                <a href="#booking" className="px-3.5 py-1.5 rounded-lg bg-white/15 border border-white/20 text-white font-bold text-xs hover:bg-white/25 transition-all shadow active:scale-95 flex items-center gap-1.5 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('hero.letsTalk')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Highlights: Exactly 2 Equal Stat Cards */}
          <div className="relative z-10 w-full md:w-auto flex md:flex-col lg:flex-row items-center gap-3 shrink-0">
            {/* Equal Card 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-md hover:border-amber-300/80 hover:bg-white/15 transition-all duration-300 flex-1 md:flex-initial min-w-[130px] sm:min-w-[145px] group/stat">
              <span className="text-xl sm:text-2xl font-black text-white group-hover/stat:scale-105 transition-transform shrink-0">
                22+
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-wide leading-tight text-left">
                Năm Kinh Nghiệm<br/>CSKH
              </span>
            </div>

            {/* Equal Card 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-md hover:border-amber-300/80 hover:bg-white/15 transition-all duration-300 flex-1 md:flex-initial min-w-[130px] sm:min-w-[145px] group/stat">
              <span className="text-xl sm:text-2xl font-black text-amber-300 group-hover/stat:scale-105 transition-transform shrink-0">
                98%
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-white/90 uppercase tracking-wide leading-tight text-left">
                Chỉ Số CSAT<br/>Hài Lòng
              </span>
            </div>
          </div>

        </div>

        {/* 2. SECTION HEADER UI GLASS */}
        <div id="booking" className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-border/60 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
              <Columns3 className="w-3.5 h-3.5" />
              <span>{isVi ? "Giao diện UI Glass & Đặt Lịch Hẹn" : "UI Glass & Appointment Hub"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-text-light">
              {isVi ? "Kết Nối Trực Tiếp & Đặt Lịch Làm Việc" : "Direct Connection & Meeting Scheduling"}
            </h2>
            <p className="text-xs sm:text-sm text-brand-text-muted font-medium max-w-2xl leading-relaxed">
              {isVi 
                ? "Lựa chọn phương thức làm việc, khung giờ phù hợp hoặc liên hệ trực tiếp qua Zalo, Email & Hotline để kết nối cùng Nguyễn Hùng Thái."
                : "Select your preferred meeting format, time slot or reach out directly via Zalo, Email & Hotline."}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {isVi ? "Đang mở lịch nhận hẹn" : "Open for booking"}
            </span>
          </div>
        </div>

        {/* 3. CORE UI GLASS CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT COLUMN: Direct Contacts & Quick Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card 1: Direct Hotline & Zalo */}
            <div className="glass-card p-6 rounded-3xl border border-brand-border/80 shadow-xl space-y-5 relative overflow-hidden bg-brand-card/60">
              <div className="flex items-center gap-3 border-b border-brand-border/50 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-brand-text-light">
                    {isVi ? "Hotline & Zalo Trực Tiếp" : "Direct Phone & Zalo"}
                  </h3>
                  <p className="text-xs text-brand-text-muted font-medium">
                    {isVi ? "Phản hồi nhanh trong 15 phút" : "Quick response within 15m"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-brand-border/60">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Số Điện Thoại / Zalo</div>
                      <div className="text-sm font-black text-white">0909 097 882</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("0909097882", "zalo")}
                    className="px-3 py-1.5 rounded-xl bg-brand-primary/20 text-brand-primary border border-brand-primary/30 text-xs font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center gap-1"
                  >
                    {isCopiedZalo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopiedZalo ? "Đã sao chép" : "Sao chép"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-brand-border/60">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Email Làm Việc</div>
                      <div className="text-sm font-black text-white truncate max-w-[180px] sm:max-w-none">hungthai84@gmail.com</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("hungthai84@gmail.com", "email")}
                    className="px-3 py-1.5 rounded-xl bg-brand-primary/20 text-brand-primary border border-brand-primary/30 text-xs font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center gap-1"
                  >
                    {isCopiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopiedEmail ? "Đã sao chép" : "Sao chép"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setShowZaloQR(!showZaloQR)}
                  className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{showZaloQR ? "Ẩn Mã QR Zalo" : "Hiện Mã QR Zalo"}</span>
                </button>
                <span className="text-[11px] text-slate-400 font-medium">TP. Hồ Chí Minh / Toàn Quốc</span>
              </div>

              {/* QR Code Expansion */}
              {showZaloQR && (
                <div className="p-4 rounded-2xl bg-white text-slate-900 flex flex-col items-center justify-center gap-3 border border-slate-300 animate-fadeIn">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://zalo.me/0909097882" 
                    alt="Zalo QR Code" 
                    className="w-36 h-36 border p-1 rounded-xl"
                  />
                  <p className="text-xs font-bold text-slate-700 text-center">
                    Quét mã QR bằng Zalo để nhắn tin trực tiếp
                  </p>
                </div>
              )}
            </div>

            {/* Contact Card 2: Office & Location Info */}
            <div className="glass-card p-6 rounded-3xl border border-brand-border/80 shadow-xl space-y-4 bg-brand-card/60">
              <div className="flex items-center gap-3 border-b border-brand-border/50 pb-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-extrabold text-brand-text-light">Địa Điểm & Khu Vực Hoạt Động</h3>
              </div>
              <p className="text-xs text-brand-text-muted leading-relaxed font-medium">
                Sẵn sàng gặp mặt trực tiếp tại các quận trung tâm TP. Hồ Chí Minh (Q.1, Q.3, TP. Thủ Đức) hoặc làm việc Online toàn quốc & Quốc tế.
              </p>
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-brand-border/40 text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Trụ sở chính: TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive UI Glass Appointment Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-brand-border/80 shadow-2xl space-y-6 relative bg-brand-card/70">
              
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <CalendarPlus className="w-6 h-6 text-brand-primary" />
                  <h3 className="text-lg sm:text-xl font-black text-brand-text-light">
                    {isVi ? "Form Đặt Lịch Hẹn Trực Tuyến" : "Online Appointment Booking"}
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  UI Glass Standard
                </span>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-brand-text-light">Đặt Lịch Hẹn Thành Công!</h4>
                    <p className="text-xs sm:text-sm text-brand-text-muted max-w-md mx-auto">
                      Cảm ơn bạn {confirmedBooking?.name}. Yêu cầu cuộc hẹn đã được gửi đến Nguyễn Hùng Thái. Chúng tôi sẽ phản hồi xác nhận qua Email trong thời gian sớm nhất.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-brand-border/80 text-left space-y-3 max-w-md mx-auto text-xs">
                    <div className="font-bold text-amber-400 border-b border-white/10 pb-2">Thông tin xác nhận:</div>
                    <div><span className="text-slate-400">Mục đích:</span> <span className="font-bold text-white">{confirmedBooking?.purpose}</span></div>
                    <div><span className="text-slate-400">Hình thức:</span> <span className="font-bold text-white">{confirmedBooking?.format}</span></div>
                    <div><span className="text-slate-400">Ngày & Giờ:</span> <span className="font-bold text-emerald-400">{confirmedBooking?.date} ({confirmedBooking?.time})</span></div>
                    <div><span className="text-slate-400">Email nhận xác nhận:</span> <span className="font-bold text-white">{confirmedBooking?.email}</span></div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", company: "", email: "", phone: "", notes: "" });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-xs hover:bg-brand-primary/90 transition-colors"
                  >
                    Đặt lịch hẹn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1: Chọn mục đích cuộc hẹn */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                      1. Chọn mục đích trao đổi / làm việc *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PURPOSES.map((item) => {
                        const isSelected = bookingPurpose === item.id;
                        const IconComp = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              playUiSound("click");
                              setBookingPurpose(item.id);
                            }}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected
                                ? "bg-brand-primary/15 border-brand-primary shadow-lg ring-1 ring-brand-primary"
                                : "bg-slate-900/40 border-brand-border/60 hover:bg-slate-900/80"
                            }`}
                          >
                            <div className={`p-2 rounded-xl shrink-0 ${item.color}`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-extrabold text-brand-text-light">
                                {isVi ? item.labelVi : item.labelEn}
                              </div>
                              <div className="text-[10px] text-brand-text-muted leading-tight font-medium">
                                {isVi ? item.descVi : item.descEn}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Chọn Hình thức & Khung giờ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Hình thức */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                        2. Hình thức gặp mặt
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "online", label: "Google Meet" },
                          { id: "offline", label: "Gặp Trực tiếp" },
                          { id: "phone", label: "Điện thoại" }
                        ].map((fmt) => (
                          <button
                            key={fmt.id}
                            type="button"
                            onClick={() => {
                              playUiSound("click");
                              setMeetingFormat(fmt.id as any);
                            }}
                            className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition-all text-center ${
                              meetingFormat === fmt.id
                                ? "bg-brand-primary text-white border-brand-primary shadow-md"
                                : "bg-slate-900/40 text-slate-300 border-brand-border/60 hover:bg-slate-800"
                            }`}
                          >
                            {fmt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Khung giờ */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                        3. Chọn Khung giờ thích hợp
                      </label>
                      <select
                        value={bookingTimeSlot}
                        onChange={(e) => setBookingTimeSlot(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-bold text-white focus:outline-none focus:border-brand-primary"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} className="bg-slate-900 text-white">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Chọn Ngày & Điền Thông tin cá nhân */}
                  <div className="space-y-4 pt-2 border-t border-brand-border/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300 block">Ngày dự kiến *</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-bold text-white focus:outline-none focus:border-brand-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300 block">Họ và tên người hẹn *</label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Nguyễn Văn A"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300 block">Email xác nhận *</label>
                        <input
                          type="email"
                          placeholder="example@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300 block">Số điện thoại *</label>
                        <input
                          type="tel"
                          placeholder="0912 xxx xxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 block">Tên Công ty / Tổ chức</label>
                      <input
                        type="text"
                        placeholder="Nhập tên doanh nghiệp hoặc đơn vị của bạn (Không bắt buộc)"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 block">Ghi chú nội dung cần trao đổi</label>
                      <textarea
                        rows={2}
                        placeholder="Mô tả vắn tắt vị trí tuyển dụng, đề bài tư vấn hoặc nội dung chính..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-brand-border text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-primary via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Xác Nhận & Gửi Yêu Cầu Đặt Lịch</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
