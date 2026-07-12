"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Sacred Altars",
    tagline: "Divine Presence",
    desc: "Exquisitely cast brass deities and hand-carved rosewood mandirs that establish a serene focus for daily prayer.",
    image: "/images/categories/idols-shrines.jpg",
    link: "/products?category=idols-shrines",
    size: "large",
  },
  {
    title: "Aromatic Herbs",
    tagline: "Temple Fragrance",
    desc: "Hand-rolled incenses and organic camphor to cleanse the air and lift your spiritual vibration.",
    image: "/images/categories/puja-essentials.jpg",
    link: "/products?category=puja-essentials",
    size: "small",
  },
  {
    title: "Vedic Lights",
    tagline: "Infinite Brilliance",
    desc: "Akhand jyot lamps and copper diyas engineered to keep the sacred flame burning bright.",
    image: "/images/categories/lamps-diyas.jpg",
    link: "/products?category=lamps-diyas",
    size: "small",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-32 bg-(--bg-page) border-b border-(--border-subtle) relative z-10 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-[-15%] w-[40vw] h-[40vw] rounded-full bg-(--glow-spot-1)/5 filter blur-[150px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-3 block font-serif">
              Holy Curations
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-(--text-primary) tracking-wide leading-tight">
              Featured Collections
            </h2>
          </div>
          <p className="text-(--text-secondary) text-xs sm:text-sm font-serif max-w-xs leading-relaxed">
            Discover carefully compiled sacred elements, handcrafted by generational artisans in India's holy towns.
          </p>
        </div>

        {/* Magazine Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: One giant card (Takes up 7 cols) */}
          <div className="lg:col-span-7">
            {collections.filter(c => c.size === "large").map((col) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative flex flex-col h-full justify-between"
              >
                <div className="relative aspect-16/10 rounded-[32px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) shadow-sm group-hover:border-(--card-hover-border) transition-all duration-700">
                  <div className="absolute inset-0 bg-linear-to-t from-(--bg-page) via-transparent to-transparent opacity-80 z-10" />
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  <div className="absolute inset-3 border border-(--border-subtle) rounded-[24px] pointer-events-none z-20" />
                </div>
                
                <div className="mt-8 pr-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-bold block mb-2">{col.tagline}</span>
                  <h3 className="text-2xl sm:text-3.5xl font-display text-(--text-primary) mb-3 hover:text-accent group-hover:-translate-y-0.5 transition duration-500">
                    {col.title}
                  </h3>
                  <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-6 max-w-lg">
                    {col.desc}
                  </p>
                  <Link href={col.link} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent transition-colors group/btn">
                    Explore Collection
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Two smaller cards stacked (Takes 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:gap-16 justify-between">
            {collections.filter(c => c.size === "small").map((col, idx) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                className="group relative flex flex-col justify-between h-1/2"
              >
                <div className="relative aspect-16/10 rounded-[28px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) shadow-xs group-hover:border-(--card-hover-border) transition-all duration-700">
                  <div className="absolute inset-0 bg-linear-to-t from-(--bg-page) via-transparent to-transparent opacity-85 z-10" />
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-2.5 border border-(--border-subtle) rounded-[20px] pointer-events-none z-20" />
                </div>

                <div className="mt-6">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-accent font-bold block mb-2">{col.tagline}</span>
                  <h3 className="text-xl sm:text-2xl font-display text-(--text-primary) mb-2 hover:text-accent group-hover:-translate-y-0.5 transition duration-500">
                    {col.title}
                  </h3>
                  <p className="text-(--text-secondary) text-xs font-serif leading-relaxed mb-4 max-w-md">
                    {col.desc}
                  </p>
                  <Link href={col.link} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-accent transition-colors group/btn">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
