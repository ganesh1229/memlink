const prisma = require("../config/prisma");
const UAParser = require("ua-parser-js");
const ApiError=require("../utils/ApiError");

const getLinkByAlias = async (alias) => {
  const link = await prisma.link.findUnique({
    where: {
      alias,
    },
  });

  if (!link) {
    throw new ApiError(404,"Link not found");
  }

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