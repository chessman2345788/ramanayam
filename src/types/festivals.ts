export type FestivalStatus = "ACTIVE" | "SCHEDULED" | "COMPLETED" | "DRAFT";

export interface FestivalCampaign {
  id: string;
  name: string;
  sanskritName: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  featuredCategory: string;
  bannerImage: string;
  status: FestivalStatus;
  salesGenerated: string;
  ordersCount: number;
  description: string;
}
