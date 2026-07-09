const prisma = require("../config/prisma");

const getLinkByAlias = async (alias) => {
  const link = await prisma.link.findUnique({
    where: {
      alias,
    },
  });

  if (!link) {
    throw new Error("Link not found");
  }

  return link;
};

const recordClick = async (linkId, userAgent, referrer) => {
  await prisma.link.update({
    where: {
      id: linkId,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  await prisma.clickEvent.create({
    data: {
      linkId,
      userAgent,
      referrer,
    },
  });
};

module.exports = {
  getLinkByAlias,
  recordClick,
};