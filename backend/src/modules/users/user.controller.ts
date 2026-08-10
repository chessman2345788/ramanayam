import { Request, Response } from "express";
import { UserService } from "./user.service";
import { sendSuccess } from "../../components/response";
import { AppError } from "../../common/errors";

export class UserController {
  constructor(private service: UserService) {}

  private getAuthUserId(req: Request): string {
    const userId = (req as any).user?.id;
    if (!userId) {
      throw new AppError("Authentication required", 401);
    }
    return userId;
  }

  getProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const user = await this.service.getProfile(userId);
    sendSuccess(res, "User profile fetched successfully", { user });
  };

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const user = await this.service.updateProfile(userId, req.body);
    sendSuccess(res, "Profile updated successfully", { user });
  };

  deleteProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    await this.service.deleteProfile(userId);
    sendSuccess(res, "Profile deleted successfully");
  };

  getAddresses = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const addresses = await this.service.getAddresses(userId);
    sendSuccess(res, "Addresses fetched successfully", { addresses });
  };

  addAddress = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const address = await this.service.addAddress(userId, req.body);
    sendSuccess(res, "Address added successfully", { address }, 201);
  };

  updateAddress = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const addressId = req.params.id;
    const address = await this.service.updateAddress(addressId, userId, req.body);
    sendSuccess(res, "Address updated successfully", { address });
  };

  removeAddress = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const addressId = req.params.id;
    await this.service.removeAddress(addressId, userId);
    sendSuccess(res, "Address deleted successfully");
  };

  setDefaultAddress = async (req: Request, res: Response): Promise<void> => {
    const userId = this.getAuthUserId(req);
    const addressId = req.params.id;
    await this.service.setDefaultAddress(addressId, userId);
    sendSuccess(res, "Default address updated successfully");
  };

  // Admin Handlers
  listUsers = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.listUsers(req.query as any);
    sendSuccess(res, "Users list fetched successfully", result);
  };

  getUser = async (req: Request, res: Response): Promise<void> => {
    const user = await this.service.getUser(req.params.id);
    sendSuccess(res, "User profile fetched successfully", { user });
  };

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    const user = await this.service.updateStatus(req.params.id, req.body.status);
    sendSuccess(res, "User account status updated successfully", { user });
  };

  updateRole = async (req: Request, res: Response): Promise<void> => {
    const user = await this.service.updateRole(req.params.id, req.body.role);
    sendSuccess(res, "User role updated successfully", { user });
  };
}
