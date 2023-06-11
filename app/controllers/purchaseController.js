// src/controllers/purchaseController.js
const Purchase = require('../models/purchase');
const Product = require('../models/products');
const User = require('../models/User');
const token = require('../middleware/authMiddleware.')
async function createPurchase(req, res) {
  try {
    const { productId } = req.body;
    const { userId } = req.user; // Assuming userId is obtained from authentication middleware

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Create the purchase entry
    const purchase = await Purchase.create({ userId, productId });

    return res.status(201).json({ purchase, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  createPurchase,
};
