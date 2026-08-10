"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight } from "lucide-react";

export function LiveDarshanCard() {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ padding: "64px 0", background: "#F5F0E8" }}>
      <div style={{ maxWidth: 1540, margin: "0 auto", padding: "0 clamp(20px, 4vw, 64px)" }}>
        
        {/* Section Header matching screenshot 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 36 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#A8822A", marginBottom: 10, marginTop: 0,
          }}>
            DIVINE CONNECTION
          </p>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 46px)',
            fontWeight: 600, color: '#1A0F0A',
            margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            Live Darshan
          </h2>
        </motion.div>

        {/* Dual-Column Card Showcase matching screenshot 4 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "#FFFFFF",
            borderRadius: 24,
            overflow: "hidden",
            border: "0.5px solid rgba(26,15,10,0.08)",
            boxShadow: hovered
              ? "0 16px 40px rgba(0,0,0,0.07)"
              : "0 6px 24px rgba(0,0,0,0.03)",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Left Column: Video Thumbnail Container */}
          <div
            className="col-span-12 lg:col-span-7"
            style={{
              position: "relative",
              height: "clamp(260px, 30vw, 350px)",
              overflow: "hidden",
              background: "#1A1008",
            }}
          >
            <Image
              src={imgError
                ? "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=1000&auto=format&fit=crop&q=80"
                : "/images/hero-bg.png"}
              alt="Kashi Vishwanath Temple Live Aarti"
              fill
              style={{
                objectFit: "cover",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onError={() => setImgError(true)}
              unoptimized
            />

            {/* LIVE Badge Top Left */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                padding: "6px 14px",
                borderRadius: 100,
                zIndex: 3,
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#EF4444",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.12em",
                }}
              >
                LIVE
              </span>
            </div>

            {/* Center Orange Circular Play Button matching screenshot 4 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Link href="/live-darshan" aria-label="Watch Live Darshan">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#E8660A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(232,102,10,0.4)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "16px solid #FFFFFF",
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      marginLeft: 4,
                    }}
                  />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Right Column: Info & CTA matching screenshot 4 */}
          <div
            className="col-span-12 lg:col-span-5"
            style={{
              padding: "clamp(24px, 3.5vw, 40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#E8660A",
                }}
              >
                (•) NOW STREAMING
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 600,
                color: "#1A0F0A",
                lineHeight: 1.15,
                margin: "0 0 8px",
              }}
            >
              Kashi Vishwanath Temple
            </h3>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 15,
                color: "rgba(26,15,10,0.65)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Kashi Vishwanath Morning Aarti
            </p>

            {/* Details */}
            <div
              style={{
                display: "flex",
                gap: 20,
                marginBottom: 32,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={14} color="#A8822A" />
                <span style={{ fontSize: 13, color: "rgba(26,15,10,0.55)" }}>
                  Varanasi, Uttar Pradesh
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Users size={14} color="#A8822A" />
                <span style={{ fontSize: 13, color: "rgba(26,15,10,0.55)" }}>
                  12,453 watching
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/live-darshan"
                style={{
                  height: 52,
                  padding: "0 34px",
                  borderRadius: 100,
                  background: "#E8660A",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 6px 20px rgba(232,102,10,0.3)",
                  whiteSpace: "nowrap",
                  transition: "transform 0.25s ease, background 0.25s ease",
                }}
              >
                Watch Live <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default LiveDarshanCard;
