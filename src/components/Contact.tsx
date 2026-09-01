import React, { useState } from "react";
import { PageBanner } from "./PageBanner";
import { PhoneCall, Mail, MapPin, Send, MessageCircle, QrCode, CheckCircle2, Sparkles, Building, Linkedin } from "lucide-react";
import { useLanguage } from "../i18n";

export default function Contact() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const [showZaloQR, setShowZaloQR] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative flex flex-col w-full flex-1 max-w-6xl mx-auto px-2 sm:px-4 md:px-6 py-2 transition-all">
      {/* Top Banner formatted like About */}
      <div className="w-full mb-6">
        <PageBanner
          tag={isVi ? "KẾT NỐI" : "CONNECT"}
          iconType="contact"
          title={isVi ? "Liên hệ hợp tác" : "Get in touch today"}
          subtitle={
            isVi
              ? "Sẵn sàng trao đổi cơ hội hợp tác, tư vấn kiến trúc hệ thống CSKH và chia sẻ giải pháp tối ưu trải nghiệm khách hàng."
              : "Always open to explore executive leadership roles, consult on CS/CX architecture, and exchange enterprise strategies."
          }
          gradient="from-indigo-950 via-purple-950 to-slate-950"
        />
      </div>

      {/* Main Grid: 2 equal size cards (6 cols each) with 10px gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] w-full items-stretch">
        {/* Left Column: Direct Info, LinkedIn & Zalo Connect (6 cols) */}
        <div className="flex flex-col w-full h-full">
          <div className="glass-surface backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md p-5 sm:p-7 relative overflow-hidden transition-all h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 pb-3.5 mb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-6 bg-blue-600 rounded-full" />
                  <PhoneCall className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">
                    {isVi ? "Thông Tin Liên Hệ" : "Direct Contact Details"}
                  </h3>
                </div>
              </div>

              <ul className="space-y-3 text-slate-700 dark:text-slate-200 font-medium">
                <li className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:border-blue-400">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Email</span>
                    <a href="mailto:hungthai84@gmail.com" className="text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block">
                      hungthai84@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:border-emerald-400">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{isVi ? "Điện thoại / Zalo" : "Phone / Zalo"}</span>
                    <a href="tel:0909097882" className="text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block">
                      0909097882 (+84 909 097 882)
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:border-indigo-400">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">LinkedIn Profile</span>
                    <a href="https://www.linkedin.com/in/hungthai84" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block">
                      linkedin.com/in/hungthai84
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:border-rose-400">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{isVi ? "Địa bàn hoạt động" : "Primary Locations"}</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block">
                      Hà Nội & TP. Hồ Chí Minh, Việt Nam
                    </span>
                  </div>
                </li>
              </ul>

              {/* Zalo Quick Connect Action Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-blue-50/90 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-blue-950/30 border border-blue-200/80 dark:border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md font-black text-base shrink-0">
                    Z
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                      {isVi ? "Kênh Zalo: 0909097882" : "Zalo Channel: 0909097882"}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {isVi ? "Mở Zalo hoặc quét mã QR lớn bên dưới" : "Open Zalo or scan large QR below"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="https://zalo.me/0909097882"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Zalo Me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hungthai84"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Large Zalo QR Code Section */}
            {showZaloQR && (
              <div className="mt-4 p-4 rounded-2xl glass-surface/90 border border-slate-200 dark:border-slate-700 text-center animate-fade-in shadow-inner">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center justify-center gap-1.5">
                  <QrCode className="w-4 h-4 text-blue-500" />
                  <span>{isVi ? "MÃ QR ZALO KẾT NỐI TRỰC TIẾP" : "DIRECT ZALO QR CODE"}</span>
                </p>
                <div className="w-52 h-52 sm:w-60 sm:h-60 mx-auto bg-white p-3 rounded-2xl border-2 border-blue-100 shadow-md flex items-center justify-center transition-all hover:scale-102">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://zalo.me/0909097882"
                    alt="Zalo QR Code 0909097882"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-2 font-mono">SĐT Zalo: 0909097882</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Message Form (6 cols) */}
        <div className="flex flex-col w-full h-full">
          <div className="glass-surface backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md p-5 sm:p-7 relative overflow-hidden transition-all h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-slate-100 dark:border-slate-800">
                <span className="w-2.5 h-6 bg-purple-600 rounded-full shrink-0" />
                <Send className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                  {isVi ? "Gửi Tin Nhắn Trực Tiếp" : "Send a Direct Message"}
                </h3>
              </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {isVi ? "Đã gửi thông tin thành công!" : "Message sent successfully!"}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  {isVi
                    ? "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi qua email hoặc số điện thoại trong thời gian sớm nhất."
                    : "Thank you for reaching out. I will respond to your inquiry as soon as possible."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {isVi ? "Gửi tin nhắn khác" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    {isVi ? "Họ và tên của bạn *" : "Your full name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isVi ? "VD: Nguyễn Văn A..." : "E.g. John Doe..."}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    {isVi ? "Địa chỉ Email liên hệ *" : "Contact Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    {isVi ? "Nội dung trao đổi *" : "Message content *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isVi ? "Nhu cầu hợp tác, tuyển dụng hoặc trao đổi công việc..." : "Describe your collaboration, consulting, or project inquiry..."}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isVi ? "Gửi Tin Nhắn Ngay" : "Send Message"}</span>
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

