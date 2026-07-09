const {
  createLink,
  getUserLinks,
  getLinkById,
  updateLink,
  deleteLink,
  getLinkAnalytics
} = require("../services/link.service");

const { groupBy } = require("../utils/analytics");

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

const analytics = async (req, res) => {
  try {
    const link = await getLinkAnalytics(
      req.params.id,
      req.user.userId
    );

    const browserStats = groupBy(
    link.clickEvents,
    "browser"
    );

    const osStats = groupBy(
    link.clickEvents,
    "os"
    );

    const deviceStats = groupBy(
      link.clickEvents,
      "device"
    );

    link.clickEvents.forEach((click) => {
      browserStats[click.browser] =
        (browserStats[click.browser] || 0) + 1;

      osStats[click.os] =
        (osStats[click.os] || 0) + 1;

      deviceStats[click.device] =
        (deviceStats[click.device] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        link: {
          id: link.id,
          alias: link.alias,
          originalUrl: link.originalUrl,
          shortUrl: `${process.env.BASE_URL}/${link.alias}`,
        },

        totalClicks: link.clicks,

        browserStats,

        osStats,

        deviceStats,

        recentClicks: link.clickEvents.slice(0, 10),
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,getLinks,getLink,update,remove,analytics
};