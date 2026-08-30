import { faqEngine } from './faqEngine';
import { knowledgeEngine } from './knowledgeEngine';
import { cacheEngine } from './cacheEngine';
import { aiProvider } from './aiProvider';
import { AIResponse, AIMode, AnswerLength, AIAction } from '../types/ai';

export async function askAI(
  question: string,
  mode: AIMode = 'auto',
  length: AnswerLength = 'medium'
): Promise<AIResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    return {
      answer: 'Xin chào! Bạn có thể chọn các câu hỏi gợi ý bên dưới hoặc nhập câu hỏi về Nguyễn Hùng Thái.',
      source: 'knowledge',
      confidence: 1,
      category: 'GENERAL',
      canSpeak: true,
      suggestions: ['Anh là ai?', 'Bao nhiêu năm kinh nghiệm?', 'Các kỹ năng chính'],
      actions: []
    };
  }

  // Check Cache
  const cached = cacheEngine.get(trimmed);
  if (cached) {
    return cached;
  }

  // LEVEL 1 & 2: FAQ Search (Exact or Semantic Keyword)
  const faqMatch = faqEngine.searchFAQ(trimmed);
  if (faqMatch.faq && faqMatch.confidence >= 0.75) {
    const faq = faqMatch.faq;
    let answerText = faq.answer;
    
    // Modify length if short
    if (length === 'short' && answerText.length > 150) {
      answerText = answerText.split('.')[0] + '.';
    }

    const actions: AIAction[] = [];
    if (faq.category === 'EXPERIENCE') {
      actions.push({ type: 'navigate', target: '#experience', label: 'Xem phần Kinh nghiệm' });
    } else if (faq.category === 'SKILL' || faq.category === 'CRM') {
      actions.push({ type: 'navigate', target: '#skills', label: 'Xem phần Kỹ năng' });
    } else if (faq.category === 'PROJECT') {
      actions.push({ type: 'navigate', target: '#projects', label: 'Xem các Dự án' });
    } else if (faq.category === 'CONTACT') {
      actions.push({ type: 'contact', label: 'Liên hệ ngay' });
      actions.push({ type: 'download_cv', label: 'Tải CV' });
    }

    const result: AIResponse = {
      answer: answerText,
      source: 'faq',
      confidence: faqMatch.confidence,
      category: faq.category,
      canSpeak: faq.voice_enabled !== false,
      suggestions: ['Kinh nghiệm 22 năm', 'Các dự án nổi bật', 'Liên hệ & Tải CV'],
      actions
    };

    cacheEngine.set(trimmed, result);
    return result;
  }

  // LEVEL 3 & 4: Local Knowledge Base Search & Local Synthesis
  const kbResult = knowledgeEngine.searchKnowledge(trimmed, length);
  if (kbResult.confidence >= 0.7) {
    const result: AIResponse = {
      answer: kbResult.answer,
      source: 'knowledge',
      confidence: kbResult.confidence,
      category: kbResult.category,
      canSpeak: true,
      suggestions: kbResult.suggestions,
      actions: kbResult.actions
    };

    cacheEngine.set(trimmed, result);
    return result;
  }

  // LEVEL 5: API Fallback (Optional, if mode is 'api' or 'auto' with low local confidence)
  if ((mode === 'api' || mode === 'auto') && aiProvider.isAvailable()) {
    const apiAnswer = await aiProvider.generateAnswer(trimmed, knowledgeEngine.getKnowledgeBase());
    if (apiAnswer) {
      const result: AIResponse = {
        answer: apiAnswer,
        source: 'api',
        confidence: 0.9,
        category: 'GENERAL',
        canSpeak: true,
        suggestions: ['Học vấn & Chứng chỉ', 'Các dự án nổi bật', 'Liên hệ'],
        actions: [{ type: 'contact', label: 'Gửi tin nhắn' }]
      };

      cacheEngine.set(trimmed, result);
      return result;
    }
  }

  // LEVEL 6: Strict "DO NOT FABRICATE" Fallback Answer
  const fallbackResult: AIResponse = {
    answer: 'Xin lỗi, thông tin này hiện chưa được cấu hình chi tiết trong hồ sơ của Nguyễn Hùng Thái. Bạn có thể chọn các câu hỏi bên dưới hoặc liên hệ trực tiếp với anh Thái.',
    source: 'fallback',
    confidence: 0.4,
    category: 'UNKNOWN',
    canSpeak: true,
    suggestions: [
      'Anh Thái là ai?',
      'Bao nhiêu năm kinh nghiệm?',
      'Kỹ năng quản lý Call Center',
      'Liên hệ ngay'
    ],
    actions: [{ type: 'contact', label: 'Liên hệ với Nguyễn Hùng Thái' }]
  };

  return fallbackResult;
}
