import { PrismaClient, Inventory, Prisma } from "@prisma/client";
import { AppError } from "../../common/errors";

export interface InventoryListFilters {
  sku?: string;
  product?: string;
  search?: string;
  lowStock?: boolean;
  outOfStock?: boolean;
}

export interface AdjustStockData {
  availableStock?: number;
  reservedStock?: number;
  soldStock?: number;
  lowStockAlert?: number;
}

export class InventoryRepository {
  constructor(private prisma: PrismaClient) {}

  private get defaultInclude() {
    return {
      variant: {
        select: {
          id: true,
          productId: true,
          sku: true,
          barcode: true,
          variantName: true,
          price: true,
          compareAtPrice: true,
          costPrice: true,
          isDefault: true,
          isActive: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              vendorId: true,
              status: true,
            },
          },
        },
      },
    };
  }

  async findByVariantId(variantId: string): Promise<Inventory | null> {
    return this.prisma.inventory.findUnique({
      where: { variantId },
      include: this.defaultInclude,
    });
  }

  async findById(id: string): Promise<Inventory | null> {
    return this.prisma.inventory.findUnique({
      where: { id },
      include: this.defaultInclude,
    });
  }

  async checkVariantExists(variantId: string): Promise<boolean> {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      select: { id: true },
    });
    return !!variant;
  }

  async upsertInventory(variantId: string, initialStock = 0): Promise<Inventory> {
    const variantExists = await this.checkVariantExists(variantId);
    if (!variantExists) {
      throw new AppError("Product variant not found", 404);
    }

    return this.prisma.inventory.upsert({
      where: { variantId },
      create: { variantId, availableStock: initialStock },
      update: {},
      include: this.defaultInclude,
    });
  }

  async updateStock(variantId: string, availableStock: number): Promise<Inventory> {
    return this.prisma.inventory.update({
      where: { variantId },
      data: { availableStock },
      include: this.defaultInclude,
    });
  }

  async increaseStockAtomic(variantId: string, amount: number): Promise<Inventory> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.inventory.findUnique({
        where: { variantId },
      });

      if (!existing) {
        const variantExists = await tx.productVariant.findUnique({
          where: { id: variantId },
          select: { id: true },
        });
        if (!variantExists) {
          throw new AppError("Product variant not found", 404);
        }

        return tx.inventory.create({
          data: {
            variantId,
            availableStock: amount,
          },
          include: this.defaultInclude,
        });
      }

      return tx.inventory.update({
        where: { variantId },
        data: {
          availableStock: {
            increment: amount,
          },
        },
        include: this.defaultInclude,
      });
    });
  }

  async decreaseStockAtomic(variantId: string, amount: number): Promise<Inventory> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.inventory.findUnique({
        where: { variantId },
      });

      if (!existing) {
        const variantExists = await tx.productVariant.findUnique({
          where: { id: variantId },
          select: { id: true },
        });
        if (!variantExists) {
          throw new AppError("Product variant not found", 404);
        }
        throw new AppError("Insufficient stock available", 400);
      }

      const updatedCount = await tx.inventory.updateMany({
        where: {
          variantId,
          availableStock: {
            gte: amount,
          },
        },
        data: {
          availableStock: {
            decrement: amount,
          },
        },
      });

      if (updatedCount.count === 0) {
        throw new AppError(
          `Insufficient stock available. Current available stock is ${existing.availableStock}`,
          400,
        );
      }

      const updated = await tx.inventory.findUnique({
        where: { variantId },
        include: this.defaultInclude,
      });

      return updated!;
    });
  }

  async adjustStock(variantId: string, data: AdjustStockData): Promise<Inventory> {
    return this.prisma.inventory.update({
      where: { variantId },
      data,
      include: this.defaultInclude,
    });
  }

  async findInventories(
    filters: InventoryListFilters,
    sort: string,
    skip: number,
    limit: number,
  ): Promise<{ data: Inventory[]; total: number }> {
    const where: Prisma.InventoryWhereInput = {};
    const variantWhere: Prisma.ProductVariantWhereInput = {};

    if (filters.sku) {
      variantWhere.sku = { contains: filters.sku, mode: "insensitive" };
    }

    const searchTerm = filters.product || filters.search;
    if (searchTerm) {
      variantWhere.product = {
        name: { contains: searchTerm, mode: "insensitive" },
      };
    }

    if (Object.keys(variantWhere).length > 0) {
      where.variant = variantWhere;
    }

    if (filters.outOfStock) {
      where.availableStock = 0;
    } else if (filters.lowStock) {
      where.availableStock = {
        gt: 0,
        lte: Prisma.raw("low_stock_alert") as any,
      };
    }

    let orderBy: Prisma.InventoryOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "stock-asc") orderBy = { availableStock: "asc" };
    else if (sort === "stock-desc") orderBy = { availableStock: "desc" };
    else if (sort === "sku") orderBy = { variant: { sku: "asc" } };
    else if (sort === "oldest") orderBy = { createdAt: "asc" };

    if (filters.lowStock) {
      const countWhere: Prisma.InventoryWhereInput = {
        ...where,
        availableStock: undefined,
      };
      delete countWhere.availableStock;

      const [candidates, totalCandidates] = await this.prisma.$transaction([
        this.prisma.inventory.findMany({
          where: countWhere,
          include: this.defaultInclude,
          orderBy: { availableStock: "asc" },
        }),
        this.prisma.inventory.count({ where: countWhere }),
      ]);

      const lowStockItems = candidates.filter(
        (item) => item.availableStock > 0 && item.availableStock <= item.lowStockAlert,
      );

      if (sort === "stock-desc") {
        lowStockItems.sort((a, b) => b.availableStock - a.availableStock);
      } else if (sort === "sku") {
        lowStockItems.sort((a, b) => (a as any).variant.sku.localeCompare((b as any).variant.sku));
      } else if (sort === "oldest") {
        lowStockItems.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      } else if (sort === "newest") {
        lowStockItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }

      const paginated = lowStockItems.slice(skip, skip + limit);
      return { data: paginated, total: lowStockItems.length };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.inventory.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: this.defaultInclude,
      }),
      this.prisma.inventory.count({ where }),
    ]);

    return { data, total };
  }

  async findLowStock(skip: number, limit: number): Promise<{ data: Inventory[]; total: number }> {
    const allInventories = await this.prisma.inventory.findMany({
      include: this.defaultInclude,
      orderBy: { availableStock: "asc" },
    });

    const lowStockItems = allInventories.filter(
      (item) => item.availableStock > 0 && item.availableStock <= item.lowStockAlert,
    );

    const paginated = lowStockItems.slice(skip, skip + limit);
    return { data: paginated, total: lowStockItems.length };
  }

  async findOutOfStock(skip: number, limit: number): Promise<{ data: Inventory[]; total: number }> {
    const where: Prisma.InventoryWhereInput = { availableStock: 0 };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.inventory.findMany({
        where,
        skip,
        take: limit,
        include: this.defaultInclude,
        orderBy: { updatedAt: "desc" },
      }),
      this.prisma.inventory.count({ where }),
    ]);

    return { data, total };
  }
}
