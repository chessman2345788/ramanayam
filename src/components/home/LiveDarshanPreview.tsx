"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, Radio, Users, MapPin, ArrowRight } from "lucide-react";
import { liveDarshans } from "@/data/products";

export function LiveDarshanPreview() {
  const stream = liveDarshans[0] || {
    title: "Kashi Vishwanath Aarti",
    location: "Varanasi, UP",
    viewerCount: 14205,
    thumbnailUrl: "/images/darshan/kashi.jpg",
  };

  return (
    <section className="py-32 bg-(--bg-page) border-b border-(--border-subtle) relative z-10 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Narrative (5 cols) */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-3 font-serif flex items-center justify-center lg:justify-start gap-1.5">
              <Radio className="w-3.5 h-3.5 text-accent animate-pulse" />
              Spiritual Broadcaster
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-(--text-primary) tracking-wide leading-tight mb-5">
              Live Darshan
            </h2>
            <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Experience the divine in real-time. Join standard morning rituals and temple prayers directly from India&apos;s oldest shrines. Connect with millions of devotees worldwide.
            </p>
            <Link href="/live-darshan">
              <motion.span
                whileHover={{ scale: 1.02, color: "#FFFFFF" }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary cursor-pointer px-8 py-3.5 border border-(--border-subtle) uppercase tracking-widest text-[9px] font-bold inline-flex items-center gap-2"
              >
                Enter Streaming Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>

          {/* Right Block: Cinematic Player Preview (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative aspect-video rounded-[32px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) hover:border-(--card-hover-border) shadow-sm group cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* Thumbnail */}
            <div className="absolute inset-0 z-0">
              {stream.thumbnailUrl ? (
                <Image
                  src={stream.thumbnailUrl}
                  alt={stream.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#1F113C] to-[#090514]" />
              )}
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/25" />
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.div
                whileHover={{ scale: 1.1, backgroundColor: "var(--accent)" }}
                className="w-16 h-16 bg-[#090514]/40 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/10 shadow-md pointer-events-auto transition-colors duration-500"
              >
                <Play className="w-5 h-5 ml-1 fill-white text-white" />
              </motion.div>
            </div>

            {/* Status pills top */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EF4444] text-white text-[8px] font-bold tracking-widest rounded-full shadow-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                LIVE
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/5 text-white text-[8px] font-mono tracking-wider rounded-full shadow-md">
                <Users className="w-3 h-3 text-accent" />
                {stream.viewerCount.toLocaleString()} Devotees
              </div>
            </div>

            {/* Stream info bottom (Liquid glass pill) */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl liquid-glass border border-white/5 flex items-center justify-between z-10 pointer-events-none">
              <div className="text-left">
                <h4 className="text-white text-xs sm:text-sm font-bold tracking-wide">{stream.title}</h4>
                <div className="flex items-center gap-1.5 text-white/50 text-[9px] font-semibold mt-1">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span>{stream.location}</span>
                </div>
              </div>
              
              <div className="text-right text-white/40 text-[8px] tracking-wider uppercase font-mono hidden sm:block">
                Direct Feed
              </div>
            </div>

            {/* Inner frame */}
            <div className="absolute inset-3 border border-white/10 rounded-[24px] pointer-events-none z-20" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
