"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Clock, ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { getOccasionBySlug, getProductsForOccasion, occasions } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart";
import { PageTransition } from "@/components/animations/PageTransition";
import { cn } from "@/lib/utils";

export default function OccasionPage({ params }: { params: Promise<{ festival: string }> }) {
  const { festival } = use(params);
  const occasion = getOccasionBySlug(festival);

  if (!occasion) {
    return (
      <PageTransition>
        <div className="pt-40 pb-24 text-center min-h-screen bg-[#090514] text-white">
          <p className="text-6xl mb-6 select-none animate-float">🕉️</p>
          <h1 className="text-2xl font-display text-white mb-4">Festival not found</h1>
          <Link href="/" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">
            ← Back to Home
          </Link>
        </div>
      </PageTransition>
    );
  }

  const festivalProducts = getProductsForOccasion(occasion);

  return <OccasionContent occasion={occasion} products={festivalProducts} />;
}

function OccasionContent({ occasion, products: festivalProducts }: { occasion: ReturnType<typeof getOccasionBySlug> & {}; products: ReturnType<typeof getProductsForOccasion> }) {
  const addItem = useCartStore((s) => s.addItem);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!occasion.date) return;

    const targetDate = new Date(occasion.date).getTime();

    const updateTimer = () => {
      const difference = targetDate - Date.now();
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown({ days: d, hours: h, minutes: m });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [occasion.date]);

  const emojiMap: Record<string, string> = {
    diwali: "🪔",
    navratri: "🔱",
    "ganesh-chaturthi": "🐘",
    janmashtami: "🦚",
    "durga-puja": "⚔️",
    holi: "🎨",
    "daily-puja": "🙏",
  };

  const handleAddAll = () => {
    festivalProducts.forEach((p) => addItem(p, 1));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#090514] text-white pt-24">
        
        {/* Banner Hero */}
        <div className="relative pt-20 pb-20 bg-linear-to-br from-[#130926] via-[#1F113C] to-[#090514] overflow-hidden border-b border-white/5">
          {/* Faded background icon */}
          <div className="absolute inset-0 flex items-center justify-center text-[280px] opacity-[0.035] select-none pointer-events-none">
            {emojiMap[occasion.slug] || "🙏"}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-white/50 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors mb-8 cursor-pointer bg-white/3 border border-white/10 px-4 py-2 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase mb-3.5 block font-hindi">
                {occasion.nameHi}
              </span>
              <h1 className="text-3.5xl md:text-5xl lg:text-6xl font-display text-white tracking-wide mb-5">
                {occasion.name}
              </h1>
              <p className="text-white/60 text-xs sm:text-sm font-serif max-w-xl mx-auto mb-10 leading-relaxed">
                {occasion.description}
              </p>

              {/* Redesigned countdown */}
              {occasion.date && (
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/3 border border-white/10 rounded-[24px] shadow-inner select-none backdrop-blur-md">
                  <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest font-serif">
                    <Clock className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span>Countdown Clock</span>
                  </div>
                  <div className="flex gap-3 text-white font-mono text-xs font-bold">
                    <div className="bg-white/3 border border-white/10 rounded-xl px-4 py-2 flex flex-col items-center">
                      <span className="text-lg text-accent font-bold font-mono">{countdown.days}</span>
                      <span className="text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Days</span>
                    </div>
                    <div className="bg-white/3 border border-white/10 rounded-xl px-4 py-2 flex flex-col items-center">
                      <span className="text-lg text-accent font-bold font-mono">{countdown.hours}</span>
                      <span className="text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Hrs</span>
                    </div>
                    <div className="bg-white/3 border border-white/10 rounded-xl px-4 py-2 flex flex-col items-center">
                      <span className="text-lg text-accent font-bold font-mono">{countdown.minutes}</span>
                      <span className="text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Mins</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Catalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Bundle Kit banner */}
          {festivalProducts.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-16 p-6 md:p-8 bg-linear-to-r from-accent/5 to-gold/5 rounded-[32px] border border-accent/15 shadow-premium backdrop-blur-md"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2 font-serif">
                    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                    Complete {occasion.name} Puja Samagri Bundle
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm font-serif leading-relaxed max-w-xl">
                    Get all {festivalProducts.length} auspicious offerings required for the {occasion.name} prayers in a single, verified collection kit.
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddAll}
                  className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-md shadow-accent/15 text-xs uppercase tracking-widest shrink-0 cursor-pointer border border-white/10"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  Add All to Cart
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Catalog grid */}
          <h2 className="text-xl md:text-2.5xl font-display text-white mb-8 tracking-wide flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            {occasion.name} Ritual Collection
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {festivalProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Other Occasions Footer Strip */}
          <section className="mt-28 pt-16 border-t border-white/5">
            <h2 className="text-xl md:text-2.5xl font-display text-white mb-8 tracking-wide">
              Explore Other Festive Offerings
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none">
              {occasions
                .filter((o) => o.slug !== occasion.slug)
                .map((o) => (
                  <Link key={o.slug} href={`/occasions/${o.slug}`}>
                    <div className="shrink-0 px-6 py-5 rounded-2xl transition-all text-center min-w-[150px] shadow-sm hover:shadow-glow border border-white/10 hover:border-accent liquid-glass">
                      <p className="text-3xl mb-3 select-none">{emojiMap[o.slug] || "🙏"}</p>
                      <p className="text-[10px] font-bold text-white tracking-widest uppercase font-serif">{o.name}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>

      </div>
    </PageTransition>
  );
}
