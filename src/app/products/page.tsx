import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "@/features/products/components/ShopContent";

export const metadata: Metadata = {
  title: "Sacred Offerings & Puja Essentials Catalog",
  description:
    "Browse handcrafted brass idols, organic incense sticks, rudraksha malas, pure puja ghee, and temple brassware curated for modern devotees.",
  alternates: {
    canonical: "https://ramayanam.in/products",
  },
  openGraph: {
    title: "Sacred Offerings & Puja Essentials Catalog | Ramanayam",
    description:
      "Handcrafted idols, organic incense, brass diyas, and temple decor delivered pan-India.",
    url: "https://ramayanam.in/products",
  },
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "var(--text-muted)" }}>
            Loading Divine Catalog...
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
