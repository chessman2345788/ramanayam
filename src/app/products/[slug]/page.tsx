"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getProductBySlug, products, type Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen bg-(--bg-page) text-(--text-primary)">
        <p className="text-6xl mb-6 select-none animate-float">🕉️</p>
        <h1 className="text-2xl font-display text-(--text-primary) mb-4">Product not found</h1>
        <Link href="/products" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);
  
  // Custom interactive gallery tab state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  // Segmented Tabs State
  const [activeTab, setActiveTab] = useState<"specs" | "guide" | "ingredients">("specs");

  const mockReviews = [
    { name: "Rajesh K.", date: "12 May 2026", rating: 5, comment: "Exquisite craftsmanship and premium feel. Transformed our home mandir setup!" },
    { name: "Pooja S.", date: "28 April 2026", rating: 5, comment: "Pure fragrance and high quality wicks. Highly recommend this for daily prayers." },
    { name: "Suresh M.", date: "03 April 2026", rating: 4, comment: "Very authentic and carefully packed. Will definitely order from Ramanayam again." }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 2000);
  };

  // Build gallery images
  const galleryImages = [
    { src: product.image, className: "" },
    { src: product.image, className: "scale-125 object-center" }, // closeup view
    { src: product.image, className: "scale-110 brightness-95" }, // details focus view
  ];

  return (
    <PageTransition>
      <div className="pt-36 pb-24 min-h-screen bg-(--bg-page) text-(--text-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-(--text-muted) mb-12 flex-wrap select-none border-b border-(--border-subtle) pb-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-(--border-strong)" />
            <Link href="/products" className="hover:text-accent transition-colors">Catalog</Link>
            <ChevronRight className="w-3 h-3 text-(--border-strong)" />
            <span className="text-(--text-primary) truncate">{product.name}</span>
          </nav>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Gallery Section - 7 Columns */}
            <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square rounded-[32px] overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) shadow-sm group"
              >
                {!imgError && product.image ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src={galleryImages[activeImageIndex].src}
                      alt={product.name}
                      fill
                      priority
                      className={cn(
                        "object-cover transition-all duration-500 ease-out",
                        galleryImages[activeImageIndex].className
                      )}
                      onError={() => setImgError(true)}
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-[#1F113C] to-[#090514] text-accent p-8 select-none">
                    <span className="text-6xl mb-4 select-none">⚜️</span>
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-5 left-5 z-20 flex flex-col gap-1 pointer-events-none select-none">
                  {discount > 0 ? (
                    <span className="px-3 py-1 bg-accent text-white text-[8px] font-bold tracking-widest uppercase rounded shadow-sm">
                      {discount}% Off
                    </span>
                  ) : product.badges.length > 0 ? (
                    <span className="px-3 py-1 bg-(--bg-surface) border border-(--border-subtle) text-(--text-primary) text-[8px] font-bold tracking-widest uppercase rounded shadow-sm">
                      {product.badges[0]}
                    </span>
                  ) : null}
                </div>
              </motion.div>

              {/* Thumbnails Gallery */}
              <div className="flex gap-3 justify-center">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-16 h-16 rounded-2xl overflow-hidden bg-(--bg-elevated) border cursor-pointer transition-all duration-300 shadow-xs hover:scale-102",
                      activeImageIndex === idx
                        ? "border-accent ring-1 ring-accent"
                        : "border-(--border-subtle) hover:border-accent"
                    )}
                  >
                    {!imgError && product.image ? (
                      <div className="w-full h-full relative overflow-hidden">
                        <Image
                          src={img.src}
                          alt={`${product.name} angle ${idx + 1}`}
                          fill
                          className={cn("object-cover", img.className)}
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <span className="text-[10px]">⚜️</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Section - 5 Columns */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold mb-3 block font-serif">
                    {product.category}
                  </span>
                  
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h1 className="text-2xl md:text-3.5xl font-display text-(--text-primary) leading-tight">
                      {product.name}
                    </h1>
                    
                    {/* Share button */}
                    <div className="relative">
                      <button 
                        onClick={handleShare}
                        className="p-3 rounded-xl border border-(--border-subtle) text-(--text-secondary) hover:text-accent hover:bg-(--bg-elevated) transition-all cursor-pointer shadow-xs"
                        aria-label="Share product"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <AnimatePresence>
                        {showShareNotification && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 bottom-full mb-3 bg-(--card-bg) border border-(--border-subtle) text-(--text-primary) text-[8px] font-bold uppercase tracking-widest py-1.5 px-3 rounded shadow-md whitespace-nowrap z-25"
                          >
                            Copied URL!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <p className="text-accent text-[10px] font-bold tracking-widest font-hindi uppercase mb-3">{product.nameHi}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 select-none font-semibold text-[10px] text-(--text-muted)">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                      <span className="text-(--text-primary) font-bold text-xs">{product.rating}</span>
                    </div>
                    <span>·</span>
                    <span>{product.reviewCount} verified reviews</span>
                  </div>
                </div>

                {/* Pricing panel */}
                <div className="flex items-center gap-6 rounded-[24px] p-5 shadow-xs bg-(--card-bg) border border-(--border-subtle)">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-(--text-muted) font-serif">Special Price</span>
                    <span className="text-2.5xl font-bold font-mono text-(--text-primary) mt-1">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {product.mrp > product.price && (
                    <div className="flex flex-col border-l border-(--border-subtle) pl-6">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-(--text-muted) font-serif">Altar Price</span>
                      <span className="text-base text-(--text-muted) line-through font-mono mt-1.5">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed">
                  {product.description}
                </p>

                {/* Counter & Cart CTA Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-(--border-subtle) rounded-xl overflow-hidden bg-(--bg-elevated) shadow-xs h-12 p-0.5 w-full sm:w-auto shrink-0 justify-between">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-5 font-mono text-sm font-bold text-(--text-primary) select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addItem(product, quantity)}
                    className="flex-1 h-12 bg-accent hover:bg-accent-hover text-white text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-300 cursor-pointer border border-white/10"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Altar Basket
                  </motion.button>

                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleItem(product)}
                    className={cn(
                      "w-12 h-12 border rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-xs shrink-0",
                      wishlisted
                        ? "bg-accent border-accent text-white"
                        : "bg-(--bg-surface) border-(--border-subtle) text-(--text-secondary) hover:text-accent"
                    )}
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("w-4.5 h-4.5", wishlisted && "fill-current animate-pulse")} />
                  </motion.button>
                </div>

                {/* Technical Specifications Accordion Tabs */}
                <div className="border-t border-(--border-subtle) pt-6 space-y-4">
                  {/* Tabs Selector headers */}
                  <div className="flex border border-(--border-subtle) rounded-xl bg-(--bg-elevated) p-0.5">
                    {[
                      { key: "specs", label: "Details" },
                      { key: "guide", label: "Ritual Guide" },
                      { key: "ingredients", label: "Ingredients" }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={cn(
                          "flex-1 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer",
                          activeTab === tab.key 
                            ? "bg-accent text-white" 
                            : "text-(--text-secondary) hover:text-(--text-primary)"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Details Content container */}
                  <div className="min-h-[100px] text-xs font-serif text-(--text-secondary) leading-relaxed bg-(--card-bg) rounded-2xl border border-(--border-subtle) p-5">
                    <AnimatePresence mode="wait">
                      {activeTab === "specs" && (
                        <motion.div
                          key="specs"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-3"
                        >
                          <div className="flex justify-between pb-2.5 border-b border-(--border-subtle)">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-(--text-muted)">Category</span>
                            <span className="text-(--text-primary) font-bold">{product.category}</span>
                          </div>
                          {product.material && (
                            <div className="flex justify-between pb-2.5 border-b border-(--border-subtle)">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-(--text-muted)">Material</span>
                              <span className="text-(--text-primary) font-bold">{product.material}</span>
                            </div>
                          )}
                          {product.weight && (
                            <div className="flex justify-between">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-(--text-muted)">Weight</span>
                              <span className="text-(--text-primary) font-bold">{product.weight}</span>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === "guide" && (
                        <motion.div
                          key="guide"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <p>{product.pujaGuide || "Follow traditional guidelines for puja clean setup. Keep the prayer area clutter-free, face East while praying, and light the incense or diya with clean hands."}</p>
                        </motion.div>
                      )}

                      {activeTab === "ingredients" && (
                        <motion.div
                          key="ingredients"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {product.ingredients && product.ingredients.length > 0 ? (
                            <ul className="space-y-2">
                              {product.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle2 size={12} className="text-accent shrink-0" />
                                  <span>{ing}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>Pure raw ingredients cast traditionally in local villages. Authenticity certified by Ramanayam.</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

          {/* Customer Reviews Section */}
          <section className="mt-28 border-t border-(--border-subtle) pt-16">
            <div className="mb-12 text-center sm:text-left">
              <span className="text-accent text-[9px] uppercase tracking-[0.25em] font-bold block mb-2 font-serif">Customer Voice</span>
              <h2 className="text-2xl md:text-3.5xl font-display text-(--text-primary)">Devotee Reviews</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockReviews.map((rev, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl p-6 border border-(--border-subtle) bg-(--card-bg) relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4 select-none">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star 
                          key={sIdx} 
                          className={cn("w-3.5 h-3.5", sIdx < rev.rating ? "text-accent fill-accent" : "text-(--border-strong) fill-none")} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-6 italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-(--border-subtle) pt-4">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-(--text-primary)">{rev.name}</h4>
                      <p className="text-[8px] text-(--text-muted) font-semibold uppercase mt-0.5">{rev.date} · Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products recommending Shelf */}
          {relatedProducts.length > 0 && (
            <section className="mt-28 border-t border-(--border-subtle) pt-16">
              <div className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl md:text-3.5xl font-display text-(--text-primary) tracking-wide text-center sm:text-left flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Related Offerings
                </h2>
                <Link href="/products" className="text-[9px] uppercase tracking-widest font-bold text-accent hover:text-(--text-primary) transition-colors">
                  View Catalog
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </PageTransition>
  );
}
