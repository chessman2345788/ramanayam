"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles, Flame } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CollectionForm } from "@/components/admin/collections/CollectionForm";
import { mockFestivalCollectionTemplates, FestivalCollectionTemplate, AdminCollectionDetail } from "@/data/mockCollectionsData";

export default function CreateCollectionPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<FestivalCollectionTemplate | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSelectTemplate = (tmpl: FestivalCollectionTemplate) => {
    setSelectedTemplate(tmpl);
    showToast(`Loaded prefilled rules for ${tmpl.templateName}`);
  };

  const handleFormSubmit = (formData: Partial<AdminCollectionDetail>) => {
    showToast(`Successfully created collection "${formData.name}"!`);
    setTimeout(() => {
      router.push("/admin/collections");
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#171717",
            color: "#FFFFFF",
            padding: "12px 18px",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 100,
          }}
        >
          <CheckCircle2 size={16} style={{ color: "#F57C00" }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Navigation & Header */}
      <div>
        <Link
          href="/admin/collections"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#666666",
            textDecoration: "none",
            marginBottom: 12,
          }}
        >
          <ArrowLeft size={14} /> Back to Collections Overview
        </Link>

        <AdminPageHeader
          title="Create New Collection"
          subtitle="Organize store items manually or configure automatic smart collection rules."
        />
      </div>

      {/* Festival Collection Templates Bar */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #FAF8F3 100%)",
          borderRadius: 16,
          border: "1px solid rgba(245,124,0,0.2)",
          padding: 20,
          boxShadow: "0 4px 16px rgba(245,124,0,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #F57C00 0%, #701A75 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
            }}
          >
            <Flame size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "#171717", margin: 0 }}>
              Curated Festival & Category Templates
            </h4>
            <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
              Click any template to prefill collection details, banners, and automatic rules.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 10,
          }}
        >
          {mockFestivalCollectionTemplates.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handleSelectTemplate(tmpl)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: 12,
                borderRadius: 10,
                border: `1px solid ${tmpl.color}30`,
                background: "#FFFFFF",
                cursor: "pointer",
                textAlign: "left",
                gap: 8,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tmpl.color;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${tmpl.color}30`;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: tmpl.color, display: "flex", alignItems: "center", gap: 4 }}>
                <Sparkles size={12} /> {tmpl.templateName}
              </span>
              <span style={{ fontSize: 11, color: "#666666", lineHeight: 1.3 }}>{tmpl.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Collection Form Builder */}
      <CollectionForm prefilledTemplate={selectedTemplate} onSubmit={handleFormSubmit} />
    </div>
  );
}
