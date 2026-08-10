import type { Metadata } from "next";
import Link from "next/link";
import { ProductService } from "@/services/product.service";
import { ProductDetailContent } from "@/features/products/components/ProductDetailContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = ProductService.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Ramanayam",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ramayanam.in";

  return {
    title: `${product.name} — Handcrafted Puja Essential`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Ramanayam`,
      description: product.description,
      url: `${siteUrl}/products/${product.slug}`,
      siteName: "Ramanayam",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = ProductService.getProductBySlug(slug);

  if (!product) {
    return (
      <div style={{ paddingTop: 160, paddingBottom: 120, textAlign: "center", minHeight: "100vh", background: "var(--bg-primary)" }}>
        <p style={{ fontSize: 56, marginBottom: 24, userSelect: "none" }}>🕉️</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--text-primary)", marginBottom: 16 }}>
          Product not found
        </h1>
        <Link href="/products" className="btn btn-outline" style={{ fontSize: 13 }}>
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ramayanam.in";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Ramanayam",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailContent product={product} />
    </>
  );
}
