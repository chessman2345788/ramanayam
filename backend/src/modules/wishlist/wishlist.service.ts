import { WishlistRepository } from "./wishlist.repository";
import { WishlistResponse, FormattedWishlistItem } from "./wishlist.types";
import { AppError } from "../../common/errors";
import { ProductStatus } from "@prisma/client";

export class WishlistService {
  constructor(private repository: WishlistRepository) {}

  async getWishlist(userId: string): Promise<WishlistResponse> {
    const rawItems = await this.repository.getWishlistItems(userId);
    if (rawItems.length === 0) {
      return { items: [], itemCount: 0, updatedAt: new Date() };
    }

    const productIds = rawItems.map((item) => item.productId);
    const productDetailsList = await this.repository.findProductDetailsBatch(productIds);

    const productMap = new Map(productDetailsList.map((p) => [p.id, p]));
    const formattedItems: FormattedWishlistItem[] = [];
    const staleProductIds = new Set<string>();

    for (const rawItem of rawItems) {
      const product = productMap.get(rawItem.productId);

      // Auto-purge items whose products were deleted or are no longer active
      if (!product || product.status !== ProductStatus.ACTIVE) {
        staleProductIds.add(rawItem.productId);
        continue;
      }

      // Pick default variant or first active variant
      let targetVariant = product.variants[0];
      if (rawItem.variantId) {
        const foundVariant = product.variants.find((v) => v.id === rawItem.variantId);
        if (foundVariant) {
          targetVariant = foundVariant;
        }
      }

      const price = targetVariant ? Number(targetVariant.price) : 0;
      const compareAtPrice = targetVariant?.compareAtPrice
        ? Number(targetVariant.compareAtPrice)
        : null;
      const primaryImage = product.images[0]?.imageUrl || null;

      formattedItems.push({
        id: rawItem.id,
        productId: product.id,
        variantId: targetVariant?.id || rawItem.variantId,
        name: product.name,
        slug: product.slug,
        price,
        compareAtPrice,
        primaryImage,
        status: product.status,
        isAvailable: product.status === ProductStatus.ACTIVE,
        addedAt: rawItem.addedAt,
      });
    }

    // Purge stale items asynchronously
    if (staleProductIds.size > 0) {
      this.repository.removeStaleItems(userId, staleProductIds).catch(() => {});
    }

    return {
      items: formattedItems,
      itemCount: formattedItems.length,
      updatedAt: new Date(),
    };
  }

  async addItem(userId: string, productId: string, variantId?: string): Promise<WishlistResponse> {
    const product = await this.repository.findProductById(productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (product.status !== ProductStatus.ACTIVE) {
      throw new AppError("Cannot add an inactive product to wishlist", 400);
    }

    if (variantId) {
      const variant = await this.repository.findVariantById(variantId);
      if (!variant || variant.productId !== productId) {
        throw new AppError("Variant not found for this product", 404);
      }
      if (!variant.isActive) {
        throw new AppError("Cannot add an inactive product variant to wishlist", 400);
      }
    }

    // Check duplicate
    const currentItems = await this.repository.getWishlistItems(userId);
    const isDuplicate = currentItems.some((item) => item.productId === productId);
    if (isDuplicate) {
      throw new AppError("Product is already in your wishlist", 400);
    }

    await this.repository.addItem(userId, productId, variantId);
    return this.getWishlist(userId);
  }

  async removeItem(userId: string, productId: string): Promise<WishlistResponse> {
    const removed = await this.repository.removeItem(userId, productId);
    if (!removed) {
      throw new AppError("Item not found in wishlist", 404);
    }
    return this.getWishlist(userId);
  }

  async clearWishlist(userId: string): Promise<WishlistResponse> {
    await this.repository.clearWishlist(userId);
    return {
      items: [],
      itemCount: 0,
      updatedAt: new Date(),
    };
  }
}
