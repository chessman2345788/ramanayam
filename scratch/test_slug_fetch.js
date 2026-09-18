const https = require('https');

async function testSlug(slug) {
  return new Promise((resolve) => {
    https.get(`https://ramanayam.onrender.com/api/v1/products/slug/${slug}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  console.log('Testing active product slug: baby-shower-godh-bharai-gift-kit-premium-0i8t');
  const activeRes = await testSlug('baby-shower-godh-bharai-gift-kit-premium-0i8t');
  console.log('Active product response status:', activeRes.status, 'Product Name:', activeRes.data?.data?.product?.name);

  console.log('Testing non-existent product slug: non-existent-product-12345');
  const notFoundRes = await testSlug('non-existent-product-12345');
  console.log('Not found product response status:', notFoundRes.status);
}

run();
