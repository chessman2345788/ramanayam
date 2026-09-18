const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let d = '';
      res.on('data', (c) => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d, headers: res.headers }));
    }).on('error', (e) => resolve({ error: e.message }));
  });
}

async function run() {
  // 1. Check if the LIVE Vercel deployment has the env var baked in
  const page = await get('https://ramanayam-5jhh.vercel.app/products');
  console.log('=== Page HTML analysis ===');
  console.log('Status:', page.status);
  console.log('Body length:', page.body.length);
  console.log('Vercel ID:', page.headers['x-vercel-id']);

  // Check for env vars and key strings in SSR HTML
  console.log('Contains ramanayam.onrender.com:', page.body.includes('ramanayam.onrender.com'));
  console.log('Contains localhost:3001:', page.body.includes('localhost:3001'));
  console.log('Contains localhost:3000:', page.body.includes('localhost:3000'));

  // 2. Fetch a JS bundle to check for the API URL
  const scriptMatches = page.body.match(/src="(\/_next\/static\/chunks\/[^"]+)"/g) || [];
  console.log('\nFound', scriptMatches.length, 'JS chunk script tags');

  // Find all unique chunk URLs
  const chunkUrls = scriptMatches.map(s => s.match(/src="([^"]+)"/)[1]);
  
  // Check a few chunks for the API URL
  let foundApiUrl = false;
  let foundMaxPrice50k = false;
  let foundMaxPrice15k = false;
  for (let i = 0; i < Math.min(chunkUrls.length, 25); i++) {
    const chunkUrl = 'https://ramanayam-5jhh.vercel.app' + chunkUrls[i];
    const chunk = await get(chunkUrl);
    if (chunk.body.includes('ramanayam.onrender.com')) {
      console.log('  Chunk', i, 'contains ramanayam.onrender.com');
      foundApiUrl = true;
    }
    if (chunk.body.includes('localhost:3001') || chunk.body.includes('localhost:3000')) {
      console.log('  Chunk', i, 'contains localhost');
    }
    if (chunk.body.includes('50000') || chunk.body.includes('5e4')) {
      foundMaxPrice50k = true;
    }
    if (chunk.body.includes('maxPrice') && chunk.body.includes('15000')) {
      foundMaxPrice15k = true;
      console.log('  Chunk', i, 'contains maxPrice with 15000 (OLD CODE!)');
    }
    if (chunk.body.includes('CATEGORY_ALIASES') || chunk.body.includes('category_aliases')) {
      console.log('  Chunk', i, 'contains CATEGORY_ALIASES');
    }
  }

  console.log('\n=== Summary ===');
  console.log('Found API URL in any chunk:', foundApiUrl);
  console.log('Found maxPrice 50000 in chunks:', foundMaxPrice50k);
  console.log('Found maxPrice 15000 (old) in chunks:', foundMaxPrice15k);
}

run();
