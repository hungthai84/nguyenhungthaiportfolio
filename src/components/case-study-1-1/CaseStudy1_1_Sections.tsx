import React from "react";
import { CaseStudy1_1_Tools } from "./CaseStudy1_1_Tools";
import { FolderKanban, Layers, FileText, Tag, Calendar, Globe, Bookmark, Activity, Scan, TrendingUp, AlertCircle, RefreshCw, AlertTriangle, Flame, GitPullRequest, XCircle, Users, HeartCrack, Target, Compass, Flag, Sliders, Smile, Rocket, Cpu, Box, Network, UserPlus, HeartHandshake, CheckCircle, Share2, PhoneCall, MessageSquare, PhoneOutgoing, ShieldAlert, CheckSquare, BarChart3, GitMerge, Milestone, ClipboardList, Layout, GraduationCap, Gauge, UserCheck, Award, Crown, Key, Wrench, BookCheck, Database, Bot, LineChart, ShieldCheck, Heart, Expand, Trophy, Landmark, Lightbulb, BadgeCheck, Check, Sparkles } from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy1_1_Sections({ project }: { project?: ProjectCard }) {
  if (project && project.id !== "p1_1") {
    const cs = project.caseStudy;
    const actions = cs?.actions || [];
    const results = cs?.results || [];

    return (
      <div id="article-section" className="space-y-8 animate-fadeIn">
        {/* 01 · TỔNG QUAN */}
        <section id="sec-01" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-500/15 via-sky-400/5 to-white/70 dark:to-slate-900/70 border border-sky-300/60 dark:border-sky-700/50 hover:shadow-glow-sky space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-sky-200/60 dark:border-sky-800/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold text-base shadow-md shadow-sky-500/30">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest flex items-center gap-1">
                <Layers className="w-3 h-3" /> Danh Mục 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide uppercase">01 · TỔNG QUAN DỰ ÁN</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl glass-inner space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <FileText className="w-3 h-3 text-sky-500" /> Tên Dự Án
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{project.branchTitle}</p>
            </div>
            <div className="p-4 rounded-2xl glass-inner space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3 text-indigo-500" /> Nhóm & TAGs
              </span>
              <p className="text-sm font-bold text-sky-700 dark:text-sky-300">{project.groupTitle} <span className="text-xs font-normal text-slate-500">{project.groupHashtag}</span></p>
            </div>
            <div className="p-4 rounded-2xl glass-inner space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-500" /> Vai Trò & Thời Gian
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{project.role} • {project.timeframe} ({project.phase})</p>
            </div>
            <div className="p-4 rounded-2xl glass-inner space-y-1 md:col-span-2 lg:col-span-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-500" /> Phạm Vi & Đối Tượng Hưởng Lợi
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Toàn bộ máy CSKH đa kênh, Ban Giám đốc, Đội ngũ Tuyển dụng/HR, Tư vấn viên & Khách hàng người dùng trong hệ sinh thái.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-sky-500/10 dark:bg-sky-950/30 border border-sky-300/60 dark:border-sky-800/50 text-slate-700 dark:text-slate-200 space-y-2 backdrop-blur-md">
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
              <Bookmark className="w-4 h-4" />
              <span>Project Executive Summary</span>
            </div>
            <p className="text-sm leading-relaxed font-body text-slate-800 dark:text-slate-100 font-normal">
              {cs?.solutionSummary || project.description}
            </p>
          </div>
        </section>

        {/* 02 · BỐI CẢNH */}
        <section id="sec-02" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/15 via-indigo-400/5 to-white/70 dark:to-slate-900/70 border border-indigo-300/60 dark:border-indigo-700/50 hover:shadow-glow-indigo space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-indigo-200/60 dark:border-indigo-800/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-indigo-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                <Scan className="w-3 h-3" /> Danh Mục 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide uppercase">02 · BỐI CẢNH & HIỆN TRẠNG</h2>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4" /> <span>Bối cảnh & Vấn đề cốt lõi</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 font-body leading-relaxed">
              {cs?.context || project.description}
            </p>
          </div>
        </section>

        {/* 03 · THÁCH THỨC */}
        <section id="sec-03" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-500/15 via-rose-400/5 to-white/70 dark:to-slate-900/70 border border-rose-300/60 hover:shadow-glow-rose space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-rose-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-md shadow-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase flex items-center gap-1"><Flame className="w-3 h-3" /> Danh Mục 03</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">03 · VẤN ĐỀ & THÁCH THỨC</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-inner space-y-2.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 text-sm flex items-center space-x-2">
                <GitPullRequest className="w-4 h-4 text-rose-600" /> <span>Thách thức 01: Quy trình & Cấu trúc</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Xử lý đan xen nhiều kênh thiếu nhóm chuyên trách phụ trách từng luồng.</p>
            </div>
            <div className="p-5 rounded-2xl glass-inner space-y-2.5">
              <div className="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center space-x-2">
                <Users className="w-4 h-4 text-amber-600" /> <span>Thách thức 02: Năng lực & Tiêu chuẩn</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Cần quy hoạch khung năng lực chuẩn mực và quy trình đào tạo bài bản.</p>
            </div>
            <div className="p-5 rounded-2xl glass-inner space-y-2.5">
              <div className="font-bold text-purple-800 dark:text-purple-300 text-sm flex items-center space-x-2">
                <HeartCrack className="w-4 h-4 text-purple-600" /> <span>Thách thức 03: Tối ưu hóa trải nghiệm</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Cần thấu cảm nhu cầu thực sự của khách hàng để đo lường chỉ số hài lòng.</p>
            </div>
          </div>
        </section>

        {/* 04 · MỤC TIÊU */}
        <section id="sec-04" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-500/15 via-purple-400/5 to-white/70 dark:to-slate-900/70 border border-purple-300/60 hover:shadow-glow-purple space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-purple-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/30">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase flex items-center gap-1"><Compass className="w-3 h-3" /> Danh Mục 04</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">04 · MỤC TIÊU CHIẾN LƯỢC</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl glass-inner space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center mb-1"><Flag className="w-4 h-4" /></div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase block">Chiến Lược</span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Gắn liền mục tiêu phòng ban với chiến lược phát triển toàn diện của công ty.</p>
            </div>
            <div className="p-4 rounded-2xl glass-inner space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mb-1"><Sliders className="w-4 h-4" /></div>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase block">Vận Hành</span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Chuẩn hóa ma trận KPI/OKR, tối ưu thời gian phản hồi và tỷ lệ FCR.</p>
            </div>
            <div className="p-4 rounded-2xl glass-inner space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><Smile className="w-4 h-4" /></div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase block">Khách Hàng</span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Nâng cao chỉ số hài lòng CSAT và niềm tin thương hiệu bền vững.</p>
            </div>
            <div className="p-4 rounded-2xl glass-inner space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-1"><Rocket className="w-4 h-4" /></div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block">Phát Triển</span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Thiết lập bệ phóng sẵn sàng tích hợp công nghệ và mở rộng linh hoạt.</p>
            </div>
          </div>
        </section>

        {/* 05 · GIẢI PHÁP */}
        <section id="sec-05" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-cyan-400/5 to-white/70 dark:to-slate-900/70 border border-cyan-300/60 hover:shadow-glow-cyan space-y-8 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-cyan-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md shadow-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase flex items-center gap-1"><Box className="w-3 h-3" /> Danh Mục 05</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">05 · MÔ HÌNH & GIẢI PHÁP THỰC THI</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((act, idx) => {
              const themeStyles = [
                { titleColor: "text-sky-800 dark:text-sky-300", badgeBg: "bg-sky-500/15 text-sky-700 dark:text-sky-300", valBg: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300", border: "hover:border-sky-400" },
                { titleColor: "text-purple-800 dark:text-purple-300", badgeBg: "bg-purple-500/15 text-purple-700 dark:text-purple-300", valBg: "bg-purple-500/15 text-purple-800 dark:text-purple-300", border: "hover:border-purple-400" },
                { titleColor: "text-emerald-800 dark:text-emerald-300", badgeBg: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", valBg: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300", border: "hover:border-emerald-400" },
                { titleColor: "text-amber-800 dark:text-amber-300", badgeBg: "bg-amber-500/15 text-amber-700 dark:text-amber-300", valBg: "bg-amber-500/15 text-amber-800 dark:text-amber-300", border: "hover:border-amber-400" },
              ];
              const st = themeStyles[idx % themeStyles.length];
              return (
                <div key={idx} className={`p-5 rounded-2xl glass-inner space-y-2.5 transition duration-300 ${st.border}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase flex items-center gap-1.5 ${st.titleColor}`}>
                      <Compass className="w-4 h-4" /> Trụ Cột 0{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${st.badgeBg}`}>Thực thi</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{act.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-body leading-relaxed">{act.desc}</p>
                  <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${st.valBg}`}>
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span><strong>Giá trị mang lại:</strong> {act.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 06 · TRIỂN KHAI */}
        <section id="sec-06" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/15 via-blue-400/5 to-white/70 dark:to-slate-900/70 border border-blue-300/60 hover:shadow-glow-indigo space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-blue-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1"><Milestone className="w-3 h-3" /> Danh Mục 06</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">06 · TRIỂN KHAI & VẬN HÀNH</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center">
            <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><ClipboardList className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 01</span><div className="font-bold text-xs">Khảo Sát</div></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Layout className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 02</span><div className="font-bold text-xs">Thiết Kế</div></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><UserPlus className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 03</span><div className="font-bold text-xs">Tuyển Dụng</div></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><GraduationCap className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 04</span><div className="font-bold text-xs">Đào Tạo</div></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Gauge className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 05</span><div className="font-bold text-xs">Vận Hành</div></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Rocket className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 06</span><div className="font-bold text-xs">Mở Rộng</div></div>
          </div>
        </section>

        {/* 07 · VAI TRÒ */}
        <section id="sec-07" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-500/15 via-violet-400/5 to-white/70 dark:to-slate-900/70 border border-violet-300/60 hover:shadow-glow-purple space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-violet-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-bold shadow-md shadow-violet-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-violet-700 uppercase flex items-center gap-1"><Award className="w-3 h-3" /> Danh Mục 07</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">07 · VAI TRÒ & ĐÓNG GÓP</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-inner space-y-1.5">
              <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase flex items-center gap-1.5"><Crown className="w-4 h-4" /> Vai Trò & Quản Trị</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{project.role}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Hoạch định mô hình tổ chức, phương pháp thực thi và tiêu chuẩn vận hành.</p>
            </div>
            <div className="p-5 rounded-2xl glass-inner space-y-1.5">
              <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase flex items-center gap-1.5"><Key className="w-4 h-4" /> Quyết Định Chủ Chốt</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Chiến Lược Thực Thải & Phối Hợp</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Tối ưu hóa nguồn lực và quy trình làm việc giữa các tuyến nhân sự.</p>
            </div>
            <div className="p-5 rounded-2xl glass-inner space-y-1.5">
              <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase flex items-center gap-1.5"><Network className="w-4 h-4" /> Phạm Vi Quản Lý</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Liên Phòng Ban & Đối Tác</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Kết nối nhịp nhàng giữa CSKH, Kinh doanh, Sản phẩm và Công nghệ.</p>
            </div>
          </div>
        </section>

        {/* 08 · CÔNG CỤ & HỆ THỐNG */}
        <section id="sec-08" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-white/70 dark:to-slate-900/70 border border-amber-300/60 hover:shadow-glow-amber space-y-8 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-amber-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/30">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase flex items-center gap-1"><Sliders className="w-3 h-3" /> Danh Mục 08</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">08 · HỆ THỐNG & CÔNG CỤ TƯƠNG TÁC</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
            <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-1"><BookCheck className="w-5 h-5"/></div><div className="text-xs font-bold">Phương Pháp Chuẩn</div><p className="text-[11px] text-slate-500 font-body">Agile Operations & Standard SOP</p></div>
            <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center mx-auto mb-1"><Share2 className="w-5 h-5"/></div><div className="text-xs font-bold">Cơ Cấu Quản Trị</div><p className="text-[11px] text-slate-500 font-body">Bảng ma trận chỉ số & OKRs</p></div>
            <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 flex items-center justify-center mx-auto mb-1"><Database className="w-5 h-5"/></div><div className="text-xs font-bold">CRM & Omnichannel</div><p className="text-[11px] text-slate-500 font-body">Tích hợp dữ liệu đa kênh</p></div>
            <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mx-auto mb-1"><Bot className="w-5 h-5"/></div><div className="text-xs font-bold">AI Bot & Automation</div><p className="text-[11px] text-slate-500 font-body">Tự động hóa luồng hỗ trợ</p></div>
          </div>

          <CaseStudy1_1_Tools />
        </section>

        {/* 09 · KẾT QUẢ */}
        <section id="sec-09" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-emerald-400/5 to-white/70 dark:to-slate-900/70 border border-emerald-300/60 hover:shadow-glow-emerald space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-emerald-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1"><LineChart className="w-3 h-3" /> Danh Mục 09</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">09 · KẾT QUẢ & TÁC ĐỘNG</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {results.map((res, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-inner space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1">
                  <ShieldCheck className="w-4 h-4"/>
                </div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block">Kết Quả 0{idx + 1}</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-body leading-relaxed">{res}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10 · GIÁ TRỊ */}
        <section id="sec-10" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-500/15 via-teal-400/5 to-white/70 dark:to-slate-900/70 border border-teal-300/60 hover:shadow-glow-teal space-y-6 transition duration-300">
          <div className="flex items-center space-x-3 border-b border-teal-200/60 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase flex items-center gap-1"><Sparkles className="w-3 h-3" /> Danh Mục 10</span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase">10 · GIÁ TRỊ & PHÁT TRIỂN</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase flex items-center space-x-1.5"><Smile className="w-4 h-4" /><span>Cho Khách Hàng</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Được phản hồi nhanh chóng, hỗ trợ tận tâm và giải quyết triệt để vấn đề.</p></div>
            <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase flex items-center space-x-1.5"><Landmark className="w-4 h-4" /><span>Cho Doanh Nghiệp</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Tạo lợi thế cạnh tranh, nâng cao lòng trung thành người dùng và bảo vệ thương hiệu.</p></div>
            <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase flex items-center space-x-1.5"><Trophy className="w-4 h-4" /><span>Cho Tổ Chức Nội Bộ</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Môi trường làm việc chuyên nghiệp, quy trình thông suốt và nhân sự gắn kết.</p></div>
          </div>
        </section>

        {/* SUMMARY CARD */}
        <section id="summary-card" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 text-white shadow-2xl border border-white/40 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="w-6 h-6 text-amber-300" />
              <h3 className="text-lg font-bold uppercase tracking-wider">PROJECT SUMMARY CARD (EXECUTIVE OVERVIEW)</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white/20 font-bold backdrop-blur-md border border-white/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Case Study {project.phaseCode}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body leading-relaxed">
            <div className="space-y-2">
              <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" /><span><strong className="text-sky-200 uppercase tracking-wide">Dự Án:</strong> {project.branchTitle}</span></p>
              <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" /><span><strong className="text-sky-200 uppercase tracking-wide">Mục Tiêu:</strong> {project.description}</span></p>
              <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" /><span><strong className="text-sky-200 uppercase tracking-wide">Giải Pháp:</strong> {cs?.solutionSummary}</span></p>
            </div>
            <div className="space-y-2">
              <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" /><span><strong className="text-purple-200 uppercase tracking-wide">Vai Trò:</strong> {project.role}</span></p>
              <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" /><span><strong className="text-purple-200 uppercase tracking-wide">Kết Quả:</strong> {results.join(" • ") || "Đạt hiệu quả tối ưu theo mục tiêu đề ra."}</span></p>
              <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" /><span><strong className="text-purple-200 uppercase tracking-wide">Giá Trị:</strong> Nâng cao trải nghiệm khách hàng và tối ưu hóa vận hành lâu dài.</span></p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="article-section" className="space-y-8 animate-fadeIn">
      {/* 01 · TỔNG QUAN */}
      <section id="sec-01" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-500/15 via-sky-400/5 to-white/70 dark:to-slate-900/70 border border-sky-300/60 dark:border-sky-700/50 hover:shadow-glow-sky space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-sky-200/60 dark:border-sky-800/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold text-base shadow-md shadow-sky-500/30">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest flex items-center gap-1">
              <Layers className="w-3 h-3" /> Danh Mục 01
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide uppercase">01 · TỔNG QUAN DỰ ÁN</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl glass-inner space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3 h-3 text-sky-500" /> Tên Dự Án
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Case Study 1.1: Xây Dựng & Vận Hành Phòng Dịch Vụ Khách Hàng</p>
          </div>
          <div className="p-4 rounded-2xl glass-inner space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3 text-indigo-500" /> Nhóm & TAGs
            </span>
            <p className="text-sm font-bold text-sky-700 dark:text-sky-300">🧭 Chiến lược & Quản lý <span className="text-xs font-normal text-slate-500">#CS_Strategy #Structure</span></p>
          </div>
          <div className="p-4 rounded-2xl glass-inner space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-purple-500" /> Vai Trò & Thời Gian
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Senior CX Architect • Giai đoạn 1 (Khởi tạo nền tảng)</p>
          </div>
          <div className="p-4 rounded-2xl glass-inner space-y-1 md:col-span-2 lg:col-span-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-500" /> Phạm Vi & Đối Tượng Hưởng Lợi
            </span>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Toàn bộ máy CSKH đa kênh, Ban Giám đốc, Đội ngũ Tuyển dụng/HR, Tư vấn viên & Khách hàng người dùng trong hệ sinh thái.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-sky-500/10 dark:bg-sky-950/30 border border-sky-300/60 dark:border-sky-800/50 text-slate-700 dark:text-slate-200 space-y-2 backdrop-blur-md">
          <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
            <Bookmark className="w-4 h-4" />
            <span>Project Executive Summary</span>
          </div>
          <p className="text-sm leading-relaxed font-body text-slate-800 dark:text-slate-100 font-normal">
            Dự án <strong>Xây Dựng & Vận Hành Phòng Dịch Vụ Khách Hàng</strong> là nhiệm vụ nền tảng chiến lược nhằm biến bộ phận CSKH từ một trung tâm chi phí thụ động (*Cost Center*) thành bệ phóng trải nghiệm và kết nối bền vững (*Value Center*). Bằng cách hoàn thiện sơ đồ tổ chức 6 khối chuyên trách, quy hoạch khung năng lực 3 cấp, chuẩn hóa quy trình SOP và lan tỏa văn hóa Customer-Centric, dự án thiết lập nền móng vững chắc để mở rộng quy mô vận hành mượt mà.
          </p>
        </div>
      </section>

      {/* 02 · BỐI CẢNH */}
      <section id="sec-02" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/15 via-indigo-400/5 to-white/70 dark:to-slate-900/70 border border-indigo-300/60 dark:border-indigo-700/50 hover:shadow-glow-indigo space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-indigo-200/60 dark:border-indigo-800/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-indigo-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1">
              <Scan className="w-3 h-3" /> Danh Mục 02
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide uppercase">02 · BỐI CẢNH & HIỆN TRẠNG</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4" /> <span>1. Hiện Trạng Tăng Trưởng</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-body leading-relaxed">Doanh nghiệp tăng trưởng người dùng nhanh chóng nhưng hoạt động hỗ trợ khách hàng còn phân tán, mang tính tự phát và thiếu một bộ máy chuyên trách bài bản.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4" /> <span>2. Nguyên Nhân Gốc Rễ</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-body leading-relaxed">Chưa phân định vai trò giữa các kênh tiếp nhận, thiếu khung năng lực chuẩn khiến nhân sự quá tải và chất lượng thiếu đồng nhất.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center space-x-1.5">
              <RefreshCw className="w-4 h-4" /> <span>3. Nhu Cầu Cấp Thiết</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-body leading-relaxed">Cấp thiết thành lập Phòng CSKH hoàn chỉnh, chuẩn hóa Tầm nhìn - Cơ cấu - Con người - Văn hóa làm nền tảng vững chắc cho giai đoạn bứt phá thị trường.</p>
          </div>
        </div>
      </section>

      {/* 03 · THÁCH THỨC */}
      <section id="sec-03" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-500/15 via-rose-400/5 to-white/70 dark:to-slate-900/70 border border-rose-300/60 hover:shadow-glow-rose space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-rose-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-md shadow-rose-500/30">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase flex items-center gap-1"><Flame className="w-3 h-3" /> Danh Mục 03</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">03 · VẤN ĐỀ & THÁCH THỨC</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 text-sm flex items-center space-x-2">
              <GitPullRequest className="w-4 h-4 text-rose-600" /> <span>Cấu trúc tổ chức phân tán</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body"><strong>Nguyên nhân:</strong> Xử lý đan xen nhiều kênh mà không có nhóm chuyên trách phụ trách từng luồng.</p>
            <p className="text-xs text-rose-700 dark:text-rose-400 font-body font-medium flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" /> Chồng chéo xử lý, tăng thời gian phản hồi và dễ sót ticket.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center space-x-2">
              <Users className="w-4 h-4 text-amber-600" /> <span>Chất lượng nhân sự chưa đều</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body"><strong>Nguyên nhân:</strong> Thiếu khung năng lực chuẩn mực và quy trình onboarding đào tạo bài bản.</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 font-body font-medium flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" /> Tỷ lệ giải quyết lần đầu (FCR) thấp, tăng leo thang sự cố.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="font-bold text-purple-800 dark:text-purple-300 text-sm flex items-center space-x-2">
              <HeartCrack className="w-4 h-4 text-purple-600" /> <span>Thiếu văn hóa thấu hiểu</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body"><strong>Nguyên nhân:</strong> Chỉ tập trung đóng ticket cơ học thay vì thấu cảm nhu cầu thực sự của khách hàng.</p>
            <p className="text-xs text-purple-700 dark:text-purple-400 font-body font-medium flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" /> Trải nghiệm khách hàng bị ngắt quãng, giảm lòng tin.
            </p>
          </div>
        </div>
      </section>

      {/* 04 · MỤC TIÊU */}
      <section id="sec-04" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-500/15 via-purple-400/5 to-white/70 dark:to-slate-900/70 border border-purple-300/60 hover:shadow-glow-purple space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-purple-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase flex items-center gap-1"><Compass className="w-3 h-3" /> Danh Mục 04</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">04 · MỤC TIÊU</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl glass-inner space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center mb-1"><Flag className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase block">Chiến Lược</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Cầu nối vững chắc giữa công ty & người dùng, nâng cao giá trị vòng đời (LTV).</p>
          </div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mb-1"><Sliders className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase block">Vận Hành</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Hoàn thành sơ đồ 6 khối chuyên trách, quy trình 5 bước và khung năng lực 3 cấp.</p>
          </div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><Smile className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase block">Khách Hàng</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Chủ động thấu hiểu, giải quyết nhanh chóng, biến mọi điểm chạm thành trải nghiệm tin cậy.</p>
          </div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-1"><Rocket className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block">Phát Triển</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Thiết lập bệ phóng sẵn sàng tích hợp công nghệ và mở rộng linh hoạt.</p>
          </div>
        </div>
      </section>

      {/* 05 · GIẢI PHÁP */}
      <section id="sec-05" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-cyan-400/5 to-white/70 dark:to-slate-900/70 border border-cyan-300/60 hover:shadow-glow-cyan space-y-8 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-cyan-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold shadow-md shadow-cyan-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase flex items-center gap-1"><Box className="w-3 h-3" /> Danh Mục 05</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">05 · MÔ HÌNH & GIẢI PHÁP</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase flex items-center gap-1.5"><Compass className="w-4 h-4 text-sky-600" /> Trụ Cột 01</span>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-[10px] font-extrabold text-sky-700 dark:text-sky-300">Chiến lược</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Thiết Lập Tầm Nhìn & Sứ Mệnh</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Xây dựng Tầm nhìn đối tác tin cậy, 4 định hướng Sứ mệnh và 5 Giá trị cốt lõi.</p>
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-xs font-semibold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-600" /> <span><strong>Giá trị:</strong> Thống nhất tư duy & kim chỉ nam hành động toàn diện.</span></div>
          </div>
          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase flex items-center gap-1.5"><Network className="w-4 h-4 text-purple-600" /> Trụ Cột 02</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-[10px] font-extrabold text-purple-700 dark:text-purple-300">Cơ cấu</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Thiết Kế Sơ Đồ Tổ Chức 6 Khối</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Inbound, Outbound, Khiếu nại, MXH, QA & Đào tạo, Phân tích & Báo cáo.</p>
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-xs font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-purple-600" /> <span><strong>Giá trị:</strong> Đúng người, đúng việc, xử lý đúng tuyến và mở rộng dễ dàng.</span></div>
          </div>
          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase flex items-center gap-1.5"><UserPlus className="w-4 h-4 text-emerald-600" /> Trụ Cột 03</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300">Con người</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Khung Năng Lực & Tuyển Dụng</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Khung năng lực 3 cấp (NV, TL, Manager) kết hợp quy trình tuyển dụng 5 bước.</p>
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> <span><strong>Giá trị:</strong> Kỹ năng tốt + Tư duy dịch vụ + Văn hóa phù hợp.</span></div>
          </div>
          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl glass-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase flex items-center gap-1.5"><HeartHandshake className="w-4 h-4 text-amber-600" /> Trụ Cột 04</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-[10px] font-extrabold text-amber-700 dark:text-amber-300">Văn hóa</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Văn Hóa Lấy Khách Hàng Làm Trung Tâm</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Lắng nghe, Đồng cảm, Trao quyền tuyến đầu, Ghi nhận qua chia sẻ câu chuyện.</p>
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-amber-600" /> <span><strong>Giá trị:</strong> Biến tinh thần phục vụ thành DNA, tạo cảm xúc vượt kỳ vọng.</span></div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/60 border border-cyan-300/60 dark:border-slate-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center justify-center gap-1.5"><Share2 className="w-3.5 h-3.5" /> Cấu Trúc Nhân Sự Chuẩn Hóa</span>
            <h4 className="text-lg font-black uppercase">SƠ ĐỒ 6 KHỐI CHỨC NĂNG CHUYÊN TRÁCH</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-2xl glass-inner space-y-1 hover:border-sky-400 transition"><span className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5"><PhoneCall className="w-4 h-4" /> 01. INBOUND HOTLINE</span><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Tiếp nhận cuộc gọi thoại, tư vấn giải đáp tức thời.</p></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1 hover:border-emerald-400 transition"><span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> 02. SOCIAL & LIVECHAT</span><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Phản hồi đa kênh Livechat, Zalo OA, Fanpage.</p></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1 hover:border-purple-400 transition"><span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5"><PhoneOutgoing className="w-4 h-4" /> 03. OUTBOUND CARE</span><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Chăm sóc chủ động sau bán hàng, khảo sát CSAT.</p></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1 hover:border-red-400 transition"><span className="text-xs font-bold text-red-700 dark:text-red-300 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" /> 04. KHIẾU NẠI (ESCALATION)</span><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Chuyên trách các sự cố phức tạp, khủng hoảng.</p></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1 hover:border-amber-400 transition"><span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> 05. QA & ĐÀO TẠO</span><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Chấm điểm chất lượng đàm thoại, đào tạo Onboarding.</p></div>
            <div className="p-3.5 rounded-2xl glass-inner space-y-1 hover:border-indigo-400 transition"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> 06. PHÂN TÍCH & DATA</span><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Báo cáo realtime SLA, FCR và trích xuất VOC.</p></div>
          </div>
        </div>
      </section>

      {/* 06 · TRIỂN KHAI */}
      <section id="sec-06" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/15 via-blue-400/5 to-white/70 dark:to-slate-900/70 border border-blue-300/60 hover:shadow-glow-indigo space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-blue-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1"><Milestone className="w-3 h-3" /> Danh Mục 06</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">06 · TRIỂN KHAI & VẬN HÀNH</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center">
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><ClipboardList className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 01</span><div className="font-bold text-xs">Khảo Sát</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Layout className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 02</span><div className="font-bold text-xs">Thiết Kế</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><UserPlus className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 03</span><div className="font-bold text-xs">Tuyển Dụng</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><GraduationCap className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 04</span><div className="font-bold text-xs">Đào Tạo</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Gauge className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 05</span><div className="font-bold text-xs">Vận Hành</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Rocket className="w-4 h-4"/></div><span className="text-[10px] font-extrabold text-blue-600 uppercase">Bước 06</span><div className="font-bold text-xs">Mở Rộng</div></div>
        </div>
      </section>

      {/* 07 · VAI TRÒ */}
      <section id="sec-07" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-500/15 via-violet-400/5 to-white/70 dark:to-slate-900/70 border border-violet-300/60 hover:shadow-glow-purple space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-violet-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-bold shadow-md shadow-violet-500/30">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-violet-700 uppercase flex items-center gap-1"><Award className="w-3 h-3" /> Danh Mục 07</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">07 · VAI TRÒ & ĐÓNG GÓP</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-1.5">
            <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase flex items-center gap-1.5"><Crown className="w-4 h-4" /> Vai Trò & Quản Trị</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Senior Project Architect / CX Strategist</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Hoạch định toàn bộ mô hình tổ chức, khung năng lực và tiêu chuẩn dịch vụ.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5">
            <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase flex items-center gap-1.5"><Key className="w-4 h-4" /> Quyết Định Chủ Chốt</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Mô hình Phân kênh & Trao quyền</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Tách biệt nhóm QA/Data độc lập và trao quyền hạn giải quyết khiếu nại đền bù trực tiếp cho tuyến đầu.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5">
            <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase flex items-center gap-1.5"><Network className="w-4 h-4" /> Phạm Vi Quản Lý</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Phối Hợp Liên Phòng Ban</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Thiết lập cơ chế phối hợp nhịp nhàng giữa CSKH với Sản Phẩm, Vận Hành, IT.</p>
          </div>
        </div>
      </section>

      {/* 08 · CÔNG CỤ & HỆ THỐNG */}
      <section id="sec-08" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-white/70 dark:to-slate-900/70 border border-amber-300/60 hover:shadow-glow-amber space-y-8 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-amber-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase flex items-center gap-1"><Sliders className="w-3 h-3" /> Danh Mục 08</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">08 · HỆ THỐNG & CÔNG CỤ TƯƠNG TÁC</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-1"><BookCheck className="w-5 h-5"/></div><div className="text-xs font-bold">Phương Pháp Chuẩn</div><p className="text-[11px] text-slate-500 font-body">SOP, Agile CS Operations</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center mx-auto mb-1"><Share2 className="w-5 h-5"/></div><div className="text-xs font-bold">Cơ Cấu Quản Trị</div><p className="text-[11px] text-slate-500 font-body">Org Chart 3 Tầng & 6 Nhóm</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 flex items-center justify-center mx-auto mb-1"><Database className="w-5 h-5"/></div><div className="text-xs font-bold">CRM & Omnichannel</div><p className="text-[11px] text-slate-500 font-body">Tích hợp dữ liệu khách hàng</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mx-auto mb-1"><Bot className="w-5 h-5"/></div><div className="text-xs font-bold">AI Bot & LMS</div><p className="text-[11px] text-slate-500 font-body">Sẵn sàng AI Chatbot & E-learning</p></div>
        </div>

        <CaseStudy1_1_Tools />
      </section>

      {/* 09 · KẾT QUẢ */}
      <section id="sec-09" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-emerald-400/5 to-white/70 dark:to-slate-900/70 border border-emerald-300/60 hover:shadow-glow-emerald space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-emerald-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1"><LineChart className="w-3 h-3" /> Danh Mục 09</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">09 · KẾT QUẢ & TÁC ĐỘNG</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl glass-inner space-y-1"><div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><ShieldCheck className="w-4 h-4"/></div><span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block">Vận Hành Ổn Định</span><p className="text-xs text-slate-700 dark:text-slate-300 font-body">Bộ máy vận hành bài bản, 6 khối chức năng làm việc nhịp nhàng, thông suốt.</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1"><div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><UserCheck className="w-4 h-4"/></div><span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block">Nhân Sự Chất Lượng</span><p className="text-xs text-slate-700 dark:text-slate-300 font-body">Đội ngũ vững chuyên môn, tinh thần phục vụ cao và gắn kết với văn hóa doanh nghiệp.</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1"><div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><Heart className="w-4 h-4"/></div><span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block">Nâng Cao Trải Nghiệm</span><p className="text-xs text-slate-700 dark:text-slate-300 font-body">Khách hàng được lắng nghe & hỗ trợ tận tâm, nâng cao lòng trung thành với thương hiệu.</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1"><div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><Expand className="w-4 h-4"/></div><span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase block">Sẵn Sàng Mở Rộng</span><p className="text-xs text-slate-700 dark:text-slate-300 font-body">Nền móng vững chắc giúp mở rộng quy mô và tích hợp công nghệ dễ dàng.</p></div>
        </div>
      </section>

      {/* 10 · GIÁ TRỊ */}
      <section id="sec-10" className="glass-base p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-500/15 via-teal-400/5 to-white/70 dark:to-slate-900/70 border border-teal-300/60 hover:shadow-glow-teal space-y-6 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-teal-200/60 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase flex items-center gap-1"><Sparkles className="w-3 h-3" /> Danh Mục 10</span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase">10 · GIÁ TRỊ & PHÁT TRIỂN</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase flex items-center space-x-1.5"><Smile className="w-4 h-4" /><span>Cho Khách Hàng</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Được lắng nghe, tôn trọng và giải quyết vấn đề nhanh chóng, nhất quán.</p></div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase flex items-center space-x-1.5"><Landmark className="w-4 h-4" /><span>Cho Doanh Nghiệp</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Chuyển hóa CSKH từ bộ phận chi phí thành động lực gia tăng giá trị thương hiệu.</p></div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase flex items-center space-x-1.5"><Trophy className="w-4 h-4" /><span>Cho Tổ Chức Nội Bộ</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Môi trường làm việc nhân văn, nhân sự được trao quyền, định hướng rõ ràng.</p></div>
        </div>
        <div className="p-5 rounded-2xl glass-inner text-xs font-body space-y-2">
          <p className="leading-relaxed flex items-start gap-1.5"><Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span><strong>Bài học kinh nghiệm:</strong> Văn hóa Customer-Centric phải cụ thể hóa bằng hành vi và sự trao quyền; Tuyển chọn đúng tư duy dịch vụ ngay từ đầu quan trọng hơn chỉ đào tạo kỹ năng.</span></p>
          <p className="leading-relaxed flex items-start gap-1.5"><Rocket className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /><span><strong>Hướng phát triển tiếp theo:</strong> Ban hành bộ quy trình SOP chi tiết từng kênh, tích hợp hệ thống Omnichannel CRM và xây dựng cổng đào tạo E-learning LMS hoàn chỉnh.</span></p>
        </div>
      </section>

      {/* SUMMARY CARD */}
      <section id="summary-card" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 text-white shadow-2xl border border-white/40 backdrop-blur-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BadgeCheck className="w-6 h-6 text-amber-300" />
            <h3 className="text-lg font-bold uppercase tracking-wider">PROJECT SUMMARY CARD (EXECUTIVE OVERVIEW)</h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-white/20 font-bold backdrop-blur-md border border-white/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Case Study 1.1 V2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body leading-relaxed">
          <div className="space-y-2">
            <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" /><span><strong className="text-sky-200 uppercase tracking-wide">Dự Án:</strong> 1.1 Xây Dựng & Vận Hành Phòng Dịch Vụ Khách Hàng</span></p>
            <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" /><span><strong className="text-sky-200 uppercase tracking-wide">Mục Tiêu:</strong> Xây dựng bộ máy CSKH chuẩn hóa, chủ động nâng cao trải nghiệm và tạo kết nối bền vững với khách hàng.</span></p>
            <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" /><span><strong className="text-sky-200 uppercase tracking-wide">Giải Pháp:</strong> Quy hoạch Tầm nhìn/Sứ mệnh, thiết kế Sơ đồ tổ chức 6 khối, chuẩn hóa Khung năng lực tuyển dụng và lan tỏa Văn hóa Customer-Centric.</span></p>
          </div>
          <div className="space-y-2">
            <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" /><span><strong className="text-purple-200 uppercase tracking-wide">Vai Trò:</strong> Senior Project Architect & CX Strategist</span></p>
            <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" /><span><strong className="text-purple-200 uppercase tracking-wide">Kết Quả:</strong> Bộ máy đi vào hoạt động ổn định, đội ngũ gắn kết, quy trình sẵn sàng cho mở rộng quy mô đa kênh.</span></p>
            <p className="flex items-start gap-1.5"><Check className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" /><span><strong className="text-purple-200 uppercase tracking-wide">Giá Trị:</strong> Tạo bệ phóng vững chắc để triển khai toàn bộ các chiến lược công nghệ, vận hành và đào tạo CSKH nâng cao.</span></p>
          </div>
        </div>
      </section>
    </div>
  );
}
