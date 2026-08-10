"use client";

import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { ProductService } from "@/services/product.service";
import { useProductDetails } from "@/features/products/hooks/useProductDetails";
import { ProductGallery } from "@/features/products/components/ProductGallery";
import { ProductInfo } from "@/features/products/components/ProductInfo";
import { ProductReviews } from "@/features/products/components/ProductReviews";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Product } from "@/types/products";

export function ProductDetailContent({ product }: { product: Product }) {
  const {
    quantity,
    imgError,
    activeImageIndex,
    activeTab,
    wishlisted,
    discount,
    setImgError,
    setActiveImageIndex,
    setActiveTab,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    handleToggleWishlist,
  } = useProductDetails(product);

  const allProducts = ProductService.getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const mockReviews = [
    { name: "Rajesh K.", date: "12 May 2026", rating: 5, comment: "Exquisite craftsmanship and premium feel. Transformed our home mandir setup!" },
    { name: "Pooja S.", date: "28 April 2026", rating: 5, comment: "Pure fragrance and high quality wicks. Highly recommend this for daily prayers." },
    { name: "Suresh M.", date: "03 April 2026", rating: 4, comment: "Very authentic and carefully packed. Will definitely order from Ramanayam again." },
  ];

  const baseImage = (product.image && !product.image.includes('photo-1593508512255'))
    ? product.image
    : 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80';

  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? (product.images as any[]).map((img: any, i: number) => ({
        src: typeof img === 'string' ? img : (img.url || img.imageUrl || baseImage),
        label: `View ${i + 1}`,
      }))
    : [
        { src: baseImage, label: "Front view" },
        { src: baseImage, label: "Detail view" },
        { src: baseImage, label: "Scale view" },
      ];

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 48px)', paddingBottom: 120, background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <ScrollReveal variant="fade-in">
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
            <Link href="/" className="link-animated" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={12} color="var(--text-faint)" />
            <Link href="/products" className="link-animated" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>Catalog</Link>
            <ChevronRight size={12} color="var(--text-faint)" />
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{product.name}</span>
          </nav>
        </ScrollReveal>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="pdp-grid">
          {/* Gallery — Left */}
          <ScrollReveal variant="fade-up">
            <ProductGallery
              product={product}
              galleryImages={galleryImages}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              imgError={imgError}
              setImgError={setImgError}
              discount={discount}
            />
          </ScrollReveal>

          {/* Product Info — Right (Sticky) */}
          <ScrollReveal variant="fade-up" delay={0.2}>
            <ProductInfo
              product={product}
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              handleAddToCart={handleAddToCart}
              handleToggleWishlist={handleToggleWishlist}
              wishlisted={wishlisted}
              discount={discount}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </ScrollReveal>
        </div>

        {/* Reviews */}
        <ProductReviews reviews={mockReviews} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: 120, paddingTop: 80, borderTop: "1px solid var(--border)" }}>
            <ScrollReveal variant="blur-to-sharp">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, display: "flex", alignItems: "center", gap: 12 }}>
                  <Sparkles size={20} color="var(--accent-gold)" />
                  Related Offerings
                </h2>
                <Link href="/products" className="btn btn-ghost" style={{ fontSize: 13 }}>View Catalog</Link>
              </div>
            </ScrollReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }} className="related-grid">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .pdp-grid > div { position: static !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
