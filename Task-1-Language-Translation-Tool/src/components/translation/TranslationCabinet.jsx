  import { useState, useEffect } from "react";
  import {
    translateText,
    detectLanguage
  } from "../../services/translationService";
  import { Send, Plus, RotateCcw } from "lucide-react";
    import { Copy } from "lucide-react";
    import { LANGUAGES } from "../../data/languages";
    import MessageBubble from "./MessageBubble";

  


    const TranslationCabinet = ({
      selectedDestination,
      messages,
      setMessages,
    }) => {
    
      const [text, setText] = useState("");
      const [detectedLang,
  setDetectedLang] = useState("en");
      const [targetLang, setTargetLang] = useState(
    selectedDestination?.language || "ja"
  );

      useEffect(() => {
    if (selectedDestination) {
      setTargetLang(selectedDestination.language);
    }
  }, [selectedDestination]);

  //to detect while typing
  useEffect(() => {

    const detect = async () => {

      if(text.trim().length < 2) return;

      const lang = await detectLanguage(text);

      if(lang){
        setDetectedLang(lang);
      }

    };

    const timeout =
      setTimeout(detect, 500);

    return () =>
      clearTimeout(timeout);

  }, [text]);

  //to check backend is running
  useEffect(() => {

    const test = async () => {

      const response = await fetch(
        "http://localhost:5000/detect",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            text:"नमस्ते"
          })
        }
      );

      const data = await response.json();

      console.log("DETECT RESULT:", data);
    };

    test();

  }, []);

      const handleSend = async () => {

      

    if (!text.trim() || !targetLang)
    return;

    const userText = text;

let detectedSourceLang =
detectedLang;

setMessages((prev) => [
  ...prev,
  {
    id: Date.now(),
    type: "user",
    text: userText,
    sourceLang:
      detectedSourceLang,
    timestamp:
      new Date(),
  },
]);

   

    try {

      const detected =
        await detectLanguage(userText);

      if (detected) {

        detectedSourceLang = detected;

        setDetectedLang(detected);
      }

    } catch (err) {

      console.error(err);

    }
    console.log(
    "USER MSG LANG:",
    detectedSourceLang
  );

    

  const history =
    JSON.parse(
      localStorage.getItem("translationHistory")
    ) || [];



    
    setText("");

    try {

      const translated =
        await translateText(
          userText,
          detectedSourceLang,
          targetLang
        );

        console.log(
    "USER MSG LANG:",
    detectedSourceLang
  );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          text: translated,
          targetLang: targetLang,
          timestamp: new Date(),
        },
      ]);




      history.unshift({
    id: Date.now(),
    sourceText: userText,
    translatedText: translated,
    sourceLang: detectedSourceLang,
    targetLang,
    destination:
      selectedDestination?.city ||
      selectedDestination?.country,
    date: new Date().toISOString()
  });

  localStorage.setItem(
    "translationHistory",
    JSON.stringify(history)
  );

    } catch (err) {

      console.error(err);

    }

  };


  useEffect(() => {

    const saved =
      localStorage.getItem(
        "preferredLanguage"
      );

    if(saved){
      setTargetLang(saved);
    }

  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setText("");
    setDetectedLang("en");
  };

    return (
      <div className="mx-auto w-full max-w-3xl h-[650px] rounded-3xl bg-gray-900 border border-gray-700 overflow-hidden shadow-xl flex flex-col">

        {/* Header */}
        <div className="border-b border-gray-700 p-5 flex justify-between items-center">

    <div className="flex items-center gap-4">

      <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-xl">
        🌐
      </div>

      <div>
        <h2 className="text-white font-bold text-xl">
          Translation Cabin
        </h2>

        <p className="text-sm text-gray-400">
    {selectedDestination
      ? `${detectedLang.toUpperCase()} → ${targetLang.toUpperCase()} • ${
          selectedDestination?.city ||
          selectedDestination?.country
        }`
      : `${detectedLang.toUpperCase()} → Select Target`}
  </p>
      </div>

    </div>

    {messages.length > 0 && (
    <button
      onClick={handleNewChat}
      className="
        flex items-center gap-1
        px-2.5 py-1
        rounded-full
        bg-white/5
        border border-white/10
        text-xs text-gray-300
        hover:bg-white/10
        transition-all
      "
    >
      <RotateCcw size={11} />
      New Chat
    </button>
  )}

  </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-[#111827]">

    {messages.length === 0 ? (

      <div className="flex flex-col items-center justify-center h-full text-center">

        <div className="text-5xl mb-4">
          ✨
        </div>

        <p className="text-gray-400 text-lg">
    {selectedDestination
      ? `Type a phrase below to translate it for ${selectedDestination.name}`
      : "Choose a destination to begin translating"}
  </p>

        <p className="text-gray-500 mt-2">
        Start a new language journey.
        </p>

      </div>

    ) : (

      messages.map((msg) => (
    <MessageBubble
      key={msg.id}
      message={msg}
    />
  ))

    )}

  </div>

        {/* Input */}
        <div className="border-t border-gray-700 p-4">

    <div className="flex gap-3 mb-3">

    {/* SOURCE */}

    <div
  className="
  px-4
  py-2
  rounded-lg
  bg-gray-800
  text-white
  "
  >
  🌐 Auto Detect :  {LANGUAGES.find(
  l => l.code === detectedLang
  )?.name || detectedLang
  }
  </div>

    {/* SWAP */}

    <button
      onClick={() => {
        const temp = detectedLang;
        setDetectedLang(targetLang);
        setTargetLang(temp);
      }}
      className="px-3 py-2 rounded-lg bg-gray-800 text-white"
    >
      ⇄
    </button>

    {/* TARGET */}
  <select
    value={targetLang}
    onChange={(e) => {
      const lang = e.target.value;

      setTargetLang(lang);

      localStorage.setItem(
        "preferredLanguage",
        lang
      );
    }}
    className="
      bg-gray-800
      rounded-lg
      px-3 py-2
      text-white
    "
  >
    {LANGUAGES.map((lang) => (
      <option
        key={lang.code}
        value={lang.code}
      >
        {lang.name}
      </option>
    ))}
  </select>

  </div>

    <div className="flex gap-3">

          <textarea
    rows={1}
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="
    flex-1
    h-12
    rounded-full
    bg-gray-800
    px-5
    text-white
    border
    border-gray-700
    outline-none
    transition-all
    duration-200
    focus:border-teal-500
    focus:ring-2
    focus:ring-teal-500/40
  "
  />
      
          <button
    onClick={handleSend}
    disabled={!targetLang}
    className="h-12 w-12 rounded-full bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
  >

    <Send size={18} />
  </button>
        </div>
        </div>

        </div>

      );
    };

    export default TranslationCabinet;