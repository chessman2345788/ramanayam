"use client";

import React from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { FaqItem } from "@/data/mockCmsData";

interface FaqAccordionEditorProps {
  faqs: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
}

export function FaqAccordionEditor({ faqs, onChange }: FaqAccordionEditorProps) {
  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: `faq_${Date.now()}`,
      question: "New Frequently Asked Question?",
      answer: "Detailed answer for store devotees...",
      category: "General",
    };
    onChange([...faqs, newFaq]);
  };

  const handleUpdateFaq = (id: string, updatedFields: Partial<FaqItem>) => {
    onChange(faqs.map((f) => (f.id === id ? { ...f, ...updatedFields } : f)));
  };

  const handleRemoveFaq = (id: string) => {
    onChange(faqs.filter((f) => f.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>FAQ Question & Answer Items ({faqs.length})</div>
        <button
          type="button"
          onClick={handleAddFaq}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "5px 10px",
            borderRadius: 6,
            border: "none",
            background: "#F57C00",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={13} /> Add FAQ Item
        </button>
      </div>

      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          style={{
            background: "#FAF8F3",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#701A75" }}>FAQ #{index + 1}</span>
            <button
              type="button"
              onClick={() => handleRemoveFaq(faq.id)}
              style={{ border: "none", background: "transparent", color: "#DC2626", cursor: "pointer" }}
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#666666" }}>Question Title</label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => handleUpdateFaq(faq.id, { question: e.target.value })}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12, outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#666666" }}>Answer Text</label>
            <textarea
              rows={2}
              value={faq.answer}
              onChange={(e) => handleUpdateFaq(faq.id, { answer: e.target.value })}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.12)", fontSize: 12, outline: "none" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
