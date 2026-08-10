import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductService } from "@/services/product.service";
import type { Product } from "@/types/products";
import { matchesSearchQuery } from "@/lib/searchUtils";

export type SortOption = "popular" | "price-asc" | "price-desc" | "rating" | "newest";

export interface FilterState {
  categories: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

export function useProducts() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search") || searchParams.get("q");
  const localProducts = ProductService.getProducts();

  const [apiProducts, setApiProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch complete catalogue from API (up to 100 limit)
    ProductService.fetchProductsFromApi({ limit: 100 })
      .then((res) => {
        if (res.products && Array.isArray(res.products) && res.products.length > 0) {
          setApiProducts(res.products as unknown as Product[]);
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
      result = result.filter((p) =>
        filters.categories.includes(p.categorySlug) ||
        filters.categories.some((c) => p.categorySlug?.includes(c) || c.includes(p.categorySlug || ""))
      );
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
      const categoriesList = ProductService.getCategories();
      const cat = categoriesList.find((c) => c.slug === filters.categories[0]);
      return cat ? cat.name : null;
    }
    return null;
  }, [filters.categories]);

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
