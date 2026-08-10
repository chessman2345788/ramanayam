"use client";

import React from "react";
import { WishlistItem } from "@/types/customers";
import { Heart, ShoppingCart } from "lucide-react";

interface WishlistCardProps {
  wishlist: WishlistItem[];
}

export function WishlistCard({ wishlist }: WishlistCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
        <h3 className="font-semibold text-gray-900 text-sm">Saved Wishlist ({wishlist.length})</h3>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-xs text-gray-400 py-4 text-center">No items in wishlist.</p>
      ) : (
        <div className="space-y-2.5">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 bg-gray-50/70 border border-gray-100 rounded-xl text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-[#F57C00] shrink-0">
                  {item.name.slice(0, 1)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-[10px] text-gray-400">Added {item.addedDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold font-mono text-gray-900">₹{item.price.toLocaleString()}</p>
                <span className="text-[10px] text-emerald-600 font-semibold">In Stock</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
