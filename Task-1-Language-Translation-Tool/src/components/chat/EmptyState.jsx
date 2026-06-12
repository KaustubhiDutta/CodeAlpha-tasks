import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, Sparkles, Compass } from 'lucide-react';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full text-center p-6"
    >
      <div className="relative">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="w-24 h-24 bg-gradient-to-br from-sky-100 to-teal-100 dark:from-sky-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center"
        >
          <Compass className="w-12 h-12 text-sky-500 animate-float" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <MessageCircle className="w-4 h-4 text-white" />
        </motion.div>
      </div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6"
      >
        Ready to Explore?
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 dark:text-gray-500 text-sm mt-2 max-w-xs"
      >
        Select a destination, type your message, and watch your words take flight
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3 mt-6"
      >
        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-teal-50 dark:from-gray-800 dark:to-gray-800">
          <Globe className="w-3 h-3 text-sky-500" />
          <span>50+ Languages</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-teal-50 dark:from-gray-800 dark:to-gray-800">
          <Sparkles className="w-3 h-3 text-teal-500" />
          <span>AI Powered</span>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-3 bg-gradient-to-r from-sky-50 to-teal-50 dark:from-sky-900/20 dark:to-teal-900/20 rounded-xl"
      >
        <p className="text-xs text-sky-600 dark:text-sky-400">
          💡 Try: "Where is the nearest hotel?" or "How much does this cost?"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;