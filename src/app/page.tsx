"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"logo" | "tagline" | "enter">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tagline"), 1200);
    const t2 = setTimeout(() => setPhase("enter"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0E0805",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {/* Ambient glow behind logo */}
      <motion.div
        animate={{ opacity: [0, 0.4, 0.25], scale: [0.8, 1.2, 1] }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,102,10,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Rotating mandala ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      >
        {/* SVG mandala — 8 petal lotus ring */}
        <svg viewBox="0 0 320 320" fill="none">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="160"
              cy="160"
              rx="24"
              ry="72"
              fill="#C9A84C"
              transform={`rotate(${angle}, 160, 160)`}
              opacity="0.8"
            />
          ))}
          <circle cx="160" cy="160" r="28" fill="#C9A84C" opacity="0.6" />
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke="#C9A84C"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="80"
            stroke="#C9A84C"
            strokeWidth="0.3"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Image
          src="/logo-transparent.png"
          alt="Ramanayam"
          width={160}
          height={112}
          priority
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      {/* Tagline */}
      <AnimatePresence>
        {(phase === "tagline" || phase === "enter") && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 18,
              color: "rgba(245,230,208,0.55)",
              letterSpacing: "0.04em",
              marginTop: 20,
              position: "relative",
              zIndex: 1,
            }}
          >
            Path of the Divine
          </motion.p>
        )}
      </AnimatePresence>

      {/* Enter CTA */}
      <AnimatePresence>
        {phase === "enter" && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            onClick={() => router.push("/home")}
            style={{
              marginTop: 48,
              padding: "14px 40px",
              borderRadius: 40,
              background: "transparent",
              border: "1px solid rgba(232,102,10,0.6)",
              color: "#E8660A",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#E8660A";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#E8660A";
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Enter
          </motion.button>
        )}
      </AnimatePresence>

      {/* Flame particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "#E8660A",
            left: `${30 + i * 8}%`,
            bottom: "20%",
            opacity: 0,
          }}
          animate={{
            y: [-0, -80, -160],
            opacity: [0, 0.6, 0],
            x: [0, i % 2 === 0 ? 12 : -12],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
