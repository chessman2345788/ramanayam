import { motion } from "framer-motion";

interface CheckoutPaymentFormProps {
  selectedPayment: string;
  setSelectedPayment: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
  loading: boolean;
}

export function CheckoutPaymentForm({
  selectedPayment,
  setSelectedPayment,
  onBack,
  onNext,
  loading,
}: CheckoutPaymentFormProps) {
  const paymentMethods = [
    { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)", desc: "Quick secure redirection" },
    { id: "card", label: "Credit or Debit Cards", desc: "Visa, Mastercard, RuPay & Maestro" },
    { id: "netbanking", label: "Net Banking", desc: "All major Indian banks supported" },
    { id: "cod", label: "Cash on Delivery (COD)", desc: "Pay on receipt (+₹49 handling fee)" },
  ];

  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      style={{
        background: "#FFFFFF",
        border: "0.5px solid rgba(26,15,10,0.08)",
        borderRadius: 24,
        padding: "44px 48px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
      }}
    >
      <h2
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 28,
          fontWeight: 600,
          color: "#1A0F0A",
          margin: "0 0 32px",
          paddingBottom: 16,
          borderBottom: "1px solid rgba(26,15,10,0.08)",
        }}
      >
        Select Payment Method
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {paymentMethods.map((method) => {
          const active = selectedPayment === method.id;
          return (
            <label
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: 20,
                borderRadius: 16,
                border: `1.5px solid ${active ? "#E8660A" : "rgba(26,15,10,0.12)"}`,
                background: active ? "rgba(232,102,10,0.05)" : "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                userSelect: "none",
              }}
            >
              <input
                type="radio"
                name="payment"
                checked={active}
                onChange={() => {}}
                style={{
                  accentColor: "#E8660A",
                  marginTop: 4,
                  cursor: "pointer",
                }}
              />
              <div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#1A0F0A", display: "block" }}>
                  {method.label}
                </span>
                <span style={{ fontSize: 12, color: "rgba(26,15,10,0.5)", display: "block", marginTop: 4 }}>
                  {method.desc}
                </span>
              </div>
            </label>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
        <button
          onClick={onBack}
          disabled={loading}
          style={{
            height: 52,
            padding: "0 28px",
            borderRadius: 100,
            border: "1px solid rgba(26,15,10,0.2)",
            background: "#FFFFFF",
            color: "#1A0F0A",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          style={{
            flex: 1,
            height: 52,
            borderRadius: 100,
            background: "#E8660A",
            border: "none",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
            boxShadow: "0 6px 20px rgba(232,102,10,0.3)",
          }}
        >
          {loading ? "Processing..." : "Place Sacred Order 🙏"}
        </button>
      </div>
    </motion.div>
  );
}
export default CheckoutPaymentForm;