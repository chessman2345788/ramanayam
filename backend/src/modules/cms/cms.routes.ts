import { Router } from "express";
import { CmsController } from "./cms.controller";
import { CmsService } from "./cms.service";
import { CmsRepository } from "./cms.repository";
import { prisma } from "../../prisma";
import { authenticate, authorize } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import { UserRole } from "@prisma/client";
import {
  createBannerSchema,
  updateBannerSchema,
  bannerParamsSchema,
  updateSectionSchema,
} from "./cms.validator";

const router = Router();

const repository = new CmsRepository(prisma);
const service = new CmsService(repository);
const controller = new CmsController(service);

// Public Routes (Get active banners & sections for Storefront)
router.get("/banners", controller.getBanners);
router.get("/sections", controller.getSections);
router.get("/sections/:key", controller.getSectionByKey);

// Protected Admin Routes
router.post("/banners", authenticate, authorize([UserRole.ADMIN]), validateRequest(createBannerSchema), controller.createBanner);
router.patch("/banners/:id", authenticate, authorize([UserRole.ADMIN]), validateRequest(updateBannerSchema), controller.updateBanner);
router.delete("/banners/:id", authenticate, authorize([UserRole.ADMIN]), validateRequest(bannerParamsSchema), controller.deleteBanner);
router.patch("/sections/:key", authenticate, authorize([UserRole.ADMIN]), validateRequest(updateSectionSchema), controller.updateSection);

export default router;
