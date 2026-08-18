"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Customer } from "@/types/customers";
import { CustomerProfileCard } from "@/components/admin/customers/CustomerProfileCard";
import { AddressesCard } from "@/components/admin/customers/AddressesCard";
import { OrderHistoryTable } from "@/components/admin/customers/OrderHistoryTable";
import { WishlistCard } from "@/components/admin/customers/WishlistCard";
import { ReviewsCard } from "@/components/admin/customers/ReviewsCard";
import { CustomerTimeline } from "@/components/admin/customers/CustomerTimeline";
import { EditCustomerModal } from "@/components/admin/customers/EditCustomerModal";
import { AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";
import Link from "next/link";
import { ArrowLeft, Tag, Eye, ChevronRight, MessageSquare, Loader2 } from "lucide-react";

export default function CustomerProfilePage() {
  const params = useParams();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadCustomerProfile = async () => {
    if (!customerId) return;
    setIsLoading(true);
    try {
      const raw = await AdminService.fetchUserByIdFromApi(customerId);
      if (raw) {
        const userName = `${raw.firstName || ""} ${raw.lastName || ""}`.trim() || raw.email;

        let status: Customer["status"] = "Active";
        switch (raw.accountStatus) {
          case "BLOCKED":
            status = "Blocked";
            break;
          case "INACTIVE":
            status = "Blocked";
            break;
          case "PENDING":
            status = "Guest";
            break;
          default:
            status = "Active";
        }

        // Map addresses from backend Address model
        const addresses = Array.isArray(raw.addresses)
          ? raw.addresses.map((a: any) => ({
              id: a.id,
              type: a.type === "WORK" ? "Billing" : "Shipping",
              isDefault: a.isDefault || false,
              name: a.fullName || userName,
              phone: a.phone || "",
              street: [a.addressLine1, a.addressLine2].filter(Boolean).join(", "),
              city: a.city || "",
              state: a.state || "",
              pincode: a.postalCode || "",
              country: a.country || "India",
            }))
          : [];

        // Map orders from backend
        const recentOrders = Array.isArray(raw.orders)
          ? raw.orders.map((o: any) => {
              let orderStatus = "Pending";
              switch (o.status) {
                case "CONFIRMED":
                  orderStatus = "Confirmed";
                  break;
                case "PROCESSING":
                  orderStatus = "Packed";
                  break;
                case "SHIPPED":
                  orderStatus = "Shipped";
                  break;
                case "DELIVERED":
                  orderStatus = "Delivered";
                  break;
                case "CANCELLED":
                  orderStatus = "Cancelled";
                  break;
                case "RETURNED":
                  orderStatus = "Returned";
                  break;
                default:
                  orderStatus = "Pending";
              }
              return {
                id: o.id,
                date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
                amount: Number(o.totalAmount || 0),
                itemsCount: 0,
                paymentStatus: "Paid" as const,
                orderStatus: orderStatus as any,
              };
            })
          : [];

        // Calculate totalSpent from available orders (not all orders, just what's returned)
        const totalSpent = recentOrders.reduce((sum: number, o: any) => sum + o.amount, 0);
        const ordersCount = raw._count?.orders || recentOrders.length;
        const avgOrderValue = ordersCount > 0 ? totalSpent / ordersCount : 0;

        const formatted: Customer = {
          id: raw.id,
          name: userName,
          email: raw.email,
          phone: raw.phone || "",
          avatar: raw.profileImage || undefined,
          status,
          isVerified: raw.emailVerified ?? false,
          isGuest: false,
          customerType: "Retail",
          ordersCount,
          totalSpent,
          avgOrderValue,
          joinedDate: new Date(raw.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          lastOrderDate: recentOrders.length > 0 ? recentOrders[0].date : undefined,
          addresses,
          recentOrders,
          wishlist: [], // No wishlist model in backend
          reviews: [], // Only _count.reviews available; full list requires separate API call
          couponsUsed: [], // No user-coupon relation in backend
          recentlyViewed: [], // No tracking model in backend
          timeline: [
            {
              id: "t-1",
              title: "Account Created",
              type: "account_created",
              date: new Date(raw.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
              time: new Date(raw.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
              actor: userName,
              details: `Registered via email: ${raw.email}`,
            },
          ],
          notes: undefined,
        };

        setCustomer(formatted);
      }
    } catch (err: any) {
      console.error("Failed to load customer profile:", err);
      showToast("Customer not found or backend API error.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerProfile();
  }, [customerId]);

  const handleSaveCustomer = async (updated: Partial<Customer>) => {
    if (!customer) return;
    try {
      const apiData: Record<string, any> = {};
      if (updated.name) {
        const parts = updated.name.split(" ");
        apiData.firstName = parts[0] || "";
        apiData.lastName = parts.slice(1).join(" ") || "";
      }

      await AdminService.updateUserFromApi(customer.id, apiData);
      showToast(`Customer ${customer.name} updated successfully.`);
      setIsEditOpen(false);
      await loadCustomerProfile();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Update failed.";
      showToast(`Update Error: ${errMsg}`);
    }
  };

  const handleBlockToggle = async () => {
    if (!customer) return;
    const nextStatus = customer.status === "Blocked" ? "ACTIVE" : "BLOCKED";
    const action = nextStatus === "BLOCKED" ? "block" : "unblock";

    if (nextStatus === "BLOCKED" && !confirm(`Are you sure you want to block ${customer.name}? They will be unable to log in or place orders.`)) {
      return;
    }

    try {
      await AdminService.updateUserStatusFromApi(customer.id, nextStatus, `Admin ${action} action from customer profile`);
      showToast(`Customer ${customer.name} has been ${action}ed.`);
      await loadCustomerProfile();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Status update failed.";
      showToast(`Error: ${errMsg}`);
    }
  };

  if (isLoading || !customer) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
        <p className="text-sm font-semibold text-stone-700">Loading customer profile from database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-16">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/admin/customers" className="hover:text-[#F57C00] flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Customers</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-900">{customer.name}</span>
      </div>

      {/* Main Profile Card */}
      <CustomerProfileCard
        customer={customer}
        onEditClick={() => setIsEditOpen(true)}
        onBlockToggle={handleBlockToggle}
      />

      {/* Grid: Left Column Details vs Right Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-5">
          {/* Order History */}
          <OrderHistoryTable orders={customer.recentOrders} />

          {/* Addresses */}
          <AddressesCard addresses={customer.addresses} />

          {/* Wishlist & Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <WishlistCard wishlist={customer.wishlist} />
            <ReviewsCard reviews={customer.reviews} />
          </div>

          {/* Coupons & Recently Viewed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Coupons Used */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Tag className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Coupons Redeemed</h3>
              </div>
              {customer.couponsUsed.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No coupon usage data available.</p>
              ) : (
                customer.couponsUsed.map((cp) => (
                  <div key={cp.code} className="flex justify-between items-center p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs">
                    <div>
                      <span className="font-bold text-emerald-900 font-mono">{cp.code}</span>
                      <span className="text-[10px] text-gray-500 block">Order #{cp.orderId}</span>
                    </div>
                    <span className="font-bold text-emerald-700">{cp.discount}</span>
                  </div>
                ))
              )}
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Eye className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900 text-sm">Recently Viewed Products</h3>
              </div>
              {customer.recentlyViewed.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No recently viewed data available.</p>
              ) : (
                customer.recentlyViewed.map((pv) => (
                  <div key={pv.id} className="flex justify-between items-center p-2 bg-gray-50/70 border border-gray-100 rounded-xl text-xs">
                    <span className="font-semibold text-gray-800 truncate">{pv.name}</span>
                    <span className="font-bold font-mono text-gray-900">₹{pv.price.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Timeline & Internal Notes */}
        <div className="space-y-5">
          <CustomerTimeline timeline={customer.timeline} />

          {/* Internal Notes Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <MessageSquare className="w-5 h-5 text-[#F57C00]" />
              <h3 className="font-semibold text-gray-900 text-sm">CRM Staff Notes</h3>
            </div>
            <p className="text-xs text-gray-700 bg-amber-50/40 p-3 rounded-xl border border-amber-100 italic">
              &quot;{customer.notes || "No operational notes recorded."}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditCustomerModal
        isOpen={isEditOpen}
        customer={customer}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}
