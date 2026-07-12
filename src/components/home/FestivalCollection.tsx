"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function FestivalCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transform of background graphics
  const yImage = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacityText = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[65vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center bg-(--bg-page) border-b border-(--border-subtle) z-10"
    >
      {/* 1. Parallax Image Backdrop */}
      <motion.div 
        style={{ y: yImage }}
        className="absolute inset-0 z-0 select-none pointer-events-none w-full h-[120%] top-[-10%]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.45]"
          style={{ backgroundImage: "url('/images/occasions/diwali.jpg')" }}
        />
        {/* Soft vignette overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-page) via-(--bg-page)/40 to-(--bg-page)" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-(--bg-page)/90" />
      </motion.div>

      {/* 2. Glow details */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent/10 filter blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-(--glow-spot-1)/10 filter blur-[120px] mix-blend-screen" />
      </div>

      {/* 3. Storytelling copy in glass panel */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <div className="p-8 sm:p-12 rounded-[32px] border border-(--border-subtle) bg-(--card-bg)/80 backdrop-blur-md shadow-sm max-w-2xl">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-4 font-serif flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
            Seasonal Liturgy
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-display text-(--text-primary) tracking-wide mb-5">
            Diwali Collection
          </h2>
          
          <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-8 max-w-md mx-auto">
            Light the path of wisdom. Welcome Goddess Lakshmi with handcrafted brass wicks, pure cow ghee, and sacred clay diyas sculpted by traditional potters of Varanasi.
          </p>

          <Link href="/occasions/diwali">
            <motion.span
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(245, 124, 0, 0.35)" }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-lg cursor-pointer uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-white/10 bg-accent text-white text-[10px] font-bold shadow-md shadow-accent/20"
            >
              Explore Festive Bundles
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </Link>
        </div>
      </motion.div>

      {/* Inner accent lines border frame */}
      <div className="absolute inset-4 border border-(--border-subtle) rounded-[28px] pointer-events-none z-20" />
    </section>
  );
}
