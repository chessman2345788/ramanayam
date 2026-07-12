"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  ShieldCheck,
  BellRing
} from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { PageTransition } from "@/components/animations/PageTransition";
import { cn } from "@/lib/utils";

type Tab = "orders" | "wishlist" | "addresses" | "reminders" | "settings";

const sidebarItems: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "orders", label: "Order History", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Saved Addresses", icon: MapPin },
  { key: "reminders", label: "Puja Reminders", icon: Calendar },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const { items: wishlistItems } = useWishlistStore();
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({
    "Ganesh Chaturthi": true,
    "Navratri": false,
    "Diwali": true,
  });

  const toggleReminder = (festival: string) => {
    setReminders((prev) => ({ ...prev, [festival]: !prev[festival] }));
  };

  return (
    <PageTransition>
      <div className="pt-36 pb-24 min-h-screen bg-(--bg-page) text-(--text-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            
            {/* Sidebar — Desktop sticky */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start rounded-3xl p-6.5 bg-(--card-bg) shadow-xs border border-(--border-subtle)">
              <div className="space-y-7">
                
                {/* Profile Card */}
                <div className="flex items-center gap-3.5 pb-5 border-b border-(--border-subtle) select-none">
                  <div className="w-11 h-11 rounded-xl bg-linear-to-br from-accent to-[#2D1B4E] flex items-center justify-center text-white font-bold text-base shadow-sm border border-white/10">
                    G
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-(--text-primary)">Guest Devotee</h3>
                    <p className="text-[8px] text-accent font-bold uppercase tracking-widest mt-0.5 font-serif">Auspicious Altar</p>
                  </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive = activeTab === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={cn(
                          "flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer relative",
                          isActive
                            ? "bg-accent/12 text-accent border border-accent/20 font-bold"
                            : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated) border border-transparent"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeSideIndicator"
                            className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-accent rounded-full"
                          />
                        )}
                        <item.icon className="w-4 h-4" />
                        <span className="font-serif">{item.label}</span>
                        {item.key === "wishlist" && wishlistItems.length > 0 && (
                          <span className="ml-auto text-[9px] bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center font-bold font-mono border border-white/10">
                            {wishlistItems.length}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-colors mt-6 cursor-pointer border border-transparent hover:border-rose-500/20 font-serif">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 w-full">
              
              {/* Mobile Horizontal Navigation */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-none">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={cn(
                      "flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap transition-all shrink-0 cursor-pointer border font-serif",
                      activeTab === item.key
                        ? "bg-accent text-white border-accent shadow-sm"
                        : "border-(--border-subtle) bg-(--bg-elevated) text-(--text-secondary)"
                    )}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab views with layout transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  
                  {/* Order History View */}
                  {activeTab === "orders" && (
                    <div>
                      <h2 className="text-xl md:text-3xl font-display text-(--text-primary) mb-8 tracking-wide">Order History</h2>
                      <div className="rounded-[28px] border border-(--border-subtle) p-8 text-center max-w-xl shadow-xs bg-(--card-bg)">
                        <div className="w-12 h-12 bg-(--bg-elevated) rounded-xl flex items-center justify-center mx-auto mb-5 border border-(--border-subtle) animate-float">
                          <Package className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-sm font-bold text-(--text-primary) mb-2 uppercase tracking-wider font-serif">No orders registered</h3>
                        <p className="text-(--text-secondary) text-xs mb-6 max-w-xs mx-auto font-serif leading-relaxed">
                          You have not placed any orders yet. Your order summaries will appear here.
                        </p>
                        <Link href="/products" className="btn btn-primary px-8 border border-white/10 shadow-md">
                          Browse Catalog
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Wishlist View */}
                  {activeTab === "wishlist" && (
                    <div>
                      <h2 className="text-xl md:text-3xl font-display text-(--text-primary) mb-8 tracking-wide">
                        Your Wishlist ({wishlistItems.length})
                      </h2>
                      {wishlistItems.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {wishlistItems.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-[28px] border border-(--border-subtle) p-8 text-center max-w-xl shadow-xs bg-(--card-bg)">
                          <div className="w-12 h-12 bg-(--bg-elevated) border border-(--border-subtle) rounded-xl flex items-center justify-center mx-auto mb-5 animate-float">
                            <Heart className="w-5 h-5 text-accent" />
                          </div>
                          <h3 className="text-sm font-bold text-(--text-primary) mb-2 uppercase tracking-wider font-serif">Wishlist is empty</h3>
                          <p className="text-(--text-secondary) text-xs mb-6 max-w-xs mx-auto font-serif leading-relaxed">
                            Save products you love to your list for easy future purchasing.
                          </p>
                          <Link href="/products" className="btn btn-primary px-8 border border-white/10 shadow-md">
                            Browse Products
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Saved Addresses View */}
                  {activeTab === "addresses" && (
                    <div>
                      <h2 className="text-xl md:text-3xl font-display text-(--text-primary) mb-8 tracking-wide">Saved Addresses</h2>
                      <div className="rounded-[28px] border border-(--border-subtle) p-8 text-center max-w-xl shadow-xs bg-(--card-bg)">
                        <div className="w-12 h-12 bg-(--bg-elevated) rounded-xl flex items-center justify-center mx-auto mb-5 border border-(--border-subtle) animate-float">
                          <MapPin className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-sm font-bold text-(--text-primary) mb-2 uppercase tracking-wider font-serif">No Saved Addresses</h3>
                        <p className="text-(--text-secondary) text-xs mb-6 max-w-xs mx-auto font-serif leading-relaxed">
                          Save your shipping addresses for a faster checkout next time.
                        </p>
                        <Link href="/products" className="btn btn-primary px-8 border border-white/10 shadow-md">
                          Start Shopping
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Puja Reminders View */}
                  {activeTab === "reminders" && (
                    <div>
                      <h2 className="text-xl md:text-3xl font-display text-(--text-primary) mb-8 tracking-wide flex items-center gap-2">
                        <BellRing size={20} className="text-accent" />
                        Puja Reminders
                      </h2>
                      <div className="space-y-4 max-w-xl">
                        {[
                          { festival: "Ganesh Chaturthi", date: "August 27, 2025", desc: "Elephant-headed deity festival essentials setup", emoji: "🐘" },
                          { festival: "Navratri", date: "October 2, 2025", desc: "9-Day Akhand Diya & Puja Samagri essentials", emoji: "🔱" },
                          { festival: "Diwali", date: "October 20, 2025", desc: "Premium clay diyas, Lakshmi puja accessories", emoji: "🪔" },
                        ].map((r) => {
                          const isSet = !!reminders[r.festival];
                          return (
                            <div 
                              key={r.festival} 
                              className={cn(
                                "flex items-center gap-4.5 p-5 rounded-2xl border transition-all shadow-xs bg-(--card-bg)",
                                isSet ? "border-accent/30 bg-accent/10" : "border-(--border-subtle)"
                              )}
                            >
                              <span className="text-2xl select-none">{r.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xs sm:text-sm font-bold text-(--text-primary) font-serif">{r.festival}</h3>
                                <p className="text-[9px] text-accent font-bold font-mono mt-0.5">{r.date}</p>
                                <p className="text-[11px] text-(--text-secondary) mt-1 line-clamp-1">{r.desc}</p>
                              </div>
                              <button
                                onClick={() => toggleReminder(r.festival)}
                                className={cn(
                                  "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-all border",
                                  isSet 
                                    ? "bg-accent text-white border-white/10" 
                                    : "bg-(--bg-elevated) text-(--text-secondary) hover:text-accent border-(--border-subtle)"
                                )}
                              >
                                <span>{isSet ? "Active" : "Set Alert"}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Account Settings View */}
                  {activeTab === "settings" && (
                    <div className="max-w-xl">
                      <h2 className="text-xl md:text-3xl font-display text-(--text-primary) mb-8 tracking-wide">Account Settings</h2>
                      
                      <div className="rounded-[28px] border border-(--border-subtle) bg-(--card-bg) p-6 sm:p-8 shadow-xs space-y-6">
                        <div>
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-4 font-serif">Profile Information</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-muted) mb-2 font-serif">Email Address</label>
                              <input 
                                type="email" 
                                disabled 
                                value="devotee@ramanayam.com"
                                className="w-full h-11 px-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold text-(--text-muted) cursor-not-allowed select-none" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-(--border-subtle)">
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-4 font-serif">Security Settings</h3>
                          <div className="flex items-center justify-between p-4 rounded-xl bg-(--bg-elevated) border border-(--border-subtle)">
                            <div className="flex items-center gap-3">
                              <ShieldCheck className="w-5 h-5 text-emerald-500" />
                              <div>
                                <span className="text-xs font-bold text-(--text-primary) block">SSL Secured</span>
                                <span className="text-[9px] text-(--text-muted) block mt-0.5">Authentication details handled securely</span>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-bold uppercase tracking-widest rounded-md">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
