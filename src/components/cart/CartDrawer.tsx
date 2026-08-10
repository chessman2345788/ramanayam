'use client';

import { useCartStore } from '@/store/cart';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, updateQty, removeItem, total } =
    useCartStore();
  const subtotal = total();

  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            style={{
              position: 'fixed', inset: 0, zIndex: 150,
              background: 'rgba(26,15,10,0.45)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 420, zIndex: 151,
              background: '#FDFAF6',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-8px 0 48px rgba(0,0,0,0.12)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 28px', flexShrink: 0,
              borderBottom: '0.5px solid rgba(26,15,10,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShoppingBag size={18} strokeWidth={1.75} color="#1A0F0A" />
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontStyle: 'italic', fontSize: 20, fontWeight: 600, color: '#1A0F0A',
                }}>Your Cart</span>
                {items.length > 0 && (
                  <span style={{ fontSize: 12, color: 'rgba(26,15,10,0.4)' }}>
                    ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </span>
                )}
              </div>
              <button onClick={closeDrawer} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 6, borderRadius: 8,
                color: 'rgba(26,15,10,0.4)', display: 'flex',
              }}>
                <X size={18} />
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 && (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 16, padding: '40px 28px',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(232,102,10,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShoppingBag size={28} strokeWidth={1.5} color="#E8660A" />
                </div>
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: 'italic', fontSize: 22,
                  color: '#1A0F0A', margin: 0,
                }}>Your cart is empty</p>
                <p style={{
                  fontSize: 14, color: 'rgba(26,15,10,0.45)',
                  margin: 0, textAlign: 'center', lineHeight: 1.6,
                }}>Add sacred products to begin your journey</p>
                <button onClick={closeDrawer} style={{
                  marginTop: 8, height: 44, padding: '0 28px',
                  borderRadius: 100, background: '#E8660A', border: 'none',
                  color: 'white', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', letterSpacing: '0.02em',
                }}>
                  Explore Collection
                </button>
              </div>
            )}

            {/* Items */}
            {items.length > 0 && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '4px 28px' }}>
                <AnimatePresence initial={false}>
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
                      transition={{ delay: idx * 0.03 }}
                      style={{
                        display: 'flex', gap: 14, alignItems: 'flex-start',
                        padding: '18px 0',
                        borderBottom: '0.5px solid rgba(26,15,10,0.07)',
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        width: 72, height: 72, borderRadius: 10,
                        overflow: 'hidden', flexShrink: 0,
                        background: '#F0E8DC',
                        border: '0.5px solid rgba(26,15,10,0.08)',
                      }}>
                        {item.image && (
                          <Image src={item.image} alt={item.name}
                            width={72} height={72}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: 10, fontWeight: 600,
                          letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: '#A8822A', marginBottom: 3, marginTop: 0,
                        }}>{item.category}</p>
                        <p style={{
                          fontSize: 14, fontWeight: 500, color: '#1A0F0A',
                          marginBottom: 10, marginTop: 0,
                          lineHeight: 1.35,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                        }}>{item.name}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {/* Qty stepper */}
                          <div style={{
                            display: 'flex', alignItems: 'center',
                            border: '0.5px solid rgba(26,15,10,0.18)',
                            borderRadius: 100, height: 30, overflow: 'hidden',
                          }}>
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              style={{
                                width: 30, height: 30, background: 'none',
                                border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'rgba(26,15,10,0.55)',
                              }}
                            ><Minus size={12} /></button>
                            <span style={{
                              width: 28, textAlign: 'center',
                              fontSize: 13, fontWeight: 600, color: '#1A0F0A',
                              fontFamily: 'monospace',
                            }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              style={{
                                width: 30, height: 30, background: 'none',
                                border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'rgba(26,15,10,0.55)',
                              }}
                            ><Plus size={12} /></button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              background: 'none', border: 'none',
                              cursor: 'pointer', fontSize: 11,
                              color: 'rgba(26,15,10,0.35)',
                              letterSpacing: '0.04em', padding: 0,
                            }}
                          >Remove</button>
                        </div>
                      </div>

                      {/* Price */}
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <p style={{
                          fontFamily: 'monospace', fontSize: 16,
                          fontWeight: 600, color: '#1A0F0A', margin: 0,
                        }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                        {item.mrp > item.price && (
                          <p style={{
                            fontFamily: 'monospace', fontSize: 11,
                            color: 'rgba(26,15,10,0.35)',
                            textDecoration: 'line-through', margin: '2px 0 0',
                          }}>₹{(item.mrp * item.qty).toLocaleString('en-IN')}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div style={{
                flexShrink: 0,
                padding: '20px 28px 28px',
                borderTop: '0.5px solid rgba(26,15,10,0.08)',
                background: '#FDFAF6',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'baseline', marginBottom: 6,
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(26,15,10,0.55)' }}>Subtotal</span>
                  <span style={{
                    fontFamily: 'monospace', fontSize: 20,
                    fontWeight: 700, color: '#1A0F0A',
                  }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <p style={{
                  fontSize: 11, color: 'rgba(26,15,10,0.38)',
                  margin: '0 0 20px', letterSpacing: '0.02em',
                }}>Shipping & taxes calculated at checkout</p>

                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                    height: 52, borderRadius: 100,
                    background: '#E8660A', color: 'white',
                    fontSize: 14, fontWeight: 600,
                    letterSpacing: '0.03em', textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(232,102,10,0.30)',
                    transition: 'background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = '#C9570A';
                    el.style.transform  = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = '#E8660A';
                    el.style.transform  = 'translateY(0)';
                  }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>

                <button
                  onClick={closeDrawer}
                  style={{
                    display: 'block', width: '100%', marginTop: 12,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 13, color: 'rgba(26,15,10,0.4)',
                    letterSpacing: '0.04em', textAlign: 'center',
                    fontFamily: 'inherit',
                  }}
                >Continue Shopping</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
