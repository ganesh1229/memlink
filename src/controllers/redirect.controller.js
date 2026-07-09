const {
  getLinkByAlias,
  recordClick,
} = require("../services/redirect.service");

const redirect = async (req, res) => {
  try {
    const alias = req.params.alias;

    const link = await getLinkByAlias(alias);

    await recordClick(
    link.id,
    req.get("User-Agent"),
    req.get("Referer") || null,
    req.ip
    );

    return res.redirect(link.originalUrl);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  redirect,
};