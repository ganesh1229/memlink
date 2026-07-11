const prisma = require("../config/prisma");
const { generateUniqueAlias } = require("./alias.service");
const ApiError=require("../utils/ApiError");
const {
  deleteCachedLink,
} = require("./cache.service");

const createLink = async (originalUrl, customAlias, userId = null) => {
  const alias = await generateUniqueAlias(customAlias);

  const link = await prisma.link.create({
    data: {
      originalUrl,
      alias,
      userId,
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

module.exports = {
  createLink,getUserLinks,getLinkById,updateLink,deleteLink,getLinkAnalytics
};