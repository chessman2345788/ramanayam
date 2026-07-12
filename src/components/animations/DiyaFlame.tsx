"use client";

import { motion } from "framer-motion";

interface DiyaFlameProps {
  size?: number;
  className?: string;
}

export function DiyaFlame({ size = 40, className = "" }: DiyaFlameProps) {
  return (
    <div className={`relative inline-flex items-end justify-center ${className}`} style={{ width: size, height: size * 1.5 }}>
      {/* Diya base */}
      <svg
        viewBox="0 0 60 30"
        fill="none"
        style={{ width: size, height: size * 0.5 }}
        className="relative z-10"
      >
        <ellipse cx="30" cy="15" rx="28" ry="13" fill="url(#diyaGradient)" />
        <ellipse cx="30" cy="12" rx="22" ry="9" fill="url(#diyaInner)" />
        <ellipse cx="30" cy="11" rx="16" ry="6" fill="#B8860B" opacity="0.4" />
        <defs>
          <linearGradient id="diyaGradient" x1="2" y1="15" x2="58" y2="15">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="diyaInner" x1="8" y1="12" x2="52" y2="12">
            <stop offset="0%" stopColor="#A07828" />
            <stop offset="50%" stopColor="#D4B96E" />
            <stop offset="100%" stopColor="#A07828" />
          </linearGradient>
        </defs>
      </svg>

      {/* Flame */}
      <motion.div
        className="absolute z-20"
        style={{ bottom: size * 0.35 }}
        animate={{
          scaleY: [1, 1.06, 0.97, 1.04, 1],
          scaleX: [1, 0.97, 1.02, 0.98, 1],
          opacity: [0.9, 1, 0.95, 1, 0.9],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 24 36" fill="none" style={{ width: size * 0.35, height: size * 0.55 }}>
          {/* Outer flame glow */}
          <ellipse cx="12" cy="28" rx="8" ry="4" fill="#FF6B00" opacity="0.2" />
          {/* Outer flame */}
          <path
            d="M12 2C12 2 4 14 4 22C4 28 8 32 12 32C16 32 20 28 20 22C20 14 12 2 12 2Z"
            fill="url(#flameOuter)"
          />
          {/* Inner flame */}
          <path
            d="M12 10C12 10 8 18 8 23C8 27 10 29 12 29C14 29 16 27 16 23C16 18 12 10 12 10Z"
            fill="url(#flameInner)"
          />
          {/* Core */}
          <path
            d="M12 16C12 16 10 21 10 24C10 26 11 27 12 27C13 27 14 26 14 24C14 21 12 16 12 16Z"
            fill="#FFFBE6"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="flameOuter" x1="12" y1="2" x2="12" y2="32">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="40%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FF4500" />
            </linearGradient>
            <linearGradient id="flameInner" x1="12" y1="10" x2="12" y2="29">
              <stop offset="0%" stopColor="#FFFACD" />
              <stop offset="60%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
