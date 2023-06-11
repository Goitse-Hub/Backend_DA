// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
