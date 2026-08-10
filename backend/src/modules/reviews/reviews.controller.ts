import { Request, Response } from "express";
import { ReviewsService } from "./reviews.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";
import { AppError } from "../../common/errors";

export class ReviewsController {
  constructor(private service: ReviewsService) {}

  private getUserId(req: Request): string {
    const user = (req as RequestWithUser).user;
    if (!user || !user.id) {
      throw new AppError("Authentication required", 401);
    }
    return user.id;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.getReviews(req.query as any);
    sendSuccess(res, "Reviews fetched successfully", result);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const review = await this.service.getReviewById(req.params.id);
    sendSuccess(res, "Review details fetched successfully", { review });
  };

  getByProduct = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const result = await this.service.getProductReviews(productId, req.query as any);
    sendSuccess(res, "Product reviews fetched successfully", result);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const review = await this.service.createReview(userId, req.body);
    sendSuccess(res, "Review submitted successfully", review, 201);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const review = await this.service.updateReview(req.params.id, userId, req.body);
    sendSuccess(res, "Review updated successfully", review);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    if (!user || !user.id) {
      throw new AppError("Authentication required", 401);
    }
    await this.service.deleteReview(req.params.id, user.id, user.role);
    sendSuccess(res, "Review deleted successfully", null);
  };
}
