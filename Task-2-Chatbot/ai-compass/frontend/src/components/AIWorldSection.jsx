import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Cpu, Sparkles, Code, Zap, Eye, Newspaper, Briefcase } from 'lucide-react';

const categories = [
  {
    title: "AI Basics",
    icon: BookOpen,
    description: "Learn the fundamentals of artificial intelligence, machine learning, and neural networks.",
    color: "from-blue-500 to-cyan-500",
    readMore: "/learn/ai-basics"
  },
  {
    title: "Prompt Engineering",
    icon: Brain,
    description: "Master the art of crafting effective prompts for LLMs and generative AI models.",
    color: "from-purple-500 to-pink-500",
    readMore: "/learn/prompt-engineering"
  },
  {
    title: "Generative AI",
    icon: Sparkles,
    description: "Explore the world of AI that creates text, images, music, and video.",
    color: "from-pink-500 to-rose-500",
    readMore: "/learn/generative-ai"
  },
  {
    title: "LLMs & Transformers",
    icon: Cpu,
    description: "Understand Large Language Models and the Transformer architecture.",
    color: "from-indigo-500 to-purple-500",
    readMore: "/learn/llms"
  },
  {
    title: "AI Agents",
    icon: Zap,
    description: "Learn about autonomous AI agents that can perform complex tasks.",
    color: "from-yellow-500 to-orange-500",
    readMore: "/learn/ai-agents"
  },
  {
    title: "Computer Vision",
    icon: Eye,
    description: "Discover how AI perceives and understands visual information.",
    color: "from-green-500 to-emerald-500",
    readMore: "/learn/computer-vision"
  },
  {
    title: "AI News",
    icon: Newspaper,
    description: "Stay updated with the latest AI breakthroughs and industry developments.",
    color: "from-red-500 to-rose-500",
    readMore: "/learn/ai-news"
  },
  {
    title: "AI Careers",
    icon: Briefcase,
    description: "Explore career paths in AI and learn the skills needed to succeed.",
    color: "from-slate-500 to-gray-500",
    readMore: "/learn/ai-careers"
  }
];

const AIWorldSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Explore AI World
        </h2>
        <p className="text-slate-400 mt-2">Learn, understand, and master artificial intelligence</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
            <p className="text-sm text-slate-400 mb-4 line-clamp-2">{category.description}</p>
            <button className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AIWorldSection;