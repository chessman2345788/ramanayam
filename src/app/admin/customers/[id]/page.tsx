"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { mockCustomersList } from "@/data/mockCustomersData";
import { Customer } from "@/types/customers";
import { CustomerProfileCard } from "@/components/admin/customers/CustomerProfileCard";
import { AddressesCard } from "@/components/admin/customers/AddressesCard";
import { OrderHistoryTable } from "@/components/admin/customers/OrderHistoryTable";
import { WishlistCard } from "@/components/admin/customers/WishlistCard";
import { ReviewsCard } from "@/components/admin/customers/ReviewsCard";
import { CustomerTimeline } from "@/components/admin/customers/CustomerTimeline";
import { EditCustomerModal } from "@/components/admin/customers/EditCustomerModal";
import Link from "next/link";
import { ArrowLeft, Tag, Eye, ChevronRight, MessageSquare } from "lucide-react";

export default function CustomerProfilePage() {
  const params = useParams();
  const customerId = params.id as string;

  const initialCust = mockCustomersList.find((c) => c.id === customerId) || mockCustomersList[0];
  const [customer, setCustomer] = useState<Customer>(initialCust);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSaveCustomer = (updated: Partial<Customer>) => {
    setCustomer((prev) => ({ ...prev, ...updated }));
  };

  const handleBlockToggle = () => {
    const nextStatus = customer.status === "Blocked" ? "Active" : "Blocked";
    setCustomer((prev) => ({ ...prev, status: nextStatus }));
  };

  return (
    <div className="space-y-5 pb-16">
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
              {customer.couponsUsed.map((cp) => (
                <div key={cp.code} className="flex justify-between items-center p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 font-mono">{cp.code}</span>
                    <span className="text-[10px] text-gray-500 block">Order #{cp.orderId}</span>
                  </div>
                  <span className="font-bold text-emerald-700">{cp.discount}</span>
                </div>
              ))}
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Eye className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900 text-sm">Recently Viewed Products</h3>
              </div>
              {customer.recentlyViewed.map((pv) => (
                <div key={pv.id} className="flex justify-between items-center p-2 bg-gray-50/70 border border-gray-100 rounded-xl text-xs">
                  <span className="font-semibold text-gray-800 truncate">{pv.name}</span>
                  <span className="font-bold font-mono text-gray-900">₹{pv.price.toLocaleString()}</span>
                </div>
              ))}
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
              "{customer.notes || "No operational notes recorded."}"
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
