const express = require("express");

const { create } = require("../controllers/link.controller");
const optionalAuth = require("../middleware/optionalAuth.middleware");
const validate = require("../middleware/validate.middleware");
const { createLinkSchema } = require("../validators/link.validator");

const router = express.Router();

router.post(
  "/",
  optionalAuth,
  validate(createLinkSchema),
  create
);

module.exports = router;