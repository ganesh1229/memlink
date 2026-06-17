const express = require("express");

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

module.exports = router;