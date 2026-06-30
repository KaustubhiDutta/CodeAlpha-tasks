import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';

const newsData = [
  {
    title: "Claude 3.5 Sonnet Released",
    category: "Model Release",
    description: "Anthropic's latest model with superior reasoning and 200K context window.",
    date: "2 days ago",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "OpenAI o1 Chain-of-Thought",
    category: "Innovation",
    description: "New reasoning model with step-by-step problem solving capabilities.",
    date: "5 days ago",
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Midjourney v6.1 Released",
    category: "Tool Launch",
    description: "Improved photorealism and prompt understanding in image generation.",
    date: "1 week ago",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Google Gemini 1.5 Pro",
    category: "Model Update",
    description: "2M token context window with enhanced multimodal capabilities.",
    date: "2 weeks ago",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Mistral Large 2 Released",
    category: "Open Source",
    description: "High-performance open-weight model competing with GPT-4.",
    date: "3 weeks ago",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Runway Gen-3 Alpha",
    category: "Tool Launch",
    description: "Advanced text-to-video generation with improved temporal consistency.",
    date: "1 month ago",
    color: "from-cyan-500 to-blue-500"
  }
];

const AINewsSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-500" />
            AI News & Updates
          </h2>
          <p className="text-slate-500 mt-1">Stay ahead with the latest in AI</p>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
          View All →
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all border border-slate-200/60"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{item.title}</h3>
            <p className="text-xs text-slate-500 mb-2">{item.category}</p>
            <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {item.date}
              </span>
              <button className="text-indigo-600 hover:text-indigo-500 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AINewsSection;