import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, GraduationCap } from 'lucide-react';

const LearningModeCard = ({ topic, onQuestionClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${topic.color} flex items-center justify-center flex-shrink-0`}>
          <topic.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800">{topic.title}</h3>
          <p className="text-sm text-slate-500 mt-1">{topic.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className={`px-2 py-0.5 rounded-full ${
              topic.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
              topic.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {topic.level}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {topic.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          Questions to explore:
        </p>
        <div className="flex flex-wrap gap-2">
          {topic.questions?.map((question, idx) => (
            <button
              key={idx}
              onClick={() => onQuestionClick?.(question)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all border border-transparent"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LearningModeCard;