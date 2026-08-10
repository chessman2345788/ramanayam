"use client";

import React, { useState } from "react";
import { BannersProvider, useBanners } from "@/components/admin/banners/BannersContext";
import { BannerModal } from "@/components/admin/banners/BannerModal";
import { PageHeader, StatCard, DataTable, StatusBadge, FilterBar, ActionMenu, ConfirmDialog } from "@/components/admin";
import { StorefrontBanner } from "@/types/banners";
import { Image, Plus, Edit3, Trash2, Eye, MousePointerClick, Layout } from "lucide-react";

function BannersContent() {
  const { banners, deleteBanner, toggleStatus } = useBanners();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<StorefrontBanner | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const activeCount = banners.filter((b) => b.status === "ACTIVE").length;
  const totalClicks = banners.reduce((acc, b) => acc + b.clickCount, 0);

  const filteredBanners = banners.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === "all" || b.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Storefront Banner Manager"
        subtitle="Manage home hero banners, announcement strips, and category headers across Ramanayam storefront."
        icon={Image}
        badge={`${activeCount} Active Banners`}
        actions={
          <button
            type="button"
            onClick={() => {
              setEditingBanner(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Storefront Banner
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Banners" value={activeCount} icon={Eye} iconBg="bg-emerald-50 border-emerald-200" iconColor="text-emerald-700" />
        <StatCard title="Total Banner Clicks" value={totalClicks.toLocaleString()} icon={MousePointerClick} iconBg="bg-amber-50 border-amber-200" iconColor="text-amber-800" />
        <StatCard title="Total Configured Banners" value={banners.length} icon={Layout} iconBg="bg-sky-50 border-sky-200" iconColor="text-sky-700" />
      </div>

      <FilterBar
        search={{ value: search, onChange: setSearch, placeholder: "Search banners by title or subtitle..." }}
        filters={[
          {
            id: "location",
            label: "Location",
            value: locationFilter,
            onChange: setLocationFilter,
            options: [
              { label: "All Locations", value: "all" },
              { label: "Home Hero", value: "HOME_HERO" },
              { label: "Announcement Strip", value: "ANNOUNCEMENT_STRIP" },
              { label: "Category Header", value: "CATEGORY_HEADER" },
              { label: "Festival Popup", value: "FESTIVAL_POPUP" },
            ],
          },
        ]}
      />

      <DataTable<StorefrontBanner>
        data={filteredBanners}
        keyExtractor={(item) => item.id}
        columns={[
          {
            header: "Banner Preview",
            render: (item) => (
              <div className="flex items-center gap-3">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-10 rounded-lg object-cover border border-stone-200" />
                ) : (
                  <div className="w-16 h-10 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-900 text-[10px] font-bold">
                    Text Strip
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-stone-900 font-display">{item.title}</h4>
                  <span className="text-[11px] text-stone-500 line-clamp-1">{item.subtitle}</span>
                </div>
              </div>
            ),
          },
          {
            header: "Location & Order",
            render: (item) => (
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-stone-100 text-stone-700 border border-stone-200">
                  {item.location}
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5">Pos: #{item.position}</span>
              </div>
            ),
          },
          {
            header: "CTA Link",
            render: (item) => (
              <div>
                <span className="font-semibold text-amber-900">{item.ctaText}</span>
                <span className="text-[11px] text-stone-400 block">{item.ctaLink}</span>
              </div>
            ),
          },
          {
            header: "Clicks",
            render: (item) => (
              <span className="font-bold text-stone-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {item.clickCount} clicks
              </span>
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
                    label: "Edit Banner",
                    icon: Edit3,
                    onClick: () => {
                      setEditingBanner(item);
                      setIsModalOpen(true);
                    },
                  },
                  {
                    label: item.status === "ACTIVE" ? "Deactivate Banner" : "Activate Banner",
                    icon: Eye,
                    onClick: () => toggleStatus(item.id),
                  },
                  {
                    label: "Delete Banner",
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

      <BannerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bannerToEdit={editingBanner} />

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteBanner(deleteTargetId);
        }}
        title="Delete Banner"
        description="Are you sure you want to remove this banner from storefront display?"
      />
    </div>
  );
}

export default function BannersPage() {
  return (
    <BannersProvider>
      <BannersContent />
    </BannersProvider>
  );
}
