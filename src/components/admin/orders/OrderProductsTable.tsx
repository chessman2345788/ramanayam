"use client";

import React from "react";
import { OrderLineItem, GSTSummary, DiscountSummary } from "@/types/orders";
import { Package, Tag } from "lucide-react";

interface OrderProductsTableProps {
  items: OrderLineItem[];
  subtotal: number;
  shippingCharges: number;
  gstSummary: GSTSummary;
  discountSummary: DiscountSummary;
  totalAmount: number;
}

export function OrderProductsTable({
  items,
  subtotal,
  shippingCharges,
  gstSummary,
  discountSummary,
  totalAmount,
}: OrderProductsTableProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Package className="w-5 h-5 text-[#F57C00]" />
        <h3 className="font-semibold text-gray-900 text-sm">Products Purchased ({items.length})</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/50">
              <th className="py-2.5 px-3 rounded-l-lg">Product Details</th>
              <th className="py-2.5 px-3">SKU / HSN</th>
              <th className="py-2.5 px-3 text-right">Price</th>
              <th className="py-2.5 px-3 text-center">Qty</th>
              <th className="py-2.5 px-3 text-center">GST</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/40">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-[#F57C00] shrink-0">
                      {item.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-gray-400">ID: {item.productId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono text-gray-600">
                  <div>{item.sku}</div>
                  <div className="text-[10px] text-gray-400">HSN: {item.hsnCode}</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-medium">₹{item.price.toLocaleString()}</td>
                <td className="py-3 px-3 text-center font-semibold">{item.quantity}</td>
                <td className="py-3 px-3 text-center font-mono text-gray-500">{item.gstRate}%</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-gray-900">
                  ₹{item.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Breakdown */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <div className="w-full sm:w-72 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-gray-600">
            <span>Items Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>CGST (Calculated):</span>
            <span>₹{gstSummary.cgst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>SGST (Calculated):</span>
            <span>₹{gstSummary.sgst.toLocaleString()}</span>
          </div>
          {discountSummary.amount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" /> Coupon ({discountSummary.code}):
              </span>
              <span>-₹{discountSummary.amount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Shipping Charges:</span>
            <span>{shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Order Total:</span>
            <span className="text-[#800000]">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
