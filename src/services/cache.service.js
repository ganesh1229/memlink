const { redisClient } = require("../config/redis");

const getCachedLink = async (alias) => {
  const data = await redisClient.get(`link:${alias}`);

  if (!data) return null;

  return JSON.parse(data);
};

const cacheLink = async (alias, link) => {
  await redisClient.set(
    `link:${alias}`,
    JSON.stringify(link),
    {
      EX: 60 * 60, // 1 hour
    }
  );
};

const deleteCachedLink = async (alias) => {
  await redisClient.del(`link:${alias}`);
};

module.exports = {
  getCachedLink,
  cacheLink,
  deleteCachedLink,
};