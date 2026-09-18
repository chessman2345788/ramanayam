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
  const page = await get('https://ramanayam-5jhh.vercel.app/products');
  const scriptMatches = page.body.match(/src="(\/_next\/static\/chunks\/[^"]+)"/g) || [];
  const chunkUrls = scriptMatches.map(s => s.match(/src="([^"]+)"/)[1]);

  for (let i = 0; i < chunkUrls.length; i++) {
    const chunkUrl = 'https://ramanayam-5jhh.vercel.app' + chunkUrls[i];
    const chunk = await get(chunkUrl);

    // Find the chunk that contains the useProducts/filter logic
    if (chunk.body.includes('fetchProductsFromApi') || chunk.body.includes('apiProducts')) {
      console.log('=== Chunk', i, '(' + chunkUrls[i].slice(-30) + ') ===');
      console.log('Length:', chunk.body.length);
      
      // Find the API URL being called
      const apiUrlMatch = chunk.body.match(/["']([^"']*ramanayam[^"']*onrender[^"']*)["']/);
      if (apiUrlMatch) console.log('API URL found:', apiUrlMatch[1]);

      // Find the products fetch call
      if (chunk.body.includes('limit:1000') || chunk.body.includes('limit: 1000') || chunk.body.includes('limit:1e3')) {
        console.log('Found limit:1000 fetch call');
      }

      // Check for CORS issues - look at the axios config
      if (chunk.body.includes('withCredentials') || chunk.body.includes('credentials')) {
        console.log('Has credentials config');
      }
      
      // Check for the data extraction logic
      if (chunk.body.includes('data.data') || chunk.body.includes('.data?.data')) {
        console.log('Has data.data extraction');
      }

      // Find the isCategoryActive or handleCategoryToggle function
      if (chunk.body.includes('handleCategoryToggle') || chunk.body.includes('categoryToggle')) {
        console.log('Has handleCategoryToggle');
      }

      // Look for the actual filter code pattern
      if (chunk.body.includes('targetCategorySlugs') || chunk.body.includes('categorySlugs')) {
        console.log('Has targetCategorySlugs filter code');
      }

      // Check for the local products fallback
      if (chunk.body.includes('localProducts') || chunk.body.includes('getProducts')) {
        console.log('Has localProducts/getProducts reference');
      }
    }
  }
}

run();
