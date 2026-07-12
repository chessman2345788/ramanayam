"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

/* ── Floating golden particles ──────────────────────────────── */
function SacredParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(201,168,76,0.9) 0%, rgba(216,75,22,0.4) 100%)`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -60 - Math.random() * 40],
            x: [0, (Math.random() - 0.5) * 30],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Rotating sacred mandala SVG ────────────────────────────── */
function SacredMandala() {
  return (
    <motion.div
      className="absolute"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
        {/* Outer ring */}
        <circle cx="160" cy="160" r="150" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
        <circle cx="160" cy="160" r="140" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" />

        {/* Petal forms */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 160 + 120 * Math.cos(angle);
          const y1 = 160 + 120 * Math.sin(angle);
          const x2 = 160 + 130 * Math.cos(angle);
          const y2 = 160 + 130 * Math.sin(angle);
          return (
            <g key={i}>
              <line
                x1="160" y1="160" x2={x1} y2={y1}
                stroke="rgba(201,168,76,0.08)"
                strokeWidth="0.5"
              />
              <circle
                cx={x2} cy={y2} r="4"
                fill="rgba(201,168,76,0.15)"
              />
            </g>
          );
        })}

        {/* Inner decorative circles */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = ((i * 45 + 22.5) * Math.PI) / 180;
          const cx = 160 + 90 * Math.cos(angle);
          const cy = 160 + 90 * Math.sin(angle);
          return (
            <circle
              key={`inner-${i}`}
              cx={cx} cy={cy} r="6"
              stroke="rgba(201,168,76,0.12)"
              strokeWidth="0.5"
              fill="none"
            />
          );
        })}

        {/* Central lotus hint */}
        <circle cx="160" cy="160" r="30" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" fill="none" />
        <circle cx="160" cy="160" r="8" fill="rgba(201,168,76,0.08)" />
      </svg>
    </motion.div>
  );
}

/* ── Mini Diya flame (self-contained for splash) ────────────── */
function SplashDiya() {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      {/* Flame */}
      <motion.svg
        viewBox="0 0 24 36"
        fill="none"
        width="20"
        height="30"
        animate={{
          scaleY: [1, 1.08, 0.96, 1.05, 1],
          scaleX: [1, 0.96, 1.03, 0.97, 1],
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M12 2C12 2 4 14 4 22C4 28 8 32 12 32C16 32 20 28 20 22C20 14 12 2 12 2Z"
          fill="url(#splashFlameOuter)"
        />
        <path
          d="M12 10C12 10 8 18 8 23C8 27 10 29 12 29C14 29 16 27 16 23C16 18 12 10 12 10Z"
          fill="url(#splashFlameInner)"
        />
        <path
          d="M12 16C12 16 10 21 10 24C10 26 11 27 12 27C13 27 14 26 14 24C14 21 12 16 12 16Z"
          fill="#FFFBE6"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="splashFlameOuter" x1="12" y1="2" x2="12" y2="32">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="40%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FF4500" />
          </linearGradient>
          <linearGradient id="splashFlameInner" x1="12" y1="10" x2="12" y2="29">
            <stop offset="0%" stopColor="#FFFACD" />
            <stop offset="60%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Tiny diya base */}
      <svg viewBox="0 0 30 10" fill="none" width="20" height="7" className="-mt-1.5">
        <ellipse cx="15" cy="5" rx="14" ry="5" fill="url(#splashDiyaBase)" />
        <defs>
          <linearGradient id="splashDiyaBase" x1="1" y1="5" x2="29" y2="5">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LogoSplash — Premium cinematic splash screen
   ═══════════════════════════════════════════════════════════════ */
export function LogoSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Total splash duration: ~3.75s visible + 0.8s exit
    const t = setTimeout(() => setVisible(false), 3750);
    // Lock scroll while splash is visible
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  // Unlock scroll when splash finishes exiting
  useEffect(() => {
    if (!visible) {
      const cleanup = setTimeout(() => {
        document.body.style.overflow = "";
      }, 1650);
      return () => clearTimeout(cleanup);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #1e0d35 0%, #0d0418 50%, #050208 100%)",
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Background particles */}
          <SacredParticles />

          {/* Rotating mandala */}
          <SacredMandala />

          {/* Central breathing glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 280,
              height: 280,
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(216,75,22,0.05) 40%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Diya above the logo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <SplashDiya />
          </motion.div>

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Ramanayam"
              width={200}
              height={140}
              priority
              className="object-contain drop-shadow-[0_4px_24px_rgba(201,168,76,0.3)]"
            />
          </motion.div>

          {/* Decorative divider line */}
          <motion.div
            className="mt-5 h-px w-24"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />

          {/* Tagline */}
          <motion.p
            className="mt-4 text-sm tracking-[0.35em] uppercase font-light"
            style={{
              color: "#C9A84C",
              fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            Path of the Divine
          </motion.p>

          {/* Sanskrit verse */}
          <motion.p
            className="mt-2 text-xs tracking-widest"
            style={{
              color: "rgba(201,168,76,0.35)",
              fontFamily: "var(--font-display, serif)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            ॐ नमो भगवते वासुदेवाय
          </motion.p>

          {/* Rangoli loading spinner at bottom */}
          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              opacity: { delay: 0.5, duration: 0.4 },
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            }}
          >
            <svg viewBox="0 0 44 44" fill="none" width="36" height="36">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                const cx = 22 + 15 * Math.cos(rad);
                const cy = 22 + 15 * Math.sin(rad);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="2"
                    fill="#C9A84C"
                    opacity={0.2 + (i / 8) * 0.6}
                  />
                );
              })}
              <circle cx="22" cy="22" r="2.5" fill="#C9A84C" opacity="0.4" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

