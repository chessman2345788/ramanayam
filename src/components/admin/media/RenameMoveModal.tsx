"use client";

import React, { useState, useEffect } from "react";
import { X, Edit3, FolderInput, FolderPlus } from "lucide-react";
import { MediaFolderType, MediaItem } from "@/types/media";

interface RenameMoveModalProps {
  isOpen: boolean;
  type: "rename" | "move" | "createFolder" | null;
  targetItem?: MediaItem | null;
  folders: MediaFolderType[];
  onClose: () => void;
  onRenameSave?: (id: string, newName: string) => void;
  onMoveSave?: (id: string, newFolder: MediaFolderType) => void;
  onCreateFolder?: (folderName: string) => void;
}

export const RenameMoveModal: React.FC<RenameMoveModalProps> = ({
  isOpen,
  type,
  targetItem,
  folders,
  onClose,
  onRenameSave,
  onMoveSave,
  onCreateFolder,
}) => {
  const [name, setName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<MediaFolderType>("Murti");

  useEffect(() => {
    if (targetItem) {
      setName(targetItem.name);
      setSelectedFolder(targetItem.folder);
    } else {
      setName("");
    }
  }, [targetItem, isOpen]);

  if (!isOpen || !type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "rename" && targetItem && onRenameSave) {
      onRenameSave(targetItem.id, name);
    } else if (type === "move" && targetItem && onMoveSave) {
      onMoveSave(targetItem.id, selectedFolder);
    } else if (type === "createFolder" && onCreateFolder) {
      if (name.trim()) onCreateFolder(name.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-md overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 text-xs md:text-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              {type === "rename" ? <Edit3 size={16} /> : type === "move" ? <FolderInput size={16} /> : <FolderPlus size={16} />}
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {type === "rename"
                ? "Rename Media Asset"
                : type === "move"
                ? "Move to Folder"
                : "Create New Folder"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "rename" && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">File Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 text-xs font-medium"
              />
            </div>
          )}

          {type === "move" && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Destination Folder</label>
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
          )}

          {type === "createFolder" && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Folder Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ritual Thalis"
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 text-xs font-medium"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
