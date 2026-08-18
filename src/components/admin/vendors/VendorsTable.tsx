"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  CheckCircle2,
  Ban,
  Power,
  Package,
  ShoppingBag,
  Store,
  ShieldCheck,
  Edit,
} from "lucide-react";
import { AdminVendorDetail, VendorStatus } from "@/data/mockVendorsData";
import { VendorStatusBadge } from "./VendorStatusBadge";

interface VendorsTableProps {
  vendors: AdminVendorDetail[];
  onApprove: (vendor: AdminVendorDetail) => void;
  onSuspend: (vendor: AdminVendorDetail) => void;
  onActivate: (vendor: AdminVendorDetail) => void;
}

export function VendorsTable({
  vendors,
  onApprove,
  onSuspend,
  onActivate,
}: VendorsTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3.5">Vendor</th>
              <th className="p-3.5">Business Name</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Products</th>
              <th className="p-3.5">Orders</th>
              <th className="p-3.5">Revenue</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Joined Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-8 text-center text-stone-500 text-xs">
                  No vendors or seller cooperatives match your search or filter settings.
                </td>
              </tr>
            ) : (
              vendors.map((v) => {
                const isMenuOpen = activeMenuId === v.id;

                return (
                  <tr key={v.id} className="hover:bg-amber-50/20 transition-colors">
                    {/* Vendor */}
                    <td className="p-3.5 whitespace-nowrap max-w-[200px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-amber-700 font-bold overflow-hidden shrink-0">
                          {v.logo ? (
                            <img src={v.logo} alt={v.name} className="w-full h-full object-cover" />
                          ) : (
                            <Store className="w-4 h-4 text-stone-500" />
                          )}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-stone-900 flex items-center gap-1.5 truncate">
                            <Link href={`/admin/vendors/${v.id}`} className="hover:text-amber-700 transition-colors">
                              {v.name}
                            </Link>
                            {v.isPrimary && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-1.5 py-0.2 rounded-md">
                                <ShieldCheck className="w-3 h-3 text-amber-700" /> Primary
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">{v.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Business Name */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-stone-900">{v.businessName}</div>
                      <div className="text-[10px] text-stone-400">{v.businessType}</div>
                    </td>

                    {/* Email */}
                    <td className="p-3.5 whitespace-nowrap text-stone-600 font-medium">
                      {v.email}
                    </td>

                    {/* Phone */}
                    <td className="p-3.5 whitespace-nowrap text-stone-600 font-mono text-[11px]">
                      {v.phone}
                    </td>

                    {/* Products */}
                    <td className="p-3.5 whitespace-nowrap font-bold text-stone-900">
                      {v.productsCount} items
                    </td>

                    {/* Orders */}
                    <td className="p-3.5 whitespace-nowrap font-semibold text-stone-700">
                      {v.ordersCount.toLocaleString("en-IN")}
                    </td>

                    {/* Revenue */}
                    <td className="p-3.5 whitespace-nowrap font-extrabold text-amber-700">
                      ₹{v.totalRevenue.toLocaleString("en-IN")}
                    </td>

                    {/* Status */}
                    <td className="p-3.5 whitespace-nowrap">
                      <VendorStatusBadge status={v.status} />
                    </td>

                    {/* Joined Date */}
                    <td className="p-3.5 whitespace-nowrap text-stone-500 text-[11px]">
                      {v.joinedDate}
                    </td>

                    {/* Actions Menu */}
                    <td className="p-3.5 text-right whitespace-nowrap relative">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/vendors/${v.id}`}
                          title="View Vendor Profile"
                          className="p-1.5 text-stone-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setActiveMenuId(isMenuOpen ? null : v.id)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <>
                          <div
                            onClick={() => setActiveMenuId(null)}
                            className="fixed inset-0 z-40"
                          />
                          <div className="absolute right-3 top-10 w-44 bg-white rounded-xl border border-stone-200 shadow-xl p-1 z-50 text-left animate-in fade-in zoom-in-95 duration-100 space-y-0.5">
                            <Link
                              href={`/admin/vendors/${v.id}`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-600" /> View Profile
                            </Link>

                            <Link
                              href={`/admin/vendors/${v.id}?edit=true`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5 text-sky-600" /> Edit Vendor
                            </Link>

                            <Link
                              href={`/admin/vendors/${v.id}#products`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Package className="w-3.5 h-3.5 text-purple-600" /> View Products
                            </Link>

                            <Link
                              href={`/admin/vendors/${v.id}#orders`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> View Orders
                            </Link>

                            {v.status === "PENDING" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onApprove(v);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Approve Seller
                              </button>
                            )}

                            {v.status === "ACTIVE" && !v.isPrimary && (
                              <button
                                type="button"
                                onClick={() => {
                                  onSuspend(v);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Ban className="w-3.5 h-3.5" /> Suspend Seller
                              </button>
                            )}

                            {(v.status === "SUSPENDED" || v.status === "INACTIVE") && (
                              <button
                                type="button"
                                onClick={() => {
                                  onActivate(v);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Power className="w-3.5 h-3.5" /> Activate Seller
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
