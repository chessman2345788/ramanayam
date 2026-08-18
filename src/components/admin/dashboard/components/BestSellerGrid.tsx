"use client";

import React from "react";
import Link from "next/link";
import { Star, Flame, ArrowRight } from "lucide-react";
import { useAdminDashboardQuery } from "@/hooks/useAdminDashboard";

export function BestSellerGrid() {
  const { data: apiData, isLoading } = useAdminDashboardQuery();

  const bestSellers = apiData?.bestSellers || [];

  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#F57C00]" />
          <h2 className="text-base font-serif font-bold text-[#7A1F1F]">
            Top Best Selling Products
          </h2>
        </div>
        <Link
          href="/admin/products"
          className="text-xs font-semibold text-[#F57C00] hover:underline flex items-center gap-1"
        >
          <span>Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full py-8 text-center text-[#999999] text-xs">
            Loading products from database...
          </div>
        ) : bestSellers.length === 0 ? (
          <div className="col-span-full py-8 text-center text-[#999999] text-xs">
            No products found in database catalog.
          </div>
        ) : (
          bestSellers.map((item) => (
            <div
              key={item.id}
              className="group border border-black/10 rounded-xl p-3 bg-[#FAF8F3]/50 hover:bg-white hover:shadow-md hover:border-[#F57C00]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Product Thumbnail */}
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-black/5 mb-3">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-[#171717]/80 text-white backdrop-blur-xs rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Title & Rating */}
                <h3 className="text-xs font-semibold text-[#171717] line-clamp-1 group-hover:text-[#F57C00] transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#999999]">
                  <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="font-semibold text-[#171717]">{item.rating}</span>
                  <span>• {item.salesCount} sold</span>
                </div>
              </div>

              {/* Revenue Footer */}
              <div className="mt-3 pt-2 border-t border-black/6 flex items-center justify-between">
                <span className="text-[10px] text-[#666666] font-medium">Total Volume</span>
                <span className="text-xs font-bold font-serif text-[#7A1F1F]">
                  {item.revenue}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
