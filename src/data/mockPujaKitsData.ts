import { PujaKitCombo } from "@/types/pujaKits";

export const mockPujaKitsList: PujaKitCombo[] = [
  {
    id: "kit_1",
    name: "Complete Diwali Laxmi Pujan Maha Kit",
    sanskritName: "लक्ष्मी पूजन महाकिट",
    sku: "KIT-LAXMI-01",
    category: "Diwali Special",
    description: "All-in-one sacred combo containing handcrafted solid brass diya, pure Kapoor, Kesar Chandan paste, and brass Puja Thali.",
    items: [
      { id: "item_1", name: "Handmade Pure Brass Oil Diya (Medium)", unitPrice: 499, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=100&auto=format&fit=crop&q=80" },
      { id: "item_2", name: "Organic Bhimseni Camphor (100g)", unitPrice: 250, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=100&auto=format&fit=crop&q=80" },
      { id: "item_3", name: "Pure Sandalwood Chandan Paste (50g)", unitPrice: 199, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=100&auto=format&fit=crop&q=80" },
      { id: "item_4", name: "Handcrafted Etched Brass Puja Thali (10 inch)", unitPrice: 1200, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=100&auto=format&fit=crop&q=80" },
    ],
    originalPrice: 2647,
    bundlePrice: 1999,
    savingsPercentage: 24,
    stockCount: 85,
    status: "ACTIVE",
    imageUrl: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "kit_2",
    name: "Daily Home Mandir Aarti Essentials Kit",
    sanskritName: "नित्य आरती पूजन किट",
    sku: "KIT-AARTI-02",
    category: "Daily Puja",
    description: "Daily worship kit with organic Ghee wicks, Agarbatti, Dhoop cones, and Bell.",
    items: [
      { id: "item_5", name: "Handcrafted Brass Hand Bell (Ghanti)", unitPrice: 350, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=100&auto=format&fit=crop&q=80" },
      { id: "item_6", name: "Pre-soaked Ghee Cotton Wicks (100 pcs)", unitPrice: 299, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=100&auto=format&fit=crop&q=80" },
    ],
    originalPrice: 948,
    bundlePrice: 749,
    savingsPercentage: 21,
    stockCount: 140,
    status: "ACTIVE",
    imageUrl: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&auto=format&fit=crop&q=80",
  },
];
