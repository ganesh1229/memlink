const asyncHandler = require("../utils/asyncHandler");

const {
  registerUser,loginUser,
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

module.exports = {
  register,
  login,
};