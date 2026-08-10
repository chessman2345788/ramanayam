import { AccountStatus, AddressType, UserRole } from "@prisma/client";

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  profileImage?: string | null;
}

export interface CreateAddressInput {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  type: AddressType;
  isDefault?: boolean;
}

export interface UpdateAddressInput {
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  type?: AddressType;
  isDefault?: boolean;
}

export interface ListUsersQueryInput {
  page?: number;
  limit?: number;
  search?: string;
  status?: AccountStatus;
  role?: UserRole;
}
