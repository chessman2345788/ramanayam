import { PrismaClient } from '@prisma/client';

async function testConnection() {
  console.log('=== PRISMA CONNECTION TEST TO SUPABASE ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);

  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    console.log('✅ Prisma $connect() succeeded.');

    const versionRes: any = await prisma.$queryRawUnsafe('SELECT current_database(), current_schema(), version()');
    console.log('Database:', versionRes[0]?.current_database);
    console.log('Schema:', versionRes[0]?.current_schema);
    console.log('Engine:', versionRes[0]?.version?.split(' on ')[0]);

    const productCount = await prisma.product.count();
    const activeCount = await prisma.product.count({ where: { status: 'ACTIVE' } });
    const draftCount = await prisma.product.count({ where: { status: 'DRAFT' } });
    const categoryCount = await prisma.category.count();
    const userCount = await prisma.user.count();

    console.log('\n--- Supabase Data Counts ---');
    console.log('Products:', productCount, '(Expected: 1064)');
    console.log('ACTIVE:', activeCount, '(Expected: 199)');
    console.log('DRAFT:', draftCount, '(Expected: 865)');
    console.log('Categories:', categoryCount, '(Expected: 25)');
    console.log('Users:', userCount, '(Expected: 3)');

    if (productCount === 1064 && activeCount === 199 && draftCount === 865) {
      console.log('\n✅ PRISMA CONNECTION TO SUPABASE VERIFIED');
    } else {
      console.log('\n❌ DATA MISMATCH');
    }
  } catch (err: any) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
