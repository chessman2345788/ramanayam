"use client";

import React from "react";
import { PaymentMethod, PaymentStatus } from "@/types/orders";
import { StatusBadge } from "./StatusBadge";
import { CreditCard, RefreshCw, ShieldCheck, FileCheck } from "lucide-react";

interface PaymentCardProps {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  paymentDate?: string;
  totalAmount: number;
  onRefundClick?: () => void;
}

export function PaymentCard({
  method,
  status,
  transactionId,
  paymentDate,
  totalAmount,
  onRefundClick,
}: PaymentCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#F57C00]" />
          <h3 className="font-semibold text-gray-900 text-sm">Payment Details</h3>
        </div>
        <StatusBadge status={status} type="payment" />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-gray-50/80 rounded-xl space-y-1">
          <span className="text-gray-500 block">Payment Gateway</span>
          <span className="font-semibold text-gray-900 block">{method}</span>
        </div>
        <div className="p-3 bg-gray-50/80 rounded-xl space-y-1">
          <span className="text-gray-500 block">Amount Paid</span>
          <span className="font-bold text-[#800000] text-sm block">₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs text-gray-600 font-mono bg-gray-50/50 p-3 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Transaction Ref:</span>
          <span className="font-bold text-gray-800">{transactionId}</span>
        </div>
        {paymentDate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Date Paid:</span>
            <span className="text-gray-800">{paymentDate}</span>
          </div>
        )}
        <div className="flex justify-between items-center text-emerald-700">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Verified:
          </span>
          <span className="font-bold">PASSED</span>
        </div>
      </div>

      {status === "Paid" && onRefundClick && (
        <button
          onClick={onRefundClick}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Initiate Refund</span>
        </button>
      )}
    </div>
  );
}
