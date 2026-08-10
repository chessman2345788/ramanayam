'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductFilters } from '@/features/products/components/ProductFilters';
import { EditorialProductGrid } from '@/features/products/components/EditorialProductGrid';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export function ShopContent() {
  const {
    filters,
    searchQuery,
    sort,
    showFilters,
    filteredProducts,
    pagedProducts,
    hasMore,
    currentCategoryName,
    setSearchQuery,
    setSort,
    setLimit,
    setShowFilters,
    clearAll,
    handleCategoryToggle,
    setMaxPrice,
    setMinRating,
    toggleInStockOnly,
  } = useProducts();

  return (
    <div style={{ paddingTop: 'var(--nav-height)', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="container" style={{ paddingTop: 64, paddingBottom: 48 }}>
        <ScrollReveal variant="blur-to-sharp">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Link href="/" className="link-animated" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>/</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Catalog</span>
          </nav>

          {/* Eyebrow & Title */}
          <p className="text-eyebrow" style={{ marginBottom: 16 }}>
            Divine Collection
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--text-primary)',
              margin: '0 0 16px',
              lineHeight: 1.1,
            }}
          >
            {currentCategoryName || 'Sacred Offerings'}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 600 }}>
            Handcrafted idols, premium incense, organic puja oils, and traditional temple brassware. 
            Traditionally sourced, designed for modern worship.
          </p>
        </ScrollReveal>
      </div>

      <div className="divider" />

      {/* Main Grid */}
      <div className="container" style={{ paddingTop: 60, paddingBottom: 120 }}>
        {/* Mobile Filter Toggle */}
        <div
          style={{
            display: 'none',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
          className="shop-filter-mobile-btn"
        >
          <button
            onClick={() => setShowFilters((p) => !p)}
            aria-expanded={showFilters}
            aria-controls="shop-sidebar-filters"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 100,
              border: '1.5px solid var(--border-strong)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {filteredProducts.length} items
          </span>
        </div>

        <div
          style={{ display: 'flex', alignItems: 'flex-start', gap: 64, position: 'relative' }}
          className="shop-layout"
        >
          {/* Sidebar Filters — Desktop */}
          <aside
            id="shop-sidebar-filters"
            aria-label="Product Filters"
            style={{
              width: 260,
              position: 'sticky',
              top: 110,
              maxHeight: 'calc(100vh - 140px)',
              overflowY: 'auto',
              paddingRight: 12,
            }}
            className={`shop-sidebar ${showFilters ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Filters
              </h2>
              {(filters.categories.length > 0 || filters.maxPrice < 15000 || filters.minRating > 0 || filters.inStockOnly || searchQuery) && (
                <button
                  onClick={clearAll}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--accent-saffron)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            <ProductFilters
              filters={filters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleCategoryToggle={handleCategoryToggle}
              setMaxPrice={setMaxPrice}
              setMinRating={setMinRating}
              toggleInStockOnly={toggleInStockOnly}
            />
          </aside>

          {/* Products Column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Sort & Count Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 40,
                borderBottom: '1px solid var(--border)',
                paddingBottom: 16,
              }}
              className="shop-results-header"
            >
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }} className="nav-desktop">
                Showing {filteredProducts.length} divine offerings
              </span>

              {/* Sort selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label htmlFor="sort-select" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sort by:</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    style={{
                      appearance: 'none',
                      background: 'none',
                      border: 'none',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      paddingRight: 20,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option value="popular">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Auspicious Additions</option>
                  </select>
                  <ChevronDown
                    size={12}
                    color="var(--text-muted)"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Editorial Grid */}
            {pagedProducts.length > 0 ? (
              <EditorialProductGrid products={pagedProducts} />
            ) : (
              <div style={{ padding: '80px 0', textAlign: 'center' }}>
                <p style={{ fontSize: 48, margin: '0 0 20px', userSelect: 'none' }}>🕊️</p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    color: 'var(--text-primary)',
                    marginBottom: 8,
                  }}
                >
                  No sacred offerings match your filters
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                  Try updating search strings or clearing filters to locate items.
                </p>
                <button onClick={clearAll} className="btn btn-outline" style={{ fontSize: 12 }}>
                  Clear Search Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}>
                <button
                  onClick={() => setLimit((l) => l + 8)}
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 36px',
                    fontSize: 12,
                  }}
                >
                  <span>Load More Offerings</span>
                  <ChevronDown size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .shop-layout { flex-direction: column !important; gap: 32px !important; }
          .shop-sidebar { width: 100% !important; position: static !important; max-height: none !important; display: none; }
          .shop-sidebar.active { display: block !important; margin-bottom: 16px; }
          .shop-filter-mobile-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
