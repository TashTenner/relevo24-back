const express = require('express');
// const createError = require('http-errors');

const router = express.Router();
const User = require('../models/User');
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  const {
    username, name, familyName,
  } = req.body;
  try {
    const user = await User.create({
      username,
      name,
      familyName,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/update', async (req, res, next) => {
  const { userId } = req.params;
  const {
    username, name, familyName,
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { new: true }, {
      username,
      name,
      familyName,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId/delete', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
