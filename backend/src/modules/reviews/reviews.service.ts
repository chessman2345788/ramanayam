import { ReviewsRepository } from "./reviews.repository";
import { CreateReviewInput, UpdateReviewInput, ReviewQueryFilters } from "./reviews.types";
import { AppError } from "../../common/errors";
import { ProductStatus, UserRole } from "@prisma/client";

export class ReviewsService {
  constructor(private repository: ReviewsRepository) {}

  async createReview(userId: string, input: CreateReviewInput) {
    if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
      throw new AppError("Rating must be an integer between 1 and 5", 400);
    }

    const product = await this.repository.findProductById(input.productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (product.status !== ProductStatus.ACTIVE) {
      throw new AppError("Cannot review an inactive or archived product", 400);
    }

    // Enforce business rule: One review per user per product
    const existingReview = await this.repository.findUserProductReview(userId, input.productId);
    if (existingReview) {
      throw new AppError("You have already reviewed this product. You can update your existing review instead.", 400);
    }

    const isVerifiedPurchase = await this.repository.checkVerifiedPurchase(userId, input.productId);
    const review = await this.repository.createReview(userId, input);

    return {
      ...review,
      isVerifiedPurchase,
    };
  }

  async getReviews(filters: ReviewQueryFilters) {
    const result = await this.repository.findReviews(filters);

    const formattedData = await Promise.all(
      result.data.map(async (review) => {
        const isVerifiedPurchase = await this.repository.checkVerifiedPurchase(review.userId, review.productId);
        return {
          ...review,
          isVerifiedPurchase,
        };
      }),
    );

    return {
      ...result,
      data: formattedData,
    };
  }

  async getReviewById(id: string) {
    const review = await this.repository.findById(id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    const isVerifiedPurchase = await this.repository.checkVerifiedPurchase(review.userId, review.productId);
    return {
      ...review,
      isVerifiedPurchase,
    };
  }

  async getProductReviews(productId: string, filters: ReviewQueryFilters) {
    const product = await this.repository.findProductById(productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const mergedFilters = { ...filters, productId };
    const [reviewsResult, metrics] = await Promise.all([
      this.getReviews(mergedFilters),
      this.repository.getProductRatingMetrics(productId),
    ]);

    return {
      ...reviewsResult,
      metrics,
    };
  }

  async updateReview(id: string, userId: string, input: UpdateReviewInput) {
    const existingReview = await this.repository.findById(id);
    if (!existingReview) {
      throw new AppError("Review not found", 404);
    }

    // IDOR ownership check
    if (existingReview.userId !== userId) {
      throw new AppError("Forbidden: You can only edit your own reviews", 403);
    }

    if (input.rating !== undefined) {
      if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
        throw new AppError("Rating must be an integer between 1 and 5", 400);
      }
    }

    const updatedReview = await this.repository.updateReview(id, input);
    const isVerifiedPurchase = await this.repository.checkVerifiedPurchase(userId, updatedReview.productId);

    return {
      ...updatedReview,
      isVerifiedPurchase,
    };
  }

  async deleteReview(id: string, userId: string, userRole?: string) {
    const existingReview = await this.repository.findById(id);
    if (!existingReview) {
      throw new AppError("Review not found", 404);
    }

    // IDOR ownership check: user must own the review, or be an ADMIN
    if (existingReview.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new AppError("Forbidden: You do not have permission to delete this review", 403);
    }

    await this.repository.deleteReview(id);
    return { message: "Review deleted successfully" };
  }
}
