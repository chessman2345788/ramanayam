'use client';

import { liveDarshans } from "@/data/products";
import { PageTransition } from "@/components/animations/PageTransition";
import { LiveNavbar } from "@/components/darshan/LiveNavbar";
import { LivePlayer } from "@/components/darshan/LivePlayer";
import { LiveChat } from "@/components/darshan/LiveChat";
import { AartiInfoCard } from "@/components/darshan/AartiInfoCard";
import { ScheduleCard } from "@/components/darshan/ScheduleCard";
import { MinimalFooter } from "@/components/darshan/MinimalFooter";
import { MapPin, Sparkles } from "lucide-react";

export default function LiveDarshanPage() {
  const mainStream = liveDarshans[0];
  const schedule = liveDarshans;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#090514] text-white selection:bg-[#F97316] relative flex flex-col justify-between">
        
        {/* Sticky Live Header Navbar */}
        <LiveNavbar />

        {/* Main Content */}
        <main className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 pt-32 flex-1 flex flex-col gap-6">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 py-6 border-b border-white/5">
            <div>
              <nav className="text-[9px] uppercase tracking-[0.25em] font-bold text-accent mb-2 font-serif">
                Home / Live Portal
              </nav>
              <h1 className="text-3xl md:text-[38px] font-display text-white leading-tight tracking-wide">
                {mainStream.title}
              </h1>
            </div>

            {/* Location & View Stats */}
            <div className="flex items-center flex-wrap gap-4 text-xs font-semibold text-white/70">
              <div className="flex items-center gap-2 bg-white/3 border border-white/8 py-2.5 px-4.5 rounded-xl">
                <MapPin size={14} className="text-accent" />
                <span>{mainStream.location}</span>
              </div>

              <div className="flex items-center gap-2.5 bg-accent/10 border border-accent/25 py-2.5 px-4.5 rounded-xl text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-bold uppercase tracking-[0.15em] text-[10px]">
                  LIVE &bull; {mainStream.viewerCount.toLocaleString()} Devotees
                </span>
              </div>
            </div>
          </div>

          {/* Player Grid split: 70% Video Player, 30% Chat Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start mt-2">
            
            {/* Player block (ColSpan 7) */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              <LivePlayer 
                thumbnailUrl={mainStream.thumbnailUrl} 
                title={mainStream.title} 
                viewerCount={mainStream.viewerCount} 
              />

              {/* Schedule layout */}
              <div className="flex flex-col gap-4">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 font-serif flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Daily Aarti Broadcasts
                  </h3>
                </div>

                <div className="flex flex-row overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {schedule.map((session, index) => (
                    <ScheduleCard
                      key={session.id}
                      time={new Date(session.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      title={session.title}
                      temple={session.temple}
                      isLive={session.isLive}
                      isCompleted={index === 0 && !session.isLive}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar metadata & Live Chat panel (ColSpan 3) */}
            <div className="lg:col-span-3 flex flex-col gap-8 sticky top-28">
              <AartiInfoCard 
                title={mainStream.title}
                temple={mainStream.temple}
                location={mainStream.location}
                deity={mainStream.deity}
                description="Join standard morning rituals and experience spiritual transcendence from the holy ghats of Varanasi. Recite Vedic prayers alongside priests to invoke blessings."
              />

              <LiveChat />
            </div>

          </div>

        </main>

        <MinimalFooter />

      </div>
    </PageTransition>
  );
}
