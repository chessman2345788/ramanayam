export type SectionType =
  | "HERO_BANNER"
  | "FEATURED_COLLECTIONS"
  | "SACRED_PUJA_KITS"
  | "FESTIVAL_SPECIAL"
  | "TEMPLE_PRASHAD"
  | "CUSTOMER_REVIEWS"
  | "DEVOTEES_TRUST";

export interface HomepageSection {
  id: string;
  title: string;
  subtitle: string;
  type: SectionType;
  position: number;
  isVisible: boolean;
  itemCount: number;
}
