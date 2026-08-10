import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { ReviewsRepository } from "./reviews.repository";
import { prisma } from "../../prisma";
import { authenticate } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  createReviewSchema,
  updateReviewSchema,
  reviewParamsSchema,
  productReviewParamsSchema,
  reviewQuerySchema,
} from "./reviews.validator";

const router = Router();

const repository = new ReviewsRepository(prisma);
const service = new ReviewsService(repository);
const controller = new ReviewsController(service);

// Public Read Routes
router.get("/", validateRequest(reviewQuerySchema), controller.getAll);
router.get("/product/:productId", validateRequest(productReviewParamsSchema), controller.getByProduct);
router.get("/:id", validateRequest(reviewParamsSchema), controller.getById);

// Authenticated Mutation Routes
router.use(authenticate);

router.post("/", validateRequest(createReviewSchema), controller.create);
router.patch("/:id", validateRequest(updateReviewSchema), controller.update);
router.delete("/:id", validateRequest(reviewParamsSchema), controller.delete);

export default router;
