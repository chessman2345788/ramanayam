import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryFilters } from "./category.types";
import { sendSuccess } from "../../components/response";

export class CategoryController {
  constructor(private service: CategoryService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit as string, 10) || 10, 50);

    const filters: CategoryFilters = {};

    if (req.query.search) {
      filters.search = req.query.search as string;
    }
    if (req.query.isActive === "true" || req.query.isActive === "false") {
      filters.isActive = req.query.isActive === "true";
    }
    if (req.query.parentId) {
      filters.parentId = req.query.parentId as string;
    }

    const result = await this.service.list(filters, page, limit);
    sendSuccess(res, "Categories fetched successfully", result);
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.getBySlug(req.params.slug);
    sendSuccess(res, "Category fetched successfully", result);
  };

  getTree = async (_req: Request, res: Response): Promise<void> => {
    const tree = await this.service.getTree();
    sendSuccess(res, "Category tree fetched successfully", { categories: tree });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const category = await this.service.create(req.body);
    sendSuccess(res, "Category created successfully", { category }, 201);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const category = await this.service.update(req.params.id, req.body);
    sendSuccess(res, "Category updated successfully", { category });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    await this.service.delete(req.params.id);
    sendSuccess(res, "Category deleted successfully");
  };
}
