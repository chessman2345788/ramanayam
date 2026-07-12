"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, CreditCard, CheckCircle, ArrowLeft, ShieldCheck, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { PageTransition } from "@/components/animations/PageTransition";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const steps = [
  { num: 1, label: "Address", icon: MapPin },
  { num: 2, label: "Payment", icon: CreditCard },
  { num: 3, label: "Confirm", icon: CheckCircle },
] as const;

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);
  const { items, total } = useCartStore();
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;
  const [selectedPayment, setSelectedPayment] = useState<string>("upi");

  // Address Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateName, setStateName] = useState("");

  if (items.length === 0 && step !== 3) {
    return (
      <PageTransition>
        <div className="pt-36 pb-24 text-center min-h-screen bg-(--bg-page) flex flex-col items-center justify-center text-(--text-primary) px-4">
          <p className="text-6xl mb-6 select-none animate-float">🕉️</p>
          <h1 className="text-xl font-display text-(--text-primary) mb-3">No items to checkout</h1>
          <p className="text-(--text-secondary) text-xs sm:text-sm mb-8">Your basket is currently empty.</p>
          <Link href="/products" className="btn btn-primary cursor-pointer border border-white/10 px-8 py-3.5 shadow-md">
            Continue Shopping
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-36 pb-24 min-h-screen bg-(--bg-page) text-(--text-primary)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-12 pb-4 border-b border-(--border-subtle)">
            <Link href="/cart" className="p-3 bg-(--bg-elevated) border border-(--border-subtle) text-(--text-secondary) hover:text-accent transition-colors rounded-xl shadow-xs">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[9px] text-accent uppercase font-bold tracking-[0.25em] mb-0.5 block font-serif">Final Step</span>
              <h1 className="text-2xl font-display text-(--text-primary) tracking-wide">Secured Checkout</h1>
            </div>
          </div>

          {/* Progress Wizard */}
          <div className="flex items-center justify-between mb-16 max-w-md mx-auto select-none">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      backgroundColor: step >= s.num ? "var(--accent)" : "var(--bg-elevated)",
                      borderColor: step >= s.num ? "var(--accent)" : "var(--border-subtle)",
                      color: step >= s.num ? "#fff" : "var(--text-secondary)",
                    }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors",
                      step >= s.num ? "shadow-md shadow-accent/15" : ""
                    )}
                  >
                    {step > s.num ? <Check className="w-5 h-5 stroke-[2.5]" /> : <s.icon className="w-4.5 h-4.5" />}
                  </motion.div>
                  <span className={cn("text-[9px] font-bold uppercase tracking-wider mt-3 font-serif", step >= s.num ? "text-accent" : "text-(--text-muted)")}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-16 sm:w-24 h-px mx-2 bg-(--border-strong) rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: step > s.num ? "100%" : "0%" }}
                      className="h-full bg-accent"
                      transition={{ duration: 0.45 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Core Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Steps execution blocks */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Address Card */}
                {step === 1 && (
                  <motion.div 
                    key="step-1"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="rounded-[28px] p-6 sm:p-8 shadow-xs bg-(--card-bg) border border-(--border-subtle)"
                  >
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-8 pb-3 border-b border-(--border-subtle) font-serif">
                      Delivery Address Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-secondary) mb-2.5 font-serif">Full Name</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-12 px-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent text-(--text-primary) transition-all" 
                          placeholder="Devotee name" 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-secondary) mb-2.5 font-serif">Phone Number</label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full h-12 px-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent text-(--text-primary) transition-all" 
                          placeholder="+91 XXXXX XXXXX" 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-secondary) mb-2.5 font-serif">Street Address</label>
                        <textarea 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full p-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent text-(--text-primary) resize-none transition-all" 
                          rows={3} 
                          placeholder="Flat/House number, Apartment, Area details" 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-secondary) mb-2.5 font-serif">City</label>
                        <input 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full h-12 px-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent text-(--text-primary) transition-all" 
                          placeholder="City" 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-secondary) mb-2.5 font-serif">Pincode</label>
                        <input 
                          type="text" 
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full h-12 px-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent text-(--text-primary) transition-all" 
                          placeholder="Pincode" 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-(--text-secondary) mb-2.5 font-serif">State</label>
                        <input 
                          type="text" 
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          className="w-full h-12 px-4 bg-(--input-bg) border border-(--input-border) rounded-xl text-xs font-semibold focus:outline-none focus:border-accent text-(--text-primary) transition-all" 
                          placeholder="State" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (name && phone && address && city && pincode) setStep(2);
                      }}
                      className={cn(
                        "mt-8 w-full py-4 text-xs font-bold uppercase tracking-widest text-white rounded-xl shadow-md transition-all cursor-pointer border",
                        name && phone && address && city && pincode
                          ? "bg-accent hover:bg-accent-hover border-white/10"
                          : "bg-(--bg-elevated) border-(--border-subtle) text-(--text-muted) cursor-not-allowed"
                      )}
                    >
                      Continue to Payment →
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Payment Selector Card */}
                {step === 2 && (
                  <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="rounded-[28px] border border-(--border-subtle) bg-(--card-bg) p-6 sm:p-8 shadow-xs"
                  >
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-8 pb-3 border-b border-(--border-subtle) font-serif">
                      Select Payment Method
                    </h2>
                    <div className="space-y-4">
                      {[
                        { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)", desc: "Quick secure redirection" },
                        { id: "card", label: "Credit or Debit Cards", desc: "Visa, Mastercard, RuPay & Maestro" },
                        { id: "netbanking", label: "Net Banking", desc: "All major Indian banks supported" },
                        { id: "cod", label: "Cash on Delivery (COD)", desc: "Pay on receipt (+₹49 handling fee)" },
                      ].map((method) => (
                        <label 
                          key={method.id} 
                          onClick={() => setSelectedPayment(method.id)}
                          className={cn(
                            "flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors select-none",
                            selectedPayment === method.id 
                              ? "border-accent bg-accent/10" 
                              : "border-(--border-subtle) bg-(--bg-elevated)"
                          )}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={selectedPayment === method.id}
                            onChange={() => {}}
                            className="accent-accent mt-1 cursor-pointer shrink-0" 
                          />
                          <div className="flex-1">
                            <span className="text-xs sm:text-sm font-bold text-(--text-primary) block">{method.label}</span>
                            <span className="text-[9px] text-(--text-secondary) font-semibold mt-1 block">{method.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                      <button 
                        onClick={() => setStep(1)} 
                        className="px-6 py-4 border border-(--border-subtle) text-(--text-primary) text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-(--bg-elevated) transition-all cursor-pointer bg-transparent"
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={() => setStep(3)} 
                        className="flex-1 py-4 bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-md transition-all cursor-pointer border border-white/10"
                      >
                        Place Divine Order
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation Success Page */}
                {step === 3 && (
                  <motion.div 
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="rounded-[32px] border border-(--border-subtle) bg-(--card-bg) p-8 sm:p-14 shadow-xs text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent to-[#2D1B4E]" />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                      className="w-20 h-20 mx-auto mb-6 bg-emerald-950/20 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-xs"
                    >
                      <Check className="w-10 h-10 text-emerald-500 stroke-3" />
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3.5xl font-display text-(--text-primary) mb-3 leading-tight">Order Confirmed! 🙏</h2>
                    <p className="text-(--text-secondary) text-xs sm:text-sm mb-8 max-w-sm mx-auto leading-relaxed font-serif">
                      Your sacred elements have been registered. Our temple priests are preparing your items with spiritual care.
                    </p>
                    
                    <div className="bg-(--bg-elevated) border border-(--border-subtle) p-5 rounded-xl max-w-xs mx-auto mb-8 font-mono select-all">
                      <span className="text-[8px] text-(--text-muted) font-bold uppercase tracking-widest block mb-1 font-serif">Receipt ID</span>
                      <span className="text-xs sm:text-sm font-bold text-(--text-primary) font-mono">
                        #RAM{Date.now().toString(36).toUpperCase()}
                      </span>
                    </div>

                    <Link href="/">
                      <button className="btn btn-primary cursor-pointer px-10 border border-white/10 shadow-md">
                        Continue Shopping
                      </button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Sidebar Order Summary Checklist */}
            {step !== 3 && (
              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-[24px] border border-(--border-subtle) bg-(--card-bg) p-5.5 shadow-xs">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-(--text-primary) mb-5 pb-2.5 border-b border-(--border-subtle) font-serif">
                    Order Summary
                  </h3>
                  
                  {/* Items scroll list */}
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3.5 text-xs font-semibold">
                        <div className="w-10 h-10 rounded-lg bg-(--bg-elevated) border border-(--border-subtle) flex items-center justify-center text-lg shrink-0 select-none">
                          {item.product.categorySlug === "puja-essentials" ? "🪔" : "🕉️"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-(--text-primary) font-bold line-clamp-1 leading-snug">{item.product.name}</p>
                          <p className="text-(--text-muted) text-[9px] font-semibold mt-0.5">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-mono text-(--text-primary)">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price calculations details */}
                  <div className="border-t border-(--border-subtle) mt-5 pt-5 space-y-3.5 text-xs font-semibold font-serif text-(--text-secondary)">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-(--text-primary)">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span className="font-mono text-(--text-primary)">₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="text-emerald-500 font-bold uppercase tracking-wider text-[9px]">FREE</span>
                    </div>
                    <div className="flex justify-between pt-3.5 border-t border-(--border-subtle) text-sm font-bold text-(--text-primary)">
                      <span>Grand Total</span>
                      <span className="font-mono">₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Trust badge icons */}
                  <div className="flex items-center gap-2 mt-6 pt-5 border-t border-(--border-subtle) text-[8px] text-(--text-muted) font-bold uppercase tracking-widest justify-center select-none">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>Razorpay SSL Secured</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
