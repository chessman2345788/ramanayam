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
    const validLimit = Math.min(Math.max(limit, 1), 50);
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
}
