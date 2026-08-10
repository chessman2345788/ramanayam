"use client";

import React from "react";
import { CustomerReview } from "@/types/customers";
import { Star, MessageSquare } from "lucide-react";

interface ReviewsCardProps {
  reviews: CustomerReview[];
}

export function ReviewsCard({ reviews }: ReviewsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <MessageSquare className="w-5 h-5 text-[#F57C00]" />
        <h3 className="font-semibold text-gray-900 text-sm">Product Reviews ({reviews.length})</h3>
      </div>

      {reviews.length === 0 ? (
        <p className="text-xs text-gray-400 py-4 text-center">No product reviews submitted.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-3 bg-gray-50/70 border border-gray-100 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{rev.productName}</span>
                <span className="text-[11px] text-gray-400">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-[11px] font-bold text-gray-700 ml-1">{rev.rating}.0</span>
              </div>
              <p className="text-gray-700 italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
