import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  productSlugParamSchema,
  categoryProductsSchema,
  listProductsQuerySchema,
  searchProductsQuerySchema,
  paginationQuerySchema,
  createVariantSchema,
  updateVariantSchema,
  variantIdParamSchema,
  imageUploadSchema,
  imageIdParamSchema,
  setPrimaryImageParamSchema,
  createCollectionSchema,
  updateCollectionSchema,
  collectionIdParamSchema,
  assignCollectionSchema,
  removeCollectionParamSchema,
} from "./product.validator";

const router = Router();
const repository = new ProductRepository(prisma);
const service = new ProductService(repository);
const controller = new ProductController(service);

// ==========================================
// Public Routes
// ==========================================
router.get("/", validateRequest(listProductsQuerySchema), controller.listProducts);
router.get("/featured", validateRequest(paginationQuerySchema), controller.featuredProducts);
router.get("/best-sellers", validateRequest(paginationQuerySchema), controller.bestSellers);
router.get("/new-arrivals", validateRequest(paginationQuerySchema), controller.newArrivals);
router.get("/search", validateRequest(searchProductsQuerySchema), controller.searchProducts);
router.get("/slug/:slug", validateRequest(productSlugParamSchema), controller.getProductBySlug);
router.get("/id/:id", validateRequest(productIdParamSchema), controller.getProductById);
router.get("/category/:categoryId", validateRequest(categoryProductsSchema), controller.getCategoryProducts);

// ==========================================
// Product Protected Routes (Admin/Vendor)
// ==========================================
router.post(
  "/",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(createProductSchema),
  controller.createProduct,
);
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(updateProductSchema),
  controller.updateProduct,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(productIdParamSchema),
  controller.deleteProduct,
);

// ==========================================
// Variant Management (Admin/Vendor)
// ==========================================
router.post(
  "/:productId/variants",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(createVariantSchema),
  controller.createVariant,
);
router.put(
  "/variants/:id",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(updateVariantSchema),
  controller.updateVariant,
);
router.delete(
  "/variants/:id",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(variantIdParamSchema),
  controller.deleteVariant,
);

// ==========================================
// Image Management (Admin/Vendor)
// ==========================================
router.post(
  "/:productId/images",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(imageUploadSchema),
  controller.uploadImage,
);
router.delete(
  "/images/:imageId",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(imageIdParamSchema),
  controller.deleteImage,
);
router.patch(
  "/:productId/images/:imageId/primary",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(setPrimaryImageParamSchema),
  controller.setPrimaryImage,
);

// ==========================================
// Collection Management (Admin only)
// ==========================================
router.post(
  "/collections",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(createCollectionSchema),
  controller.createCollection,
);
router.put(
  "/collections/:id",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(updateCollectionSchema),
  controller.updateCollection,
);
router.delete(
  "/collections/:id",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(collectionIdParamSchema),
  controller.deleteCollection,
);
router.post(
  "/collections/:collectionId/products",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(assignCollectionSchema),
  controller.assignProductToCollection,
);
router.delete(
  "/collections/:collectionId/products/:productId",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(removeCollectionParamSchema),
  controller.removeProductFromCollection,
);

export default router;
