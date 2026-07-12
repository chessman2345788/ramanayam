"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DiyaFlame } from "@/components/animations/DiyaFlame";
import { MandalaBg } from "@/components/animations/MandalaBg";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax progress hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform calculations
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden border-b border-(--border-subtle) bg-(--bg-page) z-10"
    >
      {/* 1. Immersive Hero Image Backdrop with Parallax */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
        className="absolute inset-0 z-0 pointer-events-none select-none"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        {/* Deep luxury vignette overlay using theme variables */}
        <div className="absolute inset-0 bg-linear-to-b from-(--bg-page)/40 via-(--bg-page)/70 to-(--bg-page)" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-(--bg-page)/80" />
      </motion.div>

      {/* 2. Interactive Parallax Light Rays & Ambient Spots */}
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Soft Saffron glowing orb */}
        <div className="absolute top-[25%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-accent/5 filter blur-[120px] mix-blend-screen animate-pulse duration-8000" />
        {/* Deep Royal Purple glowing orb */}
        <div className="absolute bottom-[20%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-(--glow-spot-1)/15 filter blur-[140px] mix-blend-screen" />
        
        {/* Light rays graphic overlays */}
        <div 
          className="absolute inset-0 opacity-[0.06] mix-blend-color-dodge"
          style={{
            background: "radial-gradient(circle at 50% 30%, var(--accent) 0%, transparent 60%)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </motion.div>

      {/* 3. Soft rotating Mandala background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          style={{ x: useTransform(parallaxX, (v) => v * 0.4), y: useTransform(parallaxY, (v) => v * 0.4) }}
        >
          <MandalaBg className="opacity-[0.03] scale-125 md:scale-135 pointer-events-none animate-mandala-spin" />
        </motion.div>
      </div>

      {/* 4. Golden Particles Layer */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: i % 2 === 0 ? "var(--accent)" : "var(--gold)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.05, 0.5, 0.05],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 10 + Math.random() * 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* 5. Animated Smoke overlays */}
      <div className="absolute inset-x-0 bottom-0 h-96 z-1 pointer-events-none overflow-hidden opacity-10 select-none">
        <div className="smoke-overlay absolute inset-0 mix-blend-screen bg-linear-to-t from-transparent via-(--bg-elevated)/5 to-transparent" />
      </div>

      {/* 6. Luxury Editorial Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-24">
        
        {/* Floating sacred flame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 cursor-pointer select-none flex flex-col items-center group"
        >
          <div className="p-4 rounded-full border border-(--border-subtle) bg-(--card-bg)/80 backdrop-blur-md shadow-xs hover:border-accent/35 transition-all duration-500">
            <DiyaFlame size={32} />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] mt-3 font-semibold text-accent font-serif">
            Sacred Craft
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <h1 
          className="text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] font-display text-(--text-primary) mb-6 uppercase max-w-4xl select-none"
        >
          <motion.span 
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block pb-1"
          >
            Pure Devotion
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block pb-1 text-accent"
          >
            Handcrafted
          </motion.span>
        </h1>

        {/* Minimal Editorial Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-(--text-secondary) text-xs sm:text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed tracking-wide font-serif"
        >
          Elevate your worship space. Authentic creations curated by traditional Indian craftsmen, delivered directly to your home altar.
        </motion.p>

        {/* Luxury CTA triggers in Glass container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto p-3.5 rounded-[24px] bg-(--card-bg)/80 backdrop-blur-md border border-(--border-subtle) shadow-xs"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(245, 124, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-lg w-full sm:w-auto cursor-pointer uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-white/10 bg-accent text-white text-[10px] font-bold shadow-md shadow-accent/15"
            >
              Explore Catalog
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </Link>

          <Link href="/live-darshan" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.02, backgroundColor: "var(--accent-muted)", borderColor: "var(--accent)" }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-lg w-full sm:w-auto cursor-pointer uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-(--bg-elevated) border border-(--border-subtle) text-(--text-primary) text-[10px] font-bold"
            >
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Watch Live
            </motion.span>
          </Link>
        </motion.div>

      </div>

      {/* Vignette bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-(--bg-page) to-transparent pointer-events-none z-10" />
    </section>
  );
}
