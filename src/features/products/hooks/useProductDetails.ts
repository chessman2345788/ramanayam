import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import type { Product } from "@/types/products";

export function useProductDetails(product: Product) {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "guide" | "ingredients">("specs");

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addItem(product as unknown as Record<string, unknown>, quantity);
    // drawer opens automatically from store
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  return {
    quantity,
    imgError,
    activeImageIndex,
    activeTab,
    wishlisted,
    discount,
    setImgError,
    setActiveImageIndex,
    setActiveTab,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    handleToggleWishlist,
  };
}
