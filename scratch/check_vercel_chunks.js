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
  // Check the chunk that has the filter code (chunk 5 and 8 had the API URL)
  const page = await get('https://ramanayam-5jhh.vercel.app/products');
  const scriptMatches = page.body.match(/src="(\/_next\/static\/chunks\/[^"]+)"/g) || [];
  const chunkUrls = scriptMatches.map(s => s.match(/src="([^"]+)"/)[1]);
  
  for (let i = 0; i < chunkUrls.length; i++) {
    const chunkUrl = 'https://ramanayam-5jhh.vercel.app' + chunkUrls[i];
    const chunk = await get(chunkUrl);
    
    // Look for the filter logic
    if (chunk.body.includes('maxPrice') || chunk.body.includes('categories') && chunk.body.includes('filter')) {
      // Find the maxPrice default value
      const maxPriceMatch = chunk.body.match(/maxPrice[:\s]*(\d+)/);
      if (maxPriceMatch) {
        console.log('Chunk', i, '- maxPrice default:', maxPriceMatch[1]);
      }
      
      // Look for category alias patterns
      if (chunk.body.includes('temple-decor') || chunk.body.includes('samagri-kits')) {
        console.log('Chunk', i, '- contains category slug strings');
        
        // Find nearby context for temple-decor
        const idx = chunk.body.indexOf('temple-decor');
        if (idx > -1) {
          console.log('  temple-decor context:', chunk.body.slice(Math.max(0, idx - 50), idx + 100));
        }
      }
      
      if (chunk.body.includes('CATEGORY_ALIASES') || chunk.body.includes('categoryAliases')) {
        console.log('Chunk', i, '- has CATEGORY_ALIASES reference');
      }
    }
  }

  // Also check the main page JS (not just chunks)  
  const mainPage = await get('https://ramanayam-5jhh.vercel.app/_next/static/chunks/turbopack-0s6jfbf9u9k61.js');
  if (mainPage.body) {
    console.log('\nTurbopack chunk length:', mainPage.body.length);
    if (mainPage.body.includes('maxPrice')) {
      console.log('Turbopack has maxPrice');
    }
  }
}

run();
