"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryShowcase() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (slug: string) => {
    setImgErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // Helper component to render fallback SVGs
  const SVGIconFallback = ({ slug }: { slug: string }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-linear-to-br from-(--bg-elevated) to-(--bg-page) text-accent select-none">
      <div className="w-16 h-16 flex items-center justify-center filter drop-shadow-[0_2px_10px_rgba(245,124,0,0.15)]">
        {slug === "puja-essentials" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 stroke-[1.1] stroke-current">
            <path d="M12 2c0 0-4 6-4 10a4 4 0 0 0 8 0c0-4-4-10-4-10z" className="fill-saffron/10 stroke-saffron" />
            <path d="M6 19a6 6 0 0 0 12 0" className="stroke-gold" />
            <path d="M3 21h18" className="stroke-gold-dark" />
          </svg>
        )}
        {slug === "idols-shrines" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 stroke-[1.1] stroke-current">
            <path d="M3 21h18M5 21V12h14v9M12 2v4M10 6h4M12 6L5 12h14z" className="stroke-gold" />
            <circle cx="12" cy="16" r="2" className="fill-gold/5 stroke-gold" />
          </svg>
        )}
        {slug === "lamps-diyas" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 stroke-[1.1] stroke-current">
            <path d="M12 2v6M8 8h8v7a4 4 0 0 1-8 0V8z" className="stroke-gold" />
            <path d="M6 18h12v1H6z" className="stroke-gold-dark" />
            <circle cx="12" cy="18" r="1.5" className="fill-saffron/20 stroke-saffron" />
          </svg>
        )}
        {slug === "spiritual-wear" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 stroke-[1.1] stroke-current">
            <circle cx="12" cy="12" r="8" className="stroke-gold" strokeDasharray="3 3" />
            <circle cx="12" cy="20" r="2" className="fill-saffron stroke-saffron" />
          </svg>
        )}
        {slug === "decor-offerings" && (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 stroke-[1.1] stroke-current">
            <path d="M12 22c5-3 8-7 8-11s-3-7-8-7-8 3-8 7 3 8 8 11z" className="stroke-gold" />
          </svg>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-32 bg-(--bg-page) border-b border-(--border-subtle) relative z-10 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute right-[-10%] top-[-5%] w-[45vw] h-[45vw] rounded-full bg-accent/4 filter blur-[130px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[-5%] w-[45vw] h-[45vw] rounded-full bg-(--glow-spot-1)/10 filter blur-[150px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-3 block font-serif">
            Sacred Categories
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-(--text-primary) tracking-wide leading-tight">
            Auspicious Showcases
          </h2>
          <p className="text-(--text-secondary) text-xs sm:text-sm font-serif mt-4 max-w-md mx-auto leading-relaxed">
            Every collection is a visual narrative. Experience spiritual heritage through our distinct visual categories.
          </p>
        </div>

        <div className="space-y-36">
          {categories.map((cat, index) => {
            const hasError = !!imgErrors[cat.slug];

            // Category 1: Image Left, Content Right
            if (index === 0) {
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col md:flex-row gap-8 md:gap-16 items-center"
                >
                  <div className="w-full md:w-[55%] aspect-16/10 rounded-[32px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) relative group shadow-sm hover:border-(--card-hover-border) transition-all duration-500">
                    <div className="absolute inset-0 bg-[#090514]/5 group-hover:opacity-0 transition-opacity duration-700 z-10" />
                    {!hasError && cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        onError={() => handleImageError(cat.slug)}
                        sizes="(max-width: 1024px) 100vw, 640px"
                      />
                    ) : (
                      <SVGIconFallback slug={cat.slug} />
                    )}
                    <div className="absolute inset-3 border border-(--border-subtle) rounded-[24px] pointer-events-none z-20" />
                  </div>

                  <div className="w-full md:w-[45%] flex flex-col text-center md:text-left">
                    <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold mb-3 block font-hindi">{cat.nameHi}</span>
                    <h3 className="text-2xl md:text-4xl font-display text-(--text-primary) mb-4">{cat.name}</h3>
                    <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-8 max-w-md mx-auto md:mx-0">{cat.description}</p>
                    <Link href={`/products?category=${cat.slug}`} className="inline-flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent transition-colors group">
                      Browse Essentials
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            }

            // Category 2: Image Right, Content Left
            if (index === 1) {
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center"
                >
                  <div className="w-full md:w-[55%] aspect-16/10 rounded-[32px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) relative group shadow-sm hover:border-(--card-hover-border) transition-all duration-500">
                    <div className="absolute inset-0 bg-[#090514]/5 group-hover:opacity-0 transition-opacity duration-700 z-10" />
                    {!hasError && cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        onError={() => handleImageError(cat.slug)}
                        sizes="(max-width: 1024px) 100vw, 640px"
                      />
                    ) : (
                      <SVGIconFallback slug={cat.slug} />
                    )}
                    <div className="absolute inset-3 border border-(--border-subtle) rounded-[24px] pointer-events-none z-20" />
                  </div>

                  <div className="w-full md:w-[45%] flex flex-col text-center md:text-left">
                    <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold mb-3 block font-hindi">{cat.nameHi}</span>
                    <h3 className="text-2xl md:text-4xl font-display text-(--text-primary) mb-4">{cat.name}</h3>
                    <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-8 max-w-md mx-auto md:mx-0">{cat.description}</p>
                    <Link href={`/products?category=${cat.slug}`} className="inline-flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent transition-colors group">
                      Browse Deities
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            }

            // Category 3: Full Width Banner
            if (index === 2) {
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative rounded-[32px] overflow-hidden aspect-21/9 border border-(--border-subtle) shadow-sm group min-h-[300px] hover:border-(--card-hover-border) transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-(--bg-page) via-(--bg-page)/75 to-transparent z-10" />
                  {!hasError && cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
                      onError={() => handleImageError(cat.slug)}
                      sizes="100vw"
                    />
                  ) : (
                    <SVGIconFallback slug={cat.slug} />
                  )}
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 z-20 max-w-lg">
                    <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold mb-3 block font-hindi">{cat.nameHi}</span>
                    <h3 className="text-3xl md:text-5xl font-display text-(--text-primary) mb-4">{cat.name}</h3>
                    <p className="text-(--text-secondary) text-xs font-serif leading-relaxed mb-6 hidden sm:block">{cat.description}</p>
                    <Link href={`/products?category=${cat.slug}`}>
                      <motion.span 
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent cursor-pointer transition-colors"
                      >
                        Explore Divine Lamps
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.span>
                    </Link>
                  </div>

                  <div className="absolute inset-3 border border-(--border-subtle) rounded-[24px] pointer-events-none z-20" />
                </motion.div>
              );
            }

            // Category 4: Split Layout
            if (index === 3) {
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch"
                >
                  <div className="aspect-square relative rounded-[32px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) group shadow-xs">
                    <div className="absolute inset-0 bg-[#090514]/5 z-10" />
                    {!hasError && cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        onError={() => handleImageError(cat.slug)}
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    ) : (
                      <SVGIconFallback slug={cat.slug} />
                    )}
                    <div className="absolute inset-3 border border-(--border-subtle) rounded-[24px] pointer-events-none z-20" />
                  </div>

                  <div className="flex flex-col justify-center p-6 md:p-12 rounded-[32px] bg-(--card-bg) border border-(--border-subtle) hover:border-(--card-hover-border) transition-all duration-500 shadow-xs relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/5 filter blur-2xl pointer-events-none" />
                    <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold mb-3 block font-hindi">{cat.nameHi}</span>
                    <h3 className="text-2xl md:text-4xl font-display text-(--text-primary) mb-4">{cat.name}</h3>
                    <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-8 max-w-md">{cat.description}</p>
                    <Link href={`/products?category=${cat.slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent transition-colors group">
                      Browse Spiritual Wear
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            }

            // Category 5: Editorial Layout
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative max-w-5xl mx-auto rounded-[32px] overflow-hidden p-8 sm:p-16 border border-(--border-subtle) hover:border-(--card-hover-border) shadow-sm bg-(--card-bg) transition-all duration-500"
              >
                <div className="absolute inset-0 bg-linear-to-br from-(--bg-elevated)/30 to-(--bg-page)/10 z-0 pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="md:col-span-7 flex flex-col z-10">
                    <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold mb-3 block font-hindi">{cat.nameHi}</span>
                    <h3 className="text-3xl md:text-5xl font-display text-(--text-primary) mb-5 tracking-wide leading-tight">{cat.name}</h3>
                    <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-8 max-w-md">{cat.description}</p>
                    <Link href={`/products?category=${cat.slug}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent transition-colors group">
                      Browse Mandir Decor
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="md:col-span-5 aspect-square relative rounded-2xl overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) group shadow-md shrink-0">
                    <div className="absolute inset-0 bg-[#090514]/5 z-10" />
                    {!hasError && cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        onError={() => handleImageError(cat.slug)}
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    ) : (
                      <SVGIconFallback slug={cat.slug} />
                    )}
                    <div className="absolute inset-2 border border-(--border-subtle) rounded-xl pointer-events-none z-20" />
                  </div>
                </div>

                <div className="absolute inset-3 border border-(--border-subtle) rounded-[24px] pointer-events-none z-20" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
