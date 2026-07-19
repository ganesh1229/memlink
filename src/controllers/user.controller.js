const asyncHandler = require("../utils/asyncHandler");

const {
  getUserProfile,
} = require("../services/user.service");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await getUserProfile(
    req.user.userId
  );

  res.status(200).json({
    success: true,
    data: profile,
  });
});

module.exports = {
  getProfile
};