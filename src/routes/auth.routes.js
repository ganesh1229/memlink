const express = require("express");

const {
  register,
  login,
} = require("../controllers/auth.controller");

const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");
const authLimiter = require(
  "../middleware/authRateLimit.middleware"
);



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

module.exports = router;