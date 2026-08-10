"use client";

import React, { useState } from "react";
import { Monitor, Tablet, Smartphone, Search, ShoppingBag, Heart, Flame } from "lucide-react";
import { CmsStorefrontState } from "@/data/mockCmsData";

interface LivePreviewProps {
  state: CmsStorefrontState;
}

export function LivePreview({ state }: LivePreviewProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const getViewportWidth = () => {
    switch (viewport) {
      case "tablet":
        return 768;
      case "mobile":
        return 375;
      default:
        return "100%";
    }
  };

  const firstSlide = state.heroSlides[0] || {
    bannerUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=1200&auto=format&fit=crop&q=80",
    title: "Sacred Temple Living",
    subtitle: "Pure handcrafted brass diyas & rudraksha mala",
    buttonText: "Shop Collection",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
        minHeight: 600,
      }}
    >
      {/* Device Viewport Bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.06)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#171717" }}>Storefront Live Preview</span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: "none",
              background: viewport === "desktop" ? "rgba(245,124,0,0.1)" : "transparent",
              color: viewport === "desktop" ? "#F57C00" : "#666666",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <Monitor size={14} /> Desktop
          </button>

          <button
            type="button"
            onClick={() => setViewport("tablet")}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: "none",
              background: viewport === "tablet" ? "rgba(245,124,0,0.1)" : "transparent",
              color: viewport === "tablet" ? "#F57C00" : "#666666",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <Tablet size={14} /> Tablet (768px)
          </button>

          <button
            type="button"
            onClick={() => setViewport("mobile")}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: "none",
              background: viewport === "mobile" ? "rgba(245,124,0,0.1)" : "transparent",
              color: viewport === "mobile" ? "#F57C00" : "#666666",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <Smartphone size={14} /> Mobile (375px)
          </button>
        </div>
      </div>

      {/* Simulated Device Browser Frame */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#E5E7EB",
          borderRadius: 16,
          padding: viewport === "desktop" ? 0 : 20,
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            background: "#FFFFFF",
            borderRadius: viewport === "desktop" ? 12 : 24,
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            overflow: "hidden",
            transition: "width 0.3s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Announcement Bar */}
          {state.announcement.enabled && (
            <div
              style={{
                background: state.announcement.bgColor,
                color: state.announcement.textColor,
                padding: "6px 12px",
                fontSize: 11,
                fontWeight: 600,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span>{state.announcement.message}</span>
              {state.announcement.buttonText && (
                <span style={{ textDecoration: "underline", fontWeight: 700 }}>
                  {state.announcement.buttonText} →
                </span>
              )}
            </div>
          )}

          {/* Navigation Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              background: "#FFFFFF",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 15, color: "#701A75", fontFamily: "var(--font-display)" }}>
              RAMANAYAM
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "#171717", fontWeight: 600 }}>
              {state.header.navigationMenu.slice(0, 4).map((n) => (
                <span key={n.id}>{n.label}</span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#171717" }}>
              {state.header.searchToggle && <Search size={15} />}
              {state.header.wishlistToggle && <Heart size={15} />}
              {state.header.cartToggle && <ShoppingBag size={15} style={{ color: "#F57C00" }} />}
            </div>
          </div>

          {/* Hero Section Banner */}
          <div
            style={{
              height: viewport === "mobile" ? 180 : 260,
              position: "relative",
              background: "#FAF8F3",
              overflow: "hidden",
            }}
          >
            <img src={firstSlide.bannerUrl} alt="Hero Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `rgba(0,0,0,${firstSlide.overlayOpacity || 0.4})`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 20,
                color: "#FFFFFF",
              }}
            >
              <span style={{ fontSize: viewport === "mobile" ? 16 : 24, fontWeight: 800, fontFamily: "var(--font-display)" }}>
                {firstSlide.title}
              </span>
              <p style={{ fontSize: 12, opacity: 0.9, marginTop: 4, maxWidth: 380 }}>{firstSlide.subtitle}</p>
              <button
                type="button"
                style={{
                  width: "fit-content",
                  marginTop: 12,
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "none",
                  background: "#F57C00",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {firstSlide.buttonText}
              </button>
            </div>
          </div>

          {/* Festival Bar */}
          <div style={{ padding: 16, background: "rgba(245,124,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Flame size={16} style={{ color: "#F57C00" }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>{state.festivalSection.title}</div>
                <div style={{ fontSize: 11, color: "#666666" }}>{state.festivalSection.subtitle}</div>
              </div>
            </div>
            <button type="button" style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#701A75", color: "#FFFFFF", fontSize: 11, fontWeight: 700 }}>
              {state.festivalSection.buttonText}
            </button>
          </div>

          {/* Footer Preview */}
          <div style={{ background: "#171717", color: "#FFFFFF", padding: 16, fontSize: 11, display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
            <div style={{ fontWeight: 700, color: "#F57C00" }}>{state.footer.companyName}</div>
            <div style={{ color: "#999999" }}>{state.footer.address}</div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 8, color: "#666666" }}>
              {state.footer.copyrightText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
