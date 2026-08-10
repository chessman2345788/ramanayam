"use client";

import React, { useState, useMemo } from "react";
import { Trash2, FolderInput, Download, Tag } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { initialMediaFolders, initialMockMediaItems } from "@/data/mockMediaData";
import { MediaFolderType, MediaItem, MediaSortOption, MediaViewMode } from "@/types/media";
import { MediaToolbar } from "@/components/admin/media/MediaToolbar";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaList } from "@/components/admin/media/MediaList";
import { MediaFolder } from "@/components/admin/media/MediaFolder";
import { ImagePreview } from "@/components/admin/media/ImagePreview";
import { UploadDialog } from "@/components/admin/media/UploadDialog";
import { RenameMoveModal } from "@/components/admin/media/RenameMoveModal";

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMockMediaItems);
  const [folders, setFolders] = useState<MediaFolderType[]>(initialMediaFolders);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Toolbar state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<MediaFolderType | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<MediaViewMode>("grid");
  const [sortBy, setSortBy] = useState<MediaSortOption>("newest");

  // Modal states
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [actionModal, setActionModal] = useState<{ type: "rename" | "move" | "createFolder" | null; item?: MediaItem | null }>({
    type: null,
  });

  // Handlers
  const handleDeleteItem = (item: MediaItem) => {
    setMediaItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedIds((prev) => prev.filter((id) => id !== item.id));
  };

  const handleBulkDelete = () => {
    setMediaItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  const handleBulkMove = (targetFolder: MediaFolderType) => {
    setMediaItems((prev) =>
      prev.map((i) => (selectedIds.includes(i.id) ? { ...i, folder: targetFolder } : i))
    );
    setSelectedIds([]);
  };

  // Filtered and sorted media
  const filteredItems = useMemo(() => {
    return mediaItems
      .filter((item) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(q);
          const matchesFolder = item.folder.toLowerCase().includes(q);
          if (!matchesName && !matchesFolder) return false;
        }

        if (selectedFolder !== "ALL" && item.folder !== selectedFolder) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        if (sortBy === "oldest") return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        if (sortBy === "name_asc") return a.name.localeCompare(b.name);
        if (sortBy === "size_desc") return b.sizeBytes - a.sizeBytes;
        return 0;
      });
  }, [mediaItems, searchQuery, selectedFolder, sortBy]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-stone-50/40 min-h-screen text-stone-900">
      <AdminPageHeader
        title="Media Library"
        subtitle={`Manage assets across ${folders.length} folders.`}
      />

      <MediaToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFolder={selectedFolder}
        onFolderChange={setSelectedFolder}
        availableFolders={folders}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenCreateFolder={() => setActionModal({ type: "createFolder" })}
        totalCount={mediaItems.length}
      />

      {/* Multi Select Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-amber-950 text-amber-50 px-4 py-2.5 rounded-xl text-xs shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 font-semibold">
            <span className="bg-amber-800 text-amber-100 px-2 py-0.5 rounded-full text-[11px]">{selectedIds.length}</span>
            <span>assets selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const target = prompt("Enter folder name to move selected files (e.g. Brass, Murti):") as MediaFolderType;
                if (target && folders.includes(target)) handleBulkMove(target);
              }}
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <FolderInput size={13} />
              <span>Move</span>
            </button>
            <button
              onClick={() => alert(`Downloading ${selectedIds.length} assets zip...`)}
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Download size={13} />
              <span>Download</span>
            </button>
            <button
              onClick={() => alert(`Assigned ${selectedIds.length} media files.`)}
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Tag size={13} />
              <span>Assign</span>
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      {viewMode === "folder" ? (
        <MediaFolder
          folders={folders}
          mediaItems={mediaItems}
          onSelectFolder={(f) => {
            setSelectedFolder(f);
            setViewMode("grid");
          }}
          onCreateFolderClick={() => setActionModal({ type: "createFolder" })}
        />
      ) : viewMode === "grid" ? (
        <MediaGrid
          items={filteredItems}
          selectedIds={selectedIds}
          onSelect={(id, checked) => setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))}
          onPreview={(item) => setPreviewItem(item)}
          onRename={(item) => setActionModal({ type: "rename", item })}
          onMove={(item) => setActionModal({ type: "move", item })}
          onDelete={handleDeleteItem}
        />
      ) : (
        <MediaList
          items={filteredItems}
          selectedIds={selectedIds}
          onSelectAll={(checked) => setSelectedIds(checked ? filteredItems.map((i) => i.id) : [])}
          onSelectOne={(id, checked) => setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))}
          onPreview={(item) => setPreviewItem(item)}
          onRename={(item) => setActionModal({ type: "rename", item })}
          onMove={(item) => setActionModal({ type: "move", item })}
          onDelete={handleDeleteItem}
        />
      )}

      {/* Modals */}
      <ImagePreview
        isOpen={!!previewItem}
        item={previewItem}
        itemsList={filteredItems}
        onClose={() => setPreviewItem(null)}
        onNavigate={(newItem) => setPreviewItem(newItem)}
        onDelete={handleDeleteItem}
        onAssign={(item) => alert(`Assigned ${item.name} to active product!`)}
      />

      <UploadDialog
        isOpen={isUploadOpen}
        folders={folders}
        defaultFolder={selectedFolder === "ALL" ? "Murti" : selectedFolder}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={(newFiles) => setMediaItems((prev) => [...newFiles, ...prev])}
      />

      <RenameMoveModal
        isOpen={!!actionModal.type}
        type={actionModal.type}
        targetItem={actionModal.item}
        folders={folders}
        onClose={() => setActionModal({ type: null })}
        onRenameSave={(id, newName) =>
          setMediaItems((prev) => prev.map((i) => (i.id === id ? { ...i, name: newName } : i)))
        }
        onMoveSave={(id, newFolder) =>
          setMediaItems((prev) => prev.map((i) => (i.id === id ? { ...i, folder: newFolder } : i)))
        }
        onCreateFolder={(name) => setFolders((prev) => [...prev, name as MediaFolderType])}
      />
    </div>
  );
}
