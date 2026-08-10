import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types/products";

export function useFestivals(dateString?: string, bundleProducts: Product[] = []) {
  const addItem = useCartStore((s) => s.addItem);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!dateString) return;
    const targetDate = new Date(dateString).getTime();

    const updateTimer = () => {
      const difference = targetDate - Date.now();
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown({ days: d, hours: h, minutes: m });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [dateString]);

  const handleAddAllToCart = () => {
    bundleProducts.forEach((p) => addItem(p as unknown as Record<string, unknown>, 1));
  };

  return {
    countdown,
    handleAddAllToCart,
  };
}
export default useFestivals;
