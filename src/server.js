require("dotenv").config();

const { connectRedis, redisClient } = require("./config/redis");
const prisma = require("./config/prisma");
const app = require("./app");

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    await connectRedis();

    server = app.listen(PORT, () => {
      // console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = async () => {
  // console.log("\n🛑 Shutting down server...");

  try {
    await prisma.$disconnect();
    // console.log("✅ Prisma disconnected");

    if (redisClient.isOpen) {
      await redisClient.quit();
      // console.log("✅ Redis disconnected");
    }

    server.close(() => {
      // console.log("✅ HTTP server closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();