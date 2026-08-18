import axios from "axios";

async function checkEnvelope() {
  const res = await axios.get("http://localhost:5000/api/v1/products?limit=5");
  console.log("Status:", res.status);
  console.log("Payload keys:", Object.keys(res.data));
  console.log("Data keys:", Object.keys(res.data.data));
  console.log("Total:", res.data.data.total);
  console.log("Returned products count:", res.data.data.data?.length);
  if (res.data.data.data?.length > 0) {
    console.log("First product sample:", {
      name: res.data.data.data[0].name,
      slug: res.data.data.data[0].slug,
      sku: res.data.data.data[0].variants?.[0]?.sku,
      price: res.data.data.data[0].variants?.[0]?.price,
      stock: res.data.data.data[0].variants?.[0]?.inventory?.availableStock,
      category: res.data.data.data[0].category?.name,
    });
  }
}

checkEnvelope();
