import { occasions, products } from "@/data/products";
import type { Occasion, Product } from "@/types/products";

export const FestivalService = {
  getOccasions: (): Occasion[] => {
    return occasions;
  },

  getOccasionBySlug: (slug: string): Occasion | undefined => {
    return occasions.find((o) => o.slug === slug);
  },

  getProductsForOccasion: (occasion: Occasion): Product[] => {
    return products.filter((p) => occasion.products.includes(p.id));
  }
};
