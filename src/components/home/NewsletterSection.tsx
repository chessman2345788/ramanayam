'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  return (
    <section style={{ padding: '80px 0', background: '#1A0F0A' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8822A', marginBottom: 16, marginTop: 0 }}>
            Stay Connected
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 600, color: '#F5E6D0',
            margin: '0 0 12px', letterSpacing: '-0.01em',
          }}>Receive blessings &amp; sacred finds</h2>
          <p style={{ fontSize: 14, color: 'rgba(245,230,208,0.50)', margin: '0 0 32px', lineHeight: 1.6 }}>
            Festival offers, new arrivals, and puja reminders — delivered to your inbox.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                flex: 1, height: 50, padding: '0 18px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.08)',
                border: '0.5px solid rgba(255,255,255,0.15)',
                color: '#F5E6D0', fontSize: 14, outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button style={{
              height: 50, padding: '0 24px',
              borderRadius: 100,
              background: '#E8660A', border: 'none',
              color: 'white', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              letterSpacing: '0.02em', fontFamily: 'inherit',
            }}>
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
