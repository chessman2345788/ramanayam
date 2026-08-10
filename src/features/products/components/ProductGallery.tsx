import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/types/products";

interface ProductGalleryProps {
  product: Product;
  galleryImages: { src: string; label: string }[];
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  imgError: boolean;
  setImgError: (err: boolean) => void;
  discount: number;
}

export function ProductGallery({
  product,
  galleryImages,
  activeImageIndex,
  setActiveImageIndex,
  imgError,
  setImgError,
  discount,
}: ProductGalleryProps) {
  const currentSrc = galleryImages[activeImageIndex]?.src || product.image;
  const isBadTechImage = currentSrc?.includes('photo-1593508512255') || currentSrc?.includes('placeholder');
  const safeImgSrc = isBadTechImage
    ? 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80'
    : currentSrc;

  return (
    <div style={{ position: "sticky", top: 120 }}>
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          aspectRatio: "1",
          borderRadius: 24,
          overflow: "hidden",
          background: "linear-gradient(135deg, #EAE4D8, #DFD7C8)",
          boxShadow: "0 12px 36px rgba(26,15,10,0.08)",
          border: "0.5px solid rgba(26,15,10,0.08)",
          marginBottom: 20,
        }}
      >
        {!imgError ? (
          <Image
            src={safeImgSrc}
            alt={product.name}
            fill
            priority
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
            sizes="(max-width: 1024px) 100vw, 600px"
            unoptimized
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F3EDE3, #E8DCC8)", fontSize: 64 }}>
            ⚜️
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span style={{
            position: "absolute", top: 18, left: 18,
            padding: "5px 13px",
            background: "#E8660A",
            color: "#FFFFFF",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", borderRadius: 100,
            boxShadow: "0 4px 12px rgba(232,102,10,0.35)",
            zIndex: 2,
          }}>
            −{discount}% OFF
          </span>
        )}
      </motion.div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {galleryImages.map((img, idx) => {
          const thumbSrc = (img.src && !img.src.includes('photo-1593508512255'))
            ? img.src
            : 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80';
          return (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              aria-label={`View ${product.name} ${img.label}`}
              aria-selected={activeImageIndex === idx}
              style={{
                width: 68, height: 68, borderRadius: 16, overflow: "hidden",
                border: `2px solid ${activeImageIndex === idx ? "#E8660A" : "rgba(26,15,10,0.1)"}`,
                cursor: "pointer", position: "relative", background: "#FAF8F3",
                transition: "all 0.25s ease",
                boxShadow: activeImageIndex === idx ? "0 4px 12px rgba(232,102,10,0.25)" : "none",
              }}
            >
              {!imgError ? (
                <Image src={thumbSrc} alt={`${product.name} ${img.label}`} fill style={{ objectFit: "cover" }} sizes="68px" unoptimized />
              ) : (
                <span style={{ fontSize: 14 }}>⚜️</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default ProductGallery;
