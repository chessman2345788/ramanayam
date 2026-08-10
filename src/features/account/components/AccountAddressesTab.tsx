import Link from "next/link";
import { MapPin } from "lucide-react";

export function AccountAddressesTab() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 32,
        }}
      >
        Saved Addresses
      </h2>
      
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 28,
          padding: 48,
          textAlign: "center",
          maxWidth: 520,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "var(--bg-sand)",
            border: "1.5px solid var(--border-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "var(--accent-saffron)",
          }}
        >
          <MapPin size={20} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          No Saved Addresses
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            marginBottom: 28,
          }}
        >
          Save shipping addresses to enjoy a quicker checkout experience
          next time.
        </p>
        <Link href="/products" className="btn btn-primary" style={{ fontSize: 12 }}>
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
export default AccountAddressesTab;
