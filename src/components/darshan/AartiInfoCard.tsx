'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Bookmark, Sparkles, MapPin, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AartiInfoCardProps {
  title: string;
  temple: string;
  location: string;
  deity: string;
  description?: string;
}

export function AartiInfoCard({ title, temple, location, deity, description }: AartiInfoCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-2xl p-6 flex flex-col gap-6 liquid-glass shadow-xl">
      
      {/* Title & Info */}
      <div>
        <h2 className="text-xl font-bold font-serif text-white tracking-wide leading-tight">
          {title}
        </h2>
        <p className="text-[#C8C8D5] text-xs flex items-center gap-1.5 mt-2 font-medium">
          <MapPin size={13} className="text-[#F97316]" />
          {temple} · {location}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[#C8C8D5] text-xs leading-relaxed border-t border-white/5 pt-4">
          {description}
        </p>
      )}

      {/* Deity Details */}
      <div className="flex items-center gap-4 bg-white/2 border border-white/5 rounded-xl p-4">
        <div className="p-2.5 bg-[#F97316]/10 rounded-lg text-[#F97316]">
          <Sparkles size={16} />
        </div>
        <div>
          <span className="text-[#C8C8D5] text-[9px] uppercase tracking-widest block font-bold">Presiding Deity</span>
          <span className="text-white text-xs font-bold font-serif mt-0.5 block">{deity}</span>
        </div>
      </div>

      {/* Primary Donate & Actions Panel */}
      <div className="flex flex-col gap-3.5 border-t border-white/5 pt-4">
        <motion.button
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3 px-6 bg-[#F97316] text-white rounded-full font-bold uppercase tracking-wider text-[11px] flex items-center justify-center gap-2 hover:bg-[#F97316]/90 transition-colors shadow-lg shadow-[#F97316]/15 cursor-pointer border border-white/10"
        >
          <Gift size={14} />
          <span>Donate Prasad Money</span>
        </motion.button>

        <div className="flex gap-2">
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="flex-1 py-2.5 px-4 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Share2 size={13} className="text-[#F97316]" />
            <span>{copied ? "Copied!" : "Share Link"}</span>
          </button>

          {/* Bookmark Button */}
          <button 
            onClick={() => setBookmarked(!bookmarked)}
            className={cn(
              "p-2.5 border rounded-xl flex items-center justify-center transition-all cursor-pointer",
              bookmarked 
                ? "bg-[#F97316]/10 border-[#F97316]/20 text-[#F97316]" 
                : "bg-white/3 border-white/5 hover:border-white/10 text-[#B8B8C5]"
            )}
            title={bookmarked ? "Bookmarked!" : "Bookmark"}
          >
            <Bookmark size={14} className={cn(bookmarked && "fill-current")} />
          </button>
        </div>
      </div>
    </div>
  );
}
