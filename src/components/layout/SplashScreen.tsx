"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Spring transitions for premium feel
const springTransition = {
  type: "spring" as const,
  stiffness: 40,
  damping: 15,
};

const easeTransition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Exit splash after 3.0s
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isMounted && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          {/* Subtle paper noise texture on splash */}
          <div className="noise-overlay" style={{ opacity: 0.02, zIndex: 10 }} />

          {/* Left panel vertical slide-out */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1,
              height: "100%",
              background: "#FAF8F3",
              borderRight: "0.5px solid rgba(0,0,0,0.02)",
            }}
          />

          {/* Right panel vertical slide-out */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1,
              height: "100%",
              background: "#FAF8F3",
              borderLeft: "0.5px solid rgba(0,0,0,0.02)",
            }}
          />

          {/* Core Content Container — floating over panels */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            {/* Saffron Mandala background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
              animate={{ opacity: 0.08, scale: 1, rotate: 10 }}
              exit={{ scale: 0.75, rotate: -45 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                width: "480px",
                height: "480px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 200 200"
                width="100%"
                height="100%"
                stroke="var(--accent-saffron)"
                fill="none"
                strokeWidth="0.4"
              >
                {/* Concentric rings */}
                <circle cx="100" cy="100" r="15" />
                <circle cx="100" cy="100" r="30" strokeDasharray="2, 2" />
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="70" strokeDasharray="3, 3" />
                <circle cx="100" cy="100" r="90" />

                {/* Mandala petals */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <g key={i} transform={`rotate(${angle} 100 100)`}>
                      <path d="M 100 100 Q 96 60 100 30 Q 104 60 100 100" />
                      <circle cx="100" cy="50" r="1.5" fill="var(--accent-saffron)" />
                    </g>
                  );
                })}
              </svg>
            </motion.div>

            {/* Soft Incense Smoke Animation */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "200px",
                height: "100%",
                pointerEvents: "none",
                display: "flex",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 300, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.25, 0.4, 0.15, 0],
                    x: [0, (i - 1) * 30, (i - 1) * -20, (i - 1) * 15],
                    y: [200, -250],
                    scale: [0.6, 1.2, 1.8],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: i * 1.8,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    width: "20px",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(232,220,200,0.18) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
              ))}
            </div>

            {/* Logo Container */}
            <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={springTransition}
                style={{
                  position: "relative",
                  width: 96,
                  height: 68,
                  marginBottom: 32,
                }}
              >
                <Image
                  src="/logo-transparent.png"
                  alt="Ramanayam"
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                />
              </motion.div>

              {/* Brand Text */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...easeTransition, delay: 0.45 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--text-primary)",
                  margin: "0 0 6px",
                }}
              >
                RAMANAYAM
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...easeTransition, delay: 0.65 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--accent-saffron)",
                  margin: "0 0 16px",
                }}
              >
                Modern Spiritual Living
              </motion.p>

              {/* Loader visual progress line */}
              <div
                style={{
                  width: "120px",
                  height: "2px",
                  background: "rgba(0,0,0,0.04)",
                  borderRadius: "1px",
                  overflow: "hidden",
                  position: "relative",
                  marginTop: 12,
                }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.7, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, var(--accent-gold), var(--accent-saffron))",
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>

            {/* Floating golden dust particles */}
            {Array.from({ length: 18 }).map((_, i) => {
              const startX = Math.random() * 400 - 200;
              const endX = startX + (Math.random() * 120 - 60);
              const startY = Math.random() * 400 + 100;
              const endY = startY - (Math.random() * 400 + 200);
              const size = Math.random() * 4 + 2;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: startX, y: startY }}
                  animate={{
                    opacity: [0, 0.5, 0.5, 0],
                    x: [startX, endX],
                    y: [startY, endY],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: "var(--accent-gold)",
                    boxShadow: "0 0 6px var(--accent-gold)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
