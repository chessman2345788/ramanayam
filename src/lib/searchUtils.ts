/**
 * Search normalization and matching utilities for Ramanayam product catalog.
 */

/**
 * Normalizes text for search matching.
 * Converts to lowercase, trims whitespace, and normalizes common Indian spiritual transliterations (e.g., puja <-> pooja).
 */
export function normalizeSearchTerm(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/\bpuja\b/g, "pooja")
    .replace(/\bpoojas\b/g, "pooja")
    .replace(/\bpujas\b/g, "pooja");
}

/**
 * Matches a user search query against product data fields.
 * Tokenizes the query so all query words must match somewhere across the product's attributes.
 */
export function matchesSearchQuery(
  query: string,
  product: {
    name?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    shortDesc?: string;
    fullDesc?: string;
    category?: string;
    categorySlug?: string;
    tags?: string[];
  }
): boolean {
  if (!query || !query.trim()) return true;

  const normalizedQuery = normalizeSearchTerm(query);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (queryTokens.length === 0) return true;

  const nameText = product.name || "";
  const slugText = product.slug || "";
  const descText = product.description || product.fullDesc || "";
  const shortDescText = product.shortDescription || product.shortDesc || "";
  const categoryText = product.category || "";
  const categorySlugText = product.categorySlug || "";
  const tagsText = Array.isArray(product.tags) ? product.tags.join(" ") : "";

  const searchableRaw = `${nameText} ${slugText} ${descText} ${shortDescText} ${categoryText} ${categorySlugText} ${tagsText}`;
  const searchableText = normalizeSearchTerm(searchableRaw);

  return queryTokens.every((token) => searchableText.includes(token));
}
