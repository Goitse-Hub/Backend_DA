// src/controllers/userController.js
const User = require('../models/User');

async function getUsers(req, res) {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.email = email;
    await user.save();

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.destroy();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
