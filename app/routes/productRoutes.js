// src/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware.');

const router = express.Router();

// router.get('/', productController.getProducts);
// router.get('/:id', productController.getProductById);
// router.post('/', productController.createProduct);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);

router.get('/', productController.getProducts);
router.get('/:id', authMiddleware.authenticate, productController.getProductById);
router.post('/', authMiddleware.authenticate, productController.createProduct);
router.put('/:id', authMiddleware.authenticate, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticate, productController.deleteProduct);

module.exports = router;
