import { Router, Request, Response } from "express";

import authRoutes from "../modules/auth";
import userRoutes from "../modules/users";
import categoryRoutes from "../modules/categories";
import productRoutes from "../modules/products";
import inventoryRoutes from "../modules/inventory";
import cartRoutes from "../modules/cart";
import wishlistRoutes from "../modules/wishlist";
import orderRoutes from "../modules/orders";
import paymentRoutes from "../modules/payments";
import reviewRoutes from "../modules/reviews";
import vendorRoutes from "../modules/vendors";
import adminRoutes from "../modules/admin";
import couponRoutes from "../modules/coupons";
import cmsRoutes from "../modules/cms";
import settingsRoutes from "../modules/settings";

const router = Router();

// GET /api/v1
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Ramanayam API version 1.0.0 is active.",
    endpoints: [
      "/auth",
      "/users",
      "/categories",
      "/products",
      "/inventory",
      "/cart",
      "/wishlist",
      "/orders",
      "/payments",
      "/reviews",
      "/vendors",
      "/admin",
      "/coupons",
      "/cms",
      "/settings",
    ],
  });
});

// Register module routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/vendors", vendorRoutes);
router.use("/admin", adminRoutes);
router.use("/coupons", couponRoutes);
router.use("/cms", cmsRoutes);
router.use("/settings", settingsRoutes);

// Canonical Razorpay aliases for direct endpoint access
router.post("/create-order", (req, res, next) => {
  req.url = "/create-order";
  paymentRoutes(req, res, next);
});
router.post("/verify-payment", (req, res, next) => {
  req.url = "/verify-payment";
  paymentRoutes(req, res, next);
});
router.post("/verify", (req, res, next) => {
  req.url = "/verify";
  paymentRoutes(req, res, next);
});

export default router;
