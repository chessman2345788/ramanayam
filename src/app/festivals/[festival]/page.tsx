import type { Metadata } from "next";
import Link from "next/link";
import { FestivalService } from "@/services/festival.service";
import { FestivalDetailContent } from "@/features/festivals/components/FestivalDetailContent";
import { PageTransition } from "@/components/animations/PageTransition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ festival: string }>;
}): Promise<Metadata> {
  const { festival } = await params;
  const occasion = FestivalService.getOccasionBySlug(festival);

  if (!occasion) {
    return {
      title: "Festival Not Found | Ramanayam",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ramayanam.in";

  return {
    title: `${occasion.name} Puja Essentials & Bundles`,
    description: occasion.description,
    openGraph: {
      title: `${occasion.name} Sacred Collection | Ramanayam`,
      description: occasion.description,
      url: `${siteUrl}/festivals/${occasion.slug}`,
      siteName: "Ramanayam",
      locale: "en_IN",
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/festivals/${occasion.slug}`,
    },
  };
}

export default async function OccasionPage({
  params,
}: {
  params: Promise<{ festival: string }>;
}) {
  const { festival } = await params;
  const occasion = FestivalService.getOccasionBySlug(festival);

  if (!occasion) {
    return (
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 80px)",
          paddingBottom: 120,
          textAlign: "center",
          minHeight: "100vh",
          background: "var(--bg-primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: 56, marginBottom: 24, userSelect: "none" }}>🕉️</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          Festival not found
        </h1>
        <Link href="/festivals" className="btn btn-outline" style={{ fontSize: 13 }}>
          ← Back to Festivals
        </Link>
      </div>
    );
  }

  const festivalProducts = FestivalService.getProductsForOccasion(occasion);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ramayanam.in";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: occasion.name,
    description: occasion.description,
    startDate: occasion.date ? new Date(occasion.date).toISOString() : undefined,
    location: {
      "@type": "Place",
      name: "Pan-India Sacred Celebrations",
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${siteUrl}/festivals/${occasion.slug}`,
      priceCurrency: "INR",
      offerCount: festivalProducts.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FestivalDetailContent occasion={occasion} products={festivalProducts} />
    </>
  );
}
