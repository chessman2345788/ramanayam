"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, Eye, Edit2, FolderInput, Trash2 } from "lucide-react";
import { MediaItem } from "@/types/media";

interface MediaListProps {
  items: MediaItem[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  onPreview: (item: MediaItem) => void;
  onRename: (item: MediaItem) => void;
  onMove: (item: MediaItem) => void;
  onDelete: (item: MediaItem) => void;
}

export const MediaList: React.FC<MediaListProps> = ({
  items,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onPreview,
  onRename,
  onMove,
  onDelete,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
      <table className="w-full text-left border-collapse text-xs md:text-sm">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isSomeSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
            </th>
            <th className="py-3 px-4">Thumbnail & File Name</th>
            <th className="py-3 px-4">Folder</th>
            <th className="py-3 px-4">Dimensions</th>
            <th className="py-3 px-4">Size</th>
            <th className="py-3 px-4">Upload Date</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 text-stone-800">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <tr key={item.id} className={`hover:bg-amber-50/30 transition-colors ${isSelected ? "bg-amber-50/50" : ""}`}>
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelectOne(item.id, e.target.checked)}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => onPreview(item)}
                      className="relative w-10 h-10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 cursor-pointer"
                    >
                      <Image src={item.url} alt={item.name} fill className="object-cover" sizes="40px" unoptimized />
                    </div>
                    <div>
                      <span
                        onClick={() => onPreview(item)}
                        className="font-semibold text-stone-900 hover:text-amber-700 cursor-pointer truncate max-w-50 block"
                      >
                        {item.name}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">{item.mimeType}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
                    {item.folder}
                  </span>
                </td>
                <td className="py-3 px-4 text-stone-600">{item.dimensions}</td>
                <td className="py-3 px-4 text-stone-600 font-semibold">{item.size}</td>
                <td className="py-3 px-4 text-stone-500 text-xs whitespace-nowrap">{formatDate(item.uploadDate)}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onPreview(item)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                      title="Preview"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-stone-100"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                    <button
                      onClick={() => onRename(item)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                      title="Rename"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onMove(item)}
                      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                      title="Move Folder"
                    >
                      <FolderInput size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
