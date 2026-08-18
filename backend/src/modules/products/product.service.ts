import { ProductRepository, CreateProductDTO, UpdateProductDTO, CreateVariantDTO, UpdateVariantDTO, CreateImageDTO, CreateCollectionDTO, UpdateCollectionDTO, ProductFilters } from "./product.repository";
import { AppError } from "../../common/errors";
import { formatPaginationResult, PaginationResult } from "../../components/pagination";
import { Product, ProductVariant, ProductImage, Collection, ProductStatus } from "@prisma/client";

export interface UserContext {
  id: string;
  role: string;
  vendorId?: string;
}

export class ProductService {
  constructor(private repository: ProductRepository) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  private verifyOwnership(product: Product, user?: UserContext): void {
    if (!user) return;
    if (user.role === "ADMIN") return;

    if (user.role === "VENDOR") {
      if (user.vendorId && product.vendorId !== user.vendorId) {
        throw new AppError("Forbidden: You do not have permission to modify this product", 403);
      }
    }
  }

  // ==========================================
  // Product Operations
  // ==========================================

  async createProduct(data: CreateProductDTO, user?: UserContext): Promise<Product> {
    const slug = data.slug ? data.slug : this.generateSlug(data.name);

    const existingSlug = await this.repository.findProductBySlug(slug);
    if (existingSlug) {
      throw new AppError("A product with this slug already exists", 409);
    }

    const categoryExists = await this.repository.checkCategoryExists(data.categoryId);
    if (!categoryExists) {
      throw new AppError("Category not found", 404);
    }

    const vendorExists = await this.repository.checkVendorExists(data.vendorId);
    if (!vendorExists) {
      throw new AppError("Vendor not found", 404);
    }

    if (user && user.role === "VENDOR" && user.vendorId && data.vendorId !== user.vendorId) {
      throw new AppError("Forbidden: Cannot create a product for another vendor", 403);
    }

    return this.repository.createProduct({
      ...data,
      slug,
    });
  }

  async updateProduct(id: string, data: UpdateProductDTO, user?: UserContext): Promise<Product> {
    const existing = await this.repository.findProductById(id);
    if (!existing || existing.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }

    this.verifyOwnership(existing, user);

    if (data.slug && data.slug !== existing.slug) {
      const slugConflict = await this.repository.findProductBySlugExcluding(data.slug, id);
      if (slugConflict) {
        throw new AppError("A product with this slug already exists", 409);
      }
    }

    if (data.categoryId) {
      const categoryExists = await this.repository.checkCategoryExists(data.categoryId);
      if (!categoryExists) {
        throw new AppError("Category not found", 404);
      }
    }

    if (data.vendorId) {
      const vendorExists = await this.repository.checkVendorExists(data.vendorId);
      if (!vendorExists) {
        throw new AppError("Vendor not found", 404);
      }
    }

    return this.repository.updateProduct(id, data);
  }

