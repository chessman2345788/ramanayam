import app from "./app";
import { connectDatabase, prisma } from "./prisma";
import logger from "./components/logger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Establish database connection
  await connectDatabase();

  const server = app.listen(PORT, () => {
    logger.info(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Graceful shutdown handler
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);

    server.close(async () => {
      logger.info("HTTP server closed.");
      try {
        await prisma.$disconnect();
        logger.info("Database connection closed.");
        process.exit(0);
      } catch (err) {
        logger.error("Error during database disconnection:", err);
        process.exit(1);
      }
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception! Process is exiting...", error);
  process.exit(1);
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection! Process is exiting...", reason);
  process.exit(1);
});

startServer();
