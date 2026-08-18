import { prisma } from "../src/prisma";

async function findOldIncomplete() {
  const pNoVar = await prisma.product.findMany({
    where: { variants: { none: {} } },
    select: { id: true, name: true, slug: true, createdAt: true },
  });
  console.log("Incomplete old test products without variants:", pNoVar);

  const pNoImg = await prisma.product.findMany({
    where: { images: { none: {} } },
    select: { id: true, name: true, slug: true, createdAt: true },
  });
  console.log("Incomplete old test products without images:", pNoImg);
}

findOldIncomplete().finally(() => prisma.$disconnect());
