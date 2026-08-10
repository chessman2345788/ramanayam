import { InventoryRepository, InventoryListFilters, AdjustStockData } from "./inventory.repository";
import { AppError } from "../../common/errors";
import { formatPaginationResult, PaginationResult } from "../../components/pagination";
import { Inventory } from "@prisma/client";
import { TokenPayload } from "../auth/auth.types";

export interface FormattedInventory extends Inventory {
  stockStatus: "Out of Stock" | "Low Stock" | "In Stock";
}

export class InventoryService {
  constructor(private repository: InventoryRepository) {}

  private formatInventory(inventory: Inventory): FormattedInventory {
    let stockStatus: "Out of Stock" | "Low Stock" | "In Stock" = "In Stock";
    if (inventory.availableStock === 0) {
      stockStatus = "Out of Stock";
    } else if (inventory.availableStock <= inventory.lowStockAlert) {
      stockStatus = "Low Stock";
    }

    return {
      ...inventory,
      stockStatus,
    };
  }

  private verifyVendorAccess(inventory: Inventory | null, currentUser?: TokenPayload): void {
    if (!currentUser || !inventory) return;

    if (currentUser.role === "VENDOR") {
      const variant = (inventory as any).variant;
      const vendorId = variant?.product?.vendorId;
      const userVendorId = (currentUser as any).vendorId || currentUser.id;

      if (vendorId && userVendorId && vendorId !== userVendorId) {
        throw new AppError(
          "Forbidden: You do not have permission to manage this vendor's inventory",
          403,
        );
      }
    }
  }

  async getInventoryByVariantId(
    variantId: string,
    currentUser?: TokenPayload,
  ): Promise<FormattedInventory> {
    let inventory = await this.repository.findByVariantId(variantId);
    if (!inventory) {
      inventory = await this.repository.upsertInventory(variantId, 0);
    }

    if (currentUser) {
      this.verifyVendorAccess(inventory, currentUser);
    }

    return this.formatInventory(inventory);
  }

  async getInventoryById(id: string, currentUser?: TokenPayload): Promise<FormattedInventory> {
    const inventory = await this.repository.findById(id);
    if (!inventory) {
      throw new AppError("Inventory record not found", 404);
    }

    if (currentUser) {
      this.verifyVendorAccess(inventory, currentUser);
    }

    return this.formatInventory(inventory);
  }

  async updateStock(
    variantId: string,
    availableStock: number,
    currentUser?: TokenPayload,
  ): Promise<FormattedInventory> {
    if (availableStock < 0) {
      throw new AppError("Stock cannot be negative", 400);
    }

    let existing = await this.repository.findByVariantId(variantId);
    if (!existing) {
      existing = await this.repository.upsertInventory(variantId, 0);
    }

    this.verifyVendorAccess(existing, currentUser);

    const updated = await this.repository.updateStock(variantId, availableStock);
    return this.formatInventory(updated);
  }

  async increaseStock(
    variantId: string,
    amount: number,
    currentUser?: TokenPayload,
  ): Promise<FormattedInventory> {
    if (amount <= 0) {
      throw new AppError("Increase amount must be greater than zero", 400);
    }

    const existing = await this.repository.findByVariantId(variantId);
    if (existing) {
      this.verifyVendorAccess(existing, currentUser);
    }

    const updated = await this.repository.increaseStockAtomic(variantId, amount);
    return this.formatInventory(updated);
  }

  async decreaseStock(
    variantId: string,
    amount: number,
    currentUser?: TokenPayload,
  ): Promise<FormattedInventory> {
    if (amount <= 0) {
      throw new AppError("Decrease amount must be greater than zero", 400);
    }

    const existing = await this.repository.findByVariantId(variantId);
    if (!existing) {
      throw new AppError("Product variant inventory not found", 404);
    }

    this.verifyVendorAccess(existing, currentUser);

    const updated = await this.repository.decreaseStockAtomic(variantId, amount);
    return this.formatInventory(updated);
  }

  async adjustStock(
    variantId: string,
    data: AdjustStockData,
    currentUser?: TokenPayload,
  ): Promise<FormattedInventory> {
    let existing = await this.repository.findByVariantId(variantId);
    if (!existing) {
      existing = await this.repository.upsertInventory(variantId, 0);
    }

    this.verifyVendorAccess(existing, currentUser);

    if (data.availableStock !== undefined && data.availableStock < 0) {
      throw new AppError("Available stock cannot be negative", 400);
    }
    if (data.reservedStock !== undefined && data.reservedStock < 0) {
      throw new AppError("Reserved stock cannot be negative", 400);
    }
    if (data.soldStock !== undefined && data.soldStock < 0) {
      throw new AppError("Sold stock cannot be negative", 400);
    }
    if (data.lowStockAlert !== undefined && data.lowStockAlert < 0) {
      throw new AppError("Low stock alert threshold cannot be negative", 400);
    }

    const updated = await this.repository.adjustStock(variantId, data);
    return this.formatInventory(updated);
  }

  async listInventories(
    filters: InventoryListFilters = {},
    sort = "newest",
    page = 1,
    limit = 10,
  ): Promise<PaginationResult<FormattedInventory>> {
    const skip = (page - 1) * limit;
    const { data, total } = await this.repository.findInventories(filters, sort, skip, limit);
    const formattedData = data.map((item) => this.formatInventory(item));
    return formatPaginationResult(formattedData, total, page, limit);
  }

  async getLowStockList(page = 1, limit = 10): Promise<PaginationResult<FormattedInventory>> {
    const skip = (page - 1) * limit;
    const { data, total } = await this.repository.findLowStock(skip, limit);
    const formattedData = data.map((item) => this.formatInventory(item));
    return formatPaginationResult(formattedData, total, page, limit);
  }

  async getOutOfStockList(page = 1, limit = 10): Promise<PaginationResult<FormattedInventory>> {
    const skip = (page - 1) * limit;
    const { data, total } = await this.repository.findOutOfStock(skip, limit);
    const formattedData = data.map((item) => this.formatInventory(item));
    return formatPaginationResult(formattedData, total, page, limit);
  }
}
