/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
// const createError = require('http-errors');

const router = express.Router();
const User = require('../models/User'); // populate
const Shift = require('../models/Shift');
const WorkingDay = require('../models/WorkingDay'); // populate
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', async (req, res, next) => {
  try {
    const shifts = await Shift.find().populate('day').populate('employee').populate('employeesTeam');
    res.json(shifts);
  } catch (error) {
    next(error);
  }
});

router.get('/:shiftId', async (req, res, next) => {
  const { shiftId } = req.params;
  try {
    const shift = await Shift.findById(shiftId).populate('day').populate('employee');
    if (shift) {
      res.json(shift);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const {
      timeStart, timeEnd, userId, workingDayId,
    } = req.body;
    const shift = await Shift.create({
      timeStart,
      timeEnd,
      employee: userId,
      day: workingDayId,
    });
    await User.findByIdAndUpdate(userId, { $push: { shifts: shift._id } }, { new: true }).populate('shifts');
    await WorkingDay.findByIdAndUpdate(workingDayId, { $push: { shifts: shift._id } }, { new: true }).populate('shifts');
    await WorkingDay.findByIdAndUpdate(workingDayId, { $push: { employeesTeam: shift.employee._id } }, { new: true }).populate('employeesTeam');
    res.json(shift);
  } catch (error) {
    next(error);
  }
});

// router.post('/tasks', async (req, res, next) => {
//   try {
//     const {
//       title, description, projectID
//     } = req.body;
//     const task = await Task.create({
//       title, description, project: projectID,
//     });
//     await Project.findByIdAndUpdate(projectID, { $push: { tasks: task._id } }, { new: true }).populate('tasks');
//     res.json(task);
//   } catch (error) {
//     next(error);
//   }
// });

router.put('/:shiftId/update', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.shiftId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { shiftId } = req.params;
    const {
      timeStart, timeEnd,
    } = req.body;
    const shift = await Shift.findByIdAndUpdate(shiftId, {
      timeStart, timeEnd,
    }, { new: true }).populate('day').populate('employee');
    res.json(shift);
  } catch (error) {
    next(error);
  }
});

router.delete('/:shiftId/delete', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.shiftId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    const { shiftId } = req.params;
    const shift = await Shift.findByIdAndDelete(shiftId);
    await User.findByIdAndUpdate(shift.employee._id, { $pull: { shifts: shift._id } });
    await WorkingDay.findByIdAndUpdate(shift.day._id, { $pull: { shifts: shift._id } });
    await WorkingDay.findByIdAndUpdate(shift.day._id, { $pull: { employeesTeam: shift.employee._id } });
    res.json(shift);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
