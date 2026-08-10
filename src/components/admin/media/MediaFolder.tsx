"use client";

import React from "react";
import { Folder, HardDrive, ArrowRight } from "lucide-react";
import { MediaFolderType, MediaItem } from "@/types/media";

interface MediaFolderProps {
  folders: MediaFolderType[];
  mediaItems: MediaItem[];
  onSelectFolder: (folder: MediaFolderType) => void;
  onCreateFolderClick: () => void;
}

export const MediaFolder: React.FC<MediaFolderProps> = ({
  folders,
  mediaItems,
  onSelectFolder,
  onCreateFolderClick,
}) => {
  const getFolderStats = (folder: MediaFolderType) => {
    const items = mediaItems.filter((i) => i.folder === folder);
    const totalBytes = items.reduce((acc, curr) => acc + (curr.sizeBytes || 0), 0);
    const mb = (totalBytes / (1024 * 1024)).toFixed(1);
    return {
      count: items.length,
      sizeStr: `${mb} MB`,
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
          <Folder size={18} className="text-amber-600" />
          <span>All Media Folders ({folders.length})</span>
        </h3>

        <button
          onClick={onCreateFolderClick}
          className="text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
        >
          + New Folder
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folderName) => {
          const stats = getFolderStats(folderName);
          return (
            <div
              key={folderName}
              onClick={() => onSelectFolder(folderName)}
              className="group bg-white p-4 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
                  <Folder size={24} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
                  {stats.count} {stats.count === 1 ? "file" : "files"}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors truncate">
                  {folderName}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                  <HardDrive size={12} />
                  <span>{stats.sizeStr} used</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500 group-hover:text-amber-700">
                <span>View Contents</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
