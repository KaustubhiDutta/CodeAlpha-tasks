import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Palette, FileText, Search, Presentation, Video, 
  Zap, Briefcase, GraduationCap, Sparkles, ArrowRight,
  Star, ExternalLink, Users, TrendingUp, X, ChevronRight,
  Rocket, Cpu, Brain, Layers, Globe, Eye
} from 'lucide-react';
import axios from 'axios';
import { IconContainer, getToolIcon } from '../utils/iconMap.jsx';

const categories = [
  { 
    id: 'coding',
    name: "Coding", 
    icon: Code2, 
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20",
    tools: 24,
    desc: "AI-powered coding assistants",
    toolsList: [
      { name: "GitHub Copilot", icon: "🤖", rating: 4.9, description: "AI-powered code completion", users: "1.2M+", pricing: "Free/Paid", tags: ["Code Gen", "AI Assistant"] },
      { name: "Cursor", icon: "⌨️", rating: 4.9, description: "AI-first code editor", users: "856K+", pricing: "Free/Paid", tags: ["IDE", "Context Aware"] },
      { name: "Codeium", icon: "⚡", rating: 4.6, description: "Free AI code completion", users: "500K+", pricing: "Free", tags: ["Free", "Multi-language"] },
      { name: "Tabnine", icon: "🧩", rating: 4.5, description: "AI code completion tool", users: "400K+", pricing: "Free/Paid", tags: ["Code Gen", "Privacy"] },
      { name: "Amazon Codewhisperer", icon: "☁️", rating: 4.4, description: "AWS AI code generation", users: "300K+", pricing: "Free/Paid", tags: ["AWS", "Enterprise"] },
      { name: "Replit AI", icon: "🔄", rating: 4.3, description: "Online AI coding assistant", users: "200K+", pricing: "Free/Paid", tags: ["Online", "Collaboration"] }
    ]
  },
  { 
    id: 'design',
    name: "Design", 
    icon: Palette, 
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    glowColor: "shadow-pink-500/20",
    tools: 18,
    desc: "Creative AI tools for design",
    toolsList: [
      { name: "Midjourney", icon: "🎨", rating: 4.9, description: "AI image generation", users: "2.4M+", pricing: "Paid", tags: ["Art", "Photorealistic"] },
      { name: "DALL-E 3", icon: "✨", rating: 4.8, description: "Text-to-image generation", users: "1.8M+", pricing: "Paid", tags: ["Text Rendering", "AI Art"] },
      { name: "Adobe Firefly", icon: "🦋", rating: 4.7, description: "AI design integration", users: "1M+", pricing: "Free/Paid", tags: ["Creative Cloud", "Design"] },
      { name: "Canva AI", icon: "🎯", rating: 4.6, description: "AI-powered design", users: "5M+", pricing: "Free/Paid", tags: ["Design", "Social Media"] },
      { name: "Figma AI", icon: "🎨", rating: 4.7, description: "AI UI/UX design", users: "800K+", pricing: "Free/Paid", tags: ["UI/UX", "Prototyping"] },
      { name: "Leonardo AI", icon: "🎯", rating: 4.5, description: "AI art generation", users: "600K+", pricing: "Free/Paid", tags: ["Art", "Free"] }
    ]
  },
  { 
    id: 'writing',
    name: "Writing", 
    icon: FileText, 
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/20",
    tools: 22,
    desc: "AI content creation tools",
    toolsList: [
      { name: "Jasper AI", icon: "📝", rating: 4.7, description: "AI copywriting assistant", users: "500K+", pricing: "Paid", tags: ["Marketing", "Content"] },
      { name: "Copy.ai", icon: "✍️", rating: 4.6, description: "AI-powered copywriting", users: "400K+", pricing: "Free/Paid", tags: ["Copywriting", "Templates"] },
      { name: "Grammarly", icon: "✅", rating: 4.8, description: "AI writing assistant", users: "10M+", pricing: "Free/Paid", tags: ["Grammar", "Editing"] },
      { name: "Claude", icon: "🧠", rating: 4.9, description: "AI writing and reasoning", users: "1.2M+", pricing: "Free/Paid", tags: ["Creative", "Analysis"] },
      { name: "Writesonic", icon: "🖊️", rating: 4.5, description: "AI content writing", users: "300K+", pricing: "Free/Paid", tags: ["Content", "SEO"] },
      { name: "Rytr", icon: "📚", rating: 4.4, description: "Affordable AI writing", users: "200K+", pricing: "Free/Paid", tags: ["Budget", "Content"] }
    ]
  },
  { 
    id: 'research',
    name: "Research", 
    icon: Search, 
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    tools: 15,
    desc: "AI research and analysis tools",
    toolsList: [
      { name: "Perplexity AI", icon: "🔍", rating: 4.8, description: "AI research assistant", users: "5.1M+", pricing: "Free/Paid", tags: ["Citations", "Academic"] },
      { name: "Elicit", icon: "📊", rating: 4.7, description: "AI literature review", users: "100K+", pricing: "Free/Paid", tags: ["Papers", "Research"] },
      { name: "Consensus", icon: "📈", rating: 4.6, description: "AI scientific analysis", users: "80K+", pricing: "Free/Paid", tags: ["Science", "Analysis"] },
      { name: "Scite.ai", icon: "🔬", rating: 4.5, description: "AI citation context", users: "60K+", pricing: "Free/Paid", tags: ["Citations", "Academic"] },
      { name: "Wolfram Alpha", icon: "🧮", rating: 4.7, description: "AI math computation", users: "1M+", pricing: "Free/Paid", tags: ["Math", "Science"] },
      { name: "Tableau GPT", icon: "📊", rating: 4.4, description: "AI data visualization", users: "500K+", pricing: "Paid", tags: ["Analytics", "Data"] }
    ]
  },
  { 
    id: 'presentations',
    name: "Presentations", 
    icon: Presentation, 
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/20",
    tools: 12,
    desc: "AI slide and deck creation",
    toolsList: [
      { name: "Gamma", icon: "✨", rating: 4.9, description: "AI presentation generator", users: "450K+", pricing: "Free/Paid", tags: ["Slides", "AI Design"] },
      { name: "Beautiful.ai", icon: "🎨", rating: 4.8, description: "AI design automation", users: "300K+", pricing: "Free/Paid", tags: ["Design", "Slides"] },
      { name: "Tome AI", icon: "📖", rating: 4.6, description: "AI narrative slides", users: "200K+", pricing: "Free/Paid", tags: ["Storytelling", "Slides"] },
      { name: "Canva AI", icon: "🎯", rating: 4.7, description: "AI presentation design", users: "5M+", pricing: "Free/Paid", tags: ["Design", "Templates"] },
      { name: "Plus AI", icon: "➕", rating: 4.5, description: "AI for Google Slides", users: "150K+", pricing: "Free/Paid", tags: ["Google Slides", "AI"] },
      { name: "Slidesgo AI", icon: "📊", rating: 4.4, description: "AI presentation templates", users: "100K+", pricing: "Free/Paid", tags: ["Templates", "Design"] }
    ]
  },
  { 
    id: 'video',
    name: "Video", 
    icon: Video, 
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    glowColor: "shadow-red-500/20",
    tools: 14,
    desc: "AI video editing and generation",
    toolsList: [
      { name: "Runway ML", icon: "🎬", rating: 4.8, description: "AI video generation", users: "450K+", pricing: "Free/Paid", tags: ["Video Gen", "Editing"] },
      { name: "Pika Labs", icon: "⚡", rating: 4.7, description: "Quick AI video creation", users: "320K+", pricing: "Free/Paid", tags: ["Quick Video", "AI"] },
      { name: "Descript", icon: "🎙️", rating: 4.6, description: "AI video editing", users: "200K+", pricing: "Free/Paid", tags: ["Editing", "Voice"] },
      { name: "Synthesia", icon: "🎥", rating: 4.7, description: "AI avatar videos", users: "180K+", pricing: "Paid", tags: ["Avatars", "Business"] },
      { name: "HeyGen", icon: "🎭", rating: 4.6, description: "AI avatar creator", users: "150K+", pricing: "Free/Paid", tags: ["Avatars", "Talking Heads"] },
      { name: "CapCut", icon: "✂️", rating: 4.5, description: "Free AI video editing", users: "1M+", pricing: "Free", tags: ["Free", "Editing"] }
    ]
  },
  { 
    id: 'productivity',
    name: "Productivity", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    glowColor: "shadow-yellow-500/20",
    tools: 28,
    desc: "AI automation and productivity",
    toolsList: [
      { name: "Motion", icon: "⏰", rating: 4.7, description: "AI calendar scheduler", users: "300K+", pricing: "Paid", tags: ["Calendar", "Automation"] },
      { name: "Otter.ai", icon: "🦦", rating: 4.8, description: "AI meeting transcription", users: "2.8M+", pricing: "Free/Paid", tags: ["Meetings", "Transcription"] },
      { name: "Notion AI", icon: "📝", rating: 4.6, description: "AI note-taking assistant", users: "3.2M+", pricing: "Free/Paid", tags: ["Notes", "Productivity"] },
      { name: "Zapier AI", icon: "⚡", rating: 4.5, description: "AI workflow automation", users: "1.5M+", pricing: "Free/Paid", tags: ["Automation", "Workflows"] },
      { name: "Mem AI", icon: "🧠", rating: 4.4, description: "AI note-taking", users: "200K+", pricing: "Free/Paid", tags: ["Notes", "AI"] },
      { name: "Reclaim.ai", icon: "🔄", rating: 4.3, description: "AI calendar optimization", users: "150K+", pricing: "Free/Paid", tags: ["Calendar", "Productivity"] }
    ]
  },
  { 
    id: 'business',
    name: "Business", 
    icon: Briefcase, 
    color: "from-slate-600 to-gray-600",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    glowColor: "shadow-slate-500/20",
    tools: 19,
    desc: "AI analytics and business tools",
    toolsList: [
      { name: "Tableau GPT", icon: "📊", rating: 4.7, description: "AI data visualization", users: "500K+", pricing: "Paid", tags: ["Analytics", "Data"] },
      { name: "ThoughtSpot", icon: "💡", rating: 4.6, description: "AI conversational analytics", users: "200K+", pricing: "Paid", tags: ["Analytics", "Business"] },
      { name: "HubSpot AI", icon: "🏢", rating: 4.5, description: "AI CRM marketing", users: "800K+", pricing: "Free/Paid", tags: ["CRM", "Marketing"] },
      { name: "Salesforce Einstein", icon: "☁️", rating: 4.6, description: "AI sales intelligence", users: "600K+", pricing: "Paid", tags: ["Sales", "CRM"] },
      { name: "Polymer Search", icon: "🧪", rating: 4.4, description: "AI spreadsheet analysis", users: "100K+", pricing: "Free/Paid", tags: ["Spreadsheets", "Data"] },
      { name: "C3 AI", icon: "🏢", rating: 4.3, description: "AI business insights", users: "80K+", pricing: "Paid", tags: ["Enterprise", "Analytics"] }
    ]
  },
  { 
    id: 'education',
    name: "Education", 
    icon: GraduationCap, 
    color: "from-green-500 to-lime-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    glowColor: "shadow-green-500/20",
    tools: 16,
    desc: "AI learning and tutoring tools",
    toolsList: [
      { name: "Khanmigo", icon: "🎓", rating: 4.8, description: "AI tutoring assistant", users: "2M+", pricing: "Free", tags: ["Education", "Tutoring"] },
      { name: "Quizlet Q-Chat", icon: "📚", rating: 4.7, description: "AI study assistant", users: "1.5M+", pricing: "Free/Paid", tags: ["Study", "Learning"] },
      { name: "Otter.ai", icon: "🦦", rating: 4.6, description: "Lecture transcription", users: "2.8M+", pricing: "Free/Paid", tags: ["Lectures", "Transcription"] },
      { name: "Duolingo Max", icon: "🦉", rating: 4.8, description: "AI language learning", users: "10M+", pricing: "Free/Paid", tags: ["Languages", "Learning"] },
      { name: "Wolfram Alpha", icon: "🧮", rating: 4.7, description: "AI math help", users: "1M+", pricing: "Free/Paid", tags: ["Math", "Science"] },
      { name: "Photomath", icon: "📸", rating: 4.6, description: "AI math solver", users: "2M+", pricing: "Free/Paid", tags: ["Math", "Homework"] }
    ]
  }
];

