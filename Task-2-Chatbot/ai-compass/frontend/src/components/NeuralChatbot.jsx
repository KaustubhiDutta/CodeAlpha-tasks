import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Loader2, Activity, Hash, Sparkles, 
  Mic, MicOff, Volume2, VolumeX, ExternalLink,
  Star, Rocket, ChevronDown, ChevronUp, 
  Target, Cpu, Terminal, Command,
  Cpu as CpuIcon, Gauge, Shield, Compass,
  BookOpen, GraduationCap, Clock, ArrowRight,
  MessageCircle, HelpCircle, Brain, Zap, Network,
  Filter, Layers, Compass as CompassIcon,
  TrendingUp, Users, Flame, Award,
  Grid, List, BarChart, PieChart, Code, Palette,
  Video, PenTool, Search, Settings, Bell,
  Menu, X, Plus, Minus, Check, AlertCircle,
  Home, Library, GitBranch, Globe, Radio,
  Bookmark, Clock as ClockIcon, Calendar, Briefcase,
  FileText, Image, Music, Film, Monitor, Smartphone,
  Database, Cloud, Lock, Key, Award as AwardIcon,
  ThumbsUp, ThumbsDown, Share2, Copy, Link,
  LogOut, User as UserIcon, Settings as SettingsIcon,
  ArrowLeft, Sparkle, Heart, HeartOff, Trash2, History,
  Play, Pause, StopCircle
} from 'lucide-react';
import axios from 'axios';
import { IconContainer, getToolIcon } from '../utils/iconMap.jsx';

// ============================================================
// MODE CONFIGURATIONS
// ============================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const MODE_CONFIGS = {
  home: {
    id: 'home',
    label: 'AI Topics',
    icon: Home,
    description: 'Explore AI concepts and start learning',
    header: 'AI Topics • Discovery Mode',
    welcome: 'Welcome to AI Topics. Explore AI concepts and start learning.',
    starterQuestions: [
      'What is Artificial Intelligence?',
      'What is Machine Learning?',
      'What is Deep Learning?',
      'What is NLP?',
      'What is Prompt Engineering?'
    ],
    context: 'educational'
  },
  tools: {
    id: 'tools',
    label: 'AI Tools',
    icon: Grid,
    description: 'Discover the best AI tools for your workflow',
    header: 'Tool Discovery • AI Recommendations',
    welcome: 'Discover the best AI tools for your workflow.',
    starterQuestions: [
      'Best AI for coding',
      'Best AI for presentations',
      'Best AI for students',
      'Best AI for research',
      'Best free AI tools'
    ],
    context: 'tools'
  },
  compare: {
    id: 'compare',
    label: 'Compare Tools',
    icon: GitBranch,
    description: 'Compare two AI tools side by side',
    header: 'Compare Mode • AI Comparison Engine',
    welcome: 'Compare two AI tools side by side.',
    starterQuestions: [
      'ChatGPT vs Claude',
      'Midjourney vs Flux',
      'Cursor vs GitHub Copilot',
      'Perplexity vs ChatGPT',
      'Runway vs Pika'
    ],
    context: 'comparison'
  },
  learn: {
    id: 'learn',
    label: 'Learning Hub',
    icon: BookOpen,
    description: 'Choose a topic and start learning AI',
    header: 'Learning Hub • Beginner Mode',
    welcome: 'Choose a topic and start learning AI.',
    starterQuestions: [
      'Start AI Basics',
      'Beginner Roadmap',
      'AI Career Path',
      'Learn Prompt Engineering',
      'Deep Learning Fundamentals'
    ],
    context: 'learning'
  },
  trending: {
    id: 'trending',
    label: 'Trending AI',
    icon: TrendingUp,
    description: 'See what\'s currently trending in the AI ecosystem',
    header: 'Trending AI • Live Discovery',
    welcome: 'See what\'s currently trending in the AI ecosystem.',
    starterQuestions: [
      'Latest AI models',
      'Trending image generators',
      'Trending coding assistants',
      'New AI startups',
      'AI funding news'
    ],
    context: 'trending'
  },
  news: {
    id: 'news',
    label: 'AI News',
    icon: Radio,
    description: 'Read the latest AI releases and announcements',
    header: 'AI News • Daily Intelligence Feed',
    welcome: 'Read the latest AI releases and announcements.',
    starterQuestions: [
      'OpenAI updates',
      'Anthropic announcements',
      'Google AI releases',
      'Meta AI news',
      'AI regulation updates'
    ],
    context: 'news'
  },
  saved: {
    id: 'saved',
    label: 'Saved Searches',
    icon: Bookmark,
    description: 'Your saved AI discoveries',
    header: 'Saved Searches • Your Collection',
    welcome: 'Your saved AI discoveries and conversations.',
    starterQuestions: [],
    context: 'saved'
  },
  recent: {
    id: 'recent',
    label: 'Recent Conversations',
    icon: Clock,
    description: 'Your conversation history',
    header: 'Recent Conversations • History',
    welcome: 'Your recent AI conversations.',
    starterQuestions: [],
    context: 'recent'
  }
};

