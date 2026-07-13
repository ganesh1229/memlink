const asyncHandler = require("../utils/asyncHandler");

const {
  registerUser,loginUser,refreshAccessToken,logoutUser
} = require("../services/auth.service");


const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await registerUser(
      email,
      password
    );

    res.status(201).json({
      success: true,
      data: result,
    });
});

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.status(200).json({
      success: true,
      data: result,
    });
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const data = await refreshAccessToken(refreshToken);

  res.status(200).json({
    success: true,
    data,
  });
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const data = await logoutUser(
    refreshToken,
    req.user.userId
  );

  res.status(200).json({
    success: true,
    data,
  });
});

module.exports = {
  register,
  login,
  refresh,
  logout
};