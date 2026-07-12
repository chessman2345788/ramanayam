"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 select-none pointer-events-none overflow-hidden" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Dynamic Animated Glow Spheres */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[140px] opacity-35"
        style={{
          background: "radial-gradient(circle, var(--glow-spot-1) 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
        }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          x: [0, 40, -30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-25"
        style={{
          background: "radial-gradient(circle, var(--glow-spot-2) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
        }}
        animate={{
          scale: [1, 0.9, 1.1, 1],
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating dust/sparkle particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              background: i % 2 === 0 ? "#F97316" : "#DFC06C",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
