const https = require('https');

const BASE_URL = 'https://ramanayam.onrender.com';
const API_BASE = `${BASE_URL}/api/v1`;

function request(method, path, options = {}) {
  const { headers = {}, body = null, token = null, cookie = null } = options;
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const parsed = new URL(url);

  const reqHeaders = {
    'Accept': 'application/json',
    ...headers,
  };

  if (body) {
    reqHeaders['Content-Type'] = 'application/json';
  }
  if (token) {
    reqHeaders['Authorization'] = `Bearer ${token}`;
  }
  if (cookie) {
    reqHeaders['Cookie'] = cookie;
  }

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: method,
      headers: reqHeaders,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = null;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: json,
          raw: data,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runAudit() {
  console.log('================================================================');
  console.log('RAMANAYAM PRODUCTION BACKEND AUDIT — LIVE RENDER TARGET');
  console.log('Target:', BASE_URL);
  console.log('Timestamp:', new Date().toISOString());
  console.log('================================================================\n');

  const results = {
    public: {},
    auth: {},
    admin: {},
    security: {},
    cors: {},
  };

  // --- 1. HEALTH CHECK ---
  console.log('1. Health Check (GET /health)...');
  const healthRes = await request('GET', `${BASE_URL}/health`);
  console.log(`   Status: ${healthRes.status}, Body:`, healthRes.data);
  results.public.health = { status: healthRes.status, success: healthRes.status === 200 };

  // --- 2. PUBLIC PRODUCTS ---
  console.log('\n2. Public Products (GET /api/v1/products)...');
  const prodRes = await request('GET', '/products?limit=10');
  const prodMeta = prodRes.data?.data?.meta || prodRes.data?.meta;
  console.log(`   Status: ${prodRes.status}, Total: ${prodMeta?.total}, Limit: ${prodMeta?.limit}, TotalPages: ${prodMeta?.totalPages}`);
  results.public.productsTotal = prodMeta?.total;

  // Check product pagination
  console.log('\n3. Product Pagination (GET /api/v1/products?page=2&limit=5)...');
  const page2Res = await request('GET', '/products?page=2&limit=5');
  console.log(`   Status: ${page2Res.status}, Page: ${page2Res.data?.data?.meta?.page}, Count: ${page2Res.data?.data?.data?.length}`);
  results.public.pagination = { status: page2Res.status, page: page2Res.data?.data?.meta?.page };

  // Check product search
  console.log('\n4. Product Search (GET /api/v1/products?search=Puja)...');
  const searchRes = await request('GET', '/products?search=Puja');
  console.log(`   Status: ${searchRes.status}, Search Total: ${searchRes.data?.data?.meta?.total}`);
  results.public.search = { status: searchRes.status, total: searchRes.data?.data?.meta?.total };

  // Check categories
  console.log('\n5. Categories (GET /api/v1/categories)...');
  const catRes = await request('GET', '/categories');
  const categories = catRes.data?.data || catRes.data?.items || catRes.data;
  console.log(`   Status: ${catRes.status}, Categories Count: ${Array.isArray(categories) ? categories.length : 'not array'}`);
  results.public.categories = { status: catRes.status, count: Array.isArray(categories) ? categories.length : 0 };

  // Check Active Product Detail by Slug
  const firstProduct = prodRes.data?.data?.data?.[0];
  console.log(`\n6. Active Product Detail (GET /api/v1/products/slug/${firstProduct?.slug})...`);
  const activeDetailRes = await request('GET', `/products/slug/${firstProduct?.slug}`);
  console.log(`   Status: ${activeDetailRes.status}, Name: ${activeDetailRes.data?.data?.product?.name}, Status: ${activeDetailRes.data?.data?.product?.status}`);
  results.public.activeProductDetail = { status: activeDetailRes.status, productStatus: activeDetailRes.data?.data?.product?.status };

  // --- SECURITY: Anonymous Isolation & 401s ---
  console.log('\n7. Anonymous DRAFT bypass attempt (GET /api/v1/products?status=ALL)...');
  const bypassAllRes = await request('GET', '/products?status=ALL');
  console.log(`   Status: ${bypassAllRes.status}, Total: ${bypassAllRes.data?.data?.meta?.total} (Should be 199)`);
  results.security.bypassAllTotal = bypassAllRes.data?.data?.meta?.total;

  console.log('\n8. Anonymous DRAFT direct filter attempt (GET /api/v1/products?status=DRAFT)...');
  const bypassDraftRes = await request('GET', '/products?status=DRAFT');
  console.log(`   Status: ${bypassDraftRes.status}, Total: ${bypassDraftRes.data?.data?.meta?.total} (Should be 0 or 199 depending on backend handler ignoring draft)`);
  results.security.bypassDraftTotal = bypassDraftRes.data?.data?.meta?.total;

  console.log('\n9. Anonymous Inventory (GET /api/v1/inventory)...');
  const anonInvRes = await request('GET', '/inventory');
  console.log(`   Status: ${anonInvRes.status} (Should be 401)`);
  results.security.anonymousInventory = anonInvRes.status;

  console.log('\n10. Anonymous Settings (GET /api/v1/settings)...');
  const anonSetRes = await request('GET', '/settings');
  console.log(`   Status: ${anonSetRes.status} (Should be 401)`);
  results.security.anonymousSettings = anonSetRes.status;

  console.log('\n11. Anonymous Admin Dashboard (GET /api/v1/admin/dashboard)...');
  const anonDashRes = await request('GET', '/admin/dashboard');
  console.log(`   Status: ${anonDashRes.status} (Should be 401)`);
  results.security.anonymousDashboard = anonDashRes.status;

  // --- AUTHENTICATION FLOW ---
  console.log('\n12. Admin Login (POST /api/v1/auth/login)...');
  const loginRes = await request('POST', '/auth/login', {
    body: {
      email: 'admin@ramayanam.in',
      password: 'Admin@Ramanayam2026',
    },
  });
  console.log(`   Status: ${loginRes.status}, Role: ${loginRes.data?.data?.user?.role}, Email: ${loginRes.data?.data?.user?.email}`);
  const setCookieHeader = loginRes.headers['set-cookie'];
  console.log('   Set-Cookie:', setCookieHeader);
  const adminToken = loginRes.data?.data?.accessToken;
  const refreshTokenCookie = Array.isArray(setCookieHeader) ? setCookieHeader.map(c => c.split(';')[0]).join('; ') : setCookieHeader?.split(';')[0];
  results.auth.login = { status: loginRes.status, role: loginRes.data?.data?.user?.role, hasToken: Boolean(adminToken) };

  // GET /auth/me with Bearer Token
  console.log('\n13. Auth Me (GET /api/v1/auth/me)...');
  const meRes = await request('GET', '/auth/me', { token: adminToken });
  console.log(`   Status: ${meRes.status}, User ID: ${meRes.data?.data?.user?.id}, Role: ${meRes.data?.data?.user?.role}`);
  results.auth.me = { status: meRes.status, role: meRes.data?.data?.user?.role };

  // Token Refresh
  console.log('\n14. Token Refresh (POST /api/v1/auth/refresh)...');
  const refreshRes = await request('POST', '/auth/refresh', { cookie: refreshTokenCookie });
  console.log(`   Status: ${refreshRes.status}, New Token Returned: ${Boolean(refreshRes.data?.data?.accessToken)}`);
  results.auth.refresh = { status: refreshRes.status, hasNewToken: Boolean(refreshRes.data?.data?.accessToken) };

  // --- ADMIN ENDPOINTS AUDIT ---
  console.log('\n================================================================');
  console.log('ADMIN ENDPOINTS AUDIT (WITH ADMIN BEARER TOKEN)');
  console.log('================================================================');

  // 1. Admin Dashboard
  console.log('\n15. Admin Dashboard (GET /api/v1/admin/dashboard)...');
  const dashRes = await request('GET', '/admin/dashboard', { token: adminToken });
  console.log(`   Status: ${dashRes.status}, Total Products: ${dashRes.data?.data?.totalProducts}, Active: ${dashRes.data?.data?.activeProducts}, Users: ${dashRes.data?.data?.totalUsers}, Revenue: ${dashRes.data?.data?.totalRevenue}`);
  results.admin.dashboard = dashRes.data?.data;

  // 2. Admin Products with status=ALL
  console.log('\n16. Admin Products ALL (GET /api/v1/products?status=ALL&limit=10)...');
  const adminProdAllRes = await request('GET', '/products?status=ALL&limit=10', { token: adminToken });
  const adminProdAllMeta = adminProdAllRes.data?.data?.meta;
  console.log(`   Status: ${adminProdAllRes.status}, Total Products (ALL): ${adminProdAllMeta?.total} (Should be 1064)`);
  results.admin.productsAllTotal = adminProdAllMeta?.total;

  // 3. Admin Products with status=DRAFT
  console.log('\n17. Admin Products DRAFT (GET /api/v1/products?status=DRAFT&limit=10)...');
  const adminProdDraftRes = await request('GET', '/products?status=DRAFT&limit=10', { token: adminToken });
  const adminProdDraftMeta = adminProdDraftRes.data?.data?.meta;
  console.log(`   Status: ${adminProdDraftRes.status}, Total Products (DRAFT): ${adminProdDraftMeta?.total} (Should be 865)`);
  results.admin.productsDraftTotal = adminProdDraftMeta?.total;
  const draftProduct = adminProdDraftRes.data?.data?.data?.[0];

  // 4. Admin Products with status=ACTIVE
  console.log('\n18. Admin Products ACTIVE (GET /api/v1/products?status=ACTIVE&limit=10)...');
  const adminProdActiveRes = await request('GET', '/products?status=ACTIVE&limit=10', { token: adminToken });
  const adminProdActiveMeta = adminProdActiveRes.data?.data?.meta;
  console.log(`   Status: ${adminProdActiveRes.status}, Total Products (ACTIVE): ${adminProdActiveMeta?.total} (Should be 199)`);
  results.admin.productsActiveTotal = adminProdActiveMeta?.total;

  // 5. Test Anonymous lookup of a known DRAFT product slug
  if (draftProduct) {
    console.log(`\n19. Attempt to access known DRAFT product anonymously (GET /api/v1/products/slug/${draftProduct.slug})...`);
    const anonDraftLookup = await request('GET', `/products/slug/${draftProduct.slug}`);
    console.log(`   Status: ${anonDraftLookup.status} (Should be 404)`);
    results.security.draftSlugLookupAnon = anonDraftLookup.status;

    console.log(`\n20. Attempt to access known DRAFT product as ADMIN (GET /api/v1/products/slug/${draftProduct.slug})...`);
    const adminDraftLookup = await request('GET', `/products/slug/${draftProduct.slug}`, { token: adminToken });
    console.log(`   Status: ${adminDraftLookup.status}, Name: ${adminDraftLookup.data?.data?.product?.name}`);
    results.admin.draftSlugLookupAdmin = adminDraftLookup.status;
  }

  // 6. Admin Inventory
  console.log('\n21. Admin Inventory (GET /api/v1/inventory?limit=10)...');
  const invRes = await request('GET', '/inventory?limit=10', { token: adminToken });
  const invTotal = invRes.data?.data?.total || invRes.data?.total || invRes.data?.data?.meta?.total || invRes.data?.data?.items?.length;
  console.log(`   Status: ${invRes.status}, Inventory Total: ${invTotal}, Items in page: ${invRes.data?.data?.items?.length || invRes.data?.data?.length}`);
  results.admin.inventory = { status: invRes.status, total: invTotal };

  // 7. Admin Users / Customers
  console.log('\n22. Admin Users (GET /api/v1/admin/users)...');
  const usersRes = await request('GET', '/admin/users', { token: adminToken });
  const usersTotal = usersRes.data?.data?.total ?? usersRes.data?.data?.length ?? usersRes.data?.total;
  console.log(`   Status: ${usersRes.status}, Users Total: ${usersTotal} (Should be 3)`);
  results.admin.usersTotal = usersTotal;

  // 8. Admin Reviews
  console.log('\n23. Admin Reviews (GET /api/v1/admin/reviews)...');
  const reviewsRes = await request('GET', '/admin/reviews', { token: adminToken });
  const reviewsTotal = reviewsRes.data?.data?.total ?? reviewsRes.data?.data?.length ?? reviewsRes.data?.total;
  console.log(`   Status: ${reviewsRes.status}, Reviews Total: ${reviewsTotal} (Should be 1)`);
  results.admin.reviewsTotal = reviewsTotal;

  // 9. Admin Coupons
  console.log('\n24. Admin Coupons (GET /api/v1/coupons)...');
  const couponsRes = await request('GET', '/coupons', { token: adminToken });
  const couponsTotal = couponsRes.data?.data?.total ?? couponsRes.data?.data?.items?.length ?? couponsRes.data?.data?.length;
  console.log(`   Status: ${couponsRes.status}, Coupons Total: ${couponsTotal} (Should be 3)`);
  results.admin.couponsTotal = couponsTotal;

  // 10. Admin Settings
  console.log('\n25. Admin Settings (GET /api/v1/settings)...');
  const settingsRes = await request('GET', '/settings', { token: adminToken });
  const settingsList = settingsRes.data?.data || settingsRes.data;
  console.log(`   Status: ${settingsRes.status}, Settings Count: ${Array.isArray(settingsList) ? settingsList.length : 'N/A'} (Should be 5)`);
  if (Array.isArray(settingsList)) {
    console.log('   Settings keys:', settingsList.map(s => s.key));
  }
  results.admin.settingsTotal = Array.isArray(settingsList) ? settingsList.length : 0;
  results.admin.settingsKeys = Array.isArray(settingsList) ? settingsList.map(s => s.key) : [];

  // 11. Admin Orders
  console.log('\n26. Admin Orders (GET /api/v1/orders/admin)...');
  const ordersRes = await request('GET', '/orders/admin', { token: adminToken });
  const ordersList = ordersRes.data?.data?.items || ordersRes.data?.data?.orders || ordersRes.data?.data;
  console.log(`   Status: ${ordersRes.status}, Orders Total: ${Array.isArray(ordersList) ? ordersList.length : 0} (Should be 0)`);
  results.admin.ordersTotal = Array.isArray(ordersList) ? ordersList.length : 0;

  // --- CORS VERIFICATION ---
  console.log('\n================================================================');
  console.log('CORS VERIFICATION');
  console.log('================================================================');
  console.log('\n27. CORS Preflight & Headers for https://ramayanam.in...');
  const corsPreflight = await request('OPTIONS', '/products', {
    headers: {
      'Origin': 'https://ramayanam.in',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Authorization, Content-Type',
    },
  });
  console.log('   OPTIONS Status:', corsPreflight.status);
  console.log('   Access-Control-Allow-Origin:', corsPreflight.headers['access-control-allow-origin']);
  console.log('   Access-Control-Allow-Credentials:', corsPreflight.headers['access-control-allow-credentials']);
  console.log('   Access-Control-Allow-Methods:', corsPreflight.headers['access-control-allow-methods']);
  console.log('   Access-Control-Allow-Headers:', corsPreflight.headers['access-control-allow-headers']);

  results.cors = {
    status: corsPreflight.status,
    allowOrigin: corsPreflight.headers['access-control-allow-origin'],
    allowCredentials: corsPreflight.headers['access-control-allow-credentials'],
  };

  console.log('\n================================================================');
  console.log('FINAL AUDIT SUMMARY DATA:');
  console.log(JSON.stringify(results, null, 2));
  console.log('================================================================\n');
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
