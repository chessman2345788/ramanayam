"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import { CartItemBlock } from "@/features/cart/components/CartItemBlock";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { CartShippingIndicator } from "@/features/cart/components/CartShippingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductService } from "@/services/product.service";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

export function CartContent() {
  const {
    items,
    itemCount,
    totalPrice,
    savings,
    gst,
    couponCode,
    couponApplied,
    couponError,
    progressPercent,
    amountLeftForFreeShipping,
    deliveryCharge,
    couponDiscount,
    finalTotal,
    setCouponCode,
    handleApplyCoupon,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const allProducts = ProductService.getProducts();
  const upsellProducts = allProducts
    .filter((p) => !items.some((i) => i.id === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={32} />}
        title="Your Sacred Cart is Empty"
        description="You have not added any sacred offerings, artisan idols, or spiritual essentials to your basket yet."
        buttonText="Explore Catalog"
        buttonLink="/products"
      />
    );
  }

  return (
    <>
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 64px)",
          paddingBottom: 160,
          background: "var(--bg-primary)",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 48,
              paddingBottom: 24,
              borderBottom: "1px solid var(--border)",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p className="text-eyebrow" style={{ marginBottom: 12 }}>
                Your Basket
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Sacred Cart
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                You have {itemCount} divine {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <button
              onClick={clearCart}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                background: "none",
                border: "1.5px solid var(--border-strong)",
                padding: "10px 20px",
                borderRadius: 100,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--error)";
                e.currentTarget.style.color = "var(--error)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Clear Basket
            </button>
          </div>

          {/* Shipping Progress Indicator */}
          <CartShippingIndicator
            progressPercent={progressPercent}
            amountLeftForFreeShipping={amountLeftForFreeShipping}
          />

          {/* Main Grid */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 56 }}
            className="cart-layout"
          >
            {/* Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <AnimatePresence initial={false}>
                {items.map((item, idx) => (
                  <CartItemBlock
                    key={item.id}
                    item={item}
                    index={idx}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Sidebar Summary */}
            <CartSummary
              totalPrice={totalPrice}
              savings={savings}
              gst={gst}
              deliveryCharge={deliveryCharge}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              couponApplied={couponApplied}
              couponError={couponError}
              couponDiscount={couponDiscount}
              finalTotal={finalTotal}
              handleApplyCoupon={handleApplyCoupon}
            />
          </div>

          {/* Upsell Cross-Sell */}
          {upsellProducts.length > 0 && (
            <section
              style={{
                marginTop: 120,
                paddingTop: 80,
                borderTop: "1px solid var(--border)",
              }}
            >
              <ScrollReveal variant="blur-to-sharp">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 500,
                    marginBottom: 48,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Sparkles size={20} color="var(--accent-gold)" />
                  Complete Your Puja Ritual
                </h2>
              </ScrollReveal>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 28,
                }}
                className="upsell-grid"
              >
                {upsellProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .upsell-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .upsell-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
