import { Request, Response } from "express";
import { CmsService } from "./cms.service";

export class CmsController {
  constructor(private service: CmsService) {}

  // Banners
  createBanner = async (req: Request, res: Response) => {
    const banner = await this.service.createBanner(req.body);
    res.status(201).json({
      success: true,
      message: "CMS banner created successfully",
      data: banner,
    });
  };

  getBanners = async (req: Request, res: Response) => {
    const position = req.query.position as string | undefined;
    const activeOnly = req.query.activeOnly === "true";
    const banners = await this.service.getBanners(position, activeOnly);
    res.status(200).json({
      success: true,
      data: banners,
    });
  };

  updateBanner = async (req: Request, res: Response) => {
    const banner = await this.service.updateBanner(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "CMS banner updated successfully",
      data: banner,
    });
  };

  deleteBanner = async (req: Request, res: Response) => {
    await this.service.deleteBanner(req.params.id);
    res.status(200).json({
      success: true,
      message: "CMS banner deleted successfully",
    });
  };

  // Sections
  getSections = async (_req: Request, res: Response) => {
    const sections = await this.service.getSections();
    res.status(200).json({
      success: true,
      data: sections,
    });
  };

  getSectionByKey = async (req: Request, res: Response) => {
    const section = await this.service.getSectionByKey(req.params.key);
    res.status(200).json({
      success: true,
      data: section,
    });
  };

  updateSection = async (req: Request, res: Response) => {
    const section = await this.service.updateSection(req.params.key, req.body);
    res.status(200).json({
      success: true,
      message: "CMS section updated successfully",
      data: section,
    });
  };
}
