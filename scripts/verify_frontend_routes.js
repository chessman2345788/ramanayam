const http = require('http');

function getRoute(routePath) {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000' + routePath, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        resolve({
          path: routePath,
          statusCode: res.statusCode || 0,
          bytes: data.length,
          location: res.headers.location || '',
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        path: routePath,
        statusCode: 0,
        bytes: 0,
        error: err.message,
      });
    });

    req.setTimeout(30000, () => {
      req.destroy();
      resolve({
        path: routePath,
        statusCode: 408,
        bytes: 0,
        error: 'Timeout',
      });
    });
  });
}

async function verifyAllFrontendRoutes() {
  console.log('==========================================================================');
  console.log('          RAMANAYAM NEXT.JS FRONTEND ROUTE VERIFICATION                   ');
  console.log('==========================================================================\n');

  const routes = [
    { name: 'Homepage', path: '/' },
    { name: 'Products Page', path: '/products' },
    { name: 'Product Search', path: '/products?search=rudraksha' },
    { name: 'Product Detail (ACTIVE)', path: '/products/11-mukhi-rudraksha-bead-sacred' },
    { name: 'Cart Page', path: '/cart' },
    { name: 'Checkout Page (PRE-PAYMENT)', path: '/checkout' },
    { name: 'Account Page', path: '/account' },
    { name: 'Admin Login', path: '/admin/login' },
    { name: 'Admin Dashboard', path: '/admin' },
    { name: 'Admin Products', path: '/admin/products' },
    { name: 'Admin Inventory', path: '/admin/inventory' },
    { name: 'Admin Orders', path: '/admin/orders' },
    { name: 'Admin Customers', path: '/admin/customers' },
    { name: 'Admin Reviews', path: '/admin/reviews' },
    { name: 'Admin Coupons', path: '/admin/coupons' },
    { name: 'Admin Settings', path: '/admin/settings' },
  ];

  let allPassed = true;
  for (const r of routes) {
    const res = await getRoute(r.path);
    // 200 (OK), 307/308 (Temporary/Permanent Redirect e.g. unauth redirect to login) are valid Next.js responses
    const isOk = res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308;
    if (!isOk) allPassed = false;

    const statusText = isOk ? '✅ PASS' : '❌ FAIL';
    const redirectInfo = res.location ? ' -> ' + res.location : '';
    console.log(
      r.name.padEnd(32) + ' | ' + r.path.padEnd(45) + ' | ' + String(res.statusCode).padStart(3) + ' | ' + statusText + ' (' + res.bytes + ' bytes)' + redirectInfo
    );
  }

  console.log('\n==========================================================================');
  if (allPassed) {
    console.log('🎉 ALL NEXT.JS FRONTEND ROUTES COMPILED AND VERIFIED SUCCESSFULLY!');
  } else {
    console.log('❌ SOME FRONTEND ROUTES FAILED');
  }
  console.log('==========================================================================\n');
}

verifyAllFrontendRoutes();
