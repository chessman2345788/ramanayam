import { Order, OrderStatus, PaymentStatus, PaymentMethod } from "@/types/orders";

const MOCK_PRODUCTS = [
  { id: "p1", name: "Brass Puja Thali Set with Bell & Diya", sku: "RAM-PTS-001", price: 2499, gstRate: 12, hsnCode: "7419.99", image: "/images/products/puja-thali.jpg" },
  { id: "p2", name: "Original 5 Mukhi Rudraksha Mala (108+1)", sku: "RAM-RUD-005", price: 1899, gstRate: 5, hsnCode: "7117.90", image: "/images/products/rudraksha.jpg" },
  { id: "p3", name: "Bhimseni Pure Camphor 500g", sku: "RAM-CMP-500", price: 650, gstRate: 18, hsnCode: "2914.29", image: "/images/products/camphor.jpg" },
  { id: "p4", name: "Mysore Sandalwood Paste 100g", sku: "RAM-SND-100", price: 890, gstRate: 12, hsnCode: "3304.99", image: "/images/products/sandalwood.jpg" },
  { id: "p5", name: "Handcrafted Carved Brass Akhand Jyot Diya", sku: "RAM-AKD-002", price: 1450, gstRate: 12, hsnCode: "7419.99", image: "/images/products/brass-diya.jpg" },
  { id: "p6", name: "Pure Silver Tulsi Leaf for Puja (925 Silver)", sku: "RAM-SLV-008", price: 1290, gstRate: 3, hsnCode: "7114.11", image: "/images/products/silver-tulsi.jpg" },
  { id: "p7", name: "Organic Loban & Sambrani Dhoop Cups (Pack of 30)", sku: "RAM-DHP-030", price: 420, gstRate: 5, hsnCode: "3307.41", image: "/images/products/dhoop.jpg" },
  { id: "p8", name: "Ayodhya Sacred Sarayu Jal 500ml Bottle", sku: "RAM-WTR-500", price: 299, gstRate: 0, hsnCode: "2201.90", image: "/images/products/ganga-jal.jpg" },
];

const CUSTOMERS = [
  { id: "c101", name: "Aarav Sharma", email: "aarav.sharma@gmail.com", phone: "+91 98765 43210", city: "Ayodhya", state: "Uttar Pradesh", pincode: "224123", totalOrders: 14, totalSpent: 42800, badge: "VIP" as const, joined: "12 Jan 2024" },
  { id: "c102", name: "Priya Sundaram", email: "priya.sundaram@yahoo.com", phone: "+91 98112 87654", city: "Chennai", state: "Tamil Nadu", pincode: "600001", totalOrders: 8, totalSpent: 19500, badge: "Regular" as const, joined: "05 Mar 2024" },
  { id: "c103", name: "Rajesh Kumar Varma", email: "rajesh.varma@outlook.com", phone: "+91 99001 22334", city: "Varanasi", state: "Uttar Pradesh", pincode: "221001", totalOrders: 21, totalSpent: 89400, badge: "VIP" as const, joined: "10 Oct 2023" },
  { id: "c104", name: "Ananya Iyer", email: "ananya.iyer@gmail.com", phone: "+91 97411 99887", city: "Bengaluru", state: "Karnataka", pincode: "560001", totalOrders: 2, totalSpent: 3890, badge: "New" as const, joined: "18 Jul 2026" },
  { id: "c105", name: "Vikramaditya Singh", email: "vikram.singh@gmail.com", phone: "+91 94140 55443", city: "Jaipur", state: "Rajasthan", pincode: "302001", totalOrders: 5, totalSpent: 14200, badge: "Regular" as const, joined: "01 Feb 2025" },
  { id: "c106", name: "Sunita Deshmukh", email: "sunita.d@rediffmail.com", phone: "+91 98220 11998", city: "Pune", state: "Maharashtra", pincode: "411001", totalOrders: 11, totalSpent: 31000, badge: "VIP" as const, joined: "15 Aug 2024" },
  { id: "c107", name: "Amitabh Bannerjee", email: "amitabh.b@gmail.com", phone: "+91 98300 77665", city: "Kolkata", state: "West Bengal", pincode: "700001", totalOrders: 3, totalSpent: 6200, badge: "Regular" as const, joined: "22 Nov 2025" },
  { id: "c108", name: "Meenakshi Patel", email: "meenakshi.p@gmail.com", phone: "+91 98980 33445", city: "Ahmedabad", state: "Gujarat", pincode: "380001", totalOrders: 1, totalSpent: 1899, badge: "New" as const, joined: "28 Jul 2026" }
];

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"];
const PAYMENT_STATUSES: PaymentStatus[] = ["Pending", "Paid", "Failed", "Refunded", "Partially Refunded"];
const PAYMENT_METHODS: PaymentMethod[] = ["UPI", "Credit/Debit Card", "Netbanking", "Cash on Delivery"];
const COURIERS = ["BlueDart", "Delhivery", "DTDC", "India Post", "Shadowfax"] as const;

