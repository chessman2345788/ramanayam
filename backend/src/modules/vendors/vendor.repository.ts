import { PrismaClient, VendorStatus, ProductStatus } from "@prisma/client";
import { CreateVendorInput, UpdateVendorInput, VendorQueryFilters } from "./vendor.types";

export class VendorsRepository {
  constructor(private prisma: PrismaClient) {}

  async findActiveVendors(filters: VendorQueryFilters) {
    const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {
      status: VendorStatus.ACTIVE,
    };

    if (search) {
      whereClause.OR = [
        { businessName: { contains: search, mode: "insensitive" } },
        { ownerName: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          businessName: true,
          slug: true,
          ownerName: true,
          logo: true,
          banner: true,
          description: true,
          status: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: { products: { where: { status: ProductStatus.ACTIVE } } },
          },
        },
      }),
      this.prisma.vendor.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    return this.prisma.vendor.findUnique({
      where: { id },
      select: {
        id: true,
        businessName: true,
        slug: true,
        ownerName: true,
        email: true,
        phone: true,
        logo: true,
        banner: true,
        description: true,
        gstNumber: true,
        panNumber: true,
        status: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.vendor.findUnique({
      where: { slug },
      select: {
        id: true,
        businessName: true,
        slug: true,
        ownerName: true,
        email: true,
        phone: true,
        logo: true,
        banner: true,
        description: true,
        gstNumber: true,
        panNumber: true,
        status: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.vendor.findUnique({
      where: { email },
    });
  }

  async findDuplicateVendor(data: { email: string; phone: string; gstNumber?: string; panNumber?: string }) {
    const conditions: any[] = [{ email: data.email }, { phone: data.phone }];
    if (data.gstNumber) conditions.push({ gstNumber: data.gstNumber });
    if (data.panNumber) conditions.push({ panNumber: data.panNumber });

    return this.prisma.vendor.findFirst({
      where: {
        OR: conditions,
      },
    });
  }

  async findVendorProducts(vendorId: string, filters: { page?: number; limit?: number; status?: ProductStatus; search?: string }) {
    const { page = 1, limit = 10, status, search } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = { vendorId };
    if (status) whereClause.status = status;
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          featured: true,
          createdAt: true,
          updatedAt: true,
          images: { where: { isPrimary: true }, take: 1, select: { imageUrl: true } },
          variants: { take: 1, select: { id: true, price: true, compareAtPrice: true } },
        },
      }),
      this.prisma.product.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async createVendor(data: CreateVendorInput & { slug: string }) {
    return this.prisma.vendor.create({
      data: {
        businessName: data.businessName.trim(),
        slug: data.slug,
        ownerName: data.ownerName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        description: data.description ? data.description.trim() : null,
        logo: data.logo || null,
        banner: data.banner || null,
        gstNumber: data.gstNumber ? data.gstNumber.toUpperCase().trim() : null,
        panNumber: data.panNumber ? data.panNumber.toUpperCase().trim() : null,
        status: VendorStatus.PENDING,
        isVerified: false,
      },
    });
  }

  async updateVendor(id: string, data: UpdateVendorInput) {
    return this.prisma.vendor.update({
      where: { id },
      data: {
        ...(data.businessName && { businessName: data.businessName.trim() }),
        ...(data.description !== undefined && { description: data.description ? data.description.trim() : null }),
        ...(data.logo !== undefined && { logo: data.logo || null }),
        ...(data.banner !== undefined && { banner: data.banner || null }),
        ...(data.gstNumber !== undefined && { gstNumber: data.gstNumber ? data.gstNumber.toUpperCase().trim() : null }),
        ...(data.panNumber !== undefined && { panNumber: data.panNumber ? data.panNumber.toUpperCase().trim() : null }),
        ...(data.phone && { phone: data.phone.trim() }),
      },
    });
  }

  async updateVendorStatus(id: string, status: VendorStatus) {
    return this.prisma.vendor.update({
      where: { id },
      data: { status },
    });
  }

  async updateVendorVerification(id: string, isVerified: boolean) {
    return this.prisma.vendor.update({
      where: { id },
      data: { isVerified },
    });
  }

  async findAllVendorsAdmin(filters: VendorQueryFilters) {
    const { page = 1, limit = 10, status, isVerified, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (isVerified !== undefined) whereClause.isVerified = isVerified;

    if (search) {
      whereClause.OR = [
        { businessName: { contains: search, mode: "insensitive" } },
        { ownerName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          businessName: true,
          slug: true,
          ownerName: true,
          email: true,
          phone: true,
          status: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { products: true },
          },
        },
      }),
      this.prisma.vendor.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
