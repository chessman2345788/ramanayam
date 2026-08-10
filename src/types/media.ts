export type MediaFolderType =
  | "Murti"
  | "Bhagwan Vastra"
  | "Temple Decoration"
  | "Festival"
  | "Books"
  | "Yantra"
  | "Brass"
  | "Copper"
  | "Home Banner"
  | "Collections"
  | "Blogs";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  folder: MediaFolderType;
  dimensions: string; // e.g. "1200 x 800 px"
  size: string; // e.g. "1.4 MB"
  sizeBytes: number;
  uploadDate: string; // ISO date string
  mimeType: string;
}

export type MediaViewMode = "grid" | "list" | "folder";

export type MediaSortOption = "newest" | "oldest" | "name_asc" | "size_desc";
