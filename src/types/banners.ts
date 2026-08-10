export type BannerLocation = "HOME_HERO" | "CATEGORY_HEADER" | "ANNOUNCEMENT_STRIP" | "FESTIVAL_POPUP";
export type BannerStatus = "ACTIVE" | "INACTIVE" | "SCHEDULED";

export interface StorefrontBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  location: BannerLocation;
  position: number;
  status: BannerStatus;
  clickCount: number;
}
