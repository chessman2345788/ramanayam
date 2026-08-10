import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/ScrollReveal";
import type { Occasion } from "@/types/products";

interface FestivalsGridProps {
  occasions: Occasion[];
  featuredSlug: string;
}

export function FestivalsGrid({ occasions, featuredSlug }: FestivalsGridProps) {
  const emojiMap: Record<string, string> = {
    diwali: "🪔",
    navratri: "🔱",
    "ganesh-chaturthi": "🐘",
    janmashtami: "🦚",
    "durga-puja": "⚔️",
    holi: "🎨",
    "daily-puja": "🙏",
  };

  const otherOccasions = occasions.filter((o) => o.slug !== featuredSlug);

  return (
    <section style={{ marginTop: 120 }}>
      <ScrollReveal variant="blur-to-sharp">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: 48,
          }}
        >
          All Sacred Occasions
        </h2>
      </ScrollReveal>

      <StaggerContainer>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="festivals-grid">
          {otherOccasions.map((o) => (
            <ScrollReveal key={o.id} variant="fade-up">
              <Link href={`/festivals/${o.slug}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: 36,
                    borderRadius: 24,
                    border: "1.5px solid rgba(232, 102, 10, 0.22)",
                    background: "linear-gradient(180deg, #FAF7F2 0%, #F4E8D8 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 240,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(232, 102, 10, 0.05)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E8660A";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(232, 102, 10, 0.18)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232, 102, 10, 0.22)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(232, 102, 10, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div>
                    <span style={{ fontSize: 44, display: "block", marginBottom: 20, userSelect: "none" }}>
                      {emojiMap[o.slug] || "🙏"}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 22,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        margin: "0 0 10px",
                      }}
                    >
                      {o.name}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      {o.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#E8660A",
                      marginTop: 24,
                    }}
                  >
                    <span>View Offerings</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </StaggerContainer>

      <style>{`
        @media (max-width: 1024px) {
          .festivals-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .festivals-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
export default FestivalsGrid;
