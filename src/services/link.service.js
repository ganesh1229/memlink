const prisma = require("../config/prisma");
const { generateUniqueAlias } = require("./alias.service");

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

module.exports = {
  createLink,
};