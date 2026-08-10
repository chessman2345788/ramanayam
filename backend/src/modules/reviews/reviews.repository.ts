import { PrismaClient, OrderStatus } from "@prisma/client";
import { ReviewQueryFilters, CreateReviewInput, UpdateReviewInput } from "./reviews.types";

export class ReviewsRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  async findProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, slug: true, status: true },
    });
  }

  async findUserProductReview(userId: string, productId: string) {
    return this.prisma.review.findFirst({
      where: { userId, productId },
    });
  }

  async checkVerifiedPurchase(userId: string, productId: string): Promise<boolean> {
    const matchingOrder = await this.prisma.order.findFirst({
      where: {
        userId,
        status: {
          in: [OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED],
        },
        orderItems: {
          some: {
            productVariant: {
              productId,
            },
          },
        },
      },
      select: { id: true },
    });

    return !!matchingOrder;
  }

  async createReview(userId: string, input: CreateReviewInput) {
    return this.prisma.review.create({
      data: {
        userId,
        productId: input.productId,
        rating: input.rating,
        comment: input.comment ? input.comment.trim() : null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  async updateReview(id: string, input: UpdateReviewInput) {
    return this.prisma.review.update({
      where: { id },
      data: {
        ...(input.rating !== undefined && { rating: input.rating }),
        ...(input.comment !== undefined && { comment: input.comment ? input.comment.trim() : null }),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  async deleteReview(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }

  async findReviews(filters: ReviewQueryFilters) {
    const { productId, userId, rating, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (productId) whereClause.productId = productId;
    if (userId) whereClause.userId = userId;
    if (rating) whereClause.rating = rating;

    const orderByClause: any = {};
    orderByClause[sortBy] = sortOrder;

    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: orderByClause,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prisma.review.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getProductRatingMetrics(productId: string) {
    const [aggregate, groupRatings] = await Promise.all([
      this.prisma.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: { id: true },
      }),
      this.prisma.review.groupBy({
        by: ["rating"],
        where: { productId },
        _count: { id: true },
      }),
    ]);

    const averageRating = aggregate._avg.rating ? Number(aggregate._avg.rating.toFixed(1)) : 0;
    const totalReviews = aggregate._count.id || 0;

    const ratingBreakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const group of groupRatings) {
      ratingBreakdown[group.rating] = group._count.id;
    }

    return { averageRating, totalReviews, ratingBreakdown };
  }
}
