import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';
import ToolLogo from './ToolLogo';

const RecommendationCard = ({ 
  tool,
  index = 0,
  reason,
  bestFor,
  onExplore
}) => {
  const {
    name,
    description,
    rating,
    logo,
    url,
    category
  } = tool;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <ToolLogo 
          name={name} 
          logo={logo} 
          size="md" 
          className="flex-shrink-0"
        />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">{name}</h4>
              {category && (
                <span className="text-xs text-slate-400">{category}</span>
              )}
            </div>
            {rating && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-slate-700">{rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{description}</p>
          
          {/* Best For */}
          {bestFor && (
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-slate-500">
                <span className="font-medium">Best For:</span> {bestFor}
              </span>
            </div>
          )}
          
          {/* Why Recommended */}
          {reason && (
            <div className="flex items-start gap-1 mt-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-500">
                <span className="font-medium">Why Recommended:</span> {reason}
              </span>
            </div>
          )}
          
          {/* Action */}
          <button 
            onClick={() => onExplore?.(tool)}
            className="mt-2 text-xs text-indigo-600 hover:text-indigo-500 font-medium flex items-center gap-1 transition-colors"
          >
            Learn More <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;