const express = require("express");

const {
  register,
  login,
  refresh,
  logout
} = require("../controllers/auth.controller");

const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");
const authLimiter = require(
  "../middleware/authRateLimit.middleware"
);
const authMiddleware = require("../middleware/auth.middleware");



const router = express.Router();



router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);

router.post(
  "/refresh",
  refresh
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

module.exports = router;