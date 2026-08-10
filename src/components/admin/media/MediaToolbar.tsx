"use client";

import React from "react";
import { Upload, FolderPlus, LayoutGrid, List, Folder, ArrowUpDown } from "lucide-react";
import { MediaFolderType, MediaViewMode, MediaSortOption } from "@/types/media";
import { SearchBar } from "./SearchBar";

interface MediaToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFolder: MediaFolderType | "ALL";
  onFolderChange: (f: MediaFolderType | "ALL") => void;
  availableFolders: MediaFolderType[];
  viewMode: MediaViewMode;
  onViewModeChange: (mode: MediaViewMode) => void;
  sortBy: MediaSortOption;
  onSortChange: (sort: MediaSortOption) => void;
  onOpenUpload: () => void;
  onOpenCreateFolder: () => void;
  totalCount: number;
}

export const MediaToolbar: React.FC<MediaToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedFolder,
  onFolderChange,
  availableFolders,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onOpenUpload,
  onOpenCreateFolder,
  totalCount,
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SearchBar value={searchQuery} onChange={onSearchChange} />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenCreateFolder}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <FolderPlus size={15} className="text-amber-700" />
            <span>Create Folder</span>
          </button>

          <button
            type="button"
            onClick={onOpenUpload}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-2"
          >
            <Upload size={15} />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Bottom controls row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Folder filter dropdown */}
          <select
            value={selectedFolder}
            onChange={(e) => onFolderChange(e.target.value as MediaFolderType | "ALL")}
            className="bg-stone-50 border border-stone-200 text-stone-700 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-45"
          >
            <option value="ALL">All Folders ({totalCount})</option>
            {availableFolders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>

          {/* Sort option */}
          <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1">
            <ArrowUpDown size={13} className="text-amber-600" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as MediaSortOption)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name_asc">Sort: Name (A-Z)</option>
              <option value="size_desc">Sort: File Size (Largest)</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === "grid" ? "bg-amber-600 text-white shadow-2xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <LayoutGrid size={14} />
            <span>Grid</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === "list" ? "bg-amber-600 text-white shadow-2xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <List size={14} />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("folder")}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === "folder" ? "bg-amber-600 text-white shadow-2xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Folder size={14} />
            <span>Folders</span>
          </button>
        </div>
      </div>
    </div>
  );
};
