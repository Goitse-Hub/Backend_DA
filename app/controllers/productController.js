// src/controllers/productController.js
const Product = require('../models/products');
const User = require('../models/User');
const Purchase = require('../models/purchase');

// ... existing code ...

async function createProduct(req, res) {
  try {
    const { title, description, price, image } = req.body;
    const { userId } = req.user; // Assuming userId is obtained from authentication middleware

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create the product
    const product = await Product.create({ title, description, price, image });

    // Create the purchase entry
    await Purchase.create({ userId, productId: product.id });

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

// async function createProduct(req, res) {
//   try {
//     const { title, description, price, image } = req.body;

//     const product = await Product.create({ title, description, price, image });

//     return res.status(201).json(product);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error.' });
//   }
// }

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { title, description, price, image } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.image = image;
    await product.save();

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await product.destroy();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
