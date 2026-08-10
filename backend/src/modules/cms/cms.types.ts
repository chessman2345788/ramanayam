export interface CreateBannerDTO {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  position?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateBannerDTO extends Partial<CreateBannerDTO> {}

export interface UpdateSectionDTO {
  sectionKey: string;
  title: string;
  subtitle?: string;
  contentJson: string;
  isActive?: boolean;
}
