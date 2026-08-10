import { PrismaClient, Product, ProductVariant, ProductImage, Collection, ProductStatus, Prisma } from "@prisma/client";

export interface ProductFilters {
  status?: ProductStatus;
  categoryId?: string;
  vendorId?: string;
  featured?: boolean;
  availability?: boolean | string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CreateProductDTO {
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  categoryId: string;
  vendorId: string;
  status?: ProductStatus;
  featured?: boolean;
  publishedAt?: Date | string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface UpdateProductDTO {
  name?: string;
  slug?: string;
  shortDescription?: string | null;
  description?: string | null;
  categoryId?: string;
  vendorId?: string;
  status?: ProductStatus;
  featured?: boolean;
  publishedAt?: Date | string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface CreateVariantDTO {
  sku: string;
  barcode?: string | null;
  variantName: string;
  price: number;
  compareAtPrice?: number | null;
  costPrice?: number | null;
  weight?: number | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  isDefault?: boolean;
  isActive?: boolean;
  stock?: number;
}

export interface UpdateVariantDTO {
  sku?: string;
  barcode?: string | null;
  variantName?: string;
  price?: number;
  compareAtPrice?: number | null;
  costPrice?: number | null;
  weight?: number | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  isDefault?: boolean;
  isActive?: boolean;
  stock?: number;
}

export interface CreateImageDTO {
  imageUrl: string;
  altText?: string | null;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface CreateCollectionDTO {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive?: boolean;
}

export interface UpdateCollectionDTO {
  name?: string;
  slug?: string;
  description?: string | null;
  image?: string | null;
  isActive?: boolean;
}

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async checkCategoryExists(id: string): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!category;
  }

  async checkVendorExists(id: string): Promise<boolean> {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!vendor;
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: data.description,
        categoryId: data.categoryId,
        vendorId: data.vendorId,
        status: data.status,
        featured: data.featured,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      },
      include: {
        variants: { include: { inventory: true } },
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        vendor: true,
      },
    });
  }

  async updateProduct(id: string, data: UpdateProductDTO): Promise<Product> {
    const updateData: Prisma.ProductUpdateInput = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.publishedAt !== undefined) updateData.publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
    if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle;
    if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription;

    if (data.categoryId) {
      updateData.category = { connect: { id: data.categoryId } };
    }
    if (data.vendorId) {
      updateData.vendor = { connect: { id: data.vendorId } };
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        variants: { include: { inventory: true } },
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        vendor: true,
      },
    });
  }

  async softDeleteProduct(id: string): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.ARCHIVED },
    });
  }

  async findProductById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        variants: { include: { inventory: true } },
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        vendor: true,
        collections: { include: { collection: true } },
      },
    });
  }

  async findProductBySlug(slug: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        variants: { include: { inventory: true } },
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        vendor: true,
        collections: { include: { collection: true } },
      },
    });
  }

  async findProductBySlugExcluding(slug: string, excludeId: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        slug,
        id: { not: excludeId },
      },
    });
  }

  async findProducts(
    filters: ProductFilters,
    sort: string,
    skip: number,
    limit: number,
  ): Promise<{ data: Product[]; total: number }> {
    const where: Prisma.ProductWhereInput = {};

    if (filters.status) {
      where.status = filters.status;
    } else {
      where.NOT = { status: ProductStatus.ARCHIVED };
    }

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.vendorId) where.vendorId = filters.vendorId;
    if (filters.featured !== undefined) where.featured = filters.featured;

    if (filters.availability === true || filters.availability === "true") {
      where.variants = {
        some: {
          isActive: true,
          inventory: { availableStock: { gt: 0 } },
        },
      };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const priceFilter: Prisma.DecimalFilter = {};
      if (filters.minPrice !== undefined) priceFilter.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) priceFilter.lte = filters.maxPrice;

      where.variants = {
        ...(where.variants || {}),
        some: {
          ...((where.variants as any)?.some || {}),
          price: priceFilter,
        },
      };
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { shortDescription: { contains: filters.search, mode: "insensitive" } },
        { slug: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (sort === "popularity" || sort === "bestseller") {
      orderBy = { reviews: { _count: "desc" } };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          variants: { include: { inventory: true } },
          images: { orderBy: { sortOrder: "asc" } },
          category: true,
          vendor: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    if (sort === "price-asc" || sort === "price_asc") {
      data.sort((a, b) => {
        const minA = Math.min(...(a as any).variants.map((v: any) => Number(v.price) || 0), 0);
        const minB = Math.min(...(b as any).variants.map((v: any) => Number(v.price) || 0), 0);
        return minA - minB;
      });
    } else if (sort === "price-desc" || sort === "price_desc") {
      data.sort((a, b) => {
        const maxA = Math.max(...(a as any).variants.map((v: any) => Number(v.price) || 0), 0);
        const maxB = Math.max(...(b as any).variants.map((v: any) => Number(v.price) || 0), 0);
        return maxB - maxA;
      });
    }

    return { data, total };
  }

  // ==========================================
  // Variant Operations
  // ==========================================

  async findVariantBySku(sku: string, excludeId?: string): Promise<ProductVariant | null> {
    return this.prisma.productVariant.findFirst({
      where: {
        sku,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
  }

  async findVariantByBarcode(barcode: string, excludeId?: string): Promise<ProductVariant | null> {
    return this.prisma.productVariant.findFirst({
      where: {
        barcode,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
  }

  async unsetOtherDefaultVariants(productId: string, excludeVariantId?: string): Promise<void> {
    await this.prisma.productVariant.updateMany({
      where: {
        productId,
        isDefault: true,
        ...(excludeVariantId ? { id: { not: excludeVariantId } } : {}),
      },
      data: { isDefault: false },
    });
  }

  async createVariant(productId: string, data: CreateVariantDTO): Promise<ProductVariant> {
    if (data.isDefault) {
      await this.unsetOtherDefaultVariants(productId);
    }

    const { stock, ...variantData } = data;

    return this.prisma.productVariant.create({
      data: {
        ...variantData,
        productId,
        ...(stock !== undefined && {
          inventory: {
            create: { availableStock: stock },
          },
        }),
      },
      include: { inventory: true },
    });
  }

  async updateVariant(id: string, data: UpdateVariantDTO): Promise<ProductVariant> {
    const { stock, ...variantData } = data;
    const existing = await this.findVariantById(id);

    if (data.isDefault && existing) {
      await this.unsetOtherDefaultVariants(existing.productId, id);
    }

    if (stock !== undefined && existing) {
      return this.prisma.productVariant.update({
        where: { id },
        data: {
          ...variantData,
          inventory: {
            upsert: {
              create: { availableStock: stock },
              update: { availableStock: stock },
            },
          },
        },
        include: { inventory: true },
      });
    }

    return this.prisma.productVariant.update({
      where: { id },
      data: variantData,
      include: { inventory: true },
    });
  }

  async deleteVariant(id: string): Promise<ProductVariant> {
    return this.prisma.productVariant.delete({ where: { id } });
  }

  async findVariantById(id: string): Promise<ProductVariant | null> {
    return this.prisma.productVariant.findUnique({
      where: { id },
      include: { inventory: true },
    });
  }

  // ==========================================
  // Image Operations
  // ==========================================

  async createImage(productId: string, data: CreateImageDTO): Promise<ProductImage> {
    if (data.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: { productId, isPrimary: true },
        data: { isPrimary: false },
      });
    }
    return this.prisma.productImage.create({
      data: {
        imageUrl: data.imageUrl,
        altText: data.altText,
        isPrimary: data.isPrimary ?? false,
        sortOrder: data.sortOrder ?? 0,
        productId,
      },
    });
  }

  async findImageById(id: string): Promise<ProductImage | null> {
    return this.prisma.productImage.findUnique({ where: { id } });
  }

  async deleteImage(id: string): Promise<ProductImage> {
    return this.prisma.productImage.delete({ where: { id } });
  }

  async setImagePrimary(imageId: string, productId: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.productImage.updateMany({
        where: { productId, isPrimary: true },
        data: { isPrimary: false },
      }),
      this.prisma.productImage.update({
        where: { id: imageId },
        data: { isPrimary: true },
      }),
    ]);
  }

  // ==========================================
  // Collection Operations
  // ==========================================

  async findCollectionBySlug(slug: string): Promise<Collection | null> {
    return this.prisma.collection.findUnique({ where: { slug } });
  }

  async createCollection(data: CreateCollectionDTO): Promise<Collection> {
    return this.prisma.collection.create({ data });
  }

  async updateCollection(id: string, data: UpdateCollectionDTO): Promise<Collection> {
    return this.prisma.collection.update({ where: { id }, data });
  }

  async deleteCollection(id: string): Promise<Collection> {
    return this.prisma.collection.delete({ where: { id } });
  }

  async findCollectionById(id: string): Promise<Collection | null> {
    return this.prisma.collection.findUnique({ where: { id } });
  }

  async assignToCollection(productId: string, collectionId: string): Promise<any> {
    return this.prisma.productCollection.upsert({
      where: { productId_collectionId: { productId, collectionId } },
      create: { productId, collectionId },
      update: {},
    });
  }

  async removeFromCollection(productId: string, collectionId: string): Promise<any> {
    return this.prisma.productCollection.delete({
      where: { productId_collectionId: { productId, collectionId } },
    });
  }
}
