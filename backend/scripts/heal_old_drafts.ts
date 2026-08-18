import { prisma } from "../src/prisma";

async function healOldDrafts() {
  console.log("Healing 4 old test draft items created during early manual testing...");

  // 1. 'feb619cf-fd4f-47fc-8969-42217764ad2e' (Brass Diya)
  const p1 = await prisma.product.findUnique({
    where: { id: "feb619cf-fd4f-47fc-8969-42217764ad2e" },
    include: { variants: true, images: true },
  });
  if (p1 && p1.variants.length === 0) {
    await prisma.productVariant.create({
      data: {
        productId: p1.id,
        sku: "RAM-LEGACY-001",
        variantName: "Standard",
        price: 299,
        compareAtPrice: 399,
        isDefault: true,
        isActive: true,
        inventory: { create: { availableStock: 15 } },
      },
    });
  }

  // 2. '6847ffa0-252a-423d-9913-032e896b48a6' (Handcrafted Brass Aarti Lamp)
  const p2 = await prisma.product.findUnique({
    where: { id: "6847ffa0-252a-423d-9913-032e896b48a6" },
    include: { variants: true, images: true },
  });
  if (p2) {
    if (p2.variants.length === 0) {
      await prisma.productVariant.create({
        data: {
          productId: p2.id,
          sku: "RAM-LEGACY-002",
          variantName: "Standard",
          price: 599,
          compareAtPrice: 799,
          isDefault: true,
          isActive: true,
          inventory: { create: { availableStock: 20 } },
        },
      });
    }
    if (p2.images.length === 0) {
      await prisma.productImage.create({
        data: {
          productId: p2.id,
          imageUrl: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
          isPrimary: true,
          sortOrder: 0,
        },
      });
    }
  }

  // 3. '43966037-4b2a-494f-b880-86431f9e8fd0' (Handcrafted Sacred Brass Diya)
  const p3 = await prisma.product.findUnique({
    where: { id: "43966037-4b2a-494f-b880-86431f9e8fd0" },
    include: { variants: true, images: true },
  });
  if (p3) {
    if (p3.variants.length === 0) {
      await prisma.productVariant.create({
        data: {
          productId: p3.id,
          sku: "RAM-LEGACY-003",
          variantName: "Standard",
          price: 349,
          compareAtPrice: 449,
          isDefault: true,
          isActive: true,
          inventory: { create: { availableStock: 25 } },
        },
      });
    }
    if (p3.images.length === 0) {
      await prisma.productImage.create({
        data: {
          productId: p3.id,
          imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
          isPrimary: true,
          sortOrder: 0,
        },
      });
    }
  }

  // 4. 'cb6c07d1-af4b-4a0e-8611-d489f1b5b313' (Golden Temple Panchdhatu Bell)
  const p4 = await prisma.product.findUnique({
    where: { id: "cb6c07d1-af4b-4a0e-8611-d489f1b5b313" },
    include: { variants: true, images: true },
  });
  if (p4) {
    if (p4.variants.length === 0) {
      await prisma.productVariant.create({
        data: {
          productId: p4.id,
          sku: "RAM-LEGACY-004",
          variantName: "Standard",
          price: 799,
          compareAtPrice: 999,
          isDefault: true,
          isActive: true,
          inventory: { create: { availableStock: 18 } },
        },
      });
    }
    if (p4.images.length === 0) {
      await prisma.productImage.create({
        data: {
          productId: p4.id,
          imageUrl: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80",
          isPrimary: true,
          sortOrder: 0,
        },
      });
    }
  }

  console.log("✅ All legacy test products healed with complete variant, inventory, and image records!");
}

healOldDrafts().finally(() => prisma.$disconnect());
