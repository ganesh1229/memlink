const express = require("express");

const {
  redirect,
  resolve,
} = require("../controllers/redirect.controller");

const router = express.Router();

router.get(
  "/resolve/:alias",
  resolve
);

router.get(
  "/:alias",
  redirect
);

module.exports = router;