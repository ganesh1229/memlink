require("dotenv").config();
const { connectRedis } = require("./config/redis");

const app = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();