"use client";

import { useFestivals } from "@/features/festivals/hooks/useFestivals";
import { FeaturedFestivalCard } from "@/features/festivals/components/FeaturedFestivalCard";
import { FestivalOffers } from "@/features/festivals/components/FestivalOffers";
import { FestivalsGrid } from "@/features/festivals/components/FestivalsGrid";
import { FestivalService } from "@/services/festival.service";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PageTransition } from "@/components/animations/PageTransition";
import { Sparkles } from "lucide-react";

export function FestivalsContent() {
  const occasions = FestivalService.getOccasions();
  const featuredFestival = occasions.find((o) => o.slug === "diwali") || occasions[0];

  const { countdown } = useFestivals(featuredFestival.date);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        paddingTop: 130,
        paddingBottom: 120,
      }}
    >
      {/* Page Header */}
      <div className="container" style={{ paddingBottom: 48 }}>
        <ScrollReveal variant="blur-to-sharp">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Sparkles size={14} color="var(--accent-saffron)" />
            <p className="text-eyebrow" style={{ margin: 0 }}>Seasonal Experiences</p>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--text-primary)",
              margin: "0 0 16px",
              lineHeight: 1.1,
            }}
          >
            Sacred Festivals
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 640 }}>
            Celebrate the divine cycles of India's eternal heritage. Discover hand-selected products, 
            custom puja bundles, and exclusive offers crafted for each auspicious occasion.
          </p>
        </ScrollReveal>
      </div>

      {/* Featured Festival Spotlight */}
      <div className="container" style={{ marginBottom: 96 }}>
        <FeaturedFestivalCard
          featuredFestival={featuredFestival}
          countdown={countdown}
        />
      </div>

      {/* Special Festive Offers */}
      <div className="container">
        <FestivalOffers />
      </div>

      {/* Other Occasions Grid */}
      <div className="container">
        <FestivalsGrid
          occasions={occasions}
          featuredSlug={featuredFestival.slug}
        />
      </div>
    </div>
  );
}
