"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Ananya Sharma",
    location: "New Delhi",
    text: "The aroma of pure Kasturi Chandan Dhoop fills our entire home during morning prayers. The packaging and sacred authenticity are unmatched.",
    product: "Pure Kasturi Chandan Dhoop",
  },
  {
    name: "Rajesh Iyer",
    location: "Bengaluru",
    text: "Ordered the Hand-Carved Brass Brass Diya set for Diwali. The craftsmenship and weight feel like a family heirloom. Exceptional quality.",
    product: "Hand-Carved Brass Diya",
  },
  {
    name: "Dr. Meera Kulkarni",
    location: "Pune",
    text: "Live Darshan streaming paired with authentic Temple Prasad delivered straight to our doorstep. Ramanayam is truly bringing modern spiritualism to life.",
    product: "Divine Ritual Box",
  },
];

export function Testimonials() {
  return (
    <section className="section" style={{ background: "var(--bg-wash)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="text-eyebrow" style={{ marginBottom: 12 }}>
            Blessings & Gratitude
          </p>
          <h2 className="text-heading">Devotee Experiences</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "var(--bg-surface)",
                padding: 32,
                borderRadius: "var(--radius-lg)",
                border: "0.5px solid var(--border-100)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 4, color: "var(--gold)", marginBottom: 16 }}>
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill="var(--gold)" />
                  ))}
                </div>
                <p style={{ fontSize: 15, fontStyle: "italic", fontFamily: "var(--font-display)", color: "var(--text-100)", lineHeight: 1.6, marginBottom: 24 }}>
                  "{review.text}"
                </p>
              </div>

              <div style={{ borderTop: "0.5px solid var(--border-100)", paddingTop: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-100)", margin: "0 0 2px" }}>{review.name}</p>
                <p style={{ fontSize: 12, color: "var(--text-40)", margin: 0 }}>{review.location} • Verified Devotee</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
