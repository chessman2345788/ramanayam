"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  CheckCircle2,
  EyeOff,
  Trash2,
  AlertTriangle,
  User,
  Package,
  ShieldCheck,
  ImageIcon,
} from "lucide-react";
import { AdminReviewDetail, ReviewStatus } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";
import { StatusBadge } from "./StatusBadge";

interface ReviewsTableProps {
  reviews: AdminReviewDetail[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewDetails: (review: AdminReviewDetail) => void;
  onApprove: (id: string) => void;
  onHideModal: (review: AdminReviewDetail) => void;
  onDeleteModal: (review: AdminReviewDetail) => void;
  onReportModal: (review: AdminReviewDetail) => void;
  onFilterCustomer?: (email: string) => void;
  onFilterProduct?: (productName: string) => void;
}

export function ReviewsTable({
  reviews,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewDetails,
  onApprove,
  onHideModal,
  onDeleteModal,
  onReportModal,
  onFilterCustomer,
  onFilterProduct,
}: ReviewsTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const allSelected = reviews.length > 0 && reviews.every((r) => selectedIds.includes(r.id));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 font-semibold uppercase tracking-wider">
              <th className="p-3.5 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
              </th>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Product</th>
              <th className="p-3.5">Rating</th>
              <th className="p-3.5">Review</th>
              <th className="p-3.5">Verified</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-stone-500 text-xs">
                  No reviews match your selected filter criteria.
                </td>
              </tr>
            ) : (
              reviews.map((rev) => {
                const isSelected = selectedIds.includes(rev.id);
                const isMenuOpen = activeMenuId === rev.id;

                return (
                  <tr
                    key={rev.id}
                    className={`hover:bg-amber-50/20 transition-colors ${
                      isSelected ? "bg-amber-50/40" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(rev.id)}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </td>

                    {/* Customer Info */}
                    <td className="p-3.5 max-w-[180px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 font-bold text-xs shrink-0 overflow-hidden">
                          {rev.customerAvatar ? (
                            <img src={rev.customerAvatar} alt={rev.customerName} className="w-full h-full object-cover" />
                          ) : (
                            rev.customerName.charAt(0)
                          )}
                        </div>
                        <div className="truncate">
                          <button
                            type="button"
                            onClick={() => onFilterCustomer && onFilterCustomer(rev.customerEmail)}
                            className="font-bold text-stone-900 hover:text-amber-700 truncate text-left block transition-colors cursor-pointer"
                          >
                            {rev.customerName}
                          </button>
                          <div className="text-[11px] text-stone-400 truncate">{rev.customerEmail}</div>
                        </div>
                      </div>
                    </td>

                    {/* Product Info */}
                    <td className="p-3.5 max-w-[200px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {rev.productImage ? (
                            <img src={rev.productImage} alt={rev.productName} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-4 h-4 text-stone-400" />
                          )}
                        </div>
                        <div className="truncate">
                          <button
                            type="button"
                            onClick={() => onFilterProduct && onFilterProduct(rev.productName)}
                            className="font-semibold text-stone-800 hover:text-amber-700 truncate text-left block transition-colors cursor-pointer"
                          >
                            {rev.productName}
                          </button>
                          <div className="text-[10px] text-stone-400 font-mono">{rev.productSku}</div>
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="p-3.5 whitespace-nowrap">
                      <RatingStars rating={rev.rating} size={13} showScore />
                    </td>

                    {/* Review Snippet */}
                    <td className="p-3.5 max-w-[240px]">
                      <button
                        type="button"
                        onClick={() => onViewDetails(rev)}
                        className="text-left group cursor-pointer w-full"
                      >
                        <div className="font-semibold text-stone-900 group-hover:text-amber-700 truncate transition-colors flex items-center gap-1.5">
                          <span>{rev.title}</span>
                          {rev.images && rev.images.length > 0 && (
                            <ImageIcon className="w-3 h-3 text-amber-600 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 italic truncate mt-0.5">
                          "{rev.comment}"
                        </div>
                      </button>
                    </td>

                    {/* Verified Purchase */}
                    <td className="p-3.5 whitespace-nowrap">
                      {rev.isVerifiedPurchase ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-stone-400">Unverified</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="p-3.5 whitespace-nowrap">
                      <StatusBadge status={rev.status} />
                    </td>

                    {/* Date */}
                    <td className="p-3.5 whitespace-nowrap text-stone-500 text-[11px]">
                      {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions Menu */}
                    <td className="p-3.5 text-right whitespace-nowrap relative">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onViewDetails(rev)}
                          title="View Details"
                          className="p-1.5 text-stone-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveMenuId(isMenuOpen ? null : rev.id)}
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
                            <button
                              type="button"
                              onClick={() => {
                                onViewDetails(rev);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-600" /> View Review
                            </button>

                            {rev.status !== "APPROVED" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onApprove(rev.id);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                              </button>
                            )}

                            {rev.status !== "HIDDEN" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onHideModal(rev);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                              >
                                <EyeOff className="w-3.5 h-3.5 text-stone-500" /> Hide
                              </button>
                            )}

                            {rev.status !== "REPORTED" && (
                              <button
                                type="button"
                                onClick={() => {
                                  onReportModal(rev);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" /> Report / Flag
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                if (onFilterCustomer) onFilterCustomer(rev.customerEmail);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <User className="w-3.5 h-3.5 text-purple-600" /> View Customer
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (onFilterProduct) onFilterProduct(rev.productName);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <Package className="w-3.5 h-3.5 text-amber-600" /> View Product
                            </button>

                            <div className="my-1 border-t border-stone-100" />

                            <button
                              type="button"
                              onClick={() => {
                                onDeleteModal(rev);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
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
