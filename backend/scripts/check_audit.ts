import { prisma } from "../src/prisma";

async function main() {
  const totalProducts = await prisma.product.count();
  const totalVariants = await prisma.productVariant.count();
  const totalInventory = await prisma.inventory.count();
  const totalImages = await prisma.productImage.count();

  const productsWithoutVariants = await prisma.product.count({ where: { variants: { none: {} } } });
  const variantsWithoutInventory = await prisma.productVariant.count({ where: { inventory: null } });
  const productsWithoutImages = await prisma.product.count({ where: { images: { none: {} } } });
  const productsWithoutPrimaryImage = await prisma.product.count({ where: { images: { none: { isPrimary: true } } } });

  console.log({
    totalProducts,
    totalVariants,
    totalInventory,
    totalImages,
    productsWithoutVariants,
    variantsWithoutInventory,
    productsWithoutImages,
    productsWithoutPrimaryImage,
  });
}

main().finally(() => prisma.$disconnect());
