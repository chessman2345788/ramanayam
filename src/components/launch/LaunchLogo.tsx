"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * High-Precision Crisp Floating Hero Logo Component for Ramanayam Launching Soon.
 *
 * Preserves 100% exact original Ramanayam brand emblem artwork.
 * Optimizations for Razor-Sharp Clarity:
 * - Native <img> tag instead of next/image to avoid fill-mode sub-pixel rasterization
 * - Explicit width/height preserving 704:592 (176:148) aspect ratio
 * - image-rendering hints for sharp downscaling
 * - No translateZ(0) or willChange on the image element itself (avoids GPU texture resolution mismatch)
 * - Isolated layer stacking context (isolation: isolate) on outermost container only
 * - Subtle position-only floating animation translateY(-4px -> 4px -> -4px)
 * - Integer mouse parallax alignment
 */
export function LaunchLogo() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return () => window.removeEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = Math.round(((e.clientX - centerX) / centerX) * 5);
      const y = Math.round(((e.clientY - centerY) / centerY) * 5);
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "clamp(20px, 3.5vh, 32px)",
        isolation: "isolate",
        transform: "translateZ(0)",
      }}
    >
      {/* ── Layer 1: Soft Ambient Golden Glow (Behind Logo) ── */}
      <motion.div
        animate={{
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "clamp(220px, 35vw, 320px)",
          height: "clamp(220px, 35vw, 320px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168, 130, 42, 0.18) 0%, rgba(232, 102, 10, 0.06) 45%, transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Layer 2: Outer Sacred Ring (SVG) ── */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "clamp(180px, 28vw, 240px)",
          height: "clamp(180px, 28vw, 240px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
          <circle
            cx="100"
            cy="100"
            r="98"
            stroke="url(#ring-grad-sharp)"
            strokeWidth="0.8"
            strokeDasharray="4 8 12 8"
          />
          <defs>
            <linearGradient id="ring-grad-sharp" x1="0" y1="0" x2="200" y2="200">
              <stop offset="0%" stopColor="#A8822A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#E8660A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#A8822A" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Layer 3: Exact Original Ramanayam Hero Emblem ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: isMobile ? 0 : mouseOffset.y,
          x: isMobile ? 0 : mouseOffset.x,
        }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.3, ease: "easeOut" },
          x: { duration: 0.3, ease: "easeOut" },
        }}
        style={{
          position: "relative",
          width: "clamp(150px, 22vw, 210px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          filter: "none",
          backdropFilter: "none",
        }}
      >
        {/* Subtle Pure Position Floating Animation (translateY -4px -> 4px -> -4px) */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "none",
            backdropFilter: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-transparent.png"
            alt="Ramanayam Emblem"
            width={704}
            height={592}
            fetchPriority="high"
            decoding="async"
            draggable={false}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "clamp(150px, 22vw, 210px)",
              display: "block",
              objectFit: "contain",
              filter: "none",
              backdropFilter: "none",
              imageRendering: "-webkit-optimize-contrast" as React.CSSProperties["imageRendering"],
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Layer 4: Reflective Floor Shadow ── */}
      <motion.div
        animate={{
          scaleX: [0.88, 1.08, 0.88],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
        style={{
          width: "clamp(90px, 15vw, 130px)",
          height: 6,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(168, 130, 42, 0.35) 0%, transparent 70%)",
          marginTop: 2,
          zIndex: 1,
        }}
      />
    </div>
  );
}

