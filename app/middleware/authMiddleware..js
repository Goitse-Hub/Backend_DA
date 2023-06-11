// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = {
  authenticate,
};
