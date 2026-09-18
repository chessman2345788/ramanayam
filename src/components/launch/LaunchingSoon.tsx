"use client";

import { motion } from "framer-motion";
import { LaunchLogo } from "./LaunchLogo";
import { LaunchCountdown } from "./LaunchCountdown";
import { LaunchNotifyForm } from "./LaunchNotifyForm";
import { LaunchBackground } from "./LaunchBackground";

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Premium Interactive "Launching Soon" Experience for Ramanayam.
 * Aligned with the warm cream (#FAF7F2 / #F5F0E8) Ramanayam brand identity.
 *
 * Visual & Hierarchy Design:
 * 1. FLOATING HERO EMBLEM (LaunchLogo.tsx with 3D mouse parallax & gold halo)
 * 2. RAMANAYAM (Serif display wordmark)
 * 3. DEVOTION LIVES HERE (Refined gold tagline)
 * 4. Something Sacred Is Coming (Cormorant Garamond italic editorial hero headline)
 * 5. Short devotional positioning text
 * 6. Countdown Timer (White cards with gold accents)
 * 7. VIP Launch Notify Form
 *
 * Activated via NEXT_PUBLIC_LAUNCH_MODE=true in root page.tsx.
 */
export function LaunchingSoon() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF7F2",
        color: "#1A0F0A",
        overflow: "hidden",
        padding: "50px 24px 40px",
      }}
    >
      {/* ── Background Layer: Warm Cream Temple Atmosphere ── */}
      <LaunchBackground />

      {/* ── Corner Branding Accents (Desktop Editorial Feel) ── */}
      <div
        className="hidden md:block"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 32,
          left: 40,
          zIndex: 2,
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(168, 130, 42, 0.6)",
        }}
      >
        EST. MMXXVI &middot; VEDIC HERITAGE
      </div>

      <div
        className="hidden md:block"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 32,
          right: 40,
          zIndex: 2,
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(168, 130, 42, 0.6)",
        }}
      >
        INDIA &middot; WORLDWIDE
      </div>

      {/* ── Main Content Container ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 720,
          gap: 0,
        }}
      >
        {/* 1. HERO LOGO EMBLEM (Floating centerpiece with Parallax) */}
        <LaunchLogo />

        {/* 2. BRAND NAME & TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "clamp(24px, 3.5vh, 40px)",
          }}
        >
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "clamp(28px, 4.5vw, 42px)",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "#1A0F0A",
              margin: 0,
              lineHeight: 1,
            }}
          >
            RAMANAYAM
          </h2>

          <p
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "clamp(10px, 1.2vw, 12px)",
              fontWeight: 600,
              letterSpacing: "0.36em",
              textTransform: "uppercase" as const,
              color: "#A8822A",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            DEVOTION LIVES HERE
          </p>

          <div
            style={{
              width: 44,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(168, 130, 42, 0.5), transparent)",
              marginTop: 18,
            }}
          />
        </motion.div>

        {/* 3. HERO HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "clamp(34px, 6vw, 62px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#1A0F0A",
            textAlign: "center",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            margin: "0 0 clamp(16px, 2.5vh, 24px)",
            maxWidth: 620,
          }}
        >
          Something Sacred
          <br />
          Is Coming
        </motion.h1>

        {/* 4. SUB-HEADLINE / DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(14px, 1.7vw, 16px)",
            fontWeight: 400,
            color: "rgba(26, 15, 10, 0.7)",
            textAlign: "center",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 0 clamp(32px, 4.5vh, 52px)",
          }}
        >
          Ramanayam is preparing a new sanctuary for authentic Puja Samagri,
          Bhagwan&nbsp;Vastra, Temple Shringar, and sacred essentials — curated
          with reverence for your spiritual journey.
        </motion.p>

        {/* 5. COUNTDOWN TIMER */}
        <div style={{ marginBottom: "clamp(36px, 5vh, 52px)", width: "100%" }}>
          <LaunchCountdown />
        </div>

        {/* 6. DIVIDER */}
        <div
          style={{
            width: 64,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(168, 130, 42, 0.35), transparent)",
            marginBottom: "clamp(28px, 4vh, 40px)",
          }}
        />

        {/* 7. VIP NOTIFY FORM */}
        <LaunchNotifyForm />
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "auto",
          paddingTop: "clamp(36px, 4vh, 56px)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 12,
            color: "rgba(26, 15, 10, 0.45)",
            letterSpacing: "0.06em",
          }}
        >
          &copy; {new Date().getFullYear()} Ramanayam &middot; Sacred Rituals &middot;
          Modern Living
        </p>
      </motion.footer>
    </div>
  );
}
