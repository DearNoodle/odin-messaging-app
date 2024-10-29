const jwt = require('jsonwebtoken');
const query = require('../models/query');
const { validationResult } = require('express-validator');

const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

async function registerUser(req, res) {
  const validateErr = validationResult(req);
  if (!validateErr.isEmpty()) {
    return res.status(400).send({
      errors: validateErr.array(),
    });
  }
  try {
    await query.createUser(req);
    res.status(201).send('Register Success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to Register User');
  }
}

async function loginUser(req, res) {
  const token = jwt.sign({ userId: req.user.id }, jwtSecret, { expiresIn: '60m' });
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000,
    // sameSite: 'none',
  });
  res.status(200).send('Login successful');
}

async function logoutUser(req, res) {
  res.cookie('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    // sameSite: 'none',
  });
  res.status(200).send('Logout successful');
}

async function getUserId(req, res) {
  res.status(200).send({ userId: req.user.id });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserId,
};
