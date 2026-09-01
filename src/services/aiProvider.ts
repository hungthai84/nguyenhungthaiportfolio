import { ProfileKnowledge } from '../types/ai';

const SYSTEM_PROMPT = `Bạn là Trí Nhân AI, trợ lý đại diện cho hồ sơ công việc của Nguyễn Hùng Thái.`;

class AIProvider {
  public isAvailable(): boolean {
    return false;
  }

  public async generateAnswer(question: string, kb: ProfileKnowledge): Promise<string | null> {
    return null;
  }
}

export const aiProvider = new AIProvider();

