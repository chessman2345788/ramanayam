'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_PLAY_INTERVAL = 1500;

const TESTIMONIALS = [
  {
    text: 'The aroma of pure Kasturi Chandan Dhoop fills our entire home during morning prayers. The packaging and sacred authenticity are unmatched.',
    name: 'Ananya Sharma',
    city: 'New Delhi',
    rating: 5,
  },
  {
    text: 'Bought the brass Ganesh murti — the craftsmanship is simply stunning. Worth every rupee. It feels like a family heirloom.',
    name: 'Rajesh Kumar',
    city: 'Varanasi',
    rating: 5,
  },
  {
    text: 'Beautiful diya set! The brass quality is genuine and they look gorgeous when lit during aarti. My entire mandir glows.',
    name: 'Ananya Patel',
    city: 'Ahmedabad',
    rating: 5,
  },
  {
    text: 'The rudraksha mala feels authentic. Very happy with the quality and packaging. My daily japa has become so much more meaningful.',
    name: 'Suresh Reddy',
    city: 'Hyderabad',
    rating: 5,
  },
  {
    text: 'Live Darshan streaming paired with authentic Temple Prasad delivered to our doorstep. Ramanayam is truly bringing modern spiritualism to life.',
    name: 'Dr. Meera Kulkarni',
    city: 'Pune',
    rating: 5,
  },
  {
    text: 'Pure cow ghee for diya — burns so clean and the flame is steady for hours. Highly recommended for daily worship.',
    name: 'Vikram Singh',
    city: 'Delhi',
    rating: 4,
  },
];

const slideVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-rotation with proper cleanup; resets when activeIndex changes (including manual clicks)
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const timer = setInterval(goNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex, goNext]);

  const review = TESTIMONIALS[activeIndex];

  return (
    <section style={{ padding: '96px 0', background: '#F5F0E8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>

        {/* Centered carousel area */}
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

          {/* Large quotation mark */}
          <div style={{
            fontSize: 72,
            lineHeight: 1,
            color: 'rgba(168,130,42,0.25)',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            marginBottom: 24,
            userSelect: 'none',
          }}>
            &#8220;
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 32 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                fill={s <= review.rating ? '#A8822A' : '#E8DDD0'}
                color={s <= review.rating ? '#A8822A' : '#E8DDD0'}
              />
            ))}
          </div>

          {/* Animated review text */}
          <div style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px, 2.8vw, 28px)',
                  lineHeight: 1.6,
                  color: '#1A0F0A',
                  fontWeight: 500,
                  margin: '0 0 28px',
                  letterSpacing: '-0.01em',
                }}>
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author info */}
                <p style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#1A0F0A',
                  margin: '0 0 4px',
                }}>
                  {review.name}
                </p>
                <p style={{
                  fontSize: 13,
                  color: 'rgba(26,15,10,0.45)',
                  margin: '0 0 10px',
                }}>
                  {review.city}
                </p>
                <span style={{
                  display: 'inline-block',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'rgba(21,128,61,0.10)',
                  color: '#15803D',
                  border: '0.5px solid rgba(21,128,61,0.25)',
                }}>
                  Verified Buyer
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation: arrows + dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginTop: 40,
          }}>
            {/* Previous arrow */}
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '0.5px solid rgba(26,15,10,0.12)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,15,10,0.30)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,15,10,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ChevronLeft size={16} color="rgba(26,15,10,0.50)" strokeWidth={2} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    borderRadius: 100,
                    background: i === activeIndex ? '#E8660A' : 'rgba(26,15,10,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '0.5px solid rgba(26,15,10,0.12)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,15,10,0.30)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,15,10,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ChevronRight size={16} color="rgba(26,15,10,0.50)" strokeWidth={2} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
