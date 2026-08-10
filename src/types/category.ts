export type CategoryStatus = "ACTIVE" | "HIDDEN" | "DRAFT";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  parentName?: string | null;
  description: string;
  image: string;
  productCount: number;
  status: CategoryStatus;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
  children?: CategoryItem[];
}

export type CategoryViewMode = "table" | "tree" | "cards";

export type CategorySortOption = "newest" | "oldest" | "name_asc" | "name_desc" | "products_desc";

export interface CategoryFilterState {
  searchQuery: string;
  status: "ALL" | CategoryStatus;
  parentId: string; // "ALL", "ROOT_ONLY", or specific parentId
  sortBy: CategorySortOption;
  viewMode: CategoryViewMode;
}
