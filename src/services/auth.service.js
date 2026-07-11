const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");
const ApiError=require("../utils/ApiError");

const registerUser = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(401,"User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken({
    userId: user.id,
  });

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(404,"Invalid credentials");
  }

  const isMatch = await comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(404,"Invalid credentials");
  }

  const token = generateToken({
    userId: user.id,
  });

  const { password: _, ...safeUser } = user;

return {
  user: safeUser,
  token,
};
};

module.exports = {
  registerUser,
  loginUser,
};