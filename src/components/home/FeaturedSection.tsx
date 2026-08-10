'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '@/store/cart';

const FEATURED = [
  {
    id: 'premium-agarbatti',
    name: 'Premium Agarbatti Collection',
    subtitle: 'Hand-rolled natural incense sticks',
    category: 'Puja Essentials',
    price: 349, mrp: 499,
    rating: 4.8, reviews: 234,
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80',
    badges: ['Pure', 'Handmade'],
  },
  {
    id: 'brass-ganesh-murti',
    name: 'Brass Ganesh Murti',
    subtitle: 'Handcrafted solid brass idol',
    category: 'Idols & Shrines',
    price: 2499, mrp: 3499,
    rating: 4.9, reviews: 156,
    image: 'https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80',
    badges: ['Handmade', 'Pure Brass'],
  },
  {
    id: 'brass-diya-set',
    name: 'Traditional Brass Diya Set (5 pcs)',
    subtitle: 'Set of 5 handcrafted brass diyas',
    category: 'Lamps & Diyas',
    price: 799, mrp: 1199,
    rating: 4.7, reviews: 312,
    image: 'https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80',
    badges: ['Pure Brass', 'Handmade'],
  },
  {
    id: 'rudraksha-mala',
    name: 'Rudraksha Mala (108 Beads)',
    subtitle: 'Authentic 5-Mukhi rudraksha',
    category: 'Spiritual Wear',
    price: 1299, mrp: 1899,
    rating: 4.9, reviews: 189,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80',
    badges: ['Organic', 'Certified'],
  },
];

function ProductCard({ product, index }: { product: typeof FEATURED[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, subtitle: product.subtitle });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: `0.5px solid ${hovered ? 'rgba(26,15,10,0.18)' : 'rgba(26,15,10,0.08)'}`,
            overflow: 'hidden',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hovered
              ? '0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
              : '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Image Container */}
          <div style={{
            aspectRatio: '1',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #E6DDD0 0%, #DBD1C2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Fleur-de-lis emblem in center matching screenshot 1 */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.75,
              zIndex: 1,
            }}>
              <svg viewBox="0 0 64 64" width="48" height="48" fill="#D4A017">
                <path d="M32 4 C32 4 28 16 20 22 C14 26.5 8 28 8 36 C8 44 14 48 22 48 C27 48 30 45 32 42 C34 45 37 48 42 48 C50 48 56 44 56 36 C56 28 50 26.5 44 22 C36 16 32 4 32 4 Z M32 46 C28 52 20 54 20 60 L44 60 C44 54 36 52 32 46 Z" />
              </svg>
            </div>

            <Image
              src={imgErr ? 'https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80' : product.image}
              alt={product.name}
              fill
              style={{
                objectFit: 'cover',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                zIndex: 1,
              }}
              onError={() => setImgErr(true)}
              unoptimized
            />

            {/* Badges */}
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 5, flexWrap: 'wrap', zIndex: 2 }}>
              {product.badges.map(b => (
                <span key={b} style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: 100,
                  background: 'rgba(245,240,232,0.92)',
                  backdropFilter: 'blur(6px)',
                  border: '0.5px solid rgba(26,15,10,0.10)',
                  color: 'rgba(26,15,10,0.75)',
                }}>{b}</span>
              ))}
              {discount > 0 && (
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  padding: '3px 8px', borderRadius: 100,
                  background: 'rgba(232,102,10,0.12)',
                  border: '0.5px solid rgba(232,102,10,0.30)',
                  color: '#E8660A',
                }}>−{discount}%</span>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={e => { e.preventDefault(); e.stopPropagation(); setWished(w => !w); }}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(6px)',
                border: '0.5px solid rgba(26,15,10,0.08)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <Heart size={15}
                fill={wished ? '#E8660A' : 'none'}
                color={wished ? '#E8660A' : 'rgba(26,15,10,0.45)'}
                strokeWidth={1.75}
              />
            </motion.button>

            {/* Add to Cart — SLIDES UP ON HOVER ONLY matching screenshot 1 */}
            <motion.div
              animate={{ y: hovered ? 0 : 56, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', bottom: 12, left: 12, right: 12, zIndex: 2 }}
            >
              <button
                onClick={handleAdd}
                style={{
                  width: '100%', height: 44, borderRadius: 100,
                  background: added ? '#15803D' : '#E8660A',
                  border: 'none', cursor: 'pointer',
                  color: 'white', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 18px rgba(232,102,10,0.35)',
                  transition: 'background 0.25s ease',
                  fontFamily: 'inherit',
                }}
              >
                <ShoppingBag size={14} strokeWidth={2} />
                {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div style={{ padding: '18px 20px 22px' }}>
            <p style={{
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#A8822A', marginBottom: 6, marginTop: 0,
            }}>{product.category}</p>

            <p style={{
              fontSize: 17, fontWeight: 500,
              color: '#1A0F0A', marginBottom: 4, marginTop: 0,
              lineHeight: 1.3,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
            }}>{product.name}</p>

            <p style={{
              fontSize: 12, color: 'rgba(26,15,10,0.45)',
              marginBottom: 16, marginTop: 0,
            }}>{product.subtitle}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 18, fontWeight: 700, color: '#1A0F0A',
                }}>₹{product.price.toLocaleString('en-IN')}</span>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: 12, color: 'rgba(26,15,10,0.35)',
                  textDecoration: 'line-through',
                }}>₹{product.mrp.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={12} fill="#A8822A" color="#A8822A" />
                <span style={{ fontSize: 11, color: 'rgba(26,15,10,0.45)', fontFamily: 'monospace' }}>
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedSection() {
  return (
    <section style={{ padding: '100px 0', background: '#F5F0E8' }}>
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}
        >
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8660A', marginBottom: 10, marginTop: 0 }}>
              HANDPICKED
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 600, color: '#1A0F0A',
              margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>Best Sellers</h2>
          </div>

          <Link href="/products" style={{
            height: 44,
            padding: '0 24px',
            borderRadius: 100,
            background: 'transparent',
            border: '1px solid rgba(26,15,10,0.25)',
            color: '#1A0F0A',
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#E8660A';
            e.currentTarget.style.color = '#E8660A';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(26,15,10,0.25)';
            e.currentTarget.style.color = '#1A0F0A';
          }}
          >
            View All →
          </Link>
        </motion.div>

        {/* 4-col responsive grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURED.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
