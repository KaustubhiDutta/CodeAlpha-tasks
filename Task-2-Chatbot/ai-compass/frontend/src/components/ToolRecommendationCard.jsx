import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Zap, Users, DollarSign } from 'lucide-react';

const ToolRecommendationCard = ({ tool, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 hover:border-indigo-500/50 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl flex-shrink-0">
          {tool.icon || '🔧'}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-lg">{tool.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < tool.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
              ))}
            </div>
            <span className="text-xs text-slate-400">({tool.reviews || 0})</span>
          </div>
          <p className="text-sm text-slate-400 mt-2 line-clamp-2">{tool.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tool.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-full text-slate-300">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {tool.users || '1K+'} users
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> {tool.pricing || 'Free / Paid'}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" /> {tool.difficulty || 'Beginner'}
            </span>
          </div>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
        </a>
      </div>
    </motion.div>
  );
};

export default ToolRecommendationCard;