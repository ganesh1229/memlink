const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/hash");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

const REFRESH_TOKEN_DAYS = 7;

const registerUser = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const accessToken = generateAccessToken(user.id);

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
  };
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id);

  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() +
          REFRESH_TOKEN_DAYS *
            24 *
            60 *
            60 *
            1000
      ),
    },
  });

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken) => {
  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!storedToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: {
        id: storedToken.id,
      },
    });

    throw new ApiError(401, "Refresh token expired");
  }

  const accessToken = generateAccessToken(
    decoded.userId
  );

  return {
    accessToken,
  };
};

const logoutUser = async (
  refreshToken,
  userId
) => {
  const deleted = await prisma.refreshToken.deleteMany({
    where: {
      token: refreshToken,
      userId,
    },
  });

  if (deleted.count === 0) {
    throw new ApiError(
      404,
      "Refresh token not found"
    );
  }

  return {
    message: "Logged out successfully",
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};