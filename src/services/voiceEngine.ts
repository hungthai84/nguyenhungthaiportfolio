export type VoiceState = 'stopped' | 'speaking' | 'paused';

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private state: VoiceState = 'stopped';
  private stateChangeListeners: Array<(state: VoiceState) => void> = [];

  private rate: number = 0.95;
  private pitch: number = 1.0;
  private volume: number = 1.0;
  private selectedVoiceName: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadSettings();
    }
  }

  public subscribeState(listener: (state: VoiceState) => void) {
    this.stateChangeListeners.push(listener);
    listener(this.state);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  private setState(newState: VoiceState) {
    this.state = newState;
    this.stateChangeListeners.forEach(l => l(newState));
  }

  public getState(): VoiceState {
    return this.state;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter(v => v.lang.includes('vi') || v.lang.includes('VI'));
  }

  public getAllVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public loadSettings() {
    try {
      const savedRate = localStorage.getItem('ai_voice_rate');
      if (savedRate) this.rate = parseFloat(savedRate);

      const savedPitch = localStorage.getItem('ai_voice_pitch');
      if (savedPitch) this.pitch = parseFloat(savedPitch);

      const savedVoice = localStorage.getItem('ai_voice_name');
      if (savedVoice) this.selectedVoiceName = savedVoice;
    } catch (e) {
      console.warn('Unable to load voice settings from localStorage');
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2, rate));
    localStorage.setItem('ai_voice_rate', this.rate.toString());
  }

  public getRate(): number {
    return this.rate;
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Always cancel previous speech before starting new
    this.cancel();

    // Clean text for smooth speech synthesis (remove markdown formatting like **, ##)
    const cleanText = text
      .replace(/[*#_~`[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, 'liên kết')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    // Pick Vietnamese voice if available
    const voices = this.synth.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (this.selectedVoiceName) {
      selectedVoice = voices.find(v => v.name === this.selectedVoiceName);
    }
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      this.setState('speaking');
    };

    utterance.onend = () => {
      this.setState('stopped');
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      this.setState('stopped');
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state === 'speaking') {
      this.synth.pause();
      this.setState('paused');
    }
  }

  public resume() {
    if (this.synth && this.state === 'paused') {
      this.synth.resume();
      this.setState('speaking');
    }
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel();
      this.setState('stopped');
      this.currentUtterance = null;
    }
  }
}

export const voiceEngine = new VoiceEngine();
