"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Eye } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  isSpotlight?: boolean;
}

export function ProductCard({ product, index = 0, isSpotlight = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const [imgError, setImgError] = useState(false);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  if (isSpotlight) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.04, duration: 0.8 }}
        className="group relative rounded-[28px] overflow-hidden flex flex-col md:flex-row gap-8 p-6.5 shadow-sm hover:shadow-accent transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.005] bg-(--card-bg) border border-(--border-subtle) hover:border-(--card-hover-border) h-full min-h-[340px]"
      >
        {/* Slanted Sheen Sweep Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

        {/* Spotlight Image (45% Width) */}
        <div className="relative w-full md:w-[45%] aspect-square rounded-2xl overflow-hidden bg-(--bg-elevated) shrink-0 z-0">
          <Link href={`/products/${product.slug}`} className="block w-full h-full relative z-0">
            <div className="absolute inset-0 bg-[#090514]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            
            {!imgError && product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover scale-100 group-hover:scale-106 transition-transform duration-1000 ease-out"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, 360px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#1F113C] to-[#090514] text-accent">
                <span className="text-3xl">🕉️</span>
              </div>
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none select-none">
            {discount > 0 ? (
              <span className="px-2.5 py-1 bg-accent text-white text-[8px] font-bold tracking-widest uppercase rounded shadow-xs">
                {discount}% Off
              </span>
            ) : product.badges.length > 0 ? (
              <span className="px-2.5 py-1 bg-(--bg-surface) text-(--text-primary) text-[8px] font-bold tracking-widest uppercase rounded border border-(--border-subtle)">
                {product.badges[0]}
              </span>
            ) : null}
          </div>
        </div>

        {/* Spotlight Details Block */}
        <div className="flex-1 flex flex-col justify-between py-2.5 min-w-0">
          <div className="space-y-3.5">
            <div className="flex justify-between items-start gap-4">
              <span className="text-[8px] text-accent uppercase tracking-[0.25em] font-bold block font-serif">
                {product.category}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.preventDefault();
                  toggleItem(product);
                }}
                className={cn(
                  "p-2.5 rounded-full shadow-xs hover:shadow transition-all duration-300 cursor-pointer border z-20",
                  wishlisted
                    ? "bg-accent text-white border-accent"
                    : "bg-(--bg-elevated) text-(--text-secondary) hover:text-accent border-(--border-subtle)"
                )}
              >
                <Heart className={cn("w-3.5 h-3.5", wishlisted && "fill-current animate-pulse")} />
              </motion.button>
            </div>

            <Link href={`/products/${product.slug}`}>
              <h3 className="text-lg sm:text-xl font-display text-(--text-primary) hover:text-accent line-clamp-2 leading-tight group-hover:-translate-y-0.5 transition duration-500">
                {product.name}
              </h3>
            </Link>

            <p className="text-(--text-secondary) text-[11px] sm:text-xs font-serif leading-relaxed line-clamp-3">
              {product.description}
            </p>

            <div className="flex items-center gap-1.5 text-[9px] text-(--text-muted) font-semibold select-none">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-(--text-primary) font-bold">{product.rating}</span>
              <span>({product.reviewCount} Reviews)</span>
            </div>
          </div>

          {/* Action Slide overlay */}
          <div className="relative h-11 overflow-hidden mt-6 border-t border-(--border-subtle) pt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-(--text-primary) font-mono">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <span className="text-[9px] text-(--text-muted) line-through font-mono">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addItem(product, 1)}
              className="flex items-center gap-1.5 px-4.5 h-9 bg-accent hover:bg-accent-hover text-white text-[8px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer border border-white/10"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Regular size product cards
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.99, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.7 }}
      className="product-card group relative rounded-[24px] overflow-hidden flex flex-col justify-between h-full bg-(--card-bg) border border-(--border-subtle) hover:border-(--card-hover-border) transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-accent"
    >
      {/* Slanted Sheen Sweep Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(255,255,255,0.18)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

      {/* Dominant Image block */}
      <div className="relative aspect-square overflow-hidden bg-(--bg-elevated) z-0 shrink-0">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative z-0">
          <div className="absolute inset-0 bg-[#090514]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          
          {!imgError && product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover scale-100 group-hover:scale-106 transition-transform duration-1000 ease-out"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-[#1F113C] to-[#090514] p-6 text-center select-none text-accent/50">
              <span className="text-4xl group-hover:scale-105 transition-transform duration-700">⚜️</span>
            </div>
          )}
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none select-none">
          {discount > 0 ? (
            <span className="px-2 py-0.5 bg-accent text-white text-[8px] font-bold tracking-widest uppercase rounded shadow-xs">
              {discount}% Off
            </span>
          ) : product.badges.length > 0 ? (
            <span className="px-2 py-0.5 bg-(--bg-surface) text-(--text-primary) text-[8px] font-bold tracking-widest uppercase rounded border border-(--border-subtle)">
              {product.badges[0]}
            </span>
          ) : null}
        </div>

        {/* Wishlist toggle with high-fidelity hover scale */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
          className={cn(
            "absolute top-4 right-4 z-20 p-2 rounded-full shadow-xs hover:shadow transition-all duration-300 cursor-pointer border",
            wishlisted
              ? "bg-accent text-white border-accent"
              : "bg-(--bg-surface) text-(--text-secondary) hover:text-accent border-(--border-subtle)"
          )}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-3.5 h-3.5", wishlisted && "fill-current animate-pulse")} />
        </motion.button>
      </div>

      {/* Metadata content */}
      <div className="p-5 flex flex-col flex-1 justify-between relative z-10">
        <div>
          <span className="text-[8px] text-accent uppercase tracking-[0.2em] font-bold block mb-1 font-serif">
            {product.category}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-semibold text-(--text-primary) hover:text-accent line-clamp-1 group-hover:-translate-y-1.5 transition duration-500">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Altar Slide Drawer */}
        <div className="relative h-10 overflow-hidden mt-4 pt-2 border-t border-(--border-subtle)">
          {/* Price & Rating (Default state, slides down on hover) */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between transition-all duration-500 ease-out group-hover:translate-y-12 group-hover:opacity-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-(--text-primary) font-mono">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <span className="text-[9px] text-(--text-muted) line-through font-mono">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-0.5 text-[9px] text-(--text-muted) font-semibold select-none">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-(--text-primary) font-bold">{product.rating}</span>
            </div>
          </div>
          
          {/* Add to Cart button (Slides up on hover) */}
          <div className="absolute inset-x-0 bottom-0 translate-y-12 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                addItem(product, 1);
              }}
              className="w-full h-8 bg-accent hover:bg-accent-hover text-white text-[8px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-1 shadow-xs border border-white/10 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              Add to Altar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
