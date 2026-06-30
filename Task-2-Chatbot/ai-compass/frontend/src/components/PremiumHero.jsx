import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, ArrowRight, TrendingUp, 
  Users, Command, Rocket, Cpu, Globe, Layers,
  Eye, Brain, Gauge, Shield, Star, Compass, MessageCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';
import { IconContainer, getToolIcon } from '../utils/iconMap.jsx';
import { SiOpenai, SiGithub, SiNotion } from 'react-icons/si';
import { RiSearchEyeLine, RiImageAiLine } from 'react-icons/ri';
import { MdOutlineMovieCreation } from 'react-icons/md';
import { TbBrain, TbCursorText } from 'react-icons/tb';
import { FaRobot, FaPalette } from 'react-icons/fa';

const PremiumHero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingTools, setTrendingTools] = useState([]);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const examples = [
    "Best AI for coding",
    "Generate flowcharts",
    "AI tools for students",
    "Best ChatGPT alternatives",
    "AI for resume building",
    "Latest AI tools"
  ];

  // Rotating placeholder
  useEffect(() => {
    let timeout;
    const currentExample = examples[placeholderIndex];
    
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
  }, [placeholderText, isDeleting, placeholderIndex]);

  // Search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = [
        { name: "Cursor AI", category: "Coding", icon: TbCursorText },
        { name: "Claude 3.5", category: "AI Assistant", icon: TbBrain },
        { name: "Midjourney", category: "Design", icon: RiImageAiLine },
        { name: "Perplexity AI", category: "Research", icon: RiSearchEyeLine },
        { name: "GitHub Copilot", category: "Coding", icon: SiGithub },
        { name: "ChatGPT", category: "AI Assistant", icon: SiOpenai },
        { name: "Notion AI", category: "Productivity", icon: SiNotion },
        { name: "Runway", category: "Video", icon: MdOutlineMovieCreation },
        { name: "Canva AI", category: "Design", icon: FaPalette },
        { name: "Jasper AI", category: "Writing", icon: FaRobot },
      ].filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(suggestions.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Trending tools
  useEffect(() => {
    axios.get('/api/faq/trending')
      .then(res => {
        const mappedTools = res.data.map(tool => ({
          ...tool,
          icon: getToolIcon(tool.name)
        }));
        setTrendingTools(mappedTools);
      })
      .catch(() => {
        setTrendingTools([
          { name: "Cursor IDE", category: "Code Editor", description: "AI-first code editor with context awareness", icon: TbCursorText, users: "856K+", trend: "+112%" },
          { name: "Claude 3.5", category: "AI Assistant", description: "Constitutional AI by Anthropic, best reasoning", icon: TbBrain, users: "1.2M+", trend: "+47%" },
          { name: "Midjourney v6", category: "Design", description: "Photorealistic image generation", icon: RiImageAiLine, users: "2.4M+", trend: "+38%" },
          { name: "Perplexity Pro", category: "Research", description: "Cited answers with academic sources", icon: RiSearchEyeLine, users: "5.1M+", trend: "+89%" }
        ]);
      });
  }, []);

  useEffect(() => {
    if (trendingTools.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTrendingIndex((prev) => (prev + 1) % trendingTools.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [trendingTools.length]);

  const quickCategories = [
    { 
      name: "Chatbots", 
      icon: MessageCircle, 
      color: "from-blue-500 to-cyan-500",
      query: "Best AI chatbots" 
    },
    { 
      name: "Coding", 
      icon: Cpu, 
      color: "from-indigo-500 to-purple-500",
      query: "Best AI for coding" 
    },
    { 
      name: "Image Gen", 
      icon: Eye, 
      color: "from-pink-500 to-rose-500",
      query: "Best AI image generators" 
    },
    { 
      name: "Video Gen", 
      icon: Globe, 
      color: "from-red-500 to-orange-500",
      query: "Best AI video generators" 
    },
    { 
      name: "Writing", 
      icon: Brain, 
      color: "from-amber-500 to-orange-500",
      query: "Best AI writing tools" 
    },
    { 
      name: "Research", 
      icon: Search, 
      color: "from-emerald-500 to-teal-500",
      query: "Best AI for research" 
    }
  ];

  // Handle search submit - sends the query to the chatbot
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Call onSearch with the query - this will open the chatbot and send the question
      onSearch?.(searchQuery.trim());
    }
  };

  // Handle category click - immediately sends query to chatbot
  const handleCategoryClick = (category) => {
    const query = category.query || `Best AI for ${category.name.toLowerCase()}`;
    setSearchQuery(query);
    // Directly send the query to the chatbot without needing to click Explore
    onSearch?.(query);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 opacity-95" />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#818cf8">
                <animate attributeName="r" values="1.5;3;1.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <path d="M 30 0 L 30 60 M 0 30 L 60 30" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      {/* Floating AI Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Floating Glow Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10 shadow-2xl">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/80">AI Discovery Engine</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-sm text-cyan-400">NLP Powered</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]">
            <span className="text-white">
              Navigate the
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence Frontier
            </span>
          </h1>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Discover, compare, and learn about the world's most powerful AI tools.
            Explore emerging technologies, industry trends, and unlock new possibilities with AI Compass.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center p-1.5">
                <div className="pl-4">
                  <Search className="w-5 h-5 text-white/40" />
                </div>
                
                <input
                  id="hero-search"
                  name="hero-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      e.preventDefault();
                      handleSearchSubmit();
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsFocused(false);
                      setShowSuggestions(false);
                    }, 200);
                  }}
                  placeholder={placeholderText || "Ask anything..."}
                  className="flex-1 py-3.5 px-3 bg-transparent outline-none text-white placeholder:text-white/30 text-base"
                />
                
                <div className="flex items-center gap-2 mr-1">
                  <kbd className="hidden lg:inline-block px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white/40">⌘K</kbd>
                </div>
                
                <button
                  onClick={handleSearchSubmit}
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-2 max-h-96 overflow-y-auto">
                    <p className="text-xs text-slate-400 px-3 py-2 font-medium">Suggestions</p>
                    {searchSuggestions.map((suggestion, idx) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchQuery(suggestion.name);
                            // Send the query directly to chatbot
                            onSearch?.(suggestion.name);
                            setShowSuggestions(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-800 font-medium">{suggestion.name}</p>
                            <p className="text-xs text-slate-400">{suggestion.category}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Category Chips - Click to send query to chatbot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {quickCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all text-sm"
            >
              <cat.icon className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80">{cat.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Trending Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span className="text-lg font-semibold text-white">Trending Tools</span>
              <span className="text-xs text-white/30">• Live updates</span>
            </div>
            <div className="flex gap-1.5">
              {trendingTools.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTrendingIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentTrendingIndex ? 'w-8 bg-cyan-400' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrendingIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {trendingTools.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Featured Card */}
                  <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <IconContainer 
                        icon={trendingTools[currentTrendingIndex]?.icon || Cpu} 
                        size="lg" 
                        glowColor="cyan"
                      />
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                        Editor's Pick
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {trendingTools[currentTrendingIndex]?.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 max-w-md">
                      {trendingTools[currentTrendingIndex]?.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white/40">{trendingTools[currentTrendingIndex]?.users} users</span>
                      <span className="text-xs text-cyan-400">{trendingTools[currentTrendingIndex]?.trend}</span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button 
                        onClick={() => {
                          const toolName = trendingTools[currentTrendingIndex]?.name;
                          if (toolName) {
                            setSearchQuery(toolName);
                            onSearch?.(toolName);
                          }
                        }}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl text-sm font-medium hover:bg-cyan-400 transition-colors"
                      >
                        Learn More
                      </button>
                      <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
                        Use Code
                      </button>
                    </div>
                  </div>

                  {/* Other trending cards */}
                  {trendingTools.slice(1, 4).map((tool, idx) => {
                    const IconComponent = tool.icon || Cpu;
                    return (
                      <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-indigo-400/30 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                          <IconContainer icon={IconComponent} size="sm" glowColor="purple" />
                          <div>
                            <h4 className="text-white font-medium text-sm">{tool.name}</h4>
                            <p className="text-white/40 text-xs">{tool.category}</p>
                          </div>
                        </div>
                        <p className="text-white/50 text-sm line-clamp-2">{tool.description}</p>
                        <button 
                          onClick={() => {
                            const toolName = tool.name;
                            if (toolName) {
                              setSearchQuery(toolName);
                              onSearch?.(toolName);
                            }
                          }}
                          className="mt-3 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                        >
                          Learn More →
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Section - Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 lg:p-12">
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full px-3 py-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">Coming Soon</span>
              </div>
            </div>

            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Can't find what you need?<br />
                  <span className="text-cyan-400">Ask our AI Guide.</span>
                </h2>
                <p className="text-white/60 mb-6">
                  Tell us about your project requirements, tech stack, and budget. 
                  Our neural agent will map the entire ecosystem to find your perfect match.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    disabled
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl font-medium opacity-50 cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    Start Discovery
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Soon</span>
                  </button>
                  <button 
                    disabled
                    className="px-6 py-3 bg-white/10 text-white/40 rounded-xl font-medium cursor-not-allowed transition-all border border-white/10"
                  >
                    Request Assistance
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/20 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400/50" />
                  🚧 This feature is currently under development
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-ping" />
                  <div className="absolute inset-4 rounded-full border border-amber-400/30" />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                    <Clock className="w-16 h-16 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-white/30"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            10,000+ tools analyzed
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            95% match accuracy
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Real-time NLP matching
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumHero;