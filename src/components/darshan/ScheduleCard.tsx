'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleCardProps {
  time: string;
  title: string;
  temple: string;
  isLive: boolean;
  isCompleted?: boolean;
}

export function ScheduleCard({ time, title, temple, isLive, isCompleted }: ScheduleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: isLive ? '#F97316' : 'rgba(255,255,255,0.2)' }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex-1 min-w-[280px] p-5 rounded-2xl border bg-[#181425] transition-all flex flex-col justify-between shadow-md",
        isLive 
          ? "border-[#F97316]/50 shadow-[0_4px_20px_rgba(249,115,22,0.15)]" 
          : "border-white/5"
      )}
    >
      {/* Top row: Time & Badge */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-[#B8B8C5] text-xs">
          <Clock size={12} className="text-[#F97316]" />
          <span className="font-mono font-medium">{time}</span>
        </div>

        {/* Status Badge */}
        {isLive ? (
          <span className="px-2 py-0.5 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-[8px] font-bold uppercase rounded-md tracking-wider animate-pulse flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#F97316] inline-block" />
            LIVE NOW
          </span>
        ) : isCompleted ? (
          <span className="px-2 py-0.5 bg-white/5 text-[#B8B8C5]/40 text-[8px] font-bold uppercase rounded-md tracking-wider">
            Completed
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-white/3 border border-white/5 text-[#B8B8C5]/60 text-[8px] font-bold uppercase rounded-md tracking-wider">
            Upcoming
          </span>
        )}
      </div>

      {/* Middle/Bottom: Temple Details */}
      <div>
        <h4 className="text-white text-sm font-bold font-serif leading-snug tracking-wide line-clamp-1">
          {title}
        </h4>
        <p className="text-[#B8B8C5]/60 text-xs mt-1 truncate">
          {temple}
        </p>
      </div>
    </motion.div>
  );
}
