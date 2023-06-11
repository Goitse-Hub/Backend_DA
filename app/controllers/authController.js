// src/controllers/authController.js
const User = require('../models/User');
const { generateToken, hashPassword, comparePasswords } = require('../utils/auth');

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });

    const token = generateToken(user);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours;
    })
    
    return res.status(200).json({ 
      email: user.email,
      token 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  register,
  login,
};
