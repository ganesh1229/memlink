const {
  createLink,
  getUserLinks,
  getLinkById,
  updateLink,
  deleteLink
} = require("../services/link.service");

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

const getLinks = async (req, res) => {
  try {
    const links = await getUserLinks(req.user.userId);

    const data = links.map((link) => ({
      id: link.id,
      alias: link.alias,
      originalUrl: link.originalUrl,
      clicks: link.clicks,
      shortUrl: `${process.env.BASE_URL}/${link.alias}`,
      createdAt: link.createdAt,
    }));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLink = async (req, res) => {
  try {
    const link = await getLinkById(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: {
        id: link.id,
        alias: link.alias,
        originalUrl: link.originalUrl,
        clicks: link.clicks,
        shortUrl: `${process.env.BASE_URL}/${link.alias}`,
        createdAt: link.createdAt,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { originalUrl, alias } = req.body;

    const link = await updateLink(
      req.params.id,
      req.user.userId,
      originalUrl,
      alias
    );

    res.status(200).json({
      success: true,
      data: {
        id: link.id,
        alias: link.alias,
        originalUrl: link.originalUrl,
        clicks: link.clicks,
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

const remove = async (req, res) => {
  try {
    await deleteLink(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,getLinks,getLink,update,remove
};