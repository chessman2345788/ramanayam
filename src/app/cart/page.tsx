"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Tag, ShieldCheck, Heart, Sparkles, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { PageTransition } from "@/components/animations/PageTransition";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, savings, itemCount, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;
  const upsellProducts = products.filter((p) => !items.some((i) => i.product.id === p.id)).slice(0, 4);

  // Free shipping threshold parameters
  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, (total / freeShippingThreshold) * 100);
  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - total);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "DEVOTION10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="pt-36 pb-24 text-center min-h-screen bg-(--bg-page) flex flex-col items-center justify-center px-4 text-(--text-primary)">
          <div className="relative mb-8 select-none">
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-2xl animate-pulse" />
            <div className="relative border border-(--border-subtle) p-6 rounded-full shadow-xs bg-(--card-bg)">
              <ShoppingBag className="w-12 h-12 text-accent" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-display text-(--text-primary) mb-3">Your Sacred Cart is Empty</h1>
          <p className="text-(--text-secondary) text-xs sm:text-sm mb-8 max-w-sm leading-relaxed font-serif">
            You have not added any sacred offerings, idols, or spiritual essentials to your cart yet.
          </p>
          <Link href="/products" className="btn btn-primary cursor-pointer px-10 border border-white/10 shadow-md">
            Explore Catalog
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-36 pb-24 min-h-screen bg-(--bg-page) text-(--text-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-(--border-subtle)">
            <div>
              <span className="text-[9px] text-accent uppercase font-bold tracking-[0.25em] mb-1.5 block font-serif">Your Basket</span>
              <h1 className="text-2xl md:text-3.5xl font-display text-(--text-primary)">Sacred Cart</h1>
              <p className="text-(--text-secondary) text-xs mt-1 font-serif">
                You have {itemCount} divine items in your list
              </p>
            </div>
            <button 
              onClick={clearCart} 
              className="text-[9px] uppercase tracking-widest text-(--text-secondary) hover:text-red-500 hover:border-red-500/20 transition-colors cursor-pointer border border-(--border-subtle) bg-(--bg-elevated) px-3.5 py-2 rounded-xl"
            >
              Clear Basket
            </button>
          </div>

          {/* Shipping Progress Indicator */}
          <div className="mb-10 p-5 border border-(--border-subtle) rounded-[24px] shadow-xs bg-(--card-bg)">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                <Truck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                {amountLeftForFreeShipping > 0 ? (
                  <p className="text-xs text-(--text-secondary) font-serif">
                    Add <span className="text-accent font-bold font-mono">₹{amountLeftForFreeShipping}</span> more to unlock <span className="text-accent font-bold uppercase tracking-wider text-[10px]">Free Sacred Delivery</span>
                  </p>
                ) : (
                  <p className="text-xs text-emerald-500 font-bold font-serif flex items-center gap-1.5">
                    🎉 You have unlocked Free Sacred Shipping on this order!
                  </p>
                )}
              </div>
            </div>
            <div className="shipping-progress-container h-1.5 bg-(--bg-elevated) rounded-full overflow-hidden">
              <div 
                className="shipping-progress-fill h-full bg-accent rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item, i) => (
                  <CartItemRow 
                    key={item.product.id} 
                    item={item} 
                    index={i} 
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-[28px] border border-(--border-subtle) bg-(--card-bg) p-6 shadow-xs">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-6 pb-2.5 border-b border-(--border-subtle) font-serif">Order Summary</h3>

                {/* Coupon Code panel */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="DEVOTION10 (10% OFF)"
                        className="w-full pl-10 pr-3 h-11 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent transition-all text-(--text-primary) uppercase placeholder:text-(--text-muted) font-mono"
                      />
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      className="px-5 h-11 bg-accent text-white hover:bg-accent-hover text-xs font-bold rounded-xl transition-all cursor-pointer border border-white/10 uppercase tracking-widest"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider mt-2.5">✓ 10% Devotion code applied!</p>
                  )}
                  {couponError && (
                    <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider mt-2.5">✗ Invalid coupon code.</p>
                  )}
                </div>

                {/* Calculations summary */}
                <div className="space-y-4 text-xs font-semibold border-b border-(--border-subtle) pb-5 mb-5 select-none font-serif text-(--text-secondary)">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-(--text-primary)">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-500">
                      <span>Instant Savings</span>
                      <span className="font-mono">-₹{savings.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-500">
                      <span>Discount (DEVOTION10)</span>
                      <span className="font-mono">-₹{Math.round(total * 0.1).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-mono text-(--text-primary)/80">
                      ₹{gst.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {amountLeftForFreeShipping === 0 ? (
                      <span className="text-emerald-500 uppercase font-bold tracking-wider text-[10px]">FREE</span>
                    ) : (
                      <span className="text-(--text-primary) font-mono">₹49</span>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6 flex justify-between items-baseline select-none">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) font-serif">Total Amount</span>
                  <span className="text-2xl font-bold text-(--text-primary) font-mono">
                    ₹{Math.round(grandTotal - (couponApplied ? total * 0.1 : 0) + (amountLeftForFreeShipping === 0 ? 0 : 49)).toLocaleString("en-IN")}
                  </span>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-md transition-all text-xs uppercase tracking-widest cursor-pointer border border-white/10"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <Link
                  href="/products"
                  className="flex items-center justify-center gap-1.5 mt-4 text-[9px] uppercase tracking-widest font-bold text-(--text-muted) hover:text-accent transition-colors font-serif"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Continue Shopping
                </Link>

                {/* Secure Badge */}
                <div className="mt-5 pt-4 border-t border-(--border-subtle) flex items-center gap-2 justify-center text-[8px] text-(--text-muted) font-bold uppercase tracking-widest select-none">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>SSL encrypted transactions</span>
                </div>
              </div>
            </div>

          </div>

          {/* Cross Sell Section */}
          {upsellProducts.length > 0 && (
            <section className="mt-28 border-t border-(--border-subtle) pt-16">
              <h2 className="text-xl md:text-2xl font-display text-(--text-primary) mb-8 tracking-wide flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-accent animate-pulse" />
                Complete Your Puja Ritual
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {upsellProducts.map((p, i) => (
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

interface CartItemRowProps {
  item: {
    product: any;
    quantity: number;
  };
  index: number;
  updateQuantity: (id: string, q: number) => void;
  removeItem: (id: string) => void;
}

function CartItemRow({ item, index, updateQuantity, removeItem }: CartItemRowProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="flex gap-5 p-5 rounded-[24px] transition-all duration-300 relative group bg-(--card-bg) border border-(--border-subtle) shadow-xs hover:border-(--card-hover-border) hover:shadow-accent"
    >
      {/* Product Image */}
      <Link href={`/products/${item.product.slug}`} className="shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-(--bg-elevated) border border-(--border-subtle) relative overflow-hidden flex items-center justify-center shadow-3xs">
          {!imgError && item.product.image ? (
            <Image
              src={item.product.image}
              alt={item.product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={() => setImgError(true)}
              sizes="96px"
            />
          ) : (
            <div className="text-accent/60 shrink-0">
              <span className="text-2xl select-none">⚜️</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info Description */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-start justify-between gap-3">
            <Link href={`/products/${item.product.slug}`}>
              <h3 className="text-sm font-semibold text-(--text-primary) hover:text-accent transition-colors line-clamp-1 leading-snug">
                {item.product.name}
              </h3>
            </Link>
            <button
              onClick={() => removeItem(item.product.id)}
              className="p-1.5 text-(--text-muted) hover:text-rose-500 transition-all cursor-pointer rounded-lg hover:bg-rose-500/10 shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[8px] text-accent uppercase tracking-[0.2em] font-bold mt-1.5 font-serif">
            {item.product.category}
          </p>
        </div>

        {/* Pricing & Adjust panel */}
        <div className="flex items-end justify-between mt-3 flex-wrap gap-3">
          
          {/* Quantity adjust button */}
          <div className="flex items-center border border-(--border-subtle) bg-(--bg-elevated) rounded-xl overflow-hidden shadow-xs p-0.5">
            <button
              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
              className="p-1.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-xs font-bold font-mono text-(--text-primary)">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="p-1.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Pricing */}
          <div className="text-right">
            <p className="text-base font-bold text-(--text-primary) font-mono leading-tight">
              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
            </p>
            {item.product.mrp > item.product.price && (
              <p className="text-[10px] text-(--text-muted) line-through font-mono mt-0.5">
                ₹{(item.product.mrp * item.quantity).toLocaleString("en-IN")}
              </p>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
