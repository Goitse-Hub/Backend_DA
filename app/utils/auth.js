// src/utils/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  generateToken,
  hashPassword,
  comparePasswords,
};
