import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import type { CartItem } from "@/store/cart";

interface CartItemBlockProps {
  item: CartItem;
  index: number;
  onQuantityChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemBlock({
  item,
  index,
  onQuantityChange,
  onRemove,
}: CartItemBlockProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        gap: 24,
        padding: 24,
        borderRadius: 24,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        alignItems: "center",
      }}
      className="cart-item-block"
    >
      {/* Product Image */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 18,
            background: "#F8F6F1",
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!imgError && item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="100px"
              onError={() => setImgError(true)}
            />
          ) : (
            <span style={{ fontSize: 32 }}>⚜️</span>
          )}
        </div>
      </div>

      {/* Info Description */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 500,
                color: "var(--text-primary)",
                margin: "0 0 4px",
              }}
            >
              {item.name}
            </h3>
            <p className="text-eyebrow" style={{ fontSize: 9, margin: 0 }}>
              {item.category}
            </p>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            style={{
              padding: 8,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--text-faint)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--error)";
              e.currentTarget.style.background = "var(--accent-saffron-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-faint)";
              e.currentTarget.style.background = "transparent";
            }}
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Pricing & Adjust panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Quantity selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => onQuantityChange(item.id, Math.max(1, item.qty - 1))}
              style={{
                width: 32,
                height: 30,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={item.qty <= 1}
            >
              <Minus size={12} />
            </button>
            <span
              style={{
                width: 32,
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                color: "var(--text-primary)",
              }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => onQuantityChange(item.id, item.qty + 1)}
              style={{
                width: 32,
                height: 30,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Pricing */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              ₹{(item.price * item.qty).toLocaleString("en-IN")}
            </p>
            {item.mrp > item.price && (
              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  textDecoration: "line-through",
                  fontFamily: "var(--font-mono)",
                  margin: "2px 0 0",
                }}
              >
                ₹{(item.mrp * item.qty).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default CartItemBlock;
