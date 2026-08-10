import { motion } from "framer-motion";
import Image from "next/image";
import type { LiveDarshan } from "@/types/products";

interface DarshanStreamProps {
  mainStream: LiveDarshan;
  imgError: boolean;
  setImgError: (err: boolean) => void;
}

export function DarshanStream({
  mainStream,
  imgError,
  setImgError,
}: DarshanStreamProps) {
  return (
    <div>
      <div
        style={{
          aspectRatio: '16/9',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          background: '#F0EAE0',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {!imgError ? (
          <Image
            src={mainStream.thumbnailUrl}
            alt={mainStream.title}
            fill
            style={{ objectFit: 'cover' }}
            onError={() => setImgError(true)}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #F3EDE3, #E8DCC8)' }} />
        )}

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)' }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(245,124,0,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(245,124,0,0.35)',
            }}
          >
            <div style={{ width: 0, height: 0, borderLeft: '20px solid white', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: 4 }} />
          </motion.div>
        </div>

      
        <div
          style={{
            position: 'absolute', top: 20, left: 20,
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
            padding: '8px 16px', borderRadius: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'block' }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--live-red)', letterSpacing: '0.1em' }}>LIVE</span>
        </div>
      </div>

   
      <div
        style={{
          marginTop: 20, padding: '20px 28px',
          borderRadius: 20, background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}
      >
        <div>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
            Make an Offering
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            Send prasad or donate to the temple
          </p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: 12, padding: '12px 28px' }}>
          Donate ₹
        </button>
      </div>
    </div>
  );
}
export default DarshanStream;
