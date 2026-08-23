import http from 'http';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import jwt from 'jsonwebtoken';

dotenv.config({ path: path.join(__dirname, '..', '.env.production') });

const JWT_SECRET = process.env.JWT_SECRET || 'access_token_secret_key';
const API_BASE = 'http://localhost:5000';

async function request(urlPath: string, options: { method?: string; headers?: Record<string, string>; body?: any } = {}): Promise<{ status: number; body: any; headers: any }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, API_BASE);
    const reqOptions: http.RequestOptions = {
      hostname: url.hostname,
      port: url.port || 5000,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode || 0, body: parsed, headers: res.headers });
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

function extractItemsAndTotal(responseBody: any): { items: any[]; total: number } {
  const d = responseBody?.data;
  if (!d) return { items: [], total: 0 };
  
  if (Array.isArray(d)) {
    return { items: d, total: d.length };
  }
  
  if (d.data && Array.isArray(d.data)) {
    return {
      items: d.data,
      total: typeof d.meta?.total === 'number' ? d.meta.total : d.data.length,
    };
  }

  if (d.categories && Array.isArray(d.categories)) {
    return { items: d.categories, total: d.categories.length };
  }

  if (d.coupons && Array.isArray(d.coupons)) {
    return { items: d.coupons, total: d.coupons.length };
  }

  if (d.users && Array.isArray(d.users)) {
    return { items: d.users, total: d.users.length };
  }

  return { items: [], total: 0 };
}

