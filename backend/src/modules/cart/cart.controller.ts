import { Response } from "express";
import { CartService } from "./cart.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";

export class CartController {
  constructor(private service: CartService) {}

  getCart = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const cart = await this.service.getCart(userId);
    sendSuccess(res, "Cart fetched successfully", { cart });
  };

  addItem = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { variantId, quantity } = req.body;
    const cart = await this.service.addItem(userId, variantId, quantity);
    sendSuccess(res, "Item added to cart successfully", { cart }, 201);
  };

  updateItem = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await this.service.updateItem(userId, itemId, quantity);
    sendSuccess(res, "Cart item updated successfully", { cart });
  };

  removeItem = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { itemId } = req.params;
    const cart = await this.service.removeItem(userId, itemId);
    sendSuccess(res, "Item removed from cart successfully", { cart });
  };

  clearCart = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    await this.service.clearCart(userId);
    sendSuccess(res, "Cart cleared successfully");
  };

  getSummary = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const summary = await this.service.getSummary(userId);
    sendSuccess(res, "Cart summary fetched successfully", { summary });
  };
}
