const express = require('express');
// const createError = require('http-errors');

const { /* checkIfAdmin, */ checkIfLoggedIn } = require('../middlewares/index');

const router = express.Router();
const WorkingDay = require('../models/WorkingDay');
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  try {
    const workingDays = await WorkingDay.find().populate('employeesTeam').populate('shifts');
    res.json(workingDays);
  } catch (error) {
    next(error);
  }
});

router.get('/:workingDayId', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  const { workingDayId } = req.params;
  try {
    const workingDay = await WorkingDay.findById(workingDayId).populate('employeesTeam').populate('shifts');
    if (workingDay) {
      res.json(workingDay);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

// only needed to add the 7 days of the week

router.post('/add', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  const {
    dayName, dayNumber,
  } = req.body;
  try {
    const workingDay = await WorkingDay.create({
      dayName, dayNumber,
    });
    res.json(workingDay);
  } catch (error) {
    next(error);
  }
});

// actually not needed

router.put('/:workingDayId/update', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  const { workingDayId } = req.params;
  const {
    dayName, dayNumber,
  } = req.body;
  try {
    const workingDay = await WorkingDay.findByIdAndUpdate(workingDayId, { new: true }, {
      dayName, dayNumber,
    });
    res.json(workingDay);
  } catch (error) {
    next(error);
  }
});

// actually not needed

router.delete('/:workingDayId/delete', checkIfLoggedIn /* checkIfAdmin */, async (req, res, next) => {
  const { workingDayId } = req.params;
  try {
    const workingDay = await WorkingDay.findByIdAndDelete(workingDayId);
    res.json(workingDay);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
