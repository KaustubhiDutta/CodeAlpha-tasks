import { useState, useCallback, useEffect } from 'react';

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setSupported(false);
      return;
    }

    // Load available voices
    const loadVoices = () => {
  const availableVoices =
    window.speechSynthesis.getVoices();

  console.log(
    availableVoices.map(v => ({
      name: v.name,
      lang: v.lang
    }))
  );

  setVoices(availableVoices);
};

   loadVoices();

if (
  speechSynthesis.onvoiceschanged !==
  undefined
) {
  speechSynthesis.onvoiceschanged =
    loadVoices;
}

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getVoiceForLanguage = useCallback((lang) => {

  const exact =
    voices.find(v =>
      v.lang.toLowerCase().startsWith(
        lang.toLowerCase()
      )
    );

  if (exact) return exact;

  const indianFallback =
    voices.find(v =>
      v.lang.startsWith("hi")
    );

  if (
    [
      "mr",
      "bn",
      "ta",
      "te",
      "gu",
      "kn",
      "ml",
      "pa",
      "or",
      "as"
    ].includes(lang)
  ) {
    return indianFallback;
  }

  return null;

}, [voices]);

  const speak = useCallback((text, lang = 'en') => {

  console.log("SPEAKING:");
  console.log("TEXT:", text);
  console.log("LANG:", lang);

    if (!supported) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    utterance.lang = lang;
    
    // Try to get a native voice for the language
    const nativeVoice = getVoiceForLanguage(lang);
    console.log("VOICE FOUND:", nativeVoice);
    if (nativeVoice) {
      utterance.voice = nativeVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utterance.onstart = () => {
  console.log("STARTED SPEAKING");
  setIsSpeaking(true);
};

utterance.onend = () => {
  console.log("ENDED SPEAKING");
  setIsSpeaking(false);
};

utterance.onerror = (e) => {
  console.log("SPEECH ERROR:", e);
  setIsSpeaking(false);
};

    setTimeout(() => {
  window.speechSynthesis.speak(utterance);
}, 100);
  }, [supported, getVoiceForLanguage]);

  const stop = useCallback(() => {
    if (supported) {
      if (window.speechSynthesis.speaking) {
  window.speechSynthesis.cancel();
}
      setIsSpeaking(false);
    }
  }, [supported]);

  return { speak, stop, isSpeaking, supported, voices };
};