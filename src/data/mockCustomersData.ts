import { Customer, CustomerStatus, CustomerType } from "@/types/customers";

const INDIAN_CITIES = [
  { city: "Ayodhya", state: "Uttar Pradesh", pincode: "224123" },
  { city: "Varanasi", state: "Uttar Pradesh", pincode: "221001" },
  { city: "New Delhi", state: "Delhi", pincode: "110001" },
  { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
  { city: "Bengaluru", state: "Karnataka", pincode: "560001" },
  { city: "Jaipur", state: "Rajasthan", pincode: "302001" },
  { city: "Chennai", state: "Tamil Nadu", pincode: "600001" },
  { city: "Kolkata", state: "West Bengal", pincode: "700001" },
  { city: "Ahmedabad", state: "Gujarat", pincode: "380001" },
  { city: "Pune", state: "Maharashtra", pincode: "411001" },
];

const NAMES = [
  "Aarav Sharma", "Priya Sundaram", "Rajesh Kumar Varma", "Ananya Iyer",
  "Vikramaditya Singh", "Sunita Deshmukh", "Amitabh Bannerjee", "Meenakshi Patel",
  "Rohan Pandit", "Sneha Kulkarni", "Devendra Mishra", "Pooja Reddy",
  "Gaurav Kapoor", "Kavita Tiwari", "Harish Agrawal", "Ritu Sengupta"
];

export function generateMockCustomers(count: number = 55): Customer[] {
  const customers: Customer[] = [];

  for (let i = 1; i <= count; i++) {
    const name = NAMES[(i - 1) % NAMES.length] + (i > NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : "");
    const firstName = name.split(" ")[0].toLowerCase();
    const lastName = name.split(" ")[1].toLowerCase();
    const email = `${firstName}.${lastName}${i}@gmail.com`;
    const phone = `+91 ${9800000000 + i * 12345}`;
    const id = `CUST-2026-${(1000 + i).toString()}`;
    const cityInfo = INDIAN_CITIES[i % INDIAN_CITIES.length];

    let status: CustomerStatus = "Active";
    if (i % 6 === 0) status = "VIP";
    else if (i % 9 === 0) status = "Blocked";
    else if (i % 11 === 0) status = "Guest";

    const customerType: CustomerType = i % 5 === 0 ? "Wholesale" : "Retail";
    const isVerified = status !== "Guest" && i % 8 !== 0;
    const isGuest = status === "Guest";

    const ordersCount = isGuest ? 1 : ((i * 3) % 18) + 1;
    const totalSpent = ordersCount * (1200 + ((i * 450) % 4500));
    const avgOrderValue = Math.round(totalSpent / ordersCount);

    const daysAgo = Math.floor(i * 2.5);
    const joinDateObj = new Date(new Date("2026-08-01").getTime() - daysAgo * 86400000);
    const joinedDate = joinDateObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const joinedDateISO = joinDateObj.toISOString();

    customers.push({
      id,
      name,
      email,
      phone,
      status,
      isVerified,
      isGuest,
      customerType,
      ordersCount,
      totalSpent,
      avgOrderValue,
      joinedDate,
      lastOrderDate: "30 Jul 2026",
      addresses: [
        {
          id: `addr-${id}-1`,
          type: "Shipping",
          isDefault: true,
          name,
          phone,
          street: `${15 + (i % 30)}, Mandir Path, Ward ${(i % 12) + 1}`,
          landmark: "Near Main Temple Gate",
          city: cityInfo.city,
          state: cityInfo.state,
          pincode: cityInfo.pincode,
          country: "India",
        },
        {
          id: `addr-${id}-2`,
          type: "Billing",
          isDefault: false,
          name,
          phone,
          street: `Plot ${(i % 50) + 10}, Business Hub, Road 4`,
          city: cityInfo.city,
          state: cityInfo.state,
          pincode: cityInfo.pincode,
          country: "India",
        },
      ],
      recentOrders: [
        {
          id: `RAM-2026-${10020 + i}`,
          date: "30 Jul 2026",
          amount: Math.round(avgOrderValue * 1.1),
          itemsCount: (i % 3) + 1,
          paymentStatus: "Paid",
          orderStatus: "Delivered",
        },
        {
          id: `RAM-2026-${10005 + i}`,
          date: "15 Jul 2026",
          amount: Math.round(avgOrderValue * 0.9),
          itemsCount: 2,
          paymentStatus: "Paid",
          orderStatus: "Delivered",
        },
      ],
      wishlist: [
        { id: `w-${i}-1`, productId: "p1", name: "Brass Puja Thali Set with Bell", image: "/images/products/puja-thali.jpg", price: 2499, inStock: true, addedDate: "20 Jul 2026" },
        { id: `w-${i}-2`, productId: "p2", name: "Original 5 Mukhi Rudraksha Mala", image: "/images/products/rudraksha.jpg", price: 1899, inStock: true, addedDate: "12 Jul 2026" },
      ],
      reviews: [
        { id: `r-${i}-1`, productName: "Handcrafted Carved Brass Diya", rating: 5, comment: "Exquisite craftsmanship! Beautiful light in our home Mandir.", date: "25 Jul 2026", likes: 14 },
        { id: `r-${i}-2`, productName: "Bhimseni Pure Camphor 500g", rating: 5, comment: "Pure fragrance, burns completely cleanly without residue.", date: "10 Jun 2026", likes: 8 },
      ],
      couponsUsed: [
        { code: "RAMANAYAM10", discount: "10% OFF", usedDate: "30 Jul 2026", orderId: `RAM-2026-${10020 + i}` },
      ],
      recentlyViewed: [
        { id: "p1", name: "Brass Puja Thali Set", price: 2499, image: "/images/products/puja-thali.jpg" },
        { id: "p4", name: "Mysore Sandalwood Paste", price: 890, image: "/images/products/sandalwood.jpg" },
      ],
      timeline: [
        { id: `t-${i}-1`, title: "Account Created", type: "account_created", date: joinedDate, time: "10:30 AM", actor: "Customer (Self)", details: "Signed up via website OTP authentication." },
        { id: `t-${i}-2`, title: "Order #RAM-2026-10020 Placed", type: "order_placed", date: "30 Jul 2026", time: "04:15 PM", actor: "Customer (Self)", details: "Placed order worth ₹" + (avgOrderValue * 1.1) },
        { id: `t-${i}-3`, title: "Product Review Submitted", type: "review_submitted", date: "25 Jul 2026", time: "08:45 PM", actor: "Customer (Self)", details: "Rated 5 stars for Handcrafted Brass Diya." },
      ],
      notes: "Regular patron of Ayodhya temple offerings. Prefers express shipping.",
    });
  }

  return customers;
}

export const mockCustomersList = generateMockCustomers(55);
