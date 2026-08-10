import { Request, Response } from "express";
import { SettingsService } from "./settings.service";

export class SettingsController {
  constructor(private service: SettingsService) {}

  getAll = async (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    const settings = await this.service.getAllSettings(category);
    res.status(200).json({
      success: true,
      data: settings,
    });
  };

  getByKey = async (req: Request, res: Response) => {
    const setting = await this.service.getSettingByKey(req.params.key);
    res.status(200).json({
      success: true,
      data: setting,
    });
  };

  update = async (req: Request, res: Response) => {
    const setting = await this.service.updateSetting(req.body);
    res.status(200).json({
      success: true,
      message: "System setting updated successfully",
      data: setting,
    });
  };

  bulkUpdate = async (req: Request, res: Response) => {
    const settings = await this.service.bulkUpdateSettings(req.body.settings);
    res.status(200).json({
      success: true,
      message: "System settings updated successfully",
      data: settings,
    });
  };
}
