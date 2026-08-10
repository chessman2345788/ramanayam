import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  updateUserSchema,
  addressSchema,
  updateAddressSchema,
  addressIdParamSchema,
  userIdParamSchema,
  statusUpdateSchema,
  roleUpdateSchema,
  listUsersQuerySchema,
} from "./user.validator";

const router = Router();
const repository = new UserRepository(prisma);
const service = new UserService(repository);
const controller = new UserController(service);

// Customer Account Paths
router.get("/me", authenticate, controller.getProfile);
router.patch("/me", authenticate, validateRequest(updateUserSchema), controller.updateProfile);
router.delete("/me", authenticate, controller.deleteProfile);

// Customer Delivery Address Paths
router.get("/addresses", authenticate, controller.getAddresses);
router.post("/addresses", authenticate, validateRequest(addressSchema), controller.addAddress);
router.patch(
  "/addresses/:id",
  authenticate,
  validateRequest(updateAddressSchema),
  controller.updateAddress,
);
router.delete(
  "/addresses/:id",
  authenticate,
  validateRequest(addressIdParamSchema),
  controller.removeAddress,
);
router.patch(
  "/addresses/:id/default",
  authenticate,
  validateRequest(addressIdParamSchema),
  controller.setDefaultAddress,
);

// Admin Control Paths (Only Accessible by Accounts with ADMIN role)
router.get(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(listUsersQuerySchema),
  controller.listUsers,
);
router.get(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(userIdParamSchema),
  controller.getUser,
);
router.patch(
  "/:id/status",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(statusUpdateSchema),
  controller.updateStatus,
);
router.patch(
  "/:id/role",
  authenticate,
  authorize(["ADMIN"]),
  validateRequest(roleUpdateSchema),
  controller.updateRole,
);

export default router;
