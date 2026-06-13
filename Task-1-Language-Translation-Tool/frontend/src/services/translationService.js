// Base backend URL (Render)
const API_BASE = "https://codealpha-tasks-1-v3ep.onrender.com";

/**
 * Translate text
 */
export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await fetch(`${API_BASE}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        targetLang
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Translation failed");
    }

    return data.translatedText;
  } catch (err) {
    console.error("Translate error:", err);
    return "Translation failed";
  }
};

/**
 * Speech synthesis
 */
export const speakText = async (text, language) => {
  try {
    const response = await fetch(`${API_BASE}/speak`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        language
      })
    });

    if (!response.ok) {
      throw new Error("Speech request failed");
    }

    const blob = await response.blob();

    console.log("AUDIO SIZE:", blob.size);

    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);

    await audio.play();
  } catch (err) {
    console.error("Speech error:", err);
  }
};

/**
 * Detect language
 */
export const detectLanguage = async (text) => {
  try {
    const response = await fetch(`${API_BASE}/detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Detection failed");
    }

    return data.language;
  } catch (err) {
    console.error("Detect error:", err);
    return "en";
  }
};