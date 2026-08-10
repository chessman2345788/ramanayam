import { PrismaClient, User, Address, Prisma } from "@prisma/client";
import { CreateAddressInput, UpdateAddressInput, UpdateProfileInput } from "./user.types";

export const USER_SAFE_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  profileImage: true,
  role: true,
  accountStatus: true,
  emailVerified: true,
  phoneVerified: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} satisfies Prisma.UserSelect;

export type SafeUser = Omit<User, "passwordHash">;

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<SafeUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: USER_SAFE_SELECT,
    });
  }

  async findByEmail(email: string): Promise<SafeUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: USER_SAFE_SELECT,
    });
  }

  async update(id: string, data: UpdateProfileInput | Partial<User>): Promise<SafeUser> {
    return this.prisma.user.update({
      where: { id },
      data,
      select: USER_SAFE_SELECT,
    });
  }

  async softDelete(id: string): Promise<SafeUser> {
    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        accountStatus: "INACTIVE",
      },
      select: USER_SAFE_SELECT,
    });
  }

  async findAll(
    skip: number,
    limit: number,
    where: Prisma.UserWhereInput = {},
  ): Promise<SafeUser[]> {
    return this.prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: USER_SAFE_SELECT,
    });
  }

  async countAll(where: Prisma.UserWhereInput = {}): Promise<number> {
    return this.prisma.user.count({ where });
  }

  async findAddressesByUserId(userId: string): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  }

  async findAddressByIdAndUser(addressId: string, userId: string): Promise<Address | null> {
    return this.prisma.address.findFirst({
      where: { id: addressId, userId },
    });
  }

  async createAddress(userId: string, data: CreateAddressInput): Promise<Address> {
    return this.prisma.address.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async createAddressAndSetDefault(
    userId: string,
    data: CreateAddressInput,
  ): Promise<Address> {
    return this.prisma.$transaction(async (tx) => {
      await tx.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
      return tx.address.create({
        data: {
          ...data,
          userId,
          isDefault: true,
        },
      });
    });
  }

  async updateAddress(addressId: string, data: UpdateAddressInput): Promise<Address> {
    return this.prisma.address.update({
      where: { id: addressId },
      data,
    });
  }

  async updateAddressAndSetDefault(
    addressId: string,
    userId: string,
    data: UpdateAddressInput,
  ): Promise<Address> {
    return this.prisma.$transaction(async (tx) => {
      await tx.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
      return tx.address.update({
        where: { id: addressId },
        data: {
          ...data,
          isDefault: true,
        },
      });
    });
  }

  async deleteAddress(addressId: string): Promise<Address> {
    return this.prisma.address.delete({
      where: { id: addressId },
    });
  }

  async setAddressDefault(addressId: string, userId: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      }),
      this.prisma.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      }),
    ]);
  }
}
