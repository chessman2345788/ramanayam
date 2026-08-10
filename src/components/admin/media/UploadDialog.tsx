"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, UploadCloud, CheckCircle2, FileImage } from "lucide-react";
import { MediaFolderType, MediaItem } from "@/types/media";

interface UploadDialogProps {
  isOpen: boolean;
  folders: MediaFolderType[];
  defaultFolder?: MediaFolderType;
  onClose: () => void;
  onUploadSuccess: (newFiles: MediaItem[]) => void;
}

export const UploadDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  folders,
  defaultFolder = "Murti",
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<MediaFolderType>(defaultFolder);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stagedFiles, setStagedFiles] = useState<
    { name: string; url: string; sizeStr: string; sizeBytes: number; dimensions: string }[]
  >([]);

  if (!isOpen) return null;

  const handleSimulateSelectFiles = () => {
    // Simulate picking multiple media assets
    const mocks = [
      {
        name: "shri_ram_poshak_yellow_silk.jpg",
        url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80",
        sizeStr: "1.9 MB",
        sizeBytes: 1992294,
        dimensions: "1920 x 1280 px",
      },
      {
        name: "bhimseni_kapoor_pure_crystals.jpg",
        url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1000&auto=format&fit=crop&q=80",
        sizeStr: "1.4 MB",
        sizeBytes: 1468006,
        dimensions: "1600 x 1200 px",
      },
    ];
    setStagedFiles(mocks);
  };

  const handleStartUpload = () => {
    if (stagedFiles.length === 0) return;
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newMediaItems: MediaItem[] = stagedFiles.map((f, i) => ({
              id: `med-up-${Date.now()}-${i}`,
              name: f.name,
              url: f.url,
              folder: selectedFolder,
              dimensions: f.dimensions,
              size: f.sizeStr,
              sizeBytes: f.sizeBytes,
              uploadDate: new Date().toISOString(),
              mimeType: "image/jpeg",
            }));
            onUploadSuccess(newMediaItems);
            setIsUploading(false);
            setStagedFiles([]);
            onClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">Upload Media Assets</h3>
            <p className="text-xs text-stone-500">Drag and drop images or select files to upload to Cloudinary/CDN.</p>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* Folder Destination Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">Target Folder</label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value as MediaFolderType)}
            className="w-full px-3 py-2 border border-stone-200 rounded-xl bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            {folders.map((f) => (
              <option key={f} value={f}>
                Folder: {f}
              </option>
            ))}
          </select>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onClick={handleSimulateSelectFiles}
          className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/30 hover:bg-amber-50/60 rounded-2xl p-8 text-center cursor-pointer transition-colors space-y-2"
        >
          <UploadCloud size={36} className="mx-auto text-amber-600" />
          <div className="text-sm font-bold text-stone-800">
            {stagedFiles.length > 0
              ? `${stagedFiles.length} files ready to upload`
              : "Click or drag images here to upload"}
          </div>
          <p className="text-xs text-stone-500">PNG, JPG, WEBP, GIF up to 10MB per file</p>
        </div>

        {/* Staged Previews */}
        {stagedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-700">Selected Files:</div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {stagedFiles.map((f, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                      <Image src={f.url} alt={f.name} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 truncate max-w-50">{f.name}</div>
                      <div className="text-[11px] text-stone-400">{f.sizeStr}</div>
                    </div>
                  </div>
                  <FileImage size={16} className="text-amber-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-stone-700">
              <span>Uploading to CDN...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-600 h-full transition-all duration-200 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-stone-100">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl">
            Cancel
          </button>
          <button
            onClick={handleStartUpload}
            disabled={stagedFiles.length === 0 || isUploading}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs disabled:opacity-50 flex items-center gap-1.5"
          >
            {isUploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <CheckCircle2 size={14} />
                <span>Upload {stagedFiles.length} {stagedFiles.length === 1 ? "File" : "Files"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
