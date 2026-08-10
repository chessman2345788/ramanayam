import { Router } from "express";
import { CouponController } from "./coupons.controller";
import { CouponService } from "./coupons.service";
import { CouponRepository } from "./coupons.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import { UserRole } from "@prisma/client";
import {
  createCouponSchema,
  updateCouponSchema,
  validateCouponSchema,
  couponParamsSchema,
  couponQuerySchema,
} from "./coupons.validator";

const router = Router();

const repository = new CouponRepository(prisma);
const service = new CouponService(repository);
const controller = new CouponController(service);

// Public route to validate coupon during customer checkout
router.post("/validate", validateRequest(validateCouponSchema), controller.validate);

// Protected Admin CRUD Routes
router.get("/", authenticate, authorize([UserRole.ADMIN]), validateRequest(couponQuerySchema), controller.getAll);
router.get("/:id", authenticate, authorize([UserRole.ADMIN]), validateRequest(couponParamsSchema), controller.getById);
router.post("/", authenticate, authorize([UserRole.ADMIN]), validateRequest(createCouponSchema), controller.create);
router.patch("/:id", authenticate, authorize([UserRole.ADMIN]), validateRequest(updateCouponSchema), controller.update);
router.delete("/:id", authenticate, authorize([UserRole.ADMIN]), validateRequest(couponParamsSchema), controller.delete);

export default router;
