const express = require('express');
// const createError = require('http-errors');

const router = express.Router();
const User = require('../models/User');
const Shift = require('../models/Shift'); // populate
const WorkingDay = require('../models/WorkingDay');
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', async (req, res, next) => {
  try {
    const employees = await User.find({ role: 'employee' }).populate('shifts').populate('day');
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

router.get('/:employeeId', async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    const employee = await User.findById(employeeId).populate('shifts');
    if (employee) {
      res.json(employee);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

// admin can change: role (to admin eg; if deletion is wanted - via delete better), shifts

router.put('/:employeeId/update', async (req, res, next) => {
  const { employeeId } = req.params;
  const {
    email, username, role, firstName, familyName,
  } = req.body;
  try {
    const employee = await User.findByIdAndUpdate(employeeId, {
      email,
      username,
      role,
      firstName,
      familyName,
    }, { new: true }).populate('shifts');
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// deletes not only "employee", but the user himself

router.delete('/:employeeId/delete', async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    const employee = await User.findByIdAndDelete(employeeId).populate('shifts');
    // delete as well all shifts
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
