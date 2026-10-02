"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, X } from "lucide-react";
import { PREVIEW_INDICATOR_COOKIE } from "@/lib/preview";

/**
 * Subtle non-intrusive floating indicator displayed ONLY during an authorized preview session.
 * Includes a quick link to exit preview mode (/__preview/exit).
 */
export function PreviewBadge() {
  const [active, setActive] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    try {
      if (document.cookie.includes(`${PREVIEW_INDICATOR_COOKIE}=true`)) {
        setActive(true);
      }
    } catch {
      setActive(false);
    }
  }, []);

  if (!active) return null;

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        title="Preview Mode Active (Click to expand)"
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 100,
          background: "rgba(26, 15, 10, 0.92)",
          color: "#FAF7F2",
          border: "1px solid rgba(232, 102, 10, 0.4)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22C55E",
            boxShadow: "0 0 8px #22C55E",
          }}
        />
        <Eye size={12} color="#E8660A" />
        <span>Preview</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Preview Mode Notice"
      style={{
        position: "fixed",
        bottom: 18,
        left: 18,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        borderRadius: 100,
        background: "rgba(26, 15, 10, 0.94)",
        color: "#FAF7F2",
        border: "1px solid rgba(232, 102, 10, 0.45)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        fontSize: 11,
        backdropFilter: "blur(10px)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22C55E",
            boxShadow: "0 0 8px #22C55E",
          }}
        />
        <span style={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#FAF7F2" }}>
          Storefront Preview
        </span>
      </div>

      <span style={{ width: 1, height: 12, background: "rgba(255, 255, 255, 0.2)" }} />

      <Link
        href="/__preview/exit"
        prefetch={false}
        style={{
          color: "#E8660A",
          fontWeight: 600,
          textDecoration: "none",
          fontSize: 11,
          padding: "2px 6px",
          borderRadius: 4,
          background: "rgba(232, 102, 10, 0.15)",
          transition: "background 0.2s",
        }}
      >
        Exit Preview
      </Link>

      <button
        onClick={() => setMinimized(true)}
        aria-label="Minimize preview banner"
        style={{
          background: "none",
          border: "none",
          color: "rgba(255, 255, 255, 0.4)",
          cursor: "pointer",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={13} />
      </button>
    </aside>
  );
}
