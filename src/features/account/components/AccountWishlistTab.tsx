import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/products";

interface AccountWishlistTabProps {
  wishlistItems: Product[];
}

export function AccountWishlistTab({ wishlistItems }: AccountWishlistTabProps) {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 32,
        }}
      >
        Your Wishlist ({wishlistItems.length})
      </h2>
      {wishlistItems.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
          className="wishlist-grid"
        >
          {wishlistItems.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 28,
            padding: 48,
            textAlign: "center",
            maxWidth: 520,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "var(--bg-sand)",
              border: "1.5px solid var(--border-strong)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "var(--accent-saffron)",
            }}
          >
            <Heart size={20} />
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            Wishlist is Empty
          </h3>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              marginBottom: 28,
            }}
          >
            Save products you love to your list for easy future
            purchasing.
          </p>
          <Link href="/products" className="btn btn-primary" style={{ fontSize: 12 }}>
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
export default AccountWishlistTab;
