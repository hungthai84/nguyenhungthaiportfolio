export interface CaseStudyAction {
  title: string;
  desc: string;
  value: string;
}

export interface CaseStudyStar {
  solutionSummary: string;
  context: string;
  actions: CaseStudyAction[];
  results: string[];
}

export interface ProjectCard {
  id: string;
  groupId: string; // g1..g6
  groupTitle: string;
  groupHashtag: string;
  phase: string;
  phaseCode: string;
  branchTitle: string;
  description: string;
  timeframe: string;
  role: string;
  tags: string[];
  image: string;
  caseStudy: CaseStudyStar;
}

export const PROJECTS_LIST: ProjectCard[] = [
  // [Dự án 1] 1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng
  {
    id: "p1_1",
    groupId: "g1",
    groupTitle: "Nhóm 01 · Xây dựng & Phát triển",
    groupHashtag: "#PhátTriển #Structure",
    phase: "Giai đoạn 1",
    phaseCode: "1.1",
    branchTitle: "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
    description: "Thiết lập cơ cấu – sơ đồ tổ chức – định hướng hoạt động",
    timeframe: "2011 – 2024",
    role: "Trưởng Phòng Dịch vụ Khách hàng",
    tags: ["#PhátTriển", "#Structure", "#CSOperations"],
    image: "https://i.ibb.co/ymvZmbMM/1-1-X-y-d-ng-Ph-ng-D-ch-v-Kh-ch-h-ng.png",
    caseStudy: {
      solutionSummary: "Chuyển đổi phòng CSKH từ một trung tâm chi phí thụ động (Cost Center) thành bệ phóng trải nghiệm và trung tâm giá trị (Value Center). Thiết lập bộ máy vận hành hoàn chỉnh từ Tầm nhìn, Sơ đồ tổ chức 6 khối chuyên trách, Luồng xử lý 3 tuyến, Khung năng lực tuyển dụng đến Văn hóa Customer-Centric.",
      context: "Doanh nghiệp chưa có bộ máy CSKH chuyên trách bài bản, các phản hồi của khách hàng bị đùn đẩy và phản hồi chậm trễ, dẫn đến tỷ lệ rời bỏ cao.",
      actions: [
        {
          title: "01 · TẦM NHÌN & SỨ MỆNH",
          desc: "Định hình rõ vai trò và đóng góp chiến lược của phòng CSKH trong bức tranh chung của doanh nghiệp.",
          value: "Thống nhất tư duy và kim chỉ nam hành động cho toàn bộ đội ngũ."
        },
        {
          title: "02 · THIẾT KẾ SƠ ĐỒ TỔ CHỨC 6 KHỐI",
          desc: "Tối ưu hóa hiệu suất vận hành nhờ tính chuyên trách và luồng phối hợp 3 tuyến nhịp nhàng.",
          value: "Phân định rõ trách nhiệm, xử lý đúng tuyến và dễ dàng mở rộng quy mô."
        },
        {
          title: "03 · KHUNG NĂNG LỰC & TUYỂN DỤNG",
          desc: "Đảm bảo tuyển dụng đúng người, đúng năng lực và giảm thiểu tỷ lệ tiêu hao nhân sự.",
          value: "Xây dựng lực lượng nhân sự chất lượng cao, giỏi chuyên môn và vững tư duy dịch vụ."
        },
        {
          title: "04 · VĂN HÓA CUSTOMER-CENTRIC",
          desc: "Đưa khách hàng vào trung tâm của mọi quyết định nội bộ.",
          value: "Biến tinh thần phục vụ thành DNA của bộ phận, tạo ra các tương tác vượt kỳ vọng."
        }
      ],
      results: [
        "Thời gian phản hồi ban đầu (FRT) giảm từ 45 phút xuống 2.8 phút (Nhanh hơn 93.7%).",
        "Tỷ lệ giải quyết lần đầu (FCR) tăng từ 52.0% lên 88.2%.",
        "Tỷ lệ tuân thủ SLA phản hồi đạt 98.5%."
      ]
    }
  },

  // [Dự án 2] 1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động
  {
    id: "p1_2",
    groupId: "g1",
    groupTitle: "Nhóm 01 · Xây dựng & Phát triển",
    groupHashtag: "#PhátTriển #OKR",
    phase: "Giai đoạn 1",
    phaseCode: "1.2",
    branchTitle: "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
    description: "OKR, KPI ngắn - dài hạn, phù hợp chiến lược toàn công ty",
    timeframe: "2011 – 2024",
    role: "Trưởng Phòng Dịch vụ Khách hàng (Head of CS)",
    tags: ["#PhátTriển", "#OKR", "#KPIMatrix"],
    image: "https://i.ibb.co/jv0GzTdF/1-2-Thi-t-l-p-m-c-ti-u-ph-ng-ban.png",
    caseStudy: {
      solutionSummary: "Chuyển đổi Phòng CSKH từ trung tâm chi phí (Cost Center) thành trung tâm giá trị (Value Center) thông qua việc kết hợp hệ thống đo lường hiệu suất KPI vận hành với mục tiêu tham vọng OKR gắn liền với chiến lược tăng trưởng toàn công ty.",
      context: "Phòng CSKH hoạt động thiếu mục tiêu định lượng cụ thể, chủ yếu xử lý thụ động theo sự việc phát sinh và báo cáo định kỳ bằng file thủ công.",
      actions: [
        {
          title: "01 · Kết hợp Ma trận KPI & OKR",
          desc: "Đảm bảo cân bằng giữa vận hành ổn định và đổi mới bứt phá.",
          value: "Nhân sự vừa giữ vững kỷ luật vừa có không gian sáng tạo."
        },
        {
          title: "02 · Strategic Alignment (Liên kết Chiến lược)",
          desc: "Tạo sợi dây liên kết xuyên suốt từ công ty đến từng cá nhân.",
          value: "Mỗi nhân viên nhận thức rõ mỗi cuộc gọi của mình đóng góp gì cho doanh nghiệp."
        },
        {
          title: "03 · Realtime Operational Dashboard",
          desc: "Số hóa dữ liệu và minh bạch hóa hiệu suất thời gian thực.",
          value: "Phát hiện ngay lập tức tình trạng quá tải để linh hoạt điều phối nhân sự."
        },
        {
          title: "04 · Cơ chế Đánh giá & Khen thưởng Linh hoạt",
          desc: "Ghi nhận xứng đáng các nỗ lực vượt bậc của đội ngũ.",
          value: "Thúc đẩy động lực nội tại và tinh thần thi đua lành mạnh."
        }
      ],
      results: [
        "100% nhân sự nắm vững chỉ số và chủ động theo dõi hiệu suất qua Dashboard cá nhân.",
        "Thời gian xử lý sự cố giảm 35% nhờ cơ chế cảnh báo sớm."
      ]
    }
  },

  // [Dự án 3] 1.3 · Nâng cao chất lượng trải nghiệm khách hàng
  {
    id: "p1_3",
    groupId: "g1",
    groupTitle: "Nhóm 01 · Xây dựng & Phát triển",
    groupHashtag: "#PhátTriển #CXDesign",
    phase: "Giai đoạn 3",
    phaseCode: "1.3",
    branchTitle: "1.3 · Nâng cao chất lượng trải nghiệm khách hàng",
    description: "Thiết lập tiêu chuẩn trải nghiệm, đo lường cảm xúc, đồng bộ hành trình",
    timeframe: "2013 – 2024",
    role: "Trưởng Phòng CSKH / Head of CX",
    tags: ["#PhátTriển", "#CXDesign", "#CustomerJourney"],
    image: "https://i.ibb.co/wHMFW7f/1-3-N-ng-cao-tr-i-nghi-m-kh-ch-h-ng.png",
    caseStudy: {
      solutionSummary: "Chuyển đổi toàn diện trải nghiệm khách hàng (CX) từ hỗ trợ phản ứng (Reactive Support) sang thiết kế hành trình chủ động và thấu cảm (Proactive & Emotional CX), kết hợp bản đồ hành trình 6 giai đoạn với hệ thống đo lường cảm xúc thời gian thực (CSAT/NPS/CES).",
      context: "CSKH chủ yếu tập trung giải quyết sự cố đơn lẻ theo từng ticket, thiếu cái nhìn toàn diện về hành trình cảm xúc và các điểm chạm xuyên suốt vòng đời khách hàng.",
      actions: [
        {
          title: "01 · Customer Journey Mapping (CJM)",
          desc: "Nhận diện toàn bộ điểm chạm và các khoảnh khắc chân thực (Moments of Truth).",
          value: "Hiểu rõ chính xác khách hàng cần gì tại từng thời điểm."
        },
        {
          title: "02 · Realtime VoC & Sentiment Tracking",
          desc: "Đo lường cảm xúc khách hàng ngay sau mỗi tương tác.",
          value: "Bắt trọn phản hồi nóng để can thiệp trong vòng 15 phút."
        },
        {
          title: "03 · Closed-Loop Detractor Recovery",
          desc: "Xử lý triệt để các phản hồi tiêu cực để biến khách hàng giận dữ thành trung thành.",
          value: "Cứu vãn thành công 85% khách hàng có nguy cơ rời bỏ."
        },
        {
          title: "04 · Empathy-First Service Standards",
          desc: "Nâng chuẩn giao tiếp từ đúng kịch bản sang chạm đến trái tim.",
          value: "Biến các cuộc gọi giải quyết sự cố thành cơ hội gia tăng tình cảm thương hiệu."
        }
      ],
      results: [
        "Xóa bỏ 100% tình trạng khách hàng phải nhắc lại vấn đề nhiều lần khi chuyển kênh.",
        "Thời gian xử lý khiếu nại cảm xúc giảm từ 48h xuống 4h."
      ]
    }
  },

  // [Dự án 4] 1.4 · Quản lý và triển khai dự án chăm sóc khách hàng
  {
    id: "p1_4",
    groupId: "g1",
    groupTitle: "Nhóm 01 · Xây dựng & Phát triển",
    groupHashtag: "#PhátTriển #ProjectManagement",
    phase: "Giai đoạn 3",
    phaseCode: "1.4",
    branchTitle: "1.4 · Quản lý và triển khai dự án chăm sóc khách hàng",
    description: "Áp dụng Agile / Kanban, giám sát triển khai cải tiến",
    timeframe: "2013 – 2021",
    role: "Trưởng Phòng CSKH / Project Lead",
    tags: ["#PhátTriển", "#ProjectManagement", "#AgileKanban"],
    image: "https://i.ibb.co/0RtGZR9b/1-4-Qu-n-l-d-n-CSKH.png",
    caseStudy: {
      solutionSummary: "Áp dụng phương pháp luận quản trị dự án Agile / Scrum & Kanban chuyên sâu cho khối Dịch vụ Khách hàng, thiết lập guồng máy cải tiến liên tục (Continuous Improvement Engine) giúp triển khai thành công hàng chục dự án số hóa và tối ưu vận hành đúng tiến độ, đúng ngân sách.",
      context: "Phòng CSKH có rất nhiều sáng kiến cải tiến nhưng thường bị chậm tiến độ, thiếu nguồn lực chuyên trách và khó phối hợp với các đội ngũ Công nghệ / Sản phẩm.",
      actions: [
        {
          title: "01 · Project Charter & Prioritization",
          desc: "Định hình rõ mục tiêu, phạm vi và thứ tự ưu tiên của từng dự án.",
          value: "Tập trung 100% nguồn lực vào những dự án tạo ra tác động lớn nhất cho trải nghiệm khách hàng."
        },
        {
          title: "02 · Kanban Board & WIP Limits",
          desc: "Trực quan hóa luồng công việc và ngăn chặn tình trạng quá tải.",
          value: "Loại bỏ hoàn toàn điểm nghẽn, tăng tính minh bạch và nhịp độ làm việc ổn định."
        },
        {
          title: "03 · Daily Stand-up & Sprint Cadence",
          desc: "Tháo gỡ rào cản và duy trì tính gắn kết liên tục của dự án.",
          value: "Giải quyết ngay các vướng mắc phát sinh trong ngày, không để tồn đọng."
        },
        {
          title: "04 · Sprint Review & Retrospective",
          desc: "Học hỏi và liên tục tối ưu hóa quy trình sau mỗi chu kỳ dự án.",
          value: "Đội ngũ liên tục tiến bộ, văn hóa hợp tác ngày càng gắn kết và bền vững."
        }
      ],
      results: [
        "Triển khai thành công 15+ dự án lớn nhỏ trong 1 năm mà không bị trễ hạn.",
        "Thời gian hoàn thành một tính năng cải tiến rút ngắn từ 60 ngày xuống còn 18 ngày."
      ]
    }
  },

  // [Dự án 5] 1.5 · Cải tiến sản phẩm từ ý kiến khách hàng
  {
    id: "p1_5",
    groupId: "g1",
    groupTitle: "Nhóm 01 · Xây dựng & Phát triển",
    groupHashtag: "#PhátTriển #VoiceOfCustomer",
    phase: "Giai đoạn 3",
    phaseCode: "1.5",
    branchTitle: "1.5 · Cải tiến sản phẩm từ ý kiến khách hàng",
    description: "Góp ý sản phẩm từ dữ liệu CS, xây “vòng phản hồi” liên phòng ban",
    timeframe: "2011 – 2024",
    role: "Trưởng Phòng CSKH / Voice of Customer Lead",
    tags: ["#PhátTriển", "#VoiceOfCustomer", "#ProductFeedback"],
    image: "https://i.ibb.co/VcxnwPrH/1-5-Th-c-y-c-i-ti-n-s-n-ph-m.png",
    caseStudy: {
      solutionSummary: "Thiết lập Vòng lặp Phản hồi Tiếng nói Khách hàng khép kín (Closed-Loop Voice of Customer - VoC), chuyển hóa hàng triệu phản ánh, thắc mắc và đóng góp từ tiền tuyến CSKH thành nguồn dữ liệu định lượng có giá trị cao nhất, thúc đẩy đội ngũ Product/Tech liên tục hoàn thiện sản phẩm.",
      context: "CSKH tiếp nhận hàng ngàn ý kiến phản hồi mỗi ngày nhưng thông tin bị trôi dạt trong các báo cáo định kỳ, Product Team không có dữ liệu cụ thể để ưu tiên sửa lỗi hoặc phát triển tính năng mới.",
      actions: [
        {
          title: "01 · Standardized Pain-Point Tagging",
          desc: "Số hóa và phân loại chính xác mọi vấn đề khách hàng gặp phải.",
          value: "Mọi cuộc gọi, tin nhắn đều được chuyển hóa thành dữ liệu có thể đo lường và truy vấn tức thì."
        },
        {
          title: "02 · Realtime Emergency Bug Protocol",
          desc: "Cảnh báo tức thì khi xuất hiện sự cố diện rộng sau bản cập nhật.",
          value: "Phát hiện sự cố sớm hơn cả hệ thống giám sát server, ngăn chặn khủng hoảng diện rộng."
        },
        {
          title: "03 · Weekly VoC & Product Priority Matrix",
          desc: "Định lượng mức độ ưu tiên xử lý dựa trên dữ liệu thực tế.",
          value: "Xóa bỏ mọi tranh cãi cảm tính, tập trung giải quyết triệt để vấn đề nhức nhối nhất của khách hàng."
        },
        {
          title: "04 · Close-the-Loop Notification",
          desc: "Tri ân và thông báo lại cho khách hàng khi sản phẩm đã được nâng cấp.",
          value: "Khách hàng cảm thấy tiếng nói của mình được trân trọng, chuyển từ bức xúc sang gắn bó trung thành."
        }
      ],
      results: [
        "Khắc phục thành công hơn 200+ điểm nghẽn UX/UI và lỗi tính năng lớn nhỏ trong năm.",
        "Thời gian nhận biết và xử lý lỗi diện rộng giảm từ 4 giờ xuống còn dưới 15 phút."
      ]
    }
  },

  // [Dự án 6] 1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ
  {
    id: "p1_6",
    groupId: "g1",
    groupTitle: "Nhóm 01 · Xây dựng & Phát triển",
    groupHashtag: "#PhátTriển #CrisisManagement",
    phase: "Giai đoạn 3",
    phaseCode: "1.6",
    branchTitle: "1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ",
    description: "Chiến lược giữ chân khách hàng, xử lý khủng hoảng truyền thông và dịch vụ",
    timeframe: "2013 – 2024",
    role: "Trưởng Phòng CSKH / Crisis Management Lead",
    tags: ["#PhátTriển", "#CrisisManagement", "#ChurnRetention"],
    image: "https://i.ibb.co/dsN12n0H/6-1-Kh-ch-h-ng-l-trung-t-m.png",
    caseStudy: {
      solutionSummary: "Thiết lập Chiến lược Quản trị Khủng hoảng Dịch vụ Toàn diện kết hợp Khung Giữ chân Khách hàng Chủ động (Churn Mitigation & Crisis Playbook), giúp bảo vệ danh tiếng thương hiệu, xử lý dứt điểm các sự cố nghiêm trọng và hạ thấp tỷ lệ khách hàng rời bỏ xuống mức kỷ lục.",
      context: "Khi xảy ra sự cố kỹ thuật hoặc tranh chấp dịch vụ quy mô lớn, doanh nghiệp lúng túng trong phát ngôn, đường dây tổng đài tê liệt và khách hàng ồ ạt rời bỏ dịch vụ sang đối thủ.",
      actions: [
        {
          title: "01 · Crisis Playbook & War-Room Protocol",
          desc: "Chuẩn bị sẵn sàng kịch bản phản ứng cho mọi tình huống xấu nhất.",
          value: "Bình tĩnh, nhất quán và dập tắt nguy cơ khủng hoảng ngay từ trong trứng nước."
        },
        {
          title: "02 · IVR & Broadcast Overflow Relief",
          desc: "Giải tỏa tức thời áp lực cho tổng đài khi lưu lượng tăng đột biến.",
          value: "Giảm 60% lượng cuộc gọi đổ dồn, tránh nghẽn tổng đài và xoa dịu tâm lý sốt ruột của người dùng."
        },
        {
          title: "03 · AI Churn Prediction & Early Alert",
          desc: "Nhận diện khách hàng có dấu hiệu muốn rời bỏ trước khi họ hành động.",
          value: "Chủ động liên hệ chăm sóc và tặng ưu đãi trước khi khách hàng quyết định từ bỏ dịch vụ."
        },
        {
          title: "04 · Empathy Retention & Recovery Offer",
          desc: "Hóa giải bức xúc bằng giải pháp bồi thường thỏa đáng và thấu cảm.",
          value: "Biến nguy cơ mất khách thành cơ hội chứng minh sự chính trực và trách nhiệm cao nhất của doanh nghiệp."
        }
      ],
      results: [
        "Xử lý thành công 100% các sự cố kỹ thuật lớn mà không để xảy ra bất kỳ khủng hoảng truyền thông tiêu cực nào.",
        "Khôi phục trạng thái vận hành ổn định trong thời gian kỷ lục sau mỗi sự cố."
      ]
    }
  },

  // [Dự án 7] 2.1 · Chuẩn hóa quy trình chăm sóc khách hàng
  {
    id: "p2_1",
    groupId: "g2",
    groupTitle: "Nhóm 02 · Vận hành & Tối ưu",
    groupHashtag: "#VậnHành #SOP",
    phase: "Giai đoạn 1",
    phaseCode: "2.1",
    branchTitle: "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
    description: "SOP từ tiếp nhận đến xử lý, phối hợp liên phòng",
    timeframe: "2011 – 2024",
    role: "Trưởng Phòng CSKH / Process Architecture Lead",
    tags: ["#VậnHành", "#SOP", "#WorkflowStandard"],
    image: "https://i.ibb.co/SDRxyVYm/2-1-Chu-n-h-a-quy-tr-nh-CSKH.png",
    caseStudy: {
      solutionSummary: "Kiến trúc và chuẩn hóa toàn bộ hệ thống Quy trình Vận hành Chuẩn (SOP - Standard Operating Procedures) từ tiếp nhận, xử lý, phối hợp đa phòng ban đến đóng hồ sơ khiếu nại, kết hợp ma trận phân tầng xử lý 3 cấp (Tier 1-2-3) và bộ tiêu chí kiểm soát chất lượng (QA Rubric) nghiêm ngặt.",
      context: "Nhân sự hỗ trợ xử lý theo kinh nghiệm cá nhân ('mỗi người một phách'), thiếu tài liệu hướng dẫn chuẩn mực, dẫn đến cùng một vấn đề nhưng khách hàng nhận được câu trả lời khác nhau tùy vào người tiếp nhận.",
      actions: [
        {
          title: "01 · Visual SOP & Flowchart Library",
          desc: "Trực quan hóa từng bước xử lý để nhân viên tra cứu nhanh trong 5 giây.",
          value: "Rút ngắn 70% thời gian tìm kiếm thông tin của Agent trong lúc đàm thoại."
        },
        {
          title: "02 · 3-Tier Escalation Framework",
          desc: "Định tuyến chính xác hồ sơ đến đúng người có thẩm quyền giải quyết.",
          value: "Giảm tải cho chuyên gia cấp cao, tập trung nguồn lực đúng chỗ."
        },
        {
          title: "03 · Inter-departmental OLA & SLA",
          desc: "Xác lập kỷ luật phối hợp nghiêm ngặt giữa các phòng ban.",
          value: "Xóa bỏ tình trạng đùn đẩy trách nhiệm, tăng tốc độ xử lý tổng thể."
        },
        {
          title: "04 · 360-degree Quality Assurance (QA)",
          desc: "Đánh giá, hiệu chuẩn và cải tiến liên tục kỹ năng thực thi của đội ngũ.",
          value: "Phát hiện lỗ hổng kỹ năng để đào tạo bù đắp kịp thời."
        }
      ],
      results: [
        "100% nghiệp vụ được văn bản hóa và chuẩn hóa sơ đồ luồng tra cứu tức thì.",
        "Thời gian đào tạo nhân viên mới (Ramp-up Time) rút ngắn từ 4 tuần xuống còn 10 ngày."
      ]
    }
  },

  // [Dự án 8] 2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng
  {
    id: "p2_2",
    groupId: "g2",
    groupTitle: "Nhóm 02 · Vận hành & Tối ưu",
    groupHashtag: "#VậnHành #OmniChannel",
    phase: "Giai đoạn 2",
    phaseCode: "2.2",
    branchTitle: "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
    description: "Hợp nhất kênh hotline, chat, email, mạng xã hội",
    timeframe: "2007 – 2024",
    role: "Trưởng Nhóm / Trưởng Phòng CSKH",
    tags: ["#VậnHành", "#OmniChannel", "#ChannelOptimization"],
    image: "https://i.ibb.co/BVbDG6yQ/2-2-T-i-u-h-a-k-nh-h-tr.png",
    caseStudy: {
      solutionSummary: "Chuyển đổi từ mô hình hỗ trợ đa kênh phân mảnh (Multi-Channel) sang Hợp nhất Đa kênh Toàn diện (True Omni-Channel Support Platform), đồng bộ dữ liệu lịch sử tương tác trên Hotline, Livechat, Email, Facebook Fanpage, Zalo OA và In-app Support vào một giao diện làm việc duy nhất (Single Agent Workspace).",
      context: "Khách hàng liên hệ qua nhiều kênh khác nhau (gọi tổng đài, nhắn tin Facebook, gửi email) nhưng mỗi kênh lại nằm ở một phần mềm riêng biệt, nhân viên phải mở 5-6 tab trình duyệt cùng lúc.",
      actions: [
        {
          title: "01 · Single Agent Workspace",
          desc: "Xóa bỏ việc chuyển đổi qua lại giữa nhiều ứng dụng.",
          value: "Tiết kiệm 20% thời gian thao tác vô ích của nhân sự."
        },
        {
          title: "02 · Skills-Based & Blended Routing",
          desc: "Tự động phân bổ đúng việc cho đúng người vào đúng thời điểm.",
          value: "Cân bằng tải hoàn hảo, triệt tiêu tình trạng 'nơi thừa nơi thiếu'."
        },
        {
          title: "03 · Unified Customer Profile",
          desc: "Hiển thị tức thời toàn bộ hành trình tương tác của khách hàng.",
          value: "Agent chào đón thân thiện theo đúng ngữ cảnh, không hỏi lại câu thừa."
        },
        {
          title: "04 · Channel Shift Strategy (Dịch chuyển Kênh)",
          desc: "Điều hướng khách hàng từ kênh đắt đỏ sang kênh số tiện lợi và tiết kiệm.",
          value: "Giảm 35% chi phí cước viễn thông đắt đỏ cho doanh nghiệp."
        }
      ],
      results: [
        "100% kênh liên lạc được hợp nhất về 1 màn hình duy nhất, không còn sót lọt bất kỳ tin nhắn nào.",
        "Năng suất tiếp nhận yêu cầu của mỗi nhân sự tăng 140%."
      ]
    }
  },

  // [Dự án 9] 2.3 · Tự động hóa quy trình chăm sóc khách hàng
  {
    id: "p2_3",
    groupId: "g2",
    groupTitle: "Nhóm 02 · Vận hành & Tối ưu",
    groupHashtag: "#VậnHành #Automation",
    phase: "Giai đoạn 3",
    phaseCode: "2.3",
    branchTitle: "2.3 · Tự động hóa quy trình chăm sóc khách hàng",
    description: "Ứng dụng RPA, auto workflow, giảm thao tác lặp lại",
    timeframe: "2016 – 2024",
    role: "Trưởng Phòng CSKH / Automation Lead",
    tags: ["#VậnHành", "#Automation", "#RPAWorkflow"],
    image: "https://i.ibb.co/vvXvMjZ1/2-3-Tri-n-khai-t-ng-h-a-2.png",
    caseStudy: {
      solutionSummary: "Triển khai chiến lược Tự động hóa Quy trình Thông minh (Intelligent Process Automation - IPA & RPA), giải phóng nhân viên khỏi 80% thao tác thủ công lặp lại, tự động hóa luồng phân loại ticket, cập nhật trạng thái đơn, đối soát hoàn tiền và kích hoạt thông báo chăm sóc khách hàng tức thời.",
      context: "Hơn 40% thời gian của nhân viên bị lãng phí vào các thao tác 'copy - paste' dữ liệu giữa các phần mềm, tạo ticket thủ công và gửi email thông báo theo mẫu có sẵn.",
      actions: [
        {
          title: "01 · Smart Auto-Ticketing & Triage",
          desc: "Tự động khởi tạo, nhận diện ý định và gán nhãn ticket ngay khi có tín hiệu.",
          value: "Loại bỏ hoàn toàn công đoạn phân loại ticket thủ công bằng tay."
        },
        {
          title: "02 · Macro & One-Click Workflows",
          desc: "Rút ngắn 10 thao tác phức tạp thành 1 cú nhấp chuột duy nhất.",
          value: "Tiết kiệm 3-4 phút thao tác cho mỗi lượt hỗ trợ."
        },
        {
          title: "03 · RPA Transaction Bot (Đối soát & Hoàn tiền)",
          desc: "Tự động hóa xử lý giao dịch tài chính nhanh chóng và chính xác tuyệt đối.",
          value: "Xử lý hàng ngàn giao dịch hoàn tiền mỗi ngày mà không tốn một phút nhân lực."
        },
        {
          title: "04 · Event-Driven Proactive Alerts",
          desc: "Thông báo trạng thái chủ động trước khi khách hàng kịp lo lắng hỏi.",
          value: "Ngăn chặn trước 40% lượng cuộc gọi hỏi thăm trạng thái đơn hàng."
        }
      ],
      results: [
        "Tự động hóa thành công 70% các tác vụ lặp lại trong vận hành hàng ngày.",
        "Thời gian xử lý yêu cầu hoàn tiền rút ngắn từ 48 giờ xuống còn 90 giây."
      ]
    }
  },

  // [Dự án 10] 2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động
  {
    id: "p2_4",
    groupId: "g2",
    groupTitle: "Nhóm 02 · Vận hành & Tối ưu",
    groupHashtag: "#VậnHành #OutboundCS",
    phase: "Giai đoạn 3",
    phaseCode: "2.4",
    branchTitle: "2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động",
    description: "Kịch bản gọi/email chủ động: chăm sóc, tái kích hoạt, survey...",
    timeframe: "2011 – 2024",
    role: "Trưởng Phòng CSKH / Outbound Lead",
    tags: ["#VậnHành", "#OutboundCS", "#ProactiveCare"],
    image: "https://i.ibb.co/HDWHvvHN/2-4-Qu-n-l-chi-n-d-ch-Outbound.png",
    caseStudy: {
      solutionSummary: "Chuyển dịch mô hình vận hành từ 'Ngồi chờ khách hàng gọi đến' (Reactive) sang 'Chủ động tiếp cận và chăm sóc có mục tiêu' (Proactive & Outbound Care), triển khai các chiến dịch chào đón khách mới (Welcome Journey), hướng dẫn sử dụng, khảo sát chất lượng, cảnh báo rủi ro và tái kích hoạt khách hàng ngủ đông (Winback Campaigns).",
      context: "Phòng CSKH chỉ hoạt động khi có sự cố phát sinh từ phía người dùng, dẫn đến hình ảnh thương hiệu trong mắt khách hàng chỉ gắn liền với phiền phức và lỗi dịch vụ.",
      actions: [
        {
          title: "01 · Onboarding Welcome Call Journey",
          desc: "Đồng hành và hướng dẫn khách hàng mới trải nghiệm giá trị cốt lõi đầu tiên.",
          value: "Tạo ấn tượng chuyên nghiệp ngay từ đầu, giảm 50% tỷ lệ từ bỏ sản phẩm."
        },
        {
          title: "02 · Predictive Auto-Dialer Engine",
          desc: "Tối đa hóa thời gian đàm thoại thực chất của nhân viên.",
          value: "Tăng năng suất từ 50 cuộc lên 160+ cuộc kết nối thành công/ngày cho mỗi Agent."
        },
        {
          title: "03 · Proactive Risk Alert & Health Check",
          desc: "Cảnh báo và hỗ trợ trước khi sự cố ảnh hưởng đến quyền lợi khách hàng.",
          value: "Khách hàng cảm kích vì sự chu đáo, hạn chế tối đa tranh chấp và khiếu nại."
        },
        {
          title: "04 · Dormant Win-back Campaigns",
          desc: "Đánh thức và mang khách hàng không hoạt động quay trở lại sử dụng dịch vụ.",
          value: "Khôi phục doanh thu từ tệp khách hàng cũ mà không tốn chi phí Marketing mới."
        }
      ],
      results: [
        "Vận hành liên tục các chiến dịch Outbound với năng suất trung bình 165 cuộc kết nối/Agent/ngày.",
        "Tỷ lệ kết nối thành công đạt 88.5%."
      ]
    }
  },

  // [Dự án 11] 2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng
  {
    id: "p2_5",
    groupId: "g2",
    groupTitle: "Nhóm 02 · Vận hành & Tối ưu",
    groupHashtag: "#VậnHành #BPO",
    phase: "Giai đoạn 3",
    phaseCode: "2.5",
    branchTitle: "2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng",
    description: "Tiêu chuẩn hóa dịch vụ, SLA và giám sát chất lượng BPO",
    timeframe: "2018 – 2021",
    role: "Trưởng Phòng CSKH / BPO Manager",
    tags: ["#VậnHành", "#BPO", "#VendorManagement"],
    image: "https://i.ibb.co/RTzjNW01/2-5-Qu-n-l-i-t-c-thu-ngo-i-ch-m-s-c-kh-ch-h-ng.png",
    caseStudy: {
      solutionSummary: "Thiết lập Khung Quản trị Đối tác Thuê ngoài Toàn diện (BPO Vendor Management Framework), chuẩn hóa quy trình thẩm định, đàm phán hợp đồng SLA/KPI, kiểm soát chất lượng độc lập, đào tạo hiệu chuẩn (Calibration) và điều phối linh hoạt nguồn lực BPO quy mô hàng trăm nhân sự phục vụ các đợt cao điểm.",
      context: "Khi doanh nghiệp mở rộng quy mô hoặc vào các mùa chiến dịch cao điểm (Sale 11/11, Tết), khối lượng cuộc gọi tăng gấp 4-5 lần khiến đội ngũ nội bộ (In-house) bị quá tải hoàn toàn, cần thuê ngoài đối tác BPO (Business Process Outsourcing).",
      actions: [
        {
          title: "01 · Outcome-based SLA Contract",
          desc: "Gắn kết quyền lợi tài chính của BPO với chất lượng phục vụ thực tế.",
          value: "BPO chủ động tuyển dụng nhân sự tốt và đầu tư nâng cao chất lượng."
        },
        {
          title: "02 · Train-the-Trainer & Certification",
          desc: "Đảm bảo kiến thức sản phẩm và kỹ năng được chuyển giao nguyên vẹn.",
          value: "Triệt tiêu hoàn toàn tình trạng Agent BPO thiếu kiến thức tư vấn sai lệch."
        },
        {
          title: "03 · Weekly QA Calibration Session",
          desc: "Đồng nhất thước đo đánh giá chất lượng giữa hai bên.",
          value: "Độ lệch chấm điểm QA giữa hai bên giảm xuống dưới 3%."
        },
        {
          title: "04 · Real-time WFM & Surge Capacity Management",
          desc: "Linh hoạt điều phối quy mô nhân sự theo biến động lưu lượng thực tế.",
          value: "Đảm bảo tổng đài luôn thông suốt trong mọi đợt bùng nổ chiến dịch mà không bị lãng phí chi phí."
        }
      ],
      results: [
        "Mở rộng quy mô phục vụ lên 150+ vị trí (seats) BPO thành công chỉ trong 2 tuần chuẩn bị cho mùa Mega-sale.",
        "Tỷ lệ tuân thủ thời gian tiếp nhận cuộc gọi SLA đạt 98.6%."
      ]
    }
  },

  // [Dự án 12] 3.1 · Xây dựng hệ thống quản lý thông tin khách hàng
  {
    id: "p3_1",
    groupId: "g3",
    groupTitle: "Nhóm 03 · Hệ thống & Dữ liệu",
    groupHashtag: "#CôngNghệ #CRM",
    phase: "Giai đoạn 2",
    phaseCode: "3.1",
    branchTitle: "3.1 · Xây dựng hệ thống quản lý thông tin khách hàng",
    description: "Tích hợp điểm chạm khách hàng – dữ liệu hành trình – báo cáo",
    timeframe: "2013 – 2024",
    role: "Trưởng Phòng CSKH / CRM System Architect",
    tags: ["#CôngNghệ", "#CRM", "#Customer360"],
    image: "https://i.ibb.co/xt535vdy/3-1-X-y-d-ng-h-th-ng-CRM.png",
    caseStudy: {
      solutionSummary: "Thiết kế và triển khai Hệ thống Quản trị Quan hệ Khách hàng Hiện đại (CRM 360-Degree View), tích hợp toàn diện dữ liệu định danh, lịch sử giao dịch, vòng đời tài khoản và dữ liệu tương tác đa kênh từ Core Banking / E-Commerce / App vào một nền tảng quản trị duy nhất.",
      context: "Dữ liệu khách hàng bị phân mảnh ở nhiều nơi: dữ liệu giao dịch nằm ở Core Backend, thông tin đơn hàng nằm ở Web/App, lịch sử gọi điện nằm ở Tổng đài và email nằm ở hộp thư riêng.",
      actions: [
        {
          title: "01 · Enterprise API Data Integration Hub",
          desc: "Kết nối và đồng bộ dữ liệu thời gian thực từ mọi hệ sinh thái.",
          value: "Xóa bỏ hoàn toàn các ốc đảo dữ liệu phân mảnh (Data Silos)."
        },
        {
          title: "02 · 360-degree Customer Timeline",
          desc: "Trực quan hóa toàn bộ lịch sử hành vi và tương tác của khách hàng.",
          value: "Agent nắm bắt ngữ cảnh khách hàng chỉ trong 3 giây lướt mắt."
        },
        {
          title: "03 · CTI & Intelligent Screen Pop-up",
          desc: "Tự động kích hoạt thông tin trước khi Agent nhấc máy.",
          value: "Agent cất lời chào đúng tên khách hàng ngay từ giây đầu tiên, gây ấn tượng mạnh mẽ."
        },
        {
          title: "04 · Dynamic Customer Segmentation & VIP Routing",
          desc: "Phân khúc tự động và ưu tiên phục vụ theo giá trị khách hàng.",
          value: "Bảo vệ tối đa tệp khách hàng mang lại 80% lợi nhuận cho công ty."
        }
      ],
      results: [
        "Triển khai thành công hệ thống CRM 360 phục vụ hơn 5 triệu tài khoản khách hàng hoạt động.",
        "Thời gian phản hồi thông tin của Agent trong lúc đàm thoại giảm 65%."
      ]
    }
  },

  // [Dự án 13] 3.2 · Phân tích và báo cáo dữ liệu khách hàng
  {
    id: "p3_2",
    groupId: "g3",
    groupTitle: "Nhóm 03 · Hệ thống & Dữ liệu",
    groupHashtag: "#CôngNghệ #Insight",
    phase: "Giai đoạn 2",
    phaseCode: "3.2",
    branchTitle: "3.2 · Phân tích và báo cáo dữ liệu khách hàng",
    description: "Realtime Dashboard: CSAT, NPS, CES, phản hồi – KPI",
    timeframe: "2011 – 2024",
    role: "Trưởng Phòng CSKH / CX Analytics Lead",
    tags: ["#CôngNghệ", "#Insight", "#RealtimeAnalytics"],
    image: "https://i.ibb.co/ymm7WSMJ/3-2-Ph-n-t-ch-B-o-c-o.png",
    caseStudy: {
      solutionSummary: "Xây dựng Trung tâm Phân tích Dữ liệu Trải nghiệm Khách hàng Thời gian thực (Real-time CX Analytics Hub), tự động hóa toàn bộ luồng thu thập, xử lý và trực quan hóa các chỉ số đo lường hiệu suất vận hành (AHT, FCR, SLA, Abandonment) và chỉ số cảm xúc người dùng (CSAT, NPS, CES, Sentiment) lên hệ thống Executive Dashboards phục vụ việc ra quyết định chiến lược tức thời của Ban Điều Hành.",
      context: "Báo cáo hoạt động phòng CSKH được tổng hợp thủ công vào cuối tuần hoặc cuối tháng trên các file Excel nặng nề, thiếu tính chính xác và không thể hiện được xu hướng thời gian thực.",
      actions: [
        {
          title: "01 · Automated Data Pipeline & Warehouse",
          desc: "Tự động trích xuất, làm sạch và lưu trữ dữ liệu từ mọi nguồn.",
          value: "Dữ liệu luôn sẵn sàng, sạch sẽ và chuẩn hóa tuyệt đối."
        },
        {
          title: "02 · Realtime Command Center Wallboard",
          desc: "Giám sát sức khỏe vận hành từng giây cho đội ngũ quản lý ca.",
          value: "Team Lead nhận biết nguy cơ nghẽn mạng để điều phối nhân sự ngay trong 30 giây."
        },
        {
          title: "03 · Executive C-Level CX Dashboard",
          desc: "Cung cấp bức tranh toàn cảnh cho Ban Giám đốc chỉ trong 1 trang duy nhất.",
          value: "Giúp CEO và Ban Điều Hành nắm trọn tình hình khách hàng để ra quyết định kinh doanh."
        },
        {
          title: "04 · AI Anomaly Detection & Smart Alert",
          desc: "Tự động phát hiện các biến động bất thường và gửi cảnh báo tức thì.",
          value: "Chủ động kiểm soát sự cố trước khi lan rộng."
        }
      ],
      results: [
        "Tự động hóa 100% hệ thống báo cáo, xóa bỏ hoàn toàn hàng chục giờ lập file Excel mỗi tuần.",
        "Ban Lãnh đạo có thể truy cập báo cáo tình trạng khách hàng 24/7 từ điện thoại di động."
      ]
    }
  },

  // [Dự án 14] 3.3 · Khảo sát và đánh giá mức độ hài lòng
  {
    id: "p3_3",
    groupId: "g3",
    groupTitle: "Nhóm 03 · Hệ thống & Dữ liệu",
    groupHashtag: "#CôngNghệ #Survey",
    phase: "Giai đoạn 3",
    phaseCode: "3.3",
    branchTitle: "3.3 · Khảo sát và đánh giá mức độ hài lòng",
    description: "Thu thập ý kiến sau tương tác – tạo trigger cải tiến",
    timeframe: "2007 – 2024",
    role: "Trưởng Nhóm / Trưởng Phòng CSKH",
    tags: ["#CôngNghệ", "#Survey", "#CSATNPS"],
    image: "https://i.postimg.cc/vH24b2zP/13-B-o-c-o-Dashboard.jpg",
    caseStudy: {
      solutionSummary: "Thiết kế và triển khai Hệ thống Lắng nghe và Đánh giá Sự Hài lòng Toàn diện (Automated Customer Satisfaction Measurement System), tự động hóa việc thu thập phản hồi qua các chỉ số chuẩn quốc tế CSAT (Điểm Hài lòng), NPS (Mức độ Giới thiệu), CES (Nỗ lực Khách hàng) và vận hành Quy trình Đóng vòng Cứu vãn Khách hàng Không hài lòng (Closed-Loop Detractor Recovery Action Plan).",
      context: "Doanh nghiệp chỉ thực hiện khảo sát qua loa một năm vài lần bằng cách gọi điện thủ công vài trăm mẫu, mẫu khảo sát thiên vị và không phản ánh đúng bức tranh trải nghiệm thực tế.",
      actions: [
        {
          title: "01 · Micro-Survey Automation (1-Click)",
          desc: "Tối đa hóa tỷ lệ phản hồi bằng trải nghiệm khảo sát siêu tiện lợi.",
          value: "Khách hàng chỉ mất 2 giây để chấm điểm, tỷ lệ phản hồi tăng gấp 10 lần."
        },
        {
          title: "02 · CSAT - NPS - CES Multi-Metric Matrix",
          desc: "Đo lường đa chiều từ độ hài lòng tức thời đến lòng trung thành dài hạn.",
          value: "Hiểu rõ chính xác khách hàng đang gặp khó khăn ở khâu nào trong hành trình."
        },
        {
          title: "03 · Realtime Detractor Alarm & Recovery",
          desc: "Cứu vãn khách hàng bức xúc ngay khi họ vừa chấm điểm xấu.",
          value: "Hóa giải 85% trường hợp khách hàng giận dữ thành người ủng hộ thương hiệu."
        },
        {
          title: "04 · Verbatim AI Text Analytics",
          desc: "Khai phá insight giá trị từ hàng ngàn lời bình luận tự do.",
          value: "Tìm ra chính xác nguyên nhân gốc rễ đằng sau các con số điểm số khô khan."
        }
      ],
      results: [
        "Thu thập thành công hơn 50,000 lượt phản hồi khảo sát mỗi tháng với tỷ lệ phản hồi đạt 38.5%.",
        "100% phản hồi tiêu cực được xử lý trong vòng 60 phút."
      ]
    }
  },

  // [Dự án 15] 3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng
  {
    id: "p3_4",
    groupId: "g3",
    groupTitle: "Nhóm 03 · Hệ thống & Dữ liệu",
    groupHashtag: "#CôngNghệ #Chatbot",
    phase: "Giai đoạn 3",
    phaseCode: "3.4",
    branchTitle: "3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng",
    description: "Triển khai chatbot trả lời nhanh câu hỏi đơn giản",
    timeframe: "2023 – 2026+",
    role: "Trưởng Phòng CSKH / AI Chatbot Project Lead",
    tags: ["#CôngNghệ", "#Chatbot", "#GenAIChatbot"],
    image: "https://i.ibb.co/603Z7tXj/3-4-X-y-d-ng-AI-Bot.png",
    caseStudy: {
      solutionSummary: "Nghiên cứu, phát triển và triển khai Trợ lý Ảo AI Thông minh (Generative AI Chatbot & Voicebot) tích hợp công nghệ Xử lý Ngôn ngữ Tự nhiên (NLP), cơ chế RAG (Retrieval-Augmented Generation) tra cứu tri thức chuẩn xác và luồng Chuyển giao Thông minh cho Con người (Smart Human Handoff), giúp giải quyết tự động 24/7 hơn 65% các câu hỏi thường gặp với thời gian phản hồi dưới 1 giây.",
      context: "Khách hàng liên hệ với tần suất rất cao vào ban đêm, cuối tuần và các đợt khuyến mãi lớn khiến tổng đài quá tải, khách hàng phải chờ đợi lâu để được giải đáp các câu hỏi đơn giản, quen thuộc.",
      actions: [
        {
          title: "01 · Advanced Natural Language Processing (NLP)",
          desc: "Hiểu sâu sắc ngôn ngữ tự nhiên, tiếng lóng, viết tắt và lỗi chính tả tiếng Việt.",
          value: "Giao tiếp tự nhiên, mượt mà như một chuyên viên tư vấn tận tâm thực thụ."
        },
        {
          title: "02 · Enterprise RAG Knowledge Retrieval",
          desc: "Cung cấp câu trả lời chính xác tuyệt đối, triệt tiêu hoàn toàn hiện tượng 'ảo giác' (Hallucination).",
          value: "Đảm bảo 100% thông tin cung cấp cho khách hàng luôn đúng chính sách và cập nhật mới nhất."
        },
        {
          title: "03 · Transactional Action Bot (Tra cứu & Thao tác)",
          desc: "Không chỉ trả lời lý thuyết, Bot có thể trực tiếp thực thi các tác vụ cho khách hàng.",
          value: "Khách hàng tự giải quyết xong việc trong 15 giây mà không cần nhân viên hỗ trợ."
        },
        {
          title: "04 · Seamless Human Handoff & Auto-Summary",
          desc: "Chuyển giao êm đẹp cho nhân viên khi gặp câu hỏi phức tạp hoặc khách hàng yêu cầu.",
          value: "Agent tiếp quản ngay lập tức theo đúng ngữ cảnh, không bắt khách hàng lặp lại."
        }
      ],
      results: [
        "AI Bot tự động xử lý thành công hơn 180,000 lượt yêu cầu mỗi tháng mà không cần can thiệp của nhân sự.",
        "Giảm 60% khối lượng tin nhắn dồn về đội ngũ nhân viên tư vấn."
      ]
    }
  },

  // [Dự án 16] 4.1 · Phát triển chương trình đào tạo trực tuyến
  {
    id: "p4_1",
    groupId: "g4",
    groupTitle: "Nhóm 04 · Đào tạo & Năng lực",
    groupHashtag: "#PhátTriển #CSAcademy",
    phase: "Giai đoạn 3",
    phaseCode: "4.1",
    branchTitle: "4.1 · Phát triển chương trình đào tạo trực tuyến",
    description: "E-learning: onboarding, cập nhật quy trình, kiểm tra chất lượng",
    timeframe: "2013 – 2024",
    role: "Trưởng Phòng CSKH / E-Learning Director",
    tags: ["#PhátTriển", "#CSAcademy", "#ELearning"],
    image: "https://i.ibb.co/svQ9F4Tz/4-1-Ph-t-tri-n-o-t-o-tr-c-tuy-n.png",
    caseStudy: {
      solutionSummary: "Xây dựng Học viện Đào tạo Số Hóa Khối Dịch vụ Khách hàng (E-Learning CS Academy Platform), chuyển đổi toàn diện tài liệu đào tạo truyền thống sang các bài giảng tương tác đa phương tiện (Micro-Learning), kịch bản mô phỏng tình huống thực chiến (Scenario-Based Simulations) và hệ thống thi sát hạch tự động cấp chứng chỉ, giúp rút ngắn 65% thời gian Onboarding nhân sự mới.",
      context: "Hoạt động đào tạo chủ yếu diễn ra theo hình thức truyền thống trong phòng họp (Off-line Classroom), phụ thuộc hoàn toàn vào lịch rảnh của giảng viên và tài liệu in giấy nhanh chóng bị lỗi thời sau mỗi đợt đổi chính sách.",
      actions: [
        {
          title: "01 · Micro-Learning & Video Modules",
          desc: "Giúp nhân viên tiếp thu kiến thức nhanh chóng mà không bị quá tải thông tin.",
          value: "Nhân viên dễ dàng ghi nhớ và có thể tra cứu học lại ngay trước ca trực."
        },
        {
          title: "02 · Interactive Call & System Simulations",
          desc: "Luyện tập kỹ năng thao tác và giao tiếp an toàn trong môi trường ảo.",
          value: "Thành thạo 100% phản xạ tác nghiệp trước khi tiếp xúc với khách hàng thật."
        },
        {
          title: "03 · Automated Skill Testing & Certification",
          desc: "Đánh giá minh bạch, khách quan và tức thì năng lực của từng học viên.",
          value: "Xóa bỏ hoàn toàn tình trạng chấm điểm thiên vị hoặc gian lận trong kiểm tra."
        },
        {
          title: "04 · Gamification & Leaderboard",
          desc: "Tạo động lực học tập hào hứng, thi đua lành mạnh trong toàn phòng ban.",
          value: "Tỷ lệ hoàn thành các khóa học tự nguyện của nhân viên đạt trên 95%."
        }
      ],
      results: [
        "Số hóa thành công 100% kho học liệu với hơn 85 khóa học trực tuyến hoàn chỉnh.",
        "Thời gian đưa một nhân viên mới lên vận hành chính thức rút ngắn từ 28 ngày xuống 9 ngày."
      ]
    }
  },

  // [Dự án 17] 4.2 · Xây dựng khung năng lực và lộ trình phát triển
  {
    id: "p4_2",
    groupId: "g4",
    groupTitle: "Nhóm 04 · Đào tạo & Năng lực",
    groupHashtag: "#PhátTriển #CareerPath",
    phase: "Giai đoạn 2",
    phaseCode: "4.2",
    branchTitle: "4.2 · Xây dựng khung năng lực và lộ trình phát triển",
    description: "Định hướng phát triển nghề nghiệp cho nhân sự Dịch vụ Khách hàng",
    timeframe: "2003 – 2026+",
    role: "Trưởng Nhóm / Trưởng Phòng CSKH (Talent Lead)",
    tags: ["#PhátTriển", "#CareerPath", "#TalentCompetency"],
    image: "https://i.ibb.co/JRd7wxyC/4-2-X-y-d-ng-khung-n-ng-l-c-v-l-tr-nh-ph-t-tri-n.png",
    caseStudy: {
      solutionSummary: "Thiết lập Khung Năng lực Nghề nghiệp Chuẩn hóa (CS Competency Framework) theo mô hình ASK kết hợp Lộ trình Thăng tiến Minh bạch (Career Ladder & Pathing) cho 5 cấp bậc nhân sự Dịch vụ Khách hàng (Agent ➔ Senior Agent ➔ SME / Quality Specialist ➔ Team Lead ➔ CS Manager / Director), giúp gắn kết nhân tài và giảm 60% tỷ lệ nhảy việc.",
      context: "Nghề CSKH thường bị xem là công việc tạm bợ, thiếu lộ trình thăng tiến rõ ràng, tiêu chí xét tăng lương/thăng chức mang tính cảm tính của người quản lý.",
      actions: [
        {
          title: "01 · ASK Competency Framework Dictionary",
          desc: "Định nghĩa rõ ràng từng tiêu chuẩn năng lực cho từng cấp bậc.",
          value: "Minh bạch 100% tiêu chí, xóa bỏ hoàn toàn việc đánh giá cảm tính."
        },
        {
          title: "02 · Dual Career Ladder (Lộ trình Kép)",
          desc: "Mở rộng cơ hội phát triển theo cả 2 hướng: Quản lý hoặc Chuyên gia.",
          value: "Những nhân sự không thích làm sếp vẫn có thể thăng tiến và nhận mức lương tương đương quản lý."
        },
        {
          title: "03 · Skill Gap Matrix & 360-Degree Review",
          desc: "Nhận diện chính xác điểm mạnh và khoảng trống kỹ năng của từng cá nhân.",
          value: "Nhân viên biết rõ mình cần rèn luyện thêm điều gì để đạt cấp bậc tiếp theo."
        },
        {
          title: "04 · Future CS Leader Succession Program",
          desc: "Đào tạo và chuẩn bị sẵn sàng đội ngũ kế cận cho các vị trí chủ chốt.",
          value: "Tổ chức luôn có sẵn nhân sự kế thừa chất lượng cao khi mở rộng quy mô."
        }
      ],
      results: [
        "100% nhân viên có lộ trình phát triển nghề nghiệp cá nhân hóa rõ ràng.",
        "85% vị trí Quản lý, Lead và Chuyên viên được bổ nhiệm thành công từ nguồn nhân sự nội bộ."
      ]
    }
  },

  // [Dự án 18] 5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng
  {
    id: "p5_1",
    groupId: "g5",
    groupTitle: "Nhóm 05 · Hỗ trợ Khách hàng",
    groupHashtag: "#HỗTrợ #HelpDesk",
    phase: "Giai đoạn 2",
    phaseCode: "5.1",
    branchTitle: "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    description: "Tạo Helpcenter, cổng ticket, thư viện kiến thức FAQ",
    timeframe: "2013 – 2021",
    role: "Trưởng Phòng CSKH / Helpdesk Operations Director",
    tags: ["#HỗTrợ", "#HelpDesk", "#SelfServicePortal"],
    image: "https://i.ibb.co/5bcHqqz/5-1-Th-nh-l-p-trung-t-m-h-tr.png",
    caseStudy: {
      solutionSummary: "Kiến trúc và xây dựng Trung tâm Hỗ trợ Khách hàng Tự Phục Vụ Đa Phương Tiện (Modern Self-Service Help Center & Knowledge Base), chuẩn hóa hơn 600+ bài viết hướng dẫn nghiệp vụ, video trực quan và cổng theo dõi tiến độ ticket minh bạch, giúp tăng tỷ lệ tự giải quyết vấn đề của người dùng (Ticket Deflection Rate) lên trên 45% và giảm tải hàng chục ngàn yêu cầu hỗ trợ mỗi tháng.",
      context: "Doanh nghiệp không có cổng thông tin trợ giúp chính thức, người dùng khi gặp bất kỳ thắc mắc nào dù là nhỏ nhất (cách đổi mật khẩu, biểu phí) đều phải gọi hotline hoặc nhắn tin cho nhân viên hỗ trợ.",
      actions: [
        {
          title: "01 · Information Architecture & Content Hub",
          desc: "Sắp xếp tri thức khoa học theo danh mục chủ đề để khách hàng dễ duyệt.",
          value: "Khách hàng tìm thấy thông tin mình cần chỉ qua 2 lần nhấp chuột."
        },
        {
          title: "02 · AI-Powered Smart Search Engine",
          desc: "Gợi ý chính xác bài viết ngay khi người dùng gõ từ khóa đầu tiên.",
          value: "Rút ngắn thời gian tìm kiếm từ 3 phút xuống còn 10 giây."
        },
        {
          title: "03 · Realtime Ticket Tracking Portal",
          desc: "Minh bạch hóa tiến độ giải quyết yêu cầu, triệt tiêu sự sốt ruột của khách hàng.",
          value: "Giảm 75% các cuộc gọi hỏi thăm tiến độ hồ sơ lặp lại."
        },
        {
          title: "04 · In-app Embedded Contextual Widget",
          desc: "Mang câu trả lời đến ngay tại nơi khách hàng đang gặp khó khăn.",
          value: "Giải tỏa ngay thắc mắc tại chỗ mà không cần rời khỏi màn hình giao dịch."
        }
      ],
      results: [
        "Vận hành thành công Help Center với hơn 650 bài viết chất lượng cao, phục vụ hơn 800,000 lượt xem trang mỗi tháng.",
        "Giảm 45% tổng khối lượng ticket cơ bản dồn về cho nhân viên tổng đài."
      ]
    }
  },

  // [Dự án 19] 6.1 · Thiết lập khung quản trị chất lượng dịch vụ
  {
    id: "p6_1",
    groupId: "g6",
    groupTitle: "Nhóm 06 · Phân tích & Cải tiến",
    groupHashtag: "#CảiTiến #TQA #COPC",
    phase: "Xuyên suốt",
    phaseCode: "6.1",
    branchTitle: "6.1 · Thiết lập khung quản trị chất lượng dịch vụ",
    description: "Kiến trúc và thiết lập Hệ thống Quản trị Chất lượng Dịch vụ Toàn diện (Total Quality Assurance Framework - TQA) theo chuẩn COPC",
    timeframe: "2011 – 2026+",
    role: "Head of CX / CS Director",
    tags: ["#CảiTiến", "#TQA", "#COPCStandard"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    caseStudy: {
      solutionSummary: "Kiến trúc và thiết lập Hệ thống Quản trị Chất lượng Dịch vụ Toàn diện (Total Quality Assurance Framework - TQA), chuẩn hóa bộ tiêu chí đánh giá chất lượng cuộc gọi/tin nhắn theo chuẩn COPC quốc tế, xây dựng quy trình hiệu chuẩn định kỳ (Calibration Sessions) và chương trình huấn luyện 1-on-1 có mục tiêu (Targeted Coaching), giúp nâng điểm chất lượng QA Score toàn hệ thống lên trên 95% và triệt tiêu hoàn toàn các lỗi nghiêm trọng (Fatal Errors).",
      context: "Hoạt động chấm điểm chất lượng (QA) mang tính hình thức, thiếu công bằng và phụ thuộc vào cảm tính cá nhân của từng chuyên viên chấm điểm, dẫn đến mâu thuẫn nội bộ gay gắt giữa nhân viên và đội ngũ QA.",
      actions: [
        {
          title: "01 · Behavioral Quality Scorecard Matrix",
          desc: "Định lượng chính xác từng hành vi giao tiếp thành các thang điểm cụ thể.",
          value: "Minh bạch 100%, xóa bỏ hoàn toàn sự cảm tính trong chấm điểm."
        },
        {
          title: "02 · Weekly Cross-Calibration Protocol",
          desc: "Đồng nhất chuẩn mực chấm điểm giữa tất cả các Quản lý và Chuyên viên QA.",
          value: "Đảm bảo tính công bằng tuyệt đối cho mọi nhân viên ở bất kỳ ca trực nào."
        },
        {
          title: "03 · Targeted 1-on-1 Coaching Playbook",
          desc: "Chuyển hóa kết quả chấm điểm thành hành động tiến bộ cụ thể.",
          value: "Nhân viên cảm nhận được sự hỗ trợ tận tình, liên tục tiến bộ qua từng tuần."
        },
        {
          title: "04 · Automated QA Analytics & Heatmap",
          desc: "Nhận diện sớm các lỗ hổng kiến thức phổ biến trong toàn đội ngũ.",
          value: "Đào tạo đúng trọng tâm, không lãng phí thời gian vào những nội dung nhân viên đã giỏi."
        }
      ],
      results: [
        "Chuẩn hóa 100% quy trình đánh giá chất lượng cho hơn 300 nhân sự trực tiếp tác nghiệp.",
        "Độ lệch điểm số chấm chéo giữa các đánh giá viên giảm từ 18% xuống dưới 2.5%."
      ]
    }
  },

  // [Dự án 20] 6.2 · Quản trị sự thay đổi và khủng hoảng dịch vụ
  {
    id: "p6_2",
    groupId: "g6",
    groupTitle: "Nhóm 06 · Phân tích & Cải tiến",
    groupHashtag: "#CảiTiến #CrisisManagement",
    phase: "Xuyên suốt",
    phaseCode: "6.2",
    branchTitle: "6.2 · Quản trị sự thay đổi và khủng hoảng dịch vụ",
    description: "Xây dựng Khung Ứng phó Khủng hoảng Dịch vụ & Quản trị Biến động, thiết lập ma trận cảnh báo sớm 4 cấp độ",
    timeframe: "2011 – 2026+",
    role: "Head of CS / Voice of Customer Lead",
    tags: ["#CảiTiến", "#CrisisManagement", "#ChangeGovernance"],
    image: "https://i.ibb.co/jv4g1xKB/6-2-Qu-n-tr-s-thay-i-v-kh-ng-ho-ng-d-ch-v.png",
    caseStudy: {
      solutionSummary: "Xây dựng Khung Ứng phó Khủng hoảng Dịch vụ & Quản trị Biến động (Service Crisis Incident Management & Change Governance Framework), thiết lập ma trận cảnh báo sớm 4 cấp độ (Green - Yellow - Orange - Red), quy trình kích hoạt phòng điều hành khẩn cấp (War Room Command) và bộ kịch bản truyền thông thấu cảm, giúp xử lý êm đẹp các đợt đứt gãy hệ thống lớn mà không làm bùng phát khủng hoảng truyền thông.",
      context: "Khi hệ thống kỹ thuật gặp sự cố sập server, nghẽn cổng thanh toán hoặc giao hàng đình trệ diện rộng, phòng CSKH rơi vào thế bị động, tổng đài quá tải cháy máy, nhân viên không biết giải thích thế nào khiến khách hàng phẫn nộ tràn lên mạng xã hội tẩy chay.",
      actions: [
        {
          title: "01 · Early Warning & Incident War Room",
          desc: "Hội quân khẩn cấp giữa Lãnh đạo CSKH, Kỹ thuật, PR và Pháp chế.",
          value: "Hành động thống nhất, nhanh chóng chỉ trong 10 phút đầu tiên."
        },
        {
          title: "02 · Unified Empathy Holding Statements",
          desc: "Đồng nhất 100% phát ngôn trên mọi mặt trận trong vòng 15 phút.",
          value: "Trấn an tâm lý khách hàng ngay từ đầu, dập tắt các tin đồn thất thiệt."
        },
        {
          title: "03 · Emergency IVR & Call Deflection",
          desc: "Bảo vệ tổng đài không bị sập nguồn khi lưu lượng tăng đột biến gấp 20 lần.",
          value: "Giải tỏa ngay 70% lượng cuộc gọi lo lắng mà không cần Agent nghe máy."
        },
        {
          title: "04 · Proactive Goodwill Compensation Matrix",
          desc: "Chuyển hóa cảm xúc tiêu cực thành sự cảm kích sau khi sự cố kết thúc.",
          value: "Khách hàng cảm nhận được sự tử tế và trách nhiệm cao thượng của doanh nghiệp."
        }
      ],
      results: [
        "Xử lý thành công 100% các sự cố vận hành lớn mà không để xảy ra bất kỳ khủng hoảng truyền thông nào trên báo chí và mạng xã hội.",
        "Thời gian kích hoạt thông điệp trấn an khách hàng rút ngắn từ 2 giờ xuống còn 12 phút."
      ]
    }
  },

  // [Dự án 21] 6.3 · Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH
  {
    id: "p6_3",
    groupId: "g6",
    groupTitle: "Nhóm 06 · Phân tích & Cải tiến",
    groupHashtag: "#CảiTiến #GenerativeAI #AutoQA",
    phase: "Xuyên suốt",
    phaseCode: "6.3",
    branchTitle: "6.3 · Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH",
    description: "Tiên phong triển khai Hệ sinh thái Trí tuệ Nhân tạo Toàn diện Thế hệ mới (Generative AI Agent Copilot & Automated 100% Speech-to-Text Call QA)",
    timeframe: "2018 – 2026+",
    role: "Head of CS / CX Data Strategist",
    tags: ["#CảiTiến", "#GenerativeAI", "#AutoQA"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    caseStudy: {
      solutionSummary: "Tiên phong triển khai Hệ sinh thái Trí tuệ Nhân tạo Toàn diện Thế hệ mới (Generative AI Agent Copilot & Automated 100% Speech-to-Text Call QA), trang bị trợ lý ảo thông minh đồng hành cùng Agent theo thời gian thực, tự động tóm tắt cuộc gọi, gợi ý câu trả lời và tự động lắng nghe, chấm điểm chất lượng 100% cuộc gọi thoại, giúp tăng 40% năng suất làm việc và nâng chuẩn chất lượng dịch vụ vượt bậc.",
      context: "Nhân viên CSKH phải chịu áp lực ghi nhớ hàng ngàn trang tài liệu, vừa nghe khách nói vừa gõ máy tính ghi chép tóm tắt sau cuộc gọi (After-Call Work) mất rất nhiều thời gian. Trong khi đó, đội QA chỉ có thể nghe và chấm điểm thủ công được 1-2% tổng số cuộc gọi.",
      actions: [
        {
          title: "01 · Realtime AI Agent Copilot",
          desc: "Trợ lý ảo thông minh mớm lời và gợi ý thông tin chuẩn xác theo thời gian thực.",
          value: "Agent mới vào nghề cũng có thể trả lời tự tin như một chuyên gia 5 năm kinh nghiệm."
        },
        {
          title: "02 · One-Click AI Call Summarization",
          desc: "Tự động tóm tắt cuộc gọi hoàn chỉnh chỉ sau 1 cú nhấp chuột.",
          value: "Triệt tiêu hoàn toàn gánh nặng gõ phím sau cuộc gọi của nhân viên."
        },
        {
          title: "03 · 100% Speech-to-Text & Sentiment Radar",
          desc: "Lắng nghe, nhận diện cảm xúc và phát hiện rủi ro trên toàn bộ cuộc gọi.",
          value: "Quản lý nắm bắt ngay các ổ rủi ro tiềm ẩn trong ngày mà không cần nghe từng file ghi âm."
        },
        {
          title: "04 · AI Auto-QA & Compliance Scoring",
          desc: "Tự động chấm điểm chất lượng và tuân thủ quy trình cho 100% cuộc gọi.",
          value: "Giải phóng chuyên viên QA khỏi các công việc chấm máy móc để tập trung huấn luyện chuyên sâu cho nhân viên."
        }
      ],
      results: [
        "Triển khai thành công AI Copilot cho hơn 250 chuyên viên tư vấn hàng ngày.",
        "Hệ thống AI tự động chấm điểm và phân tích cảm xúc 100% cuộc gọi thoại (hơn 300,000 cuộc/tháng)."
      ]
    }
  }
];
