import { Router } from "express";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { SettingsRepository } from "./settings.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import { UserRole } from "@prisma/client";
import { updateSettingSchema, bulkUpdateSettingsSchema } from "./settings.validator";

const router = Router();

const repository = new SettingsRepository(prisma);
const service = new SettingsService(repository);
const controller = new SettingsController(service);

// Public route to fetch general store settings (currency, public contact)
router.get("/", controller.getAll);
router.get("/:key", controller.getByKey);

// Protected Admin Routes to modify system settings
router.patch("/", authenticate, authorize([UserRole.ADMIN]), validateRequest(updateSettingSchema), controller.update);
router.patch("/bulk", authenticate, authorize([UserRole.ADMIN]), validateRequest(bulkUpdateSettingsSchema), controller.bulkUpdate);

export default router;
