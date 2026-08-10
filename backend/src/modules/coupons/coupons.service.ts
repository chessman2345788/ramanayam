import { CouponRepository } from "./coupons.repository";
import { CreateCouponDTO, UpdateCouponDTO, CouponQueryDTO, ValidateCouponDTO } from "./coupons.types";
import { AppError } from "../../common/errors";

export class CouponService {
  constructor(private repository: CouponRepository) {}

  async createCoupon(dto: CreateCouponDTO) {
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      throw new AppError(`Coupon code '${dto.code}' already exists`, 400);
    }
    return this.repository.create(dto);
  }

  async getCoupons(query: CouponQueryDTO) {
    return this.repository.findAll(query);
  }

  async getCouponById(id: string) {
    const coupon = await this.repository.findById(id);
    if (!coupon) {
      throw new AppError("Coupon not found", 404);
    }
    return coupon;
  }

  async updateCoupon(id: string, dto: UpdateCouponDTO) {
    await this.getCouponById(id);
    if (dto.code) {
      const existing = await this.repository.findByCode(dto.code);
      if (existing && existing.id !== id) {
        throw new AppError(`Coupon code '${dto.code}' is taken by another coupon`, 400);
      }
    }
    return this.repository.update(id, dto);
  }

  async deleteCoupon(id: string) {
    await this.getCouponById(id);
    return this.repository.delete(id);
  }

  async validateCoupon(dto: ValidateCouponDTO) {
    const coupon = await this.repository.findByCode(dto.code);
    if (!coupon || !coupon.isActive) {
      throw new AppError("Invalid or inactive coupon code", 400);
    }

    const now = new Date();
    if (coupon.startDate && now < coupon.startDate) {
      throw new AppError("This coupon is not active yet", 400);
    }
    if (coupon.endDate && now > coupon.endDate) {
      throw new AppError("This coupon code has expired", 400);
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new AppError("This coupon has reached its maximum usage limit", 400);
    }

    const minOrder = coupon.minOrderAmount ? Number(coupon.minOrderAmount) : 0;
    if (dto.cartTotal < minOrder) {
      throw new AppError(`Minimum order total of ₹${minOrder} required for this coupon`, 400);
    }

    let discountAmount = 0;
    const discountVal = Number(coupon.discountValue);
    if (coupon.discountType === "PERCENTAGE") {
      discountAmount = (dto.cartTotal * discountVal) / 100;
      if (coupon.maxDiscount) {
        const maxD = Number(coupon.maxDiscount);
        if (discountAmount > maxD) discountAmount = maxD;
      }
    } else {
      discountAmount = discountVal;
    }

    discountAmount = Math.min(discountAmount, dto.cartTotal);

    return {
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: discountVal,
        description: coupon.description,
      },
      discountAmount,
      finalTotal: Math.max(0, dto.cartTotal - discountAmount),
    };
  }
}
