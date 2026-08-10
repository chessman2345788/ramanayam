import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";
import { WishlistRepository } from "./wishlist.repository";
import { prisma } from "../../prisma";
import { authenticate } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import {
  addToWishlistSchema,
  removeFromWishlistSchema,
} from "./wishlist.validator";

const router = Router();

const repository = new WishlistRepository(prisma);
const service = new WishlistService(repository);
const controller = new WishlistController(service);

// Authenticated Wishlist Endpoints
router.use(authenticate);

router.get("/", controller.get);
router.post("/items", validateRequest(addToWishlistSchema), controller.addItem);
router.delete("/items/:productId", validateRequest(removeFromWishlistSchema), controller.removeItem);
router.delete("/clear", controller.clear);

export default router;
