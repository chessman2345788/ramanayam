import { Request, Response } from "express";
import { VendorsService } from "./vendor.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";
import { AppError } from "../../common/errors";

export class VendorsController {
  constructor(private service: VendorsService) {}

  private getUserId(req: Request): string {
    const user = (req as RequestWithUser).user;
    if (!user || !user.id) {
      throw new AppError("Authentication required to access vendor portal", 401);
    }
    return user.id;
  }

  // Public Endpoints
  getPublicVendors = async (req: Request, res: Response): Promise<void> => {
    const vendors = await this.service.getPublicVendors(req.query as any);
    sendSuccess(res, "Active vendors directory fetched successfully", vendors);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const vendor = await this.service.getVendorById(req.params.id);
    sendSuccess(res, "Vendor profile fetched successfully", { vendor });
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    const vendor = await this.service.getVendorBySlug(req.params.slug);
    sendSuccess(res, "Vendor profile fetched successfully", { vendor });
  };

  getVendorProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await this.service.getVendorProducts(req.params.id, req.query as any);
    sendSuccess(res, "Vendor products fetched successfully", products);
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const vendor = await this.service.registerVendor(req.body);
    sendSuccess(res, "Vendor registration application submitted successfully", { vendor }, 201);
  };

  // Vendor Self-Service Endpoints
  getMe = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const vendor = await this.service.getAuthenticatedVendor(userId);
    sendSuccess(res, "Vendor account profile fetched successfully", { vendor });
  };

  updateMe = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const updatedVendor = await this.service.updateVendorProfile(userId, req.body);
    sendSuccess(res, "Vendor account profile updated successfully", { vendor: updatedVendor });
  };

  getMyProducts = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getUserId(req);
    const products = await this.service.getVendorOwnProducts(userId, req.query as any);
    sendSuccess(res, "Your vendor product catalog fetched successfully", products);
  };

  // Admin Override Endpoints
  adminGetAll = async (req: Request, res: Response): Promise<void> => {
    const vendors = await this.service.adminGetAllVendors(req.query as any);
    sendSuccess(res, "All platform vendors fetched successfully for Admin", vendors);
  };

  adminUpdateStatus = async (req: Request, res: Response): Promise<void> => {
    const updatedVendor = await this.service.adminUpdateVendorStatus(req.params.id, req.body.status);
    sendSuccess(res, "Vendor account status updated successfully by Admin", { vendor: updatedVendor });
  };

  adminToggleVerification = async (req: Request, res: Response): Promise<void> => {
    const updatedVendor = await this.service.adminToggleVendorVerification(req.params.id, req.body.isVerified);
    sendSuccess(res, "Vendor verification status updated successfully by Admin", { vendor: updatedVendor });
  };
}
