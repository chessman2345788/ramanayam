'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section style={{
      minHeight: 'calc(100vh - 72px)',
      background: '#F5F0E8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 100,
      paddingBottom: 48,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1540,
        margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 64px)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(32px, 5vw, 64px)',
        width: '100%',
      }} className="flex-col lg:flex-row">

        {/* LEFT — text content */}
        <div style={{ maxWidth: 640, flex: '1 1 auto', width: '100%' }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#E8660A',
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            EST. IN DEVOTION
          </motion.p>

          {/* Headline — Sacred Rituals, Modern Living */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              fontSize: 'clamp(46px, 5.5vw, 84px)',
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: '#1A0F0A',
              margin: '0 0 24px',
            }}
          >
            Sacred Rituals,<br />
            <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Modern Living</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: 'rgba(26,15,10,0.65)',
              marginBottom: 36,
              maxWidth: 480,
              marginTop: 0,
            }}
          >
            Handcrafted puja essentials and sacred décor, curated for the modern devotee. Bring the divine home.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 48 }}
          >
            <Link href="/products" style={{
              height: 54,
              padding: '0 34px',
              borderRadius: 100,
              background: '#E8660A',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 6px 24px rgba(232,102,10,0.32)',
              whiteSpace: 'nowrap',
              transition: 'transform 0.25s ease, background 0.25s ease',
            }}>
              Explore Collection <span style={{ fontSize: 16 }}>→</span>
            </Link>

            <Link href="/live-darshan" style={{
              height: 54,
              padding: '0 30px',
              borderRadius: 100,
              background: 'transparent',
              border: '1px solid rgba(26,15,10,0.25)',
              color: 'rgba(26,15,10,0.85)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
            }}>
              Live Darshan
            </Link>
          </motion.div>

          {/* Trust Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{
              borderTop: '0.5px solid rgba(26,15,10,0.12)',
              paddingTop: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              maxWidth: 500,
            }}
          >
            <div>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 26,
                fontWeight: 700,
                color: '#E8660A',
                margin: 0,
                lineHeight: 1.1,
              }}>5,000+</p>
              <p style={{ fontSize: 12, color: 'rgba(26,15,10,0.55)', margin: '4px 0 0' }}>Happy Devotees</p>
            </div>
            <div>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 26,
                fontWeight: 700,
                color: '#E8660A',
                margin: 0,
                lineHeight: 1.1,
              }}>100%</p>
              <p style={{ fontSize: 12, color: 'rgba(26,15,10,0.55)', margin: '4px 0 0' }}>Pure &amp; Handcrafted</p>
            </div>
            <div>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 26,
                fontWeight: 700,
                color: '#E8660A',
                margin: 0,
                lineHeight: 1.1,
              }}>Pan-India</p>
              <p style={{ fontSize: 12, color: 'rgba(26,15,10,0.55)', margin: '4px 0 0' }}>Sacred Delivery</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Portrait devotional image with outer continuous floating animation & inner image card */}
        <motion.div
          animate={{ y: [0, -12, 0, 12, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            flex: '0 0 auto',
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'min(500px, 90vw)',
              height: 'clamp(360px, 52vh, 600px)',
              borderRadius: 28,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(26,15,10,0.12)',
              background: 'linear-gradient(135deg, #E8DCC8, #D8CBB5)',
            }}
          >
            <Image
              src={imgError
                ? "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=1000&auto=format&fit=crop&q=80"
                : "/images/hero-bg.png"}
              alt="Sacred brass deity statues with lit diyas"
              fill
              priority
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        marginTop: 32,
      }}>
        <span style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(26,15,10,0.40)', textTransform: 'uppercase', fontWeight: 600 }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 26, background: 'rgba(26,15,10,0.30)' }}
        />
      </div>
    </section>
  );
}
