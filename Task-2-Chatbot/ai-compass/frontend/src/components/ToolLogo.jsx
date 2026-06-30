import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Map of tool names to their logo files
const logoMap = {
  'chatgpt': '/logos/chatgpt.svg',
  'claude': '/logos/claude.svg',
  'gemini': '/logos/gemini.svg',
  'copilot': '/logos/copilot.svg',
  'perplexity': '/logos/perplexity.svg',
  'midjourney': '/logos/midjourney.svg',
  'runway': '/logos/runway.svg',
  'canva': '/logos/canva.svg',
  'notion-ai': '/logos/notion-ai.svg',
  'firefly': '/logos/firefly.svg',
  'cursor': '/logos/cursor.svg',
  'gamma': '/logos/gamma.svg',
  'leonardo': '/logos/leonardo.svg',
  'pika': '/logos/pika.svg',
  'suno': '/logos/suno.svg',
  'heygen': '/logos/heygen.svg',
  'whimsical': '/logos/whimsical.svg',
  'lucidchart': '/logos/lucidchart.svg',
  'miro': '/logos/miro.svg',
  'jasper': '/logos/jasper.svg',
  'copy.ai': '/logos/copy-ai.svg',
  'grammarly': '/logos/grammarly.svg',
  'otter': '/logos/otter.svg',
  'motion': '/logos/motion.svg',
  'zapier': '/logos/zapier.svg',
  'tableau': '/logos/tableau.svg',
  'thoughtspot': '/logos/thoughtspot.svg',
  'khanmigo': '/logos/khanmigo.svg',
  'quizlet': '/logos/quizlet.svg',
  'duolingo': '/logos/duolingo.svg',
  'wolfram': '/logos/wolfram.svg',
  'photomath': '/logos/photomath.svg',
  'elicit': '/logos/elicit.svg',
  'consensus': '/logos/consensus.svg',
  'scite': '/logos/scite.svg',
  'beautiful.ai': '/logos/beautiful-ai.svg',
  'tome': '/logos/tome.svg',
  'descript': '/logos/descript.svg',
  'synthesia': '/logos/synthesia.svg',
};

// Color mapping for fallback avatars
const colorMap = {
  'chatgpt': 'from-emerald-500 to-teal-500',
  'claude': 'from-purple-500 to-indigo-500',
  'gemini': 'from-blue-500 to-cyan-500',
  'copilot': 'from-purple-600 to-indigo-600',
  'perplexity': 'from-indigo-500 to-blue-500',
  'midjourney': 'from-pink-500 to-rose-500',
  'runway': 'from-red-500 to-orange-500',
  'canva': 'from-blue-500 to-sky-500',
  'notion-ai': 'from-gray-700 to-gray-900',
  'firefly': 'from-orange-500 to-red-500',
  'cursor': 'from-cyan-500 to-blue-500',
  'gamma': 'from-purple-500 to-pink-500',
  'leonardo': 'from-blue-500 to-indigo-500',
  'pika': 'from-fuchsia-500 to-pink-500',
  'suno': 'from-amber-500 to-orange-500',
  'heygen': 'from-violet-500 to-purple-500',
  'whimsical': 'from-emerald-500 to-green-500',
  'lucidchart': 'from-blue-500 to-indigo-500',
  'miro': 'from-yellow-500 to-amber-500',
  'jasper': 'from-blue-500 to-purple-500',
  'copy.ai': 'from-cyan-500 to-blue-500',
  'grammarly': 'from-emerald-500 to-green-500',
  'otter': 'from-indigo-500 to-purple-500',
  'motion': 'from-blue-500 to-purple-500',
  'zapier': 'from-orange-500 to-red-500',
  'tableau': 'from-blue-500 to-cyan-500',
  'thoughtspot': 'from-indigo-500 to-purple-500',
  'khanmigo': 'from-blue-500 to-cyan-500',
  'quizlet': 'from-blue-500 to-indigo-500',
  'duolingo': 'from-green-500 to-emerald-500',
  'wolfram': 'from-orange-500 to-red-500',
  'photomath': 'from-blue-500 to-cyan-500',
  'elicit': 'from-emerald-500 to-teal-500',
  'consensus': 'from-blue-500 to-indigo-500',
  'scite': 'from-cyan-500 to-blue-500',
  'beautiful.ai': 'from-pink-500 to-rose-500',
  'tome': 'from-purple-500 to-indigo-500',
  'descript': 'from-blue-500 to-cyan-500',
  'synthesia': 'from-violet-500 to-purple-500',
};

const ToolLogo = ({ 
  name, 
  logo, 
  size = 'md', 
  className = '',
  showName = false,
  fallbackChar,
  ...props 
}) => {
  const [error, setError] = useState(false);
  
  // Determine size
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-28 h-28 text-5xl',
  };
  
  const iconSize = {
    sm: 20,
    md: 28,
    lg: 40,
    xl: 56,
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  // Clean name for logo lookup
  const cleanName = name?.toLowerCase().replace(/[^a-z0-9.-]/g, '') || '';
  
  // Get logo path or use provided logo
  const logoPath = logo || logoMap[cleanName] || null;
  
  // Get color for fallback
  const colors = colorMap[cleanName] || 'from-indigo-500 to-purple-500';
  
  // Get first letter for fallback
  const firstLetter = fallbackChar || name?.charAt(0)?.toUpperCase() || '?';
  
  // Handle logo error
  const handleError = () => {
    setError(true);
  };

  // If logo exists and no error, show SVG
  if (logoPath && !error) {
    return (
      <motion.div
        className={`relative flex-shrink-0 ${className}`}
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        <div className={`${sizeClass} rounded-2xl glass-card flex items-center justify-center p-2 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
          <img 
            src={logoPath} 
            alt={name}
            className="w-full h-full object-contain"
            onError={handleError}
          />
        </div>
        {showName && (
          <span className="block text-xs text-white/60 mt-1 text-center font-medium">
            {name}
          </span>
        )}
      </motion.div>
    );
  }

  // Fallback: Show colored first letter
  return (
    <motion.div
      className={`relative flex-shrink-0 ${className}`}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div 
        className={`${sizeClass} rounded-2xl bg-gradient-to-br ${colors} flex items-center justify-center shadow-lg border border-white/10 hover:border-white/20 transition-all duration-300`}
      >
        <span className="text-white font-bold">{firstLetter}</span>
      </div>
      {showName && (
        <span className="block text-xs text-white/60 mt-1 text-center font-medium">
          {name}
        </span>
      )}
    </motion.div>
  );
};

export default ToolLogo;