  async deleteProduct(id: string, user?: UserContext): Promise<void> {
    const existing = await this.repository.findProductById(id);
    if (!existing || existing.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }

    this.verifyOwnership(existing, user);

    await this.repository.softDeleteProduct(id);
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const product = await this.repository.findProductBySlug(slug);
    if (!product || product.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.repository.findProductById(id);
    if (!product || product.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  async listProducts(
    filters: ProductFilters = {},
    sort = "newest",
    page = 1,
    limit = 10,
  ): Promise<PaginationResult<Product>> {
    const validLimit = Math.min(Math.max(limit, 1), 2000);
    const validPage = Math.max(page, 1);
    const skip = (validPage - 1) * validLimit;

    const { data, total } = await this.repository.findProducts(filters, sort, skip, validLimit);
    return formatPaginationResult(data, total, validPage, validLimit);
  }

  async getFeaturedProducts(page = 1, limit = 10): Promise<PaginationResult<Product>> {
    return this.listProducts({ featured: true }, "newest", page, limit);
  }

  async getBestSellers(page = 1, limit = 10): Promise<PaginationResult<Product>> {
    return this.listProducts({}, "popularity", page, limit);
  }

  async getNewArrivals(page = 1, limit = 10): Promise<PaginationResult<Product>> {
    return this.listProducts({}, "newest", page, limit);
  }

  async getCategoryProducts(
    categoryId: string,
    page = 1,
    limit = 10,
  ): Promise<PaginationResult<Product>> {
    return this.listProducts({ categoryId }, "newest", page, limit);
  }

  async searchProducts(query: string, page = 1, limit = 10): Promise<PaginationResult<Product>> {
    return this.listProducts({ search: query }, "newest", page, limit);
  }

  // ==========================================
  // Variant Actions
  // ==========================================

  async createVariant(productId: string, data: CreateVariantDTO, user?: UserContext): Promise<ProductVariant> {
    const product = await this.repository.findProductById(productId);
    if (!product || product.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }

    this.verifyOwnership(product, user);

    const existingSku = await this.repository.findVariantBySku(data.sku);
    if (existingSku) {
      throw new AppError("A variant with this SKU already exists", 409);
    }

    if (data.barcode) {
      const existingBarcode = await this.repository.findVariantByBarcode(data.barcode);
      if (existingBarcode) {
        throw new AppError("A variant with this barcode already exists", 409);
      }
    }

    return this.repository.createVariant(productId, data);
  }

  async updateVariant(variantId: string, data: UpdateVariantDTO, user?: UserContext): Promise<ProductVariant> {
    const variant = await this.repository.findVariantById(variantId);
    if (!variant) throw new AppError("Variant not found", 404);

    const product = await this.repository.findProductById(variant.productId);
    if (product) {
      this.verifyOwnership(product, user);
    }

    if (data.sku) {
      const skuConflict = await this.repository.findVariantBySku(data.sku, variantId);
      if (skuConflict) {
        throw new AppError("A variant with this SKU already exists", 409);
      }
    }

    if (data.barcode) {
      const barcodeConflict = await this.repository.findVariantByBarcode(data.barcode, variantId);
      if (barcodeConflict) {
        throw new AppError("A variant with this barcode already exists", 409);
      }
    }

    return this.repository.updateVariant(variantId, data);
  }

  async deleteVariant(variantId: string, user?: UserContext): Promise<void> {
    const variant = await this.repository.findVariantById(variantId);
    if (!variant) throw new AppError("Variant not found", 404);

    const product = await this.repository.findProductById(variant.productId);
    if (product) {
      this.verifyOwnership(product, user);
    }

    await this.repository.deleteVariant(variantId);
  }

  // ==========================================
  // Image Actions
  // ==========================================

  async uploadImage(productId: string, data: CreateImageDTO, user?: UserContext): Promise<ProductImage> {
    const product = await this.repository.findProductById(productId);
    if (!product || product.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }

    this.verifyOwnership(product, user);

    return this.repository.createImage(productId, data);
  }

  async deleteImage(imageId: string, user?: UserContext): Promise<void> {
    const image = await this.repository.findImageById(imageId);
    if (!image) throw new AppError("Image not found", 404);

    const product = await this.repository.findProductById(image.productId);
    if (product) {
      this.verifyOwnership(product, user);
    }

    await this.repository.deleteImage(imageId);
  }

  async setPrimaryImage(imageId: string, productId: string, user?: UserContext): Promise<void> {
    const product = await this.repository.findProductById(productId);
    if (!product || product.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }

    this.verifyOwnership(product, user);

    const image = await this.repository.findImageById(imageId);
    if (!image || image.productId !== productId) {
      throw new AppError("Image not found for this product", 404);
    }

    await this.repository.setImagePrimary(imageId, productId);
  }

  // ==========================================
  // Collection Actions
  // ==========================================

  async createCollection(data: CreateCollectionDTO): Promise<Collection> {
    const existing = await this.repository.findCollectionBySlug(data.slug);
    if (existing) {
      throw new AppError("A collection with this slug already exists", 409);
    }
    return this.repository.createCollection(data);
  }

  async updateCollection(collectionId: string, data: UpdateCollectionDTO): Promise<Collection> {
    const collection = await this.repository.findCollectionById(collectionId);
    if (!collection) throw new AppError("Collection not found", 404);

    if (data.slug && data.slug !== collection.slug) {
      const existing = await this.repository.findCollectionBySlug(data.slug);
      if (existing) {
        throw new AppError("A collection with this slug already exists", 409);
      }
    }

    return this.repository.updateCollection(collectionId, data);
  }

  async deleteCollection(collectionId: string): Promise<void> {
    const collection = await this.repository.findCollectionById(collectionId);
    if (!collection) throw new AppError("Collection not found", 404);
    await this.repository.deleteCollection(collectionId);
  }

  async assignProductToCollection(productId: string, collectionId: string, user?: UserContext): Promise<void> {
    const product = await this.repository.findProductById(productId);
    if (!product || product.status === ProductStatus.ARCHIVED) {
      throw new AppError("Product not found", 404);
    }

    this.verifyOwnership(product, user);

    const collection = await this.repository.findCollectionById(collectionId);
    if (!collection) throw new AppError("Collection not found", 404);

    await this.repository.assignToCollection(productId, collectionId);
  }

  async removeProductFromCollection(productId: string, collectionId: string, user?: UserContext): Promise<void> {
    const product = await this.repository.findProductById(productId);
    if (product) {
      this.verifyOwnership(product, user);
    }
    await this.repository.removeFromCollection(productId, collectionId);
  }

  // ==========================================
  // CSV Import Operations
  // ==========================================

  async validateCsvImport(rows: Record<string, any>[]): Promise<{
    summary: {
      totalRows: number;
      validRows: number;
      invalidRows: number;
      duplicateSkus: number;
      missingCategories: number;
    };
    errors: Array<{ row: number; sku: string; field: string; message: string; value: any }>;
    validProducts: any[];
  }> {
    const categories = await this.repository.findAllCategories();
    const categoryMap = new Map<string, string>();

    for (const c of categories) {
      categoryMap.set(c.name.toLowerCase().trim(), c.id);
      categoryMap.set(c.slug.toLowerCase().trim(), c.id);
    }

    const rawSkus = rows.map((r) => String(r.sku || r.SKU || "").trim()).filter(Boolean);
    const existingDbSkus = new Set(await this.repository.findExistingSkus(rawSkus));

    const defaultVendorId = await this.repository.findDefaultVendorId();

    const errors: Array<{ row: number; sku: string; field: string; message: string; value: any }> = [];
    const validProducts: any[] = [];
    const seenCsvSkus = new Set<string>();

    let duplicateSkuCount = 0;
    let missingCategoryCount = 0;

    rows.forEach((row, index) => {
      const rowNum = index + 1;
      const name = String(row.name || row["Product Name"] || "").trim();
      const sku = String(row.sku || row.SKU || "").trim();
      const categoryName = String(row.category || row.Category || "").trim();
      const priceVal = parseFloat(row.price || row["Selling Price"] || row.Price);
      const mrpVal = row.compareAtPrice || row.MRP || row["Compare At Price"] ? parseFloat(row.compareAtPrice || row.MRP || row["Compare At Price"]) : undefined;
      const stockVal = parseInt(row.stock || row.Stock || row.availableStock || "0", 10);
      const description = String(row.description || row.Description || "").trim();
      const shortDescription = String(row.shortDescription || row["Short Description"] || "").trim();
      const seoTitle = String(row.seoTitle || row["SEO Title"] || "").trim();
      const seoDescription = String(row.seoDescription || row["SEO Description"] || "").trim();
      const weightVal = row.weight || row["Weight (g)"] ? parseFloat(row.weight || row["Weight (g)"]) : undefined;
      const featured = String(row.featured || row.Featured || "").toLowerCase() === "true" || row.featured === true;
      const statusRaw = String(row.status || row.Status || "ACTIVE").toUpperCase().trim();

      // Collect image URLs
      const images: string[] = [];
      ["image_1", "image_2", "image_3", "image_4", "image_5", "image", "images"].forEach((imgKey) => {
        if (row[imgKey] && typeof row[imgKey] === "string" && row[imgKey].trim().startsWith("http")) {
          images.push(row[imgKey].trim());
        }
      });

      let hasError = false;

      if (!name) {
        errors.push({ row: rowNum, sku, field: "name", message: "Product Name is required", value: name });
        hasError = true;
      }

      if (!sku) {
        errors.push({ row: rowNum, sku, field: "sku", message: "SKU is required", value: sku });
        hasError = true;
      } else if (existingDbSkus.has(sku)) {
        errors.push({ row: rowNum, sku, field: "sku", message: `SKU "${sku}" already exists in database`, value: sku });
        duplicateSkuCount++;
        hasError = true;
      } else if (seenCsvSkus.has(sku)) {
        errors.push({ row: rowNum, sku, field: "sku", message: `Duplicate SKU "${sku}" found within CSV file`, value: sku });
        duplicateSkuCount++;
        hasError = true;
      } else {
        seenCsvSkus.add(sku);
      }

      const normalizedCat = categoryName.toLowerCase().trim();
      const matchedCategoryId = categoryMap.get(normalizedCat);
      if (!matchedCategoryId) {
        errors.push({ row: rowNum, sku, field: "category", message: `Category "${categoryName}" not found in store hierarchy`, value: categoryName });
        missingCategoryCount++;
        hasError = true;
      }

      if (isNaN(priceVal) || priceVal <= 0) {
        errors.push({ row: rowNum, sku, field: "price", message: "Selling price must be a valid positive number (> 0)", value: row.price });
        hasError = true;
      }

      if (mrpVal !== undefined && (isNaN(mrpVal) || mrpVal < priceVal)) {
        errors.push({ row: rowNum, sku, field: "compareAtPrice", message: "MRP must be greater than or equal to Selling Price", value: row.mrp });
        hasError = true;
      }

      if (isNaN(stockVal) || stockVal < 0) {
        errors.push({ row: rowNum, sku, field: "stock", message: "Stock quantity must be a non-negative integer (>= 0)", value: row.stock });
        hasError = true;
      }

      if (!hasError && matchedCategoryId) {
        const slug = this.generateSlug(name) + "-" + Math.random().toString(36).substring(2, 6);
        let status: any = "ACTIVE";
        if (["DRAFT", "ARCHIVED", "OUT_OF_STOCK"].includes(statusRaw)) {
          status = statusRaw;
        }

        validProducts.push({
          name,
          slug,
          sku,
          categoryId: matchedCategoryId,
          vendorId: defaultVendorId,
          price: priceVal,
          compareAtPrice: mrpVal,
          stock: stockVal,
          status,
          featured,
          description: description || undefined,
          shortDescription: shortDescription || undefined,
          seoTitle: seoTitle || undefined,
          seoDescription: seoDescription || undefined,
          weight: weightVal,
          images,
        });
      }
    });

    return {
      summary: {
        totalRows: rows.length,
        validRows: validProducts.length,
        invalidRows: rows.length - validProducts.length,
        duplicateSkus: duplicateSkuCount,
        missingCategories: missingCategoryCount,
      },
      errors,
      validProducts,
    };
  }

  async executeCsvImport(validProducts: any[]): Promise<{
    createdCount: number;
    failedCount: number;
  }> {
    if (!validProducts || validProducts.length === 0) {
      throw new AppError("No valid products provided for import execution", 400);
    }

    const createdCount = await this.repository.batchImportProducts(validProducts);
    return {
      createdCount,
      failedCount: validProducts.length - createdCount,
    };
  }
}
