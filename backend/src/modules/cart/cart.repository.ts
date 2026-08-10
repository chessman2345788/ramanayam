import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export interface CartItemRecord {
  id: string;
  variantId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cart repository using in-memory storage.
 *
 * KNOWN LIMITATION: Cart data is stored in process memory and is lost on
 * server restart, deployment, or crash. It is also not shared across multiple
 * server instances. To resolve this, add Cart/CartItem models to the Prisma
 * schema and migrate all methods to use database persistence.
 */
export class CartRepository {
  private userCarts = new Map<string, CartItemRecord[]>();

  constructor(private prisma: PrismaClient) {}

  async getCartItems(userId: string): Promise<CartItemRecord[]> {
    return this.userCarts.get(userId) || [];
  }

  async findVariantDetails(variantId: string) {
    return this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true,
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
        inventory: true,
      },
    });
  }

  /**
   * Batch-fetch variant details for multiple IDs in a single query.
   * Eliminates the N+1 problem when loading a full cart.
   */
  async findVariantDetailsBatch(variantIds: string[]) {
    if (variantIds.length === 0) return [];

    return this.prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true,
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
        inventory: true,
      },
    });
  }

  async addItem(userId: string, variantId: string, quantity: number): Promise<CartItemRecord> {
    const items = await this.getCartItems(userId);
    const existing = items.find((item) => item.variantId === variantId);

    if (existing) {
      existing.quantity += quantity;
      existing.updatedAt = new Date();
      this.userCarts.set(userId, items);
      return existing;
    }

    const newItem: CartItemRecord = {
      id: randomUUID(),
      variantId,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    items.push(newItem);
    this.userCarts.set(userId, items);
    return newItem;
  }

  async updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<CartItemRecord | null> {
    const items = await this.getCartItems(userId);
    const index = items.findIndex((item) => item.id === itemId);

    if (index === -1) return null;

    items[index].quantity = quantity;
    items[index].updatedAt = new Date();
    this.userCarts.set(userId, items);
    return items[index];
  }

  async removeItem(userId: string, itemId: string): Promise<boolean> {
    const items = await this.getCartItems(userId);
    const newItems = items.filter((item) => item.id !== itemId);
    if (newItems.length === items.length) return false;

    this.userCarts.set(userId, newItems);
    return true;
  }

  /**
   * Remove cart items whose variant IDs are in the provided stale set.
   * Used to auto-clean items for inactive variants or unavailable products.
   */
  async removeStaleItems(userId: string, staleVariantIds: Set<string>): Promise<void> {
    if (staleVariantIds.size === 0) return;

    const items = await this.getCartItems(userId);
    const cleanItems = items.filter((item) => !staleVariantIds.has(item.variantId));

    if (cleanItems.length < items.length) {
      this.userCarts.set(userId, cleanItems);
    }
  }

  async clearCart(userId: string): Promise<void> {
    this.userCarts.delete(userId);
  }
}
