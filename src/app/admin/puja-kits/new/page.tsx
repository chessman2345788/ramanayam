"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, PackageCheck } from "lucide-react";
import { PujaKitsProvider, usePujaKits } from "@/components/admin/puja-kits/PujaKitsContext";
import { PageHeader, FormSection } from "@/components/admin";
import { PujaKitItem } from "@/types/pujaKits";

function CreatePujaKitContent() {
  const router = useRouter();
  const { addKit } = usePujaKits();

  const [name, setName] = useState("");
  const [sanskritName, setSanskritName] = useState("");
  const [category, setCategory] = useState("Diwali Special");
  const [sku, setSku] = useState("KIT-PUJA-09");
  const [description, setDescription] = useState("");
  const [bundlePrice, setBundlePrice] = useState(1499);
  const [stockCount, setStockCount] = useState(50);

  const [items, setItems] = useState<PujaKitItem[]>([
    { id: "1", name: "Handmade Pure Brass Oil Diya", unitPrice: 499, quantity: 2, imageUrl: "" },
    { id: "2", name: "Organic Bhimseni Camphor (100g)", unitPrice: 250, quantity: 1, imageUrl: "" },
  ]);

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "New Temple Item", unitPrice: 200, quantity: 1, imageUrl: "" },
    ]);
  };

  const updateItemRow = (id: string, key: keyof PujaKitItem, value: any) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const removeItemRow = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const originalPrice = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const savingsPercentage = originalPrice > 0 ? Math.round(((originalPrice - bundlePrice) / originalPrice) * 100) : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addKit({
      name,
      sanskritName,
      sku,
      category,
      description,
      items,
      originalPrice,
      bundlePrice: Number(bundlePrice),
      savingsPercentage,
      stockCount: Number(stockCount),
      status: "ACTIVE",
      imageUrl: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=600&auto=format&fit=crop&q=80",
    });

    router.push("/admin/puja-kits");
  };

  return (
    <form onSubmit={handleSave} className="p-6 space-y-6 max-w-5xl mx-auto pb-24">
      <PageHeader
        title="Build Sacred Puja Kit Combo"
        subtitle="Combine multiple store items into a consecrated puja kit package."
        icon={PackageCheck}
        breadcrumbs={[{ label: "Puja Kits", href: "/admin/puja-kits" }, { label: "New Kit" }]}
      />

      <FormSection title="Kit General Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Kit Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mahashivratri Abhishekam Kit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Sanskrit Title</label>
            <input
              type="text"
              placeholder="e.g. महाशिवरात्रि अभिषेक किट"
              value={sanskritName}
              onChange={(e) => setSanskritName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 font-serif"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Initial Stock</label>
            <input
              type="number"
              value={stockCount}
              onChange={(e) => setStockCount(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600"
            />
          </div>
        </div>
      </FormSection>

      {/* Dynamic Item Picker Section */}
      <FormSection
        title="Kit Included Items Breakdown"
        description="Add items included in this combo kit to calculate bundle savings."
        actions={
          <button
            type="button"
            onClick={addItemRow}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md"
          >
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        }
      >
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50/50">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItemRow(item.id, "name", e.target.value)}
                placeholder="Item name"
                className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-md bg-white"
              />
              <div className="w-24">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItemRow(item.id, "quantity", Number(e.target.value))}
                  placeholder="Qty"
                  className="w-full px-2 py-1.5 text-xs border border-stone-300 rounded-md bg-white text-center"
                />
              </div>
              <div className="w-28">
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItemRow(item.id, "unitPrice", Number(e.target.value))}
                  placeholder="Unit Price ₹"
                  className="w-full px-2 py-1.5 text-xs border border-stone-300 rounded-md bg-white text-right"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItemRow(item.id)}
                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-stone-500 font-medium">Individual Total Value: <strong className="text-stone-900">₹{originalPrice}</strong></span>
            <div className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block ml-3">
              Devotee Savings: {savingsPercentage}% OFF
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-stone-700 uppercase">Bundle Special Price ₹:</label>
            <input
              type="number"
              value={bundlePrice}
              onChange={(e) => setBundlePrice(Number(e.target.value))}
              className="w-32 px-3 py-1.5 text-sm font-bold border border-amber-500 rounded-lg outline-none bg-white text-amber-900"
            />
          </div>
        </div>
      </FormSection>

      {/* Sticky Bottom Save Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md border-t border-stone-200 px-6 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">Creating new sacred puja kit combo product</span>
          <div className="flex items-center gap-3">
            <Link href="/admin/puja-kits" className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg">
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-lg shadow-md"
            >
              <Save className="w-4 h-4" /> Save Puja Kit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function CreatePujaKitPage() {
  return (
    <PujaKitsProvider>
      <CreatePujaKitContent />
    </PujaKitsProvider>
  );
}
