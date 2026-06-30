import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { IconContainer, getToolIcon } from '../utils/iconMap.jsx';
import { TbCursorText, TbBrain } from 'react-icons/tb';
import { RiImageAiLine, RiSearchEyeLine } from 'react-icons/ri';
import { MdOutlineMovieCreation } from 'react-icons/md';
import { SiNotion } from 'react-icons/si';
import { BsSoundwave } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';

const TrendingSection = () => {
  const [tools, setTools] = useState([]);

  // Fallback data with proper icons
  const fallbackTools = [
    { 
      name: "Cursor IDE", 
      category: "Coding", 
      description: "AI-first code editor with context awareness", 
      icon: TbCursorText,
      users: "856K+", 
      trend: "+112%",
      rating: 4.9,
      tags: ["IDE", "AI Assistant"],
      pricing: "Free / Paid"
    },
    { 
      name: "Claude 3.5", 
      category: "AI Assistant", 
      description: "Constitutional AI by Anthropic, best reasoning", 
      icon: TbBrain,
      users: "1.2M+", 
      trend: "+47%",
      rating: 4.9,
      tags: ["Reasoning", "Analysis"],
      pricing: "Free / Paid"
    },
    { 
      name: "Midjourney v6", 
      category: "Design", 
      description: "Photorealistic image generation", 
      icon: RiImageAiLine,
      users: "2.4M+", 
      trend: "+38%",
      rating: 4.8,
      tags: ["Image Gen", "Art"],
      pricing: "Paid"
    },
    { 
      name: "Perplexity Pro", 
      category: "Research", 
      description: "Cited answers with academic sources", 
      icon: RiSearchEyeLine,
      users: "5.1M+", 
      trend: "+89%",
      rating: 4.8,
      tags: ["Research", "Citations"],
      pricing: "Free / Paid"
    },
    { 
      name: "Pika 2.0", 
      category: "Video", 
      description: "Quick AI video creation", 
      icon: MdOutlineMovieCreation,
      users: "320K+", 
      trend: "+156%",
      rating: 4.7,
      tags: ["Video Gen", "Quick"],
      pricing: "Free / Paid"
    },
    { 
      name: "Gamma AI", 
      category: "Presentations", 
      description: "AI-powered presentation generation", 
      icon: IoSparkles,
      users: "450K+", 
      trend: "+76%",
      rating: 4.8,
      tags: ["Slides", "AI Design"],
      pricing: "Free / Paid"
    },
    { 
      name: "Notion AI", 
      category: "Productivity", 
      description: "AI-powered note-taking and project management", 
      icon: SiNotion,
      users: "3.2M+", 
      trend: "+43%",
      rating: 4.6,
      tags: ["Notes", "Productivity"],
      pricing: "Free / Paid"
    },
    { 
      name: "Suno AI", 
      category: "Creative", 
      description: "AI music generation from text", 
      icon: BsSoundwave,
      users: "250K+", 
      trend: "+189%",
      rating: 4.7,
      tags: ["Music", "Generation"],
      pricing: "Free / Paid"
    }
  ];

  useEffect(() => {
    axios.get('/api/faq/trending')
      .then(res => {
        const mappedTools = res.data.map(tool => ({
          ...tool,
          icon: getToolIcon(tool.name)
        }));
        setTools(mappedTools);
      })
      .catch(() => {
        setTools(fallbackTools);
      });
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-orange-400 uppercase tracking-wider">Trending Now</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Most Popular AI Tools
          </h2>
        </div>
        <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-sm">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Trending Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool, idx) => {
          const IconComponent = tool.icon || getToolIcon(tool.name);
          return (
            <div key={tool.name} className="glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <IconContainer icon={IconComponent} size="md" glowColor="cyan" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-white text-sm truncate">{tool.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                        {tool.category}
                      </span>
                    </div>
                    {tool.rating && (
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <span className="text-xs text-white/60">{tool.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mt-1 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    {tool.users && (
                      <span className="text-white/30 flex items-center gap-1">
                        {tool.users}
                      </span>
                    )}
                    {tool.trend && (
                      <span className="text-emerald-400 flex items-center gap-1">
                        {tool.trend}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingSection;