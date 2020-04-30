/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
// const createError = require('http-errors');

const {
  checkIfLoggedIn,
  /* checkIfAdmin, */
} = require('../middlewares/index');

const router = express.Router();
const User = require('../models/User');
const Shift = require('../models/Shift'); // populate
const WorkingDay = require('../models/WorkingDay'); // populate
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', checkIfLoggedIn, async (req, res, next) => {
  try {
    const employees = await User.find({ role: 'employee' }).populate('shifts');
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

router.get('/:employeeId', checkIfLoggedIn, async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    const employee = await User.findById(employeeId).populate({
      path: 'shifts',
      populate: { path: 'day' },
    });
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

router.put('/:employeeId/update-role', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.employeeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { employeeId } = req.params;
    const { role } = req.body;
    const employee = await User.findByIdAndUpdate(employeeId, { role }, { new: true });
    /* populate('shifts') */
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.put('/:employeeId/update', checkIfLoggedIn, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.employeeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { employeeId } = req.params;
    const {
      username, firstName, familyName, shifts,
    } = req.body;
    const employee = await User.findByIdAndUpdate(employeeId, {
      username,
      firstName,
      familyName,
      shifts,
    }, { new: true }); /* populate('shifts') */
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// deletes not only "employee", but the user himself

router.delete('/:employeeId/delete', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.employeeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { employeeId } = req.params;
    const employee = await User.findByIdAndDelete(employeeId).populate('shifts');
    await Shift.findByIdAndUpdate(employee.shift._id, { $pull: { employee: employee._id } });
    await WorkingDay.findByIdAndUpdate(employee.workingDay._id,
      {
        $pull: { employeesTeam: employee._id },
      });
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
