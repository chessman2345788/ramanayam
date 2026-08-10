import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <p className="text-eyebrow" style={{ marginBottom: 12 }}>
          404 — Page Not Found
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "var(--text-primary)",
            marginBottom: 20,
          }}
        >
          Sacred Path Unmapped
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          The ritual page or sacred offering you are seeking does not exist or has been moved to another location.
        </p>

        <Link
          href="/products"
          className="btn btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 50, padding: "0 28px", textDecoration: "none" }}
        >
          <ArrowLeft size={16} />
          <span>Explore Sacred Offerings</span>
        </Link>
      </div>
    </div>
  );
}
