import React from 'react';
import { motion } from 'framer-motion';
import { Languages, Sparkles } from 'lucide-react';
import { getLanguageName } from '../../utils/languageMap';

const LanguageIndicator = ({ detectedLang, sourceText }) => {
  if (!detectedLang || !sourceText.trim()) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 flex items-center justify-between"
    >
      <div className="flex items-center gap-1.5 text-xs">
        <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
          <Sparkles className="w-3 h-3 text-green-500" />
          <span className="text-green-600 dark:text-green-400 font-medium">Auto-detected</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 px-2 py-1 bg-sky-50 dark:bg-sky-900/20 rounded-full">
        <Languages className="w-3 h-3 text-sky-500" />
        <span className="text-xs text-sky-600 dark:text-sky-400">
          {getLanguageName(detectedLang)} ({detectedLang.toUpperCase()})
        </span>
      </div>
    </motion.div>
  );
};

export default LanguageIndicator;