import { ShieldCheck } from "lucide-react";
import type { CartItem } from "@/store/cart";

interface CheckoutSummaryProps {
  items: CartItem[];
  totalPrice: number;
  gst: number;
  grandTotal: number;
}

export function CheckoutSummary({
  items,
  totalPrice,
  gst,
  grandTotal,
}: CheckoutSummaryProps) {
  return (
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          position: "sticky",
          top: 110,
          background: "#FFFFFF",
          border: "0.5px solid rgba(26,15,10,0.08)",
          borderRadius: 24,
          padding: 36,
          boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
        }}
      >
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 24,
            fontWeight: 600,
            color: "#1A0F0A",
            marginBottom: 24,
            paddingBottom: 14,
            borderBottom: "1px solid rgba(26,15,10,0.08)",
          }}
        >
          Items
        </h3>

        {/* Scroll list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxHeight: 280,
            overflowY: "auto",
            paddingRight: 6,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "#FAF4EE",
                  border: "1px solid rgba(232,102,10,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                  color: "#E8660A",
                }}
              >
                {item.category === "Puja Essentials" ? "🪔" : "🕉️"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1A0F0A",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.2,
                  }}
                >
                  {item.name}
                </p>
                <p style={{ fontSize: 12, color: "rgba(26,15,10,0.4)", margin: "4px 0 0" }}>
                  Qty: {item.qty}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1A0F0A",
                }}
              >
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div
          style={{
            borderTop: "1px solid rgba(26,15,10,0.08)",
            marginTop: 24,
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(26,15,10,0.6)" }}>
            <span>Subtotal</span>
            <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#1A0F0A" }}>
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(26,15,10,0.6)" }}>
            <span>GST (18%)</span>
            <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#1A0F0A" }}>
              ₹{gst.toLocaleString("en-IN")}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(26,15,10,0.6)" }}>
            <span>Delivery</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#2E7D32", letterSpacing: "0.06em" }}>
              FREE
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingTop: 16,
              borderTop: "1px solid rgba(26,15,10,0.08)",
              marginTop: 4,
            }}
          >
            <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 18, fontWeight: 600, color: "#1A0F0A" }}>
              Grand Total
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                fontWeight: 700,
                color: "#1A0F0A",
              }}
            >
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* SSL Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid rgba(26,15,10,0.06)",
          }}
        >
          <ShieldCheck size={16} color="#2E7D32" />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(26,15,10,0.4)",
            }}
          >
            SSL Secured Checkout
          </span>
        </div>
      </div>
    </div>
  );
}
export default CheckoutSummary;
