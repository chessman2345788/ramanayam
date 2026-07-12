"use client";

import Link from "next/link";
import Image from "next/image";
import { occasions } from "@/data/products";
import { FadeInOnScroll } from "@/components/animations/PageTransition";
import { useState } from "react";

export function OccasionCollections() {
  return (
    <section className="bg-transparent py-24 border-b border-white/5 relative overflow-hidden z-10">
      {/* Decorative background sparks */}
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-saffron/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-44 h-44 bg-[#2D1B4E]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <span className="text-accent text-[10px] font-bold tracking-[0.25em] uppercase mb-2.5 block font-serif">
              Sacred Liturgies & Festivals
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-white tracking-wide">
              Shop by Occasion
            </h2>
          </div>
        </FadeInOnScroll>

        {/* Horizontal Editorial Timeline */}
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6">
          {occasions.map((occ, i) => (
            <FadeInOnScroll key={occ.id} delay={i * 0.06} direction="right">
              <Link href={`/occasions/${occ.slug}`}>
                <div className="group shrink-0 w-60 sm:w-72 snap-start cursor-pointer">
                  <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden transition-all duration-700 liquid-glass border border-white/8 group-hover:border-saffron group-hover:shadow-glow shadow-2xl">
                    
                    {/* Occasion Image Backdrop */}
                    <OccasionImage occ={occ} />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0D0818]/95 via-[#0D0818]/30 to-transparent transition-opacity duration-300 z-10" />

                    {/* Inner border frame highlight */}
                    <div className="absolute inset-2 border border-white/5 group-hover:border-saffron/10 transition-colors duration-700 rounded-[20px] pointer-events-none z-20" />

                    {/* Label contents */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <span className="text-accent text-[8px] uppercase tracking-[0.25em] font-bold font-hindi">
                        {occ.nameHi}
                      </span>
                      
                      <h3 className="text-white text-lg sm:text-xl font-display mt-2 group-hover:text-saffron transition-colors tracking-wide">
                        {occ.name}
                      </h3>
                      
                      {occ.date && (
                        <p className="text-[#C6C7D8]/60 text-[10px] font-semibold font-mono tracking-wider mt-3 uppercase group-hover:text-[#C6C7D8]/80 transition-colors">
                          {new Date(occ.date).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function OccasionImage({ occ }: { occ: typeof occasions[0] }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !occ.image) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-15 group-hover:opacity-30 transition-all duration-700 group-hover:scale-108 z-0">
        {occ.slug === "diwali" && "🪔"}
        {occ.slug === "navratri" && "🔱"}
        {occ.slug === "ganesh-chaturthi" && "🐘"}
        {occ.slug === "janmashtami" && "🦚"}
        {occ.slug === "durga-puja" && "⚔️"}
        {occ.slug === "holi" && "🎨"}
        {occ.slug === "daily-puja" && "🙏"}
      </div>
    );
  }

  return (
    <Image
      src={occ.image}
      alt={occ.name}
      fill
      className="object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out z-0"
      onError={() => setImgError(true)}
      sizes="(max-width: 640px) 240px, 288px"
    />
  );
}
