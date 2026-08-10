"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function LiveDarshanStrip() {
  return (
    <div
      style={{
        height: 52,
        background: "var(--maroon)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#FCA5A5",
              display: "block",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#FCA5A5",
              textTransform: "uppercase",
            }}
          >
            Live Now
          </span>
          <span
            style={{
              width: 1,
              height: 14,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <span style={{ fontSize: 13, color: "rgba(245,230,208,0.9)" }}>
            Kashi Vishwanath Morning Aarti
          </span>
        </div>

        <Link
          href="/live-darshan"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "rgba(245,230,208,0.8)",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(245,230,208,0.5)" }} className="hidden sm:inline">
            12,453 watching
          </span>
          <span style={{ marginLeft: 12 }}>Watch</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
