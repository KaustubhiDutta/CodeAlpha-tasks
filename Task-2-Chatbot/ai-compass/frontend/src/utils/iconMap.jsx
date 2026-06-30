import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiOpenai, SiGithub, SiNotion, SiZapier, SiHuggingface,
  SiGoogle, SiCanva
} from 'react-icons/si';
import { 
  FaRobot, FaBrain, FaMagic, FaPalette, FaVideo,
  FaSearch, FaPen, FaCode, FaChartLine, FaGraduationCap,
  FaGoogle, FaGit, FaNode
} from 'react-icons/fa';
import { 
  RiSearchEyeLine, RiImageAiLine, RiPaintBrushLine, 
  RiMagicLine, RiRobotLine, RiBrainLine
} from 'react-icons/ri';
import { 
  MdOutlineMovieCreation, MdVideoCameraFront, MdOutlineAnimation,
  MdOutlineDesignServices, MdOutlineDataUsage
} from 'react-icons/md';
import { 
  TbBrain, TbCursorText, TbBrandOpenai, TbBinaryTree,
  TbNetwork, TbChartInfographic, TbCode, TbBrandGoogle,
  TbBrandGithub, TbBrandNotion
} from 'react-icons/tb';
import { 
  BsSoundwave, BsVectorPen, BsRobot, BsStars
} from 'react-icons/bs';
import { 
  FcGoogle, FcBullish, FcIdea, FcMindMap
} from 'react-icons/fc';
import { 
  IoChatbubbleEllipses, IoCode, IoRocket, IoFlame,
  IoTrendingUp, IoSparkles, IoFlash
} from 'react-icons/io5';
import { 
  GrGraphQl, GrMysql, GrNode
} from 'react-icons/gr';
import { 
  HiOutlineCpuChip, HiOutlineLightBulb
} from 'react-icons/hi2';
import { 
  BiBrain, BiCodeAlt, BiData
} from 'react-icons/bi';

// Official AI Tool Icons (removed SiAdobe - doesn't exist)
export const toolIcons = {
  'chatgpt': SiOpenai,
  'openai': SiOpenai,
  'claude': TbBrain,
  'anthropic': TbBrain,
  'gemini': FcGoogle,
  'google': FaGoogle,
  'copilot': SiGithub,
  'github': SiGithub,
  'perplexity': RiSearchEyeLine,
  'midjourney': RiImageAiLine,
  'runway': MdOutlineMovieCreation,
  'dall-e': RiImageAiLine,
  'synthesia': MdVideoCameraFront,
  'heygen': MdVideoCameraFront,
  'pika': MdOutlineAnimation,
  'canva': SiCanva,
  'notion': SiNotion,
  'adobe': FaPalette,  // Using FaPalette as fallback for Adobe
  'firefly': FaPalette, // Using FaPalette as fallback for Firefly
  'cursor': TbCursorText,
  'huggingface': SiHuggingface,
  'hugging face': SiHuggingface,
  'stable diffusion': RiPaintBrushLine,
  'leonardo': RiMagicLine,
  'elevenlabs': BsSoundwave,
  'zapier': SiZapier,
  'jasper': BsRobot,
  'copy.ai': IoChatbubbleEllipses,
  'grammarly': BsStars,
  'otter': BsSoundwave,
  'whimsical': GrGraphQl,
  'lucidchart': GrGraphQl,
  'miro': GrGraphQl,
  'gamma': IoSparkles,
  'tome': IoRocket,
  'descript': MdOutlineMovieCreation,
  'beautiful.ai': MdOutlineDesignServices,
  'motion': IoFlash,
  'reclaim': IoFlash,
  'mem': BiBrain,
  'khanmigo': FaGraduationCap,
  'quizlet': FaGraduationCap,
  'duolingo': FaGraduationCap,
  'wolfram': GrGraphQl,
  'photomath': FaGraduationCap,
  'elicit': RiSearchEyeLine,
  'consensus': RiSearchEyeLine,
  'scite': RiSearchEyeLine,
  'tableau': MdOutlineDataUsage,
  'thoughtspot': MdOutlineDataUsage,
  'hubspot': SiZapier,
  'polymer': SiZapier,
  'codeium': TbCode,
  'dall-e 3': RiImageAiLine,
  'stable': RiPaintBrushLine,
  'notion ai': SiNotion,
  'claude 3': TbBrain,
  'claude 3.5': TbBrain,
  'claude 3.5 sonnet': TbBrain,
  'chatgpt 4': SiOpenai,
  'gpt-4': SiOpenai,
  'gpt-3.5': SiOpenai,
  'gemini pro': FcGoogle,
  'gemini advanced': FcGoogle,
  'miro': GrGraphQl,
  'adobe photoshop': FaPalette,
  'adobe illustrator': FaPalette,
  'adobe premiere': FaPalette,
};

