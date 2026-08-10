"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Archive, CheckCircle, XCircle, FolderPlus, X } from "lucide-react";
import { BulkActionType } from "../types/product.types";

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkAction: (action: BulkActionType) => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onBulkAction,
}: BulkActionsBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#171717] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 text-xs select-none"
        >
          <div className="flex items-center gap-2 font-semibold border-r border-white/15 pr-3">
            <span className="w-5 h-5 rounded-full bg-[#F57C00] text-white flex items-center justify-center text-[10px] font-bold">
              {selectedCount}
            </span>
            <span>Selected</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onBulkAction("publish")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/10 text-emerald-400 transition-colors font-medium"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Publish
            </button>

            <button
              type="button"
              onClick={() => onBulkAction("unpublish")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/10 text-slate-300 transition-colors font-medium"
            >
              <XCircle className="w-3.5 h-3.5" />
              Unpublish
            </button>

            <button
              type="button"
              onClick={() => onBulkAction("archive")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/10 text-amber-400 transition-colors font-medium"
            >
              <Archive className="w-3.5 h-3.5" />
              Archive
            </button>

            <button
              type="button"
              onClick={() => onBulkAction("delete")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>

          <button
            type="button"
            onClick={onClearSelection}
            className="p-1 hover:bg-white/10 rounded-full text-white/60 hover:text-white ml-2 transition-colors"
            title="Deselect all"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
