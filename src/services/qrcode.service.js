const QRCode = require("qrcode");

const generateQRCode = async (url) => {
  return await QRCode.toDataURL(url);
};

module.exports = {
  generateQRCode,
};