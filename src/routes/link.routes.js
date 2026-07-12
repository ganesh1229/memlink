const express = require("express");

const {
  create,
  getLinks,
  getLink,
  update,
  remove,
  analytics,
  unlock,
  qrCode
} = require("../controllers/link.controller");

const authMiddleware = require("../middleware/auth.middleware");
const optionalAuth = require("../middleware/optionalAuth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createLinkSchema,
  updateLinkSchema,
} = require("../validators/link.validator");

const router = express.Router();



router.post(
  "/",
  optionalAuth,
  validate(createLinkSchema),
  create
);

router.get(
  "/",
  authMiddleware,
  getLinks
);

router.post(
  "/:alias/unlock",
  unlock
);

router.get(
  "/:id/qrcode",
  authMiddleware,
  qrCode
);

router.get(
  "/:id",
  authMiddleware,
  getLink
);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateLinkSchema),
  update
);

router.delete(
  "/:id",
  authMiddleware,
  remove
);


router.get(
  "/:id/analytics",
  authMiddleware,
  analytics
);


module.exports = router;