export function generateMockOrders(count: number = 60): Order[] {
  const orders: Order[] = [];
  const baseDate = new Date("2026-08-01T12:00:00Z");

  for (let i = 1; i <= count; i++) {
    const cust = CUSTOMERS[i % CUSTOMERS.length];
    const orderNum = (10000 + i).toString();
    const orderId = `RAM-2026-${orderNum}`;
    
    // Choose status based on index for predictable variety
    let orderStatus: OrderStatus = ORDER_STATUSES[i % ORDER_STATUSES.length];
    let paymentStatus: PaymentStatus = "Paid";
    
    if (orderStatus === "Pending") paymentStatus = "Pending";
    else if (orderStatus === "Cancelled") paymentStatus = i % 2 === 0 ? "Refunded" : "Failed";
    else if (orderStatus === "Returned" || orderStatus === "Refunded") paymentStatus = "Refunded";
    
    const paymentMethod = PAYMENT_METHODS[i % PAYMENT_METHODS.length];
    if (paymentMethod === "Cash on Delivery" && orderStatus !== "Delivered") {
      paymentStatus = "Pending";
    }

    // Select 1 to 3 items
    const prodCount = (i % 3) + 1;
    const items = [];
    let subtotal = 0;
    let totalTax = 0;

    for (let j = 0; j < prodCount; j++) {
      const prod = MOCK_PRODUCTS[(i + j) % MOCK_PRODUCTS.length];
      const qty = ((i + j) % 2) + 1;
      const lineTotal = prod.price * qty;
      const tax = (lineTotal * prod.gstRate) / 100;
      subtotal += lineTotal;
      totalTax += tax;
      items.push({
        id: `li-${orderNum}-${j}`,
        productId: prod.id,
        name: prod.name,
        image: prod.image,
        sku: prod.sku,
        price: prod.price,
        quantity: qty,
        gstRate: prod.gstRate,
        hsnCode: prod.hsnCode,
        total: lineTotal,
      });
    }

    const shippingCharges = subtotal > 2000 ? 0 : 99;
    const hasDiscount = i % 4 === 0;
    const discountAmount = hasDiscount ? Math.round(subtotal * 0.1) : 0;
    const grandTotal = subtotal + Math.round(totalTax) + shippingCharges - discountAmount;

    // Date calculation
    const daysAgo = Math.floor(i / 3);
    const dateObj = new Date(baseDate.getTime() - daysAgo * 86400000 - (i % 12) * 3600000);
    const dateStr = dateObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = dateObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

    // Tracking
    const courier = COURIERS[i % COURIERS.length];
    const trackingId = `AWB${88371920 + i}`;
    const isShippedOrDelivered = ["Shipped", "Delivered", "Returned"].includes(orderStatus);

    orders.push({
      id: orderId,
      customer: {
        id: cust.id,
        name: cust.name,
        email: cust.email,
        phone: cust.phone,
        totalOrders: cust.totalOrders,
        totalSpent: cust.totalSpent,
        badge: cust.badge,
        joinedDate: cust.joined,
      },
      shippingAddress: {
        name: cust.name,
        phone: cust.phone,
        street: `${12 + (i % 40)}, Temple Road, Sector ${(i % 10) + 1}`,
        landmark: "Near Ram Mandir Gate",
        city: cust.city,
        state: cust.state,
        pincode: cust.pincode,
        country: "India",
      },
      billingAddress: {
        name: cust.name,
        phone: cust.phone,
        street: `${12 + (i % 40)}, Temple Road, Sector ${(i % 10) + 1}`,
        landmark: "Near Ram Mandir Gate",
        city: cust.city,
        state: cust.state,
        pincode: cust.pincode,
        country: "India",
      },
      items,
      itemsCount: items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal,
      shippingCharges,
      gstSummary: {
        subtotal,
        cgst: Math.round(totalTax / 2),
        sgst: Math.round(totalTax / 2),
        igst: 0,
        totalTax: Math.round(totalTax),
      },
      discountSummary: {
        code: hasDiscount ? "RAMANAYAM10" : undefined,
        amount: discountAmount,
      },
      totalAmount: grandTotal,
      paymentMethod,
      paymentStatus,
      orderStatus,
      transactionId: `PAY_RZP_${9948201 + i}`,
      paymentDate: dateStr,
      date: dateStr,
      time: timeStr,
      createdAtISO: dateObj.toISOString(),
      trackingInfo: isShippedOrDelivered
        ? {
            courierName: courier,
            trackingId,
            status: orderStatus === "Delivered" ? "Delivered" : "In Transit",
            expectedDelivery: "05 Aug 2026",
            trackingUrl: `https://${courier.toLowerCase()}.com/track/${trackingId}`,
            lastUpdated: `${dateStr} ${timeStr}`,
          }
        : undefined,
      timeline: [
        { id: `t1-${i}`, title: "Order Placed", status: "Order Placed", date: dateStr, time: timeStr, actor: "Customer (Online)", note: "Order successfully placed via website." },
        { id: `t2-${i}`, title: "Payment Received", status: "Payment Received", date: dateStr, time: timeStr, actor: "Razorpay Gateway", note: `Payment verified via ${paymentMethod}` },
        ...(orderStatus !== "Pending" ? [{ id: `t3-${i}`, title: "Order Confirmed", status: "Confirmed" as OrderStatus, date: dateStr, time: timeStr, actor: "Admin (Warehouse)", note: "Inventory allocated for fulfillment." }] : []),
        ...(isShippedOrDelivered ? [{ id: `t4-${i}`, title: "Order Shipped", status: "Shipped" as OrderStatus, date: dateStr, time: timeStr, actor: courier, note: `Dispatched via ${courier} AWB #${trackingId}` }] : []),
        ...(orderStatus === "Delivered" ? [{ id: `t5-${i}`, title: "Order Delivered", status: "Delivered" as OrderStatus, date: dateStr, time: timeStr, actor: "Courier Delivery Agent", note: "Package delivered to customer." }] : []),
      ],
      notes: [
        { id: `n1-${i}`, author: "System", text: "Verified customer phone number via OTP.", timestamp: timeStr, date: dateStr, isSystem: true }
      ]
    });
  }

  return orders;
}

export const mockOrdersList = generateMockOrders(65);
