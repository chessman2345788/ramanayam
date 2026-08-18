"use client";

import React, { useState } from "react";
import { Star, BarChart3, Package } from "lucide-react";
import { AdminReviewDetail } from "@/data/mockReviewsData";
import { RatingStars } from "./RatingStars";

interface ProductRatingSummaryProps {
  reviews: AdminReviewDetail[];
  onSelectProductFilter?: (productName: string | null) => void;
}

export function ProductRatingSummary({ reviews, onSelectProductFilter }: ProductRatingSummaryProps) {
  // Extract unique products
  const uniqueProducts = Array.from(
    new Set(reviews.map((r) => r.productName))
  ).map((name) => {
    const matching = reviews.filter((r) => r.productName === name);
    return {
      name,
      id: matching[0]?.productId || name,
      sku: matching[0]?.productSku || "SKU",
      category: matching[0]?.productCategory || "Puja Essentials",
      image: matching[0]?.productImage || "/images/placeholder.jpg",
      reviews: matching,
    };
  });

  const [selectedProductName, setSelectedProductName] = useState<string>("ALL");

  const currentReviews =
    selectedProductName === "ALL"
      ? reviews
      : reviews.filter((r) => r.productName === selectedProductName);

  const totalReviews = currentReviews.length;
  const avgRating =
    totalReviews > 0
      ? (currentReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";

  const getPercentage = (star: number) => {
    if (totalReviews === 0) return 0;
    const count = currentReviews.filter((r) => r.rating === star).length;
    return Math.round((count / totalReviews) * 100);
  };

  const starBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = currentReviews.filter((r) => r.rating === star).length;
    const percent = getPercentage(star);
    return { star, count, percent };
  });

  const handleSelectProduct = (name: string) => {
    setSelectedProductName(name);
    if (onSelectProductFilter) {
      onSelectProductFilter(name === "ALL" ? null : name);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-display">Product Rating Summary</h3>
            <p className="text-xs text-stone-500">Rating distribution and breakdown by product</p>
          </div>
        </div>

        {/* Product Selector */}
        <div className="flex items-center gap-2">
          <Package className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={selectedProductName}
            onChange={(e) => handleSelectProduct(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value="ALL">All Products Overview ({reviews.length} reviews)</option>
            {uniqueProducts.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} ({p.reviews.length})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Rating Score Card */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-amber-50/40 rounded-xl border border-amber-200/60 text-center">
          <div className="text-4xl font-extrabold text-stone-900 font-display">
            {avgRating}
          </div>
          <div className="my-1">
            <RatingStars rating={Number(avgRating)} size={18} showScore={false} />
          </div>
          <span className="text-xs font-medium text-stone-600">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </span>
          {selectedProductName !== "ALL" && (
            <span className="text-[11px] font-semibold text-amber-700 mt-1 line-clamp-1">
              {selectedProductName}
            </span>
          )}
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-8 space-y-2.5">
          {starBreakdown.map((item) => (
            <div key={item.star} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-semibold text-stone-700 flex items-center gap-1">
                {item.star} <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
              </span>

              <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    item.star >= 4
                      ? "bg-emerald-500"
                      : item.star === 3
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <div className="w-20 text-right flex items-center justify-end gap-1.5 font-medium">
                <span className="text-stone-900 font-bold">{item.percent}%</span>
                <span className="text-stone-400 text-[11px]">({item.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
