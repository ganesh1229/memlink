const prisma = require("../config/prisma");
const { generateShortCode } = require("../utils/shortCodeGenerator");
const RESERVED_ALIASES = require("../constants/reservedAliases");

const generateUniqueAlias = async (customAlias = null) => {
  if (customAlias) {
    customAlias = customAlias.trim().toLowerCase();

    if (RESERVED_ALIASES.includes(customAlias)) {
      throw new Error("This alias is reserved.");
    }

    const existing = await prisma.link.findUnique({
      where: {
        alias: customAlias,
      },
    });

    if (existing) {
      throw new Error("Alias already exists.");
    }

    return customAlias;
  }

  let alias;

  do {
    alias = generateShortCode();
  } while (
    await prisma.link.findUnique({
      where: {
        alias,
      },
    })
  );

  return alias;
};

module.exports = {
  generateUniqueAlias,
};