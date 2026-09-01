import React, { useState } from "react";
import { Calculator, CheckSquare, Smile, Sliders, PhoneCall, Clock, SunMedium, CalendarDays, PieChart, Percent, Users, Timer, Headset, UserCheck, CheckCircle, FileCheck2, Star, ThumbsUp, ClipboardCheck, TrendingUp, Sparkles } from "lucide-react";

export function CaseStudy1_1_Tools() {
  const [activeTab, setActiveTab] = useState<"calc" | "qa" | "csat">("calc");

  // Headcount state
  const [hcData, setHcData] = useState({
    volume: 15000,
    aht: 6,
    hours: 8,
    days: 22,
    occupancy: 80,
    shrinkage: 15
  });

  const totalWorkloadHours = (hcData.volume * hcData.aht) / 60;
  const effectiveHoursPerAgent = hcData.hours * hcData.days * (hcData.occupancy / 100) * (1 - (hcData.shrinkage / 100));
  const agentFTE = effectiveHoursPerAgent > 0 ? Math.ceil(totalWorkloadHours / effectiveHoursPerAgent) : 0;
  const tlCount = Math.ceil(agentFTE / 10);
  const qaCount = Math.ceil(agentFTE / 15);
  const totalHeadcount = agentFTE + tlCount + qaCount;

  // QA state
  const [qaScores, setQaScores] = useState({
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
    fatal: false
  });

  const calcQaScore = () => {
    if (qaScores.fatal) return 0;
    let score = 0;
    if (qaScores.c1) score += 15;
    if (qaScores.c2) score += 20;
    if (qaScores.c3) score += 35;
    if (qaScores.c4) score += 20;
    if (qaScores.c5) score += 10;
    return score;
  };

  const qaTotal = calcQaScore();

  // CSAT state
  const [csatData, setCsatData] = useState({
    good: 484,
    total: 500,
    p: 350,
    pa: 110,
    d: 40
  });

  const csatPercent = Math.min(100, Math.round((csatData.good / (csatData.total || 1)) * 1000) / 10);
  const npsTotal = (csatData.p + csatData.pa + csatData.d) || 1;
  const npsScore = Math.round(((csatData.p - csatData.d) / npsTotal) * 100);

  return (
    <div className="space-y-6 pt-4 border-t border-amber-200/60 dark:border-slate-700/60">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveTab('calc')} className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'calc' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
          <Calculator className="w-4 h-4" /> 1. Tính Định Biên Nhân Sự (Headcount)
        </button>
        <button onClick={() => setActiveTab('qa')} className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'qa' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
          <CheckSquare className={`w-4 h-4 ${activeTab === 'qa' ? 'text-white' : 'text-emerald-500'}`} /> 2. Bảng Chấm Điểm QA Đàm Thoại
        </button>
        <button onClick={() => setActiveTab('csat')} className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center gap-1.5 ${activeTab === 'csat' ? 'bg-sky-600 text-white' : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
          <Smile className={`w-4 h-4 ${activeTab === 'csat' ? 'text-white' : 'text-amber-500'}`} /> 3. Đo Lường CSAT & NPS
        </button>
      </div>

      {activeTab === 'calc' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-2xl glass-inner space-y-4">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-500" /> Thông Số Đầu Vào Vận Hành Thực Tế
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5 text-sky-500" /> Tổng Ticket/Cuộc gọi (tháng):</label>
                  <input type="number" value={hcData.volume} onChange={(e) => setHcData({...hcData, volume: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> Thời gian xử lý TB AHT (phút):</label>
                  <input type="number" step="0.5" value={hcData.aht} onChange={(e) => setHcData({...hcData, aht: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><SunMedium className="w-3.5 h-3.5 text-indigo-500" /> Giờ làm việc/ngày của 1 NV:</label>
                  <input type="number" value={hcData.hours} onChange={(e) => setHcData({...hcData, hours: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-purple-500" /> Số ngày làm việc/tháng:</label>
                  <input type="number" value={hcData.days} onChange={(e) => setHcData({...hcData, days: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><PieChart className="w-3.5 h-3.5 text-emerald-500" /> Tỷ lệ lấp đầy Occupancy (%):</label>
                  <input type="number" value={hcData.occupancy} onChange={(e) => setHcData({...hcData, occupancy: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-rose-500" /> Tỷ lệ hao hụt Shrinkage (%):</label>
                  <input type="number" value={hcData.shrinkage} onChange={(e) => setHcData({...hcData, shrinkage: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-sky-500/15 to-indigo-500/15 border border-amber-300/70 dark:border-amber-700/50 flex flex-col justify-between space-y-4 backdrop-blur-xl">
              <div>
                <h4 className="font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-amber-500/20 pb-2">
                  <Users className="w-4 h-4 text-amber-600" /> Định Biên Nhân Sự Khuyến Nghị
                </h4>
                <div className="mt-4 space-y-2.5 text-xs font-body">
                  <div className="flex justify-between items-center p-2.5 rounded-xl glass-inner">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Timer className="w-3.5 h-3.5 text-slate-500" /> Tổng giờ tải công việc:</span>
                    <span className="font-black text-slate-900 dark:text-white">{Math.round(totalWorkloadHours).toLocaleString()} Giờ</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-sky-500/20 text-sky-900 dark:text-sky-200 border border-sky-400/40">
                    <span className="font-extrabold flex items-center gap-1.5"><Headset className="w-3.5 h-3.5 text-sky-600" /> NV CSKH trực tiếp:</span>
                    <span className="font-black text-base text-sky-600 dark:text-sky-400">{agentFTE} NV</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-400/40">
                    <span className="font-extrabold flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-purple-600" /> Trưởng Nhóm / TL (1:10):</span>
                    <span className="font-black text-base text-purple-600 dark:text-purple-400">{tlCount} NV</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-400/40">
                    <span className="font-extrabold flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Chuyên viên QA (1:15):</span>
                    <span className="font-black text-base text-emerald-600 dark:text-emerald-400">{qaCount} NV</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center shadow-lg shadow-amber-500/25">
                <div className="uppercase tracking-wider font-bold opacity-80 text-[10px] flex items-center justify-center gap-1">TỔNG ĐỊNH BIÊN CẦN THIẾT</div>
                <div className="text-2xl font-black">{totalHeadcount} NHÂN SỰ</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'qa' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 rounded-2xl glass-inner space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-3 gap-2">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-500" /> Bảng Chấm Điểm QA
              </h4>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs text-slate-600 dark:text-slate-300">Tổng Điểm QA:</span>
                <span className={`px-3 py-1 rounded-xl text-white font-black text-xs shadow-sm ${qaScores.fatal ? 'bg-red-600' : qaTotal >= 90 ? 'bg-emerald-500' : qaTotal >= 75 ? 'bg-sky-500' : 'bg-amber-500'}`}>
                  {qaScores.fatal ? "0% (FATAL)" : `${qaTotal}%`}
                </span>
              </div>
            </div>
            <div className="space-y-2.5 text-xs font-body">
              <label className="flex items-center justify-between p-3 rounded-xl glass-inner cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/70 transition">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={qaScores.c1} onChange={(e) => setQaScores({...qaScores, c1: e.target.checked})} className="w-4 h-4 accent-emerald-500" />
                  <div><span className="font-bold">1. Chào hỏi chuẩn thương hiệu</span><p className="text-slate-500">Đúng kịch bản lời chào mở đầu.</p></div>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">+15</span>
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl glass-inner cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/70 transition">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={qaScores.c2} onChange={(e) => setQaScores({...qaScores, c2: e.target.checked})} className="w-4 h-4 accent-emerald-500" />
                  <div><span className="font-bold">2. Lắng nghe, đồng cảm</span><p className="text-slate-500">Không ngắt lời khách hàng.</p></div>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">+20</span>
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl glass-inner cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/70 transition">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={qaScores.c3} onChange={(e) => setQaScores({...qaScores, c3: e.target.checked})} className="w-4 h-4 accent-emerald-500" />
                  <div><span className="font-bold">3. Tư vấn đúng quy trình SOP</span><p className="text-slate-500">Tra cứu Knowledge Base chính xác.</p></div>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">+35</span>
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl glass-inner cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/70 transition">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={qaScores.c4} onChange={(e) => setQaScores({...qaScores, c4: e.target.checked})} className="w-4 h-4 accent-emerald-500" />
                  <div><span className="font-bold">4. Chủ động giải pháp</span><p className="text-slate-500">Đưa ra hướng dẫn cụ thể.</p></div>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">+20</span>
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl glass-inner cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/70 transition">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={qaScores.c5} onChange={(e) => setQaScores({...qaScores, c5: e.target.checked})} className="w-4 h-4 accent-emerald-500" />
                  <div><span className="font-bold">5. Chốt thông tin & Chào cảm ơn</span><p className="text-slate-500">Tóm tắt nội dung đã xử lý.</p></div>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">+10</span>
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl bg-red-500/15 border border-red-500/40 cursor-pointer hover:bg-red-500/25 transition">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={qaScores.fatal} onChange={(e) => setQaScores({...qaScores, fatal: e.target.checked})} className="w-4 h-4 accent-red-600" />
                  <div><span className="font-extrabold text-red-700">VI PHẠM NGHIÊM TRỌNG</span><p className="text-red-600/80">Thái độ gắt gỏng, tiết lộ bảo mật.</p></div>
                </div>
                <span className="font-black text-red-600">-100%</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'csat' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="p-5 rounded-2xl glass-inner space-y-4">
            <h4 className="font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-amber-500/20 pb-2">
              <Star className="w-4 h-4 text-amber-500" /> Tính Chỉ Số CSAT
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold mb-1 flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-amber-500" /> Đánh giá 4 sao & 5 sao:</label>
                <input type="number" value={csatData.good} onChange={(e) => setCsatData({...csatData, good: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
              </div>
              <div>
                <label className="font-bold mb-1 flex items-center gap-1"><ClipboardCheck className="w-3.5 h-3.5 text-sky-500" /> Tổng phản hồi:</label>
                <input type="number" value={csatData.total} onChange={(e) => setCsatData({...csatData, total: Number(e.target.value)})} className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800 font-bold outline-none" />
              </div>
              <div className="p-4 rounded-xl bg-amber-500/15 dark:bg-slate-800/80 text-center space-y-1 border border-amber-400/30">
                <div className="font-bold text-slate-500">TỶ LỆ CSAT:</div>
                <div className="text-3xl font-black text-amber-600">{csatPercent}%</div>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-4">
            <h4 className="font-extrabold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider text-xs flex items-center gap-2 border-b border-indigo-500/20 pb-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> Tính NPS
            </h4>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div><label className="block font-bold">Promoters (9-10):</label><input type="number" value={csatData.p} onChange={(e) => setCsatData({...csatData, p: Number(e.target.value)})} className="w-full p-2 rounded-xl border outline-none font-bold" /></div>
                <div><label className="block font-bold">Passives (7-8):</label><input type="number" value={csatData.pa} onChange={(e) => setCsatData({...csatData, pa: Number(e.target.value)})} className="w-full p-2 rounded-xl border outline-none font-bold" /></div>
                <div><label className="block font-bold">Detractors (0-6):</label><input type="number" value={csatData.d} onChange={(e) => setCsatData({...csatData, d: Number(e.target.value)})} className="w-full p-2 rounded-xl border outline-none font-bold" /></div>
              </div>
              <div className="p-4 rounded-xl bg-indigo-500/15 dark:bg-slate-800/80 text-center space-y-1 border border-indigo-400/30">
                <div className="font-bold text-slate-500">NPS SCORE:</div>
                <div className="text-3xl font-black text-indigo-600">{npsScore > 0 ? `+${npsScore}` : npsScore}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
