"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid3X3, List, ChevronDown, ChevronUp, X, Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { products, categories, type Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SortOption = "popular" | "price-low" | "price-high" | "newest" | "rating";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [catCollapse, setCatCollapse] = useState(false);
  const [priceCollapse, setPriceCollapse] = useState(false);
  const [ratingCollapse, setRatingCollapse] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, inStockOnly, minRating]);

  return (
    <PageTransition>
      <div className="pt-36 pb-24 min-h-screen bg-(--bg-page) text-(--text-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Portal */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-(--border-subtle) pb-8">
            <div>
              <span className="text-[10px] text-accent uppercase font-bold tracking-[0.3em] mb-2.5 block font-serif">Divine Catalog</span>
              <h1 className="text-3.5xl md:text-5xl lg:text-6xl font-display text-(--text-primary) tracking-wide leading-tight">
                Auspicious Creations
              </h1>
              <p className="text-(--text-secondary) text-xs sm:text-sm font-serif mt-3">
                Showing {filtered.length} of {products.length} sacred selections
              </p>
            </div>
            
            <div className="flex items-center gap-3.5 self-start md:self-end">
              <div className="flex items-center border border-(--border-subtle) rounded-xl overflow-hidden bg-(--bg-elevated) shadow-xs p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2.5 rounded-lg cursor-pointer transition-colors",
                    viewMode === "grid" ? "bg-accent text-white" : "text-(--text-secondary) hover:text-(--text-primary)"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2.5 rounded-lg cursor-pointer transition-colors",
                    viewMode === "list" ? "bg-accent text-white" : "text-(--text-secondary) hover:text-(--text-primary)"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-10 lg:gap-14 items-start">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:block w-72 shrink-0 sticky top-28 self-start rounded-3xl p-6.5 bg-(--card-bg) shadow-xs border border-(--border-subtle)">
              <div className="space-y-7">
                <div className="flex items-center justify-between border-b border-(--border-subtle) pb-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) font-serif">Catalog Filters</h3>
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, 15000]);
                      setMinRating(0);
                      setInStockOnly(false);
                    }}
                    className="text-[9px] text-accent hover:underline font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Categories Accordion */}
                <div>
                  <button 
                    onClick={() => setCatCollapse(!catCollapse)}
                    className="flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-4 cursor-pointer"
                  >
                    <span className="font-serif">Categories</span>
                    {catCollapse ? <ChevronDown size={14} className="text-(--text-muted)" /> : <ChevronUp size={14} className="text-(--text-muted)" />}
                  </button>
                  
                  {!catCollapse && (
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                          "block w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                          !selectedCategory
                            ? "bg-accent/12 text-accent border border-accent/20"
                            : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated) border border-transparent"
                        )}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={cn(
                            "flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border",
                            selectedCategory === cat.slug
                              ? "bg-accent/12 text-accent border-accent/20"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated) border-transparent"
                          )}
                        >
                          <span>{cat.name}</span>
                          <span className="text-[9px] text-(--text-muted) font-mono">({cat.productCount})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Accordion */}
                <div className="border-t border-(--border-subtle) pt-5">
                  <button 
                    onClick={() => setPriceCollapse(!priceCollapse)}
                    className="flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-4 cursor-pointer"
                  >
                    <span className="font-serif">Price Limit</span>
                    {priceCollapse ? <ChevronDown size={14} className="text-(--text-muted)" /> : <ChevronUp size={14} className="text-(--text-muted)" />}
                  </button>
                  
                  {!priceCollapse && (
                    <div className="px-1 pt-1">
                      <input
                        type="range"
                        min={0}
                        max={15000}
                        step={100}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full accent-accent h-1 bg-(--border-strong) rounded-full cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-(--text-muted) font-semibold mt-3">
                        <span>₹0</span>
                        <span className="font-mono font-bold text-(--text-primary)">
                          ₹{priceRange[1].toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating Accordion */}
                <div className="border-t border-(--border-subtle) pt-5">
                  <button 
                    onClick={() => setRatingCollapse(!ratingCollapse)}
                    className="flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-4 cursor-pointer"
                  >
                    <span className="font-serif">Devotee Rating</span>
                    {ratingCollapse ? <ChevronDown size={14} className="text-(--text-muted)" /> : <ChevronUp size={14} className="text-(--text-muted)" />}
                  </button>
                  
                  {!ratingCollapse && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[0, 3, 4, 4.5].map((r) => (
                        <button
                          key={r}
                          onClick={() => setMinRating(r)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer border",
                            minRating === r
                              ? "bg-accent/12 text-accent border-accent/25"
                              : "text-(--text-secondary) hover:text-(--text-primary) bg-(--bg-elevated) border-(--border-subtle)"
                          )}
                        >
                          {r === 0 ? "All" : `${r}★+`}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* In Stock toggle */}
                <div className="border-t border-(--border-subtle) pt-5">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4.5 h-4.5 rounded border-(--border-strong) accent-accent cursor-pointer"
                    />
                    <span className="text-[10px] font-bold text-(--text-secondary) uppercase tracking-wider font-serif">In Stock Only</span>
                  </label>
                </div>

              </div>
            </aside>

            {/* Right Main Catalog content */}
            <div className="flex-1 min-w-0">
              
              {/* Category info top header panel */}
              {selectedCategory && (
                <div className="flex items-center flex-wrap gap-2 mb-8">
                  <span className="text-[10px] text-(--text-muted) uppercase tracking-wider font-bold">Active Filters:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/8 text-accent text-[10px] font-bold rounded-full border border-accent/15 uppercase tracking-wider">
                    Category: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                    <button onClick={() => setSelectedCategory(null)} className="cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                  {minRating > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/8 text-accent text-[10px] font-bold rounded-full border border-accent/15 uppercase tracking-wider">
                      {minRating}★+
                      <button onClick={() => setMinRating(0)} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Grid content */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8">
                  {filtered.map((product, i) => {
                    const isSpotlight = (i % 6 === 0) || (i % 6 === 3);
                    const colSpan = isSpotlight ? "md:col-span-6" : "md:col-span-2";
                    return (
                      <div key={product.id} className={colSpan}>
                        <ProductCard product={product} index={i} isSpotlight={isSpotlight} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {filtered.map((product, i) => (
                    <ListProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="text-center py-24 bg-(--card-bg) shadow-xs max-w-xl mx-auto rounded-[32px] border border-(--border-subtle)">
                  <p className="text-5xl mb-4 select-none animate-float">🕉️</p>
                  <h3 className="text-lg font-display text-(--text-primary) mb-2">
                    No Sacred Offerings Found
                  </h3>
                  <p className="text-(--text-secondary) text-xs px-6 max-w-md mx-auto leading-relaxed font-serif">
                    No items match your exact filters. Adjust your criteria or clear selections to explore our holy catalog.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, 15000]);
                      setMinRating(0);
                      setInStockOnly(false);
                    }}
                    className="btn btn-primary mt-8 cursor-pointer border border-white/10"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", bounce: 0.05, duration: 0.45 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-(--card-bg) border-t border-(--border-subtle) rounded-t-[32px] p-6.5 max-h-[85vh] overflow-y-auto shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-(--border-subtle)">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-(--text-primary) font-serif">Catalog Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="p-1 cursor-pointer">
                      <X className="w-5 h-5 text-(--text-muted) hover:text-(--text-primary)" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-accent mb-3 font-serif">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                            !selectedCategory 
                              ? "bg-accent border-accent text-white" 
                              : "border-(--border-subtle) bg-(--bg-elevated) text-(--text-secondary) hover:bg-(--bg-surface)"
                          )}
                        >
                          All
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                              selectedCategory === cat.slug 
                                ? "bg-accent border-accent text-white" 
                                : "border-(--border-subtle) bg-(--bg-elevated) text-(--text-secondary) hover:bg-(--bg-surface)"
                            )}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-accent mb-3 font-serif">Price Limit</h4>
                      <div className="px-1">
                        <input
                          type="range"
                          min={0}
                          max={15000}
                          step={100}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                          className="w-full accent-accent h-1 bg-(--border-strong) rounded-full"
                        />
                        <div className="flex justify-between text-xs text-(--text-muted) mt-2 font-mono">
                          <span>₹0</span>
                          <span className="font-bold text-(--text-primary)">
                            ₹{priceRange[1].toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-accent mb-3 font-serif">Min Rating</h4>
                      <div className="flex gap-2">
                        {[0, 3, 4, 4.5].map((r) => (
                          <button
                            key={r}
                            onClick={() => setMinRating(r)}
                            className={cn(
                              "flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center border",
                              minRating === r 
                                ? "bg-accent border-accent text-white" 
                                : "border-(--border-subtle) bg-(--bg-elevated) text-(--text-secondary)"
                            )}
                          >
                            {r === 0 ? "All" : `${r}★+`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-(--border-subtle)">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inStockOnly}
                          onChange={(e) => setInStockOnly(e.target.checked)}
                          className="w-5 h-5 rounded border-(--border-strong) accent-accent cursor-pointer"
                        />
                        <span className="text-xs font-bold text-(--text-secondary) uppercase tracking-wide font-serif">In Stock Only</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-4 bg-accent text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md transition-transform active:scale-[0.98] mt-8 cursor-pointer border border-white/10"
                >
                  Apply Filters ({filtered.length} results)
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

function ListProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const [imgError, setImgError] = useState(false);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-6 p-5 rounded-[24px] transition-all duration-500 relative group bg-(--card-bg) hover:border-(--card-hover-border) hover:shadow-accent border border-(--border-subtle) hover:-translate-y-1"
    >
      {/* Reflection effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

      <div className="relative w-full sm:w-48 aspect-square shrink-0 rounded-2xl overflow-hidden bg-(--bg-elevated) border border-(--border-subtle) z-0">
        {!imgError && product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover scale-100 group-hover:scale-106 transition-transform duration-1000 ease-out"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, 192px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#1F113C] to-[#090514] text-accent">
            <span className="text-3xl">⚜️</span>
          </div>
        )}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
          {discount > 0 && (
            <span className="px-2.5 py-0.5 bg-accent text-white text-[8px] font-bold rounded shadow-2xs">
              -{discount}% Off
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between py-1 min-w-0 z-10">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] text-accent uppercase tracking-[0.2em] font-bold font-serif">
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
                "p-2.5 rounded-full cursor-pointer transition-colors shadow-2xs border",
                wishlisted
                  ? "bg-accent border-accent text-white"
                  : "bg-(--bg-surface) text-(--text-secondary) hover:text-accent border-(--border-subtle)"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", wishlisted && "fill-current animate-pulse")} />
            </motion.button>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-lg font-display text-(--text-primary) hover:text-accent leading-tight mb-2.5 group-hover:-translate-y-0.5 transition duration-500">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-(--text-secondary) text-xs sm:text-sm font-serif leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1.5 mb-4 select-none text-[10px] text-(--text-muted) font-semibold">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-(--text-primary) font-bold">{product.rating}</span>
            </div>
            <span>·</span>
            <span>({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-(--border-subtle) pt-4 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-(--text-primary) font-mono">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-(--text-muted) line-through font-mono">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/products/${product.slug}`}>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-(--border-subtle) hover:border-accent hover:text-accent rounded-xl text-[9px] font-bold uppercase tracking-wider text-(--text-primary) transition-colors cursor-pointer bg-(--bg-elevated)">
                <Eye className="w-3.5 h-3.5" /> Details
              </button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                addItem(product, 1);
              }}
              className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-xl hover:bg-accent-hover text-[9px] font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer border border-white/10"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
