'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function BrandStorySection() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <section style={{ padding: '64px 0', background: '#F5F0E8' }}>
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>
        
        {/* FEATURED BANNER matching reference screenshot 5 from prompt 1 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <Link href="/products/premium-agarbatti" style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                background: '#EAE4D8',
                border: '0.5px solid rgba(26,15,10,0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                boxShadow: '0 8px 30px rgba(26,15,10,0.04)',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Left container with Fleur-de-lis / Emblem icon */}
              <div
                className="col-span-12 md:col-span-5"
                style={{
                  background: 'linear-gradient(135deg, #E6DDD0 0%, #DBD1C2 100%)',
                  minHeight: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  borderRight: '0.5px solid rgba(26,15,10,0.06)',
                }}
              >
                <div style={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.85,
                }}>
                  {/* Golden emblem icon */}
                  <svg viewBox="0 0 64 64" width="56" height="56" fill="#D4A017">
                    <path d="M32 4 C32 4 28 16 20 22 C14 26.5 8 28 8 36 C8 44 14 48 22 48 C27 48 30 45 32 42 C34 45 37 48 42 48 C50 48 56 44 56 36 C56 28 50 26.5 44 22 C36 16 32 4 32 4 Z M32 46 C28 52 20 54 20 60 L44 60 C44 54 36 52 32 46 Z" />
                  </svg>
                </div>
              </div>

              {/* Right container with featured product copy */}
              <div
                className="col-span-12 md:col-span-7"
                style={{
                  padding: 'clamp(28px, 3.5vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: '#EAE4D8',
                }}
              >
                <p style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#A8822A', marginBottom: 12, marginTop: 0,
                }}>
                  FEATURED
                </p>

                <h3 style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 600,
                  color: '#1A0F0A',
                  margin: '0 0 14px',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}>
                  Premium Agarbatti Collection
                </h3>

                <p style={{
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'rgba(26,15,10,0.65)',
                  margin: '0 0 24px',
                  maxWidth: 540,
                }}>
                  Hand-rolled natural incense sticks made with pure sandalwood, jasmine, and rose extracts. Each stick burns for 45 minutes releasing a divine fragrance that purifies your puja space.
                </p>

                {/* Pill Badges */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#A8822A',
                    padding: '6px 18px',
                    borderRadius: 100,
                    border: '1px solid rgba(168,130,42,0.4)',
                    background: 'rgba(245,240,232,0.5)',
                  }}>
                    Pure
                  </span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#A8822A',
                    padding: '6px 18px',
                    borderRadius: 100,
                    border: '1px solid rgba(168,130,42,0.4)',
                    background: 'rgba(245,240,232,0.5)',
                  }}>
                    Handmade
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* OUR STORY / CRAFTED WITH REVERENCE SECTION — Matching screenshot 2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Image (matching screenshot 2) */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                width: '100%',
                height: 'clamp(300px, 36vw, 440px)',
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                border: '0.5px solid rgba(26,15,10,0.08)',
                boxShadow: '0 16px 40px rgba(26,15,10,0.06)',
                background: '#EDE8DF',
              }}
            >
              <Image
                src={imgErr
                  ? 'https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=1000&auto=format&fit=crop&q=80'
                  : '/images/hero-bg.png'}
                alt="Sacred Puja Artisans and Altars"
                fill
                style={{ objectFit: 'cover' }}
                onError={() => setImgErr(true)}
                unoptimized
              />
            </div>
          </motion.div>

          {/* Right: Text Copy & Statistics (matching screenshot 2) */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#A8822A', marginBottom: 16, marginTop: 0,
            }}>
              OUR STORY
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 600, color: '#1A0F0A',
              margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              Crafted with<br />
              <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Reverence</span>
            </h2>

            {/* Gold Divider Line matching screenshot 2 */}
            <div style={{
              width: 40,
              height: 2,
              background: '#A8822A',
              marginBottom: 28,
            }} />

            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(26,15,10,0.65)', marginBottom: 20, marginTop: 0 }}>
              Every piece in our collection is handcrafted by artisans who have inherited their craft through generations. From the brass diyas of Moradabad to the sandalwood of Mysore, each product carries a story of devotion.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(26,15,10,0.65)', marginBottom: 44, marginTop: 0 }}>
              We work directly with artisan families to ensure fair trade and preserve these sacred crafts for generations to come.
            </p>

            {/* Statistics matching screenshot 2 */}
            <div
              className="grid grid-cols-3 gap-4 sm:gap-6"
              style={{
                borderTop: '0.5px solid rgba(26,15,10,0.12)',
                paddingTop: 32,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    color: '#A8822A',
                    margin: '0 0 4px',
                  }}
                >
                  200+
                </p>
                <p style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: 'rgba(26,15,10,0.55)', margin: 0 }}>Artisan Partners</p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    color: '#A8822A',
                    margin: '0 0 4px',
                  }}
                >
                  12
                </p>
                <p style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: 'rgba(26,15,10,0.55)', margin: 0 }}>States</p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    color: '#A8822A',
                    margin: '0 0 4px',
                  }}
                >
                  50+
                </p>
                <p style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: 'rgba(26,15,10,0.55)', margin: 0 }}>Sacred Crafts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
