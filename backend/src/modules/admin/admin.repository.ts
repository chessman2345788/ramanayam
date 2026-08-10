import { PrismaClient, OrderStatus, UserRole, AccountStatus } from "@prisma/client";
import {
  UserQueryFilters,
  ProductQueryFilters,
  OrderQueryFilters,
  PaymentQueryFilters,
  ReviewQueryFilters,
  UpdateUserRoleInput,
  UpdateProductInput,
  UpdateReviewInput,
} from "./admin.types";

export class AdminRepository {
  constructor(private prisma: PrismaClient) {}

  async getDashboardOverview() {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      revenueAggregate,
      recentOrders,
      lowStockItems,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        where: { status: { in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          totalAmount: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.inventory.findMany({
        where: {
          availableStock: { lte: 5 },
        },
        take: 10,
        select: {
          id: true,
          availableStock: true,
          reservedStock: true,
          variant: {
            select: {
              id: true,
              sku: true,
              variantName: true,
              price: true,
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const totalRevenue = revenueAggregate._sum.totalAmount ? Number(revenueAggregate._sum.totalAmount) : 0;

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      lowStockItems,
    };
  }

  async getStats() {
    const [orderGroups, roleGroups, statusGroups, paymentGroups] = await Promise.all([
      this.prisma.order.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      this.prisma.user.groupBy({
        by: ["role"],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.user.groupBy({
        by: ["accountStatus"],
        where: { deletedAt: null },
        _count: { id: true },
      }),
      this.prisma.payment.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

    const orderStatusCounts: Record<string, number> = {};
    for (const group of orderGroups) {
      orderStatusCounts[group.status] = group._count.id;
    }

    const userRoleCounts: Record<string, number> = {};
    for (const group of roleGroups) {
      userRoleCounts[group.role] = group._count.id;
    }

    const userStatusCounts: Record<string, number> = {};
    for (const group of statusGroups) {
      userStatusCounts[group.accountStatus] = group._count.id;
    }

    const paymentStatusCounts: Record<string, number> = {};
    for (const group of paymentGroups) {
      paymentStatusCounts[group.status] = group._count.id;
    }

    return {
      orderStatusCounts,
      userRoleCounts,
      userStatusCounts,
      paymentStatusCounts,
    };
  }

  async countActiveAdmins(): Promise<number> {
    return this.prisma.user.count({
      where: {
        role: UserRole.ADMIN,
        accountStatus: AccountStatus.ACTIVE,
        deletedAt: null,
      },
    });
  }

  async findUsers(filters: UserQueryFilters) {
    const { page = 1, limit = 10, role, accountStatus, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = { deletedAt: null };
    if (role) whereClause.role = role;
    if (accountStatus) whereClause.accountStatus = accountStatus;

    if (search) {
      whereClause.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          accountStatus: true,
          emailVerified: true,
          phoneVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { orders: true, reviews: true },
          },
        },
      }),
      this.prisma.user.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        accountStatus: true,
        emailVerified: true,
        phoneVerified: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
        orders: {
          take: 10,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            status: true,
            totalAmount: true,
            createdAt: true,
          },
        },
        _count: {
          select: { orders: true, reviews: true },
        },
      },
    });
  }

  async updateUser(id: string, input: UpdateUserRoleInput) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(input.role && { role: input.role }),
        ...(input.firstName && { firstName: input.firstName }),
        ...(input.lastName && { lastName: input.lastName }),
        ...(input.accountStatus && { accountStatus: input.accountStatus }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        accountStatus: true,
        updatedAt: true,
      },
    });
  }

  async updateUserStatus(id: string, accountStatus: AccountStatus) {
    return this.prisma.user.update({
      where: { id },
      data: { accountStatus },
      select: {
        id: true,
        email: true,
        role: true,
        accountStatus: true,
        updatedAt: true,
      },
    });
  }

  async findProducts(filters: ProductQueryFilters) {
    const { page = 1, limit = 10, status, categoryId, vendorId, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (categoryId) whereClause.categoryId = categoryId;
    if (vendorId) whereClause.vendorId = vendorId;

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          featured: true,
          createdAt: true,
          updatedAt: true,
          category: { select: { id: true, name: true, slug: true } },
          vendor: { select: { id: true, businessName: true, slug: true } },
          images: { where: { isPrimary: true }, take: 1, select: { imageUrl: true } },
          variants: {
            take: 1,
            select: { id: true, price: true, compareAtPrice: true },
          },
        },
      }),
      this.prisma.product.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateProduct(id: string, input: UpdateProductInput) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...(input.status && { status: input.status }),
        ...(input.featured !== undefined && { featured: input.featured }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        featured: true,
        updatedAt: true,
      },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async findOrders(filters: OrderQueryFilters) {
    const { page = 1, limit = 10, status, userId, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (userId) whereClause.userId = userId;

    if (search) {
      whereClause.id = { contains: search, mode: "insensitive" };
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          totalAmount: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          payments: {
            select: {
              id: true,
              status: true,
              provider: true,
              transactionId: true,
            },
          },
          _count: {
            select: { orderItems: true },
          },
        },
      }),
      this.prisma.order.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        updatedAt: true,
      },
    });
  }

  async findPayments(filters: PaymentQueryFilters) {
    const { page = 1, limit = 10, status, provider, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (provider) whereClause.provider = { equals: provider, mode: "insensitive" };

    if (search) {
      whereClause.OR = [
        { id: { contains: search, mode: "insensitive" } },
        { transactionId: { contains: search, mode: "insensitive" } },
        { orderId: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          orderId: true,
          transactionId: true,
          amount: true,
          provider: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          order: {
            select: {
              id: true,
              status: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.payment.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findReviews(filters: ReviewQueryFilters) {
    const { page = 1, limit = 10, rating, productId, userId, search, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (rating) whereClause.rating = rating;
    if (productId) whereClause.productId = productId;
    if (userId) whereClause.userId = userId;

    if (search) {
      whereClause.comment = { contains: search, mode: "insensitive" };
    }

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        select: {
          id: true,
          productId: true,
          userId: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
          product: { select: { id: true, name: true, slug: true } },
        },
      }),
      this.prisma.review.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateReview(id: string, input: UpdateReviewInput) {
    return this.prisma.review.update({
      where: { id },
      data: {
        ...(input.rating !== undefined && { rating: input.rating }),
        ...(input.comment !== undefined && { comment: input.comment ? input.comment.trim() : null }),
      },
    });
  }

  async deleteReview(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
