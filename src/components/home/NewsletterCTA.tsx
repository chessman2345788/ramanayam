"use client";

import { FadeInOnScroll } from "@/components/animations/PageTransition";
import { MessageSquare, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function NewsletterCTA() {
  return (
    <section className="bg-transparent relative overflow-hidden py-20 border-y border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <div className="absolute top-10 left-10 text-[260px] leading-none text-white">🪷</div>
        <div className="absolute bottom-10 right-10 text-[260px] leading-none text-white">🪔</div>
      </div>

      <div className="relative max-w-3xl mx-auto text-center px-6">
        <FadeInOnScroll>
          <p className="text-saffron text-xs font-bold tracking-[0.3em] uppercase mb-4 font-serif flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            Stay Sanctified
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-white mb-5 leading-tight">
            Festival Offers & Puja Reminders
          </h2>
          <p className="text-[#C8C8D5] text-xs sm:text-sm mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Join our mailing list to receive auspicious festival reminders, curated puja Vidhi guides, and early access to handcrafted sacred launches.
          </p>

          {/* Subscribe Form (Liquid Glass input + gradient button) */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-12 pl-11 pr-5 bg-white/5 border border-white/8 rounded-full text-white placeholder:text-white/30 text-xs font-semibold focus:outline-none focus:border-saffron/50 focus:bg-white/10 transition-all shadow-inner"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(249, 115, 22, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 h-12 bg-saffron text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-saffron-hover transition-all shrink-0 cursor-pointer border border-white/10"
            >
              Subscribe
            </motion.button>
          </div>

          {/* WhatsApp CTA */}
          <motion.button 
            whileHover={{ scale: 1.03, backgroundColor: "rgba(34, 197, 94, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-green-400" />
            Join WhatsApp for Daily Alankars
          </motion.button>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
