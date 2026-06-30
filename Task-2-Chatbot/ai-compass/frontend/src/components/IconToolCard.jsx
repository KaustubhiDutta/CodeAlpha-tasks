import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, TrendingUp, Users } from 'lucide-react';
import { IconContainer, getToolIcon, getCategoryIcon } from '../utils/iconMap.jsx';

const IconToolCard = ({ 
  tool,
  index = 0,
  className = '',
  onExplore
}) => {
  const {
    name,
    description,
    category,
    rating,
    users,
    trend,
    icon,
    tags = [],
    pricing
  } = tool;

  const IconComponent = typeof icon === 'function' ? icon : getToolIcon(name);
  const CategoryIcon = getCategoryIcon(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`glass-card rounded-2xl p-5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 ${className}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <IconContainer icon={IconComponent} size="md" glowColor="cyan" />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-white text-sm truncate">{name}</h4>
              {category && (
                <div className="flex items-center gap-1 mt-0.5">
                  <CategoryIcon className="w-3 h-3 text-white/30" />
                  <span className="text-[10px] text-white/40">{category}</span>
                </div>
              )}
            </div>
            {rating && (
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white/60">{rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-white/50 text-xs mt-1 line-clamp-2">{description}</p>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Stats */}
          <div className="flex items-center gap-3 mt-2 text-xs">
            {users && (
              <span className="text-white/30 flex items-center gap-1">
                <Users className="w-3 h-3" /> {users}
              </span>
            )}
            {trend && (
              <span className="text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {trend}
              </span>
            )}
            {pricing && (
              <span className="text-white/30">{pricing}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => onExplore?.(tool)}
        className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group"
      >
        Explore Tool
        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  );
};

export default IconToolCard;