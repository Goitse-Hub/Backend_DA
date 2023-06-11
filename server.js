// server.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./app/routes/userRoutes');
const authRoutes = require('./app/routes/authRoutes');
const sequelize = require('./app/utils/database');
const productRoutes = require('./app/routes/productRoutes');
const purchaseRoutes = require('./app/routes/purchaseRoutes');
dotenv.config();

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
});

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/purchases', purchaseRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
