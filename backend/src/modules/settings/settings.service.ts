import { SettingsRepository } from "./settings.repository";
import { UpdateSettingDTO } from "./settings.types";
import { AppError } from "../../common/errors";

export class SettingsService {
  constructor(private repository: SettingsRepository) {}

  async getAllSettings(category?: string) {
    return this.repository.findAll(category);
  }

  async getSettingByKey(key: string) {
    const setting = await this.repository.findByKey(key);
    if (!setting) {
      throw new AppError(`System setting '${key}' not found`, 404);
    }
    return setting;
  }

  async updateSetting(dto: UpdateSettingDTO) {
    return this.repository.upsert(dto);
  }

  async bulkUpdateSettings(settings: UpdateSettingDTO[]) {
    return this.repository.bulkUpsert(settings);
  }
}
