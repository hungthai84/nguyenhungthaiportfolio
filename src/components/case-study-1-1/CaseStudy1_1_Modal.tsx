import React, { useState } from "react";
import { Headset, X, HelpCircle } from "lucide-react";
import { playUiSound } from "../../lib/sound";
import { cn } from "../../lib/utils";

export function CaseStudy1_1_Modal({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<number | null>(null);

  const handleSelect = (type: number) => {
    playUiSound("click");
    setResult(type);
    if (type === 2) {
      playUiSound("success");
    } else {
      playUiSound("click");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="glass-base bg-white/90 dark:bg-slate-900/90 rounded-3xl max-w-md w-full shadow-2xl relative m-4 overflow-hidden border border-white/80 dark:border-slate-700 animate-in zoom-in-95 duration-300">
        
        <div className="p-4 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Mô Phỏng Xử Lý Tình Huống CSKH</h3>
              <span className="text-sky-100 text-xs block">Văn hóa Customer-Centric & Trao quyền</span>
            </div>
          </div>
          <button onClick={() => { playUiSound("click"); onClose(); }} className="text-white/80 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs font-body text-slate-800 dark:text-slate-100">
          <p className="font-bold text-sm flex items-start gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>Tình huống: Khách hàng VIP phản ánh đơn hàng giao trễ 3 ngày và đang rất bực bội.</span>
          </p>

          <div className="space-y-2">
            <label className="block font-bold text-slate-700 dark:text-slate-300">Lựa chọn cách phản hồi của bạn:</label>
            <button 
              onClick={() => handleSelect(1)} 
              className={cn("w-full text-left p-3 rounded-xl glass-pill font-medium transition cursor-pointer", result === 1 ? "bg-sky-500/20" : "hover:bg-sky-500/10")}
            >
              A. "Dạ do bên vận chuyển quá tải nên chậm, mong anh/chị thông cảm chờ thêm giúp bên em ạ."
            </button>
            <button 
              onClick={() => handleSelect(2)} 
              className={cn("w-full text-left p-3 rounded-xl glass-pill font-medium transition cursor-pointer", result === 2 ? "bg-emerald-500/20" : "hover:bg-emerald-500/10")}
            >
              B. "Em thành thật xin lỗi vì sự bất tiện này! Em đã trực tiếp kiểm tra với bộ phận điều phối để giao hỏa tốc trong 2 giờ tới và xin phép gửi tặng voucher 20% cho lần mua tiếp theo ạ."
            </button>
          </div>

          {result === 1 && (
            <div className="p-3 rounded-xl bg-red-500/20 text-red-800 dark:text-red-200 font-bold block space-y-1 animate-in slide-in-from-bottom-2 fade-in">
              ❌ <strong>Phản hồi thụ động:</strong> Đùn đẩy trách nhiệm cho đơn vị vận chuyển khiến khách hàng VIP cảm thấy không được tôn trọng, làm suy giảm nghiêm trọng chỉ số CSAT & NPS!
            </div>
          )}
          {result === 2 && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold block space-y-1 animate-in slide-in-from-bottom-2 fade-in">
              ✅ <strong>Phản hồi xuất sắc:</strong> Thể hiện sâu sắc tinh thần ĐỒNG CẢM, CHỦ ĐỘNG xử lý sự cố ngay và TRAO QUYỀN đền bù hợp lý, bảo vệ trọn vẹn uy tín thương hiệu!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
