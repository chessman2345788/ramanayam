"use client";

import React from "react";
import { MediaItem } from "@/types/media";
import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  items: MediaItem[];
  selectedIds: string[];
  onSelect: (id: string, checked: boolean) => void;
  onPreview: (item: MediaItem) => void;
  onRename: (item: MediaItem) => void;
  onMove: (item: MediaItem) => void;
  onDelete: (item: MediaItem) => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  selectedIds,
  onSelect,
  onPreview,
  onRename,
  onMove,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          isSelected={selectedIds.includes(item.id)}
          onSelect={onSelect}
          onPreview={onPreview}
          onRename={onRename}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
