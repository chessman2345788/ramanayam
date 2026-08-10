import { PrismaClient, UserRole,AccountStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Ramanayam database seeding...");

  const adminPassword = "Admin@Ramanayam2026";
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  console.log("✅ Password hashed successfully.");
  
  await prisma.user.upsert({
  where: {
    email: "admin@ramayanam.in",
    
  },

  update: {},

  create: {
    firstName: "Super",
    lastName:"Admin",
    email: "admin@ramayanam.in",
    passwordHash: hashedPassword,
    role: UserRole.ADMIN,
    accountStatus: AccountStatus.ACTIVE,
    emailVerified:true,
    phoneVerified:true,
  },
});

console.log("✅ Admin user created.");
} 
main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
  
