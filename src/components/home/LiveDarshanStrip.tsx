"use client";

import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { liveDarshans } from "@/data/products";
import { motion } from "framer-motion";

export function LiveDarshanStrip() {
  const liveStream = liveDarshans.find((d) => d.isLive);
  const title = liveStream ? liveStream.title : "Kashi Vishwanath Morning Aarti";

  return (
    <div className="py-3.5 px-6 border-y border-white/5" style={{ background: 'var(--gradient-strip)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Live status label */}
        <div className="flex items-center gap-3.5 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-saffron/10 border border-saffron/30 rounded-lg select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron" />
            </span>
            <span className="text-[10px] font-bold text-saffron tracking-widest uppercase">
              Live Aarti
            </span>
          </div>
          <span className="text-white/20 text-xs hidden sm:inline-block">|</span>
          <span className="text-[#C8C8D5] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 select-none">
            <Radio className="w-3.5 h-3.5 text-saffron animate-pulse" />
            Now Broadcasting: <span className="text-white font-bold">{title}</span>
          </span>
        </div>

        {/* Action Link with transition scale */}
        <Link href="/live-darshan" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.03, color: "#FFFFFF" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-saffron hover:text-white transition-colors group cursor-pointer"
          >
            <span>Connect & View Portal</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </Link>
      </div>
    </div>
  );
}
