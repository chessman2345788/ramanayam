import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CheckoutAddressFormProps {
  name: string;
  setName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  pincode: string;
  setPincode: (val: string) => void;
  stateName: string;
  setStateName: (val: string) => void;
  isFormValid: boolean;
  onNext: () => void;
}

export function CheckoutAddressForm({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  city,
  setCity,
  pincode,
  setPincode,
  stateName,
  setStateName,
  isFormValid,
  onNext,
}: CheckoutAddressFormProps) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "1px solid rgba(26,15,10,0.12)",
    background: "#FFFFFF",
    padding: "0 16px",
    fontSize: 14,
    color: "#1A0F0A",
    outline: "none",
    transition: "all 0.25s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "rgba(26,15,10,0.6)",
    marginBottom: 8,
  };

  return (
    <motion.div
      key="step-1"
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
        Delivery Details
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="checkout-inputs-row">
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              placeholder="Recipient's name"
            />
          </div>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              placeholder="10-digit number"
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Street Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              ...inputStyle,
              height: 100,
              paddingTop: 14,
              paddingBottom: 14,
              resize: "none",
            }}
            placeholder="Flat/House number, Apartment, Area details"
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="checkout-inputs-row">
          <div>
            <label style={labelStyle}>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
              placeholder="City"
            />
          </div>
          <div>
            <label style={labelStyle}>Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              style={inputStyle}
              placeholder="6-digit pincode"
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>State</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            style={inputStyle}
            placeholder="State"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isFormValid}
        style={{
          marginTop: 40,
          width: "100%",
          height: 52,
          borderRadius: 100,
          background: "#E8660A",
          border: "none",
          color: "#FFFFFF",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          opacity: isFormValid ? 1 : 0.5,
          cursor: isFormValid ? "pointer" : "not-allowed",
          boxShadow: isFormValid ? "0 6px 20px rgba(232,102,10,0.3)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        Continue to Payment
      </button>
    </motion.div>
  );
}
export default CheckoutAddressForm;
