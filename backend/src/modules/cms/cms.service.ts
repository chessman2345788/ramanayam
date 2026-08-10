import { CmsRepository } from "./cms.repository";
import { CreateBannerDTO, UpdateBannerDTO, UpdateSectionDTO } from "./cms.types";
import { AppError } from "../../common/errors";

export class CmsService {
  constructor(private repository: CmsRepository) {}

  // Banner Operations
  async createBanner(dto: CreateBannerDTO) {
    return this.repository.createBanner(dto);
  }

  async getBanners(position?: string, activeOnly = false) {
    return this.repository.findAllBanners(position, activeOnly);
  }

  async updateBanner(id: string, dto: UpdateBannerDTO) {
    const existing = await this.repository.findBannerById(id);
    if (!existing) {
      throw new AppError("CMS Banner not found", 404);
    }
    return this.repository.updateBanner(id, dto);
  }

  async deleteBanner(id: string) {
    const existing = await this.repository.findBannerById(id);
    if (!existing) {
      throw new AppError("CMS Banner not found", 404);
    }
    return this.repository.deleteBanner(id);
  }

  // Section Content Operations
  async getSections() {
    return this.repository.findAllSections();
  }

  async getSectionByKey(sectionKey: string) {
    const section = await this.repository.findSectionByKey(sectionKey);
    if (!section) {
      throw new AppError(`CMS Section '${sectionKey}' not found`, 404);
    }
    return section;
  }

  async updateSection(sectionKey: string, dto: Omit<UpdateSectionDTO, "sectionKey">) {
    return this.repository.upsertSection({
      sectionKey,
      ...dto,
    });
  }
}
