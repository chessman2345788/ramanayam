const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let d = '';
      res.on('data', (c) => d += c);
      res.on('end', () => resolve({ body: d }));
    }).on('error', (e) => resolve({ error: e.message }));
  });
}

async function run() {
  const chunk = await get('https://ramanayam-5jhh.vercel.app/_next/static/chunks/3-gqtne40moll.js');
  const body = chunk.body;
  
  // Get the full filter block - from categories.length to the sorting code
  const filterStart = body.indexOf('categories.length>0');
  if (filterStart > -1) {
    // Get 800 chars from this point to see the full filter logic
    console.log('=== DEPLOYED FILTER CODE (minified) ===');
    console.log(body.slice(filterStart, filterStart + 800));
    console.log('');
  }
  
  // Also get the category aliases definition
  // Search for the alias definitions before the filter
  const aliasSearchStart = Math.max(0, filterStart - 5000);
  const aliasBlock = body.slice(aliasSearchStart, filterStart);
  
  // Find 'idols-murtis' which is in the aliases
  const idolsIdx = aliasBlock.lastIndexOf('idols-murtis');
  if (idolsIdx > -1) {
    console.log('=== DEPLOYED CATEGORY ALIASES ===');
    console.log(aliasBlock.slice(Math.max(0, idolsIdx - 100), idolsIdx + 500));
    console.log('');
  }
  
  // Get the full products merge/dedup code
  const mergeIdx = body.indexOf('apiSlugs') || body.indexOf('uniqueLocal');
  if (mergeIdx > -1) {
    console.log('=== PRODUCT MERGE CODE ===');
    console.log(body.slice(mergeIdx, mergeIdx + 200));
  }
}

run();
