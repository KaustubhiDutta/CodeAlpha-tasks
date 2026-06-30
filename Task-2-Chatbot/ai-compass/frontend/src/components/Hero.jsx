import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
  if (!searchQuery.trim()) return;

  onSearch(searchQuery);
};
  return (
    <section className="relative px-4 pt-20 pb-16 lg:pt-32 lg:pb-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-2 mb-6 border border-indigo-100"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">AI Discovery Engine</span>
        </motion.div>

        <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
          Discover the Right<br />
          AI Tool in Seconds
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Navigate the AI landscape with confidence. Get personalized recommendations from 100+ curated AI tools.
        </p>

        <div className="max-w-2xl mx-auto search-glow">
          <div className="glass-card rounded-2xl p-1 flex items-center gap-2">
            <div className="pl-4">
              <Search className="w-5 h-5 text-indigo-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything... e.g., 'Best AI for video editing' or 'ChatGPT alternatives'"
              className="flex-1 py-4 px-2 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              onKeyDown={(e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
}}
            />
            <motion.button
  onClick={handleSearch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              Ask AI Compass <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          <span className="px-3 py-1 bg-white/50 rounded-full">✨ 10k+ tools analyzed</span>
          <span className="px-3 py-1 bg-white/50 rounded-full">🎯 95% match accuracy</span>
          <span className="px-3 py-1 bg-white/50 rounded-full">⚡ Real-time NLP matching</span>
        </div>
      </motion.div>
    </section>
  );
}