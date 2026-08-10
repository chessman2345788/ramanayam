import { PrismaClient, Coupon, Prisma } from "@prisma/client";
import { CreateCouponDTO, UpdateCouponDTO, CouponQueryDTO } from "./coupons.types";

export class CouponRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateCouponDTO): Promise<Coupon> {
    return this.prisma.coupon.create({
      data: {
        code: data.code,
        description: data.description,
        discountType: data.discountType,
        discountValue: new Prisma.Decimal(data.discountValue),
        minOrderAmount: data.minOrderAmount ? new Prisma.Decimal(data.minOrderAmount) : null,
        maxDiscount: data.maxDiscount ? new Prisma.Decimal(data.maxDiscount) : null,
        usageLimit: data.usageLimit || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        isActive: data.isActive ?? true,
      },
    });
  }

  async findById(id: string): Promise<Coupon | null> {
    return this.prisma.coupon.findUnique({ where: { id } });
  }

  async findByCode(code: string): Promise<Coupon | null> {
    return this.prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  }

  async findAll(query: CouponQueryDTO) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.CouponWhereInput = {};
    if (query.search) {
      where.OR = [
        { code: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (typeof query.isActive === "boolean") {
      where.isActive = query.isActive;
    }

    const [items, total] = await Promise.all([
      this.prisma.coupon.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.coupon.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, data: UpdateCouponDTO): Promise<Coupon> {
    const updateData: Prisma.CouponUpdateInput = {};

    if (data.code) updateData.code = data.code;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.discountType) updateData.discountType = data.discountType;
    if (data.discountValue !== undefined) updateData.discountValue = new Prisma.Decimal(data.discountValue);
    if (data.minOrderAmount !== undefined)
      updateData.minOrderAmount = data.minOrderAmount ? new Prisma.Decimal(data.minOrderAmount) : null;
    if (data.maxDiscount !== undefined)
      updateData.maxDiscount = data.maxDiscount ? new Prisma.Decimal(data.maxDiscount) : null;
    if (data.usageLimit !== undefined) updateData.usageLimit = data.usageLimit;
    if (data.startDate !== undefined) updateData.startDate = data.startDate ? new Date(data.startDate) : null;
    if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : null;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return this.prisma.coupon.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<Coupon> {
    return this.prisma.coupon.delete({ where: { id } });
  }

  async incrementUsage(id: string): Promise<Coupon> {
    return this.prisma.coupon.update({
      where: { id },
      data: { usedCount: { increment: 1 } },
    });
  }
}
