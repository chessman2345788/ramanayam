import { Star, ShoppingBag, Heart, Share2, Minus, Plus, CheckCircle2, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, ProductVariant } from "@/types/products";

interface ProductInfoProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
  setSelectedVariant?: (variant: ProductVariant) => void;
  currentPrice?: number;
  currentMrp?: number;
  inStock?: boolean;
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
  selectedVariant,
  setSelectedVariant,
  currentPrice,
  currentMrp,
  inStock = true,
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

  const activePrice = currentPrice ?? selectedVariant?.price ?? product.price;
  const activeMrp = currentMrp ?? selectedVariant?.compareAtPrice ?? product.mrp;
  const activeSku = selectedVariant?.sku || product.variants?.[0]?.sku || `RAM-${product.slug.toUpperCase().slice(0, 8)}`;
  const variants = product.variants || [];
  const hasVariants = variants.length > 0;

  // Variant selector title based on variantType
  const getVariantLabel = () => {
    switch (product.variantType) {
      case "weight":
        return "Select Weight / Quantity";
      case "size":
        return "Select Size";
      case "material_size":
        return "Select Material & Size";
      case "pack":
        return "Select Pack Size";
      case "quantity":
        return "Select Sticks / Quantity";
      default:
        return "Available Options / Sizes";
    }
  };

  return (
    <div style={{ position: "sticky", top: 120 }}>
      {/* Category eyebrow & SKU */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#A8822A', margin: 0
        }}>
          {product.category}
        </p>
        <span style={{ fontSize: 11, color: "rgba(26,15,10,0.45)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
          SKU: {activeSku}
        </span>
      </div>

      {/* Product Name */}
      <h1 style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(32px, 4vw, 48px)",
        fontWeight: 600, lineHeight: 1.1, color: "#1A0F0A", marginBottom: 6, letterSpacing: "-0.01em"
      }}>
        {product.name}
      </h1>

      {/* Hindi name */}
      {product.nameHi && (
        <p style={{ fontSize: 16, color: "#A8822A", marginBottom: 18, fontWeight: 500 }}>
          {product.nameHi}
        </p>
      )}

      {/* Rating & Stock pill */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < Math.round(product.rating || 5) ? "#A8822A" : "transparent"} color={i < Math.round(product.rating || 5) ? "#A8822A" : "rgba(26,15,10,0.2)"} />
            ))}
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1A0F0A" }}>{product.rating || 4.9}</span>
          <span style={{ fontSize: 13, color: "rgba(26,15,10,0.5)" }}>· {product.reviewCount || 234} reviews</span>
        </div>

        {/* Stock status indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: inStock ? "#22C55E" : "#EF4444",
            display: "inline-block",
            boxShadow: inStock ? "0 0 8px rgba(34,197,94,0.6)" : "none",
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: inStock ? "#15803D" : "#B91C1C" }}>
            {inStock ? (
              selectedVariant && selectedVariant.stock <= 5
                ? `Only ${selectedVariant.stock} left in stock`
                : "In Stock & Ready to Ship"
            ) : "Currently Out of Stock"}
          </span>
        </div>
      </div>

      {/* Price Box */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px 24px", borderRadius: 18,
        background: "linear-gradient(135deg, #F5F0E8 0%, #EAE4D8 100%)",
        border: "1px solid rgba(168,130,42,0.18)",
        marginBottom: 24,
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {hasVariants && variants.length > 1 && (
            <span style={{ fontSize: 11, color: "rgba(26,15,10,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
              Selected Option Price
            </span>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 700, color: "#1A0F0A" }}>
              ₹{activePrice.toLocaleString("en-IN")}
            </span>
            {activeMrp > activePrice && (
              <span style={{ fontSize: 16, color: "rgba(26,15,10,0.4)", textDecoration: "line-through" }}>
                ₹{activeMrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {discount > 0 && (
          <span style={{
            fontSize: 12, fontWeight: 700,
            color: "#E8660A",
            background: "rgba(232,102,10,0.12)",
            padding: "5px 14px", borderRadius: 100,
            border: "1px solid rgba(232,102,10,0.3)",
            marginLeft: "auto",
          }}>
            Save {discount}%
          </span>
        )}
      </div>

      {/* Variant Selection UI */}
      {hasVariants && setSelectedVariant && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A0F0A" }}>
              {getVariantLabel()}
            </label>
            {selectedVariant && (
              <span style={{ fontSize: 12, color: "#A8822A", fontWeight: 600 }}>
                {selectedVariant.variantName}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id || (!selectedVariant && v.isDefault);
              const isAvailable = v.stock > 0;

              return (
                <button
                  key={v.id || v.sku}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  disabled={!isAvailable}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 100,
                    border: `1.5px solid ${isSelected ? "#E8660A" : "rgba(26,15,10,0.15)"}`,
                    background: isSelected ? "rgba(232,102,10,0.06)" : isAvailable ? "#FFFFFF" : "#F3F3F3",
                    color: isSelected ? "#E8660A" : isAvailable ? "#1A0F0A" : "rgba(26,15,10,0.35)",
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    fontSize: 13,
                    fontWeight: isSelected ? 700 : 500,
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? "0 2px 10px rgba(232,102,10,0.15)" : "none",
                  }}
                >
                  {isSelected && <Check size={14} strokeWidth={2.5} color="#E8660A" />}
                  <span>{v.variantName}</span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: isSelected ? "#E8660A" : "rgba(26,15,10,0.55)",
                  }}>
                    ₹{v.price.toLocaleString("en-IN")}
                  </span>
                  {!isAvailable && (
                    <span style={{ fontSize: 10, color: "#EF4444", textTransform: "uppercase" }}>
                      (Sold out)
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedVariant?.attributes && (selectedVariant.attributes.priceRangeMin || selectedVariant.attributes.unit) && (
            <p style={{ fontSize: 12, color: "rgba(26,15,10,0.5)", marginTop: 8, marginBottom: 0, fontStyle: "italic" }}>
              Unit: {selectedVariant.attributes.unit}
              {selectedVariant.attributes.priceRangeMin && (
                <span> · Catalogue guide: {selectedVariant.attributes.priceRangeMin} – {selectedVariant.attributes.priceRangeMax}</span>
              )}
            </p>
          )}
        </div>
      )}

      {/* Description */}
      <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(26,15,10,0.7)", marginBottom: 28 }}>
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
            disabled={quantity <= 1 || !inStock}
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
            disabled={!inStock}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to Cart Primary Saffron Button */}
        <motion.button
          whileHover={{ scale: inStock ? 1.02 : 1, boxShadow: inStock ? "0 8px 24px rgba(232,102,10,0.35)" : "none" }}
          whileTap={{ scale: inStock ? 0.98 : 1 }}
          onClick={handleAddToCart}
          disabled={!inStock}
          style={{
            flex: 1,
            height: 52,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            borderRadius: 100,
            background: inStock ? "linear-gradient(135deg, #E8660A 0%, #D45500 100%)" : "rgba(26,15,10,0.2)",
            color: inStock ? "#FFFFFF" : "rgba(26,15,10,0.4)",
            border: "none",
            cursor: inStock ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: inStock ? "0 4px 16px rgba(232,102,10,0.25)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          <ShoppingBag size={16} strokeWidth={2} />
          {inStock ? "Add to Cart" : "Out of Stock"}
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

      {/* Trust & Guarantee points */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "12px 16px", borderRadius: 12,
        background: "rgba(168,130,42,0.06)", border: "1px solid rgba(168,130,42,0.12)",
        marginBottom: 20,
      }}>
        <ShieldCheck size={18} color="#A8822A" />
        <div style={{ fontSize: 12, color: "#1A0F0A", lineHeight: 1.4 }}>
          <strong style={{ color: "#A8822A" }}>100% Authentic Vedic Craft:</strong> Sacred materials sourced with devotion, temple blessed & quality certified.
        </div>
      </div>

      {/* Share Link */}
      <button
        onClick={handleShare}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "rgba(26,15,10,0.55)", marginBottom: 32,
          padding: 0, fontWeight: 500,
        }}
      >
        <Share2 size={14} />
        Share this product
      </button>

      {/* Details / Ritual Guide / Ingredients Tabs */}
      <div style={{ borderTop: "1px solid rgba(26,15,10,0.1)", paddingTop: 24 }}>
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
                  selectedVariant ? { label: "Selected Option", value: selectedVariant.variantName } : null,
                  selectedVariant ? { label: "SKU", value: selectedVariant.sku } : null,
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
                <p style={{ margin: 0 }}>Pure natural ingredients, traditional herbs, and sacred materials sourced directly from artisanal clusters in Moradabad and Vrindavan.</p>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export default ProductInfo;
