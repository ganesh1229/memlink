const asyncHandler = require("../utils/asyncHandler");

const {
  createLink,getUserLinks,getLinkById,updateLink,deleteLink,getLinkAnalytics
} = require("../services/link.service");



const { groupBy } = require("../utils/analytics");

const create = asyncHandler(async (req, res) => {
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
});

const getLinks = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "newest";

    const { links, total } = await getUserLinks(
      req.user.userId,
      page,
      limit,
      search,
      sort
    );

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
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
  data,
});
  });

const getLink = asyncHandler(async (req, res) => {

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
});

const update = asyncHandler(async (req, res) => {

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
});

const remove = asyncHandler(async (req, res) => {
    await deleteLink(
      req.params.id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Link deleted successfully",
    });
});

const analytics = asyncHandler(async (req, res) => {
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
});

module.exports = {
  create,getLinks,getLink,update,remove,analytics
};