import { DiscountType } from "@prisma/client";

export interface CreateCouponDTO {
  code: string;
  description?: string;
  discountType?: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export interface UpdateCouponDTO extends Partial<CreateCouponDTO> {}

export interface ValidateCouponDTO {
  code: string;
  cartTotal: number;
}

export interface CouponQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}
