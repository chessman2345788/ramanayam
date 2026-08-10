import { Star, ShoppingBag, Heart, Share2, Minus, Plus, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types/products";

interface ProductInfoProps {
  product: Product;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  handleAddToCart: () => void;
  handleToggleWishlist: () => void;
  wishlisted: boolean;
  discount: number;
  activeTab: "specs" | "guide" | "ingredients";
  setActiveTab: (tab: "specs" | "guide" | "ingredients") => void;
}

export function ProductInfo({
  product,
  quantity,
  incrementQuantity,
  decrementQuantity,
  handleAddToCart,
  handleToggleWishlist,
  wishlisted,
  discount,
  activeTab,
  setActiveTab,
}: ProductInfoProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div style={{ position: "sticky", top: 120 }}>
      {/* Category eyebrow */}
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#A8822A', marginBottom: 12, marginTop: 0
      }}>
        {product.category}
      </p>

      {/* Product Name */}
      <h1 style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(32px, 4vw, 48px)",
        fontWeight: 600, lineHeight: 1.1, color: "#1A0F0A", marginBottom: 8, letterSpacing: "-0.01em"
      }}>
        {product.name}
      </h1>

      {/* Hindi name */}
      {product.nameHi && (
        <p style={{ fontSize: 15, color: "#A8822A", marginBottom: 20, fontWeight: 500 }}>
          {product.nameHi}
        </p>
      )}

      {/* Rating */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={15} fill={i < Math.round(product.rating || 5) ? "#A8822A" : "transparent"} color={i < Math.round(product.rating || 5) ? "#A8822A" : "rgba(26,15,10,0.2)"} />
          ))}
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A0F0A" }}>{product.rating || 4.9}</span>
        <span style={{ fontSize: 13, color: "rgba(26,15,10,0.5)" }}>· {product.reviewCount || 234} reviews</span>
      </div>

      {/* Price Box */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px 24px", borderRadius: 18,
        background: "linear-gradient(135deg, #F5F0E8 0%, #EAE4D8 100%)",
        border: "1px solid rgba(168,130,42,0.15)",
        marginBottom: 28,
      }}>
        <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 700, color: "#1A0F0A" }}>
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.mrp > product.price && (
          <span style={{ fontSize: 16, color: "rgba(26,15,10,0.4)", textDecoration: "line-through" }}>
            ₹{product.mrp.toLocaleString("en-IN")}
          </span>
        )}
        {discount > 0 && (
          <span style={{
            fontSize: 12, fontWeight: 700,
            color: "#E8660A",
            background: "rgba(232,102,10,0.12)",
            padding: "4px 14px", borderRadius: 100,
            border: "1px solid rgba(232,102,10,0.3)"
          }}>
            Save {discount}%
          </span>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(26,15,10,0.7)", marginBottom: 32 }}>
        {product.description}
      </p>

      {/* Quantity + CTA Buttons */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
        {/* Quantity Controls */}
        <div style={{
          display: "flex", alignItems: "center", borderRadius: 100,
          border: "1px solid rgba(26,15,10,0.15)",
          background: "#FFFFFF", overflow: "hidden", height: 52, flexShrink: 0,
        }}>
          <button
            onClick={decrementQuantity}
            style={{ width: 44, height: "100%", background: "none", border: "none", cursor: "pointer", color: "#1A0F0A", display: "flex", alignItems: "center", justifyContent: "center" }}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span style={{ width: 36, textAlign: "center", fontSize: 15, fontWeight: 700, color: "#1A0F0A" }}>
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            style={{ width: 44, height: "100%", background: "none", border: "none", cursor: "pointer", color: "#1A0F0A", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to Cart Primary Saffron Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(232,102,10,0.35)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          style={{
            flex: 1,
            height: 52,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            borderRadius: 100,
            background: "linear-gradient(135deg, #E8660A 0%, #D45500 100%)",
            color: "#FFFFFF",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 16px rgba(232,102,10,0.25)",
            transition: "all 0.3s ease",
          }}
        >
          <ShoppingBag size={16} strokeWidth={2} />
          Add to Cart
        </motion.button>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleWishlist}
          style={{
            width: 52, height: 52, borderRadius: 100,
            border: `1px solid ${wishlisted ? "#E8660A" : "rgba(26,15,10,0.15)"}`,
            background: wishlisted ? "#E8660A" : "#FFFFFF",
            color: wishlisted ? "#FFFFFF" : "rgba(26,15,10,0.7)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.3s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={wishlisted ? "currentColor" : "none"} color={wishlisted ? "#FFFFFF" : "currentColor"} />
        </motion.button>
      </div>

      {/* Share Link */}
      <button
        onClick={handleShare}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "rgba(26,15,10,0.55)", marginBottom: 36,
          padding: 0, fontWeight: 500,
        }}
      >
        <Share2 size={14} />
        Share this product
      </button>

      {/* Details / Ritual Guide / Ingredients Tabs */}
      <div style={{ borderTop: "1px solid rgba(26,15,10,0.1)", paddingTop: 28 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "#EAE4D8", borderRadius: 100, padding: 4 }}>
          {[
            { key: "specs", label: "Details" },
            { key: "guide", label: "Ritual Guide" },
            { key: "ingredients", label: "Ingredients" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 100, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", transition: "all 0.3s",
                background: activeTab === tab.key ? "#E8660A" : "transparent",
                color: activeTab === tab.key ? "#FFFFFF" : "rgba(26,15,10,0.65)",
                boxShadow: activeTab === tab.key ? "0 2px 8px rgba(232,102,10,0.25)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ minHeight: 80, fontSize: 14, lineHeight: 1.75, color: "rgba(26,15,10,0.7)" }}
          >
            {activeTab === "specs" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Category", value: product.category },
                  product.material ? { label: "Material", value: product.material } : null,
                  product.weight ? { label: "Weight", value: product.weight } : null,
                ].filter(Boolean).map((row) => (
                  <div key={row!.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid rgba(26,15,10,0.06)" }}>
                    <span style={{ fontSize: 12, color: "rgba(26,15,10,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{row!.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1A0F0A" }}>{row!.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "guide" && (
              <p style={{ margin: 0 }}>{product.pujaGuide || "Light the tip of the incense stick and gently blow out the flame. Place in a holder in your altar and let the divine fragrance fill your worship space."}</p>
            )}
            {activeTab === "ingredients" && (
              product.ingredients && product.ingredients.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {product.ingredients.map((ing, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CheckCircle2 size={15} color="#E8660A" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0 }}>Pure natural sandalwood powder, jasmine extracts, and organic herbs. Hand-rolled with care.</p>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export default ProductInfo;
