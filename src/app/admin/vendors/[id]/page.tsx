"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Ban,
  Power,
  Edit,
  Loader2,
} from "lucide-react";
import {
  VendorProfile,
  VendorStats,
  VendorProductsTable,
  VendorOrdersTable,
  VendorSalesChart,
  VendorStatusBadge,
  ConfirmDialog,
  ConfirmActionType,
} from "@/components/admin/vendors";
import { AdminVendorDetail, VendorStatus, VendorProductItem } from "@/data/mockVendorsData";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminVendorDetailPage({ params }: PageProps) {
  const { id } = React.use(params);

  const [vendor, setVendor] = useState<AdminVendorDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    actionType: ConfirmActionType | null;
  }>({
    isOpen: false,
    actionType: null,
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadVendorDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [v, productsRes] = await Promise.all([
        AdminService.fetchVendorByIdFromApi(id),
        AdminService.fetchVendorProductsFromApi(id, { limit: 50 }).catch(() => ({ data: [] })),
      ]);

      if (v) {
        const rawProducts = productsRes.data || productsRes.items || [];
        const formattedProducts: VendorProductItem[] = rawProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          sku: p.variants?.[0]?.sku || "N/A",
          category: "Catalog Item",
          price: p.variants?.[0]?.price ? Number(p.variants[0].price) : 0,
          stock: 50,
          salesCount: 0,
          status: p.status === "ACTIVE" ? "IN_STOCK" : "OUT_OF_STOCK",
        }));

        const formatted: AdminVendorDetail = {
          id: v.id,
          name: v.ownerName || v.businessName,
          businessName: v.businessName,
          businessType: "Artisan / Flagship Seller",
          email: v.email || "",
          phone: v.phone || "",
          logo: v.logo || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&auto=format&fit=crop&q=80",
          status: (v.status || "PENDING") as VendorStatus,
          joinedDate: new Date(v.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          isPrimary: false,

          gstNumber: v.gstNumber || "N/A",
          pan: v.panNumber || "N/A",
          businessAddress: "Varanasi, UP",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221001",

          productsCount: v._count?.products || formattedProducts.length,
          activeProductsCount: formattedProducts.length,
          ordersCount: 0,
          totalRevenue: 0,
          avgOrderValue: 0,
          customerRating: 5.0,

          products: formattedProducts,
          orders: [],
          salesHistory: [],
        };

        setVendor(formatted);
      } else {
        setVendor(null);
      }
    } catch (err: any) {
      console.error("Failed to load vendor details:", err);
      showToast("Error loading vendor details from database.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadVendorDetail();
  }, [loadVendorDetail]);

  const handleTriggerAction = (actionType: ConfirmActionType) => {
    setConfirmDialog({ isOpen: true, actionType });
  };

  const handleConfirmAction = async () => {
    if (!confirmDialog.actionType || !vendor) return;

    let newStatus: VendorStatus = vendor.status;
    if (confirmDialog.actionType === "APPROVE") newStatus = "ACTIVE";
    if (confirmDialog.actionType === "SUSPEND") newStatus = "SUSPENDED";
    if (confirmDialog.actionType === "ACTIVATE") newStatus = "ACTIVE";

    try {
      await AdminService.updateVendorStatusInApi(vendor.id, newStatus);
      showToast(`Seller status for "${vendor.businessName}" updated to ${newStatus}.`);
      setConfirmDialog({ isOpen: false, actionType: null });
      await loadVendorDetail();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to update seller status.";
      showToast(`Error: ${errMsg}`);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
        <p className="text-sm font-semibold text-stone-700">Loading seller profile from database...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-lg font-bold text-stone-800">Seller Not Found</h2>
        <p className="text-xs text-stone-500">The requested vendor ID does not exist in the database.</p>
        <Link
          href="/admin/vendors"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Vendors List</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/vendors"
            className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900 font-display">
                {vendor.businessName}
              </h1>
              <VendorStatusBadge status={vendor.status} />
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Seller Profile & Analytics Overview • Vendor ID: <span className="font-mono">{vendor.id}</span>
            </p>
          </div>
        </div>

        {/* Quick Vendor Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {vendor.status === "PENDING" && (
            <button
              type="button"
              onClick={() => handleTriggerAction("APPROVE")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve Seller</span>
            </button>
          )}

          {vendor.status === "ACTIVE" && !vendor.isPrimary && (
            <button
              type="button"
              onClick={() => handleTriggerAction("SUSPEND")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Suspend Seller</span>
            </button>
          )}

          {(vendor.status === "SUSPENDED" || vendor.status === "INACTIVE") && (
            <button
              type="button"
              onClick={() => handleTriggerAction("ACTIVATE")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Activate Seller</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => showToast("Edit Seller profile action triggered.")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5 text-stone-500" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Vendor Profile Header & Business Info */}
      <VendorProfile vendor={vendor} />

      {/* Vendor Key Statistics */}
      <VendorStats vendor={vendor} />

      {/* Monthly Sales Performance Chart */}
      <VendorSalesChart salesHistory={vendor.salesHistory} />

      {/* Products Catalog Table */}
      <div id="products">
        <VendorProductsTable products={vendor.products} />
      </div>

      {/* Orders History Table */}
      <div id="orders">
        <VendorOrdersTable orders={vendor.orders} />
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        actionType={confirmDialog.actionType}
        vendorName={vendor.businessName}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, actionType: null })}
      />
    </div>
  );
}
