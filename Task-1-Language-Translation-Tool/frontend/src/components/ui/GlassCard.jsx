import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', animate = true }) => {
  const CardContent = (
    <div className={`relative backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl ${className}`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
      >
        {CardContent}
      </motion.div>
    );
  }

  return CardContent;
};

export default GlassCard;