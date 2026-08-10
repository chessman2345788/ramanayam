"use client";

import React from "react";
import { HomepageSectionsProvider, useHomepageSections } from "@/components/admin/homepage-sections/HomepageSectionsContext";
import { PageHeader, StatCard, DataTable, StatusBadge, ActionMenu } from "@/components/admin";
import { HomepageSection } from "@/types/homepageSections";
import { Layout, ArrowUp, ArrowDown, Eye, EyeOff, Layers } from "lucide-react";

function HomepageSectionsContent() {
  const { sections, toggleVisibility, moveUp, moveDown } = useHomepageSections();
  const visibleCount = sections.filter((s) => s.isVisible).length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Homepage Layout & Section Manager"
        subtitle="Reorder, customize, and configure featured collections, festival showcases, and prashad blocks on Ramanayam home."
        icon={Layout}
        badge={`${visibleCount} Sections Live`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Live Sections" value={visibleCount} icon={Eye} iconBg="bg-emerald-50 border-emerald-200" iconColor="text-emerald-700" />
        <StatCard title="Hidden Draft Sections" value={sections.length - visibleCount} icon={EyeOff} iconBg="bg-stone-100 border-stone-200" iconColor="text-stone-600" />
        <StatCard title="Total Configured Layout Blocks" value={sections.length} icon={Layers} iconBg="bg-amber-50 border-amber-200" iconColor="text-amber-800" />
      </div>

      <DataTable<HomepageSection>
        data={sections}
        keyExtractor={(item) => item.id}
        columns={[
          {
            header: "Pos Order",
            width: "80px",
            render: (item, idx) => (
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-stone-900 w-6">#{idx + 1}</span>
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveUp(item.id)}
                    disabled={idx === 0}
                    className="p-0.5 hover:bg-stone-100 rounded disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(item.id)}
                    disabled={idx === sections.length - 1}
                    className="p-0.5 hover:bg-stone-100 rounded disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                </div>
              </div>
            ),
          },
          {
            header: "Section Title & Scope",
            render: (item) => (
              <div>
                <h4 className="font-bold text-stone-900 font-display">{item.title}</h4>
                <span className="text-[11px] text-stone-500">{item.subtitle}</span>
              </div>
            ),
          },
          {
            header: "Section Type",
            render: (item) => (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-50 text-amber-900 border border-amber-200">
                {item.type}
              </span>
            ),
          },
          {
            header: "Items Count",
            render: (item) => (
              <span className="font-bold text-stone-700">{item.itemCount} items shown</span>
            ),
          },
          {
            header: "Visibility",
            render: (item) => (
              <StatusBadge status={item.isVisible ? "PUBLISHED" : "DRAFT"} size="sm" />
            ),
          },
          {
            header: "Actions",
            align: "right",
            render: (item) => (
              <ActionMenu
                items={[
                  {
                    label: item.isVisible ? "Hide Section" : "Show Section",
                    icon: item.isVisible ? EyeOff : Eye,
                    onClick: () => toggleVisibility(item.id),
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export default function HomepageSectionsPage() {
  return (
    <HomepageSectionsProvider>
      <HomepageSectionsContent />
    </HomepageSectionsProvider>
  );
}
