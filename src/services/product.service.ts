import { axiosClient } from "@/lib/api-axios";
import type { Product, ProductStatus } from "@/components/admin/products/types/product.types";
import { products as localProducts, categories as localCategories } from "@/data/products";
import type { Category } from "@/types/products";

export interface FetchProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const mapStatusToFrontend = (backendStatus?: string): ProductStatus => {
  switch (backendStatus) {
    case "ACTIVE":
      return "Active";
    case "DRAFT":
      return "Draft";
    case "ARCHIVED":
      return "Archived";
    case "OUT_OF_STOCK":
      return "Out of Stock";
    default:
      return "Active";
  }
};

const mapStatusToBackend = (frontendStatus?: string): string => {
  switch (frontendStatus) {
    case "ALL":
    case "All":
      return "ALL";
    case "Active":
    case "ACTIVE":
      return "ACTIVE";
    case "Draft":
    case "DRAFT":
      return "DRAFT";
    case "Archived":
    case "ARCHIVED":
      return "ARCHIVED";
    case "Out of Stock":
    case "OUT_OF_STOCK":
      return "OUT_OF_STOCK";
    default:
      return "ACTIVE";
  }
};

export const mapBackendProductToFrontend = (p: any): Product => {
  const primaryVariant = p.variants?.[0] || {};
  const primaryPrice = Number(primaryVariant.price || p.price || 0);
  const primaryMrp = Number(primaryVariant.compareAtPrice || p.mrp || (primaryPrice > 0 ? primaryPrice * 1.25 : 0));
  const primaryStock = primaryVariant.stock !== undefined ? Number(primaryVariant.stock) : Number(p.stock || 0);
  const primarySku = primaryVariant.sku || p.sku || `SKU-${p.id?.slice(0, 8) || "0000"}`;

  const primaryImageObj = p.images?.find((img: any) => img.isPrimary) || p.images?.[0];
  const primaryImageUrl = primaryImageObj?.imageUrl || primaryImageObj?.url || "/images/products/placeholder.jpg";

  const formattedImages = Array.isArray(p.images) && p.images.length > 0
    ? p.images.map((img: any, idx: number) => ({
        id: img.id || `img-${idx}`,
        url: img.imageUrl || img.url || "/images/products/placeholder.jpg",
        altText: img.altText || p.name,
        isPrimary: img.isPrimary ?? (idx === 0),
      }))
    : [{ id: "img-default", url: primaryImageUrl, altText: p.name, isPrimary: true }];

  const formattedVariants = Array.isArray(p.variants) && p.variants.length > 0
    ? p.variants.map((v: any) => ({
        id: v.id,
        name: v.variantName || v.name || "Default",
        sku: v.sku || primarySku,
        price: Number(v.price || 0),
        stock: Number(v.stock || 0),
      }))
    : [];

  const categoryName = p.category?.name || (typeof p.category === "string" ? p.category : "Puja Essentials");
  const categorySlug = p.category?.slug || (typeof p.category === "object" ? p.category?.slug : "puja-essentials") || "puja-essentials";
  const vendorName = p.vendor?.businessName || p.vendor?.name || (typeof p.vendor === "string" ? p.vendor : "Ramanayam Artisans");

  return {
    id: p.id,
    name: p.name || "Untitled Product",
    slug: p.slug || "",
    sku: primarySku,
    shortDesc: p.shortDescription || p.shortDesc || "",
    fullDesc: p.description || p.fullDesc || "",
    category: categoryName,
    categorySlug: categorySlug,
    categoryId: p.categoryId || p.category?.id,
    brand: p.brand || "Ramanayam Heritage",
    vendor: vendorName,
    vendorId: p.vendorId || p.vendor?.id,
    price: primaryPrice,
    mrp: primaryMrp,
    image: primaryImageUrl,
    costPrice: Number(primaryVariant.costPrice || p.costPrice || 0),
    gstRate: Number(p.gstRate || 18),
    stock: primaryStock,
    inStock: primaryStock > 0,
    lowStockLimit: Number(p.lowStockLimit || 5),
    status: mapStatusToFrontend(p.status),
    isFeatured: Boolean(p.featured || p.isFeatured),
    isBestSeller: Boolean(p.isBestSeller ?? false),
    isNewArrival: Boolean(p.isNewArrival ?? true),
    isTrending: Boolean(p.isTrending ?? false),
    rating: Number(p.rating || 5.0),
    reviewCount: Number(p._count?.reviews || 12),
    tags: [categoryName],
    badges: p.featured ? ["Featured"] : [],
    images: formattedImages as any,
    variants: formattedVariants as any,
    seoTitle: p.seoTitle || "",
    seoDescription: p.seoDescription || "",
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt || new Date().toISOString(),
  };
};

