"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { BezierDefinition } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownState = "counting" | "launched" | "no-date";

const EASE_OUT: BezierDefinition = [0.16, 1, 0.3, 1];

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function padZero(n: number): string {
  return n.toString().padStart(2, "0");
}

function tick(targetDate: Date): { state: CountdownState; time: TimeLeft } {
  const remaining = calculateTimeLeft(targetDate);
  if (remaining) {
    return { state: "counting", time: remaining };
  }
  return {
    state: "launched",
    time: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const unitVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/**
 * Live countdown timer tailored for Ramanayam Launching Soon.
 * Warm cream website palette with white glass cards, gold accents, and deep charcoal digits.
 */
export function LaunchCountdown() {
  const [state, setState] = useState<CountdownState>("no-date");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const rawDate = process.env.NEXT_PUBLIC_LAUNCH_DATE;
    if (!rawDate) {
      setState("no-date");
      return;
    }

    const parsed = new Date(rawDate);
    if (isNaN(parsed.getTime())) {
      setState("no-date");
      return;
    }

    const result = tick(parsed);
    setState(result.state);
    setTimeLeft(result.time);

    const interval = setInterval(() => {
      const r = tick(parsed);
      setState(r.state);
      setTimeLeft(r.time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- No date configured ---
  if (state === "no-date") {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "clamp(22px, 3.5vw, 32px)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "#A8822A",
          letterSpacing: "0.02em",
          textAlign: "center",
        }}
      >
        Unveiling Soon
      </motion.p>
    );
  }

  // --- Launched ---
  if (state === "launched") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        style={{ textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 500,
            color: "#1A0F0A",
            letterSpacing: "-0.01em",
            marginBottom: 24,
          }}
        >
          We Are Now Live
        </p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            height: 54,
            padding: "0 36px",
            background: "linear-gradient(135deg, #E8660A 0%, #C9570A 100%)",
            color: "#FFFFFF",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.06em",
            borderRadius: 999,
            border: "none",
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(232, 102, 10, 0.3)",
            transition: "transform 0.25s ease, boxShadow 0.25s ease",
          }}
        >
          Enter Ramanayam <span style={{ fontSize: 16 }}>→</span>
        </a>
      </motion.div>
    );
  }

  // --- Counting ---
  const units: { label: string; value: string }[] = [
    { label: "DAYS", value: padZero(timeLeft.days) },
    { label: "HOURS", value: padZero(timeLeft.hours) },
    { label: "MINUTES", value: padZero(timeLeft.minutes) },
    { label: "SECONDS", value: padZero(timeLeft.seconds) },
  ];

  return (
    <motion.div
      role="timer"
      aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until launch`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "clamp(12px, 3vw, 32px)",
        flexWrap: "wrap",
      }}
    >
      {units.map((unit, idx) => (
        <motion.div
          key={unit.label}
          variants={unitVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* White Card Container for Numbers */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "clamp(64px, 13vw, 92px)",
              height: "clamp(64px, 13vw, 92px)",
              borderRadius: 16,
              background: "#FFFFFF",
              border: "1px solid rgba(168, 130, 42, 0.25)",
              boxShadow: "0 6px 24px rgba(168, 130, 42, 0.08)",
              padding: "0 12px",
            }}
          >
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(34px, 6.5vw, 56px)",
                fontWeight: 400,
                color: "#1A0F0A",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {unit.value}
            </span>
          </div>

          {/* Label below card */}
          <span
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "clamp(9px, 1.1vw, 11px)",
              fontWeight: 600,
              color: "#A8822A",
              textTransform: "uppercase" as const,
              letterSpacing: "0.22em",
              marginTop: 10,
            }}
          >
            {unit.label}
          </span>

          {/* Colon Separator (except last) */}
          {idx < units.length - 1 && (
            <span
              style={{
                position: "absolute",
                right: "clamp(-10px, -2vw, -20px)",
                top: "clamp(18px, 3.5vw, 26px)",
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 300,
                color: "rgba(168, 130, 42, 0.35)",
                lineHeight: 1,
              }}
            >
              :
            </span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
