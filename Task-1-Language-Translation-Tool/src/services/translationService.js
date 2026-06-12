import axios from 'axios';

// Using LibreTranslate API (free, no API key required)
const API_URL = 'https://libretranslate.com';

export const translateText = async (
  text,
  sourceLang,
  targetLang
) => {
  const response = await fetch(
    "http://localhost:5000/translate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang
      })
    }
  );

  const data = await response.json();

  return data.translatedText;
};

export const speakText = async (
  text,
  language
) => {

  const response = await fetch(
    "http://localhost:5000/speak",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        text,
        language
      })
    }
  );

  const blob =
  await response.blob();

console.log(
  "AUDIO SIZE:",
  blob.size
);

const audioUrl =
  URL.createObjectURL(blob);

const audio =
  new Audio(audioUrl);

await audio.play();
};

export const detectLanguage = async (text) => {
  try {

    const response = await fetch(
      "http://localhost:5000/detect",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          text
        })
      }
    );

    const data = await response.json();

    return data.language;

  } catch (err) {

    console.error(err);

    return "en";
  }
};

// Mock translation for demo/fallback
const mockTranslate = (text, targetLang) => {
  const mockResponses = {
    'es': `🇪🇸 ${text} (Spanish)`,
    'fr': `🇫🇷 ${text} (French)`,
    'de': `🇩🇪 ${text} (German)`,
    'ja': `🇯🇵 ${text} (Japanese)`,
    'ko': `🇰🇷 ${text} (Korean)`,
    'zh': `🇨🇳 ${text} (Chinese)`,
    'it': `🇮🇹 ${text} (Italian)`,
    'pt': `🇵🇹 ${text} (Portuguese)`,
    'ru': `🇷🇺 ${text} (Russian)`,
    'ar': `🇸🇦 ${text} (Arabic)`,
    'hi': `🇮🇳 ${text} (Hindi)`,
    'th': `🇹🇭 ${text} (Thai)`,
    'vi': `🇻🇳 ${text} (Vietnamese)`,
    'tr': `🇹🇷 ${text} (Turkish)`,
    'nl': `🇳🇱 ${text} (Dutch)`,
    'el': `🇬🇷 ${text} (Greek)`
  };
  
  return mockResponses[targetLang] || `[${targetLang}] ${text}`;
};