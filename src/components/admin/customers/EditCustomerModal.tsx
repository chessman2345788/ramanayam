"use client";

import React, { useState, useEffect } from "react";
import { Customer, CustomerStatus, CustomerType } from "@/types/customers";
import { X, UserCog, Check } from "lucide-react";

interface EditCustomerModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (updated: Partial<Customer>) => void;
}

export function EditCustomerModal({ isOpen, customer, onClose, onSave }: EditCustomerModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<CustomerStatus>("Active");
  const [customerType, setCustomerType] = useState<CustomerType>("Retail");

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setStatus(customer.status);
      setCustomerType(customer.customerType);
    }
  }, [customer]);

  if (!isOpen || !customer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phone, status, customerType });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-[#F57C00]" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Edit Customer Profile</h3>
              <p className="text-[11px] text-gray-500">{customer.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CustomerStatus)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
              >
                <option value="Active">Active</option>
                <option value="VIP">VIP</option>
                <option value="Verified">Verified</option>
                <option value="Guest">Guest</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Customer Type</label>
              <select
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value as CustomerType)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00]"
              >
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F57C00] hover:bg-[#E06D00] text-white text-xs font-semibold rounded-xl shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
