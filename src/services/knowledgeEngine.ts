import profileData from '../data/profile.json';
import { ProfileKnowledge, AIAction, AnswerLength } from '../types/ai';

export interface KnowledgeSearchResult {
  answer: string;
  confidence: number;
  category: string;
  actions: AIAction[];
  suggestions: string[];
}

class KnowledgeEngine {
  private kb: ProfileKnowledge;

  constructor() {
    this.kb = profileData as ProfileKnowledge;
  }

  public getKnowledgeBase(): ProfileKnowledge {
    return this.kb;
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .trim();
  }

  public searchKnowledge(query: string, length: AnswerLength = 'medium'): KnowledgeSearchResult {
    const norm = this.normalizeText(query);

    // 1. Contact / Communication Query
    if (
      norm.includes('lien he') ||
      norm.includes('email') ||
      norm.includes('sdt') ||
      norm.includes('so dien thoai') ||
      norm.includes('dia chi') ||
      norm.includes('nhan tin') ||
      norm.includes('gap')
    ) {
      return {
        answer: `Bạn có thể liên hệ trực tiếp với anh Nguyễn Hùng Thái qua Email: ${this.kb.contact.email} hoặc trang cá nhân LinkedIn. Anh Thái hiện đang công tác tại ${this.kb.contact.location}.`,
        confidence: 0.9,
        category: 'CONTACT',
        actions: [
          { type: 'contact', label: 'Liên hệ ngay' },
          { type: 'download_cv', label: 'Tải CV Nguyễn Hùng Thái' }
        ],
        suggestions: ['Anh Thái có bao nhiêu năm kinh nghiệm?', 'Các dự án nổi bật']
      };
    }

    // 2. CV Download Query
    if (
      norm.includes('download cv') ||
      norm.includes('tai cv') ||
      norm.includes('lay cv') ||
      norm.includes('xem cv') ||
      norm.includes('resume')
    ) {
      return {
        answer: 'Bạn có thể xem hoặc tải ngay file CV chính thức của anh Nguyễn Hùng Thái bằng cách chọn nút bên dưới:',
        confidence: 0.95,
        category: 'CONTACT',
        actions: [
          { type: 'download_cv', label: 'Tải CV bản PDF' },
          { type: 'navigate', target: '#experience', label: 'Xem phần kinh nghiệm' }
        ],
        suggestions: ['Chuyên môn chính của anh', 'Kinh nghiệm Call Center']
      };
    }

    // 3. Experience & Companies Query
    if (
      norm.includes('kinh nghiem') ||
      norm.includes('cong ty') ||
      norm.includes('chuc vu') ||
      norm.includes('vi tri') ||
      norm.includes('tham nien') ||
      norm.includes('qua trinh')
    ) {
      const exps = this.kb.experiences;
      let text = `Anh Nguyễn Hùng Thái có hơn ${this.kb.profile.years_experience} năm kinh nghiệm thực chiến trong quản lý Call Center & CX. `;
      if (length === 'short') {
        text += `Anh từng đảm nhiệm vai trò ${exps[0].position} tại ${exps[0].company} (quản lý ${exps[0].team_size}).`;
      } else {
        text += `Các vị trí đảm nhiệm tiêu biểu:\n- ${exps[0].position} (${exps[0].period}): Quản lý ${exps[0].team_size}, tối ưu CSAT >94%, FCR >85%.\n- ${exps[1].position} (${exps[1].period}): Đào tạo hơn 1,200 nhân sự nghiệp vụ CSKH.`;
      }

      return {
        answer: text,
        confidence: 0.88,
        category: 'EXPERIENCE',
        actions: [{ type: 'navigate', target: '#experience', label: 'Xem chi tiết Kinh nghiệm' }],
        suggestions: ['Dự án tiêu biểu', 'Kỹ năng CRM & AI', 'Liên hệ ngay']
      };
    }

    // 4. Skills, CRM, Call Center, KPI Query
    if (
      norm.includes('ky nang') ||
      norm.includes('crm') ||
      norm.includes('call center') ||
      norm.includes('contact center') ||
      norm.includes('kpi') ||
      norm.includes('csat') ||
      norm.includes('sop') ||
      norm.includes('nps') ||
      norm.includes('cong cu')
    ) {
      return {
        answer: `Kỹ năng nổi bật của anh Nguyễn Hùng Thái:\n• **Quản lý Vận hành**: Điều hành Contact Center 50 - 500+ nhân sự, xây dựng bộ quy trình SOP chuẩn quốc tế.\n• **Hệ thống CRM**: Thành thạo Salesforce, Zendesk, Freshdesk, HubSpot.\n• **Chỉ số Vận hành**: Quản trị CSAT (>92%), NPS (>65), FCR (>85%), SLA (98%), AHT.\n• **Công nghệ AI**: Tích hợp AI Chatbot, Voicebot và Omni-channel Contact Center.`,
        confidence: 0.88,
        category: 'SKILL',
        actions: [{ type: 'navigate', target: '#skills', label: 'Xem sơ đồ Kỹ năng' }],
        suggestions: ['Các dự án nổi bật', 'Triết lý dịch vụ', 'Bằng cấp & Chứng chỉ']
      };
    }

    // 5. Projects Query
    if (
      norm.includes('du an') ||
      norm.includes('project') ||
      norm.includes('thanh tuu') ||
      norm.includes('chuyen doi so') ||
      norm.includes('chatbot')
    ) {
      const proj = this.kb.projects;
      return {
        answer: `Anh Nguyễn Hùng Thái đã chủ trì các dự án trọng điểm:\n1. **${proj[0].name}**: ${proj[0].description} (Kết quả: ${proj[0].result})\n2. **${proj[1].name}**: ${proj[1].description} (Kết quả: ${proj[1].result})`,
        confidence: 0.88,
        category: 'PROJECT',
        actions: [{ type: 'navigate', target: '#projects', label: 'Xem chi tiết Dự án' }],
        suggestions: ['Kinh nghiệm quản lý đội ngũ', 'Các công cụ CRM', 'Cách liên hệ']
      };
    }

    // 6. Education & Certifications
    if (
      norm.includes('hoc van') ||
      norm.includes('bang cap') ||
      norm.includes('chung chi') ||
      norm.includes('dai hoc') ||
      norm.includes('ccxp') ||
      norm.includes('copc')
    ) {
      const certs = this.kb.certifications.map(c => `• ${c.title} (${c.organization})`).join('\n');
      return {
        answer: `Trình độ Học vấn & Chứng chỉ của anh Nguyễn Hùng Thái:\n- **Đại học**: ${this.kb.education[0].degree} - ${this.kb.education[0].institution} (${this.kb.education[0].year}).\n- **Chứng chỉ Quốc tế**:\n${certs}`,
        confidence: 0.88,
        category: 'EDUCATION',
        actions: [{ type: 'navigate', target: '#education', label: 'Xem Học vấn & Chứng chỉ' }],
        suggestions: ['Kinh nghiệm làm việc', 'Triết lý làm việc', 'Liên hệ']
      };
    }

    // 7. Philosophy & Core Values
    if (
      norm.includes('triet ly') ||
      norm.includes('phuong cham') ||
      norm.includes('gia tri') ||
      norm.includes('su mang')
    ) {
      return {
        answer: `Triết lý nghề nghiệp của anh Nguyễn Hùng Thái:\n"${this.kb.profile.philosophy}"\n\nCác giá trị cốt lõi:\n${this.kb.profile.core_values.map(v => '• ' + v).join('\n')}`,
        confidence: 0.85,
        category: 'PERSONAL_PHILOSOPHY',
        actions: [{ type: 'navigate', target: '#about', label: 'Xem Giới thiệu bản thân' }],
        suggestions: ['Kinh nghiệm 22 năm', 'Dự án nổi bật', 'Liên hệ']
      };
    }

    // 8. General profile fallback
    return {
      answer: `Anh Nguyễn Hùng Thái là Chuyên gia Lãnh đạo Chăm sóc Khách hàng (CS Manager) & Trải nghiệm Khách hàng (CX Leader) với hơn 22 năm kinh nghiệm trong quản lý Contact Center, tối ưu hóa quy trình dịch vụ và chuyển đổi số CRM. Bạn muốn tìm hiểu thêm về khía cạnh nào?`,
      confidence: 0.7,
      category: 'PROFILE',
      actions: [{ type: 'navigate', target: '#home', label: 'Trang chủ Hồ sơ' }],
      suggestions: ['Bao nhiêu năm kinh nghiệm?', 'Các kỹ năng chính', 'Các dự án tiêu biểu', 'Cách liên hệ']
    };
  }
}

export const knowledgeEngine = new KnowledgeEngine();
