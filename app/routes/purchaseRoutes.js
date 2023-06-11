// src/routes/purchaseRoutes.js
const express = require('express');
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middleware/authMiddleware.');

const router = express.Router();

router.post('/', authMiddleware.authenticate, purchaseController.createPurchase);

module.exports = router;
