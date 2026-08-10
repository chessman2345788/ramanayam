'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { slug: 'puja-essentials',  name: 'Puja Essentials',  count: 48, isFeatured: true, image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1000&auto=format&fit=crop&q=80' },
  { slug: 'idols-shrines',    name: 'Idols & Shrines',  count: 35, isFeatured: false, image: 'https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=1000&auto=format&fit=crop&q=80' },
  { slug: 'lamps-diyas',      name: 'Lamps & Diyas',    count: 28, isFeatured: false, image: 'https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=1000&auto=format&fit=crop&q=80' },
  { slug: 'spiritual-wear',   name: 'Spiritual Wear',   count: 42, isFeatured: false, image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1000&auto=format&fit=crop&q=80' },
  { slug: 'decor-offerings',  name: 'Decor & Offerings', count: 31, isFeatured: false, image: 'https://images.unsplash.com/photo-1545232979-fbf5929de441?w=1000&auto=format&fit=crop&q=80' },
];

function CategoryCard({
  cat,
  index,
  className = '',
  style,
}: {
  cat: typeof CATEGORIES[0];
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const isOrangeButton = cat.isFeatured || hovered;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      <Link href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            height: '100%',
            minHeight: cat.isFeatured ? 420 : 220,
            borderRadius: 24,
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(180deg, #CEBEA5 0%, #A89880 100%)',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
            cursor: 'pointer',
            boxShadow: hovered ? '0 16px 40px rgba(26,15,10,0.12)' : '0 4px 20px rgba(26,15,10,0.05)',
          }}
        >
          {/* Background image */}
          <Image
            src={imgErr ? 'https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=1000&auto=format&fit=crop&q=80' : cat.image}
            alt={cat.name}
            fill
            style={{
              objectFit: 'cover',
              opacity: 0.65,
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
            onError={() => setImgErr(true)}
            unoptimized
          />

          {/* Gradient Overlay matching reference */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(26,15,10,0.75) 0%, rgba(26,15,10,0.2) 60%, transparent 100%)',
          }} />

          {/* Bottom Content Area */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '24px 28px',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            zIndex: 2,
          }}>
            <div>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: cat.isFeatured ? 28 : 22,
                fontWeight: 600,
                color: '#FFFFFF',
                margin: '0 0 4px',
                lineHeight: 1.2,
              }}>{cat.name}</p>
              <p style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.75)',
                margin: 0,
                letterSpacing: '0.02em',
              }}>{cat.count} items</p>
            </div>

            {/* Circular Arrow Button (Orange for featured/hovered, grey/white outline otherwise) */}
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: isOrangeButton ? '#E8660A' : 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: isOrangeButton ? '0 4px 14px rgba(232,102,10,0.4)' : 'none',
              transition: 'all 0.3s ease',
            }}>
              <span style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1,
                display: 'block',
              }}>↗</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategorySection() {
  return (
    <section style={{ padding: '100px 0', background: '#F5F0E8' }}>
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>
        
        {/* Section Header matching reference screenshot 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(36px, 4.5vw, 54px)',
            fontWeight: 600,
            color: '#1A0F0A',
            margin: '0 0 12px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Shop by Devotion
          </h2>
          <p style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'rgba(26,15,10,0.65)',
            margin: 0,
            maxWidth: 580,
          }}>
            Every collection is carefully curated to bring authenticity and beauty to your spiritual practice.
          </p>
        </motion.div>

        {/* Asymmetric Top Grid */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 24,
          }}
        >
          {/* Puja Essentials — Large left card (7 cols desktop) */}
          <CategoryCard
            cat={CATEGORIES[0]}
            index={0}
            className="col-span-12 lg:col-span-7"
          />

          {/* Right column stacked cards (5 cols desktop) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <CategoryCard cat={CATEGORIES[1]} index={1} />
            <CategoryCard cat={CATEGORIES[2]} index={2} />
          </div>
        </motion.div>

        {/* Bottom equal row */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            marginTop: 24,
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <CategoryCard cat={CATEGORIES[3]} index={3} />
          <CategoryCard cat={CATEGORIES[4]} index={4} />
        </motion.div>

      </div>
    </section>
  );
}
