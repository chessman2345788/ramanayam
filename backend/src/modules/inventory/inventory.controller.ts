import { Request, Response } from "express";
import { InventoryService } from "./inventory.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";

export class InventoryController {
  constructor(private service: InventoryService) {}

  listInventories = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const sort = (req.query.sort as string) || "newest";

    const filters = {
      sku: req.query.sku as string,
      product: (req.query.product as string) || (req.query.search as string),
      lowStock: req.query.lowStock === "true",
      outOfStock: req.query.outOfStock === "true",
    };

    const result = await this.service.listInventories(filters, sort, page, limit);
    sendSuccess(res, "Inventory list fetched successfully", result);
  };

  getLowStockList = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.getLowStockList(page, limit);
    sendSuccess(res, "Low stock inventory list fetched successfully", result);
  };

  getOutOfStockList = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.getOutOfStockList(page, limit);
    sendSuccess(res, "Out of stock inventory list fetched successfully", result);
  };

  getInventoryById = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const inventory = await this.service.getInventoryById(req.params.id, user);
    sendSuccess(res, "Inventory details fetched successfully", { inventory });
  };

  getInventoryByVariant = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const inventory = await this.service.getInventoryByVariantId(req.params.variantId, user);
    sendSuccess(res, "Variant inventory details fetched successfully", { inventory });
  };

  updateStock = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const inventory = await this.service.updateStock(
      req.params.variantId,
      req.body.availableStock,
      user,
    );
    sendSuccess(res, "Stock updated successfully", { inventory });
  };

  increaseStock = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const inventory = await this.service.increaseStock(req.params.variantId, req.body.amount, user);
    sendSuccess(res, "Stock increased successfully", { inventory });
  };

  decreaseStock = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const inventory = await this.service.decreaseStock(req.params.variantId, req.body.amount, user);
    sendSuccess(res, "Stock decreased successfully", { inventory });
  };

  adjustStock = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const inventory = await this.service.adjustStock(req.params.variantId, req.body, user);
    sendSuccess(res, "Stock adjusted successfully", { inventory });
  };
}
