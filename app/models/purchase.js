// src/models/Purchase.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');
const Product = require('./products');

const Purchase = sequelize.define('purchase', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

Purchase.belongsTo(User);
Purchase.belongsTo(Product);

module.exports = Purchase;