// Category Icons
export const categoryIcons = {
  'coding': IoCode,
  'programming': IoCode,
  'development': IoCode,
  'design': FaPalette,
  'ui/ux': FaPalette,
  'writing': FaPen,
  'content': FaPen,
  'research': RiSearchEyeLine,
  'academic': RiSearchEyeLine,
  'presentations': IoRocket,
  'slides': IoRocket,
  'video': MdOutlineMovieCreation,
  'editing': MdOutlineMovieCreation,
  'productivity': IoFlash,
  'automation': IoFlash,
  'business': MdOutlineDataUsage,
  'analytics': MdOutlineDataUsage,
  'marketing': IoRocket,
  'seo': IoRocket,
  'education': FaGraduationCap,
  'learning': FaGraduationCap,
  'ai assistant': TbBrain,
  'assistant': TbBrain,
  'creative': IoSparkles,
  'general': IoSparkles,
};

// Get icon by name with fallback
export const getToolIcon = (name) => {
  if (!name) return FaRobot;
  
  const cleanName = name?.toLowerCase().replace(/[^a-z0-9.\s-]/g, '').trim() || '';
  
  // Try exact match
  if (toolIcons[cleanName]) return toolIcons[cleanName];
  
  // Try partial match
  const keys = Object.keys(toolIcons);
  for (const key of keys) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return toolIcons[key];
    }
  }
  
  // Try matching first word
  const firstWord = cleanName.split(' ')[0];
  if (toolIcons[firstWord]) return toolIcons[firstWord];
  
  // Fallback icon
  return FaRobot;
};

// Get category icon
export const getCategoryIcon = (category) => {
  if (!category) return IoSparkles;
  const cleanCategory = category?.toLowerCase().trim() || '';
  return categoryIcons[cleanCategory] || IoSparkles;
};

// Default icon component with glassmorphism container
export const IconContainer = ({ icon: Icon, size = 'md', className = '', glowColor = 'indigo', ...props }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-28 h-28 text-5xl'
  };
  
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };
  
  const glowColors = {
    indigo: 'bg-indigo-500/20',
    purple: 'bg-purple-500/20',
    cyan: 'bg-cyan-500/20',
    pink: 'bg-pink-500/20',
    emerald: 'bg-emerald-500/20',
    amber: 'bg-amber-500/20',
  };
  
  const glowColorClass = glowColors[glowColor] || glowColors.indigo;
  
  return (
    <motion.div
      className={`relative flex-shrink-0 ${className}`}
      whileHover={{ 
        scale: 1.08, 
        rotate: 5,
        transition: { type: "spring", stiffness: 300 }
      }}
      {...props}
    >
      <div className={`absolute inset-0 ${glowColorClass} blur-xl rounded-full opacity-50`} />
      <div className={`relative ${sizeClasses[size]} rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300`}>
        {Icon && <Icon className={`${iconSizes[size]} text-indigo-400`} />}
      </div>
    </motion.div>
  );
};

// IconWithName - Icon with tool name below
export const IconWithName = ({ name, icon, size = 'md', showName = true, ...props }) => {
  const IconComponent = typeof icon === 'function' ? icon : getToolIcon(name);
  
  return (
    <div className="flex flex-col items-center gap-2">
      <IconContainer icon={IconComponent} size={size} {...props} />
      {showName && (
        <span className="text-xs text-white/60 text-center font-medium">{name}</span>
      )}
    </div>
  );
};