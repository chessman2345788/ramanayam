import Link from "next/link";
import { Tag, ShieldCheck, ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface CartSummaryProps {
  totalPrice: number;
  savings: number;
  gst: number;
  deliveryCharge: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponApplied: boolean;
  couponError: boolean;
  couponDiscount: number;
  finalTotal: number;
  handleApplyCoupon: () => void;
}

export function CartSummary({
  totalPrice,
  savings,
  gst,
  deliveryCharge,
  couponCode,
  setCouponCode,
  couponApplied,
  couponError,
  couponDiscount,
  finalTotal,
  handleApplyCoupon,
}: CartSummaryProps) {
  return (
    <ScrollReveal variant="fade-up" delay={0.15}>
      <div
        style={{
          position: "sticky",
          top: 110,
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: "1px solid var(--border)",
          }}
        >
          Order Summary
        </h3>

        {/* Promo Code */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Tag
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="DEVOTION10 (10% OFF)"
                className="input"
                style={{
                  paddingLeft: 40,
                  fontSize: 13,
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                }}
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              className="btn btn-outline"
              style={{ padding: "0 20px", height: 52, borderRadius: 12 }}
            >
              Apply
            </button>
          </div>
          {couponApplied && (
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--success)",
                marginTop: 10,
                margin: "10px 0 0",
              }}
            >
              ✓ 10% Devotion code applied!
            </p>
          )}
          {couponError && (
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--error)",
                marginTop: 10,
                margin: "10px 0 0",
              }}
            >
              ✗ Invalid coupon code.
            </p>
          )}
        </div>

        {/* Calculations */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingBottom: 24,
            borderBottom: "1px solid var(--border)",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-secondary)" }}>
            <span>Subtotal</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 500 }}>
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          {savings > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--success)" }}>
              <span>Instant Savings</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                -₹{savings.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {couponApplied && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--success)" }}>
              <span>Coupon Discount (10%)</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                -₹{couponDiscount.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-secondary)" }}>
            <span>GST (18%)</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 500 }}>
              ₹{gst.toLocaleString("en-IN")}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-secondary)" }}>
            <span>Delivery Charges</span>
            {deliveryCharge === 0 ? (
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--success)", letterSpacing: "0.06em" }}>
                FREE
              </span>
            ) : (
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 500 }}>
                ₹49
              </span>
            )}
          </div>
        </div>

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Total Amount
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 26,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            ₹{finalTotal.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Checkout Link */}
        <Link
          href="/checkout"
          className="btn btn-primary"
          style={{
            width: "100%",
            height: 52,
            fontSize: 13,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Proceed to Checkout
        </Link>

        <Link
          href="/products"
          className="link-animated"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 12,
            color: "var(--text-muted)",
            textDecoration: "none",
            marginTop: 20,
          }}
        >
          <ArrowLeft size={13} />
          Continue Shopping
        </Link>

        {/* SSL Secure */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
          }}
        >
          <ShieldCheck size={16} color="var(--success)" />
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Secured by SSL Encryption
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
}
export default CartSummary;
