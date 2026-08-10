import { UserRepository, SafeUser } from "./user.repository";
import { AppError } from "../../common/errors";
import { formatPaginationResult, PaginationResult } from "../../components/pagination";
import { Address, UserRole, AccountStatus, Prisma } from "@prisma/client";
import {
  CreateAddressInput,
  ListUsersQueryInput,
  UpdateAddressInput,
  UpdateProfileInput,
} from "./user.types";

export class UserService {
  constructor(private repository: UserRepository) {}

  async getProfile(userId: string): Promise<SafeUser> {
    const user = await this.repository.findById(userId);
    if (!user || user.deletedAt) {
      throw new AppError("User profile not found", 404);
    }
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileInput): Promise<SafeUser> {
    const user = await this.repository.findById(userId);
    if (!user || user.deletedAt) {
      throw new AppError("User profile not found", 404);
    }

    // Check unique phone constraint if phone is updated
    if (data.phone && data.phone !== user.phone) {
      const existingPhone = await this.repository.findAll(0, 1, {
        phone: data.phone,
        id: { not: userId },
      });
      if (existingPhone.length > 0) {
        throw new AppError("Phone number is already in use", 409);
      }
    }

    return this.repository.update(userId, data);
  }

  async deleteProfile(userId: string): Promise<void> {
    const user = await this.repository.findById(userId);
    if (!user || user.deletedAt) {
      throw new AppError("User profile not found", 404);
    }
    await this.repository.softDelete(userId);
  }

  async getAddresses(userId: string): Promise<Address[]> {
    return this.repository.findAddressesByUserId(userId);
  }

  async addAddress(userId: string, data: CreateAddressInput): Promise<Address> {
    const currentAddresses = await this.repository.findAddressesByUserId(userId);

    // Force default if it is the user's first address or explicitly requested
    const shouldBeDefault = currentAddresses.length === 0 || data.isDefault === true;

    if (shouldBeDefault && currentAddresses.length > 0) {
      return this.repository.createAddressAndSetDefault(userId, {
        ...data,
        isDefault: true,
      });
    }

    return this.repository.createAddress(userId, {
      ...data,
      isDefault: shouldBeDefault,
    });
  }

  async updateAddress(
    addressId: string,
    userId: string,
    data: UpdateAddressInput,
  ): Promise<Address> {
    const address = await this.repository.findAddressByIdAndUser(addressId, userId);
    if (!address) {
      throw new AppError("Address not found or unauthorized", 404);
    }

    if (data.isDefault === true && !address.isDefault) {
      return this.repository.updateAddressAndSetDefault(addressId, userId, data);
    }

    return this.repository.updateAddress(addressId, data);
  }

  async removeAddress(addressId: string, userId: string): Promise<void> {
    const address = await this.repository.findAddressByIdAndUser(addressId, userId);
    if (!address) {
      throw new AppError("Address not found or unauthorized", 404);
    }

    await this.repository.deleteAddress(addressId);
  }

  async setDefaultAddress(addressId: string, userId: string): Promise<void> {
    const address = await this.repository.findAddressByIdAndUser(addressId, userId);
    if (!address) {
      throw new AppError("Address not found or unauthorized", 404);
    }
    await this.repository.setAddressDefault(addressId, userId);
  }

  // Admin APIs
  async listUsers(queryParams: ListUsersQueryInput): Promise<PaginationResult<SafeUser>> {
    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      deletedAt: null,
    };

    if (queryParams.status) {
      where.accountStatus = queryParams.status;
    }

    if (queryParams.role) {
      where.role = queryParams.role;
    }

    if (queryParams.search) {
      const searchTerm = queryParams.search.trim();
      where.OR = [
        { firstName: { contains: searchTerm, mode: "insensitive" } },
        { lastName: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        { phone: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      this.repository.findAll(skip, limit, where),
      this.repository.countAll(where),
    ]);

    return formatPaginationResult(users, total, page, limit);
  }

  async getUser(id: string): Promise<SafeUser> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateStatus(id: string, status: AccountStatus): Promise<SafeUser> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return this.repository.update(id, { accountStatus: status });
  }

  async updateRole(id: string, role: UserRole): Promise<SafeUser> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return this.repository.update(id, { role });
  }
}
