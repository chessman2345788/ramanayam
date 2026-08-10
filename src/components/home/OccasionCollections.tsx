'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FESTIVALS_DATA = [
  {
    slug: 'diwali',
    name: 'Diwali',
    nameHi: 'दीपावली',
    description: 'Festival of Lights — illuminate your home with diyas, lamps, and sacred decorations.',
    image: 'https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'navratri',
    name: 'Navratri',
    nameHi: 'नवरात्रि',
    description: 'Nine Nights of the Goddess — special puja items for Durga worship.',
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    nameHi: 'गणेश चतुर्थी',
    description: 'Welcome Lord Ganesh — eco-friendly idols and celebration essentials.',
    image: 'https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'janmashtami',
    name: 'Janmashtami',
    nameHi: 'जन्माष्टमी',
    description: 'Birthday of Lord Krishna — pots, and devotional decor.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'durga-puja',
    name: 'Durga Puja',
    nameHi: 'दुर्गा पूजा',
    description: "Bengal's grandest festival — sindoor, dhunuchi, and divine accessories.",
    image: 'https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'holi',
    name: 'Holi',
    nameHi: 'होली',
    description: 'Festival of Colors — organic colors, water guns, and festive sweets.',
    image: 'https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80',
  },
  {
    slug: 'daily-puja',
    name: 'Daily Puja',
    nameHi: 'दैनिक पूजा',
    description: 'Your everyday spiritual practice — essentials for morning and evening worship.',
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80',
  },
];

export function OccasionCollections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Calculate visible cards per viewport breakpoint
  const getCardsVisible = (width: number) => {
    if (width >= 1024) return 4;
    if (width >= 640) return 2;
    return 1;
  };

  const getGap = (width: number) => {
    if (width >= 1024) return 24;
    if (width >= 640) return 20;
    return 16;
  };

  const cardsVisible = getCardsVisible(containerWidth);
  const gap = getGap(containerWidth);

  // Maximum allowed index to prevent scrolling past available festival cards
  const maxIndex = Math.max(0, FESTIVALS_DATA.length - cardsVisible);

  // Compute exact card width safely (never zero or NaN)
  const cardWidth = Math.max(200, (containerWidth - (cardsVisible - 1) * gap) / cardsVisible);
  const stepWidth = cardWidth + gap;

  // Window resize listener with SSR safety
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && containerRef.current.clientWidth > 0) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleCardClick = (index: number) => {
    // If user was dragging/swiping, skip card click
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }
    // Clicking any card advances carousel glide sideways to next position
    if (currentIndex < maxIndex) {
      handleNext();
    } else {
      // If at last position, loop back to start position
      setCurrentIndex(0);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 30;
    if (Math.abs(info.offset.x) > 5) {
      isDraggingRef.current = true;
    }
    if (info.offset.x < -threshold && currentIndex < maxIndex) {
      handleNext();
    } else if (info.offset.x > threshold && currentIndex > 0) {
      handlePrev();
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  return (
    <section style={{ background: '#F5F0E8', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#A8822A', marginBottom: 10, marginTop: 0,
            }}>
              FESTIVAL SPOTLIGHT
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 600, color: '#1A0F0A',
              margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              Sacred Occasions
            </h2>
          </div>

          {/* Navigation Controls (Left / Right Arrow Buttons) */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous festivals"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#FFFFFF',
                border: '0.5px solid rgba(26,15,10,0.12)',
                color: currentIndex === 0 ? 'rgba(26,15,10,0.25)' : 'rgba(26,15,10,0.7)',
                opacity: currentIndex === 0 ? 0.4 : 1,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (currentIndex > 0) {
                  e.currentTarget.style.borderColor = '#A8822A';
                  e.currentTarget.style.color = '#A8822A';
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex > 0) {
                  e.currentTarget.style.borderColor = 'rgba(26,15,10,0.12)';
                  e.currentTarget.style.color = 'rgba(26,15,10,0.7)';
                }
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next festivals"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#FFFFFF',
                border: '0.5px solid rgba(26,15,10,0.12)',
                color: currentIndex >= maxIndex ? 'rgba(26,15,10,0.25)' : 'rgba(26,15,10,0.7)',
                opacity: currentIndex >= maxIndex ? 0.4 : 1,
                cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (currentIndex < maxIndex) {
                  e.currentTarget.style.borderColor = '#A8822A';
                  e.currentTarget.style.color = '#A8822A';
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex < maxIndex) {
                  e.currentTarget.style.borderColor = 'rgba(26,15,10,0.12)';
                  e.currentTarget.style.color = 'rgba(26,15,10,0.7)';
                }
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Viewport Container with Touch Swipe & Card Click Interaction */}
        <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', touchAction: 'pan-y' }}>
          <motion.div
            drag="x"
            dragConstraints={{
              left: -(maxIndex * stepWidth),
              right: 0,
            }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ x: -(currentIndex * stepWidth) }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 30,
            }}
            style={{
              display: 'flex',
              gap: `${gap}px`,
              willChange: 'transform',
              cursor: 'grab',
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {FESTIVALS_DATA.map((occ, i) => {
              const hasErr = imgErrors[occ.slug];

              return (
                <div
                  key={occ.slug}
                  onClick={() => handleCardClick(i)}
                  style={{
                    flex: `0 0 ${cardWidth}px`,
                    width: `${cardWidth}px`,
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <div
                    style={{
                      height: 'clamp(340px, 46vh, 420px)',
                      borderRadius: 24,
                      overflow: 'hidden',
                      position: 'relative',
                      background: 'linear-gradient(180deg, #EBE3D5 0%, #D8CEBC 100%)',
                      border: '0.5px solid rgba(26,15,10,0.08)',
                      boxShadow: '0 8px 24px rgba(26,15,10,0.04)',
                      transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    }}
                  >
                    {!hasErr ? (
                      <Image
                        src={occ.image}
                        alt={occ.name}
                        fill
                        style={{
                          objectFit: 'cover',
                          opacity: 0.85,
                          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                        }}
                        onError={() => setImgErrors((prev) => ({ ...prev, [occ.slug]: true }))}
                        unoptimized
                      />
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, #E6DDD0 0%, #DBD1C2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg viewBox="0 0 64 64" width="48" height="48" fill="#D4A017" style={{ opacity: 0.4 }}>
                          <path d="M32 4 C32 4 28 16 20 22 C14 26.5 8 28 8 36 C8 44 14 48 22 48 C50 48 56 44 56 36 C56 28 50 26.5 44 22 C36 16 32 4 32 4 Z M32 46 C28 52 20 54 20 60 L44 60 C44 54 36 52 32 46 Z" />
                        </svg>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(26,15,10,0.85) 0%, rgba(26,15,10,0.2) 60%, transparent 100%)',
                      }}
                    />

                    {/* Text Details */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 28,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#A8822A',
                          marginBottom: 6,
                          marginTop: 0,
                        }}
                      >
                        {occ.nameHi}
                      </p>
                      <h3
                        style={{
                          fontSize: 26,
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          color: '#FFFFFF',
                          margin: '0 0 8px',
                          lineHeight: 1.2,
                          fontWeight: 600,
                        }}
                      >
                        {occ.name}
                      </h3>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
                        {occ.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
