"use client";

import React, { useState } from "react";
import { Folder, Layers, Sparkles, Image as ImageIcon, Plus, Trash2, Globe } from "lucide-react";
import {
  AdminCollectionDetail,
  CollectionStatus,
  CollectionType,
  CollectionVisibility,
  AutomaticRuleCondition,
  FestivalCollectionTemplate,
} from "@/data/mockCollectionsData";
import { ProductSelector } from "./ProductSelector";
import { CollectionPreview } from "./CollectionPreview";

interface CollectionFormProps {
  initialData?: Partial<AdminCollectionDetail>;
  prefilledTemplate?: FestivalCollectionTemplate | null;
  onSubmit: (formData: Partial<AdminCollectionDetail>) => void;
}

export function CollectionForm({ initialData, prefilledTemplate, onSubmit }: CollectionFormProps) {
  const [name, setName] = useState(initialData?.name || prefilledTemplate?.templateName || "");
  const [slug, setSlug] = useState(initialData?.slug || prefilledTemplate?.slug || "");
  const [description, setDescription] = useState(initialData?.description || prefilledTemplate?.description || "");
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage || prefilledTemplate?.bannerImage || "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || prefilledTemplate?.thumbnail || "");
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");
  const [status, setStatus] = useState<CollectionStatus>(initialData?.status || "ACTIVE");
  const [type, setType] = useState<CollectionType>(initialData?.type || "MANUAL");
  const [visibility, setVisibility] = useState<CollectionVisibility>(initialData?.visibility || "PUBLIC");
  
  const [assignedProductIds, setAssignedProductIds] = useState<string[]>(
    initialData?.assignedProductIds || ["prod_01", "prod_02"]
  );

  const [rules, setRules] = useState<AutomaticRuleCondition[]>(
    initialData?.automaticRules || [
      { id: "r1", field: "category", operator: "equals", value: prefilledTemplate?.recommendedCategory || "Brass Diyas & Lamps" },
    ]
  );

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleAddRule = () => {
    setRules([...rules, { id: `r_${Date.now()}`, field: "category", operator: "equals", value: "" }]);
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      slug,
      description,
      bannerImage,
      thumbnail,
      seoTitle,
      seoDescription,
      status,
      type,
      visibility,
      assignedProductIds,
      automaticRules: rules,
      productsCount: assignedProductIds.length,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* General Information Section */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 10 }}>
          <Folder size={16} style={{ color: "#F57C00" }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>1. Collection Details</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Collection Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
              }}
              placeholder="e.g. Diwali Mahotsav Deepawali Special"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Collection Slug (URL Path) *</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="diwali-mahotsav-collection"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, fontFamily: "var(--font-jetbrains, monospace)", background: "#FAF8F3", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Curated collection description for devotees..."
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CollectionStatus)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            >
              <option value="ACTIVE">Active</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as CollectionVisibility)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
            >
              <option value="PUBLIC">Public Storefront</option>
              <option value="FESTIVAL">Festival Landing Page</option>
              <option value="HIDDEN">Hidden / Private</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collection Type (Manual vs Automatic Smart Rules) */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          padding: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 10 }}>
          <Layers size={16} style={{ color: "#701A75" }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#171717", margin: 0 }}>2. Collection Type & Conditions</h3>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          <button
            type="button"
            onClick={() => setType("MANUAL")}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 10,
              border: type === "MANUAL" ? "2px solid #F57C00" : "1px solid rgba(0,0,0,0.1)",
              background: type === "MANUAL" ? "rgba(245,124,0,0.05)" : "#FAF8F3",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "#171717", display: "flex", alignItems: "center", gap: 6 }}>
              <Layers size={16} style={{ color: "#F57C00" }} /> Manual Collection
            </div>
            <div style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>
              Select specific products individually to build a curated list.
            </div>
          </button>

          <button
            type="button"
            onClick={() => setType("AUTOMATIC")}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 10,
              border: type === "AUTOMATIC" ? "2px solid #701A75" : "1px solid rgba(0,0,0,0.1)",
              background: type === "AUTOMATIC" ? "rgba(112,26,117,0.05)" : "#FAF8F3",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "#171717", display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={16} style={{ color: "#701A75" }} /> Automatic Smart Collection
            </div>
            <div style={{ fontSize: 11, color: "#666666", marginTop: 4 }}>
              Automatically include products matching condition rules.
            </div>
          </button>
        </div>

        {type === "MANUAL" ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAF8F3", padding: 14, borderRadius: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>
                {assignedProductIds.length} Products Assigned
              </div>
              <div style={{ fontSize: 11, color: "#666666" }}>Manual product selection active</div>
            </div>
            <button
              type="button"
              onClick={() => setIsSelectorOpen(true)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                background: "#F57C00",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Browse & Select Products
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>Automatic Condition Rules</div>
            {rules.map((rule) => (
              <div key={rule.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <select
                  value={rule.field}
                  onChange={(e) =>
                    setRules(rules.map((r) => (r.id === rule.id ? { ...r, field: e.target.value as any } : r)))
                  }
                  style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
                >
                  <option value="category">Category</option>
                  <option value="festival">Festival</option>
                  <option value="brand">Brand</option>
                  <option value="featured">Featured Product</option>
                  <option value="bestseller">Best Seller</option>
                </select>

                <select
                  value={rule.operator}
                  onChange={(e) =>
                    setRules(rules.map((r) => (r.id === rule.id ? { ...r, operator: e.target.value as any } : r)))
                  }
                  style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
                >
                  <option value="equals">equals</option>
                  <option value="contains">contains</option>
                </select>

                <input
                  type="text"
                  value={rule.value}
                  onChange={(e) =>
                    setRules(rules.map((r) => (r.id === rule.id ? { ...r, value: e.target.value } : r)))
                  }
                  placeholder="Rule value..."
                  style={{ flex: 1.5, padding: "8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12 }}
                />

                <button
                  type="button"
                  onClick={() => handleRemoveRule(rule.id)}
                  style={{ border: "none", background: "transparent", color: "#DC2626", cursor: "pointer" }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddRule}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 600,
                color: "#F57C00",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <Plus size={14} /> Add Another Condition Rule
            </button>
          </div>
        )}
      </div>

      {/* Live Preview Component */}
      <CollectionPreview assignedProductIds={assignedProductIds} bannerImage={bannerImage} collectionName={name} />

      {/* Submit Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            borderRadius: 10,
            border: "none",
            background: "#F57C00",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(245,124,0,0.25)",
          }}
        >
          Save Collection
        </button>
      </div>

      {/* Product Selector Drawer */}
      <ProductSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        selectedProductIds={assignedProductIds}
        onConfirmSelection={setAssignedProductIds}
      />
    </form>
  );
}
