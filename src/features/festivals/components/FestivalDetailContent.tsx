"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Clock, ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { FestivalService } from "@/services/festival.service";
import { useFestivals } from "@/features/festivals/hooks/useFestivals";
import { ProductCard } from "@/components/product/ProductCard";
import { PageTransition } from "@/components/animations/PageTransition";

export function FestivalDetailContent({
  occasion,
  products: festivalProducts,
}: {
  occasion: NonNullable<ReturnType<typeof FestivalService.getOccasionBySlug>>;
  products: ReturnType<typeof FestivalService.getProductsForOccasion>;
}) {
  const { countdown, handleAddAllToCart } = useFestivals(occasion.date, festivalProducts);

  const emojiMap: Record<string, string> = {
    diwali: "🪔",
    navratri: "🔱",
    "ganesh-chaturthi": "🐘",
    janmashtami: "🦚",
    "durga-puja": "⚔️",
    holi: "🎨",
    "daily-puja": "🙏",
  };

  const occasions = FestivalService.getOccasions();

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-primary)",
          paddingTop: 130,
        }}
      >
        {/* Banner Hero */}
        <div
          style={{
            position: "relative",
            paddingTop: 48,
            paddingBottom: 64,
            background: "linear-gradient(180deg, #FAF4EE 0%, #F5EAE0 100%)",
            borderBottom: "1px solid rgba(232, 102, 10, 0.15)",
            overflow: "hidden",
          }}
        >
          {/* Faded background icon */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 280,
              opacity: 0.03,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {emojiMap[occasion.slug] || "🙏"}
          </div>

          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 5,
            }}
          >
            <Link
              href="/festivals"
              className="link-animated"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-secondary)",
                textDecoration: "none",
                marginBottom: 32,
              }}
            >
              <ArrowLeft size={14} />
              Back to Festivals
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="text-eyebrow"
                style={{
                  color: "#E8660A",
                  marginBottom: 16,
                  display: "block",
                  fontFamily: "var(--font-hindi)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {occasion.nameHi}
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  margin: "0 0 20px",
                  lineHeight: 1.1,
                }}
              >
                {occasion.name}
              </h1>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "var(--text-secondary)",
                  maxWidth: 580,
                  margin: "0 auto 40px",
                }}
              >
                {occasion.description}
              </p>

              {/* Countdown Clock */}
              {occasion.date && (
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    padding: "24px 32px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(232, 102, 10, 0.2)",
                    borderRadius: 24,
                    boxShadow: "0 4px 20px rgba(232, 102, 10, 0.06)",
                  }}
                  className="countdown-clock"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#A8822A",
                    }}
                  >
                    <Clock size={14} color="#E8660A" />
                    <span>Countdown Clock</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      color: "var(--text-primary)",
                    }}
                  >
                    {[
                      { val: countdown.days, lbl: "Days" },
                      { val: countdown.hours, lbl: "Hrs" },
                      { val: countdown.minutes, lbl: "Mins" },
                    ].map((item) => (
                      <div
                        key={item.lbl}
                        style={{
                          background: "#FAF4EE",
                          border: "1px solid rgba(232, 102, 10, 0.15)",
                          borderRadius: 14,
                          padding: "10px 16px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          minWidth: 64,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            fontFamily: "monospace",
                            color: "#E8660A",
                          }}
                        >
                          {item.val}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginTop: 2,
                          }}
                        >
                          {item.lbl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Catalog */}
        <div className="container" style={{ padding: "80px var(--container-pad) 120px" }}>
          {/* Bundle Kit Banner */}
          {festivalProducts.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                marginBottom: 64,
                padding: 36,
                background: "linear-gradient(135deg, rgba(245,124,0,0.03) 0%, rgba(212,175,55,0.03) 100%)",
                borderRadius: 28,
                border: "1.5px solid rgba(245,124,0,0.12)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 32,
                  flexWrap: "wrap",
                }}
                className="bundle-banner"
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Sparkles size={18} color="var(--accent-saffron)" />
                    Complete {occasion.name} Puja Samagri Bundle
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      margin: 0,
                      maxWidth: 580,
                    }}
                  >
                    Get all {festivalProducts.length} auspicious offerings required for the{" "}
                    {occasion.name} prayers in a single, verified collection kit.
                  </p>
                </div>
                <button
                  onClick={handleAddAllToCart}
                  className="btn btn-primary"
                  style={{
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <ShoppingBag size={14} />
                  Add All to Cart
                </button>
              </div>
            </motion.div>
          )}

          {/* Catalog grid */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: 48,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Calendar size={22} color="var(--accent-saffron)" />
            {occasion.name} Ritual Collection
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 28,
            }}
            className="festival-grid"
          >
            {festivalProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Other Occasions */}
          <section
            style={{
              marginTop: 120,
              paddingTop: 80,
              borderTop: "1px solid var(--border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: 48,
              }}
            >
              Explore Other Festive Offerings
            </h2>
            <div
              style={{
                display: "flex",
                gap: 16,
                overflowX: "auto",
                paddingBottom: 16,
                scrollbarWidth: "none",
              }}
              className="other-occasions-strip"
            >
              {occasions
                .filter((o) => o.slug !== occasion.slug)
                .map((o) => (
                  <Link key={o.slug} href={`/festivals/${o.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        padding: "24px 32px",
                        borderRadius: 20,
                        border: "1.5px solid rgba(232, 102, 10, 0.22)",
                        background: "linear-gradient(180deg, #FAF7F2 0%, #F4E8D8 100%)",
                        textAlign: "center",
                        minWidth: 160,
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(232, 102, 10, 0.04)",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#E8660A";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(232, 102, 10, 0.15)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(232, 102, 10, 0.22)";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(232, 102, 10, 0.04)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <p style={{ fontSize: 32, margin: "0 0 12px", userSelect: "none" }}>
                        {emojiMap[o.slug] || "🙏"}
                      </p>
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#1A0F0A",
                          margin: 0,
                        }}
                      >
                        {o.name}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .festival-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bundle-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .festival-grid {
            grid-template-columns: 1fr !important;
          }
          .countdown-clock {
            width: 100% !important;
            align-items: center !important;
          }
        }
      `}</style>
    </>
  );
}
