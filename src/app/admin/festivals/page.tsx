"use client";

import React, { useState } from "react";
import { FestivalsProvider, useFestivals } from "@/components/admin/festivals/FestivalsContext";
import { FestivalModal } from "@/components/admin/festivals/FestivalModal";
import { PageHeader, StatCard, DataTable, StatusBadge, FilterBar, ActionMenu, ConfirmDialog } from "@/components/admin";
import { FestivalCampaign } from "@/types/festivals";
import { Sparkles, Calendar, Plus, Edit3, Trash2, Tag, TrendingUp } from "lucide-react";

function FestivalsContent() {
  const { festivals, deleteFestival, toggleStatus } = useFestivals();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFestival, setEditingFestival] = useState<FestivalCampaign | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const activeCount = festivals.filter((f) => f.status === "ACTIVE").length;
  const scheduledCount = festivals.filter((f) => f.status === "SCHEDULED").length;
  const totalRevenue = "₹14,45,000";

  const filteredFestivals = festivals.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.sanskritName.includes(search) ||
      f.featuredCategory.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || f.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Festival Campaign Manager"
        subtitle="Schedule and manage sacred festival campaigns, discount promotions, and featured temple items."
        icon={Sparkles}
        badge={`${activeCount} Active Now`}
        actions={
          <button
            type="button"
            onClick={() => {
              setEditingFestival(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            New Festival Campaign
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Campaigns" value={activeCount} icon={Sparkles} iconBg="bg-emerald-50 border-emerald-200" iconColor="text-emerald-700" />
        <StatCard title="Upcoming Scheduled" value={scheduledCount} icon={Calendar} iconBg="bg-amber-50 border-amber-200" iconColor="text-amber-800" />
        <StatCard title="Total Festival Sales" value={totalRevenue} icon={TrendingUp} iconBg="bg-orange-50 border-orange-200" iconColor="text-orange-800" />
        <StatCard title="Total Campaigns" value={festivals.length} icon={Tag} iconBg="bg-sky-50 border-sky-200" iconColor="text-sky-700" />
      </div>

      <FilterBar
        search={{ value: search, onChange: setSearch, placeholder: "Search festival campaigns..." }}
        filters={[
          {
            id: "status",
            label: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Statuses", value: "all" },
              { label: "Active", value: "active" },
              { label: "Scheduled", value: "scheduled" },
              { label: "Completed", value: "completed" },
            ],
          },
        ]}
      />

      <DataTable<FestivalCampaign>
        data={filteredFestivals}
        keyExtractor={(item) => item.id}
        columns={[
          {
            header: "Festival Campaign",
            render: (item) => (
              <div className="flex items-center gap-3">
                <img src={item.bannerImage} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-stone-200" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 font-display">{item.name}</span>
                    <span className="text-xs text-amber-900 font-serif bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      {item.sanskritName}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500">{item.featuredCategory}</span>
                </div>
              </div>
            ),
          },
          {
            header: "Campaign Window",
            render: (item) => (
              <div className="text-xs text-stone-600 font-medium">
                {item.startDate} to {item.endDate}
              </div>
            ),
          },
          {
            header: "Discount",
            render: (item) => (
              <span className="font-extrabold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200">
                {item.discountPercentage}% OFF
              </span>
            ),
          },
          {
            header: "Sales & Orders",
            render: (item) => (
              <div>
                <span className="font-bold text-stone-900">{item.salesGenerated}</span>
                <span className="text-[11px] text-stone-400 block">{item.ordersCount} orders</span>
              </div>
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
                    label: "Edit Campaign",
                    icon: Edit3,
                    onClick: () => {
                      setEditingFestival(item);
                      setIsModalOpen(true);
                    },
                  },
                  {
                    label: item.status === "ACTIVE" ? "Mark Completed" : "Activate Campaign",
                    icon: Sparkles,
                    onClick: () => toggleStatus(item.id),
                  },
                  {
                    label: "Delete Campaign",
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

      <FestivalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} festivalToEdit={editingFestival} />

      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteFestival(deleteTargetId);
        }}
        title="Delete Festival Campaign"
        description="Are you sure you want to delete this festival campaign? Promotional discounts linked to this festival will be unlinked."
      />
    </div>
  );
}

export default function FestivalsPage() {
  return (
    <FestivalsProvider>
      <FestivalsContent />
    </FestivalsProvider>
  );
}
