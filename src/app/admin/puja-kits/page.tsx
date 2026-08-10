"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PujaKitsProvider, usePujaKits } from "@/components/admin/puja-kits/PujaKitsContext";
import { PageHeader, StatCard, DataTable, StatusBadge, FilterBar, ActionMenu, ConfirmDialog } from "@/components/admin";
import { PujaKitCombo } from "@/types/pujaKits";
import { PackageCheck, Plus, Edit3, Trash2, Layers, ShoppingBag, Percent } from "lucide-react";

function PujaKitsContent() {
  const { kits, deleteKit } = usePujaKits();
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const activeCount = kits.filter((k) => k.status === "ACTIVE").length;
  const totalStock = kits.reduce((acc, k) => acc + k.stockCount, 0);

  const filteredKits = kits.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.sanskritName.includes(search) ||
    k.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Puja Kit Combo Builder"
        subtitle="Combine individual temple items into value-added sacred puja kits with dynamic bundle pricing."
        icon={PackageCheck}
        badge={`${activeCount} Kits Available`}
        actions={
          <Link
            href="/admin/puja-kits/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Build New Puja Kit
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Puja Kits" value={activeCount} icon={PackageCheck} iconBg="bg-emerald-50 border-emerald-200" iconColor="text-emerald-700" />
        <StatCard title="Total Units Stocked" value={totalStock} icon={ShoppingBag} iconBg="bg-amber-50 border-amber-200" iconColor="text-amber-800" />
        <StatCard title="Average Bundle Savings" value="22%" icon={Percent} iconBg="bg-orange-50 border-orange-200" iconColor="text-orange-800" />
      </div>

      <FilterBar
        search={{ value: search, onChange: setSearch, placeholder: "Search puja kits by name, Sanskrit title or SKU..." }}
      />

      <DataTable<PujaKitCombo>
        data={filteredKits}
        keyExtractor={(item) => item.id}
        columns={[
          {
            header: "Puja Kit Combo",
            render: (item) => (
              <div className="flex items-center gap-3">
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-stone-200" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 font-display">{item.name}</h4>
                    <span className="text-xs text-amber-900 font-serif bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      {item.sanskritName}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500">SKU: {item.sku} • {item.category}</span>
                </div>
              </div>
            ),
          },
          {
            header: "Items Included",
            render: (item) => (
              <div className="space-y-0.5">
                <span className="font-bold text-amber-900 text-xs">{item.items.length} Bundle Items</span>
                <span className="text-[11px] text-stone-500 block truncate max-w-xs">
                  {item.items.map((i) => i.name).join(", ")}
                </span>
              </div>
            ),
          },
          {
            header: "Bundle Pricing",
            render: (item) => (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-stone-900 text-sm">₹{item.bundlePrice}</span>
                  <span className="text-xs text-stone-400 line-through">₹{item.originalPrice}</span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  SAVE {item.savingsPercentage}%
                </span>
              </div>
            ),
          },
          {
            header: "Stock",
            render: (item) => (
              <span className="font-semibold text-stone-700">{item.stockCount} in stock</span>
            ),
          },
          {
            header: "Status",
            render: (item) => <StatusBadge status={item.status} size="sm" />,
          },
          {
            header: "Actions",
            align: "right",
            render: (item) => (
              <ActionMenu
                items={[
                  {
                    label: "Delete Kit",
                    icon: Trash2,
                    isDanger: true,
                    onClick: () => setDeleteTargetId(item.id),
                  },
                ]}
              />
            ),
          },
        ]}
      />

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteKit(deleteTargetId);
        }}
        title="Delete Puja Kit"
        description="Are you sure you want to remove this puja kit combo product?"
      />
    </div>
  );
}

export default function PujaKitsPage() {
  return (
    <PujaKitsProvider>
      <PujaKitsContent />
    </PujaKitsProvider>
  );
}
