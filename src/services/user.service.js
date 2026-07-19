const prisma = require("../config/prisma");

const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      createdAt: true,
    },
  });

  return user;
};

module.exports = {
  getUserProfile,
};