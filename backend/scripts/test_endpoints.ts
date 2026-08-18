import axios from "axios";

async function testApiEndpoints() {
  console.log("Testing API and Frontend HTTP Endpoints...\n");

  const baseUrl = "http://localhost:5000/api/v1";

  // 1. Health check
  try {
    const health = await axios.get("http://localhost:5000/health");
    console.log("✅ GET /health:", health.data.status);
  } catch (e: any) {
    console.error("❌ /health error:", e.message);
  }

  // 2. Products List (page 1, limit 10)
  try {
    const t0 = Date.now();
    const res = await axios.get(`${baseUrl}/products?page=1&limit=10`);
    const duration = Date.now() - t0;
    const total = res.data?.data?.meta?.total;
    const products = res.data?.data?.data || [];
    console.log(`✅ GET /products (limit 10) [${duration}ms]: Total Products in DB = ${total}, Returned in Page 1 = ${products.length}`);
  } catch (e: any) {
    console.error("❌ GET /products error:", e.message);
  }

  // 3. Search query
  try {
    const t0 = Date.now();
    const res = await axios.get(`${baseUrl}/products?search=Rudraksha&page=1&limit=10`);
    const duration = Date.now() - t0;
    const totalMatches = res.data?.data?.meta?.total;
    const products = res.data?.data?.data || [];
    console.log(`✅ GET /products?search=Rudraksha [${duration}ms]: Found ${totalMatches} total matching products (Returned ${products.length} on page 1)`);
  } catch (e: any) {
    console.error("❌ Search error:", e.message);
  }

  // 4. Category listing
  try {
    const catsRes = await axios.get(`${baseUrl}/categories`);
    const cats = catsRes.data?.data?.categories || catsRes.data?.data || [];
    console.log(`✅ GET /categories: Loaded ${cats.length} active categories`);

    if (cats.length > 0) {
      const sampleCat = cats.find((c: any) => c.name === "Murti") || cats[0];
      const t0 = Date.now();
      const catProdRes = await axios.get(`${baseUrl}/products?category=${sampleCat.id}&limit=10`);
      const duration = Date.now() - t0;
      const catTotal = catProdRes.data?.data?.meta?.total;
      const products = catProdRes.data?.data?.data || [];
      console.log(`✅ GET /products?category=${sampleCat.name} [${duration}ms]: Total ${catTotal} products (Page 1 = ${products.length})`);
    }
  } catch (e: any) {
    console.error("❌ Category test error:", e.message);
  }

  // 5. Featured products
  try {
    const res = await axios.get(`${baseUrl}/products/featured?limit=8`);
    const products = res.data?.data?.data || [];
    const totalFeatured = res.data?.data?.meta?.total;
    console.log(`✅ GET /products/featured: Found ${totalFeatured} total featured products (Page 1 = ${products.length})`);
  } catch (e: any) {
    console.error("❌ Featured error:", e.message);
  }

  // 6. Next.js storefront pages
  try {
    const t0 = Date.now();
    const nextHome = await axios.get("http://localhost:3000");
    const duration = Date.now() - t0;
    console.log(`✅ Next.js Storefront GET http://localhost:3000 [${duration}ms]: HTTP ${nextHome.status}`);
  } catch (e: any) {
    console.error("❌ Next.js Home error:", e.message);
  }

  try {
    const t0 = Date.now();
    const nextAdmin = await axios.get("http://localhost:3000/admin/products");
    const duration = Date.now() - t0;
    console.log(`✅ Next.js Admin GET http://localhost:3000/admin/products [${duration}ms]: HTTP ${nextAdmin.status}`);
  } catch (e: any) {
    console.error("❌ Next.js Admin error:", e.message);
  }
}

testApiEndpoints();
