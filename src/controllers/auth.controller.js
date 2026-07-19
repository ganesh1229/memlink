const asyncHandler = require("../utils/asyncHandler");

const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../services/auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await registerUser(email, password);

  res
    .cookie(
      "refreshToken",
      result.refreshToken,
      cookieOptions
    )
    .status(201)
    .json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res
    .cookie(
      "refreshToken",
      result.refreshToken,
      cookieOptions
    )
    .status(200)
    .json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const data = await refreshAccessToken(
    refreshToken
  );

  res.status(200).json({
    success: true,
    data,
  });
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const data = await logoutUser(refreshToken);
  
  res
    .clearCookie(
      "refreshToken",
      cookieOptions
    )
    .status(200)
    .json({
      success: true,
      data,
    });
});

module.exports = {
  register,
  login,
  refresh,
  logout,
};