"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Occasion } from "@/types/products";

interface OccasionCardProps {
  occasion: Occasion;
  index: number;
}

export function OccasionCard({ occasion, index }: OccasionCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollReveal variant="scale-up" delay={index * 0.08} duration={0.8}>
      <Link
        href={`/festivals/${occasion.slug}`}
        style={{ textDecoration: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: 320,
            flexShrink: 0,
            scrollSnapAlign: "start",
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            height: 420,
            cursor: "pointer",
            border: `1px solid ${hovered ? "rgba(245,124,0,0.2)" : "var(--border)"}`,
            transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
            boxShadow: hovered
              ? "0 20px 48px rgba(245,124,0,0.06), 0 8px 24px rgba(0,0,0,0.04)"
              : "0 2px 12px rgba(0,0,0,0.03)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Image with slow zoom */}
          {!imgError ? (
            <Image
              src={occasion.image}
              alt={occasion.name}
              fill
              style={{
                objectFit: "cover",
                transform: hovered ? "scale(1.08)" : "scale(1.02)",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              sizes="320px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #F3EDE3, #E8DCC8)",
              }}
            />
          )}

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
              opacity: hovered ? 0.85 : 1,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 32,
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {occasion.nameHi && (
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "var(--font-hindi)",
                  marginBottom: 6,
                  letterSpacing: "0.08em",
                }}
              >
                {occasion.nameHi}
              </p>
            )}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 500,
                color: "white",
                lineHeight: 1.2,
                marginBottom: 8,
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              {occasion.name}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.5,
              }}
            >
              {occasion.description}
            </p>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
export default OccasionCard;
