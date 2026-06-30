import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { IconContainer } from '../utils/iconMap.jsx';
import { SiOpenai, SiGithub } from 'react-icons/si';
import { RiImageAiLine, RiSearchEyeLine } from 'react-icons/ri';
import { MdOutlineMovieCreation } from 'react-icons/md';
import { TbBrain, TbCursorText } from 'react-icons/tb';

const featuredTools = [
  { 
    name: "GitHub Copilot", 
    category: "Coding", 
    rating: 4.8, 
    description: "Your AI pair programmer", 
    icon: SiGithub,
    features: ["Code Completion", "AI Suggestions"],
    color: "from-purple-600 to-indigo-600"
  },
  { 
    name: "Midjourney", 
    category: "Design", 
    rating: 4.9, 
    description: "AI art generation", 
    icon: RiImageAiLine,
    features: ["Image Gen", "Art"],
    color: "from-pink-500 to-rose-500"
  },
  { 
    name: "Claude 3", 
    category: "Productivity", 
    rating: 4.7, 
    description: "Advanced reasoning", 
    icon: TbBrain,
    features: ["Reasoning", "Analysis"],
    color: "from-purple-500 to-indigo-500"
  },
  { 
    name: "Perplexity", 
    category: "Research", 
    rating: 4.8, 
    description: "Cited answers", 
    icon: RiSearchEyeLine,
    features: ["Research", "Citations"],
    color: "from-indigo-500 to-blue-500"
  },
  { 
    name: "Runway", 
    category: "Video", 
    rating: 4.6, 
    description: "AI video generation", 
    icon: MdOutlineMovieCreation,
    features: ["Video Gen", "Editing"],
    color: "from-red-500 to-orange-500"
  },
  { 
    name: "ChatGPT", 
    category: "AI Assistant", 
    rating: 4.8, 
    description: "Versatile AI assistant", 
    icon: SiOpenai,
    features: ["Conversational", "Multi-purpose"],
    color: "from-emerald-500 to-teal-500"
  }
];

const ToolCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredTools.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredTools.length) % featuredTools.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleTools = featuredTools.slice(currentIndex, currentIndex + 3);
  while (visibleTools.length < 3) {
    visibleTools.push(featuredTools[(currentIndex + visibleTools.length) % featuredTools.length]);
  }

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
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">Editor's Pick</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Featured AI Tools
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </motion.div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0.5, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.5, x: -direction * 50 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visibleTools.map((tool, idx) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.name + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <IconContainer icon={IconComponent} size="lg" glowColor="cyan" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg">{tool.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(tool.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-white/40">{tool.rating}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                      {tool.category}
                    </span>
                  </div>
                </div>

                <p className="text-white/50 text-sm mt-3">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {tool.features.map((feature, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2">
                  Try Now <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {featuredTools.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolCarousel;