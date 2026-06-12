  const axios = require("axios");
  require("dotenv").config();

  const express = require("express");
  const cors = require("cors");
  const sdk =
require("microsoft-cognitiveservices-speech-sdk");

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      message: "Backend is running 🚀"
    });
  });

  app.get("/test", (req, res) => {
    console.log(process.env.PORT);

    res.json({
      success: true
    });
  });

  app.post("/translate", async (req, res) => {
    try {
      const { text, targetLang } = req.body;

      const response = await axios({
        baseURL: process.env.AZURE_TRANSLATOR_ENDPOINT,
        url: "/translate",
        method: "post",
        params: {
          "api-version": "3.0",
          to: targetLang
        },
        headers: {
          "Ocp-Apim-Subscription-Key":
            process.env.AZURE_TRANSLATOR_KEY,

          "Ocp-Apim-Subscription-Region":
            process.env.AZURE_TRANSLATOR_REGION,

          "Content-Type": "application/json"
        },
        data: [
          {
            text: text
          }
        ]
      });

      const translatedText =
        response.data[0].translations[0].text;

      res.json({
        translatedText
      });

    } catch (error) {
      console.error(
        error.response?.data || error.message
      );

      res.status(500).json({
        error: "Translation failed"
      });
    }
  });

  app.post("/detect", async (req, res) => {
    try {
      const { text } = req.body;

      const response = await axios({
        baseURL: process.env.AZURE_TRANSLATOR_ENDPOINT,
        url: "/detect",
        method: "post",
        params: {
          "api-version": "3.0"
        },
        headers: {
          "Ocp-Apim-Subscription-Key":
            process.env.AZURE_TRANSLATOR_KEY,

          "Ocp-Apim-Subscription-Region":
            process.env.AZURE_TRANSLATOR_REGION,

          "Content-Type": "application/json"
        },
        data: [
          {
            text
          }
        ]
      });

      res.json({
        language: response.data[0].language
      });

    } catch (error) {
      console.error(
        error.response?.data || error.message
      );

      res.status(500).json({
        error: "Detection failed"
      });
    }
  });

  app.post("/speak", async (req, res) => {
  try {

    const { text, language } = req.body;

    const speechConfig =
      sdk.SpeechConfig.fromSubscription(
        process.env.AZURE_SPEECH_KEY,
        process.env.AZURE_SPEECH_REGION
      );

      speechConfig.speechSynthesisOutputFormat =
  sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
      
      console.log(
  "VOICE:",
  getVoice(language)
);

    speechConfig.speechSynthesisVoiceName =
      getVoice(language);

    const synthesizer =
      new sdk.SpeechSynthesizer(
        speechConfig
      );

    synthesizer.speakTextAsync(
      text,

      result => {

        const audioBuffer =
          Buffer.from(
            result.audioData
          );

        res.set({
          "Content-Type":
            "audio/mpeg"
        });

        res.send(audioBuffer);

        synthesizer.close();
      },

      err => {

        console.error(err);

        synthesizer.close();

        res.status(500).json({
          error:
            "Speech synthesis failed"
        });
      }
    );

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Speech failed"
    });
  }
});

function getVoice(lang) {

  const voices = {

    en: "en-US-JennyNeural",

    hi: "hi-IN-SwaraNeural",

    mr: "mr-IN-AarohiNeural",

    bn: "bn-IN-TanishaaNeural",

    ta: "ta-IN-PallaviNeural",

    te: "te-IN-ShrutiNeural",

    gu: "gu-IN-DhwaniNeural",

    kn: "kn-IN-SapnaNeural",

    ml: "ml-IN-SobhanaNeural",

    pa: "pa-IN-VaaniNeural",

    ja: "ja-JP-NanamiNeural",

    ko: "ko-KR-SunHiNeural",

    fr: "fr-FR-DeniseNeural",

    de: "de-DE-KatjaNeural",

    es: "es-ES-ElviraNeural",

    it: "it-IT-ElsaNeural",

    ru: "ru-RU-SvetlanaNeural",

    ar: "ar-SA-ZariyahNeural"

  };

  return (
    voices[lang] ||
    "en-US-JennyNeural"
  );
}

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

