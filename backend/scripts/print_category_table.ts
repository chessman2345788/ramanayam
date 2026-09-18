import { prisma } from "../src/prisma";

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: {
      products: { _count: "desc" }
    }
  });

  console.log("| # | Category Name | Slug | Total in DB | Launch (~200) | Inactive Remaining | Quota % |");
  console.log("|---|---|---|---|---|---|---|");

  let totalDb = 0;
  let totalLaunch = 0;
  let totalInactive = 0;
  let idx = 1;

  for (const cat of categories) {
    const total = cat._count.products;
    if (total === 0) continue;

    let quota = Math.round((total / 1064) * 200);
    if (quota < 1 && total > 0) quota = 1;
    if (quota > total) quota = total;

    const inactive = total - quota;
    totalDb += total;
    totalLaunch += quota;
    totalInactive += inactive;

    console.log(`| ${idx++} | **${cat.name}** | \`${cat.slug}\` | ${total} | **${quota}** | ${inactive} | ${((quota/total)*100).toFixed(1)}% |`);
  }

  console.log(`| **TOTAL** | **25 Categories** | - | **${totalDb}** | **${totalLaunch}** | **${totalInactive}** | **${((totalLaunch/totalDb)*100).toFixed(1)}%** |`);
}

main().finally(() => prisma.$disconnect());
