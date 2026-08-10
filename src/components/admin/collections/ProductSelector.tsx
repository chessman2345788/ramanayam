"use client";

import React, { useState } from "react";
import { Search, X, Check, Package, Filter } from "lucide-react";
import { mockSelectableProducts, CollectionProductItem } from "@/data/mockCollectionsData";

interface ProductSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductIds: string[];
  onConfirmSelection: (selectedIds: string[]) => void;
}

export function ProductSelector({
  isOpen,
  onClose,
  selectedProductIds,
  onConfirmSelection,
}: ProductSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedProductIds);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredProducts = mockSelectableProducts.filter((p) => {
    if (categoryFilter !== "ALL" && p.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
        }}
      />
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 540,
          background: "#FFFFFF",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          padding: 24,
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#171717", margin: 0 }}>Product Selector</h3>
            <p style={{ fontSize: 12, color: "#666666", margin: "2px 0 0" }}>
              Select products to assign to this collection manually.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "#FAF8F3",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999999" }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px 8px 30px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 12,
                outline: "none",
                background: "#FAF8F3",
              }}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.12)",
              fontSize: 12,
              background: "#FAF8F3",
              outline: "none",
            }}
          >
            <option value="ALL">All Categories</option>
            <option value="Brass Diyas & Lamps">Brass Diyas</option>
            <option value="Mala & Rudraksha Beads">Mala & Beads</option>
            <option value="Puja Utensils & Sets">Puja Utensils</option>
            <option value="Incense & Pure Dhoop">Incense</option>
            <option value="Temple Decor & Idols">Temple Decor</option>
          </select>
        </div>

        {/* Product Items List */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredProducts.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  borderRadius: 10,
                  border: isSelected ? "1.5px solid #F57C00" : "1px solid rgba(0,0,0,0.06)",
                  background: isSelected ? "rgba(245,124,0,0.04)" : "#FAF8F3",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // handled by parent onClick
                    style={{ accentColor: "#F57C00" }}
                  />
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 6,
                      overflow: "hidden",
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.06)",
                      flexShrink: 0,
                    }}
                  >
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#171717" }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#666666" }}>
                      SKU: {p.sku} • ₹{p.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>
            {selectedIds.length} products selected
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "#FFFFFF", fontSize: 12, cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmSelection(selectedIds);
                onClose();
              }}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#F57C00", color: "#FFFFFF", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
            >
              Assign Selected ({selectedIds.length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
