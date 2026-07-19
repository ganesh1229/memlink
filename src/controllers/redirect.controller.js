const asyncHandler = require("../utils/asyncHandler");

const {
  getLinkByAlias,
  recordClick,resolveLink
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

const resolve = asyncHandler(async (req, res) => {
  const result = await resolveLink(
    req.params.alias
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = {
  redirect,resolve
};