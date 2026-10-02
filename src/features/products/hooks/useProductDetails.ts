import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import type { Product, ProductVariant } from "@/types/products";

export function useProductDetails(product: Product) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants.find((v) => v.isDefault) || product.variants[0];
    }
    return null;
  });

  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "guide" | "ingredients">("specs");

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const currentPrice = selectedVariant?.price ?? product.price;
  const currentMrp = selectedVariant?.compareAtPrice ?? product.mrp;
  const discount =
    currentMrp > currentPrice
      ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100)
      : 0;

  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.inStock;

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addItem(
      {
        ...product,
        variantId: selectedVariant?.id || product.id,
        variantName: selectedVariant?.variantName || "Standard",
        sku: selectedVariant?.sku || "",
        price: currentPrice,
        mrp: currentMrp,
      },
      quantity
    );
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  return {
    selectedVariant,
    setSelectedVariant,
    currentPrice,
    currentMrp,
    inStock,
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
