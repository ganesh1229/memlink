const prisma = require("../config/prisma");
const UAParser = require("ua-parser-js");
const ApiError=require("../utils/ApiError");

const {
  getCachedLink,
  cacheLink,
} = require("./cache.service");

const getLinkByAlias = async (alias) => {
  let link = await getCachedLink(alias);

  if (link) {
    console.log("✅ Cache HIT");
    return link;
  }

  console.log("❌ Cache MISS");

  link = await prisma.link.findUnique({
    where: {
      alias,
    },
  });

  if (!link) {
    throw new ApiError(404, "Link not found");
  }

  await cacheLink(alias, link);

  return link;
};

const recordClick = async (
  linkId,
  userAgent,
  referrer,
  ipAddress
) => {
  const parser = new UAParser(userAgent);

  const browser =
    parser.getBrowser().name || "Unknown";

  const os =
    parser.getOS().name || "Unknown";

  const device =
    parser.getDevice().type || "Desktop";

  await prisma.$transaction([
    prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    }),

    prisma.clickEvent.create({
      data: {
        linkId,
        ipAddress,
        userAgent,
        browser,
        os,
        device,
        referrer,
      },
    }),
  ]);
};

module.exports = {
  getLinkByAlias,
  recordClick,
};