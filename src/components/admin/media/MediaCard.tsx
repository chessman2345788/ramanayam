"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Copy, Eye, Edit2, FolderInput, Trash2, Check, MoreVertical } from "lucide-react";
import { MediaItem } from "@/types/media";

interface MediaCardProps {
  item: MediaItem;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onPreview: (item: MediaItem) => void;
  onRename: (item: MediaItem) => void;
  onMove: (item: MediaItem) => void;
  onDelete: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  isSelected,
  onSelect,
  onPreview,
  onRename,
  onMove,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between ${
        isSelected ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20" : "border-stone-200 hover:border-amber-300"
      }`}
    >
      {/* Thumbnail Area */}
      <div
        onClick={() => onPreview(item)}
        className="relative w-full h-44 bg-stone-100 cursor-pointer overflow-hidden flex items-center justify-center"
      >
        <Image
          src={item.url}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 260px"
          unoptimized
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Checkbox (Top Left) */}
        <div onClick={(e) => e.stopPropagation()} className="absolute top-2.5 left-2.5 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item.id, e.target.checked)}
            className="rounded border-white/80 text-amber-600 focus:ring-amber-500 shadow-sm cursor-pointer w-4 h-4"
          />
        </div>

        {/* Folder tag (Top Right) */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
            {item.folder}
          </span>
        </div>

        {/* Quick Preview overlay icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-3 py-1.5 bg-white/90 text-stone-900 font-semibold text-xs rounded-xl shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
            <Eye size={14} /> Preview
          </span>
        </div>
      </div>

      {/* Details & Actions Footer */}
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-stone-900 truncate hover:text-amber-700 cursor-pointer" onClick={() => onPreview(item)}>
            {item.name}
          </h4>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
            <span>{item.dimensions}</span>
            <span>{item.size}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px]">
          <span className="text-stone-400">{formatDate(item.uploadDate)}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyUrl}
              className="p-1 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-stone-100 transition-colors"
              title="Copy Image URL"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <MoreVertical size={14} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-36 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-30 text-xs">
                  <button
                    onClick={() => {
                      onPreview(item);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                  >
                    <Eye size={13} /> Preview
                  </button>
                  <button
                    onClick={() => {
                      onRename(item);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                  >
                    <Edit2 size={13} /> Rename
                  </button>
                  <button
                    onClick={() => {
                      onMove(item);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-stone-50 text-stone-700"
                  >
                    <FolderInput size={13} /> Move Folder
                  </button>
                  <button
                    onClick={() => {
                      onDelete(item);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-rose-50 text-rose-600"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
