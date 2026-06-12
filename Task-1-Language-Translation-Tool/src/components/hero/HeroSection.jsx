
import { motion } from 'framer-motion';
import { Plane, Compass } from 'lucide-react';
import AnimatedGlobe from './AnimatedGlobe';

const HeroSection = () => {
  return (
    <div className="relative  py-8 md:py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="
absolute top-20 left-10
w-[350px]
h-[350px]
bg-cyan-400/10
rounded-full
blur-[120px]
"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* AI Travel Assistant Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 mb-6"
        >
          <Compass className="w-4 h-4 text-teal-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300"> SPEAK THE WORLD</span>
        </motion.div>

       
        

        {/* Hero Title */}
        {/* Hero Title */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
    Translate as you <span className="text-amber-400">wander</span>
  </h1>

  <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
    Pick a destination, type a phrase, and instantly hear it spoken like a local.
  </p>
</motion.div>


        {/* Floating Globe */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{
    opacity: 1,
    scale: 1,
    y: [0, -18, 0],   // floating effect
  }}
  transition={{
    opacity: { duration: 0.8, delay: 0.2 },
    scale: { duration: 0.8, delay: 0.2 },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="flex justify-center mt-16 mb-8"
>
  <div className="relative w-full max-w-2xl mx-auto">
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">

  <div
  className="
  absolute
  left-1/2
  top-1/2
  -translate-x-1/2
  -translate-y-1/2
  w-[1200px]
  h-[1200px]
  rounded-full
  bg-gradient-radial
  from-cyan-500/20
  via-blue-500/10
  to-transparent
  blur-[250px]
  pointer-events-none
  "
/>

</div>
    <AnimatedGlobe />
  </div>
</motion.div>

        {/* Hero Description */}
        

<p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
  ✈️ Travel farther • 🗣️ Speak like a local • 🌎 Understand every destination
</p>

        {/* Animated flight paths */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20"
        >
          <svg width="800" height="400" viewBox="0 0 800 400" className="hidden lg:block">
            <motion.path
              d="M100,200 Q300,100 500,200 T700,200"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div> */}

        {/* Floating airplane */}
        <motion.div
          animate={{ x: [0, 100, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 pointer-events-none hidden lg:block"
        >
          <Plane className="w-8 h-8 text-sky-400 opacity-40" />
        </motion.div>

        {/* Second floating airplane going opposite direction */}
        <motion.div
          animate={{ x: [0, -80, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 pointer-events-none hidden lg:block"
        >
          <Plane className="w-6 h-6 text-teal-400 opacity-30 transform scale-x-[-1]" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;