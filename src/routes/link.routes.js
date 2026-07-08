const express = require("express");
const { create } = require("../controllers/link.controller");
const optionalAuth = require("../middleware/optionalAuth.middleware");

const router = express.Router();

router.post("/", optionalAuth, create);

module.exports = router;