import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Loader2, Sparkles, Mic, MicOff, 
  Volume2, VolumeX, ExternalLink, Zap, Star, Rocket,
  ChevronDown, ChevronUp, Copy, Check, ThumbsUp, ThumbsDown,
  Activity, Hash, Compass  // <-- All imports properly added
} from 'lucide-react';
import axios from 'axios';

// Floating Bubble Background
const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.15 + 0.05
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-indigo-200/20 to-purple-200/20 border border-indigo-100/10"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Animated Bubble Message Component
const BubbleMessage = ({ message, isUser, isTyping, onComplete, onCopy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  // Typewriter effect for bot messages
  useEffect(() => {
    if (isUser || !message.content) {
      setDisplayText(message.content || '');
      setIsComplete(true);
      return;
    }

    if (isTyping) {
      setDisplayText('');
      indexRef.current = 0;
      setIsComplete(false);
      typeCharacter();
    } else {
      setDisplayText(message.content);
      setIsComplete(true);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [message.content, isUser, isTyping]);

  const typeCharacter = () => {
    if (indexRef.current < message.content.length) {
      setDisplayText(message.content.slice(0, indexRef.current + 1));
      indexRef.current++;
      const speed = 20 + Math.random() * 10;
      timeoutRef.current = setTimeout(typeCharacter, speed);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: isUser ? 0 : 0.2
      }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isUser && (
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Bot className="w-5 h-5 text-white" />
        </motion.div>
      )}

      <div className="relative max-w-[80%]">
        <motion.div
          className={`relative rounded-2xl p-4 ${
            isUser 
              ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm' 
              : 'glass-card bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg rounded-tl-sm'
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Message content */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {displayText}
            {!isComplete && !isUser && isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className={`inline-block w-0.5 h-4 ml-0.5 ${isUser ? 'bg-white/60' : 'bg-indigo-400'}`}
              />
            )}
          </div>

          {/* Tool Links */}
          {message.toolLinks && message.toolLinks.length > 0 && isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 space-y-2"
            >
              <p className={`text-xs font-medium ${isUser ? 'text-white/80' : 'text-slate-500'} flex items-center gap-1`}>
                <Rocket className="w-3 h-3" /> Recommended Tools:
              </p>
              {message.toolLinks.map((tool, index) => (
                <motion.a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all group ${
                    isUser 
                      ? 'bg-white/10 hover:bg-white/20' 
                      : 'bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  <span className="text-xl">{tool.icon || '🔧'}</span>
                  <span className={`flex-1 text-sm font-medium ${isUser ? 'text-white' : 'text-slate-700 group-hover:text-indigo-600'} transition-colors`}>
                    {tool.name}
                  </span>
                  <ExternalLink className={`w-3 h-3 ${isUser ? 'text-white/60' : 'text-slate-400 group-hover:text-indigo-600'} transition-colors`} />
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Confidence Score */}
          {message.confidence && isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 flex items-center gap-2"
            >
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                isUser ? 'bg-white/20' : 'bg-emerald-50'
              }`}>
                <Activity className={`w-3 h-3 ${isUser ? 'text-white/80' : 'text-emerald-600'}`} />
                <span className={`text-xs font-medium ${isUser ? 'text-white/80' : 'text-emerald-700'}`}>
                  {message.confidence}% match
                </span>
              </div>
            </motion.div>
          )}

          {/* Timestamp */}
          <div className={`mt-1 text-[10px] ${isUser ? 'text-white/40' : 'text-slate-400'}`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        {!isUser && isComplete && (
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute -bottom-8 left-0 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 px-1 py-1"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                  title="Copy message"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className={`p-1.5 rounded-full transition-colors ${liked ? 'text-emerald-500' : 'hover:bg-slate-100'}`}
                  title="Like"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-emerald-500 text-emerald-500' : 'text-slate-400'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDislike}
                  className={`p-1.5 rounded-full transition-colors ${disliked ? 'text-red-500' : 'hover:bg-slate-100'}`}
                  title="Dislike"
                >
                  <ThumbsDown className={`w-3.5 h-3.5 ${disliked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {isUser && (
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0 shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          <User className="w-5 h-5 text-slate-600" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Chat Component
const BubbleChat = ({ fullPage = false, initialQuery = '' }) => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: "👋 Hi! I'm your AI Compass guide. Ask me about the best AI tools for any task — coding, design, writing, research, and more.",
      confidence: null
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [initialQueryProcessed, setInitialQueryProcessed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Check scroll position
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean text for speech
  const cleanTextForSpeech = useCallback((text) => {
    return text
      .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
      .replace(/[\u{1F700}-\u{1F77F}]/gu, '')
      .replace(/[\u{1F780}-\u{1F7FF}]/gu, '')
      .replace(/[\u{1F800}-\u{1F8FF}]/gu, '')
      .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
      .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '')
      .replace(/[\u{2600}-\u{26FF}]/gu, '')
      .replace(/[\u{2700}-\u{27BF}]/gu, '')
      .replace(/[\u{FE00}-\u{FEFF}]/gu, '')
      .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '')
      .replace(/\*{1,}/g, '')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setTimeout(() => {
          if (transcript.trim()) {
            handleSendMessage(transcript);
          }
        }, 300);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    } else {
      setVoiceSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Handle initial query
  useEffect(() => {
    if (initialQuery && initialQuery.trim() && !initialQueryProcessed) {
      setInitialQueryProcessed(true);
      setInput(initialQuery);
      setTimeout(() => {
        handleSendMessage(initialQuery);
      }, 300);
    }
  }, [initialQuery]);

  // Text-to-speech
  const speakMessage = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) return;
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [cleanTextForSpeech]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const toggleVoiceInput = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Voice recognition error:', error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  const handleSendMessage = useCallback(async (customInput = null) => {
    const messageToSend = customInput !== null ? customInput : input;
    const trimmedInput = messageToSend.trim();
    
    if (!trimmedInput || loading) return;

    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: trimmedInput }]);
    setLoading(true);
    setIsTyping(true);
    setConfidence(null);

    try {
      const { data } = await axios.post('http://localhost:5000/api/faq/query', { query: trimmedInput });
      
      const botMessage = {
        type: 'bot',
        content: data.answer,
        confidence: data.confidence,
        category: data.category,
        toolLinks: data.toolLinks || [],
        processedQuery: data.queryProcessed,
        isGreeting: data.isGreeting
      };
      
      setMessages(prev => [...prev, botMessage]);
      setConfidence(data.confidence);
      setRelatedQuestions(data.relatedQuestions || []);
      
      if (data.isGreeting || data.confidence > 70) {
        speakMessage(data.answer);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I couldn't find a perfect match. Could you rephrase your question about AI tools?"
      }]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }, [input, loading, speakMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      if (input.trim()) {
        handleSendMessage();
      }
    }
  }, [input, loading, handleSendMessage]);

  const handleRelatedQuestion = useCallback((question) => {
    if (question && question.trim()) {
      handleSendMessage(question);
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleCopy = useCallback((content) => {
    navigator.clipboard.writeText(content);
  }, []);

  return (
    <div className={`relative flex flex-col ${fullPage ? 'h-[calc(100vh-120px)]' : 'h-[600px]'} bg-gradient-to-b from-slate-50 to-white/50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-2xl`}>
      {/* Floating Bubbles Background */}
      <FloatingBubbles />

      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b border-slate-200/60 bg-white/60 backdrop-blur-sm flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Bot className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              AI Compass Assistant
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
              </motion.span>
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">NLP-powered • TF-IDF matching</span>
              {isSpeaking && (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-xs text-purple-600 flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" /> Speaking...
                </motion.span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {confidence !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">{confidence}% match</span>
            </motion.div>
          )}
          {isSpeaking && (
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={stopSpeaking}
              className="p-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all"
            >
              <VolumeX className="w-4 h-4" />
            </motion.button>
          )}
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 relative"
        style={{ overscrollBehavior: 'contain' }}
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <BubbleMessage
              key={idx}
              message={msg}
              isUser={msg.type === 'user'}
              isTyping={isTyping && idx === messages.length - 1 && msg.type === 'bot'}
              onCopy={() => handleCopy(msg.content)}
              onComplete={() => {
                scrollToBottom();
              }}
            />
          ))}
        </AnimatePresence>

        {loading && isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-indigo-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-indigo-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-indigo-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <motion.span
                  className="text-xs text-slate-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  AI is thinking...
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
        
        {/* Scroll to bottom button */}
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToBottom}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Related Questions */}
      {relatedQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="px-6 py-3 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm flex-shrink-0"
        >
          <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> Related questions
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedQuestions.map((q, i) => (
              <motion.button 
                key={i} 
                onClick={() => handleRelatedQuestion(q)} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
              >
                {q}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-slate-200/60 bg-white/60 backdrop-blur-sm flex-shrink-0">
        <div className="flex gap-2">
          <motion.div 
            className="flex-1 relative"
            animate={isListening ? { scale: 1.02 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "🎤 Listening..." : "Ask about AI tools..."}
              className={`w-full px-4 py-3 rounded-xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all ${
                isListening ? 'ring-2 ring-purple-400 bg-purple-50 border-purple-300' : ''
              }`}
              autoComplete="off"
              autoFocus
            />
            {input.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
              >
                {input.length}
              </motion.span>
            )}
          </motion.div>
          
          {/* Voice Input */}
          {voiceSupported && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isListening ? { 
                scale: [1, 1.1, 1],
                transition: { duration: 0.8, repeat: Infinity }
              } : {}}
              onClick={toggleVoiceInput}
              className={`px-4 py-3 rounded-xl transition-all ${
                isListening 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
            </motion.button>
          )}
          
          {/* Send */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium disabled:opacity-50 transition-opacity shadow-lg shadow-indigo-500/20"
          >
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
        {isListening && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-purple-600 mt-2 animate-pulse"
          >
            🎤 Listening... Speak clearly into your microphone
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default BubbleChat;