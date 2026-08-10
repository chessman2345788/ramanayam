import { VendorStatus } from "@prisma/client";

export interface CreateVendorInput {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  description?: string;
  logo?: string;
  banner?: string;
  gstNumber?: string;
  panNumber?: string;
}

export interface UpdateVendorInput {
  businessName?: string;
  description?: string;
  logo?: string;
  banner?: string;
  gstNumber?: string;
  panNumber?: string;
  phone?: string;
}

export interface VendorQueryFilters {
  status?: VendorStatus;
  isVerified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FormattedVendor {
  id: string;
  businessName: string;
  slug: string;
  ownerName: string;
  email: string;
  phone: string;
  logo?: string | null;
  banner?: string | null;
  description?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  status: VendorStatus;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
}
