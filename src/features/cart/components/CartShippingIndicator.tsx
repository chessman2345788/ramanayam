import { Truck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface CartShippingIndicatorProps {
  progressPercent: number;
  amountLeftForFreeShipping: number;
}

export function CartShippingIndicator({
  progressPercent,
  amountLeftForFreeShipping,
}: CartShippingIndicatorProps) {
  return (
    <ScrollReveal variant="fade-up">
      <div
        style={{
          marginBottom: 48,
          padding: 28,
          border: "1px solid var(--border)",
          borderRadius: 24,
          background: "var(--bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--accent-saffron-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-saffron)",
            }}
          >
            <Truck size={18} />
          </div>
          <div>
            {amountLeftForFreeShipping > 0 ? (
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
                Add{" "}
                <span
                  style={{
                    fontWeight: 700,
                    color: "var(--accent-saffron)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ₹{amountLeftForFreeShipping.toLocaleString("en-IN")}
                </span>{" "}
                more to unlock{" "}
                <span style={{ fontWeight: 600, color: "var(--accent-saffron)" }}>
                  Free Sacred Delivery
                </span>
              </p>
            ) : (
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--success)",
                  margin: 0,
                }}
              >
                🎉 You have unlocked Free Sacred Shipping on this order!
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            height: 6,
            background: "var(--bg-sand)",
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "var(--accent-saffron)",
              width: `${progressPercent}%`,
              borderRadius: 100,
              transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
export default CartShippingIndicator;
