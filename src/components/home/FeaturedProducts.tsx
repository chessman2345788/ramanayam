"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShoppingBag, Star, Heart } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [imgErrorHero, setImgErrorHero] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (featured.length === 0) return null;

  // Asymmetrical Partition:
  // First item acts as the massive Spotlight Hero Product
  const heroProduct = featured[0];
  // Next 3 items are shown as supporting staggered editorial items
  const items = featured.slice(1, 4);

  const heroWishlisted = isInWishlist(heroProduct.id);

  return (
    <section className="bg-transparent py-24 border-b border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-saffron mb-3 font-serif flex items-center gap-1.5 justify-center md:justify-start">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              Curated Masterpieces
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-white text-center md:text-left tracking-wide">
              Divine Favorites
            </h2>
          </div>
          <Link href="/products" className="group text-[10px] font-bold uppercase tracking-widest text-saffron transition-colors flex items-center gap-1.5 self-center md:self-end cursor-pointer">
            <span>Explore All offerings</span> 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical Grid Rebuild */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Spotlight Hero Product (Takes up 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col md:flex-row gap-8 p-6 sm:p-8 rounded-[32px] liquid-glass relative overflow-hidden group shadow-2xl border border-white/8"
          >
            {/* Ambient Background Glow spot */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-saffron/8 filter blur-3xl group-hover:bg-saffron/12 transition-colors duration-700 pointer-events-none" />

            {/* Giant Photo block */}
            <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/5 shrink-0">
              {!imgErrorHero && heroProduct.image ? (
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover scale-100 group-hover:scale-106 transition-transform duration-1000 ease-out"
                  onError={() => setImgErrorHero(true)}
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#2D1B4E]/10 to-[#1B1036]/50 text-accent">
                  <span className="text-4xl">🕉️</span>
                </div>
              )}
              
              {/* Wishlist triggers */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  toggleItem(heroProduct);
                }}
                className={cn(
                  "absolute top-4 right-4 p-3 rounded-full cursor-pointer transition-colors shadow-premium border z-20",
                  heroWishlisted
                    ? "bg-saffron border-saffron text-white"
                    : "bg-white/5 text-[#C6C7D8] hover:text-saffron border-white/5 hover:bg-white/10"
                )}
              >
                <Heart className={cn("w-3.5 h-3.5", heroWishlisted && "fill-current")} />
              </motion.button>
            </div>

            {/* Content text description */}
            <div className="flex-1 flex flex-col justify-between py-2">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent mb-2.5 block">
                  {heroProduct.category}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-display text-white mb-2 leading-tight group-hover:text-saffron transition-colors">
                  {heroProduct.name}
                </h3>
                
                <p className="text-[#C6C7D8] text-xs leading-relaxed mb-4 line-clamp-4 font-medium">
                  {heroProduct.description}
                </p>

                {/* Rating display */}
                <div className="flex items-center gap-1.5 mb-6 select-none font-semibold text-[10px] text-[#C6C7D8]/60">
                  <Star className="w-3.5 h-3.5 text-saffron fill-saffron" />
                  <span className="text-white text-xs font-bold">{heroProduct.rating}</span>
                  <span>({heroProduct.reviewCount} Reviews)</span>
                </div>
              </div>

              {/* Action trigger row */}
              <div className="border-t border-white/5 pt-5 mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#C6C7D8]/60 uppercase tracking-wider font-bold">Divine Price</span>
                  <span className="text-xl font-bold font-mono text-white mt-0.5">
                    ₹{heroProduct.price.toLocaleString("en-IN")}
                  </span>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addItem(heroProduct, 1)}
                  className="flex items-center gap-2 px-5 py-3 bg-saffron text-white rounded-xl hover:bg-saffron-hover text-[10px] font-bold uppercase tracking-wider shadow-md shadow-saffron/10 transition-colors cursor-pointer border border-white/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </div>

          </motion.div>

          {/* Right: Staggered Supporting Items List (Takes up 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {items.map((prod, idx) => {
              const wishlisted = isInWishlist(prod.id);
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex gap-5 p-4 rounded-2xl liquid-glass border border-white/5 relative overflow-hidden group/item shadow-lg hover:border-accent/30 transition-all duration-500"
                >
                  {/* Photo thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white/5 border border-white/5 shrink-0">
                    {prod.image ? (
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover scale-100 group-hover/item:scale-106 transition-transform duration-700 ease-out"
                        sizes="112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#2D1B4E]/10 text-accent">
                        <span className="text-xl">🔱</span>
                      </div>
                    )}
                  </div>

                  {/* Descriptions details */}
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-white group-hover/item:text-saffron transition-colors line-clamp-1">
                          {prod.name}
                        </h4>
                        
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItem(prod);
                          }}
                          className={cn(
                            "p-1.5 rounded-full cursor-pointer transition-colors border",
                            wishlisted
                              ? "bg-saffron border-saffron text-white"
                              : "bg-white/5 text-[#C6C7D8] border-white/5 hover:bg-white/10"
                          )}
                        >
                          <Heart className={cn("w-3 h-3", wishlisted && "fill-current")} />
                        </motion.button>
                      </div>
                      
                      <p className="text-[9px] text-[#C6C7D8]/60 uppercase tracking-wider font-bold mt-1">
                        {prod.category}
                      </p>
                      
                      <p className="text-[#C6C7D8] text-[11px] leading-relaxed mt-2 line-clamp-2 font-medium">
                        {prod.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-2.5 mt-3">
                      <span className="text-xs font-bold font-mono text-white">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                      
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addItem(prod, 1)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-saffron text-white rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer border border-white/8 hover:border-saffron"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Quick Add
                      </motion.button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
