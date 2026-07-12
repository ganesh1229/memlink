const { redisClient } = require("../config/redis");
const CACHE_TTL = require("../constants/cache");

const getCachedLink = async (alias) => {
  const data = await redisClient.get(`link:${alias}`);

  if (!data) return null;

  return JSON.parse(data);
};

const cacheLink = async (alias, link) => {
  const cacheData = {
    id: link.id,
    alias: link.alias,
    originalUrl: link.originalUrl,
    expiresAt: link.expiresAt,
    hasPassword: !!link.password,
  };

  await redisClient.set(
    `link:${alias}`,
    JSON.stringify(cacheData),
    {
      EX: CACHE_TTL.LINK,
    }
  );
};

const deleteCachedLink = async (alias) => {
  await redisClient.del(`link:${alias}`);
};

const cacheUnlockToken = async (alias, token) => {
  await redisClient.set(
    `unlock:${alias}:${token}`,
    "true",
    {
      EX: CACHE_TTL.UNLOCK_TOKEN,
    }
  );
};

const isUnlocked = async (alias, token) => {
  if (!token) return false;

  const value = await redisClient.get(
    `unlock:${alias}:${token}`
  );

  return value === "true";
};

module.exports = {
  getCachedLink,
  cacheLink,
  deleteCachedLink,
  cacheUnlockToken,
  isUnlocked
};