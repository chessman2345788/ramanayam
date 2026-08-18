import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductService } from "@/services/product.service";
import type { Product, Category } from "@/types/products";
import { matchesSearchQuery } from "@/lib/searchUtils";

export type SortOption = "popular" | "price-asc" | "price-desc" | "rating" | "newest";

export interface FilterState {
  categories: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

const CATEGORY_ALIASES: Record<string, string[]> = {
  "idols-murtis": ["idols-murtis", "murti", "idols-shrines", "mandir"],
  "murti": ["murti", "idols-murtis", "idols-shrines", "mandir"],
  "puja-brassware": ["puja-brassware", "brass-copper-items", "pooja-thali-accessories"],
  "brass-copper-items": ["brass-copper-items", "puja-brassware", "pooja-thali-accessories"],
  "incense-fragrances": ["incense-fragrances", "home-fragrance"],
  "home-fragrance": ["home-fragrance", "incense-fragrances"],
  "samagri-kits": ["samagri-kits", "pooja-samagri", "pooja-kits"],
  "pooja-samagri": ["pooja-samagri", "samagri-kits", "pooja-kits"],
  "temple-decor": ["temple-decor", "temple-decoration"],
  "temple-decoration": ["temple-decoration", "temple-decor"],
};

export function useProducts() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search") || searchParams.get("q");
  const localProducts = ProductService.getProducts();

  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>(ProductService.getCategories());

  useEffect(() => {
    // Fetch complete catalogue from API (up to 1000 limit)
    ProductService.fetchProductsFromApi({ limit: 1000 })
      .then((res) => {
        if (res.products && Array.isArray(res.products) && res.products.length > 0) {
          setApiProducts(res.products as unknown as Product[]);
        }
      })
      .catch(() => {});

    // Fetch dynamic categories from API
    ProductService.fetchCategoriesFromApi()
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setCategoriesList(cats);
        }
      })
      .catch(() => {});
  }, []);

  const products = useMemo(() => {
    if (apiProducts.length === 0) return localProducts;
    const apiSlugs = new Set(apiProducts.map((p) => p.slug));
    const uniqueLocal = localProducts.filter((p) => !apiSlugs.has(p.slug));
    return [...apiProducts, ...uniqueLocal];
  }, [apiProducts, localProducts]);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxPrice: 15000,
    minRating: 0,
    inStockOnly: false,
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Sync category & search params from URL
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: categoryParam ? [categoryParam] : [],
    }));
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);
  const [sort, setSort] = useState<SortOption>("popular");
  const [limit, setLimit] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  const clearAll = () => {
    setFilters({ categories: [], maxPrice: 15000, minRating: 0, inStockOnly: false });
    setSearchQuery("");
  };

  const handleCategoryToggle = (slug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((s) => s !== slug)
        : [...prev.categories, slug],
    }));
  };

  const setMaxPrice = (price: number) => {
    setFilters((prev) => ({ ...prev, maxPrice: price }));
  };

  const setMinRating = (rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  };

  const toggleInStockOnly = () => {
    setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery.trim()) {
      result = result.filter((p) => matchesSearchQuery(searchQuery, p as any));
    }
    if (filters.categories.length > 0) {
      const targetCategorySlugs = new Set<string>();
      filters.categories.forEach((cat) => {
        const cLower = cat.toLowerCase();
        targetCategorySlugs.add(cLower);
        if (CATEGORY_ALIASES[cLower]) {
          CATEGORY_ALIASES[cLower].forEach((alias) => targetCategorySlugs.add(alias.toLowerCase()));
        }
      });

      result = result.filter((p) => {
        const pSlug = (p.categorySlug || "").toLowerCase();
        const pName = (p.category || "").toLowerCase();
        const pCatId = (p.categoryId || "").toLowerCase();

        return Array.from(targetCategorySlugs).some((target) => {
          return (
            pSlug === target ||
            pSlug.includes(target) ||
            target.includes(pSlug) ||
            pName.includes(target.replace(/-/g, " ")) ||
            target.replace(/-/g, " ").includes(pName) ||
            pCatId === target
          );
        });
      });
    }
    result = result.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      result = result.filter((p) => (p.rating || 5) >= filters.minRating);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }
    return result;
  }, [products, filters, searchQuery, sort]);

  const pagedProducts = useMemo(() => {
    return filteredProducts.slice(0, limit);
  }, [filteredProducts, limit]);

  const hasMore = filteredProducts.length > limit;

  const currentCategoryName = useMemo(() => {
    if (filters.categories.length === 1) {
      const selectedSlug = filters.categories[0];
      const cat = categoriesList.find((c) => c.slug === selectedSlug || c.id === selectedSlug);
      if (cat) return cat.name;
      return selectedSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return null;
  }, [filters.categories, categoriesList]);

  return {
    filters,
    searchQuery,
    sort,
    limit,
    showFilters,
    filteredProducts,
    pagedProducts,
    hasMore,
    currentCategoryName,
    categoriesList,
    setSearchQuery,
    setSort,
    setLimit,
    setShowFilters,
    clearAll,
    handleCategoryToggle,
    setMaxPrice,
    setMinRating,
    toggleInStockOnly,
  };
}
