const asyncHandler = require("../utils/asyncHandler");

const {
  getLinkByAlias,
  recordClick,
} = require("../services/redirect.service");

const redirect = asyncHandler(async (req, res) => {
  const link = await getLinkByAlias(
    req.params.alias,
    req.cookies.unlockToken
  );

  await recordClick(
    link.id,
    req.get("User-Agent"),
    req.get("Referer") || null,
    req.ip
  );

  return res.redirect(link.originalUrl);
});

module.exports = {
  redirect,
};