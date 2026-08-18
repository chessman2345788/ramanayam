import { CartRepository } from "./cart.repository";
import { AppError } from "../../common/errors";

export interface FormattedCartItem {
  id: string;
  variantId: string;
  variantName: string;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
  };
  availableStock: number;
}

export interface CartResponse {
  items: FormattedCartItem[];
  subtotal: number;
  totalQuantity: number;
  totalItems: number;
}

export interface CartSummaryResponse extends CartResponse {
  estimatedShipping: number;
  estimatedTax: number;
  grandTotal: number;
}

/** Product statuses that are not available for purchase. */
const UNAVAILABLE_STATUSES = new Set(["ARCHIVED", "OUT_OF_STOCK", "DRAFT"]);

export class CartService {
  constructor(private repository: CartRepository) {}

  /**
   * Loads the user's cart, batch-fetches variant details in a single query,
   * and auto-removes stale items (inactive variants / unavailable products).
   */
  async getCart(userId: string): Promise<CartResponse> {
    const rawItems = await this.repository.getCartItems(userId);
    if (rawItems.length === 0) {
      return { items: [], subtotal: 0, totalQuantity: 0, totalItems: 0 };
    }

    // Batch-fetch all variant details in one query (eliminates N+1)
    const variantIds = rawItems.map((item) => item.variantId);
    const variants = await this.repository.findVariantDetailsBatch(variantIds);
    const variantMap = new Map(variants.map((v) => [v.id, v]));

    const items: FormattedCartItem[] = [];
    const staleVariantIds = new Set<string>();
    let subtotal = 0;
    let totalQuantity = 0;

    for (const item of rawItems) {
      const variant = variantMap.get(item.variantId);

      // Skip and mark stale if variant not found, inactive, or product unavailable
      if (!variant || !variant.isActive || UNAVAILABLE_STATUSES.has(variant.product.status)) {
        staleVariantIds.add(item.variantId);
        continue;
      }

      const price = Number(variant.price) || 0;
      const itemSubtotal = price * item.quantity;
      const availableStock = variant.inventory?.availableStock || 0;
      const primaryImg = variant.product?.images?.[0]?.imageUrl || null;

      subtotal += itemSubtotal;
      totalQuantity += item.quantity;

      items.push({
        id: item.id,
        variantId: item.variantId,
        variantName: variant.variantName,
        sku: variant.sku,
        price,
        quantity: item.quantity,
        subtotal: Number(itemSubtotal.toFixed(2)),
        product: {
          id: variant.product.id,
          name: variant.product.name,
          slug: variant.product.slug,
          image: primaryImg,
        },
        availableStock,
      });
    }

    // Auto-clean stale items from the cart
    await this.repository.removeStaleItems(userId, staleVariantIds);

    return {
      items,
      subtotal: Number(subtotal.toFixed(2)),
      totalQuantity,
      totalItems: items.length,
    };
  }

  async addItem(
    userId: string,
    variantIdInput: string | { variantId: string; quantity?: number },
    quantityInput = 1,
  ): Promise<CartResponse> {
    const variantId = typeof variantIdInput === "object" ? variantIdInput.variantId : variantIdInput;
    const quantity = typeof variantIdInput === "object" ? variantIdInput.quantity || 1 : quantityInput;

    const variant = await this.repository.findVariantDetails(variantId);
    if (!variant || !variant.isActive) {
      throw new AppError("Product variant not found or inactive", 404);
    }

    if (UNAVAILABLE_STATUSES.has(variant.product.status)) {
      throw new AppError("Product is not available for purchase", 400);
    }

    const availableStock = variant.inventory?.availableStock || 0;
    if (availableStock === 0) {
      throw new AppError("Product variant is out of stock", 400);
    }

    const currentCart = await this.repository.getCartItems(userId);
    const existingItem = currentCart.find((item) => item.variantId === variantId);
    const targetQuantity = (existingItem?.quantity || 0) + quantity;

    if (targetQuantity > availableStock) {
      throw new AppError("Requested quantity exceeds available stock", 400);
    }

    await this.repository.addItem(userId, variantId, quantity);
    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: string, quantity: number): Promise<CartResponse> {
    const currentCart = await this.repository.getCartItems(userId);
    const existingItem = currentCart.find((item) => item.id === itemId);

    if (!existingItem) {
      throw new AppError("Cart item not found", 404);
    }

    const variant = await this.repository.findVariantDetails(existingItem.variantId);
    if (!variant || !variant.isActive) {
      throw new AppError("Product variant is no longer available", 400);
    }

    const availableStock = variant.inventory?.availableStock || 0;
    if (quantity > availableStock) {
      throw new AppError("Requested quantity exceeds available stock", 400);
    }

    await this.repository.updateItemQuantity(userId, itemId, quantity);
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string): Promise<CartResponse> {
    const removed = await this.repository.removeItem(userId, itemId);
    if (!removed) {
      throw new AppError("Cart item not found", 404);
    }
    return this.getCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    await this.repository.clearCart(userId);
  }

  async getSummary(userId: string): Promise<CartSummaryResponse> {
    const cart = await this.getCart(userId);
    const estimatedShipping = cart.subtotal > 0 ? 50 : 0;
    const estimatedTax = Number((cart.subtotal * 0.05).toFixed(2));
    const grandTotal = Number((cart.subtotal + estimatedShipping + estimatedTax).toFixed(2));

    return {
      ...cart,
      estimatedShipping,
      estimatedTax,
      grandTotal,
    };
  }
}
