import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, X, Star } from 'lucide-react';
import { IconContainer } from '../utils/iconMap.jsx';

const AIComparisonCard = ({ tools, comparisonData }) => {
  const [expanded, setExpanded] = useState(true);

  if (!tools || tools.length < 2) return null;

  const features = [
    { name: "Best For", key: "bestFor" },
    { name: "Coding", key: "coding" },
    { name: "Writing", key: "writing" },
    { name: "Reasoning", key: "reasoning" },
    { name: "Research", key: "research" },
    { name: "Pricing", key: "pricing" },
    { name: "Strengths", key: "strengths" },
    { name: "Weaknesses", key: "weaknesses" }
  ];

  const toolIcons = tools.map(t => t.icon || '🔧');
  const toolNames = tools.map(t => t.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          Tool Comparison
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4 text-white/60" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Headers */}
              <div className="p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-white/40 font-medium">Features</p>
              </div>
              {toolNames.map((name, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{toolIcons[idx]}</span>
                    <p className="font-medium text-white">{name}</p>
                  </div>
                </div>
              ))}

              {/* Feature rows */}
              {features.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3 bg-white/5 rounded-xl">
                    <p className="text-sm text-white/60">{feature.name}</p>
                  </div>
                  {tools.map((tool, toolIdx) => (
                    <div key={toolIdx} className="p-3 flex items-center">
                      <p className="text-sm text-white/80">
                        {tool[feature.key] || '—'}
                      </p>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIComparisonCard;