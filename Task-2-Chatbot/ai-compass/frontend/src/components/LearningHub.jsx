import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Cpu, Network, Sparkles, PenTool, 
  Search, Scale, Newspaper, Rocket, Code, 
  Palette, Video, Zap, Building, GraduationCap,
  ArrowRight, Clock, Filter,
  ChevronDown, ChevronUp, Grid3x3, List
} from 'lucide-react';

// ============================================================
// TOPIC DATA
// ============================================================

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

const topicDescriptions = {
  'ai-basics': 'Understand what artificial intelligence is',
  'machine-learning': 'Learn how machines learn from data',
  'deep-learning': 'Explore neural networks and deep learning',
  'generative-ai': 'Discover how AI creates images, text, music',
  'prompt-engineering': 'Master the art of crafting effective prompts',
  'tool-discovery': 'Find the best AI tools for any task',
  'tool-comparison': 'Compare different AI tools side by side',
  'ai-news': 'Stay updated with the latest AI trends',
  'ai-careers': 'Explore career paths and roadmaps in AI',
  'coding-assistants': 'Discover AI tools for developers',
  'image-generation': 'Explore AI tools for creating images',
  'video-generation': 'Discover AI tools for creating videos',
  'productivity-tools': 'Find AI tools to boost productivity',
  'business-tools': 'Discover AI tools for business'
};

const topicLevels = {
  'ai-basics': 'Beginner',
  'machine-learning': 'Intermediate',
  'deep-learning': 'Advanced',
  'generative-ai': 'Intermediate',
  'prompt-engineering': 'Beginner',
  'tool-discovery': 'Beginner',
  'tool-comparison': 'Intermediate',
  'ai-news': 'Beginner',
  'ai-careers': 'Intermediate',
  'coding-assistants': 'Intermediate',
  'image-generation': 'Beginner',
  'video-generation': 'Intermediate',
  'productivity-tools': 'Beginner',
  'business-tools': 'Intermediate'
};

const topicDurations = {
  'ai-basics': '10min',
  'machine-learning': '20min',
  'deep-learning': '30min',
  'generative-ai': '15min',
  'prompt-engineering': '12min',
  'tool-discovery': '10min',
  'tool-comparison': '15min',
  'ai-news': '10min',
  'ai-careers': '20min',
  'coding-assistants': '15min',
  'image-generation': '12min',
  'video-generation': '15min',
  'productivity-tools': '10min',
  'business-tools': '15min'
};

const topicQuestions = {
  'ai-basics': ["What is AI?", "How does AI work?", "What are the types of AI?"],
  'machine-learning': ["What is ML?", "What is supervised learning?", "What is unsupervised learning?"],
  'deep-learning': ["What is Deep Learning?", "What are neural networks?", "What is a CNN?"],
  'generative-ai': ["What is Generative AI?", "What are LLMs?", "What is ChatGPT?"],
  'prompt-engineering': ["What is Prompt Engineering?", "How to write effective prompts?", "What are prompt templates?"],
  'tool-discovery': ["Best AI tools overall?", "Most popular AI tools?", "Best free AI tools?"],
  'tool-comparison': ["ChatGPT vs Claude?", "Gemini vs ChatGPT?", "Cursor vs GitHub Copilot?"],
  'ai-news': ["Latest AI tools?", "Latest AI breakthroughs?", "Latest OpenAI updates?"],
  'ai-careers': ["Careers in AI?", "AI Engineer roadmap?", "ML Engineer roadmap?"],
  'coding-assistants': ["Best AI for coding?", "Best AI code assistants?", "Best AI debugging tools?"],
  'image-generation': ["Best AI image generators?", "How to generate AI art?", "Best AI for illustrations?"],
  'video-generation': ["Best AI video generators?", "Best AI for YouTube?", "Best AI avatar creators?"],
  'productivity-tools': ["Best AI for productivity?", "Best AI for meetings?", "Best AI for email?"],
  'business-tools': ["Best AI for startups?", "Best AI for marketing?", "Best AI for sales?"]
};

// ============================================================
// LEARNING HUB COMPONENT
// ============================================================

