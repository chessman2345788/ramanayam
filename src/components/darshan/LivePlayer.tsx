'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LivePlayerProps {
  thumbnailUrl: string;
  title: string;
  viewerCount: number;
}

export function LivePlayer({ thumbnailUrl, title, viewerCount }: LivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 1500);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      className={cn(
        "relative w-full aspect-video rounded-[24px] overflow-hidden bg-[#0F0B1D] border border-white/8 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group",
        isFullscreen && "fixed inset-0 z-100 w-screen h-screen aspect-auto rounded-none"
      )}
    >
      {/* Background Image / Thumbnail with zoom transition */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        priority
        className={cn(
          "object-cover select-none pointer-events-none transition-transform duration-[20s] ease-out",
          isPlaying ? "scale-108" : "scale-100"
        )}
        sizes="100vw"
      />

      {/* Premium Vignette Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/30 z-0" />

      {/* Floating spiritual sparks rising */}
      {isPlaying && (
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#F97316] rounded-full"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: "110%", 
                scale: Math.random() * 0.8 + 0.4,
                opacity: 0 
              }}
              animate={{ 
                y: "-10%", 
                opacity: [0, 0.9, 0.9, 0],
                x: `calc(${Math.random() * 100}% + ${Math.random() * 60 - 30}px)`
              }}
              transition={{ 
                duration: Math.random() * 5 + 4, 
                repeat: Infinity, 
                delay: Math.random() * 4,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Play / Start State Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-[2px]">
          {/* Rotating Mandala Decor behind play button */}
          <div className="absolute w-44 h-44 border border-[#F97316]/10 rounded-full animate-mandala-spin" />
          <div className="absolute w-52 h-52 border border-[#F97316]/5 rounded-full animate-[mandala-spin_360s_linear_infinite]" />
          
          <div className="text-5xl mb-5 opacity-40 select-none animate-float">🕉️</div>
          
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(249, 115, 22, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            className="relative z-10 w-16 h-16 bg-[#F97316] text-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_24px_rgba(249,115,22,0.4)] transition-all border border-white/10"
            aria-label="Play Live Darshan"
          >
            <Video className="w-6 h-6 ml-0.5" />
          </motion.button>
          
          <p className="text-white text-xs font-bold tracking-[0.25em] mt-6 uppercase drop-shadow-lg">
            Begin Sacred Darshan
          </p>
        </div>
      )}

      {/* Connecting Stream Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#0F0B1D]/90 backdrop-blur-md flex flex-col items-center justify-center z-20">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-0 rounded-full border-t-2 border-[#F97316] animate-spin" />
            <span className="text-lg text-white select-none">🕉️</span>
          </div>
          <p className="text-[#C8C8D5] text-[10px] tracking-[0.25em] font-semibold uppercase mt-6 animate-pulse">
            Connecting to Holy Feed...
          </p>
        </div>
      )}

      {/* Floating Header Badges */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
        {/* Pulsating Live Badge */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 10px rgba(249,115,22,0.3)", "0 0 20px rgba(249,115,22,0.6)", "0 0 10px rgba(249,115,22,0.3)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#F97316] text-white rounded-full text-[9px] font-bold uppercase tracking-widest pointer-events-auto shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-white absolute" />
          LIVE
        </motion.div>

        {/* Live Viewers count inside liquid glass pill */}
        <div className="px-3.5 py-1.5 bg-white/5 border border-white/8 text-white rounded-full text-[9px] font-mono tracking-wider uppercase pointer-events-auto backdrop-blur-md shadow-md">
          {viewerCount.toLocaleString()} Devotees
        </div>
      </div>

      {/* Bottom Controls Bar (Liquid Glass style) */}
      {isPlaying && (
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
          {/* Info overlay */}
          <div className="text-left drop-shadow-lg select-none">
            <p className="text-[10px] text-[#F97316] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Direct Temple Feed
            </p>
            <p className="text-[9px] text-[#C8C8D5] mt-0.5">
              {new Date().toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMuted(!isMuted)} 
              className="p-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/8 transition-colors cursor-pointer"
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.button>
            
            <div className="px-3 py-2.5 bg-white/5 backdrop-blur-md rounded-xl text-[9px] font-bold text-white border border-white/8 font-mono tracking-wider select-none">
              HD 1080p
            </div>

            <motion.button 
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleFullscreen}
              className="p-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/8 transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 size={14} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
