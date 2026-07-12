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

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const data = await logoutUser(
      refreshToken,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const data = await logoutUser(refreshToken);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};