import { Router } from "express";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartRepository } from "./cart.repository";
import { prisma } from "../../prisma";
import { authenticate } from "../auth/auth.middleware";
import { validateRequest } from "../../components/validation";
import { addToCartSchema, updateCartItemSchema, removeCartItemSchema } from "./cart.validator";

const router = Router();
export const cartRepository = new CartRepository(prisma);
export const cartService = new CartService(cartRepository);
const controller = new CartController(cartService);

// All cart routes require authentication
router.use(authenticate);

router.get("/", controller.getCart);
router.get("/summary", controller.getSummary);
router.post("/items", validateRequest(addToCartSchema), controller.addItem);
router.patch("/items/:itemId", validateRequest(updateCartItemSchema), controller.updateItem);
router.delete("/items/:itemId", validateRequest(removeCartItemSchema), controller.removeItem);
router.delete("/clear", controller.clearCart);

export default router;
