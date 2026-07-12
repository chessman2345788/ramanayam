"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";

export function BestSellers() {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  // Pick Ganesh Murti as the Hero product (prod-2)
  const heroProduct = products.find((p) => p.id === "prod-2") || products[0];
  // Supporting products (prod-1, prod-3)
  const supportingProducts = products.filter(
    (p) => p.id === "prod-1" || p.id === "prod-3"
  );

  const heroWishlisted = isInWishlist(heroProduct.id);

  return (
    <section className="py-32 bg-(--bg-page) border-b border-(--border-subtle) relative z-10 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-(--border-subtle) pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-3 block font-serif">
              Devotee Favorites
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-(--text-primary) tracking-wide">
              Best Sellers
            </h2>
          </div>
          <Link href="/products" className="group text-[10px] font-bold uppercase tracking-widest text-accent transition-colors flex items-center gap-1.5 cursor-pointer">
            Explore All offerings
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Premium Showcase Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Hero Product (Takes up 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col md:flex-row gap-8 p-6.5 sm:p-8 rounded-[32px] liquid-glass relative overflow-hidden group shadow-sm hover:shadow-accent border border-(--border-subtle) hover:border-(--card-hover-border) bg-(--card-bg) transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* Slanted reflection sweep */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

            {/* Giant Photo block */}
            <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-(--bg-elevated) shrink-0 z-0">
              {heroProduct.image ? (
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover scale-100 group-hover:scale-106 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#2D1B4E]/10 to-[#1B1036]/50 text-accent">
                  <span className="text-4xl">🕉️</span>
                </div>
              )}
              
              {/* Wishlist triggers */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.preventDefault();
                  toggleItem(heroProduct);
                }}
                className={cn(
                  "absolute top-4 right-4 p-3 rounded-full cursor-pointer transition-colors shadow-xs border z-20",
                  heroWishlisted
                    ? "bg-accent border-accent text-white"
                    : "bg-(--bg-surface) text-(--text-secondary) hover:text-accent border-(--border-subtle)"
                )}
              >
                <Heart className={cn("w-3.5 h-3.5", heroWishlisted && "fill-current animate-pulse")} />
              </motion.button>
            </div>

            {/* Content text description */}
            <div className="flex-1 flex flex-col justify-between py-2 min-w-0">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent mb-2.5 block font-serif">
                  {heroProduct.category}
                </span>
                
                <Link href={`/products/${heroProduct.slug}`}>
                  <h3 className="text-xl sm:text-2xl font-display text-(--text-primary) mb-2 leading-tight hover:text-accent group-hover:-translate-y-0.5 transition duration-500">
                    {heroProduct.name}
                  </h3>
                </Link>
                
                <p className="text-(--text-secondary) text-xs leading-relaxed mb-4 line-clamp-4 font-serif">
                  {heroProduct.description}
                </p>

                {/* Rating display */}
                <div className="flex items-center gap-1.5 mb-6 select-none font-semibold text-[10px] text-(--text-muted)">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-(--text-primary) text-xs font-bold">{heroProduct.rating}</span>
                  <span>({heroProduct.reviewCount} Reviews)</span>
                </div>
              </div>

              {/* Action trigger row */}
              <div className="border-t border-(--border-subtle) pt-5 mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-(--text-muted) uppercase tracking-wider font-bold">Divine Price</span>
                  <span className="text-xl font-bold font-mono text-(--text-primary) mt-0.5">
                    ₹{heroProduct.price.toLocaleString("en-IN")}
                  </span>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addItem(heroProduct, 1)}
                  className="flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover text-[10px] font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer border border-white/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Supporting items stacked (Takes 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {supportingProducts.map((prod, idx) => {
              const wishlisted = isInWishlist(prod.id);
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex gap-5 p-4 rounded-2xl bg-(--card-bg) border border-(--border-subtle) hover:border-(--card-hover-border) relative overflow-hidden group/item shadow-xs hover:shadow-accent transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Slanted reflection sweep */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

                  {/* Photo thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-(--bg-elevated) shrink-0 z-0">
                    {prod.image ? (
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover scale-100 group-hover/item:scale-105 transition-transform duration-700 ease-out"
                        sizes="112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#2D1B4E]/10 to-[#1B1036]/50 text-accent">
                        <span className="text-xl">🔱</span>
                      </div>
                    )}
                  </div>

                  {/* Descriptions details */}
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${prod.slug}`}>
                          <h4 className="text-sm font-bold text-(--text-primary) group-hover/item:text-accent line-clamp-1 group-hover/item:-translate-y-0.5 transition duration-500">
                            {prod.name}
                          </h4>
                        </Link>
                        
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItem(prod);
                          }}
                          className={cn(
                            "p-1.5 rounded-full cursor-pointer transition-colors border",
                            wishlisted
                              ? "bg-accent border-accent text-white"
                              : "bg-(--bg-surface) text-(--text-secondary) hover:text-accent border-(--border-subtle)"
                          )}
                        >
                          <Heart className={cn("w-3 h-3", wishlisted && "fill-current animate-pulse")} />
                        </motion.button>
                      </div>
                      
                      <p className="text-[8px] text-accent uppercase tracking-wider font-bold mt-1">
                        {prod.category}
                      </p>
                      
                      <p className="text-(--text-secondary) text-[11px] leading-relaxed mt-2 line-clamp-2 font-serif">
                        {prod.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-(--border-subtle) pt-2.5 mt-3">
                      <span className="text-xs font-bold font-mono text-(--text-primary)">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                      
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addItem(prod, 1)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-(--bg-elevated) hover:bg-accent hover:text-white text-(--text-primary) rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer border border-(--border-subtle)"
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
