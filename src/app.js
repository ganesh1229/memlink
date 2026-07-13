const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const linkRoutes = require("./routes/link.routes");
const redirectRoutes = require("./routes/redirect.routes");
const healthRoutes = require("./routes/health.routes");

const apiLimiter = require("./middleware/rateLimit.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

/**
 * Trust reverse proxy (Render, Railway, Nginx, AWS, etc.)
 */
app.set("trust proxy", 1);

/**
 * Core Middleware
 */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());

if (process.env.NODE_ENV !== "test") {
  app.use(
    morgan(":method :url :status :response-time ms")
  );
}

app.use(apiLimiter);

/**
 * Root Route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MemLink API Running 🚀",
  });
});

/**
 * API Routes
 */
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/links", linkRoutes);
app.use("/health", healthRoutes);

/**
 * Redirect Routes
 * Keep this near the end because it catches "/:alias"
 */
app.use("/", redirectRoutes);

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global Error Handler
 */
app.use(errorHandler);

module.exports = app;