"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="section" style={{ background: "var(--bg-wash)" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 56,
          }}
        >
          <div>
            <p className="text-eyebrow" style={{ marginBottom: 12 }}>
              Curated Selection
            </p>
            <h2 className="text-heading">Divine Favourites</h2>
          </div>
          <Link
            href="/products"
            style={{
              fontSize: 13,
              color: "var(--saffron)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontWeight: 500,
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
