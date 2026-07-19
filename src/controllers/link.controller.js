const asyncHandler = require("../utils/asyncHandler");

const {
  createLink,getUserLinks,getLinkById,updateLink,deleteLink,getLinkAnalytics,
  unlockLink,getLinkQRCode,getDashboardStats,getAnalyticsService
} = require("../services/link.service");

const { generateQRCode } = require("../services/qrcode.service");

const { groupBy } = require("../utils/analytics");

const create = asyncHandler(async (req, res) => {
  let {
    originalUrl,
    alias,
    expiresAt,
    password,
  } = req.body;

  const userId = req.user?.userId || null;

  // Guests can only create basic short links
  if (!userId) {
    alias = undefined;
    password = undefined;
    expiresAt = undefined;
  }

  const link = await createLink(
    originalUrl,
    alias,
    userId,
    expiresAt,
    password
  );

  const shortUrl = `${process.env.CLIENT_URL}/${link.alias}`;

  const qrCode = await generateQRCode(shortUrl);

  res.status(201).json({
    success: true,
    data: {
      id: link.id,
      alias: link.alias,
      originalUrl: link.originalUrl,
      shortUrl,
      qrCode,
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
      shortUrl: `${process.env.CLIENT_URL}/${link.alias}`,
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
        shortUrl: `${process.env.CLIENT_URL}/${link.alias}`,
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
        shortUrl: `${process.env.CLIENT_URL}/${link.alias}`,
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
          shortUrl: `${process.env.CLIENT_URL}/${link.alias}`,
        },

        totalClicks: link.clicks,

        browserStats,

        osStats,

        deviceStats,

        recentClicks: link.clickEvents.slice(0, 10),
      },
    });
});

const unlock = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const unlockToken = await unlockLink(
    req.params.alias,
    password
  );

  res.cookie("unlockToken", unlockToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path:"/",
    maxAge: 5 * 60 * 1000,
  });

  res.status(200).json({
  success: true,
  unlockToken,
});
});

const qrCode = asyncHandler(async (req, res) => {
  const link = await getLinkQRCode(
    req.params.id,
    req.user.userId
  );

  const qr = await generateQRCode(
    `${process.env.CLIENT_URL}/${link.alias}`
  );

  res.status(200).json({
    success: true,
    data: {
      shortUrl: `${process.env.CLIENT_URL}/${link.alias}`,
      qrCode: qr,
    },
  });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats(
    req.user.userId
  );

  res.status(200).json({
    success: true,
    data: stats,
  });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await getAnalyticsService(
    req.user.userId
  );

  res.status(200).json({
    success: true,
    data: analytics,
  });
});

module.exports = {
  create,getLinks,getLink,update,remove,analytics,unlock,qrCode,getStats,getAnalytics
};