const crypto = require("crypto");

const generateShortCode = (length = 7) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let shortCode = "";

  while (shortCode.length < length) {
    const randomByte = crypto.randomBytes(1)[0];
    shortCode += characters[randomByte % characters.length];
  }

  return shortCode;
};

module.exports = {
  generateShortCode,
};