import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Occasion } from "@/types/products";

interface FeaturedFestivalCardProps {
  featuredFestival: Occasion;
  countdown: { days: number; hours: number; minutes: number };
}

export function FeaturedFestivalCard({
  featuredFestival,
  countdown,
}: FeaturedFestivalCardProps) {
  return (
    <ScrollReveal variant="fade-up">
      <div
        style={{
          background: "linear-gradient(135deg, #FAF4EB 0%, #F3E4D3 100%)",
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid rgba(232, 102, 10, 0.25)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 400,
          boxShadow: "0 12px 40px rgba(232, 102, 10, 0.08)",
        }}
        className="featured-festival-card"
      >
        {/* Image side */}
        <div style={{ position: "relative", minHeight: 320 }}>
          <Image
            src={featuredFestival.image}
            alt={featuredFestival.name}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0) 60%)",
            }}
          />
        </div>

        {/* Details side */}
        <div
          style={{
            padding: "48px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          className="featured-festival-details"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontFamily: "var(--font-hindi)",
                fontSize: 16,
                color: "#E8660A",
                fontWeight: 600,
              }}
            >
              {featuredFestival.nameHi}
            </span>
            <span style={{ width: 1, height: 16, background: "rgba(26,15,10,0.15)" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
              FEATURED CELEBRATION
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 500,
              color: "var(--text-primary)",
              margin: "0 0 16px",
            }}
          >
            {featuredFestival.name}
          </h2>

          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 32 }}>
            {featuredFestival.description} Explore our curated catalog of lamps, brass items, 
            and pure cow ghee to prep your sanctuary for the celebration.
          </p>

          {/* Countdown clock */}
          {featuredFestival.date && (
            <div style={{ marginBottom: 36 }} className="countdown-wrap">
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                <Clock size={12} color="#A8822A" /> Countdown to Diwali
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Mins" },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        minWidth: 64,
                        height: 54,
                        background: "#FFFFFF",
                        borderRadius: 12,
                        border: "1px solid rgba(232, 102, 10, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        fontWeight: 600,
                        fontFamily: "monospace",
                        color: "#E8660A",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <span style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, display: "block" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link href={`/festivals/${featuredFestival.slug}`} className="btn btn-primary" style={{ padding: "14px 32px", background: "#E8660A", borderRadius: 100 }}>
            Explore Diwali Collection <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
export default FeaturedFestivalCard;
