import { Check, Star, X, Search } from "lucide-react";
import { ProductService } from "@/services/product.service";
import type { Category } from "@/types/products";
import type { FilterState } from "../hooks/useProducts";

interface ProductFiltersProps {
  filters: FilterState;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCategoryToggle: (slug: string) => void;
  setMaxPrice: (price: number) => void;
  setMinRating: (rating: number) => void;
  toggleInStockOnly: () => void;
  categories?: Category[];
}

const CATEGORY_ALIASES: Record<string, string[]> = {
  "idols-murtis": ["idols-murtis", "murti", "idols-shrines", "mandir"],
  "murti": ["murti", "idols-murtis", "idols-shrines", "mandir"],
  "puja-brassware": ["puja-brassware", "brass-copper-items", "pooja-thali-accessories"],
  "brass-copper-items": ["brass-copper-items", "puja-brassware", "pooja-thali-accessories"],
  "incense-fragrances": ["incense-fragrances", "home-fragrance"],
  "home-fragrance": ["home-fragrance", "incense-fragrances"],
  "samagri-kits": ["samagri-kits", "pooja-samagri", "pooja-kits"],
  "pooja-samagri": ["pooja-samagri", "samagri-kits", "pooja-kits"],
  "temple-decor": ["temple-decor", "temple-decoration"],
  "temple-decoration": ["temple-decoration", "temple-decor"],
};

function isCategoryActive(catSlug: string, catId?: string, filterCategories: string[] = []): boolean {
  if (filterCategories.includes(catSlug) || (catId && filterCategories.includes(catId))) {
    return true;
  }
  const cLower = catSlug.toLowerCase();
  const aliases = CATEGORY_ALIASES[cLower] || [];
  return filterCategories.some((fc) => {
    const fcLower = fc.toLowerCase();
    return fcLower === cLower || aliases.includes(fcLower);
  });
}

export function ProductFilters({
  filters,
  searchQuery,
  setSearchQuery,
  handleCategoryToggle,
  setMaxPrice,
  setMinRating,
  toggleInStockOnly,
  categories: customCategories,
}: ProductFiltersProps) {
  const defaultCategories = ProductService.getCategories();
  const categories = customCategories && customCategories.length > 0 ? customCategories : defaultCategories;

  return (
    <>
      {/* Search Input */}
      <div style={{ marginBottom: 40, position: 'relative' }}>
        <input
          type="text"
          placeholder="Search items..."
          aria-label="Search catalog items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            height: 44,
            padding: '0 16px 0 40px',
            borderRadius: 12,
            border: '1.5px solid var(--border-strong)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            fontSize: 14,
            outline: 'none',
            transition: 'all 0.3s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-saffron)';
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-saffron-glow)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-strong)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <Search
          size={16}
          color="var(--text-muted)"
          style={{
            position: 'absolute',
            left: 14,
            top: 14,
            pointerEvents: 'none',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search input"
            style={{
              position: 'absolute',
              right: 12,
              top: 12,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--bg-sand)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: 0,
            }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Categories</p>
        {categories.map((cat) => {
          const active = isCategoryActive(cat.slug, cat.id, filters.categories);
          return (
            <button
              key={cat.slug || cat.id}
              onClick={() => handleCategoryToggle(cat.slug)}
              aria-pressed={active}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '8px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: active ? '2px solid #B45309' : '1.5px solid rgba(26, 15, 10, 0.35)',
                  background: active ? '#B45309' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 2px 4px rgba(180, 83, 9, 0.25)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
                  flexShrink: 0,
                }}
              >
                {active && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#1A0F0A' : 'rgba(26, 15, 10, 0.75)',
                  transition: 'color 0.2s',
                }}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="divider" style={{ margin: '24px 0' }} />

      {/* Price */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Price Limit</p>
        <input
          type="range"
          min={0}
          max={15000}
          step={100}
          aria-label="Maximum price filter"
          value={filters.maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--accent-saffron)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>₹0</span>
          <span style={{ fontSize: 12, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="divider" style={{ margin: '24px 0' }} />

      {/* Rating */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Rating</p>
        {[5, 4, 3].map((r) => (
          <button
            key={r}
            onClick={() => setMinRating(filters.minRating === r ? 0 : r)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              color: filters.minRating === r ? 'var(--accent-saffron)' : 'var(--text-secondary)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={13}
                  fill={s <= r ? '#D4AF37' : 'transparent'}
                  color={s <= r ? '#D4AF37' : 'var(--border-strong)'}
                />
              ))}
            </div>
            <span style={{ fontSize: 13 }}>{r}+ stars</span>
          </button>
        ))}
      </div>

      <div className="divider" style={{ margin: '24px 0' }} />

      {/* In Stock */}
      <button
        onClick={toggleInStockOnly}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          padding: 0,
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 6,
            border: filters.inStockOnly ? '2px solid #B45309' : '1.5px solid rgba(26, 15, 10, 0.35)',
            background: filters.inStockOnly ? '#B45309' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: filters.inStockOnly ? '0 2px 4px rgba(180, 83, 9, 0.25)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
            flexShrink: 0,
          }}
        >
          {filters.inStockOnly && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: filters.inStockOnly ? 600 : 400,
            color: filters.inStockOnly ? '#1A0F0A' : 'rgba(26, 15, 10, 0.75)',
          }}
        >
          In Stock Only
        </span>
      </button>
    </>
  );
}
export default ProductFilters;
