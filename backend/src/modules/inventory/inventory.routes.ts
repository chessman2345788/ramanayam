import { Router } from "express";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { InventoryRepository } from "./inventory.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  listInventoriesQuerySchema,
  paginationQuerySchema,
  variantParamSchema,
  idParamSchema,
  updateStockSchema,
  increaseStockSchema,
  decreaseStockSchema,
  adjustStockSchema,
} from "./inventory.validator";

const router = Router();
const repository = new InventoryRepository(prisma);
const service = new InventoryService(repository);
const controller = new InventoryController(service);

// ======================================================
// READ ENDPOINTS (Static routes first to prevent collision)
// ======================================================

// GET /inventory
router.get("/", validateRequest(listInventoriesQuerySchema), controller.listInventories);

// GET /inventory/low-stock
router.get("/low-stock", validateRequest(paginationQuerySchema), controller.getLowStockList);

// GET /inventory/out-of-stock
router.get("/out-of-stock", validateRequest(paginationQuerySchema), controller.getOutOfStockList);

// GET /inventory/id/:id
router.get("/id/:id", validateRequest(idParamSchema), controller.getInventoryById);

// GET /inventory/variant/:variantId & GET /inventory/:variantId
router.get(
  "/variant/:variantId",
  validateRequest(variantParamSchema),
  controller.getInventoryByVariant,
);

router.get("/:variantId", validateRequest(variantParamSchema), controller.getInventoryByVariant);

// ======================================================
// MODIFICATION ENDPOINTS (Admin & Vendor only)
// ======================================================

// PATCH /inventory/:variantId & PUT /inventory/variant/:variantId/stock
router.patch(
  "/:variantId",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(updateStockSchema),
  controller.updateStock,
);

router.put(
  "/variant/:variantId/stock",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(updateStockSchema),
  controller.updateStock,
);

// POST /inventory/:variantId/add-stock & POST /inventory/variant/:variantId/increase
router.post(
  "/:variantId/add-stock",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(increaseStockSchema),
  controller.increaseStock,
);

router.post(
  "/variant/:variantId/increase",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(increaseStockSchema),
  controller.increaseStock,
);

// POST /inventory/:variantId/remove-stock & POST /inventory/variant/:variantId/decrease
router.post(
  "/:variantId/remove-stock",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(decreaseStockSchema),
  controller.decreaseStock,
);

router.post(
  "/variant/:variantId/decrease",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(decreaseStockSchema),
  controller.decreaseStock,
);

// POST /inventory/:variantId/adjust-stock & PUT /inventory/variant/:variantId/adjust
router.post(
  "/:variantId/adjust-stock",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(adjustStockSchema),
  controller.adjustStock,
);

router.put(
  "/variant/:variantId/adjust",
  authenticate,
  authorize(["ADMIN", "VENDOR"]),
  validateRequest(adjustStockSchema),
  controller.adjustStock,
);

export default router;
