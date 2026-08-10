import { useState } from "react";
import { useCartStore } from "@/store/cart";

export function useCart() {
  const {
    items,
    removeItem,
    updateQty,
    total: totalFn,
    itemCount,
    clearCart,
  } = useCartStore();

  const totalPrice = totalFn();
  const savings = items.reduce((sum, item) => sum + (item.mrp - item.price) * item.qty, 0);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const gst = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + gst;

  // Free shipping threshold parameters
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const deliveryCharge = amountLeftForFreeShipping === 0 ? 0 : 49;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "DEVOTION10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  const couponDiscount = couponApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = Math.round(grandTotal - couponDiscount + deliveryCharge);

  // Adapter: map new flat item shape to old-style calls
  const removeItemById = (id: string) => removeItem(id);
  const updateQuantity = (id: string, qty: number) => updateQty(id, qty);

  return {
    items,
    itemCount,
    totalPrice,
    savings,
    gst,
    grandTotal,
    couponCode,
    couponApplied,
    couponError,
    progressPercent,
    amountLeftForFreeShipping,
    deliveryCharge,
    couponDiscount,
    finalTotal,
    setCouponCode,
    handleApplyCoupon,
    removeItem: removeItemById,
    updateQuantity,
    clearCart,
  };
}
export default useCart;