const CategoryExplorer = ({ fullPage = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedTool, setExpandedTool] = useState(null);

  const handleCategoryClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleToolClick = (tool) => {
    // Open tool link or show more details
    window.open(tool.url || '#', '_blank');
  };

  return (
    <section className={`px-4 py-16 ${fullPage ? 'min-h-screen bg-[#0b1120]' : ''} max-w-7xl mx-auto`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 mb-4 border border-white/10">
          <Rocket className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-white/60">AI Tool Explorer</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">AI Tool Explorer</h2>
        <p className="text-white/40 mt-2">Discover specialized AI tools for every domain</p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory?.id === cat.id;
          const isHovered = hoveredCategory === cat.id;
          
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onMouseEnter={() => setHoveredCategory(cat.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(cat)}
              className={`relative glass-card rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 border ${
                isSelected 
                  ? `bg-gradient-to-br ${cat.color} border-transparent shadow-lg ${cat.glowColor}` 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}

              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <h3 className={`font-semibold transition-colors ${
                isSelected ? 'text-white' : 'text-white group-hover:text-cyan-400'
              }`}>
                {cat.name}
              </h3>
              <p className="text-xs text-white/40 mt-0.5">{cat.desc}</p>
              <p className="text-xs text-white/20 mt-1">{cat.tools} tools</p>

              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-xs text-white/60 flex items-center justify-center gap-1"
                >
                  <span>Click to close</span>
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Category Tools Display */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <div className={`rounded-3xl p-6 border ${selectedCategory.borderColor} ${selectedCategory.bgColor}`}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center shadow-lg`}>
                  <selectedCategory.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCategory.name}</h3>
                  <p className="text-white/50 text-sm">{selectedCategory.desc} • {selectedCategory.tools} tools available</p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-auto p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategory.toolsList.map((tool, idx) => {
                  const IconComponent = getToolIcon(tool.name);
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -3 }}
                      className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group`}
                      onClick={() => handleToolClick(tool)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-white text-sm">{tool.name}</h4>
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-white/60">{tool.rating}</span>
                            </div>
                          </div>
                          <p className="text-white/50 text-xs mt-0.5 line-clamp-2">{tool.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {tool.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className="text-white/30 flex items-center gap-1">
                              <Users className="w-3 h-3" /> {tool.users}
                            </span>
                            <span className="text-white/30">{tool.pricing}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CategoryExplorer;