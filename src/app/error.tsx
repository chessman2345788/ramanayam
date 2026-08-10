"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Boundary caught error:", error);
  }, [error]);

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
      <div style={{ maxWidth: 500 }}>
        <p style={{ fontSize: 48, margin: "0 0 16px" }}>🙏</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          A Auspicious Pause
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: 36,
          }}
        >
          We encountered an unexpected disruption while loading this page. Please try refreshing or return to the main catalog.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => reset()}
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px" }}
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/home"
            className="btn btn-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px", textDecoration: "none" }}
          >
            <Home size={16} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
