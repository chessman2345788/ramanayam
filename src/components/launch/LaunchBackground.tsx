"use client";

import { motion } from "framer-motion";

/**
 * Immersive Temple-Inspired Launch Background for Ramanayam.
 * Matches the warm cream (#FAF7F2 / #F5F0E8) website color palette.
 *
 * Layered Atmosphere:
 * 1. Warm cream background (#FAF7F2)
 * 2. Soft radial warm gold & saffron lighting gradients
 * 3. Slow rotating 24-petal sacred mandala (SVG)
 * 4. Architectural temple arch silhouette SVG
 * 5. Floating golden dust particles
 */
export function LaunchBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: "#FAF7F2",
      }}
    >
      {/* ── Layer 1: Ambient Warm Golden Gradients ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 60% at 50% 25%, rgba(168, 130, 42, 0.09) 0%, rgba(232, 102, 10, 0.04) 45%, transparent 75%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(168, 130, 42, 0.06) 0%, transparent 60%), radial-gradient(circle at 10% 40%, rgba(232, 102, 10, 0.03) 0%, transparent 40%), radial-gradient(circle at 90% 40%, rgba(168, 130, 42, 0.04) 0%, transparent 40%)",
        }}
      />

      {/* ── Layer 2: Subtle Temple Arch Architectural Silhouette ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35vh",
          opacity: 0.05,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <svg
          viewBox="0 0 1200 400"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          fill="none"
          stroke="#A8822A"
          strokeWidth="0.8"
        >
          {/* Temple Mandap Arch Contour */}
          <path d="M 0 400 L 150 400 L 150 200 Q 150 80 600 80 Q 1050 80 1050 200 L 1050 400 L 1200 400" />
          <path d="M 180 400 L 180 220 Q 180 110 600 110 Q 1020 110 1020 220 L 1020 400" />
          {/* Central Kalash Peak */}
          <path d="M 600 80 L 600 30 M 590 45 L 610 45 M 595 30 L 605 30" />
        </svg>
      </div>

      {/* ── Layer 3: Central Sacred Mandala (Slow Rotation) ── */}
      <div
        className="launch-mandala"
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          width: "min(850px, 120vw)",
          height: "min(850px, 120vw)",
          transform: "translate(-50%, -50%)",
          opacity: 0.045,
        }}
      >
        <svg
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
          fill="none"
          stroke="#A8822A"
          strokeWidth="0.5"
        >
          <circle cx="200" cy="200" r="30" />
          <circle cx="200" cy="200" r="60" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="95" />
          <circle cx="200" cy="200" r="130" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="165" />
          <circle cx="200" cy="200" r="195" strokeDasharray="2 4" />

          {/* 16 Outer Sacred Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                <path d="M 200 200 Q 194 140 200 70 Q 206 140 200 200" />
                <circle cx="200" cy="100" r="2" fill="#A8822A" stroke="none" />
              </g>
            );
          })}

          {/* 8 Inner Lotus Petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            return (
              <g key={`inner-${i}`} transform={`rotate(${angle} 200 200)`}>
                <path d="M 200 200 Q 196 175 200 150 Q 204 175 200 200" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Layer 4: Floating Golden Dust Particles ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const size = 2 + (i % 3);
          const startX = 10 + ((i * 7) % 80);
          const delay = (i * 0.7) % 5;
          const duration = 12 + ((i * 3) % 8);

          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: `${startX}vw`,
                y: "105vh",
              }}
              animate={{
                opacity: [0, 0.35, 0.6, 0.3, 0],
                y: ["105vh", "-10vh"],
                x: [
                  `${startX}vw`,
                  `${startX + (i % 2 === 0 ? 3 : -3)}vw`,
                  `${startX + (i % 2 === 0 ? -2 : 2)}vw`,
                ],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                background: "rgba(168, 130, 42, 0.6)",
                boxShadow: "0 0 6px rgba(168, 130, 42, 0.4)",
                pointerEvents: "none",
              }}
            />
          );
        })}
      </div>

      {/* ── Layer 5: Gold Frame Corner Accents ── */}
      <svg
        style={{ position: "absolute", top: 24, left: 24, opacity: 0.18 }}
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#A8822A"
        strokeWidth="0.8"
      >
        <path d="M 0 48 L 0 12 Q 0 0 12 0 L 48 0" />
        <path d="M 0 36 L 0 18 Q 0 6 18 6 L 36 6" />
        <circle cx="12" cy="12" r="2" fill="#A8822A" />
      </svg>

      <svg
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          opacity: 0.18,
          transform: "scaleX(-1)",
        }}
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#A8822A"
        strokeWidth="0.8"
      >
        <path d="M 0 48 L 0 12 Q 0 0 12 0 L 48 0" />
        <path d="M 0 36 L 0 18 Q 0 6 18 6 L 36 6" />
        <circle cx="12" cy="12" r="2" fill="#A8822A" />
      </svg>

      {/* CSS Keyframe Animations & Media Queries */}
      <style>{`
        @keyframes launch-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .launch-mandala {
          animation: launch-rotate 180s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .launch-mandala {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
