"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

export function CategoryShowcase() {
  return (
    <section className="section" style={{ background: "var(--bg-page)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="text-eyebrow" style={{ marginBottom: 12 }}>
            Browse
          </p>
          <h2 className="text-heading">Shop by Category</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
                duration: 0.6,
              }}
            >
              <Link href={`/products?category=${cat.slug}`}>
                <div
                  style={{
                    aspectRatio: "1",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    position: "relative",
                    border: "0.5px solid var(--border-100)",
                    cursor: "pointer",
                  }}
                  className="group"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(14,8,5,0.78) 0%, transparent 55%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "16px 14px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-hindi)",
                        color: "var(--gold)",
                        marginBottom: 2,
                      }}
                    >
                      {cat.nameHi || "पवित्र सामग्री"}
                    </p>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#F5E6D0",
                        margin: 0,
                      }}
                    >
                      {cat.name}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
