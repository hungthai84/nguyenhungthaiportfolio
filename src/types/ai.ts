export type AIMode = 'auto' | 'local' | 'api';
export type AnswerLength = 'short' | 'medium' | 'detailed';
export type DataSource = 'faq' | 'knowledge' | 'synthesis' | 'api' | 'fallback';

export interface AIAction {
  type: 'navigate' | 'download_cv' | 'contact' | 'open_url';
  target?: string;
  label: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: DataSource;
  confidence?: number;
  suggestions?: string[];
  actions?: AIAction[];
  category?: string;
  isSpeaking?: boolean;
  canSpeak?: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  alternative_questions: string[];
  answer: string;
  keywords: string[];
  priority: number;
  voice_enabled: boolean;
  active: boolean;
}

export interface ProfileInfo {
  name: string;
  title: string;
  introduction: string;
  professional_summary: string;
  career_summary: string;
  core_values: string[];
  philosophy: string;
  mission: string;
  years_experience: number;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
  team_size: string;
  achievements: string[];
  domain: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  description: string;
  responsibilities: string[];
  technology: string[];
  result: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  organization: string;
  year: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  location: string;
}

export interface ProfileKnowledge {
  profile: ProfileInfo;
  experiences: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  contact: ContactInfo;
}

export interface AISettingsConfig {
  mode: AIMode;
  voiceEnabled: boolean;
  voiceName: string;
  voiceRate: number;
  voicePitch: number;
  voiceVolume: number;
  answerLength: AnswerLength;
  language: 'vi' | 'en';
  aiName: string;
  welcomeMessage: string;
}

export interface AIResponse {
  answer: string;
  source: DataSource;
  confidence: number;
  category: string;
  canSpeak: boolean;
  suggestions: string[];
  actions: AIAction[];
}
