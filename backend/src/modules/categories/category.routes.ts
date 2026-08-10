import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategoryBySlugSchema,
  categoryIdParamSchema,
  listCategoriesSchema,
} from "./category.validator";

const router = Router();
const repository = new CategoryRepository(prisma);
const service = new CategoryService(repository);
const controller = new CategoryController(service);

// Public Routes
router.get("/", validateRequest(listCategoriesSchema), controller.list);
router.get("/tree", controller.getTree);
router.get("/:slug", validateRequest(getCategoryBySlugSchema), controller.getBySlug);

// Admin-only Routes
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(createCategorySchema),
  controller.create,
);

router.patch(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(updateCategorySchema),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(categoryIdParamSchema),
  controller.delete,
);

export default router;
