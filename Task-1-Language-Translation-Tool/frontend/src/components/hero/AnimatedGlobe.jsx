import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const AnimatedGlobe = () => {
  return (
    <motion.div
      className="relative w-full min-h-[400px] flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >

      {/* 🌍 PREMIUM GLOBE IMAGE */}
      {/* 🌍 PREMIUM GLOBE IMAGE WITH BLACK CIRCLE */}
<div
  className="
w-[360px]
h-[360px]
object-contain
rounded-full
border border-black/50
"
>
  <motion.img
  src="/images/Globe.png"
  alt="Globe"
  className="
    w-[360px]
    h-[360px]
    object-contain
    rounded-full
    border-[2px]
    border-black/70
    drop-shadow-[0_0_50px_rgba(34,211,238,0.35)]
  "
  animate={{
    rotate: 360,
  }}
    transition={{
      duration: 80,
      repeat: Infinity,
      ease: "linear",
    }}
  />
</div>

      {/* ✨ SOFT GLOW BEHIND GLOBE */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

      {/* 🟢 ORBIT RING (KEEP YOUR STYLE) */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-cyan-300/40"
        style={{
          width: "380px",
          height: "380px",
          marginLeft: "-190px",
          marginTop: "-190px",
        }}
      />

      <div
  className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-cyan-300/20"
  style={{
    width: "320px",
    height: "320px",
    marginLeft: "-160px",
    marginTop: "-160px",
  }}
/>

      {/* ✈️ ORBITING PLANE (UNCHANGED LOGIC) */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: "380px",
          height: "380px",
          marginLeft: "-190px",
          marginTop: "-190px",
          transformOrigin: "center center",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#050816] rounded-full p-1">
          <Plane
            size={28}
            className="text-cyan-300 drop-shadow-[0_0_25px_rgba(34,211,238,1)]"
          />
        </div>
      </motion.div>

    </motion.div>
  );
};

export default AnimatedGlobe;