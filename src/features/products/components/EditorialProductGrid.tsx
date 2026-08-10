import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/products";

export function EditorialProductGrid({ products: items }: { products: Product[] }) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
        }}
        className="product-catalog-grid"
      >
        {items.map((product, i) => (
          <ProductCard key={product.id || `prod-${i}`} product={product} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .product-catalog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .product-catalog-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </>
  );
}

