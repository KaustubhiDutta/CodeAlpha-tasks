import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const TranslationCard = ({ children, className = '' }) => {
  return (
    <GlassCard className={`p-6 md:p-8 ${className}`}>
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-sky-400/20 to-teal-400/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-tr from-teal-400/20 to-sky-400/20 rounded-full blur-2xl" />
        
        {children}
      </div>
    </GlassCard>
  );
};

export default TranslationCard;