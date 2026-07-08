const { createLink } = require("../services/link.service");

const create = async (req, res) => {
  try {
    const { originalUrl, alias } = req.body;

    const userId = req.user?.userId || null;

    const link = await createLink(
      originalUrl,
      alias,
      userId
    );

    res.status(201).json({
        success: true,
        data: {
        alias: link.alias,
        originalUrl: link.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${link.alias}`,
        },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
};