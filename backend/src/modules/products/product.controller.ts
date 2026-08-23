import { Request, Response } from "express";
import { ProductService, UserContext } from "./product.service";
import { sendSuccess } from "../../components/response";
import { ProductFilters } from "./product.repository";
import { verifyToken } from "../../components/auth";

export class ProductController {
  constructor(private service: ProductService) {}

  private getUserContext(req: Request): UserContext | undefined {
    const user = (req as any).user;
    if (user) {
      return {
        id: user.id,
        role: user.role,
        vendorId: user.vendorId,
      };
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        return {
          id: decoded.id,
          role: decoded.role,
          vendorId: (decoded as any).vendorId,
        };
      } catch {
        return undefined;
      }
    }

    return undefined;
  }

  // ==========================================
  // Product Operations
  // ==========================================

  createProduct = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const product = await this.service.createProduct(req.body, user);
    sendSuccess(res, "Product created successfully", { product }, 201);
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const product = await this.service.updateProduct(req.params.id, req.body, user);
    sendSuccess(res, "Product updated successfully", { product });
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    await this.service.deleteProduct(req.params.id, user);
    sendSuccess(res, "Product deleted successfully");
  };

  getProductBySlug = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const product = await this.service.getProductBySlug(req.params.slug, user);
    sendSuccess(res, "Product fetched successfully", { product });
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const product = await this.service.getProductById(req.params.id, user);
    sendSuccess(res, "Product fetched successfully", { product });
  };

  listProducts = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const sort = (req.query.sort as string) || "newest";

    const filters: ProductFilters = {
      categoryId: (req.query.category as string) || (req.query.categoryId as string),
      vendorId: (req.query.vendor as string) || (req.query.vendorId as string),
      status: req.query.status as any,
      featured:
        req.query.featured === "true" ? true : req.query.featured === "false" ? false : undefined,
      availability: req.query.availability as string,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      search: (req.query.search as string) || (req.query.q as string),
    };

    const result = await this.service.listProducts(filters, sort, page, limit, user);
    sendSuccess(res, "Products fetched successfully", result);
  };

  searchProducts = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const query = (req.query.q as string) || (req.query.search as string) || "";
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.searchProducts(query, page, limit, user);
    sendSuccess(res, "Search results fetched successfully", result);
  };

  featuredProducts = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.getFeaturedProducts(page, limit, user);
    sendSuccess(res, "Featured products fetched successfully", result);
  };

  bestSellers = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.getBestSellers(page, limit, user);
    sendSuccess(res, "Best sellers fetched successfully", result);
  };

  newArrivals = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.getNewArrivals(page, limit, user);
    sendSuccess(res, "New arrivals fetched successfully", result);
  };

  getCategoryProducts = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const { categoryId } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const result = await this.service.getCategoryProducts(categoryId, page, limit, user);
    sendSuccess(res, "Category products fetched successfully", result);
  };

  // ==========================================
  // Variant Operations
  // ==========================================

  createVariant = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const variant = await this.service.createVariant(req.params.productId, req.body, user);
    sendSuccess(res, "Variant created successfully", { variant }, 201);
  };

  updateVariant = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const variant = await this.service.updateVariant(req.params.id, req.body, user);
    sendSuccess(res, "Variant updated successfully", { variant });
  };

  deleteVariant = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    await this.service.deleteVariant(req.params.id, user);
    sendSuccess(res, "Variant deleted successfully");
  };

  // ==========================================
  // Image Operations
  // ==========================================

  uploadImage = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const image = await this.service.uploadImage(req.params.productId, req.body, user);
    sendSuccess(res, "Image uploaded successfully", { image }, 201);
  };

  deleteImage = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    await this.service.deleteImage(req.params.imageId, user);
    sendSuccess(res, "Image deleted successfully");
  };

  setPrimaryImage = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    await this.service.setPrimaryImage(req.params.imageId, req.params.productId, user);
    sendSuccess(res, "Primary image updated successfully");
  };

  // ==========================================
  // Collection Operations
  // ==========================================

  createCollection = async (req: Request, res: Response): Promise<void> => {
    const collection = await this.service.createCollection(req.body);
    sendSuccess(res, "Collection created successfully", { collection }, 201);
  };

  updateCollection = async (req: Request, res: Response): Promise<void> => {
    const collection = await this.service.updateCollection(req.params.id, req.body);
    sendSuccess(res, "Collection updated successfully", { collection });
  };

  deleteCollection = async (req: Request, res: Response): Promise<void> => {
    await this.service.deleteCollection(req.params.id);
    sendSuccess(res, "Collection deleted successfully");
  };

  assignProductToCollection = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const { collectionId } = req.params;
    const { productId } = req.body;
    await this.service.assignProductToCollection(productId, collectionId, user);
    sendSuccess(res, "Product assigned to collection successfully");
  };

  removeProductFromCollection = async (req: Request, res: Response): Promise<void> => {
    const user = this.getUserContext(req);
    const { collectionId, productId } = req.params;
    await this.service.removeProductFromCollection(productId, collectionId, user);
    sendSuccess(res, "Product removed from collection successfully");
  };

  // ==========================================
  // CSV Import Operations
  // ==========================================

  validateCsvImport = async (req: Request, res: Response): Promise<void> => {
    const { rows } = req.body;
    if (!Array.isArray(rows)) {
      sendSuccess(res, "CSV validation requires an array of product rows", { summary: { totalRows: 0, validRows: 0, invalidRows: 0, duplicateSkus: 0, missingCategories: 0 }, errors: [], validProducts: [] }, 400);
      return;
    }

    const result = await this.service.validateCsvImport(rows);
    sendSuccess(res, "CSV dry-run validation completed successfully", result);
  };

  executeCsvImport = async (req: Request, res: Response): Promise<void> => {
    const { validProducts } = req.body;
    if (!Array.isArray(validProducts) || validProducts.length === 0) {
      sendSuccess(res, "No valid products provided for import execution", { createdCount: 0, failedCount: 0 }, 400);
      return;
    }

    const result = await this.service.executeCsvImport(validProducts);
    sendSuccess(res, `Batch import executed successfully: ${result.createdCount} products created`, result);
  };
}
