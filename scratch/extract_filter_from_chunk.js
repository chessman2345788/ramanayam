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
  const chunk = await get('https://ramanayam-5jhh.vercel.app/_next/static/chunks/3-gqtne40moll.js');
  const body = chunk.body;
  
  // Find the filter logic - search for categorySlug matching code
  const patterns = [
    'categorySlug',
    'pSlug',
    'targetCategorySlugs',
    'includes(target)',
    'target.includes',
    'categories.length',
    'temple-decor',
    'samagri-kits',
    'isCategoryActive',
  ];
  
  patterns.forEach(p => {
    const idx = body.indexOf(p);
    if (idx > -1) {
      const start = Math.max(0, idx - 80);
      const end = Math.min(body.length, idx + p.length + 80);
      console.log('--- Found:', p, 'at index', idx, '---');
      console.log(body.slice(start, end));
      console.log('');
    } else {
      console.log('NOT found:', p);
    }
  });
  
  // Search for maxPrice value
  console.log('\n=== maxPrice search ===');
  let searchIdx = 0;
  let count = 0;
  while (true) {
    const idx = body.indexOf('maxPrice', searchIdx);
    if (idx === -1 || count > 10) break;
    const start = Math.max(0, idx - 30);
    const end = Math.min(body.length, idx + 50);
    console.log('maxPrice at', idx, ':', body.slice(start, end));
    searchIdx = idx + 8;
    count++;
  }
}

run();