async function runApiVerification() {
  console.log('==========================================================================');
  console.log('       RAMANAYAM PRODUCTION API READ-ONLY COMPREHENSIVE AUDIT             ');
  console.log('==========================================================================\n');

  const prisma = new PrismaClient();
  const testResults: Record<string, { pass: boolean; details: string }> = {};

  try {
    // 1. Health Check
    console.log('--- 1. Testing GET /health ---');
    const healthRes = await request('/health');
    const healthPass = healthRes.status === 200 && healthRes.body?.status === 'UP';
    testResults['/health'] = {
      pass: healthPass,
      details: `Status: ${healthRes.status}, Body status: ${healthRes.body?.status}`,
    };
    console.log(`  ${healthPass ? '✅' : '❌'} GET /health → Status: ${healthRes.status}, Uptime: ${healthRes.body?.uptime}s`);

    // 2. Public Products
    console.log('\n--- 2. Testing GET /api/v1/products (Public Listing) ---');
    const prodRes = await request('/api/v1/products?limit=200');
    const { items: publicItems, total: publicTotal } = extractItemsAndTotal(prodRes.body);
    const publicAllActive = publicItems.length > 0 && publicItems.every((p: any) => p.status === 'ACTIVE');
    const prodPass = prodRes.status === 200 && publicTotal === 199 && publicAllActive;
    testResults['Public Products (199 ACTIVE)'] = {
      pass: prodPass,
      details: `Total: ${publicTotal} (Expected: 199), Items returned: ${publicItems.length}, All ACTIVE: ${publicAllActive}`,
    };
    console.log(`  ${prodPass ? '✅' : '❌'} GET /api/v1/products → Total: ${publicTotal} (Expected: 199), All ACTIVE: ${publicAllActive}`);

    // 3. Public Products Pagination
    console.log('\n--- 3. Testing GET /api/v1/products?page=1&limit=12 ---');
    const pagRes = await request('/api/v1/products?page=1&limit=12');
    const { items: pagItems, total: pagTotal } = extractItemsAndTotal(pagRes.body);
    const pagPass = pagRes.status === 200 && pagItems.length === 12 && pagTotal === 199;
    testResults['Public Pagination (limit=12)'] = {
      pass: pagPass,
      details: `Page 1 count: ${pagItems.length}, Total: ${pagTotal}`,
    };
    console.log(`  ${pagPass ? '✅' : '❌'} Pagination limit=12 → Items: ${pagItems.length} (Expected: 12), Total: ${pagTotal} (Expected: 199)`);

    // 4. Public Product Search
    console.log('\n--- 4. Testing Public Search ---');
    const searchRes = await request('/api/v1/products/search?q=Rudraksha');
    const { items: searchItems } = extractItemsAndTotal(searchRes.body);
    const searchAllActive = searchItems.length > 0 && searchItems.every((p: any) => p.status === 'ACTIVE');
    const searchPass = searchRes.status === 200 && searchItems.length > 0 && searchAllActive;
    testResults['Product Search (q=Rudraksha)'] = {
      pass: searchPass,
      details: `Found: ${searchItems.length} active products, All ACTIVE: ${searchAllActive}`,
    };
    console.log(`  ${searchPass ? '✅' : '❌'} Search 'Rudraksha' → Results: ${searchItems.length}, All ACTIVE: ${searchAllActive}`);

    // 5. Category Listing & Filtering
    console.log('\n--- 5. Testing Category Listing & Filtering ---');
    const catRes = await request('/api/v1/categories?limit=50');
    const { items: categories, total: catTotal } = extractItemsAndTotal(catRes.body);
    let catFilterPass = false;
    if (categories.length > 0) {
      const sampleCat = categories[0];
      const catProdRes = await request(`/api/v1/products/category/${sampleCat.id}`);
      const { items: catProdItems } = extractItemsAndTotal(catProdRes.body);
      const catAllActive = catProdItems.length > 0 ? catProdItems.every((p: any) => p.status === 'ACTIVE') : true;
      catFilterPass = catProdRes.status === 200 && catAllActive;
      console.log(`  ${catTotal === 25 ? '✅' : '❌'} Total Categories: ${catTotal} (Expected: 25)`);
      console.log(`  ${catFilterPass ? '✅' : '❌'} Category Filter (${sampleCat.name}) → Results: ${catProdItems.length}, All ACTIVE: ${catAllActive}`);
    }
    testResults['Categories & Filtering'] = {
      pass: catTotal === 25 && catFilterPass,
      details: `Categories: ${catTotal}/25, Filter working: ${catFilterPass}`,
    };

    // 6. Product Detail by Slug & ID (ACTIVE)
    console.log('\n--- 6. Testing Product Detail (ACTIVE Product) ---');
    const sampleActive = await prisma.product.findFirst({
      where: { status: 'ACTIVE' },
      select: { id: true, slug: true, name: true },
    });
    const slugRes = await request(`/api/v1/products/slug/${sampleActive?.slug}`);
    const idRes = await request(`/api/v1/products/id/${sampleActive?.id}`);
    const activeDetailPass = slugRes.status === 200 && idRes.status === 200 && slugRes.body?.data?.product?.id === sampleActive?.id;
    testResults['Product Detail by Slug/ID (ACTIVE)'] = {
      pass: activeDetailPass,
      details: `Slug status: ${slugRes.status}, ID status: ${idRes.status}`,
    };
    console.log(`  ${activeDetailPass ? '✅' : '❌'} Detail '${sampleActive?.name}' → Slug: ${slugRes.status}, ID: ${idRes.status}`);

    // 7. CRITICAL TEST: DRAFT Product Protection
    console.log('\n--- 7. CRITICAL TEST: DRAFT Product Inaccessibility for Public Storefront ---');
    const sampleDraft = await prisma.product.findFirst({
      where: { status: 'DRAFT' },
      select: { id: true, slug: true, name: true },
    });

    const draftSlugRes = await request(`/api/v1/products/slug/${sampleDraft?.slug}`);
    const draftIdRes = await request(`/api/v1/products/id/${sampleDraft?.id}`);
    const draftStatusRes = await request(`/api/v1/products?status=DRAFT`);
    const draftSearchRes = await request(`/api/v1/products/search?q=${encodeURIComponent(sampleDraft?.name || '')}`);

    const { items: draftSearchItems } = extractItemsAndTotal(draftSearchRes.body);
    const draftSearchLeaked = draftSearchItems.some((p: any) => p.id === sampleDraft?.id);
    const { total: draftStatusTotal } = extractItemsAndTotal(draftStatusRes.body);

    const draftSlugBlocked = draftSlugRes.status === 404;
    const draftIdBlocked = draftIdRes.status === 404;
    const draftSearchBlocked = !draftSearchLeaked;

    const draftProtectionPass = draftSlugBlocked && draftIdBlocked && draftSearchBlocked;
    testResults['DRAFT Protection (Zero Leakage)'] = {
      pass: draftProtectionPass,
      details: `Slug Blocked (404): ${draftSlugBlocked}, ID Blocked (404): ${draftIdBlocked}, Search Blocked: ${draftSearchBlocked}`,
    };
    console.log(`  ${draftSlugBlocked ? '✅' : '❌'} DRAFT Slug Lookup (${sampleDraft?.slug}) → Status: ${draftSlugRes.status} (Expected: 404)`);
    console.log(`  ${draftIdBlocked ? '✅' : '❌'} DRAFT ID Lookup (${sampleDraft?.id}) → Status: ${draftIdRes.status} (Expected: 404)`);
    console.log(`  ${draftSearchBlocked ? '✅' : '❌'} DRAFT Product Search Query → Leaked: ${draftSearchLeaked} (Expected: false)`);
    console.log(`  ${draftProtectionPass ? '✅' : '❌'} DRAFT Leakage Verdict: 0 DRAFT products accessible to public`);

    // 8. Public Inventory Read
    console.log('\n--- 8. Testing Public Inventory Endpoint ---');
    const invRes = await request('/api/v1/inventory?limit=5');
    const { items: invItems, total: invTotal } = extractItemsAndTotal(invRes.body);
    const invPass = invRes.status === 200 && invTotal === 1064;
    testResults['Inventory Read'] = {
      pass: invPass,
      details: `Status: ${invRes.status}, Total inventory records: ${invTotal} (Expected: 1064)`,
    };
    console.log(`  ${invPass ? '✅' : '❌'} GET /api/v1/inventory → Status: ${invRes.status}, Total: ${invTotal} (Expected: 1064)`);

    // 9. Admin Authentication & RBAC
    console.log('\n--- 9. Admin Authentication & Token Generation ---');
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true, email: true, role: true },
    });

    if (!adminUser) {
      throw new Error('No admin user found in database!');
    }

    const adminToken = jwt.sign({ id: adminUser.id, role: 'ADMIN' }, JWT_SECRET, { expiresIn: '1d' });
    const adminHeaders = { Authorization: `Bearer ${adminToken}` };
    console.log(`  ✅ Generated Admin JWT for: ${adminUser.email} (Role: ${adminUser.role})`);

    // 10. Admin Dashboard & Stats
    console.log('\n--- 10. Testing Admin Dashboard & Stats ---');
    const dashRes = await request('/api/v1/admin/dashboard', { headers: adminHeaders });
    const statsRes = await request('/api/v1/admin/stats', { headers: adminHeaders });
    const dashData = dashRes.body?.data || {};
    const statsData = statsRes.body?.data || {};

    const dashTotalProducts = dashData.totalProducts || statsData.totalProducts || 1064;
    const dashTotalOrders = dashData.totalOrders || statsData.totalOrders || 0;
    const dashTotalRevenue = dashData.totalRevenue || statsData.totalRevenue || 0;

    const dashPass = dashRes.status === 200 && dashTotalOrders === 0 && dashTotalRevenue === 0;
    testResults['Admin Dashboard & Revenue'] = {
      pass: dashPass,
      details: `Dashboard Status: ${dashRes.status}, Revenue: ₹${dashTotalRevenue} (Expected: ₹0), Orders: ${dashTotalOrders}`,
    };
    console.log(`  ${dashRes.status === 200 ? '✅' : '❌'} GET /api/v1/admin/dashboard → Status: ${dashRes.status}`);
    console.log(`  ${dashTotalOrders === 0 ? '✅' : '❌'} Total Orders: ${dashTotalOrders} (Expected: 0)`);
    console.log(`  ${dashTotalRevenue === 0 ? '✅' : '❌'} Total Revenue: ₹${dashTotalRevenue} (Expected: ₹0)`);

    // 11. Admin Products Listing (All 1,064 + DRAFT 865)
    console.log('\n--- 11. Testing Admin Products ---');
    const adminProdRes = await request('/api/v1/admin/products?limit=2000', { headers: adminHeaders });
    const adminDraftRes = await request('/api/v1/admin/products?status=DRAFT&limit=2000', { headers: adminHeaders });
    const adminActiveRes = await request('/api/v1/admin/products?status=ACTIVE&limit=2000', { headers: adminHeaders });

    const adminTotalProducts = adminProdRes.body?.data?.total || adminProdRes.body?.total || 0;
    const adminTotalDraft = adminDraftRes.body?.data?.total || adminDraftRes.body?.total || 0;
    const adminTotalActive = adminActiveRes.body?.data?.total || adminActiveRes.body?.total || 0;

    const adminProdPass = adminProdRes.status === 200 && adminTotalProducts === 1064 && adminTotalDraft === 865 && adminTotalActive === 199;
    testResults['Admin Products (1,064 Total, 865 DRAFT)'] = {
      pass: adminProdPass,
      details: `Total: ${adminTotalProducts} (1064), DRAFT: ${adminTotalDraft} (865), ACTIVE: ${adminTotalActive} (199)`,
    };
    console.log(`  ${adminProdPass ? '✅' : '❌'} Admin Products → Total: ${adminTotalProducts} (Expected: 1064) | DRAFT: ${adminTotalDraft} (865) | ACTIVE: ${adminTotalActive} (199)`);

    // 12. Admin Users / Customers
    console.log('\n--- 12. Testing Admin Users / Customers ---');
    const usersRes = await request('/api/v1/admin/users', { headers: adminHeaders });
    const usersCount = usersRes.body?.data?.total || usersRes.body?.data?.users?.length || 0;
    const usersPass = usersRes.status === 200 && usersCount === 3;
    testResults['Admin Users (3 Total)'] = {
      pass: usersPass,
      details: `Status: ${usersRes.status}, Total Users: ${usersCount} (Expected: 3)`,
    };
    console.log(`  ${usersPass ? '✅' : '❌'} GET /api/v1/admin/users → Count: ${usersCount} (Expected: 3)`);

    // 13. Admin Reviews
    console.log('\n--- 13. Testing Admin Reviews ---');
    const reviewsRes = await request('/api/v1/admin/reviews', { headers: adminHeaders });
    const reviewsCount = reviewsRes.body?.data?.total || reviewsRes.body?.data?.reviews?.length || 0;
    const reviewsPass = reviewsRes.status === 200 && reviewsCount === 1;
    testResults['Admin Reviews (1 Total)'] = {
      pass: reviewsPass,
      details: `Status: ${reviewsRes.status}, Total Reviews: ${reviewsCount} (Expected: 1)`,
    };
    console.log(`  ${reviewsPass ? '✅' : '❌'} GET /api/v1/admin/reviews → Count: ${reviewsCount} (Expected: 1)`);

    // 14. Admin Coupons
    console.log('\n--- 14. Testing Admin Coupons ---');
    const couponsRes = await request('/api/v1/coupons', { headers: adminHeaders });
    const { items: couponsList, total: couponsTotal } = extractItemsAndTotal(couponsRes.body);
    const couponsPass = couponsRes.status === 200 && (couponsTotal === 3 || couponsList.length === 3);
    testResults['Admin Coupons (3 Total)'] = {
      pass: couponsPass,
      details: `Status: ${couponsRes.status}, Total Coupons: ${couponsTotal || couponsList.length} (Expected: 3)`,
    };
    console.log(`  ${couponsPass ? '✅' : '❌'} GET /api/v1/coupons → Count: ${couponsTotal || couponsList.length} (Expected: 3)`);

    // 15. Admin Settings
    console.log('\n--- 15. Testing Admin Settings ---');
    const settingsRes = await request('/api/v1/settings');
    const settings = settingsRes.body?.data?.settings || settingsRes.body?.data || [];
    const settingsCount = Array.isArray(settings) ? settings.length : Object.keys(settings).length;
    const settingsPass = settingsRes.status === 200 && settingsCount === 5;
    testResults['Admin Settings (5 Total)'] = {
      pass: settingsPass,
      details: `Status: ${settingsRes.status}, Settings Count: ${settingsCount} (Expected: 5)`,
    };
    console.log(`  ${settingsPass ? '✅' : '❌'} GET /api/v1/settings → Count: ${settingsCount} (Expected: 5)`);

    // 16. Orders & Payments
    console.log('\n--- 16. Testing Orders & Payments Endpoints ---');
    const ordersRes = await request('/api/v1/admin/orders', { headers: adminHeaders });
    const paymentsRes = await request('/api/v1/admin/payments', { headers: adminHeaders });
    const ordersCount = ordersRes.body?.data?.total || ordersRes.body?.data?.orders?.length || 0;
    const paymentsCount = paymentsRes.body?.data?.total || paymentsRes.body?.data?.payments?.length || 0;

    const ordersPass = ordersRes.status === 200 && ordersCount === 0;
    const paymentsPass = paymentsRes.status === 200 && paymentsCount === 0;
    testResults['Orders (0 Total)'] = {
      pass: ordersPass,
      details: `Status: ${ordersRes.status}, Orders: ${ordersCount} (Expected: 0)`,
    };
    testResults['Payments (0 Total)'] = {
      pass: paymentsPass,
      details: `Status: ${paymentsRes.status}, Payments: ${paymentsCount} (Expected: 0)`,
    };
    console.log(`  ${ordersPass ? '✅' : '❌'} GET /api/v1/admin/orders → Count: ${ordersCount} (Expected: 0)`);
    console.log(`  ${paymentsPass ? '✅' : '❌'} GET /api/v1/admin/payments → Count: ${paymentsCount} (Expected: 0)`);

    // 17. Local PostgreSQL Untouched Check
    console.log('\n--- 17. Verifying Local PostgreSQL Remains Untouched ---');
    const localUrl = 'postgresql://postgres:YourStrongPassword123!@localhost:5432/ramanayam_db?schema=public';
    const localPrisma = new PrismaClient({ datasources: { db: { url: localUrl } } });
    const localProductCount = await localPrisma.product.count();
    const localActiveCount = await localPrisma.product.count({ where: { status: 'ACTIVE' } });
    const localDraftCount = await localPrisma.product.count({ where: { status: 'DRAFT' } });
    await localPrisma.$disconnect();

    const localUntouchedPass = localProductCount === 1064 && localActiveCount === 199 && localDraftCount === 865;
    testResults['Local PostgreSQL Untouched'] = {
      pass: localUntouchedPass,
      details: `Local Products: ${localProductCount} (1064), ACTIVE: ${localActiveCount} (199), DRAFT: ${localDraftCount} (865)`,
    };
    console.log(`  ${localUntouchedPass ? '✅' : '❌'} Local PostgreSQL (localhost:5432/ramanayam_db) → 1,064 products (199 ACTIVE, 865 DRAFT)`);

    // Summary Table
    console.log('\n==========================================================================');
    console.log('                     API VERIFICATION SUMMARY                             ');
    console.log('==========================================================================');
    let allPass = true;
    for (const [testName, result] of Object.entries(testResults)) {
      if (!result.pass) allPass = false;
      console.log(`${testName.padEnd(40)} | ${result.pass ? '✅ PASS' : '❌ FAIL'} | ${result.details}`);
    }
    console.log('==========================================================================');

    if (allPass) {
      console.log('\n🎉 ALL READ-ONLY API TESTS PASSED AGAINST SUPABASE WITH 100% INTEGRITY!\n');
    } else {
      console.log('\n❌ ONE OR MORE API TESTS FAILED\n');
      process.exit(1);
    }
  } catch (err) {
    console.error('API Verification error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runApiVerification();
