import React, { useEffect, useRef, useState } from "react";
import { Network, Sparkles, Headset, ShieldCheck, Compass, Share2, GraduationCap, HeartHandshake } from "lucide-react";
import { playUiSound } from "../../lib/sound";

import { ProjectCard } from "../../data/projectsData";

export function CaseStudy1_1_Mindmap({ jumpToSection, project }: { jumpToSection: (id: string) => void; project?: ProjectCard }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState({ p1: "", p2: "", p3: "", p4: "" });

  const updatePaths = () => {
    if (!containerRef.current || !centerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    const cX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const cY = centerRect.top + centerRect.height / 2 - containerRect.top;

    const newPaths = { p1: "", p2: "", p3: "", p4: "" };

    [1, 2, 3, 4].forEach(i => {
      const card = document.getElementById(`pillar-card-${i}`);
      if (card) {
        const cardRect = card.getBoundingClientRect();
        let tX = 0, tY = 0;

        if (i === 1) {
          tX = cardRect.right - containerRect.left;
          tY = cardRect.bottom - containerRect.top - (cardRect.height / 2);
        } else if (i === 2) {
          tX = cardRect.left - containerRect.left;
          tY = cardRect.bottom - containerRect.top - (cardRect.height / 2);
        } else if (i === 3) {
          tX = cardRect.right - containerRect.left;
          tY = cardRect.top - containerRect.top + (cardRect.height / 2);
        } else if (i === 4) {
          tX = cardRect.left - containerRect.left;
          tY = cardRect.top - containerRect.top + (cardRect.height / 2);
        }

        const ctrlX = (cX + tX) / 2;
        (newPaths as any)[`p${i}`] = `M ${cX} ${cY} Q ${ctrlX} ${tY} ${tX} ${tY}`;
      }
    });
    setPaths(newPaths);
  };

  useEffect(() => {
    updatePaths();
    const to = setTimeout(updatePaths, 250);
    window.addEventListener('resize', updatePaths);
    return () => {
      clearTimeout(to);
      window.removeEventListener('resize', updatePaths);
    };
  }, []);

  return (
    <article id="mindmap-section" className="p-6 sm:p-8 rounded-3xl glass-base space-y-6 transition-all duration-300 mb-8 mt-8">
      <div className="flex items-center space-x-3 border-b border-white/60 dark:border-slate-700/60 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-sky-500/30">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Mô Hình Trực Quan Hoá
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Sơ Đồ Tư Duy 4 Trụ Cột Vận Hành CSKH</h3>
        </div>
      </div>

      <div className="relative w-full rounded-3xl bg-white/30 dark:bg-slate-900/40 p-4 sm:p-8 border border-white/70 dark:border-slate-800/60 overflow-x-auto shadow-inner custom-scrollbar">
        <div ref={containerRef} id="mindmap-container" className="min-w-[850px] relative py-8">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <path d={paths.p1} stroke="#0284c7" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
            <path d={paths.p2} stroke="#8b5cf6" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
            <path d={paths.p3} stroke="#10b981" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
            <path d={paths.p4} stroke="#f97316" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
          </svg>

          <div className="flex justify-center my-12 relative z-10">
            <div ref={centerRef} id="mindmap-center" className="group cursor-pointer p-6 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl shadow-indigo-500/40 text-center w-72 h-72 flex flex-col items-center justify-center border-4 border-white/90 dark:border-slate-700 transform hover:scale-105 transition duration-300 backdrop-blur-2xl ring-8 ring-indigo-400/20">
              <div className="w-12 h-12 mb-2 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 transition shadow-inner">
                <Headset className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight leading-snug">
                XÂY DỰNG PHÒNG<br/>DỊCH VỤ KHÁCH HÀNG<br/>
                <span className="font-normal text-xs text-sky-100">(Khởi Tạo – Chuẩn Hóa – Mở Rộng)</span>
              </h3>
              <div className="mt-2 text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" /> Chủ động - Thấu hiểu - Kết nối
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-32 gap-y-16 absolute inset-0 z-10 pointer-events-none">
            <div className="pointer-events-auto flex justify-start items-start">
              <div id="pillar-card-1" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-sky-500/20 to-sky-400/5 border-2 border-sky-400/60 hover:border-sky-500 hover:shadow-glow-sky cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <Compass className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-sky-700 dark:text-sky-300 group-hover:text-sky-500 transition uppercase flex items-center gap-1">TẦM NHÌN & SỨ MỆNH</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Xác định vai trò đối tác tin cậy & 5 giá trị cốt lõi.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex justify-end items-start">
              <div id="pillar-card-2" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-purple-500/20 to-purple-400/5 border-2 border-purple-400/60 hover:border-purple-500 hover:shadow-glow-purple cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <Share2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-purple-700 dark:text-purple-300 group-hover:text-purple-500 transition uppercase flex items-center gap-1">SƠ ĐỒ 6 KHỐI CHUYÊN TRÁCH</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Inbound, Social/Chat, Outbound, Khiếu nại, QA, Data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex justify-start items-end">
              <div id="pillar-card-3" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 border-2 border-emerald-400/60 hover:border-emerald-500 hover:shadow-glow-emerald cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <GraduationCap className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-500 transition uppercase flex items-center gap-1">KHUNG NĂNG LỰC 3 CẤP</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Quy trình tuyển dụng 5 bước & đào tạo Onboarding bài bản.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex justify-end items-end">
              <div id="pillar-card-4" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-orange-500/20 to-orange-400/5 border-2 border-orange-400/60 hover:border-orange-500 hover:shadow-glow-amber cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <HeartHandshake className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-orange-700 dark:text-orange-300 group-hover:text-orange-500 transition uppercase flex items-center gap-1">VĂN HÓA CUSTOMER-CENTRIC</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Lắng nghe, Đồng cảm, Trao quyền tuyến đầu & Ghi nhận.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
