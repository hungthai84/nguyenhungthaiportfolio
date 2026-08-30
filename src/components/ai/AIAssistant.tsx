import React, { useState, useEffect } from 'react';
import { AIButton } from './AIButton';
import { AIPanel } from './AIPanel';
import { AISettingsModal } from './AISettingsModal';
import { AIMessage, AISettingsConfig } from '../../types/ai';
import { askAI } from '../../services/aiEngine';
import { voiceEngine, VoiceState } from '../../services/voiceEngine';
import aiConfigData from '../../data/ai-config.json';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Settings State
  const [config, setConfig] = useState<AISettingsConfig>({
    mode: (aiConfigData.mode as any) || 'auto',
    voiceEnabled: aiConfigData.voiceEnabled !== false,
    voiceName: aiConfigData.voiceName || '',
    voiceRate: aiConfigData.voiceRate || 0.95,
    voicePitch: aiConfigData.voicePitch || 1.0,
    voiceVolume: aiConfigData.voiceVolume || 1.0,
    answerLength: (aiConfigData.answerLength as any) || 'medium',
    language: (aiConfigData.language as any) || 'vi',
    aiName: aiConfigData.aiName || 'Trí Nhân AI',
    welcomeMessage: aiConfigData.welcomeMessage || 'Xin chào! Tôi là Trí Nhân AI, trợ lý của Nguyễn Hùng Thái.'
  });

  // Messages Conversation State
  const [messages, setMessages] = useState<AIMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ai_chat_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'welcome-1',
        sender: 'ai',
        text: aiConfigData.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge',
        canSpeak: true,
        suggestions: ['Anh Thái là ai?', 'Bao nhiêu năm kinh nghiệm?', 'Các dự án tiêu biểu', 'Liên hệ']
      }
    ];
  });

  // Voice Speech State
  const [voiceState, setVoiceState] = useState<VoiceState>('stopped');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  // Subscribe to Voice Engine and window triggers
  useEffect(() => {
    const unsubscribe = voiceEngine.subscribeState(st => {
      setVoiceState(st);
      if (st === 'stopped') {
        setSpeakingMessageId(null);
      }
    });

    const handleOpenAIAssistant = () => {
      setIsOpen(true);
    };

    const handleToggleAIAssistant = () => {
      setIsOpen(prev => {
        if (prev) {
          voiceEngine.cancel();
          setSpeakingMessageId(null);
        }
        return !prev;
      });
    };

    window.addEventListener('open-ai-assistant', handleOpenAIAssistant);
    window.addEventListener('toggle-ai-assistant', handleToggleAIAssistant);

    return () => {
      unsubscribe();
      window.removeEventListener('open-ai-assistant', handleOpenAIAssistant);
      window.removeEventListener('toggle-ai-assistant', handleToggleAIAssistant);
    };
  }, []);

  // Broadcast AI state to footer
  useEffect(() => {
    const event = new CustomEvent('ai-assistant-state-changed', {
      detail: {
        isOpen,
        isSpeaking: voiceState === 'speaking'
      }
    });
    window.dispatchEvent(event);
  }, [isOpen, voiceState]);

  // Save conversation session
  useEffect(() => {
    try {
      localStorage.setItem('ai_chat_session', JSON.stringify(messages));
    } catch (e) {
      console.warn('Unable to save chat session');
    }
  }, [messages]);

  const handleUpdateConfig = (newCfg: Partial<AISettingsConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newCfg };
      try {
        localStorage.setItem('ai_assistant_config', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const aiResponse = await askAI(text, config.mode, config.answerLength);

      const aiMsg: AIMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'ai',
        text: aiResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: aiResponse.source,
        confidence: aiResponse.confidence,
        category: aiResponse.category,
        canSpeak: aiResponse.canSpeak,
        suggestions: aiResponse.suggestions,
        actions: aiResponse.actions
      };

      setMessages(prev => [...prev, aiMsg]);

      // Auto-read response if voice enabled
      if (config.voiceEnabled && aiResponse.canSpeak) {
        handleSpeakText(aiResponse.answer, aiMsg.id);
      }
    } catch (error) {
      console.error('Error answering AI query:', error);
      const errorMsg: AIMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'ai',
        text: 'Xin lỗi, hiện tại hệ thống tra cứu hồ sơ gặp gián đoạn tạm thời. Tôi vẫn có thể trả lời các câu hỏi FAQ ngắn.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakText = (text: string, msgId: string) => {
    setSpeakingMessageId(msgId);
    voiceEngine.speak(text, () => {
      setSpeakingMessageId(null);
    });
  };

  const handleStopSpeak = () => {
    voiceEngine.cancel();
    setSpeakingMessageId(null);
  };

  const handleClearChat = () => {
    handleStopSpeak();
    const defaultWelcome: AIMessage = {
      id: 'welcome-' + Date.now(),
      sender: 'ai',
      text: config.welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'knowledge',
      canSpeak: true,
      suggestions: ['Anh Thái là ai?', 'Bao nhiêu năm kinh nghiệm?', 'Các dự án tiêu biểu', 'Liên hệ']
    };
    setMessages([defaultWelcome]);
    localStorage.removeItem('ai_chat_session');
  };

  const handleActionClick = (actionType: string, target?: string) => {
    if (actionType === 'navigate' && target) {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = target;
      }
    } else if (actionType === 'contact') {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#contact';
      }
    } else if (actionType === 'download_cv') {
      // Look for existing download CV button on page or trigger simulated download
      const cvBtn = document.querySelector('a[download], button[id*="cv"], a[href*="CV"]') as HTMLElement;
      if (cvBtn) {
        cvBtn.click();
      } else {
        alert('Đang khởi tạo tải file CV của Nguyễn Hùng Thái...');
      }
    }
  };

  return (
    <>
      <AIPanel
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleStopSpeak();
        }}
        messages={messages}
        onSendMessage={handleSendMessage}
        onQuickQuestionSelect={handleSendMessage}
        config={config}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSpeaking={voiceState === 'speaking'}
        speakingMessageId={speakingMessageId}
        onSpeakText={handleSpeakText}
        onStopSpeak={handleStopSpeak}
        onActionClick={handleActionClick}
        isLoading={isLoading}
      />

      <AISettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onClearChat={handleClearChat}
      />
    </>
  );
};

export default AIAssistant;
