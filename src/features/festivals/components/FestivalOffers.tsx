import { Gift, Tag, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function FestivalOffers() {
  const offers = [
    {
      id: "offer-1",
      title: "Devi Puja Shringar Combo",
      subtitle: "Navratri Special Offer",
      desc: "Get pure Mysore sandalwood chandan paste free with orders above ₹1,999.",
      code: "SHRINGAR",
      badge: "Free Gift",
      icon: <Gift size={20} color="#E8660A" />,
    },
    {
      id: "offer-2",
      title: "Deepavali Light & Grace Kit",
      subtitle: "Diwali Bundled Savings",
      desc: "Save 15% on a complete collection of handcrafted brass diyas and A2 cow ghee.",
      code: "DIWALI15",
      badge: "Save 15%",
      icon: <Tag size={20} color="#E8660A" />,
    },
    {
      id: "offer-3",
      title: "Daily Devotion Starter Pack",
      subtitle: "Ongoing Experience Pack",
      desc: "Includes natural incense sticks, copper kalash, and brass diyas for your home altar.",
      code: "DEVOTION",
      badge: "Special Price",
      icon: <Sparkles size={20} color="#E8660A" />,
    },
  ];

  return (
    <section style={{ marginTop: 120, paddingTop: 80, borderTop: "1px solid rgba(26,15,10,0.12)" }}>
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
          Special Festive Packages
        </h2>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="offers-grid">
        {offers.map((offer, idx) => (
          <ScrollReveal key={offer.id} variant="fade-up" delay={idx * 0.1}>
            <div
              style={{
                padding: 32,
                borderRadius: 24,
                background: "linear-gradient(180deg, #FAF7F2 0%, #F4E8D8 100%)",
                border: "1px solid rgba(232, 102, 10, 0.18)",
                boxShadow: "0 4px 16px rgba(232, 102, 10, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 300,
                position: "relative",
              }}
            >
              <div>
                <span
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "rgba(232, 102, 10, 0.12)",
                    color: "#E8660A",
                    border: "0.5px solid rgba(232, 102, 10, 0.25)",
                  }}
                >
                  {offer.badge}
                </span>

                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(232, 102, 10, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  {offer.icon}
                </div>

                <p
                  className="text-eyebrow"
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: "#A8822A", marginBottom: 8 }}
                >
                  {offer.subtitle}
                </p>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    margin: "0 0 12px",
                  }}
                >
                  {offer.title}
                </h3>

                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {offer.desc}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(26,15,10,0.08)",
                  paddingTop: 16,
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Promo Code:</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1A0F0A",
                    letterSpacing: "0.04em",
                  }}
                >
                  {offer.code}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .offers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
export default FestivalOffers;
