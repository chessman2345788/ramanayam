const https = require('https');

const VERCEL_URL = 'https://ramanayam.vercel.app';

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function verifyVercelSite() {
  console.log('================================================================');
  console.log('VERCEL PRODUCTION DEPLOYMENT VERIFICATION: ' + VERCEL_URL);
  console.log('================================================================\n');

  // 1. Homepage
  console.log('1. Testing Homepage (' + VERCEL_URL + ')...');
  const home = await get(VERCEL_URL);
  console.log('   Status:', home.statusCode);
  console.log('   Vercel Cache / ID:', home.headers['x-vercel-id'], 'Age:', home.headers['age']);
  console.log('   Title Match:', home.body.includes('Ramanayam') || home.body.includes('Sacred'));

  // 2. Products Page
  console.log('\n2. Testing Products Page (' + VERCEL_URL + '/products)...');
  const products = await get(VERCEL_URL + '/products');
  console.log('   Status:', products.statusCode);
  console.log('   Vercel Cache / ID:', products.headers['x-vercel-id']);
  console.log('   Contains Product Markup:', products.body.includes('Catalog') || products.body.includes('Divine Collection'));

  // 3. Product Detail Page
  const slug = 'baby-shower-godh-bharai-gift-kit-premium-0i8t';
  console.log('\n3. Testing Product Detail Page (' + VERCEL_URL + '/products/' + slug + ')...');
  const pdp = await get(VERCEL_URL + '/products/' + slug);
  console.log('   Status:', pdp.statusCode);
  console.log('   Vercel Cache / ID:', pdp.headers['x-vercel-id']);
  console.log('   Contains Product Name:', pdp.body.includes('Baby Shower') || pdp.body.includes('Godh Bharai'));

  // 4. Admin Login Page
  console.log('\n4. Testing Admin Login (' + VERCEL_URL + '/admin/login)...');
  const admin = await get(VERCEL_URL + '/admin/login');
  console.log('   Status:', admin.statusCode);
  console.log('   Contains Admin Portal:', admin.body.includes('Admin') || admin.body.includes('Sign in'));

  // 5. Check if localhost API is present in bundle or HTML
  console.log('\n5. Checking for any localhost calls in HTML/JS snippets...');
  const hasLocalhostInHome = home.body.includes('http://localhost');
  const hasLocalhostInPdp = pdp.body.includes('http://localhost');
  console.log('   Localhost in Home HTML:', hasLocalhostInHome);
  console.log('   Localhost in PDP HTML:', hasLocalhostInPdp);

  // 6. Check custom domain ramayanam.in DNS status
  console.log('\n6. Checking custom domain https://ramayanam.in ...');
  const customDomain = await get('https://ramayanam.in');
  console.log('   Status:', customDomain.statusCode);
  console.log('   Server:', customDomain.headers['server']);
  console.log('   Vercel Header present:', Boolean(customDomain.headers['x-vercel-id']));
  if (!customDomain.headers['x-vercel-id']) {
    console.log('   Note: ramayanam.in DNS currently points to Hostinger/DPS server rather than Vercel CNAME/A record (cname.vercel-dns.com / 76.76.21.21).');
  }

  console.log('\n================================================================');
  console.log('VERIFICATION COMPLETE');
  console.log('================================================================\n');
}

verifyVercelSite();
