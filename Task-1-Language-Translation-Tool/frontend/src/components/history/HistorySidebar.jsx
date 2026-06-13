import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChevronRight, Trash2, History } from 'lucide-react';

const HistorySidebar = ({ isOpen, history, onClose, onItemClick }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-sky-50 to-teal-50 dark:from-gray-800 dark:to-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-teal-500 rounded-lg flex items-center justify-center">
                  <History className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200">Translation History</h2>
                  <p className="text-xs text-gray-400">{history.length} saved translations</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* History List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {history.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">No translations yet</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Your translations will appear here
                  </p>
                </motion.div>
              ) : (
                history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => onItemClick(item)}
                    className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-sky-50 hover:to-teal-50 dark:hover:from-gray-800 dark:hover:to-gray-800 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{item.targetFlag || '🌍'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                          {item.sourceText}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                          → {item.translatedText}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                              {item.sourceLang?.toUpperCase()}
                            </span>
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                            <span className="text-[10px] px-1.5 py-0.5 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                              {item.targetLang?.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {/* Footer */}
            {history.length > 0 && (
              <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                <p className="text-[10px] text-center text-gray-400">
                  Click any item to load into translator
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;