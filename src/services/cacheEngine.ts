import { AIResponse } from '../types/ai';

class CacheEngine {
  private cache: Map<string, AIResponse> = new Map();
  private maxEntries = 50;

  private hashKey(query: string): string {
    return query.trim().toLowerCase();
  }

  public get(query: string): AIResponse | null {
    const key = this.hashKey(query);
    return this.cache.get(key) || null;
  }

  public set(query: string, response: AIResponse) {
    const key = this.hashKey(query);
    if (this.cache.size >= this.maxEntries) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, response);
  }

  public clear() {
    this.cache.clear();
  }
}

export const cacheEngine = new CacheEngine();
