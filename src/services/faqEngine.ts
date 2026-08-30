import faqData from '../data/faq.json';
import { FAQItem } from '../types/ai';

export interface FAQMatchResult {
  faq: FAQItem | null;
  confidence: number;
  matchType: 'exact' | 'semantic_keyword' | 'none';
}

class FAQEngine {
  private faqs: FAQItem[] = [];

  constructor() {
    this.loadFAQs();
  }

  public loadFAQs(): FAQItem[] {
    try {
      const customFaqs = localStorage.getItem('ai_custom_faqs');
      if (customFaqs) {
        this.faqs = JSON.parse(customFaqs);
      } else {
        this.faqs = faqData as FAQItem[];
      }
    } catch (e) {
      this.faqs = faqData as FAQItem[];
    }
    return this.faqs;
  }

  public saveFAQs(faqs: FAQItem[]) {
    this.faqs = faqs;
    localStorage.setItem('ai_custom_faqs', JSON.stringify(faqs));
  }

  public resetFAQs() {
    this.faqs = faqData as FAQItem[];
    localStorage.removeItem('ai_custom_faqs');
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics for flexible search
      .replace(/[^\w\s]/gi, '')
      .trim();
  }

  public searchFAQ(query: string): FAQMatchResult {
    if (!query || !query.trim()) {
      return { faq: null, confidence: 0, matchType: 'none' };
    }

    const normalizedQuery = this.normalizeText(query);
    const activeFaqs = this.faqs.filter(f => f.active !== false);

    // 1. Level 1: Exact Match (Question or Alternative Questions)
    for (const faq of activeFaqs) {
      const normQ = this.normalizeText(faq.question);
      if (normQ === normalizedQuery) {
        return { faq, confidence: 0.98, matchType: 'exact' };
      }
      for (const alt of faq.alternative_questions) {
        if (this.normalizeText(alt) === normalizedQuery) {
          return { faq, confidence: 0.95, matchType: 'exact' };
        }
      }
    }

    // 2. Level 2: Substring or Keyword Overlap Match
    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    const queryWords = new Set(normalizedQuery.split(/\s+/).filter(w => w.length > 1));

    for (const faq of activeFaqs) {
      const normQ = this.normalizeText(faq.question);
      
      // Check if query is contained inside question or vice versa
      if (normalizedQuery.includes(normQ) || normQ.includes(normalizedQuery)) {
        const score = 0.88;
        if (score > highestScore) {
          highestScore = score;
          bestMatch = faq;
        }
      }

      // Check alternative questions
      for (const alt of faq.alternative_questions) {
        const normAlt = this.normalizeText(alt);
        if (normalizedQuery.includes(normAlt) || normAlt.includes(normalizedQuery)) {
          const score = 0.85;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = faq;
          }
        }
      }

      // Keyword overlap analysis
      let keywordHits = 0;
      for (const kw of faq.keywords) {
        const normKw = this.normalizeText(kw);
        if (queryWords.has(normKw) || normalizedQuery.includes(normKw)) {
          keywordHits++;
        }
      }

      if (faq.keywords.length > 0) {
        const overlapRatio = keywordHits / Math.min(queryWords.size, faq.keywords.length);
        if (keywordHits >= 2 && overlapRatio >= 0.4) {
          const score = Math.min(0.85, 0.6 + overlapRatio * 0.3);
          if (score > highestScore) {
            highestScore = score;
            bestMatch = faq;
          }
        }
      }
    }

    if (bestMatch && highestScore >= 0.65) {
      return {
        faq: bestMatch,
        confidence: Number(highestScore.toFixed(2)),
        matchType: 'semantic_keyword'
      };
    }

    return { faq: null, confidence: 0, matchType: 'none' };
  }
}

export const faqEngine = new FAQEngine();
