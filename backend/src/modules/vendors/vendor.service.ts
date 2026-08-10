import { VendorsRepository } from "./vendor.repository";
import { CreateVendorInput, UpdateVendorInput, VendorQueryFilters } from "./vendor.types";
import { AppError } from "../../common/errors";
import { VendorStatus, ProductStatus } from "@prisma/client";
import { AuthRepository } from "../auth/auth.repository";

export class VendorsService {
  constructor(
    private repository: VendorsRepository,
    private authRepository: AuthRepository,
  ) {}

  private generateSlug(businessName: string): string {
    const baseSlug = businessName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `${baseSlug}-${Date.now().toString(36)}`;
  }

  async registerVendor(input: CreateVendorInput) {
    const duplicate = await this.repository.findDuplicateVendor({
      email: input.email,
      phone: input.phone,
      gstNumber: input.gstNumber,
      panNumber: input.panNumber,
    });

    if (duplicate) {
      throw new AppError("Vendor registration failed: A vendor with this email, phone, GST, or PAN already exists", 400);
    }

    const slug = this.generateSlug(input.businessName);
    const vendor = await this.repository.createVendor({
      ...input,
      slug,
    });

    return vendor;
  }

  async getPublicVendors(filters: VendorQueryFilters) {
    return this.repository.findActiveVendors(filters);
  }

  async getVendorById(id: string) {
    const vendor = await this.repository.findById(id);
    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }
    return vendor;
  }

  async getVendorBySlug(slug: string) {
    const vendor = await this.repository.findBySlug(slug);
    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }
    return vendor;
  }

  async getVendorProducts(vendorId: string, filters: { page?: number; limit?: number; search?: string }) {
    const vendor = await this.repository.findById(vendorId);
    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    return this.repository.findVendorProducts(vendorId, {
      ...filters,
      status: ProductStatus.ACTIVE,
    });
  }

  async getAuthenticatedVendor(userId: string) {
    // Resolve the user's email from their JWT ID
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new AppError("Authenticated user not found", 401);
    }

    const vendor = await this.repository.findByEmail(user.email);
    if (!vendor) {
      throw new AppError("No vendor profile found linked to this account", 404);
    }

    // Status Guard: Suspended vendors are blocked from self-service portal
    if (vendor.status === VendorStatus.SUSPENDED) {
      throw new AppError("Forbidden: Your vendor account is currently suspended. Please contact administrator.", 403);
    }

    return vendor;
  }

  async updateVendorProfile(userId: string, input: UpdateVendorInput) {
    const vendor = await this.getAuthenticatedVendor(userId);
    return this.repository.updateVendor(vendor.id, input);
  }

  async getVendorOwnProducts(userId: string, filters: { page?: number; limit?: number; status?: ProductStatus; search?: string }) {
    const vendor = await this.getAuthenticatedVendor(userId);
    return this.repository.findVendorProducts(vendor.id, filters);
  }

  // Admin Overrides
  async adminGetAllVendors(filters: VendorQueryFilters) {
    return this.repository.findAllVendorsAdmin(filters);
  }

  async adminUpdateVendorStatus(vendorId: string, status: VendorStatus) {
    const vendor = await this.repository.findById(vendorId);
    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    return this.repository.updateVendorStatus(vendorId, status);
  }

  async adminToggleVendorVerification(vendorId: string, isVerified: boolean) {
    const vendor = await this.repository.findById(vendorId);
    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    return this.repository.updateVendorVerification(vendorId, isVerified);
  }
}