export const ProductService = {
  // Legacy synchronous helpers for local mocks fallback
  getProducts: (): any[] => {
    return localProducts;
  },

  getProductBySlug: (slug: string): any => {
    return localProducts.find((p) => p.slug === slug);
  },

  getProductsByCategory: (categorySlug: string): any[] => {
    return localProducts.filter((p) => (p as any).categorySlug === categorySlug);
  },

  getFeaturedProducts: (): any[] => {
    return localProducts.filter((p) => (p as any).isFeatured);
  },

  getCategories: (): Category[] => {
    return localCategories;
  },

  getCategoryBySlug: (slug: string): Category | undefined => {
    return localCategories.find((c) => c.slug === slug);
  },

  // API Category Fetch
  fetchCategoriesFromApi: async (): Promise<Category[]> => {
    try {
      const res = await axiosClient.get("/categories", { params: { limit: 100 } });
      const apiCategories =
        res.data?.data?.data ||
        res.data?.data?.items ||
        res.data?.data?.categories ||
        res.data?.categories ||
        (Array.isArray(res.data?.data) ? res.data.data : []);
      if (Array.isArray(apiCategories)) {
        return apiCategories.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          nameHi: c.nameHi || c.name,
          nameSanskrit: c.nameSanskrit || c.name,
          description: c.description || "",
          image: c.image || "/images/categories/placeholder.jpg",
          productCount: c._count?.products ?? c.productCount ?? 0,
          childCount: c._count?.children ?? 0,
          parentId: c.parentId || c.parent?.id || null,
          parentName: c.parent?.name || null,
          isActive: c.isActive ?? true,
          status: c.isActive === false ? "HIDDEN" : "ACTIVE",
          createdAt: c.createdAt || new Date().toISOString(),
          updatedAt: c.updatedAt || new Date().toISOString(),
        }));
      }
      return localCategories;
    } catch (err) {
      console.warn("Failed to fetch categories from API:", err);
      return localCategories;
    }
  },

  // API Vendor Fetch
  fetchVendorsFromApi: async (): Promise<{ id: string; name: string; slug?: string }[]> => {
    try {
      const res = await axiosClient.get("/vendors");
      const list =
        res.data?.data?.data ||
        res.data?.data?.vendors ||
        res.data?.vendors ||
        (Array.isArray(res.data?.data) ? res.data.data : []);
      if (Array.isArray(list) && list.length > 0) {
        return list.map((v: any) => ({
          id: v.id,
          name: v.businessName || v.name || v.ownerName || "Vendor",
          slug: v.slug,
        }));
      }
      return [];
    } catch {
      return [];
    }
  },

  createCategoryFromApi: async (data: any): Promise<any> => {
    const rawSlug = data.slug || data.name || "";
    const cleanSlug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const payload = {
      name: data.name,
      slug: cleanSlug,
      description: data.description || null,
      image: data.image || null,
      parentId: data.parentId || null,
      isActive: data.status === "HIDDEN" ? false : true,
    };

    const res = await axiosClient.post("/categories", payload);
    return res.data?.data || res.data;
  },

  updateCategoryFromApi: async (id: string, data: any): Promise<any> => {
    const payload: Record<string, any> = {};
    if (data.name) payload.name = data.name;
    if (data.slug) {
      payload.slug = data.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
    if (data.description !== undefined) payload.description = data.description;
    if (data.image !== undefined) payload.image = data.image;
    if (data.parentId !== undefined) payload.parentId = data.parentId || null;
    if (data.status !== undefined) payload.isActive = data.status !== "HIDDEN";

    const res = await axiosClient.patch(`/categories/${id}`, payload);
    return res.data?.data || res.data;
  },

  deleteCategoryFromApi: async (id: string): Promise<boolean> => {
    await axiosClient.delete(`/categories/${id}`);
    return true;
  },

  // GET Products List with search, filtering, sorting, pagination
  fetchProductsFromApi: async (params?: Record<string, any>): Promise<FetchProductsResponse> => {
    const queryParams: Record<string, any> = {};

    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.limit = params.limit;
    if (params?.search) queryParams.search = params.search;
    if (params?.category) queryParams.category = params.category;
    if (params?.status) queryParams.status = mapStatusToBackend(params.status);
    if (params?.featured !== undefined && params?.featured !== null) queryParams.featured = String(params.featured);
    if (params?.minPrice !== undefined && params?.minPrice !== null) queryParams.minPrice = params.minPrice;
    if (params?.maxPrice !== undefined && params?.maxPrice !== null) queryParams.maxPrice = params.maxPrice;

    if (params?.sortBy) {
      switch (params.sortBy) {
        case "newest":
          queryParams.sort = "newest";
          break;
        case "oldest":
          queryParams.sort = "oldest";
          break;
        case "priceLow":
          queryParams.sort = "price-asc";
          break;
        case "priceHigh":
          queryParams.sort = "price-desc";
          break;
        case "popularity":
          queryParams.sort = "popularity";
          break;
        default:
          queryParams.sort = "newest";
      }
    }

    const res = await axiosClient.get("/products", { params: queryParams });
    const payload = res.data;

    const rawList =
      (Array.isArray(payload.data?.data) ? payload.data.data : null) ||
      payload.data?.products ||
      payload.products ||
      (Array.isArray(payload.data) ? payload.data : []);
    const total =
      payload.data?.meta?.total ??
      payload.data?.total ??
      payload.pagination?.total ??
      rawList.length;
    const page =
      payload.data?.meta?.page ??
      payload.data?.page ??
      payload.pagination?.page ??
      Number(params?.page || 1);
    const limit =
      payload.data?.meta?.limit ??
      payload.data?.limit ??
      payload.pagination?.limit ??
      Number(params?.limit || 10);
    const totalPages =
      payload.data?.meta?.totalPages ?? (Math.ceil(total / limit) || 1);

    return {
      products: rawList.map(mapBackendProductToFrontend),
      pagination: { total, page, limit, totalPages },
    };
  },

  // GET Product Details by ID
  fetchProductByIdFromApi: async (id: string): Promise<Product> => {
    const res = await axiosClient.get(`/products/id/${id}`);
    const raw = res.data?.data?.product || res.data?.product || res.data?.data || res.data;
    return mapBackendProductToFrontend(raw);
  },

  // GET Product Details by Slug
  fetchProductBySlugFromApi: async (slug: string): Promise<Product> => {
    const res = await axiosClient.get(`/products/slug/${slug}`);
    const raw = res.data?.data?.product || res.data?.product || res.data?.data || res.data;
    return mapBackendProductToFrontend(raw);
  },

  // POST Product (Create)
  createProductFromApi: async (productData: any): Promise<Product> => {
    const isUuid = (id?: string) =>
      typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    // 1. Ensure real categoryId UUID from DB
    let categoryId = productData.categoryId;
    if (!isUuid(categoryId)) {
      const cats = await ProductService.fetchCategoriesFromApi();
      const matchedCat = cats.find((c) => c.name.toLowerCase() === (productData.category || "").toLowerCase() || c.id === categoryId);
      categoryId = matchedCat?.id || (cats.length > 0 ? cats[0].id : "c20c95be-bd39-4ebd-bca4-e387a8c20bdb");
    }

    // 2. Ensure real vendorId UUID from DB
    let vendorId = productData.vendorId;
    if (!isUuid(vendorId)) {
      const vends = await ProductService.fetchVendorsFromApi();
      const matchedVend = vends.find((v) => v.name.toLowerCase() === (productData.vendor || "").toLowerCase() || v.id === vendorId);
      vendorId = matchedVend?.id || (vends.length > 0 ? vends[0].id : "0b989d8b-454a-4325-b305-5f646d8260a1");
    }

    // Sanitize slug to lowercase alphanumeric with hyphens only
    const rawSlug = productData.slug || productData.name || "";
    const cleanSlug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const payload = {
      name: productData.name,
      slug: cleanSlug || `product-${Date.now()}`,
      shortDescription: productData.shortDesc || productData.shortDescription || null,
      description: productData.fullDesc || productData.description || null,
      categoryId,
      vendorId,
      status: mapStatusToBackend(productData.status),
      featured: Boolean(productData.isFeatured || productData.featured),
      seoTitle: productData.seoTitle || null,
      seoDescription: productData.seoDescription || null,
    };

    const res = await axiosClient.post("/products", payload);
    const raw = res.data?.data?.product || res.data?.product || res.data;
    const createdProductId = raw.id;

    // 3. Create Variant via POST /products/:productId/variants
    const variantsToCreate = Array.isArray(productData.variants) && productData.variants.length > 0
      ? productData.variants
      : [{
          sku: productData.sku || `SKU-${createdProductId.slice(0, 8).toUpperCase()}`,
          name: "Standard",
          price: Number(productData.price || 0),
          compareAtPrice: productData.mrp ? Number(productData.mrp) : null,
          costPrice: productData.costPrice ? Number(productData.costPrice) : null,
          stock: Number(productData.stock || 0),
          isDefault: true,
          isActive: true,
        }];

    for (const v of variantsToCreate) {
      try {
        await axiosClient.post(`/products/${createdProductId}/variants`, {
          sku: v.sku || `SKU-${Date.now()}`,
          variantName: v.name || v.variantName || "Standard",
          price: Number(v.price || productData.price || 0),
          compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : (productData.mrp ? Number(productData.mrp) : null),
          costPrice: v.costPrice ? Number(v.costPrice) : (productData.costPrice ? Number(productData.costPrice) : null),
          isDefault: v.isDefault ?? true,
          isActive: v.isActive ?? true,
          stock: Number(v.stock !== undefined ? v.stock : (productData.stock || 0)),
        });
      } catch (variantErr) {
        console.warn("Failed to create variant:", variantErr);
      }
    }

    // 4. Create Image via POST /products/:productId/images
    const imagesToCreate = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : (productData.image ? [{ url: productData.image, isPrimary: true }] : []);

    for (let i = 0; i < imagesToCreate.length; i++) {
      const img = imagesToCreate[i];
      const imgUrl = typeof img === "string" ? img : (img.url || img.imageUrl);
      if (imgUrl && typeof imgUrl === "string" && imgUrl.trim().length > 0) {
        try {
          await axiosClient.post(`/products/${createdProductId}/images`, {
            imageUrl: imgUrl,
            altText: (typeof img === "object" ? img.altText : null) || productData.name,
            isPrimary: typeof img === "object" ? (img.isPrimary ?? (i === 0)) : (i === 0),
            sortOrder: i,
          });
        } catch (imgErr) {
          console.warn("Failed to add image:", imgErr);
        }
      }
    }

    // Return the full product from backend API
    return ProductService.fetchProductByIdFromApi(createdProductId);
  },

  // PUT Product (Update)
  updateProductFromApi: async (id: string, productData: any): Promise<Product> => {
    const payload = {
      ...(productData.name && { name: productData.name }),
      ...(productData.slug && { slug: productData.slug }),
      ...(productData.shortDesc !== undefined && { shortDescription: productData.shortDesc }),
      ...(productData.fullDesc !== undefined && { description: productData.fullDesc }),
      ...(productData.categoryId && { categoryId: productData.categoryId }),
      ...(productData.vendorId && { vendorId: productData.vendorId }),
      ...(productData.status && { status: mapStatusToBackend(productData.status) }),
      ...(productData.isFeatured !== undefined && { featured: productData.isFeatured }),
      ...(productData.seoTitle !== undefined && { seoTitle: productData.seoTitle }),
      ...(productData.seoDescription !== undefined && { seoDescription: productData.seoDescription }),
    };

    const res = await axiosClient.put(`/products/${id}`, payload);
    const raw = res.data?.data?.product || res.data?.product || res.data;

    // Handle variant updates if present
    if (Array.isArray(productData.variants) && productData.variants.length > 0) {
      for (const v of productData.variants) {
        if (v.id) {
          try {
            await axiosClient.put(`/products/variants/${v.id}`, {
              ...(v.sku && { sku: v.sku }),
              ...(v.name && { variantName: v.name }),
              ...(v.price !== undefined && { price: Number(v.price) }),
              ...(v.stock !== undefined && { stock: Number(v.stock) }),
            });
          } catch (e) {
            console.warn("Failed updating variant", v.id, e);
          }
        }
      }
    }

    return ProductService.fetchProductByIdFromApi(id);
  },

  // DELETE Product
  deleteProductFromApi: async (id: string): Promise<boolean> => {
    await axiosClient.delete(`/products/${id}`);
    return true;
  },

  // Bulk Delete Products
  bulkDeleteProductsFromApi: async (ids: string[]): Promise<boolean> => {
    await Promise.all(ids.map((id) => axiosClient.delete(`/products/${id}`)));
    return true;
  },

  // Bulk Publish Products (Set status to ACTIVE)
  bulkPublishProductsFromApi: async (ids: string[]): Promise<boolean> => {
    await Promise.all(
      ids.map((id) => axiosClient.put(`/products/${id}`, { status: "ACTIVE" }))
    );
    return true;
  },

  // Bulk Archive Products (Set status to ARCHIVED)
  bulkArchiveProductsFromApi: async (ids: string[]): Promise<boolean> => {
    await Promise.all(
      ids.map((id) => axiosClient.put(`/products/${id}`, { status: "ARCHIVED" }))
    );
    return true;
  },

  // Upload Product Image
  uploadProductImageToApi: async (productId: string, imageData: { imageUrl: string; altText?: string; isPrimary?: boolean }) => {
    const res = await axiosClient.post(`/products/${productId}/images`, imageData);
    return res.data;
  },

  // Dry-run validate CSV import payload
  validateCsvImportApi: async (rows: Record<string, any>[]): Promise<{
    summary: {
      totalRows: number;
      validRows: number;
      invalidRows: number;
      duplicateSkus: number;
      missingCategories: number;
    };
    errors: Array<{ row: number; sku: string; field: string; message: string; value: any }>;
    validProducts: any[];
  }> => {
    const res = await axiosClient.post("/products/import/validate", { rows });
    return res.data?.data || res.data;
  },

  // Execute batched product creation from valid CSV payload
  executeCsvImportApi: async (validProducts: any[]): Promise<{
    createdCount: number;
    failedCount: number;
  }> => {
    const res = await axiosClient.post("/products/import/execute", { validProducts });
    return res.data?.data || res.data;
  },
};
