import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Typewriter Effect - Classic
export const TypewriterText = ({ 
  text, 
  speed = 30, 
  delay = 0, 
  onComplete,
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!text) return;
    
    setDisplayText('');
    indexRef.current = 0;
    setIsComplete(false);
    
    const startDelay = setTimeout(() => {
      typeCharacter();
    }, delay);

    return () => {
      clearTimeout(startDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text]);

  const typeCharacter = () => {
    if (indexRef.current < text.length) {
      setDisplayText(text.slice(0, indexRef.current + 1));
      indexRef.current++;
      timeoutRef.current = setTimeout(typeCharacter, speed);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5"
        />
      )}
    </span>
  );
};

// Staggered Word Animation
export const StaggeredText = ({ 
  text, 
  className = "",
  delay = 0,
  duration = 0.4 
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay }
    })
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.95,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Gradient Shifting Text
export const GradientText = ({ 
  text, 
  className = "",
  gradient = "from-indigo-600 via-purple-600 to-pink-600"
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_200%] ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {text}
    </motion.span>
  );
};

// Reveal Character by Character with Glow
export const RevealText = ({ 
  text, 
  className = "",
  delay = 0 
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={revealed ? { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: "blur(0px)"
          } : {}}
          transition={{ 
            duration: 0.3,
            delay: index * 0.03,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// AI Thinking Animation
export const ThinkingAnimation = ({ className = "" }) => {
  return (
    <motion.div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-400"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      <motion.span
        className="text-xs text-slate-400 ml-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        thinking
      </motion.span>
    </motion.div>
  );
};

// Typing Indicator with Dots
export const TypingIndicator = ({ className = "" }) => {
  return (
    <motion.div
      className={`flex items-center gap-1.5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </motion.div>
  );
};

// Scroll Reveal Text
export const ScrollRevealText = ({ 
  text, 
  className = "",
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)"
          } : {}}
          transition={{ 
            duration: 0.4,
            delay: index * 0.02,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// Highlighted Text Animation
export const HighlightText = ({ 
  text, 
  className = "",
  highlightColor = "bg-indigo-100 dark:bg-indigo-500/20",
  delay = 0 
}) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text}
      <motion.span
        className={`absolute inset-0 ${highlightColor} -z-10 rounded`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ 
          duration: 0.8,
          delay: delay + 0.3,
          ease: [0.215, 0.61, 0.355, 1]
        }}
      />
    </motion.span>
  );
};

// Number Counter Animation
export const CountUp = ({ 
  target, 
  duration = 2000,
  className = "",
  suffix = "",
  prefix = ""
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(easeOutQuart * target);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Wave Text Animation
export const WaveText = ({ text, className = "" }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block' }}
          animate={{
            y: [0, -6, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.05,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// Particle Text Effect
export const ParticleText = ({ text, className = "" }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const words = text.split(' ');
    const particleArray = words.map((word, wordIndex) => ({
      id: wordIndex,
      text: word,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      rotate: Math.random() * 30 - 15
    }));
    setParticles(particleArray);
  }, [text]);

  return (
    <span className={className}>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          style={{ display: 'inline-block', marginRight: '4px' }}
          initial={{ 
            opacity: 0,
            x: particle.x,
            y: particle.y,
            rotate: particle.rotate,
            scale: 0.5
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1
          }}
          transition={{
            duration: 0.6,
            delay: particle.id * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          {particle.text}
        </motion.span>
      ))}
    </span>
  );
};

export default {
  TypewriterText,
  StaggeredText,
  GradientText,
  RevealText,
  ThinkingAnimation,
  TypingIndicator,
  ScrollRevealText,
  HighlightText,
  CountUp,
  WaveText,
  ParticleText
};