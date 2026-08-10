import { PrismaClient } from "@prisma/client";
import logger from "../components/logger";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "error" },
      { emit: "event", level: "info" },
      { emit: "event", level: "warn" },
    ],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Log Prisma Events through Winston Logger
// Note: Prisma needs to be generated before these properties are fully typed,
// but since we aren't running Prisma generate just yet, we use type assertion.
(prisma as any).$on("query", (e: any) => {
  logger.debug(`Query: ${e.query} - Params: ${e.params} - Duration: ${e.duration}ms`);
});

(prisma as any).$on("error", (e: any) => {
  logger.error(`Prisma Error: ${e.message}`);
});

(prisma as any).$on("warn", (e: any) => {
  logger.warn(`Prisma Warning: ${e.message}`);
});

(prisma as any).$on("info", (e: any) => {
  logger.info(`Prisma Info: ${e.message}`);
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info("Database connection established successfully.");
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};
