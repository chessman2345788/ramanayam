import { Request, Response } from "express";
import { WishlistService } from "./wishlist.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";
import { AppError } from "../../common/errors";

export class WishlistController {
  constructor(private service: WishlistService) {}

  private getUserId(req: Request): string {
    const user = (req as RequestWithUser).user;
    if (!user || !user.id) {
      throw new AppError("Authentication required to access wishlist", 401);
    }
    return user.id;
  }

  get = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const wishlist = await this.service.getWishlist(userId);
    sendSuccess(res, "Wishlist details fetched successfully", wishlist);
  };

  addItem = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const { productId, variantId } = req.body;
    const wishlist = await this.service.addItem(userId, productId, variantId);
    sendSuccess(res, "Product added to wishlist successfully", wishlist, 201);
  };

  removeItem = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const { productId } = req.params;
    const wishlist = await this.service.removeItem(userId, productId);
    sendSuccess(res, "Product removed from wishlist successfully", wishlist);
  };

  clear = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const wishlist = await this.service.clearWishlist(userId);
    sendSuccess(res, "Wishlist cleared successfully", wishlist);
  };
}
