import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CheckoutConfirmation() {
  const [receiptId, setReceiptId] = useState("");

  useEffect(() => {
   
    setReceiptId(`RAM${Date.now().toString(36).toUpperCase()}`);
  }, []);

  return (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 32,
        padding: "64px 40px",
        textAlign: "center",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold bar accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, var(--accent-gold), var(--accent-saffron))",
        }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(118,138,77,0.1)",
          border: "1.5px solid rgba(118,138,77,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 28px",
          color: "var(--success)",
        }}
      >
        <Check size={36} strokeWidth={2.5} />
      </motion.div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 12,
        }}
      >
        Order Confirmed! 🙏
      </h2>
      
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.8,
          color: "var(--text-secondary)",
          marginBottom: 40,
          maxWidth: 400,
          margin: "0 auto 40px",
        }}
      >
        Your sacred elements have been registered. Our temple priests
        are preparing your items with spiritual care.
      </p>

      {receiptId && (
        <div
          style={{
            background: "var(--bg-sand)",
            border: "1px solid var(--border)",
            padding: "20px",
            borderRadius: 16,
            maxWidth: 280,
            margin: "0 auto 40px",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              display: "block",
              marginBottom: 4,
            }}
          >
            Receipt ID
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            #{receiptId}
          </span>
        </div>
      )}

      <Link href="/home" className="btn btn-primary" style={{ fontSize: 13 }}>
        Continue Shopping
      </Link>
    </motion.div>
  );
}
export default CheckoutConfirmation;
