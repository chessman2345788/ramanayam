"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

interface ProductCardProps {
  product: Product;
  index?: number;
  size?: "default" | "large" | "small";
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wished = isInWishlist(product.id);

  const discountPercent =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product as unknown as Record<string, unknown>);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: Math.min(index * 0.05, 0.3),
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ height: '100%' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#FFFFFF",
          borderRadius: 20,
          border: `1px solid ${hovered ? "#E8660A" : "rgba(26,15,10,0.08)"}`,
          overflow: "hidden",
          boxShadow: hovered ? "0 12px 32px rgba(232,102,10,0.12)" : "0 4px 16px rgba(0,0,0,0.03)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Image Container */}
        <div
          style={{
            aspectRatio: "1 / 1",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(180deg, #EBE3D5 0%, #D8CEBC 100%)",
            width: "100%",
          }}
        >
          <Link href={`/products/${product.slug}`} style={{ display: "block", width: "100%", height: "100%" }}>
            {!imgErr && product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                onError={() => setImgErr(true)}
                style={{
                  objectFit: "cover",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
                unoptimized
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, #FAF4EB 0%, #E6DDD0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 64 64" width="48" height="48" fill="#D4A017" style={{ opacity: 0.45 }}>
                  <path d="M32 4 C32 4 28 16 20 22 C14 26.5 8 28 8 36 C8 44 14 48 22 48 C50 48 56 44 56 36 C56 28 50 26.5 44 22 C36 16 32 4 32 4 Z M32 46 C28 52 20 54 20 60 L44 60 C44 54 36 52 32 46 Z" />
                </svg>
              </div>
            )}
          </Link>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 9px",
                  borderRadius: 100,
                  background: "rgba(232,102,10,0.9)",
                  color: "#FFFFFF",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                −{discountPercent}%
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            type="button"
            animate={{ opacity: hovered ? 1 : 0.8, scale: hovered ? 1 : 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(product);
            }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(26,15,10,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={15}
              fill={wished ? "#E8660A" : "none"}
              color={wished ? "#E8660A" : "rgba(26,15,10,0.6)"}
            />
          </motion.button>

          {/* Add to Cart Slide-Up Pill Button */}
          <motion.div
            animate={{ y: hovered ? 0 : 56, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              right: 12,
              zIndex: 3,
            }}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                width: "100%",
                height: 42,
                borderRadius: 100,
                background: "#E8660A",
                border: "none",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 4px 16px rgba(232,102,10,0.35)",
              }}
            >
              <ShoppingBag size={14} strokeWidth={2} />
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Product Meta Details */}
        <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#A8822A",
                marginBottom: 6,
                marginTop: 0,
              }}
            >
              {product.category}
            </p>
            <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#1A0F0A",
                  margin: "0 0 6px",
                  lineHeight: 1.25,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {product.name}
              </h3>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid rgba(26,15,10,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#1A0F0A" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(26,15,10,0.4)",
                    textDecoration: "line-through",
                    fontFamily: "monospace",
                  }}
                >
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={12} fill="#A8822A" color="#A8822A" />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(26,15,10,0.6)",
                }}
              >
                {product.rating || "4.9"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
