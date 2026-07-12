"use client";

import { FadeInOnScroll } from "@/components/animations/PageTransition";
import { ShieldCheck, Truck, RotateCcw, Landmark, Lock, Gift } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  { icon: ShieldCheck, text: "100% Pure & Authentic", desc: "Sourced naturally" },
  { icon: Truck, text: "Delivered Pan India", desc: "Safe, trackable dispatch" },
  { icon: RotateCcw, text: "Easy Returns", desc: "7-day seamless policy" },
  { icon: Landmark, text: "COD Available", desc: "Pay on receipt" },
  { icon: Lock, text: "Secure Payments", desc: "SSL encrypted gateways" },
  { icon: Gift, text: "Gift Packaging", desc: "Sacred festive boxes" },
];

export function TrustBar() {
  return (
    <section className="bg-transparent py-14 border-y border-white/5">
      <div className="container">
        <FadeInOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.text}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-3 relative group"
              >
                {/* Icon wrapper with liquid glass */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#C8C8D5] transition-all duration-300 liquid-glass group-hover:border-accent group-hover:text-saffron group-hover:shadow-glow">
                  <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-0.5 select-none">
                  <span className="text-white text-[11px] font-bold uppercase tracking-wider">
                    {item.text}
                  </span>
                  <span className="text-[#C8C8D5]/60 text-[9px] font-semibold">
                    {item.desc}
                  </span>
                </div>
                
                {/* Visual Separators between items (only desktop) */}
                {index < 5 && (
                  <div className="hidden lg:block absolute right-[-15%] top-4 w-px h-10 bg-linear-to-b from-transparent via-white/5 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