// ============================================================
// NEURAL PARTICLES BACKGROUND
// ============================================================

const NeuralParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.2 + 0.03;
        this.hue = 200 + Math.random() * 60;
      }

      update(mouseX, mouseY) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouseX && mouseY) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.2;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particleCount = 40;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            const opacity = (1 - dist / 80) * 0.08;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach(p => {
        p.update(mouseRef.current.x, mouseRef.current.y);
        p.draw(ctx);
      });
      
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
};

// ============================================================
// REALISTIC AI BOT ANIMATION COMPONENT
// ============================================================

const AIBotAnimation = ({ state = 'idle', size = 'lg' }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  return (
    <div 
      className={`relative ${sizes[size]} flex items-center justify-center`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-2xl animate-pulse" />
      
      {/* Main body */}
      <div className="relative w-full h-full">
        {/* Outer ring with spinning animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
        </motion.div>

        {/* Middle ring */}
        <motion.div
          className="absolute inset-[6px] rounded-full border border-purple-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner circle with gradient */}
        <div className="absolute inset-[12px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
          {/* Animated pulse overlay */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-400/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Bot face / icon */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div
              animate={
                state === 'thinking' ? {
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.8, repeat: Infinity }
                } :
                state === 'responding' ? {
                  scale: [1, 1.05, 1],
                  transition: { duration: 0.6, repeat: Infinity }
                } :
                isHovering ? {
                  scale: 1.08,
                  transition: { duration: 0.3 }
                } :
                {}
              }
            >
              <Bot className={`w-8 h-8 md:w-10 md:h-10 text-white/90 ${state === 'thinking' ? 'animate-pulse' : ''}`} />
            </motion.div>

            {/* Small indicator dots */}
            <div className="flex gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/50"
                  animate={
                    state === 'thinking' || state === 'responding' ? {
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1]
                    } :
                    { opacity: 0.3, scale: 1 }
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Inner ring */}
        <motion.div
          className="absolute inset-[18px] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles around bot */}
        {state === 'thinking' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  top: `${50 + 45 * Math.cos(i * 60 * Math.PI / 180)}%`,
                  left: `${50 + 45 * Math.sin(i * 60 * Math.PI / 180)}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.25
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// AI ORB COMPONENT (Small version for header)
// ============================================================

const AIOrb = ({ state = 'idle', size = 'sm' }) => {
  const sizes = {
    sm: 'w-10 h-10 md:w-12 md:h-12',
    md: 'w-16 h-16 md:w-20 md:h-20',
    lg: 'w-24 h-24 md:w-32 md:h-32'
  };

  const getOrbState = () => {
    switch(state) {
      case 'thinking':
        return {
          ring: 'animate-spin',
          pulse: 'animate-pulse',
          glow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)] md:shadow-[0_0_60px_rgba(99,102,241,0.4)]',
          inner: 'animate-pulse',
          ringColor: 'border-cyan-400/40'
        };
      case 'responding':
        return {
          ring: 'animate-spin',
          pulse: 'animate-pulse',
          glow: 'shadow-[0_0_40px_rgba(139,92,246,0.4)] md:shadow-[0_0_80px_rgba(139,92,246,0.5)]',
          inner: 'animate-pulse',
          ringColor: 'border-purple-400/40'
        };
      case 'success':
        return {
          ring: '',
          pulse: '',
          glow: 'shadow-[0_0_30px_rgba(52,211,153,0.3)] md:shadow-[0_0_60px_rgba(52,211,153,0.4)]',
          inner: '',
          ringColor: 'border-emerald-400/40'
        };
      default:
        return {
          ring: '',
          pulse: 'animate-pulse',
          glow: 'shadow-[0_0_20px_rgba(99,102,241,0.15)] md:shadow-[0_0_30px_rgba(99,102,241,0.2)]',
          inner: '',
          ringColor: 'border-indigo-500/30'
        };
    }
  };

  const orbState = getOrbState();

  return (
    <motion.div
      className={`relative ${sizes[size]} flex items-center justify-center ${orbState.glow}`}
      animate={state === 'success' ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${orbState.ringColor} ${orbState.ring}`}
        animate={{ rotate: state === 'thinking' || state === 'responding' ? 360 : 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
      </motion.div>

      <motion.div
        className={`absolute inset-[4px] rounded-full border border-purple-500/20 ${orbState.ring}`}
        animate={{ rotate: state === 'thinking' || state === 'responding' ? -360 : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className={`absolute inset-[8px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center ${orbState.pulse}`}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 blur-xl"
          animate={state === 'thinking' || state === 'responding' ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <Bot className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
      </motion.div>

      <motion.div
        className={`absolute inset-[14px] rounded-full border border-white/10 ${orbState.ring}`}
        animate={{ rotate: state === 'thinking' || state === 'responding' ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
};

// ============================================================
// NEURAL TOOL CARD
// ============================================================

const NeuralToolCard = ({ tool }) => {
  const IconComponent = getToolIcon(tool.name);

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="glass-card rounded-xl p-3 md:p-4 border border-white/10 hover:border-indigo-400/30 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start gap-2 md:gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
          <IconContainer icon={IconComponent} size="sm" glowColor="indigo" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-semibold text-white text-xs md:text-sm truncate">{tool.name}</h4>
            {tool.rating && (
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] md:text-xs text-white/60">{tool.rating}</span>
              </div>
            )}
          </div>
          <p className="text-white/40 text-[10px] md:text-xs mt-0.5 line-clamp-2">{tool.description}</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {tool.tags && tool.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[8px] md:text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// NEURAL COMMAND BAR
// ============================================================

const NeuralCommandBar = ({ 
  value, 
  onChange, 
  onSend, 
  onVoice, 
  isListening,
  isProcessing,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
      <div className="relative bg-[#0d1224]/90 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10">
        <div className="flex items-center p-1.5 md:p-1.5">
          <div className="pl-2 md:pl-3 flex items-center gap-1.5 md:gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
          </div>

          <input
            id="neural-command"
            name="neural-command"
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
            placeholder={placeholder || "COMMAND_INPUT: Enter protocol..."}
            className="flex-1 py-2 px-2 md:py-3 md:px-3 bg-transparent outline-none text-white/80 placeholder:text-white/20 font-mono text-xs md:text-sm"
            autoComplete="off"
          />

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVoice}
              className={`p-1.5 md:p-2 rounded-lg md:rounded-xl transition-all ${
                isListening 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'hover:bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {isListening ? <Mic className="w-3 h-3 md:w-4 md:h-4 animate-pulse" /> : <Mic className="w-3 h-3 md:w-4 md:h-4" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSend}
              disabled={!value.trim() || isProcessing}
              className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:opacity-50 transition-opacity"
            >
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SPEAKING INDICATOR COMPONENT
// ============================================================

const SpeakingIndicator = ({ isSpeaking, onStop, isMuted, onToggleMute }) => {
  if (!isSpeaking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30"
    >
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-0.5 bg-cyan-400 rounded-full"
            animate={{
              height: isSpeaking ? [4, 12, 4] : 4,
              opacity: isSpeaking ? [0.3, 1, 0.3] : 0.3
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <span className="text-[10px] text-cyan-400/80 font-mono">Speaking...</span>

      <button
        onClick={onStop}
        className="p-0.5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        title="Stop speaking"
      >
        <StopCircle className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={onToggleMute}
        className="p-0.5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </motion.div>
  );
};

// ============================================================
// SIDEBAR COMPONENT
// ============================================================

const NeuralSidebar = ({ 
  isOpen, 
  onToggle, 
  activeMode, 
  onModeChange,
  savedSearches,
  recentConversations,
  onSavedSearchClick,
  onRecentClick,
  onClearHistory
}) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'AI Topics', description: 'Browse AI topics' },
    { id: 'tools', icon: Grid, label: 'AI Tools', description: 'Discover AI tools' },
    { id: 'learn', icon: BookOpen, label: 'Learning Hub', description: 'Learn AI concepts' },
    { id: 'trending', icon: TrendingUp, label: 'Trending AI', description: 'Latest trends' },
    { id: 'compare', icon: GitBranch, label: 'Compare Tools', description: 'Compare AI tools' },
    { id: 'news', icon: Radio, label: 'AI News', description: 'Latest AI news' },
    { id: 'saved', icon: Bookmark, label: 'Saved Searches', description: `${savedSearches.length} saved items` },
    { id: 'recent', icon: Clock, label: 'Recent Conversations', description: `${recentConversations.length} history` },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed lg:absolute left-0 top-0 bottom-0 w-[260px] md:w-[280px] bg-[#0a0e1a]/95 backdrop-blur-xl border-r border-white/5 z-40 flex flex-col"
      >
        <div className="p-3 md:p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">AI Compass</span>
          </div>
          <button onClick={onToggle} className="p-1 rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>

        <nav className="flex-1 p-2 md:p-3 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onModeChange(item.id);
                  onToggle();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 md:py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''} group-hover:text-cyan-400 transition-colors`} />
                <div className="flex-1 text-left">
                  <span className="text-xs md:text-sm font-medium block">{item.label}</span>
                  <span className="text-[8px] md:text-[10px] text-white/20 block">{item.description}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                )}
                {item.id === 'saved' && savedSearches.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {savedSearches.length}
                  </span>
                )}
                {item.id === 'recent' && recentConversations.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                    {recentConversations.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 md:p-4 border-t border-white/5">
          <div className="glass-card rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
              <span className="text-[10px] md:text-xs text-white/60">Neural Engine v2.0</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] md:text-[10px] text-white/30">Online</span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// ============================================================
// SAVED/RECENT CONTENT COMPONENTS
// ============================================================

const SavedSearchesContent = ({ savedSearches, onSavedSearchClick, onRemoveSaved }) => (
  <div className="flex flex-col items-center h-full px-4 py-4 overflow-y-auto">
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Saved Searches</h3>
        <span className="text-xs text-white/30 ml-auto">{savedSearches.length} saved</span>
      </div>
      
      {savedSearches.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Bookmark className="w-12 h-12 text-white/10 mb-3" />
          <p className="text-white/40 text-sm">No saved searches yet</p>
          <p className="text-white/20 text-xs mt-1">Click the heart icon on any response to save it</p>
        </div>
      ) : (
        <div className="space-y-2">
          {savedSearches.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group"
            >
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onSavedSearchClick?.(item.query)}
                  className="text-white/80 text-sm hover:text-white transition-colors text-left"
                >
                  {item.query}
                </button>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-white/20">{item.category}</span>
                  <span className="text-[10px] text-white/10">•</span>
                  <span className="text-[10px] text-white/20">{new Date(item.timestamp).toLocaleDateString()}</span>
                  {item.mode && (
                    <>
                      <span className="text-[10px] text-white/10">•</span>
                      <span className="text-[10px] text-cyan-400/40">{item.mode}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemoveSaved?.(idx)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const RecentConversationsContent = ({ recentConversations, onRecentClick, onClearHistory }) => (
  <div className="flex flex-col items-center h-full px-4 py-4 overflow-y-auto">
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Recent Conversations</h3>
          <span className="text-xs text-white/30 ml-2">{recentConversations.length} items</span>
        </div>
        {recentConversations.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-white/20 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>
      
      {recentConversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Clock className="w-12 h-12 text-white/10 mb-3" />
          <p className="text-white/40 text-sm">No conversation history</p>
          <p className="text-white/20 text-xs mt-1">Your chat history will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {recentConversations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group"
            >
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onRecentClick?.(item.query)}
                  className="text-white/80 text-sm hover:text-white transition-colors text-left"
                >
                  {item.query}
                </button>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-white/20">{item.category}</span>
                  <span className="text-[10px] text-white/10">•</span>
                  <span className="text-[10px] text-white/20">{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span className="text-[10px] text-white/10">•</span>
                  <span className="text-[10px] text-white/20">{new Date(item.timestamp).toLocaleTimeString()}</span>
                  {item.mode && (
                    <>
                      <span className="text-[10px] text-white/10">•</span>
                      <span className="text-[10px] text-cyan-400/40">{item.mode}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {item.saved && (
                  <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ============================================================
// MAIN NEURAL CHATBOT COMPONENT
// ============================================================

export default function NeuralChatbot({ 
  fullPage = false, 
  initialQuery = '', 
  selectedTopic = null, 
  onBack = null 
}) {
  // Mode State
  const [currentMode, setCurrentMode] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Chat States
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [orbState, setOrbState] = useState('idle');
  
  // Feedback States
  const [feedbackState, setFeedbackState] = useState({}); // Stores like/dislike state per message
  
  // TTS States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeakingMessageId, setCurrentSpeakingMessageId] = useState(null);
  const [isTTSAvailable, setIsTTSAvailable] = useState(false);
  
  // TTS Refs
  const speechSynthRef = useRef(null);
  
  // Saved & Recent
  const [savedSearches, setSavedSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('aiCompassSavedSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [recentConversations, setRecentConversations] = useState(() => {
    try {
      const recent = localStorage.getItem('aiCompassRecentConversations');
      return recent ? JSON.parse(recent) : [];
    } catch {
      return [];
    }
  });

  // Refs
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const modeHistoryRef = useRef({});

  // Get current mode config
  const currentModeConfig = MODE_CONFIGS[currentMode] || MODE_CONFIGS.home;

  // Initialize Speech Synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
      setIsTTSAvailable(true);
      speechSynthRef.current.getVoices();
      speechSynthRef.current.onvoiceschanged = () => {
        speechSynthRef.current.getVoices();
      };
    }

    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // ============================================================
  // TEXT-TO-SPEECH FUNCTIONS
  // ============================================================

  const cleanTextForSpeech = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/[_-]/g, ' ')
      .replace(/\n/g, '. ')
      .replace(/•/g, 'bullet ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const speakResponse = (text, messageId) => {
    if (!isTTSAvailable || isMuted) return;

    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }

    const cleanText = cleanTextForSpeech(text);
    
    if (!cleanText || cleanText.length < 5) {
      setIsSpeaking(false);
      setCurrentSpeakingMessageId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = speechSynthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Natural') || voice.name.includes('Google') || voice.name.includes('Microsoft'))
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingMessageId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingMessageId(null);
    };

    speechSynthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
    setIsSpeaking(false);
    setCurrentSpeakingMessageId(null);
  };

  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  const toggleSpeakMessage = (messageId, content) => {
    if (isSpeaking && currentSpeakingMessageId === messageId) {
      stopSpeaking();
    } else {
      stopSpeaking();
      speakResponse(content, messageId);
    }
  };

  // ============================================================
  // MODE MANAGEMENT
  // ============================================================

  const switchMode = useCallback((modeId) => {
    // Save current messages to history
    if (messages.length > 0) {
      modeHistoryRef.current[currentMode] = messages;
    }

    // Clear messages for new mode
    setMessages([]);
    setCurrentMode(modeId);
    setConfidence(null);
    setRelatedQuestions([]);
    setOrbState('idle');
    setFeedbackState({});
    
    // Load saved messages for this mode if they exist
    const savedMessages = modeHistoryRef.current[modeId];
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, [currentMode, messages]);

  // Save messages to history when they change
  useEffect(() => {
    if (messages.length > 0) {
      modeHistoryRef.current[currentMode] = messages;
    }
  }, [messages, currentMode]);

  // ============================================================
  // VOICE RECOGNITION
  // ============================================================

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
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // ============================================================
  // PLACEHOLDER ROTATION
  // ============================================================

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const getPlaceholderExamples = () => {
    switch(currentMode) {
      case 'tools':
        return ["Best AI for coding", "Find AI for presentations", "AI for students", "Research tools", "Free AI tools"];
      case 'compare':
        return ["ChatGPT vs Claude", "Midjourney vs Flux", "Cursor vs Copilot", "Compare AI tools"];
      case 'learn':
        return ["Start AI Basics", "Beginner Roadmap", "AI Career Path", "Learn Prompt Engineering"];
      case 'trending':
        return ["Latest AI models", "Trending image generators", "New AI startups", "AI funding news"];
      case 'news':
        return ["OpenAI updates", "Anthropic news", "Google AI releases", "Meta AI announcements"];
      default:
        return ["What is AI?", "Machine Learning basics", "Deep Learning explained", "NLP fundamentals"];
    }
  };

  const examples = getPlaceholderExamples();

  useEffect(() => {
    let timeout;
    const currentExample = examples[placeholderIndex % examples.length];
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setPlaceholderText(currentExample.slice(0, placeholderText.length - 1));
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setPlaceholderText(currentExample.slice(0, placeholderText.length + 1));
      }, 50);
    }

    if (!isDeleting && placeholderText === currentExample) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && placeholderText === '') {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % examples.length);
    }

    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, placeholderIndex, examples]);

  // ============================================================
  // SEND MESSAGE
  // ============================================================

  const handleSendMessage = useCallback(async (customInput = null) => {
    if (isSpeaking) {
      stopSpeaking();
    }

    const messageToSend = customInput !== null ? customInput : input;
    const trimmedInput = messageToSend.trim();
    
    if (!trimmedInput || loading) return;

    setInput('');
    setOrbState('thinking');
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: trimmedInput,
      id: userMsgId 
    }]);
    setLoading(true);
    setIsProcessing(true);
    setConfidence(null);

    try {
      const response = await axios.post(`${API_URL}/api/faq/query`, {
        query: trimmedInput,
        topic: selectedTopic,
        mode: currentMode,
        context: currentModeConfig.context
      });
      
      const data = response.data;
      const botMsgId = Date.now() + 1;
      
      const botMessage = {
        type: 'bot',
        content: data.answer || "I couldn't find a specific match.",
        confidence: data.confidence || 0,
        category: data.category || 'General',
        toolLinks: data.toolLinks || [],
        processedQuery: data.queryProcessed || '',
        intent: data.intent,
        isFallback: data.isFallback || false,
        query: trimmedInput,
        timestamp: Date.now(),
        saved: false,
        id: botMsgId
      };
      
      // Add to recent conversations
      const recentItem = {
        query: trimmedInput,
        category: data.category || 'General',
        timestamp: Date.now(),
        saved: false,
        mode: currentMode
      };
      
      setRecentConversations(prev => {
        const filtered = prev.filter(item => item.query !== trimmedInput);
        return [recentItem, ...filtered].slice(0, 50);
      });
      
      setMessages(prev => [...prev, botMessage]);
      setConfidence(data.confidence || 0);
      setRelatedQuestions(data.relatedQuestions || []);
      setOrbState('success');
      
      // Auto-speak
      if (data.answer && !data.isFallback && !isMuted) {
        setTimeout(() => {
          speakResponse(data.answer, botMsgId);
        }, 500);
      }
      
      setTimeout(() => setOrbState('idle'), 2000);
      
    } catch (err) {
      console.error('Error:', err);
      const errMsgId = Date.now() + 2;
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "Error: Could not process your request. Please try again.",
        isError: true,
        query: trimmedInput,
        timestamp: Date.now(),
        id: errMsgId
      }]);
      setOrbState('idle');
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  }, [input, loading, selectedTopic, currentMode, currentModeConfig.context, isMuted]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      if (input.trim()) {
        handleSendMessage();
      }
    }
  }, [input, loading, handleSendMessage]);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
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

  const handleAction = useCallback((action) => {
    setInput(action);
    setTimeout(() => handleSendMessage(action), 100);
  }, [handleSendMessage]);

  const handleModeChange = useCallback((modeId) => {
    switchMode(modeId);
    setSidebarOpen(false);
  }, [switchMode]);

  const handleSavedSearchClick = useCallback((query) => {
    setInput(query);
    setTimeout(() => handleSendMessage(query), 100);
  }, [handleSendMessage]);

  const handleRecentClick = useCallback((query) => {
    setInput(query);
    setTimeout(() => handleSendMessage(query), 100);
  }, [handleSendMessage]);

  // ============================================================
  // FEEDBACK HANDLERS (LIKE / DISLIKE)
  // ============================================================

  const handleLike = useCallback((msgIndex) => {
    setFeedbackState(prev => {
      const current = prev[msgIndex] || { liked: false, disliked: false };
      // If already liked, unlike it
      if (current.liked) {
        return { ...prev, [msgIndex]: { ...current, liked: false } };
      }
      // Otherwise, like it and remove dislike
      return { ...prev, [msgIndex]: { liked: true, disliked: false } };
    });
    
    // Update message in state to reflect feedback
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[msgIndex]) {
        const isLiked = !feedbackState[msgIndex]?.liked;
        newMessages[msgIndex] = { 
          ...newMessages[msgIndex], 
          liked: isLiked,
          disliked: false
        };
      }
      return newMessages;
    });
  }, [feedbackState]);

  const handleDislike = useCallback((msgIndex) => {
    setFeedbackState(prev => {
      const current = prev[msgIndex] || { liked: false, disliked: false };
      // If already disliked, undislike it
      if (current.disliked) {
        return { ...prev, [msgIndex]: { ...current, disliked: false } };
      }
      // Otherwise, dislike it and remove like
      return { ...prev, [msgIndex]: { liked: false, disliked: true } };
    });
    
    // Update message in state to reflect feedback
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[msgIndex]) {
        const isDisliked = !feedbackState[msgIndex]?.disliked;
        newMessages[msgIndex] = { 
          ...newMessages[msgIndex], 
          liked: false,
          disliked: isDisliked
        };
      }
      return newMessages;
    });
  }, [feedbackState]);

  const handleToggleSaved = useCallback((msgIndex) => {
    setMessages(prev => {
      const newMessages = [...prev];
      const msg = newMessages[msgIndex];
      if (msg && msg.type === 'bot' && msg.query) {
        const isSaved = !msg.saved;
        newMessages[msgIndex] = { ...msg, saved: isSaved };
        
        if (isSaved) {
          const savedItem = {
            query: msg.query,
            category: msg.category || 'General',
            timestamp: Date.now(),
            mode: currentMode
          };
          setSavedSearches(prevSaved => {
            const filtered = prevSaved.filter(item => item.query !== msg.query);
            return [savedItem, ...filtered];
          });
        } else {
          setSavedSearches(prevSaved => prevSaved.filter(item => item.query !== msg.query));
        }
        
        setRecentConversations(prevRecent => 
          prevRecent.map(item => 
            item.query === msg.query ? { ...item, saved: isSaved } : item
          )
        );
        
        return newMessages;
      }
      return prev;
    });
  }, [currentMode]);

  const handleCopy = useCallback((content) => {
    navigator.clipboard.writeText(content).then(() => {
      console.log('Copied to clipboard');
    }).catch(() => {
      console.error('Failed to copy');
    });
  }, []);

  const handleRemoveSaved = useCallback((idx) => {
    const query = savedSearches[idx]?.query;
    if (query) {
      setSavedSearches(prev => prev.filter((_, i) => i !== idx));
      setMessages(prev => 
        prev.map(msg => 
          msg.type === 'bot' && msg.query === query ? { ...msg, saved: false } : msg
        )
      );
      setRecentConversations(prev => 
        prev.map(item => 
          item.query === query ? { ...item, saved: false } : item
        )
      );
    }
  }, [savedSearches]);

  const handleClearHistory = useCallback(() => {
    setRecentConversations([]);
  }, []);

  // ============================================================
  // RENDER MESSAGE
  // ============================================================

  const renderMessage = (msg, idx) => {
    const isUser = msg.type === 'user';
    const isLastBot = msg.type === 'bot' && idx === messages.length - 1;
    const isBot = msg.type === 'bot';
    const isMessageSpeaking = isSpeaking && currentSpeakingMessageId === msg.id;
    const isLiked = msg.liked || feedbackState[idx]?.liked || false;
    const isDisliked = msg.disliked || feedbackState[idx]?.disliked || false;

    if (isUser) {
      return (
        <div className="flex justify-end">
          <div className="max-w-[85%] md:max-w-[80%] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl rounded-tr-sm p-3 md:p-4 shadow-lg shadow-indigo-500/20">
            <p className="text-sm text-white font-mono leading-relaxed">{msg.content}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] md:max-w-[85%] space-y-2 md:space-y-3">
          {isLastBot && !msg.isError && (
            <div className="flex items-center justify-between gap-2 md:gap-3 text-[10px] md:text-xs text-cyan-400/60 font-mono">
              <div className="flex items-center gap-1 md:gap-1.5">
                <Activity className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span>NEURAL RESPONSE</span>
              </div>
              <div className="w-6 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
              {msg.confidence > 0 && (
                <span className="text-emerald-400/60">{msg.confidence}% CONFIDENCE</span>
              )}
            </div>
          )}

          <div className={`glass-card rounded-2xl p-3 md:p-5 border ${
            msg.isError ? 'border-red-500/30' : 'border-indigo-500/20'
          } ${isMessageSpeaking ? 'ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-400/10' : ''}`}>
            <p className="text-white/80 text-xs md:text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </p>

            {isMessageSpeaking && (
              <div className="mt-2 flex items-center gap-2 p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-cyan-400 rounded-full"
                      animate={{
                        height: [3, 10, 3],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-cyan-400/70 font-mono">Speaking...</span>
                <button
                  onClick={stopSpeaking}
                  className="ml-auto p-0.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                  <StopCircle className="w-3 h-3" />
                </button>
              </div>
            )}

            {msg.toolLinks && msg.toolLinks.length > 0 && !msg.isError && (
              <div className="mt-3 md:mt-4 space-y-2">
                <p className="text-[10px] md:text-xs font-mono text-cyan-400/60 flex items-center gap-1 md:gap-2">
                  <Rocket className="w-2.5 h-2.5 md:w-3 md:h-3" /> RECOMMENDED TOOLS
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {msg.toolLinks.slice(0, 2).map((tool, index) => (
                    <NeuralToolCard key={index} tool={tool} />
                  ))}
                  {msg.toolLinks.length > 2 && (
                    <button className="text-[10px] md:text-xs text-cyan-400/40 hover:text-cyan-400/60 transition-colors">
                      +{msg.toolLinks.length - 2} more tools
                    </button>
                  )}
                </div>
              </div>
            )}

            {msg.confidence > 0 && !msg.isError && (
              <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full border ${
                  msg.confidence > 70 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  msg.confidence > 40 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                  'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  <Activity className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span className="text-[10px] md:text-xs font-mono">{msg.confidence}%</span>
                </div>
                {msg.intent && msg.intent !== 'general' && (
                  <div className="flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <span className="text-[8px] md:text-xs font-mono">{msg.intent.replace('-', ' ').toUpperCase()}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Action Buttons */}
            {!msg.isError && isBot && msg.query && (
              <div className="mt-3 flex items-center gap-3 pt-2 border-t border-white/5 flex-wrap">
                <button
                  onClick={() => handleToggleSaved(idx)}
                  className={`flex items-center gap-1.5 text-xs transition-all ${
                    msg.saved 
                      ? 'text-emerald-400' 
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {msg.saved ? (
                    <Heart className="w-3.5 h-3.5 fill-emerald-400" />
                  ) : (
                    <Heart className="w-3.5 h-3.5" />
                  )}
                  {msg.saved ? 'Saved' : 'Save'}
                </button>
                <button 
                  onClick={() => handleLike(idx)}
                  className={`flex items-center gap-1.5 text-xs transition-all ${
                    isLiked 
                      ? 'text-emerald-400' 
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-emerald-400' : ''}`} />
                  Like
                </button>
                <button 
                  onClick={() => handleDislike(idx)}
                  className={`flex items-center gap-1.5 text-xs transition-all ${
                    isDisliked 
                      ? 'text-red-400' 
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  <ThumbsDown className={`w-3.5 h-3.5 ${isDisliked ? 'fill-red-400' : ''}`} />
                  Dislike
                </button>
                <button 
                  onClick={() => handleCopy(msg.content)}
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                {!msg.isError && msg.content && msg.content.length > 10 && (
                  <button
                    onClick={() => toggleSpeakMessage(msg.id, msg.content)}
                    className={`flex items-center gap-1.5 text-xs transition-all ${
                      isMessageSpeaking 
                        ? 'text-cyan-400' 
                        : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {isMessageSpeaking ? (
                      <StopCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    {isMessageSpeaking ? 'Stop' : 'Listen'}
                  </button>
                )}
              </div>
            )}
          </div>

          {isLastBot && relatedQuestions.length > 0 && !msg.isError && (
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {relatedQuestions.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleAction(q)}
                  className="text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 transition-all border border-white/5"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // WELCOME SCREEN
  // ============================================================

  const renderWelcomeScreen = () => {
    const config = currentModeConfig;
    const isSavedOrRecent = currentMode === 'saved' || currentMode === 'recent';
    
    if (isSavedOrRecent) {
      if (currentMode === 'saved') {
        return (
          <SavedSearchesContent 
            savedSearches={savedSearches}
            onSavedSearchClick={handleSavedSearchClick}
            onRemoveSaved={handleRemoveSaved}
          />
        );
      }
      return (
        <RecentConversationsContent 
          recentConversations={recentConversations}
          onRecentClick={handleRecentClick}
          onClearHistory={handleClearHistory}
        />
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center h-full text-center px-4 py-8"
      >
        <AIBotAnimation 
          state={isProcessing ? 'thinking' : isSpeaking ? 'responding' : 'idle'} 
          size="xl" 
        />

        <motion.div 
          className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
          animate={isProcessing ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span className="text-[10px] text-white/40 font-mono">
            {isProcessing ? 'NEURAL PROCESSING...' : isSpeaking ? 'RESPONDING...' : 'ONLINE • READY'}
          </span>
        </motion.div>

        <motion.h3 
          className="text-xl md:text-2xl font-bold mt-4 md:mt-6 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {config.label}
        </motion.h3>

        <motion.p 
          className="text-white/40 text-xs md:text-sm mt-2 max-w-md font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {config.welcome}
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-1.5 md:gap-2 mt-4 md:mt-6 justify-center max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {config.starterQuestions.map((question, index) => (
            <motion.button
              key={question}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(question)}
              className="text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 transition-all border border-white/5 font-mono"
            >
              {question}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-6 text-[10px] text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
            NLP Powered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-indigo-400/50" />
            Real-time Responses
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-purple-400/50" />
            Context-Aware
          </span>
        </motion.div>
      </motion.div>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[600px] bg-[#080c18] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      <NeuralParticles />

      {/* Top Bar */}
      <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-white/5 hover:bg-white/10 rounded-lg md:rounded-xl transition-all text-white/60 hover:text-white border border-white/5 text-[10px] md:text-xs font-mono"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
          )}
          {selectedTopic && (
            <div className="flex items-center gap-1 md:gap-2 bg-indigo-500/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-indigo-400/30">
              <BookOpen className="w-2.5 h-2.5 md:w-3 md:h-3 text-indigo-400" />
              <span className="text-[8px] md:text-xs text-indigo-400 truncate max-w-[80px] md:max-w-[150px]">
                {typeof selectedTopic === 'string' ? selectedTopic : 'Learning'}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-[8px] font-mono text-cyan-400/60">
              {currentModeConfig.header || currentModeConfig.label}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={toggleMute}
              className={`p-0.5 rounded transition-colors ${
                isMuted ? 'text-red-400' : 'text-cyan-400'
              }`}
              title={isMuted ? "Unmute voice" : "Mute voice"}
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <span className={`text-[8px] font-mono ${isMuted ? 'text-red-400/60' : 'text-cyan-400/60'}`}>
              {isMuted ? 'MUTED' : isSpeaking ? 'SPEAKING' : 'READY'}
            </span>
            {isSpeaking && (
              <div className="flex items-center gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-cyan-400 rounded-full"
                    animate={{
                      height: [2, 6, 2],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 md:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/60 transition-colors"
          >
            <Menu className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <NeuralSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        activeMode={currentMode}
        onModeChange={handleModeChange}
        savedSearches={savedSearches}
        recentConversations={recentConversations}
        onSavedSearchClick={handleSavedSearchClick}
        onRecentClick={handleRecentClick}
        onClearHistory={handleClearHistory}
      />

      {/* Main Content */}
      <div className={`relative h-full flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-[260px] md:ml-[280px]' : 'ml-0'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-3 md:px-6 pt-12 md:pt-16 pb-2 md:pb-4 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <AIOrb state={orbState} size="sm" />
            </div>
            <div className="hidden xs:block">
              <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-1 md:gap-2">
                <span className="text-cyan-400">❯</span> {currentModeConfig.header || currentModeConfig.label}
              </h3>
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-[8px] md:text-xs text-white/20 font-mono">NLP • TF-IDF • COSINE</span>
                {isProcessing && (
                  <span className="text-[8px] md:text-xs text-cyan-400/60 font-mono animate-pulse">PROCESSING...</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            {confidence !== null && confidence > 0 && (
              <div className={`flex items-center gap-1 px-1.5 py-0.5 md:px-3 md:py-1 rounded-full border ${
                confidence > 70 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                confidence > 40 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <Activity className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="text-[8px] md:text-xs font-mono">{confidence}%</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] md:text-xs text-white/20 hidden xs:inline">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4"
          style={{ overscrollBehavior: 'contain' }}
        >
          {messages.length === 0 ? (
            renderWelcomeScreen()
          ) : (
            <div className="space-y-3 md:space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  {renderMessage(msg, idx)}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl p-3 md:p-5 border border-indigo-500/20">
                    <div className="flex items-center gap-2 md:gap-4">
                      <AIOrb state="thinking" size="sm" />
                      <div className="space-y-0.5 md:space-y-1">
                        <p className="text-xs md:text-sm text-white/60 font-mono">Neural Analysis Running...</p>
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-cyan-400"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Command Bar */}
        <div className="p-2 md:p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1.5">
            {isSpeaking && (
              <SpeakingIndicator 
                isSpeaking={isSpeaking}
                onStop={stopSpeaking}
                isMuted={isMuted}
                onToggleMute={toggleMute}
              />
            )}
          </div>
          <NeuralCommandBar
            value={input}
            onChange={handleInputChange}
            onSend={() => handleSendMessage()}
            onVoice={toggleVoiceInput}
            isListening={isListening}
            isProcessing={isProcessing}
            placeholder={placeholderText || "COMMAND_INPUT: Enter protocol..."}
          />
        </div>
      </div>
    </div>
  );
}