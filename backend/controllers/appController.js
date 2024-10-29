const query = require('../models/query');

async function getUserProfile(req, res) {
  const profile = await query.getUserProfile(req);
  res.send(profile);
}

async function updateProfileImage(req, res) {
  await query.updateProfileImage(req);
  res.send();
}
async function updateProfileBio(req, res) {
  await query.updateProfileBio(req);
  res.send();
}

async function getSearch(req, res) {
  const search = await query.getSearch(req);
  res.send(search);
}

async function getUsername(req, res) {
  const username = await query.getUsername(req);
  res.send(username);
}

async function getChatMessages(req, res) {
  const messages = await query.getChatMessages(req);
  res.send(messages);
}
async function createMessage(req, res) {
  await query.createMessage(req);
  res.send();
}
async function getRecentMessagedUsers(req, res) {
  const recentMsgUsers = await query.getRecentMessagedUsers(req);
  res.send(recentMsgUsers);
}

module.exports = {
  getUserProfile,
  updateProfileImage,
  updateProfileBio,
  getSearch,
  getUsername,
  getChatMessages,
  createMessage,
  getRecentMessagedUsers,
};
