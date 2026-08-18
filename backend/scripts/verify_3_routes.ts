import axios from "axios";

async function verifySpecificRoutes() {
  const apiBase = "http://localhost:5000/api/v1";

  // 1. Login
  const loginRes = await axios.post(`${apiBase}/auth/login`, {
    email: "admin@ramayanam.in",
    password: "Admin@Ramanayam2026",
  });
  const token = loginRes.data?.data?.accessToken;
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // 2. Categories
  const catRes = await axios.get(`${apiBase}/categories?limit=50`);
  const cats = catRes.data?.data?.data || [];
  console.log(`✅ Categories API: Loaded ${cats.length} categories.`);
  const sampleCat = cats.find((c: any) => c.name === "Brass & Copper Items") || cats[0];
  const catProdRes = await axios.get(`${apiBase}/products?category=${sampleCat.id}&limit=5`);
  console.log(`✅ Category Filter API ("${sampleCat.name}"): Returned ${catProdRes.data?.data?.data?.length} products. Total in DB: ${catProdRes.data?.data?.meta?.total}`);

  // 3. Razorpay Order Creation: POST /payments/create-order
  const rzpRes = await axios.post(
    `${apiBase}/payments/create-order`,
    {
      amount: 199900, // paise (₹1,999)
      currency: "INR",
    },
    authHeader
  );
  console.log(`✅ Razorpay Order API (POST /payments/create-order): Generated Gateway Order ID = ${rzpRes.data?.data?.order_id}, Amount = ₹${rzpRes.data?.data?.amount / 100}`);

  // 4. Admin Orders: GET /orders/admin
  const ordRes = await axios.get(`${apiBase}/orders/admin`, authHeader);
  const orders = ordRes.data?.data?.data || [];
  console.log(`✅ Admin Orders API (GET /orders/admin): Loaded ${orders.length} orders from PostgreSQL (Total: ${ordRes.data?.data?.total}).`);
}

verifySpecificRoutes();
