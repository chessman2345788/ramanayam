import { PrismaClient, ProductStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { WishlistItemRecord } from "./wishlist.types";

export class WishlistRepository {
  private userWishlists = new Map<string, WishlistItemRecord[]>();

  constructor(private prisma: PrismaClient) {}

  async getWishlistItems(userId: string): Promise<WishlistItemRecord[]> {
    return this.userWishlists.get(userId) || [];
  }

  async findProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        variants: {
          where: { isActive: true },
          select: { id: true, price: true, compareAtPrice: true },
          take: 1,
        },
      },
    });
  }

  async findVariantById(variantId: string) {
    return this.prisma.productVariant.findUnique({
      where: { id: variantId },
      select: {
        id: true,
        productId: true,
        isActive: true,
        price: true,
        compareAtPrice: true,
      },
    });
  }

  /**
   * Batch fetch details for all products in a user's wishlist in a single Prisma query.
   * Prevents N+1 database queries.
   */
  async findProductDetailsBatch(productIds: string[]) {
    if (productIds.length === 0) return [];

    return this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        images: {
          where: { isPrimary: true },
          select: { imageUrl: true },
          take: 1,
        },
        variants: {
          where: { isActive: true },
          select: {
            id: true,
            price: true,
            compareAtPrice: true,
            isDefault: true,
          },
        },
      },
    });
  }

  async addItem(userId: string, productId: string, variantId?: string): Promise<WishlistItemRecord> {
    const items = await this.getWishlistItems(userId);
    const existing = items.find((item) => item.productId === productId);

    if (existing) {
      if (variantId) {
        existing.variantId = variantId;
      }
      return existing;
    }

    const newItem: WishlistItemRecord = {
      id: randomUUID(),
      productId,
      variantId,
      addedAt: new Date(),
    };

    items.push(newItem);
    this.userWishlists.set(userId, items);
    return newItem;
  }

  async removeItem(userId: string, productId: string): Promise<boolean> {
    const items = await this.getWishlistItems(userId);
    const filtered = items.filter((item) => item.productId !== productId);

    if (filtered.length === items.length) {
      return false;
    }

    this.userWishlists.set(userId, filtered);
    return true;
  }

  async removeStaleItems(userId: string, staleProductIds: Set<string>): Promise<void> {
    if (staleProductIds.size === 0) return;

    const items = await this.getWishlistItems(userId);
    const cleanItems = items.filter((item) => !staleProductIds.has(item.productId));

    if (cleanItems.length < items.length) {
      this.userWishlists.set(userId, cleanItems);
    }
  }

  async clearWishlist(userId: string): Promise<void> {
    this.userWishlists.delete(userId);
  }
}
