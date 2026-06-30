import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MagicalBackground = () => {
  const canvasRef = useRef(null);
  
  // Real AI Tools with SVG-style symbols and professional icons
  const aiTools = [
    { 
      name: "GitHub Copilot", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#6366f1" opacity="0.9"/>
          <path d="M8 10h8M8 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
          <circle cx="15.5" cy="8.5" r="1.5" fill="white"/>
        </svg>
      ),
      color: "#6366f1", 
      x: 15, y: 20 
    },
    { 
      name: "Midjourney", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ec4899" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="3" fill="#ec4899" opacity="0.8"/>
        </svg>
      ),
      color: "#ec4899", 
      x: 85, y: 35 
    },
    { 
      name: "OpenAI", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="1.5" fill="none"/>
          <path d="M12 4v16M4 12h16" stroke="#10b981" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="12" cy="12" r="3" fill="#10b981" opacity="0.8"/>
        </svg>
      ),
      color: "#10b981", 
      x: 45, y: 70 
    },
    { 
      name: "Anthropic Claude", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#8b5cf6" opacity="0.9"/>
          <path d="M8 8l4 8 4-8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      color: "#8b5cf6", 
      x: 70, y: 15 
    },
    { 
      name: "Runway ML", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
          <path d="M8 10l3 3 5-5" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      color: "#ef4444", 
      x: 25, y: 55 
    },
    { 
      name: "Perplexity AI", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
          <path d="M12 8v8M8 12h8" stroke="#f59e0b" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2" fill="#f59e0b" opacity="0.8"/>
        </svg>
      ),
      color: "#f59e0b", 
      x: 60, y: 80 
    },
    { 
      name: "DALL-E 3", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="4" fill="#3b82f6" opacity="0.8"/>
          <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1"/>
        </svg>
      ),
      color: "#3b82f6", 
      x: 40, y: 25 
    },
    { 
      name: "Gamma AI", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 22,7 22,17 12,22 2,17 2,7 12,2" stroke="#a855f7" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="3" fill="#a855f7" opacity="0.8"/>
        </svg>
      ),
      color: "#a855f7", 
      x: 80, y: 60 
    },
    { 
      name: "Cursor", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3l7 18 4-9 9-4-18-7z" stroke="#14b8a6" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="#14b8a6" opacity="0.8"/>
        </svg>
      ),
      color: "#14b8a6", 
      x: 92, y: 45 
    },
    { 
      name: "Adobe Firefly", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#f43f5e" opacity="0.8"/>
          <path d="M2 17l10 5 10-5" stroke="#f43f5e" strokeWidth="1.5" fill="none"/>
          <path d="M2 12l10 5 10-5" stroke="#f43f5e" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      color: "#f43f5e", 
      x: 30, y: 90 
    },
    { 
      name: "Descript", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16v16H4z" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
          <path d="M8 8h8M8 12h6M8 16h4" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: "#06b6d4", 
      x: 10, y: 85 
    },
    { 
      name: "Leonardo.ai", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 8l8 4 8-4-8-4z" fill="#d946ef" opacity="0.8"/>
          <path d="M4 12l8 4 8-4" stroke="#d946ef" strokeWidth="1.5" fill="none"/>
          <path d="M4 16l8 4 8-4" stroke="#d946ef" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      color: "#d946ef", 
      x: 50, y: 50 
    },
    { 
      name: "Stable Diffusion", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#eab308" opacity="0.8"/>
          <circle cx="12" cy="12" r="5" fill="none" stroke="#eab308" strokeWidth="1.5"/>
        </svg>
      ),
      color: "#eab308", 
      x: 75, y: 25 
    },
    { 
      name: "Replicate", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h16v16H4z" stroke="#22c55e" strokeWidth="1.5" fill="none"/>
          <path d="M8 8l8 8M16 8l-8 8" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: "#22c55e", 
      x: 20, y: 65 
    },
    { 
      name: "Hugging Face", 
      symbol: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#f97316" strokeWidth="1.5" fill="none"/>
          <circle cx="8" cy="10" r="1.5" fill="#f97316" opacity="0.8"/>
          <circle cx="16" cy="10" r="1.5" fill="#f97316" opacity="0.8"/>
          <path d="M8 14c1.5 1.5 3 2 4 2s2.5-.5 4-2" stroke="#f97316" strokeWidth="1.5" fill="none"/>
        </svg>
      ),
      color: "#f97316", 
      x: 65, y: 95 
    }
  ];

  // Neural network particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }
    
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(249, 250, 251, 0.95)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)');
      gradient.addColorStop(1, 'rgba(238, 242, 255, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawConnections();
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="absolute inset-0">
        {aiTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            className="absolute"
            style={{
              left: `${tool.x}%`,
              top: `${tool.y}%`,
              filter: `drop-shadow(0 0 20px ${tool.color}40)`
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 8, -8, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 7,
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {tool.symbol}
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ 
                    background: `radial-gradient(circle, ${tool.color}40 0%, transparent 70%)`,
                    width: '200%',
                    height: '200%',
                    left: '-50%',
                    top: '-50%',
                    zIndex: -1
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Tool name tag */}
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-xs font-semibold bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg text-gray-700 border border-gray-100">
                  {tool.name}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Floating gradient orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${Math.random() * 250 + 150}px`,
            height: `${Math.random() * 250 + 150}px`,
            background: `radial-gradient(circle, ${['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][i % 5]}15 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Animated grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1.5" fill="#6366f1">
              <animate attributeName="r" values="1;2;1" dur="3s" repeatCount="indefinite" />
            </circle>
            <path d="M 40 0 L 40 80 M 0 40 L 80 40" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="6 6">
              <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite" />
            </path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Rotating rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-indigo-200/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-purple-200/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-pink-200/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-cyan-200/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-1/2 right-0 translate-y-1/2 w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
      </motion.div>
      
      <style jsx>{`
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 20px currentColor); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 40px currentColor); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MagicalBackground;