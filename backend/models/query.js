const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createUser(req) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashedPassword,
      profile: {
        create: {
          imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
          bio: "This Person hasn't written no Bio yet",
        },
      },
    },
  });
}

async function getUserProfile(req) {
  return await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      username: true,
      profile: {
        select: {
          imageUrl: true,
          bio: true,
        },
      },
    },
  });
}

async function updateProfileImage(req) {
  return await prisma.profile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      imageUrl: req.file.path,
    },
  });
}

async function updateProfileBio(req) {
  return await prisma.profile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      bio: req.body.bio,
    },
  });
}

async function getSearch(req) {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: req.query.searchKeyword,
      },
    },
  });
}

async function getUsername(req) {
  return await prisma.user.findUnique({
    where: { id: req.params.id },
    select: {
      username: true,
    },
  });
}

async function getChatMessages(req) {
  return await prisma.message.findMany({
    where: {
      OR: [
        {
          fromUserId: req.user.id,
          toUserId: req.query.chatterId,
        },
        {
          fromUserId: req.query.chatterId,
          toUserId: req.user.id,
        },
      ],
    },
    select: {
      fromUserId: true,
      content: true,
      fromUser: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function createMessage(req) {
  await prisma.message.create({
    data: {
      fromUserId: req.user.id,
      toUserId: req.body.chatterId,
      content: req.body.message,
    },
  });
}

async function getRecentMessagedUsers(req) {
  const userId = req.user.id;

  const recentUsers = await prisma.$queryRaw`
    SELECT * FROM (
      SELECT "toUserId" as userId FROM messages WHERE "fromUserId" = ${userId}
      UNION
      SELECT "fromUserId" as userId FROM messages WHERE "toUserId" = ${userId}
    ) AS recent_user_ids
    JOIN users u ON u.id = recent_user_ids.userId;
  `;

  return recentUsers;
}

module.exports = {
  createUser,
  getUserProfile,
  updateProfileImage,
  updateProfileBio,
  getSearch,
  getUsername,
  getChatMessages,
  createMessage,
  getRecentMessagedUsers,
};
