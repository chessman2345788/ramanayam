import { Request, Response } from "express";
import { CouponService } from "./coupons.service";

export class CouponController {
  constructor(private service: CouponService) {}

  create = async (req: Request, res: Response) => {
    const coupon = await this.service.createCoupon(req.body);
    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  };

  getAll = async (req: Request, res: Response) => {
    const result = await this.service.getCoupons(req.query as any);
    res.status(200).json({
      success: true,
      data: result.items,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  };

  getById = async (req: Request, res: Response) => {
    const coupon = await this.service.getCouponById(req.params.id);
    res.status(200).json({
      success: true,
      data: coupon,
    });
  };

  update = async (req: Request, res: Response) => {
    const coupon = await this.service.updateCoupon(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteCoupon(req.params.id);
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  };

  validate = async (req: Request, res: Response) => {
    const result = await this.service.validateCoupon(req.body);
    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: result,
    });
  };
}
