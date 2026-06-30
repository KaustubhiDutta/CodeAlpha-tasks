import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Palette, FileText, Search, Presentation, Video, Zap, 
  Megaphone, Briefcase, GraduationCap, Sparkles, Rocket, 
  Star, ExternalLink, ChevronRight, ArrowRight, 
  Cpu, Brain, Layers, Globe, Shield, Gauge
} from 'lucide-react';
import axios from 'axios';

const categories = [
  { 
    id: 'coding',
    name: "Code Editor", 
    icon: Code2, 
    color: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/20",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    tools: [
      { name: "GitHub Copilot", icon: "🤖", description: "AI-powered code completion", rating: 4.8, users: "1.2M+", pricing: "Free/Paid", tags: ["Code Gen", "AI Assistant"] },
      { name: "Cursor", icon: "⌨️", description: "AI-first code editor", rating: 4.9, users: "856K+", pricing: "Free/Paid", tags: ["IDE", "Context Aware"] },
      { name: "Codeium", icon: "⚡", description: "Free AI code completion", rating: 4.6, users: "500K+", pricing: "Free", tags: ["Free", "Multi-language"] },
      { name: "Tabnine", icon: "🧩", description: "AI code completion tool", rating: 4.5, users: "400K+", pricing: "Free/Paid", tags: ["Code Gen", "Privacy"] }
    ]
  },
  { 
    id: 'design',
    name: "Design", 
    icon: Palette, 
    color: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    tools: [
      { name: "Midjourney", icon: "🎨", description: "AI image generation", rating: 4.9, users: "2.4M+", pricing: "Paid", tags: ["Art", "Photorealistic"] },
      { name: "DALL-E 3", icon: "✨", description: "Text-to-image generation", rating: 4.8, users: "1.8M+", pricing: "Paid", tags: ["Text Rendering", "AI Art"] },
      { name: "Adobe Firefly", icon: "🦋", description: "AI design integration", rating: 4.7, users: "1M+", pricing: "Free/Paid", tags: ["Creative Cloud", "Design"] },
      { name: "Canva AI", icon: "🎯", description: "AI-powered design", rating: 4.6, users: "5M+", pricing: "Free/Paid", tags: ["Design", "Social Media"] }
    ]
  },
  { 
    id: 'writing',
    name: "Writing", 
    icon: FileText, 
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    tools: [
      { name: "Jasper AI", icon: "📝", description: "AI copywriting assistant", rating: 4.7, users: "500K+", pricing: "Paid", tags: ["Marketing", "Content"] },
      { name: "Copy.ai", icon: "✍️", description: "AI-powered copywriting", rating: 4.6, users: "400K+", pricing: "Free/Paid", tags: ["Copywriting", "Templates"] },
      { name: "Grammarly", icon: "✅", description: "AI writing assistant", rating: 4.8, users: "10M+", pricing: "Free/Paid", tags: ["Grammar", "Editing"] },
      { name: "Claude 3", icon: "🧠", description: "AI writing and reasoning", rating: 4.9, users: "1.2M+", pricing: "Free/Paid", tags: ["Creative", "Analysis"] }
    ]
  },
  { 
    id: 'research',
    name: "Research", 
    icon: Search, 
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tools: [
      { name: "Perplexity AI", icon: "🔍", description: "AI research assistant", rating: 4.8, users: "5.1M+", pricing: "Free/Paid", tags: ["Citations", "Academic"] },
      { name: "Elicit", icon: "📊", description: "AI literature review", rating: 4.7, users: "100K+", pricing: "Free/Paid", tags: ["Papers", "Research"] },
      { name: "Consensus", icon: "📈", description: "AI scientific analysis", rating: 4.6, users: "80K+", pricing: "Free/Paid", tags: ["Science", "Analysis"] },
      { name: "Scite.ai", icon: "🔬", description: "AI citation context", rating: 4.5, users: "60K+", pricing: "Free/Paid", tags: ["Citations", "Academic"] }
    ]
  },
  { 
    id: 'presentations',
    name: "Presentations", 
    icon: Presentation, 
    color: "from-purple-500 to-indigo-500",
    glow: "shadow-purple-500/20",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    tools: [
      { name: "Gamma", icon: "✨", description: "AI presentation generator", rating: 4.9, users: "450K+", pricing: "Free/Paid", tags: ["Slides", "AI Design"] },
      { name: "Beautiful.ai", icon: "🎨", description: "AI design automation", rating: 4.8, users: "300K+", pricing: "Free/Paid", tags: ["Design", "Slides"] },
      { name: "Tome AI", icon: "📖", description: "AI narrative slides", rating: 4.6, users: "200K+", pricing: "Free/Paid", tags: ["Storytelling", "Slides"] },
      { name: "Plus AI", icon: "➕", description: "AI for Google Slides", rating: 4.5, users: "150K+", pricing: "Free/Paid", tags: ["Google Slides", "AI"] }
    ]
  },
  { 
    id: 'video',
    name: "Video", 
    icon: Video, 
    color: "from-red-500 to-orange-500",
    glow: "shadow-red-500/20",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    tools: [
      { name: "Runway ML", icon: "🎬", description: "AI video generation", rating: 4.8, users: "450K+", pricing: "Free/Paid", tags: ["Video Gen", "Editing"] },
      { name: "Pika Labs", icon: "⚡", description: "Quick AI video creation", rating: 4.7, users: "320K+", pricing: "Free/Paid", tags: ["Quick Video", "AI"] },
      { name: "Descript", icon: "🎙️", description: "AI video editing", rating: 4.6, users: "200K+", pricing: "Free/Paid", tags: ["Editing", "Voice"] },
      { name: "Synthesia", icon: "🎥", description: "AI avatar videos", rating: 4.7, users: "180K+", pricing: "Paid", tags: ["Avatars", "Business"] }
    ]
  },
  { 
    id: 'productivity',
    name: "Productivity", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-500",
    glow: "shadow-yellow-500/20",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    tools: [
      { name: "Motion", icon: "⏰", description: "AI calendar scheduler", rating: 4.7, users: "300K+", pricing: "Paid", tags: ["Calendar", "Automation"] },
      { name: "Otter.ai", icon: "🦦", description: "AI meeting transcription", rating: 4.8, users: "2.8M+", pricing: "Free/Paid", tags: ["Meetings", "Transcription"] },
      { name: "Notion AI", icon: "📝", description: "AI note-taking assistant", rating: 4.6, users: "3.2M+", pricing: "Free/Paid", tags: ["Notes", "Productivity"] },
      { name: "Zapier AI", icon: "⚡", description: "AI workflow automation", rating: 4.5, users: "1.5M+", pricing: "Free/Paid", tags: ["Automation", "Workflows"] }
    ]
  },
  { 
    id: 'business',
    name: "Business", 
    icon: Briefcase, 
    color: "from-slate-600 to-gray-600",
    glow: "shadow-slate-500/20",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    tools: [
      { name: "Tableau GPT", icon: "📊", description: "AI data visualization", rating: 4.7, users: "500K+", pricing: "Paid", tags: ["Analytics", "Data"] },
      { name: "ThoughtSpot", icon: "💡", description: "AI conversational analytics", rating: 4.6, users: "200K+", pricing: "Paid", tags: ["Analytics", "Business"] },
      { name: "HubSpot AI", icon: "🏢", description: "AI CRM marketing", rating: 4.5, users: "800K+", pricing: "Free/Paid", tags: ["CRM", "Marketing"] },
      { name: "Polymer Search", icon: "🧪", description: "AI spreadsheet analysis", rating: 4.4, users: "100K+", pricing: "Free/Paid", tags: ["Spreadsheets", "Data"] }
    ]
  },
  { 
    id: 'education',
    name: "Education", 
    icon: GraduationCap, 
    color: "from-green-500 to-lime-500",
    glow: "shadow-green-500/20",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    tools: [
      { name: "Khanmigo", icon: "🎓", description: "AI tutoring assistant", rating: 4.8, users: "2M+", pricing: "Free", tags: ["Education", "Tutoring"] },
      { name: "Quizlet Q-Chat", icon: "📚", description: "AI study assistant", rating: 4.7, users: "1.5M+", pricing: "Free/Paid", tags: ["Study", "Learning"] },
      { name: "Otter.ai", icon: "🦦", description: "Lecture transcription", rating: 4.6, users: "2.8M+", pricing: "Free/Paid", tags: ["Lectures", "Transcription"] },
      { name: "Duolingo Max", icon: "🦉", description: "AI language learning", rating: 4.8, users: "10M+", pricing: "Free/Paid", tags: ["Languages", "Learning"] }
    ]
  }
];

const PremiumCategoryExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [expandedTool, setExpandedTool] = useState(null);

  useEffect(() => {
    // Auto-select first category
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 mb-4 border border-white/10">
          <Rocket className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-white/60">Explore Categories</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Discover AI Tools
          </span>
        </h2>
        <p className="text-white/40 mt-2 text-lg">Click a category to explore the best AI tools in that domain</p>
      </motion.div>

      {/* Category Grid - Top Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat)}
            className={`relative p-4 rounded-2xl border transition-all duration-300 ${
              selectedCategory?.id === cat.id
                ? `${cat.bg} ${cat.border} shadow-lg ${cat.glow}`
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center shadow-lg`}>
              <cat.icon className="w-6 h-6 text-white" />
            </div>
            <p className={`text-xs font-medium mt-2 text-center transition-colors ${
              selectedCategory?.id === cat.id ? 'text-white' : 'text-white/50'
            }`}>
              {cat.name}
            </p>
            {selectedCategory?.id === cat.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-cyan-400"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tools Display Area */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Header */}
            <div className={`relative rounded-2xl p-6 mb-6 ${selectedCategory.bg} border ${selectedCategory.border}`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${selectedCategory.color} flex items-center justify-center shadow-lg`}>
                  <selectedCategory.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCategory.name}</h3>
                  <p className="text-white/50 text-sm">{selectedCategory.tools.length} tools available</p>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCategory.tools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => setHoveredTool(idx)}
                  onMouseLeave={() => setHoveredTool(null)}
                  onClick={() => setExpandedTool(expandedTool === idx ? null : idx)}
                  className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-white/20 ${
                    expandedTool === idx ? 'border-cyan-400/30 shadow-lg shadow-cyan-500/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl flex-shrink-0">{tool.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white text-sm">{tool.name}</h4>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-white/50">{tool.rating}</span>
                        </div>
                      </div>
                      <p className="text-white/40 text-xs mt-0.5">{tool.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tool.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-white/20 transition-transform duration-300 ${
                      expandedTool === idx ? 'rotate-90' : ''
                    }`} />
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedTool === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-white/5"
                      >
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-white/30">Users</p>
                            <p className="text-white/70">{tool.users}</p>
                          </div>
                          <div>
                            <p className="text-white/30">Pricing</p>
                            <p className="text-white/70">{tool.pricing}</p>
                          </div>
                        </div>
                        <button className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PremiumCategoryExplorer;