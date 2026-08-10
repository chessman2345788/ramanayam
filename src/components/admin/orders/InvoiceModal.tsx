"use client";

import React, { useRef } from "react";
import { Order } from "@/types/orders";
import { X, Printer, Download, Sparkles } from "lucide-react";

interface InvoiceModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

export function InvoiceModal({ isOpen, order, onClose }: InvoiceModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading Invoice_${order.id}.pdf...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 print:shadow-none print:border-none print:w-full">
        {/* Header Controls (Hidden on Print) */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/80 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F57C00]" />
            <h3 className="text-sm font-bold text-gray-900">Tax Invoice Preview #{order.id}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#F57C00]" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F57C00] text-white hover:bg-[#E06D00] rounded-xl text-xs font-semibold shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div ref={printRef} className="p-8 space-y-6 text-gray-800 text-xs leading-relaxed bg-white">
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
              <div className="text-xl font-bold tracking-tight text-[#800000] font-serif uppercase">
                RAMANAYAM
              </div>
              <p className="text-[11px] font-medium text-gray-500">Divine E-Commerce Enterprises Pvt. Ltd.</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Ram Path, Near Hanuman Garhi, Ayodhya, UP - 224123
              </p>
              <p className="text-[11px] text-gray-600 font-mono mt-0.5">GSTIN: 09AABCR1234F1Z9 | PAN: AABCR1234F</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded uppercase tracking-wider mb-2">
                TAX INVOICE
              </span>
              <p className="font-semibold text-gray-900">Invoice No: INV-2026-{order.id.slice(-5)}</p>
              <p className="text-gray-500">Date: {order.date}</p>
              <p className="text-gray-500">Order ID: {order.id}</p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50/60 p-4 rounded-xl border border-gray-100">
            <div>
              <p className="font-bold uppercase text-[10px] text-[#F57C00] tracking-wider mb-1">
                Billed To:
              </p>
              <p className="font-semibold text-gray-900 text-sm">{order.customer.name}</p>
              <p>{order.billingAddress.street}</p>
              <p>{order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}</p>
              <p className="font-mono mt-1">Phone: {order.customer.phone}</p>
              <p className="font-mono">Email: {order.customer.email}</p>
            </div>
            <div>
              <p className="font-bold uppercase text-[10px] text-[#F57C00] tracking-wider mb-1">
                Shipped To:
              </p>
              <p className="font-semibold text-gray-900 text-sm">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="font-mono mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-[11px] font-bold text-gray-700 bg-gray-100">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Product Item</th>
                <th className="py-2.5 px-3">HSN Code</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Price</th>
                <th className="py-2.5 px-3 text-center">GST Rate</th>
                <th className="py-2.5 px-3 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="py-2.5 px-3 font-mono text-gray-500">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">{item.hsnCode}</td>
                  <td className="py-2.5 px-3 text-center font-semibold">{item.quantity}</td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{item.price.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-center font-mono">{item.gstRate}%</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">₹{item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tax Breakdown & Total */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <div className="w-64 space-y-1.5 text-right font-mono text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>CGST (6%):</span>
                <span>₹{order.gstSummary.cgst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>SGST (6%):</span>
                <span>₹{order.gstSummary.sgst.toLocaleString()}</span>
              </div>
              {order.discountSummary.amount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({order.discountSummary.code}):</span>
                  <span>-₹{order.discountSummary.amount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping Charges:</span>
                <span>{order.shippingCharges === 0 ? "FREE" : `₹${order.shippingCharges}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-300">
                <span>Grand Total:</span>
                <span className="text-[#800000]">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-6 border-t border-gray-200 text-[10px] text-gray-500 text-center space-y-1">
            <p className="font-semibold text-gray-700">Thank you for choosing Ramanayam for your spiritual needs.</p>
            <p>This is a computer-generated tax invoice. No signature required under Indian IT Act 2000.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
