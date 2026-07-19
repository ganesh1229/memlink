require("dotenv").config();

const { connectRedis, redisClient } = require("./config/redis");
const prisma = require("./config/prisma");
const app = require("./app");

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    await connectRedis();

    server = app.listen(PORT);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = async () => {

  try {
    await prisma.$disconnect();

    if (redisClient.isOpen) {
      await redisClient.quit();
    }

    server.close(() => {
      process.exit(0);
    });
  } catch (error) {
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();