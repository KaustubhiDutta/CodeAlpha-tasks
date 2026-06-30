import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, BookOpen, Code, Brain, Cpu } from 'lucide-react';

const roadmapData = {
  "learn ai": {
    title: "AI Learning Roadmap",
    duration: "16 Weeks",
    milestones: [
      {
        week: 1,
        title: "Python Basics",
        description: "Learn Python fundamentals, data structures, and libraries",
        icon: BookOpen,
        tasks: ["Variables & Data Types", "Loops & Functions", "Libraries (NumPy, Pandas)"]
      },
      {
        week: 2,
        title: "Machine Learning",
        description: "Understanding ML algorithms and implementation",
        icon: Code,
        tasks: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"]
      },
      {
        week: 3,
        title: "Deep Learning",
        description: "Neural networks and advanced architectures",
        icon: Brain,
        tasks: ["CNNs", "RNNs", "Transformers"]
      },
      {
        week: 4,
        title: "LLMs & Generative AI",
        description: "Large Language Models and generative applications",
        icon: Cpu,
        tasks: ["GPT Architecture", "Fine-tuning", "Prompt Engineering"]
      }
    ]
  }
};

const AICoach = ({ query }) => {
  const [activeWeek, setActiveWeek] = useState(0);
  const matchedRoadmap = roadmapData["learn ai"];

  if (!matchedRoadmap) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-indigo-500/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{matchedRoadmap.title}</h3>
          <p className="text-sm text-slate-400">Estimated Time: {matchedRoadmap.duration}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle className="w-4 h-4" />
          <span>{activeWeek + 1} / {matchedRoadmap.milestones.length} weeks</span>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700" />
        
        {matchedRoadmap.milestones.map((milestone, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative pl-12 pb-8 last:pb-0 cursor-pointer ${idx === activeWeek ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
            onClick={() => setActiveWeek(idx)}
          >
            {/* Timeline dot */}
            <div className={`absolute left-2 top-1 w-5 h-5 rounded-full flex items-center justify-center ${idx === activeWeek ? 'bg-indigo-500' : 'bg-slate-700'}`}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            
            <div className={`p-4 rounded-xl ${idx === activeWeek ? 'bg-slate-800/50 border border-indigo-500/30' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <milestone.icon className="w-4 h-4 text-indigo-400" />
                <h4 className="font-semibold text-white">Week {milestone.week}: {milestone.title}</h4>
              </div>
              <p className="text-sm text-slate-400 mb-3">{milestone.description}</p>
              {idx === activeWeek && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  {milestone.tasks.map((task, taskIdx) => (
                    <div key={taskIdx} className="flex items-center gap-2 text-sm text-slate-300">
                      <Circle className="w-3 h-3 text-indigo-400" />
                      <span>{task}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AICoach;