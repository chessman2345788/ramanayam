export interface CreateReviewInput {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

export interface ReviewQueryFilters {
  productId?: string;
  userId?: string;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "rating";
  sortOrder?: "asc" | "desc";
}

export interface FormattedReviewUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
}

export interface FormattedReviewProduct {
  id: string;
  name: string;
  slug: string;
}

export interface FormattedReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: FormattedReviewUser;
  product?: FormattedReviewProduct;
}

export interface ProductReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: Record<number, number>;
}
