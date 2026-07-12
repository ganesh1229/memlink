const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { generateUniqueAlias } = require("./alias.service");
const ApiError = require("../utils/ApiError");

const {
  deleteCachedLink,
  cacheUnlockToken,
} = require("./cache.service");

const createLink = async (
  originalUrl,
  customAlias,
  userId = null,
  expiresAt = null,
  password = null
) => {
  const alias = await generateUniqueAlias(customAlias);

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const link = await prisma.link.create({
    data: {
      originalUrl,
      alias,
      userId,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      password: hashedPassword,
    },
  });

  return link;
};

const getUserLinks = async (
  userId,
  page = 1,
  limit = 10,
  search = "",
  sort = "newest"
) => {
  const skip = (page - 1) * limit;

  let orderBy = {
    createdAt: "desc",
  };

  if (sort === "oldest") {
    orderBy = {
      createdAt: "asc",
    };
  }

  if (sort === "clicks") {
    orderBy = {
      clicks: "desc",
    };
  }

  const where = {
    userId,
    OR: [
      {
        alias: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        originalUrl: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  const [links, total] = await prisma.$transaction([
    prisma.link.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),

    prisma.link.count({
      where,
    }),
  ]);

  return {
    links,
    total,
  };
};

const getLinkById = async (linkId, userId) => {
  const link = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId,
    },
  });

  if (!link) {
    throw new ApiError(404,"Link not found");
  }

  return link;
};

const updateLink = async (
  linkId,
  userId,
  originalUrl,
  alias
) => {
  const existingLink = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId,
    },
  });

  if (!existingLink) {
    throw new ApiError(404, "Link not found");
  }

  let updatedAlias = existingLink.alias;

  if (alias && alias !== existingLink.alias) {
    updatedAlias = await generateUniqueAlias(alias);
  }

  const updatedLink = await prisma.link.update({
    where: {
      id: linkId,
    },
    data: {
      originalUrl:
        originalUrl ?? existingLink.originalUrl,
      alias: updatedAlias,
    },
  });

  // Invalidate Redis cache
  await deleteCachedLink(existingLink.alias);

  // If alias changed, remove any stale cache under the new alias as well
  if (updatedAlias !== existingLink.alias) {
    await deleteCachedLink(updatedAlias);
  }

  return updatedLink;
};


const deleteLink = async (linkId, userId) => {
  const link = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId,
    },
  });

  if (!link) {
    throw new ApiError(404,"Link not found");
  }

  // const deleted = await prisma.clickEvent.deleteMany({
  // where: {
  //   linkId,
  // },
  // });

  // console.log("Deleted ClickEvents:", deleted);
  await deleteCachedLink(link.alias);

  await prisma.clickEvent.deleteMany({
    where: {
      linkId,
    },
  });

  await prisma.link.delete({
    where: {
      id: linkId,
    },
  });
};

const getLinkAnalytics = async (linkId, userId) => {
  const link = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId,
    },
    include: {
      clickEvents: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!link) {
    throw new ApiError(404,"Link not found");
  }

  return link;
};



const unlockLink = async (alias, password) => {
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
    throw new ApiError(410, "This link has expired.");
  }

  if (!link.password) {
    throw new ApiError(
      400,
      "This link is not password protected."
    );
  }

  const valid = await bcrypt.compare(
    password,
    link.password
  );

  if (!valid) {
    throw new ApiError(401, "Invalid password");
  }

  const unlockToken = crypto.randomUUID();

  await cacheUnlockToken(
    alias,
    unlockToken
  );

  return unlockToken;
};

const getLinkQRCode = async (linkId, userId) => {
  const link = await prisma.link.findFirst({
    where: {
      id: linkId,
      userId,
    },
  });

  if (!link) {
    throw new ApiError(404, "Link not found");
  }

  return link;
};

module.exports = {
  createLink,getUserLinks,getLinkById,updateLink,deleteLink,getLinkAnalytics,unlockLink,getLinkQRCode
};