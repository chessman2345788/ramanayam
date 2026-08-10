import { PrismaClient, CmsBanner, CmsSection } from "@prisma/client";
import { CreateBannerDTO, UpdateBannerDTO, UpdateSectionDTO } from "./cms.types";

export class CmsRepository {
  constructor(private prisma: PrismaClient) {}

  // Banners
  async createBanner(data: CreateBannerDTO): Promise<CmsBanner> {
    return this.prisma.cmsBanner.create({ data });
  }

  async findBannerById(id: string): Promise<CmsBanner | null> {
    return this.prisma.cmsBanner.findUnique({ where: { id } });
  }

  async findAllBanners(position?: string, activeOnly = false): Promise<CmsBanner[]> {
    const where: any = {};
    if (position) where.position = position;
    if (activeOnly) where.isActive = true;

    return this.prisma.cmsBanner.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  }

  async updateBanner(id: string, data: UpdateBannerDTO): Promise<CmsBanner> {
    return this.prisma.cmsBanner.update({ where: { id }, data });
  }

  async deleteBanner(id: string): Promise<CmsBanner> {
    return this.prisma.cmsBanner.delete({ where: { id } });
  }

  // Sections
  async findSectionByKey(sectionKey: string): Promise<CmsSection | null> {
    return this.prisma.cmsSection.findUnique({ where: { sectionKey } });
  }

  async findAllSections(): Promise<CmsSection[]> {
    return this.prisma.cmsSection.findMany({ orderBy: { sectionKey: "asc" } });
  }

  async upsertSection(data: UpdateSectionDTO): Promise<CmsSection> {
    return this.prisma.cmsSection.upsert({
      where: { sectionKey: data.sectionKey },
      create: data,
      update: {
        title: data.title,
        subtitle: data.subtitle,
        contentJson: data.contentJson,
        isActive: data.isActive ?? true,
      },
    });
  }
}
