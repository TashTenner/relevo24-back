const express = require('express');
const mongoose = require('mongoose');
// const createError = require('http-errors');

const {
  checkIfLoggedIn,
  checkIfAdmin,
} = require('../middlewares');

const router = express.Router();
const User = require('../models/User');
// eslint-disable-next-line no-unused-vars
const Shift = require('../models/Shift'); // populate
// eslint-disable-next-line no-unused-vars
const WorkingDay = require('../models/WorkingDay'); // populate
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', checkIfLoggedIn, async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', checkIfLoggedIn, async (req, res, next) => {
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

// only to be used to add some dummy users

// router.post('/add', async (req, res, next) => {
//   const {
//     username,
//   } = req.body;
//   try {
//     const user = await User.create({
//       username,
//     });
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// admin has access to all registered users and can change only their role (and by that add shifts)
// OR maybe only change the role
// the user himself can only change his: username, firstName, familyName
// this user after his role was changed, shows up in "employees"

router.put('/:userId/update-role', checkIfAdmin, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).populate('shifts');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId/update', checkIfLoggedIn, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { userId } = req.params;
    const {
      username, firstName, familyName,
    } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      username, firstName, familyName,
    }, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId/delete', checkIfAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
