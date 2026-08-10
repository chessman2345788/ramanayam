import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface ReviewItem {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  reviews: ReviewItem[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <section style={{ marginTop: 120, paddingTop: 80, borderTop: "1px solid var(--border)" }}>
      <ScrollReveal variant="blur-to-sharp">
        <div style={{ marginBottom: 64 }}>
          <p className="text-eyebrow" style={{ marginBottom: 12 }}>Customer Voice</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500 }}>
            Devotee Reviews
          </h2>
        </div>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="reviews-grid">
        {reviews.map((rev, idx) => (
          <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
            <div style={{
              padding: 32, borderRadius: 24, background: "var(--bg-card)", border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240,
            }}>
              <div>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < rev.rating ? "#D4AF37" : "transparent"} color={i < rev.rating ? "#D4AF37" : "var(--border-strong)"} />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 17, fontStyle: "italic", lineHeight: 1.7, color: "var(--text-primary)", marginBottom: 24 }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "var(--accent-saffron-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 600, color: "var(--accent-saffron)",
                }}>
                  {rev.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{rev.name}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{rev.date} · Verified</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
export default ProductReviews;
