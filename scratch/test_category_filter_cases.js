const https = require('https');

const API_BASE = 'https://ramanayam.onrender.com/api/v1';

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', reject);
  });
}

const CATEGORY_ALIASES = {
  "idols-murtis": ["idols-murtis", "murti", "idols-shrines", "mandir", "yantra"],
  "murti": ["murti", "idols-murtis", "idols-shrines", "mandir"],
  "mandir": ["mandir", "idols-murtis", "murti"],
  "puja-brassware": ["puja-brassware", "brass-copper-items", "pooja-thali-accessories", "shankh-bells"],
  "brass-copper-items": ["brass-copper-items", "puja-brassware", "pooja-thali-accessories", "shankh-bells"],
  "pooja-thali-accessories": ["pooja-thali-accessories", "puja-brassware", "brass-copper-items"],
  "incense-fragrances": ["incense-fragrances", "home-fragrance"],
  "home-fragrance": ["home-fragrance", "incense-fragrances"],
  "samagri-kits": ["samagri-kits", "pooja-samagri", "pooja-kits", "festival-special", "bhog-prasad", "books-scriptures"],
  "pooja-samagri": ["pooja-samagri", "samagri-kits", "pooja-kits"],
  "pooja-kits": ["pooja-kits", "samagri-kits", "pooja-samagri"],
  "temple-decor": ["temple-decor", "temple-decoration", "gift-items", "spiritual-accessories"],
  "temple-decoration": ["temple-decoration", "temple-decor"],
  "spiritual-wear": ["spiritual-wear", "clothing-religious-wear", "bhagwan-vastra", "mukut-shringar", "rudraksha-collection", "mala"],
  "clothing-religious-wear": ["clothing-religious-wear", "bhagwan-vastra", "mukut-shringar"],
  "rudraksha-collection": ["rudraksha-collection", "mala"],
};

function matchesSearchQuery(query, product) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const name = (product.name || '').toLowerCase();
  const desc = (product.description || product.fullDesc || product.shortDesc || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  return name.includes(q) || desc.includes(q) || cat.includes(q);
}

function filterProducts(products, filters, searchQuery, sort = 'popular') {
  let result = [...products];

  // 1. Search Query
  if (searchQuery && searchQuery.trim()) {
    result = result.filter(p => matchesSearchQuery(searchQuery, p));
  }

  // 2. Multi-category OR Filtering
  if (filters.categories && filters.categories.length > 0) {
    const targetCategorySlugs = new Set();
    filters.categories.forEach((cat) => {
      const cLower = cat.trim().toLowerCase();
      targetCategorySlugs.add(cLower);
      if (CATEGORY_ALIASES[cLower]) {
        CATEGORY_ALIASES[cLower].forEach((alias) => targetCategorySlugs.add(alias.toLowerCase()));
      }
    });

    result = result.filter((p) => {
      const pSlug = (p.categorySlug || '').toLowerCase();
      const pName = (p.category || '').toLowerCase();
      const pCatId = (p.categoryId || '').toLowerCase();

      return Array.from(targetCategorySlugs).some((target) => {
        return (
          pSlug === target ||
          pSlug === target.replace(/-/g, ' ') ||
          pName === target ||
          pName === target.replace(/-/g, ' ') ||
          pCatId === target ||
          (target.length > 3 && (pSlug.includes(target) || target.includes(pSlug))) ||
          (target.length > 3 && (pName.includes(target.replace(/-/g, ' ')) || target.replace(/-/g, ' ').includes(pName)))
        );
      });
    });
  }

  // 3. Price Filter
  if (filters.maxPrice !== undefined) {
    result = result.filter(p => p.price <= filters.maxPrice);
  }

  // 4. Rating Filter
  if (filters.minRating !== undefined && filters.minRating > 0) {
    result = result.filter(p => (p.rating || 5) >= filters.minRating);
  }

  // 5. In Stock Filter
  if (filters.inStockOnly) {
    result = result.filter(p => p.inStock);
  }

  return result;
}

