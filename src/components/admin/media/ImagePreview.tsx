"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Copy, Check, Trash2, Tag, Calendar, HardDrive, Maximize2 } from "lucide-react";
import { MediaItem } from "@/types/media";

interface ImagePreviewProps {
  isOpen: boolean;
  item: MediaItem | null;
  itemsList: MediaItem[];
  onClose: () => void;
  onNavigate: (newItem: MediaItem) => void;
  onDelete: (item: MediaItem) => void;
  onAssign?: (item: MediaItem) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  isOpen,
  item,
  itemsList,
  onClose,
  onNavigate,
  onDelete,
  onAssign,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const currentIndex = itemsList.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < itemsList.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setZoomLevel(1);
      onNavigate(itemsList[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setZoomLevel(1);
      onNavigate(itemsList[currentIndex + 1]);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-800 w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Main Viewer Area */}
        <div className="relative flex-1 bg-black/90 flex items-center justify-center p-4 min-h-87.5 md:min-h-125 overflow-hidden">
          {/* Top Control Overlay */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-stone-900/80 p-1.5 rounded-xl border border-stone-800 backdrop-blur-xs text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
              className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <span className="font-mono text-[11px] px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.5))}
              className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-stone-800 rounded-lg transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Previous / Next Buttons */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-stone-900/80 hover:bg-amber-600 rounded-full border border-stone-800 transition-colors"
              title="Previous Media"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-stone-900/80 hover:bg-amber-600 rounded-full border border-stone-800 transition-colors"
              title="Next Media"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Image Container with zoom scale */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <Image
              src={item.url}
              alt={item.name}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 800px"
              unoptimized
            />
          </div>
        </div>

        {/* Right Info Sidebar */}
        <div className="w-full md:w-80 bg-stone-900 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-800 space-y-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-100 truncate max-w-50">{item.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {item.folder}
                </span>
              </div>
              <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg">
                <X size={18} />
              </button>
            </div>

            {/* Metadata breakdown */}
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-center justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Maximize2 size={13} className="text-amber-500" /> Dimensions
                </span>
                <span className="font-mono font-semibold">{item.dimensions}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <HardDrive size={13} className="text-amber-500" /> File Size
                </span>
                <span className="font-semibold">{item.size}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-500" /> Upload Date
                </span>
                <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-4 border-t border-stone-800 text-xs">
            <button
              onClick={handleCopyUrl}
              className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "URL Copied to Clipboard!" : "Copy Image URL"}</span>
            </button>

            {onAssign && (
              <button
                onClick={() => onAssign(item)}
                className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Tag size={14} />
                <span>Assign to Product / Category</span>
              </button>
            )}

            <button
              onClick={() => {
                onDelete(item);
                onClose();
              }}
              className="w-full py-2 px-3 bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 border border-rose-800/40"
            >
              <Trash2 size={14} />
              <span>Delete File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