const LearningHub = ({ onLearnTopic, selectedTopic, onSelectTopic }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const learningTopics = [
    { id: 'ai-basics', title: 'AI Basics', icon: Brain },
    { id: 'machine-learning', title: 'Machine Learning', icon: Cpu },
    { id: 'deep-learning', title: 'Deep Learning', icon: Network },
    { id: 'generative-ai', title: 'Generative AI', icon: Sparkles },
    { id: 'prompt-engineering', title: 'Prompt Engineering', icon: PenTool },
    { id: 'tool-discovery', title: 'Tool Discovery', icon: Search },
    { id: 'tool-comparison', title: 'Tool Comparisons', icon: Scale },
    { id: 'ai-news', title: 'AI News', icon: Newspaper },
    { id: 'ai-careers', title: 'Career Roadmaps', icon: Rocket },
    { id: 'coding-assistants', title: 'Coding Tools', icon: Code },
    { id: 'image-generation', title: 'Image Generation', icon: Palette },
    { id: 'video-generation', title: 'Video Generation', icon: Video },
    { id: 'productivity-tools', title: 'Productivity Tools', icon: Zap },
    { id: 'business-tools', title: 'Business Tools', icon: Building }
  ];

  useEffect(() => {
    setTopics(learningTopics);
    setLoading(false);
  }, []);

  const getTopicIcon = (id) => topicIcons[id] || Compass;
  const getTopicColor = (id) => topicColors[id] || 'from-indigo-500 to-purple-500';
  const getTopicDescription = (id) => topicDescriptions[id] || 'Learn about this AI topic';
  const getTopicLevel = (id) => topicLevels[id] || 'Beginner';
  const getTopicDuration = (id) => topicDurations[id] || '15min';
  const getTopicQuestions = (id) => topicQuestions[id] || ['What is this topic?'];

  const handleTopicSelect = (topicId) => {
    if (selectedTopic === topicId) {
      onSelectTopic?.(null);
    } else {
      onSelectTopic?.(topicId);
      const topic = learningTopics.find(t => t.id === topicId);
      if (topic) {
        const topicWithQuestions = { ...topic, questions: getTopicQuestions(topic.id) };
        onLearnTopic?.(topicWithQuestions);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      </div>
    );
  }

  const visibleTopics = expandedSection ? learningTopics : learningTopics.slice(0, 6);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full px-3 py-1 mb-2 border border-indigo-400/30">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-400">Learn AI</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">AI Learning Hub</h2>
          <p className="text-white/40 text-sm mt-1">Master AI concepts from basics to advanced</p>
        </div>
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {viewMode === 'grid' ? <List className="w-4 h-4 text-white/60" /> : <Grid3x3 className="w-4 h-4 text-white/60" />}
        </button>
      </motion.div>

      {/* Categories */}
      <div className="mb-8">
        <button
          onClick={() => setExpandedSection(!expandedSection)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors mb-4"
        >
          <Filter className="w-4 h-4" />
          <span>{expandedSection ? 'Show Less' : 'Show All Categories'}</span>
          {expandedSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          <motion.div
            layout
            className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7' : 'grid-cols-1'} gap-2`}
          >
            {visibleTopics.map((topic) => {
              const IconComponent = getTopicIcon(topic.id);
              const colorClass = getTopicColor(topic.id);
              const isSelected = selectedTopic === topic.id;
              
              return (
                <motion.button
                  key={topic.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={`relative p-3 rounded-xl border transition-all duration-300 ${
                    isSelected 
                      ? `bg-gradient-to-br ${colorClass} border-transparent shadow-lg shadow-indigo-500/20` 
                      : 'bg-white/5 border-white/10 hover:border-indigo-400/30'
                  } ${viewMode === 'list' ? 'flex items-center gap-3' : ''}`}
                >
                  {viewMode === 'list' ? (
                    <>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
                        {topic.title}
                      </span>
                      <span className="ml-auto text-xs text-white/30">{getTopicLevel(topic.id)}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                          <span className="text-[8px] text-white">✓</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mx-auto mb-1.5`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-xs font-medium text-center block ${isSelected ? 'text-white' : 'text-white/70'}`}>
                        {topic.title}
                      </span>
                      <span className={`text-[10px] text-center block ${isSelected ? 'text-white/60' : 'text-white/30'}`}>
                        {getTopicLevel(topic.id)}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                          <span className="text-[10px] text-white">✓</span>
                        </div>
                      )}
                    </>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {selectedTopic && (
          <div className="mt-3 flex items-center gap-2 text-sm text-indigo-400">
            <span>📍 Currently learning: {learningTopics.find(t => t.id === selectedTopic)?.title}</span>
            <button
              onClick={() => {
                onSelectTopic?.(null);
                onLearnTopic?.(null);
              }}
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* View All Link */}
      {!expandedSection && learningTopics.length > 6 && (
        <button
          onClick={() => setExpandedSection(true)}
          className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 mx-auto block"
        >
          View all {learningTopics.length} topics
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </section>
  );
};

export default LearningHub;