async function runAllTestCases() {
  console.log('================================================================');
  console.log('CATEGORY FILTERING TEST SUITE — 8 MANDATORY CASES');
  console.log('Backend API:', API_BASE);
  console.log('================================================================\n');

  // Fetch active products from Render API
  const apiRes = await getJson(`${API_BASE}/products?limit=1000&status=ACTIVE`);
  const responseData = apiRes.data?.data || apiRes.data;
  const rawProducts = Array.isArray(responseData?.data) ? responseData.data : (Array.isArray(responseData) ? responseData : responseData?.products || []);
  console.log(`Fetched ${rawProducts.length} ACTIVE products from live Render backend.`);

  const products = rawProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category?.name || (typeof p.category === 'string' ? p.category : 'Puja Essentials'),
    categorySlug: p.category?.slug || (typeof p.category === 'object' ? p.category?.slug : 'puja-essentials') || 'puja-essentials',
    categoryId: p.categoryId || p.category?.id,
    price: Number(p.variants?.[0]?.price || p.price || 0),
    rating: Number(p.rating || 5.0),
    inStock: true,
  }));

  const testResults = [];

  // CASE 1: No category selected → normal product catalog
  const case1 = filterProducts(products, { categories: [], maxPrice: 50000 }, '');
  console.log(`CASE 1 (No category selected): ${case1.length} products (Expected: 199)`);
  testResults.push({ case: 'CASE 1: No category', pass: case1.length === 199, count: case1.length });

  // CASE 2: One category selected → only products from that category
  const case2a = filterProducts(products, { categories: ['puja-brassware'], maxPrice: 50000 }, '');
  const case2b = filterProducts(products, { categories: ['idols-murtis'], maxPrice: 50000 }, '');
  console.log(`CASE 2a (Puja Brassware selected): ${case2a.length} products`);
  console.log(`CASE 2b (Idols & Murtis selected): ${case2b.length} products`);
  testResults.push({ case: 'CASE 2: One category', pass: case2a.length === 32 && case2b.length === 30, countA: case2a.length, countB: case2b.length });

  // CASE 3: Two categories selected → products from category A OR category B
  const case3 = filterProducts(products, { categories: ['puja-brassware', 'idols-murtis'], maxPrice: 50000 }, '');
  const expectedUnion = case2a.length + case2b.length;
  console.log(`CASE 3 (Two categories: Puja Brassware + Idols & Murtis): ${case3.length} products (Expected union: ${expectedUnion})`);
  testResults.push({ case: 'CASE 3: Two categories (OR)', pass: case3.length === expectedUnion && case3.length === 62, count: case3.length });

  // CASE 4: All five categories selected → products from any of the five categories (union)
  const all5 = ['puja-brassware', 'idols-murtis', 'incense-fragrances', 'temple-decor', 'samagri-kits'];
  const case4 = filterProducts(products, { categories: all5, maxPrice: 50000 }, '');
  console.log(`CASE 4 (All five categories selected): ${case4.length} products (Expected union of 5 categories: 151)`);
  testResults.push({ case: 'CASE 4: All 5 categories', pass: case4.length === 151, count: case4.length });

  // CASE 5: Category + search → intersection of ACTIVE + selected categories + search
  const case5 = filterProducts(products, { categories: ['idols-murtis'], maxPrice: 50000 }, 'Ganesh');
  console.log(`CASE 5 (Idols & Murtis + search "Ganesh"): ${case5.length} products`);
  const allNamesMatch = case5.every(p => p.name.toLowerCase().includes('ganesh') || (p.description || '').toLowerCase().includes('ganesh'));
  testResults.push({ case: 'CASE 5: Category + search', pass: case5.length > 0 && allNamesMatch, count: case5.length });

  // CASE 6: Category + price filter → intersection of ACTIVE + selected categories + price range
  const case6 = filterProducts(products, { categories: ['puja-brassware'], maxPrice: 1000 }, '');
  const allPricesUnder1000 = case6.every(p => p.price <= 1000);
  console.log(`CASE 6 (Puja Brassware + maxPrice ₹1,000): ${case6.length} products (All <= 1000: ${allPricesUnder1000})`);
  testResults.push({ case: 'CASE 6: Category + price filter', pass: case6.length > 0 && allPricesUnder1000, count: case6.length });

  // CASE 7: Category + pagination → correct pagination slice and total count
  const limit = 12;
  const pagedProducts = case4.slice(0, limit);
  const totalPages = Math.ceil(case4.length / limit);
  console.log(`CASE 7 (Category + pagination limit 12): Total: ${case4.length}, Page 1 items: ${pagedProducts.length}, Total pages: ${totalPages}`);
  testResults.push({ case: 'CASE 7: Category + pagination', pass: pagedProducts.length === 12 && totalPages === 13, totalItems: case4.length, totalPages });

  // CASE 8: Anonymous request with status=ALL/DRAFT/ARCHIVED → MUST still return ACTIVE products only
  const anonAll = await getJson(`${API_BASE}/products?status=ALL`);
  const anonDraft = await getJson(`${API_BASE}/products?status=DRAFT`);
  const anonArchived = await getJson(`${API_BASE}/products?status=ARCHIVED`);
  const totalAll = anonAll.data?.data?.meta?.total || anonAll.data?.meta?.total;
  const totalDraft = anonDraft.data?.data?.meta?.total || anonDraft.data?.meta?.total;
  const totalArchived = anonArchived.data?.data?.meta?.total || anonArchived.data?.meta?.total;
  console.log(`CASE 8 (Security: Anonymous status override attempts): status=ALL: ${totalAll}, status=DRAFT: ${totalDraft}, status=ARCHIVED: ${totalArchived} (All must be 199)`);
  testResults.push({
    case: 'CASE 8: Anonymous ACTIVE product isolation',
    pass: totalAll === 199 && totalDraft === 199 && totalArchived === 199,
    totalAll, totalDraft, totalArchived,
  });

  console.log('\n================================================================');
  console.log('TEST SUMMARY:');
  console.table(testResults);
  console.log('================================================================\n');

  const allPassed = testResults.every(r => r.pass);
  console.log('OVERALL STATUS:', allPassed ? 'ALL 8 CASES PASSED' : 'SOME CASES FAILED');
}

runAllTestCases().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
