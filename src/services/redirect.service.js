const prisma = require("../config/prisma");
const UAParser = require("ua-parser-js");
const ApiError=require("../utils/ApiError");

const {
  getCachedLink,
  cacheLink,
  isUnlocked,
} = require("./cache.service");

const getLinkByAlias = async (alias,unlockToken) => {
  let link = await getCachedLink(alias);

  

  if (link) {
  } else {

    link = await prisma.link.findUnique({
      where: {
        alias,
      },
    });

    if (!link) {
      throw new ApiError(404, "Link not found");
    }

    await cacheLink(alias, link);
  }

  if (
    link.expiresAt &&
    new Date() > new Date(link.expiresAt)
  ){
    throw new ApiError(410, "This link has expired.");
  }

  const hasPassword =
  link.hasPassword ?? !!link.password;

  console.log("Alias:", alias);
  console.log("Cookie unlockToken:", unlockToken);
  console.log("Has Password:", hasPassword);

if (hasPassword) {
  
  const unlocked = await isUnlocked(
    alias,
    unlockToken
  );
  console.log("Unlocked:", unlocked);
  if (!unlocked) {
    throw new ApiError(
      401,
      "Password required"
    );
  }
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

const resolveLink = async (alias) => {
  const link = await prisma.link.findUnique({
    where: {
      alias,
    },
  });

  if (!link) {
    throw new ApiError(404, "Link not found");
  }

  if (
    link.expiresAt &&
    new Date() > new Date(link.expiresAt)
  ) {
    return {
      expired: true,
    };
  }

  return {
    expired: false,
    passwordProtected: !!link.password,
    originalUrl: link.originalUrl,
  };
};

module.exports = {
  getLinkByAlias,
  recordClick,resolveLink
};