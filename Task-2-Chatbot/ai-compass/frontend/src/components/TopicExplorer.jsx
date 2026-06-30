import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Cpu, Network, Sparkles, PenTool, 
  Search, Scale, Newspaper, Rocket, Code, 
  Palette, Video, Zap, Building, ChevronRight,
  Compass
} from 'lucide-react';
import axios from 'axios';

const topicIcons = {
  'ai-basics': Brain,
  'machine-learning': Cpu,
  'deep-learning': Network,
  'generative-ai': Sparkles,
  'prompt-engineering': PenTool,
  'tool-discovery': Search,
  'tool-comparison': Scale,
  'ai-news': Newspaper,
  'ai-careers': Rocket,
  'coding-assistants': Code,
  'image-generation': Palette,
  'video-generation': Video,
  'productivity-tools': Zap,
  'business-tools': Building
};

const topicColors = {
  'ai-basics': 'from-blue-500 to-cyan-500',
  'machine-learning': 'from-purple-500 to-indigo-500',
  'deep-learning': 'from-pink-500 to-rose-500',
  'generative-ai': 'from-amber-500 to-orange-500',
  'prompt-engineering': 'from-emerald-500 to-teal-500',
  'tool-discovery': 'from-indigo-500 to-blue-500',
  'tool-comparison': 'from-yellow-500 to-amber-500',
  'ai-news': 'from-red-500 to-rose-500',
  'ai-careers': 'from-green-500 to-emerald-500',
  'coding-assistants': 'from-cyan-500 to-blue-500',
  'image-generation': 'from-pink-500 to-rose-500',
  'video-generation': 'from-red-500 to-orange-500',
  'productivity-tools': 'from-yellow-500 to-amber-500',
  'business-tools': 'from-slate-600 to-gray-600'
};

const TopicExplorer = ({ onSelectTopic, selectedTopic }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/faq/datasets')
      .then(res => {
        setTopics(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback data
        setTopics([
          { id: 'ai-basics', label: 'AI Basics', icon: '🧠' },
          { id: 'machine-learning', label: 'Machine Learning', icon: '📊' },
          { id: 'deep-learning', label: 'Deep Learning', icon: '🧬' },
          { id: 'generative-ai', label: 'Generative AI', icon: '✨' },
          { id: 'prompt-engineering', label: 'Prompt Engineering', icon: '✍️' },
          { id: 'tool-discovery', label: 'Tool Discovery', icon: '🔍' },
          { id: 'tool-comparison', label: 'Tool Comparisons', icon: '⚖️' },
          { id: 'ai-news', label: 'AI News', icon: '📰' },
          { id: 'ai-careers', label: 'Career Roadmaps', icon: '🚀' },
          { id: 'coding-assistants', label: 'Coding Tools', icon: '💻' },
          { id: 'image-generation', label: 'Image Generation', icon: '🎨' },
          { id: 'video-generation', label: 'Video Generation', icon: '🎬' },
          { id: 'productivity-tools', label: 'Productivity Tools', icon: '⚡' },
          { id: 'business-tools', label: 'Business Tools', icon: '🏢' }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-bold text-white">Explore Topics</h2>
        <span className="text-sm text-white/30">Select a topic to focus your learning</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {topics.map((topic) => {
          const IconComponent = topicIcons[topic.id] || Compass;
          const isSelected = selectedTopic === topic.id;
          const colorClass = topicColors[topic.id] || 'from-indigo-500 to-purple-500';
          
          return (
            <motion.button
              key={topic.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTopic?.(isSelected ? null : topic.id)}
              className={`relative p-3 rounded-2xl border transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-br ${colorClass} border-transparent shadow-lg shadow-indigo-500/20` 
                  : 'bg-white/5 border-white/10 hover:border-indigo-400/30'
              }`}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-white/20' : 'bg-white/5'
                }`}>
                  <IconComponent className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white/60'}`} />
                </div>
                <span className={`text-xs font-medium text-center ${
                  isSelected ? 'text-white' : 'text-white/60'
                }`}>
                  {topic.label}
                </span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                    <span className="text-[10px] text-white">✓</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicExplorer;