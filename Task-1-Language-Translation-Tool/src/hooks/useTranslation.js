import { useState, useCallback } from 'react';
import { translateText, detectLanguage } from '../services/translationService';

export const useTranslation = () => {
  const [messages, setMessages] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = useCallback(async (text, selectedCountry, detectedLang) => {
    setIsTranslating(true);
    setError(null);

    const targetLang = selectedCountry.language;
    const sourceLang = detectedLang || 'en';

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date(),
      detectedLang: sourceLang
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const translatedText = await translateText(text, sourceLang, targetLang);

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        text: translatedText,
        originalText: text,
        sourceLang: sourceLang,
        targetLang: targetLang,
        targetCountry: selectedCountry.name,
        targetFlag: selectedCountry.flag,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      return { success: true, translatedText };
    } catch (err) {
      setError(err.message);
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
      return { success: false, error: err.message };
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const removeMessage = useCallback((id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  return {
    messages,
    isTranslating,
    error,
    addMessage,
    clearChat,
    removeMessage
  };
};