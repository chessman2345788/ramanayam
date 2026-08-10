import { PrismaClient, SystemSetting } from "@prisma/client";
import { UpdateSettingDTO } from "./settings.types";

export class SettingsRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(category?: string): Promise<SystemSetting[]> {
    const where: any = {};
    if (category) where.category = category;
    return this.prisma.systemSetting.findMany({
      where,
      orderBy: { key: "asc" },
    });
  }

  async findByKey(key: string): Promise<SystemSetting | null> {
    return this.prisma.systemSetting.findUnique({ where: { key } });
  }

  async upsert(data: UpdateSettingDTO): Promise<SystemSetting> {
    return this.prisma.systemSetting.upsert({
      where: { key: data.key },
      create: data,
      update: {
        value: data.value,
        description: data.description,
        category: data.category || "GENERAL",
      },
    });
  }

  async bulkUpsert(settings: UpdateSettingDTO[]): Promise<SystemSetting[]> {
    return this.prisma.$transaction(
      settings.map((item) =>
        this.prisma.systemSetting.upsert({
          where: { key: item.key },
          create: item,
          update: {
            value: item.value,
            description: item.description,
            category: item.category || "GENERAL",
          },
        })
      )
    );
  }
}
