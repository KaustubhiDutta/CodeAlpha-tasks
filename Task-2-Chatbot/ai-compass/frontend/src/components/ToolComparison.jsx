import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const comparisonData = {
  "chatgpt vs claude": {
    tools: ["ChatGPT", "Claude 3.5"],
    features: [
      { name: "Context Window", values: ["128K", "200K"] },
      { name: "Coding Ability", values: ["Excellent", "Superior"] },
      { name: "Creative Writing", values: ["Good", "Excellent"] },
      { name: "Web Browsing", values: ["Yes", "No"] },
      { name: "Image Generation", values: ["DALL-E 3", "No"] },
      { name: "Pricing", values: ["Free / $20/mo", "Free / $20/mo"] },
      { name: "Best For", values: ["General Use", "Complex Reasoning"] }
    ]
  }
};

const ToolComparison = ({ query }) => {
  const [expanded, setExpanded] = useState(true);
  const matchedComparison = comparisonData["chatgpt vs claude"];

  if (!matchedComparison) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Tool Comparison</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
              {/* Header */}
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <p className="text-xs text-slate-400 font-medium">Features</p>
              </div>
              {matchedComparison.tools.map((tool, idx) => (
                <div key={idx} className={`p-3 rounded-xl ${idx === 0 ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-purple-500/10 border border-purple-500/20'}`}>
                  <p className="font-medium text-white">{tool}</p>
                </div>
              ))}

              {/* Feature rows */}
              {matchedComparison.features.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3 bg-slate-800/30 rounded-xl">
                    <p className="text-sm text-slate-300">{feature.name}</p>
                  </div>
                  {feature.values.map((value, valIdx) => (
                    <div key={valIdx} className="p-3 flex items-center gap-2">
                      <p className="text-sm text-slate-300">{value}</p>
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

export default ToolComparison;