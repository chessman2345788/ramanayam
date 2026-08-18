import { PrismaClient, Prisma, OrderStatus, UserRole, AccountStatus } from "@prisma/client";
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
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      activeProducts,
      totalProducts,
      totalOrders,
      pendingOrders,
      categoriesCount,
      revenueAggregate,
      todayRevenueAggregate,
      recentOrders,
      lowStockItems,
      recentUsers,
      bestSellersRaw,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.product.count({ where: { status: "ACTIVE" } }),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      this.prisma.category.count({ where: { isActive: true } }),
      this.prisma.order.aggregate({
        where: { status: { in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] } },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.aggregate({
        where: {
          status: { in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
          createdAt: { gte: startOfToday },
        },
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
              profileImage: true,
            },
          },
          payments: {
            select: {
              provider: true,
            },
            take: 1,
          },
        },
      }),
      this.prisma.inventory.findMany({
        where: {
          availableStock: { lte: 10 },
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
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.user.findMany({
        where: { deletedAt: null },
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
          createdAt: true,
          _count: {
            select: { orders: true },
          },
        },
      }),
      this.prisma.product.findMany({
        where: { status: "ACTIVE", featured: true },
        take: 4,
        select: {
          id: true,
          name: true,
          category: { select: { name: true } },
          images: { where: { isPrimary: true }, take: 1, select: { imageUrl: true } },
          variants: { take: 1, select: { price: true } },
          reviews: { select: { rating: true } },
          _count: { select: { reviews: true } },
        },
      }),
    ]);

    const totalRevenue = revenueAggregate._sum.totalAmount ? Number(revenueAggregate._sum.totalAmount) : 0;
    const todayRevenue = todayRevenueAggregate._sum.totalAmount ? Number(todayRevenueAggregate._sum.totalAmount) : 0;

    return {
      totalUsers,
      activeProducts,
      totalProducts,
      totalOrders,
      pendingOrders,
      categoriesCount,
      totalRevenue,
      todayRevenue,
      lowStockCount: lowStockItems.length,
      recentOrders: recentOrders.map((o) => ({
        id: `RM-${o.id.slice(0, 6).toUpperCase()}`,
        customerName: `${o.user.firstName} ${o.user.lastName}`,
        customerEmail: o.user.email,
        avatarUrl: o.user.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        amount: `₹${Number(o.totalAmount).toLocaleString("en-IN")}`,
        paymentMode: o.payments[0]?.provider || "UPI",
        status: o.status === "DELIVERED" ? "Completed" : o.status === "PENDING" ? "Pending" : o.status === "CANCELLED" ? "Cancelled" : "Processing",
        date: new Date(o.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      })),
      lowStockItems: lowStockItems.map((inv) => ({
        id: inv.id,
        name: `${inv.variant.product.name} (${inv.variant.variantName})`,
        sku: inv.variant.sku,
        stock: inv.availableStock,
        category: inv.variant.product.category.name,
      })),
      recentCustomers: recentUsers.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        avatarUrl: u.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        joinedDate: new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        ordersCount: u._count.orders,
      })),
      bestSellers: bestSellersRaw.map((p) => {
        const avgRating = p.reviews.length > 0 ? (p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length).toFixed(1) : "5.0";
        return {
          id: p.id,
          name: p.name,
          category: p.category.name,
          salesCount: 0,
          revenue: "₹0",
          rating: Number(avgRating),
          imageUrl: p.images[0]?.imageUrl || "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=300&auto=format&fit=crop&q=80",
        };
      }),
      revenueMonthly: [
        { date: "Jan", revenue: 0, orders: 0 },
        { date: "Feb", revenue: 0, orders: 0 },
        { date: "Mar", revenue: 0, orders: 0 },
        { date: "Apr", revenue: 0, orders: 0 },
        { date: "May", revenue: 0, orders: 0 },
        { date: "Jun", revenue: 0, orders: 0 },
      ],
      revenueWeekly: [
        { date: "Mon", revenue: 0, orders: 0 },
        { date: "Tue", revenue: 0, orders: 0 },
        { date: "Wed", revenue: 0, orders: 0 },
        { date: "Thu", revenue: 0, orders: 0 },
        { date: "Fri", revenue: 0, orders: 0 },
        { date: "Sat", revenue: 0, orders: 0 },
        { date: "Sun", revenue: 0, orders: 0 },
      ],
      revenueDaily: [
        { date: "06:00 AM", revenue: 0, orders: 0 },
        { date: "09:00 AM", revenue: 0, orders: 0 },
        { date: "12:00 PM", revenue: 0, orders: 0 },
        { date: "03:00 PM", revenue: 0, orders: 0 },
        { date: "06:00 PM", revenue: 0, orders: 0 },
        { date: "09:00 PM", revenue: 0, orders: 0 },
      ],
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

  async getAnalyticsOverview(range: string = "30days", customStart?: string, customEnd?: string) {
    const now = new Date();
    let startDate = new Date();
    let endDate = now;

    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "yesterday") {
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
    } else if (range === "7days") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === "30days") {
      startDate.setDate(startDate.getDate() - 30);
    } else if (range === "90days") {
      startDate.setDate(startDate.getDate() - 90);
    } else if (range === "this_year") {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else if (range === "custom" && customStart && customEnd) {
      startDate = new Date(customStart);
      endDate = new Date(customEnd);
    }

    const orderWhere: Prisma.OrderWhereInput = {
      createdAt: { gte: startDate, lte: endDate },
    };

    const validRevenueWhere: Prisma.OrderWhereInput = {
      ...orderWhere,
      status: { in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
    };

    const [
      revenueAgg,
      ordersCount,
      customersCount,
      orderItemsAgg,
      cancelledAgg,
      orderStatusGroups,
      paymentGroups,
      lowStockCount,
      outOfStockCount,
      couponsUsedAgg,
      totalCouponsCount,
      stateGroups,
    ] = await Promise.all([
      this.prisma.order.aggregate({
        where: validRevenueWhere,
        _sum: { totalAmount: true },
      }),
      this.prisma.order.count({ where: orderWhere }),
      this.prisma.user.count({
        where: { role: UserRole.CUSTOMER, deletedAt: null },
      }),
      this.prisma.orderItem.aggregate({
        where: { order: validRevenueWhere },
        _sum: { quantity: true },
      }),
      this.prisma.order.aggregate({
        where: { ...orderWhere, status: OrderStatus.CANCELLED },
        _sum: { totalAmount: true },
      }),
      this.prisma.order.groupBy({
        by: ["status"],
        where: orderWhere,
        _count: { id: true },
      }),
      this.prisma.payment.groupBy({
        by: ["provider"],
        _count: { id: true },
        _sum: { amount: true },
      }),
      this.prisma.inventory.count({
        where: { availableStock: { lte: 10 } },
      }),
      this.prisma.inventory.count({
        where: { availableStock: 0 },
      }),
      this.prisma.coupon.aggregate({
        _sum: { usedCount: true },
      }),
      this.prisma.coupon.count({
        where: { isActive: true },
      }),
      this.prisma.address.groupBy({
        by: ["state"],
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),
    ]);

    const totalRevenue = revenueAgg._sum.totalAmount ? Number(revenueAgg._sum.totalAmount) : 0;
    const averageOrderValue = ordersCount > 0 ? Math.round(totalRevenue / ordersCount) : 0;
    const productsSold = orderItemsAgg._sum.quantity || 0;
    const refundsIssued = cancelledAgg._sum.totalAmount ? Number(cancelledAgg._sum.totalAmount) : 0;

    const orderStatusCounts: Record<string, number> = {};
    for (const g of orderStatusGroups) {
      orderStatusCounts[g.status] = g._count.id;
    }

    const paymentMethods = paymentGroups.map((g) => ({
      provider: g.provider,
      count: g._count.id,
      amount: g._sum.amount ? Number(g._sum.amount) : 0,
    }));

    const stateDistribution = stateGroups.map((g) => ({
      state: g.state,
      count: g._count.id,
    }));

    return {
      range,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      kpis: {
        totalRevenue,
        totalOrders: ordersCount,
        averageOrderValue,
        totalCustomers: customersCount,
        productsSold,
        refundsIssued,
        discountsGiven: 0,
        conversionRate: null,
      },
      orderStatusCounts,
      paymentMethods,
      inventory: {
        lowStockCount,
        outOfStockCount,
      },
      coupons: {
        totalActive: totalCouponsCount,
        totalRedemptions: couponsUsedAgg._sum.usedCount || 0,
      },
      geography: stateDistribution,
      unavailableMetrics: [
        "conversionRate (no web traffic/session model in schema)",
        "festivalAnalytics (no festival fields on product model)",
      ],
    };
  }
}
