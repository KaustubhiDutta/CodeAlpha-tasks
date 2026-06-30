import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Compass, Home, Grid, MessageCircle, 
  TrendingUp, Sparkles, BookOpen, Newspaper, 
  Zap, Settings, LogOut, Rocket, Layers, BarChart3,
  Users, Code, Palette, FileText, Search, Video
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, setActiveSection }) {
  const navItems = [
    { icon: Home, label: "Home", section: "home", badge: null },
    { icon: Grid, label: "Graph", section: "explore", badge: "new" },
    { icon: MessageCircle, label: "AI Chat", section: "chat", badge: null },
    { icon: TrendingUp, label: "Tools", section: "home", badge: "🔥" },
    { icon: Users, label: "Community", section: "home", badge: null },
  ];

  const quickTools = [
    { icon: Code, label: "Code Editor", color: "text-cyan-400" },
    { icon: Palette, label: "Design", color: "text-purple-400" },
    { icon: FileText, label: "Writing", color: "text-pink-400" },
    { icon: Search, label: "Research", color: "text-emerald-400" },
    { icon: Video, label: "Video", color: "text-red-400" },
    { icon: BarChart3, label: "Analytics", color: "text-orange-400" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-[#0b1120] border-r border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">AI Compass</span>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.section)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all group"
                >
                  <item.icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      item.badge === 'new' ? 'bg-indigo-500/20 text-indigo-400' :
                      item.badge === '🔥' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}

              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs text-white/30 px-4 mb-3">Quick Tools</p>
                {quickTools.map((tool, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all group"
                  >
                    <tool.icon className={`w-4 h-4 ${tool.color}`} />
                    <span className="text-sm">{tool.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white">AI Discovery</span>
                </div>
                <p className="text-xs text-white/30">NLP • TF-IDF • Cosine Similarity</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs text-cyan-400">Active</span>
                  <span className="text-xs text-white/20 ml-auto">v2.0</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}